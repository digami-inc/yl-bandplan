To build for production:
  yarn run build

To test aws upload configuration: 
  aws s3 sync --dryrun --delete dist/ s3://bandplan-app-cloudfront


