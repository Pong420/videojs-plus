const ghpages = require('gh-pages');

ghpages.publish(
  './',
  {
    src: ['docs/**/*', 'dist/**/*']
  },
  function (err) {
    // eslint-disable-next-line
    console.log(err);
  }
);
