# Supabase Video Optimiser

A script for optimising videos kept in Supabase storage.

## Usage

Set your Supabase environment variables:

```text
echo "SUPABASE_PROJECT_URL=<YOUR_PROJECT_URL>">>.env
echo "SUPABASE_SERVICE_ROLE_KEY=<YOUR_SERVICE_ROLE_KEY>">>.env
```

Run the script with:

```text
npx supabase-video-optimiser --bucket images --folder public
```

This will compress video files and re-upload them to Supabase, along with HLS
versions.

## Dry mode

If you want to see the results without actually uploading anything to Supabase
add the `--dry` flag, for example:

```text
npx supabase-video-optimiser --bucket images --folder public --dry
```

You can then look in the `./videos` folder to see the results of the conversion.

## Max items

Run with `--max n` to limit the conversion to the first *n* unconverted videos:

```text
npx supabase-video-optimiser --bucket images --folder public --max 50
```
