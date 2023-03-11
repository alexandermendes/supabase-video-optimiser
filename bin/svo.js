#!/usr/bin/node

require('../lib/run').run().catch((err) => {
  console.error(err);
});
