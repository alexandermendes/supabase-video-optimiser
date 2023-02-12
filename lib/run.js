const path = require('path');
const fse = require('fs-extra');
const Listr = require('listr');
const { spawnObservableTask } = require('./child-process');
const {
  VIDEOS_DIR, ORIGINAL_VIDEOS_DIR, COMPRESSED_VIDEOS_DIR, HLS_VIDEOS_DIR,
} = require('./constants');

fse.ensureDirSync(VIDEOS_DIR);
fse.ensureDirSync(ORIGINAL_VIDEOS_DIR);
fse.ensureDirSync(COMPRESSED_VIDEOS_DIR);
fse.ensureDirSync(HLS_VIDEOS_DIR);

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

tasks.run({}).catch((err) => {
  console.error(err);
});
