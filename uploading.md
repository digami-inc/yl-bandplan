To build for production:
  yarn run build

To upload aws:
  aws s3 sync dist/ s3://bandplan-app-cloudfront

Dryrun command for s3 is --dryrun


