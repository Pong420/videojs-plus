(() => {
  /**
   * @param {string} key
   */
  var commentRegex = key =>
    new RegExp(
      `/\\* ${key} \\*/|\\/\\/\\s+${key}.*$|<!--(\\s+)?${key}(\\s+)?-->`,
      'gm'
    );

  var regex = commentRegex(`highlight-line`);

  /**
   * @param {string[]} strArr
   */
  var parseMetadata = strArr =>
    strArr.reduce(
      /**
       * @param {Record<string, string>} metadata
       * @param {string} line
       * @param {number} index
       */
      (metadata, str) => {
        var [key, value] = str.split('=');
        return { ...metadata, [key]: value };
      },
      {}
    );

  /**
   * @param {string} code
   */
  var getLinesHightLight = code =>
    code.split('\n').reduce(
      /**
       * @param {(number | string)[]} lineNumbers
       * @param {string} line
       * @param {number} index
       */
      (lineNumbers, line, index) => {
        return !!line.match(regex) ? [...lineNumbers, index + 1] : lineNumbers;
      },
      []
    );

  /**
   * @param {string} code
   * @param {string} _lang
   * @this {any}
   */
  function code(code, _lang) {
    var [lang, ...rest] = _lang.split(' ');
    var metadata = parseMetadata(rest);

    if (lang === 'html' && metadata.video) {
      return code;
    }

    var file = metadata.file;
    var highlight = metadata.highlight || '';

    var highlightedLines = getLinesHightLight(code).concat(
      highlight.split(',').filter(Boolean)
    );

    code = code.replace(commentRegex(`highlight-line`), '');

    var html = this.origin.code.call(this, code, lang);
    var div = document.createElement('div');
    div.innerHTML = html;
    var $pre = div.querySelector('pre');

    if ($pre) {
      $pre.setAttribute('data-line', highlightedLines.join(','));

      if (file) {
        var $file = document.createElement('div');
        $file.classList.add(`file`);
        $file.innerHTML = file;
        $pre.insertBefore($file, $pre.children[0]);
        $pre.classList.add('with-file');
      }
    }

    let output = div.innerHTML;

    if (lang === 'js' && metadata.run) {
      output += '<script>' + code + '</script>';
    }

    return output;
  }

  window.$docsify.markdown = window.$docsify.markdown || {};
  window.$docsify.markdown.renderer = window.$docsify.markdown.renderer || {};
  window.$docsify.markdown.renderer.code = code;

  window.$docsify.plugins = [
    ...(window.$docsify.plugins || []),
    /**
     *
     * @param {any} hook
     * @param {any} vm
     */
    function (hook, vm) {
      hook.doneEach(
        /**
         * @param {string} html
         */
        function (html) {
          // `env` disable prettier on the code block
          Prism.languages['env'] = Prism.languages['markdown'];
          Prism.highlightAll();
        }
      );
    }
  ];
})();
