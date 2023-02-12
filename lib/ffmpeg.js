const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const Ffmpeg = require('fluent-ffmpeg');

Ffmpeg.setFfmpegPath(ffmpegPath);

module.exports.runFfmpegConversion = async (
  inputPath,
  outputPath,
  outputOptions,
) => new Promise((resolve, reject) => {
  const infs = new Ffmpeg();
  const fileName = path.basename(inputPath);

  infs
    .addInput(inputPath)
    .withNoAudio()
    .outputOptions(outputOptions)
    .output(outputPath)
    .on('start', (commandLine) => {
      console.log(`Spawned Ffmpeg with command: ${commandLine}`);
    })
    .on('error', (err, _stdout, stderr) => {
      reject(new Error(`An error occurred: ${err.message}`, err, stderr));
    })
    .on('progress', (progress) => {
      console.log(
        `Processing ${fileName} (${progress.frames} frames complete)`,
      );
    })
    .on('end', () => {
      console.log(`Finished processing ${fileName}!`);
      resolve();
    })
    .run();
});
