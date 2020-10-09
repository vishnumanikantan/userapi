module.exports = {
    dev: {
      dbURL: 'mongodb://localhost:27017/user-api',
      port: 3000,
      timeoffset: 0,
    },
    production: {
      dbURL:
        'mongodb://localhost:27017/user-api',
      port: process.env.PORT || 3000,
      timeoffset: 0,
    },
  };
  