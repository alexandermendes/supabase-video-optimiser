const path = require('path');
const Listr = require('listr');
const { spawnObservableTask } = require('./child-process');
const { COMPRESSED_VIDEOS_DIR, HLS_VIDEOS_DIR } = require('./constants');

const getTask = (name) => path.join(__dirname, 'tasks', `${name}.js`);

const tasks = new Listr([
  {
    title: 'Downloading videos from Supabase',
    task: () => spawnObservableTask('node', [getTask('download-videos')]),
  },
  {
    title: 'Compressing videos',
    task: () => spawnObservableTask('node', [getTask('compress-videos')]),
  },
  {
    title: 'Converting to HLS',
    task: () => spawnObservableTask('node', [getTask('convert-videos')]),
  },
  {
    title: 'Upload compressed videos',
    task: () => spawnObservableTask('node', [
      getTask('upload-videos'),
      COMPRESSED_VIDEOS_DIR,
    ]),
  },
  {
    title: 'Upload HLS videos',
    task: () => spawnObservableTask('node', [
      getTask('upload-videos'),
      HLS_VIDEOS_DIR,
    ]),
  },
]);

module.exports.run = async () => tasks.run({});
