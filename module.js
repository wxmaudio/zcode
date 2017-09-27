/**
 * 定义模块
 * @example
 * MyModules.define("bar", [], function() {
 *   function hello(who) {
 *     return "Let me introduce: " + who;
 *   }
 *   return {
 *     hello: hello
 *   };
 * });
 * MyModules.define("foo", ["bar"], function(bar) {
 *   var hungry = "hippo"; *

 *   function awesome() {
 *     console.log(bar.hello(hungry).toUpperCase());
 *   }
 *   return {
 *     awesome: awesome
 *   };
 * });
 * var bar = MyModules.get("bar");
 * var foo = MyModules.get("foo");
 * console.log(
 *   bar.hello("hippo")
 * ); // Let me introduce: hippo foo.awesome(); // LET ME INTRODUCE: HIPPO
 */
var ZModules = (function module() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      //TODO:模块注册要有严格的先后顺序，如果依赖未先注册，后续的依赖取值会为空
      deps[i] = modules[deps[i]];
    }
    return modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  }
})();
