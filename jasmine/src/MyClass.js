define(function() {
  var module = {};

  module.MyClass = (function(){
    return {
      list:[1,2,3]
    };
  })();

  return module;
});
