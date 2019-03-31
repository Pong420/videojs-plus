const ghpages = require('gh-pages');

ghpages.publish(
  './',
  {
    src: ['examples/**/*', 'dist/**/*']
  },
  function(err) {
    console.log(err);
  }
);
