const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

module.exports.supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
