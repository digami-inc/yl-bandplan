module.exports = {
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 's3bandplanyl2',
      region: 'eu-west-1',
      bucket: 'bandplan.yl2.lv',
      createBucket: false,
      staticHosting: true,
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0',
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html'
    }
  }
}
