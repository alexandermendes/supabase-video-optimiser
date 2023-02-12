# Supabase Video Optimiser

A script for optimising videos kept in Supabase storage.

## Usage

For the time being clone the repo and run:

```text
node ./lib/run.js --bucket images --folder public
```

This will compress video files and re-upload them to Supabase, along with HLS
versions.

If you want to see the results without actually uploading anything to Supabase
add the `--dry` flag, for example:

```text
node ./lib/run.js --bucket images --folder public --dry
```

You can then look in the `./videos` folder to see the results of the conversion.
