(function(define) {
  // id, deps, factory(func or obj)
  define([], function () {
    var _module = {};

    function pf() {
      var tmp = arguments[0];
      for (var i=1; i < arguments.length; i++) {
        tmp = tmp.replace(/%s/, arguments[i]);
      }
      return tmp;
    }
    _module.pf = pf;

    // 自作！
    String.prototype.format = function (arg) {
      // @param {String} or {Object}

      // this = String
      var tmp = this;

      // Object
      if (typeof arg === "object"){
        for (var elem in arg){
          tmp = tmp.replace("{" + elem + "}", arg[elem]);
        }
        // String
      } else {
        for (var i=0; i < arguments.length; i++) {
          tmp = tmp.replace("{" + i + "}", arguments[i]);
        }
      }
      return tmp;
    };

    // http://tmlife.net/programming/javascript/javascript-string-format.html
    String.prototype.format2 = function (arg) {
      // init
      var func = null;

      // Object
      if (typeof arg === "object"){
        func = function (regexp, key) {return arg[key]; };
      }
      // String
      else{
        // 一度格納しないと末尾しか拾わない
        var args = arguments;
        func = function (regexp, key) {return args[key]; };
      }

      // this = String
      // replace の第2引数は関数でもよい！
      // そのとき return された文字列をつかう
      // g で繰り返しているから key が増えていく
      return this.replace(/\{(\w+)\}/g, func);
    };
    _module.String = String;

    function strftime(d) {
      // @param d {Date}

      var date_format = "{0}年{1}月{2}日:{3}時{4}分{5}秒".format(
        d.getFullYear(),
        d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth(),
        d.getDate()  < 10 ? "0" + d.getDate() : d.getDate(),
        d.getHours() < 10 ? "0" + d.getHours() : d.getHours(),
        d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(),
        d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()
      );
      return date_format;
    }
    _module.strftime = strftime;

    function sync_sleep(ms) {
      // @parms ms {int}

      var start = new Date().getTime();
      var end = start + ms;

      while (true){
        var tmp = new Date().getTime();
        if (end < tmp){
          break;
        }
      }
    }
    _module.sync_sleep = sync_sleep;

    function async_sleep(ms) {
      setTimeout(function () {
        console.log(1);
        setTimeout(function () {
          console.log(2);
          setTimeout(function () {
            console.log(3);
            setTimeout(function () {
              console.log(4);
            }, ms);
          }, ms);
        }, ms);
      }, ms);
    }
    //_module.async_sleep = async_sleep;
    //async_sleep(1000);

    //var dfd = require("./Public/jsdeferred.js").Deferred;

    //dfd.next(function () {
      //console.log(1);
  //}).wait(1).next(function () {
    //console.log(2);
    //dfd.call(console.log("called"));
  //}).wait(1).next(function () {
    //console.log(3);
    //dfd.fail(console.log("failed"));
  //}).wait(1).next(function () {
    //throw "throw!";
    //console.log(4);
  //}).error(function () {
    //console.log('error');
  //}).next(function () {
    //console.log(5);
  //}).next(function () {
    //console.log(6);
  //});

  // hook array push, pop
  var Hook = function () {};
  Hook.prototype = {

    items: [],

    add : function (val, func) {
      this.items.push(val);
      if (typeof func === 'function') {func();}
    },

    remove : function (val, func) {
      // 一致したときのみ
      if (this.items.indexOf(val) !== -1){
        this.items.splice(this.items.indexOf(val), 1);
      }
      if (typeof func === 'function') {func();}
    }
  };

  var h = new Hook();
  h.add(1);
  h.add(21);
  h.add(323);
  h.add(4);
  h.remove(1);
  //h.remove(3);

  // 無名関数だけど名前付き
  var fib = function _self(arg) {
    if (arg === 1 || arg === 2){
      return 1;
    } else {
      return _self(arg - 1) + _self(arg - 2);
    }
  };
  _module.fib = fib;

  // decorator
  var decorator = function (func) {
    console.log("decorator called: " + func);
    var _decorator = function () {
      console.log("decorator start: " + func);
      var result = func.apply(this, arguments);
      console.log("decorator end: " + func);
      return result;
    };
    return _decorator;
  };
  _module.decorator = decorator;

  var ppp = function (arg1, arg2) {
    console.log("ppp func");
    console.log("ppp", arg1, arg2);
    var added = arg1 + arg2;
    return added;
  };

  //var decoreted = decorator(ppp);
  //var result = decoreted(1,2);
  //console.log("result:", result);

  // obj key values from underscore
  // object.keys は ES5 にある
  var __ = function (){};
  __.prototype.has = function (obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  var o = {'hoge': 1, 'moge': 2, 4:'toge'};

  __.prototype.values = function (obj) {
    var values = [];
    for (var key in obj){
      if (__.prototype.has(obj, key)){
        values.push(obj[key]);
      }
    }
    return values;
  };

  _module.__ = __;

  return _module;

  });
})
( typeof define !== 'undefined' ?
  // use define for AMD if available
  define :
  typeof module !== 'undefined' ?
  // If no define, look for module to export as a CommonJS module.
  // If no define or module, attach to current context.
  // for node
  function(deps, factory) { module.exports = factory(); } :
  // for this === window
  function(deps, factory) { this['a'] = factory(); }
);

