# Supabase Video Optimiser

A script for optimising videos kept in Supabase storage.

## Usage

Run the script with:

```text
npx supabase-video-optimiser --url <PROJECT-URL> --key <SERVICE-ROLE-KEY> --bucket videos --folder public
```

This will compress video files and re-upload them to Supabase, along with HLS
versions.

You can check the results of the compression by looking in the `./videos` folder.

The following command line arguments are available.

| Argument   | Description                                               |
|------------|-----------------------------------------------------------|
| `--url`    | A Supabase project URL.                                   |
| `--key`    | A Supabase service role key.                              |
| `--bucket` | The Supabase bucket where your videos are kept.           |
| `--folder` | A folder within the bucket where your videos are kept.    |
| `--dry`    | Run without actually uploading anything to Supabase.      |
| `--max n`  | Limit the conversion to the first *n* unconverted videos. |
