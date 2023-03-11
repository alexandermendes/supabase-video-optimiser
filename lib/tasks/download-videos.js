const fse = require('fs-extra');
const path = require('path');
const videoExtensions = require('video-extensions');
const download = require('image-downloader');
const {
  ORIGINAL_VIDEOS_DIR,
  VIDEOS_DIR,
  COMPRESSED_VIDEOS_DIR,
  HLS_VIDEOS_DIR,
} = require('../constants');
const { supabase } = require('../supabase');
const { argv } = require('../args');

fse.ensureDirSync(VIDEOS_DIR);
fse.ensureDirSync(ORIGINAL_VIDEOS_DIR);
fse.ensureDirSync(COMPRESSED_VIDEOS_DIR);
fse.ensureDirSync(HLS_VIDEOS_DIR);

const downloadFiles = async (files) => {
  const undownloadedFiles = files.filter(
    (file) => !fse.existsSync(path.join(ORIGINAL_VIDEOS_DIR, file.name)),
  );

  console.log(`Downloading ${undownloadedFiles.length} files`);
  await Promise.all([
    undownloadedFiles.map(async (file) => {
      console.log(`Downloading ${file.name}`);
      const { data } = supabase
        .storage
        .from(argv.bucket)
        .getPublicUrl([argv.folder, file.name].filter((x) => x).join('/'));

      return download.image({
        url: data.publicUrl,
        dest: ORIGINAL_VIDEOS_DIR,
      });
    }),
  ]);
};

const getAllFiles = async (offset = 0) => {
  const { data, error } = await supabase
    .storage
    .from(argv.bucket)
    .list(argv.folder, {
      limit: 100,
      offset,
    });

  if (error) {
    throw new Error(error.message);
  }

  if (data.length) {
    return [
      ...data,
      ...(await getAllFiles(data.length + offset)),
    ];
  }

  return data;
};

const isVideo = (ext) => videoExtensions.includes(ext.replace(/^\./, ''));

const filterUnconvertedFiles = (files) => {
  const convertedFiles = [];
  const convertedFileNames = [];
  const unconvertedFiles = [];
  const unconvertedFileNames = [];

  files.forEach((file) => {
    const { name, ext } = path.parse(file.name);

    if (!isVideo(ext)) {
      return;
    }

    if (ext === '.m3u8') {
      convertedFiles.push(file);
      convertedFileNames.push(name);

      return;
    }

    unconvertedFiles.push(file);
    unconvertedFileNames.push(name);
  });

  return files.filter((file) => {
    const { name, ext } = path.parse(file.name);

    return isVideo(ext)
      && unconvertedFileNames.includes(name)
      && !convertedFileNames.includes(name);
  });
};

const downloadVideos = async () => {
  const files = await getAllFiles();
  let unconvertedFiles = filterUnconvertedFiles(files);

  if (argv.max) {
    unconvertedFiles = unconvertedFiles.slice(0, argv.max);
  }

  await downloadFiles(unconvertedFiles);
};

downloadVideos();
