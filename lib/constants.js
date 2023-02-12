const path = require('path');

const VIDEOS_DIR = path.join(__dirname, '..', 'videos');
const ORIGINAL_VIDEOS_DIR = path.join(VIDEOS_DIR, 'original');
const COMPRESSED_VIDEOS_DIR = path.join(VIDEOS_DIR, 'compressed');
const HLS_VIDEOS_DIR = path.join(VIDEOS_DIR, 'hls');

module.exports = {
  VIDEOS_DIR,
  ORIGINAL_VIDEOS_DIR,
  COMPRESSED_VIDEOS_DIR,
  HLS_VIDEOS_DIR,
};
