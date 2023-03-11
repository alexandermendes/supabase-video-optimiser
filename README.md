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

You can check the results of the compression by looking in the `./videos` folder.

The following command line arguments are available.

| Argument  | Description |
|-----------|-------------|
| `--dry`   | Run without actually uploading anything to Supabase.      |
| `--max n` | Limit the conversion to the first *n* unconverted videos. |
