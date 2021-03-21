// https://github.com/docsifyjs/docsify/blob/develop/src/plugins/external-script.js
// extends docsify/plugins/external-script.js

(function () {
  /**
   * @param {HTMLElement} script
   * @param {HTMLElement} newScript
   */
  function replaceNode(script, newScript) {
    var parent = script.parentNode;
    if (parent) {
      parent.insertBefore(newScript, script);
      parent.removeChild(script);
    } else {
      throw new Error('parent not found');
    }
  }

  function handleExternalScript() {
    var container = Docsify.dom.getNode('#main');
    /** @type {HTMLScriptElement[]} */
    var scripts = Docsify.dom.findAll(container, 'script');

    /** @type {HTMLScriptElement[]} */
    var externals = [];

    /** @type {HTMLScriptElement[]} */
    var localScripts = [];

    for (var i = scripts.length; i--; ) {
      var script = scripts[i];

      if (script && script.src) {
        var newScript = document.createElement('script');

        Array.prototype.slice
          .call(script.attributes)
          .forEach(function (attribute) {
            // @ts-ignore
            newScript[attribute.name] = attribute.value;
          });

        replaceNode(script, newScript);

        externals.push(newScript);
      } else {
        localScripts.push(script);
      }
    }

    var count = 0;
    /**
     * @param {() => void} done
     */
    function callback(done) {
      return function onLoad() {
        count++;
        if (count >= externals.length) {
          done();
        }
      };
    }

    var onLoad = callback(function () {
      localScripts
        .slice()
        .reverse()
        .forEach(function (script) {
          var newScript = document.createElement('script');
          newScript.innerHTML = '(function() {\n' + script.innerHTML + '\n})()';
          replaceNode(script, newScript);
        });
    });

    if (externals.length) {
      for (var i = 0; i < externals.length; i++) {
        externals[i].onload = onLoad;
      }
    } else {
      onLoad();
    }
  }

  window.$docsify.plugins = [
    ...(window.$docsify.plugins || []),
    /**
     * @param {any} hook
     * @param {any} vm
     */
    function (hook, vm) {
      hook.doneEach(function () {
        handleExternalScript();
      });
    }
  ];
})();
