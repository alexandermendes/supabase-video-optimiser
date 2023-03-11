#!/usr/bin/env node

require('../lib/run').run().catch((err) => {
  console.error(err);
});
