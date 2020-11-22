module.exports = {
  apps: [
    {
      name: 'ssmm-rest-api',
      script: './src/index.ts',
      env_production: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    }
  ]
};