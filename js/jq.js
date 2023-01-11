window.$ === undefined &&
  (window.$ = (function () {
    let $,
      fun = {};

    function Z(dom, selector) {
      this.domArr = dom;
      this.length = dom ? dom.length : 0;
      this.selector = selector || "";
    }
    Z.prototype = {
      html: function (str) {
        this.domArr.forEach((el) => (el.innerHTML = str));
        return this;
      },
      css: function (obj, value) {
        if (typeof obj == "object") {
          this.domArr.forEach((el) => Object.assign(el.style, obj));
        } else {
          this.domArr.forEach((el) => (el.style[obj] = value));
        }
        return this;
      },
      click: function (call_function, option) {
        this.domArr.forEach((el) =>
          typeof option == "object"
            ? el.addEventListener("click", call_function, option)
            : el.addEventListener("click", call_function)
        );
        return this;
      },
    };
    //returns an object
    fun.Z = (dom, selector) => new Z(dom, selector);
    fun.Z_ = (dom, selector) => new Z([dom], selector);

    $ = (sel) =>
      sel
        ? typeof sel !== "string"
          ? fun.Z_(sel, sel.nodeName)
          : fun.Z(document.querySelectorAll(sel), sel)
        : fun.Z();
    return $;
  })());
