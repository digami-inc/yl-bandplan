To build for production:
  yarn run build

To upload aws:
  rsync -av dist/ bandplan@everglade:public/
