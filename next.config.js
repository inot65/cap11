const {PHASE_DEVELOPMENT_SERVER, phaze} = require('next/constants');

module.exports = (phase) => {
  if (phaze === PHASE_DEVELOPMENT_SERVER) {
    // sunt in dezvoltare
    return {
      env: {
        mongodb_username: 'toni',
        mongodb_password: 'qv97Zd7Kj0iscr0P',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site',
      },
    };
  }

  // sunt in productie
  return {
    env: {
      mongodb_username: 'toni',
      mongodb_password: 'qv97Zd7Kj0iscr0P',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'my-site',
    },
  };
};
