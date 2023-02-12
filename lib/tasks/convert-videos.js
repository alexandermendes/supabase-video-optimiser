const fse = require('fs-extra');
const path = require('path');
const { runFfmpegConversion } = require('../ffmpeg');
const { COMPRESSED_VIDEOS_DIR, HLS_VIDEOS_DIR } = require('../constants');

const convertVideos = async () => {
  const fileNames = fse.readdirSync(COMPRESSED_VIDEOS_DIR);

  await Promise.all([
    fileNames.map(async (fileName) => {
      const inputPath = path.join(COMPRESSED_VIDEOS_DIR, `${fileName}`);
      const outputPath = path.join(HLS_VIDEOS_DIR, `${path.parse(fileName).name}.m3u8`);

      await runFfmpegConversion(inputPath, outputPath, [
        '-codec: copy',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls',
      ]);
    }),
  ]);
};

convertVideos();
