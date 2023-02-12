const fse = require('fs-extra');
const path = require('path');
const { runFfmpegConversion } = require('../ffmpeg');
const { ORIGINAL_VIDEOS_DIR, COMPRESSED_VIDEOS_DIR } = require('../constants');

const compressVideos = async () => {
  const fileNames = fse.readdirSync(ORIGINAL_VIDEOS_DIR);

  await Promise.all([
    fileNames.map(async (fileName) => {
      const inputPath = path.join(ORIGINAL_VIDEOS_DIR, `${fileName}`);
      const outputPath = path.join(COMPRESSED_VIDEOS_DIR, `${fileName}`);

      await runFfmpegConversion(inputPath, outputPath, [
        '-c:v libx265',
        '-preset fast',
        '-crf 28',
        '-tag:v hvc1',
        '-c:a eac3',
        '-b:a 224k',
      ]);
    }),
  ]);
};

compressVideos();
