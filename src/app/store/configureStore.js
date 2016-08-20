if (process.env.NODE_ENV === 'production') {
  // @todo replace require if possible.
  module.exports = require('_store/configureStore.prod');
}
else {
  // @todo replace require if possible.
  module.exports = require('_store/configureStore.dev');
}
