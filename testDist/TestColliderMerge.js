var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/matter-js/build/matter.js
var require_matter = __commonJS((exports, module) => {
  /*!
   * matter-js 0.20.0 by @liabru
   * http://brm.io/matter-js/
   * License MIT
   * 
   * The MIT License (MIT)
   * 
   * Copyright (c) Liam Brummitt and contributors.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object")
      module.exports = factory();
    else if (typeof define === "function" && define.amd)
      define("Matter", [], factory);
    else if (typeof exports === "object")
      exports["Matter"] = factory();
    else
      root["Matter"] = factory();
  })(exports, function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module2 = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.l = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports2, name, getter) {
        if (!__webpack_require__.o(exports2, name)) {
          Object.defineProperty(exports2, name, { enumerable: true, get: getter });
        }
      };
      __webpack_require__.r = function(exports2) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(exports2, "__esModule", { value: true });
      };
      __webpack_require__.t = function(value, mode) {
        if (mode & 1)
          value = __webpack_require__(value);
        if (mode & 8)
          return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule)
          return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", { enumerable: true, value });
        if (mode & 2 && typeof value != "string")
          for (var key in value)
            __webpack_require__.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
        return ns;
      };
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? function getDefault() {
          return module2["default"];
        } : function getModuleExports() {
          return module2;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = 20);
    }([
      function(module2, exports2) {
        var Common = {};
        module2.exports = Common;
        (function() {
          Common._baseDelta = 1000 / 60;
          Common._nextId = 0;
          Common._seed = 0;
          Common._nowStartTime = +new Date;
          Common._warnedOnce = {};
          Common._decomp = null;
          Common.extend = function(obj, deep) {
            var argsStart, args, deepClone;
            if (typeof deep === "boolean") {
              argsStart = 2;
              deepClone = deep;
            } else {
              argsStart = 1;
              deepClone = true;
            }
            for (var i = argsStart;i < arguments.length; i++) {
              var source = arguments[i];
              if (source) {
                for (var prop in source) {
                  if (deepClone && source[prop] && source[prop].constructor === Object) {
                    if (!obj[prop] || obj[prop].constructor === Object) {
                      obj[prop] = obj[prop] || {};
                      Common.extend(obj[prop], deepClone, source[prop]);
                    } else {
                      obj[prop] = source[prop];
                    }
                  } else {
                    obj[prop] = source[prop];
                  }
                }
              }
            }
            return obj;
          };
          Common.clone = function(obj, deep) {
            return Common.extend({}, deep, obj);
          };
          Common.keys = function(obj) {
            if (Object.keys)
              return Object.keys(obj);
            var keys = [];
            for (var key in obj)
              keys.push(key);
            return keys;
          };
          Common.values = function(obj) {
            var values = [];
            if (Object.keys) {
              var keys = Object.keys(obj);
              for (var i = 0;i < keys.length; i++) {
                values.push(obj[keys[i]]);
              }
              return values;
            }
            for (var key in obj)
              values.push(obj[key]);
            return values;
          };
          Common.get = function(obj, path, begin, end) {
            path = path.split(".").slice(begin, end);
            for (var i = 0;i < path.length; i += 1) {
              obj = obj[path[i]];
            }
            return obj;
          };
          Common.set = function(obj, path, val, begin, end) {
            var parts = path.split(".").slice(begin, end);
            Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
            return val;
          };
          Common.shuffle = function(array) {
            for (var i = array.length - 1;i > 0; i--) {
              var j = Math.floor(Common.random() * (i + 1));
              var temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
            return array;
          };
          Common.choose = function(choices) {
            return choices[Math.floor(Common.random() * choices.length)];
          };
          Common.isElement = function(obj) {
            if (typeof HTMLElement !== "undefined") {
              return obj instanceof HTMLElement;
            }
            return !!(obj && obj.nodeType && obj.nodeName);
          };
          Common.isArray = function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
          };
          Common.isFunction = function(obj) {
            return typeof obj === "function";
          };
          Common.isPlainObject = function(obj) {
            return typeof obj === "object" && obj.constructor === Object;
          };
          Common.isString = function(obj) {
            return toString.call(obj) === "[object String]";
          };
          Common.clamp = function(value, min, max) {
            if (value < min)
              return min;
            if (value > max)
              return max;
            return value;
          };
          Common.sign = function(value) {
            return value < 0 ? -1 : 1;
          };
          Common.now = function() {
            if (typeof window !== "undefined" && window.performance) {
              if (window.performance.now) {
                return window.performance.now();
              } else if (window.performance.webkitNow) {
                return window.performance.webkitNow();
              }
            }
            if (Date.now) {
              return Date.now();
            }
            return new Date - Common._nowStartTime;
          };
          Common.random = function(min, max) {
            min = typeof min !== "undefined" ? min : 0;
            max = typeof max !== "undefined" ? max : 1;
            return min + _seededRandom() * (max - min);
          };
          var _seededRandom = function() {
            Common._seed = (Common._seed * 9301 + 49297) % 233280;
            return Common._seed / 233280;
          };
          Common.colorToNumber = function(colorString) {
            colorString = colorString.replace("#", "");
            if (colorString.length == 3) {
              colorString = colorString.charAt(0) + colorString.charAt(0) + colorString.charAt(1) + colorString.charAt(1) + colorString.charAt(2) + colorString.charAt(2);
            }
            return parseInt(colorString, 16);
          };
          Common.logLevel = 1;
          Common.log = function() {
            if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
              console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
            }
          };
          Common.info = function() {
            if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
              console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
            }
          };
          Common.warn = function() {
            if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
              console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
            }
          };
          Common.warnOnce = function() {
            var message = Array.prototype.slice.call(arguments).join(" ");
            if (!Common._warnedOnce[message]) {
              Common.warn(message);
              Common._warnedOnce[message] = true;
            }
          };
          Common.deprecated = function(obj, prop, warning) {
            obj[prop] = Common.chain(function() {
              Common.warnOnce("\uD83D\uDD05 deprecated \uD83D\uDD05", warning);
            }, obj[prop]);
          };
          Common.nextId = function() {
            return Common._nextId++;
          };
          Common.indexOf = function(haystack, needle) {
            if (haystack.indexOf)
              return haystack.indexOf(needle);
            for (var i = 0;i < haystack.length; i++) {
              if (haystack[i] === needle)
                return i;
            }
            return -1;
          };
          Common.map = function(list, func) {
            if (list.map) {
              return list.map(func);
            }
            var mapped = [];
            for (var i = 0;i < list.length; i += 1) {
              mapped.push(func(list[i]));
            }
            return mapped;
          };
          Common.topologicalSort = function(graph) {
            var result = [], visited = [], temp = [];
            for (var node in graph) {
              if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
              }
            }
            return result;
          };
          Common._topologicalSort = function(node, visited, temp, graph, result) {
            var neighbors = graph[node] || [];
            temp[node] = true;
            for (var i = 0;i < neighbors.length; i += 1) {
              var neighbor = neighbors[i];
              if (temp[neighbor]) {
                continue;
              }
              if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
              }
            }
            temp[node] = false;
            visited[node] = true;
            result.push(node);
          };
          Common.chain = function() {
            var funcs = [];
            for (var i = 0;i < arguments.length; i += 1) {
              var func = arguments[i];
              if (func._chained) {
                funcs.push.apply(funcs, func._chained);
              } else {
                funcs.push(func);
              }
            }
            var chain = function() {
              var lastResult, args = new Array(arguments.length);
              for (var i2 = 0, l = arguments.length;i2 < l; i2++) {
                args[i2] = arguments[i2];
              }
              for (i2 = 0;i2 < funcs.length; i2 += 1) {
                var result = funcs[i2].apply(lastResult, args);
                if (typeof result !== "undefined") {
                  lastResult = result;
                }
              }
              return lastResult;
            };
            chain._chained = funcs;
            return chain;
          };
          Common.chainPathBefore = function(base, path, func) {
            return Common.set(base, path, Common.chain(func, Common.get(base, path)));
          };
          Common.chainPathAfter = function(base, path, func) {
            return Common.set(base, path, Common.chain(Common.get(base, path), func));
          };
          Common.setDecomp = function(decomp) {
            Common._decomp = decomp;
          };
          Common.getDecomp = function() {
            var decomp = Common._decomp;
            try {
              if (!decomp && typeof window !== "undefined") {
                decomp = window.decomp;
              }
              if (!decomp && typeof global !== "undefined") {
                decomp = global.decomp;
              }
            } catch (e) {
              decomp = null;
            }
            return decomp;
          };
        })();
      },
      function(module2, exports2) {
        var Bounds = {};
        module2.exports = Bounds;
        (function() {
          Bounds.create = function(vertices) {
            var bounds = {
              min: { x: 0, y: 0 },
              max: { x: 0, y: 0 }
            };
            if (vertices)
              Bounds.update(bounds, vertices);
            return bounds;
          };
          Bounds.update = function(bounds, vertices, velocity) {
            bounds.min.x = Infinity;
            bounds.max.x = -Infinity;
            bounds.min.y = Infinity;
            bounds.max.y = -Infinity;
            for (var i = 0;i < vertices.length; i++) {
              var vertex = vertices[i];
              if (vertex.x > bounds.max.x)
                bounds.max.x = vertex.x;
              if (vertex.x < bounds.min.x)
                bounds.min.x = vertex.x;
              if (vertex.y > bounds.max.y)
                bounds.max.y = vertex.y;
              if (vertex.y < bounds.min.y)
                bounds.min.y = vertex.y;
            }
            if (velocity) {
              if (velocity.x > 0) {
                bounds.max.x += velocity.x;
              } else {
                bounds.min.x += velocity.x;
              }
              if (velocity.y > 0) {
                bounds.max.y += velocity.y;
              } else {
                bounds.min.y += velocity.y;
              }
            }
          };
          Bounds.contains = function(bounds, point) {
            return point.x >= bounds.min.x && point.x <= bounds.max.x && point.y >= bounds.min.y && point.y <= bounds.max.y;
          };
          Bounds.overlaps = function(boundsA, boundsB) {
            return boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y;
          };
          Bounds.translate = function(bounds, vector) {
            bounds.min.x += vector.x;
            bounds.max.x += vector.x;
            bounds.min.y += vector.y;
            bounds.max.y += vector.y;
          };
          Bounds.shift = function(bounds, position) {
            var deltaX = bounds.max.x - bounds.min.x, deltaY = bounds.max.y - bounds.min.y;
            bounds.min.x = position.x;
            bounds.max.x = position.x + deltaX;
            bounds.min.y = position.y;
            bounds.max.y = position.y + deltaY;
          };
        })();
      },
      function(module2, exports2) {
        var Vector2 = {};
        module2.exports = Vector2;
        (function() {
          Vector2.create = function(x, y) {
            return { x: x || 0, y: y || 0 };
          };
          Vector2.clone = function(vector) {
            return { x: vector.x, y: vector.y };
          };
          Vector2.magnitude = function(vector) {
            return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
          };
          Vector2.magnitudeSquared = function(vector) {
            return vector.x * vector.x + vector.y * vector.y;
          };
          Vector2.rotate = function(vector, angle, output) {
            var cos = Math.cos(angle), sin = Math.sin(angle);
            if (!output)
              output = {};
            var x = vector.x * cos - vector.y * sin;
            output.y = vector.x * sin + vector.y * cos;
            output.x = x;
            return output;
          };
          Vector2.rotateAbout = function(vector, angle, point, output) {
            var cos = Math.cos(angle), sin = Math.sin(angle);
            if (!output)
              output = {};
            var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
            output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
            output.x = x;
            return output;
          };
          Vector2.normalise = function(vector) {
            var magnitude = Vector2.magnitude(vector);
            if (magnitude === 0)
              return { x: 0, y: 0 };
            return { x: vector.x / magnitude, y: vector.y / magnitude };
          };
          Vector2.dot = function(vectorA, vectorB) {
            return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
          };
          Vector2.cross = function(vectorA, vectorB) {
            return vectorA.x * vectorB.y - vectorA.y * vectorB.x;
          };
          Vector2.cross3 = function(vectorA, vectorB, vectorC) {
            return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
          };
          Vector2.add = function(vectorA, vectorB, output) {
            if (!output)
              output = {};
            output.x = vectorA.x + vectorB.x;
            output.y = vectorA.y + vectorB.y;
            return output;
          };
          Vector2.sub = function(vectorA, vectorB, output) {
            if (!output)
              output = {};
            output.x = vectorA.x - vectorB.x;
            output.y = vectorA.y - vectorB.y;
            return output;
          };
          Vector2.mult = function(vector, scalar) {
            return { x: vector.x * scalar, y: vector.y * scalar };
          };
          Vector2.div = function(vector, scalar) {
            return { x: vector.x / scalar, y: vector.y / scalar };
          };
          Vector2.perp = function(vector, negate) {
            negate = negate === true ? -1 : 1;
            return { x: negate * -vector.y, y: negate * vector.x };
          };
          Vector2.neg = function(vector) {
            return { x: -vector.x, y: -vector.y };
          };
          Vector2.angle = function(vectorA, vectorB) {
            return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
          };
          Vector2._temp = [
            Vector2.create(),
            Vector2.create(),
            Vector2.create(),
            Vector2.create(),
            Vector2.create(),
            Vector2.create()
          ];
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Vertices = {};
        module2.exports = Vertices;
        var Vector2 = __webpack_require__(2);
        var Common = __webpack_require__(0);
        (function() {
          Vertices.create = function(points, body) {
            var vertices = [];
            for (var i = 0;i < points.length; i++) {
              var point = points[i], vertex = {
                x: point.x,
                y: point.y,
                index: i,
                body,
                isInternal: false
              };
              vertices.push(vertex);
            }
            return vertices;
          };
          Vertices.fromPath = function(path, body) {
            var pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig, points = [];
            path.replace(pathPattern, function(match, x, y) {
              points.push({ x: parseFloat(x), y: parseFloat(y) });
            });
            return Vertices.create(points, body);
          };
          Vertices.centre = function(vertices) {
            var area = Vertices.area(vertices, true), centre = { x: 0, y: 0 }, cross, temp, j;
            for (var i = 0;i < vertices.length; i++) {
              j = (i + 1) % vertices.length;
              cross = Vector2.cross(vertices[i], vertices[j]);
              temp = Vector2.mult(Vector2.add(vertices[i], vertices[j]), cross);
              centre = Vector2.add(centre, temp);
            }
            return Vector2.div(centre, 6 * area);
          };
          Vertices.mean = function(vertices) {
            var average = { x: 0, y: 0 };
            for (var i = 0;i < vertices.length; i++) {
              average.x += vertices[i].x;
              average.y += vertices[i].y;
            }
            return Vector2.div(average, vertices.length);
          };
          Vertices.area = function(vertices, signed) {
            var area = 0, j = vertices.length - 1;
            for (var i = 0;i < vertices.length; i++) {
              area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
              j = i;
            }
            if (signed)
              return area / 2;
            return Math.abs(area) / 2;
          };
          Vertices.inertia = function(vertices, mass) {
            var numerator = 0, denominator = 0, v = vertices, cross, j;
            for (var n = 0;n < v.length; n++) {
              j = (n + 1) % v.length;
              cross = Math.abs(Vector2.cross(v[j], v[n]));
              numerator += cross * (Vector2.dot(v[j], v[j]) + Vector2.dot(v[j], v[n]) + Vector2.dot(v[n], v[n]));
              denominator += cross;
            }
            return mass / 6 * (numerator / denominator);
          };
          Vertices.translate = function(vertices, vector, scalar) {
            scalar = typeof scalar !== "undefined" ? scalar : 1;
            var verticesLength = vertices.length, translateX = vector.x * scalar, translateY = vector.y * scalar, i;
            for (i = 0;i < verticesLength; i++) {
              vertices[i].x += translateX;
              vertices[i].y += translateY;
            }
            return vertices;
          };
          Vertices.rotate = function(vertices, angle, point) {
            if (angle === 0)
              return;
            var cos = Math.cos(angle), sin = Math.sin(angle), pointX = point.x, pointY = point.y, verticesLength = vertices.length, vertex, dx, dy, i;
            for (i = 0;i < verticesLength; i++) {
              vertex = vertices[i];
              dx = vertex.x - pointX;
              dy = vertex.y - pointY;
              vertex.x = pointX + (dx * cos - dy * sin);
              vertex.y = pointY + (dx * sin + dy * cos);
            }
            return vertices;
          };
          Vertices.contains = function(vertices, point) {
            var { x: pointX, y: pointY } = point, verticesLength = vertices.length, vertex = vertices[verticesLength - 1], nextVertex;
            for (var i = 0;i < verticesLength; i++) {
              nextVertex = vertices[i];
              if ((pointX - vertex.x) * (nextVertex.y - vertex.y) + (pointY - vertex.y) * (vertex.x - nextVertex.x) > 0) {
                return false;
              }
              vertex = nextVertex;
            }
            return true;
          };
          Vertices.scale = function(vertices, scaleX, scaleY, point) {
            if (scaleX === 1 && scaleY === 1)
              return vertices;
            point = point || Vertices.centre(vertices);
            var vertex, delta;
            for (var i = 0;i < vertices.length; i++) {
              vertex = vertices[i];
              delta = Vector2.sub(vertex, point);
              vertices[i].x = point.x + delta.x * scaleX;
              vertices[i].y = point.y + delta.y * scaleY;
            }
            return vertices;
          };
          Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
            if (typeof radius === "number") {
              radius = [radius];
            } else {
              radius = radius || [8];
            }
            quality = typeof quality !== "undefined" ? quality : -1;
            qualityMin = qualityMin || 2;
            qualityMax = qualityMax || 14;
            var newVertices = [];
            for (var i = 0;i < vertices.length; i++) {
              var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1], vertex = vertices[i], nextVertex = vertices[(i + 1) % vertices.length], currentRadius = radius[i < radius.length ? i : radius.length - 1];
              if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
              }
              var prevNormal = Vector2.normalise({
                x: vertex.y - prevVertex.y,
                y: prevVertex.x - vertex.x
              });
              var nextNormal = Vector2.normalise({
                x: nextVertex.y - vertex.y,
                y: vertex.x - nextVertex.x
              });
              var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)), radiusVector = Vector2.mult(Common.clone(prevNormal), currentRadius), midNormal = Vector2.normalise(Vector2.mult(Vector2.add(prevNormal, nextNormal), 0.5)), scaledVertex = Vector2.sub(vertex, Vector2.mult(midNormal, diagonalRadius));
              var precision = quality;
              if (quality === -1) {
                precision = Math.pow(currentRadius, 0.32) * 1.75;
              }
              precision = Common.clamp(precision, qualityMin, qualityMax);
              if (precision % 2 === 1)
                precision += 1;
              var alpha = Math.acos(Vector2.dot(prevNormal, nextNormal)), theta = alpha / precision;
              for (var j = 0;j < precision; j++) {
                newVertices.push(Vector2.add(Vector2.rotate(radiusVector, theta * j), scaledVertex));
              }
            }
            return newVertices;
          };
          Vertices.clockwiseSort = function(vertices) {
            var centre = Vertices.mean(vertices);
            vertices.sort(function(vertexA, vertexB) {
              return Vector2.angle(centre, vertexA) - Vector2.angle(centre, vertexB);
            });
            return vertices;
          };
          Vertices.isConvex = function(vertices) {
            var flag = 0, n = vertices.length, i, j, k, z;
            if (n < 3)
              return null;
            for (i = 0;i < n; i++) {
              j = (i + 1) % n;
              k = (i + 2) % n;
              z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
              z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
              if (z < 0) {
                flag |= 1;
              } else if (z > 0) {
                flag |= 2;
              }
              if (flag === 3) {
                return false;
              }
            }
            if (flag !== 0) {
              return true;
            } else {
              return null;
            }
          };
          Vertices.hull = function(vertices) {
            var upper = [], lower = [], vertex, i;
            vertices = vertices.slice(0);
            vertices.sort(function(vertexA, vertexB) {
              var dx = vertexA.x - vertexB.x;
              return dx !== 0 ? dx : vertexA.y - vertexB.y;
            });
            for (i = 0;i < vertices.length; i += 1) {
              vertex = vertices[i];
              while (lower.length >= 2 && Vector2.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                lower.pop();
              }
              lower.push(vertex);
            }
            for (i = vertices.length - 1;i >= 0; i -= 1) {
              vertex = vertices[i];
              while (upper.length >= 2 && Vector2.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                upper.pop();
              }
              upper.push(vertex);
            }
            upper.pop();
            lower.pop();
            return upper.concat(lower);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Body = {};
        module2.exports = Body;
        var Vertices = __webpack_require__(3);
        var Vector2 = __webpack_require__(2);
        var Sleeping = __webpack_require__(7);
        var Common = __webpack_require__(0);
        var Bounds = __webpack_require__(1);
        var Axes = __webpack_require__(11);
        (function() {
          Body._timeCorrection = true;
          Body._inertiaScale = 4;
          Body._nextCollidingGroupId = 1;
          Body._nextNonCollidingGroupId = -1;
          Body._nextCategory = 1;
          Body._baseDelta = 1000 / 60;
          Body.create = function(options) {
            var defaults = {
              id: Common.nextId(),
              type: "body",
              label: "Body",
              parts: [],
              plugin: {},
              angle: 0,
              vertices: Vertices.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
              position: { x: 0, y: 0 },
              force: { x: 0, y: 0 },
              torque: 0,
              positionImpulse: { x: 0, y: 0 },
              constraintImpulse: { x: 0, y: 0, angle: 0 },
              totalContacts: 0,
              speed: 0,
              angularSpeed: 0,
              velocity: { x: 0, y: 0 },
              angularVelocity: 0,
              isSensor: false,
              isStatic: false,
              isSleeping: false,
              motion: 0,
              sleepThreshold: 60,
              density: 0.001,
              restitution: 0,
              friction: 0.1,
              frictionStatic: 0.5,
              frictionAir: 0.01,
              collisionFilter: {
                category: 1,
                mask: 4294967295,
                group: 0
              },
              slop: 0.05,
              timeScale: 1,
              render: {
                visible: true,
                opacity: 1,
                strokeStyle: null,
                fillStyle: null,
                lineWidth: null,
                sprite: {
                  xScale: 1,
                  yScale: 1,
                  xOffset: 0,
                  yOffset: 0
                }
              },
              events: null,
              bounds: null,
              chamfer: null,
              circleRadius: 0,
              positionPrev: null,
              anglePrev: 0,
              parent: null,
              axes: null,
              area: 0,
              mass: 0,
              inertia: 0,
              deltaTime: 1000 / 60,
              _original: null
            };
            var body = Common.extend(defaults, options);
            _initProperties(body, options);
            return body;
          };
          Body.nextGroup = function(isNonColliding) {
            if (isNonColliding)
              return Body._nextNonCollidingGroupId--;
            return Body._nextCollidingGroupId++;
          };
          Body.nextCategory = function() {
            Body._nextCategory = Body._nextCategory << 1;
            return Body._nextCategory;
          };
          var _initProperties = function(body, options) {
            options = options || {};
            Body.set(body, {
              bounds: body.bounds || Bounds.create(body.vertices),
              positionPrev: body.positionPrev || Vector2.clone(body.position),
              anglePrev: body.anglePrev || body.angle,
              vertices: body.vertices,
              parts: body.parts || [body],
              isStatic: body.isStatic,
              isSleeping: body.isSleeping,
              parent: body.parent || body
            });
            Vertices.rotate(body.vertices, body.angle, body.position);
            Axes.rotate(body.axes, body.angle);
            Bounds.update(body.bounds, body.vertices, body.velocity);
            Body.set(body, {
              axes: options.axes || body.axes,
              area: options.area || body.area,
              mass: options.mass || body.mass,
              inertia: options.inertia || body.inertia
            });
            var defaultFillStyle = body.isStatic ? "#14151f" : Common.choose(["#f19648", "#f5d259", "#f55a3c", "#063e7b", "#ececd1"]), defaultStrokeStyle = body.isStatic ? "#555" : "#ccc", defaultLineWidth = body.isStatic && body.render.fillStyle === null ? 1 : 0;
            body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
            body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
            body.render.lineWidth = body.render.lineWidth || defaultLineWidth;
            body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
            body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
          };
          Body.set = function(body, settings, value) {
            var property;
            if (typeof settings === "string") {
              property = settings;
              settings = {};
              settings[property] = value;
            }
            for (property in settings) {
              if (!Object.prototype.hasOwnProperty.call(settings, property))
                continue;
              value = settings[property];
              switch (property) {
                case "isStatic":
                  Body.setStatic(body, value);
                  break;
                case "isSleeping":
                  Sleeping.set(body, value);
                  break;
                case "mass":
                  Body.setMass(body, value);
                  break;
                case "density":
                  Body.setDensity(body, value);
                  break;
                case "inertia":
                  Body.setInertia(body, value);
                  break;
                case "vertices":
                  Body.setVertices(body, value);
                  break;
                case "position":
                  Body.setPosition(body, value);
                  break;
                case "angle":
                  Body.setAngle(body, value);
                  break;
                case "velocity":
                  Body.setVelocity(body, value);
                  break;
                case "angularVelocity":
                  Body.setAngularVelocity(body, value);
                  break;
                case "speed":
                  Body.setSpeed(body, value);
                  break;
                case "angularSpeed":
                  Body.setAngularSpeed(body, value);
                  break;
                case "parts":
                  Body.setParts(body, value);
                  break;
                case "centre":
                  Body.setCentre(body, value);
                  break;
                default:
                  body[property] = value;
              }
            }
          };
          Body.setStatic = function(body, isStatic) {
            for (var i = 0;i < body.parts.length; i++) {
              var part = body.parts[i];
              if (isStatic) {
                if (!part.isStatic) {
                  part._original = {
                    restitution: part.restitution,
                    friction: part.friction,
                    mass: part.mass,
                    inertia: part.inertia,
                    density: part.density,
                    inverseMass: part.inverseMass,
                    inverseInertia: part.inverseInertia
                  };
                }
                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;
                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
              } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;
                part._original = null;
              }
              part.isStatic = isStatic;
            }
          };
          Body.setMass = function(body, mass) {
            var moment = body.inertia / (body.mass / 6);
            body.inertia = moment * (mass / 6);
            body.inverseInertia = 1 / body.inertia;
            body.mass = mass;
            body.inverseMass = 1 / body.mass;
            body.density = body.mass / body.area;
          };
          Body.setDensity = function(body, density) {
            Body.setMass(body, density * body.area);
            body.density = density;
          };
          Body.setInertia = function(body, inertia) {
            body.inertia = inertia;
            body.inverseInertia = 1 / body.inertia;
          };
          Body.setVertices = function(body, vertices) {
            if (vertices[0].body === body) {
              body.vertices = vertices;
            } else {
              body.vertices = Vertices.create(vertices, body);
            }
            body.axes = Axes.fromVertices(body.vertices);
            body.area = Vertices.area(body.vertices);
            Body.setMass(body, body.density * body.area);
            var centre = Vertices.centre(body.vertices);
            Vertices.translate(body.vertices, centre, -1);
            Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));
            Vertices.translate(body.vertices, body.position);
            Bounds.update(body.bounds, body.vertices, body.velocity);
          };
          Body.setParts = function(body, parts, autoHull) {
            var i;
            parts = parts.slice(0);
            body.parts.length = 0;
            body.parts.push(body);
            body.parent = body;
            for (i = 0;i < parts.length; i++) {
              var part = parts[i];
              if (part !== body) {
                part.parent = body;
                body.parts.push(part);
              }
            }
            if (body.parts.length === 1)
              return;
            autoHull = typeof autoHull !== "undefined" ? autoHull : true;
            if (autoHull) {
              var vertices = [];
              for (i = 0;i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
              }
              Vertices.clockwiseSort(vertices);
              var hull = Vertices.hull(vertices), hullCentre = Vertices.centre(hull);
              Body.setVertices(body, hull);
              Vertices.translate(body.vertices, hullCentre);
            }
            var total = Body._totalProperties(body);
            body.area = total.area;
            body.parent = body;
            body.position.x = total.centre.x;
            body.position.y = total.centre.y;
            body.positionPrev.x = total.centre.x;
            body.positionPrev.y = total.centre.y;
            Body.setMass(body, total.mass);
            Body.setInertia(body, total.inertia);
            Body.setPosition(body, total.centre);
          };
          Body.setCentre = function(body, centre, relative) {
            if (!relative) {
              body.positionPrev.x = centre.x - (body.position.x - body.positionPrev.x);
              body.positionPrev.y = centre.y - (body.position.y - body.positionPrev.y);
              body.position.x = centre.x;
              body.position.y = centre.y;
            } else {
              body.positionPrev.x += centre.x;
              body.positionPrev.y += centre.y;
              body.position.x += centre.x;
              body.position.y += centre.y;
            }
          };
          Body.setPosition = function(body, position, updateVelocity) {
            var delta = Vector2.sub(position, body.position);
            if (updateVelocity) {
              body.positionPrev.x = body.position.x;
              body.positionPrev.y = body.position.y;
              body.velocity.x = delta.x;
              body.velocity.y = delta.y;
              body.speed = Vector2.magnitude(delta);
            } else {
              body.positionPrev.x += delta.x;
              body.positionPrev.y += delta.y;
            }
            for (var i = 0;i < body.parts.length; i++) {
              var part = body.parts[i];
              part.position.x += delta.x;
              part.position.y += delta.y;
              Vertices.translate(part.vertices, delta);
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
          };
          Body.setAngle = function(body, angle, updateVelocity) {
            var delta = angle - body.angle;
            if (updateVelocity) {
              body.anglePrev = body.angle;
              body.angularVelocity = delta;
              body.angularSpeed = Math.abs(delta);
            } else {
              body.anglePrev += delta;
            }
            for (var i = 0;i < body.parts.length; i++) {
              var part = body.parts[i];
              part.angle += delta;
              Vertices.rotate(part.vertices, delta, body.position);
              Axes.rotate(part.axes, delta);
              Bounds.update(part.bounds, part.vertices, body.velocity);
              if (i > 0) {
                Vector2.rotateAbout(part.position, delta, body.position, part.position);
              }
            }
          };
          Body.setVelocity = function(body, velocity) {
            var timeScale = body.deltaTime / Body._baseDelta;
            body.positionPrev.x = body.position.x - velocity.x * timeScale;
            body.positionPrev.y = body.position.y - velocity.y * timeScale;
            body.velocity.x = (body.position.x - body.positionPrev.x) / timeScale;
            body.velocity.y = (body.position.y - body.positionPrev.y) / timeScale;
            body.speed = Vector2.magnitude(body.velocity);
          };
          Body.getVelocity = function(body) {
            var timeScale = Body._baseDelta / body.deltaTime;
            return {
              x: (body.position.x - body.positionPrev.x) * timeScale,
              y: (body.position.y - body.positionPrev.y) * timeScale
            };
          };
          Body.getSpeed = function(body) {
            return Vector2.magnitude(Body.getVelocity(body));
          };
          Body.setSpeed = function(body, speed) {
            Body.setVelocity(body, Vector2.mult(Vector2.normalise(Body.getVelocity(body)), speed));
          };
          Body.setAngularVelocity = function(body, velocity) {
            var timeScale = body.deltaTime / Body._baseDelta;
            body.anglePrev = body.angle - velocity * timeScale;
            body.angularVelocity = (body.angle - body.anglePrev) / timeScale;
            body.angularSpeed = Math.abs(body.angularVelocity);
          };
          Body.getAngularVelocity = function(body) {
            return (body.angle - body.anglePrev) * Body._baseDelta / body.deltaTime;
          };
          Body.getAngularSpeed = function(body) {
            return Math.abs(Body.getAngularVelocity(body));
          };
          Body.setAngularSpeed = function(body, speed) {
            Body.setAngularVelocity(body, Common.sign(Body.getAngularVelocity(body)) * speed);
          };
          Body.translate = function(body, translation, updateVelocity) {
            Body.setPosition(body, Vector2.add(body.position, translation), updateVelocity);
          };
          Body.rotate = function(body, rotation, point, updateVelocity) {
            if (!point) {
              Body.setAngle(body, body.angle + rotation, updateVelocity);
            } else {
              var cos = Math.cos(rotation), sin = Math.sin(rotation), dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
              }, updateVelocity);
              Body.setAngle(body, body.angle + rotation, updateVelocity);
            }
          };
          Body.scale = function(body, scaleX, scaleY, point) {
            var totalArea = 0, totalInertia = 0;
            point = point || body.position;
            for (var i = 0;i < body.parts.length; i++) {
              var part = body.parts[i];
              Vertices.scale(part.vertices, scaleX, scaleY, point);
              part.axes = Axes.fromVertices(part.vertices);
              part.area = Vertices.area(part.vertices);
              Body.setMass(part, body.density * part.area);
              Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
              Body.setInertia(part, Body._inertiaScale * Vertices.inertia(part.vertices, part.mass));
              Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });
              if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
              }
              part.position.x = point.x + (part.position.x - point.x) * scaleX;
              part.position.y = point.y + (part.position.y - point.y) * scaleY;
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
            if (body.parts.length > 1) {
              body.area = totalArea;
              if (!body.isStatic) {
                Body.setMass(body, body.density * totalArea);
                Body.setInertia(body, totalInertia);
              }
            }
            if (body.circleRadius) {
              if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
              } else {
                body.circleRadius = null;
              }
            }
          };
          Body.update = function(body, deltaTime) {
            deltaTime = (typeof deltaTime !== "undefined" ? deltaTime : 1000 / 60) * body.timeScale;
            var deltaTimeSquared = deltaTime * deltaTime, correction = Body._timeCorrection ? deltaTime / (body.deltaTime || deltaTime) : 1;
            var frictionAir = 1 - body.frictionAir * (deltaTime / Common._baseDelta), velocityPrevX = (body.position.x - body.positionPrev.x) * correction, velocityPrevY = (body.position.y - body.positionPrev.y) * correction;
            body.velocity.x = velocityPrevX * frictionAir + body.force.x / body.mass * deltaTimeSquared;
            body.velocity.y = velocityPrevY * frictionAir + body.force.y / body.mass * deltaTimeSquared;
            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;
            body.position.x += body.velocity.x;
            body.position.y += body.velocity.y;
            body.deltaTime = deltaTime;
            body.angularVelocity = (body.angle - body.anglePrev) * frictionAir * correction + body.torque / body.inertia * deltaTimeSquared;
            body.anglePrev = body.angle;
            body.angle += body.angularVelocity;
            for (var i = 0;i < body.parts.length; i++) {
              var part = body.parts[i];
              Vertices.translate(part.vertices, body.velocity);
              if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
              }
              if (body.angularVelocity !== 0) {
                Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                  Vector2.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                }
              }
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
          };
          Body.updateVelocities = function(body) {
            var timeScale = Body._baseDelta / body.deltaTime, bodyVelocity = body.velocity;
            bodyVelocity.x = (body.position.x - body.positionPrev.x) * timeScale;
            bodyVelocity.y = (body.position.y - body.positionPrev.y) * timeScale;
            body.speed = Math.sqrt(bodyVelocity.x * bodyVelocity.x + bodyVelocity.y * bodyVelocity.y);
            body.angularVelocity = (body.angle - body.anglePrev) * timeScale;
            body.angularSpeed = Math.abs(body.angularVelocity);
          };
          Body.applyForce = function(body, position, force) {
            var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
            body.force.x += force.x;
            body.force.y += force.y;
            body.torque += offset.x * force.y - offset.y * force.x;
          };
          Body._totalProperties = function(body) {
            var properties = {
              mass: 0,
              area: 0,
              inertia: 0,
              centre: { x: 0, y: 0 }
            };
            for (var i = body.parts.length === 1 ? 0 : 1;i < body.parts.length; i++) {
              var part = body.parts[i], mass = part.mass !== Infinity ? part.mass : 1;
              properties.mass += mass;
              properties.area += part.area;
              properties.inertia += part.inertia;
              properties.centre = Vector2.add(properties.centre, Vector2.mult(part.position, mass));
            }
            properties.centre = Vector2.div(properties.centre, properties.mass);
            return properties;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Events = {};
        module2.exports = Events;
        var Common = __webpack_require__(0);
        (function() {
          Events.on = function(object, eventNames, callback) {
            var names = eventNames.split(" "), name;
            for (var i = 0;i < names.length; i++) {
              name = names[i];
              object.events = object.events || {};
              object.events[name] = object.events[name] || [];
              object.events[name].push(callback);
            }
            return callback;
          };
          Events.off = function(object, eventNames, callback) {
            if (!eventNames) {
              object.events = {};
              return;
            }
            if (typeof eventNames === "function") {
              callback = eventNames;
              eventNames = Common.keys(object.events).join(" ");
            }
            var names = eventNames.split(" ");
            for (var i = 0;i < names.length; i++) {
              var callbacks = object.events[names[i]], newCallbacks = [];
              if (callback && callbacks) {
                for (var j = 0;j < callbacks.length; j++) {
                  if (callbacks[j] !== callback)
                    newCallbacks.push(callbacks[j]);
                }
              }
              object.events[names[i]] = newCallbacks;
            }
          };
          Events.trigger = function(object, eventNames, event) {
            var names, name, callbacks, eventClone;
            var events = object.events;
            if (events && Common.keys(events).length > 0) {
              if (!event)
                event = {};
              names = eventNames.split(" ");
              for (var i = 0;i < names.length; i++) {
                name = names[i];
                callbacks = events[name];
                if (callbacks) {
                  eventClone = Common.clone(event, false);
                  eventClone.name = name;
                  eventClone.source = object;
                  for (var j = 0;j < callbacks.length; j++) {
                    callbacks[j].apply(object, [eventClone]);
                  }
                }
              }
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Composite = {};
        module2.exports = Composite;
        var Events = __webpack_require__(5);
        var Common = __webpack_require__(0);
        var Bounds = __webpack_require__(1);
        var Body = __webpack_require__(4);
        (function() {
          Composite.create = function(options) {
            return Common.extend({
              id: Common.nextId(),
              type: "composite",
              parent: null,
              isModified: false,
              bodies: [],
              constraints: [],
              composites: [],
              label: "Composite",
              plugin: {},
              cache: {
                allBodies: null,
                allConstraints: null,
                allComposites: null
              }
            }, options);
          };
          Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
            composite.isModified = isModified;
            if (isModified && composite.cache) {
              composite.cache.allBodies = null;
              composite.cache.allConstraints = null;
              composite.cache.allComposites = null;
            }
            if (updateParents && composite.parent) {
              Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
            }
            if (updateChildren) {
              for (var i = 0;i < composite.composites.length; i++) {
                var childComposite = composite.composites[i];
                Composite.setModified(childComposite, isModified, updateParents, updateChildren);
              }
            }
          };
          Composite.add = function(composite, object) {
            var objects = [].concat(object);
            Events.trigger(composite, "beforeAdd", { object });
            for (var i = 0;i < objects.length; i++) {
              var obj = objects[i];
              switch (obj.type) {
                case "body":
                  if (obj.parent !== obj) {
                    Common.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                    break;
                  }
                  Composite.addBody(composite, obj);
                  break;
                case "constraint":
                  Composite.addConstraint(composite, obj);
                  break;
                case "composite":
                  Composite.addComposite(composite, obj);
                  break;
                case "mouseConstraint":
                  Composite.addConstraint(composite, obj.constraint);
                  break;
              }
            }
            Events.trigger(composite, "afterAdd", { object });
            return composite;
          };
          Composite.remove = function(composite, object, deep) {
            var objects = [].concat(object);
            Events.trigger(composite, "beforeRemove", { object });
            for (var i = 0;i < objects.length; i++) {
              var obj = objects[i];
              switch (obj.type) {
                case "body":
                  Composite.removeBody(composite, obj, deep);
                  break;
                case "constraint":
                  Composite.removeConstraint(composite, obj, deep);
                  break;
                case "composite":
                  Composite.removeComposite(composite, obj, deep);
                  break;
                case "mouseConstraint":
                  Composite.removeConstraint(composite, obj.constraint);
                  break;
              }
            }
            Events.trigger(composite, "afterRemove", { object });
            return composite;
          };
          Composite.addComposite = function(compositeA, compositeB) {
            compositeA.composites.push(compositeB);
            compositeB.parent = compositeA;
            Composite.setModified(compositeA, true, true, false);
            return compositeA;
          };
          Composite.removeComposite = function(compositeA, compositeB, deep) {
            var position = Common.indexOf(compositeA.composites, compositeB);
            if (position !== -1) {
              var bodies = Composite.allBodies(compositeB);
              Composite.removeCompositeAt(compositeA, position);
              for (var i = 0;i < bodies.length; i++) {
                bodies[i].sleepCounter = 0;
              }
            }
            if (deep) {
              for (var i = 0;i < compositeA.composites.length; i++) {
                Composite.removeComposite(compositeA.composites[i], compositeB, true);
              }
            }
            return compositeA;
          };
          Composite.removeCompositeAt = function(composite, position) {
            composite.composites.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.addBody = function(composite, body) {
            composite.bodies.push(body);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.removeBody = function(composite, body, deep) {
            var position = Common.indexOf(composite.bodies, body);
            if (position !== -1) {
              Composite.removeBodyAt(composite, position);
              body.sleepCounter = 0;
            }
            if (deep) {
              for (var i = 0;i < composite.composites.length; i++) {
                Composite.removeBody(composite.composites[i], body, true);
              }
            }
            return composite;
          };
          Composite.removeBodyAt = function(composite, position) {
            composite.bodies.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.addConstraint = function(composite, constraint) {
            composite.constraints.push(constraint);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.removeConstraint = function(composite, constraint, deep) {
            var position = Common.indexOf(composite.constraints, constraint);
            if (position !== -1) {
              Composite.removeConstraintAt(composite, position);
            }
            if (deep) {
              for (var i = 0;i < composite.composites.length; i++) {
                Composite.removeConstraint(composite.composites[i], constraint, true);
              }
            }
            return composite;
          };
          Composite.removeConstraintAt = function(composite, position) {
            composite.constraints.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.clear = function(composite, keepStatic, deep) {
            if (deep) {
              for (var i = 0;i < composite.composites.length; i++) {
                Composite.clear(composite.composites[i], keepStatic, true);
              }
            }
            if (keepStatic) {
              composite.bodies = composite.bodies.filter(function(body) {
                return body.isStatic;
              });
            } else {
              composite.bodies.length = 0;
            }
            composite.constraints.length = 0;
            composite.composites.length = 0;
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.allBodies = function(composite) {
            if (composite.cache && composite.cache.allBodies) {
              return composite.cache.allBodies;
            }
            var bodies = [].concat(composite.bodies);
            for (var i = 0;i < composite.composites.length; i++)
              bodies = bodies.concat(Composite.allBodies(composite.composites[i]));
            if (composite.cache) {
              composite.cache.allBodies = bodies;
            }
            return bodies;
          };
          Composite.allConstraints = function(composite) {
            if (composite.cache && composite.cache.allConstraints) {
              return composite.cache.allConstraints;
            }
            var constraints = [].concat(composite.constraints);
            for (var i = 0;i < composite.composites.length; i++)
              constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));
            if (composite.cache) {
              composite.cache.allConstraints = constraints;
            }
            return constraints;
          };
          Composite.allComposites = function(composite) {
            if (composite.cache && composite.cache.allComposites) {
              return composite.cache.allComposites;
            }
            var composites = [].concat(composite.composites);
            for (var i = 0;i < composite.composites.length; i++)
              composites = composites.concat(Composite.allComposites(composite.composites[i]));
            if (composite.cache) {
              composite.cache.allComposites = composites;
            }
            return composites;
          };
          Composite.get = function(composite, id, type) {
            var objects, object;
            switch (type) {
              case "body":
                objects = Composite.allBodies(composite);
                break;
              case "constraint":
                objects = Composite.allConstraints(composite);
                break;
              case "composite":
                objects = Composite.allComposites(composite).concat(composite);
                break;
            }
            if (!objects)
              return null;
            object = objects.filter(function(object2) {
              return object2.id.toString() === id.toString();
            });
            return object.length === 0 ? null : object[0];
          };
          Composite.move = function(compositeA, objects, compositeB) {
            Composite.remove(compositeA, objects);
            Composite.add(compositeB, objects);
            return compositeA;
          };
          Composite.rebase = function(composite) {
            var objects = Composite.allBodies(composite).concat(Composite.allConstraints(composite)).concat(Composite.allComposites(composite));
            for (var i = 0;i < objects.length; i++) {
              objects[i].id = Common.nextId();
            }
            return composite;
          };
          Composite.translate = function(composite, translation, recursive) {
            var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0;i < bodies.length; i++) {
              Body.translate(bodies[i], translation);
            }
            return composite;
          };
          Composite.rotate = function(composite, rotation, point, recursive) {
            var cos = Math.cos(rotation), sin = Math.sin(rotation), bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0;i < bodies.length; i++) {
              var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
              });
              Body.rotate(body, rotation);
            }
            return composite;
          };
          Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
            var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0;i < bodies.length; i++) {
              var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body.setPosition(body, {
                x: point.x + dx * scaleX,
                y: point.y + dy * scaleY
              });
              Body.scale(body, scaleX, scaleY);
            }
            return composite;
          };
          Composite.bounds = function(composite) {
            var bodies = Composite.allBodies(composite), vertices = [];
            for (var i = 0;i < bodies.length; i += 1) {
              var body = bodies[i];
              vertices.push(body.bounds.min, body.bounds.max);
            }
            return Bounds.create(vertices);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Sleeping = {};
        module2.exports = Sleeping;
        var Body = __webpack_require__(4);
        var Events = __webpack_require__(5);
        var Common = __webpack_require__(0);
        (function() {
          Sleeping._motionWakeThreshold = 0.18;
          Sleeping._motionSleepThreshold = 0.08;
          Sleeping._minBias = 0.9;
          Sleeping.update = function(bodies, delta) {
            var timeScale = delta / Common._baseDelta, motionSleepThreshold = Sleeping._motionSleepThreshold;
            for (var i = 0;i < bodies.length; i++) {
              var body = bodies[i], speed = Body.getSpeed(body), angularSpeed = Body.getAngularSpeed(body), motion = speed * speed + angularSpeed * angularSpeed;
              if (body.force.x !== 0 || body.force.y !== 0) {
                Sleeping.set(body, false);
                continue;
              }
              var minMotion = Math.min(body.motion, motion), maxMotion = Math.max(body.motion, motion);
              body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
              if (body.sleepThreshold > 0 && body.motion < motionSleepThreshold) {
                body.sleepCounter += 1;
                if (body.sleepCounter >= body.sleepThreshold / timeScale) {
                  Sleeping.set(body, true);
                }
              } else if (body.sleepCounter > 0) {
                body.sleepCounter -= 1;
              }
            }
          };
          Sleeping.afterCollisions = function(pairs) {
            var motionSleepThreshold = Sleeping._motionSleepThreshold;
            for (var i = 0;i < pairs.length; i++) {
              var pair = pairs[i];
              if (!pair.isActive)
                continue;
              var collision = pair.collision, bodyA = collision.bodyA.parent, bodyB = collision.bodyB.parent;
              if (bodyA.isSleeping && bodyB.isSleeping || bodyA.isStatic || bodyB.isStatic)
                continue;
              if (bodyA.isSleeping || bodyB.isSleeping) {
                var sleepingBody = bodyA.isSleeping && !bodyA.isStatic ? bodyA : bodyB, movingBody = sleepingBody === bodyA ? bodyB : bodyA;
                if (!sleepingBody.isStatic && movingBody.motion > motionSleepThreshold) {
                  Sleeping.set(sleepingBody, false);
                }
              }
            }
          };
          Sleeping.set = function(body, isSleeping) {
            var wasSleeping = body.isSleeping;
            if (isSleeping) {
              body.isSleeping = true;
              body.sleepCounter = body.sleepThreshold;
              body.positionImpulse.x = 0;
              body.positionImpulse.y = 0;
              body.positionPrev.x = body.position.x;
              body.positionPrev.y = body.position.y;
              body.anglePrev = body.angle;
              body.speed = 0;
              body.angularSpeed = 0;
              body.motion = 0;
              if (!wasSleeping) {
                Events.trigger(body, "sleepStart");
              }
            } else {
              body.isSleeping = false;
              body.sleepCounter = 0;
              if (wasSleeping) {
                Events.trigger(body, "sleepEnd");
              }
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Collision = {};
        module2.exports = Collision;
        var Vertices = __webpack_require__(3);
        var Pair = __webpack_require__(9);
        (function() {
          var _supports = [];
          var _overlapAB = {
            overlap: 0,
            axis: null
          };
          var _overlapBA = {
            overlap: 0,
            axis: null
          };
          Collision.create = function(bodyA, bodyB) {
            return {
              pair: null,
              collided: false,
              bodyA,
              bodyB,
              parentA: bodyA.parent,
              parentB: bodyB.parent,
              depth: 0,
              normal: { x: 0, y: 0 },
              tangent: { x: 0, y: 0 },
              penetration: { x: 0, y: 0 },
              supports: [null, null],
              supportCount: 0
            };
          };
          Collision.collides = function(bodyA, bodyB, pairs) {
            Collision._overlapAxes(_overlapAB, bodyA.vertices, bodyB.vertices, bodyA.axes);
            if (_overlapAB.overlap <= 0) {
              return null;
            }
            Collision._overlapAxes(_overlapBA, bodyB.vertices, bodyA.vertices, bodyB.axes);
            if (_overlapBA.overlap <= 0) {
              return null;
            }
            var pair = pairs && pairs.table[Pair.id(bodyA, bodyB)], collision;
            if (!pair) {
              collision = Collision.create(bodyA, bodyB);
              collision.collided = true;
              collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
              collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
              collision.parentA = collision.bodyA.parent;
              collision.parentB = collision.bodyB.parent;
            } else {
              collision = pair.collision;
            }
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;
            var minOverlap;
            if (_overlapAB.overlap < _overlapBA.overlap) {
              minOverlap = _overlapAB;
            } else {
              minOverlap = _overlapBA;
            }
            var { normal, tangent, penetration, supports } = collision, depth = minOverlap.overlap, minAxis = minOverlap.axis, normalX = minAxis.x, normalY = minAxis.y, deltaX = bodyB.position.x - bodyA.position.x, deltaY = bodyB.position.y - bodyA.position.y;
            if (normalX * deltaX + normalY * deltaY >= 0) {
              normalX = -normalX;
              normalY = -normalY;
            }
            normal.x = normalX;
            normal.y = normalY;
            tangent.x = -normalY;
            tangent.y = normalX;
            penetration.x = normalX * depth;
            penetration.y = normalY * depth;
            collision.depth = depth;
            var supportsB = Collision._findSupports(bodyA, bodyB, normal, 1), supportCount = 0;
            if (Vertices.contains(bodyA.vertices, supportsB[0])) {
              supports[supportCount++] = supportsB[0];
            }
            if (Vertices.contains(bodyA.vertices, supportsB[1])) {
              supports[supportCount++] = supportsB[1];
            }
            if (supportCount < 2) {
              var supportsA = Collision._findSupports(bodyB, bodyA, normal, -1);
              if (Vertices.contains(bodyB.vertices, supportsA[0])) {
                supports[supportCount++] = supportsA[0];
              }
              if (supportCount < 2 && Vertices.contains(bodyB.vertices, supportsA[1])) {
                supports[supportCount++] = supportsA[1];
              }
            }
            if (supportCount === 0) {
              supports[supportCount++] = supportsB[0];
            }
            collision.supportCount = supportCount;
            return collision;
          };
          Collision._overlapAxes = function(result, verticesA, verticesB, axes) {
            var verticesALength = verticesA.length, verticesBLength = verticesB.length, verticesAX = verticesA[0].x, verticesAY = verticesA[0].y, verticesBX = verticesB[0].x, verticesBY = verticesB[0].y, axesLength = axes.length, overlapMin = Number.MAX_VALUE, overlapAxisNumber = 0, overlap, overlapAB, overlapBA, dot, i, j;
            for (i = 0;i < axesLength; i++) {
              var axis = axes[i], axisX = axis.x, axisY = axis.y, minA = verticesAX * axisX + verticesAY * axisY, minB = verticesBX * axisX + verticesBY * axisY, maxA = minA, maxB = minB;
              for (j = 1;j < verticesALength; j += 1) {
                dot = verticesA[j].x * axisX + verticesA[j].y * axisY;
                if (dot > maxA) {
                  maxA = dot;
                } else if (dot < minA) {
                  minA = dot;
                }
              }
              for (j = 1;j < verticesBLength; j += 1) {
                dot = verticesB[j].x * axisX + verticesB[j].y * axisY;
                if (dot > maxB) {
                  maxB = dot;
                } else if (dot < minB) {
                  minB = dot;
                }
              }
              overlapAB = maxA - minB;
              overlapBA = maxB - minA;
              overlap = overlapAB < overlapBA ? overlapAB : overlapBA;
              if (overlap < overlapMin) {
                overlapMin = overlap;
                overlapAxisNumber = i;
                if (overlap <= 0) {
                  break;
                }
              }
            }
            result.axis = axes[overlapAxisNumber];
            result.overlap = overlapMin;
          };
          Collision._findSupports = function(bodyA, bodyB, normal, direction) {
            var vertices = bodyB.vertices, verticesLength = vertices.length, bodyAPositionX = bodyA.position.x, bodyAPositionY = bodyA.position.y, normalX = normal.x * direction, normalY = normal.y * direction, vertexA = vertices[0], vertexB = vertexA, nearestDistance = normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y), vertexC, distance, j;
            for (j = 1;j < verticesLength; j += 1) {
              vertexB = vertices[j];
              distance = normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y);
              if (distance < nearestDistance) {
                nearestDistance = distance;
                vertexA = vertexB;
              }
            }
            vertexC = vertices[(verticesLength + vertexA.index - 1) % verticesLength];
            nearestDistance = normalX * (bodyAPositionX - vertexC.x) + normalY * (bodyAPositionY - vertexC.y);
            vertexB = vertices[(vertexA.index + 1) % verticesLength];
            if (normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y) < nearestDistance) {
              _supports[0] = vertexA;
              _supports[1] = vertexB;
              return _supports;
            }
            _supports[0] = vertexA;
            _supports[1] = vertexC;
            return _supports;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Pair = {};
        module2.exports = Pair;
        var Contact = __webpack_require__(16);
        (function() {
          Pair.create = function(collision, timestamp) {
            var { bodyA, bodyB } = collision;
            var pair = {
              id: Pair.id(bodyA, bodyB),
              bodyA,
              bodyB,
              collision,
              contacts: [Contact.create(), Contact.create()],
              contactCount: 0,
              separation: 0,
              isActive: true,
              isSensor: bodyA.isSensor || bodyB.isSensor,
              timeCreated: timestamp,
              timeUpdated: timestamp,
              inverseMass: 0,
              friction: 0,
              frictionStatic: 0,
              restitution: 0,
              slop: 0
            };
            Pair.update(pair, collision, timestamp);
            return pair;
          };
          Pair.update = function(pair, collision, timestamp) {
            var { supports, supportCount } = collision, contacts = pair.contacts, parentA = collision.parentA, parentB = collision.parentB;
            pair.isActive = true;
            pair.timeUpdated = timestamp;
            pair.collision = collision;
            pair.separation = collision.depth;
            pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
            pair.friction = parentA.friction < parentB.friction ? parentA.friction : parentB.friction;
            pair.frictionStatic = parentA.frictionStatic > parentB.frictionStatic ? parentA.frictionStatic : parentB.frictionStatic;
            pair.restitution = parentA.restitution > parentB.restitution ? parentA.restitution : parentB.restitution;
            pair.slop = parentA.slop > parentB.slop ? parentA.slop : parentB.slop;
            pair.contactCount = supportCount;
            collision.pair = pair;
            var supportA = supports[0], contactA = contacts[0], supportB = supports[1], contactB = contacts[1];
            if (contactB.vertex === supportA || contactA.vertex === supportB) {
              contacts[1] = contactA;
              contacts[0] = contactA = contactB;
              contactB = contacts[1];
            }
            contactA.vertex = supportA;
            contactB.vertex = supportB;
          };
          Pair.setActive = function(pair, isActive, timestamp) {
            if (isActive) {
              pair.isActive = true;
              pair.timeUpdated = timestamp;
            } else {
              pair.isActive = false;
              pair.contactCount = 0;
            }
          };
          Pair.id = function(bodyA, bodyB) {
            return bodyA.id < bodyB.id ? bodyA.id.toString(36) + ":" + bodyB.id.toString(36) : bodyB.id.toString(36) + ":" + bodyA.id.toString(36);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Constraint = {};
        module2.exports = Constraint;
        var Vertices = __webpack_require__(3);
        var Vector2 = __webpack_require__(2);
        var Sleeping = __webpack_require__(7);
        var Bounds = __webpack_require__(1);
        var Axes = __webpack_require__(11);
        var Common = __webpack_require__(0);
        (function() {
          Constraint._warming = 0.4;
          Constraint._torqueDampen = 1;
          Constraint._minLength = 0.000001;
          Constraint.create = function(options) {
            var constraint = options;
            if (constraint.bodyA && !constraint.pointA)
              constraint.pointA = { x: 0, y: 0 };
            if (constraint.bodyB && !constraint.pointB)
              constraint.pointB = { x: 0, y: 0 };
            var initialPointA = constraint.bodyA ? Vector2.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA, initialPointB = constraint.bodyB ? Vector2.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB, length = Vector2.magnitude(Vector2.sub(initialPointA, initialPointB));
            constraint.length = typeof constraint.length !== "undefined" ? constraint.length : length;
            constraint.id = constraint.id || Common.nextId();
            constraint.label = constraint.label || "Constraint";
            constraint.type = "constraint";
            constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
            constraint.damping = constraint.damping || 0;
            constraint.angularStiffness = constraint.angularStiffness || 0;
            constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
            constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
            constraint.plugin = {};
            var render = {
              visible: true,
              lineWidth: 2,
              strokeStyle: "#ffffff",
              type: "line",
              anchors: true
            };
            if (constraint.length === 0 && constraint.stiffness > 0.1) {
              render.type = "pin";
              render.anchors = false;
            } else if (constraint.stiffness < 0.9) {
              render.type = "spring";
            }
            constraint.render = Common.extend(render, constraint.render);
            return constraint;
          };
          Constraint.preSolveAll = function(bodies) {
            for (var i = 0;i < bodies.length; i += 1) {
              var body = bodies[i], impulse = body.constraintImpulse;
              if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                continue;
              }
              body.position.x += impulse.x;
              body.position.y += impulse.y;
              body.angle += impulse.angle;
            }
          };
          Constraint.solveAll = function(constraints, delta) {
            var timeScale = Common.clamp(delta / Common._baseDelta, 0, 1);
            for (var i = 0;i < constraints.length; i += 1) {
              var constraint = constraints[i], fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic, fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
              if (fixedA || fixedB) {
                Constraint.solve(constraints[i], timeScale);
              }
            }
            for (i = 0;i < constraints.length; i += 1) {
              constraint = constraints[i];
              fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic;
              fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
              if (!fixedA && !fixedB) {
                Constraint.solve(constraints[i], timeScale);
              }
            }
          };
          Constraint.solve = function(constraint, timeScale) {
            var { bodyA, bodyB, pointA, pointB } = constraint;
            if (!bodyA && !bodyB)
              return;
            if (bodyA && !bodyA.isStatic) {
              Vector2.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
              constraint.angleA = bodyA.angle;
            }
            if (bodyB && !bodyB.isStatic) {
              Vector2.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
              constraint.angleB = bodyB.angle;
            }
            var pointAWorld = pointA, pointBWorld = pointB;
            if (bodyA)
              pointAWorld = Vector2.add(bodyA.position, pointA);
            if (bodyB)
              pointBWorld = Vector2.add(bodyB.position, pointB);
            if (!pointAWorld || !pointBWorld)
              return;
            var delta = Vector2.sub(pointAWorld, pointBWorld), currentLength = Vector2.magnitude(delta);
            if (currentLength < Constraint._minLength) {
              currentLength = Constraint._minLength;
            }
            var difference = (currentLength - constraint.length) / currentLength, isRigid = constraint.stiffness >= 1 || constraint.length === 0, stiffness = isRigid ? constraint.stiffness * timeScale : constraint.stiffness * timeScale * timeScale, damping = constraint.damping * timeScale, force = Vector2.mult(delta, difference * stiffness), massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0), inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0), resistanceTotal = massTotal + inertiaTotal, torque, share, normal, normalVelocity, relativeVelocity;
            if (damping > 0) {
              var zero = Vector2.create();
              normal = Vector2.div(delta, currentLength);
              relativeVelocity = Vector2.sub(bodyB && Vector2.sub(bodyB.position, bodyB.positionPrev) || zero, bodyA && Vector2.sub(bodyA.position, bodyA.positionPrev) || zero);
              normalVelocity = Vector2.dot(normal, relativeVelocity);
            }
            if (bodyA && !bodyA.isStatic) {
              share = bodyA.inverseMass / massTotal;
              bodyA.constraintImpulse.x -= force.x * share;
              bodyA.constraintImpulse.y -= force.y * share;
              bodyA.position.x -= force.x * share;
              bodyA.position.y -= force.y * share;
              if (damping > 0) {
                bodyA.positionPrev.x -= damping * normal.x * normalVelocity * share;
                bodyA.positionPrev.y -= damping * normal.y * normalVelocity * share;
              }
              torque = Vector2.cross(pointA, force) / resistanceTotal * Constraint._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
              bodyA.constraintImpulse.angle -= torque;
              bodyA.angle -= torque;
            }
            if (bodyB && !bodyB.isStatic) {
              share = bodyB.inverseMass / massTotal;
              bodyB.constraintImpulse.x += force.x * share;
              bodyB.constraintImpulse.y += force.y * share;
              bodyB.position.x += force.x * share;
              bodyB.position.y += force.y * share;
              if (damping > 0) {
                bodyB.positionPrev.x += damping * normal.x * normalVelocity * share;
                bodyB.positionPrev.y += damping * normal.y * normalVelocity * share;
              }
              torque = Vector2.cross(pointB, force) / resistanceTotal * Constraint._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
              bodyB.constraintImpulse.angle += torque;
              bodyB.angle += torque;
            }
          };
          Constraint.postSolveAll = function(bodies) {
            for (var i = 0;i < bodies.length; i++) {
              var body = bodies[i], impulse = body.constraintImpulse;
              if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                continue;
              }
              Sleeping.set(body, false);
              for (var j = 0;j < body.parts.length; j++) {
                var part = body.parts[j];
                Vertices.translate(part.vertices, impulse);
                if (j > 0) {
                  part.position.x += impulse.x;
                  part.position.y += impulse.y;
                }
                if (impulse.angle !== 0) {
                  Vertices.rotate(part.vertices, impulse.angle, body.position);
                  Axes.rotate(part.axes, impulse.angle);
                  if (j > 0) {
                    Vector2.rotateAbout(part.position, impulse.angle, body.position, part.position);
                  }
                }
                Bounds.update(part.bounds, part.vertices, body.velocity);
              }
              impulse.angle *= Constraint._warming;
              impulse.x *= Constraint._warming;
              impulse.y *= Constraint._warming;
            }
          };
          Constraint.pointAWorld = function(constraint) {
            return {
              x: (constraint.bodyA ? constraint.bodyA.position.x : 0) + (constraint.pointA ? constraint.pointA.x : 0),
              y: (constraint.bodyA ? constraint.bodyA.position.y : 0) + (constraint.pointA ? constraint.pointA.y : 0)
            };
          };
          Constraint.pointBWorld = function(constraint) {
            return {
              x: (constraint.bodyB ? constraint.bodyB.position.x : 0) + (constraint.pointB ? constraint.pointB.x : 0),
              y: (constraint.bodyB ? constraint.bodyB.position.y : 0) + (constraint.pointB ? constraint.pointB.y : 0)
            };
          };
          Constraint.currentLength = function(constraint) {
            var pointAX = (constraint.bodyA ? constraint.bodyA.position.x : 0) + (constraint.pointA ? constraint.pointA.x : 0);
            var pointAY = (constraint.bodyA ? constraint.bodyA.position.y : 0) + (constraint.pointA ? constraint.pointA.y : 0);
            var pointBX = (constraint.bodyB ? constraint.bodyB.position.x : 0) + (constraint.pointB ? constraint.pointB.x : 0);
            var pointBY = (constraint.bodyB ? constraint.bodyB.position.y : 0) + (constraint.pointB ? constraint.pointB.y : 0);
            var deltaX = pointAX - pointBX;
            var deltaY = pointAY - pointBY;
            return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Axes = {};
        module2.exports = Axes;
        var Vector2 = __webpack_require__(2);
        var Common = __webpack_require__(0);
        (function() {
          Axes.fromVertices = function(vertices) {
            var axes = {};
            for (var i = 0;i < vertices.length; i++) {
              var j = (i + 1) % vertices.length, normal = Vector2.normalise({
                x: vertices[j].y - vertices[i].y,
                y: vertices[i].x - vertices[j].x
              }), gradient = normal.y === 0 ? Infinity : normal.x / normal.y;
              gradient = gradient.toFixed(3).toString();
              axes[gradient] = normal;
            }
            return Common.values(axes);
          };
          Axes.rotate = function(axes, angle) {
            if (angle === 0)
              return;
            var cos = Math.cos(angle), sin = Math.sin(angle);
            for (var i = 0;i < axes.length; i++) {
              var axis = axes[i], xx;
              xx = axis.x * cos - axis.y * sin;
              axis.y = axis.x * sin + axis.y * cos;
              axis.x = xx;
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Bodies = {};
        module2.exports = Bodies;
        var Vertices = __webpack_require__(3);
        var Common = __webpack_require__(0);
        var Body = __webpack_require__(4);
        var Bounds = __webpack_require__(1);
        var Vector2 = __webpack_require__(2);
        (function() {
          Bodies.rectangle = function(x, y, width, height, options) {
            options = options || {};
            var rectangle = {
              label: "Rectangle Body",
              position: { x, y },
              vertices: Vertices.fromPath("L 0 0 L " + width + " 0 L " + width + " " + height + " L 0 " + height)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              rectangle.vertices = Vertices.chamfer(rectangle.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
              delete options.chamfer;
            }
            return Body.create(Common.extend({}, rectangle, options));
          };
          Bodies.trapezoid = function(x, y, width, height, slope, options) {
            options = options || {};
            if (slope >= 1) {
              Common.warn("Bodies.trapezoid: slope parameter must be < 1.");
            }
            slope *= 0.5;
            var roof = (1 - slope * 2) * width;
            var x1 = width * slope, x2 = x1 + roof, x3 = x2 + x1, verticesPath;
            if (slope < 0.5) {
              verticesPath = "L 0 0 L " + x1 + " " + -height + " L " + x2 + " " + -height + " L " + x3 + " 0";
            } else {
              verticesPath = "L 0 0 L " + x2 + " " + -height + " L " + x3 + " 0";
            }
            var trapezoid = {
              label: "Trapezoid Body",
              position: { x, y },
              vertices: Vertices.fromPath(verticesPath)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              trapezoid.vertices = Vertices.chamfer(trapezoid.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
              delete options.chamfer;
            }
            return Body.create(Common.extend({}, trapezoid, options));
          };
          Bodies.circle = function(x, y, radius, options, maxSides) {
            options = options || {};
            var circle = {
              label: "Circle Body",
              circleRadius: radius
            };
            maxSides = maxSides || 25;
            var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));
            if (sides % 2 === 1)
              sides += 1;
            return Bodies.polygon(x, y, sides, radius, Common.extend({}, circle, options));
          };
          Bodies.polygon = function(x, y, sides, radius, options) {
            options = options || {};
            if (sides < 3)
              return Bodies.circle(x, y, radius, options);
            var theta = 2 * Math.PI / sides, path = "", offset = theta * 0.5;
            for (var i = 0;i < sides; i += 1) {
              var angle = offset + i * theta, xx = Math.cos(angle) * radius, yy = Math.sin(angle) * radius;
              path += "L " + xx.toFixed(3) + " " + yy.toFixed(3) + " ";
            }
            var polygon = {
              label: "Polygon Body",
              position: { x, y },
              vertices: Vertices.fromPath(path)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              polygon.vertices = Vertices.chamfer(polygon.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
              delete options.chamfer;
            }
            return Body.create(Common.extend({}, polygon, options));
          };
          Bodies.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea, removeDuplicatePoints) {
            var decomp = Common.getDecomp(), canDecomp, body, parts, isConvex, isConcave, vertices, i, j, k, v, z;
            canDecomp = Boolean(decomp && decomp.quickDecomp);
            options = options || {};
            parts = [];
            flagInternal = typeof flagInternal !== "undefined" ? flagInternal : false;
            removeCollinear = typeof removeCollinear !== "undefined" ? removeCollinear : 0.01;
            minimumArea = typeof minimumArea !== "undefined" ? minimumArea : 10;
            removeDuplicatePoints = typeof removeDuplicatePoints !== "undefined" ? removeDuplicatePoints : 0.01;
            if (!Common.isArray(vertexSets[0])) {
              vertexSets = [vertexSets];
            }
            for (v = 0;v < vertexSets.length; v += 1) {
              vertices = vertexSets[v];
              isConvex = Vertices.isConvex(vertices);
              isConcave = !isConvex;
              if (isConcave && !canDecomp) {
                Common.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices.");
              }
              if (isConvex || !canDecomp) {
                if (isConvex) {
                  vertices = Vertices.clockwiseSort(vertices);
                } else {
                  vertices = Vertices.hull(vertices);
                }
                parts.push({
                  position: { x, y },
                  vertices
                });
              } else {
                var concave = vertices.map(function(vertex) {
                  return [vertex.x, vertex.y];
                });
                decomp.makeCCW(concave);
                if (removeCollinear !== false)
                  decomp.removeCollinearPoints(concave, removeCollinear);
                if (removeDuplicatePoints !== false && decomp.removeDuplicatePoints)
                  decomp.removeDuplicatePoints(concave, removeDuplicatePoints);
                var decomposed = decomp.quickDecomp(concave);
                for (i = 0;i < decomposed.length; i++) {
                  var chunk = decomposed[i];
                  var chunkVertices = chunk.map(function(vertices2) {
                    return {
                      x: vertices2[0],
                      y: vertices2[1]
                    };
                  });
                  if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
                    continue;
                  parts.push({
                    position: Vertices.centre(chunkVertices),
                    vertices: chunkVertices
                  });
                }
              }
            }
            for (i = 0;i < parts.length; i++) {
              parts[i] = Body.create(Common.extend(parts[i], options));
            }
            if (flagInternal) {
              var coincident_max_dist = 5;
              for (i = 0;i < parts.length; i++) {
                var partA = parts[i];
                for (j = i + 1;j < parts.length; j++) {
                  var partB = parts[j];
                  if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                    var pav = partA.vertices, pbv = partB.vertices;
                    for (k = 0;k < partA.vertices.length; k++) {
                      for (z = 0;z < partB.vertices.length; z++) {
                        var da = Vector2.magnitudeSquared(Vector2.sub(pav[(k + 1) % pav.length], pbv[z])), db = Vector2.magnitudeSquared(Vector2.sub(pav[k], pbv[(z + 1) % pbv.length]));
                        if (da < coincident_max_dist && db < coincident_max_dist) {
                          pav[k].isInternal = true;
                          pbv[z].isInternal = true;
                        }
                      }
                    }
                  }
                }
              }
            }
            if (parts.length > 1) {
              body = Body.create(Common.extend({ parts: parts.slice(0) }, options));
              Body.setPosition(body, { x, y });
              return body;
            } else {
              return parts[0];
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Detector = {};
        module2.exports = Detector;
        var Common = __webpack_require__(0);
        var Collision = __webpack_require__(8);
        (function() {
          Detector.create = function(options) {
            var defaults = {
              bodies: [],
              collisions: [],
              pairs: null
            };
            return Common.extend(defaults, options);
          };
          Detector.setBodies = function(detector, bodies) {
            detector.bodies = bodies.slice(0);
          };
          Detector.clear = function(detector) {
            detector.bodies = [];
            detector.collisions = [];
          };
          Detector.collisions = function(detector) {
            var { pairs, bodies } = detector, bodiesLength = bodies.length, canCollide = Detector.canCollide, collides = Collision.collides, collisions = detector.collisions, collisionIndex = 0, i, j;
            bodies.sort(Detector._compareBoundsX);
            for (i = 0;i < bodiesLength; i++) {
              var bodyA = bodies[i], boundsA = bodyA.bounds, boundXMax = bodyA.bounds.max.x, boundYMax = bodyA.bounds.max.y, boundYMin = bodyA.bounds.min.y, bodyAStatic = bodyA.isStatic || bodyA.isSleeping, partsALength = bodyA.parts.length, partsASingle = partsALength === 1;
              for (j = i + 1;j < bodiesLength; j++) {
                var bodyB = bodies[j], boundsB = bodyB.bounds;
                if (boundsB.min.x > boundXMax) {
                  break;
                }
                if (boundYMax < boundsB.min.y || boundYMin > boundsB.max.y) {
                  continue;
                }
                if (bodyAStatic && (bodyB.isStatic || bodyB.isSleeping)) {
                  continue;
                }
                if (!canCollide(bodyA.collisionFilter, bodyB.collisionFilter)) {
                  continue;
                }
                var partsBLength = bodyB.parts.length;
                if (partsASingle && partsBLength === 1) {
                  var collision = collides(bodyA, bodyB, pairs);
                  if (collision) {
                    collisions[collisionIndex++] = collision;
                  }
                } else {
                  var partsAStart = partsALength > 1 ? 1 : 0, partsBStart = partsBLength > 1 ? 1 : 0;
                  for (var k = partsAStart;k < partsALength; k++) {
                    var partA = bodyA.parts[k], boundsA = partA.bounds;
                    for (var z = partsBStart;z < partsBLength; z++) {
                      var partB = bodyB.parts[z], boundsB = partB.bounds;
                      if (boundsA.min.x > boundsB.max.x || boundsA.max.x < boundsB.min.x || boundsA.max.y < boundsB.min.y || boundsA.min.y > boundsB.max.y) {
                        continue;
                      }
                      var collision = collides(partA, partB, pairs);
                      if (collision) {
                        collisions[collisionIndex++] = collision;
                      }
                    }
                  }
                }
              }
            }
            if (collisions.length !== collisionIndex) {
              collisions.length = collisionIndex;
            }
            return collisions;
          };
          Detector.canCollide = function(filterA, filterB) {
            if (filterA.group === filterB.group && filterA.group !== 0)
              return filterA.group > 0;
            return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
          };
          Detector._compareBoundsX = function(bodyA, bodyB) {
            return bodyA.bounds.min.x - bodyB.bounds.min.x;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Mouse = {};
        module2.exports = Mouse;
        var Common = __webpack_require__(0);
        (function() {
          Mouse.create = function(element) {
            var mouse = {};
            if (!element) {
              Common.log("Mouse.create: element was undefined, defaulting to document.body", "warn");
            }
            mouse.element = element || document.body;
            mouse.absolute = { x: 0, y: 0 };
            mouse.position = { x: 0, y: 0 };
            mouse.mousedownPosition = { x: 0, y: 0 };
            mouse.mouseupPosition = { x: 0, y: 0 };
            mouse.offset = { x: 0, y: 0 };
            mouse.scale = { x: 1, y: 1 };
            mouse.wheelDelta = 0;
            mouse.button = -1;
            mouse.pixelRatio = parseInt(mouse.element.getAttribute("data-pixel-ratio"), 10) || 1;
            mouse.sourceEvents = {
              mousemove: null,
              mousedown: null,
              mouseup: null,
              mousewheel: null
            };
            mouse.mousemove = function(event) {
              var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                mouse.button = 0;
                event.preventDefault();
              }
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.sourceEvents.mousemove = event;
            };
            mouse.mousedown = function(event) {
              var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                mouse.button = 0;
                event.preventDefault();
              } else {
                mouse.button = event.button;
              }
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.mousedownPosition.x = mouse.position.x;
              mouse.mousedownPosition.y = mouse.position.y;
              mouse.sourceEvents.mousedown = event;
            };
            mouse.mouseup = function(event) {
              var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                event.preventDefault();
              }
              mouse.button = -1;
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.mouseupPosition.x = mouse.position.x;
              mouse.mouseupPosition.y = mouse.position.y;
              mouse.sourceEvents.mouseup = event;
            };
            mouse.mousewheel = function(event) {
              mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
              event.preventDefault();
              mouse.sourceEvents.mousewheel = event;
            };
            Mouse.setElement(mouse, mouse.element);
            return mouse;
          };
          Mouse.setElement = function(mouse, element) {
            mouse.element = element;
            element.addEventListener("mousemove", mouse.mousemove, { passive: true });
            element.addEventListener("mousedown", mouse.mousedown, { passive: true });
            element.addEventListener("mouseup", mouse.mouseup, { passive: true });
            element.addEventListener("wheel", mouse.mousewheel, { passive: false });
            element.addEventListener("touchmove", mouse.mousemove, { passive: false });
            element.addEventListener("touchstart", mouse.mousedown, { passive: false });
            element.addEventListener("touchend", mouse.mouseup, { passive: false });
          };
          Mouse.clearSourceEvents = function(mouse) {
            mouse.sourceEvents.mousemove = null;
            mouse.sourceEvents.mousedown = null;
            mouse.sourceEvents.mouseup = null;
            mouse.sourceEvents.mousewheel = null;
            mouse.wheelDelta = 0;
          };
          Mouse.setOffset = function(mouse, offset) {
            mouse.offset.x = offset.x;
            mouse.offset.y = offset.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
          };
          Mouse.setScale = function(mouse, scale) {
            mouse.scale.x = scale.x;
            mouse.scale.y = scale.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
          };
          Mouse._getRelativeMousePosition = function(event, element, pixelRatio) {
            var elementBounds = element.getBoundingClientRect(), rootNode = document.documentElement || document.body.parentNode || document.body, scrollX = window.pageXOffset !== undefined ? window.pageXOffset : rootNode.scrollLeft, scrollY = window.pageYOffset !== undefined ? window.pageYOffset : rootNode.scrollTop, touches = event.changedTouches, x, y;
            if (touches) {
              x = touches[0].pageX - elementBounds.left - scrollX;
              y = touches[0].pageY - elementBounds.top - scrollY;
            } else {
              x = event.pageX - elementBounds.left - scrollX;
              y = event.pageY - elementBounds.top - scrollY;
            }
            return {
              x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
              y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
            };
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Plugin = {};
        module2.exports = Plugin;
        var Common = __webpack_require__(0);
        (function() {
          Plugin._registry = {};
          Plugin.register = function(plugin) {
            if (!Plugin.isPlugin(plugin)) {
              Common.warn("Plugin.register:", Plugin.toString(plugin), "does not implement all required fields.");
            }
            if (plugin.name in Plugin._registry) {
              var registered = Plugin._registry[plugin.name], pluginVersion = Plugin.versionParse(plugin.version).number, registeredVersion = Plugin.versionParse(registered.version).number;
              if (pluginVersion > registeredVersion) {
                Common.warn("Plugin.register:", Plugin.toString(registered), "was upgraded to", Plugin.toString(plugin));
                Plugin._registry[plugin.name] = plugin;
              } else if (pluginVersion < registeredVersion) {
                Common.warn("Plugin.register:", Plugin.toString(registered), "can not be downgraded to", Plugin.toString(plugin));
              } else if (plugin !== registered) {
                Common.warn("Plugin.register:", Plugin.toString(plugin), "is already registered to different plugin object");
              }
            } else {
              Plugin._registry[plugin.name] = plugin;
            }
            return plugin;
          };
          Plugin.resolve = function(dependency) {
            return Plugin._registry[Plugin.dependencyParse(dependency).name];
          };
          Plugin.toString = function(plugin) {
            return typeof plugin === "string" ? plugin : (plugin.name || "anonymous") + "@" + (plugin.version || plugin.range || "0.0.0");
          };
          Plugin.isPlugin = function(obj) {
            return obj && obj.name && obj.version && obj.install;
          };
          Plugin.isUsed = function(module3, name) {
            return module3.used.indexOf(name) > -1;
          };
          Plugin.isFor = function(plugin, module3) {
            var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
            return !plugin.for || module3.name === parsed.name && Plugin.versionSatisfies(module3.version, parsed.range);
          };
          Plugin.use = function(module3, plugins) {
            module3.uses = (module3.uses || []).concat(plugins || []);
            if (module3.uses.length === 0) {
              Common.warn("Plugin.use:", Plugin.toString(module3), "does not specify any dependencies to install.");
              return;
            }
            var dependencies = Plugin.dependencies(module3), sortedDependencies = Common.topologicalSort(dependencies), status = [];
            for (var i = 0;i < sortedDependencies.length; i += 1) {
              if (sortedDependencies[i] === module3.name) {
                continue;
              }
              var plugin = Plugin.resolve(sortedDependencies[i]);
              if (!plugin) {
                status.push("❌ " + sortedDependencies[i]);
                continue;
              }
              if (Plugin.isUsed(module3, plugin.name)) {
                continue;
              }
              if (!Plugin.isFor(plugin, module3)) {
                Common.warn("Plugin.use:", Plugin.toString(plugin), "is for", plugin.for, "but installed on", Plugin.toString(module3) + ".");
                plugin._warned = true;
              }
              if (plugin.install) {
                plugin.install(module3);
              } else {
                Common.warn("Plugin.use:", Plugin.toString(plugin), "does not specify an install function.");
                plugin._warned = true;
              }
              if (plugin._warned) {
                status.push("\uD83D\uDD36 " + Plugin.toString(plugin));
                delete plugin._warned;
              } else {
                status.push("✅ " + Plugin.toString(plugin));
              }
              module3.used.push(plugin.name);
            }
            if (status.length > 0) {
              Common.info(status.join("  "));
            }
          };
          Plugin.dependencies = function(module3, tracked) {
            var parsedBase = Plugin.dependencyParse(module3), name = parsedBase.name;
            tracked = tracked || {};
            if (name in tracked) {
              return;
            }
            module3 = Plugin.resolve(module3) || module3;
            tracked[name] = Common.map(module3.uses || [], function(dependency) {
              if (Plugin.isPlugin(dependency)) {
                Plugin.register(dependency);
              }
              var parsed = Plugin.dependencyParse(dependency), resolved = Plugin.resolve(dependency);
              if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
                Common.warn("Plugin.dependencies:", Plugin.toString(resolved), "does not satisfy", Plugin.toString(parsed), "used by", Plugin.toString(parsedBase) + ".");
                resolved._warned = true;
                module3._warned = true;
              } else if (!resolved) {
                Common.warn("Plugin.dependencies:", Plugin.toString(dependency), "used by", Plugin.toString(parsedBase), "could not be resolved.");
                module3._warned = true;
              }
              return parsed.name;
            });
            for (var i = 0;i < tracked[name].length; i += 1) {
              Plugin.dependencies(tracked[name][i], tracked);
            }
            return tracked;
          };
          Plugin.dependencyParse = function(dependency) {
            if (Common.isString(dependency)) {
              var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;
              if (!pattern.test(dependency)) {
                Common.warn("Plugin.dependencyParse:", dependency, "is not a valid dependency string.");
              }
              return {
                name: dependency.split("@")[0],
                range: dependency.split("@")[1] || "*"
              };
            }
            return {
              name: dependency.name,
              range: dependency.range || dependency.version
            };
          };
          Plugin.versionParse = function(range) {
            var pattern = /^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;
            if (!pattern.test(range)) {
              Common.warn("Plugin.versionParse:", range, "is not a valid version or range.");
            }
            var parts = pattern.exec(range);
            var major = Number(parts[4]);
            var minor = Number(parts[5]);
            var patch = Number(parts[6]);
            return {
              isRange: Boolean(parts[1] || parts[2]),
              version: parts[3],
              range,
              operator: parts[1] || parts[2] || "",
              major,
              minor,
              patch,
              parts: [major, minor, patch],
              prerelease: parts[7],
              number: major * 1e8 + minor * 1e4 + patch
            };
          };
          Plugin.versionSatisfies = function(version, range) {
            range = range || "*";
            var r = Plugin.versionParse(range), v = Plugin.versionParse(version);
            if (r.isRange) {
              if (r.operator === "*" || version === "*") {
                return true;
              }
              if (r.operator === ">") {
                return v.number > r.number;
              }
              if (r.operator === ">=") {
                return v.number >= r.number;
              }
              if (r.operator === "~") {
                return v.major === r.major && v.minor === r.minor && v.patch >= r.patch;
              }
              if (r.operator === "^") {
                if (r.major > 0) {
                  return v.major === r.major && v.number >= r.number;
                }
                if (r.minor > 0) {
                  return v.minor === r.minor && v.patch >= r.patch;
                }
                return v.patch === r.patch;
              }
            }
            return version === range || version === "*";
          };
        })();
      },
      function(module2, exports2) {
        var Contact = {};
        module2.exports = Contact;
        (function() {
          Contact.create = function(vertex) {
            return {
              vertex,
              normalImpulse: 0,
              tangentImpulse: 0
            };
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Engine = {};
        module2.exports = Engine;
        var Sleeping = __webpack_require__(7);
        var Resolver = __webpack_require__(18);
        var Detector = __webpack_require__(13);
        var Pairs = __webpack_require__(19);
        var Events = __webpack_require__(5);
        var Composite = __webpack_require__(6);
        var Constraint = __webpack_require__(10);
        var Common = __webpack_require__(0);
        var Body = __webpack_require__(4);
        (function() {
          Engine._deltaMax = 1000 / 60;
          Engine.create = function(options) {
            options = options || {};
            var defaults = {
              positionIterations: 6,
              velocityIterations: 4,
              constraintIterations: 2,
              enableSleeping: false,
              events: [],
              plugin: {},
              gravity: {
                x: 0,
                y: 1,
                scale: 0.001
              },
              timing: {
                timestamp: 0,
                timeScale: 1,
                lastDelta: 0,
                lastElapsed: 0,
                lastUpdatesPerFrame: 0
              }
            };
            var engine = Common.extend(defaults, options);
            engine.world = options.world || Composite.create({ label: "World" });
            engine.pairs = options.pairs || Pairs.create();
            engine.detector = options.detector || Detector.create();
            engine.detector.pairs = engine.pairs;
            engine.grid = { buckets: [] };
            engine.world.gravity = engine.gravity;
            engine.broadphase = engine.grid;
            engine.metrics = {};
            return engine;
          };
          Engine.update = function(engine, delta) {
            var startTime = Common.now();
            var { world, detector, pairs, timing } = engine, timestamp = timing.timestamp, i;
            if (delta > Engine._deltaMax) {
              Common.warnOnce("Matter.Engine.update: delta argument is recommended to be less than or equal to", Engine._deltaMax.toFixed(3), "ms.");
            }
            delta = typeof delta !== "undefined" ? delta : Common._baseDelta;
            delta *= timing.timeScale;
            timing.timestamp += delta;
            timing.lastDelta = delta;
            var event = {
              timestamp: timing.timestamp,
              delta
            };
            Events.trigger(engine, "beforeUpdate", event);
            var allBodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world);
            if (world.isModified) {
              Detector.setBodies(detector, allBodies);
              Composite.setModified(world, false, false, true);
            }
            if (engine.enableSleeping)
              Sleeping.update(allBodies, delta);
            Engine._bodiesApplyGravity(allBodies, engine.gravity);
            if (delta > 0) {
              Engine._bodiesUpdate(allBodies, delta);
            }
            Events.trigger(engine, "beforeSolve", event);
            Constraint.preSolveAll(allBodies);
            for (i = 0;i < engine.constraintIterations; i++) {
              Constraint.solveAll(allConstraints, delta);
            }
            Constraint.postSolveAll(allBodies);
            var collisions = Detector.collisions(detector);
            Pairs.update(pairs, collisions, timestamp);
            if (engine.enableSleeping)
              Sleeping.afterCollisions(pairs.list);
            if (pairs.collisionStart.length > 0) {
              Events.trigger(engine, "collisionStart", {
                pairs: pairs.collisionStart,
                timestamp: timing.timestamp,
                delta
              });
            }
            var positionDamping = Common.clamp(20 / engine.positionIterations, 0, 1);
            Resolver.preSolvePosition(pairs.list);
            for (i = 0;i < engine.positionIterations; i++) {
              Resolver.solvePosition(pairs.list, delta, positionDamping);
            }
            Resolver.postSolvePosition(allBodies);
            Constraint.preSolveAll(allBodies);
            for (i = 0;i < engine.constraintIterations; i++) {
              Constraint.solveAll(allConstraints, delta);
            }
            Constraint.postSolveAll(allBodies);
            Resolver.preSolveVelocity(pairs.list);
            for (i = 0;i < engine.velocityIterations; i++) {
              Resolver.solveVelocity(pairs.list, delta);
            }
            Engine._bodiesUpdateVelocities(allBodies);
            if (pairs.collisionActive.length > 0) {
              Events.trigger(engine, "collisionActive", {
                pairs: pairs.collisionActive,
                timestamp: timing.timestamp,
                delta
              });
            }
            if (pairs.collisionEnd.length > 0) {
              Events.trigger(engine, "collisionEnd", {
                pairs: pairs.collisionEnd,
                timestamp: timing.timestamp,
                delta
              });
            }
            Engine._bodiesClearForces(allBodies);
            Events.trigger(engine, "afterUpdate", event);
            engine.timing.lastElapsed = Common.now() - startTime;
            return engine;
          };
          Engine.merge = function(engineA, engineB) {
            Common.extend(engineA, engineB);
            if (engineB.world) {
              engineA.world = engineB.world;
              Engine.clear(engineA);
              var bodies = Composite.allBodies(engineA.world);
              for (var i = 0;i < bodies.length; i++) {
                var body = bodies[i];
                Sleeping.set(body, false);
                body.id = Common.nextId();
              }
            }
          };
          Engine.clear = function(engine) {
            Pairs.clear(engine.pairs);
            Detector.clear(engine.detector);
          };
          Engine._bodiesClearForces = function(bodies) {
            var bodiesLength = bodies.length;
            for (var i = 0;i < bodiesLength; i++) {
              var body = bodies[i];
              body.force.x = 0;
              body.force.y = 0;
              body.torque = 0;
            }
          };
          Engine._bodiesApplyGravity = function(bodies, gravity) {
            var gravityScale = typeof gravity.scale !== "undefined" ? gravity.scale : 0.001, bodiesLength = bodies.length;
            if (gravity.x === 0 && gravity.y === 0 || gravityScale === 0) {
              return;
            }
            for (var i = 0;i < bodiesLength; i++) {
              var body = bodies[i];
              if (body.isStatic || body.isSleeping)
                continue;
              body.force.y += body.mass * gravity.y * gravityScale;
              body.force.x += body.mass * gravity.x * gravityScale;
            }
          };
          Engine._bodiesUpdate = function(bodies, delta) {
            var bodiesLength = bodies.length;
            for (var i = 0;i < bodiesLength; i++) {
              var body = bodies[i];
              if (body.isStatic || body.isSleeping)
                continue;
              Body.update(body, delta);
            }
          };
          Engine._bodiesUpdateVelocities = function(bodies) {
            var bodiesLength = bodies.length;
            for (var i = 0;i < bodiesLength; i++) {
              Body.updateVelocities(bodies[i]);
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Resolver = {};
        module2.exports = Resolver;
        var Vertices = __webpack_require__(3);
        var Common = __webpack_require__(0);
        var Bounds = __webpack_require__(1);
        (function() {
          Resolver._restingThresh = 2;
          Resolver._restingThreshTangent = Math.sqrt(6);
          Resolver._positionDampen = 0.9;
          Resolver._positionWarming = 0.8;
          Resolver._frictionNormalMultiplier = 5;
          Resolver._frictionMaxStatic = Number.MAX_VALUE;
          Resolver.preSolvePosition = function(pairs) {
            var i, pair, contactCount, pairsLength = pairs.length;
            for (i = 0;i < pairsLength; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              contactCount = pair.contactCount;
              pair.collision.parentA.totalContacts += contactCount;
              pair.collision.parentB.totalContacts += contactCount;
            }
          };
          Resolver.solvePosition = function(pairs, delta, damping) {
            var i, pair, collision, bodyA, bodyB, normal, contactShare, positionImpulse, positionDampen = Resolver._positionDampen * (damping || 1), slopDampen = Common.clamp(delta / Common._baseDelta, 0, 1), pairsLength = pairs.length;
            for (i = 0;i < pairsLength; i++) {
              pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              collision = pair.collision;
              bodyA = collision.parentA;
              bodyB = collision.parentB;
              normal = collision.normal;
              pair.separation = collision.depth + normal.x * (bodyB.positionImpulse.x - bodyA.positionImpulse.x) + normal.y * (bodyB.positionImpulse.y - bodyA.positionImpulse.y);
            }
            for (i = 0;i < pairsLength; i++) {
              pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              collision = pair.collision;
              bodyA = collision.parentA;
              bodyB = collision.parentB;
              normal = collision.normal;
              positionImpulse = pair.separation - pair.slop * slopDampen;
              if (bodyA.isStatic || bodyB.isStatic)
                positionImpulse *= 2;
              if (!(bodyA.isStatic || bodyA.isSleeping)) {
                contactShare = positionDampen / bodyA.totalContacts;
                bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
              }
              if (!(bodyB.isStatic || bodyB.isSleeping)) {
                contactShare = positionDampen / bodyB.totalContacts;
                bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
              }
            }
          };
          Resolver.postSolvePosition = function(bodies) {
            var positionWarming = Resolver._positionWarming, bodiesLength = bodies.length, verticesTranslate = Vertices.translate, boundsUpdate = Bounds.update;
            for (var i = 0;i < bodiesLength; i++) {
              var body = bodies[i], positionImpulse = body.positionImpulse, positionImpulseX = positionImpulse.x, positionImpulseY = positionImpulse.y, velocity = body.velocity;
              body.totalContacts = 0;
              if (positionImpulseX !== 0 || positionImpulseY !== 0) {
                for (var j = 0;j < body.parts.length; j++) {
                  var part = body.parts[j];
                  verticesTranslate(part.vertices, positionImpulse);
                  boundsUpdate(part.bounds, part.vertices, velocity);
                  part.position.x += positionImpulseX;
                  part.position.y += positionImpulseY;
                }
                body.positionPrev.x += positionImpulseX;
                body.positionPrev.y += positionImpulseY;
                if (positionImpulseX * velocity.x + positionImpulseY * velocity.y < 0) {
                  positionImpulse.x = 0;
                  positionImpulse.y = 0;
                } else {
                  positionImpulse.x *= positionWarming;
                  positionImpulse.y *= positionWarming;
                }
              }
            }
          };
          Resolver.preSolveVelocity = function(pairs) {
            var pairsLength = pairs.length, i, j;
            for (i = 0;i < pairsLength; i++) {
              var pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              var { contacts, contactCount, collision } = pair, bodyA = collision.parentA, bodyB = collision.parentB, normal = collision.normal, tangent = collision.tangent;
              for (j = 0;j < contactCount; j++) {
                var contact = contacts[j], contactVertex = contact.vertex, normalImpulse = contact.normalImpulse, tangentImpulse = contact.tangentImpulse;
                if (normalImpulse !== 0 || tangentImpulse !== 0) {
                  var impulseX = normal.x * normalImpulse + tangent.x * tangentImpulse, impulseY = normal.y * normalImpulse + tangent.y * tangentImpulse;
                  if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                    bodyA.anglePrev += bodyA.inverseInertia * ((contactVertex.x - bodyA.position.x) * impulseY - (contactVertex.y - bodyA.position.y) * impulseX);
                  }
                  if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                    bodyB.anglePrev -= bodyB.inverseInertia * ((contactVertex.x - bodyB.position.x) * impulseY - (contactVertex.y - bodyB.position.y) * impulseX);
                  }
                }
              }
            }
          };
          Resolver.solveVelocity = function(pairs, delta) {
            var timeScale = delta / Common._baseDelta, timeScaleSquared = timeScale * timeScale, timeScaleCubed = timeScaleSquared * timeScale, restingThresh = -Resolver._restingThresh * timeScale, restingThreshTangent = Resolver._restingThreshTangent, frictionNormalMultiplier = Resolver._frictionNormalMultiplier * timeScale, frictionMaxStatic = Resolver._frictionMaxStatic, pairsLength = pairs.length, tangentImpulse, maxFriction, i, j;
            for (i = 0;i < pairsLength; i++) {
              var pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              var collision = pair.collision, bodyA = collision.parentA, bodyB = collision.parentB, normalX = collision.normal.x, normalY = collision.normal.y, tangentX = collision.tangent.x, tangentY = collision.tangent.y, inverseMassTotal = pair.inverseMass, friction = pair.friction * pair.frictionStatic * frictionNormalMultiplier, contacts = pair.contacts, contactCount = pair.contactCount, contactShare = 1 / contactCount;
              var bodyAVelocityX = bodyA.position.x - bodyA.positionPrev.x, bodyAVelocityY = bodyA.position.y - bodyA.positionPrev.y, bodyAAngularVelocity = bodyA.angle - bodyA.anglePrev, bodyBVelocityX = bodyB.position.x - bodyB.positionPrev.x, bodyBVelocityY = bodyB.position.y - bodyB.positionPrev.y, bodyBAngularVelocity = bodyB.angle - bodyB.anglePrev;
              for (j = 0;j < contactCount; j++) {
                var contact = contacts[j], contactVertex = contact.vertex;
                var offsetAX = contactVertex.x - bodyA.position.x, offsetAY = contactVertex.y - bodyA.position.y, offsetBX = contactVertex.x - bodyB.position.x, offsetBY = contactVertex.y - bodyB.position.y;
                var velocityPointAX = bodyAVelocityX - offsetAY * bodyAAngularVelocity, velocityPointAY = bodyAVelocityY + offsetAX * bodyAAngularVelocity, velocityPointBX = bodyBVelocityX - offsetBY * bodyBAngularVelocity, velocityPointBY = bodyBVelocityY + offsetBX * bodyBAngularVelocity;
                var relativeVelocityX = velocityPointAX - velocityPointBX, relativeVelocityY = velocityPointAY - velocityPointBY;
                var normalVelocity = normalX * relativeVelocityX + normalY * relativeVelocityY, tangentVelocity = tangentX * relativeVelocityX + tangentY * relativeVelocityY;
                var normalOverlap = pair.separation + normalVelocity;
                var normalForce = Math.min(normalOverlap, 1);
                normalForce = normalOverlap < 0 ? 0 : normalForce;
                var frictionLimit = normalForce * friction;
                if (tangentVelocity < -frictionLimit || tangentVelocity > frictionLimit) {
                  maxFriction = tangentVelocity > 0 ? tangentVelocity : -tangentVelocity;
                  tangentImpulse = pair.friction * (tangentVelocity > 0 ? 1 : -1) * timeScaleCubed;
                  if (tangentImpulse < -maxFriction) {
                    tangentImpulse = -maxFriction;
                  } else if (tangentImpulse > maxFriction) {
                    tangentImpulse = maxFriction;
                  }
                } else {
                  tangentImpulse = tangentVelocity;
                  maxFriction = frictionMaxStatic;
                }
                var oAcN = offsetAX * normalY - offsetAY * normalX, oBcN = offsetBX * normalY - offsetBY * normalX, share = contactShare / (inverseMassTotal + bodyA.inverseInertia * oAcN * oAcN + bodyB.inverseInertia * oBcN * oBcN);
                var normalImpulse = (1 + pair.restitution) * normalVelocity * share;
                tangentImpulse *= share;
                if (normalVelocity < restingThresh) {
                  contact.normalImpulse = 0;
                } else {
                  var contactNormalImpulse = contact.normalImpulse;
                  contact.normalImpulse += normalImpulse;
                  if (contact.normalImpulse > 0)
                    contact.normalImpulse = 0;
                  normalImpulse = contact.normalImpulse - contactNormalImpulse;
                }
                if (tangentVelocity < -restingThreshTangent || tangentVelocity > restingThreshTangent) {
                  contact.tangentImpulse = 0;
                } else {
                  var contactTangentImpulse = contact.tangentImpulse;
                  contact.tangentImpulse += tangentImpulse;
                  if (contact.tangentImpulse < -maxFriction)
                    contact.tangentImpulse = -maxFriction;
                  if (contact.tangentImpulse > maxFriction)
                    contact.tangentImpulse = maxFriction;
                  tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                }
                var impulseX = normalX * normalImpulse + tangentX * tangentImpulse, impulseY = normalY * normalImpulse + tangentY * tangentImpulse;
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                  bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                  bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                  bodyA.anglePrev += (offsetAX * impulseY - offsetAY * impulseX) * bodyA.inverseInertia;
                }
                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                  bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                  bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                  bodyB.anglePrev -= (offsetBX * impulseY - offsetBY * impulseX) * bodyB.inverseInertia;
                }
              }
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Pairs = {};
        module2.exports = Pairs;
        var Pair = __webpack_require__(9);
        var Common = __webpack_require__(0);
        (function() {
          Pairs.create = function(options) {
            return Common.extend({
              table: {},
              list: [],
              collisionStart: [],
              collisionActive: [],
              collisionEnd: []
            }, options);
          };
          Pairs.update = function(pairs, collisions, timestamp) {
            var { update: pairUpdate, create: pairCreate, setActive: pairSetActive } = Pair, pairsTable = pairs.table, pairsList = pairs.list, pairsListLength = pairsList.length, pairsListIndex = pairsListLength, collisionStart = pairs.collisionStart, collisionEnd = pairs.collisionEnd, collisionActive = pairs.collisionActive, collisionsLength = collisions.length, collisionStartIndex = 0, collisionEndIndex = 0, collisionActiveIndex = 0, collision, pair, i;
            for (i = 0;i < collisionsLength; i++) {
              collision = collisions[i];
              pair = collision.pair;
              if (pair) {
                if (pair.isActive) {
                  collisionActive[collisionActiveIndex++] = pair;
                }
                pairUpdate(pair, collision, timestamp);
              } else {
                pair = pairCreate(collision, timestamp);
                pairsTable[pair.id] = pair;
                collisionStart[collisionStartIndex++] = pair;
                pairsList[pairsListIndex++] = pair;
              }
            }
            pairsListIndex = 0;
            pairsListLength = pairsList.length;
            for (i = 0;i < pairsListLength; i++) {
              pair = pairsList[i];
              if (pair.timeUpdated >= timestamp) {
                pairsList[pairsListIndex++] = pair;
              } else {
                pairSetActive(pair, false, timestamp);
                if (pair.collision.bodyA.sleepCounter > 0 && pair.collision.bodyB.sleepCounter > 0) {
                  pairsList[pairsListIndex++] = pair;
                } else {
                  collisionEnd[collisionEndIndex++] = pair;
                  delete pairsTable[pair.id];
                }
              }
            }
            if (pairsList.length !== pairsListIndex) {
              pairsList.length = pairsListIndex;
            }
            if (collisionStart.length !== collisionStartIndex) {
              collisionStart.length = collisionStartIndex;
            }
            if (collisionEnd.length !== collisionEndIndex) {
              collisionEnd.length = collisionEndIndex;
            }
            if (collisionActive.length !== collisionActiveIndex) {
              collisionActive.length = collisionActiveIndex;
            }
          };
          Pairs.clear = function(pairs) {
            pairs.table = {};
            pairs.list.length = 0;
            pairs.collisionStart.length = 0;
            pairs.collisionActive.length = 0;
            pairs.collisionEnd.length = 0;
            return pairs;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Matter = module2.exports = __webpack_require__(21);
        Matter.Axes = __webpack_require__(11);
        Matter.Bodies = __webpack_require__(12);
        Matter.Body = __webpack_require__(4);
        Matter.Bounds = __webpack_require__(1);
        Matter.Collision = __webpack_require__(8);
        Matter.Common = __webpack_require__(0);
        Matter.Composite = __webpack_require__(6);
        Matter.Composites = __webpack_require__(22);
        Matter.Constraint = __webpack_require__(10);
        Matter.Contact = __webpack_require__(16);
        Matter.Detector = __webpack_require__(13);
        Matter.Engine = __webpack_require__(17);
        Matter.Events = __webpack_require__(5);
        Matter.Grid = __webpack_require__(23);
        Matter.Mouse = __webpack_require__(14);
        Matter.MouseConstraint = __webpack_require__(24);
        Matter.Pair = __webpack_require__(9);
        Matter.Pairs = __webpack_require__(19);
        Matter.Plugin = __webpack_require__(15);
        Matter.Query = __webpack_require__(25);
        Matter.Render = __webpack_require__(26);
        Matter.Resolver = __webpack_require__(18);
        Matter.Runner = __webpack_require__(27);
        Matter.SAT = __webpack_require__(28);
        Matter.Sleeping = __webpack_require__(7);
        Matter.Svg = __webpack_require__(29);
        Matter.Vector = __webpack_require__(2);
        Matter.Vertices = __webpack_require__(3);
        Matter.World = __webpack_require__(30);
        Matter.Engine.run = Matter.Runner.run;
        Matter.Common.deprecated(Matter.Engine, "run", "Engine.run ➤ use Matter.Runner.run(engine) instead");
      },
      function(module2, exports2, __webpack_require__) {
        var Matter = {};
        module2.exports = Matter;
        var Plugin = __webpack_require__(15);
        var Common = __webpack_require__(0);
        (function() {
          Matter.name = "matter-js";
          Matter.version = "0.20.0";
          Matter.uses = [];
          Matter.used = [];
          Matter.use = function() {
            Plugin.use(Matter, Array.prototype.slice.call(arguments));
          };
          Matter.before = function(path, func) {
            path = path.replace(/^Matter./, "");
            return Common.chainPathBefore(Matter, path, func);
          };
          Matter.after = function(path, func) {
            path = path.replace(/^Matter./, "");
            return Common.chainPathAfter(Matter, path, func);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Composites = {};
        module2.exports = Composites;
        var Composite = __webpack_require__(6);
        var Constraint = __webpack_require__(10);
        var Common = __webpack_require__(0);
        var Body = __webpack_require__(4);
        var Bodies = __webpack_require__(12);
        var deprecated = Common.deprecated;
        (function() {
          Composites.stack = function(x, y, columns, rows, columnGap, rowGap, callback) {
            var stack = Composite.create({ label: "Stack" }), currentX = x, currentY = y, lastBody, i = 0;
            for (var row = 0;row < rows; row++) {
              var maxHeight = 0;
              for (var column = 0;column < columns; column++) {
                var body = callback(currentX, currentY, column, row, lastBody, i);
                if (body) {
                  var bodyHeight = body.bounds.max.y - body.bounds.min.y, bodyWidth = body.bounds.max.x - body.bounds.min.x;
                  if (bodyHeight > maxHeight)
                    maxHeight = bodyHeight;
                  Body.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });
                  currentX = body.bounds.max.x + columnGap;
                  Composite.addBody(stack, body);
                  lastBody = body;
                  i += 1;
                } else {
                  currentX += columnGap;
                }
              }
              currentY += maxHeight + rowGap;
              currentX = x;
            }
            return stack;
          };
          Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
            var bodies = composite.bodies;
            for (var i = 1;i < bodies.length; i++) {
              var bodyA = bodies[i - 1], bodyB = bodies[i], bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y, bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y, bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
              var defaults = {
                bodyA,
                pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                bodyB,
                pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
              };
              var constraint = Common.extend(defaults, options);
              Composite.addConstraint(composite, Constraint.create(constraint));
            }
            composite.label += " Chain";
            return composite;
          };
          Composites.mesh = function(composite, columns, rows, crossBrace, options) {
            var bodies = composite.bodies, row, col, bodyA, bodyB, bodyC;
            for (row = 0;row < rows; row++) {
              for (col = 1;col < columns; col++) {
                bodyA = bodies[col - 1 + row * columns];
                bodyB = bodies[col + row * columns];
                Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA, bodyB }, options)));
              }
              if (row > 0) {
                for (col = 0;col < columns; col++) {
                  bodyA = bodies[col + (row - 1) * columns];
                  bodyB = bodies[col + row * columns];
                  Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA, bodyB }, options)));
                  if (crossBrace && col > 0) {
                    bodyC = bodies[col - 1 + (row - 1) * columns];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB }, options)));
                  }
                  if (crossBrace && col < columns - 1) {
                    bodyC = bodies[col + 1 + (row - 1) * columns];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB }, options)));
                  }
                }
              }
            }
            composite.label += " Mesh";
            return composite;
          };
          Composites.pyramid = function(x, y, columns, rows, columnGap, rowGap, callback) {
            return Composites.stack(x, y, columns, rows, columnGap, rowGap, function(stackX, stackY, column, row, lastBody, i) {
              var actualRows = Math.min(rows, Math.ceil(columns / 2)), lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;
              if (row > actualRows)
                return;
              row = actualRows - row;
              var start = row, end = columns - 1 - row;
              if (column < start || column > end)
                return;
              if (i === 1) {
                Body.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
              }
              var xOffset = lastBody ? column * lastBodyWidth : 0;
              return callback(x + xOffset + column * columnGap, stackY, column, row, lastBody, i);
            });
          };
          Composites.newtonsCradle = function(x, y, number, size, length) {
            var newtonsCradle = Composite.create({ label: "Newtons Cradle" });
            for (var i = 0;i < number; i++) {
              var separation = 1.9, circle = Bodies.circle(x + i * (size * separation), y + length, size, { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1 }), constraint = Constraint.create({ pointA: { x: x + i * (size * separation), y }, bodyB: circle });
              Composite.addBody(newtonsCradle, circle);
              Composite.addConstraint(newtonsCradle, constraint);
            }
            return newtonsCradle;
          };
          deprecated(Composites, "newtonsCradle", "Composites.newtonsCradle ➤ moved to newtonsCradle example");
          Composites.car = function(x, y, width, height, wheelSize) {
            var group = Body.nextGroup(true), wheelBase = 20, wheelAOffset = -width * 0.5 + wheelBase, wheelBOffset = width * 0.5 - wheelBase, wheelYOffset = 0;
            var car = Composite.create({ label: "Car" }), body = Bodies.rectangle(x, y, width, height, {
              collisionFilter: {
                group
              },
              chamfer: {
                radius: height * 0.5
              },
              density: 0.0002
            });
            var wheelA = Bodies.circle(x + wheelAOffset, y + wheelYOffset, wheelSize, {
              collisionFilter: {
                group
              },
              friction: 0.8
            });
            var wheelB = Bodies.circle(x + wheelBOffset, y + wheelYOffset, wheelSize, {
              collisionFilter: {
                group
              },
              friction: 0.8
            });
            var axelA = Constraint.create({
              bodyB: body,
              pointB: { x: wheelAOffset, y: wheelYOffset },
              bodyA: wheelA,
              stiffness: 1,
              length: 0
            });
            var axelB = Constraint.create({
              bodyB: body,
              pointB: { x: wheelBOffset, y: wheelYOffset },
              bodyA: wheelB,
              stiffness: 1,
              length: 0
            });
            Composite.addBody(car, body);
            Composite.addBody(car, wheelA);
            Composite.addBody(car, wheelB);
            Composite.addConstraint(car, axelA);
            Composite.addConstraint(car, axelB);
            return car;
          };
          deprecated(Composites, "car", "Composites.car ➤ moved to car example");
          Composites.softBody = function(x, y, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
            particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
            constraintOptions = Common.extend({ stiffness: 0.2, render: { type: "line", anchors: false } }, constraintOptions);
            var softBody = Composites.stack(x, y, columns, rows, columnGap, rowGap, function(stackX, stackY) {
              return Bodies.circle(stackX, stackY, particleRadius, particleOptions);
            });
            Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
            softBody.label = "Soft Body";
            return softBody;
          };
          deprecated(Composites, "softBody", "Composites.softBody ➤ moved to softBody and cloth examples");
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Grid = {};
        module2.exports = Grid;
        var Pair = __webpack_require__(9);
        var Common = __webpack_require__(0);
        var deprecated = Common.deprecated;
        (function() {
          Grid.create = function(options) {
            var defaults = {
              buckets: {},
              pairs: {},
              pairsList: [],
              bucketWidth: 48,
              bucketHeight: 48
            };
            return Common.extend(defaults, options);
          };
          Grid.update = function(grid, bodies, engine, forceUpdate) {
            var i, col, row, world = engine.world, buckets = grid.buckets, bucket, bucketId, gridChanged = false;
            for (i = 0;i < bodies.length; i++) {
              var body = bodies[i];
              if (body.isSleeping && !forceUpdate)
                continue;
              if (world.bounds && (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y))
                continue;
              var newRegion = Grid._getRegion(grid, body);
              if (!body.region || newRegion.id !== body.region.id || forceUpdate) {
                if (!body.region || forceUpdate)
                  body.region = newRegion;
                var union = Grid._regionUnion(newRegion, body.region);
                for (col = union.startCol;col <= union.endCol; col++) {
                  for (row = union.startRow;row <= union.endRow; row++) {
                    bucketId = Grid._getBucketId(col, row);
                    bucket = buckets[bucketId];
                    var isInsideNewRegion = col >= newRegion.startCol && col <= newRegion.endCol && row >= newRegion.startRow && row <= newRegion.endRow;
                    var isInsideOldRegion = col >= body.region.startCol && col <= body.region.endCol && row >= body.region.startRow && row <= body.region.endRow;
                    if (!isInsideNewRegion && isInsideOldRegion) {
                      if (isInsideOldRegion) {
                        if (bucket)
                          Grid._bucketRemoveBody(grid, bucket, body);
                      }
                    }
                    if (body.region === newRegion || isInsideNewRegion && !isInsideOldRegion || forceUpdate) {
                      if (!bucket)
                        bucket = Grid._createBucket(buckets, bucketId);
                      Grid._bucketAddBody(grid, bucket, body);
                    }
                  }
                }
                body.region = newRegion;
                gridChanged = true;
              }
            }
            if (gridChanged)
              grid.pairsList = Grid._createActivePairsList(grid);
          };
          deprecated(Grid, "update", "Grid.update ➤ replaced by Matter.Detector");
          Grid.clear = function(grid) {
            grid.buckets = {};
            grid.pairs = {};
            grid.pairsList = [];
          };
          deprecated(Grid, "clear", "Grid.clear ➤ replaced by Matter.Detector");
          Grid._regionUnion = function(regionA, regionB) {
            var startCol = Math.min(regionA.startCol, regionB.startCol), endCol = Math.max(regionA.endCol, regionB.endCol), startRow = Math.min(regionA.startRow, regionB.startRow), endRow = Math.max(regionA.endRow, regionB.endRow);
            return Grid._createRegion(startCol, endCol, startRow, endRow);
          };
          Grid._getRegion = function(grid, body) {
            var bounds = body.bounds, startCol = Math.floor(bounds.min.x / grid.bucketWidth), endCol = Math.floor(bounds.max.x / grid.bucketWidth), startRow = Math.floor(bounds.min.y / grid.bucketHeight), endRow = Math.floor(bounds.max.y / grid.bucketHeight);
            return Grid._createRegion(startCol, endCol, startRow, endRow);
          };
          Grid._createRegion = function(startCol, endCol, startRow, endRow) {
            return {
              id: startCol + "," + endCol + "," + startRow + "," + endRow,
              startCol,
              endCol,
              startRow,
              endRow
            };
          };
          Grid._getBucketId = function(column, row) {
            return "C" + column + "R" + row;
          };
          Grid._createBucket = function(buckets, bucketId) {
            var bucket = buckets[bucketId] = [];
            return bucket;
          };
          Grid._bucketAddBody = function(grid, bucket, body) {
            var gridPairs = grid.pairs, pairId = Pair.id, bucketLength = bucket.length, i;
            for (i = 0;i < bucketLength; i++) {
              var bodyB = bucket[i];
              if (body.id === bodyB.id || body.isStatic && bodyB.isStatic)
                continue;
              var id = pairId(body, bodyB), pair = gridPairs[id];
              if (pair) {
                pair[2] += 1;
              } else {
                gridPairs[id] = [body, bodyB, 1];
              }
            }
            bucket.push(body);
          };
          Grid._bucketRemoveBody = function(grid, bucket, body) {
            var gridPairs = grid.pairs, pairId = Pair.id, i;
            bucket.splice(Common.indexOf(bucket, body), 1);
            var bucketLength = bucket.length;
            for (i = 0;i < bucketLength; i++) {
              var pair = gridPairs[pairId(body, bucket[i])];
              if (pair)
                pair[2] -= 1;
            }
          };
          Grid._createActivePairsList = function(grid) {
            var pair, gridPairs = grid.pairs, pairKeys = Common.keys(gridPairs), pairKeysLength = pairKeys.length, pairs = [], k;
            for (k = 0;k < pairKeysLength; k++) {
              pair = gridPairs[pairKeys[k]];
              if (pair[2] > 0) {
                pairs.push(pair);
              } else {
                delete gridPairs[pairKeys[k]];
              }
            }
            return pairs;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var MouseConstraint = {};
        module2.exports = MouseConstraint;
        var Vertices = __webpack_require__(3);
        var Sleeping = __webpack_require__(7);
        var Mouse = __webpack_require__(14);
        var Events = __webpack_require__(5);
        var Detector = __webpack_require__(13);
        var Constraint = __webpack_require__(10);
        var Composite = __webpack_require__(6);
        var Common = __webpack_require__(0);
        var Bounds = __webpack_require__(1);
        (function() {
          MouseConstraint.create = function(engine, options) {
            var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);
            if (!mouse) {
              if (engine && engine.render && engine.render.canvas) {
                mouse = Mouse.create(engine.render.canvas);
              } else if (options && options.element) {
                mouse = Mouse.create(options.element);
              } else {
                mouse = Mouse.create();
                Common.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected");
              }
            }
            var constraint = Constraint.create({
              label: "Mouse Constraint",
              pointA: mouse.position,
              pointB: { x: 0, y: 0 },
              length: 0.01,
              stiffness: 0.1,
              angularStiffness: 1,
              render: {
                strokeStyle: "#90EE90",
                lineWidth: 3
              }
            });
            var defaults = {
              type: "mouseConstraint",
              mouse,
              element: null,
              body: null,
              constraint,
              collisionFilter: {
                category: 1,
                mask: 4294967295,
                group: 0
              }
            };
            var mouseConstraint = Common.extend(defaults, options);
            Events.on(engine, "beforeUpdate", function() {
              var allBodies = Composite.allBodies(engine.world);
              MouseConstraint.update(mouseConstraint, allBodies);
              MouseConstraint._triggerEvents(mouseConstraint);
            });
            return mouseConstraint;
          };
          MouseConstraint.update = function(mouseConstraint, bodies) {
            var { mouse, constraint, body } = mouseConstraint;
            if (mouse.button === 0) {
              if (!constraint.bodyB) {
                for (var i = 0;i < bodies.length; i++) {
                  body = bodies[i];
                  if (Bounds.contains(body.bounds, mouse.position) && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                    for (var j = body.parts.length > 1 ? 1 : 0;j < body.parts.length; j++) {
                      var part = body.parts[j];
                      if (Vertices.contains(part.vertices, mouse.position)) {
                        constraint.pointA = mouse.position;
                        constraint.bodyB = mouseConstraint.body = body;
                        constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                        constraint.angleB = body.angle;
                        Sleeping.set(body, false);
                        Events.trigger(mouseConstraint, "startdrag", { mouse, body });
                        break;
                      }
                    }
                  }
                }
              } else {
                Sleeping.set(constraint.bodyB, false);
                constraint.pointA = mouse.position;
              }
            } else {
              constraint.bodyB = mouseConstraint.body = null;
              constraint.pointB = null;
              if (body)
                Events.trigger(mouseConstraint, "enddrag", { mouse, body });
            }
          };
          MouseConstraint._triggerEvents = function(mouseConstraint) {
            var mouse = mouseConstraint.mouse, mouseEvents = mouse.sourceEvents;
            if (mouseEvents.mousemove)
              Events.trigger(mouseConstraint, "mousemove", { mouse });
            if (mouseEvents.mousedown)
              Events.trigger(mouseConstraint, "mousedown", { mouse });
            if (mouseEvents.mouseup)
              Events.trigger(mouseConstraint, "mouseup", { mouse });
            Mouse.clearSourceEvents(mouse);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Query = {};
        module2.exports = Query;
        var Vector2 = __webpack_require__(2);
        var Collision = __webpack_require__(8);
        var Bounds = __webpack_require__(1);
        var Bodies = __webpack_require__(12);
        var Vertices = __webpack_require__(3);
        (function() {
          Query.collides = function(body, bodies) {
            var collisions = [], bodiesLength = bodies.length, bounds = body.bounds, collides = Collision.collides, overlaps = Bounds.overlaps;
            for (var i = 0;i < bodiesLength; i++) {
              var bodyA = bodies[i], partsALength = bodyA.parts.length, partsAStart = partsALength === 1 ? 0 : 1;
              if (overlaps(bodyA.bounds, bounds)) {
                for (var j = partsAStart;j < partsALength; j++) {
                  var part = bodyA.parts[j];
                  if (overlaps(part.bounds, bounds)) {
                    var collision = collides(part, body);
                    if (collision) {
                      collisions.push(collision);
                      break;
                    }
                  }
                }
              }
            }
            return collisions;
          };
          Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
            rayWidth = rayWidth || 0.0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;
            var rayAngle = Vector2.angle(startPoint, endPoint), rayLength = Vector2.magnitude(Vector2.sub(startPoint, endPoint)), rayX = (endPoint.x + startPoint.x) * 0.5, rayY = (endPoint.y + startPoint.y) * 0.5, ray = Bodies.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }), collisions = Query.collides(ray, bodies);
            for (var i = 0;i < collisions.length; i += 1) {
              var collision = collisions[i];
              collision.body = collision.bodyB = collision.bodyA;
            }
            return collisions;
          };
          Query.region = function(bodies, bounds, outside) {
            var result = [];
            for (var i = 0;i < bodies.length; i++) {
              var body = bodies[i], overlaps = Bounds.overlaps(body.bounds, bounds);
              if (overlaps && !outside || !overlaps && outside)
                result.push(body);
            }
            return result;
          };
          Query.point = function(bodies, point) {
            var result = [];
            for (var i = 0;i < bodies.length; i++) {
              var body = bodies[i];
              if (Bounds.contains(body.bounds, point)) {
                for (var j = body.parts.length === 1 ? 0 : 1;j < body.parts.length; j++) {
                  var part = body.parts[j];
                  if (Bounds.contains(part.bounds, point) && Vertices.contains(part.vertices, point)) {
                    result.push(body);
                    break;
                  }
                }
              }
            }
            return result;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Render = {};
        module2.exports = Render;
        var Body = __webpack_require__(4);
        var Common = __webpack_require__(0);
        var Composite = __webpack_require__(6);
        var Bounds = __webpack_require__(1);
        var Events = __webpack_require__(5);
        var Vector2 = __webpack_require__(2);
        var Mouse = __webpack_require__(14);
        (function() {
          var _requestAnimationFrame, _cancelAnimationFrame;
          if (typeof window !== "undefined") {
            _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
              window.setTimeout(function() {
                callback(Common.now());
              }, 1000 / 60);
            };
            _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
          }
          Render._goodFps = 30;
          Render._goodDelta = 1000 / 60;
          Render.create = function(options) {
            var defaults = {
              engine: null,
              element: null,
              canvas: null,
              mouse: null,
              frameRequestId: null,
              timing: {
                historySize: 60,
                delta: 0,
                deltaHistory: [],
                lastTime: 0,
                lastTimestamp: 0,
                lastElapsed: 0,
                timestampElapsed: 0,
                timestampElapsedHistory: [],
                engineDeltaHistory: [],
                engineElapsedHistory: [],
                engineUpdatesHistory: [],
                elapsedHistory: []
              },
              options: {
                width: 800,
                height: 600,
                pixelRatio: 1,
                background: "#14151f",
                wireframeBackground: "#14151f",
                wireframeStrokeStyle: "#bbb",
                hasBounds: !!options.bounds,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showStats: false,
                showPerformance: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: false,
                showMousePosition: false
              }
            };
            var render = Common.extend(defaults, options);
            if (render.canvas) {
              render.canvas.width = render.options.width || render.canvas.width;
              render.canvas.height = render.options.height || render.canvas.height;
            }
            render.mouse = options.mouse;
            render.engine = options.engine;
            render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
            render.context = render.canvas.getContext("2d");
            render.textures = {};
            render.bounds = render.bounds || {
              min: {
                x: 0,
                y: 0
              },
              max: {
                x: render.canvas.width,
                y: render.canvas.height
              }
            };
            render.controller = Render;
            render.options.showBroadphase = false;
            if (render.options.pixelRatio !== 1) {
              Render.setPixelRatio(render, render.options.pixelRatio);
            }
            if (Common.isElement(render.element)) {
              render.element.appendChild(render.canvas);
            }
            return render;
          };
          Render.run = function(render) {
            (function loop(time) {
              render.frameRequestId = _requestAnimationFrame(loop);
              _updateTiming(render, time);
              Render.world(render, time);
              render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
              if (render.options.showStats || render.options.showDebug) {
                Render.stats(render, render.context, time);
              }
              if (render.options.showPerformance || render.options.showDebug) {
                Render.performance(render, render.context, time);
              }
              render.context.setTransform(1, 0, 0, 1, 0, 0);
            })();
          };
          Render.stop = function(render) {
            _cancelAnimationFrame(render.frameRequestId);
          };
          Render.setPixelRatio = function(render, pixelRatio) {
            var { options, canvas } = render;
            if (pixelRatio === "auto") {
              pixelRatio = _getPixelRatio(canvas);
            }
            options.pixelRatio = pixelRatio;
            canvas.setAttribute("data-pixel-ratio", pixelRatio);
            canvas.width = options.width * pixelRatio;
            canvas.height = options.height * pixelRatio;
            canvas.style.width = options.width + "px";
            canvas.style.height = options.height + "px";
          };
          Render.setSize = function(render, width, height) {
            render.options.width = width;
            render.options.height = height;
            render.bounds.max.x = render.bounds.min.x + width;
            render.bounds.max.y = render.bounds.min.y + height;
            if (render.options.pixelRatio !== 1) {
              Render.setPixelRatio(render, render.options.pixelRatio);
            } else {
              render.canvas.width = width;
              render.canvas.height = height;
            }
          };
          Render.lookAt = function(render, objects, padding, center) {
            center = typeof center !== "undefined" ? center : true;
            objects = Common.isArray(objects) ? objects : [objects];
            padding = padding || {
              x: 0,
              y: 0
            };
            var bounds = {
              min: { x: Infinity, y: Infinity },
              max: { x: -Infinity, y: -Infinity }
            };
            for (var i = 0;i < objects.length; i += 1) {
              var object = objects[i], min = object.bounds ? object.bounds.min : object.min || object.position || object, max = object.bounds ? object.bounds.max : object.max || object.position || object;
              if (min && max) {
                if (min.x < bounds.min.x)
                  bounds.min.x = min.x;
                if (max.x > bounds.max.x)
                  bounds.max.x = max.x;
                if (min.y < bounds.min.y)
                  bounds.min.y = min.y;
                if (max.y > bounds.max.y)
                  bounds.max.y = max.y;
              }
            }
            var width = bounds.max.x - bounds.min.x + 2 * padding.x, height = bounds.max.y - bounds.min.y + 2 * padding.y, viewHeight = render.canvas.height, viewWidth = render.canvas.width, outerRatio = viewWidth / viewHeight, innerRatio = width / height, scaleX = 1, scaleY = 1;
            if (innerRatio > outerRatio) {
              scaleY = innerRatio / outerRatio;
            } else {
              scaleX = outerRatio / innerRatio;
            }
            render.options.hasBounds = true;
            render.bounds.min.x = bounds.min.x;
            render.bounds.max.x = bounds.min.x + width * scaleX;
            render.bounds.min.y = bounds.min.y;
            render.bounds.max.y = bounds.min.y + height * scaleY;
            if (center) {
              render.bounds.min.x += width * 0.5 - width * scaleX * 0.5;
              render.bounds.max.x += width * 0.5 - width * scaleX * 0.5;
              render.bounds.min.y += height * 0.5 - height * scaleY * 0.5;
              render.bounds.max.y += height * 0.5 - height * scaleY * 0.5;
            }
            render.bounds.min.x -= padding.x;
            render.bounds.max.x -= padding.x;
            render.bounds.min.y -= padding.y;
            render.bounds.max.y -= padding.y;
            if (render.mouse) {
              Mouse.setScale(render.mouse, {
                x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
              });
              Mouse.setOffset(render.mouse, render.bounds.min);
            }
          };
          Render.startViewTransform = function(render) {
            var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
            render.context.setTransform(render.options.pixelRatio / boundsScaleX, 0, 0, render.options.pixelRatio / boundsScaleY, 0, 0);
            render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
          };
          Render.endViewTransform = function(render) {
            render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
          };
          Render.world = function(render, time) {
            var startTime = Common.now(), engine = render.engine, world = engine.world, canvas = render.canvas, context = render.context, options = render.options, timing = render.timing;
            var allBodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world), background = options.wireframes ? options.wireframeBackground : options.background, bodies = [], constraints = [], i;
            var event = {
              timestamp: engine.timing.timestamp
            };
            Events.trigger(render, "beforeRender", event);
            if (render.currentBackground !== background)
              _applyBackground(render, background);
            context.globalCompositeOperation = "source-in";
            context.fillStyle = "transparent";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = "source-over";
            if (options.hasBounds) {
              for (i = 0;i < allBodies.length; i++) {
                var body = allBodies[i];
                if (Bounds.overlaps(body.bounds, render.bounds))
                  bodies.push(body);
              }
              for (i = 0;i < allConstraints.length; i++) {
                var constraint = allConstraints[i], bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointAWorld = constraint.pointA, pointBWorld = constraint.pointB;
                if (bodyA)
                  pointAWorld = Vector2.add(bodyA.position, constraint.pointA);
                if (bodyB)
                  pointBWorld = Vector2.add(bodyB.position, constraint.pointB);
                if (!pointAWorld || !pointBWorld)
                  continue;
                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                  constraints.push(constraint);
              }
              Render.startViewTransform(render);
              if (render.mouse) {
                Mouse.setScale(render.mouse, {
                  x: (render.bounds.max.x - render.bounds.min.x) / render.options.width,
                  y: (render.bounds.max.y - render.bounds.min.y) / render.options.height
                });
                Mouse.setOffset(render.mouse, render.bounds.min);
              }
            } else {
              constraints = allConstraints;
              bodies = allBodies;
              if (render.options.pixelRatio !== 1) {
                render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
              }
            }
            if (!options.wireframes || engine.enableSleeping && options.showSleeping) {
              Render.bodies(render, bodies, context);
            } else {
              if (options.showConvexHulls)
                Render.bodyConvexHulls(render, bodies, context);
              Render.bodyWireframes(render, bodies, context);
            }
            if (options.showBounds)
              Render.bodyBounds(render, bodies, context);
            if (options.showAxes || options.showAngleIndicator)
              Render.bodyAxes(render, bodies, context);
            if (options.showPositions)
              Render.bodyPositions(render, bodies, context);
            if (options.showVelocity)
              Render.bodyVelocity(render, bodies, context);
            if (options.showIds)
              Render.bodyIds(render, bodies, context);
            if (options.showSeparations)
              Render.separations(render, engine.pairs.list, context);
            if (options.showCollisions)
              Render.collisions(render, engine.pairs.list, context);
            if (options.showVertexNumbers)
              Render.vertexNumbers(render, bodies, context);
            if (options.showMousePosition)
              Render.mousePosition(render, render.mouse, context);
            Render.constraints(constraints, context);
            if (options.hasBounds) {
              Render.endViewTransform(render);
            }
            Events.trigger(render, "afterRender", event);
            timing.lastElapsed = Common.now() - startTime;
          };
          Render.stats = function(render, context, time) {
            var engine = render.engine, world = engine.world, bodies = Composite.allBodies(world), parts = 0, width = 55, height = 44, x = 0, y = 0;
            for (var i = 0;i < bodies.length; i += 1) {
              parts += bodies[i].parts.length;
            }
            var sections = {
              Part: parts,
              Body: bodies.length,
              Cons: Composite.allConstraints(world).length,
              Comp: Composite.allComposites(world).length,
              Pair: engine.pairs.list.length
            };
            context.fillStyle = "#0e0f19";
            context.fillRect(x, y, width * 5.5, height);
            context.font = "12px Arial";
            context.textBaseline = "top";
            context.textAlign = "right";
            for (var key in sections) {
              var section = sections[key];
              context.fillStyle = "#aaa";
              context.fillText(key, x + width, y + 8);
              context.fillStyle = "#eee";
              context.fillText(section, x + width, y + 26);
              x += width;
            }
          };
          Render.performance = function(render, context) {
            var { engine, timing } = render, deltaHistory = timing.deltaHistory, elapsedHistory = timing.elapsedHistory, timestampElapsedHistory = timing.timestampElapsedHistory, engineDeltaHistory = timing.engineDeltaHistory, engineUpdatesHistory = timing.engineUpdatesHistory, engineElapsedHistory = timing.engineElapsedHistory, lastEngineUpdatesPerFrame = engine.timing.lastUpdatesPerFrame, lastEngineDelta = engine.timing.lastDelta;
            var deltaMean = _mean(deltaHistory), elapsedMean = _mean(elapsedHistory), engineDeltaMean = _mean(engineDeltaHistory), engineUpdatesMean = _mean(engineUpdatesHistory), engineElapsedMean = _mean(engineElapsedHistory), timestampElapsedMean = _mean(timestampElapsedHistory), rateMean = timestampElapsedMean / deltaMean || 0, neededUpdatesPerFrame = Math.round(deltaMean / lastEngineDelta), fps = 1000 / deltaMean || 0;
            var graphHeight = 4, gap = 12, width = 60, height = 34, x = 10, y = 69;
            context.fillStyle = "#0e0f19";
            context.fillRect(0, 50, gap * 5 + width * 6 + 22, height);
            Render.status(context, x, y, width, graphHeight, deltaHistory.length, Math.round(fps) + " fps", fps / Render._goodFps, function(i) {
              return deltaHistory[i] / deltaMean - 1;
            });
            Render.status(context, x + gap + width, y, width, graphHeight, engineDeltaHistory.length, lastEngineDelta.toFixed(2) + " dt", Render._goodDelta / lastEngineDelta, function(i) {
              return engineDeltaHistory[i] / engineDeltaMean - 1;
            });
            Render.status(context, x + (gap + width) * 2, y, width, graphHeight, engineUpdatesHistory.length, lastEngineUpdatesPerFrame + " upf", Math.pow(Common.clamp(engineUpdatesMean / neededUpdatesPerFrame || 1, 0, 1), 4), function(i) {
              return engineUpdatesHistory[i] / engineUpdatesMean - 1;
            });
            Render.status(context, x + (gap + width) * 3, y, width, graphHeight, engineElapsedHistory.length, engineElapsedMean.toFixed(2) + " ut", 1 - lastEngineUpdatesPerFrame * engineElapsedMean / Render._goodFps, function(i) {
              return engineElapsedHistory[i] / engineElapsedMean - 1;
            });
            Render.status(context, x + (gap + width) * 4, y, width, graphHeight, elapsedHistory.length, elapsedMean.toFixed(2) + " rt", 1 - elapsedMean / Render._goodFps, function(i) {
              return elapsedHistory[i] / elapsedMean - 1;
            });
            Render.status(context, x + (gap + width) * 5, y, width, graphHeight, timestampElapsedHistory.length, rateMean.toFixed(2) + " x", rateMean * rateMean * rateMean, function(i) {
              return (timestampElapsedHistory[i] / deltaHistory[i] / rateMean || 0) - 1;
            });
          };
          Render.status = function(context, x, y, width, height, count, label, indicator, plotY) {
            context.strokeStyle = "#888";
            context.fillStyle = "#444";
            context.lineWidth = 1;
            context.fillRect(x, y + 7, width, 1);
            context.beginPath();
            context.moveTo(x, y + 7 - height * Common.clamp(0.4 * plotY(0), -2, 2));
            for (var i = 0;i < width; i += 1) {
              context.lineTo(x + i, y + 7 - (i < count ? height * Common.clamp(0.4 * plotY(i), -2, 2) : 0));
            }
            context.stroke();
            context.fillStyle = "hsl(" + Common.clamp(25 + 95 * indicator, 0, 120) + ",100%,60%)";
            context.fillRect(x, y - 7, 4, 4);
            context.font = "12px Arial";
            context.textBaseline = "middle";
            context.textAlign = "right";
            context.fillStyle = "#eee";
            context.fillText(label, x + width, y - 5);
          };
          Render.constraints = function(constraints, context) {
            var c = context;
            for (var i = 0;i < constraints.length; i++) {
              var constraint = constraints[i];
              if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
                continue;
              var { bodyA, bodyB } = constraint, start, end;
              if (bodyA) {
                start = Vector2.add(bodyA.position, constraint.pointA);
              } else {
                start = constraint.pointA;
              }
              if (constraint.render.type === "pin") {
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.closePath();
              } else {
                if (bodyB) {
                  end = Vector2.add(bodyB.position, constraint.pointB);
                } else {
                  end = constraint.pointB;
                }
                c.beginPath();
                c.moveTo(start.x, start.y);
                if (constraint.render.type === "spring") {
                  var delta = Vector2.sub(end, start), normal = Vector2.perp(Vector2.normalise(delta)), coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20)), offset;
                  for (var j = 1;j < coils; j += 1) {
                    offset = j % 2 === 0 ? 1 : -1;
                    c.lineTo(start.x + delta.x * (j / coils) + normal.x * offset * 4, start.y + delta.y * (j / coils) + normal.y * offset * 4);
                  }
                }
                c.lineTo(end.x, end.y);
              }
              if (constraint.render.lineWidth) {
                c.lineWidth = constraint.render.lineWidth;
                c.strokeStyle = constraint.render.strokeStyle;
                c.stroke();
              }
              if (constraint.render.anchors) {
                c.fillStyle = constraint.render.strokeStyle;
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
                c.closePath();
                c.fill();
              }
            }
          };
          Render.bodies = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, showInternalEdges = options.showInternalEdges || !options.wireframes, body, part, i, k;
            for (i = 0;i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = body.parts.length > 1 ? 1 : 0;k < body.parts.length; k++) {
                part = body.parts[k];
                if (!part.render.visible)
                  continue;
                if (options.showSleeping && body.isSleeping) {
                  c.globalAlpha = 0.5 * part.render.opacity;
                } else if (part.render.opacity !== 1) {
                  c.globalAlpha = part.render.opacity;
                }
                if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                  var sprite = part.render.sprite, texture = _getTexture(render, sprite.texture);
                  c.translate(part.position.x, part.position.y);
                  c.rotate(part.angle);
                  c.drawImage(texture, texture.width * -sprite.xOffset * sprite.xScale, texture.height * -sprite.yOffset * sprite.yScale, texture.width * sprite.xScale, texture.height * sprite.yScale);
                  c.rotate(-part.angle);
                  c.translate(-part.position.x, -part.position.y);
                } else {
                  if (part.circleRadius) {
                    c.beginPath();
                    c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
                  } else {
                    c.beginPath();
                    c.moveTo(part.vertices[0].x, part.vertices[0].y);
                    for (var j = 1;j < part.vertices.length; j++) {
                      if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                        c.lineTo(part.vertices[j].x, part.vertices[j].y);
                      } else {
                        c.moveTo(part.vertices[j].x, part.vertices[j].y);
                      }
                      if (part.vertices[j].isInternal && !showInternalEdges) {
                        c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                      }
                    }
                    c.lineTo(part.vertices[0].x, part.vertices[0].y);
                    c.closePath();
                  }
                  if (!options.wireframes) {
                    c.fillStyle = part.render.fillStyle;
                    if (part.render.lineWidth) {
                      c.lineWidth = part.render.lineWidth;
                      c.strokeStyle = part.render.strokeStyle;
                      c.stroke();
                    }
                    c.fill();
                  } else {
                    c.lineWidth = 1;
                    c.strokeStyle = render.options.wireframeStrokeStyle;
                    c.stroke();
                  }
                }
                c.globalAlpha = 1;
              }
            }
          };
          Render.bodyWireframes = function(render, bodies, context) {
            var c = context, showInternalEdges = render.options.showInternalEdges, body, part, i, j, k;
            c.beginPath();
            for (i = 0;i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = body.parts.length > 1 ? 1 : 0;k < body.parts.length; k++) {
                part = body.parts[k];
                c.moveTo(part.vertices[0].x, part.vertices[0].y);
                for (j = 1;j < part.vertices.length; j++) {
                  if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                    c.lineTo(part.vertices[j].x, part.vertices[j].y);
                  } else {
                    c.moveTo(part.vertices[j].x, part.vertices[j].y);
                  }
                  if (part.vertices[j].isInternal && !showInternalEdges) {
                    c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                  }
                }
                c.lineTo(part.vertices[0].x, part.vertices[0].y);
              }
            }
            c.lineWidth = 1;
            c.strokeStyle = render.options.wireframeStrokeStyle;
            c.stroke();
          };
          Render.bodyConvexHulls = function(render, bodies, context) {
            var c = context, body, part, i, j, k;
            c.beginPath();
            for (i = 0;i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible || body.parts.length === 1)
                continue;
              c.moveTo(body.vertices[0].x, body.vertices[0].y);
              for (j = 1;j < body.vertices.length; j++) {
                c.lineTo(body.vertices[j].x, body.vertices[j].y);
              }
              c.lineTo(body.vertices[0].x, body.vertices[0].y);
            }
            c.lineWidth = 1;
            c.strokeStyle = "rgba(255,255,255,0.2)";
            c.stroke();
          };
          Render.vertexNumbers = function(render, bodies, context) {
            var c = context, i, j, k;
            for (i = 0;i < bodies.length; i++) {
              var parts = bodies[i].parts;
              for (k = parts.length > 1 ? 1 : 0;k < parts.length; k++) {
                var part = parts[k];
                for (j = 0;j < part.vertices.length; j++) {
                  c.fillStyle = "rgba(255,255,255,0.2)";
                  c.fillText(i + "_" + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                }
              }
            }
          };
          Render.mousePosition = function(render, mouse, context) {
            var c = context;
            c.fillStyle = "rgba(255,255,255,0.8)";
            c.fillText(mouse.position.x + "  " + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
          };
          Render.bodyBounds = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options;
            c.beginPath();
            for (var i = 0;i < bodies.length; i++) {
              var body = bodies[i];
              if (body.render.visible) {
                var parts = bodies[i].parts;
                for (var j = parts.length > 1 ? 1 : 0;j < parts.length; j++) {
                  var part = parts[j];
                  c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                }
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,255,255,0.08)";
            } else {
              c.strokeStyle = "rgba(0,0,0,0.1)";
            }
            c.lineWidth = 1;
            c.stroke();
          };
          Render.bodyAxes = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, part, i, j, k;
            c.beginPath();
            for (i = 0;i < bodies.length; i++) {
              var body = bodies[i], parts = body.parts;
              if (!body.render.visible)
                continue;
              if (options.showAxes) {
                for (j = parts.length > 1 ? 1 : 0;j < parts.length; j++) {
                  part = parts[j];
                  for (k = 0;k < part.axes.length; k++) {
                    var axis = part.axes[k];
                    c.moveTo(part.position.x, part.position.y);
                    c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                  }
                }
              } else {
                for (j = parts.length > 1 ? 1 : 0;j < parts.length; j++) {
                  part = parts[j];
                  for (k = 0;k < part.axes.length; k++) {
                    c.moveTo(part.position.x, part.position.y);
                    c.lineTo((part.vertices[0].x + part.vertices[part.vertices.length - 1].x) / 2, (part.vertices[0].y + part.vertices[part.vertices.length - 1].y) / 2);
                  }
                }
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "indianred";
              c.lineWidth = 1;
            } else {
              c.strokeStyle = "rgba(255, 255, 255, 0.4)";
              c.globalCompositeOperation = "overlay";
              c.lineWidth = 2;
            }
            c.stroke();
            c.globalCompositeOperation = "source-over";
          };
          Render.bodyPositions = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, body, part, i, k;
            c.beginPath();
            for (i = 0;i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = 0;k < body.parts.length; k++) {
                part = body.parts[k];
                c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
                c.closePath();
              }
            }
            if (options.wireframes) {
              c.fillStyle = "indianred";
            } else {
              c.fillStyle = "rgba(0,0,0,0.5)";
            }
            c.fill();
            c.beginPath();
            for (i = 0;i < bodies.length; i++) {
              body = bodies[i];
              if (body.render.visible) {
                c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
                c.closePath();
              }
            }
            c.fillStyle = "rgba(255,165,0,0.8)";
            c.fill();
          };
          Render.bodyVelocity = function(render, bodies, context) {
            var c = context;
            c.beginPath();
            for (var i = 0;i < bodies.length; i++) {
              var body = bodies[i];
              if (!body.render.visible)
                continue;
              var velocity = Body.getVelocity(body);
              c.moveTo(body.position.x, body.position.y);
              c.lineTo(body.position.x + velocity.x, body.position.y + velocity.y);
            }
            c.lineWidth = 3;
            c.strokeStyle = "cornflowerblue";
            c.stroke();
          };
          Render.bodyIds = function(render, bodies, context) {
            var c = context, i, j;
            for (i = 0;i < bodies.length; i++) {
              if (!bodies[i].render.visible)
                continue;
              var parts = bodies[i].parts;
              for (j = parts.length > 1 ? 1 : 0;j < parts.length; j++) {
                var part = parts[j];
                c.font = "12px Arial";
                c.fillStyle = "rgba(255,255,255,0.5)";
                c.fillText(part.id, part.position.x + 10, part.position.y - 10);
              }
            }
          };
          Render.collisions = function(render, pairs, context) {
            var c = context, options = render.options, pair, collision, corrected, bodyA, bodyB, i, j;
            c.beginPath();
            for (i = 0;i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              for (j = 0;j < pair.contactCount; j++) {
                var contact = pair.contacts[j], vertex = contact.vertex;
                c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
              }
            }
            if (options.wireframes) {
              c.fillStyle = "rgba(255,255,255,0.7)";
            } else {
              c.fillStyle = "orange";
            }
            c.fill();
            c.beginPath();
            for (i = 0;i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              if (pair.contactCount > 0) {
                var normalPosX = pair.contacts[0].vertex.x, normalPosY = pair.contacts[0].vertex.y;
                if (pair.contactCount === 2) {
                  normalPosX = (pair.contacts[0].vertex.x + pair.contacts[1].vertex.x) / 2;
                  normalPosY = (pair.contacts[0].vertex.y + pair.contacts[1].vertex.y) / 2;
                }
                if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                  c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                } else {
                  c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                }
                c.lineTo(normalPosX, normalPosY);
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,165,0,0.7)";
            } else {
              c.strokeStyle = "orange";
            }
            c.lineWidth = 1;
            c.stroke();
          };
          Render.separations = function(render, pairs, context) {
            var c = context, options = render.options, pair, collision, corrected, bodyA, bodyB, i, j;
            c.beginPath();
            for (i = 0;i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              bodyA = collision.bodyA;
              bodyB = collision.bodyB;
              var k = 1;
              if (!bodyB.isStatic && !bodyA.isStatic)
                k = 0.5;
              if (bodyB.isStatic)
                k = 0;
              c.moveTo(bodyB.position.x, bodyB.position.y);
              c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);
              k = 1;
              if (!bodyB.isStatic && !bodyA.isStatic)
                k = 0.5;
              if (bodyA.isStatic)
                k = 0;
              c.moveTo(bodyA.position.x, bodyA.position.y);
              c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,165,0,0.5)";
            } else {
              c.strokeStyle = "orange";
            }
            c.stroke();
          };
          Render.inspector = function(inspector, context) {
            var { engine, selected, render } = inspector, options = render.options, bounds;
            if (options.hasBounds) {
              var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
              context.scale(1 / boundsScaleX, 1 / boundsScaleY);
              context.translate(-render.bounds.min.x, -render.bounds.min.y);
            }
            for (var i = 0;i < selected.length; i++) {
              var item = selected[i].data;
              context.translate(0.5, 0.5);
              context.lineWidth = 1;
              context.strokeStyle = "rgba(255,165,0,0.9)";
              context.setLineDash([1, 2]);
              switch (item.type) {
                case "body":
                  bounds = item.bounds;
                  context.beginPath();
                  context.rect(Math.floor(bounds.min.x - 3), Math.floor(bounds.min.y - 3), Math.floor(bounds.max.x - bounds.min.x + 6), Math.floor(bounds.max.y - bounds.min.y + 6));
                  context.closePath();
                  context.stroke();
                  break;
                case "constraint":
                  var point = item.pointA;
                  if (item.bodyA)
                    point = item.pointB;
                  context.beginPath();
                  context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                  context.closePath();
                  context.stroke();
                  break;
              }
              context.setLineDash([]);
              context.translate(-0.5, -0.5);
            }
            if (inspector.selectStart !== null) {
              context.translate(0.5, 0.5);
              context.lineWidth = 1;
              context.strokeStyle = "rgba(255,165,0,0.6)";
              context.fillStyle = "rgba(255,165,0,0.1)";
              bounds = inspector.selectBounds;
              context.beginPath();
              context.rect(Math.floor(bounds.min.x), Math.floor(bounds.min.y), Math.floor(bounds.max.x - bounds.min.x), Math.floor(bounds.max.y - bounds.min.y));
              context.closePath();
              context.stroke();
              context.fill();
              context.translate(-0.5, -0.5);
            }
            if (options.hasBounds)
              context.setTransform(1, 0, 0, 1, 0, 0);
          };
          var _updateTiming = function(render, time) {
            var { engine, timing } = render, historySize = timing.historySize, timestamp = engine.timing.timestamp;
            timing.delta = time - timing.lastTime || Render._goodDelta;
            timing.lastTime = time;
            timing.timestampElapsed = timestamp - timing.lastTimestamp || 0;
            timing.lastTimestamp = timestamp;
            timing.deltaHistory.unshift(timing.delta);
            timing.deltaHistory.length = Math.min(timing.deltaHistory.length, historySize);
            timing.engineDeltaHistory.unshift(engine.timing.lastDelta);
            timing.engineDeltaHistory.length = Math.min(timing.engineDeltaHistory.length, historySize);
            timing.timestampElapsedHistory.unshift(timing.timestampElapsed);
            timing.timestampElapsedHistory.length = Math.min(timing.timestampElapsedHistory.length, historySize);
            timing.engineUpdatesHistory.unshift(engine.timing.lastUpdatesPerFrame);
            timing.engineUpdatesHistory.length = Math.min(timing.engineUpdatesHistory.length, historySize);
            timing.engineElapsedHistory.unshift(engine.timing.lastElapsed);
            timing.engineElapsedHistory.length = Math.min(timing.engineElapsedHistory.length, historySize);
            timing.elapsedHistory.unshift(timing.lastElapsed);
            timing.elapsedHistory.length = Math.min(timing.elapsedHistory.length, historySize);
          };
          var _mean = function(values) {
            var result = 0;
            for (var i = 0;i < values.length; i += 1) {
              result += values[i];
            }
            return result / values.length || 0;
          };
          var _createCanvas = function(width, height) {
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.oncontextmenu = function() {
              return false;
            };
            canvas.onselectstart = function() {
              return false;
            };
            return canvas;
          };
          var _getPixelRatio = function(canvas) {
            var context = canvas.getContext("2d"), devicePixelRatio = window.devicePixelRatio || 1, backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
            return devicePixelRatio / backingStorePixelRatio;
          };
          var _getTexture = function(render, imagePath) {
            var image = render.textures[imagePath];
            if (image)
              return image;
            image = render.textures[imagePath] = new Image;
            image.src = imagePath;
            return image;
          };
          var _applyBackground = function(render, background) {
            var cssBackground = background;
            if (/(jpg|gif|png)$/.test(background))
              cssBackground = "url(" + background + ")";
            render.canvas.style.background = cssBackground;
            render.canvas.style.backgroundSize = "contain";
            render.currentBackground = background;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Runner = {};
        module2.exports = Runner;
        var Events = __webpack_require__(5);
        var Engine = __webpack_require__(17);
        var Common = __webpack_require__(0);
        (function() {
          Runner._maxFrameDelta = 1000 / 15;
          Runner._frameDeltaFallback = 1000 / 60;
          Runner._timeBufferMargin = 1.5;
          Runner._elapsedNextEstimate = 1;
          Runner._smoothingLowerBound = 0.1;
          Runner._smoothingUpperBound = 0.9;
          Runner.create = function(options) {
            var defaults = {
              delta: 1000 / 60,
              frameDelta: null,
              frameDeltaSmoothing: true,
              frameDeltaSnapping: true,
              frameDeltaHistory: [],
              frameDeltaHistorySize: 100,
              frameRequestId: null,
              timeBuffer: 0,
              timeLastTick: null,
              maxUpdates: null,
              maxFrameTime: 1000 / 30,
              lastUpdatesDeferred: 0,
              enabled: true
            };
            var runner = Common.extend(defaults, options);
            runner.fps = 0;
            return runner;
          };
          Runner.run = function(runner, engine) {
            runner.timeBuffer = Runner._frameDeltaFallback;
            (function onFrame(time) {
              runner.frameRequestId = Runner._onNextFrame(runner, onFrame);
              if (time && runner.enabled) {
                Runner.tick(runner, engine, time);
              }
            })();
            return runner;
          };
          Runner.tick = function(runner, engine, time) {
            var tickStartTime = Common.now(), engineDelta = runner.delta, updateCount = 0;
            var frameDelta = time - runner.timeLastTick;
            if (!frameDelta || !runner.timeLastTick || frameDelta > Math.max(Runner._maxFrameDelta, runner.maxFrameTime)) {
              frameDelta = runner.frameDelta || Runner._frameDeltaFallback;
            }
            if (runner.frameDeltaSmoothing) {
              runner.frameDeltaHistory.push(frameDelta);
              runner.frameDeltaHistory = runner.frameDeltaHistory.slice(-runner.frameDeltaHistorySize);
              var deltaHistorySorted = runner.frameDeltaHistory.slice(0).sort();
              var deltaHistoryWindow = runner.frameDeltaHistory.slice(deltaHistorySorted.length * Runner._smoothingLowerBound, deltaHistorySorted.length * Runner._smoothingUpperBound);
              var frameDeltaSmoothed = _mean(deltaHistoryWindow);
              frameDelta = frameDeltaSmoothed || frameDelta;
            }
            if (runner.frameDeltaSnapping) {
              frameDelta = 1000 / Math.round(1000 / frameDelta);
            }
            runner.frameDelta = frameDelta;
            runner.timeLastTick = time;
            runner.timeBuffer += runner.frameDelta;
            runner.timeBuffer = Common.clamp(runner.timeBuffer, 0, runner.frameDelta + engineDelta * Runner._timeBufferMargin);
            runner.lastUpdatesDeferred = 0;
            var maxUpdates = runner.maxUpdates || Math.ceil(runner.maxFrameTime / engineDelta);
            var event = {
              timestamp: engine.timing.timestamp
            };
            Events.trigger(runner, "beforeTick", event);
            Events.trigger(runner, "tick", event);
            var updateStartTime = Common.now();
            while (engineDelta > 0 && runner.timeBuffer >= engineDelta * Runner._timeBufferMargin) {
              Events.trigger(runner, "beforeUpdate", event);
              Engine.update(engine, engineDelta);
              Events.trigger(runner, "afterUpdate", event);
              runner.timeBuffer -= engineDelta;
              updateCount += 1;
              var elapsedTimeTotal = Common.now() - tickStartTime, elapsedTimeUpdates = Common.now() - updateStartTime, elapsedNextEstimate = elapsedTimeTotal + Runner._elapsedNextEstimate * elapsedTimeUpdates / updateCount;
              if (updateCount >= maxUpdates || elapsedNextEstimate > runner.maxFrameTime) {
                runner.lastUpdatesDeferred = Math.round(Math.max(0, runner.timeBuffer / engineDelta - Runner._timeBufferMargin));
                break;
              }
            }
            engine.timing.lastUpdatesPerFrame = updateCount;
            Events.trigger(runner, "afterTick", event);
            if (runner.frameDeltaHistory.length >= 100) {
              if (runner.lastUpdatesDeferred && Math.round(runner.frameDelta / engineDelta) > maxUpdates) {
                Common.warnOnce("Matter.Runner: runner reached runner.maxUpdates, see docs.");
              } else if (runner.lastUpdatesDeferred) {
                Common.warnOnce("Matter.Runner: runner reached runner.maxFrameTime, see docs.");
              }
              if (typeof runner.isFixed !== "undefined") {
                Common.warnOnce("Matter.Runner: runner.isFixed is now redundant, see docs.");
              }
              if (runner.deltaMin || runner.deltaMax) {
                Common.warnOnce("Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs.");
              }
              if (runner.fps !== 0) {
                Common.warnOnce("Matter.Runner: runner.fps was replaced by runner.delta, see docs.");
              }
            }
          };
          Runner.stop = function(runner) {
            Runner._cancelNextFrame(runner);
          };
          Runner._onNextFrame = function(runner, callback) {
            if (typeof window !== "undefined" && window.requestAnimationFrame) {
              runner.frameRequestId = window.requestAnimationFrame(callback);
            } else {
              throw new Error("Matter.Runner: missing required global window.requestAnimationFrame.");
            }
            return runner.frameRequestId;
          };
          Runner._cancelNextFrame = function(runner) {
            if (typeof window !== "undefined" && window.cancelAnimationFrame) {
              window.cancelAnimationFrame(runner.frameRequestId);
            } else {
              throw new Error("Matter.Runner: missing required global window.cancelAnimationFrame.");
            }
          };
          var _mean = function(values) {
            var result = 0, valuesLength = values.length;
            for (var i = 0;i < valuesLength; i += 1) {
              result += values[i];
            }
            return result / valuesLength || 0;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var SAT = {};
        module2.exports = SAT;
        var Collision = __webpack_require__(8);
        var Common = __webpack_require__(0);
        var deprecated = Common.deprecated;
        (function() {
          SAT.collides = function(bodyA, bodyB) {
            return Collision.collides(bodyA, bodyB);
          };
          deprecated(SAT, "collides", "SAT.collides ➤ replaced by Collision.collides");
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Svg = {};
        module2.exports = Svg;
        var Bounds = __webpack_require__(1);
        var Common = __webpack_require__(0);
        (function() {
          Svg.pathToVertices = function(path, sampleLength) {
            if (typeof window !== "undefined" && !("SVGPathSeg" in window)) {
              Common.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
            }
            var i, il, total, point, segment, segments, segmentsQueue, lastSegment, lastPoint, segmentIndex, points = [], lx, ly, length = 0, x = 0, y = 0;
            sampleLength = sampleLength || 15;
            var addPoint = function(px, py, pathSegType) {
              var isRelative = pathSegType % 2 === 1 && pathSegType > 1;
              if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                if (lastPoint && isRelative) {
                  lx = lastPoint.x;
                  ly = lastPoint.y;
                } else {
                  lx = 0;
                  ly = 0;
                }
                var point2 = {
                  x: lx + px,
                  y: ly + py
                };
                if (isRelative || !lastPoint) {
                  lastPoint = point2;
                }
                points.push(point2);
                x = lx + px;
                y = ly + py;
              }
            };
            var addSegmentPoint = function(segment2) {
              var segType = segment2.pathSegTypeAsLetter.toUpperCase();
              if (segType === "Z")
                return;
              switch (segType) {
                case "M":
                case "L":
                case "T":
                case "C":
                case "S":
                case "Q":
                  x = segment2.x;
                  y = segment2.y;
                  break;
                case "H":
                  x = segment2.x;
                  break;
                case "V":
                  y = segment2.y;
                  break;
              }
              addPoint(x, y, segment2.pathSegType);
            };
            Svg._svgPathToAbsolute(path);
            total = path.getTotalLength();
            segments = [];
            for (i = 0;i < path.pathSegList.numberOfItems; i += 1)
              segments.push(path.pathSegList.getItem(i));
            segmentsQueue = segments.concat();
            while (length < total) {
              segmentIndex = path.getPathSegAtLength(length);
              segment = segments[segmentIndex];
              if (segment != lastSegment) {
                while (segmentsQueue.length && segmentsQueue[0] != segment)
                  addSegmentPoint(segmentsQueue.shift());
                lastSegment = segment;
              }
              switch (segment.pathSegTypeAsLetter.toUpperCase()) {
                case "C":
                case "T":
                case "S":
                case "Q":
                case "A":
                  point = path.getPointAtLength(length);
                  addPoint(point.x, point.y, 0);
                  break;
              }
              length += sampleLength;
            }
            for (i = 0, il = segmentsQueue.length;i < il; ++i)
              addSegmentPoint(segmentsQueue[i]);
            return points;
          };
          Svg._svgPathToAbsolute = function(path) {
            var x0, y0, x1, y1, x2, y2, segs = path.pathSegList, x = 0, y = 0, len = segs.numberOfItems;
            for (var i = 0;i < len; ++i) {
              var seg = segs.getItem(i), segType = seg.pathSegTypeAsLetter;
              if (/[MLHVCSQTA]/.test(segType)) {
                if ("x" in seg)
                  x = seg.x;
                if ("y" in seg)
                  y = seg.y;
              } else {
                if ("x1" in seg)
                  x1 = x + seg.x1;
                if ("x2" in seg)
                  x2 = x + seg.x2;
                if ("y1" in seg)
                  y1 = y + seg.y1;
                if ("y2" in seg)
                  y2 = y + seg.y2;
                if ("x" in seg)
                  x += seg.x;
                if ("y" in seg)
                  y += seg.y;
                switch (segType) {
                  case "m":
                    segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
                    break;
                  case "l":
                    segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
                    break;
                  case "h":
                    segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
                    break;
                  case "v":
                    segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
                    break;
                  case "c":
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
                    break;
                  case "s":
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
                    break;
                  case "q":
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
                    break;
                  case "t":
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
                    break;
                  case "a":
                    segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                    break;
                  case "z":
                  case "Z":
                    x = x0;
                    y = y0;
                    break;
                }
              }
              if (segType == "M" || segType == "m") {
                x0 = x;
                y0 = y;
              }
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var World = {};
        module2.exports = World;
        var Composite = __webpack_require__(6);
        var Common = __webpack_require__(0);
        (function() {
          World.create = Composite.create;
          World.add = Composite.add;
          World.remove = Composite.remove;
          World.clear = Composite.clear;
          World.addComposite = Composite.addComposite;
          World.addBody = Composite.addBody;
          World.addConstraint = Composite.addConstraint;
        })();
      }
    ]);
  });
});

// node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js
var require_resolve_uri_umd = __commonJS((exports, module) => {
  (function(global2, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.resolveURI = factory());
  })(exports, function() {
    const schemeRegex = /^[\w+.-]+:\/\//;
    const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
    const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
    function isAbsoluteUrl(input) {
      return schemeRegex.test(input);
    }
    function isSchemeRelativeUrl(input) {
      return input.startsWith("//");
    }
    function isAbsolutePath(input) {
      return input.startsWith("/");
    }
    function isFileUrl(input) {
      return input.startsWith("file:");
    }
    function isRelative(input) {
      return /^[.?#]/.test(input);
    }
    function parseAbsoluteUrl(input) {
      const match = urlRegex.exec(input);
      return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
    }
    function parseFileUrl(input) {
      const match = fileRegex.exec(input);
      const path = match[2];
      return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path) ? path : "/" + path, match[3] || "", match[4] || "");
    }
    function makeUrl(scheme, user, host, port, path, query, hash) {
      return {
        scheme,
        user,
        host,
        port,
        path,
        query,
        hash,
        type: 7
      };
    }
    function parseUrl(input) {
      if (isSchemeRelativeUrl(input)) {
        const url2 = parseAbsoluteUrl("http:" + input);
        url2.scheme = "";
        url2.type = 6;
        return url2;
      }
      if (isAbsolutePath(input)) {
        const url2 = parseAbsoluteUrl("http://foo.com" + input);
        url2.scheme = "";
        url2.host = "";
        url2.type = 5;
        return url2;
      }
      if (isFileUrl(input))
        return parseFileUrl(input);
      if (isAbsoluteUrl(input))
        return parseAbsoluteUrl(input);
      const url = parseAbsoluteUrl("http://foo.com/" + input);
      url.scheme = "";
      url.host = "";
      url.type = input ? input.startsWith("?") ? 3 : input.startsWith("#") ? 2 : 4 : 1;
      return url;
    }
    function stripPathFilename(path) {
      if (path.endsWith("/.."))
        return path;
      const index = path.lastIndexOf("/");
      return path.slice(0, index + 1);
    }
    function mergePaths(url, base) {
      normalizePath(base, base.type);
      if (url.path === "/") {
        url.path = base.path;
      } else {
        url.path = stripPathFilename(base.path) + url.path;
      }
    }
    function normalizePath(url, type) {
      const rel = type <= 4;
      const pieces = url.path.split("/");
      let pointer = 1;
      let positive = 0;
      let addTrailingSlash = false;
      for (let i = 1;i < pieces.length; i++) {
        const piece = pieces[i];
        if (!piece) {
          addTrailingSlash = true;
          continue;
        }
        addTrailingSlash = false;
        if (piece === ".")
          continue;
        if (piece === "..") {
          if (positive) {
            addTrailingSlash = true;
            positive--;
            pointer--;
          } else if (rel) {
            pieces[pointer++] = piece;
          }
          continue;
        }
        pieces[pointer++] = piece;
        positive++;
      }
      let path = "";
      for (let i = 1;i < pointer; i++) {
        path += "/" + pieces[i];
      }
      if (!path || addTrailingSlash && !path.endsWith("/..")) {
        path += "/";
      }
      url.path = path;
    }
    function resolve(input, base) {
      if (!input && !base)
        return "";
      const url = parseUrl(input);
      let inputType = url.type;
      if (base && inputType !== 7) {
        const baseUrl = parseUrl(base);
        const baseType = baseUrl.type;
        switch (inputType) {
          case 1:
            url.hash = baseUrl.hash;
          case 2:
            url.query = baseUrl.query;
          case 3:
          case 4:
            mergePaths(url, baseUrl);
          case 5:
            url.user = baseUrl.user;
            url.host = baseUrl.host;
            url.port = baseUrl.port;
          case 6:
            url.scheme = baseUrl.scheme;
        }
        if (baseType > inputType)
          inputType = baseType;
      }
      normalizePath(url, inputType);
      const queryHash = url.query + url.hash;
      switch (inputType) {
        case 2:
        case 3:
          return queryHash;
        case 4: {
          const path = url.path.slice(1);
          if (!path)
            return queryHash || ".";
          if (isRelative(base || input) && !isRelative(path)) {
            return "./" + path + queryHash;
          }
          return path + queryHash;
        }
        case 5:
          return url.path + queryHash;
        default:
          return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
      }
    }
    return resolve;
  });
});

// helpers.ts
function generateUID() {
  return Math.random().toString(36).substr(2, 9);
}
function applyCamera(context, camera) {
  const view = camera.getViewMatrix();
  context.save();
  context.translate(context.canvas.width / 2, context.canvas.height / 2);
  context.translate(view.offset.x, view.offset.y);
  context.scale(view.scale.x, view.scale.y);
}
function resetCamera(context) {
  context.restore();
}
function isPointInPolygon(pointX, pointY, polygonVertices) {
  let inside = false;
  for (let i = 0, j = polygonVertices.length - 1;i < polygonVertices.length; j = i++) {
    const xi = polygonVertices[i].x, yi = polygonVertices[i].y;
    const xj = polygonVertices[j].x, yj = polygonVertices[j].y;
    const intersect = yi > pointY !== yj > pointY && pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isPointInObject(mouseX, mouseY, child) {
  const transform = child.child("Transform");
  if (!transform) {
    console.warn(`Part <${child.name}> requires a Transform child.`);
    return false;
  }
  const position = transform.worldPosition;
  const boxCollider = child.child("BoxCollider");
  const polygonCollider = child.child("PolygonCollider");
  let width, height, centerX, centerY;
  if (boxCollider && boxCollider.start && boxCollider.end) {
    const scaledStart = boxCollider.start.multiply(transform.scale);
    const scaledEnd = boxCollider.end.multiply(transform.scale);
    width = scaledEnd.x - scaledStart.x;
    height = scaledEnd.y - scaledStart.y;
    const offsetX = (scaledStart.x + scaledEnd.x) / 2;
    const offsetY = (scaledStart.y + scaledEnd.y) / 2;
    centerX = position.x + offsetX;
    centerY = position.y + offsetY;
  } else if (polygonCollider) {
    width = polygonCollider.realWorldEnd.x - polygonCollider.realWorldStart.x;
    height = polygonCollider.realWorldEnd.y - polygonCollider.realWorldStart.y;
    centerX = (polygonCollider.realWorldStart.x + polygonCollider.realWorldEnd.x) / 2;
    centerY = (polygonCollider.realWorldStart.y + polygonCollider.realWorldEnd.y) / 2;
    if (transform.rotation !== 0) {
      return isPointInPolygon(mouseX, mouseY, polygonCollider.worldVertices);
    }
  } else if (child.width && child.height) {
    width = child.width * transform.scale.x;
    height = child.height * transform.scale.y;
    centerX = position.x;
    centerY = position.y;
  } else {
    width = (child?.superficialWidth || 50) * transform.scale.x;
    height = (child?.superficialHeight || 50) * transform.scale.y;
    centerX = position.x;
    centerY = position.y;
  }
  if (child.type == "Button") {
    console.log("BUTTON WH", width, height);
  }
  if (transform.rotation === 0) {
    const left = centerX - width / 2;
    const top = centerY - height / 2;
    return mouseX >= left && mouseX <= left + width && mouseY >= top && mouseY <= top + height;
  } else if (boxCollider) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const corners = [
      { x: -halfWidth, y: -halfHeight },
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: halfHeight },
      { x: -halfWidth, y: halfHeight }
    ];
    const cos = Math.cos(transform.rotation);
    const sin = Math.sin(transform.rotation);
    const rotatedCorners = corners.map((corner) => {
      const rotatedX = corner.x * cos - corner.y * sin;
      const rotatedY = corner.x * sin + corner.y * cos;
      return {
        x: centerX + rotatedX,
        y: centerY + rotatedY
      };
    });
    let inside = false;
    for (let i = 0, j = rotatedCorners.length - 1;i < rotatedCorners.length; j = i++) {
      if (rotatedCorners[i].y > mouseY !== rotatedCorners[j].y > mouseY && mouseX < (rotatedCorners[j].x - rotatedCorners[i].x) * (mouseY - rotatedCorners[i].y) / (rotatedCorners[j].y - rotatedCorners[i].y) + rotatedCorners[i].x) {
        inside = !inside;
      }
    }
    return inside;
  }
  return false;
}

// Parts/Part.ts
class Part {
  id;
  name;
  childrenArray = [];
  parent;
  top;
  ready = false;
  registrations = {};
  flats = { colliders: [] };
  _layoutWidth = 0;
  context;
  debugEmoji;
  hoverbug;
  _superficialWidth = 0;
  _superficialHeight = 0;
  ties = new Set;
  type;
  base;
  warned = new Set;
  _childrenByName = {};
  _childrenByType = {};
  render;
  constructor({ name, render } = {}) {
    this.id = generateUID();
    this.name = name || "New Object";
    this.type = "Part";
    this.childrenArray = [];
    this.parent = undefined;
    this.top = undefined;
    this.ready = true;
    this.base = "Part";
    this.render = typeof render !== "undefined" ? render : true;
    this.type = this.constructor.name || "Part";
    this.debugEmoji = "\uD83E\uDDE9";
  }
  tie(target, targetAttribute, localAttribute) {
    if (!target || !targetAttribute)
      return;
    if (target.hasOwnProperty(targetAttribute)) {
      this.ties.add({
        target,
        localAttribute,
        targetAttribute
      });
    }
  }
  onclick(event, clicked) {
    this.childrenArray.forEach((child) => {
      if (typeof child.onclick === "function") {
        child.onclick(event, clicked);
      }
    });
  }
  onhover() {
    this.childrenArray.forEach((child) => {
      if (typeof child.onhover === "function") {
        child.onhover();
      }
    });
  }
  onunhover() {
    this.childrenArray.forEach((child) => {
      if (typeof child.onunhover === "function") {
        child.onunhover();
      }
    });
  }
  onmousedown(event) {
    this.childrenArray.forEach((child) => {
      if (typeof child.onmousedown === "function") {
        child.onmousedown(event);
      }
    });
  }
  onmouseup(event) {
    this.childrenArray.forEach((child) => {
      if (typeof child.onmouseup === "function") {
        child.onmouseup(event);
      }
    });
    this.onclick(event, this);
  }
  sibling(name) {
    if (!this.parent) {
      return;
    }
    const sibling = this.parent._childrenByName[name];
    if (!sibling) {
      return;
    }
    return sibling;
  }
  setSuperficialDimensions(width, height) {
    this._superficialHeight = height;
    this._superficialWidth = width;
    this.childrenArray.forEach((child) => {
      if (typeof child.setSuperficialDimensions === "function") {
        child.setSuperficialDimensions(width, height);
      }
    });
  }
  onMount(parent) {
    this.parent = parent;
  }
  onRegister(attribute, value) {}
  onUnregister(attribute, value, debug) {
    if (debug)
      console.log(debug, value.name);
    switch (attribute) {
      case "parent":
        this.parent = undefined;
        if (this.registrations.layer && this.registrations.layer.flats) {
          this.registrations.layer.flats.colliders = this.registrations.layer.flats.colliders.filter((c) => c !== this);
        }
        break;
      case "top":
        this.top = undefined;
        break;
      case "layer":
        if (this.registrations.layer && this.registrations.layer.flats) {
          this.registrations.layer.flats.colliders = this.registrations.layer.flats.colliders.filter((c) => c.id !== this.id);
        }
        break;
      default:
        break;
    }
  }
  onUnmount() {}
  onStart() {
    this.childrenArray.forEach((child) => {
      if (typeof child.onStart === "function") {
        child.onStart();
      }
    });
  }
  addChild(child) {
    if (this._childrenByName[child.name]) {
      this.top?.warn(`Child with name <${child.name}> already exists in <${this.name}>. Skipping addition. (Child has ID <${child.id}>).`);
      return;
    }
    this.childrenArray.push(child);
    if (!this._childrenByType[child.type]) {
      this._childrenByType[child.type] = [];
    }
    this._childrenByType[child.type].push(child);
    this._childrenByName[child.name] = child;
    if (this.top) {
      child.setTop(this.top);
    }
    for (const [k, v] of Object.entries(this.registrations)) {
      child.setAll(k, v);
    }
    child.onMount(this);
  }
  addChildren(...children) {
    children.forEach((child) => this.addChild(child));
  }
  setTop(top) {
    this.top = top;
    if (this.childrenArray.length > 0) {
      this.childrenArray.forEach((child) => {
        child.setTop(top);
      });
    }
  }
  attr(attribute, value) {
    if (!value) {
      return this[attribute];
    }
    this[attribute] = value;
    return value;
  }
  preFrame() {
    this.childrenArray.forEach((child) => {
      child.preFrame();
    });
  }
  act(delta) {
    if (!this.ready) {
      return;
    }
    this.ties.forEach((tie) => {
      if (tie.target && tie.target.hasOwnProperty(tie.targetAttribute)) {
        const value = this.attr(tie.localAttribute);
        tie.target.attr(tie.targetAttribute, value);
      }
    });
    if (!this.render)
      return;
    this.childrenArray.forEach((child) => {
      child.act(delta);
    });
  }
  frameEnd(delta) {
    this.childrenArray.forEach((child) => {
      child.frameEnd(delta);
    });
  }
  setAll(attribute, value) {
    const current = this.registrations[attribute];
    if (current && current !== value) {
      this.onUnregister(attribute, current);
    }
    if (current !== value) {
      this.onRegister(attribute, value);
    }
    this.registrations[attribute] = value;
    this.childrenArray.forEach((child) => {
      child.setAll(attribute, value);
    });
  }
  calculateLayout(spacing = { x: 10, y: 20 }) {
    if (!this.childrenArray || this.childrenArray.length === 0) {
      this._layoutWidth = 100;
      return this._layoutWidth;
    }
    let totalWidth = 0;
    this.childrenArray.forEach((child) => {
      if (typeof child.calculateLayout === "function") {
        totalWidth += child.calculateLayout(spacing);
      }
    });
    totalWidth += (this.childrenArray.length - 1) * spacing.x;
    this._layoutWidth = totalWidth;
    return totalWidth;
  }
  removeChild(child) {
    if (this._childrenByName[child.name]) {
      child.childrenArray.forEach((gc) => {
        child.removeChild(gc);
      });
      delete this._childrenByName[child.name];
      this._childrenByType[child.type] = this._childrenByType[child.type]?.filter((c) => c.id != child.id) || [];
      const index = this.childrenArray.indexOf(child);
      if (index !== -1) {
        this.childrenArray.splice(index, 1);
      }
      child.parent = undefined;
      child.top = undefined;
      child.ready = false;
      child.onUnregister("parent", this);
      child.onUnregister("top", this.top);
      child.onUnmount();
    } else {
      this.top?.warn(`Child with name <${child.name}> not found in <${this.name}>. Cannot remove. (Child has ID <${child.id}>).`);
    }
  }
  destroy() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }
  debugTreeRender(x, y, spacing = { x: 120, y: 80 }) {
    const context = this.context || this.top && this.top.context;
    if (!context)
      return;
    const boxWidth = 100;
    const boxHeight = 40;
    const label = (this.debugEmoji || "") + this.name || this.id || "Node";
    context.fillStyle = "#fff";
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    context.fillRect(x - boxWidth / 2, y, boxWidth, boxHeight);
    context.strokeRect(x - boxWidth / 2, y, boxWidth, boxHeight);
    context.font = "14px sans-serif";
    context.textAlign = "center";
    context.fillStyle = "#000";
    const spriteRender = this;
    const animatedSprite = this;
    if (spriteRender && typeof spriteRender.image === "object" && spriteRender.image instanceof Image) {
      context.drawImage(spriteRender.image, x - 25 / 2, y + 2, 25, 25);
    } else if (animatedSprite && animatedSprite.frames && animatedSprite.currentAnimation && animatedSprite.currentFrameIndex !== undefined) {
      const currentFrame = animatedSprite.frames[animatedSprite.currentAnimation]?.[animatedSprite.currentFrameIndex];
      if (currentFrame && currentFrame instanceof Image) {
        context.drawImage(currentFrame, x - 25 / 2, y + 2, 25, 25);
      } else if (this.debugEmoji) {
        context.font = "20px sans-serif";
        context.fillText(this.debugEmoji, x, y + 22);
      }
    } else if (this.debugEmoji) {
      context.font = "20px sans-serif";
      context.fillText(this.debugEmoji, x, y + 22);
    }
    const labelText = this.name || this.id || "Node";
    context.font = "14px sans-serif";
    context.fillText(labelText, x, y + 38);
    if (this.childrenArray && this.childrenArray.length > 0) {
      const totalWidth = this.childrenArray.reduce((acc, child) => acc + (child._layoutWidth || 100), 0) + spacing.x * (this.childrenArray.length - 1);
      let currentX = x - totalWidth / 2;
      this.childrenArray.forEach((child) => {
        const childWidth = child._layoutWidth || 100;
        const childX = currentX + childWidth / 2;
        const childY = y + boxHeight + spacing.y;
        context.beginPath();
        context.moveTo(x, y + boxHeight);
        context.lineTo(childX, childY);
        context.stroke();
        if (typeof child.debugTreeRender === "function") {
          child.debugTreeRender(childX, childY, spacing);
        }
        currentX += childWidth + spacing.x;
      });
    }
  }
  child(name) {
    if (this.childrenArray.length === 0) {
      return;
    }
    let child = this._childrenByName[name] || (this._childrenByType[name] ? this._childrenByType[name][0] : undefined);
    if (!child) {
      return;
    }
    return child;
  }
  get superficialHeight() {
    return this._superficialHeight || 50;
  }
  get superficialWidth() {
    return this._superficialWidth || 100;
  }
  set superficialHeight(value) {
    this._superficialHeight = value;
    this.childrenArray.forEach((child) => {
      if (typeof child.setSuperficialDimensions === "function") {
        child.setSuperficialDimensions(this._superficialWidth, value);
      }
    });
  }
  set superficialWidth(value) {
    this._superficialWidth = value;
    this.childrenArray.forEach((child) => {
      if (typeof child.setSuperficialDimensions === "function") {
        child.setSuperficialDimensions(value, this._superficialHeight);
      }
    });
  }
  emptyChildren() {
    this.childrenArray = [];
    this._childrenByName = {};
    this._childrenByType = {};
  }
  _cloneAndAddChildren(clone, memo) {
    this.childrenArray.forEach((child) => {
      const clonedChild = child.clone(memo);
      clone.addChild(clonedChild);
    });
  }
  _cloneProperties(clone, memo) {
    memo.set(this, clone);
    clone.parent = undefined;
    clone.top = undefined;
    clone._childrenByName = {};
    clone._childrenByType = {};
    clone.childrenArray = [];
    this._cloneAndAddChildren(clone, memo);
    const clonedTies = new Set;
    this.ties.forEach((tie) => {
      const clonedTarget = tie.target;
      clonedTies.add({
        target: clonedTarget,
        localAttribute: tie.localAttribute,
        targetAttribute: tie.targetAttribute
      });
    });
    clone.ties = clonedTies;
    const clonedRegistrations = {};
    for (const regKey in this.registrations) {
      const regValue = this.registrations[regKey];
      clonedRegistrations[regKey] = regValue;
    }
    clone.registrations = clonedRegistrations;
    const clonedFlats = { colliders: [] };
    if (this.flats.colliders) {
      clonedFlats.colliders = this.flats.colliders.map((collider) => {
        return collider;
      });
    }
    clone.flats = clonedFlats;
    clone.id = generateUID();
    clone.name = this.name;
    clone.type = this.type;
    clone.debugEmoji = this.debugEmoji;
    clone.hoverbug = this.hoverbug;
    clone._layoutWidth = this._layoutWidth;
    clone._superficialWidth = this._superficialWidth;
    clone._superficialHeight = this._superficialHeight;
    clone.base = this.base;
    clone.warned = new Set(this.warned);
    return clone;
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clone = new this.constructor({ name: this.name });
    return this._cloneProperties(clone, memo);
  }
  isVisible(camera) {
    return false;
  }
  getPart(arg) {
    if (typeof arg === "string") {
      return this.childrenArray.find((child) => child.type === arg || child.base === arg);
    }
    return this.childrenArray.find((child) => child instanceof arg);
  }
  getChildPartRecursive(arg, found = []) {
    for (const child of this.childrenArray) {
      if (typeof arg !== "string" && child instanceof arg) {
        found.push(child);
      } else if (child.type === arg || child.base === arg) {
        found.push(child);
      }
      child.getChildPartRecursive(arg, found);
    }
    return found;
  }
  siblingOf(...args) {
    return this.parent?.childrenArray.find((child) => args.includes(child.type) || args.includes(child.base));
  }
}

// Parts/Scene.ts
class Scene extends Part {
  activeCamera = null;
  constructor({ name } = { name: "Scene" }) {
    super();
    this.name = name;
    this.debugEmoji = "\uD83C\uDFDE️";
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedScene = new Scene({
      name: this.name
    });
    memo.set(this, clonedScene);
    this._cloneProperties(clonedScene, memo);
    if (this.activeCamera && memo.has(this.activeCamera)) {
      clonedScene.activeCamera = memo.get(this.activeCamera);
    } else {
      clonedScene.activeCamera = null;
    }
    return clonedScene;
  }
  removeChild(child) {
    child.onUnregister("scene", this);
    super.removeChild(child);
  }
  addChild(part) {
    part.setAll("scene", this);
    super.addChild(part);
  }
  addChildren(...parts) {
    parts.forEach((part) => this.addChild(part));
  }
  act(delta) {
    if (!this.top) {
      throw new Error(`Act called on Scene <${this.name}> without a top-level parent. Ensure this scene is added to a Game instance before calling act().`);
    }
    if (!this.top || !(this.top instanceof Game)) {
      throw new Error("Scene must be attached to a Game instance.");
    }
    if (!this.top.canvas) {
      throw new Error("Game instance must have a canvas element.");
    }
    if (this.activeCamera && this.top instanceof Game) {
      const camera = this.activeCamera;
      applyCamera(this.top.context, camera);
    }
    super.act(delta);
    if (this.top instanceof Game && this.activeCamera) {
      resetCamera(this.top.context);
    }
  }
}

// Parts/SoundManager.ts
class SoundManagerController {
  static instance;
  sounds = [];
  isGameRunning = false;
  constructor() {}
  static getInstance() {
    if (!SoundManagerController.instance) {
      SoundManagerController.instance = new SoundManagerController;
    }
    return SoundManagerController.instance;
  }
  registerSound(sound) {
    if (!this.sounds.includes(sound)) {
      this.sounds.push(sound);
    }
  }
  unregisterSound(sound) {
    sound.stop();
    this.sounds = this.sounds.filter((s) => s !== sound);
  }
  pauseGame() {
    this.isGameRunning = false;
    this.sounds.forEach((sound) => sound.pause());
  }
  resumeGame() {
    this.isGameRunning = true;
    this.sounds.forEach((sound) => sound.resume());
  }
  startGame() {
    this.isGameRunning = true;
  }
  unregisterAllSounds() {
    this.sounds.forEach((sound) => sound.stop());
    this.sounds = [];
  }
  stopGame() {
    this.isGameRunning = false;
    this.sounds.forEach((sound) => sound.stop());
    SoundManager.unregisterAllSounds();
  }
  getIsGameRunning() {
    return this.isGameRunning;
  }
}
var SoundManager = SoundManagerController.getInstance();

// Parts/Game.ts
class Game extends Part {
  canvas;
  currentScene;
  childrenArray;
  devmode;
  context;
  hovering;
  scaleFactor = 1;
  canvasOffset = { x: 0, y: 0 };
  messageHook;
  showFrameStats = "BASIC";
  frameBuffer = [];
  maxFrameBufferLength = 60 * 5;
  _minFrameTime = Number.POSITIVE_INFINITY;
  _maxFrameTime = 0;
  _droppedFrames = 0;
  _isRunning = false;
  _width = 800;
  _height = 600;
  _isPaused = false;
  _animationFrameId;
  _lastUpdateTime = 0;
  constructor({ name, canvas, devmode = false, width, height, disableAntiAliasing = false, showtoolTips = false, showFrameStats = "BASIC" }) {
    super({ name });
    this.type = "Game";
    this.childrenArray = [];
    this.showFrameStats = showFrameStats;
    this.canvas = typeof canvas === "string" ? document.getElementById(canvas) : canvas;
    this.context = this.canvas.getContext("2d");
    this.devmode = devmode;
    this.changeCanvasSize(width, height);
    this.context.imageSmoothingEnabled = !disableAntiAliasing;
    this.debugEmoji = "\uD83C\uDFAE";
    this.top = this;
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedGame = new Game({
      name: this.name,
      canvas: document.createElement("canvas"),
      devmode: this.devmode,
      width: this.width,
      height: this.height,
      disableAntiAliasing: !this.context.imageSmoothingEnabled
    });
    memo.set(this, clonedGame);
    this._cloneProperties(clonedGame, memo);
    clonedGame.canvas = undefined;
    clonedGame.context = undefined;
    clonedGame.currentScene = undefined;
    clonedGame.hovering = undefined;
    clonedGame.scaleFactor = 1;
    clonedGame.canvasOffset = { x: 0, y: 0 };
    clonedGame.messageHook = undefined;
    clonedGame._isRunning = false;
    clonedGame._isPaused = false;
    clonedGame._animationFrameId = undefined;
    clonedGame._lastUpdateTime = 0;
    return clonedGame;
  }
  changeCanvasSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
  }
  set width(width) {
    this._width = width;
    this.canvas.width = width;
  }
  set height(height) {
    this._height = height;
    this.canvas.height = height;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  addChild(scene) {
    this.currentScene = this.currentScene || scene;
    scene.setTop(this);
    super.addChild(scene);
  }
  addChildren(...scenes) {
    scenes.forEach((scene) => this.addChild(scene));
  }
  start(starterScene) {
    if (typeof starterScene === "string") {
      const scene = this.child(starterScene);
      if (scene instanceof Scene) {
        this.currentScene = scene;
      } else {
        this.currentScene = this.childrenArray.find((s) => s.name === starterScene);
        if (!this.currentScene) {
          throw new Error(`Scene with name "${starterScene}" not found in game <${this.name}> (Does not exist as ID either. Please check your references).`);
        }
      }
    } else if (starterScene instanceof Scene) {
      this.currentScene = starterScene;
    } else {
      this.warn("No valid scene provided to start the game. Using the first scene found. Check console for more details");
      this.currentScene = this.childrenArray[0];
      if (!this.currentScene) {
        throw new Error("No scenes available to start the game.");
      }
    }
    this._isRunning = true;
    this._isPaused = false;
    this._lastUpdateTime = performance.now();
    this.onStart();
    SoundManager.startGame();
    this.loop();
  }
  loop() {
    if (!this._isRunning)
      return;
    if (!this._isPaused && this.currentScene) {
      const now = performance.now();
      const delta = now - this._lastUpdateTime;
      this._lastUpdateTime = now;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.devmode) {
        this.currentScene.calculateLayout();
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.currentScene.debugTreeRender(this.canvas.width / 2, 10, { x: 10, y: 40 });
        this.context.restore();
      }
      this.currentScene.preFrame();
      this.currentScene.act(delta);
      this.currentScene.frameEnd(delta);
      this.frameBuffer.push(delta);
      if (this.frameBuffer.length > this.maxFrameBufferLength) {
        this.frameBuffer.shift();
      }
      this._minFrameTime = Math.min(this._minFrameTime, delta);
      this._maxFrameTime = Math.max(this._maxFrameTime, delta);
      if (delta > 32)
        this._droppedFrames++;
      this.renderFrameStats();
    }
    if (this._isRunning) {
      this._animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
    }
  }
  getColliderCount(activeOnly = false) {
    const layers = this.currentScene?.childrenArray || [];
    let c = 0;
    for (const layer of layers) {
      if (!activeOnly) {
        const colliders = layer.flats.colliders.length;
        c += colliders;
      } else {
        const colliders = layer.flats.colliders.filter((col) => col.active).length;
        c += colliders;
      }
    }
    return c;
  }
  renderFrameStats() {
    if (!this.showFrameStats)
      return;
    const FADE_BACKGROUND = 0.5;
    const avgDelta = this.frameBuffer.reduce((a, b) => a + b, 0) / this.frameBuffer.length;
    const avgFPS = 1000 / avgDelta;
    const sorted = [...this.frameBuffer].sort((a, b) => a - b);
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    const p99 = sorted[Math.floor(sorted.length * 0.99)];
    const minFrameTime = sorted[0];
    const maxFrameTime = sorted[sorted.length - 1];
    let lines = [];
    const levels = ["BASIC", "EXTENDED", "ADVANCED", "PERFORMANCE_HUD"];
    const levelIndex = levels.indexOf(this.showFrameStats);
    if (levelIndex >= 0)
      lines.push(`FPS: ${avgFPS.toFixed(2)}`);
    if (levelIndex >= 1)
      lines.push(`Frame Time: ${avgDelta.toFixed(2)} ms`);
    if (levelIndex >= 2) {
      lines.push(`Min: ${minFrameTime.toFixed(2)} (${this._minFrameTime.toFixed(2)} AT) ms`);
      lines.push(`Max: ${maxFrameTime.toFixed(2)} (${this._maxFrameTime.toFixed(2)} AT) ms`);
    }
    if (levelIndex >= 3) {
      lines.push(`p95 Frame: ${p95.toFixed(2)} ms`);
      lines.push(`p99 Frame: ${p99.toFixed(2)} ms`);
      const droppedPct = this._droppedFrames / (this.frameBuffer.length || 1) * 100;
      lines.push(`Dropped Frames: ${droppedPct.toFixed(1)}%`);
      const perfMem = performance.memory;
      if (perfMem) {
        const usedMB = (perfMem.usedJSHeapSize / 1048576).toFixed(1);
        const totalMB = (perfMem.totalJSHeapSize / 1048576).toFixed(1);
        lines.push(`Heap: ${usedMB} MB / ${totalMB} MB`);
      }
      if (this.currentScene) {
        lines.push(`Colliders: ${this.getColliderCount()}`);
        lines.push(`Active colliders: ${this.getColliderCount(true)}`);
      }
    }
    const fontSize = 12;
    const lineHeight = 20;
    const padding = 8;
    this.context.font = `${fontSize}px Arial`;
    let maxWidth = 0;
    for (const line of lines) {
      const width = this.context.measureText(line).width;
      if (width > maxWidth)
        maxWidth = width;
    }
    let boxHeight = lines.length * lineHeight + padding * 2;
    let boxWidth = maxWidth + padding * 2;
    let boxX = 6;
    let boxY = 6;
    this.context.globalAlpha = FADE_BACKGROUND;
    this.context.fillStyle = "#000";
    this.context.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.context.globalAlpha = 1;
    this.context.fillStyle = "white";
    let y = boxY + padding + fontSize;
    for (const line of lines) {
      this.context.fillText(line, boxX + padding, y);
      y += lineHeight;
    }
    if (levelIndex >= 3) {
      const chartWidth = 200;
      const chartHeight = 80;
      const chartX = boxX + padding;
      const chartY = boxY + boxHeight + 10;
      const minFrameTimeChart = Math.min(...this.frameBuffer);
      const maxFrameTimeChart = Math.max(...this.frameBuffer);
      const margin = Math.max(2, (maxFrameTimeChart - minFrameTimeChart) * 0.2);
      const chartMin = Math.max(0, minFrameTimeChart - margin);
      const chartMax = maxFrameTimeChart + margin;
      const range = Math.max(1, chartMax - chartMin);
      this.context.globalAlpha = FADE_BACKGROUND;
      this.context.fillStyle = "#000";
      this.context.fillRect(chartX - padding, chartY - padding, chartWidth + padding * 2, chartHeight + padding * 2);
      this.context.globalAlpha = 1;
      this.context.strokeStyle = "white";
      this.context.beginPath();
      this.frameBuffer.forEach((frameTime, index) => {
        const x = chartX + index / (this.maxFrameBufferLength - 1) * chartWidth;
        const yVal = chartY + chartHeight - (frameTime - chartMin) / range * chartHeight;
        if (index === 0) {
          this.context.moveTo(x, yVal);
        } else {
          this.context.lineTo(x, yVal);
        }
      });
      this.context.stroke();
    }
  }
  pause() {
    this._isPaused = true;
    this.debug("Game paused");
    SoundManager.pauseGame();
  }
  resume() {
    this.debug("Game resumed");
    this._isPaused = false;
    SoundManager.resumeGame();
  }
  stop() {
    this._isRunning = false;
    this._isPaused = false;
    if (this._animationFrameId) {
      window.cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }
    SoundManager.stopGame();
    this.childrenArray.forEach((scene) => {
      scene.destroy();
    });
  }
  get isRunning() {
    return this._isRunning;
  }
  get isPaused() {
    return this._isPaused;
  }
  act(purposeful = false) {
    if (!this.warned.has("ActUsage") && !purposeful) {
      const seen = this.warn(`Act called on Game <${this.name}>. Use start() to begin the game loop. Calling act() directly will run 1 frame of the current scene. This message will appear only once.`);
      if (seen)
        this.warned.add("ActUsage");
    }
    if (this.currentScene) {
      this.currentScene.act(0);
    } else {
      this.warn(`No current scene set in <${this.name}>, and no available scenes to run as the current scene in game <${this.name}>. Please ensure you have added scenes and/or set a current scene before calling act().`);
    }
  }
  setScene(scene) {
    if (typeof scene === "string") {
      const foundScene = this.childrenArray.find((s) => s.name === scene || s.id === scene);
      if (foundScene) {
        this.currentScene = foundScene;
      } else {
        throw new Error(`Scene with name or ID "${scene}" not found in game <${this.name}>. Please ensure the scene exists and is added to the game.`);
      }
    } else if (scene instanceof Scene) {
      this.currentScene = scene;
    } else {
      console.error("Set unknown scene type- neither string nor Scene instance");
      let json;
      try {
        json = JSON.stringify(scene);
      } catch (error) {
        json = `<Error Parsing JSON: ${error?.message || "Error"}>`;
      }
      this.debug(`Trying to set scene to unknown type- neither string nor Scene instance. Got ${typeof scene} - ${json}`);
    }
  }
  warn(...args) {
    if (this.messageHook && typeof this.messageHook === "function") {
      this.messageHook("warn", ...args);
      return true;
    } else {
      console.warn(`[${this.name}] - WARN`, ...args);
      return false;
    }
  }
  error(...args) {
    if (this.messageHook && typeof this.messageHook === "function") {
      this.messageHook("error", ...args);
      return true;
    } else {
      console.error(`[${this.name}] - ERROR`, ...args);
      return false;
    }
  }
  debug(...args) {
    if (this.messageHook && typeof this.messageHook === "function") {
      this.messageHook("debug", ...args);
      return true;
    } else {
      console.debug(`[${this.name}]`, ...args);
      return false;
    }
  }
}
// Math/SpatialGrid.ts
class SpatialGrid {
  cells;
  cellSize;
  constructor(cellSize) {
    this.cells = new Map;
    this.cellSize = cellSize;
  }
  getKey(x, y) {
    return `${Math.floor(x / this.cellSize)}_${Math.floor(y / this.cellSize)}`;
  }
  clear() {
    this.cells.clear();
  }
  insert(collider) {
    const start = collider.realWorldStart;
    const end = collider.realWorldEnd;
    const startX = Math.floor(start.x / this.cellSize);
    const startY = Math.floor(start.y / this.cellSize);
    const endX = Math.floor(end.x / this.cellSize);
    const endY = Math.floor(end.y / this.cellSize);
    for (let x = startX;x <= endX; x++) {
      for (let y = startY;y <= endY; y++) {
        const key = `${x}_${y}`;
        if (!this.cells.has(key)) {
          this.cells.set(key, []);
        }
        this.cells.get(key).push(collider);
      }
    }
  }
  query(collider) {
    const candidates = new Set;
    const start = collider.realWorldStart;
    const end = collider.realWorldEnd;
    const startX = Math.floor(start.x / this.cellSize);
    const startY = Math.floor(start.y / this.cellSize);
    const endX = Math.floor(end.x / this.cellSize);
    const endY = Math.floor(end.y / this.cellSize);
    for (let x = startX;x <= endX; x++) {
      for (let y = startY;y <= endY; y++) {
        const key = `${x}_${y}`;
        if (this.cells.has(key)) {
          for (const other of this.cells.get(key)) {
            candidates.add(other);
          }
        }
      }
    }
    return Array.from(candidates);
  }
}

// Parts/Layer.ts
class Layer extends Part {
  spatialGrid;
  constructor({ name }) {
    super({ name });
    this.type = "Layer";
    this.id = generateUID();
    this.debugEmoji = "\uD83D\uDDC2️";
    this.spatialGrid = new SpatialGrid(50);
  }
  addChild(part) {
    part.setAll("layer", this);
    super.addChild(part);
  }
  addChildren(...parts) {
    parts.forEach((part) => this.addChild(part));
  }
  removeChild(part) {
    part.onUnregister("layer", this);
    super.removeChild(part);
  }
  act(delta) {
    if (!this.ready) {
      return;
    }
    this.spatialGrid.clear();
    const colliders = this.flats.colliders;
    for (const collider of colliders) {
      if (collider.active) {
        this.spatialGrid.insert(collider);
      }
    }
    this.ties.forEach((tie) => {
      if (tie.target && tie.target.hasOwnProperty(tie.targetAttribute)) {
        const value = this.attr(tie.localAttribute);
        tie.target.attr(tie.targetAttribute, value);
      }
    });
    this.childrenArray.forEach((child) => {
      child.act(delta);
    });
  }
}
// Parts/GameObject.ts
class GameObject extends Part {
  layer;
  constructor({ name, render = true }) {
    super({ name, render: !!render });
    this.type = "GameObject";
    this.debugEmoji = "\uD83D\uDD79️";
  }
}
// Math/Vector.ts
class Vector {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  distance(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
  add(other) {
    if (other instanceof Vector) {
      return new Vector(this.x + other.x, this.y + other.y);
    }
    return new Vector(this.x + other, this.y + other);
  }
  toObject() {
    return { x: this.x, y: this.y };
  }
  toArray() {
    return [this.x, this.y];
  }
  subtract(other) {
    if (other instanceof Vector) {
      return new Vector(this.x - other.x, this.y - other.y);
    }
    return new Vector(this.x - other, this.y - other);
  }
  multiply(other) {
    if (other instanceof Vector) {
      return new Vector(this.x * other.x, this.y * other.y);
    }
    return new Vector(this.x * other, this.y * other);
  }
  divide(other) {
    if (other instanceof Vector) {
      if (other.x === 0 || other.y === 0)
        throw new Error("Cannot divide by zero");
      return new Vector(this.x / other.x, this.y / other.y);
    }
    if (other === 0)
      throw new Error("Cannot divide by zero");
    return new Vector(this.x / other, this.y / other);
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  magnitude() {
    return this.length();
  }
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  toString() {
    return `[${this.x}, ${this.y}]`;
  }
  normalize() {
    const len = this.length();
    if (len === 0) {
      return new Vector(0, 0);
    }
    return new Vector(this.x / len, this.y / len);
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  clone() {
    return new Vector(this.x, this.y);
  }
  set(...args) {
    if (args.length === 1 && args[0] instanceof Vector) {
      this.x = args[0].x;
      this.y = args[0].y;
    } else if (args.length === 2) {
      this.x = args[0];
      this.y = args[1];
    } else {
      throw new Error("Invalid arguments for set method");
    }
    return this;
  }
  addInPlace(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  static From(scalar) {
    if (typeof scalar === "number") {
      return new Vector(scalar, scalar);
    } else {
      return new Vector(scalar.x, scalar.y);
    }
  }
}
// Parts/Input.ts
class Input extends Part {
  key;
  keyup;
  mousemove;
  click;
  downkeys = new Set;
  currentMousePos = { x: 0, y: 0 };
  lastClickPos = null;
  initialized;
  mousemoveDef;
  clickDef;
  mousedownDef;
  mouseupDef;
  keydownDef;
  keyupDef;
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedInput = new Input({
      key: this.key || (() => {}),
      keyup: this.keyup || (() => {}),
      mousemove: this.mousemove || (() => {}),
      click: this.click || (() => {})
    });
    memo.set(this, clonedInput);
    this._cloneProperties(clonedInput, memo);
    clonedInput.downkeys = new Set;
    clonedInput.currentMousePos = { x: 0, y: 0 };
    clonedInput.lastClickPos = null;
    clonedInput.initialized = false;
    clonedInput.mousemoveDef = undefined;
    clonedInput.clickDef = undefined;
    clonedInput.mousedownDef = undefined;
    clonedInput.mouseupDef = undefined;
    clonedInput.keydownDef = undefined;
    clonedInput.keyupDef = undefined;
    return clonedInput;
  }
  constructor({
    key,
    keyup,
    mousemove,
    click
  }) {
    super({ name: "Input" });
    this.debugEmoji = "⌨️";
    this.key = key;
    this.keyup = keyup;
    this.mousemove = mousemove;
    this.click = click;
    this.initialized = false;
    this.type = "Input";
  }
  initialize(canvas) {
    this.mousemoveDef = (event) => {
      if (event.target !== canvas)
        return;
      const game = this.top;
      if (!game || !game.currentScene || game.currentScene !== this.parent || !game.currentScene?.activeCamera) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const gameCanvas = game.canvas;
      const mouseX = (event.clientX - rect.left) * (gameCanvas.width / rect.width);
      const mouseY = (event.clientY - rect.top) * (gameCanvas.height / rect.height);
      const camera = game.currentScene?.activeCamera;
      let finalX = mouseX;
      let finalY = mouseY;
      if (camera) {
        const view = camera.getViewMatrix();
        const transform = camera.child("Transform");
        if (!transform) {
          if (!this.warned.has("TransformMissing")) {
            this.top?.warn("Camera does not have a Transform child.") && this.warned.add("TransformMissing");
          }
          return;
        }
        finalX = (mouseX - game.canvas.width / 2) / view.scale.x + transform.worldPosition.x;
        finalY = (mouseY - game.canvas.height / 2) / view.scale.y + transform.worldPosition.y;
      }
      this.currentMousePos = { x: finalX, y: finalY };
    };
    this.clickDef = (event) => {
      const game = this.top;
      if (!game || !game.currentScene || game.currentScene !== this.parent || !game.currentScene?.activeCamera) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const gameCanvas = game.canvas;
      const mouseX = (event.clientX - rect.left) * (gameCanvas.width / rect.width);
      const mouseY = (event.clientY - rect.top) * (gameCanvas.height / rect.height);
      const camera = game.currentScene?.activeCamera;
      let finalX = mouseX;
      let finalY = mouseY;
      if (camera) {
        const view = camera.getViewMatrix();
        const transform = camera.child("Transform");
        if (!transform) {
          this.top?.warn("Camera does not have a Transform child.");
          return;
        }
        finalX = (mouseX - game.canvas.width / 2) / view.scale.x + transform.worldPosition.x;
        finalY = (mouseY - game.canvas.height / 2) / view.scale.y + transform.worldPosition.y;
      }
      this.lastClickPos = { x: finalX, y: finalY };
    };
    this.mousedownDef = (event) => {
      const game = this.top;
      if (game.hovering) {
        game.hovering.onmousedown(event);
      }
    };
    this.mouseupDef = (event) => {
      const game = this.top;
      if (game.hovering) {
        game.hovering.onmouseup(event);
      }
    };
    this.keydownDef = (event) => {
      this.downkeys.add(event.key);
    };
    this.keyupDef = (event) => {
      this.downkeys.delete(event.key);
      if (typeof this.keyup == "function") {
        this.keyup(event);
      }
    };
    canvas.addEventListener("mousemove", this.mousemoveDef);
    canvas.addEventListener("click", this.clickDef);
    canvas.addEventListener("mousedown", this.mousedownDef);
    canvas.addEventListener("mouseup", this.mouseupDef);
    document.addEventListener("keydown", this.keydownDef);
    document.addEventListener("keyup", this.keyupDef);
    this.initialized = true;
  }
  destroy() {
    super.destroy();
    const canvas = this.top?.canvas;
    if (canvas) {
      canvas.removeEventListener("mousemove", this.mousemoveDef);
      canvas.removeEventListener("click", this.clickDef);
      canvas.removeEventListener("mousedown", this.mousedownDef);
      canvas.removeEventListener("mouseup", this.mouseupDef);
      document.removeEventListener("keydown", this.keydownDef);
      document.removeEventListener("keyup", this.keyupDef);
    }
  }
  act(delta) {
    super.act(delta);
    if (!this.initialized) {
      if (!this.top || !(this.top instanceof Game)) {
        throw new Error("Input must be attached to a Game instance.");
      }
      if (!this.top.canvas) {
        throw new Error("Game instance must have a canvas element.");
      }
      this.initialize(this.top.canvas);
    }
    const game = this.top;
    if (!game || !game.currentScene || game.currentScene !== this.parent) {
      return;
    }
    if (this.currentMousePos) {
      const childrenFlat = game.currentScene.childrenArray.flatMap((child) => child.childrenArray);
      childrenFlat.sort((a, b) => {
        const layers = game.currentScene?.childrenArray.filter((l) => l instanceof Layer) || [];
        layers.sort((a2, b2) => {
          const aIndex = game.currentScene?.childrenArray.indexOf(a2) || 0;
          const bIndex = game.currentScene?.childrenArray.indexOf(b2) || 0;
          return aIndex - bIndex;
        });
        return layers.indexOf(a) - layers.indexOf(b);
      });
      const hovered = childrenFlat.find((child) => {
        if (child.child("Transform")) {
          return isPointInObject(this.currentMousePos.x, this.currentMousePos.y, child);
        }
        return false;
      });
      if (game.hovering && game.hovering !== hovered) {
        game.hovering.onunhover();
        game.hovering = undefined;
      }
      if (hovered && game.hovering !== hovered) {
        game.hovering = hovered;
        hovered.onhover();
      }
    }
    if (this.lastClickPos) {
      const childrenFlat = game.currentScene.childrenArray.flatMap((child) => child.childrenArray);
      childrenFlat.sort((a, b) => {
        const layers = game.currentScene?.childrenArray.filter((l) => l instanceof Layer) || [];
        layers.sort((a2, b2) => {
          const aIndex = game.currentScene?.childrenArray.indexOf(a2) || 0;
          const bIndex = game.currentScene?.childrenArray.indexOf(b2) || 0;
          return aIndex - bIndex;
        });
        return layers.indexOf(a) - layers.indexOf(b);
      });
      const clicked = childrenFlat.find((child) => {
        if (child.child("Transform")) {
          return isPointInObject(this.lastClickPos.x, this.lastClickPos.y, child);
        }
        return false;
      });
      if (clicked) {
        if (typeof this.click == "function") {
          this.click(new MouseEvent("click"), clicked);
        }
      }
      this.lastClickPos = null;
    }
    this.downkeys.forEach((key) => {
      if (typeof this.key == "function") {
        this.key(new KeyboardEvent("keydown", { key }));
      }
    });
  }
}
// Parts/Children/Renderer.ts
class Renderer extends Part {
  width;
  height;
  facing = new Vector(1, 1);
  disableAntiAliasing = false;
  constructor({ width, height, disableAntiAliasing }) {
    super({ name: "Renderer" });
    this.width = width;
    this.height = height;
    this.disableAntiAliasing = disableAntiAliasing || false;
    this.debugEmoji = "\uD83C\uDFA8";
    this.type = "Renderer";
    this.base = "Rednerer";
  }
  face(direction) {
    if (direction.x !== -1 && direction.x !== 1 && direction.y !== -1 && direction.y !== 1) {
      throw new Error("Direction must be vector with -1 or 1 in x and y axis");
    }
    this.facing = direction;
  }
}

// Parts/Children/AnimatedSprite.ts
class AnimatedSprite extends Renderer {
  spritesheet;
  spritesheetData;
  loadedSheet;
  frames = {};
  currentFrameIndex = 0;
  width;
  height;
  bouncing = false;
  currentAnimation = "default";
  disableAntiAliasing = false;
  webEngine = false;
  onAnimationComplete;
  spritesheetImage;
  startLoop;
  startBouncing;
  lastFrameTime = performance.now();
  constructor({ spritesheet, spritesheetImage, width, height, startingAnimation, disableAntiAliasing = false, onAnimationComplete, webEngine = false, bounce = false, loop = true }) {
    super({ width, height });
    this.name = "AnimatedSprite";
    this.debugEmoji = "\uD83C\uDF9E️";
    this.spritesheet = spritesheet;
    this.width = width;
    this.height = height;
    this.ready = false;
    this.startLoop = loop;
    this.startBouncing = bounce;
    this.spritesheetImage = spritesheetImage;
    this.currentAnimation = startingAnimation || "default";
    this.disableAntiAliasing = disableAntiAliasing;
    this.onAnimationComplete = onAnimationComplete;
    this.webEngine = webEngine;
    this.type = "AnimatedSprite";
    this.base = "Renderer";
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedSprite = new AnimatedSprite({
      spritesheet: this.spritesheet,
      spritesheetImage: this.spritesheetImage,
      width: this.width,
      height: this.height,
      startingAnimation: this.currentAnimation,
      disableAntiAliasing: this.disableAntiAliasing,
      onAnimationComplete: this.onAnimationComplete,
      webEngine: this.webEngine,
      bounce: this.startBouncing,
      loop: this.startLoop
    });
    memo.set(this, clonedSprite);
    this._cloneProperties(clonedSprite, memo);
    clonedSprite.ready = false;
    clonedSprite.currentFrameIndex = 0;
    clonedSprite.loadedSheet = undefined;
    clonedSprite.frames = {};
    clonedSprite.spritesheetData = undefined;
    clonedSprite.lastFrameTime = performance.now();
    return clonedSprite;
  }
  destroy() {
    super.destroy();
    if (this.loadedSheet) {
      this.loadedSheet.src = "";
      this.loadedSheet = undefined;
    }
    this.frames = {};
    this.spritesheetData = undefined;
    this.spritesheet = "";
  }
  async onMount(parent) {
    super.onMount(parent);
    parent.setSuperficialDimensions(this.width, this.height);
    let spritesheetData;
    if (!this.spritesheet) {
      return;
    }
    if (this.spritesheet.startsWith("data:application/json")) {
      spritesheetData = JSON.parse(atob(this.spritesheet.split(",")[1]));
    } else {
      const response = await fetch(this.spritesheet);
      if (!response.ok) {
        throw new Error(`Failed to load spritesheet: ${response.statusText}`);
      }
      spritesheetData = await response.json();
    }
    if (!spritesheetData.frames || !Array.isArray(spritesheetData.frames)) {
      throw new Error("Invalid spritesheet format: 'frames' array is missing or not an array.");
    }
    if (!spritesheetData.meta || !spritesheetData.meta.image) {
      throw new Error("Invalid spritesheet format: 'meta.image' is missing.");
    }
    if (!spritesheetData.meta.size || typeof spritesheetData.meta.size.w !== "number" || typeof spritesheetData.meta.size.h !== "number") {
      throw new Error("Invalid spritesheet format: 'meta.size' is missing or invalid.");
    }
    if (!spritesheetData.meta.animations || typeof spritesheetData.meta.animations !== "object") {
      throw new Error("Invalid spritesheet format: 'meta.animations' is missing or not an object.");
    }
    const image = new Image;
    if (this.spritesheetImage) {
      image.src = this.spritesheetImage;
    } else {
      if (!this.webEngine) {
        const relativeToSpritesheet = this.spritesheet.startsWith("data:") ? "" : this.spritesheet.split("/").slice(0, -1).join("/");
        const path = spritesheetData.meta.image.startsWith("http") ? spritesheetData.meta.image : new URL(relativeToSpritesheet + "/" + spritesheetData.meta.image, window.location.href).href;
        image.src = path;
      }
    }
    image.onerror = (err) => {
      this.top?.error(`Failed to load spritesheet image <${spritesheetData.meta.image}>:`, err);
      console.error("Failed to load spritesheet image", err);
      this.ready = false;
    };
    this.spritesheetData = spritesheetData;
    this.frames = Object.fromEntries(Object.keys(spritesheetData.meta.animations).map((animationName) => [animationName, Array(spritesheetData.meta.animations[animationName].frames.length).fill(null)]));
    await new Promise((resolve, reject) => {
      image.onload = () => {
        this.loadedSheet = image;
        resolve();
      };
      image.onerror = (err) => {
        this.top?.error(`Failed to load spritesheet image <${spritesheetData.meta.image}>:`, err);
        this.ready = false;
        reject(err);
      };
    });
    const frameLoadPromises = [];
    for (const animation of Object.keys(this.frames)) {
      this.frames[animation] = new Array(this.frames[animation].length);
      for (let i = 0;i < this.frames[animation].length; i++) {
        const frameIndex = this.spritesheetData?.frames.findIndex((frame2) => frame2.filename === this.spritesheetData.meta.animations[animation].frames[i]);
        if (frameIndex === -1) {
          throw new Error(`Frame '${this.spritesheetData.meta.animations[animation].frames[i]}' does not exist in spritesheet for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
        }
        const frame = this.frame(frameIndex);
        if (frame) {
          this.frames[animation][i] = frame;
          frameLoadPromises.push(new Promise((resolve, reject) => {
            frame.onload = () => {
              resolve();
            };
            frame.onerror = (err) => {
              this.top?.error(`Failed to load frame at index ${i} for animated sprite <${this.name}>:`, err);
              reject(err);
            };
          }));
        } else {
          throw new Error(`Failed to create frame at index ${i} for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
        }
      }
    }
    await Promise.all(frameLoadPromises);
    if (this.currentAnimation === "default" && this.spritesheetData.meta.startingAnimation) {
      this.currentAnimation = this.spritesheetData.meta.startingAnimation;
      this.setAnimation(this.currentAnimation, { loop: this.startLoop, bounce: this.startBouncing });
    } else if (this.currentAnimation === "default" && Object.keys(this.spritesheetData.meta.animations).length > 0) {
      this.currentAnimation = Object.keys(this.spritesheetData.meta.animations)[0];
      this.setAnimation(this.currentAnimation, { loop: this.startLoop, bounce: this.startBouncing });
    }
    this.ready = true;
  }
  frame(index) {
    if (!this.loadedSheet || !this.spritesheetData) {
      this.top?.warn("AnimatedSprite is not ready or spritesheet data is missing.");
      return null;
    }
    const frameData = this.spritesheetData.frames[index];
    if (!frameData) {
      this.top?.warn(`${this.name} attached to ${this.parent?.name} frame at index ${index} was indexed but does not exist in spritesheet`);
      return null;
    }
    const { x, y, w, h } = frameData.frame;
    const rotated = frameData.rotated;
    const spriteSourceSize = frameData.spriteSourceSize;
    const sourceSize = frameData.sourceSize;
    const canvas = document.createElement("canvas");
    canvas.width = sourceSize.w;
    canvas.height = sourceSize.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      this.top?.error("Failed to get canvas context.");
      return null;
    }
    ctx.imageSmoothingEnabled = !this.disableAntiAliasing;
    ctx.save();
    if (rotated) {
      ctx.translate(sourceSize.w / 2, sourceSize.h / 2);
      ctx.rotate(90 * Math.PI / 180);
      ctx.translate(-sourceSize.h / 2, -sourceSize.w / 2);
      ctx.drawImage(this.loadedSheet, x, y, h, w, spriteSourceSize.y, spriteSourceSize.x, spriteSourceSize.h, spriteSourceSize.w);
    } else {
      ctx.drawImage(this.loadedSheet, x, y, w, h, spriteSourceSize.x, spriteSourceSize.y, spriteSourceSize.w, spriteSourceSize.h);
    }
    ctx.restore();
    const string = canvas.toDataURL("image/png");
    const img = new Image;
    img.src = string;
    return img;
  }
  setAnimation(animationName, { loop, bounce } = {}) {
    if (this.spritesheetData && this.spritesheetData.meta.animations[animationName]) {
      this.currentAnimation = animationName;
      this.currentFrameIndex = 0;
      this.bouncing = bounce ?? this.spritesheetData.meta.animations[animationName].bounce ?? false;
      if (loop !== undefined) {
        this.spritesheetData.meta.animations[this.currentAnimation].loop = loop;
      }
    } else {
      this.top?.warn(`Animation '${animationName}' does not exist in spritesheet for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
    }
  }
  act(deltaTime) {
    super.act(deltaTime);
    if (!this.ready) {
      return;
    }
    const duration = this.spritesheetData?.frames[this.currentFrameIndex].duration || 100;
    const now = performance.now();
    const between = now - this.lastFrameTime;
    if (this.ready && this.spritesheetData) {
      if (between > duration) {
        this.lastFrameTime = now;
        if (this.spritesheetData.meta.animations[this.currentAnimation].bounce) {
          let direction = this.bouncing ? -1 : 1;
          const animFrames = this.spritesheetData.meta.animations[this.currentAnimation].frames.length;
          if (this.currentFrameIndex + direction < 0 || this.currentFrameIndex + direction >= animFrames) {
            this.bouncing = !this.bouncing;
            direction *= -1;
          }
          this.currentFrameIndex += direction;
          if (this.currentFrameIndex < 0)
            this.currentFrameIndex = 0;
          if (this.currentFrameIndex >= animFrames)
            this.currentFrameIndex = animFrames - 1;
        } else {
          const animFrames = this.spritesheetData.meta.animations[this.currentAnimation].frames.length;
          const shouldLoop = this.spritesheetData.meta.animations[this.currentAnimation].loop !== false;
          if (shouldLoop) {
            const wasAtLastFrame = this.currentFrameIndex === animFrames - 1;
            this.currentFrameIndex = (this.currentFrameIndex + 1) % animFrames;
            if (wasAtLastFrame && this.onAnimationComplete) {
              this.onAnimationComplete(this.currentAnimation, this);
            }
          } else {
            if (this.currentFrameIndex < animFrames - 1) {
              this.currentFrameIndex++;
            } else if (this.currentFrameIndex === animFrames - 1 && this.onAnimationComplete) {
              this.onAnimationComplete(this.currentAnimation, this);
            }
          }
        }
      }
      const transform = this.sibling("Transform");
      if (!transform) {
        if (!this.warned.has("TransformMissing")) {
          this.top?.warn(`AnimatedSprite <${this.name}> attached to ${this.parent?.name} does not have a Transform component. Skipping rendering. This will only show once.`) && this.warned.add("TransformMissing");
        }
        return;
      }
      if (!this.top) {
        throw new Error(`AnimatedSprite <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game, Scene, or Layer before rendering.`);
      }
      if (this.top.context) {
        this.top.context.imageSmoothingEnabled = !this.disableAntiAliasing;
        const position = transform.worldPosition;
        const frame = this.frames[this.currentAnimation][this.currentFrameIndex];
        if (frame) {
          this.top.context.save();
          this.top.context.translate(position.x, position.y);
          this.top.context.rotate(transform.rotation);
          this.top.context.imageSmoothingEnabled = !this.disableAntiAliasing;
          this.top.context.scale(transform.scale.x * this.facing.x, transform.scale.y * this.facing.y);
          this.top.context.drawImage(frame, -this.width / 2, -this.height / 2, this.width, this.height);
          this.top.context.restore();
        } else {
          this.top?.warn(`Frame (${this.currentAnimation}) index ${this.currentFrameIndex} does not exist for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
        }
      } else {
        throw new Error(`AnimatedSprite <${this.name}> attached to ${this.parent?.name} does not have a context to render to. Ensure it is added to a Game, Scene, or Layer with a game ancestor.`);
      }
    }
    const barHeight = 15;
    const barWidth = 6;
    const progress = this.lastFrameTime / duration;
    this.hoverbug = `${this.ready ? "✅" : "❌"} ${this.spritesheetData?.meta.animations[this.currentAnimation].loop ? "\uD83D\uDD01" : ""}` + `<div style="display:inline-block; width:${barWidth}px; height:${barHeight}px; background:linear-gradient(to top, dodgerblue ${progress * 100}%, #ccc ${progress * 100}%); border-radius:3px; border:1px solid #888; vertical-align:middle;border-radius:0px"></div> ` + `${this.frames[this.currentAnimation]?.map((frame, i) => {
      if (!frame)
        return "";
      frame.style.cssText = `display:inline-block; margin-right:2px;width:10px; height:10px; border: 1px solid ${i === this.currentFrameIndex ? "green" : "white"};`;
      return frame.outerHTML;
    }).join("") || ""}` + `${this.currentAnimation} ${this.bouncing ? "\uD83D\uDD04" : ""}`;
  }
}
// Parts/Children/Collider.ts
class Collider extends Part {
  colliding = false;
  collidingWith = new Set;
  tag = "";
  radius;
  realWorldStart;
  realWorldEnd;
  vertices;
  active = true;
  allowMerge;
  randomTestingColors;
  constructor({ tag, allowMerge }) {
    super({ name: "Collider" });
    this.type = "Collider";
    this.base = "Collider";
    this.tag = tag || "<Untagged>";
    this.radius = 0;
    this.realWorldStart = new Vector(0, 0);
    this.allowMerge = allowMerge !== undefined ? allowMerge : true;
    this.realWorldEnd = new Vector(0, 0);
    this.randomTestingColors = [
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255
    ];
    this.vertices = [];
  }
  setTag(tag) {
    this.tag = tag;
  }
  onMount(parent) {
    super.onMount(parent);
    const transform = this.sibling("Transform");
    if (!transform) {
      this.top?.warn(`Collider <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component.`);
      return;
    }
    this.updateCollider(transform);
  }
  onRegister(attribute, value) {
    super.onRegister(attribute, value);
    if (attribute === "layer") {
      value.flats.colliders.push(this);
    }
  }
  evaluateMerging() {
    const layer = this.registrations["layer"];
    if (!layer)
      return;
    const candidates = layer.spatialGrid.query(this);
    const fellowColliders = candidates.filter((c) => c.tag == this.tag && c.id !== this.id && c.allowMerge && c.active);
    if (fellowColliders.length == 0)
      return;
    for (const fellow of fellowColliders) {
      if (!fellow.sibling("Transform")?.initialized)
        continue;
      if (this.id < fellow.id && this.checkCollision(fellow, true)) {
        this.mergeWith(fellow);
      }
    }
  }
  mergeWith(other) {
    if (this.tag !== other.tag || other.tag == "<Untagged>" || this.tag == "<Untagged>")
      return;
    const thisTransform = this.sibling("Transform");
    if (!thisTransform) {
      this.top?.warn(`Collider <${this.name}> has no Transform sibling, cannot merge.`);
      return;
    }
    const allPolygons = [];
    const g1 = this.getGeometry();
    if (this.type === "MultiPolygonCollider") {
      allPolygons.push(...g1);
    } else {
      allPolygons.push(g1);
    }
    const g2 = other.getGeometry();
    if (other.type === "MultiPolygonCollider") {
      allPolygons.push(...g2);
    } else {
      allPolygons.push(g2);
    }
    if (allPolygons.length === 0)
      return;
    const localPolygons = allPolygons.map((polygon) => {
      return polygon.map(([x, y]) => thisTransform.worldToLocal(new Vector(x, y)));
    });
    this._updateVerticesAfterMerge(localPolygons);
    other.inactivate();
  }
  onStart() {}
  inactivate() {
    this.active = false;
  }
  activate() {
    this.active = true;
  }
  act(delta) {
    super.act(delta);
    if (!this.active)
      return;
    if (!this.registrations?.layer) {
      throw new Error(`Collider <${this.name}> (${this.id}) is not registered to a layer. Collisions will not be checked.`);
    }
    const transform = this.sibling("Transform");
    if (!transform)
      return;
    this.updateCollider(transform);
    this.colliding = false;
    this.collidingWith.clear();
    const layer = this.registrations.layer;
    const candidates = layer.spatialGrid.query(this);
    for (const other of candidates) {
      if (other === this)
        continue;
      if (this.checkCollision(other)) {
        this.colliding = true;
        this.collidingWith.add(other);
      }
    }
    this.hoverbug = `${this.colliding ? "\uD83D\uDFE5" : "\uD83D\uDFE9"} - ${Array.from(this.collidingWith).map((o) => o.name).join(", ")} objects`;
    const fill = this.active;
    const ctx = this.top instanceof Game ? this.top.context : null;
    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = `rgb(${this.randomTestingColors[0]}, ${this.randomTestingColors[1]}, ${this.randomTestingColors[2]})`;
      ctx.fillStyle = fill ? `rgba(${this.randomTestingColors[0]}, ${this.randomTestingColors[1]}, ${this.randomTestingColors[2]}, 0.5)` : "transparent";
      ctx.moveTo(this.worldVertices[0].x, this.worldVertices[0].y);
      for (const vertex of this.worldVertices) {
        ctx.lineTo(vertex.x, vertex.y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
    if (this.top instanceof Game && this.top.devmode) {
      const ctx2 = this.top.context;
      if (ctx2) {
        this.drawDebug(ctx2);
      }
    }
  }
  checkCollision(other, ignoreTags = false) {
    const thisTransform = this.sibling("Transform");
    const otherTransform = other.sibling("Transform");
    if (!thisTransform || !otherTransform) {
      return false;
    }
    this.updateCollider(thisTransform);
    other.updateCollider(otherTransform);
    if (!ignoreTags && other.tag === this.tag && this.tag !== "<Untagged>")
      return false;
    if (this.realWorldEnd.x < other.realWorldStart.x || this.realWorldStart.x > other.realWorldEnd.x || this.realWorldEnd.y < other.realWorldStart.y || this.realWorldStart.y > other.realWorldEnd.y) {
      return false;
    }
    return this.narrowPhaseCheck(other);
  }
  isVisible(camera) {
    if (!this.top) {
      throw new Error("Collider cannot calculate visibility without a 'top' (Game instance).");
    }
    const transform = this.sibling("Transform");
    if (!transform) {
      return false;
    }
    this.updateCollider(transform);
    const { offset, scale } = camera.getViewMatrix();
    const cameraPos = offset.multiply(-1);
    const screenWidth = this.top.width;
    const screenHeight = this.top.height;
    const viewWidth = screenWidth / scale.x;
    const viewHeight = screenHeight / scale.y;
    const cameraVertices = [
      new Vector(cameraPos.x - viewWidth / 2, cameraPos.y - viewHeight / 2),
      new Vector(cameraPos.x + viewWidth / 2, cameraPos.y - viewHeight / 2),
      new Vector(cameraPos.x + viewWidth / 2, cameraPos.y + viewHeight / 2),
      new Vector(cameraPos.x - viewWidth / 2, cameraPos.y + viewHeight / 2)
    ];
    return this.checkVerticesAgainstVertices(this.worldVertices, cameraVertices);
  }
  checkVerticesAgainstVertices(vertices1, vertices2) {
    const axes1 = this.getAxes(vertices1);
    for (const axis of axes1) {
      const projection1 = this.project(vertices1, axis);
      const projection2 = this.project(vertices2, axis);
      if (!this.overlap(projection1, projection2)) {
        return false;
      }
    }
    const axes2 = this.getAxes(vertices2);
    for (const axis of axes2) {
      const projection1 = this.project(vertices1, axis);
      const projection2 = this.project(vertices2, axis);
      if (!this.overlap(projection1, projection2)) {
        return false;
      }
    }
    return true;
  }
  getAxes(vertices) {
    const axes = [];
    for (let i = 0;i < vertices.length; i++) {
      const p1 = vertices[i];
      const p2 = vertices[i === vertices.length - 1 ? 0 : i + 1];
      const edge = p2.subtract(p1);
      const normal = new Vector(-edge.y, edge.x).normalize();
      axes.push(normal);
    }
    return axes;
  }
  project(vertices, axis) {
    let min = axis.dot(vertices[0]);
    let max = min;
    for (let i = 1;i < vertices.length; i++) {
      const p = axis.dot(vertices[i]);
      if (p < min) {
        min = p;
      } else if (p > max) {
        max = p;
      }
    }
    return { min, max };
  }
  overlap(proj1, proj2) {
    return proj1.max >= proj2.min && proj2.max >= proj1.min;
  }
  _checkPolygonVsPolygon(vertices1, vertices2) {
    const axes1 = this.getAxes(vertices1);
    const axes2 = this.getAxes(vertices2);
    const axes = axes1.concat(axes2);
    for (const axis of axes) {
      const projection1 = this.project(vertices1, axis);
      const projection2 = this.project(vertices2, axis);
      if (!this.overlap(projection1, projection2)) {
        return false;
      }
    }
    return true;
  }
}

// Parts/Children/MultiPolygonCollider.ts
class MultiPolygonCollider extends Collider {
  polygons;
  _worldPolygons = [];
  unioned = [];
  constructor({ polygons, tag = "<Untagged>" }) {
    super({ tag, allowMerge: tag !== "<Untagged>" });
    this.name = "MultiPolygonCollider";
    this.polygons = polygons;
    this.type = "MultiPolygonCollider";
    let maxDist = 0;
    const allVertices = polygons.flat();
    for (let i = 0;i < allVertices.length; i++) {
      for (let j = i + 1;j < allVertices.length; j++) {
        const dist = allVertices[i].distance(allVertices[j]);
        if (dist > maxDist) {
          maxDist = dist;
        }
      }
    }
    this.radius = maxDist;
  }
  getGeometry() {
    return this._worldPolygons.map((polygon) => {
      return polygon.map((v) => v.toArray());
    });
  }
  get worldVertices() {
    const allVertices = this._worldPolygons.flat();
    allVertices.sort((a, b) => {
      return a.x < b.x || a.x == b.x && a.y < b.y ? -1 : 1;
    });
    const cross = (o, a, b) => {
      return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    };
    const lower = [];
    for (const p of allVertices) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
        lower.pop();
      }
      lower.push(p);
    }
    const upper = [];
    for (let i = allVertices.length - 1;i >= 0; i--) {
      const p = allVertices[i];
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
        upper.pop();
      }
      upper.push(p);
    }
    upper.pop();
    lower.pop();
    return lower.concat(upper);
  }
  act(delta) {
    super.act(delta);
  }
  _updateVerticesAfterMerge(polygons) {
    this.polygons = polygons;
  }
  updateCollider(transform) {
    const position = transform.worldPosition;
    const rotation = transform.rotation;
    const scale = transform.scale;
    this._worldPolygons = this.polygons.map((polygon) => {
      return polygon.map((vertex) => {
        let scaledVertex = vertex.multiply(scale);
        if (rotation !== 0) {
          const cos = Math.cos(rotation);
          const sin = Math.sin(rotation);
          scaledVertex = new Vector(scaledVertex.x * cos - scaledVertex.y * sin, scaledVertex.x * sin + scaledVertex.y * cos);
        }
        return position.add(scaledVertex);
      });
    });
    const allWorldVertices = this._worldPolygons.flat();
    const xs = allWorldVertices.map((v) => v.x);
    const ys = allWorldVertices.map((v) => v.y);
    this.realWorldStart.set(Math.min(...xs), Math.min(...ys));
    this.realWorldEnd.set(Math.max(...xs), Math.max(...ys));
  }
  narrowPhaseCheck(other) {
    if (other instanceof MultiPolygonCollider) {
      for (const p1 of this._worldPolygons) {
        for (const p2 of other._worldPolygons) {
          if (this._checkPolygonVsPolygon(p1, p2)) {
            return true;
          }
        }
      }
      return false;
    }
    for (const polygon of this._worldPolygons) {
      if (this._checkPolygonVsPolygon(polygon, other.worldVertices)) {
        return true;
      }
    }
    return false;
  }
  drawDebug(ctx) {
    ctx.save();
    ctx.strokeStyle = this.colliding ? "rgba(255, 0, 100, 0.8)" : "rgba(0, 255, 100, 0.8)";
    ctx.lineWidth = 1;
    for (const polygon of this._worldPolygons) {
      ctx.beginPath();
      ctx.moveTo(polygon[0].x, polygon[0].y);
      for (let i = 1;i < polygon.length; i++) {
        ctx.lineTo(polygon[i].x, polygon[i].y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedMultiPolygonCollider = new MultiPolygonCollider({
      polygons: this.polygons.map((p) => p.map((v) => v.clone())),
      tag: this.tag
    });
    memo.set(this, clonedMultiPolygonCollider);
    this._cloneProperties(clonedMultiPolygonCollider, memo);
    clonedMultiPolygonCollider.colliding = false;
    clonedMultiPolygonCollider.base = this.base;
    clonedMultiPolygonCollider.type = this.type;
    clonedMultiPolygonCollider.collidingWith = new Set;
    return clonedMultiPolygonCollider;
  }
}

// Parts/Children/PolygonCollider.ts
class PolygonCollider extends Collider {
  localVertices;
  _worldVertices = [];
  constructor({ vertices, tag = "<Untagged>" }) {
    super({ tag, allowMerge: tag !== "<Untagged>" });
    this.name = "PolygonCollider";
    this.localVertices = vertices;
    this.vertices = vertices;
    let maxDist = 0;
    for (let i = 0;i < this.localVertices.length; i++) {
      for (let j = i + 1;j < this.localVertices.length; j++) {
        const dist = this.localVertices[i].distance(this.localVertices[j]);
        if (dist > maxDist) {
          maxDist = dist;
        }
      }
    }
    this.radius = maxDist;
    this.type = "PolygonCollider";
  }
  get worldVertices() {
    return this._worldVertices;
  }
  getGeometry() {
    return [this.worldVertices.map((v) => v.toArray())];
  }
  act(delta) {
    super.act(delta);
  }
  _updateVerticesAfterMerge(polygons) {
    const newCollider = new MultiPolygonCollider({ polygons, tag: this.tag });
    newCollider.active = this.active;
    newCollider.allowMerge = this.allowMerge;
    const parent = this.parent;
    if (parent) {
      parent.removeChild(this);
      parent.addChild(newCollider);
    }
  }
  updateCollider(transform) {
    const position = transform.worldPosition;
    const rotation = transform.rotation;
    const scale = transform.scale;
    this._worldVertices = this.localVertices.map((vertex) => {
      let scaledVertex = vertex.multiply(scale);
      if (rotation !== 0) {
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        scaledVertex = new Vector(scaledVertex.x * cos - scaledVertex.y * sin, scaledVertex.x * sin + scaledVertex.y * cos);
      }
      return position.add(scaledVertex);
    });
    const xs = this._worldVertices.map((v) => v.x);
    const ys = this._worldVertices.map((v) => v.y);
    this.realWorldStart.set(Math.min(...xs), Math.min(...ys));
    this.realWorldEnd.set(Math.max(...xs), Math.max(...ys));
  }
  narrowPhaseCheck(other) {
    if (other instanceof BoxCollider) {
      return this.checkPolygonVsBox(this, other);
    } else if (other instanceof PolygonCollider) {
      return this.checkPolygonVsPolygon(this, other);
    } else if (other instanceof MultiPolygonCollider) {
      return other.narrowPhaseCheck(this);
    }
    this.top?.warn("Collision checks are only supported between BoxColliders and PolygonColliders.");
    return false;
  }
  checkPolygonVsPolygon(poly1, poly2) {
    return this._checkPolygonVsPolygon(poly1.worldVertices, poly2.worldVertices);
  }
  checkPolygonVsBox(poly, box) {
    const boxVertices = box.worldVertices;
    const axes1 = this.getAxes(poly.worldVertices);
    const axes2 = this.getAxes(boxVertices);
    const axes = axes1.concat(axes2);
    for (const axis of axes) {
      const projection1 = this.project(poly.worldVertices, axis);
      const projection2 = this.project(boxVertices, axis);
      if (!this.overlap(projection1, projection2)) {
        return false;
      }
    }
    return true;
  }
  drawDebug(ctx) {
    ctx.save();
    ctx.strokeStyle = this.colliding ? "rgba(255, 0, 100, 0.8)" : "rgba(0, 255, 100, 0.8)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this._worldVertices[0].x, this._worldVertices[0].y);
    for (let i = 1;i < this._worldVertices.length; i++) {
      ctx.lineTo(this._worldVertices[i].x, this._worldVertices[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedPolygonCollider = new PolygonCollider({
      vertices: this.localVertices.map((v) => v.clone()),
      tag: this.tag
    });
    memo.set(this, clonedPolygonCollider);
    this._cloneProperties(clonedPolygonCollider, memo);
    clonedPolygonCollider.colliding = false;
    clonedPolygonCollider.base = this.base;
    clonedPolygonCollider.type = this.type;
    clonedPolygonCollider.collidingWith = new Set;
    return clonedPolygonCollider;
  }
}

// Parts/Children/BoxCollider.ts
class BoxCollider extends Collider {
  start;
  end;
  rotatedCorners = [];
  width;
  height;
  cachedAxes = [];
  lastRotation = NaN;
  lastScale = new Vector(NaN, NaN);
  constructor({ width, height, tag = "<Untagged>" }) {
    super({ tag, allowMerge: tag !== "<Untagged>" });
    this.name = "BoxCollider";
    this.width = width;
    this.height = height;
    this.start = new Vector(-width / 2, -height / 2);
    this.end = new Vector(width / 2, height / 2);
    this.radius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
    this.type = "BoxCollider";
    for (let i = 0;i < 4; i++) {
      this.rotatedCorners.push(new Vector(0, 0));
      this.vertices.push(new Vector(0, 0));
    }
  }
  get worldVertices() {
    return this.rotatedCorners;
  }
  getGeometry() {
    return [this.worldVertices.map((v) => v.toArray())];
  }
  updateCollider(transform) {
    const cos = Math.cos(transform.rotation);
    const sin = Math.sin(transform.rotation);
    const halfW = this.width * transform.scale.x / 2;
    const halfH = this.height * transform.scale.y / 2;
    const localCorners = [
      new Vector(-halfW, -halfH),
      new Vector(halfW, -halfH),
      new Vector(halfW, halfH),
      new Vector(-halfW, halfH)
    ];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0;i < 4; i++) {
      const c = localCorners[i];
      const x = c.x * cos - c.y * sin + transform.worldPosition.x;
      const y = c.x * sin + c.y * cos + transform.worldPosition.y;
      this.rotatedCorners[i].set(x, y);
      this.vertices[i].set(x - transform.worldPosition.x, y - transform.worldPosition.y);
      if (x < minX)
        minX = x;
      if (x > maxX)
        maxX = x;
      if (y < minY)
        minY = y;
      if (y > maxY)
        maxY = y;
    }
    this.realWorldStart.set(minX, minY);
    this.realWorldEnd.set(maxX, maxY);
    if (transform.rotation !== this.lastRotation || !transform.scale.equals(this.lastScale)) {
      this.cachedAxes = this.getAxes(this.rotatedCorners);
      this.lastRotation = transform.rotation;
      this.lastScale = transform.scale.clone();
    }
  }
  narrowPhaseCheck(other) {
    if (other instanceof BoxCollider) {
      return this.checkBoxVsBox(this, other);
    } else if (other instanceof PolygonCollider || other instanceof MultiPolygonCollider) {
      return other.narrowPhaseCheck(this);
    }
    this.top?.warn(`Collision with unsupported collider type: ${other.type}`);
    return false;
  }
  checkBoxVsBox(box1, box2) {
    const axes = box1.cachedAxes.concat(box2.cachedAxes);
    for (const axis of axes) {
      const proj1 = this.project(box1.rotatedCorners, axis);
      const proj2 = this.project(box2.rotatedCorners, axis);
      if (!this.overlap(proj1, proj2))
        return false;
    }
    return true;
  }
  _updateVerticesAfterMerge(polygons) {
    const newCollider = new MultiPolygonCollider({ polygons, tag: this.tag });
    newCollider.active = this.active;
    newCollider.allowMerge = this.allowMerge;
    const parent = this.parent;
    if (parent) {
      parent.removeChild(this);
      parent.addChild(newCollider);
    }
  }
  act(delta) {
    super.act(delta);
  }
  drawDebug(ctx) {
    ctx.save();
    ctx.strokeStyle = this.colliding ? "rgba(255,0,0,0.5)" : "rgba(0,255,0,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.rotatedCorners[0].x, this.rotatedCorners[0].y);
    for (let i = 1;i < 4; i++) {
      ctx.lineTo(this.rotatedCorners[i].x, this.rotatedCorners[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  clone(memo = new Map) {
    if (memo.has(this))
      return memo.get(this);
    const cloned = new BoxCollider({
      width: this.width,
      height: this.height,
      tag: this.tag
    });
    memo.set(this, cloned);
    this._cloneProperties(cloned, memo);
    cloned.colliding = false;
    cloned.base = this.base;
    cloned.type = this.type;
    cloned.collidingWith = new Set;
    return cloned;
  }
}
// Parts/Children/ColorRender.ts
class ColorRender extends Renderer {
  color;
  vertices;
  constructor({ width, height, color, vertices }) {
    if (!width || !height) {
      if (vertices && vertices.length > 0) {
        width = Math.max(...vertices.map((v) => v.x)) - Math.min(...vertices.map((v) => v.x));
        height = Math.max(...vertices.map((v) => v.y)) - Math.min(...vertices.map((v) => v.y));
      } else {
        throw new Error("ColorRender requires either width and height or vertices to be defined.");
      }
    }
    super({ width, height });
    this.name = "ColorRender";
    this.color = color;
    this.debugEmoji = "\uD83C\uDFA8";
    this.type = "ColorRender";
    this.base = "Renderer";
    this.vertices = vertices || [];
    if (this.vertices.length === 0) {
      this.vertices = [
        new Vector(-this.width / 2, -this.height / 2),
        new Vector(this.width / 2, -this.height / 2),
        new Vector(this.width / 2, this.height / 2),
        new Vector(-this.width / 2, this.height / 2)
      ];
    }
  }
  onMount(parent) {
    super.onMount(parent);
    if (!this.sibling("Transform")) {
      this.top?.warn(`ColorRender <${this.name}> does not have a Transform sibling. Please ensure you add a Transform component before adding others.`);
      return;
    }
    parent.setSuperficialDimensions(this.width, this.height);
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedColor = new ColorRender({
      width: this.width,
      height: this.height,
      color: this.color,
      vertices: this.vertices.map((v) => v.clone())
    });
    memo.set(this, clonedColor);
    this._cloneProperties(clonedColor, memo);
    return clonedColor;
  }
  act(delta) {
    super.act(delta);
    if (!this.top) {
      throw new Error(`ColorRender <${this.parent?.name}.${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
    }
    const transform = this.sibling("Transform");
    if (!transform) {
      this.top?.warn(`ColorRender <${this.parent?.name}.${this.name}> does not have a Transform sibling. Skipping rendering.`);
      return;
    }
    const position = transform.worldPosition;
    const rotation = transform.rotation;
    this.top.context.save();
    this.top.context.translate(position.x, position.y);
    this.top.context.rotate(rotation);
    this.top.context.scale(transform.scale.x * this.facing.x, transform.scale.y * this.facing.y);
    this.top.context.fillStyle = this.color;
    this.top.context.beginPath();
    if (this.vertices.length > 0) {
      this.top.context.moveTo(this.vertices[0].x, this.vertices[0].y);
      for (let i = 1;i < this.vertices.length; i++) {
        this.top.context.lineTo(this.vertices[i].x, this.vertices[i].y);
      }
      this.top.context.closePath();
      this.top.context.fill();
    }
    this.top.context.restore();
    this.hoverbug = `Color: ${this.color}`;
  }
}
// Parts/Children/Transform.ts
class Transform extends Part {
  position;
  worldPosition;
  rotation;
  scale;
  initialized;
  constructor({ position, rotation, scale } = {}) {
    super({ name: "Transform" });
    this.position = position || Vector.From(0);
    this.worldPosition = Vector.From(0);
    this.worldPosition.set(this.position);
    this.rotation = rotation || 0;
    this.scale = scale || new Vector(1, 1);
    this.debugEmoji = "\uD83D\uDCD0";
    this.type = "Transform";
    this.initialized = false;
  }
  onMount(parent) {
    super.onMount(parent);
    this.updateWorldPosition();
    if (parent.superficialWidth && parent.superficialHeight) {
      this.superficialWidth = parent.superficialWidth;
      this.superficialHeight = parent.superficialHeight;
    }
  }
  move(delta) {
    this.position.set(this.position.add(delta));
    this.updateWorldPosition();
  }
  moveTo(position) {
    this.position.set(position);
    this.updateWorldPosition();
  }
  rotate(angle) {
    this.rotation += angle;
    this.rotation = this.rotation % (2 * Math.PI);
    this.updateWorldPosition();
  }
  setRotation(rotation) {
    this.rotation = rotation % (2 * Math.PI);
    this.updateWorldPosition();
  }
  worldToLocal(position) {
    const translated = position.subtract(this.worldPosition);
    const cos = Math.cos(-this.rotation);
    const sin = Math.sin(-this.rotation);
    const rotated = new Vector(translated.x * cos - translated.y * sin, translated.x * sin + translated.y * cos);
    const scaled = new Vector(rotated.x / this.scale.x, rotated.y / this.scale.y);
    return scaled;
  }
  preFrame() {
    super.preFrame();
    this.updateWorldPosition();
  }
  updateWorldPosition() {
    const parentTransform = this.parent?.parent?.child("Transform");
    if (parentTransform) {
      const scaledPosition = this.position.multiply(parentTransform.scale);
      const cos = Math.cos(parentTransform.rotation);
      const sin = Math.sin(parentTransform.rotation);
      const rotatedPosition = new Vector(scaledPosition.x * cos - scaledPosition.y * sin, scaledPosition.x * sin + scaledPosition.y * cos);
      this.worldPosition.set(rotatedPosition.add(parentTransform.worldPosition));
    } else {
      this.worldPosition.set(this.position);
    }
    this.initialized = true;
  }
  act(_delta) {
    this.hoverbug = `${this.position.toString()} | ${this.worldPosition.toString()} | ${(this.rotation / Math.PI).toFixed(2)}pi | ${this.scale.toString()}`;
  }
}
// Parts/Sound.ts
class Sound extends Part {
  audio;
  webEngine = false;
  start = false;
  _isLoaded = false;
  _clones = new Set;
  _wantToPlay = false;
  _paused = false;
  _started = false;
  _wasMainAudioPlaying = false;
  _playingClonesWhenPaused = new Set;
  _hasEndedListener = false;
  constructor({ name, src, volume = 1, loop = false, webEngine = false, start = false }) {
    super({ name });
    this.debugEmoji = "\uD83D\uDD0A";
    this.audio = new Audio(src);
    this.audio.volume = volume;
    this.audio.loop = loop;
    this.start = start;
    this.webEngine = webEngine;
    this.type = "Sound";
    SoundManager.registerSound(this);
    this.audio.addEventListener("canplaythrough", () => {
      this._isLoaded = true;
      this.ready = true;
      if (this.start && !this._started || this._wantToPlay) {
        this._started = true;
        this.play();
      }
    });
    this.audio.addEventListener("error", () => {
      this._isLoaded = false;
      this.ready = false;
      this.top?.error(`Failed to load sound <${this.name}> from src: ${src.substring(0, 30)}...`);
    });
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedSound = new Sound({
      name: this.name,
      src: this.audio.src,
      volume: this.audio.volume,
      loop: this.audio.loop,
      webEngine: this.webEngine,
      start: this.start
    });
    memo.set(this, clonedSound);
    this._cloneProperties(clonedSound, memo);
    clonedSound._isLoaded = false;
    clonedSound._clones = new Set;
    clonedSound._wantToPlay = false;
    clonedSound._paused = false;
    clonedSound._started = false;
    clonedSound._wasMainAudioPlaying = false;
    clonedSound._playingClonesWhenPaused = new Set;
    clonedSound._hasEndedListener = false;
    SoundManager.unregisterSound(this);
    SoundManager.registerSound(clonedSound);
    return clonedSound;
  }
  play(options = {}) {
    if (this.webEngine && !SoundManager.getIsGameRunning())
      return;
    const { restart = false, clone = false } = options;
    if (!this._isLoaded) {
      this._wantToPlay = true;
      return;
    }
    this._paused = false;
    this._started = true;
    if (clone) {
      const cloneAudio = this.audio.cloneNode(true);
      cloneAudio.volume = this.audio.volume;
      cloneAudio.loop = false;
      this._wantToPlay = false;
      cloneAudio.play().catch((e) => this.top?.error(`Error playing cloned sound <${this.name}>:`, e));
      this._clones.add(cloneAudio);
      const handleCloneEnded = () => {
        this._clones.delete(cloneAudio);
        cloneAudio.removeEventListener("ended", handleCloneEnded);
        if (this._clones.size === 0) {
          this._paused = false;
          this._started = false;
        }
      };
      cloneAudio.addEventListener("ended", handleCloneEnded);
    } else {
      if (restart) {
        this.audio.currentTime = 0;
      }
      this._wantToPlay = false;
      this.audio.play().catch((e) => this.top?.error(`Error playing sound <${this.name}>:`, e));
      if (!this._hasEndedListener) {
        this._hasEndedListener = true;
        this.audio.addEventListener("ended", () => {
          this._paused = false;
          this._started = false;
          this._clones.forEach((clone2) => {
            clone2.pause();
          });
          this._clones.clear();
        });
      }
    }
  }
  pause() {
    if (!this._paused && this._started) {
      this._paused = true;
      this._wantToPlay = false;
      this._wasMainAudioPlaying = !this.audio.paused;
      this._playingClonesWhenPaused.clear();
      this._clones.forEach((clone) => {
        if (!clone.paused) {
          this._playingClonesWhenPaused.add(clone);
        }
      });
      this.audio.pause();
      this._clones.forEach((clone) => clone.pause());
    }
  }
  resume() {
    if (this._paused) {
      this._paused = false;
      if (this._wasMainAudioPlaying) {
        this.audio.play().catch((e) => this.top?.error(`Error resuming sound <${this.name}>:`, e));
      }
      this._playingClonesWhenPaused.forEach((clone) => {
        if (this._clones.has(clone)) {
          clone.play().catch((e) => this.top?.error(`Error resuming cloned sound <${this.name}>:`, e));
        }
      });
      this._playingClonesWhenPaused.clear();
      this._wasMainAudioPlaying = false;
    }
  }
  stop() {
    this._paused = false;
    this._started = false;
    this._wasMainAudioPlaying = false;
    this._playingClonesWhenPaused.clear();
    this.audio.pause();
    this._wantToPlay = false;
    this.audio.currentTime = 0;
    this._clones.forEach((clone) => clone.pause());
    this._clones.clear();
  }
  setVolume(volume) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (this.audio.volume !== clampedVolume) {
      this.audio.volume = clampedVolume;
      this._clones.forEach((clone) => {
        clone.volume = clampedVolume;
      });
    }
  }
  setLoop(loop) {
    if (this.audio.loop !== loop) {
      this.audio.loop = loop;
    }
  }
  act(delta) {
    super.act(delta);
    this.hoverbug = `${this.audio.paused ? "⏸️" : "▶️"} V:${this.audio.volume.toFixed(2)} L:${this.audio.loop ? "✅" : "❌"}`;
  }
  destroy() {
    this.stop();
    this.audio.src = "";
    this.audio.load();
    SoundManager.unregisterSound(this);
    super.destroy();
  }
}
// Parts/Follow.ts
class Follow extends Part {
  target = null;
  offset;
  externalOffset = new Vector(0, 0);
  interpolationSpeed;
  constructor({
    name,
    target,
    offset = new Vector(0, 0),
    interpolationSpeed = 1
  }) {
    super({ name: name || "Follow" });
    this.target = target;
    this.offset = offset;
    this.interpolationSpeed = interpolationSpeed;
    this.debugEmoji = "\uD83C\uDFAF";
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedFollow = new Follow({
      name: this.name,
      target: this.target,
      offset: this.offset.clone(),
      interpolationSpeed: this.interpolationSpeed
    });
    memo.set(this, clonedFollow);
    this._cloneProperties(clonedFollow, memo);
    if (this.target && memo.has(this.target)) {
      clonedFollow.target = memo.get(this.target);
    } else {
      clonedFollow.target = this.target;
    }
    clonedFollow.externalOffset = new Vector(0, 0);
    return clonedFollow;
  }
  act(delta) {
    super.act(delta);
    if (this.target) {
      const targetTransform = this.target;
      const ownTransform = this.sibling("Transform");
      if (!ownTransform) {
        throw new Error(`Follow <${this.name}> requires a Transform component to be mounted to a parent GameObject.`);
      }
      const totalOffset = this.offset.add(this.externalOffset);
      const targetX = targetTransform.position.x + totalOffset.x;
      const targetY = targetTransform.position.y + totalOffset.y;
      if (this.interpolationSpeed >= 1) {
        ownTransform.position.x = targetX;
        ownTransform.position.y = targetY;
      } else {
        const t = this.interpolationSpeed * delta;
        ownTransform.position.x += (targetX - ownTransform.position.x) * t;
        ownTransform.position.y += (targetY - ownTransform.position.y) * t;
      }
    }
  }
}
// Parts/CharacterMovement.ts
class CharacterMovement extends Part {
  speed;
  movementType;
  input;
  constructor({ speed = 5, movementType = "WASD", input }) {
    super({ name: "CharacterMovement" });
    this.speed = speed;
    this.movementType = movementType;
    this.input = input;
    this.type = "CharacterMovement";
  }
  act(delta) {
    if (!this.input) {
      if (!this.warned.has("MissingInput"))
        this.top?.warn(`CharacterMovement <${this.name}> (${this.id}) is missing an input property. Please create an input on the scene and pass it.`) && this.warned.add("MissingInput");
      return;
    }
    const transform = this.sibling("Transform");
    if (!transform) {
      return;
    }
    const speed = this.speed * delta;
    const keys = this.input.downkeys;
    let dx = 0;
    let dy = 0;
    if (this.movementType === "WASD" || this.movementType === "BOTH") {
      if (keys.has("w")) {
        dy -= 1;
      }
      if (keys.has("s")) {
        dy += 1;
      }
      if (keys.has("a")) {
        dx -= 1;
      }
      if (keys.has("d")) {
        dx += 1;
      }
    }
    if (this.movementType === "ArrowKeys" || this.movementType === "BOTH") {
      if (keys.has("ArrowUp")) {
        dy -= 1;
      }
      if (keys.has("ArrowDown")) {
        dy += 1;
      }
      if (keys.has("ArrowLeft")) {
        dx -= 1;
      }
      if (keys.has("ArrowRight")) {
        dx += 1;
      }
    }
    if (dx !== 0 && dy !== 0) {
      dx *= Math.SQRT1_2;
      dy *= Math.SQRT1_2;
    }
    if (dx !== 0 || dy !== 0) {
      transform.move(new Vector(dx * speed, dy * speed));
    }
  }
}
// Parts/ParallaxLayer.ts
class ParallaxLayer extends Layer {
  parallaxFactor;
  originalPositions = new Map;
  initialized = false;
  constructor({ name, parallaxFactor = 0.5 }) {
    super({ name });
    this.parallaxFactor = parallaxFactor;
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedLayer = new ParallaxLayer({
      name: this.name,
      parallaxFactor: this.parallaxFactor
    });
    memo.set(this, clonedLayer);
    this._cloneProperties(clonedLayer, memo);
    clonedLayer.initialized = false;
    clonedLayer.originalPositions = new Map;
    return clonedLayer;
  }
  initialize() {
    this.childrenArray.forEach((child) => {
      const childTransform = child.child("Transform");
      if (childTransform) {
        this.originalPositions.set(child.name, new Vector(childTransform.position.x, childTransform.position.y));
      }
    });
  }
  act(delta) {
    if (!this.initialized) {
      this.initialize();
      this.initialized = true;
    }
    const camera = this.top?.currentScene?.activeCamera;
    if (camera) {
      const cameraTransform = camera.child("Transform");
      if (cameraTransform) {
        const cameraPosition = cameraTransform.worldPosition;
        this.childrenArray.forEach((child) => {
          const childTransform = child.child("Transform");
          if (childTransform) {
            const originalPos = this.originalPositions.get(child.name);
            if (originalPos) {
              const parallaxX = originalPos.x + cameraPosition.x * this.parallaxFactor;
              const parallaxY = originalPos.y + cameraPosition.y * this.parallaxFactor;
              childTransform.position.set(new Vector(parallaxX, parallaxY));
            }
          }
        });
      }
    }
    super.act(delta);
  }
}
// Parts/PhysicsEngine.ts
var import_matter_js = __toESM(require_matter(), 1);
// Parts/AreaTrigger.ts
class AreaTrigger extends Part {
  onEnter;
  onExit;
  activeCollisions = new Set;
  constructor({ onEnter, onExit }) {
    super({ name: "AreaTrigger" });
    this.onEnter = onEnter;
    this.onExit = onExit;
    this.debugEmoji = "\uD83E\uDDF2";
    this.type = "AreaTrigger";
  }
  clone(memo = new Map) {
    if (memo.has(this)) {
      return memo.get(this);
    }
    const clonedTrigger = new AreaTrigger({
      onEnter: this.onEnter,
      onExit: this.onExit
    });
    memo.set(this, clonedTrigger);
    this._cloneProperties(clonedTrigger, memo);
    clonedTrigger.activeCollisions = new Set;
    return clonedTrigger;
  }
  act(delta) {
    super.act(delta);
    const collider = this.sibling("Collider");
    if (!collider) {
      this.top?.warn(`AreaTrigger <${this.name}> requires a Collider sibling.`);
      return;
    }
    const currentCollisions = new Set;
    if (collider.colliding) {
      for (const other of collider.collidingWith) {
        currentCollisions.add(other);
        if (!this.activeCollisions.has(other)) {
          if (this.onEnter) {
            this.onEnter(other);
          }
        }
      }
    }
    for (const other of this.activeCollisions) {
      if (!currentCollisions.has(other)) {
        const exitedCollider = Array.from(collider.collidingWith).find((c) => c.id === other.id);
        if (this.onExit) {
          this.onExit(exitedCollider || {});
        }
      }
    }
    this.activeCollisions = currentCollisions;
    this.hoverbug = `Active: ${this.activeCollisions.size}`;
  }
}
// Parts/PhysicsBody.ts
var import_matter_js2 = __toESM(require_matter(), 1);
// node_modules/terser/lib/utils/index.js
function characters(str) {
  return str.split("");
}
function member(name, array) {
  return array.includes(name);
}

class DefaultsError extends Error {
  constructor(msg, defs) {
    super();
    this.name = "DefaultsError";
    this.message = msg;
    this.defs = defs;
  }
}
function defaults(args, defs, croak) {
  if (args === true) {
    args = {};
  } else if (args != null && typeof args === "object") {
    args = { ...args };
  }
  const ret = args || {};
  if (croak) {
    for (const i in ret)
      if (HOP(ret, i) && !HOP(defs, i)) {
        throw new DefaultsError("`" + i + "` is not a supported option", defs);
      }
  }
  for (const i in defs)
    if (HOP(defs, i)) {
      if (!args || !HOP(args, i)) {
        ret[i] = defs[i];
      } else if (i === "ecma") {
        let ecma = args[i] | 0;
        if (ecma > 5 && ecma < 2015)
          ecma += 2009;
        ret[i] = ecma;
      } else {
        ret[i] = args && HOP(args, i) ? args[i] : defs[i];
      }
    }
  return ret;
}
function noop() {}
function return_false() {
  return false;
}
function return_true() {
  return true;
}
function return_this() {
  return this;
}
function return_null() {
  return null;
}
var MAP = function() {
  function MAP2(a, tw, allow_splicing = true) {
    const new_a = [];
    for (let i = 0;i < a.length; ++i) {
      let item = a[i];
      let ret = item.transform(tw, allow_splicing);
      if (ret instanceof AST_Node) {
        new_a.push(ret);
      } else if (ret instanceof Splice) {
        new_a.push(...ret.v);
      }
    }
    return new_a;
  }
  MAP2.splice = function(val) {
    return new Splice(val);
  };
  MAP2.skip = {};
  function Splice(val) {
    this.v = val;
  }
  return MAP2;
}();
function make_node(ctor, orig, props) {
  if (!props)
    props = {};
  if (orig) {
    if (!props.start)
      props.start = orig.start;
    if (!props.end)
      props.end = orig.end;
  }
  return new ctor(props);
}
function push_uniq(array, el) {
  if (!array.includes(el))
    array.push(el);
}
function string_template(text, props) {
  return text.replace(/{(.+?)}/g, function(str, p) {
    return props && props[p];
  });
}
function remove(array, el) {
  for (var i = array.length;--i >= 0; ) {
    if (array[i] === el)
      array.splice(i, 1);
  }
}
function mergeSort(array, cmp) {
  if (array.length < 2)
    return array.slice();
  function merge(a, b) {
    var r = [], ai = 0, bi = 0, i = 0;
    while (ai < a.length && bi < b.length) {
      cmp(a[ai], b[bi]) <= 0 ? r[i++] = a[ai++] : r[i++] = b[bi++];
    }
    if (ai < a.length)
      r.push.apply(r, a.slice(ai));
    if (bi < b.length)
      r.push.apply(r, b.slice(bi));
    return r;
  }
  function _ms(a) {
    if (a.length <= 1)
      return a;
    var m = Math.floor(a.length / 2), left = a.slice(0, m), right = a.slice(m);
    left = _ms(left);
    right = _ms(right);
    return merge(left, right);
  }
  return _ms(array);
}
function makePredicate(words) {
  if (!Array.isArray(words))
    words = words.split(" ");
  return new Set(words.sort());
}
function map_add(map, key, value) {
  if (map.has(key)) {
    map.get(key).push(value);
  } else {
    map.set(key, [value]);
  }
}
function HOP(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function keep_name(keep_setting, name) {
  return keep_setting === true || keep_setting instanceof RegExp && keep_setting.test(name);
}
var lineTerminatorEscape = {
  "\x00": "0",
  "\n": "n",
  "\r": "r",
  "\u2028": "u2028",
  "\u2029": "u2029"
};
function regexp_source_fix(source) {
  return source.replace(/[\0\n\r\u2028\u2029]/g, function(match, offset) {
    var escaped = source[offset - 1] == "\\" && (source[offset - 2] != "\\" || /(?:^|[^\\])(?:\\{2})*$/.test(source.slice(0, offset - 1)));
    return (escaped ? "" : "\\") + lineTerminatorEscape[match];
  });
}
var re_safe_regexp = /^[\\/|\0\s\w^$.[\]()]*$/;
var regexp_is_safe = (source) => re_safe_regexp.test(source);
var all_flags = "dgimsuyv";
function sort_regexp_flags(flags) {
  const existing_flags = new Set(flags.split(""));
  let out = "";
  for (const flag of all_flags) {
    if (existing_flags.has(flag)) {
      out += flag;
      existing_flags.delete(flag);
    }
  }
  if (existing_flags.size) {
    existing_flags.forEach((flag) => {
      out += flag;
    });
  }
  return out;
}
function has_annotation(node, annotation) {
  return node._annotations & annotation;
}
function set_annotation(node, annotation) {
  node._annotations |= annotation;
}

// node_modules/terser/lib/parse.js
var LATEST_RAW = "";
var TEMPLATE_RAWS = new Map;
var KEYWORDS = "break case catch class const continue debugger default delete do else export extends finally for function if in instanceof let new return switch throw try typeof var void while with";
var KEYWORDS_ATOM = "false null true";
var RESERVED_WORDS = "enum import super this " + KEYWORDS_ATOM + " " + KEYWORDS;
var ALL_RESERVED_WORDS = "implements interface package private protected public static " + RESERVED_WORDS;
var KEYWORDS_BEFORE_EXPRESSION = "return new delete throw else case yield await";
KEYWORDS = makePredicate(KEYWORDS);
RESERVED_WORDS = makePredicate(RESERVED_WORDS);
KEYWORDS_BEFORE_EXPRESSION = makePredicate(KEYWORDS_BEFORE_EXPRESSION);
KEYWORDS_ATOM = makePredicate(KEYWORDS_ATOM);
ALL_RESERVED_WORDS = makePredicate(ALL_RESERVED_WORDS);
var OPERATOR_CHARS = makePredicate(characters("+-*&%=<>!?|~^"));
var RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
var RE_OCT_NUMBER = /^0[0-7]+$/;
var RE_ES6_OCT_NUMBER = /^0o[0-7]+$/i;
var RE_BIN_NUMBER = /^0b[01]+$/i;
var RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
var RE_BIG_INT = /^(0[xob])?[0-9a-f]+n$/i;
var OPERATORS = makePredicate([
  "in",
  "instanceof",
  "typeof",
  "new",
  "void",
  "delete",
  "++",
  "--",
  "+",
  "-",
  "!",
  "~",
  "&",
  "|",
  "^",
  "*",
  "**",
  "/",
  "%",
  ">>",
  "<<",
  ">>>",
  "<",
  ">",
  "<=",
  ">=",
  "==",
  "===",
  "!=",
  "!==",
  "?",
  "=",
  "+=",
  "-=",
  "||=",
  "&&=",
  "??=",
  "/=",
  "*=",
  "**=",
  "%=",
  ">>=",
  "<<=",
  ">>>=",
  "|=",
  "^=",
  "&=",
  "&&",
  "??",
  "||"
]);
var WHITESPACE_CHARS = makePredicate(characters(`  
\r	\f\v​           \u2028\u2029  　\uFEFF`));
var NEWLINE_CHARS = makePredicate(characters(`
\r\u2028\u2029`));
var PUNC_AFTER_EXPRESSION = makePredicate(characters(";]),:"));
var PUNC_BEFORE_EXPRESSION = makePredicate(characters("[{(,;:"));
var PUNC_CHARS = makePredicate(characters("[]{}(),;:"));
var UNICODE = {
  ID_Start: /[$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
  ID_Continue: /(?:[$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])+/
};
function get_full_char(str, pos) {
  if (is_surrogate_pair_head(str.charCodeAt(pos))) {
    if (is_surrogate_pair_tail(str.charCodeAt(pos + 1))) {
      return str.charAt(pos) + str.charAt(pos + 1);
    }
  } else if (is_surrogate_pair_tail(str.charCodeAt(pos))) {
    if (is_surrogate_pair_head(str.charCodeAt(pos - 1))) {
      return str.charAt(pos - 1) + str.charAt(pos);
    }
  }
  return str.charAt(pos);
}
function get_full_char_code(str, pos) {
  if (is_surrogate_pair_head(str.charCodeAt(pos))) {
    return 65536 + (str.charCodeAt(pos) - 55296 << 10) + str.charCodeAt(pos + 1) - 56320;
  }
  return str.charCodeAt(pos);
}
function get_full_char_length(str) {
  var surrogates = 0;
  for (var i = 0;i < str.length; i++) {
    if (is_surrogate_pair_head(str.charCodeAt(i)) && is_surrogate_pair_tail(str.charCodeAt(i + 1))) {
      surrogates++;
      i++;
    }
  }
  return str.length - surrogates;
}
function from_char_code(code) {
  if (code > 65535) {
    code -= 65536;
    return String.fromCharCode((code >> 10) + 55296) + String.fromCharCode(code % 1024 + 56320);
  }
  return String.fromCharCode(code);
}
function is_surrogate_pair_head(code) {
  return code >= 55296 && code <= 56319;
}
function is_surrogate_pair_tail(code) {
  return code >= 56320 && code <= 57343;
}
function is_digit(code) {
  return code >= 48 && code <= 57;
}
function is_identifier_start(ch) {
  return UNICODE.ID_Start.test(ch);
}
function is_identifier_char(ch) {
  return UNICODE.ID_Continue.test(ch);
}
var BASIC_IDENT = /^[a-z_$][a-z0-9_$]*$/i;
function is_basic_identifier_string(str) {
  return BASIC_IDENT.test(str);
}
function is_identifier_string(str, allow_surrogates) {
  if (BASIC_IDENT.test(str)) {
    return true;
  }
  if (!allow_surrogates && /[\ud800-\udfff]/.test(str)) {
    return false;
  }
  var match = UNICODE.ID_Start.exec(str);
  if (!match || match.index !== 0) {
    return false;
  }
  str = str.slice(match[0].length);
  if (!str) {
    return true;
  }
  match = UNICODE.ID_Continue.exec(str);
  return !!match && match[0].length === str.length;
}
function parse_js_number(num, allow_e = true) {
  if (!allow_e && num.includes("e")) {
    return NaN;
  }
  if (RE_HEX_NUMBER.test(num)) {
    return parseInt(num.substr(2), 16);
  } else if (RE_OCT_NUMBER.test(num)) {
    return parseInt(num.substr(1), 8);
  } else if (RE_ES6_OCT_NUMBER.test(num)) {
    return parseInt(num.substr(2), 8);
  } else if (RE_BIN_NUMBER.test(num)) {
    return parseInt(num.substr(2), 2);
  } else if (RE_DEC_NUMBER.test(num)) {
    return parseFloat(num);
  } else {
    var val = parseFloat(num);
    if (val == num)
      return val;
  }
}

class JS_Parse_Error extends Error {
  constructor(message, filename, line, col, pos) {
    super();
    this.name = "SyntaxError";
    this.message = message;
    this.filename = filename;
    this.line = line;
    this.col = col;
    this.pos = pos;
  }
}
function js_error(message, filename, line, col, pos) {
  throw new JS_Parse_Error(message, filename, line, col, pos);
}
function is_token(token, type, val) {
  return token.type == type && (val == null || token.value == val);
}
var EX_EOF = {};
function tokenizer($TEXT, filename, html5_comments, shebang) {
  var S = {
    text: $TEXT,
    filename,
    pos: 0,
    tokpos: 0,
    line: 1,
    tokline: 0,
    col: 0,
    tokcol: 0,
    newline_before: false,
    regex_allowed: false,
    brace_counter: 0,
    template_braces: [],
    comments_before: [],
    directives: {},
    directive_stack: []
  };
  function peek() {
    return get_full_char(S.text, S.pos);
  }
  function is_option_chain_op() {
    const must_be_dot = S.text.charCodeAt(S.pos + 1) === 46;
    if (!must_be_dot)
      return false;
    const cannot_be_digit = S.text.charCodeAt(S.pos + 2);
    return cannot_be_digit < 48 || cannot_be_digit > 57;
  }
  function next(signal_eof, in_string) {
    var ch = get_full_char(S.text, S.pos++);
    if (signal_eof && !ch)
      throw EX_EOF;
    if (NEWLINE_CHARS.has(ch)) {
      S.newline_before = S.newline_before || !in_string;
      ++S.line;
      S.col = 0;
      if (ch == "\r" && peek() == `
`) {
        ++S.pos;
        ch = `
`;
      }
    } else {
      if (ch.length > 1) {
        ++S.pos;
        ++S.col;
      }
      ++S.col;
    }
    return ch;
  }
  function forward(i) {
    while (i--)
      next();
  }
  function looking_at(str) {
    return S.text.substr(S.pos, str.length) == str;
  }
  function find_eol() {
    var text = S.text;
    for (var i = S.pos, n = S.text.length;i < n; ++i) {
      var ch = text[i];
      if (NEWLINE_CHARS.has(ch))
        return i;
    }
    return -1;
  }
  function find(what, signal_eof) {
    var pos = S.text.indexOf(what, S.pos);
    if (signal_eof && pos == -1)
      throw EX_EOF;
    return pos;
  }
  function start_token() {
    S.tokline = S.line;
    S.tokcol = S.col;
    S.tokpos = S.pos;
  }
  var prev_was_dot = false;
  var previous_token = null;
  function token(type, value, is_comment) {
    S.regex_allowed = type == "operator" && !UNARY_POSTFIX.has(value) || type == "keyword" && KEYWORDS_BEFORE_EXPRESSION.has(value) || type == "punc" && PUNC_BEFORE_EXPRESSION.has(value) || type == "arrow";
    if (type == "punc" && (value == "." || value == "?.")) {
      prev_was_dot = true;
    } else if (!is_comment) {
      prev_was_dot = false;
    }
    const line = S.tokline;
    const col = S.tokcol;
    const pos = S.tokpos;
    const nlb = S.newline_before;
    const file = filename;
    let comments_before = [];
    let comments_after = [];
    if (!is_comment) {
      comments_before = S.comments_before;
      comments_after = S.comments_before = [];
    }
    S.newline_before = false;
    const tok = new AST_Token(type, value, line, col, pos, nlb, comments_before, comments_after, file);
    if (!is_comment)
      previous_token = tok;
    return tok;
  }
  function skip_whitespace() {
    while (WHITESPACE_CHARS.has(peek()))
      next();
  }
  function read_while(pred) {
    var ret = "", ch, i = 0;
    while ((ch = peek()) && pred(ch, i++))
      ret += next();
    return ret;
  }
  function parse_error(err) {
    js_error(err, filename, S.tokline, S.tokcol, S.tokpos);
  }
  function read_num(prefix) {
    var has_e = false, after_e = false, has_x = false, has_dot = prefix == ".", is_big_int = false, numeric_separator = false;
    var num = read_while(function(ch, i) {
      if (is_big_int)
        return false;
      var code = ch.charCodeAt(0);
      switch (code) {
        case 95:
          return numeric_separator = true;
        case 98:
        case 66:
          return has_x = true;
        case 111:
        case 79:
        case 120:
        case 88:
          return has_x ? false : has_x = true;
        case 101:
        case 69:
          return has_x ? true : has_e ? false : has_e = after_e = true;
        case 45:
          return after_e || i == 0 && !prefix;
        case 43:
          return after_e;
        case (after_e = false, 46):
          return !has_dot && !has_x && !has_e ? has_dot = true : false;
        case 110:
          is_big_int = true;
          return true;
      }
      return code >= 48 && code <= 57 || code >= 97 && code <= 102 || code >= 65 && code <= 70;
    });
    if (prefix)
      num = prefix + num;
    LATEST_RAW = num;
    if (RE_OCT_NUMBER.test(num) && next_token.has_directive("use strict")) {
      parse_error("Legacy octal literals are not allowed in strict mode");
    }
    if (numeric_separator) {
      if (num.endsWith("_")) {
        parse_error("Numeric separators are not allowed at the end of numeric literals");
      } else if (num.includes("__")) {
        parse_error("Only one underscore is allowed as numeric separator");
      }
      num = num.replace(/_/g, "");
    }
    if (is_big_int) {
      const without_n = num.slice(0, -1);
      const allow_e = RE_HEX_NUMBER.test(without_n);
      const valid2 = parse_js_number(without_n, allow_e);
      if (!has_dot && RE_BIG_INT.test(num) && !isNaN(valid2))
        return token("big_int", without_n);
      parse_error("Invalid or unexpected token");
    }
    var valid = parse_js_number(num);
    if (!isNaN(valid)) {
      return token("num", valid);
    } else {
      parse_error("Invalid syntax: " + num);
    }
  }
  function is_octal(ch) {
    return ch >= "0" && ch <= "7";
  }
  function read_escaped_char(in_string, strict_hex, template_string) {
    var ch = next(true, in_string);
    switch (ch.charCodeAt(0)) {
      case 110:
        return `
`;
      case 114:
        return "\r";
      case 116:
        return "\t";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 120:
        return String.fromCharCode(hex_bytes(2, strict_hex));
      case 117:
        if (peek() == "{") {
          next(true);
          if (peek() === "}")
            parse_error("Expecting hex-character between {}");
          while (peek() == "0")
            next(true);
          var result, length = find("}", true) - S.pos;
          if (length > 6 || (result = hex_bytes(length, strict_hex)) > 1114111) {
            parse_error("Unicode reference out of bounds");
          }
          next(true);
          return from_char_code(result);
        }
        return String.fromCharCode(hex_bytes(4, strict_hex));
      case 10:
        return "";
      case 13:
        if (peek() == `
`) {
          next(true, in_string);
          return "";
        }
    }
    if (is_octal(ch)) {
      if (template_string && strict_hex) {
        const represents_null_character = ch === "0" && !is_octal(peek());
        if (!represents_null_character) {
          parse_error("Octal escape sequences are not allowed in template strings");
        }
      }
      return read_octal_escape_sequence(ch, strict_hex);
    }
    return ch;
  }
  function read_octal_escape_sequence(ch, strict_octal) {
    var p = peek();
    if (p >= "0" && p <= "7") {
      ch += next(true);
      if (ch[0] <= "3" && (p = peek()) >= "0" && p <= "7")
        ch += next(true);
    }
    if (ch === "0")
      return "\x00";
    if (ch.length > 0 && next_token.has_directive("use strict") && strict_octal)
      parse_error("Legacy octal escape sequences are not allowed in strict mode");
    return String.fromCharCode(parseInt(ch, 8));
  }
  function hex_bytes(n, strict_hex) {
    var num = 0;
    for (;n > 0; --n) {
      if (!strict_hex && isNaN(parseInt(peek(), 16))) {
        return parseInt(num, 16) || "";
      }
      var digit = next(true);
      if (isNaN(parseInt(digit, 16)))
        parse_error("Invalid hex-character pattern in string");
      num += digit;
    }
    return parseInt(num, 16);
  }
  var read_string = with_eof_error("Unterminated string constant", function() {
    const start_pos = S.pos;
    var quote = next(), ret = [];
    for (;; ) {
      var ch = next(true, true);
      if (ch == "\\")
        ch = read_escaped_char(true, true);
      else if (ch == "\r" || ch == `
`)
        parse_error("Unterminated string constant");
      else if (ch == quote)
        break;
      ret.push(ch);
    }
    var tok = token("string", ret.join(""));
    LATEST_RAW = S.text.slice(start_pos, S.pos);
    tok.quote = quote;
    return tok;
  });
  var read_template_characters = with_eof_error("Unterminated template", function(begin) {
    if (begin) {
      S.template_braces.push(S.brace_counter);
    }
    var content = "", raw = "", ch, tok;
    next(true, true);
    while ((ch = next(true, true)) != "`") {
      if (ch == "\r") {
        if (peek() == `
`)
          ++S.pos;
        ch = `
`;
      } else if (ch == "$" && peek() == "{") {
        next(true, true);
        S.brace_counter++;
        tok = token(begin ? "template_head" : "template_cont", content);
        TEMPLATE_RAWS.set(tok, raw);
        tok.template_end = false;
        return tok;
      }
      raw += ch;
      if (ch == "\\") {
        var tmp = S.pos;
        var prev_is_tag = previous_token && (previous_token.type === "name" || previous_token.type === "punc" && (previous_token.value === ")" || previous_token.value === "]"));
        ch = read_escaped_char(true, !prev_is_tag, true);
        raw += S.text.substr(tmp, S.pos - tmp);
      }
      content += ch;
    }
    S.template_braces.pop();
    tok = token(begin ? "template_head" : "template_cont", content);
    TEMPLATE_RAWS.set(tok, raw);
    tok.template_end = true;
    return tok;
  });
  function skip_line_comment(type) {
    var regex_allowed = S.regex_allowed;
    var i = find_eol(), ret;
    if (i == -1) {
      ret = S.text.substr(S.pos);
      S.pos = S.text.length;
    } else {
      ret = S.text.substring(S.pos, i);
      S.pos = i;
    }
    S.col = S.tokcol + (S.pos - S.tokpos);
    S.comments_before.push(token(type, ret, true));
    S.regex_allowed = regex_allowed;
    return next_token;
  }
  var skip_multiline_comment = with_eof_error("Unterminated multiline comment", function() {
    var regex_allowed = S.regex_allowed;
    var i = find("*/", true);
    var text = S.text.substring(S.pos, i).replace(/\r\n|\r|\u2028|\u2029/g, `
`);
    forward(get_full_char_length(text) + 2);
    S.comments_before.push(token("comment2", text, true));
    S.newline_before = S.newline_before || text.includes(`
`);
    S.regex_allowed = regex_allowed;
    return next_token;
  });
  var read_name = function() {
    let start = S.pos, end = start - 1, ch = "c";
    while ((ch = S.text.charAt(++end)) && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z"))
      ;
    if (end > start + 1 && ch && ch !== "\\" && !is_identifier_char(ch)) {
      S.pos += end - start;
      S.col += end - start;
      return S.text.slice(start, S.pos);
    }
    return read_name_hard();
  };
  var read_name_hard = with_eof_error("Unterminated identifier name", function() {
    var name = [], ch, escaped = false;
    var read_escaped_identifier_char = function() {
      escaped = true;
      next();
      if (peek() !== "u") {
        parse_error("Expecting UnicodeEscapeSequence -- uXXXX or u{XXXX}");
      }
      return read_escaped_char(false, true);
    };
    if ((ch = peek()) === "\\") {
      ch = read_escaped_identifier_char();
      if (!is_identifier_start(ch)) {
        parse_error("First identifier char is an invalid identifier char");
      }
    } else if (is_identifier_start(ch)) {
      next();
    } else {
      return "";
    }
    name.push(ch);
    while ((ch = peek()) != null) {
      if ((ch = peek()) === "\\") {
        ch = read_escaped_identifier_char();
        if (!is_identifier_char(ch)) {
          parse_error("Invalid escaped identifier char");
        }
      } else {
        if (!is_identifier_char(ch)) {
          break;
        }
        next();
      }
      name.push(ch);
    }
    const name_str = name.join("");
    if (RESERVED_WORDS.has(name_str) && escaped) {
      parse_error("Escaped characters are not allowed in keywords");
    }
    return name_str;
  });
  var read_regexp = with_eof_error("Unterminated regular expression", function(source) {
    var prev_backslash = false, ch, in_class = false;
    while (ch = next(true))
      if (NEWLINE_CHARS.has(ch)) {
        parse_error("Unexpected line terminator");
      } else if (prev_backslash) {
        if (/^[\u0000-\u007F]$/.test(ch)) {
          source += "\\" + ch;
        } else {
          source += ch;
        }
        prev_backslash = false;
      } else if (ch == "[") {
        in_class = true;
        source += ch;
      } else if (ch == "]" && in_class) {
        in_class = false;
        source += ch;
      } else if (ch == "/" && !in_class) {
        break;
      } else if (ch == "\\") {
        prev_backslash = true;
      } else {
        source += ch;
      }
    const flags = read_name();
    return token("regexp", "/" + source + "/" + flags);
  });
  function read_operator(prefix) {
    function grow(op) {
      if (!peek())
        return op;
      var bigger = op + peek();
      if (OPERATORS.has(bigger)) {
        next();
        return grow(bigger);
      } else {
        return op;
      }
    }
    return token("operator", grow(prefix || next()));
  }
  function handle_slash() {
    next();
    switch (peek()) {
      case "/":
        next();
        return skip_line_comment("comment1");
      case "*":
        next();
        return skip_multiline_comment();
    }
    return S.regex_allowed ? read_regexp("") : read_operator("/");
  }
  function handle_eq_sign() {
    next();
    if (peek() === ">") {
      next();
      return token("arrow", "=>");
    } else {
      return read_operator("=");
    }
  }
  function handle_dot() {
    next();
    if (is_digit(peek().charCodeAt(0))) {
      return read_num(".");
    }
    if (peek() === ".") {
      next();
      next();
      return token("expand", "...");
    }
    return token("punc", ".");
  }
  function read_word() {
    var word = read_name();
    if (prev_was_dot)
      return token("name", word);
    return KEYWORDS_ATOM.has(word) ? token("atom", word) : !KEYWORDS.has(word) ? token("name", word) : OPERATORS.has(word) ? token("operator", word) : token("keyword", word);
  }
  function read_private_word() {
    next();
    return token("privatename", read_name());
  }
  function with_eof_error(eof_error, cont) {
    return function(x) {
      try {
        return cont(x);
      } catch (ex) {
        if (ex === EX_EOF)
          parse_error(eof_error);
        else
          throw ex;
      }
    };
  }
  function next_token(force_regexp) {
    if (force_regexp != null)
      return read_regexp(force_regexp);
    if (shebang && S.pos == 0 && looking_at("#!")) {
      start_token();
      forward(2);
      skip_line_comment("comment5");
    }
    for (;; ) {
      skip_whitespace();
      start_token();
      if (html5_comments) {
        if (looking_at("<!--")) {
          forward(4);
          skip_line_comment("comment3");
          continue;
        }
        if (looking_at("-->") && S.newline_before) {
          forward(3);
          skip_line_comment("comment4");
          continue;
        }
      }
      var ch = peek();
      if (!ch)
        return token("eof");
      var code = ch.charCodeAt(0);
      switch (code) {
        case 34:
        case 39:
          return read_string();
        case 46:
          return handle_dot();
        case 47: {
          var tok = handle_slash();
          if (tok === next_token)
            continue;
          return tok;
        }
        case 61:
          return handle_eq_sign();
        case 63: {
          if (!is_option_chain_op())
            break;
          next();
          next();
          return token("punc", "?.");
        }
        case 96:
          return read_template_characters(true);
        case 123:
          S.brace_counter++;
          break;
        case 125:
          S.brace_counter--;
          if (S.template_braces.length > 0 && S.template_braces[S.template_braces.length - 1] === S.brace_counter)
            return read_template_characters(false);
          break;
      }
      if (is_digit(code))
        return read_num();
      if (PUNC_CHARS.has(ch))
        return token("punc", next());
      if (OPERATOR_CHARS.has(ch))
        return read_operator();
      if (code == 92 || is_identifier_start(ch))
        return read_word();
      if (code == 35)
        return read_private_word();
      break;
    }
    parse_error("Unexpected character '" + ch + "'");
  }
  next_token.next = next;
  next_token.peek = peek;
  next_token.context = function(nc) {
    if (nc)
      S = nc;
    return S;
  };
  next_token.add_directive = function(directive) {
    S.directive_stack[S.directive_stack.length - 1].push(directive);
    if (S.directives[directive] === undefined) {
      S.directives[directive] = 1;
    } else {
      S.directives[directive]++;
    }
  };
  next_token.push_directives_stack = function() {
    S.directive_stack.push([]);
  };
  next_token.pop_directives_stack = function() {
    var directives = S.directive_stack[S.directive_stack.length - 1];
    for (var i = 0;i < directives.length; i++) {
      S.directives[directives[i]]--;
    }
    S.directive_stack.pop();
  };
  next_token.has_directive = function(directive) {
    return S.directives[directive] > 0;
  };
  return next_token;
}
var UNARY_PREFIX = makePredicate([
  "typeof",
  "void",
  "delete",
  "--",
  "++",
  "!",
  "~",
  "-",
  "+"
]);
var UNARY_POSTFIX = makePredicate(["--", "++"]);
var ASSIGNMENT = makePredicate(["=", "+=", "-=", "??=", "&&=", "||=", "/=", "*=", "**=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&="]);
var LOGICAL_ASSIGNMENT = makePredicate(["??=", "&&=", "||="]);
var PRECEDENCE = function(a, ret) {
  for (var i = 0;i < a.length; ++i) {
    for (const op of a[i]) {
      ret[op] = i + 1;
    }
  }
  return ret;
}([
  ["||"],
  ["??"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "===", "!=", "!=="],
  ["<", ">", "<=", ">=", "in", "instanceof"],
  [">>", "<<", ">>>"],
  ["+", "-"],
  ["*", "/", "%"],
  ["**"]
], {});
var ATOMIC_START_TOKEN = makePredicate(["atom", "num", "big_int", "string", "regexp", "name"]);
function parse($TEXT, options) {
  const outer_comments_before_counts = new WeakMap;
  options = defaults(options, {
    bare_returns: false,
    ecma: null,
    expression: false,
    filename: null,
    html5_comments: true,
    module: false,
    shebang: true,
    strict: false,
    toplevel: null
  }, true);
  var S = {
    input: typeof $TEXT == "string" ? tokenizer($TEXT, options.filename, options.html5_comments, options.shebang) : $TEXT,
    token: null,
    prev: null,
    peeked: null,
    in_function: 0,
    in_async: -1,
    in_generator: -1,
    in_directives: true,
    in_loop: 0,
    labels: []
  };
  S.token = next();
  function is(type, value) {
    return is_token(S.token, type, value);
  }
  function peek() {
    return S.peeked || (S.peeked = S.input());
  }
  function next() {
    S.prev = S.token;
    if (!S.peeked)
      peek();
    S.token = S.peeked;
    S.peeked = null;
    S.in_directives = S.in_directives && (S.token.type == "string" || is("punc", ";"));
    return S.token;
  }
  function prev() {
    return S.prev;
  }
  function croak(msg, line, col, pos) {
    var ctx = S.input.context();
    js_error(msg, ctx.filename, line != null ? line : ctx.tokline, col != null ? col : ctx.tokcol, pos != null ? pos : ctx.tokpos);
  }
  function token_error(token, msg) {
    croak(msg, token.line, token.col);
  }
  function unexpected(token) {
    if (token == null)
      token = S.token;
    token_error(token, "Unexpected token: " + token.type + " (" + token.value + ")");
  }
  function expect_token(type, val) {
    if (is(type, val)) {
      return next();
    }
    token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
  }
  function expect(punc) {
    return expect_token("punc", punc);
  }
  function has_newline_before(token) {
    return token.nlb || !token.comments_before.every((comment) => !comment.nlb);
  }
  function can_insert_semicolon() {
    return !options.strict && (is("eof") || is("punc", "}") || has_newline_before(S.token));
  }
  function is_in_generator() {
    return S.in_generator === S.in_function;
  }
  function is_in_async() {
    return S.in_async === S.in_function;
  }
  function can_await() {
    return S.in_async === S.in_function || S.in_function === 0 && S.input.has_directive("use strict");
  }
  function semicolon(optional) {
    if (is("punc", ";"))
      next();
    else if (!optional && !can_insert_semicolon())
      unexpected();
  }
  function parenthesised() {
    expect("(");
    var exp = expression(true);
    expect(")");
    return exp;
  }
  function embed_tokens(parser) {
    return function _embed_tokens_wrapper(...args) {
      const start = S.token;
      const expr = parser(...args);
      expr.start = start;
      expr.end = prev();
      return expr;
    };
  }
  function handle_regexp() {
    if (is("operator", "/") || is("operator", "/=")) {
      S.peeked = null;
      S.token = S.input(S.token.value.substr(1));
    }
  }
  var statement = embed_tokens(function statement(is_export_default, is_for_body, is_if_body) {
    handle_regexp();
    switch (S.token.type) {
      case "string":
        if (S.in_directives) {
          var token = peek();
          if (!LATEST_RAW.includes("\\") && (is_token(token, "punc", ";") || is_token(token, "punc", "}") || has_newline_before(token) || is_token(token, "eof"))) {
            S.input.add_directive(S.token.value);
          } else {
            S.in_directives = false;
          }
        }
        var dir = S.in_directives, stat = simple_statement();
        return dir && stat.body instanceof AST_String ? new AST_Directive(stat.body) : stat;
      case "template_head":
      case "num":
      case "big_int":
      case "regexp":
      case "operator":
      case "atom":
        return simple_statement();
      case "name":
      case "privatename":
        if (is("privatename") && !S.in_class)
          croak("Private field must be used in an enclosing class");
        if (S.token.value == "async" && is_token(peek(), "keyword", "function")) {
          next();
          next();
          if (is_for_body) {
            croak("functions are not allowed as the body of a loop");
          }
          return function_(AST_Defun, false, true, is_export_default);
        }
        if (S.token.value == "import" && !is_token(peek(), "punc", "(") && !is_token(peek(), "punc", ".")) {
          next();
          var node = import_statement();
          semicolon();
          return node;
        }
        return is_token(peek(), "punc", ":") ? labeled_statement() : simple_statement();
      case "punc":
        switch (S.token.value) {
          case "{":
            return new AST_BlockStatement({
              start: S.token,
              body: block_(),
              end: prev()
            });
          case "[":
          case "(":
            return simple_statement();
          case ";":
            S.in_directives = false;
            next();
            return new AST_EmptyStatement;
          default:
            unexpected();
        }
      case "keyword":
        switch (S.token.value) {
          case "break":
            next();
            return break_cont(AST_Break);
          case "continue":
            next();
            return break_cont(AST_Continue);
          case "debugger":
            next();
            semicolon();
            return new AST_Debugger;
          case "do":
            next();
            var body = in_loop(statement);
            expect_token("keyword", "while");
            var condition = parenthesised();
            semicolon(true);
            return new AST_Do({
              body,
              condition
            });
          case "while":
            next();
            return new AST_While({
              condition: parenthesised(),
              body: in_loop(function() {
                return statement(false, true);
              })
            });
          case "for":
            next();
            return for_();
          case "class":
            next();
            if (is_for_body) {
              croak("classes are not allowed as the body of a loop");
            }
            if (is_if_body) {
              croak("classes are not allowed as the body of an if");
            }
            return class_(AST_DefClass, is_export_default);
          case "function":
            next();
            if (is_for_body) {
              croak("functions are not allowed as the body of a loop");
            }
            return function_(AST_Defun, false, false, is_export_default);
          case "if":
            next();
            return if_();
          case "return":
            if (S.in_function == 0 && !options.bare_returns)
              croak("'return' outside of function");
            next();
            var value = null;
            if (is("punc", ";")) {
              next();
            } else if (!can_insert_semicolon()) {
              value = expression(true);
              semicolon();
            }
            return new AST_Return({
              value
            });
          case "switch":
            next();
            return new AST_Switch({
              expression: parenthesised(),
              body: in_loop(switch_body_)
            });
          case "throw":
            next();
            if (has_newline_before(S.token))
              croak("Illegal newline after 'throw'");
            var value = expression(true);
            semicolon();
            return new AST_Throw({
              value
            });
          case "try":
            next();
            return try_();
          case "var":
            next();
            var node = var_();
            semicolon();
            return node;
          case "let":
            next();
            var node = let_();
            semicolon();
            return node;
          case "const":
            next();
            var node = const_();
            semicolon();
            return node;
          case "with":
            if (S.input.has_directive("use strict")) {
              croak("Strict mode may not include a with statement");
            }
            next();
            return new AST_With({
              expression: parenthesised(),
              body: statement()
            });
          case "export":
            if (!is_token(peek(), "punc", "(")) {
              next();
              var node = export_statement();
              if (is("punc", ";"))
                semicolon();
              return node;
            }
        }
    }
    unexpected();
  });
  function labeled_statement() {
    var label = as_symbol(AST_Label);
    if (label.name === "await" && is_in_async()) {
      token_error(S.prev, "await cannot be used as label inside async function");
    }
    if (S.labels.some((l) => l.name === label.name)) {
      croak("Label " + label.name + " defined twice");
    }
    expect(":");
    S.labels.push(label);
    var stat = statement();
    S.labels.pop();
    if (!(stat instanceof AST_IterationStatement)) {
      label.references.forEach(function(ref) {
        if (ref instanceof AST_Continue) {
          ref = ref.label.start;
          croak("Continue label `" + label.name + "` refers to non-IterationStatement.", ref.line, ref.col, ref.pos);
        }
      });
    }
    return new AST_LabeledStatement({ body: stat, label });
  }
  function simple_statement(tmp) {
    return new AST_SimpleStatement({ body: (tmp = expression(true), semicolon(), tmp) });
  }
  function break_cont(type) {
    var label = null, ldef;
    if (!can_insert_semicolon()) {
      label = as_symbol(AST_LabelRef, true);
    }
    if (label != null) {
      ldef = S.labels.find((l) => l.name === label.name);
      if (!ldef)
        croak("Undefined label " + label.name);
      label.thedef = ldef;
    } else if (S.in_loop == 0)
      croak(type.TYPE + " not inside a loop or switch");
    semicolon();
    var stat = new type({ label });
    if (ldef)
      ldef.references.push(stat);
    return stat;
  }
  function for_() {
    var for_await_error = "`for await` invalid in this context";
    var await_tok = S.token;
    if (await_tok.type == "name" && await_tok.value == "await") {
      if (!can_await()) {
        token_error(await_tok, for_await_error);
      }
      next();
    } else {
      await_tok = false;
    }
    expect("(");
    var init = null;
    if (!is("punc", ";")) {
      init = is("keyword", "var") ? (next(), var_(true)) : is("keyword", "let") ? (next(), let_(true)) : is("keyword", "const") ? (next(), const_(true)) : expression(true, true);
      var is_in = is("operator", "in");
      var is_of = is("name", "of");
      if (await_tok && !is_of) {
        token_error(await_tok, for_await_error);
      }
      if (is_in || is_of) {
        if (init instanceof AST_Definitions) {
          if (init.definitions.length > 1)
            token_error(init.start, "Only one variable declaration allowed in for..in loop");
        } else if (!(is_assignable(init) || (init = to_destructuring(init)) instanceof AST_Destructuring)) {
          token_error(init.start, "Invalid left-hand side in for..in loop");
        }
        next();
        if (is_in) {
          return for_in(init);
        } else {
          return for_of(init, !!await_tok);
        }
      }
    } else if (await_tok) {
      token_error(await_tok, for_await_error);
    }
    return regular_for(init);
  }
  function regular_for(init) {
    expect(";");
    var test = is("punc", ";") ? null : expression(true);
    expect(";");
    var step = is("punc", ")") ? null : expression(true);
    expect(")");
    return new AST_For({
      init,
      condition: test,
      step,
      body: in_loop(function() {
        return statement(false, true);
      })
    });
  }
  function for_of(init, is_await) {
    var lhs = init instanceof AST_Definitions ? init.definitions[0].name : null;
    var obj = expression(true);
    expect(")");
    return new AST_ForOf({
      await: is_await,
      init,
      name: lhs,
      object: obj,
      body: in_loop(function() {
        return statement(false, true);
      })
    });
  }
  function for_in(init) {
    var obj = expression(true);
    expect(")");
    return new AST_ForIn({
      init,
      object: obj,
      body: in_loop(function() {
        return statement(false, true);
      })
    });
  }
  var arrow_function = function(start, argnames, is_async) {
    if (has_newline_before(S.token)) {
      croak("Unexpected newline before arrow (=>)");
    }
    expect_token("arrow", "=>");
    var body = _function_body(is("punc", "{"), false, is_async);
    return new AST_Arrow({
      start,
      end: body.end,
      async: is_async,
      argnames,
      body
    });
  };
  var function_ = function(ctor, is_generator, is_async, is_export_default) {
    var in_statement = ctor === AST_Defun;
    if (is("operator", "*")) {
      is_generator = true;
      next();
    }
    var name = is("name") ? as_symbol(in_statement ? AST_SymbolDefun : AST_SymbolLambda) : null;
    if (in_statement && !name) {
      if (is_export_default) {
        ctor = AST_Function;
      } else {
        unexpected();
      }
    }
    if (name && ctor !== AST_Accessor && !(name instanceof AST_SymbolDeclaration))
      unexpected(prev());
    var args = [];
    var body = _function_body(true, is_generator, is_async, name, args);
    return new ctor({
      start: args.start,
      end: body.end,
      is_generator,
      async: is_async,
      name,
      argnames: args,
      body
    });
  };

  class UsedParametersTracker {
    constructor(is_parameter, strict, duplicates_ok = false) {
      this.is_parameter = is_parameter;
      this.duplicates_ok = duplicates_ok;
      this.parameters = new Set;
      this.duplicate = null;
      this.default_assignment = false;
      this.spread = false;
      this.strict_mode = !!strict;
    }
    add_parameter(token) {
      if (this.parameters.has(token.value)) {
        if (this.duplicate === null) {
          this.duplicate = token;
        }
        this.check_strict();
      } else {
        this.parameters.add(token.value);
        if (this.is_parameter) {
          switch (token.value) {
            case "arguments":
            case "eval":
            case "yield":
              if (this.strict_mode) {
                token_error(token, "Unexpected " + token.value + " identifier as parameter inside strict mode");
              }
              break;
            default:
              if (RESERVED_WORDS.has(token.value)) {
                unexpected();
              }
          }
        }
      }
    }
    mark_default_assignment(token) {
      if (this.default_assignment === false) {
        this.default_assignment = token;
      }
    }
    mark_spread(token) {
      if (this.spread === false) {
        this.spread = token;
      }
    }
    mark_strict_mode() {
      this.strict_mode = true;
    }
    is_strict() {
      return this.default_assignment !== false || this.spread !== false || this.strict_mode;
    }
    check_strict() {
      if (this.is_strict() && this.duplicate !== null && !this.duplicates_ok) {
        token_error(this.duplicate, "Parameter " + this.duplicate.value + " was used already");
      }
    }
  }
  function parameters(params) {
    var used_parameters = new UsedParametersTracker(true, S.input.has_directive("use strict"));
    expect("(");
    while (!is("punc", ")")) {
      var param = parameter(used_parameters);
      params.push(param);
      if (!is("punc", ")")) {
        expect(",");
      }
      if (param instanceof AST_Expansion) {
        break;
      }
    }
    next();
  }
  function parameter(used_parameters, symbol_type) {
    var param;
    var expand = false;
    if (used_parameters === undefined) {
      used_parameters = new UsedParametersTracker(true, S.input.has_directive("use strict"));
    }
    if (is("expand", "...")) {
      expand = S.token;
      used_parameters.mark_spread(S.token);
      next();
    }
    param = binding_element(used_parameters, symbol_type);
    if (is("operator", "=") && expand === false) {
      used_parameters.mark_default_assignment(S.token);
      next();
      param = new AST_DefaultAssign({
        start: param.start,
        left: param,
        operator: "=",
        right: expression(false),
        end: S.token
      });
    }
    if (expand !== false) {
      if (!is("punc", ")")) {
        unexpected();
      }
      param = new AST_Expansion({
        start: expand,
        expression: param,
        end: expand
      });
    }
    used_parameters.check_strict();
    return param;
  }
  function binding_element(used_parameters, symbol_type) {
    var elements = [];
    var first = true;
    var is_expand = false;
    var expand_token;
    var first_token = S.token;
    if (used_parameters === undefined) {
      const strict = S.input.has_directive("use strict");
      const duplicates_ok = symbol_type === AST_SymbolVar;
      used_parameters = new UsedParametersTracker(false, strict, duplicates_ok);
    }
    symbol_type = symbol_type === undefined ? AST_SymbolFunarg : symbol_type;
    if (is("punc", "[")) {
      next();
      while (!is("punc", "]")) {
        if (first) {
          first = false;
        } else {
          expect(",");
        }
        if (is("expand", "...")) {
          is_expand = true;
          expand_token = S.token;
          used_parameters.mark_spread(S.token);
          next();
        }
        if (is("punc")) {
          switch (S.token.value) {
            case ",":
              elements.push(new AST_Hole({
                start: S.token,
                end: S.token
              }));
              continue;
            case "]":
              break;
            case "[":
            case "{":
              elements.push(binding_element(used_parameters, symbol_type));
              break;
            default:
              unexpected();
          }
        } else if (is("name")) {
          used_parameters.add_parameter(S.token);
          elements.push(as_symbol(symbol_type));
        } else {
          croak("Invalid function parameter");
        }
        if (is("operator", "=") && is_expand === false) {
          used_parameters.mark_default_assignment(S.token);
          next();
          elements[elements.length - 1] = new AST_DefaultAssign({
            start: elements[elements.length - 1].start,
            left: elements[elements.length - 1],
            operator: "=",
            right: expression(false),
            end: S.token
          });
        }
        if (is_expand) {
          if (!is("punc", "]")) {
            croak("Rest element must be last element");
          }
          elements[elements.length - 1] = new AST_Expansion({
            start: expand_token,
            expression: elements[elements.length - 1],
            end: expand_token
          });
        }
      }
      expect("]");
      used_parameters.check_strict();
      return new AST_Destructuring({
        start: first_token,
        names: elements,
        is_array: true,
        end: prev()
      });
    } else if (is("punc", "{")) {
      next();
      while (!is("punc", "}")) {
        if (first) {
          first = false;
        } else {
          expect(",");
        }
        if (is("expand", "...")) {
          is_expand = true;
          expand_token = S.token;
          used_parameters.mark_spread(S.token);
          next();
        }
        if (is("name") && (is_token(peek(), "punc") || is_token(peek(), "operator")) && [",", "}", "="].includes(peek().value)) {
          used_parameters.add_parameter(S.token);
          var start = prev();
          var value = as_symbol(symbol_type);
          if (is_expand) {
            elements.push(new AST_Expansion({
              start: expand_token,
              expression: value,
              end: value.end
            }));
          } else {
            elements.push(new AST_ObjectKeyVal({
              start,
              key: value.name,
              value,
              end: value.end
            }));
          }
        } else if (is("punc", "}")) {
          continue;
        } else {
          var property_token = S.token;
          var property = as_property_name();
          if (property === null) {
            unexpected(prev());
          } else if (prev().type === "name" && !is("punc", ":")) {
            elements.push(new AST_ObjectKeyVal({
              start: prev(),
              key: property,
              value: new symbol_type({
                start: prev(),
                name: property,
                end: prev()
              }),
              end: prev()
            }));
          } else {
            expect(":");
            elements.push(new AST_ObjectKeyVal({
              start: property_token,
              quote: property_token.quote,
              key: property,
              value: binding_element(used_parameters, symbol_type),
              end: prev()
            }));
          }
        }
        if (is_expand) {
          if (!is("punc", "}")) {
            croak("Rest element must be last element");
          }
        } else if (is("operator", "=")) {
          used_parameters.mark_default_assignment(S.token);
          next();
          elements[elements.length - 1].value = new AST_DefaultAssign({
            start: elements[elements.length - 1].value.start,
            left: elements[elements.length - 1].value,
            operator: "=",
            right: expression(false),
            end: S.token
          });
        }
      }
      expect("}");
      used_parameters.check_strict();
      return new AST_Destructuring({
        start: first_token,
        names: elements,
        is_array: false,
        end: prev()
      });
    } else if (is("name")) {
      used_parameters.add_parameter(S.token);
      return as_symbol(symbol_type);
    } else {
      croak("Invalid function parameter");
    }
  }
  function params_or_seq_(allow_arrows, maybe_sequence) {
    var spread_token;
    var invalid_sequence;
    var trailing_comma;
    var a = [];
    expect("(");
    while (!is("punc", ")")) {
      if (spread_token)
        unexpected(spread_token);
      if (is("expand", "...")) {
        spread_token = S.token;
        if (maybe_sequence)
          invalid_sequence = S.token;
        next();
        a.push(new AST_Expansion({
          start: prev(),
          expression: expression(),
          end: S.token
        }));
      } else {
        a.push(expression());
      }
      if (!is("punc", ")")) {
        expect(",");
        if (is("punc", ")")) {
          trailing_comma = prev();
          if (maybe_sequence)
            invalid_sequence = trailing_comma;
        }
      }
    }
    expect(")");
    if (allow_arrows && is("arrow", "=>")) {
      if (spread_token && trailing_comma)
        unexpected(trailing_comma);
    } else if (invalid_sequence) {
      unexpected(invalid_sequence);
    }
    return a;
  }
  function _function_body(block, generator, is_async, name, args) {
    var loop = S.in_loop;
    var labels = S.labels;
    var current_generator = S.in_generator;
    var current_async = S.in_async;
    ++S.in_function;
    if (generator)
      S.in_generator = S.in_function;
    if (is_async)
      S.in_async = S.in_function;
    if (args)
      parameters(args);
    if (block)
      S.in_directives = true;
    S.in_loop = 0;
    S.labels = [];
    if (block) {
      S.input.push_directives_stack();
      var a = block_();
      if (name)
        _verify_symbol(name);
      if (args)
        args.forEach(_verify_symbol);
      S.input.pop_directives_stack();
    } else {
      var a = [new AST_Return({
        start: S.token,
        value: expression(false),
        end: S.token
      })];
    }
    --S.in_function;
    S.in_loop = loop;
    S.labels = labels;
    S.in_generator = current_generator;
    S.in_async = current_async;
    return a;
  }
  function _await_expression() {
    if (!can_await()) {
      croak("Unexpected await expression outside async function", S.prev.line, S.prev.col, S.prev.pos);
    }
    return new AST_Await({
      start: prev(),
      end: S.token,
      expression: maybe_unary(true)
    });
  }
  function _yield_expression() {
    var start = S.token;
    var star = false;
    var has_expression = true;
    if (can_insert_semicolon() || is("punc") && PUNC_AFTER_EXPRESSION.has(S.token.value) || is("template_cont")) {
      has_expression = false;
    } else if (is("operator", "*")) {
      star = true;
      next();
    }
    return new AST_Yield({
      start,
      is_star: star,
      expression: has_expression ? expression() : null,
      end: prev()
    });
  }
  function if_() {
    var cond = parenthesised(), body = statement(false, false, true), belse = null;
    if (is("keyword", "else")) {
      next();
      belse = statement(false, false, true);
    }
    return new AST_If({
      condition: cond,
      body,
      alternative: belse
    });
  }
  function block_() {
    expect("{");
    var a = [];
    while (!is("punc", "}")) {
      if (is("eof"))
        unexpected();
      a.push(statement());
    }
    next();
    return a;
  }
  function switch_body_() {
    expect("{");
    var a = [], cur = null, branch = null, tmp;
    while (!is("punc", "}")) {
      if (is("eof"))
        unexpected();
      if (is("keyword", "case")) {
        if (branch)
          branch.end = prev();
        cur = [];
        branch = new AST_Case({
          start: (tmp = S.token, next(), tmp),
          expression: expression(true),
          body: cur
        });
        a.push(branch);
        expect(":");
      } else if (is("keyword", "default")) {
        if (branch)
          branch.end = prev();
        cur = [];
        branch = new AST_Default({
          start: (tmp = S.token, next(), expect(":"), tmp),
          body: cur
        });
        a.push(branch);
      } else {
        if (!cur)
          unexpected();
        cur.push(statement());
      }
    }
    if (branch)
      branch.end = prev();
    next();
    return a;
  }
  function try_() {
    var body, bcatch = null, bfinally = null;
    body = new AST_TryBlock({
      start: S.token,
      body: block_(),
      end: prev()
    });
    if (is("keyword", "catch")) {
      var start = S.token;
      next();
      if (is("punc", "{")) {
        var name = null;
      } else {
        expect("(");
        var name = parameter(undefined, AST_SymbolCatch);
        expect(")");
      }
      bcatch = new AST_Catch({
        start,
        argname: name,
        body: block_(),
        end: prev()
      });
    }
    if (is("keyword", "finally")) {
      var start = S.token;
      next();
      bfinally = new AST_Finally({
        start,
        body: block_(),
        end: prev()
      });
    }
    if (!bcatch && !bfinally)
      croak("Missing catch/finally blocks");
    return new AST_Try({
      body,
      bcatch,
      bfinally
    });
  }
  function vardefs(no_in, kind) {
    var var_defs = [];
    var def;
    for (;; ) {
      var sym_type = kind === "var" ? AST_SymbolVar : kind === "const" ? AST_SymbolConst : kind === "let" ? AST_SymbolLet : null;
      if (is("punc", "{") || is("punc", "[")) {
        def = new AST_VarDef({
          start: S.token,
          name: binding_element(undefined, sym_type),
          value: is("operator", "=") ? (expect_token("operator", "="), expression(false, no_in)) : null,
          end: prev()
        });
      } else {
        def = new AST_VarDef({
          start: S.token,
          name: as_symbol(sym_type),
          value: is("operator", "=") ? (next(), expression(false, no_in)) : !no_in && kind === "const" ? croak("Missing initializer in const declaration") : null,
          end: prev()
        });
        if (def.name.name == "import")
          croak("Unexpected token: import");
      }
      var_defs.push(def);
      if (!is("punc", ","))
        break;
      next();
    }
    return var_defs;
  }
  var var_ = function(no_in) {
    return new AST_Var({
      start: prev(),
      definitions: vardefs(no_in, "var"),
      end: prev()
    });
  };
  var let_ = function(no_in) {
    return new AST_Let({
      start: prev(),
      definitions: vardefs(no_in, "let"),
      end: prev()
    });
  };
  var const_ = function(no_in) {
    return new AST_Const({
      start: prev(),
      definitions: vardefs(no_in, "const"),
      end: prev()
    });
  };
  var new_ = function(allow_calls) {
    var start = S.token;
    expect_token("operator", "new");
    if (is("punc", ".")) {
      next();
      expect_token("name", "target");
      return subscripts(new AST_NewTarget({
        start,
        end: prev()
      }), allow_calls);
    }
    var newexp = expr_atom(false), args;
    if (is("punc", "(")) {
      next();
      args = expr_list(")", true);
    } else {
      args = [];
    }
    var call = new AST_New({
      start,
      expression: newexp,
      args,
      end: prev()
    });
    annotate(call);
    return subscripts(call, allow_calls);
  };
  function as_atom_node() {
    var tok = S.token, ret;
    switch (tok.type) {
      case "name":
        ret = _make_symbol(AST_SymbolRef);
        break;
      case "num":
        ret = new AST_Number({
          start: tok,
          end: tok,
          value: tok.value,
          raw: LATEST_RAW
        });
        break;
      case "big_int":
        ret = new AST_BigInt({
          start: tok,
          end: tok,
          value: tok.value,
          raw: LATEST_RAW
        });
        break;
      case "string":
        ret = new AST_String({
          start: tok,
          end: tok,
          value: tok.value,
          quote: tok.quote
        });
        annotate(ret);
        break;
      case "regexp":
        const [_, source, flags] = tok.value.match(/^\/(.*)\/(\w*)$/);
        ret = new AST_RegExp({ start: tok, end: tok, value: { source, flags } });
        break;
      case "atom":
        switch (tok.value) {
          case "false":
            ret = new AST_False({ start: tok, end: tok });
            break;
          case "true":
            ret = new AST_True({ start: tok, end: tok });
            break;
          case "null":
            ret = new AST_Null({ start: tok, end: tok });
            break;
        }
        break;
    }
    next();
    return ret;
  }
  function to_fun_args(ex, default_seen_above) {
    var insert_default = function(ex2, default_value) {
      if (default_value) {
        return new AST_DefaultAssign({
          start: ex2.start,
          left: ex2,
          operator: "=",
          right: default_value,
          end: default_value.end
        });
      }
      return ex2;
    };
    if (ex instanceof AST_Object) {
      return insert_default(new AST_Destructuring({
        start: ex.start,
        end: ex.end,
        is_array: false,
        names: ex.properties.map((prop) => to_fun_args(prop))
      }), default_seen_above);
    } else if (ex instanceof AST_ObjectKeyVal) {
      ex.value = to_fun_args(ex.value);
      return insert_default(ex, default_seen_above);
    } else if (ex instanceof AST_Hole) {
      return ex;
    } else if (ex instanceof AST_Destructuring) {
      ex.names = ex.names.map((name) => to_fun_args(name));
      return insert_default(ex, default_seen_above);
    } else if (ex instanceof AST_SymbolRef) {
      return insert_default(new AST_SymbolFunarg({
        name: ex.name,
        start: ex.start,
        end: ex.end
      }), default_seen_above);
    } else if (ex instanceof AST_Expansion) {
      ex.expression = to_fun_args(ex.expression);
      return insert_default(ex, default_seen_above);
    } else if (ex instanceof AST_Array) {
      return insert_default(new AST_Destructuring({
        start: ex.start,
        end: ex.end,
        is_array: true,
        names: ex.elements.map((elm) => to_fun_args(elm))
      }), default_seen_above);
    } else if (ex instanceof AST_Assign) {
      return insert_default(to_fun_args(ex.left, ex.right), default_seen_above);
    } else if (ex instanceof AST_DefaultAssign) {
      ex.left = to_fun_args(ex.left);
      return ex;
    } else {
      croak("Invalid function parameter", ex.start.line, ex.start.col);
    }
  }
  var expr_atom = function(allow_calls, allow_arrows) {
    if (is("operator", "new")) {
      return new_(allow_calls);
    }
    if (is("name", "import") && is_token(peek(), "punc", ".")) {
      return import_meta(allow_calls);
    }
    var start = S.token;
    var peeked;
    var async = is("name", "async") && (peeked = peek()).value != "[" && peeked.type != "arrow" && as_atom_node();
    if (is("punc")) {
      switch (S.token.value) {
        case "(":
          if (async && !allow_calls)
            break;
          var exprs = params_or_seq_(allow_arrows, !async);
          if (allow_arrows && is("arrow", "=>")) {
            return arrow_function(start, exprs.map((e) => to_fun_args(e)), !!async);
          }
          var ex = async ? new AST_Call({
            expression: async,
            args: exprs
          }) : to_expr_or_sequence(start, exprs);
          if (ex.start) {
            const outer_comments_before = start.comments_before.length;
            outer_comments_before_counts.set(start, outer_comments_before);
            ex.start.comments_before.unshift(...start.comments_before);
            start.comments_before = ex.start.comments_before;
            if (outer_comments_before == 0 && start.comments_before.length > 0) {
              var comment = start.comments_before[0];
              if (!comment.nlb) {
                comment.nlb = start.nlb;
                start.nlb = false;
              }
            }
            start.comments_after = ex.start.comments_after;
          }
          ex.start = start;
          var end = prev();
          if (ex.end) {
            end.comments_before = ex.end.comments_before;
            ex.end.comments_after.push(...end.comments_after);
            end.comments_after = ex.end.comments_after;
          }
          ex.end = end;
          if (ex instanceof AST_Call)
            annotate(ex);
          return subscripts(ex, allow_calls);
        case "[":
          return subscripts(array_(), allow_calls);
        case "{":
          return subscripts(object_or_destructuring_(), allow_calls);
      }
      if (!async)
        unexpected();
    }
    if (allow_arrows && is("name") && is_token(peek(), "arrow")) {
      var param = new AST_SymbolFunarg({
        name: S.token.value,
        start,
        end: start
      });
      next();
      return arrow_function(start, [param], !!async);
    }
    if (is("keyword", "function")) {
      next();
      var func = function_(AST_Function, false, !!async);
      func.start = start;
      func.end = prev();
      return subscripts(func, allow_calls);
    }
    if (async)
      return subscripts(async, allow_calls);
    if (is("keyword", "class")) {
      next();
      var cls = class_(AST_ClassExpression);
      cls.start = start;
      cls.end = prev();
      return subscripts(cls, allow_calls);
    }
    if (is("template_head")) {
      return subscripts(template_string(), allow_calls);
    }
    if (ATOMIC_START_TOKEN.has(S.token.type)) {
      return subscripts(as_atom_node(), allow_calls);
    }
    unexpected();
  };
  function template_string() {
    var segments = [], start = S.token;
    segments.push(new AST_TemplateSegment({
      start: S.token,
      raw: TEMPLATE_RAWS.get(S.token),
      value: S.token.value,
      end: S.token
    }));
    while (!S.token.template_end) {
      next();
      handle_regexp();
      segments.push(expression(true));
      segments.push(new AST_TemplateSegment({
        start: S.token,
        raw: TEMPLATE_RAWS.get(S.token),
        value: S.token.value,
        end: S.token
      }));
    }
    next();
    return new AST_TemplateString({
      start,
      segments,
      end: S.token
    });
  }
  function expr_list(closing, allow_trailing_comma, allow_empty) {
    var first = true, a = [];
    while (!is("punc", closing)) {
      if (first)
        first = false;
      else
        expect(",");
      if (allow_trailing_comma && is("punc", closing))
        break;
      if (is("punc", ",") && allow_empty) {
        a.push(new AST_Hole({ start: S.token, end: S.token }));
      } else if (is("expand", "...")) {
        next();
        a.push(new AST_Expansion({ start: prev(), expression: expression(), end: S.token }));
      } else {
        a.push(expression(false));
      }
    }
    next();
    return a;
  }
  var array_ = embed_tokens(function() {
    expect("[");
    return new AST_Array({
      elements: expr_list("]", !options.strict, true)
    });
  });
  var create_accessor = embed_tokens((is_generator, is_async) => {
    return function_(AST_Accessor, is_generator, is_async);
  });
  var object_or_destructuring_ = embed_tokens(function object_or_destructuring_() {
    var start = S.token, first = true, a = [];
    expect("{");
    while (!is("punc", "}")) {
      if (first)
        first = false;
      else
        expect(",");
      if (!options.strict && is("punc", "}"))
        break;
      start = S.token;
      if (start.type == "expand") {
        next();
        a.push(new AST_Expansion({
          start,
          expression: expression(false),
          end: prev()
        }));
        continue;
      }
      if (is("privatename")) {
        croak("private fields are not allowed in an object");
      }
      var name = as_property_name();
      var value;
      if (!is("punc", ":")) {
        var concise = object_or_class_property(name, start);
        if (concise) {
          a.push(concise);
          continue;
        }
        value = new AST_SymbolRef({
          start: prev(),
          name,
          end: prev()
        });
      } else if (name === null) {
        unexpected(prev());
      } else {
        next();
        value = expression(false);
      }
      if (is("operator", "=")) {
        next();
        value = new AST_Assign({
          start,
          left: value,
          operator: "=",
          right: expression(false),
          logical: false,
          end: prev()
        });
      }
      const kv = new AST_ObjectKeyVal({
        start,
        quote: start.quote,
        key: name,
        value,
        end: prev()
      });
      a.push(annotate(kv));
    }
    next();
    return new AST_Object({ properties: a });
  });
  function class_(KindOfClass, is_export_default) {
    var start, method, class_name, extends_, properties = [];
    S.input.push_directives_stack();
    S.input.add_directive("use strict");
    if (S.token.type == "name" && S.token.value != "extends") {
      class_name = as_symbol(KindOfClass === AST_DefClass ? AST_SymbolDefClass : AST_SymbolClass);
    }
    if (KindOfClass === AST_DefClass && !class_name) {
      if (is_export_default) {
        KindOfClass = AST_ClassExpression;
      } else {
        unexpected();
      }
    }
    if (S.token.value == "extends") {
      next();
      extends_ = expression(true);
    }
    expect("{");
    const save_in_class = S.in_class;
    S.in_class = true;
    while (is("punc", ";")) {
      next();
    }
    while (!is("punc", "}")) {
      start = S.token;
      method = object_or_class_property(as_property_name(), start, true);
      if (!method) {
        unexpected();
      }
      properties.push(method);
      while (is("punc", ";")) {
        next();
      }
    }
    S.in_class = save_in_class;
    S.input.pop_directives_stack();
    next();
    return new KindOfClass({
      start,
      name: class_name,
      extends: extends_,
      properties,
      end: prev()
    });
  }
  function object_or_class_property(name, start, is_class) {
    const get_symbol_ast = (name2, SymbolClass) => {
      if (typeof name2 === "string") {
        return new SymbolClass({ start, name: name2, end: prev() });
      } else if (name2 === null) {
        unexpected();
      }
      return name2;
    };
    const is_not_method_start = () => !is("punc", "(") && !is("punc", ",") && !is("punc", "}") && !is("punc", ";") && !is("operator", "=");
    var is_async = false;
    var is_static = false;
    var is_generator = false;
    var is_private = false;
    var accessor_type = null;
    if (is_class && name === "static" && is_not_method_start()) {
      const static_block = class_static_block();
      if (static_block != null) {
        return static_block;
      }
      is_static = true;
      name = as_property_name();
    }
    if (name === "async" && is_not_method_start()) {
      is_async = true;
      name = as_property_name();
    }
    if (prev().type === "operator" && prev().value === "*") {
      is_generator = true;
      name = as_property_name();
    }
    if ((name === "get" || name === "set") && is_not_method_start()) {
      accessor_type = name;
      name = as_property_name();
    }
    if (prev().type === "privatename") {
      is_private = true;
    }
    const property_token = prev();
    if (accessor_type != null) {
      if (!is_private) {
        const AccessorClass = accessor_type === "get" ? AST_ObjectGetter : AST_ObjectSetter;
        name = get_symbol_ast(name, AST_SymbolMethod);
        return annotate(new AccessorClass({
          start,
          static: is_static,
          key: name,
          quote: name instanceof AST_SymbolMethod ? property_token.quote : undefined,
          value: create_accessor(),
          end: prev()
        }));
      } else {
        const AccessorClass = accessor_type === "get" ? AST_PrivateGetter : AST_PrivateSetter;
        return annotate(new AccessorClass({
          start,
          static: is_static,
          key: get_symbol_ast(name, AST_SymbolMethod),
          value: create_accessor(),
          end: prev()
        }));
      }
    }
    if (is("punc", "(")) {
      name = get_symbol_ast(name, AST_SymbolMethod);
      const AST_MethodVariant = is_private ? AST_PrivateMethod : AST_ConciseMethod;
      var node = new AST_MethodVariant({
        start,
        static: is_static,
        key: name,
        quote: name instanceof AST_SymbolMethod ? property_token.quote : undefined,
        value: create_accessor(is_generator, is_async),
        end: prev()
      });
      return annotate(node);
    }
    if (is_class) {
      const AST_SymbolVariant = is_private ? AST_SymbolPrivateProperty : AST_SymbolClassProperty;
      const AST_ClassPropertyVariant = is_private ? AST_ClassPrivateProperty : AST_ClassProperty;
      const key = get_symbol_ast(name, AST_SymbolVariant);
      const quote = key instanceof AST_SymbolClassProperty ? property_token.quote : undefined;
      if (is("operator", "=")) {
        next();
        return annotate(new AST_ClassPropertyVariant({
          start,
          static: is_static,
          quote,
          key,
          value: expression(false),
          end: prev()
        }));
      } else if (is("name") || is("privatename") || is("punc", "[") || is("operator", "*") || is("punc", ";") || is("punc", "}") || is("string") || is("num") || is("big_int")) {
        return annotate(new AST_ClassPropertyVariant({
          start,
          static: is_static,
          quote,
          key,
          end: prev()
        }));
      }
    }
  }
  function class_static_block() {
    if (!is("punc", "{")) {
      return null;
    }
    const start = S.token;
    const body = [];
    next();
    while (!is("punc", "}")) {
      body.push(statement());
    }
    next();
    return new AST_ClassStaticBlock({ start, body, end: prev() });
  }
  function maybe_import_attributes() {
    if ((is("keyword", "with") || is("name", "assert")) && !has_newline_before(S.token)) {
      next();
      return object_or_destructuring_();
    }
    return null;
  }
  function import_statement() {
    var start = prev();
    var imported_name;
    var imported_names;
    if (is("name")) {
      imported_name = as_symbol(AST_SymbolImport);
    }
    if (is("punc", ",")) {
      next();
    }
    imported_names = map_names(true);
    if (imported_names || imported_name) {
      expect_token("name", "from");
    }
    var mod_str = S.token;
    if (mod_str.type !== "string") {
      unexpected();
    }
    next();
    const attributes = maybe_import_attributes();
    return new AST_Import({
      start,
      imported_name,
      imported_names,
      module_name: new AST_String({
        start: mod_str,
        value: mod_str.value,
        quote: mod_str.quote,
        end: mod_str
      }),
      attributes,
      end: S.token
    });
  }
  function import_meta(allow_calls) {
    var start = S.token;
    expect_token("name", "import");
    expect_token("punc", ".");
    expect_token("name", "meta");
    return subscripts(new AST_ImportMeta({
      start,
      end: prev()
    }), allow_calls);
  }
  function map_name(is_import) {
    function make_symbol(type2, quote) {
      return new type2({
        name: as_property_name(),
        quote: quote || undefined,
        start: prev(),
        end: prev()
      });
    }
    var foreign_type = is_import ? AST_SymbolImportForeign : AST_SymbolExportForeign;
    var type = is_import ? AST_SymbolImport : AST_SymbolExport;
    var start = S.token;
    var foreign_name;
    var name;
    if (is_import) {
      foreign_name = make_symbol(foreign_type, start.quote);
    } else {
      name = make_symbol(type, start.quote);
    }
    if (is("name", "as")) {
      next();
      if (is_import) {
        name = make_symbol(type);
      } else {
        foreign_name = make_symbol(foreign_type, S.token.quote);
      }
    } else {
      if (is_import) {
        name = new type(foreign_name);
      } else {
        foreign_name = new foreign_type(name);
      }
    }
    return new AST_NameMapping({
      start,
      foreign_name,
      name,
      end: prev()
    });
  }
  function map_nameAsterisk(is_import, import_or_export_foreign_name) {
    var foreign_type = is_import ? AST_SymbolImportForeign : AST_SymbolExportForeign;
    var type = is_import ? AST_SymbolImport : AST_SymbolExport;
    var start = S.token;
    var name, foreign_name;
    var end = prev();
    if (is_import) {
      name = import_or_export_foreign_name;
    } else {
      foreign_name = import_or_export_foreign_name;
    }
    name = name || new type({
      start,
      name: "*",
      end
    });
    foreign_name = foreign_name || new foreign_type({
      start,
      name: "*",
      end
    });
    return new AST_NameMapping({
      start,
      foreign_name,
      name,
      end
    });
  }
  function map_names(is_import) {
    var names;
    if (is("punc", "{")) {
      next();
      names = [];
      while (!is("punc", "}")) {
        names.push(map_name(is_import));
        if (is("punc", ",")) {
          next();
        }
      }
      next();
    } else if (is("operator", "*")) {
      var name;
      next();
      if (is("name", "as")) {
        next();
        name = is_import ? as_symbol(AST_SymbolImport) : as_symbol_or_string(AST_SymbolExportForeign);
      }
      names = [map_nameAsterisk(is_import, name)];
    }
    return names;
  }
  function export_statement() {
    var start = S.token;
    var is_default;
    var exported_names;
    if (is("keyword", "default")) {
      is_default = true;
      next();
    } else if (exported_names = map_names(false)) {
      if (is("name", "from")) {
        next();
        var mod_str = S.token;
        if (mod_str.type !== "string") {
          unexpected();
        }
        next();
        const attributes = maybe_import_attributes();
        return new AST_Export({
          start,
          is_default,
          exported_names,
          module_name: new AST_String({
            start: mod_str,
            value: mod_str.value,
            quote: mod_str.quote,
            end: mod_str
          }),
          end: prev(),
          attributes
        });
      } else {
        return new AST_Export({
          start,
          is_default,
          exported_names,
          end: prev()
        });
      }
    }
    var node;
    var exported_value;
    var exported_definition;
    if (is("punc", "{") || is_default && (is("keyword", "class") || is("keyword", "function")) && is_token(peek(), "punc")) {
      exported_value = expression(false);
      semicolon();
    } else if ((node = statement(is_default)) instanceof AST_Definitions && is_default) {
      unexpected(node.start);
    } else if (node instanceof AST_Definitions || node instanceof AST_Defun || node instanceof AST_DefClass) {
      exported_definition = node;
    } else if (node instanceof AST_ClassExpression || node instanceof AST_Function) {
      exported_value = node;
    } else if (node instanceof AST_SimpleStatement) {
      exported_value = node.body;
    } else {
      unexpected(node.start);
    }
    return new AST_Export({
      start,
      is_default,
      exported_value,
      exported_definition,
      end: prev(),
      attributes: null
    });
  }
  function as_property_name() {
    var tmp = S.token;
    switch (tmp.type) {
      case "punc":
        if (tmp.value === "[") {
          next();
          var ex = expression(false);
          expect("]");
          return ex;
        } else
          unexpected(tmp);
      case "operator":
        if (tmp.value === "*") {
          next();
          return null;
        }
        if (!["delete", "in", "instanceof", "new", "typeof", "void"].includes(tmp.value)) {
          unexpected(tmp);
        }
      case "name":
      case "privatename":
      case "string":
      case "keyword":
      case "atom":
        next();
        return tmp.value;
      case "num":
      case "big_int":
        next();
        return "" + tmp.value;
      default:
        unexpected(tmp);
    }
  }
  function as_name() {
    var tmp = S.token;
    if (tmp.type != "name" && tmp.type != "privatename")
      unexpected();
    next();
    return tmp.value;
  }
  function _make_symbol(type) {
    var name = S.token.value;
    return new (name == "this" ? AST_This : name == "super" ? AST_Super : type)({
      name: String(name),
      start: S.token,
      end: S.token
    });
  }
  function _verify_symbol(sym) {
    var name = sym.name;
    if (is_in_generator() && name == "yield") {
      token_error(sym.start, "Yield cannot be used as identifier inside generators");
    }
    if (S.input.has_directive("use strict")) {
      if (name == "yield") {
        token_error(sym.start, "Unexpected yield identifier inside strict mode");
      }
      if (sym instanceof AST_SymbolDeclaration && (name == "arguments" || name == "eval")) {
        token_error(sym.start, "Unexpected " + name + " in strict mode");
      }
    }
  }
  function as_symbol(type, noerror) {
    if (!is("name")) {
      if (!noerror)
        croak("Name expected");
      return null;
    }
    var sym = _make_symbol(type);
    _verify_symbol(sym);
    next();
    return sym;
  }
  function as_symbol_or_string(type) {
    if (!is("name")) {
      if (!is("string")) {
        croak("Name or string expected");
      }
      var tok = S.token;
      var ret = new type({
        start: tok,
        end: tok,
        name: tok.value,
        quote: tok.quote
      });
      next();
      return ret;
    }
    var sym = _make_symbol(type);
    _verify_symbol(sym);
    next();
    return sym;
  }
  function annotate(node, before_token = node.start) {
    var comments = before_token.comments_before;
    const comments_outside_parens = outer_comments_before_counts.get(before_token);
    var i = comments_outside_parens != null ? comments_outside_parens : comments.length;
    while (--i >= 0) {
      var comment = comments[i];
      if (/[@#]__/.test(comment.value)) {
        if (/[@#]__PURE__/.test(comment.value)) {
          set_annotation(node, _PURE);
          break;
        }
        if (/[@#]__INLINE__/.test(comment.value)) {
          set_annotation(node, _INLINE);
          break;
        }
        if (/[@#]__NOINLINE__/.test(comment.value)) {
          set_annotation(node, _NOINLINE);
          break;
        }
        if (/[@#]__KEY__/.test(comment.value)) {
          set_annotation(node, _KEY);
          break;
        }
        if (/[@#]__MANGLE_PROP__/.test(comment.value)) {
          set_annotation(node, _MANGLEPROP);
          break;
        }
      }
    }
    return node;
  }
  var subscripts = function(expr, allow_calls, is_chain) {
    var start = expr.start;
    if (is("punc", ".")) {
      next();
      if (is("privatename") && !S.in_class)
        croak("Private field must be used in an enclosing class");
      const AST_DotVariant = is("privatename") ? AST_DotHash : AST_Dot;
      return annotate(subscripts(new AST_DotVariant({
        start,
        expression: expr,
        optional: false,
        property: as_name(),
        end: prev()
      }), allow_calls, is_chain));
    }
    if (is("punc", "[")) {
      next();
      var prop = expression(true);
      expect("]");
      return annotate(subscripts(new AST_Sub({
        start,
        expression: expr,
        optional: false,
        property: prop,
        end: prev()
      }), allow_calls, is_chain));
    }
    if (allow_calls && is("punc", "(")) {
      next();
      var call = new AST_Call({
        start,
        expression: expr,
        optional: false,
        args: call_args(),
        end: prev()
      });
      annotate(call);
      return subscripts(call, true, is_chain);
    }
    if (is("punc", "?.")) {
      next();
      let chain_contents;
      if (allow_calls && is("punc", "(")) {
        next();
        const call2 = new AST_Call({
          start,
          optional: true,
          expression: expr,
          args: call_args(),
          end: prev()
        });
        annotate(call2);
        chain_contents = subscripts(call2, true, true);
      } else if (is("name") || is("privatename")) {
        if (is("privatename") && !S.in_class)
          croak("Private field must be used in an enclosing class");
        const AST_DotVariant = is("privatename") ? AST_DotHash : AST_Dot;
        chain_contents = annotate(subscripts(new AST_DotVariant({
          start,
          expression: expr,
          optional: true,
          property: as_name(),
          end: prev()
        }), allow_calls, true));
      } else if (is("punc", "[")) {
        next();
        const property = expression(true);
        expect("]");
        chain_contents = annotate(subscripts(new AST_Sub({
          start,
          expression: expr,
          optional: true,
          property,
          end: prev()
        }), allow_calls, true));
      }
      if (!chain_contents)
        unexpected();
      if (chain_contents instanceof AST_Chain)
        return chain_contents;
      return new AST_Chain({
        start,
        expression: chain_contents,
        end: prev()
      });
    }
    if (is("template_head")) {
      if (is_chain) {
        unexpected();
      }
      return subscripts(new AST_PrefixedTemplateString({
        start,
        prefix: expr,
        template_string: template_string(),
        end: prev()
      }), allow_calls);
    }
    return expr;
  };
  function call_args() {
    var args = [];
    while (!is("punc", ")")) {
      if (is("expand", "...")) {
        next();
        args.push(new AST_Expansion({
          start: prev(),
          expression: expression(false),
          end: prev()
        }));
      } else {
        args.push(expression(false));
      }
      if (!is("punc", ")")) {
        expect(",");
      }
    }
    next();
    return args;
  }
  var maybe_unary = function(allow_calls, allow_arrows) {
    var start = S.token;
    if (start.type == "name" && start.value == "await" && can_await()) {
      next();
      return _await_expression();
    }
    if (is("operator") && UNARY_PREFIX.has(start.value)) {
      next();
      handle_regexp();
      var ex = make_unary(AST_UnaryPrefix, start, maybe_unary(allow_calls));
      ex.start = start;
      ex.end = prev();
      return ex;
    }
    var val = expr_atom(allow_calls, allow_arrows);
    while (is("operator") && UNARY_POSTFIX.has(S.token.value) && !has_newline_before(S.token)) {
      if (val instanceof AST_Arrow)
        unexpected();
      val = make_unary(AST_UnaryPostfix, S.token, val);
      val.start = start;
      val.end = S.token;
      next();
    }
    return val;
  };
  function make_unary(ctor, token, expr) {
    var op = token.value;
    switch (op) {
      case "++":
      case "--":
        if (!is_assignable(expr))
          croak("Invalid use of " + op + " operator", token.line, token.col, token.pos);
        break;
      case "delete":
        if (expr instanceof AST_SymbolRef && S.input.has_directive("use strict"))
          croak("Calling delete on expression not allowed in strict mode", expr.start.line, expr.start.col, expr.start.pos);
        break;
    }
    return new ctor({ operator: op, expression: expr });
  }
  var expr_op = function(left, min_prec, no_in) {
    var op = is("operator") ? S.token.value : null;
    if (op == "in" && no_in)
      op = null;
    if (op == "**" && left instanceof AST_UnaryPrefix && !is_token(left.start, "punc", "(") && left.operator !== "--" && left.operator !== "++")
      unexpected(left.start);
    var prec = op != null ? PRECEDENCE[op] : null;
    if (prec != null && (prec > min_prec || op === "**" && min_prec === prec)) {
      next();
      var right = expr_ops(no_in, prec, true);
      return expr_op(new AST_Binary({
        start: left.start,
        left,
        operator: op,
        right,
        end: right.end
      }), min_prec, no_in);
    }
    return left;
  };
  function expr_ops(no_in, min_prec, allow_calls, allow_arrows) {
    if (!no_in && min_prec < PRECEDENCE["in"] && is("privatename")) {
      if (!S.in_class) {
        croak("Private field must be used in an enclosing class");
      }
      const start = S.token;
      const key = new AST_SymbolPrivateProperty({
        start,
        name: start.value,
        end: start
      });
      next();
      expect_token("operator", "in");
      const private_in = new AST_PrivateIn({
        start,
        key,
        value: expr_ops(no_in, PRECEDENCE["in"], true),
        end: prev()
      });
      return expr_op(private_in, 0, no_in);
    } else {
      return expr_op(maybe_unary(allow_calls, allow_arrows), min_prec, no_in);
    }
  }
  var maybe_conditional = function(no_in) {
    var start = S.token;
    var expr = expr_ops(no_in, 0, true, true);
    if (is("operator", "?")) {
      next();
      var yes = expression(false);
      expect(":");
      return new AST_Conditional({
        start,
        condition: expr,
        consequent: yes,
        alternative: expression(false, no_in),
        end: prev()
      });
    }
    return expr;
  };
  function is_assignable(expr) {
    return expr instanceof AST_PropAccess || expr instanceof AST_SymbolRef;
  }
  function to_destructuring(node) {
    if (node instanceof AST_Object) {
      node = new AST_Destructuring({
        start: node.start,
        names: node.properties.map(to_destructuring),
        is_array: false,
        end: node.end
      });
    } else if (node instanceof AST_Array) {
      var names = [];
      for (var i = 0;i < node.elements.length; i++) {
        if (node.elements[i] instanceof AST_Expansion) {
          if (i + 1 !== node.elements.length) {
            token_error(node.elements[i].start, "Spread must the be last element in destructuring array");
          }
          node.elements[i].expression = to_destructuring(node.elements[i].expression);
        }
        names.push(to_destructuring(node.elements[i]));
      }
      node = new AST_Destructuring({
        start: node.start,
        names,
        is_array: true,
        end: node.end
      });
    } else if (node instanceof AST_ObjectProperty) {
      node.value = to_destructuring(node.value);
    } else if (node instanceof AST_Assign) {
      node = new AST_DefaultAssign({
        start: node.start,
        left: node.left,
        operator: "=",
        right: node.right,
        end: node.end
      });
    }
    return node;
  }
  var maybe_assign = function(no_in) {
    handle_regexp();
    var start = S.token;
    if (start.type == "name" && start.value == "yield") {
      if (is_in_generator()) {
        next();
        return _yield_expression();
      } else if (S.input.has_directive("use strict")) {
        token_error(S.token, "Unexpected yield identifier inside strict mode");
      }
    }
    var left = maybe_conditional(no_in);
    var val = S.token.value;
    if (is("operator") && ASSIGNMENT.has(val)) {
      if (is_assignable(left) || (left = to_destructuring(left)) instanceof AST_Destructuring) {
        next();
        return new AST_Assign({
          start,
          left,
          operator: val,
          right: maybe_assign(no_in),
          logical: LOGICAL_ASSIGNMENT.has(val),
          end: prev()
        });
      }
      croak("Invalid assignment");
    }
    return left;
  };
  var to_expr_or_sequence = function(start, exprs) {
    if (exprs.length === 1) {
      return exprs[0];
    } else if (exprs.length > 1) {
      return new AST_Sequence({ start, expressions: exprs, end: peek() });
    } else {
      croak("Invalid parenthesized expression");
    }
  };
  var expression = function(commas, no_in) {
    var start = S.token;
    var exprs = [];
    while (true) {
      exprs.push(maybe_assign(no_in));
      if (!commas || !is("punc", ","))
        break;
      next();
      commas = true;
    }
    return to_expr_or_sequence(start, exprs);
  };
  function in_loop(cont) {
    ++S.in_loop;
    var ret = cont();
    --S.in_loop;
    return ret;
  }
  if (options.expression) {
    return expression(true);
  }
  return function parse_toplevel() {
    var start = S.token;
    var body = [];
    S.input.push_directives_stack();
    if (options.module)
      S.input.add_directive("use strict");
    while (!is("eof")) {
      body.push(statement());
    }
    S.input.pop_directives_stack();
    var end = prev();
    var toplevel = options.toplevel;
    if (toplevel) {
      toplevel.body = toplevel.body.concat(body);
      toplevel.end = end;
    } else {
      toplevel = new AST_Toplevel({ start, body, end });
    }
    TEMPLATE_RAWS = new Map;
    return toplevel;
  }();
}

// node_modules/terser/lib/ast.js
function DEFNODE(type, props, ctor, methods, base = AST_Node) {
  if (!props)
    props = [];
  else
    props = props.split(/\s+/);
  var self_props = props;
  if (base && base.PROPS)
    props = props.concat(base.PROPS);
  const proto = base && Object.create(base.prototype);
  if (proto) {
    ctor.prototype = proto;
    ctor.BASE = base;
  }
  if (base)
    base.SUBCLASSES.push(ctor);
  ctor.prototype.CTOR = ctor;
  ctor.prototype.constructor = ctor;
  ctor.PROPS = props || null;
  ctor.SELF_PROPS = self_props;
  ctor.SUBCLASSES = [];
  if (type) {
    ctor.prototype.TYPE = ctor.TYPE = type;
  }
  if (methods) {
    for (let i in methods)
      if (HOP(methods, i)) {
        if (i[0] === "$") {
          ctor[i.substr(1)] = methods[i];
        } else {
          ctor.prototype[i] = methods[i];
        }
      }
  }
  ctor.DEFMETHOD = function(name, method) {
    this.prototype[name] = method;
  };
  return ctor;
}
var has_tok_flag = (tok, flag) => Boolean(tok.flags & flag);
var set_tok_flag = (tok, flag, truth) => {
  if (truth) {
    tok.flags |= flag;
  } else {
    tok.flags &= ~flag;
  }
};
var TOK_FLAG_NLB = 1;
var TOK_FLAG_QUOTE_SINGLE = 2;
var TOK_FLAG_QUOTE_EXISTS = 4;
var TOK_FLAG_TEMPLATE_END = 8;

class AST_Token {
  constructor(type, value, line, col, pos, nlb, comments_before, comments_after, file) {
    this.flags = nlb ? 1 : 0;
    this.type = type;
    this.value = value;
    this.line = line;
    this.col = col;
    this.pos = pos;
    this.comments_before = comments_before;
    this.comments_after = comments_after;
    this.file = file;
    Object.seal(this);
  }
  [Symbol.for("nodejs.util.inspect.custom")](_depth, options) {
    const special = (str) => options.stylize(str, "special");
    const quote = typeof this.value === "string" && this.value.includes("`") ? "'" : "`";
    const value = `${quote}${this.value}${quote}`;
    return `${special("[AST_Token")} ${value} at ${this.line}:${this.col}${special("]")}`;
  }
  get nlb() {
    return has_tok_flag(this, TOK_FLAG_NLB);
  }
  set nlb(new_nlb) {
    set_tok_flag(this, TOK_FLAG_NLB, new_nlb);
  }
  get quote() {
    return !has_tok_flag(this, TOK_FLAG_QUOTE_EXISTS) ? "" : has_tok_flag(this, TOK_FLAG_QUOTE_SINGLE) ? "'" : '"';
  }
  set quote(quote_type) {
    set_tok_flag(this, TOK_FLAG_QUOTE_SINGLE, quote_type === "'");
    set_tok_flag(this, TOK_FLAG_QUOTE_EXISTS, !!quote_type);
  }
  get template_end() {
    return has_tok_flag(this, TOK_FLAG_TEMPLATE_END);
  }
  set template_end(new_template_end) {
    set_tok_flag(this, TOK_FLAG_TEMPLATE_END, new_template_end);
  }
}
var AST_Node = DEFNODE("Node", "start end", function AST_Node2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  _clone: function(deep) {
    if (deep) {
      var self2 = this.clone();
      return self2.transform(new TreeTransformer(function(node) {
        if (node !== self2) {
          return node.clone(true);
        }
      }));
    }
    return new this.CTOR(this);
  },
  clone: function(deep) {
    return this._clone(deep);
  },
  $documentation: "Base class of all AST nodes",
  $propdoc: {
    start: "[AST_Token] The first token of this node",
    end: "[AST_Token] The last token of this node"
  },
  _walk: function(visitor) {
    return visitor._visit(this);
  },
  walk: function(visitor) {
    return this._walk(visitor);
  },
  _children_backwards: () => {}
}, null);
var AST_Statement = DEFNODE("Statement", null, function AST_Statement2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class of all statements"
});
var AST_Debugger = DEFNODE("Debugger", null, function AST_Debugger2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Represents a debugger statement"
}, AST_Statement);
var AST_Directive = DEFNODE("Directive", "value quote", function AST_Directive2(props) {
  if (props) {
    this.value = props.value;
    this.quote = props.quote;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: 'Represents a directive, like "use strict";',
  $propdoc: {
    value: "[string] The value of this directive as a plain string (it's not an AST_String!)",
    quote: "[string] the original quote character"
  }
}, AST_Statement);
var AST_SimpleStatement = DEFNODE("SimpleStatement", "body", function AST_SimpleStatement2(props) {
  if (props) {
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A statement consisting of an expression, i.e. a = 1 + 2",
  $propdoc: {
    body: "[AST_Node] an expression node (should not be instanceof AST_Statement)"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.body._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.body);
  }
}, AST_Statement);
function walk_body(node, visitor) {
  const body = node.body;
  for (var i = 0, len = body.length;i < len; i++) {
    body[i]._walk(visitor);
  }
}
function clone_block_scope(deep) {
  var clone = this._clone(deep);
  if (this.block_scope) {
    clone.block_scope = this.block_scope.clone();
  }
  return clone;
}
var AST_Block = DEFNODE("Block", "body block_scope", function AST_Block2(props) {
  if (props) {
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A body of statements (usually braced)",
  $propdoc: {
    body: "[AST_Statement*] an array of statements",
    block_scope: "[AST_Scope] the block scope"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      walk_body(this, visitor);
    });
  },
  _children_backwards(push) {
    let i = this.body.length;
    while (i--)
      push(this.body[i]);
  },
  clone: clone_block_scope
}, AST_Statement);
var AST_BlockStatement = DEFNODE("BlockStatement", null, function AST_BlockStatement2(props) {
  if (props) {
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A block statement"
}, AST_Block);
var AST_EmptyStatement = DEFNODE("EmptyStatement", null, function AST_EmptyStatement2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The empty statement (empty block or simply a semicolon)"
}, AST_Statement);
var AST_StatementWithBody = DEFNODE("StatementWithBody", "body", function AST_StatementWithBody2(props) {
  if (props) {
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",
  $propdoc: {
    body: "[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"
  }
}, AST_Statement);
var AST_LabeledStatement = DEFNODE("LabeledStatement", "label", function AST_LabeledStatement2(props) {
  if (props) {
    this.label = props.label;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Statement with a label",
  $propdoc: {
    label: "[AST_Label] a label definition"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.label._walk(visitor);
      this.body._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.body);
    push(this.label);
  },
  clone: function(deep) {
    var node = this._clone(deep);
    if (deep) {
      var label = node.label;
      var def = this.label;
      node.walk(new TreeWalker(function(node2) {
        if (node2 instanceof AST_LoopControl && node2.label && node2.label.thedef === def) {
          node2.label.thedef = label;
          label.references.push(node2);
        }
      }));
    }
    return node;
  }
}, AST_StatementWithBody);
var AST_IterationStatement = DEFNODE("IterationStatement", "block_scope", function AST_IterationStatement2(props) {
  if (props) {
    this.block_scope = props.block_scope;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Internal class.  All loops inherit from it.",
  $propdoc: {
    block_scope: "[AST_Scope] the block scope for this iteration statement."
  },
  clone: clone_block_scope
}, AST_StatementWithBody);
var AST_DWLoop = DEFNODE("DWLoop", "condition", function AST_DWLoop2(props) {
  if (props) {
    this.condition = props.condition;
    this.block_scope = props.block_scope;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for do/while statements",
  $propdoc: {
    condition: "[AST_Node] the loop condition.  Should not be instanceof AST_Statement"
  }
}, AST_IterationStatement);
var AST_Do = DEFNODE("Do", null, function AST_Do2(props) {
  if (props) {
    this.condition = props.condition;
    this.block_scope = props.block_scope;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `do` statement",
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.body._walk(visitor);
      this.condition._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.condition);
    push(this.body);
  }
}, AST_DWLoop);
var AST_While = DEFNODE("While", null, function AST_While2(props) {
  if (props) {
    this.condition = props.condition;
    this.block_scope = props.block_scope;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `while` statement",
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.condition._walk(visitor);
      this.body._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.body);
    push(this.condition);
  }
}, AST_DWLoop);
var AST_For = DEFNODE("For", "init condition step", function AST_For2(props) {
  if (props) {
    this.init = props.init;
    this.condition = props.condition;
    this.step = props.step;
    this.block_scope = props.block_scope;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `for` statement",
  $propdoc: {
    init: "[AST_Node?] the `for` initialization code, or null if empty",
    condition: "[AST_Node?] the `for` termination clause, or null if empty",
    step: "[AST_Node?] the `for` update clause, or null if empty"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.init)
        this.init._walk(visitor);
      if (this.condition)
        this.condition._walk(visitor);
      if (this.step)
        this.step._walk(visitor);
      this.body._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.body);
    if (this.step)
      push(this.step);
    if (this.condition)
      push(this.condition);
    if (this.init)
      push(this.init);
  }
}, AST_IterationStatement);
var AST_ForIn = DEFNODE("ForIn", "init object", function AST_ForIn2(props) {
  if (props) {
    this.init = props.init;
    this.object = props.object;
    this.block_scope = props.block_scope;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `for ... in` statement",
  $propdoc: {
    init: "[AST_Node] the `for/in` initialization code",
    object: "[AST_Node] the object that we're looping through"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.init._walk(visitor);
      this.object._walk(visitor);
      this.body._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.body);
    if (this.object)
      push(this.object);
    if (this.init)
      push(this.init);
  }
}, AST_IterationStatement);
var AST_ForOf = DEFNODE("ForOf", "await", function AST_ForOf2(props) {
  if (props) {
    this.await = props.await;
    this.init = props.init;
    this.object = props.object;
    this.block_scope = props.block_scope;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `for ... of` statement"
}, AST_ForIn);
var AST_With = DEFNODE("With", "expression", function AST_With2(props) {
  if (props) {
    this.expression = props.expression;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `with` statement",
  $propdoc: {
    expression: "[AST_Node] the `with` expression"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
      this.body._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.body);
    push(this.expression);
  }
}, AST_StatementWithBody);
var AST_Scope = DEFNODE("Scope", "variables uses_with uses_eval parent_scope enclosed cname", function AST_Scope2(props) {
  if (props) {
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for all statements introducing a lexical scope",
  $propdoc: {
    variables: "[Map/S] a map of name -> SymbolDef for all variables/functions defined in this scope",
    uses_with: "[boolean/S] tells whether this scope uses the `with` statement",
    uses_eval: "[boolean/S] tells whether this scope contains a direct call to the global `eval`",
    parent_scope: "[AST_Scope?/S] link to the parent scope",
    enclosed: "[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",
    cname: "[integer/S] current index for mangling variables (used internally by the mangler)"
  },
  get_defun_scope: function() {
    var self2 = this;
    while (self2.is_block_scope()) {
      self2 = self2.parent_scope;
    }
    return self2;
  },
  clone: function(deep, toplevel) {
    var node = this._clone(deep);
    if (deep && this.variables && toplevel && !this._block_scope) {
      node.figure_out_scope({}, {
        toplevel,
        parent_scope: this.parent_scope
      });
    } else {
      if (this.variables)
        node.variables = new Map(this.variables);
      if (this.enclosed)
        node.enclosed = this.enclosed.slice();
      if (this._block_scope)
        node._block_scope = this._block_scope;
    }
    return node;
  },
  pinned: function() {
    return this.uses_eval || this.uses_with;
  }
}, AST_Block);
var AST_Toplevel = DEFNODE("Toplevel", "globals", function AST_Toplevel2(props) {
  if (props) {
    this.globals = props.globals;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The toplevel scope",
  $propdoc: {
    globals: "[Map/S] a map of name -> SymbolDef for all undeclared names"
  },
  wrap_commonjs: function(name) {
    var body = this.body;
    var wrapped_tl = "(function(exports){'$ORIG';})(typeof " + name + "=='undefined'?(" + name + "={}):" + name + ");";
    wrapped_tl = parse(wrapped_tl);
    wrapped_tl = wrapped_tl.transform(new TreeTransformer(function(node) {
      if (node instanceof AST_Directive && node.value == "$ORIG") {
        return MAP.splice(body);
      }
    }));
    return wrapped_tl;
  },
  wrap_enclose: function(args_values) {
    if (typeof args_values != "string")
      args_values = "";
    var index = args_values.indexOf(":");
    if (index < 0)
      index = args_values.length;
    var body = this.body;
    return parse([
      "(function(",
      args_values.slice(0, index),
      '){"$ORIG"})(',
      args_values.slice(index + 1),
      ")"
    ].join("")).transform(new TreeTransformer(function(node) {
      if (node instanceof AST_Directive && node.value == "$ORIG") {
        return MAP.splice(body);
      }
    }));
  }
}, AST_Scope);
var AST_Expansion = DEFNODE("Expansion", "expression", function AST_Expansion2(props) {
  if (props) {
    this.expression = props.expression;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An expandible argument, such as ...rest, a splat, such as [1,2,...all], or an expansion in a variable declaration, such as var [first, ...rest] = list",
  $propdoc: {
    expression: "[AST_Node] the thing to be expanded"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression.walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.expression);
  }
});
var AST_Lambda = DEFNODE("Lambda", "name argnames uses_arguments is_generator async", function AST_Lambda2(props) {
  if (props) {
    this.name = props.name;
    this.argnames = props.argnames;
    this.uses_arguments = props.uses_arguments;
    this.is_generator = props.is_generator;
    this.async = props.async;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for functions",
  $propdoc: {
    name: "[AST_SymbolDeclaration?] the name of this function",
    argnames: "[AST_SymbolFunarg|AST_Destructuring|AST_Expansion|AST_DefaultAssign*] array of function arguments, destructurings, or expanding arguments",
    uses_arguments: "[boolean/S] tells whether this function accesses the arguments array",
    is_generator: "[boolean] is this a generator method",
    async: "[boolean] is this method async"
  },
  args_as_names: function() {
    var out = [];
    for (var i = 0;i < this.argnames.length; i++) {
      if (this.argnames[i] instanceof AST_Destructuring) {
        out.push(...this.argnames[i].all_symbols());
      } else {
        out.push(this.argnames[i]);
      }
    }
    return out;
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.name)
        this.name._walk(visitor);
      var argnames = this.argnames;
      for (var i = 0, len = argnames.length;i < len; i++) {
        argnames[i]._walk(visitor);
      }
      walk_body(this, visitor);
    });
  },
  _children_backwards(push) {
    let i = this.body.length;
    while (i--)
      push(this.body[i]);
    i = this.argnames.length;
    while (i--)
      push(this.argnames[i]);
    if (this.name)
      push(this.name);
  },
  is_braceless() {
    return this.body[0] instanceof AST_Return && this.body[0].value;
  },
  length_property() {
    let length = 0;
    for (const arg of this.argnames) {
      if (arg instanceof AST_SymbolFunarg || arg instanceof AST_Destructuring) {
        length++;
      }
    }
    return length;
  }
}, AST_Scope);
var AST_Accessor = DEFNODE("Accessor", null, function AST_Accessor2(props) {
  if (props) {
    this.name = props.name;
    this.argnames = props.argnames;
    this.uses_arguments = props.uses_arguments;
    this.is_generator = props.is_generator;
    this.async = props.async;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A setter/getter function.  The `name` property is always null."
}, AST_Lambda);
var AST_Function = DEFNODE("Function", null, function AST_Function2(props) {
  if (props) {
    this.name = props.name;
    this.argnames = props.argnames;
    this.uses_arguments = props.uses_arguments;
    this.is_generator = props.is_generator;
    this.async = props.async;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A function expression"
}, AST_Lambda);
var AST_Arrow = DEFNODE("Arrow", null, function AST_Arrow2(props) {
  if (props) {
    this.name = props.name;
    this.argnames = props.argnames;
    this.uses_arguments = props.uses_arguments;
    this.is_generator = props.is_generator;
    this.async = props.async;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An ES6 Arrow function ((a) => b)"
}, AST_Lambda);
var AST_Defun = DEFNODE("Defun", null, function AST_Defun2(props) {
  if (props) {
    this.name = props.name;
    this.argnames = props.argnames;
    this.uses_arguments = props.uses_arguments;
    this.is_generator = props.is_generator;
    this.async = props.async;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A function definition"
}, AST_Lambda);
var AST_Destructuring = DEFNODE("Destructuring", "names is_array", function AST_Destructuring2(props) {
  if (props) {
    this.names = props.names;
    this.is_array = props.is_array;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A destructuring of several names. Used in destructuring assignment and with destructuring function argument names",
  $propdoc: {
    names: "[AST_Node*] Array of properties or elements",
    is_array: "[Boolean] Whether the destructuring represents an object or array"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.names.forEach(function(name) {
        name._walk(visitor);
      });
    });
  },
  _children_backwards(push) {
    let i = this.names.length;
    while (i--)
      push(this.names[i]);
  },
  all_symbols: function() {
    var out = [];
    walk(this, (node) => {
      if (node instanceof AST_SymbolDeclaration) {
        out.push(node);
      }
      if (node instanceof AST_Lambda) {
        return true;
      }
    });
    return out;
  }
});
var AST_PrefixedTemplateString = DEFNODE("PrefixedTemplateString", "template_string prefix", function AST_PrefixedTemplateString2(props) {
  if (props) {
    this.template_string = props.template_string;
    this.prefix = props.prefix;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A templatestring with a prefix, such as String.raw`foobarbaz`",
  $propdoc: {
    template_string: "[AST_TemplateString] The template string",
    prefix: "[AST_Node] The prefix, which will get called."
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.prefix._walk(visitor);
      this.template_string._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.template_string);
    push(this.prefix);
  }
});
var AST_TemplateString = DEFNODE("TemplateString", "segments", function AST_TemplateString2(props) {
  if (props) {
    this.segments = props.segments;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A template string literal",
  $propdoc: {
    segments: "[AST_Node*] One or more segments, starting with AST_TemplateSegment. AST_Node may follow AST_TemplateSegment, but each AST_Node must be followed by AST_TemplateSegment."
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.segments.forEach(function(seg) {
        seg._walk(visitor);
      });
    });
  },
  _children_backwards(push) {
    let i = this.segments.length;
    while (i--)
      push(this.segments[i]);
  }
});
var AST_TemplateSegment = DEFNODE("TemplateSegment", "value raw", function AST_TemplateSegment2(props) {
  if (props) {
    this.value = props.value;
    this.raw = props.raw;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A segment of a template string literal",
  $propdoc: {
    value: "Content of the segment",
    raw: "Raw source of the segment"
  }
});
var AST_Jump = DEFNODE("Jump", null, function AST_Jump2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"
}, AST_Statement);
var AST_Exit = DEFNODE("Exit", "value", function AST_Exit2(props) {
  if (props) {
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for “exits” (`return` and `throw`)",
  $propdoc: {
    value: "[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"
  },
  _walk: function(visitor) {
    return visitor._visit(this, this.value && function() {
      this.value._walk(visitor);
    });
  },
  _children_backwards(push) {
    if (this.value)
      push(this.value);
  }
}, AST_Jump);
var AST_Return = DEFNODE("Return", null, function AST_Return2(props) {
  if (props) {
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `return` statement"
}, AST_Exit);
var AST_Throw = DEFNODE("Throw", null, function AST_Throw2(props) {
  if (props) {
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `throw` statement"
}, AST_Exit);
var AST_LoopControl = DEFNODE("LoopControl", "label", function AST_LoopControl2(props) {
  if (props) {
    this.label = props.label;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for loop control statements (`break` and `continue`)",
  $propdoc: {
    label: "[AST_LabelRef?] the label, or null if none"
  },
  _walk: function(visitor) {
    return visitor._visit(this, this.label && function() {
      this.label._walk(visitor);
    });
  },
  _children_backwards(push) {
    if (this.label)
      push(this.label);
  }
}, AST_Jump);
var AST_Break = DEFNODE("Break", null, function AST_Break2(props) {
  if (props) {
    this.label = props.label;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `break` statement"
}, AST_LoopControl);
var AST_Continue = DEFNODE("Continue", null, function AST_Continue2(props) {
  if (props) {
    this.label = props.label;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `continue` statement"
}, AST_LoopControl);
var AST_Await = DEFNODE("Await", "expression", function AST_Await2(props) {
  if (props) {
    this.expression = props.expression;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An `await` statement",
  $propdoc: {
    expression: "[AST_Node] the mandatory expression being awaited"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.expression);
  }
});
var AST_Yield = DEFNODE("Yield", "expression is_star", function AST_Yield2(props) {
  if (props) {
    this.expression = props.expression;
    this.is_star = props.is_star;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `yield` statement",
  $propdoc: {
    expression: "[AST_Node?] the value returned or thrown by this statement; could be null (representing undefined) but only when is_star is set to false",
    is_star: "[Boolean] Whether this is a yield or yield* statement"
  },
  _walk: function(visitor) {
    return visitor._visit(this, this.expression && function() {
      this.expression._walk(visitor);
    });
  },
  _children_backwards(push) {
    if (this.expression)
      push(this.expression);
  }
});
var AST_If = DEFNODE("If", "condition alternative", function AST_If2(props) {
  if (props) {
    this.condition = props.condition;
    this.alternative = props.alternative;
    this.body = props.body;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `if` statement",
  $propdoc: {
    condition: "[AST_Node] the `if` condition",
    alternative: "[AST_Statement?] the `else` part, or null if not present"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.condition._walk(visitor);
      this.body._walk(visitor);
      if (this.alternative)
        this.alternative._walk(visitor);
    });
  },
  _children_backwards(push) {
    if (this.alternative) {
      push(this.alternative);
    }
    push(this.body);
    push(this.condition);
  }
}, AST_StatementWithBody);
var AST_Switch = DEFNODE("Switch", "expression", function AST_Switch2(props) {
  if (props) {
    this.expression = props.expression;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `switch` statement",
  $propdoc: {
    expression: "[AST_Node] the `switch` “discriminant”"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
      walk_body(this, visitor);
    });
  },
  _children_backwards(push) {
    let i = this.body.length;
    while (i--)
      push(this.body[i]);
    push(this.expression);
  }
}, AST_Block);
var AST_SwitchBranch = DEFNODE("SwitchBranch", null, function AST_SwitchBranch2(props) {
  if (props) {
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for `switch` branches"
}, AST_Block);
var AST_Default = DEFNODE("Default", null, function AST_Default2(props) {
  if (props) {
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `default` switch branch"
}, AST_SwitchBranch);
var AST_Case = DEFNODE("Case", "expression", function AST_Case2(props) {
  if (props) {
    this.expression = props.expression;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `case` switch branch",
  $propdoc: {
    expression: "[AST_Node] the `case` expression"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
      walk_body(this, visitor);
    });
  },
  _children_backwards(push) {
    let i = this.body.length;
    while (i--)
      push(this.body[i]);
    push(this.expression);
  }
}, AST_SwitchBranch);
var AST_Try = DEFNODE("Try", "body bcatch bfinally", function AST_Try2(props) {
  if (props) {
    this.body = props.body;
    this.bcatch = props.bcatch;
    this.bfinally = props.bfinally;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `try` statement",
  $propdoc: {
    body: "[AST_TryBlock] the try block",
    bcatch: "[AST_Catch?] the catch block, or null if not present",
    bfinally: "[AST_Finally?] the finally block, or null if not present"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.body._walk(visitor);
      if (this.bcatch)
        this.bcatch._walk(visitor);
      if (this.bfinally)
        this.bfinally._walk(visitor);
    });
  },
  _children_backwards(push) {
    if (this.bfinally)
      push(this.bfinally);
    if (this.bcatch)
      push(this.bcatch);
    push(this.body);
  }
}, AST_Statement);
var AST_TryBlock = DEFNODE("TryBlock", null, function AST_TryBlock2(props) {
  if (props) {
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The `try` block of a try statement"
}, AST_Block);
var AST_Catch = DEFNODE("Catch", "argname", function AST_Catch2(props) {
  if (props) {
    this.argname = props.argname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `catch` node; only makes sense as part of a `try` statement",
  $propdoc: {
    argname: "[AST_SymbolCatch|AST_Destructuring|AST_Expansion|AST_DefaultAssign] symbol for the exception"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.argname)
        this.argname._walk(visitor);
      walk_body(this, visitor);
    });
  },
  _children_backwards(push) {
    let i = this.body.length;
    while (i--)
      push(this.body[i]);
    if (this.argname)
      push(this.argname);
  }
}, AST_Block);
var AST_Finally = DEFNODE("Finally", null, function AST_Finally2(props) {
  if (props) {
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `finally` node; only makes sense as part of a `try` statement"
}, AST_Block);
var AST_Definitions = DEFNODE("Definitions", "definitions", function AST_Definitions2(props) {
  if (props) {
    this.definitions = props.definitions;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for `var` or `const` nodes (variable declarations/initializations)",
  $propdoc: {
    definitions: "[AST_VarDef*] array of variable definitions"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      var definitions = this.definitions;
      for (var i = 0, len = definitions.length;i < len; i++) {
        definitions[i]._walk(visitor);
      }
    });
  },
  _children_backwards(push) {
    let i = this.definitions.length;
    while (i--)
      push(this.definitions[i]);
  }
}, AST_Statement);
var AST_Var = DEFNODE("Var", null, function AST_Var2(props) {
  if (props) {
    this.definitions = props.definitions;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `var` statement"
}, AST_Definitions);
var AST_Let = DEFNODE("Let", null, function AST_Let2(props) {
  if (props) {
    this.definitions = props.definitions;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `let` statement"
}, AST_Definitions);
var AST_Const = DEFNODE("Const", null, function AST_Const2(props) {
  if (props) {
    this.definitions = props.definitions;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A `const` statement"
}, AST_Definitions);
var AST_VarDef = DEFNODE("VarDef", "name value", function AST_VarDef2(props) {
  if (props) {
    this.name = props.name;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A variable declaration; only appears in a AST_Definitions node",
  $propdoc: {
    name: "[AST_Destructuring|AST_SymbolConst|AST_SymbolLet|AST_SymbolVar] name of the variable",
    value: "[AST_Node?] initializer, or null of there's no initializer"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.name._walk(visitor);
      if (this.value)
        this.value._walk(visitor);
    });
  },
  _children_backwards(push) {
    if (this.value)
      push(this.value);
    push(this.name);
  },
  declarations_as_names() {
    if (this.name instanceof AST_SymbolDeclaration) {
      return [this];
    } else {
      return this.name.all_symbols();
    }
  }
});
var AST_NameMapping = DEFNODE("NameMapping", "foreign_name name", function AST_NameMapping2(props) {
  if (props) {
    this.foreign_name = props.foreign_name;
    this.name = props.name;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The part of the export/import statement that declare names from a module.",
  $propdoc: {
    foreign_name: "[AST_SymbolExportForeign|AST_SymbolImportForeign] The name being exported/imported (as specified in the module)",
    name: "[AST_SymbolExport|AST_SymbolImport] The name as it is visible to this module."
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.foreign_name._walk(visitor);
      this.name._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.name);
    push(this.foreign_name);
  }
});
var AST_Import = DEFNODE("Import", "imported_name imported_names module_name attributes", function AST_Import2(props) {
  if (props) {
    this.imported_name = props.imported_name;
    this.imported_names = props.imported_names;
    this.module_name = props.module_name;
    this.attributes = props.attributes;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An `import` statement",
  $propdoc: {
    imported_name: "[AST_SymbolImport] The name of the variable holding the module's default export.",
    imported_names: "[AST_NameMapping*] The names of non-default imported variables",
    module_name: "[AST_String] String literal describing where this module came from",
    attributes: "[AST_Object?] The import attributes (with {...})"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.imported_name) {
        this.imported_name._walk(visitor);
      }
      if (this.imported_names) {
        this.imported_names.forEach(function(name_import) {
          name_import._walk(visitor);
        });
      }
      this.module_name._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.module_name);
    if (this.imported_names) {
      let i = this.imported_names.length;
      while (i--)
        push(this.imported_names[i]);
    }
    if (this.imported_name)
      push(this.imported_name);
  }
});
var AST_ImportMeta = DEFNODE("ImportMeta", null, function AST_ImportMeta2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A reference to import.meta"
});
var AST_Export = DEFNODE("Export", "exported_definition exported_value is_default exported_names module_name attributes", function AST_Export2(props) {
  if (props) {
    this.exported_definition = props.exported_definition;
    this.exported_value = props.exported_value;
    this.is_default = props.is_default;
    this.exported_names = props.exported_names;
    this.module_name = props.module_name;
    this.attributes = props.attributes;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An `export` statement",
  $propdoc: {
    exported_definition: "[AST_Defun|AST_Definitions|AST_DefClass?] An exported definition",
    exported_value: "[AST_Node?] An exported value",
    exported_names: "[AST_NameMapping*?] List of exported names",
    module_name: "[AST_String?] Name of the file to load exports from",
    is_default: "[Boolean] Whether this is the default exported value of this module",
    attributes: "[AST_Object?] The import attributes"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.exported_definition) {
        this.exported_definition._walk(visitor);
      }
      if (this.exported_value) {
        this.exported_value._walk(visitor);
      }
      if (this.exported_names) {
        this.exported_names.forEach(function(name_export) {
          name_export._walk(visitor);
        });
      }
      if (this.module_name) {
        this.module_name._walk(visitor);
      }
    });
  },
  _children_backwards(push) {
    if (this.module_name)
      push(this.module_name);
    if (this.exported_names) {
      let i = this.exported_names.length;
      while (i--)
        push(this.exported_names[i]);
    }
    if (this.exported_value)
      push(this.exported_value);
    if (this.exported_definition)
      push(this.exported_definition);
  }
}, AST_Statement);
var AST_Call = DEFNODE("Call", "expression args optional _annotations", function AST_Call2(props) {
  if (props) {
    this.expression = props.expression;
    this.args = props.args;
    this.optional = props.optional;
    this._annotations = props._annotations;
    this.start = props.start;
    this.end = props.end;
    this.initialize();
  }
  this.flags = 0;
}, {
  $documentation: "A function call expression",
  $propdoc: {
    expression: "[AST_Node] expression to invoke as function",
    args: "[AST_Node*] array of arguments",
    optional: "[boolean] whether this is an optional call (IE ?.() )",
    _annotations: "[number] bitfield containing information about the call"
  },
  initialize() {
    if (this._annotations == null)
      this._annotations = 0;
  },
  _walk(visitor) {
    return visitor._visit(this, function() {
      var args = this.args;
      for (var i = 0, len = args.length;i < len; i++) {
        args[i]._walk(visitor);
      }
      this.expression._walk(visitor);
    });
  },
  _children_backwards(push) {
    let i = this.args.length;
    while (i--)
      push(this.args[i]);
    push(this.expression);
  }
});
var AST_New = DEFNODE("New", null, function AST_New2(props) {
  if (props) {
    this.expression = props.expression;
    this.args = props.args;
    this.optional = props.optional;
    this._annotations = props._annotations;
    this.start = props.start;
    this.end = props.end;
    this.initialize();
  }
  this.flags = 0;
}, {
  $documentation: "An object instantiation.  Derives from a function call since it has exactly the same properties"
}, AST_Call);
var AST_Sequence = DEFNODE("Sequence", "expressions", function AST_Sequence2(props) {
  if (props) {
    this.expressions = props.expressions;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A sequence expression (comma-separated expressions)",
  $propdoc: {
    expressions: "[AST_Node*] array of expressions (at least two)"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expressions.forEach(function(node) {
        node._walk(visitor);
      });
    });
  },
  _children_backwards(push) {
    let i = this.expressions.length;
    while (i--)
      push(this.expressions[i]);
  }
});
var AST_PropAccess = DEFNODE("PropAccess", "expression property optional", function AST_PropAccess2(props) {
  if (props) {
    this.expression = props.expression;
    this.property = props.property;
    this.optional = props.optional;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: 'Base class for property access expressions, i.e. `a.foo` or `a["foo"]`',
  $propdoc: {
    expression: "[AST_Node] the “container” expression",
    property: "[AST_Node|string] the property to access.  For AST_Dot & AST_DotHash this is always a plain string, while for AST_Sub it's an arbitrary AST_Node",
    optional: "[boolean] whether this is an optional property access (IE ?.)"
  }
});
var AST_Dot = DEFNODE("Dot", "quote", function AST_Dot2(props) {
  if (props) {
    this.quote = props.quote;
    this.expression = props.expression;
    this.property = props.property;
    this.optional = props.optional;
    this._annotations = props._annotations;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A dotted property access expression",
  $propdoc: {
    quote: "[string] the original quote character when transformed from AST_Sub"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.expression);
  }
}, AST_PropAccess);
var AST_DotHash = DEFNODE("DotHash", "", function AST_DotHash2(props) {
  if (props) {
    this.expression = props.expression;
    this.property = props.property;
    this.optional = props.optional;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A dotted property access to a private property",
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.expression);
  }
}, AST_PropAccess);
var AST_Sub = DEFNODE("Sub", null, function AST_Sub2(props) {
  if (props) {
    this.expression = props.expression;
    this.property = props.property;
    this.optional = props.optional;
    this._annotations = props._annotations;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: 'Index-style property access, i.e. `a["foo"]`',
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
      this.property._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.property);
    push(this.expression);
  }
}, AST_PropAccess);
var AST_Chain = DEFNODE("Chain", "expression", function AST_Chain2(props) {
  if (props) {
    this.expression = props.expression;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A chain expression like a?.b?.(c)?.[d]",
  $propdoc: {
    expression: "[AST_Call|AST_Dot|AST_DotHash|AST_Sub] chain element."
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.expression);
  }
});
var AST_Unary = DEFNODE("Unary", "operator expression", function AST_Unary2(props) {
  if (props) {
    this.operator = props.operator;
    this.expression = props.expression;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for unary expressions",
  $propdoc: {
    operator: "[string] the operator",
    expression: "[AST_Node] expression that this unary operator applies to"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.expression._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.expression);
  }
});
var AST_UnaryPrefix = DEFNODE("UnaryPrefix", null, function AST_UnaryPrefix2(props) {
  if (props) {
    this.operator = props.operator;
    this.expression = props.expression;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Unary prefix expression, i.e. `typeof i` or `++i`"
}, AST_Unary);
var AST_UnaryPostfix = DEFNODE("UnaryPostfix", null, function AST_UnaryPostfix2(props) {
  if (props) {
    this.operator = props.operator;
    this.expression = props.expression;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Unary postfix expression, i.e. `i++`"
}, AST_Unary);
var AST_Binary = DEFNODE("Binary", "operator left right", function AST_Binary2(props) {
  if (props) {
    this.operator = props.operator;
    this.left = props.left;
    this.right = props.right;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Binary expression, i.e. `a + b`",
  $propdoc: {
    left: "[AST_Node] left-hand side expression",
    operator: "[string] the operator",
    right: "[AST_Node] right-hand side expression"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.left._walk(visitor);
      this.right._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.right);
    push(this.left);
  }
});
var AST_Conditional = DEFNODE("Conditional", "condition consequent alternative", function AST_Conditional2(props) {
  if (props) {
    this.condition = props.condition;
    this.consequent = props.consequent;
    this.alternative = props.alternative;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Conditional expression using the ternary operator, i.e. `a ? b : c`",
  $propdoc: {
    condition: "[AST_Node]",
    consequent: "[AST_Node]",
    alternative: "[AST_Node]"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.condition._walk(visitor);
      this.consequent._walk(visitor);
      this.alternative._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.alternative);
    push(this.consequent);
    push(this.condition);
  }
});
var AST_Assign = DEFNODE("Assign", "logical", function AST_Assign2(props) {
  if (props) {
    this.logical = props.logical;
    this.operator = props.operator;
    this.left = props.left;
    this.right = props.right;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An assignment expression — `a = b + 5`",
  $propdoc: {
    logical: "Whether it's a logical assignment"
  }
}, AST_Binary);
var AST_DefaultAssign = DEFNODE("DefaultAssign", null, function AST_DefaultAssign2(props) {
  if (props) {
    this.operator = props.operator;
    this.left = props.left;
    this.right = props.right;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A default assignment expression like in `(a = 3) => a`"
}, AST_Binary);
var AST_Array = DEFNODE("Array", "elements", function AST_Array2(props) {
  if (props) {
    this.elements = props.elements;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An array literal",
  $propdoc: {
    elements: "[AST_Node*] array of elements"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      var elements = this.elements;
      for (var i = 0, len = elements.length;i < len; i++) {
        elements[i]._walk(visitor);
      }
    });
  },
  _children_backwards(push) {
    let i = this.elements.length;
    while (i--)
      push(this.elements[i]);
  }
});
var AST_Object = DEFNODE("Object", "properties", function AST_Object2(props) {
  if (props) {
    this.properties = props.properties;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An object literal",
  $propdoc: {
    properties: "[AST_ObjectProperty*] array of properties"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      var properties = this.properties;
      for (var i = 0, len = properties.length;i < len; i++) {
        properties[i]._walk(visitor);
      }
    });
  },
  _children_backwards(push) {
    let i = this.properties.length;
    while (i--)
      push(this.properties[i]);
  }
});
var AST_ObjectProperty = DEFNODE("ObjectProperty", "key value", function AST_ObjectProperty2(props) {
  if (props) {
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
    this._annotations = props._annotations;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for literal object properties",
  $propdoc: {
    key: "[string|AST_Node] property name. For ObjectKeyVal this is a string. For getters, setters and computed property this is an AST_Node.",
    value: "[AST_Node] property value.  For getters, setters and methods this is an AST_Accessor."
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.key instanceof AST_Node)
        this.key._walk(visitor);
      this.value._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.value);
    if (this.key instanceof AST_Node)
      push(this.key);
  }
});
var AST_ObjectKeyVal = DEFNODE("ObjectKeyVal", "quote", function AST_ObjectKeyVal2(props) {
  if (props) {
    this.quote = props.quote;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
    this._annotations = props._annotations;
  }
  this.flags = 0;
}, {
  $documentation: "A key: value object property",
  $propdoc: {
    quote: "[string] the original quote character"
  },
  computed_key() {
    return this.key instanceof AST_Node;
  }
}, AST_ObjectProperty);
var AST_PrivateSetter = DEFNODE("PrivateSetter", "static", function AST_PrivateSetter2(props) {
  if (props) {
    this.static = props.static;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $propdoc: {
    static: "[boolean] whether this is a static private setter"
  },
  $documentation: "A private setter property",
  computed_key() {
    return false;
  }
}, AST_ObjectProperty);
var AST_PrivateGetter = DEFNODE("PrivateGetter", "static", function AST_PrivateGetter2(props) {
  if (props) {
    this.static = props.static;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $propdoc: {
    static: "[boolean] whether this is a static private getter"
  },
  $documentation: "A private getter property",
  computed_key() {
    return false;
  }
}, AST_ObjectProperty);
var AST_ObjectSetter = DEFNODE("ObjectSetter", "quote static", function AST_ObjectSetter2(props) {
  if (props) {
    this.quote = props.quote;
    this.static = props.static;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
    this._annotations = props._annotations;
  }
  this.flags = 0;
}, {
  $propdoc: {
    quote: "[string|undefined] the original quote character, if any",
    static: "[boolean] whether this is a static setter (classes only)"
  },
  $documentation: "An object setter property",
  computed_key() {
    return !(this.key instanceof AST_SymbolMethod);
  }
}, AST_ObjectProperty);
var AST_ObjectGetter = DEFNODE("ObjectGetter", "quote static", function AST_ObjectGetter2(props) {
  if (props) {
    this.quote = props.quote;
    this.static = props.static;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
    this._annotations = props._annotations;
  }
  this.flags = 0;
}, {
  $propdoc: {
    quote: "[string|undefined] the original quote character, if any",
    static: "[boolean] whether this is a static getter (classes only)"
  },
  $documentation: "An object getter property",
  computed_key() {
    return !(this.key instanceof AST_SymbolMethod);
  }
}, AST_ObjectProperty);
var AST_ConciseMethod = DEFNODE("ConciseMethod", "quote static", function AST_ConciseMethod2(props) {
  if (props) {
    this.quote = props.quote;
    this.static = props.static;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
    this._annotations = props._annotations;
  }
  this.flags = 0;
}, {
  $propdoc: {
    quote: "[string|undefined] the original quote character, if any",
    static: "[boolean] is this method static (classes only)"
  },
  $documentation: "An ES6 concise method inside an object or class",
  computed_key() {
    return !(this.key instanceof AST_SymbolMethod);
  }
}, AST_ObjectProperty);
var AST_PrivateMethod = DEFNODE("PrivateMethod", "static", function AST_PrivateMethod2(props) {
  if (props) {
    this.static = props.static;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A private class method inside a class",
  $propdoc: {
    static: "[boolean] is this a static private method"
  },
  computed_key() {
    return false;
  }
}, AST_ObjectProperty);
var AST_Class = DEFNODE("Class", "name extends properties", function AST_Class2(props) {
  if (props) {
    this.name = props.name;
    this.extends = props.extends;
    this.properties = props.properties;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $propdoc: {
    name: "[AST_SymbolClass|AST_SymbolDefClass?] optional class name.",
    extends: "[AST_Node]? optional parent class",
    properties: "[AST_ObjectProperty|AST_ClassStaticBlock]* array of properties or static blocks"
  },
  $documentation: "An ES6 class",
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.name) {
        this.name._walk(visitor);
      }
      if (this.extends) {
        this.extends._walk(visitor);
      }
      this.properties.forEach((prop) => prop._walk(visitor));
    });
  },
  _children_backwards(push) {
    let i = this.properties.length;
    while (i--)
      push(this.properties[i]);
    if (this.extends)
      push(this.extends);
    if (this.name)
      push(this.name);
  },
  visit_nondeferred_class_parts(visitor) {
    if (this.extends) {
      this.extends._walk(visitor);
    }
    this.properties.forEach((prop) => {
      if (prop instanceof AST_ClassStaticBlock) {
        prop._walk(visitor);
        return;
      }
      if (prop.computed_key()) {
        visitor.push(prop);
        prop.key._walk(visitor);
        visitor.pop();
      }
      if (prop instanceof AST_ClassPrivateProperty && prop.static && prop.value || prop instanceof AST_ClassProperty && prop.static && prop.value) {
        visitor.push(prop);
        prop.value._walk(visitor);
        visitor.pop();
      }
    });
  },
  visit_deferred_class_parts(visitor) {
    this.properties.forEach((prop) => {
      if (prop instanceof AST_ConciseMethod || prop instanceof AST_PrivateMethod) {
        prop.walk(visitor);
      } else if (prop instanceof AST_ClassProperty && !prop.static && prop.value || prop instanceof AST_ClassPrivateProperty && !prop.static && prop.value) {
        visitor.push(prop);
        prop.value._walk(visitor);
        visitor.pop();
      }
    });
  },
  is_self_referential: function() {
    const this_id = this.name && this.name.definition().id;
    let found = false;
    let class_this = true;
    this.visit_nondeferred_class_parts(new TreeWalker((node, descend) => {
      if (found)
        return true;
      if (node instanceof AST_This)
        return found = class_this;
      if (node instanceof AST_SymbolRef)
        return found = node.definition().id === this_id;
      if (node instanceof AST_Lambda && !(node instanceof AST_Arrow)) {
        const class_this_save = class_this;
        class_this = false;
        descend();
        class_this = class_this_save;
        return true;
      }
    }));
    return found;
  }
}, AST_Scope);
var AST_ClassProperty = DEFNODE("ClassProperty", "static quote", function AST_ClassProperty2(props) {
  if (props) {
    this.static = props.static;
    this.quote = props.quote;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
    this._annotations = props._annotations;
  }
  this.flags = 0;
}, {
  $documentation: "A class property",
  $propdoc: {
    static: "[boolean] whether this is a static key",
    quote: "[string] which quote is being used"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.key instanceof AST_Node)
        this.key._walk(visitor);
      if (this.value instanceof AST_Node)
        this.value._walk(visitor);
    });
  },
  _children_backwards(push) {
    if (this.value instanceof AST_Node)
      push(this.value);
    if (this.key instanceof AST_Node)
      push(this.key);
  },
  computed_key() {
    return !(this.key instanceof AST_SymbolClassProperty);
  }
}, AST_ObjectProperty);
var AST_ClassPrivateProperty = DEFNODE("ClassPrivateProperty", "", function AST_ClassPrivateProperty2(props) {
  if (props) {
    this.static = props.static;
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A class property for a private property",
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      if (this.value instanceof AST_Node)
        this.value._walk(visitor);
    });
  },
  _children_backwards(push) {
    if (this.value instanceof AST_Node)
      push(this.value);
  },
  computed_key() {
    return false;
  }
}, AST_ObjectProperty);
var AST_PrivateIn = DEFNODE("PrivateIn", "key value", function AST_PrivateIn2(props) {
  if (props) {
    this.key = props.key;
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "An `in` binop when the key is private, eg #x in this",
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      this.key._walk(visitor);
      this.value._walk(visitor);
    });
  },
  _children_backwards(push) {
    push(this.value);
    push(this.key);
  }
});
var AST_DefClass = DEFNODE("DefClass", null, function AST_DefClass2(props) {
  if (props) {
    this.name = props.name;
    this.extends = props.extends;
    this.properties = props.properties;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A class definition"
}, AST_Class);
var AST_ClassStaticBlock = DEFNODE("ClassStaticBlock", "body block_scope", function AST_ClassStaticBlock2(props) {
  this.body = props.body;
  this.block_scope = props.block_scope;
  this.start = props.start;
  this.end = props.end;
}, {
  $documentation: "A block containing statements to be executed in the context of the class",
  $propdoc: {
    body: "[AST_Statement*] an array of statements"
  },
  _walk: function(visitor) {
    return visitor._visit(this, function() {
      walk_body(this, visitor);
    });
  },
  _children_backwards(push) {
    let i = this.body.length;
    while (i--)
      push(this.body[i]);
  },
  clone: clone_block_scope,
  computed_key() {
    return false;
  }
}, AST_Scope);
var AST_ClassExpression = DEFNODE("ClassExpression", null, function AST_ClassExpression2(props) {
  if (props) {
    this.name = props.name;
    this.extends = props.extends;
    this.properties = props.properties;
    this.variables = props.variables;
    this.uses_with = props.uses_with;
    this.uses_eval = props.uses_eval;
    this.parent_scope = props.parent_scope;
    this.enclosed = props.enclosed;
    this.cname = props.cname;
    this.body = props.body;
    this.block_scope = props.block_scope;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A class expression."
}, AST_Class);
var AST_Symbol = DEFNODE("Symbol", "scope name thedef", function AST_Symbol2(props) {
  if (props) {
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $propdoc: {
    name: "[string] name of this symbol",
    scope: "[AST_Scope/S] the current scope (not necessarily the definition scope)",
    thedef: "[SymbolDef/S] the definition of this symbol"
  },
  $documentation: "Base class for all symbols"
});
var AST_NewTarget = DEFNODE("NewTarget", null, function AST_NewTarget2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A reference to new.target"
});
var AST_SymbolDeclaration = DEFNODE("SymbolDeclaration", "init", function AST_SymbolDeclaration2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A declaration symbol (symbol in var/const, function name or argument, symbol in catch)"
}, AST_Symbol);
var AST_SymbolVar = DEFNODE("SymbolVar", null, function AST_SymbolVar2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol defining a variable"
}, AST_SymbolDeclaration);
var AST_SymbolBlockDeclaration = DEFNODE("SymbolBlockDeclaration", null, function AST_SymbolBlockDeclaration2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for block-scoped declaration symbols"
}, AST_SymbolDeclaration);
var AST_SymbolConst = DEFNODE("SymbolConst", null, function AST_SymbolConst2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A constant declaration"
}, AST_SymbolBlockDeclaration);
var AST_SymbolLet = DEFNODE("SymbolLet", null, function AST_SymbolLet2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A block-scoped `let` declaration"
}, AST_SymbolBlockDeclaration);
var AST_SymbolFunarg = DEFNODE("SymbolFunarg", null, function AST_SymbolFunarg2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol naming a function argument"
}, AST_SymbolVar);
var AST_SymbolDefun = DEFNODE("SymbolDefun", null, function AST_SymbolDefun2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol defining a function"
}, AST_SymbolDeclaration);
var AST_SymbolMethod = DEFNODE("SymbolMethod", null, function AST_SymbolMethod2(props) {
  if (props) {
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol in an object defining a method"
}, AST_Symbol);
var AST_SymbolClassProperty = DEFNODE("SymbolClassProperty", null, function AST_SymbolClassProperty2(props) {
  if (props) {
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol for a class property"
}, AST_Symbol);
var AST_SymbolLambda = DEFNODE("SymbolLambda", null, function AST_SymbolLambda2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol naming a function expression"
}, AST_SymbolDeclaration);
var AST_SymbolDefClass = DEFNODE("SymbolDefClass", null, function AST_SymbolDefClass2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol naming a class's name in a class declaration. Lexically scoped to its containing scope, and accessible within the class."
}, AST_SymbolBlockDeclaration);
var AST_SymbolClass = DEFNODE("SymbolClass", null, function AST_SymbolClass2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol naming a class's name. Lexically scoped to the class."
}, AST_SymbolDeclaration);
var AST_SymbolCatch = DEFNODE("SymbolCatch", null, function AST_SymbolCatch2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol naming the exception in catch"
}, AST_SymbolBlockDeclaration);
var AST_SymbolImport = DEFNODE("SymbolImport", null, function AST_SymbolImport2(props) {
  if (props) {
    this.init = props.init;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol referring to an imported name"
}, AST_SymbolBlockDeclaration);
var AST_SymbolImportForeign = DEFNODE("SymbolImportForeign", "quote", function AST_SymbolImportForeign2(props) {
  if (props) {
    this.quote = props.quote;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A symbol imported from a module, but it is defined in the other module, and its real name is irrelevant for this module's purposes"
}, AST_Symbol);
var AST_Label = DEFNODE("Label", "references", function AST_Label2(props) {
  if (props) {
    this.references = props.references;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
    this.initialize();
  }
  this.flags = 0;
}, {
  $documentation: "Symbol naming a label (declaration)",
  $propdoc: {
    references: "[AST_LoopControl*] a list of nodes referring to this label"
  },
  initialize: function() {
    this.references = [];
    this.thedef = this;
  }
}, AST_Symbol);
var AST_SymbolRef = DEFNODE("SymbolRef", null, function AST_SymbolRef2(props) {
  if (props) {
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Reference to some symbol (not definition/declaration)"
}, AST_Symbol);
var AST_SymbolExport = DEFNODE("SymbolExport", "quote", function AST_SymbolExport2(props) {
  if (props) {
    this.quote = props.quote;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Symbol referring to a name to export"
}, AST_SymbolRef);
var AST_SymbolExportForeign = DEFNODE("SymbolExportForeign", "quote", function AST_SymbolExportForeign2(props) {
  if (props) {
    this.quote = props.quote;
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A symbol exported from this module, but it is used in the other module, and its real name is irrelevant for this module's purposes"
}, AST_Symbol);
var AST_LabelRef = DEFNODE("LabelRef", null, function AST_LabelRef2(props) {
  if (props) {
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Reference to a label symbol"
}, AST_Symbol);
var AST_SymbolPrivateProperty = DEFNODE("SymbolPrivateProperty", null, function AST_SymbolPrivateProperty2(props) {
  if (props) {
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A symbol that refers to a private property"
}, AST_Symbol);
var AST_This = DEFNODE("This", null, function AST_This2(props) {
  if (props) {
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The `this` symbol"
}, AST_Symbol);
var AST_Super = DEFNODE("Super", null, function AST_Super2(props) {
  if (props) {
    this.scope = props.scope;
    this.name = props.name;
    this.thedef = props.thedef;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The `super` symbol"
}, AST_This);
var AST_Constant = DEFNODE("Constant", null, function AST_Constant2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for all constants",
  getValue: function() {
    return this.value;
  }
});
var AST_String = DEFNODE("String", "value quote", function AST_String2(props) {
  if (props) {
    this.value = props.value;
    this.quote = props.quote;
    this.start = props.start;
    this.end = props.end;
    this._annotations = props._annotations;
  }
  this.flags = 0;
}, {
  $documentation: "A string literal",
  $propdoc: {
    value: "[string] the contents of this string",
    quote: "[string] the original quote character"
  }
}, AST_Constant);
var AST_Number = DEFNODE("Number", "value raw", function AST_Number2(props) {
  if (props) {
    this.value = props.value;
    this.raw = props.raw;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A number literal",
  $propdoc: {
    value: "[number] the numeric value",
    raw: "[string] numeric value as string"
  }
}, AST_Constant);
var AST_BigInt = DEFNODE("BigInt", "value raw", function AST_BigInt2(props) {
  if (props) {
    this.value = props.value;
    this.raw = props.raw;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A big int literal",
  $propdoc: {
    value: "[string] big int value, represented as a string",
    raw: "[string] the original format preserved"
  }
}, AST_Constant);
var AST_RegExp = DEFNODE("RegExp", "value", function AST_RegExp2(props) {
  if (props) {
    this.value = props.value;
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A regexp literal",
  $propdoc: {
    value: "[RegExp] the actual regexp"
  }
}, AST_Constant);
var AST_Atom = DEFNODE("Atom", null, function AST_Atom2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for atoms"
}, AST_Constant);
var AST_Null = DEFNODE("Null", null, function AST_Null2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The `null` atom",
  value: null
}, AST_Atom);
var AST_NaN = DEFNODE("NaN", null, function AST_NaN2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The impossible value",
  value: 0 / 0
}, AST_Atom);
var AST_Undefined = DEFNODE("Undefined", null, function AST_Undefined2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The `undefined` value",
  value: function() {}()
}, AST_Atom);
var AST_Hole = DEFNODE("Hole", null, function AST_Hole2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "A hole in an array",
  value: function() {}()
}, AST_Atom);
var AST_Infinity = DEFNODE("Infinity", null, function AST_Infinity2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The `Infinity` value",
  value: 1 / 0
}, AST_Atom);
var AST_Boolean = DEFNODE("Boolean", null, function AST_Boolean2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "Base class for booleans"
}, AST_Atom);
var AST_False = DEFNODE("False", null, function AST_False2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The `false` atom",
  value: false
}, AST_Boolean);
var AST_True = DEFNODE("True", null, function AST_True2(props) {
  if (props) {
    this.start = props.start;
    this.end = props.end;
  }
  this.flags = 0;
}, {
  $documentation: "The `true` atom",
  value: true
}, AST_Boolean);
function walk(node, cb, to_visit = [node]) {
  const push = to_visit.push.bind(to_visit);
  while (to_visit.length) {
    const node2 = to_visit.pop();
    const ret = cb(node2, to_visit);
    if (ret) {
      if (ret === walk_abort)
        return true;
      continue;
    }
    node2._children_backwards(push);
  }
  return false;
}
function walk_parent(node, cb, initial_stack) {
  const to_visit = [node];
  const push = to_visit.push.bind(to_visit);
  const stack = initial_stack ? initial_stack.slice() : [];
  const parent_pop_indices = [];
  let current;
  const info = {
    parent: (n = 0) => {
      if (n === -1) {
        return current;
      }
      if (initial_stack && n >= stack.length) {
        n -= stack.length;
        return initial_stack[initial_stack.length - (n + 1)];
      }
      return stack[stack.length - (1 + n)];
    }
  };
  while (to_visit.length) {
    current = to_visit.pop();
    while (parent_pop_indices.length && to_visit.length == parent_pop_indices[parent_pop_indices.length - 1]) {
      stack.pop();
      parent_pop_indices.pop();
    }
    const ret = cb(current, info);
    if (ret) {
      if (ret === walk_abort)
        return true;
      continue;
    }
    const visit_length = to_visit.length;
    current._children_backwards(push);
    if (to_visit.length > visit_length) {
      stack.push(current);
      parent_pop_indices.push(visit_length - 1);
    }
  }
  return false;
}
var walk_abort = Symbol("abort walk");

class TreeWalker {
  constructor(callback) {
    this.visit = callback;
    this.stack = [];
    this.directives = Object.create(null);
  }
  _visit(node, descend) {
    this.push(node);
    var ret = this.visit(node, descend ? function() {
      descend.call(node);
    } : noop);
    if (!ret && descend) {
      descend.call(node);
    }
    this.pop();
    return ret;
  }
  parent(n) {
    return this.stack[this.stack.length - 2 - (n || 0)];
  }
  push(node) {
    if (node instanceof AST_Lambda) {
      this.directives = Object.create(this.directives);
    } else if (node instanceof AST_Directive && !this.directives[node.value]) {
      this.directives[node.value] = node;
    } else if (node instanceof AST_Class) {
      this.directives = Object.create(this.directives);
      if (!this.directives["use strict"]) {
        this.directives["use strict"] = node;
      }
    }
    this.stack.push(node);
  }
  pop() {
    var node = this.stack.pop();
    if (node instanceof AST_Lambda || node instanceof AST_Class) {
      this.directives = Object.getPrototypeOf(this.directives);
    }
  }
  self() {
    return this.stack[this.stack.length - 1];
  }
  find_parent(type) {
    var stack = this.stack;
    for (var i = stack.length;--i >= 0; ) {
      var x = stack[i];
      if (x instanceof type)
        return x;
    }
  }
  is_within_loop() {
    let i = this.stack.length - 1;
    let child = this.stack[i];
    while (i--) {
      const node = this.stack[i];
      if (node instanceof AST_Lambda)
        return false;
      if (node instanceof AST_IterationStatement && !(node instanceof AST_For && child === node.init) && !((node instanceof AST_ForIn || node instanceof AST_ForOf) && child === node.object)) {
        return true;
      }
      child = node;
    }
    return false;
  }
  find_scope() {
    var stack = this.stack;
    for (var i = stack.length;--i >= 0; ) {
      const p = stack[i];
      if (p instanceof AST_Toplevel)
        return p;
      if (p instanceof AST_Lambda)
        return p;
      if (p.block_scope)
        return p.block_scope;
    }
  }
  has_directive(type) {
    var dir = this.directives[type];
    if (dir)
      return dir;
    var node = this.stack[this.stack.length - 1];
    if (node instanceof AST_Scope && node.body) {
      for (var i = 0;i < node.body.length; ++i) {
        var st = node.body[i];
        if (!(st instanceof AST_Directive))
          break;
        if (st.value == type)
          return st;
      }
    }
  }
  loopcontrol_target(node) {
    var stack = this.stack;
    if (node.label)
      for (var i = stack.length;--i >= 0; ) {
        var x = stack[i];
        if (x instanceof AST_LabeledStatement && x.label.name == node.label.name)
          return x.body;
      }
    else
      for (var i = stack.length;--i >= 0; ) {
        var x = stack[i];
        if (x instanceof AST_IterationStatement || node instanceof AST_Break && x instanceof AST_Switch)
          return x;
      }
  }
}

class TreeTransformer extends TreeWalker {
  constructor(before, after) {
    super();
    this.before = before;
    this.after = after;
  }
}
var _PURE = 1;
var _INLINE = 2;
var _NOINLINE = 4;
var _KEY = 8;
var _MANGLEPROP = 16;

// node_modules/terser/lib/transform.js
function def_transform(node, descend) {
  node.DEFMETHOD("transform", function(tw, in_list) {
    let transformed = undefined;
    tw.push(this);
    if (tw.before)
      transformed = tw.before(this, descend, in_list);
    if (transformed === undefined) {
      transformed = this;
      descend(transformed, tw);
      if (tw.after) {
        const after_ret = tw.after(transformed, in_list);
        if (after_ret !== undefined)
          transformed = after_ret;
      }
    }
    tw.pop();
    return transformed;
  });
}
def_transform(AST_Node, noop);
def_transform(AST_LabeledStatement, function(self2, tw) {
  self2.label = self2.label.transform(tw);
  self2.body = self2.body.transform(tw);
});
def_transform(AST_SimpleStatement, function(self2, tw) {
  self2.body = self2.body.transform(tw);
});
def_transform(AST_Block, function(self2, tw) {
  self2.body = MAP(self2.body, tw);
});
def_transform(AST_Do, function(self2, tw) {
  self2.body = self2.body.transform(tw);
  self2.condition = self2.condition.transform(tw);
});
def_transform(AST_While, function(self2, tw) {
  self2.condition = self2.condition.transform(tw);
  self2.body = self2.body.transform(tw);
});
def_transform(AST_For, function(self2, tw) {
  if (self2.init)
    self2.init = self2.init.transform(tw);
  if (self2.condition)
    self2.condition = self2.condition.transform(tw);
  if (self2.step)
    self2.step = self2.step.transform(tw);
  self2.body = self2.body.transform(tw);
});
def_transform(AST_ForIn, function(self2, tw) {
  self2.init = self2.init.transform(tw);
  self2.object = self2.object.transform(tw);
  self2.body = self2.body.transform(tw);
});
def_transform(AST_With, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
  self2.body = self2.body.transform(tw);
});
def_transform(AST_Exit, function(self2, tw) {
  if (self2.value)
    self2.value = self2.value.transform(tw);
});
def_transform(AST_LoopControl, function(self2, tw) {
  if (self2.label)
    self2.label = self2.label.transform(tw);
});
def_transform(AST_If, function(self2, tw) {
  self2.condition = self2.condition.transform(tw);
  self2.body = self2.body.transform(tw);
  if (self2.alternative)
    self2.alternative = self2.alternative.transform(tw);
});
def_transform(AST_Switch, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
  self2.body = MAP(self2.body, tw);
});
def_transform(AST_Case, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
  self2.body = MAP(self2.body, tw);
});
def_transform(AST_Try, function(self2, tw) {
  self2.body = self2.body.transform(tw);
  if (self2.bcatch)
    self2.bcatch = self2.bcatch.transform(tw);
  if (self2.bfinally)
    self2.bfinally = self2.bfinally.transform(tw);
});
def_transform(AST_Catch, function(self2, tw) {
  if (self2.argname)
    self2.argname = self2.argname.transform(tw);
  self2.body = MAP(self2.body, tw);
});
def_transform(AST_Definitions, function(self2, tw) {
  self2.definitions = MAP(self2.definitions, tw);
});
def_transform(AST_VarDef, function(self2, tw) {
  self2.name = self2.name.transform(tw);
  if (self2.value)
    self2.value = self2.value.transform(tw);
});
def_transform(AST_Destructuring, function(self2, tw) {
  self2.names = MAP(self2.names, tw);
});
def_transform(AST_Lambda, function(self2, tw) {
  if (self2.name)
    self2.name = self2.name.transform(tw);
  self2.argnames = MAP(self2.argnames, tw, false);
  if (self2.body instanceof AST_Node) {
    self2.body = self2.body.transform(tw);
  } else {
    self2.body = MAP(self2.body, tw);
  }
});
def_transform(AST_Call, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
  self2.args = MAP(self2.args, tw, false);
});
def_transform(AST_Sequence, function(self2, tw) {
  const result = MAP(self2.expressions, tw);
  self2.expressions = result.length ? result : [new AST_Number({ value: 0 })];
});
def_transform(AST_PropAccess, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
});
def_transform(AST_Sub, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
  self2.property = self2.property.transform(tw);
});
def_transform(AST_Chain, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
});
def_transform(AST_Yield, function(self2, tw) {
  if (self2.expression)
    self2.expression = self2.expression.transform(tw);
});
def_transform(AST_Await, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
});
def_transform(AST_Unary, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
});
def_transform(AST_Binary, function(self2, tw) {
  self2.left = self2.left.transform(tw);
  self2.right = self2.right.transform(tw);
});
def_transform(AST_PrivateIn, function(self2, tw) {
  self2.key = self2.key.transform(tw);
  self2.value = self2.value.transform(tw);
});
def_transform(AST_Conditional, function(self2, tw) {
  self2.condition = self2.condition.transform(tw);
  self2.consequent = self2.consequent.transform(tw);
  self2.alternative = self2.alternative.transform(tw);
});
def_transform(AST_Array, function(self2, tw) {
  self2.elements = MAP(self2.elements, tw);
});
def_transform(AST_Object, function(self2, tw) {
  self2.properties = MAP(self2.properties, tw);
});
def_transform(AST_ObjectProperty, function(self2, tw) {
  if (self2.key instanceof AST_Node) {
    self2.key = self2.key.transform(tw);
  }
  if (self2.value)
    self2.value = self2.value.transform(tw);
});
def_transform(AST_Class, function(self2, tw) {
  if (self2.name)
    self2.name = self2.name.transform(tw);
  if (self2.extends)
    self2.extends = self2.extends.transform(tw);
  self2.properties = MAP(self2.properties, tw);
});
def_transform(AST_ClassStaticBlock, function(self2, tw) {
  self2.body = MAP(self2.body, tw);
});
def_transform(AST_Expansion, function(self2, tw) {
  self2.expression = self2.expression.transform(tw);
});
def_transform(AST_NameMapping, function(self2, tw) {
  self2.foreign_name = self2.foreign_name.transform(tw);
  self2.name = self2.name.transform(tw);
});
def_transform(AST_Import, function(self2, tw) {
  if (self2.imported_name)
    self2.imported_name = self2.imported_name.transform(tw);
  if (self2.imported_names)
    MAP(self2.imported_names, tw);
  self2.module_name = self2.module_name.transform(tw);
});
def_transform(AST_Export, function(self2, tw) {
  if (self2.exported_definition)
    self2.exported_definition = self2.exported_definition.transform(tw);
  if (self2.exported_value)
    self2.exported_value = self2.exported_value.transform(tw);
  if (self2.exported_names)
    MAP(self2.exported_names, tw);
  if (self2.module_name)
    self2.module_name = self2.module_name.transform(tw);
});
def_transform(AST_TemplateString, function(self2, tw) {
  self2.segments = MAP(self2.segments, tw);
});
def_transform(AST_PrefixedTemplateString, function(self2, tw) {
  self2.prefix = self2.prefix.transform(tw);
  self2.template_string = self2.template_string.transform(tw);
});

// node_modules/terser/lib/mozilla-ast.js
(function() {
  var normalize_directives = function(body) {
    for (var i = 0;i < body.length; i++) {
      if (body[i] instanceof AST_Statement && body[i].body instanceof AST_String) {
        body[i] = new AST_Directive({
          start: body[i].start,
          end: body[i].end,
          quote: '"',
          value: body[i].body.value
        });
      } else {
        return body;
      }
    }
    return body;
  };
  function import_attributes_from_moz(attributes) {
    if (attributes && attributes.length > 0) {
      return new AST_Object({
        start: my_start_token(attributes),
        end: my_end_token(attributes),
        properties: attributes.map((attr) => new AST_ObjectKeyVal({
          start: my_start_token(attr),
          end: my_end_token(attr),
          key: attr.key.name || attr.key.value,
          value: from_moz(attr.value)
        }))
      });
    }
    return null;
  }
  var MOZ_TO_ME = {
    Program: function(M) {
      return new AST_Toplevel({
        start: my_start_token(M),
        end: my_end_token(M),
        body: normalize_directives(M.body.map(from_moz))
      });
    },
    ArrayPattern: function(M) {
      return new AST_Destructuring({
        start: my_start_token(M),
        end: my_end_token(M),
        names: M.elements.map(function(elm) {
          if (elm === null) {
            return new AST_Hole;
          }
          return from_moz(elm);
        }),
        is_array: true
      });
    },
    ObjectPattern: function(M) {
      return new AST_Destructuring({
        start: my_start_token(M),
        end: my_end_token(M),
        names: M.properties.map(from_moz),
        is_array: false
      });
    },
    AssignmentPattern: function(M) {
      return new AST_DefaultAssign({
        start: my_start_token(M),
        end: my_end_token(M),
        left: from_moz(M.left),
        operator: "=",
        right: from_moz(M.right)
      });
    },
    SpreadElement: function(M) {
      return new AST_Expansion({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.argument)
      });
    },
    RestElement: function(M) {
      return new AST_Expansion({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.argument)
      });
    },
    TemplateElement: function(M) {
      return new AST_TemplateSegment({
        start: my_start_token(M),
        end: my_end_token(M),
        value: M.value.cooked,
        raw: M.value.raw
      });
    },
    TemplateLiteral: function(M) {
      var segments = [];
      for (var i = 0;i < M.quasis.length; i++) {
        segments.push(from_moz(M.quasis[i]));
        if (M.expressions[i]) {
          segments.push(from_moz(M.expressions[i]));
        }
      }
      return new AST_TemplateString({
        start: my_start_token(M),
        end: my_end_token(M),
        segments
      });
    },
    TaggedTemplateExpression: function(M) {
      return new AST_PrefixedTemplateString({
        start: my_start_token(M),
        end: my_end_token(M),
        template_string: from_moz(M.quasi),
        prefix: from_moz(M.tag)
      });
    },
    FunctionDeclaration: function(M) {
      return new AST_Defun({
        start: my_start_token(M),
        end: my_end_token(M),
        name: M.id && from_moz_symbol(AST_SymbolDefun, M.id),
        argnames: M.params.map((M2) => from_moz_pattern(M2, AST_SymbolFunarg)),
        is_generator: M.generator,
        async: M.async,
        body: normalize_directives(from_moz(M.body).body)
      });
    },
    FunctionExpression: function(M) {
      return from_moz_lambda(M, false);
    },
    ArrowFunctionExpression: function(M) {
      const body = M.body.type === "BlockStatement" ? from_moz(M.body).body : [make_node(AST_Return, {}, { value: from_moz(M.body) })];
      return new AST_Arrow({
        start: my_start_token(M),
        end: my_end_token(M),
        argnames: M.params.map((p) => from_moz_pattern(p, AST_SymbolFunarg)),
        body,
        async: M.async
      });
    },
    ExpressionStatement: function(M) {
      return new AST_SimpleStatement({
        start: my_start_token(M),
        end: my_end_token(M),
        body: from_moz(M.expression)
      });
    },
    TryStatement: function(M) {
      var handlers = M.handlers || [M.handler];
      if (handlers.length > 1 || M.guardedHandlers && M.guardedHandlers.length) {
        throw new Error("Multiple catch clauses are not supported.");
      }
      return new AST_Try({
        start: my_start_token(M),
        end: my_end_token(M),
        body: new AST_TryBlock(from_moz(M.block)),
        bcatch: from_moz(handlers[0]),
        bfinally: M.finalizer ? new AST_Finally(from_moz(M.finalizer)) : null
      });
    },
    Property: function(M) {
      if (M.kind == "init" && !M.method) {
        var args = {
          start: my_start_token(M.key || M.value),
          end: my_end_token(M.value),
          key: M.computed ? from_moz(M.key) : M.key.name || String(M.key.value),
          quote: from_moz_quote(M.key, M.computed),
          static: false,
          value: from_moz(M.value)
        };
        return new AST_ObjectKeyVal(args);
      } else {
        var value = from_moz_lambda(M.value, true);
        var args = {
          start: my_start_token(M.key || M.value),
          end: my_end_token(M.value),
          key: M.computed ? from_moz(M.key) : from_moz_symbol(AST_SymbolMethod, M.key),
          quote: from_moz_quote(M.key, M.computed),
          static: false,
          value
        };
        if (M.kind == "get")
          return new AST_ObjectGetter(args);
        if (M.kind == "set")
          return new AST_ObjectSetter(args);
        if (M.method)
          return new AST_ConciseMethod(args);
      }
    },
    MethodDefinition: function(M) {
      const is_private = M.key.type === "PrivateIdentifier";
      const key = M.computed ? from_moz(M.key) : new AST_SymbolMethod({ name: M.key.name || String(M.key.value) });
      var args = {
        start: my_start_token(M),
        end: my_end_token(M),
        key,
        quote: from_moz_quote(M.key, M.computed),
        value: from_moz_lambda(M.value, true),
        static: M.static
      };
      if (M.kind == "get") {
        return new (is_private ? AST_PrivateGetter : AST_ObjectGetter)(args);
      }
      if (M.kind == "set") {
        return new (is_private ? AST_PrivateSetter : AST_ObjectSetter)(args);
      }
      return new (is_private ? AST_PrivateMethod : AST_ConciseMethod)(args);
    },
    FieldDefinition: function(M) {
      let key;
      if (M.computed) {
        key = from_moz(M.key);
      } else {
        if (M.key.type !== "Identifier")
          throw new Error("Non-Identifier key in FieldDefinition");
        key = from_moz(M.key);
      }
      return new AST_ClassProperty({
        start: my_start_token(M),
        end: my_end_token(M),
        quote: from_moz_quote(M.key, M.computed),
        key,
        value: from_moz(M.value),
        static: M.static
      });
    },
    PropertyDefinition: function(M) {
      let key;
      if (M.computed) {
        key = from_moz(M.key);
      } else if (M.key.type === "PrivateIdentifier") {
        return new AST_ClassPrivateProperty({
          start: my_start_token(M),
          end: my_end_token(M),
          key: from_moz(M.key),
          value: from_moz(M.value),
          static: M.static
        });
      } else {
        key = from_moz_symbol(AST_SymbolClassProperty, M.key);
      }
      return new AST_ClassProperty({
        start: my_start_token(M),
        end: my_end_token(M),
        quote: from_moz_quote(M.key, M.computed),
        key,
        value: from_moz(M.value),
        static: M.static
      });
    },
    PrivateIdentifier: function(M) {
      return new AST_SymbolPrivateProperty({
        start: my_start_token(M),
        end: my_end_token(M),
        name: M.name
      });
    },
    StaticBlock: function(M) {
      return new AST_ClassStaticBlock({
        start: my_start_token(M),
        end: my_end_token(M),
        body: M.body.map(from_moz)
      });
    },
    ArrayExpression: function(M) {
      return new AST_Array({
        start: my_start_token(M),
        end: my_end_token(M),
        elements: M.elements.map(function(elem) {
          return elem === null ? new AST_Hole : from_moz(elem);
        })
      });
    },
    ObjectExpression: function(M) {
      return new AST_Object({
        start: my_start_token(M),
        end: my_end_token(M),
        properties: M.properties.map(function(prop) {
          if (prop.type === "SpreadElement") {
            return from_moz(prop);
          }
          prop.type = "Property";
          return from_moz(prop);
        })
      });
    },
    SequenceExpression: function(M) {
      return new AST_Sequence({
        start: my_start_token(M),
        end: my_end_token(M),
        expressions: M.expressions.map(from_moz)
      });
    },
    MemberExpression: function(M) {
      if (M.property.type === "PrivateIdentifier") {
        return new AST_DotHash({
          start: my_start_token(M),
          end: my_end_token(M),
          property: M.property.name,
          expression: from_moz(M.object),
          optional: M.optional || false
        });
      }
      return new (M.computed ? AST_Sub : AST_Dot)({
        start: my_start_token(M),
        end: my_end_token(M),
        property: M.computed ? from_moz(M.property) : M.property.name,
        expression: from_moz(M.object),
        optional: M.optional || false
      });
    },
    ChainExpression: function(M) {
      return new AST_Chain({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.expression)
      });
    },
    SwitchCase: function(M) {
      return new (M.test ? AST_Case : AST_Default)({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.test),
        body: M.consequent.map(from_moz)
      });
    },
    VariableDeclaration: function(M) {
      let decl_type;
      let sym_type;
      if (M.kind === "const") {
        decl_type = AST_Const;
        sym_type = AST_SymbolConst;
      } else if (M.kind === "let") {
        decl_type = AST_Let;
        sym_type = AST_SymbolLet;
      } else {
        decl_type = AST_Var;
        sym_type = AST_SymbolVar;
      }
      const definitions = M.declarations.map((M2) => {
        return new AST_VarDef({
          start: my_start_token(M2),
          end: my_end_token(M2),
          name: from_moz_pattern(M2.id, sym_type),
          value: from_moz(M2.init)
        });
      });
      return new decl_type({
        start: my_start_token(M),
        end: my_end_token(M),
        definitions
      });
    },
    ImportDeclaration: function(M) {
      var imported_name = null;
      var imported_names = null;
      M.specifiers.forEach(function(specifier) {
        if (specifier.type === "ImportSpecifier" || specifier.type === "ImportNamespaceSpecifier") {
          if (!imported_names) {
            imported_names = [];
          }
          imported_names.push(from_moz(specifier));
        } else if (specifier.type === "ImportDefaultSpecifier") {
          imported_name = from_moz(specifier);
        }
      });
      return new AST_Import({
        start: my_start_token(M),
        end: my_end_token(M),
        imported_name,
        imported_names,
        module_name: from_moz(M.source),
        attributes: import_attributes_from_moz(M.attributes || M.assertions)
      });
    },
    ImportSpecifier: function(M) {
      return new AST_NameMapping({
        start: my_start_token(M),
        end: my_end_token(M),
        foreign_name: from_moz_symbol(AST_SymbolImportForeign, M.imported, M.imported.type === "Literal"),
        name: from_moz_symbol(AST_SymbolImport, M.local)
      });
    },
    ImportDefaultSpecifier: function(M) {
      return from_moz_symbol(AST_SymbolImport, M.local);
    },
    ImportNamespaceSpecifier: function(M) {
      return new AST_NameMapping({
        start: my_start_token(M),
        end: my_end_token(M),
        foreign_name: new AST_SymbolImportForeign({ name: "*" }),
        name: from_moz_symbol(AST_SymbolImport, M.local)
      });
    },
    ImportExpression: function(M) {
      const args = [from_moz(M.source)];
      if (M.options) {
        args.push(from_moz(M.options));
      }
      return new AST_Call({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz({
          type: "Identifier",
          name: "import"
        }),
        optional: false,
        args
      });
    },
    ExportAllDeclaration: function(M) {
      var foreign_name = M.exported == null ? new AST_SymbolExportForeign({ name: "*" }) : from_moz_symbol(AST_SymbolExportForeign, M.exported, M.exported.type === "Literal");
      return new AST_Export({
        start: my_start_token(M),
        end: my_end_token(M),
        exported_names: [
          new AST_NameMapping({
            start: my_start_token(M),
            end: my_end_token(M),
            name: new AST_SymbolExport({ name: "*" }),
            foreign_name
          })
        ],
        module_name: from_moz(M.source),
        attributes: import_attributes_from_moz(M.attributes || M.assertions)
      });
    },
    ExportNamedDeclaration: function(M) {
      if (M.declaration) {
        return new AST_Export({
          start: my_start_token(M),
          end: my_end_token(M),
          exported_definition: from_moz(M.declaration),
          exported_names: null,
          module_name: null,
          attributes: null
        });
      } else {
        return new AST_Export({
          start: my_start_token(M),
          end: my_end_token(M),
          exported_definition: null,
          exported_names: M.specifiers && M.specifiers.length ? M.specifiers.map(from_moz) : [],
          module_name: from_moz(M.source),
          attributes: import_attributes_from_moz(M.attributes || M.assertions)
        });
      }
    },
    ExportDefaultDeclaration: function(M) {
      return new AST_Export({
        start: my_start_token(M),
        end: my_end_token(M),
        exported_value: from_moz(M.declaration),
        is_default: true
      });
    },
    ExportSpecifier: function(M) {
      return new AST_NameMapping({
        start: my_start_token(M),
        end: my_end_token(M),
        foreign_name: from_moz_symbol(AST_SymbolExportForeign, M.exported, M.exported.type === "Literal"),
        name: from_moz_symbol(AST_SymbolExport, M.local, M.local.type === "Literal")
      });
    },
    Literal: function(M) {
      var val = M.value, args = {
        start: my_start_token(M),
        end: my_end_token(M)
      };
      var rx = M.regex;
      if (rx && rx.pattern) {
        args.value = {
          source: rx.pattern,
          flags: rx.flags
        };
        return new AST_RegExp(args);
      } else if (rx) {
        const rx_source = M.raw || val;
        const match = rx_source.match(/^\/(.*)\/(\w*)$/);
        if (!match)
          throw new Error("Invalid regex source " + rx_source);
        const [_, source, flags] = match;
        args.value = { source, flags };
        return new AST_RegExp(args);
      }
      const bi = typeof M.value === "bigint" ? M.value.toString() : M.bigint;
      if (typeof bi === "string") {
        args.value = bi;
        args.raw = M.raw;
        return new AST_BigInt(args);
      }
      if (val === null)
        return new AST_Null(args);
      switch (typeof val) {
        case "string":
          args.quote = '"';
          args.value = val;
          return new AST_String(args);
        case "number":
          args.value = val;
          args.raw = M.raw || val.toString();
          return new AST_Number(args);
        case "boolean":
          return new (val ? AST_True : AST_False)(args);
      }
    },
    MetaProperty: function(M) {
      if (M.meta.name === "new" && M.property.name === "target") {
        return new AST_NewTarget({
          start: my_start_token(M),
          end: my_end_token(M)
        });
      } else if (M.meta.name === "import" && M.property.name === "meta") {
        return new AST_ImportMeta({
          start: my_start_token(M),
          end: my_end_token(M)
        });
      }
    },
    Identifier: function(M) {
      return new AST_SymbolRef({
        start: my_start_token(M),
        end: my_end_token(M),
        name: M.name
      });
    },
    EmptyStatement: function(M) {
      return new AST_EmptyStatement({
        start: my_start_token(M),
        end: my_end_token(M)
      });
    },
    BlockStatement: function(M) {
      return new AST_BlockStatement({
        start: my_start_token(M),
        end: my_end_token(M),
        body: M.body.map(from_moz)
      });
    },
    IfStatement: function(M) {
      return new AST_If({
        start: my_start_token(M),
        end: my_end_token(M),
        condition: from_moz(M.test),
        body: from_moz(M.consequent),
        alternative: from_moz(M.alternate)
      });
    },
    LabeledStatement: function(M) {
      try {
        const label = from_moz_symbol(AST_Label, M.label);
        FROM_MOZ_LABELS.push(label);
        const stat = new AST_LabeledStatement({
          start: my_start_token(M),
          end: my_end_token(M),
          label,
          body: from_moz(M.body)
        });
        return stat;
      } finally {
        FROM_MOZ_LABELS.pop();
      }
    },
    BreakStatement: function(M) {
      return new AST_Break({
        start: my_start_token(M),
        end: my_end_token(M),
        label: from_moz_label_ref(M.label)
      });
    },
    ContinueStatement: function(M) {
      return new AST_Continue({
        start: my_start_token(M),
        end: my_end_token(M),
        label: from_moz_label_ref(M.label)
      });
    },
    WithStatement: function(M) {
      return new AST_With({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.object),
        body: from_moz(M.body)
      });
    },
    SwitchStatement: function(M) {
      return new AST_Switch({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.discriminant),
        body: M.cases.map(from_moz)
      });
    },
    ReturnStatement: function(M) {
      return new AST_Return({
        start: my_start_token(M),
        end: my_end_token(M),
        value: from_moz(M.argument)
      });
    },
    ThrowStatement: function(M) {
      return new AST_Throw({
        start: my_start_token(M),
        end: my_end_token(M),
        value: from_moz(M.argument)
      });
    },
    WhileStatement: function(M) {
      return new AST_While({
        start: my_start_token(M),
        end: my_end_token(M),
        condition: from_moz(M.test),
        body: from_moz(M.body)
      });
    },
    DoWhileStatement: function(M) {
      return new AST_Do({
        start: my_start_token(M),
        end: my_end_token(M),
        condition: from_moz(M.test),
        body: from_moz(M.body)
      });
    },
    ForStatement: function(M) {
      return new AST_For({
        start: my_start_token(M),
        end: my_end_token(M),
        init: from_moz(M.init),
        condition: from_moz(M.test),
        step: from_moz(M.update),
        body: from_moz(M.body)
      });
    },
    ForInStatement: function(M) {
      return new AST_ForIn({
        start: my_start_token(M),
        end: my_end_token(M),
        init: from_moz(M.left),
        object: from_moz(M.right),
        body: from_moz(M.body)
      });
    },
    ForOfStatement: function(M) {
      return new AST_ForOf({
        start: my_start_token(M),
        end: my_end_token(M),
        init: from_moz(M.left),
        object: from_moz(M.right),
        body: from_moz(M.body),
        await: M.await
      });
    },
    AwaitExpression: function(M) {
      return new AST_Await({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.argument)
      });
    },
    YieldExpression: function(M) {
      return new AST_Yield({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.argument),
        is_star: M.delegate
      });
    },
    DebuggerStatement: function(M) {
      return new AST_Debugger({
        start: my_start_token(M),
        end: my_end_token(M)
      });
    },
    CatchClause: function(M) {
      return new AST_Catch({
        start: my_start_token(M),
        end: my_end_token(M),
        argname: M.param ? from_moz_pattern(M.param, AST_SymbolCatch) : null,
        body: from_moz(M.body).body
      });
    },
    ThisExpression: function(M) {
      return new AST_This({
        start: my_start_token(M),
        name: "this",
        end: my_end_token(M)
      });
    },
    Super: function(M) {
      return new AST_Super({
        start: my_start_token(M),
        end: my_end_token(M),
        name: "super"
      });
    },
    BinaryExpression: function(M) {
      if (M.left.type === "PrivateIdentifier") {
        return new AST_PrivateIn({
          start: my_start_token(M),
          end: my_end_token(M),
          key: new AST_SymbolPrivateProperty({
            start: my_start_token(M.left),
            end: my_end_token(M.left),
            name: M.left.name
          }),
          value: from_moz(M.right)
        });
      }
      return new AST_Binary({
        start: my_start_token(M),
        end: my_end_token(M),
        operator: M.operator,
        left: from_moz(M.left),
        right: from_moz(M.right)
      });
    },
    LogicalExpression: function(M) {
      return new AST_Binary({
        start: my_start_token(M),
        end: my_end_token(M),
        operator: M.operator,
        left: from_moz(M.left),
        right: from_moz(M.right)
      });
    },
    AssignmentExpression: function(M) {
      return new AST_Assign({
        start: my_start_token(M),
        end: my_end_token(M),
        operator: M.operator,
        logical: M.operator === "??=" || M.operator === "&&=" || M.operator === "||=",
        left: from_moz(M.left),
        right: from_moz(M.right)
      });
    },
    ConditionalExpression: function(M) {
      return new AST_Conditional({
        start: my_start_token(M),
        end: my_end_token(M),
        condition: from_moz(M.test),
        consequent: from_moz(M.consequent),
        alternative: from_moz(M.alternate)
      });
    },
    NewExpression: function(M) {
      return new AST_New({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.callee),
        args: M.arguments.map(from_moz)
      });
    },
    CallExpression: function(M) {
      return new AST_Call({
        start: my_start_token(M),
        end: my_end_token(M),
        expression: from_moz(M.callee),
        optional: M.optional,
        args: M.arguments.map(from_moz)
      });
    }
  };
  MOZ_TO_ME.UpdateExpression = MOZ_TO_ME.UnaryExpression = function To_Moz_Unary(M) {
    var prefix = "prefix" in M ? M.prefix : M.type == "UnaryExpression" ? true : false;
    return new (prefix ? AST_UnaryPrefix : AST_UnaryPostfix)({
      start: my_start_token(M),
      end: my_end_token(M),
      operator: M.operator,
      expression: from_moz(M.argument)
    });
  };
  MOZ_TO_ME.ClassDeclaration = MOZ_TO_ME.ClassExpression = function From_Moz_Class(M) {
    return new (M.type === "ClassDeclaration" ? AST_DefClass : AST_ClassExpression)({
      start: my_start_token(M),
      end: my_end_token(M),
      name: M.id && from_moz_symbol(M.type === "ClassDeclaration" ? AST_SymbolDefClass : AST_SymbolClass, M.id),
      extends: from_moz(M.superClass),
      properties: M.body.body.map(from_moz)
    });
  };
  def_to_moz(AST_EmptyStatement, function To_Moz_EmptyStatement() {
    return {
      type: "EmptyStatement"
    };
  });
  def_to_moz(AST_BlockStatement, function To_Moz_BlockStatement(M) {
    return {
      type: "BlockStatement",
      body: M.body.map(to_moz)
    };
  });
  def_to_moz(AST_If, function To_Moz_IfStatement(M) {
    return {
      type: "IfStatement",
      test: to_moz(M.condition),
      consequent: to_moz(M.body),
      alternate: to_moz(M.alternative)
    };
  });
  def_to_moz(AST_LabeledStatement, function To_Moz_LabeledStatement(M) {
    return {
      type: "LabeledStatement",
      label: to_moz(M.label),
      body: to_moz(M.body)
    };
  });
  def_to_moz(AST_Break, function To_Moz_BreakStatement(M) {
    return {
      type: "BreakStatement",
      label: to_moz(M.label)
    };
  });
  def_to_moz(AST_Continue, function To_Moz_ContinueStatement(M) {
    return {
      type: "ContinueStatement",
      label: to_moz(M.label)
    };
  });
  def_to_moz(AST_With, function To_Moz_WithStatement(M) {
    return {
      type: "WithStatement",
      object: to_moz(M.expression),
      body: to_moz(M.body)
    };
  });
  def_to_moz(AST_Switch, function To_Moz_SwitchStatement(M) {
    return {
      type: "SwitchStatement",
      discriminant: to_moz(M.expression),
      cases: M.body.map(to_moz)
    };
  });
  def_to_moz(AST_Return, function To_Moz_ReturnStatement(M) {
    return {
      type: "ReturnStatement",
      argument: to_moz(M.value)
    };
  });
  def_to_moz(AST_Throw, function To_Moz_ThrowStatement(M) {
    return {
      type: "ThrowStatement",
      argument: to_moz(M.value)
    };
  });
  def_to_moz(AST_While, function To_Moz_WhileStatement(M) {
    return {
      type: "WhileStatement",
      test: to_moz(M.condition),
      body: to_moz(M.body)
    };
  });
  def_to_moz(AST_Do, function To_Moz_DoWhileStatement(M) {
    return {
      type: "DoWhileStatement",
      test: to_moz(M.condition),
      body: to_moz(M.body)
    };
  });
  def_to_moz(AST_For, function To_Moz_ForStatement(M) {
    return {
      type: "ForStatement",
      init: to_moz(M.init),
      test: to_moz(M.condition),
      update: to_moz(M.step),
      body: to_moz(M.body)
    };
  });
  def_to_moz(AST_ForIn, function To_Moz_ForInStatement(M) {
    return {
      type: "ForInStatement",
      left: to_moz(M.init),
      right: to_moz(M.object),
      body: to_moz(M.body)
    };
  });
  def_to_moz(AST_ForOf, function To_Moz_ForOfStatement(M) {
    return {
      type: "ForOfStatement",
      left: to_moz(M.init),
      right: to_moz(M.object),
      body: to_moz(M.body),
      await: M.await
    };
  });
  def_to_moz(AST_Await, function To_Moz_AwaitExpression(M) {
    return {
      type: "AwaitExpression",
      argument: to_moz(M.expression)
    };
  });
  def_to_moz(AST_Yield, function To_Moz_YieldExpression(M) {
    return {
      type: "YieldExpression",
      argument: to_moz(M.expression),
      delegate: M.is_star
    };
  });
  def_to_moz(AST_Debugger, function To_Moz_DebuggerStatement() {
    return {
      type: "DebuggerStatement"
    };
  });
  def_to_moz(AST_VarDef, function To_Moz_VariableDeclarator(M) {
    return {
      type: "VariableDeclarator",
      id: to_moz(M.name),
      init: to_moz(M.value)
    };
  });
  def_to_moz(AST_This, function To_Moz_ThisExpression() {
    return {
      type: "ThisExpression"
    };
  });
  def_to_moz(AST_Super, function To_Moz_Super() {
    return {
      type: "Super"
    };
  });
  def_to_moz(AST_Conditional, function To_Moz_ConditionalExpression(M) {
    return {
      type: "ConditionalExpression",
      test: to_moz(M.condition),
      consequent: to_moz(M.consequent),
      alternate: to_moz(M.alternative)
    };
  });
  def_to_moz(AST_New, function To_Moz_NewExpression(M) {
    return {
      type: "NewExpression",
      callee: to_moz(M.expression),
      arguments: M.args.map(to_moz)
    };
  });
  def_to_moz(AST_Call, function To_Moz_CallExpression(M) {
    if (M.expression instanceof AST_SymbolRef && M.expression.name === "import") {
      const [source, options] = M.args.map(to_moz);
      return {
        type: "ImportExpression",
        source,
        options: options || null
      };
    }
    return {
      type: "CallExpression",
      callee: to_moz(M.expression),
      optional: M.optional,
      arguments: M.args.map(to_moz)
    };
  });
  def_to_moz(AST_Toplevel, function To_Moz_Program(M) {
    return to_moz_scope("Program", M);
  });
  def_to_moz(AST_Expansion, function To_Moz_Spread(M) {
    return {
      type: to_moz_in_destructuring() ? "RestElement" : "SpreadElement",
      argument: to_moz(M.expression)
    };
  });
  def_to_moz(AST_PrefixedTemplateString, function To_Moz_TaggedTemplateExpression(M) {
    return {
      type: "TaggedTemplateExpression",
      tag: to_moz(M.prefix),
      quasi: to_moz(M.template_string)
    };
  });
  def_to_moz(AST_TemplateString, function To_Moz_TemplateLiteral(M) {
    var quasis = [];
    var expressions = [];
    for (var i = 0;i < M.segments.length; i++) {
      if (i % 2 !== 0) {
        expressions.push(to_moz(M.segments[i]));
      } else {
        quasis.push({
          type: "TemplateElement",
          value: {
            raw: M.segments[i].raw,
            cooked: M.segments[i].value
          },
          tail: i === M.segments.length - 1
        });
      }
    }
    return {
      type: "TemplateLiteral",
      quasis,
      expressions
    };
  });
  def_to_moz(AST_Defun, function To_Moz_FunctionDeclaration(M) {
    return {
      type: "FunctionDeclaration",
      id: to_moz(M.name),
      params: M.argnames.map(to_moz_pattern),
      generator: M.is_generator,
      async: M.async,
      body: to_moz_scope("BlockStatement", M)
    };
  });
  def_to_moz(AST_Function, function To_Moz_FunctionExpression(M) {
    return {
      type: "FunctionExpression",
      id: to_moz(M.name),
      params: M.argnames.map(to_moz_pattern),
      generator: M.is_generator || false,
      async: M.async || false,
      body: to_moz_scope("BlockStatement", M)
    };
  });
  def_to_moz(AST_Arrow, function To_Moz_ArrowFunctionExpression(M) {
    var body = M.body.length === 1 && M.body[0] instanceof AST_Return && M.body[0].value ? to_moz(M.body[0].value) : {
      type: "BlockStatement",
      body: M.body.map(to_moz)
    };
    return {
      type: "ArrowFunctionExpression",
      params: M.argnames.map(to_moz_pattern),
      async: M.async,
      body
    };
  });
  def_to_moz(AST_Destructuring, function To_Moz_ObjectPattern(M) {
    if (M.is_array) {
      return {
        type: "ArrayPattern",
        elements: M.names.map((M2) => M2 instanceof AST_Hole ? null : to_moz_pattern(M2))
      };
    }
    return {
      type: "ObjectPattern",
      properties: M.names.map((M2) => {
        if (M2 instanceof AST_ObjectKeyVal) {
          var computed = M2.computed_key();
          const [shorthand, key] = to_moz_property_key(M2.key, computed, M2.quote, M2.value);
          return {
            type: "Property",
            computed,
            kind: "init",
            key,
            method: false,
            shorthand,
            value: to_moz_pattern(M2.value)
          };
        } else {
          return to_moz_pattern(M2);
        }
      })
    };
  });
  def_to_moz(AST_DefaultAssign, function To_Moz_AssignmentExpression(M) {
    return {
      type: "AssignmentPattern",
      left: to_moz_pattern(M.left),
      right: to_moz(M.right)
    };
  });
  def_to_moz(AST_Directive, function To_Moz_Directive(M) {
    return {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: M.value,
        raw: M.print_to_string()
      },
      directive: M.value
    };
  });
  def_to_moz(AST_SimpleStatement, function To_Moz_ExpressionStatement(M) {
    return {
      type: "ExpressionStatement",
      expression: to_moz(M.body)
    };
  });
  def_to_moz(AST_SwitchBranch, function To_Moz_SwitchCase(M) {
    return {
      type: "SwitchCase",
      test: to_moz(M.expression),
      consequent: M.body.map(to_moz)
    };
  });
  def_to_moz(AST_Try, function To_Moz_TryStatement(M) {
    return {
      type: "TryStatement",
      block: to_moz_block(M.body),
      handler: to_moz(M.bcatch),
      guardedHandlers: [],
      finalizer: to_moz(M.bfinally)
    };
  });
  def_to_moz(AST_Catch, function To_Moz_CatchClause(M) {
    return {
      type: "CatchClause",
      param: M.argname != null ? to_moz_pattern(M.argname) : null,
      body: to_moz_block(M)
    };
  });
  def_to_moz(AST_Definitions, function To_Moz_VariableDeclaration(M) {
    return {
      type: "VariableDeclaration",
      kind: M instanceof AST_Const ? "const" : M instanceof AST_Let ? "let" : "var",
      declarations: M.definitions.map(to_moz)
    };
  });
  function import_attributes_to_moz(attribute) {
    const import_attributes = [];
    if (attribute) {
      for (const { key, value } of attribute.properties) {
        const key_moz = is_basic_identifier_string(key) ? { type: "Identifier", name: key } : { type: "Literal", value: key, raw: JSON.stringify(key) };
        import_attributes.push({
          type: "ImportAttribute",
          key: key_moz,
          value: to_moz(value)
        });
      }
    }
    return import_attributes;
  }
  def_to_moz(AST_Export, function To_Moz_ExportDeclaration(M) {
    if (M.exported_names) {
      var first_exported = M.exported_names[0];
      if (first_exported && first_exported.name.name === "*" && !first_exported.name.quote) {
        var foreign_name = first_exported.foreign_name;
        var exported = foreign_name.name === "*" && !foreign_name.quote ? null : to_moz(foreign_name);
        return {
          type: "ExportAllDeclaration",
          source: to_moz(M.module_name),
          exported,
          attributes: import_attributes_to_moz(M.attributes)
        };
      }
      return {
        type: "ExportNamedDeclaration",
        specifiers: M.exported_names.map(function(name_mapping) {
          return {
            type: "ExportSpecifier",
            exported: to_moz(name_mapping.foreign_name),
            local: to_moz(name_mapping.name)
          };
        }),
        declaration: to_moz(M.exported_definition),
        source: to_moz(M.module_name),
        attributes: import_attributes_to_moz(M.attributes)
      };
    }
    if (M.is_default) {
      return {
        type: "ExportDefaultDeclaration",
        declaration: to_moz(M.exported_value || M.exported_definition)
      };
    } else {
      return {
        type: "ExportNamedDeclaration",
        declaration: to_moz(M.exported_value || M.exported_definition),
        specifiers: [],
        source: null
      };
    }
  });
  def_to_moz(AST_Import, function To_Moz_ImportDeclaration(M) {
    var specifiers = [];
    if (M.imported_name) {
      specifiers.push({
        type: "ImportDefaultSpecifier",
        local: to_moz(M.imported_name)
      });
    }
    if (M.imported_names) {
      var first_imported_foreign_name = M.imported_names[0].foreign_name;
      if (first_imported_foreign_name.name === "*" && !first_imported_foreign_name.quote) {
        specifiers.push({
          type: "ImportNamespaceSpecifier",
          local: to_moz(M.imported_names[0].name)
        });
      } else {
        M.imported_names.forEach(function(name_mapping) {
          specifiers.push({
            type: "ImportSpecifier",
            local: to_moz(name_mapping.name),
            imported: to_moz(name_mapping.foreign_name)
          });
        });
      }
    }
    return {
      type: "ImportDeclaration",
      specifiers,
      source: to_moz(M.module_name),
      attributes: import_attributes_to_moz(M.attributes)
    };
  });
  def_to_moz(AST_ImportMeta, function To_Moz_MetaProperty() {
    return {
      type: "MetaProperty",
      meta: {
        type: "Identifier",
        name: "import"
      },
      property: {
        type: "Identifier",
        name: "meta"
      }
    };
  });
  def_to_moz(AST_Sequence, function To_Moz_SequenceExpression(M) {
    return {
      type: "SequenceExpression",
      expressions: M.expressions.map(to_moz)
    };
  });
  def_to_moz(AST_DotHash, function To_Moz_PrivateMemberExpression(M) {
    return {
      type: "MemberExpression",
      object: to_moz(M.expression),
      computed: false,
      property: {
        type: "PrivateIdentifier",
        name: M.property
      },
      optional: M.optional
    };
  });
  def_to_moz(AST_PropAccess, function To_Moz_MemberExpression(M) {
    var isComputed = M instanceof AST_Sub;
    return {
      type: "MemberExpression",
      object: to_moz(M.expression),
      computed: isComputed,
      property: isComputed ? to_moz(M.property) : { type: "Identifier", name: M.property },
      optional: M.optional
    };
  });
  def_to_moz(AST_Chain, function To_Moz_ChainExpression(M) {
    return {
      type: "ChainExpression",
      expression: to_moz(M.expression)
    };
  });
  def_to_moz(AST_Unary, function To_Moz_Unary(M) {
    return {
      type: M.operator == "++" || M.operator == "--" ? "UpdateExpression" : "UnaryExpression",
      operator: M.operator,
      prefix: M instanceof AST_UnaryPrefix,
      argument: to_moz(M.expression)
    };
  });
  def_to_moz(AST_Binary, function To_Moz_BinaryExpression(M) {
    if (M.operator == "=" && to_moz_in_destructuring()) {
      return {
        type: "AssignmentPattern",
        left: to_moz(M.left),
        right: to_moz(M.right)
      };
    }
    const type = M.operator == "&&" || M.operator == "||" || M.operator === "??" ? "LogicalExpression" : "BinaryExpression";
    return {
      type,
      left: to_moz(M.left),
      operator: M.operator,
      right: to_moz(M.right)
    };
  });
  def_to_moz(AST_Assign, function To_Moz_AssignmentExpression(M) {
    return {
      type: "AssignmentExpression",
      operator: M.operator,
      left: to_moz(M.left),
      right: to_moz(M.right)
    };
  });
  def_to_moz(AST_PrivateIn, function To_Moz_BinaryExpression_PrivateIn(M) {
    return {
      type: "BinaryExpression",
      left: { type: "PrivateIdentifier", name: M.key.name },
      operator: "in",
      right: to_moz(M.value)
    };
  });
  def_to_moz(AST_Array, function To_Moz_ArrayExpression(M) {
    return {
      type: "ArrayExpression",
      elements: M.elements.map(to_moz)
    };
  });
  def_to_moz(AST_Object, function To_Moz_ObjectExpression(M) {
    return {
      type: "ObjectExpression",
      properties: M.properties.map(to_moz)
    };
  });
  def_to_moz(AST_ObjectProperty, function To_Moz_Property(M, parent) {
    var computed = M.computed_key();
    const [shorthand, key] = to_moz_property_key(M.key, computed, M.quote, M.value);
    var kind;
    if (M instanceof AST_ObjectGetter) {
      kind = "get";
    } else if (M instanceof AST_ObjectSetter) {
      kind = "set";
    }
    if (M instanceof AST_PrivateGetter || M instanceof AST_PrivateSetter) {
      const kind2 = M instanceof AST_PrivateGetter ? "get" : "set";
      return {
        type: "MethodDefinition",
        computed: false,
        kind: kind2,
        static: M.static,
        key: {
          type: "PrivateIdentifier",
          name: M.key.name
        },
        value: to_moz(M.value)
      };
    }
    if (M instanceof AST_ClassPrivateProperty) {
      return {
        type: "PropertyDefinition",
        key: {
          type: "PrivateIdentifier",
          name: M.key.name
        },
        value: to_moz(M.value),
        computed: false,
        static: M.static
      };
    }
    if (M instanceof AST_ClassProperty) {
      return {
        type: "PropertyDefinition",
        key,
        value: to_moz(M.value),
        computed,
        static: M.static
      };
    }
    if (parent instanceof AST_Class) {
      return {
        type: "MethodDefinition",
        computed,
        kind,
        static: M.static,
        key: to_moz(M.key),
        value: to_moz(M.value)
      };
    }
    return {
      type: "Property",
      computed,
      method: false,
      shorthand,
      kind,
      key,
      value: to_moz(M.value)
    };
  });
  def_to_moz(AST_ObjectKeyVal, function To_Moz_Property(M) {
    var computed = M.computed_key();
    const [shorthand, key] = to_moz_property_key(M.key, computed, M.quote, M.value);
    return {
      type: "Property",
      computed,
      shorthand,
      method: false,
      kind: "init",
      key,
      value: to_moz(M.value)
    };
  });
  def_to_moz(AST_ConciseMethod, function To_Moz_MethodDefinition(M, parent) {
    const computed = M.computed_key();
    const [_always_false, key] = to_moz_property_key(M.key, computed, M.quote, M.value);
    if (parent instanceof AST_Object) {
      return {
        type: "Property",
        kind: "init",
        computed,
        method: true,
        shorthand: false,
        key,
        value: to_moz(M.value)
      };
    }
    return {
      type: "MethodDefinition",
      kind: !computed && M.key.name === "constructor" ? "constructor" : "method",
      computed,
      key,
      value: to_moz(M.value),
      static: M.static
    };
  });
  def_to_moz(AST_PrivateMethod, function To_Moz_MethodDefinition(M) {
    return {
      type: "MethodDefinition",
      kind: "method",
      key: { type: "PrivateIdentifier", name: M.key.name },
      value: to_moz(M.value),
      computed: false,
      static: M.static
    };
  });
  def_to_moz(AST_Class, function To_Moz_Class(M) {
    var type = M instanceof AST_ClassExpression ? "ClassExpression" : "ClassDeclaration";
    return {
      type,
      superClass: to_moz(M.extends),
      id: M.name ? to_moz(M.name) : null,
      body: {
        type: "ClassBody",
        body: M.properties.map(to_moz)
      }
    };
  });
  def_to_moz(AST_ClassStaticBlock, function To_Moz_StaticBlock(M) {
    return {
      type: "StaticBlock",
      body: M.body.map(to_moz)
    };
  });
  def_to_moz(AST_NewTarget, function To_Moz_MetaProperty() {
    return {
      type: "MetaProperty",
      meta: {
        type: "Identifier",
        name: "new"
      },
      property: {
        type: "Identifier",
        name: "target"
      }
    };
  });
  def_to_moz(AST_Symbol, function To_Moz_Identifier(M, parent) {
    if (M instanceof AST_SymbolMethod && parent.quote || (M instanceof AST_SymbolImportForeign || M instanceof AST_SymbolExportForeign || M instanceof AST_SymbolExport) && M.quote) {
      return {
        type: "Literal",
        value: M.name
      };
    }
    var def = M.definition();
    return {
      type: "Identifier",
      name: def ? def.mangled_name || def.name : M.name
    };
  });
  def_to_moz(AST_RegExp, function To_Moz_RegExpLiteral(M) {
    const pattern = M.value.source;
    const flags = M.value.flags;
    return {
      type: "Literal",
      value: null,
      raw: M.print_to_string(),
      regex: { pattern, flags }
    };
  });
  def_to_moz(AST_Constant, function To_Moz_Literal(M) {
    var value = M.value;
    return {
      type: "Literal",
      value,
      raw: M.raw || M.print_to_string()
    };
  });
  def_to_moz(AST_Atom, function To_Moz_Atom(M) {
    return {
      type: "Identifier",
      name: String(M.value)
    };
  });
  def_to_moz(AST_BigInt, (M) => ({
    type: "Literal",
    value: null,
    bigint: typeof BigInt === "function" ? BigInt(M.value).toString() : M.value,
    raw: M.raw
  }));
  AST_Boolean.DEFMETHOD("to_mozilla_ast", AST_Constant.prototype.to_mozilla_ast);
  AST_Null.DEFMETHOD("to_mozilla_ast", AST_Constant.prototype.to_mozilla_ast);
  AST_Hole.DEFMETHOD("to_mozilla_ast", function To_Moz_ArrayHole() {
    return null;
  });
  AST_Block.DEFMETHOD("to_mozilla_ast", AST_BlockStatement.prototype.to_mozilla_ast);
  AST_Lambda.DEFMETHOD("to_mozilla_ast", AST_Function.prototype.to_mozilla_ast);
  function my_start_token(moznode) {
    var loc = moznode.loc, start = loc && loc.start;
    var range = moznode.range;
    return new AST_Token("", "", start && start.line || 0, start && start.column || 0, range ? range[0] : moznode.start, false, [], [], loc && loc.source);
  }
  function my_end_token(moznode) {
    var loc = moznode.loc, end = loc && loc.end;
    var range = moznode.range;
    return new AST_Token("", "", end && end.line || 0, end && end.column || 0, range ? range[0] : moznode.end, false, [], [], loc && loc.source);
  }
  var FROM_MOZ_LABELS = null;
  function from_moz(node) {
    if (node == null)
      return null;
    return MOZ_TO_ME[node.type](node);
  }
  function from_moz_quote(moz_key, computed) {
    if (!computed && moz_key.type === "Literal" && typeof moz_key.value === "string") {
      return '"';
    } else {
      return "";
    }
  }
  function from_moz_symbol(symbol_type, M, has_quote) {
    return new symbol_type({
      start: my_start_token(M),
      quote: has_quote ? '"' : undefined,
      name: M.type === "Identifier" ? M.name : String(M.value),
      end: my_end_token(M)
    });
  }
  function from_moz_lambda(M, is_method) {
    return new (is_method ? AST_Accessor : AST_Function)({
      start: my_start_token(M),
      end: my_end_token(M),
      name: M.id && from_moz_symbol(is_method ? AST_SymbolMethod : AST_SymbolLambda, M.id),
      argnames: M.params.map((M2) => from_moz_pattern(M2, AST_SymbolFunarg)),
      is_generator: M.generator,
      async: M.async,
      body: normalize_directives(from_moz(M.body).body)
    });
  }
  function from_moz_pattern(M, sym_type) {
    switch (M.type) {
      case "ObjectPattern":
        return new AST_Destructuring({
          start: my_start_token(M),
          end: my_end_token(M),
          names: M.properties.map((p) => from_moz_pattern(p, sym_type)),
          is_array: false
        });
      case "Property":
        var key = M.key;
        var args = {
          start: my_start_token(key || M.value),
          end: my_end_token(M.value),
          key: key.type == "Identifier" ? key.name : String(key.value),
          quote: !M.computed && key.type === "Literal" && typeof key.value === "string" ? '"' : "",
          value: from_moz_pattern(M.value, sym_type)
        };
        if (M.computed) {
          args.key = from_moz(M.key);
        }
        return new AST_ObjectKeyVal(args);
      case "ArrayPattern":
        return new AST_Destructuring({
          start: my_start_token(M),
          end: my_end_token(M),
          names: M.elements.map(function(elm) {
            if (elm === null) {
              return new AST_Hole;
            }
            return from_moz_pattern(elm, sym_type);
          }),
          is_array: true
        });
      case "SpreadElement":
      case "RestElement":
        return new AST_Expansion({
          start: my_start_token(M),
          end: my_end_token(M),
          expression: from_moz_pattern(M.argument, sym_type)
        });
      case "AssignmentPattern":
        return new AST_DefaultAssign({
          start: my_start_token(M),
          end: my_end_token(M),
          left: from_moz_pattern(M.left, sym_type),
          operator: "=",
          right: from_moz(M.right)
        });
      case "Identifier":
        return new sym_type({
          start: my_start_token(M),
          end: my_end_token(M),
          name: M.name
        });
      default:
        throw new Error("Invalid node type for destructuring: " + M.type);
    }
  }
  function from_moz_label_ref(m_label) {
    if (!m_label)
      return null;
    const label = from_moz_symbol(AST_LabelRef, m_label);
    let i = FROM_MOZ_LABELS.length;
    while (i--) {
      const label_origin = FROM_MOZ_LABELS[i];
      if (label.name === label_origin.name) {
        label.thedef = label_origin;
        break;
      }
    }
    return label;
  }
  AST_Node.from_mozilla_ast = function(node) {
    var save_labels = FROM_MOZ_LABELS;
    FROM_MOZ_LABELS = [];
    var ast = from_moz(node);
    FROM_MOZ_LABELS = save_labels;
    return ast;
  };
  function set_moz_loc(mynode, moznode) {
    var start = mynode.start;
    var end = mynode.end;
    if (!(start && end)) {
      return moznode;
    }
    if (start.pos != null && end.endpos != null) {
      moznode.range = [start.pos, end.endpos];
    }
    if (start.line) {
      moznode.loc = {
        start: { line: start.line, column: start.col },
        end: end.endline ? { line: end.endline, column: end.endcol } : null
      };
      if (start.file) {
        moznode.loc.source = start.file;
      }
    }
    return moznode;
  }
  function def_to_moz(mytype, handler) {
    mytype.DEFMETHOD("to_mozilla_ast", function(parent) {
      return set_moz_loc(this, handler(this, parent));
    });
  }
  var TO_MOZ_STACK = null;
  function to_moz(node) {
    if (TO_MOZ_STACK === null) {
      TO_MOZ_STACK = [];
    }
    TO_MOZ_STACK.push(node);
    var ast = node != null ? node.to_mozilla_ast(TO_MOZ_STACK[TO_MOZ_STACK.length - 2]) : null;
    TO_MOZ_STACK.pop();
    if (TO_MOZ_STACK.length === 0) {
      TO_MOZ_STACK = null;
    }
    return ast;
  }
  function to_moz_property_key(key, computed = false, quote = false, value = null) {
    if (computed) {
      return [false, to_moz(key)];
    }
    const key_name = typeof key === "string" ? key : key.name;
    let moz_key;
    if (quote) {
      moz_key = { type: "Literal", value: key_name, raw: JSON.stringify(key_name) };
    } else if ("" + +key_name === key_name && +key_name >= 0) {
      moz_key = { type: "Literal", value: +key_name, raw: JSON.stringify(+key_name) };
    } else {
      moz_key = { type: "Identifier", name: key_name };
    }
    const shorthand = moz_key.type === "Identifier" && moz_key.name === key_name && (value instanceof AST_Symbol && value.name === key_name || value instanceof AST_DefaultAssign && value.left.name === key_name);
    return [shorthand, moz_key];
  }
  function to_moz_pattern(node) {
    if (node instanceof AST_Expansion) {
      return {
        type: "RestElement",
        argument: to_moz_pattern(node.expression)
      };
    }
    if (node instanceof AST_Symbol || node instanceof AST_Destructuring || node instanceof AST_DefaultAssign || node instanceof AST_PropAccess) {
      return to_moz(node);
    }
    throw new Error(node.TYPE);
  }
  function to_moz_in_destructuring() {
    var i = TO_MOZ_STACK.length;
    while (i--) {
      if (TO_MOZ_STACK[i] instanceof AST_Destructuring) {
        return true;
      }
    }
    return false;
  }
  function to_moz_block(node) {
    return {
      type: "BlockStatement",
      body: node.body.map(to_moz)
    };
  }
  function to_moz_scope(type, node) {
    var body = node.body.map(to_moz);
    if (node.body[0] instanceof AST_SimpleStatement && node.body[0].body instanceof AST_String) {
      body.unshift(to_moz(new AST_EmptyStatement(node.body[0])));
    }
    return {
      type,
      body
    };
  }
})();

// node_modules/terser/lib/utils/first_in_statement.js
function first_in_statement(stack) {
  let node = stack.parent(-1);
  for (let i = 0, p;p = stack.parent(i); i++) {
    if (p instanceof AST_Statement && p.body === node)
      return true;
    if (p instanceof AST_Sequence && p.expressions[0] === node || p.TYPE === "Call" && p.expression === node || p instanceof AST_PrefixedTemplateString && p.prefix === node || p instanceof AST_Dot && p.expression === node || p instanceof AST_Sub && p.expression === node || p instanceof AST_Chain && p.expression === node || p instanceof AST_Conditional && p.condition === node || p instanceof AST_Binary && p.left === node || p instanceof AST_UnaryPostfix && p.expression === node) {
      node = p;
    } else {
      return false;
    }
  }
}
function left_is_object(node) {
  if (node instanceof AST_Object)
    return true;
  if (node instanceof AST_Sequence)
    return left_is_object(node.expressions[0]);
  if (node.TYPE === "Call")
    return left_is_object(node.expression);
  if (node instanceof AST_PrefixedTemplateString)
    return left_is_object(node.prefix);
  if (node instanceof AST_Dot || node instanceof AST_Sub)
    return left_is_object(node.expression);
  if (node instanceof AST_Chain)
    return left_is_object(node.expression);
  if (node instanceof AST_Conditional)
    return left_is_object(node.condition);
  if (node instanceof AST_Binary)
    return left_is_object(node.left);
  if (node instanceof AST_UnaryPostfix)
    return left_is_object(node.expression);
  return false;
}

// node_modules/terser/lib/output.js
var CODE_LINE_BREAK = 10;
var CODE_SPACE = 32;
var r_annotation = /[@#]__(PURE|INLINE|NOINLINE)__/;
function is_some_comments(comment) {
  return (comment.type === "comment2" || comment.type === "comment1") && /@preserve|@copyright|@lic|@cc_on|^\**!/i.test(comment.value);
}
var ROPE_COMMIT_WHEN = 8 * 1000;

class Rope {
  constructor() {
    this.committed = "";
    this.current = "";
  }
  append(str) {
    if (this.current.length > ROPE_COMMIT_WHEN) {
      this.committed += this.current + str;
      this.current = "";
    } else {
      this.current += str;
    }
  }
  insertAt(char, index) {
    const { committed, current } = this;
    if (index < committed.length) {
      this.committed = committed.slice(0, index) + char + committed.slice(index);
    } else if (index === committed.length) {
      this.committed += char;
    } else {
      index -= committed.length;
      this.committed += current.slice(0, index) + char;
      this.current = current.slice(index);
    }
  }
  charAt(index) {
    const { committed } = this;
    if (index < committed.length)
      return committed[index];
    return this.current[index - committed.length];
  }
  charCodeAt(index) {
    const { committed } = this;
    if (index < committed.length)
      return committed.charCodeAt(index);
    return this.current.charCodeAt(index - committed.length);
  }
  length() {
    return this.committed.length + this.current.length;
  }
  expectDirective() {
    let ch, n = this.length();
    if (n <= 0)
      return true;
    while ((ch = this.charCodeAt(--n)) && (ch == CODE_SPACE || ch == CODE_LINE_BREAK))
      ;
    return !ch || ch === 59 || ch === 123;
  }
  hasNLB() {
    let n = this.length() - 1;
    while (n >= 0) {
      const code = this.charCodeAt(n--);
      if (code === CODE_LINE_BREAK)
        return true;
      if (code !== CODE_SPACE)
        return false;
    }
    return true;
  }
  toString() {
    return this.committed + this.current;
  }
}
function OutputStream(options) {
  var readonly = !options;
  options = defaults(options, {
    ascii_only: false,
    beautify: false,
    braces: false,
    comments: "some",
    ecma: 5,
    ie8: false,
    indent_level: 4,
    indent_start: 0,
    inline_script: true,
    keep_numbers: false,
    keep_quoted_props: false,
    max_line_len: false,
    preamble: null,
    preserve_annotations: false,
    quote_keys: false,
    quote_style: 0,
    safari10: false,
    semicolons: true,
    shebang: true,
    shorthand: undefined,
    source_map: null,
    webkit: false,
    width: 80,
    wrap_iife: false,
    wrap_func_args: false,
    _destroy_ast: false
  }, true);
  if (options.shorthand === undefined)
    options.shorthand = options.ecma > 5;
  var comment_filter = return_false;
  if (options.comments) {
    let comments = options.comments;
    if (typeof options.comments === "string" && /^\/.*\/[a-zA-Z]*$/.test(options.comments)) {
      var regex_pos = options.comments.lastIndexOf("/");
      comments = new RegExp(options.comments.substr(1, regex_pos - 1), options.comments.substr(regex_pos + 1));
    }
    if (comments instanceof RegExp) {
      comment_filter = function(comment) {
        return comment.type != "comment5" && comments.test(comment.value);
      };
    } else if (typeof comments === "function") {
      comment_filter = function(comment) {
        return comment.type != "comment5" && comments(this, comment);
      };
    } else if (comments === "some") {
      comment_filter = is_some_comments;
    } else {
      comment_filter = return_true;
    }
  }
  if (options.preserve_annotations) {
    let prev_comment_filter = comment_filter;
    comment_filter = function(comment) {
      return r_annotation.test(comment.value) || prev_comment_filter.apply(this, arguments);
    };
  }
  var indentation = 0;
  var current_col = 0;
  var current_line = 1;
  var current_pos = 0;
  var OUTPUT = new Rope;
  let printed_comments = new Set;
  var to_utf8 = options.ascii_only ? function(str, identifier = false, regexp = false) {
    if (options.ecma >= 2015 && !options.safari10 && !regexp) {
      str = str.replace(/[\ud800-\udbff][\udc00-\udfff]/g, function(ch) {
        var code = get_full_char_code(ch, 0).toString(16);
        return "\\u{" + code + "}";
      });
    }
    return str.replace(/[\u0000-\u001f\u007f-\uffff]/g, function(ch) {
      var code = ch.charCodeAt(0).toString(16);
      if (code.length <= 2 && !identifier) {
        while (code.length < 2)
          code = "0" + code;
        return "\\x" + code;
      } else {
        while (code.length < 4)
          code = "0" + code;
        return "\\u" + code;
      }
    });
  } : function(str) {
    return str.replace(/[\ud800-\udbff][\udc00-\udfff]|([\ud800-\udbff]|[\udc00-\udfff])/g, function(match, lone) {
      if (lone) {
        return "\\u" + lone.charCodeAt(0).toString(16);
      }
      return match;
    });
  };
  function make_string(str, quote) {
    var dq = 0, sq = 0;
    str = str.replace(/[\\\b\f\n\r\v\t\x22\x27\u2028\u2029\0\ufeff]/g, function(s, i) {
      switch (s) {
        case '"':
          ++dq;
          return '"';
        case "'":
          ++sq;
          return "'";
        case "\\":
          return "\\\\";
        case `
`:
          return "\\n";
        case "\r":
          return "\\r";
        case "\t":
          return "\\t";
        case "\b":
          return "\\b";
        case "\f":
          return "\\f";
        case "\v":
          return options.ie8 ? "\\x0B" : "\\v";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        case "\uFEFF":
          return "\\ufeff";
        case "\x00":
          return /[0-9]/.test(get_full_char(str, i + 1)) ? "\\x00" : "\\0";
      }
      return s;
    });
    function quote_single() {
      return "'" + str.replace(/\x27/g, "\\'") + "'";
    }
    function quote_double() {
      return '"' + str.replace(/\x22/g, "\\\"") + '"';
    }
    function quote_template() {
      return "`" + str.replace(/`/g, "\\`") + "`";
    }
    str = to_utf8(str);
    if (quote === "`")
      return quote_template();
    switch (options.quote_style) {
      case 1:
        return quote_single();
      case 2:
        return quote_double();
      case 3:
        return quote == "'" ? quote_single() : quote_double();
      default:
        return dq > sq ? quote_single() : quote_double();
    }
  }
  function encode_string(str, quote) {
    var ret = make_string(str, quote);
    if (options.inline_script) {
      ret = ret.replace(/<\x2f(script)([>\/\t\n\f\r ])/gi, "<\\/$1$2");
      ret = ret.replace(/\x3c!--/g, "\\x3c!--");
      ret = ret.replace(/--\x3e/g, "--\\x3e");
    }
    return ret;
  }
  function make_name(name) {
    name = name.toString();
    name = to_utf8(name, true);
    return name;
  }
  function make_indent(back) {
    return " ".repeat(options.indent_start + indentation - back * options.indent_level);
  }
  var has_parens = false;
  var might_need_space = false;
  var might_need_semicolon = false;
  var might_add_newline = 0;
  var need_newline_indented = false;
  var need_space = false;
  var newline_insert = -1;
  var last = "";
  var mapping_token, mapping_name, mappings = options.source_map && [];
  var do_add_mapping = mappings ? function() {
    mappings.forEach(function(mapping) {
      try {
        let { name, token } = mapping;
        if (name !== false) {
          if (token.type == "name" || token.type === "privatename") {
            name = token.value;
          } else if (name instanceof AST_Symbol) {
            name = token.type === "string" ? token.value : name.name;
          }
        }
        options.source_map.add(mapping.token.file, mapping.line, mapping.col, mapping.token.line, mapping.token.col, is_basic_identifier_string(name) ? name : undefined);
      } catch (ex) {}
    });
    mappings = [];
  } : noop;
  var ensure_line_len = options.max_line_len ? function() {
    if (current_col > options.max_line_len) {
      if (might_add_newline) {
        OUTPUT.insertAt(`
`, might_add_newline);
        const len_after_newline = OUTPUT.length() - might_add_newline - 1;
        if (mappings) {
          var delta = len_after_newline - current_col;
          mappings.forEach(function(mapping) {
            mapping.line++;
            mapping.col += delta;
          });
        }
        current_line++;
        current_pos++;
        current_col = len_after_newline;
      }
    }
    if (might_add_newline) {
      might_add_newline = 0;
      do_add_mapping();
    }
  } : noop;
  var requireSemicolonChars = makePredicate("( [ + * / - , . `");
  function print(str) {
    str = String(str);
    var ch = get_full_char(str, 0);
    if (need_newline_indented && ch) {
      need_newline_indented = false;
      if (ch !== `
`) {
        print(`
`);
        indent();
      }
    }
    if (need_space && ch) {
      need_space = false;
      if (!/[\s;})]/.test(ch)) {
        space();
      }
    }
    newline_insert = -1;
    var prev = last.charAt(last.length - 1);
    if (might_need_semicolon) {
      might_need_semicolon = false;
      if (prev === ":" && ch === "}" || (!ch || !";}".includes(ch)) && prev !== ";") {
        if (options.semicolons || requireSemicolonChars.has(ch)) {
          OUTPUT.append(";");
          current_col++;
          current_pos++;
        } else {
          ensure_line_len();
          if (current_col > 0) {
            OUTPUT.append(`
`);
            current_pos++;
            current_line++;
            current_col = 0;
          }
          if (/^\s+$/.test(str)) {
            might_need_semicolon = true;
          }
        }
        if (!options.beautify)
          might_need_space = false;
      }
    }
    if (might_need_space) {
      if (is_identifier_char(prev) && (is_identifier_char(ch) || ch == "\\") || ch == "/" && ch == prev || (ch == "+" || ch == "-") && ch == last) {
        OUTPUT.append(" ");
        current_col++;
        current_pos++;
      }
      might_need_space = false;
    }
    if (mapping_token) {
      mappings.push({
        token: mapping_token,
        name: mapping_name,
        line: current_line,
        col: current_col
      });
      mapping_token = false;
      if (!might_add_newline)
        do_add_mapping();
    }
    OUTPUT.append(str);
    has_parens = str[str.length - 1] == "(";
    current_pos += str.length;
    var a = str.split(/\r?\n/), n = a.length - 1;
    current_line += n;
    current_col += a[0].length;
    if (n > 0) {
      ensure_line_len();
      current_col = a[n].length;
    }
    last = str;
  }
  var star = function() {
    print("*");
  };
  var space = options.beautify ? function() {
    print(" ");
  } : function() {
    might_need_space = true;
  };
  var indent = options.beautify ? function(half) {
    if (options.beautify) {
      print(make_indent(half ? 0.5 : 0));
    }
  } : noop;
  var with_indent = options.beautify ? function(col, cont) {
    if (col === true)
      col = next_indent();
    var save_indentation = indentation;
    indentation = col;
    var ret = cont();
    indentation = save_indentation;
    return ret;
  } : function(col, cont) {
    return cont();
  };
  var newline = options.beautify ? function() {
    if (newline_insert < 0)
      return print(`
`);
    if (OUTPUT.charAt(newline_insert) != `
`) {
      OUTPUT.insertAt(`
`, newline_insert);
      current_pos++;
      current_line++;
    }
    newline_insert++;
  } : options.max_line_len ? function() {
    ensure_line_len();
    might_add_newline = OUTPUT.length();
  } : noop;
  var semicolon = options.beautify ? function() {
    print(";");
  } : function() {
    might_need_semicolon = true;
  };
  function force_semicolon() {
    might_need_semicolon = false;
    print(";");
  }
  function next_indent() {
    return indentation + options.indent_level;
  }
  function with_block(cont) {
    var ret;
    print("{");
    newline();
    with_indent(next_indent(), function() {
      ret = cont();
    });
    indent();
    print("}");
    return ret;
  }
  function with_parens(cont) {
    print("(");
    var ret = cont();
    print(")");
    return ret;
  }
  function with_square(cont) {
    print("[");
    var ret = cont();
    print("]");
    return ret;
  }
  function comma() {
    print(",");
    space();
  }
  function colon() {
    print(":");
    space();
  }
  var add_mapping = mappings ? function(token, name) {
    mapping_token = token;
    mapping_name = name;
  } : noop;
  function get() {
    if (might_add_newline) {
      ensure_line_len();
    }
    return OUTPUT.toString();
  }
  function filter_comment(comment) {
    if (!options.preserve_annotations) {
      comment = comment.replace(r_annotation, " ");
    }
    if (/^\s*$/.test(comment)) {
      return "";
    }
    return comment.replace(/(<\s*\/\s*)(script)/i, "<\\/$2");
  }
  function prepend_comments(node) {
    var self2 = this;
    var start = node.start;
    if (!start)
      return;
    var printed_comments2 = self2.printed_comments;
    const keyword_with_value = node instanceof AST_Exit && node.value || (node instanceof AST_Await || node instanceof AST_Yield) && node.expression;
    if (start.comments_before && printed_comments2.has(start.comments_before)) {
      if (keyword_with_value) {
        start.comments_before = [];
      } else {
        return;
      }
    }
    var comments = start.comments_before;
    if (!comments) {
      comments = start.comments_before = [];
    }
    printed_comments2.add(comments);
    if (keyword_with_value) {
      var tw = new TreeWalker(function(node2) {
        var parent = tw.parent();
        if (parent instanceof AST_Exit || parent instanceof AST_Await || parent instanceof AST_Yield || parent instanceof AST_Binary && parent.left === node2 || parent.TYPE == "Call" && parent.expression === node2 || parent instanceof AST_Conditional && parent.condition === node2 || parent instanceof AST_Dot && parent.expression === node2 || parent instanceof AST_Sequence && parent.expressions[0] === node2 || parent instanceof AST_Sub && parent.expression === node2 || parent instanceof AST_UnaryPostfix) {
          if (!node2.start)
            return;
          var text = node2.start.comments_before;
          if (text && !printed_comments2.has(text)) {
            printed_comments2.add(text);
            comments = comments.concat(text);
          }
        } else {
          return true;
        }
      });
      tw.push(node);
      keyword_with_value.walk(tw);
    }
    if (current_pos == 0) {
      if (comments.length > 0 && options.shebang && comments[0].type === "comment5" && !printed_comments2.has(comments[0])) {
        print("#!" + comments.shift().value + `
`);
        indent();
      }
      var preamble = options.preamble;
      if (preamble) {
        print(preamble.replace(/\r\n?|[\n\u2028\u2029]|\s*$/g, `
`));
      }
    }
    comments = comments.filter(comment_filter, node).filter((c) => !printed_comments2.has(c));
    if (comments.length == 0)
      return;
    var last_nlb = OUTPUT.hasNLB();
    comments.forEach(function(c, i) {
      printed_comments2.add(c);
      if (!last_nlb) {
        if (c.nlb) {
          print(`
`);
          indent();
          last_nlb = true;
        } else if (i > 0) {
          space();
        }
      }
      if (/comment[134]/.test(c.type)) {
        var value = filter_comment(c.value);
        if (value) {
          print("//" + value + `
`);
          indent();
        }
        last_nlb = true;
      } else if (c.type == "comment2") {
        var value = filter_comment(c.value);
        if (value) {
          print("/*" + value + "*/");
        }
        last_nlb = false;
      }
    });
    if (!last_nlb) {
      if (start.nlb) {
        print(`
`);
        indent();
      } else {
        space();
      }
    }
  }
  function append_comments(node, tail) {
    var self2 = this;
    var token = node.end;
    if (!token)
      return;
    var printed_comments2 = self2.printed_comments;
    var comments = token[tail ? "comments_before" : "comments_after"];
    if (!comments || printed_comments2.has(comments))
      return;
    if (!(node instanceof AST_Statement || comments.every((c) => !/comment[134]/.test(c.type))))
      return;
    printed_comments2.add(comments);
    var insert = OUTPUT.length();
    comments.filter(comment_filter, node).forEach(function(c, i) {
      if (printed_comments2.has(c))
        return;
      printed_comments2.add(c);
      need_space = false;
      if (need_newline_indented) {
        print(`
`);
        indent();
        need_newline_indented = false;
      } else if (c.nlb && (i > 0 || !OUTPUT.hasNLB())) {
        print(`
`);
        indent();
      } else if (i > 0 || !tail) {
        space();
      }
      if (/comment[134]/.test(c.type)) {
        const value = filter_comment(c.value);
        if (value) {
          print("//" + value);
        }
        need_newline_indented = true;
      } else if (c.type == "comment2") {
        const value = filter_comment(c.value);
        if (value) {
          print("/*" + value + "*/");
        }
        need_space = true;
      }
    });
    if (OUTPUT.length() > insert)
      newline_insert = insert;
  }
  const gc_scope = options["_destroy_ast"] ? function gc_scope(scope) {
    scope.body.length = 0;
    scope.argnames.length = 0;
  } : noop;
  var stack = [];
  return {
    get,
    toString: get,
    indent,
    in_directive: false,
    use_asm: null,
    active_scope: null,
    indentation: function() {
      return indentation;
    },
    current_width: function() {
      return current_col - indentation;
    },
    should_break: function() {
      return options.width && this.current_width() >= options.width;
    },
    has_parens: function() {
      return has_parens;
    },
    newline,
    print,
    star,
    space,
    comma,
    colon,
    last: function() {
      return last;
    },
    semicolon,
    force_semicolon,
    to_utf8,
    print_name: function(name) {
      print(make_name(name));
    },
    print_string: function(str, quote, escape_directive) {
      var encoded = encode_string(str, quote);
      if (escape_directive === true && !encoded.includes("\\")) {
        if (!OUTPUT.expectDirective()) {
          force_semicolon();
        }
        force_semicolon();
      }
      print(encoded);
    },
    print_template_string_chars: function(str) {
      var encoded = encode_string(str, "`").replace(/\${/g, "\\${");
      return print(encoded.substr(1, encoded.length - 2));
    },
    encode_string,
    next_indent,
    with_indent,
    with_block,
    with_parens,
    with_square,
    add_mapping,
    option: function(opt) {
      return options[opt];
    },
    gc_scope,
    printed_comments,
    prepend_comments: readonly ? noop : prepend_comments,
    append_comments: readonly || comment_filter === return_false ? noop : append_comments,
    line: function() {
      return current_line;
    },
    col: function() {
      return current_col;
    },
    pos: function() {
      return current_pos;
    },
    push_node: function(node) {
      stack.push(node);
    },
    pop_node: function() {
      return stack.pop();
    },
    parent: function(n) {
      return stack[stack.length - 2 - (n || 0)];
    }
  };
}
(function() {
  function DEFPRINT(nodetype, generator) {
    nodetype.DEFMETHOD("_codegen", generator);
  }
  AST_Node.DEFMETHOD("print", function(output, force_parens) {
    var self2 = this, generator = self2._codegen;
    if (self2 instanceof AST_Scope) {
      output.active_scope = self2;
    } else if (!output.use_asm && self2 instanceof AST_Directive && self2.value == "use asm") {
      output.use_asm = output.active_scope;
    }
    function doit() {
      output.prepend_comments(self2);
      self2.add_source_map(output);
      generator(self2, output);
      output.append_comments(self2);
    }
    output.push_node(self2);
    if (force_parens || self2.needs_parens(output)) {
      output.with_parens(doit);
    } else {
      doit();
    }
    output.pop_node();
    if (self2 === output.use_asm) {
      output.use_asm = null;
    }
  });
  AST_Node.DEFMETHOD("_print", AST_Node.prototype.print);
  AST_Node.DEFMETHOD("print_to_string", function(options) {
    var output = OutputStream(options);
    this.print(output);
    return output.get();
  });
  function PARENS(nodetype, func) {
    if (Array.isArray(nodetype)) {
      nodetype.forEach(function(nodetype2) {
        PARENS(nodetype2, func);
      });
    } else {
      nodetype.DEFMETHOD("needs_parens", func);
    }
  }
  PARENS(AST_Node, return_false);
  PARENS(AST_Function, function(output) {
    if (!output.has_parens() && first_in_statement(output)) {
      return true;
    }
    if (output.option("webkit")) {
      var p = output.parent();
      if (p instanceof AST_PropAccess && p.expression === this) {
        return true;
      }
    }
    if (output.option("wrap_iife")) {
      var p = output.parent();
      if (p instanceof AST_Call && p.expression === this) {
        return true;
      }
    }
    if (output.option("wrap_func_args")) {
      var p = output.parent();
      if (p instanceof AST_Call && p.args.includes(this)) {
        return true;
      }
    }
    return false;
  });
  PARENS(AST_Arrow, function(output) {
    var p = output.parent();
    if (output.option("wrap_func_args") && p instanceof AST_Call && p.args.includes(this)) {
      return true;
    }
    return p instanceof AST_PropAccess && p.expression === this || p instanceof AST_Conditional && p.condition === this;
  });
  PARENS(AST_Object, function(output) {
    return !output.has_parens() && first_in_statement(output);
  });
  PARENS(AST_ClassExpression, first_in_statement);
  PARENS(AST_Unary, function(output) {
    var p = output.parent();
    return p instanceof AST_PropAccess && p.expression === this || p instanceof AST_Call && p.expression === this || p instanceof AST_Binary && p.operator === "**" && this instanceof AST_UnaryPrefix && p.left === this && this.operator !== "++" && this.operator !== "--";
  });
  PARENS(AST_Await, function(output) {
    var p = output.parent();
    return p instanceof AST_PropAccess && p.expression === this || p instanceof AST_Call && p.expression === this || p instanceof AST_Binary && p.operator === "**" && p.left === this || output.option("safari10") && p instanceof AST_UnaryPrefix;
  });
  PARENS(AST_Sequence, function(output) {
    var p = output.parent();
    return p instanceof AST_Call || p instanceof AST_Unary || p instanceof AST_Binary || p instanceof AST_VarDef || p instanceof AST_PropAccess || p instanceof AST_Array || p instanceof AST_ObjectProperty || p instanceof AST_Conditional || p instanceof AST_Arrow || p instanceof AST_DefaultAssign || p instanceof AST_Expansion || p instanceof AST_ForOf && this === p.object || p instanceof AST_Yield || p instanceof AST_Export;
  });
  PARENS(AST_Binary, function(output) {
    var p = output.parent();
    if (p instanceof AST_Call && p.expression === this)
      return true;
    if (p instanceof AST_Unary)
      return true;
    if (p instanceof AST_PropAccess && p.expression === this)
      return true;
    if (p instanceof AST_Binary) {
      const parent_op = p.operator;
      const op = this.operator;
      if (op === "??" && (parent_op === "||" || parent_op === "&&")) {
        return true;
      }
      if (parent_op === "??" && (op === "||" || op === "&&")) {
        return true;
      }
      const pp = PRECEDENCE[parent_op];
      const sp = PRECEDENCE[op];
      if (pp > sp || pp == sp && (this === p.right || parent_op == "**")) {
        return true;
      }
    }
    if (p instanceof AST_PrivateIn) {
      const op = this.operator;
      const pp = PRECEDENCE["in"];
      const sp = PRECEDENCE[op];
      if (pp > sp || pp == sp && this === p.value) {
        return true;
      }
    }
  });
  PARENS(AST_PrivateIn, function(output) {
    var p = output.parent();
    if (p instanceof AST_Call && p.expression === this) {
      return true;
    }
    if (p instanceof AST_Unary) {
      return true;
    }
    if (p instanceof AST_PropAccess && p.expression === this) {
      return true;
    }
    if (p instanceof AST_Binary) {
      const parent_op = p.operator;
      const pp = PRECEDENCE[parent_op];
      const sp = PRECEDENCE["in"];
      if (pp > sp || pp == sp && (this === p.right || parent_op == "**")) {
        return true;
      }
    }
    if (p instanceof AST_PrivateIn && this === p.value) {
      return true;
    }
  });
  PARENS(AST_Yield, function(output) {
    var p = output.parent();
    if (p instanceof AST_Binary && p.operator !== "=")
      return true;
    if (p instanceof AST_Call && p.expression === this)
      return true;
    if (p instanceof AST_Conditional && p.condition === this)
      return true;
    if (p instanceof AST_Unary)
      return true;
    if (p instanceof AST_PropAccess && p.expression === this)
      return true;
  });
  PARENS(AST_Chain, function(output) {
    var p = output.parent();
    if (!(p instanceof AST_Call || p instanceof AST_PropAccess))
      return false;
    return p.expression === this;
  });
  PARENS(AST_PropAccess, function(output) {
    var p = output.parent();
    if (p instanceof AST_New && p.expression === this) {
      return walk(this, (node) => {
        if (node instanceof AST_Scope)
          return true;
        if (node instanceof AST_Call) {
          return walk_abort;
        }
      });
    }
  });
  PARENS(AST_Call, function(output) {
    var p = output.parent(), p1;
    if (p instanceof AST_New && p.expression === this || p instanceof AST_Export && p.is_default && this.expression instanceof AST_Function)
      return true;
    return this.expression instanceof AST_Function && p instanceof AST_PropAccess && p.expression === this && (p1 = output.parent(1)) instanceof AST_Assign && p1.left === p;
  });
  PARENS(AST_New, function(output) {
    var p = output.parent();
    if (this.args.length === 0 && (p instanceof AST_PropAccess || p instanceof AST_Call && p.expression === this || p instanceof AST_PrefixedTemplateString && p.prefix === this))
      return true;
  });
  PARENS(AST_Number, function(output) {
    var p = output.parent();
    if (p instanceof AST_PropAccess && p.expression === this) {
      var value = this.getValue();
      if (value < 0 || /^0/.test(make_num(value))) {
        return true;
      }
    }
  });
  PARENS(AST_BigInt, function(output) {
    var p = output.parent();
    if (p instanceof AST_PropAccess && p.expression === this) {
      var value = this.getValue();
      if (value.startsWith("-")) {
        return true;
      }
    }
  });
  PARENS([AST_Assign, AST_Conditional], function(output) {
    var p = output.parent();
    if (p instanceof AST_Unary)
      return true;
    if (p instanceof AST_Binary && !(p instanceof AST_Assign))
      return true;
    if (p instanceof AST_Call && p.expression === this)
      return true;
    if (p instanceof AST_Conditional && p.condition === this)
      return true;
    if (p instanceof AST_PropAccess && p.expression === this)
      return true;
    if (this instanceof AST_Assign && this.left instanceof AST_Destructuring && this.left.is_array === false)
      return true;
  });
  DEFPRINT(AST_Directive, function(self2, output) {
    output.print_string(self2.value, self2.quote);
    output.semicolon();
  });
  DEFPRINT(AST_Expansion, function(self2, output) {
    output.print("...");
    self2.expression.print(output);
  });
  DEFPRINT(AST_Destructuring, function(self2, output) {
    output.print(self2.is_array ? "[" : "{");
    var len = self2.names.length;
    self2.names.forEach(function(name, i) {
      if (i > 0)
        output.comma();
      name.print(output);
      if (i == len - 1 && name instanceof AST_Hole)
        output.comma();
    });
    output.print(self2.is_array ? "]" : "}");
  });
  DEFPRINT(AST_Debugger, function(self2, output) {
    output.print("debugger");
    output.semicolon();
  });
  function display_body(body, is_toplevel, output, allow_directives) {
    var last = body.length - 1;
    output.in_directive = allow_directives;
    body.forEach(function(stmt, i) {
      if (output.in_directive === true && !(stmt instanceof AST_Directive || stmt instanceof AST_EmptyStatement || stmt instanceof AST_SimpleStatement && stmt.body instanceof AST_String)) {
        output.in_directive = false;
      }
      if (!(stmt instanceof AST_EmptyStatement)) {
        output.indent();
        stmt.print(output);
        if (!(i == last && is_toplevel)) {
          output.newline();
          if (is_toplevel)
            output.newline();
        }
      }
      if (output.in_directive === true && stmt instanceof AST_SimpleStatement && stmt.body instanceof AST_String) {
        output.in_directive = false;
      }
    });
    output.in_directive = false;
  }
  AST_StatementWithBody.DEFMETHOD("_do_print_body", function(output) {
    print_maybe_braced_body(this.body, output);
  });
  DEFPRINT(AST_Statement, function(self2, output) {
    self2.body.print(output);
    output.semicolon();
  });
  DEFPRINT(AST_Toplevel, function(self2, output) {
    display_body(self2.body, true, output, true);
    output.print("");
  });
  DEFPRINT(AST_LabeledStatement, function(self2, output) {
    self2.label.print(output);
    output.colon();
    self2.body.print(output);
  });
  DEFPRINT(AST_SimpleStatement, function(self2, output) {
    self2.body.print(output);
    output.semicolon();
  });
  function print_braced_empty(self2, output) {
    output.print("{");
    output.with_indent(output.next_indent(), function() {
      output.append_comments(self2, true);
    });
    output.add_mapping(self2.end);
    output.print("}");
  }
  function print_braced(self2, output, allow_directives) {
    if (self2.body.length > 0) {
      output.with_block(function() {
        display_body(self2.body, false, output, allow_directives);
        output.add_mapping(self2.end);
      });
    } else
      print_braced_empty(self2, output);
  }
  DEFPRINT(AST_BlockStatement, function(self2, output) {
    print_braced(self2, output);
  });
  DEFPRINT(AST_EmptyStatement, function(self2, output) {
    output.semicolon();
  });
  DEFPRINT(AST_Do, function(self2, output) {
    output.print("do");
    output.space();
    make_block(self2.body, output);
    output.space();
    output.print("while");
    output.space();
    output.with_parens(function() {
      self2.condition.print(output);
    });
    output.semicolon();
  });
  DEFPRINT(AST_While, function(self2, output) {
    output.print("while");
    output.space();
    output.with_parens(function() {
      self2.condition.print(output);
    });
    output.space();
    self2._do_print_body(output);
  });
  DEFPRINT(AST_For, function(self2, output) {
    output.print("for");
    output.space();
    output.with_parens(function() {
      if (self2.init) {
        if (self2.init instanceof AST_Definitions) {
          self2.init.print(output);
        } else {
          parenthesize_for_noin(self2.init, output, true);
        }
        output.print(";");
        output.space();
      } else {
        output.print(";");
      }
      if (self2.condition) {
        self2.condition.print(output);
        output.print(";");
        output.space();
      } else {
        output.print(";");
      }
      if (self2.step) {
        self2.step.print(output);
      }
    });
    output.space();
    self2._do_print_body(output);
  });
  DEFPRINT(AST_ForIn, function(self2, output) {
    output.print("for");
    if (self2.await) {
      output.space();
      output.print("await");
    }
    output.space();
    output.with_parens(function() {
      self2.init.print(output);
      output.space();
      output.print(self2 instanceof AST_ForOf ? "of" : "in");
      output.space();
      self2.object.print(output);
    });
    output.space();
    self2._do_print_body(output);
  });
  DEFPRINT(AST_With, function(self2, output) {
    output.print("with");
    output.space();
    output.with_parens(function() {
      self2.expression.print(output);
    });
    output.space();
    self2._do_print_body(output);
  });
  AST_Lambda.DEFMETHOD("_do_print", function(output, nokeyword) {
    var self2 = this;
    if (!nokeyword) {
      if (self2.async) {
        output.print("async");
        output.space();
      }
      output.print("function");
      if (self2.is_generator) {
        output.star();
      }
      if (self2.name) {
        output.space();
      }
    }
    if (self2.name instanceof AST_Symbol) {
      self2.name.print(output);
    } else if (nokeyword && self2.name instanceof AST_Node) {
      output.with_square(function() {
        self2.name.print(output);
      });
    }
    output.with_parens(function() {
      self2.argnames.forEach(function(arg, i) {
        if (i)
          output.comma();
        arg.print(output);
      });
    });
    output.space();
    print_braced(self2, output, true);
  });
  DEFPRINT(AST_Lambda, function(self2, output) {
    self2._do_print(output);
    output.gc_scope(self2);
  });
  DEFPRINT(AST_PrefixedTemplateString, function(self2, output) {
    var tag = self2.prefix;
    var parenthesize_tag = tag instanceof AST_Lambda || tag instanceof AST_Binary || tag instanceof AST_Conditional || tag instanceof AST_Sequence || tag instanceof AST_Unary || tag instanceof AST_Dot && tag.expression instanceof AST_Object;
    if (parenthesize_tag)
      output.print("(");
    self2.prefix.print(output);
    if (parenthesize_tag)
      output.print(")");
    self2.template_string.print(output);
  });
  DEFPRINT(AST_TemplateString, function(self2, output) {
    var is_tagged = output.parent() instanceof AST_PrefixedTemplateString;
    output.print("`");
    for (var i = 0;i < self2.segments.length; i++) {
      if (!(self2.segments[i] instanceof AST_TemplateSegment)) {
        output.print("${");
        self2.segments[i].print(output);
        output.print("}");
      } else if (is_tagged) {
        output.print(self2.segments[i].raw);
      } else {
        output.print_template_string_chars(self2.segments[i].value);
      }
    }
    output.print("`");
  });
  DEFPRINT(AST_TemplateSegment, function(self2, output) {
    output.print_template_string_chars(self2.value);
  });
  AST_Arrow.DEFMETHOD("_do_print", function(output) {
    var self2 = this;
    var parent = output.parent();
    var needs_parens = parent instanceof AST_Binary && !(parent instanceof AST_Assign) && !(parent instanceof AST_DefaultAssign) || parent instanceof AST_Unary || parent instanceof AST_Call && self2 === parent.expression;
    if (needs_parens) {
      output.print("(");
    }
    if (self2.async) {
      output.print("async");
      output.space();
    }
    if (self2.argnames.length === 1 && self2.argnames[0] instanceof AST_Symbol) {
      self2.argnames[0].print(output);
    } else {
      output.with_parens(function() {
        self2.argnames.forEach(function(arg, i) {
          if (i)
            output.comma();
          arg.print(output);
        });
      });
    }
    output.space();
    output.print("=>");
    output.space();
    const first_statement = self2.body[0];
    if (self2.body.length === 1 && first_statement instanceof AST_Return) {
      const returned = first_statement.value;
      if (!returned) {
        output.print("{}");
      } else if (left_is_object(returned)) {
        output.print("(");
        returned.print(output);
        output.print(")");
      } else {
        returned.print(output);
      }
    } else {
      print_braced(self2, output);
    }
    if (needs_parens) {
      output.print(")");
    }
    output.gc_scope(self2);
  });
  AST_Exit.DEFMETHOD("_do_print", function(output, kind) {
    output.print(kind);
    if (this.value) {
      output.space();
      const comments = this.value.start.comments_before;
      if (comments && comments.length && !output.printed_comments.has(comments)) {
        output.print("(");
        this.value.print(output);
        output.print(")");
      } else {
        this.value.print(output);
      }
    }
    output.semicolon();
  });
  DEFPRINT(AST_Return, function(self2, output) {
    self2._do_print(output, "return");
  });
  DEFPRINT(AST_Throw, function(self2, output) {
    self2._do_print(output, "throw");
  });
  DEFPRINT(AST_Yield, function(self2, output) {
    var star = self2.is_star ? "*" : "";
    output.print("yield" + star);
    if (self2.expression) {
      output.space();
      self2.expression.print(output);
    }
  });
  DEFPRINT(AST_Await, function(self2, output) {
    output.print("await");
    output.space();
    var e = self2.expression;
    var parens = !(e instanceof AST_Call || e instanceof AST_SymbolRef || e instanceof AST_PropAccess || e instanceof AST_Unary || e instanceof AST_Constant || e instanceof AST_Await || e instanceof AST_Object);
    if (parens)
      output.print("(");
    self2.expression.print(output);
    if (parens)
      output.print(")");
  });
  AST_LoopControl.DEFMETHOD("_do_print", function(output, kind) {
    output.print(kind);
    if (this.label) {
      output.space();
      this.label.print(output);
    }
    output.semicolon();
  });
  DEFPRINT(AST_Break, function(self2, output) {
    self2._do_print(output, "break");
  });
  DEFPRINT(AST_Continue, function(self2, output) {
    self2._do_print(output, "continue");
  });
  function make_then(self2, output) {
    var b = self2.body;
    if (output.option("braces") || output.option("ie8") && b instanceof AST_Do)
      return make_block(b, output);
    if (!b)
      return output.force_semicolon();
    while (true) {
      if (b instanceof AST_If) {
        if (!b.alternative) {
          make_block(self2.body, output);
          return;
        }
        b = b.alternative;
      } else if (b instanceof AST_StatementWithBody) {
        b = b.body;
      } else
        break;
    }
    print_maybe_braced_body(self2.body, output);
  }
  DEFPRINT(AST_If, function(self2, output) {
    output.print("if");
    output.space();
    output.with_parens(function() {
      self2.condition.print(output);
    });
    output.space();
    if (self2.alternative) {
      make_then(self2, output);
      output.space();
      output.print("else");
      output.space();
      if (self2.alternative instanceof AST_If)
        self2.alternative.print(output);
      else
        print_maybe_braced_body(self2.alternative, output);
    } else {
      self2._do_print_body(output);
    }
  });
  DEFPRINT(AST_Switch, function(self2, output) {
    output.print("switch");
    output.space();
    output.with_parens(function() {
      self2.expression.print(output);
    });
    output.space();
    var last = self2.body.length - 1;
    if (last < 0)
      print_braced_empty(self2, output);
    else
      output.with_block(function() {
        self2.body.forEach(function(branch, i) {
          output.indent(true);
          branch.print(output);
          if (i < last && branch.body.length > 0)
            output.newline();
        });
      });
  });
  AST_SwitchBranch.DEFMETHOD("_do_print_body", function(output) {
    output.newline();
    this.body.forEach(function(stmt) {
      output.indent();
      stmt.print(output);
      output.newline();
    });
  });
  DEFPRINT(AST_Default, function(self2, output) {
    output.print("default:");
    self2._do_print_body(output);
  });
  DEFPRINT(AST_Case, function(self2, output) {
    output.print("case");
    output.space();
    self2.expression.print(output);
    output.print(":");
    self2._do_print_body(output);
  });
  DEFPRINT(AST_Try, function(self2, output) {
    output.print("try");
    output.space();
    self2.body.print(output);
    if (self2.bcatch) {
      output.space();
      self2.bcatch.print(output);
    }
    if (self2.bfinally) {
      output.space();
      self2.bfinally.print(output);
    }
  });
  DEFPRINT(AST_TryBlock, function(self2, output) {
    print_braced(self2, output);
  });
  DEFPRINT(AST_Catch, function(self2, output) {
    output.print("catch");
    if (self2.argname) {
      output.space();
      output.with_parens(function() {
        self2.argname.print(output);
      });
    }
    output.space();
    print_braced(self2, output);
  });
  DEFPRINT(AST_Finally, function(self2, output) {
    output.print("finally");
    output.space();
    print_braced(self2, output);
  });
  AST_Definitions.DEFMETHOD("_do_print", function(output, kind) {
    output.print(kind);
    output.space();
    this.definitions.forEach(function(def, i) {
      if (i)
        output.comma();
      def.print(output);
    });
    var p = output.parent();
    var in_for = p instanceof AST_For || p instanceof AST_ForIn;
    var output_semicolon = !in_for || p && p.init !== this;
    if (output_semicolon)
      output.semicolon();
  });
  DEFPRINT(AST_Let, function(self2, output) {
    self2._do_print(output, "let");
  });
  DEFPRINT(AST_Var, function(self2, output) {
    self2._do_print(output, "var");
  });
  DEFPRINT(AST_Const, function(self2, output) {
    self2._do_print(output, "const");
  });
  DEFPRINT(AST_Import, function(self2, output) {
    output.print("import");
    output.space();
    if (self2.imported_name) {
      self2.imported_name.print(output);
    }
    if (self2.imported_name && self2.imported_names) {
      output.print(",");
      output.space();
    }
    if (self2.imported_names) {
      if (self2.imported_names.length === 1 && self2.imported_names[0].foreign_name.name === "*" && !self2.imported_names[0].foreign_name.quote) {
        self2.imported_names[0].print(output);
      } else {
        output.print("{");
        self2.imported_names.forEach(function(name_import, i) {
          output.space();
          name_import.print(output);
          if (i < self2.imported_names.length - 1) {
            output.print(",");
          }
        });
        output.space();
        output.print("}");
      }
    }
    if (self2.imported_name || self2.imported_names) {
      output.space();
      output.print("from");
      output.space();
    }
    self2.module_name.print(output);
    if (self2.attributes) {
      output.print("with");
      self2.attributes.print(output);
    }
    output.semicolon();
  });
  DEFPRINT(AST_ImportMeta, function(self2, output) {
    output.print("import.meta");
  });
  DEFPRINT(AST_NameMapping, function(self2, output) {
    var is_import = output.parent() instanceof AST_Import;
    var definition = self2.name.definition();
    var foreign_name = self2.foreign_name;
    var names_are_different = (definition && definition.mangled_name || self2.name.name) !== foreign_name.name;
    if (!names_are_different && foreign_name.name === "*" && !!foreign_name.quote != !!self2.name.quote) {
      names_are_different = true;
    }
    var foreign_name_is_name = !foreign_name.quote;
    if (names_are_different) {
      if (is_import) {
        if (foreign_name_is_name) {
          output.print(foreign_name.name);
        } else {
          output.print_string(foreign_name.name, foreign_name.quote);
        }
      } else {
        if (!self2.name.quote) {
          self2.name.print(output);
        } else {
          output.print_string(self2.name.name, self2.name.quote);
        }
      }
      output.space();
      output.print("as");
      output.space();
      if (is_import) {
        self2.name.print(output);
      } else {
        if (foreign_name_is_name) {
          output.print(foreign_name.name);
        } else {
          output.print_string(foreign_name.name, foreign_name.quote);
        }
      }
    } else {
      if (!self2.name.quote) {
        self2.name.print(output);
      } else {
        output.print_string(self2.name.name, self2.name.quote);
      }
    }
  });
  DEFPRINT(AST_Export, function(self2, output) {
    output.print("export");
    output.space();
    if (self2.is_default) {
      output.print("default");
      output.space();
    }
    if (self2.exported_names) {
      if (self2.exported_names.length === 1 && self2.exported_names[0].name.name === "*" && !self2.exported_names[0].name.quote) {
        self2.exported_names[0].print(output);
      } else {
        output.print("{");
        self2.exported_names.forEach(function(name_export, i) {
          output.space();
          name_export.print(output);
          if (i < self2.exported_names.length - 1) {
            output.print(",");
          }
        });
        output.space();
        output.print("}");
      }
    } else if (self2.exported_value) {
      self2.exported_value.print(output);
    } else if (self2.exported_definition) {
      self2.exported_definition.print(output);
      if (self2.exported_definition instanceof AST_Definitions)
        return;
    }
    if (self2.module_name) {
      output.space();
      output.print("from");
      output.space();
      self2.module_name.print(output);
    }
    if (self2.attributes) {
      output.print("with");
      self2.attributes.print(output);
    }
    if (self2.exported_value && !(self2.exported_value instanceof AST_Defun || self2.exported_value instanceof AST_Function || self2.exported_value instanceof AST_Class) || self2.module_name || self2.exported_names) {
      output.semicolon();
    }
  });
  function parenthesize_for_noin(node, output, noin) {
    var parens = false;
    if (noin) {
      parens = walk(node, (node2) => {
        if (node2 instanceof AST_Scope && !(node2 instanceof AST_Arrow)) {
          return true;
        }
        if (node2 instanceof AST_Binary && node2.operator == "in" || node2 instanceof AST_PrivateIn) {
          return walk_abort;
        }
      });
    }
    node.print(output, parens);
  }
  DEFPRINT(AST_VarDef, function(self2, output) {
    self2.name.print(output);
    if (self2.value) {
      output.space();
      output.print("=");
      output.space();
      var p = output.parent(1);
      var noin = p instanceof AST_For || p instanceof AST_ForIn;
      parenthesize_for_noin(self2.value, output, noin);
    }
  });
  DEFPRINT(AST_Call, function(self2, output) {
    self2.expression.print(output);
    if (self2 instanceof AST_New && self2.args.length === 0)
      return;
    if (self2.expression instanceof AST_Call || self2.expression instanceof AST_Lambda) {
      output.add_mapping(self2.start);
    }
    if (self2.optional)
      output.print("?.");
    output.with_parens(function() {
      self2.args.forEach(function(expr, i) {
        if (i)
          output.comma();
        expr.print(output);
      });
    });
  });
  DEFPRINT(AST_New, function(self2, output) {
    output.print("new");
    output.space();
    AST_Call.prototype._codegen(self2, output);
  });
  AST_Sequence.DEFMETHOD("_do_print", function(output) {
    this.expressions.forEach(function(node, index) {
      if (index > 0) {
        output.comma();
        if (output.should_break()) {
          output.newline();
          output.indent();
        }
      }
      node.print(output);
    });
  });
  DEFPRINT(AST_Sequence, function(self2, output) {
    self2._do_print(output);
  });
  DEFPRINT(AST_Dot, function(self2, output) {
    var expr = self2.expression;
    expr.print(output);
    var prop = self2.property;
    var print_computed = ALL_RESERVED_WORDS.has(prop) ? output.option("ie8") : !is_identifier_string(prop, output.option("ecma") >= 2015 && !output.option("safari10"));
    if (self2.optional)
      output.print("?.");
    if (print_computed) {
      output.print("[");
      output.add_mapping(self2.end);
      output.print_string(prop);
      output.print("]");
    } else {
      if (expr instanceof AST_Number && expr.getValue() >= 0) {
        if (!/[xa-f.)]/i.test(output.last())) {
          output.print(".");
        }
      }
      if (!self2.optional)
        output.print(".");
      output.add_mapping(self2.end);
      output.print_name(prop);
    }
  });
  DEFPRINT(AST_DotHash, function(self2, output) {
    var expr = self2.expression;
    expr.print(output);
    var prop = self2.property;
    if (self2.optional)
      output.print("?");
    output.print(".#");
    output.add_mapping(self2.end);
    output.print_name(prop);
  });
  DEFPRINT(AST_Sub, function(self2, output) {
    self2.expression.print(output);
    if (self2.optional)
      output.print("?.");
    output.print("[");
    self2.property.print(output);
    output.print("]");
  });
  DEFPRINT(AST_Chain, function(self2, output) {
    self2.expression.print(output);
  });
  DEFPRINT(AST_UnaryPrefix, function(self2, output) {
    var op = self2.operator;
    if (op === "--" && output.last().endsWith("!")) {
      output.print(" ");
    }
    output.print(op);
    if (/^[a-z]/i.test(op) || /[+-]$/.test(op) && self2.expression instanceof AST_UnaryPrefix && /^[+-]/.test(self2.expression.operator)) {
      output.space();
    }
    self2.expression.print(output);
  });
  DEFPRINT(AST_UnaryPostfix, function(self2, output) {
    self2.expression.print(output);
    output.print(self2.operator);
  });
  DEFPRINT(AST_Binary, function(self2, output) {
    var op = self2.operator;
    self2.left.print(output);
    if (op[0] == ">" && output.last().endsWith("--")) {
      output.print(" ");
    } else {
      output.space();
    }
    output.print(op);
    output.space();
    self2.right.print(output);
  });
  DEFPRINT(AST_Conditional, function(self2, output) {
    self2.condition.print(output);
    output.space();
    output.print("?");
    output.space();
    self2.consequent.print(output);
    output.space();
    output.colon();
    self2.alternative.print(output);
  });
  DEFPRINT(AST_Array, function(self2, output) {
    output.with_square(function() {
      var a = self2.elements, len = a.length;
      if (len > 0)
        output.space();
      a.forEach(function(exp, i) {
        if (i)
          output.comma();
        exp.print(output);
        if (i === len - 1 && exp instanceof AST_Hole)
          output.comma();
      });
      if (len > 0)
        output.space();
    });
  });
  DEFPRINT(AST_Object, function(self2, output) {
    if (self2.properties.length > 0)
      output.with_block(function() {
        self2.properties.forEach(function(prop, i) {
          if (i) {
            output.print(",");
            output.newline();
          }
          output.indent();
          prop.print(output);
        });
        output.newline();
      });
    else
      print_braced_empty(self2, output);
  });
  DEFPRINT(AST_Class, function(self2, output) {
    output.print("class");
    output.space();
    if (self2.name) {
      self2.name.print(output);
      output.space();
    }
    if (self2.extends) {
      var parens = !(self2.extends instanceof AST_SymbolRef) && !(self2.extends instanceof AST_PropAccess) && !(self2.extends instanceof AST_ClassExpression) && !(self2.extends instanceof AST_Function);
      output.print("extends");
      if (parens) {
        output.print("(");
      } else {
        output.space();
      }
      self2.extends.print(output);
      if (parens) {
        output.print(")");
      } else {
        output.space();
      }
    }
    if (self2.properties.length > 0)
      output.with_block(function() {
        self2.properties.forEach(function(prop, i) {
          if (i) {
            output.newline();
          }
          output.indent();
          prop.print(output);
        });
        output.newline();
      });
    else
      output.print("{}");
  });
  DEFPRINT(AST_NewTarget, function(self2, output) {
    output.print("new.target");
  });
  function print_property_name(key, quote, output) {
    if (output.option("quote_keys")) {
      output.print_string(key);
      return false;
    }
    if ("" + +key == key && key >= 0) {
      if (output.option("keep_numbers")) {
        output.print(key);
        return false;
      }
      output.print(make_num(key));
      return false;
    }
    var print_string = ALL_RESERVED_WORDS.has(key) ? output.option("ie8") : output.option("ecma") < 2015 || output.option("safari10") ? !is_basic_identifier_string(key) : !is_identifier_string(key, true);
    if (print_string || quote && output.option("keep_quoted_props")) {
      output.print_string(key, quote);
      return false;
    }
    output.print_name(key);
    return true;
  }
  DEFPRINT(AST_ObjectKeyVal, function(self2, output) {
    function get_name(self3) {
      var def = self3.definition();
      return def ? def.mangled_name || def.name : self3.name;
    }
    const try_shorthand = output.option("shorthand") && !(self2.key instanceof AST_Node);
    if (try_shorthand && self2.value instanceof AST_Symbol && get_name(self2.value) === self2.key && !ALL_RESERVED_WORDS.has(self2.key)) {
      const was_shorthand = print_property_name(self2.key, self2.quote, output);
      if (!was_shorthand) {
        output.colon();
        self2.value.print(output);
      }
    } else if (try_shorthand && self2.value instanceof AST_DefaultAssign && self2.value.left instanceof AST_Symbol && get_name(self2.value.left) === self2.key) {
      const was_shorthand = print_property_name(self2.key, self2.quote, output);
      if (!was_shorthand) {
        output.colon();
        self2.value.left.print(output);
      }
      output.space();
      output.print("=");
      output.space();
      self2.value.right.print(output);
    } else {
      if (!(self2.key instanceof AST_Node)) {
        print_property_name(self2.key, self2.quote, output);
      } else {
        output.with_square(function() {
          self2.key.print(output);
        });
      }
      output.colon();
      self2.value.print(output);
    }
  });
  DEFPRINT(AST_ClassPrivateProperty, (self2, output) => {
    if (self2.static) {
      output.print("static");
      output.space();
    }
    output.print("#");
    print_property_name(self2.key.name, undefined, output);
    if (self2.value) {
      output.print("=");
      self2.value.print(output);
    }
    output.semicolon();
  });
  DEFPRINT(AST_ClassProperty, (self2, output) => {
    if (self2.static) {
      output.print("static");
      output.space();
    }
    if (self2.key instanceof AST_SymbolClassProperty) {
      print_property_name(self2.key.name, self2.quote, output);
    } else {
      output.print("[");
      self2.key.print(output);
      output.print("]");
    }
    if (self2.value) {
      output.print("=");
      self2.value.print(output);
    }
    output.semicolon();
  });
  AST_ObjectProperty.DEFMETHOD("_print_getter_setter", function(type, is_private, output) {
    var self2 = this;
    if (self2.static) {
      output.print("static");
      output.space();
    }
    if (type) {
      output.print(type);
      output.space();
    }
    if (self2.key instanceof AST_SymbolMethod) {
      if (is_private)
        output.print("#");
      print_property_name(self2.key.name, self2.quote, output);
      self2.key.add_source_map(output);
    } else {
      output.with_square(function() {
        self2.key.print(output);
      });
    }
    self2.value._do_print(output, true);
  });
  DEFPRINT(AST_ObjectSetter, function(self2, output) {
    self2._print_getter_setter("set", false, output);
  });
  DEFPRINT(AST_ObjectGetter, function(self2, output) {
    self2._print_getter_setter("get", false, output);
  });
  DEFPRINT(AST_PrivateSetter, function(self2, output) {
    self2._print_getter_setter("set", true, output);
  });
  DEFPRINT(AST_PrivateGetter, function(self2, output) {
    self2._print_getter_setter("get", true, output);
  });
  DEFPRINT(AST_ConciseMethod, function(self2, output) {
    var type;
    if (self2.value.is_generator && self2.value.async) {
      type = "async*";
    } else if (self2.value.is_generator) {
      type = "*";
    } else if (self2.value.async) {
      type = "async";
    }
    self2._print_getter_setter(type, false, output);
  });
  DEFPRINT(AST_PrivateMethod, function(self2, output) {
    var type;
    if (self2.value.is_generator && self2.value.async) {
      type = "async*";
    } else if (self2.value.is_generator) {
      type = "*";
    } else if (self2.value.async) {
      type = "async";
    }
    self2._print_getter_setter(type, true, output);
  });
  DEFPRINT(AST_PrivateIn, function(self2, output) {
    self2.key.print(output);
    output.space();
    output.print("in");
    output.space();
    self2.value.print(output);
  });
  DEFPRINT(AST_SymbolPrivateProperty, function(self2, output) {
    output.print("#" + self2.name);
  });
  DEFPRINT(AST_ClassStaticBlock, function(self2, output) {
    output.print("static");
    output.space();
    print_braced(self2, output);
  });
  AST_Symbol.DEFMETHOD("_do_print", function(output) {
    var def = this.definition();
    output.print_name(def ? def.mangled_name || def.name : this.name);
  });
  DEFPRINT(AST_Symbol, function(self2, output) {
    self2._do_print(output);
  });
  DEFPRINT(AST_Hole, noop);
  DEFPRINT(AST_This, function(self2, output) {
    output.print("this");
  });
  DEFPRINT(AST_Super, function(self2, output) {
    output.print("super");
  });
  DEFPRINT(AST_Constant, function(self2, output) {
    output.print(self2.getValue());
  });
  DEFPRINT(AST_String, function(self2, output) {
    output.print_string(self2.getValue(), self2.quote, output.in_directive);
  });
  DEFPRINT(AST_Number, function(self2, output) {
    if ((output.option("keep_numbers") || output.use_asm) && self2.raw) {
      output.print(self2.raw);
    } else {
      output.print(make_num(self2.getValue()));
    }
  });
  DEFPRINT(AST_BigInt, function(self2, output) {
    if (output.option("keep_numbers") && self2.raw) {
      output.print(self2.raw);
    } else {
      output.print(self2.getValue() + "n");
    }
  });
  const r_slash_script = /(<\s*\/\s*script)/i;
  const r_starts_with_script = /^\s*script/i;
  const slash_script_replace = (_, $1) => $1.replace("/", "\\/");
  DEFPRINT(AST_RegExp, function(self2, output) {
    let { source, flags } = self2.getValue();
    source = regexp_source_fix(source);
    flags = flags ? sort_regexp_flags(flags) : "";
    source = source.replace(r_slash_script, slash_script_replace);
    if (r_starts_with_script.test(source) && output.last().endsWith("<")) {
      output.print(" ");
    }
    output.print(output.to_utf8(`/${source}/${flags}`, false, true));
    const parent = output.parent();
    if (parent instanceof AST_Binary && /^\w/.test(parent.operator) && parent.left === self2) {
      output.print(" ");
    }
  });
  function print_maybe_braced_body(stat, output) {
    if (output.option("braces")) {
      make_block(stat, output);
    } else {
      if (!stat || stat instanceof AST_EmptyStatement)
        output.force_semicolon();
      else if (stat instanceof AST_Let || stat instanceof AST_Const || stat instanceof AST_Class)
        make_block(stat, output);
      else
        stat.print(output);
    }
  }
  function best_of(a) {
    var best = a[0], len = best.length;
    for (var i = 1;i < a.length; ++i) {
      if (a[i].length < len) {
        best = a[i];
        len = best.length;
      }
    }
    return best;
  }
  function make_num(num) {
    var str = num.toString(10).replace(/^0\./, ".").replace("e+", "e");
    var candidates = [str];
    if (Math.floor(num) === num) {
      if (num < 0) {
        candidates.push("-0x" + (-num).toString(16).toLowerCase());
      } else {
        candidates.push("0x" + num.toString(16).toLowerCase());
      }
    }
    var match, len, digits;
    if (match = /^\.0+/.exec(str)) {
      len = match[0].length;
      digits = str.slice(len);
      candidates.push(digits + "e-" + (digits.length + len - 1));
    } else if (match = /0+$/.exec(str)) {
      len = match[0].length;
      candidates.push(str.slice(0, -len) + "e" + len);
    } else if (match = /^(\d)\.(\d+)e(-?\d+)$/.exec(str)) {
      candidates.push(match[1] + match[2] + "e" + (match[3] - match[2].length));
    }
    return best_of(candidates);
  }
  function make_block(stmt, output) {
    if (!stmt || stmt instanceof AST_EmptyStatement)
      output.print("{}");
    else if (stmt instanceof AST_BlockStatement)
      stmt.print(output);
    else
      output.with_block(function() {
        output.indent();
        stmt.print(output);
        output.newline();
      });
  }
  function DEFMAP(nodetype, generator) {
    nodetype.forEach(function(nodetype2) {
      nodetype2.DEFMETHOD("add_source_map", generator);
    });
  }
  DEFMAP([
    AST_Node,
    AST_LabeledStatement,
    AST_Toplevel
  ], noop);
  DEFMAP([
    AST_Array,
    AST_BlockStatement,
    AST_Catch,
    AST_Class,
    AST_Constant,
    AST_Debugger,
    AST_Definitions,
    AST_Directive,
    AST_Finally,
    AST_Jump,
    AST_Lambda,
    AST_New,
    AST_Object,
    AST_StatementWithBody,
    AST_Symbol,
    AST_Switch,
    AST_SwitchBranch,
    AST_TemplateString,
    AST_TemplateSegment,
    AST_Try
  ], function(output) {
    output.add_mapping(this.start);
  });
  DEFMAP([
    AST_ObjectGetter,
    AST_ObjectSetter,
    AST_PrivateGetter,
    AST_PrivateSetter,
    AST_ConciseMethod,
    AST_PrivateMethod
  ], function(output) {
    output.add_mapping(this.start, false);
  });
  DEFMAP([
    AST_SymbolMethod,
    AST_SymbolPrivateProperty
  ], function(output) {
    const tok_type = this.end && this.end.type;
    if (tok_type === "name" || tok_type === "privatename") {
      output.add_mapping(this.end, this.name);
    } else {
      output.add_mapping(this.end);
    }
  });
  DEFMAP([AST_ObjectProperty], function(output) {
    output.add_mapping(this.start, this.key);
  });
})();

// node_modules/terser/lib/equivalent-to.js
var shallow_cmp = (node1, node2) => {
  return node1 === null && node2 === null || node1.TYPE === node2.TYPE && node1.shallow_cmp(node2);
};
var equivalent_to = (tree1, tree2) => {
  if (!shallow_cmp(tree1, tree2))
    return false;
  const walk_1_state = [tree1];
  const walk_2_state = [tree2];
  const walk_1_push = walk_1_state.push.bind(walk_1_state);
  const walk_2_push = walk_2_state.push.bind(walk_2_state);
  while (walk_1_state.length && walk_2_state.length) {
    const node_1 = walk_1_state.pop();
    const node_2 = walk_2_state.pop();
    if (!shallow_cmp(node_1, node_2))
      return false;
    node_1._children_backwards(walk_1_push);
    node_2._children_backwards(walk_2_push);
    if (walk_1_state.length !== walk_2_state.length) {
      return false;
    }
  }
  return walk_1_state.length == 0 && walk_2_state.length == 0;
};
var pass_through = () => true;
AST_Node.prototype.shallow_cmp = function() {
  throw new Error("did not find a shallow_cmp function for " + this.constructor.name);
};
AST_Debugger.prototype.shallow_cmp = pass_through;
AST_Directive.prototype.shallow_cmp = function(other) {
  return this.value === other.value;
};
AST_SimpleStatement.prototype.shallow_cmp = pass_through;
AST_Block.prototype.shallow_cmp = pass_through;
AST_EmptyStatement.prototype.shallow_cmp = pass_through;
AST_LabeledStatement.prototype.shallow_cmp = function(other) {
  return this.label.name === other.label.name;
};
AST_Do.prototype.shallow_cmp = pass_through;
AST_While.prototype.shallow_cmp = pass_through;
AST_For.prototype.shallow_cmp = function(other) {
  return (this.init == null ? other.init == null : this.init === other.init) && (this.condition == null ? other.condition == null : this.condition === other.condition) && (this.step == null ? other.step == null : this.step === other.step);
};
AST_ForIn.prototype.shallow_cmp = pass_through;
AST_ForOf.prototype.shallow_cmp = pass_through;
AST_With.prototype.shallow_cmp = pass_through;
AST_Toplevel.prototype.shallow_cmp = pass_through;
AST_Expansion.prototype.shallow_cmp = pass_through;
AST_Lambda.prototype.shallow_cmp = function(other) {
  return this.is_generator === other.is_generator && this.async === other.async;
};
AST_Destructuring.prototype.shallow_cmp = function(other) {
  return this.is_array === other.is_array;
};
AST_PrefixedTemplateString.prototype.shallow_cmp = pass_through;
AST_TemplateString.prototype.shallow_cmp = pass_through;
AST_TemplateSegment.prototype.shallow_cmp = function(other) {
  return this.value === other.value;
};
AST_Jump.prototype.shallow_cmp = pass_through;
AST_LoopControl.prototype.shallow_cmp = pass_through;
AST_Await.prototype.shallow_cmp = pass_through;
AST_Yield.prototype.shallow_cmp = function(other) {
  return this.is_star === other.is_star;
};
AST_If.prototype.shallow_cmp = function(other) {
  return this.alternative == null ? other.alternative == null : this.alternative === other.alternative;
};
AST_Switch.prototype.shallow_cmp = pass_through;
AST_SwitchBranch.prototype.shallow_cmp = pass_through;
AST_Try.prototype.shallow_cmp = function(other) {
  return this.body === other.body && (this.bcatch == null ? other.bcatch == null : this.bcatch === other.bcatch) && (this.bfinally == null ? other.bfinally == null : this.bfinally === other.bfinally);
};
AST_Catch.prototype.shallow_cmp = function(other) {
  return this.argname == null ? other.argname == null : this.argname === other.argname;
};
AST_Finally.prototype.shallow_cmp = pass_through;
AST_Definitions.prototype.shallow_cmp = pass_through;
AST_VarDef.prototype.shallow_cmp = function(other) {
  return this.value == null ? other.value == null : this.value === other.value;
};
AST_NameMapping.prototype.shallow_cmp = pass_through;
AST_Import.prototype.shallow_cmp = function(other) {
  return (this.imported_name == null ? other.imported_name == null : this.imported_name === other.imported_name) && (this.imported_names == null ? other.imported_names == null : this.imported_names === other.imported_names) && (this.attributes == null ? other.attributes == null : this.attributes === other.attributes);
};
AST_ImportMeta.prototype.shallow_cmp = pass_through;
AST_Export.prototype.shallow_cmp = function(other) {
  return (this.exported_definition == null ? other.exported_definition == null : this.exported_definition === other.exported_definition) && (this.exported_value == null ? other.exported_value == null : this.exported_value === other.exported_value) && (this.exported_names == null ? other.exported_names == null : this.exported_names === other.exported_names) && (this.attributes == null ? other.attributes == null : this.attributes === other.attributes) && this.module_name === other.module_name && this.is_default === other.is_default;
};
AST_Call.prototype.shallow_cmp = pass_through;
AST_Sequence.prototype.shallow_cmp = pass_through;
AST_PropAccess.prototype.shallow_cmp = pass_through;
AST_Chain.prototype.shallow_cmp = pass_through;
AST_Dot.prototype.shallow_cmp = function(other) {
  return this.property === other.property;
};
AST_DotHash.prototype.shallow_cmp = function(other) {
  return this.property === other.property;
};
AST_Unary.prototype.shallow_cmp = function(other) {
  return this.operator === other.operator;
};
AST_Binary.prototype.shallow_cmp = function(other) {
  return this.operator === other.operator;
};
AST_PrivateIn.prototype.shallow_cmp = pass_through;
AST_Conditional.prototype.shallow_cmp = pass_through;
AST_Array.prototype.shallow_cmp = pass_through;
AST_Object.prototype.shallow_cmp = pass_through;
AST_ObjectProperty.prototype.shallow_cmp = pass_through;
AST_ObjectKeyVal.prototype.shallow_cmp = function(other) {
  return this.key === other.key && this.quote === other.quote;
};
AST_ObjectSetter.prototype.shallow_cmp = function(other) {
  return this.static === other.static;
};
AST_ObjectGetter.prototype.shallow_cmp = function(other) {
  return this.static === other.static;
};
AST_ConciseMethod.prototype.shallow_cmp = function(other) {
  return this.static === other.static;
};
AST_PrivateMethod.prototype.shallow_cmp = function(other) {
  return this.static === other.static;
};
AST_Class.prototype.shallow_cmp = function(other) {
  return (this.name == null ? other.name == null : this.name === other.name) && (this.extends == null ? other.extends == null : this.extends === other.extends);
};
AST_ClassProperty.prototype.shallow_cmp = function(other) {
  return this.static === other.static && (typeof this.key === "string" ? this.key === other.key : true);
};
AST_ClassPrivateProperty.prototype.shallow_cmp = function(other) {
  return this.static === other.static;
};
AST_Symbol.prototype.shallow_cmp = function(other) {
  return this.name === other.name;
};
AST_NewTarget.prototype.shallow_cmp = pass_through;
AST_This.prototype.shallow_cmp = pass_through;
AST_Super.prototype.shallow_cmp = pass_through;
AST_String.prototype.shallow_cmp = function(other) {
  return this.value === other.value;
};
AST_Number.prototype.shallow_cmp = function(other) {
  return this.value === other.value;
};
AST_BigInt.prototype.shallow_cmp = function(other) {
  return this.value === other.value;
};
AST_RegExp.prototype.shallow_cmp = function(other) {
  return this.value.flags === other.value.flags && this.value.source === other.value.source;
};
AST_Atom.prototype.shallow_cmp = pass_through;

// node_modules/terser/lib/scope.js
var MASK_EXPORT_DONT_MANGLE = 1 << 0;
var MASK_EXPORT_WANT_MANGLE = 1 << 1;
var function_defs = null;
var unmangleable_names = null;
var scopes_with_block_defuns = null;

class SymbolDef {
  constructor(scope, orig, init) {
    this.name = orig.name;
    this.orig = [orig];
    this.init = init;
    this.eliminated = 0;
    this.assignments = 0;
    this.scope = scope;
    this.replaced = 0;
    this.global = false;
    this.export = 0;
    this.mangled_name = null;
    this.undeclared = false;
    this.id = SymbolDef.next_id++;
    this.chained = false;
    this.direct_access = false;
    this.escaped = 0;
    this.recursive_refs = 0;
    this.references = [];
    this.should_replace = undefined;
    this.single_use = false;
    this.fixed = false;
    Object.seal(this);
  }
  fixed_value() {
    if (!this.fixed || this.fixed instanceof AST_Node)
      return this.fixed;
    return this.fixed();
  }
  unmangleable(options) {
    if (!options)
      options = {};
    if (function_defs && function_defs.has(this.id) && keep_name(options.keep_fnames, this.orig[0].name))
      return true;
    return this.global && !options.toplevel || this.export & MASK_EXPORT_DONT_MANGLE || this.undeclared || !options.eval && this.scope.pinned() || (this.orig[0] instanceof AST_SymbolLambda || this.orig[0] instanceof AST_SymbolDefun) && keep_name(options.keep_fnames, this.orig[0].name) || this.orig[0] instanceof AST_SymbolMethod || (this.orig[0] instanceof AST_SymbolClass || this.orig[0] instanceof AST_SymbolDefClass) && keep_name(options.keep_classnames, this.orig[0].name);
  }
  mangle(options) {
    const cache = options.cache && options.cache.props;
    if (this.global && cache && cache.has(this.name)) {
      this.mangled_name = cache.get(this.name);
    } else if (!this.mangled_name && !this.unmangleable(options)) {
      var s = this.scope;
      var sym = this.orig[0];
      if (options.ie8 && sym instanceof AST_SymbolLambda)
        s = s.parent_scope;
      const redefinition = redefined_catch_def(this);
      this.mangled_name = redefinition ? redefinition.mangled_name || redefinition.name : s.next_mangled(options, this);
      if (this.global && cache) {
        cache.set(this.name, this.mangled_name);
      }
    }
  }
}
SymbolDef.next_id = 1;
function redefined_catch_def(def) {
  if (def.orig[0] instanceof AST_SymbolCatch && def.scope.is_block_scope()) {
    return def.scope.get_defun_scope().variables.get(def.name);
  }
}
AST_Scope.DEFMETHOD("figure_out_scope", function(options, { parent_scope = undefined, toplevel = this } = {}) {
  options = defaults(options, {
    cache: null,
    ie8: false,
    safari10: false,
    module: false
  });
  if (!(toplevel instanceof AST_Toplevel)) {
    throw new Error("Invalid toplevel scope");
  }
  var scope = this.parent_scope = parent_scope;
  var labels = new Map;
  var defun = null;
  var in_destructuring = null;
  var for_scopes = [];
  var tw = new TreeWalker((node, descend) => {
    if (node.is_block_scope()) {
      const save_scope2 = scope;
      node.block_scope = scope = new AST_Scope(node);
      scope._block_scope = true;
      scope.init_scope_vars(save_scope2);
      scope.uses_with = save_scope2.uses_with;
      scope.uses_eval = save_scope2.uses_eval;
      if (options.safari10) {
        if (node instanceof AST_For || node instanceof AST_ForIn || node instanceof AST_ForOf) {
          for_scopes.push(scope);
        }
      }
      if (node instanceof AST_Switch) {
        const the_block_scope = scope;
        scope = save_scope2;
        node.expression.walk(tw);
        scope = the_block_scope;
        for (let i = 0;i < node.body.length; i++) {
          node.body[i].walk(tw);
        }
      } else {
        descend();
      }
      scope = save_scope2;
      return true;
    }
    if (node instanceof AST_Destructuring) {
      const save_destructuring = in_destructuring;
      in_destructuring = node;
      descend();
      in_destructuring = save_destructuring;
      return true;
    }
    if (node instanceof AST_Scope) {
      node.init_scope_vars(scope);
      var save_scope = scope;
      var save_defun = defun;
      var save_labels = labels;
      defun = scope = node;
      labels = new Map;
      descend();
      scope = save_scope;
      defun = save_defun;
      labels = save_labels;
      return true;
    }
    if (node instanceof AST_LabeledStatement) {
      var l = node.label;
      if (labels.has(l.name)) {
        throw new Error(string_template("Label {name} defined twice", l));
      }
      labels.set(l.name, l);
      descend();
      labels.delete(l.name);
      return true;
    }
    if (node instanceof AST_With) {
      for (var s = scope;s; s = s.parent_scope)
        s.uses_with = true;
      return;
    }
    if (node instanceof AST_Symbol) {
      node.scope = scope;
    }
    if (node instanceof AST_Label) {
      node.thedef = node;
      node.references = [];
    }
    if (node instanceof AST_SymbolLambda) {
      defun.def_function(node, node.name == "arguments" ? undefined : defun);
    } else if (node instanceof AST_SymbolDefun) {
      const closest_scope = defun.parent_scope;
      node.scope = tw.directives["use strict"] ? closest_scope : closest_scope.get_defun_scope();
      mark_export(node.scope.def_function(node, defun), 1);
    } else if (node instanceof AST_SymbolClass) {
      mark_export(defun.def_variable(node, defun), 1);
    } else if (node instanceof AST_SymbolImport) {
      scope.def_variable(node);
    } else if (node instanceof AST_SymbolDefClass) {
      mark_export((node.scope = defun.parent_scope).def_function(node, defun), 1);
    } else if (node instanceof AST_SymbolVar || node instanceof AST_SymbolLet || node instanceof AST_SymbolConst || node instanceof AST_SymbolCatch) {
      var def;
      if (node instanceof AST_SymbolBlockDeclaration) {
        def = scope.def_variable(node, null);
      } else {
        def = defun.def_variable(node, node.TYPE == "SymbolVar" ? null : undefined);
      }
      if (!def.orig.every((sym2) => {
        if (sym2 === node)
          return true;
        if (node instanceof AST_SymbolBlockDeclaration) {
          return sym2 instanceof AST_SymbolLambda;
        }
        return !(sym2 instanceof AST_SymbolLet || sym2 instanceof AST_SymbolConst);
      })) {
        js_error(`"${node.name}" is redeclared`, node.start.file, node.start.line, node.start.col, node.start.pos);
      }
      if (!(node instanceof AST_SymbolFunarg))
        mark_export(def, 2);
      if (defun !== scope) {
        node.mark_enclosed();
        var def = scope.find_variable(node);
        if (node.thedef !== def) {
          node.thedef = def;
          node.reference();
        }
      }
    } else if (node instanceof AST_LabelRef) {
      var sym = labels.get(node.name);
      if (!sym)
        throw new Error(string_template("Undefined label {name} [{line},{col}]", {
          name: node.name,
          line: node.start.line,
          col: node.start.col
        }));
      node.thedef = sym;
    }
    if (!(scope instanceof AST_Toplevel) && (node instanceof AST_Export || node instanceof AST_Import)) {
      js_error(`"${node.TYPE}" statement may only appear at the top level`, node.start.file, node.start.line, node.start.col, node.start.pos);
    }
  });
  if (options.module) {
    tw.directives["use strict"] = true;
  }
  this.walk(tw);
  function mark_export(def, level) {
    if (in_destructuring) {
      var i = 0;
      do {
        level++;
      } while (tw.parent(i++) !== in_destructuring);
    }
    var node = tw.parent(level);
    if (def.export = node instanceof AST_Export ? MASK_EXPORT_DONT_MANGLE : 0) {
      var exported = node.exported_definition;
      if ((exported instanceof AST_Defun || exported instanceof AST_DefClass) && node.is_default) {
        def.export = MASK_EXPORT_WANT_MANGLE;
      }
    }
  }
  const is_toplevel = this instanceof AST_Toplevel;
  if (is_toplevel) {
    this.globals = new Map;
  }
  var tw = new TreeWalker((node) => {
    if (node instanceof AST_LoopControl && node.label) {
      node.label.thedef.references.push(node);
      return true;
    }
    if (node instanceof AST_SymbolRef) {
      var name = node.name;
      if (name == "eval" && tw.parent() instanceof AST_Call) {
        for (var s = node.scope;s && !s.uses_eval; s = s.parent_scope) {
          s.uses_eval = true;
        }
      }
      var sym;
      if (tw.parent() instanceof AST_NameMapping && tw.parent(1).module_name || !(sym = node.scope.find_variable(name))) {
        sym = toplevel.def_global(node);
        if (node instanceof AST_SymbolExport)
          sym.export = MASK_EXPORT_DONT_MANGLE;
      } else if (sym.scope instanceof AST_Lambda && name == "arguments") {
        sym.scope.get_defun_scope().uses_arguments = true;
      }
      node.thedef = sym;
      node.reference();
      if (node.scope.is_block_scope() && !(sym.orig[0] instanceof AST_SymbolBlockDeclaration)) {
        node.scope = node.scope.get_defun_scope();
      }
      return true;
    }
    var def;
    if (node instanceof AST_SymbolCatch && (def = redefined_catch_def(node.definition()))) {
      var s = node.scope;
      while (s) {
        push_uniq(s.enclosed, def);
        if (s === def.scope)
          break;
        s = s.parent_scope;
      }
    }
  });
  this.walk(tw);
  if (options.ie8 || options.safari10) {
    walk(this, (node) => {
      if (node instanceof AST_SymbolCatch) {
        var name = node.name;
        var refs = node.thedef.references;
        var scope2 = node.scope.get_defun_scope();
        var def = scope2.find_variable(name) || toplevel.globals.get(name) || scope2.def_variable(node);
        refs.forEach(function(ref) {
          ref.thedef = def;
          ref.reference();
        });
        node.thedef = def;
        node.reference();
        return true;
      }
    });
  }
  if (options.safari10) {
    for (const scope2 of for_scopes) {
      scope2.parent_scope.variables.forEach(function(def) {
        push_uniq(scope2.enclosed, def);
      });
    }
  }
});
AST_Toplevel.DEFMETHOD("def_global", function(node) {
  var globals = this.globals, name = node.name;
  if (globals.has(name)) {
    return globals.get(name);
  } else {
    var g = new SymbolDef(this, node);
    g.undeclared = true;
    g.global = true;
    globals.set(name, g);
    return g;
  }
});
AST_Scope.DEFMETHOD("init_scope_vars", function(parent_scope) {
  this.variables = new Map;
  this.uses_with = false;
  this.uses_eval = false;
  this.parent_scope = parent_scope;
  this.enclosed = [];
  this.cname = -1;
});
AST_Scope.DEFMETHOD("conflicting_def", function(name) {
  return this.enclosed.find((def) => def.name === name) || this.variables.has(name) || this.parent_scope && this.parent_scope.conflicting_def(name);
});
AST_Scope.DEFMETHOD("conflicting_def_shallow", function(name) {
  return this.enclosed.find((def) => def.name === name) || this.variables.has(name);
});
AST_Scope.DEFMETHOD("add_child_scope", function(scope) {
  if (scope.parent_scope === this)
    return;
  scope.parent_scope = this;
  if (scope instanceof AST_Arrow && (this instanceof AST_Lambda && !this.uses_arguments)) {
    this.uses_arguments = walk(scope, (node) => {
      if (node instanceof AST_SymbolRef && node.scope instanceof AST_Lambda && node.name === "arguments") {
        return walk_abort;
      }
      if (node instanceof AST_Lambda && !(node instanceof AST_Arrow)) {
        return true;
      }
    });
  }
  this.uses_with = this.uses_with || scope.uses_with;
  this.uses_eval = this.uses_eval || scope.uses_eval;
  const scope_ancestry = (() => {
    const ancestry = [];
    let cur = this;
    do {
      ancestry.push(cur);
    } while (cur = cur.parent_scope);
    ancestry.reverse();
    return ancestry;
  })();
  const new_scope_enclosed_set = new Set(scope.enclosed);
  const to_enclose = [];
  for (const scope_topdown of scope_ancestry) {
    to_enclose.forEach((e) => push_uniq(scope_topdown.enclosed, e));
    for (const def of scope_topdown.variables.values()) {
      if (new_scope_enclosed_set.has(def)) {
        push_uniq(to_enclose, def);
        push_uniq(scope_topdown.enclosed, def);
      }
    }
  }
});
function find_scopes_visible_from(scopes) {
  const found_scopes = new Set;
  for (const scope of new Set(scopes)) {
    (function bubble_up(scope2) {
      if (scope2 == null || found_scopes.has(scope2))
        return;
      found_scopes.add(scope2);
      bubble_up(scope2.parent_scope);
    })(scope);
  }
  return [...found_scopes];
}
AST_Scope.DEFMETHOD("create_symbol", function(SymClass, {
  source,
  tentative_name,
  scope,
  conflict_scopes = [scope],
  init = null
} = {}) {
  let symbol_name;
  conflict_scopes = find_scopes_visible_from(conflict_scopes);
  if (tentative_name) {
    tentative_name = symbol_name = tentative_name.replace(/(?:^[^a-z_$]|[^a-z0-9_$])/ig, "_");
    let i = 0;
    while (conflict_scopes.find((s) => s.conflicting_def_shallow(symbol_name))) {
      symbol_name = tentative_name + "$" + i++;
    }
  }
  if (!symbol_name) {
    throw new Error("No symbol name could be generated in create_symbol()");
  }
  const symbol = make_node(SymClass, source, {
    name: symbol_name,
    scope
  });
  this.def_variable(symbol, init || null);
  symbol.mark_enclosed();
  return symbol;
});
AST_Node.DEFMETHOD("is_block_scope", return_false);
AST_Class.DEFMETHOD("is_block_scope", return_false);
AST_Lambda.DEFMETHOD("is_block_scope", return_false);
AST_Toplevel.DEFMETHOD("is_block_scope", return_false);
AST_SwitchBranch.DEFMETHOD("is_block_scope", return_false);
AST_Block.DEFMETHOD("is_block_scope", return_true);
AST_Scope.DEFMETHOD("is_block_scope", function() {
  return this._block_scope || false;
});
AST_IterationStatement.DEFMETHOD("is_block_scope", return_true);
AST_Lambda.DEFMETHOD("init_scope_vars", function() {
  AST_Scope.prototype.init_scope_vars.apply(this, arguments);
  this.uses_arguments = false;
  this.def_variable(new AST_SymbolFunarg({
    name: "arguments",
    start: this.start,
    end: this.end
  }));
});
AST_Arrow.DEFMETHOD("init_scope_vars", function() {
  AST_Scope.prototype.init_scope_vars.apply(this, arguments);
  this.uses_arguments = false;
});
AST_Symbol.DEFMETHOD("mark_enclosed", function() {
  var def = this.definition();
  var s = this.scope;
  while (s) {
    push_uniq(s.enclosed, def);
    if (s === def.scope)
      break;
    s = s.parent_scope;
  }
});
AST_Symbol.DEFMETHOD("reference", function() {
  this.definition().references.push(this);
  this.mark_enclosed();
});
AST_Scope.DEFMETHOD("find_variable", function(name) {
  if (name instanceof AST_Symbol)
    name = name.name;
  return this.variables.get(name) || this.parent_scope && this.parent_scope.find_variable(name);
});
AST_Scope.DEFMETHOD("def_function", function(symbol, init) {
  var def = this.def_variable(symbol, init);
  if (!def.init || def.init instanceof AST_Defun)
    def.init = init;
  return def;
});
AST_Scope.DEFMETHOD("def_variable", function(symbol, init) {
  var def = this.variables.get(symbol.name);
  if (def) {
    def.orig.push(symbol);
    if (def.init && (def.scope !== symbol.scope || def.init instanceof AST_Function)) {
      def.init = init;
    }
  } else {
    def = new SymbolDef(this, symbol, init);
    this.variables.set(symbol.name, def);
    def.global = !this.parent_scope;
  }
  return symbol.thedef = def;
});
function next_mangled(scope, options) {
  let defun_scope;
  if (scopes_with_block_defuns && (defun_scope = scope.get_defun_scope()) && scopes_with_block_defuns.has(defun_scope)) {
    scope = defun_scope;
  }
  var ext = scope.enclosed;
  var nth_identifier = options.nth_identifier;
  out:
    while (true) {
      var m = nth_identifier.get(++scope.cname);
      if (ALL_RESERVED_WORDS.has(m))
        continue;
      if (options.reserved.has(m))
        continue;
      if (unmangleable_names && unmangleable_names.has(m))
        continue out;
      for (let i = ext.length;--i >= 0; ) {
        const def = ext[i];
        const name = def.mangled_name || def.unmangleable(options) && def.name;
        if (m == name)
          continue out;
      }
      return m;
    }
}
AST_Scope.DEFMETHOD("next_mangled", function(options) {
  return next_mangled(this, options);
});
AST_Toplevel.DEFMETHOD("next_mangled", function(options) {
  let name;
  const mangled_names = this.mangled_names;
  do {
    name = next_mangled(this, options);
  } while (mangled_names.has(name));
  return name;
});
AST_Function.DEFMETHOD("next_mangled", function(options, def) {
  var tricky_def = def.orig[0] instanceof AST_SymbolFunarg && this.name && this.name.definition();
  var tricky_name = tricky_def ? tricky_def.mangled_name || tricky_def.name : null;
  while (true) {
    var name = next_mangled(this, options);
    if (!tricky_name || tricky_name != name)
      return name;
  }
});
AST_Symbol.DEFMETHOD("unmangleable", function(options) {
  var def = this.definition();
  return !def || def.unmangleable(options);
});
AST_Label.DEFMETHOD("unmangleable", return_false);
AST_Symbol.DEFMETHOD("unreferenced", function() {
  return !this.definition().references.length && !this.scope.pinned();
});
AST_Symbol.DEFMETHOD("definition", function() {
  return this.thedef;
});
AST_Symbol.DEFMETHOD("global", function() {
  return this.thedef.global;
});
function format_mangler_options(options) {
  options = defaults(options, {
    eval: false,
    nth_identifier: base54,
    ie8: false,
    keep_classnames: false,
    keep_fnames: false,
    module: false,
    reserved: [],
    toplevel: false
  });
  if (options.module)
    options.toplevel = true;
  if (!Array.isArray(options.reserved) && !(options.reserved instanceof Set)) {
    options.reserved = [];
  }
  options.reserved = new Set(options.reserved);
  options.reserved.add("arguments");
  return options;
}
AST_Toplevel.DEFMETHOD("mangle_names", function(options) {
  options = format_mangler_options(options);
  var nth_identifier = options.nth_identifier;
  var lname = -1;
  var to_mangle = [];
  if (options.keep_fnames) {
    function_defs = new Set;
  }
  const mangled_names = this.mangled_names = new Set;
  unmangleable_names = new Set;
  if (options.cache) {
    this.globals.forEach(collect);
    if (options.cache.props) {
      options.cache.props.forEach(function(mangled_name) {
        mangled_names.add(mangled_name);
      });
    }
  }
  var tw = new TreeWalker(function(node, descend) {
    if (node instanceof AST_LabeledStatement) {
      var save_nesting = lname;
      descend();
      lname = save_nesting;
      return true;
    }
    if (node instanceof AST_Defun && !(tw.parent() instanceof AST_Scope)) {
      scopes_with_block_defuns = scopes_with_block_defuns || new Set;
      scopes_with_block_defuns.add(node.parent_scope.get_defun_scope());
    }
    if (node instanceof AST_Scope) {
      node.variables.forEach(collect);
      return;
    }
    if (node.is_block_scope()) {
      node.block_scope.variables.forEach(collect);
      return;
    }
    if (function_defs && node instanceof AST_VarDef && node.value instanceof AST_Lambda && !node.value.name && keep_name(options.keep_fnames, node.name.name)) {
      function_defs.add(node.name.definition().id);
      return;
    }
    if (node instanceof AST_Label) {
      let name;
      do {
        name = nth_identifier.get(++lname);
      } while (ALL_RESERVED_WORDS.has(name));
      node.mangled_name = name;
      return true;
    }
    if (!(options.ie8 || options.safari10) && node instanceof AST_SymbolCatch) {
      to_mangle.push(node.definition());
      return;
    }
  });
  this.walk(tw);
  if (options.keep_fnames || options.keep_classnames) {
    to_mangle.forEach((def) => {
      if (def.name.length < 6 && def.unmangleable(options)) {
        unmangleable_names.add(def.name);
      }
    });
  }
  to_mangle.forEach((def) => {
    def.mangle(options);
  });
  function_defs = null;
  unmangleable_names = null;
  scopes_with_block_defuns = null;
  function collect(symbol) {
    if (symbol.export & MASK_EXPORT_DONT_MANGLE) {
      unmangleable_names.add(symbol.name);
    } else if (!options.reserved.has(symbol.name)) {
      to_mangle.push(symbol);
    }
  }
});
AST_Toplevel.DEFMETHOD("find_colliding_names", function(options) {
  const cache = options.cache && options.cache.props;
  const avoid = new Set;
  options.reserved.forEach(to_avoid);
  this.globals.forEach(add_def);
  this.walk(new TreeWalker(function(node) {
    if (node instanceof AST_Scope)
      node.variables.forEach(add_def);
    if (node instanceof AST_SymbolCatch)
      add_def(node.definition());
  }));
  return avoid;
  function to_avoid(name) {
    avoid.add(name);
  }
  function add_def(def) {
    var name = def.name;
    if (def.global && cache && cache.has(name))
      name = cache.get(name);
    else if (!def.unmangleable(options))
      return;
    to_avoid(name);
  }
});
AST_Toplevel.DEFMETHOD("expand_names", function(options) {
  options = format_mangler_options(options);
  var nth_identifier = options.nth_identifier;
  if (nth_identifier.reset && nth_identifier.sort) {
    nth_identifier.reset();
    nth_identifier.sort();
  }
  var avoid = this.find_colliding_names(options);
  var cname = 0;
  this.globals.forEach(rename);
  this.walk(new TreeWalker(function(node) {
    if (node instanceof AST_Scope)
      node.variables.forEach(rename);
    if (node instanceof AST_SymbolCatch)
      rename(node.definition());
  }));
  function next_name() {
    var name;
    do {
      name = nth_identifier.get(cname++);
    } while (avoid.has(name) || ALL_RESERVED_WORDS.has(name));
    return name;
  }
  function rename(def) {
    if (def.global && options.cache)
      return;
    if (def.unmangleable(options))
      return;
    if (options.reserved.has(def.name))
      return;
    const redefinition = redefined_catch_def(def);
    const name = def.name = redefinition ? redefinition.name : next_name();
    def.orig.forEach(function(sym) {
      sym.name = name;
    });
    def.references.forEach(function(sym) {
      sym.name = name;
    });
  }
});
AST_Node.DEFMETHOD("tail_node", return_this);
AST_Sequence.DEFMETHOD("tail_node", function() {
  return this.expressions[this.expressions.length - 1];
});
AST_Toplevel.DEFMETHOD("compute_char_frequency", function(options) {
  options = format_mangler_options(options);
  var nth_identifier = options.nth_identifier;
  if (!nth_identifier.reset || !nth_identifier.consider || !nth_identifier.sort) {
    return;
  }
  nth_identifier.reset();
  try {
    AST_Node.prototype.print = function(stream, force_parens) {
      this._print(stream, force_parens);
      if (this instanceof AST_Symbol && !this.unmangleable(options)) {
        nth_identifier.consider(this.name, -1);
      } else if (options.properties) {
        if (this instanceof AST_DotHash) {
          nth_identifier.consider("#" + this.property, -1);
        } else if (this instanceof AST_Dot) {
          nth_identifier.consider(this.property, -1);
        } else if (this instanceof AST_Sub) {
          skip_string(this.property);
        }
      }
    };
    nth_identifier.consider(this.print_to_string(), 1);
  } finally {
    AST_Node.prototype.print = AST_Node.prototype._print;
  }
  nth_identifier.sort();
  function skip_string(node) {
    if (node instanceof AST_String) {
      nth_identifier.consider(node.value, -1);
    } else if (node instanceof AST_Conditional) {
      skip_string(node.consequent);
      skip_string(node.alternative);
    } else if (node instanceof AST_Sequence) {
      skip_string(node.tail_node());
    }
  }
});
var base54 = (() => {
  const leading = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_".split("");
  const digits = "0123456789".split("");
  let chars;
  let frequency;
  function reset() {
    frequency = new Map;
    leading.forEach(function(ch) {
      frequency.set(ch, 0);
    });
    digits.forEach(function(ch) {
      frequency.set(ch, 0);
    });
  }
  function consider(str, delta) {
    for (var i = str.length;--i >= 0; ) {
      frequency.set(str[i], frequency.get(str[i]) + delta);
    }
  }
  function compare(a, b) {
    return frequency.get(b) - frequency.get(a);
  }
  function sort() {
    chars = mergeSort(leading, compare).concat(mergeSort(digits, compare));
  }
  reset();
  sort();
  function base542(num) {
    var ret = "", base = 54;
    num++;
    do {
      num--;
      ret += chars[num % base];
      num = Math.floor(num / base);
      base = 64;
    } while (num > 0);
    return ret;
  }
  return {
    get: base542,
    consider,
    reset,
    sort
  };
})();

// node_modules/terser/lib/size.js
var mangle_options = undefined;
AST_Node.prototype.size = function(compressor, stack) {
  mangle_options = compressor && compressor._mangle_options;
  let size = 0;
  walk_parent(this, (node, info) => {
    size += node._size(info);
    if (node instanceof AST_Arrow && node.is_braceless()) {
      size += node.body[0].value._size(info);
      return true;
    }
  }, stack || compressor && compressor.stack);
  mangle_options = undefined;
  return size;
};
AST_Node.prototype._size = () => 0;
AST_Debugger.prototype._size = () => 8;
AST_Directive.prototype._size = function() {
  return 2 + this.value.length;
};
var list_overhead = (array) => array.length && array.length - 1;
AST_Block.prototype._size = function() {
  return 2 + list_overhead(this.body);
};
AST_Toplevel.prototype._size = function() {
  return list_overhead(this.body);
};
AST_EmptyStatement.prototype._size = () => 1;
AST_LabeledStatement.prototype._size = () => 2;
AST_Do.prototype._size = () => 9;
AST_While.prototype._size = () => 7;
AST_For.prototype._size = () => 8;
AST_ForIn.prototype._size = () => 8;
AST_With.prototype._size = () => 6;
AST_Expansion.prototype._size = () => 3;
var lambda_modifiers = (func) => (func.is_generator ? 1 : 0) + (func.async ? 6 : 0);
AST_Accessor.prototype._size = function() {
  return lambda_modifiers(this) + 4 + list_overhead(this.argnames) + list_overhead(this.body);
};
AST_Function.prototype._size = function(info) {
  const first = !!first_in_statement(info);
  return first * 2 + lambda_modifiers(this) + 12 + list_overhead(this.argnames) + list_overhead(this.body);
};
AST_Defun.prototype._size = function() {
  return lambda_modifiers(this) + 13 + list_overhead(this.argnames) + list_overhead(this.body);
};
AST_Arrow.prototype._size = function() {
  let args_and_arrow = 2 + list_overhead(this.argnames);
  if (!(this.argnames.length === 1 && this.argnames[0] instanceof AST_Symbol)) {
    args_and_arrow += 2;
  }
  const body_overhead = this.is_braceless() ? 0 : list_overhead(this.body) + 2;
  return lambda_modifiers(this) + args_and_arrow + body_overhead;
};
AST_Destructuring.prototype._size = () => 2;
AST_TemplateString.prototype._size = function() {
  return 2 + Math.floor(this.segments.length / 2) * 3;
};
AST_TemplateSegment.prototype._size = function() {
  return this.value.length;
};
AST_Return.prototype._size = function() {
  return this.value ? 7 : 6;
};
AST_Throw.prototype._size = () => 6;
AST_Break.prototype._size = function() {
  return this.label ? 6 : 5;
};
AST_Continue.prototype._size = function() {
  return this.label ? 9 : 8;
};
AST_If.prototype._size = () => 4;
AST_Switch.prototype._size = function() {
  return 8 + list_overhead(this.body);
};
AST_Case.prototype._size = function() {
  return 5 + list_overhead(this.body);
};
AST_Default.prototype._size = function() {
  return 8 + list_overhead(this.body);
};
AST_Try.prototype._size = () => 3;
AST_Catch.prototype._size = function() {
  let size = 7 + list_overhead(this.body);
  if (this.argname) {
    size += 2;
  }
  return size;
};
AST_Finally.prototype._size = function() {
  return 7 + list_overhead(this.body);
};
AST_Var.prototype._size = function() {
  return 4 + list_overhead(this.definitions);
};
AST_Let.prototype._size = function() {
  return 4 + list_overhead(this.definitions);
};
AST_Const.prototype._size = function() {
  return 6 + list_overhead(this.definitions);
};
AST_VarDef.prototype._size = function() {
  return this.value ? 1 : 0;
};
AST_NameMapping.prototype._size = function() {
  return this.name ? 4 : 0;
};
AST_Import.prototype._size = function() {
  let size = 6;
  if (this.imported_name)
    size += 1;
  if (this.imported_name || this.imported_names)
    size += 5;
  if (this.imported_names) {
    size += 2 + list_overhead(this.imported_names);
  }
  return size;
};
AST_ImportMeta.prototype._size = () => 11;
AST_Export.prototype._size = function() {
  let size = 7 + (this.is_default ? 8 : 0);
  if (this.exported_value) {
    size += this.exported_value._size();
  }
  if (this.exported_names) {
    size += 2 + list_overhead(this.exported_names);
  }
  if (this.module_name) {
    size += 5;
  }
  return size;
};
AST_Call.prototype._size = function() {
  if (this.optional) {
    return 4 + list_overhead(this.args);
  }
  return 2 + list_overhead(this.args);
};
AST_New.prototype._size = function() {
  return 6 + list_overhead(this.args);
};
AST_Sequence.prototype._size = function() {
  return list_overhead(this.expressions);
};
AST_Dot.prototype._size = function() {
  if (this.optional) {
    return this.property.length + 2;
  }
  return this.property.length + 1;
};
AST_DotHash.prototype._size = function() {
  if (this.optional) {
    return this.property.length + 3;
  }
  return this.property.length + 2;
};
AST_Sub.prototype._size = function() {
  return this.optional ? 4 : 2;
};
AST_Unary.prototype._size = function() {
  if (this.operator === "typeof")
    return 7;
  if (this.operator === "void")
    return 5;
  return this.operator.length;
};
AST_Binary.prototype._size = function(info) {
  if (this.operator === "in")
    return 4;
  let size = this.operator.length;
  if ((this.operator === "+" || this.operator === "-") && this.right instanceof AST_Unary && this.right.operator === this.operator) {
    size += 1;
  }
  if (this.needs_parens(info)) {
    size += 2;
  }
  return size;
};
AST_Conditional.prototype._size = () => 3;
AST_Array.prototype._size = function() {
  return 2 + list_overhead(this.elements);
};
AST_Object.prototype._size = function(info) {
  let base = 2;
  if (first_in_statement(info)) {
    base += 2;
  }
  return base + list_overhead(this.properties);
};
var key_size = (key) => typeof key === "string" ? key.length : 0;
AST_ObjectKeyVal.prototype._size = function() {
  return key_size(this.key) + 1;
};
var static_size = (is_static) => is_static ? 7 : 0;
AST_ObjectGetter.prototype._size = function() {
  return 5 + static_size(this.static) + key_size(this.key);
};
AST_ObjectSetter.prototype._size = function() {
  return 5 + static_size(this.static) + key_size(this.key);
};
AST_ConciseMethod.prototype._size = function() {
  return static_size(this.static) + key_size(this.key);
};
AST_PrivateMethod.prototype._size = function() {
  return AST_ConciseMethod.prototype._size.call(this) + 1;
};
AST_PrivateGetter.prototype._size = function() {
  return AST_ConciseMethod.prototype._size.call(this) + 4;
};
AST_PrivateSetter.prototype._size = function() {
  return AST_ConciseMethod.prototype._size.call(this) + 4;
};
AST_PrivateIn.prototype._size = function() {
  return 5;
};
AST_Class.prototype._size = function() {
  return (this.name ? 8 : 7) + (this.extends ? 8 : 0);
};
AST_ClassStaticBlock.prototype._size = function() {
  return 8 + list_overhead(this.body);
};
AST_ClassProperty.prototype._size = function() {
  return static_size(this.static) + (typeof this.key === "string" ? this.key.length + 2 : 0) + (this.value ? 1 : 0);
};
AST_ClassPrivateProperty.prototype._size = function() {
  return AST_ClassProperty.prototype._size.call(this) + 1;
};
AST_Symbol.prototype._size = function() {
  if (!(mangle_options && this.thedef && !this.thedef.unmangleable(mangle_options))) {
    return this.name.length;
  } else {
    return 1;
  }
};
AST_SymbolClassProperty.prototype._size = function() {
  return this.name.length;
};
AST_SymbolRef.prototype._size = AST_SymbolDeclaration.prototype._size = function() {
  if (this.name === "arguments")
    return 9;
  return AST_Symbol.prototype._size.call(this);
};
AST_NewTarget.prototype._size = () => 10;
AST_SymbolImportForeign.prototype._size = function() {
  return this.name.length;
};
AST_SymbolExportForeign.prototype._size = function() {
  return this.name.length;
};
AST_This.prototype._size = () => 4;
AST_Super.prototype._size = () => 5;
AST_String.prototype._size = function() {
  return this.value.length + 2;
};
AST_Number.prototype._size = function() {
  const { value } = this;
  if (value === 0)
    return 1;
  if (value > 0 && Math.floor(value) === value) {
    return Math.floor(Math.log10(value) + 1);
  }
  return value.toString().length;
};
AST_BigInt.prototype._size = function() {
  return this.value.length;
};
AST_RegExp.prototype._size = function() {
  return this.value.toString().length;
};
AST_Null.prototype._size = () => 4;
AST_NaN.prototype._size = () => 3;
AST_Undefined.prototype._size = () => 6;
AST_Hole.prototype._size = () => 0;
AST_Infinity.prototype._size = () => 8;
AST_True.prototype._size = () => 4;
AST_False.prototype._size = () => 5;
AST_Await.prototype._size = () => 6;
AST_Yield.prototype._size = () => 6;

// node_modules/terser/lib/compress/compressor-flags.js
var UNUSED = 1;
var TRUTHY = 2;
var FALSY = 4;
var UNDEFINED = 8;
var INLINED = 16;
var WRITE_ONLY = 32;
var SQUEEZED = 256;
var OPTIMIZED = 512;
var TOP = 1024;
var CLEAR_BETWEEN_PASSES = SQUEEZED | OPTIMIZED | TOP;
var has_flag = (node, flag) => node.flags & flag;
var set_flag = (node, flag) => {
  node.flags |= flag;
};
var clear_flag = (node, flag) => {
  node.flags &= ~flag;
};

// node_modules/terser/lib/compress/common.js
function merge_sequence(array, node) {
  if (node instanceof AST_Sequence) {
    array.push(...node.expressions);
  } else {
    array.push(node);
  }
  return array;
}
function make_sequence(orig, expressions) {
  if (expressions.length == 1)
    return expressions[0];
  if (expressions.length == 0)
    throw new Error("trying to create a sequence with length zero!");
  return make_node(AST_Sequence, orig, {
    expressions: expressions.reduce(merge_sequence, [])
  });
}
function make_empty_function(self2) {
  return make_node(AST_Function, self2, {
    uses_arguments: false,
    argnames: [],
    body: [],
    is_generator: false,
    async: false,
    variables: new Map,
    uses_with: false,
    uses_eval: false,
    parent_scope: null,
    enclosed: [],
    cname: 0,
    block_scope: undefined
  });
}
function make_node_from_constant(val, orig) {
  switch (typeof val) {
    case "string":
      return make_node(AST_String, orig, {
        value: val
      });
    case "number":
      if (isNaN(val))
        return make_node(AST_NaN, orig);
      if (isFinite(val)) {
        return 1 / val < 0 ? make_node(AST_UnaryPrefix, orig, {
          operator: "-",
          expression: make_node(AST_Number, orig, { value: -val })
        }) : make_node(AST_Number, orig, { value: val });
      }
      return val < 0 ? make_node(AST_UnaryPrefix, orig, {
        operator: "-",
        expression: make_node(AST_Infinity, orig)
      }) : make_node(AST_Infinity, orig);
    case "bigint":
      return make_node(AST_BigInt, orig, { value: val.toString() });
    case "boolean":
      return make_node(val ? AST_True : AST_False, orig);
    case "undefined":
      return make_node(AST_Undefined, orig);
    default:
      if (val === null) {
        return make_node(AST_Null, orig, { value: null });
      }
      if (val instanceof RegExp) {
        return make_node(AST_RegExp, orig, {
          value: {
            source: regexp_source_fix(val.source),
            flags: val.flags
          }
        });
      }
      throw new Error(string_template("Can't handle constant of type: {type}", {
        type: typeof val
      }));
  }
}
function best_of_expression(ast1, ast2) {
  return ast1.size() > ast2.size() ? ast2 : ast1;
}
function best_of_statement(ast1, ast2) {
  return best_of_expression(make_node(AST_SimpleStatement, ast1, {
    body: ast1
  }), make_node(AST_SimpleStatement, ast2, {
    body: ast2
  })).body;
}
function best_of(compressor, ast1, ast2) {
  if (first_in_statement(compressor)) {
    return best_of_statement(ast1, ast2);
  } else {
    return best_of_expression(ast1, ast2);
  }
}
function get_simple_key(key) {
  if (key instanceof AST_Constant) {
    return key.getValue();
  }
  if (key instanceof AST_UnaryPrefix && key.operator == "void" && key.expression instanceof AST_Constant) {
    return;
  }
  return key;
}
function read_property(obj, key) {
  key = get_simple_key(key);
  if (key instanceof AST_Node)
    return;
  var value;
  if (obj instanceof AST_Array) {
    var elements = obj.elements;
    if (key == "length")
      return make_node_from_constant(elements.length, obj);
    if (typeof key == "number" && key in elements)
      value = elements[key];
  } else if (obj instanceof AST_Object) {
    key = "" + key;
    var props = obj.properties;
    for (var i = props.length;--i >= 0; ) {
      var prop = props[i];
      if (!(prop instanceof AST_ObjectKeyVal))
        return;
      if (!value && props[i].key === key)
        value = props[i].value;
    }
  }
  return value instanceof AST_SymbolRef && value.fixed_value() || value;
}
function has_break_or_continue(loop, parent) {
  var found = false;
  var tw = new TreeWalker(function(node) {
    if (found || node instanceof AST_Scope)
      return true;
    if (node instanceof AST_LoopControl && tw.loopcontrol_target(node) === loop) {
      return found = true;
    }
  });
  if (parent instanceof AST_LabeledStatement)
    tw.push(parent);
  tw.push(loop);
  loop.body.walk(tw);
  return found;
}
function maintain_this_binding(parent, orig, val) {
  if (requires_sequence_to_maintain_binding(parent, orig, val)) {
    const zero = make_node(AST_Number, orig, { value: 0 });
    return make_sequence(orig, [zero, val]);
  } else {
    return val;
  }
}
function requires_sequence_to_maintain_binding(parent, orig, val) {
  return parent instanceof AST_UnaryPrefix && parent.operator == "delete" || parent instanceof AST_Call && parent.expression === orig && (val instanceof AST_Chain || val instanceof AST_PropAccess || val instanceof AST_SymbolRef && val.name == "eval");
}
function is_func_expr(node) {
  return node instanceof AST_Arrow || node instanceof AST_Function;
}
function is_iife_call(node) {
  if (node.TYPE != "Call")
    return false;
  return node.expression instanceof AST_Function || is_iife_call(node.expression);
}
function is_empty(thing) {
  if (thing === null)
    return true;
  if (thing instanceof AST_EmptyStatement)
    return true;
  if (thing instanceof AST_BlockStatement)
    return thing.body.length == 0;
  return false;
}
var identifier_atom = makePredicate("Infinity NaN undefined");
function is_identifier_atom(node) {
  return node instanceof AST_Infinity || node instanceof AST_NaN || node instanceof AST_Undefined;
}
function is_ref_of(ref, type) {
  if (!(ref instanceof AST_SymbolRef))
    return false;
  var orig = ref.definition().orig;
  for (var i = orig.length;--i >= 0; ) {
    if (orig[i] instanceof type)
      return true;
  }
}
function can_be_evicted_from_block(node) {
  return !(node instanceof AST_DefClass || node instanceof AST_Defun || node instanceof AST_Let || node instanceof AST_Const || node instanceof AST_Export || node instanceof AST_Import);
}
function as_statement_array(thing) {
  if (thing === null)
    return [];
  if (thing instanceof AST_BlockStatement)
    return thing.body;
  if (thing instanceof AST_EmptyStatement)
    return [];
  if (thing instanceof AST_Statement)
    return [thing];
  throw new Error("Can't convert thing to statement array");
}
function is_reachable(scope_node, defs) {
  const find_ref = (node) => {
    if (node instanceof AST_SymbolRef && defs.includes(node.definition())) {
      return walk_abort;
    }
  };
  return walk_parent(scope_node, (node, info) => {
    if (node instanceof AST_Scope && node !== scope_node) {
      var parent = info.parent();
      if (parent instanceof AST_Call && parent.expression === node && !(node.async || node.is_generator)) {
        return;
      }
      if (walk(node, find_ref))
        return walk_abort;
      return true;
    }
  });
}
function is_recursive_ref(tw, def) {
  var node;
  for (var i = 0;node = tw.parent(i); i++) {
    if (node instanceof AST_Lambda || node instanceof AST_Class) {
      var name = node.name;
      if (name && name.definition() === def) {
        return true;
      }
    }
  }
  return false;
}
function retain_top_func(fn, compressor) {
  return compressor.top_retain && fn instanceof AST_Defun && has_flag(fn, TOP) && fn.name && compressor.top_retain(fn.name.definition());
}

// node_modules/terser/lib/compress/native-objects.js
function make_nested_lookup(obj) {
  const out = new Map;
  for (var key of Object.keys(obj)) {
    out.set(key, makePredicate(obj[key]));
  }
  const does_have = (global_name, fname) => {
    const inner_map = out.get(global_name);
    return inner_map != null && inner_map.has(fname);
  };
  return does_have;
}
var pure_prop_access_globals = new Set([
  "Number",
  "String",
  "Array",
  "Object",
  "Function",
  "Promise"
]);
var object_methods = [
  "constructor",
  "toString",
  "valueOf"
];
var is_pure_native_method = make_nested_lookup({
  Array: [
    "at",
    "flat",
    "includes",
    "indexOf",
    "join",
    "lastIndexOf",
    "slice",
    ...object_methods
  ],
  Boolean: object_methods,
  Function: object_methods,
  Number: [
    "toExponential",
    "toFixed",
    "toPrecision",
    ...object_methods
  ],
  Object: object_methods,
  RegExp: [
    "test",
    ...object_methods
  ],
  String: [
    "at",
    "charAt",
    "charCodeAt",
    "charPointAt",
    "concat",
    "endsWith",
    "fromCharCode",
    "fromCodePoint",
    "includes",
    "indexOf",
    "italics",
    "lastIndexOf",
    "localeCompare",
    "match",
    "matchAll",
    "normalize",
    "padStart",
    "padEnd",
    "repeat",
    "replace",
    "replaceAll",
    "search",
    "slice",
    "split",
    "startsWith",
    "substr",
    "substring",
    "repeat",
    "toLocaleLowerCase",
    "toLocaleUpperCase",
    "toLowerCase",
    "toUpperCase",
    "trim",
    "trimEnd",
    "trimStart",
    ...object_methods
  ]
});
var is_pure_native_fn = make_nested_lookup({
  Array: [
    "isArray"
  ],
  Math: [
    "abs",
    "acos",
    "asin",
    "atan",
    "ceil",
    "cos",
    "exp",
    "floor",
    "log",
    "round",
    "sin",
    "sqrt",
    "tan",
    "atan2",
    "pow",
    "max",
    "min"
  ],
  Number: [
    "isFinite",
    "isNaN"
  ],
  Object: [
    "create",
    "getOwnPropertyDescriptor",
    "getOwnPropertyNames",
    "getPrototypeOf",
    "isExtensible",
    "isFrozen",
    "isSealed",
    "hasOwn",
    "keys"
  ],
  String: [
    "fromCharCode"
  ]
});
var is_pure_native_value = make_nested_lookup({
  Math: [
    "E",
    "LN10",
    "LN2",
    "LOG2E",
    "LOG10E",
    "PI",
    "SQRT1_2",
    "SQRT2"
  ],
  Number: [
    "MAX_VALUE",
    "MIN_VALUE",
    "NaN",
    "NEGATIVE_INFINITY",
    "POSITIVE_INFINITY"
  ]
});

// node_modules/terser/lib/compress/inference.js
var is_undeclared_ref = (node) => node instanceof AST_SymbolRef && node.definition().undeclared;
var bitwise_binop = makePredicate("<<< >> << & | ^ ~");
var lazy_op = makePredicate("&& || ??");
var unary_side_effects = makePredicate("delete ++ --");
(function(def_is_boolean) {
  const unary_bool = makePredicate("! delete");
  const binary_bool = makePredicate("in instanceof == != === !== < <= >= >");
  def_is_boolean(AST_Node, return_false);
  def_is_boolean(AST_UnaryPrefix, function() {
    return unary_bool.has(this.operator);
  });
  def_is_boolean(AST_Binary, function() {
    return binary_bool.has(this.operator) || lazy_op.has(this.operator) && this.left.is_boolean() && this.right.is_boolean();
  });
  def_is_boolean(AST_Conditional, function() {
    return this.consequent.is_boolean() && this.alternative.is_boolean();
  });
  def_is_boolean(AST_Assign, function() {
    return this.operator == "=" && this.right.is_boolean();
  });
  def_is_boolean(AST_Sequence, function() {
    return this.tail_node().is_boolean();
  });
  def_is_boolean(AST_True, return_true);
  def_is_boolean(AST_False, return_true);
})(function(node, func) {
  node.DEFMETHOD("is_boolean", func);
});
(function(def_is_number) {
  def_is_number(AST_Node, return_false);
  def_is_number(AST_Number, return_true);
  const unary = makePredicate("+ - ~ ++ --");
  def_is_number(AST_Unary, function(compressor) {
    return unary.has(this.operator) && this.expression.is_number(compressor);
  });
  const numeric_ops = makePredicate("- * / % & | ^ << >> >>>");
  def_is_number(AST_Binary, function(compressor) {
    if (this.operator === "+") {
      return this.left.is_number(compressor) && this.right.is_number_or_bigint(compressor) || this.right.is_number(compressor) && this.left.is_number_or_bigint(compressor);
    } else if (numeric_ops.has(this.operator)) {
      return this.left.is_number(compressor) || this.right.is_number(compressor);
    } else {
      return false;
    }
  });
  def_is_number(AST_Assign, function(compressor) {
    return (this.operator === "=" || numeric_ops.has(this.operator.slice(0, -1))) && this.right.is_number(compressor);
  });
  def_is_number(AST_Sequence, function(compressor) {
    return this.tail_node().is_number(compressor);
  });
  def_is_number(AST_Conditional, function(compressor) {
    return this.consequent.is_number(compressor) && this.alternative.is_number(compressor);
  });
})(function(node, func) {
  node.DEFMETHOD("is_number", func);
});
(function(def_is_bigint) {
  def_is_bigint(AST_Node, return_false);
  def_is_bigint(AST_BigInt, return_true);
  const unary = makePredicate("+ - ~ ++ --");
  def_is_bigint(AST_Unary, function(compressor) {
    return unary.has(this.operator) && this.expression.is_bigint(compressor);
  });
  const numeric_ops = makePredicate("- * / % & | ^ << >>");
  def_is_bigint(AST_Binary, function(compressor) {
    if (this.operator === "+") {
      return this.left.is_bigint(compressor) && this.right.is_number_or_bigint(compressor) || this.right.is_bigint(compressor) && this.left.is_number_or_bigint(compressor);
    } else if (numeric_ops.has(this.operator)) {
      return this.left.is_bigint(compressor) || this.right.is_bigint(compressor);
    } else {
      return false;
    }
  });
  def_is_bigint(AST_Assign, function(compressor) {
    return (numeric_ops.has(this.operator.slice(0, -1)) || this.operator == "=") && this.right.is_bigint(compressor);
  });
  def_is_bigint(AST_Sequence, function(compressor) {
    return this.tail_node().is_bigint(compressor);
  });
  def_is_bigint(AST_Conditional, function(compressor) {
    return this.consequent.is_bigint(compressor) && this.alternative.is_bigint(compressor);
  });
})(function(node, func) {
  node.DEFMETHOD("is_bigint", func);
});
(function(def_is_number_or_bigint) {
  def_is_number_or_bigint(AST_Node, return_false);
  def_is_number_or_bigint(AST_Number, return_true);
  def_is_number_or_bigint(AST_BigInt, return_true);
  const numeric_unary_ops = makePredicate("+ - ~ ++ --");
  def_is_number_or_bigint(AST_Unary, function(_compressor) {
    return numeric_unary_ops.has(this.operator);
  });
  const numeric_ops = makePredicate("- * / % & | ^ << >>");
  def_is_number_or_bigint(AST_Binary, function(compressor) {
    return this.operator === "+" ? this.left.is_number_or_bigint(compressor) && this.right.is_number_or_bigint(compressor) : numeric_ops.has(this.operator);
  });
  def_is_number_or_bigint(AST_Assign, function(compressor) {
    return numeric_ops.has(this.operator.slice(0, -1)) || this.operator == "=" && this.right.is_number_or_bigint(compressor);
  });
  def_is_number_or_bigint(AST_Sequence, function(compressor) {
    return this.tail_node().is_number_or_bigint(compressor);
  });
  def_is_number_or_bigint(AST_Conditional, function(compressor) {
    return this.consequent.is_number_or_bigint(compressor) && this.alternative.is_number_or_bigint(compressor);
  });
})(function(node, func) {
  node.DEFMETHOD("is_number_or_bigint", func);
});
(function(def_is_32_bit_integer) {
  def_is_32_bit_integer(AST_Node, return_false);
  def_is_32_bit_integer(AST_Number, function(_compressor) {
    return this.value === (this.value | 0);
  });
  def_is_32_bit_integer(AST_UnaryPrefix, function(compressor) {
    return this.operator == "~" ? this.expression.is_number(compressor) : this.operator === "+" ? this.expression.is_32_bit_integer(compressor) : false;
  });
  def_is_32_bit_integer(AST_Binary, function(compressor) {
    return bitwise_binop.has(this.operator) && (this.left.is_number(compressor) || this.right.is_number(compressor));
  });
})(function(node, func) {
  node.DEFMETHOD("is_32_bit_integer", func);
});
(function(def_is_string) {
  def_is_string(AST_Node, return_false);
  def_is_string(AST_String, return_true);
  def_is_string(AST_TemplateString, return_true);
  def_is_string(AST_UnaryPrefix, function() {
    return this.operator == "typeof";
  });
  def_is_string(AST_Binary, function(compressor) {
    return this.operator == "+" && (this.left.is_string(compressor) || this.right.is_string(compressor));
  });
  def_is_string(AST_Assign, function(compressor) {
    return (this.operator == "=" || this.operator == "+=") && this.right.is_string(compressor);
  });
  def_is_string(AST_Sequence, function(compressor) {
    return this.tail_node().is_string(compressor);
  });
  def_is_string(AST_Conditional, function(compressor) {
    return this.consequent.is_string(compressor) && this.alternative.is_string(compressor);
  });
})(function(node, func) {
  node.DEFMETHOD("is_string", func);
});
function is_undefined(node, compressor) {
  return has_flag(node, UNDEFINED) || node instanceof AST_Undefined || node instanceof AST_UnaryPrefix && node.operator == "void" && !node.expression.has_side_effects(compressor);
}
function is_null_or_undefined(node, compressor) {
  let fixed;
  return node instanceof AST_Null || is_undefined(node, compressor) || node instanceof AST_SymbolRef && (fixed = node.definition().fixed) instanceof AST_Node && is_nullish(fixed, compressor);
}
function is_nullish_shortcircuited(node, compressor) {
  if (node instanceof AST_PropAccess || node instanceof AST_Call) {
    return node.optional && is_null_or_undefined(node.expression, compressor) || is_nullish_shortcircuited(node.expression, compressor);
  }
  if (node instanceof AST_Chain)
    return is_nullish_shortcircuited(node.expression, compressor);
  return false;
}
function is_nullish(node, compressor) {
  if (is_null_or_undefined(node, compressor))
    return true;
  return is_nullish_shortcircuited(node, compressor);
}
(function(def_has_side_effects) {
  def_has_side_effects(AST_Node, return_true);
  def_has_side_effects(AST_EmptyStatement, return_false);
  def_has_side_effects(AST_Constant, return_false);
  def_has_side_effects(AST_This, return_false);
  function any(list, compressor) {
    for (var i = list.length;--i >= 0; )
      if (list[i].has_side_effects(compressor))
        return true;
    return false;
  }
  def_has_side_effects(AST_Block, function(compressor) {
    return any(this.body, compressor);
  });
  def_has_side_effects(AST_Call, function(compressor) {
    if (!this.is_callee_pure(compressor) && (!this.expression.is_call_pure(compressor) || this.expression.has_side_effects(compressor))) {
      return true;
    }
    return any(this.args, compressor);
  });
  def_has_side_effects(AST_Switch, function(compressor) {
    return this.expression.has_side_effects(compressor) || any(this.body, compressor);
  });
  def_has_side_effects(AST_Case, function(compressor) {
    return this.expression.has_side_effects(compressor) || any(this.body, compressor);
  });
  def_has_side_effects(AST_Try, function(compressor) {
    return this.body.has_side_effects(compressor) || this.bcatch && this.bcatch.has_side_effects(compressor) || this.bfinally && this.bfinally.has_side_effects(compressor);
  });
  def_has_side_effects(AST_If, function(compressor) {
    return this.condition.has_side_effects(compressor) || this.body && this.body.has_side_effects(compressor) || this.alternative && this.alternative.has_side_effects(compressor);
  });
  def_has_side_effects(AST_ImportMeta, return_false);
  def_has_side_effects(AST_LabeledStatement, function(compressor) {
    return this.body.has_side_effects(compressor);
  });
  def_has_side_effects(AST_SimpleStatement, function(compressor) {
    return this.body.has_side_effects(compressor);
  });
  def_has_side_effects(AST_Lambda, return_false);
  def_has_side_effects(AST_Class, function(compressor) {
    if (this.extends && this.extends.has_side_effects(compressor)) {
      return true;
    }
    return any(this.properties, compressor);
  });
  def_has_side_effects(AST_ClassStaticBlock, function(compressor) {
    return any(this.body, compressor);
  });
  def_has_side_effects(AST_Binary, function(compressor) {
    return this.left.has_side_effects(compressor) || this.right.has_side_effects(compressor);
  });
  def_has_side_effects(AST_Assign, return_true);
  def_has_side_effects(AST_Conditional, function(compressor) {
    return this.condition.has_side_effects(compressor) || this.consequent.has_side_effects(compressor) || this.alternative.has_side_effects(compressor);
  });
  def_has_side_effects(AST_Unary, function(compressor) {
    return unary_side_effects.has(this.operator) || this.expression.has_side_effects(compressor);
  });
  def_has_side_effects(AST_SymbolRef, function(compressor) {
    return !this.is_declared(compressor) && !pure_prop_access_globals.has(this.name);
  });
  def_has_side_effects(AST_SymbolClassProperty, return_false);
  def_has_side_effects(AST_SymbolDeclaration, return_false);
  def_has_side_effects(AST_Object, function(compressor) {
    return any(this.properties, compressor);
  });
  def_has_side_effects(AST_ObjectKeyVal, function(compressor) {
    return this.computed_key() && this.key.has_side_effects(compressor) || this.value && this.value.has_side_effects(compressor);
  });
  def_has_side_effects([
    AST_ClassProperty,
    AST_ClassPrivateProperty
  ], function(compressor) {
    return this.computed_key() && this.key.has_side_effects(compressor) || this.static && this.value && this.value.has_side_effects(compressor);
  });
  def_has_side_effects([
    AST_PrivateMethod,
    AST_PrivateGetter,
    AST_PrivateSetter,
    AST_ConciseMethod,
    AST_ObjectGetter,
    AST_ObjectSetter
  ], function(compressor) {
    return this.computed_key() && this.key.has_side_effects(compressor);
  });
  def_has_side_effects(AST_Array, function(compressor) {
    return any(this.elements, compressor);
  });
  def_has_side_effects(AST_Dot, function(compressor) {
    if (is_nullish(this, compressor)) {
      return this.expression.has_side_effects(compressor);
    }
    if (!this.optional && this.expression.may_throw_on_access(compressor)) {
      return true;
    }
    return this.expression.has_side_effects(compressor);
  });
  def_has_side_effects(AST_Sub, function(compressor) {
    if (is_nullish(this, compressor)) {
      return this.expression.has_side_effects(compressor);
    }
    if (!this.optional && this.expression.may_throw_on_access(compressor)) {
      return true;
    }
    var property = this.property.has_side_effects(compressor);
    if (property && this.optional)
      return true;
    return property || this.expression.has_side_effects(compressor);
  });
  def_has_side_effects(AST_Chain, function(compressor) {
    return this.expression.has_side_effects(compressor);
  });
  def_has_side_effects(AST_Sequence, function(compressor) {
    return any(this.expressions, compressor);
  });
  def_has_side_effects(AST_Definitions, function(compressor) {
    return any(this.definitions, compressor);
  });
  def_has_side_effects(AST_VarDef, function() {
    return this.value != null;
  });
  def_has_side_effects(AST_TemplateSegment, return_false);
  def_has_side_effects(AST_TemplateString, function(compressor) {
    return any(this.segments, compressor);
  });
})(function(node_or_nodes, func) {
  for (const node of [].concat(node_or_nodes)) {
    node.DEFMETHOD("has_side_effects", func);
  }
});
(function(def_may_throw) {
  def_may_throw(AST_Node, return_true);
  def_may_throw(AST_Constant, return_false);
  def_may_throw(AST_EmptyStatement, return_false);
  def_may_throw(AST_Lambda, return_false);
  def_may_throw(AST_SymbolDeclaration, return_false);
  def_may_throw(AST_This, return_false);
  def_may_throw(AST_ImportMeta, return_false);
  function any(list, compressor) {
    for (var i = list.length;--i >= 0; )
      if (list[i].may_throw(compressor))
        return true;
    return false;
  }
  def_may_throw(AST_Class, function(compressor) {
    if (this.extends && this.extends.may_throw(compressor))
      return true;
    return any(this.properties, compressor);
  });
  def_may_throw(AST_ClassStaticBlock, function(compressor) {
    return any(this.body, compressor);
  });
  def_may_throw(AST_Array, function(compressor) {
    return any(this.elements, compressor);
  });
  def_may_throw(AST_Assign, function(compressor) {
    if (this.right.may_throw(compressor))
      return true;
    if (!compressor.has_directive("use strict") && this.operator == "=" && this.left instanceof AST_SymbolRef) {
      return false;
    }
    return this.left.may_throw(compressor);
  });
  def_may_throw(AST_Binary, function(compressor) {
    return this.left.may_throw(compressor) || this.right.may_throw(compressor);
  });
  def_may_throw(AST_Block, function(compressor) {
    return any(this.body, compressor);
  });
  def_may_throw(AST_Call, function(compressor) {
    if (is_nullish(this, compressor))
      return false;
    if (any(this.args, compressor))
      return true;
    if (this.is_callee_pure(compressor))
      return false;
    if (this.expression.may_throw(compressor))
      return true;
    return !(this.expression instanceof AST_Lambda) || any(this.expression.body, compressor);
  });
  def_may_throw(AST_Case, function(compressor) {
    return this.expression.may_throw(compressor) || any(this.body, compressor);
  });
  def_may_throw(AST_Conditional, function(compressor) {
    return this.condition.may_throw(compressor) || this.consequent.may_throw(compressor) || this.alternative.may_throw(compressor);
  });
  def_may_throw(AST_Definitions, function(compressor) {
    return any(this.definitions, compressor);
  });
  def_may_throw(AST_If, function(compressor) {
    return this.condition.may_throw(compressor) || this.body && this.body.may_throw(compressor) || this.alternative && this.alternative.may_throw(compressor);
  });
  def_may_throw(AST_LabeledStatement, function(compressor) {
    return this.body.may_throw(compressor);
  });
  def_may_throw(AST_Object, function(compressor) {
    return any(this.properties, compressor);
  });
  def_may_throw(AST_ObjectKeyVal, function(compressor) {
    return this.computed_key() && this.key.may_throw(compressor) || this.value ? this.value.may_throw(compressor) : false;
  });
  def_may_throw([
    AST_ClassProperty,
    AST_ClassPrivateProperty
  ], function(compressor) {
    return this.computed_key() && this.key.may_throw(compressor) || this.static && this.value && this.value.may_throw(compressor);
  });
  def_may_throw([
    AST_ConciseMethod,
    AST_ObjectGetter,
    AST_ObjectSetter
  ], function(compressor) {
    return this.computed_key() && this.key.may_throw(compressor);
  });
  def_may_throw([
    AST_PrivateMethod,
    AST_PrivateGetter,
    AST_PrivateSetter
  ], return_false);
  def_may_throw(AST_Return, function(compressor) {
    return this.value && this.value.may_throw(compressor);
  });
  def_may_throw(AST_Sequence, function(compressor) {
    return any(this.expressions, compressor);
  });
  def_may_throw(AST_SimpleStatement, function(compressor) {
    return this.body.may_throw(compressor);
  });
  def_may_throw(AST_Dot, function(compressor) {
    if (is_nullish(this, compressor))
      return false;
    return !this.optional && this.expression.may_throw_on_access(compressor) || this.expression.may_throw(compressor);
  });
  def_may_throw(AST_Sub, function(compressor) {
    if (is_nullish(this, compressor))
      return false;
    return !this.optional && this.expression.may_throw_on_access(compressor) || this.expression.may_throw(compressor) || this.property.may_throw(compressor);
  });
  def_may_throw(AST_Chain, function(compressor) {
    return this.expression.may_throw(compressor);
  });
  def_may_throw(AST_Switch, function(compressor) {
    return this.expression.may_throw(compressor) || any(this.body, compressor);
  });
  def_may_throw(AST_SymbolRef, function(compressor) {
    return !this.is_declared(compressor) && !pure_prop_access_globals.has(this.name);
  });
  def_may_throw(AST_SymbolClassProperty, return_false);
  def_may_throw(AST_Try, function(compressor) {
    return this.bcatch ? this.bcatch.may_throw(compressor) : this.body.may_throw(compressor) || this.bfinally && this.bfinally.may_throw(compressor);
  });
  def_may_throw(AST_Unary, function(compressor) {
    if (this.operator == "typeof" && this.expression instanceof AST_SymbolRef)
      return false;
    return this.expression.may_throw(compressor);
  });
  def_may_throw(AST_VarDef, function(compressor) {
    if (!this.value)
      return false;
    return this.value.may_throw(compressor);
  });
})(function(node_or_nodes, func) {
  for (const node of [].concat(node_or_nodes)) {
    node.DEFMETHOD("may_throw", func);
  }
});
(function(def_is_constant_expression) {
  function all_refs_local(scope) {
    let result = true;
    walk(this, (node) => {
      if (node instanceof AST_SymbolRef) {
        if (has_flag(this, INLINED)) {
          result = false;
          return walk_abort;
        }
        var def = node.definition();
        if (member(def, this.enclosed) && !this.variables.has(def.name)) {
          if (scope) {
            var scope_def = scope.find_variable(node);
            if (def.undeclared ? !scope_def : scope_def === def) {
              result = "f";
              return true;
            }
          }
          result = false;
          return walk_abort;
        }
        return true;
      }
      if (node instanceof AST_This && this instanceof AST_Arrow) {
        result = false;
        return walk_abort;
      }
    });
    return result;
  }
  def_is_constant_expression(AST_Node, return_false);
  def_is_constant_expression(AST_Constant, return_true);
  def_is_constant_expression(AST_Class, function(scope) {
    if (this.extends && !this.extends.is_constant_expression(scope)) {
      return false;
    }
    for (const prop of this.properties) {
      if (prop.computed_key() && !prop.key.is_constant_expression(scope)) {
        return false;
      }
      if (prop.static && prop.value && !prop.value.is_constant_expression(scope)) {
        return false;
      }
      if (prop instanceof AST_ClassStaticBlock) {
        return false;
      }
    }
    return all_refs_local.call(this, scope);
  });
  def_is_constant_expression(AST_Lambda, all_refs_local);
  def_is_constant_expression(AST_Unary, function() {
    return this.expression.is_constant_expression();
  });
  def_is_constant_expression(AST_Binary, function() {
    return this.left.is_constant_expression() && this.right.is_constant_expression();
  });
  def_is_constant_expression(AST_Array, function() {
    return this.elements.every((l) => l.is_constant_expression());
  });
  def_is_constant_expression(AST_Object, function() {
    return this.properties.every((l) => l.is_constant_expression());
  });
  def_is_constant_expression(AST_ObjectProperty, function() {
    return !!(!(this.key instanceof AST_Node) && this.value && this.value.is_constant_expression());
  });
})(function(node, func) {
  node.DEFMETHOD("is_constant_expression", func);
});
(function(def_may_throw_on_access) {
  AST_Node.DEFMETHOD("may_throw_on_access", function(compressor) {
    return !compressor.option("pure_getters") || this._dot_throw(compressor);
  });
  function is_strict(compressor) {
    return /strict/.test(compressor.option("pure_getters"));
  }
  def_may_throw_on_access(AST_Node, is_strict);
  def_may_throw_on_access(AST_Null, return_true);
  def_may_throw_on_access(AST_Undefined, return_true);
  def_may_throw_on_access(AST_Constant, return_false);
  def_may_throw_on_access(AST_Array, return_false);
  def_may_throw_on_access(AST_Object, function(compressor) {
    if (!is_strict(compressor))
      return false;
    for (var i = this.properties.length;--i >= 0; )
      if (this.properties[i]._dot_throw(compressor))
        return true;
    return false;
  });
  def_may_throw_on_access(AST_Class, return_false);
  def_may_throw_on_access(AST_ObjectProperty, return_false);
  def_may_throw_on_access(AST_ObjectGetter, return_true);
  def_may_throw_on_access(AST_Expansion, function(compressor) {
    return this.expression._dot_throw(compressor);
  });
  def_may_throw_on_access(AST_Function, return_false);
  def_may_throw_on_access(AST_Arrow, return_false);
  def_may_throw_on_access(AST_UnaryPostfix, return_false);
  def_may_throw_on_access(AST_UnaryPrefix, function() {
    return this.operator == "void";
  });
  def_may_throw_on_access(AST_Binary, function(compressor) {
    return (this.operator == "&&" || this.operator == "||" || this.operator == "??") && (this.left._dot_throw(compressor) || this.right._dot_throw(compressor));
  });
  def_may_throw_on_access(AST_Assign, function(compressor) {
    if (this.logical)
      return true;
    return this.operator == "=" && this.right._dot_throw(compressor);
  });
  def_may_throw_on_access(AST_Conditional, function(compressor) {
    return this.consequent._dot_throw(compressor) || this.alternative._dot_throw(compressor);
  });
  def_may_throw_on_access(AST_Dot, function(compressor) {
    if (!is_strict(compressor))
      return false;
    if (this.property == "prototype") {
      return !(this.expression instanceof AST_Function || this.expression instanceof AST_Class);
    }
    return true;
  });
  def_may_throw_on_access(AST_Chain, function(compressor) {
    return this.expression._dot_throw(compressor);
  });
  def_may_throw_on_access(AST_Sequence, function(compressor) {
    return this.tail_node()._dot_throw(compressor);
  });
  def_may_throw_on_access(AST_SymbolRef, function(compressor) {
    if (this.name === "arguments" && this.scope instanceof AST_Lambda)
      return false;
    if (has_flag(this, UNDEFINED))
      return true;
    if (!is_strict(compressor))
      return false;
    if (is_undeclared_ref(this) && this.is_declared(compressor))
      return false;
    if (this.is_immutable())
      return false;
    var fixed = this.fixed_value();
    return !fixed || fixed._dot_throw(compressor);
  });
})(function(node, func) {
  node.DEFMETHOD("_dot_throw", func);
});
function is_lhs(node, parent) {
  if (parent instanceof AST_Unary && unary_side_effects.has(parent.operator))
    return parent.expression;
  if (parent instanceof AST_Assign && parent.left === node)
    return node;
  if (parent instanceof AST_ForIn && parent.init === node)
    return node;
}
(function(def_negate) {
  function basic_negation(exp) {
    return make_node(AST_UnaryPrefix, exp, {
      operator: "!",
      expression: exp
    });
  }
  function best(orig, alt, first_in_statement2) {
    var negated = basic_negation(orig);
    if (first_in_statement2) {
      var stat = make_node(AST_SimpleStatement, alt, {
        body: alt
      });
      return best_of_expression(negated, stat) === stat ? alt : negated;
    }
    return best_of_expression(negated, alt);
  }
  def_negate(AST_Node, function() {
    return basic_negation(this);
  });
  def_negate(AST_Statement, function() {
    throw new Error("Cannot negate a statement");
  });
  def_negate(AST_Function, function() {
    return basic_negation(this);
  });
  def_negate(AST_Class, function() {
    return basic_negation(this);
  });
  def_negate(AST_Arrow, function() {
    return basic_negation(this);
  });
  def_negate(AST_UnaryPrefix, function() {
    if (this.operator == "!")
      return this.expression;
    return basic_negation(this);
  });
  def_negate(AST_Sequence, function(compressor) {
    var expressions = this.expressions.slice();
    expressions.push(expressions.pop().negate(compressor));
    return make_sequence(this, expressions);
  });
  def_negate(AST_Conditional, function(compressor, first_in_statement2) {
    var self2 = this.clone();
    self2.consequent = self2.consequent.negate(compressor);
    self2.alternative = self2.alternative.negate(compressor);
    return best(this, self2, first_in_statement2);
  });
  def_negate(AST_Binary, function(compressor, first_in_statement2) {
    var self2 = this.clone(), op = this.operator;
    if (compressor.option("unsafe_comps")) {
      switch (op) {
        case "<=":
          self2.operator = ">";
          return self2;
        case "<":
          self2.operator = ">=";
          return self2;
        case ">=":
          self2.operator = "<";
          return self2;
        case ">":
          self2.operator = "<=";
          return self2;
      }
    }
    switch (op) {
      case "==":
        self2.operator = "!=";
        return self2;
      case "!=":
        self2.operator = "==";
        return self2;
      case "===":
        self2.operator = "!==";
        return self2;
      case "!==":
        self2.operator = "===";
        return self2;
      case "&&":
        self2.operator = "||";
        self2.left = self2.left.negate(compressor, first_in_statement2);
        self2.right = self2.right.negate(compressor);
        return best(this, self2, first_in_statement2);
      case "||":
        self2.operator = "&&";
        self2.left = self2.left.negate(compressor, first_in_statement2);
        self2.right = self2.right.negate(compressor);
        return best(this, self2, first_in_statement2);
    }
    return basic_negation(this);
  });
})(function(node, func) {
  node.DEFMETHOD("negate", function(compressor, first_in_statement2) {
    return func.call(this, compressor, first_in_statement2);
  });
});
(function(def_bitwise_negate) {
  function basic_bitwise_negation(exp) {
    return make_node(AST_UnaryPrefix, exp, {
      operator: "~",
      expression: exp
    });
  }
  def_bitwise_negate(AST_Node, function(_compressor) {
    return basic_bitwise_negation(this);
  });
  def_bitwise_negate(AST_Number, function(_compressor) {
    const neg = ~this.value;
    if (neg.toString().length > this.value.toString().length) {
      return basic_bitwise_negation(this);
    }
    return make_node(AST_Number, this, { value: neg });
  });
  def_bitwise_negate(AST_UnaryPrefix, function(compressor, in_32_bit_context) {
    if (this.operator == "~" && (this.expression.is_32_bit_integer(compressor) || (in_32_bit_context != null ? in_32_bit_context : compressor.in_32_bit_context()))) {
      return this.expression;
    } else {
      return basic_bitwise_negation(this);
    }
  });
})(function(node, func) {
  node.DEFMETHOD("bitwise_negate", func);
});
var global_pure_fns = makePredicate("Boolean decodeURI decodeURIComponent Date encodeURI encodeURIComponent Error escape EvalError isFinite isNaN Number Object parseFloat parseInt RangeError ReferenceError String SyntaxError TypeError unescape URIError");
AST_Call.DEFMETHOD("is_callee_pure", function(compressor) {
  if (compressor.option("unsafe")) {
    var expr = this.expression;
    var first_arg = this.args && this.args[0] && this.args[0].evaluate(compressor);
    if (expr.expression && expr.expression.name === "hasOwnProperty" && (first_arg == null || first_arg.thedef && first_arg.thedef.undeclared)) {
      return false;
    }
    if (is_undeclared_ref(expr) && global_pure_fns.has(expr.name))
      return true;
    if (expr instanceof AST_Dot && is_undeclared_ref(expr.expression) && is_pure_native_fn(expr.expression.name, expr.property)) {
      return true;
    }
  }
  if (this instanceof AST_New && compressor.option("pure_new")) {
    return true;
  }
  if (compressor.option("side_effects") && has_annotation(this, _PURE)) {
    return true;
  }
  return !compressor.pure_funcs(this);
});
AST_Node.DEFMETHOD("is_call_pure", return_false);
AST_Dot.DEFMETHOD("is_call_pure", function(compressor) {
  if (!compressor.option("unsafe"))
    return;
  const expr = this.expression;
  let native_obj;
  if (expr instanceof AST_Array) {
    native_obj = "Array";
  } else if (expr.is_boolean()) {
    native_obj = "Boolean";
  } else if (expr.is_number(compressor)) {
    native_obj = "Number";
  } else if (expr instanceof AST_RegExp) {
    native_obj = "RegExp";
  } else if (expr.is_string(compressor)) {
    native_obj = "String";
  } else if (!this.may_throw_on_access(compressor)) {
    native_obj = "Object";
  }
  return native_obj != null && is_pure_native_method(native_obj, this.property);
});
var aborts = (thing) => thing && thing.aborts();
(function(def_aborts) {
  def_aborts(AST_Statement, return_null);
  def_aborts(AST_Jump, return_this);
  function block_aborts() {
    for (var i = 0;i < this.body.length; i++) {
      if (aborts(this.body[i])) {
        return this.body[i];
      }
    }
    return null;
  }
  def_aborts(AST_Import, return_null);
  def_aborts(AST_BlockStatement, block_aborts);
  def_aborts(AST_SwitchBranch, block_aborts);
  def_aborts(AST_DefClass, function() {
    for (const prop of this.properties) {
      if (prop instanceof AST_ClassStaticBlock) {
        if (prop.aborts())
          return prop;
      }
    }
    return null;
  });
  def_aborts(AST_ClassStaticBlock, block_aborts);
  def_aborts(AST_If, function() {
    return this.alternative && aborts(this.body) && aborts(this.alternative) && this;
  });
})(function(node, func) {
  node.DEFMETHOD("aborts", func);
});
AST_Node.DEFMETHOD("contains_this", function() {
  return walk(this, (node) => {
    if (node instanceof AST_This)
      return walk_abort;
    if (node !== this && node instanceof AST_Scope && !(node instanceof AST_Arrow)) {
      return true;
    }
  });
});
function is_modified(compressor, tw, node, value, level, immutable) {
  var parent = tw.parent(level);
  var lhs = is_lhs(node, parent);
  if (lhs)
    return lhs;
  if (!immutable && parent instanceof AST_Call && parent.expression === node && !(value instanceof AST_Arrow) && !(value instanceof AST_Class) && !parent.is_callee_pure(compressor) && (!(value instanceof AST_Function) || !(parent instanceof AST_New) && value.contains_this())) {
    return true;
  }
  if (parent instanceof AST_Array) {
    return is_modified(compressor, tw, parent, parent, level + 1);
  }
  if (parent instanceof AST_ObjectKeyVal && node === parent.value) {
    var obj = tw.parent(level + 1);
    return is_modified(compressor, tw, obj, obj, level + 2);
  }
  if (parent instanceof AST_PropAccess && parent.expression === node) {
    var prop = read_property(value, parent.property);
    return !immutable && is_modified(compressor, tw, parent, prop, level + 1);
  }
}
function is_used_in_expression(tw) {
  for (let p = -1, node, parent;node = tw.parent(p), parent = tw.parent(p + 1); p++) {
    if (parent instanceof AST_Sequence) {
      const nth_expression = parent.expressions.indexOf(node);
      if (nth_expression !== parent.expressions.length - 1) {
        const grandparent = tw.parent(p + 2);
        if (parent.expressions.length > 2 || parent.expressions.length === 1 || !requires_sequence_to_maintain_binding(grandparent, parent, parent.expressions[1])) {
          return false;
        }
        return true;
      } else {
        continue;
      }
    }
    if (parent instanceof AST_Unary) {
      const op = parent.operator;
      if (op === "void") {
        return false;
      }
      if (op === "typeof" || op === "+" || op === "-" || op === "!" || op === "~") {
        continue;
      }
    }
    if (parent instanceof AST_SimpleStatement || parent instanceof AST_LabeledStatement) {
      return false;
    }
    if (parent instanceof AST_Scope) {
      return false;
    }
    return true;
  }
  return true;
}

// node_modules/terser/lib/compress/evaluate.js
function def_eval(node, func) {
  node.DEFMETHOD("_eval", func);
}
var nullish = Symbol("This AST_Chain is nullish");
AST_Node.DEFMETHOD("evaluate", function(compressor) {
  if (!compressor.option("evaluate"))
    return this;
  var val = this._eval(compressor, 1);
  if (!val || val instanceof RegExp)
    return val;
  if (typeof val == "function" || typeof val == "object" || val == nullish)
    return this;
  if (typeof val === "string") {
    const unevaluated_size = this.size(compressor);
    if (val.length + 2 > unevaluated_size)
      return this;
  }
  return val;
});
var unaryPrefix = makePredicate("! ~ - + void");
AST_Node.DEFMETHOD("is_constant", function() {
  if (this instanceof AST_Constant) {
    return !(this instanceof AST_RegExp);
  } else {
    return this instanceof AST_UnaryPrefix && unaryPrefix.has(this.operator) && (this.expression instanceof AST_Constant || this.expression.is_constant());
  }
});
def_eval(AST_Statement, function() {
  throw new Error(string_template("Cannot evaluate a statement [{file}:{line},{col}]", this.start));
});
def_eval(AST_Lambda, return_this);
def_eval(AST_Class, return_this);
def_eval(AST_Node, return_this);
def_eval(AST_Constant, function() {
  return this.getValue();
});
var supports_bigint = typeof BigInt === "function";
def_eval(AST_BigInt, function() {
  if (supports_bigint) {
    return BigInt(this.value);
  } else {
    return this;
  }
});
def_eval(AST_RegExp, function(compressor) {
  let evaluated = compressor.evaluated_regexps.get(this.value);
  if (evaluated === undefined && regexp_is_safe(this.value.source)) {
    try {
      const { source, flags } = this.value;
      evaluated = new RegExp(source, flags);
    } catch (e) {
      evaluated = null;
    }
    compressor.evaluated_regexps.set(this.value, evaluated);
  }
  return evaluated || this;
});
def_eval(AST_TemplateString, function() {
  if (this.segments.length !== 1)
    return this;
  return this.segments[0].value;
});
def_eval(AST_Function, function(compressor) {
  if (compressor.option("unsafe")) {
    var fn = function() {};
    fn.node = this;
    fn.toString = () => this.print_to_string();
    return fn;
  }
  return this;
});
def_eval(AST_Array, function(compressor, depth) {
  if (compressor.option("unsafe")) {
    var elements = [];
    for (var i = 0, len = this.elements.length;i < len; i++) {
      var element = this.elements[i];
      var value = element._eval(compressor, depth);
      if (element === value)
        return this;
      elements.push(value);
    }
    return elements;
  }
  return this;
});
def_eval(AST_Object, function(compressor, depth) {
  if (compressor.option("unsafe")) {
    var val = {};
    for (var i = 0, len = this.properties.length;i < len; i++) {
      var prop = this.properties[i];
      if (prop instanceof AST_Expansion)
        return this;
      var key = prop.key;
      if (key instanceof AST_Symbol) {
        key = key.name;
      } else if (key instanceof AST_Node) {
        key = key._eval(compressor, depth);
        if (key === prop.key)
          return this;
      }
      if (typeof Object.prototype[key] === "function") {
        return this;
      }
      if (prop.value instanceof AST_Function)
        continue;
      val[key] = prop.value._eval(compressor, depth);
      if (val[key] === prop.value)
        return this;
    }
    return val;
  }
  return this;
});
var non_converting_unary = makePredicate("! typeof void");
def_eval(AST_UnaryPrefix, function(compressor, depth) {
  var e = this.expression;
  if (compressor.option("typeofs") && this.operator == "typeof") {
    if (e instanceof AST_Lambda || e instanceof AST_SymbolRef && e.fixed_value() instanceof AST_Lambda) {
      return "function";
    }
    if ((e instanceof AST_Object || e instanceof AST_Array || e instanceof AST_SymbolRef && (e.fixed_value() instanceof AST_Object || e.fixed_value() instanceof AST_Array)) && !e.has_side_effects(compressor)) {
      return "object";
    }
  }
  if (!non_converting_unary.has(this.operator))
    depth++;
  e = e._eval(compressor, depth);
  if (e === this.expression)
    return this;
  switch (this.operator) {
    case "!":
      return !e;
    case "typeof":
      if (e instanceof RegExp)
        return this;
      return typeof e;
    case "void":
      return;
    case "~":
      return ~e;
    case "-":
      return -e;
    case "+":
      return +e;
  }
  return this;
});
var non_converting_binary = makePredicate("&& || ?? === !==");
var identity_comparison = makePredicate("== != === !==");
var has_identity = (value) => typeof value === "object" || typeof value === "function" || typeof value === "symbol";
def_eval(AST_Binary, function(compressor, depth) {
  if (!non_converting_binary.has(this.operator))
    depth++;
  var left = this.left._eval(compressor, depth);
  if (left === this.left)
    return this;
  var right = this.right._eval(compressor, depth);
  if (right === this.right)
    return this;
  if (left != null && right != null && identity_comparison.has(this.operator) && has_identity(left) && has_identity(right) && typeof left === typeof right) {
    return this;
  }
  if (typeof left === "bigint" !== (typeof right === "bigint") || typeof left === "bigint" && (this.operator === ">>>" || this.operator === "/" && Number(right) === 0)) {
    return this;
  }
  var result;
  switch (this.operator) {
    case "&&":
      result = left && right;
      break;
    case "||":
      result = left || right;
      break;
    case "??":
      result = left != null ? left : right;
      break;
    case "|":
      result = left | right;
      break;
    case "&":
      result = left & right;
      break;
    case "^":
      result = left ^ right;
      break;
    case "+":
      result = left + right;
      break;
    case "*":
      result = left * right;
      break;
    case "**":
      result = left ** right;
      break;
    case "/":
      result = left / right;
      break;
    case "%":
      result = left % right;
      break;
    case "-":
      result = left - right;
      break;
    case "<<":
      result = left << right;
      break;
    case ">>":
      result = left >> right;
      break;
    case ">>>":
      result = left >>> right;
      break;
    case "==":
      result = left == right;
      break;
    case "===":
      result = left === right;
      break;
    case "!=":
      result = left != right;
      break;
    case "!==":
      result = left !== right;
      break;
    case "<":
      result = left < right;
      break;
    case "<=":
      result = left <= right;
      break;
    case ">":
      result = left > right;
      break;
    case ">=":
      result = left >= right;
      break;
    default:
      return this;
  }
  if (typeof result === "number" && isNaN(result) && compressor.find_parent(AST_With)) {
    return this;
  }
  return result;
});
def_eval(AST_Conditional, function(compressor, depth) {
  var condition = this.condition._eval(compressor, depth);
  if (condition === this.condition)
    return this;
  var node = condition ? this.consequent : this.alternative;
  var value = node._eval(compressor, depth);
  return value === node ? this : value;
});
var reentrant_ref_eval = new Set;
def_eval(AST_SymbolRef, function(compressor, depth) {
  if (reentrant_ref_eval.has(this))
    return this;
  var fixed = this.fixed_value();
  if (!fixed)
    return this;
  reentrant_ref_eval.add(this);
  const value = fixed._eval(compressor, depth);
  reentrant_ref_eval.delete(this);
  if (value === fixed)
    return this;
  if (value && typeof value == "object") {
    var escaped = this.definition().escaped;
    if (escaped && depth > escaped)
      return this;
  }
  return value;
});
var global_objs = { Array, Math, Number, Object, String };
var regexp_flags = new Set([
  "dotAll",
  "global",
  "ignoreCase",
  "multiline",
  "sticky",
  "unicode"
]);
def_eval(AST_PropAccess, function(compressor, depth) {
  let obj = this.expression._eval(compressor, depth + 1);
  if (obj === nullish || this.optional && obj == null)
    return nullish;
  if (this.property === "length") {
    if (typeof obj === "string") {
      return obj.length;
    }
    const is_spreadless_array = obj instanceof AST_Array && obj.elements.every((el) => !(el instanceof AST_Expansion));
    if (is_spreadless_array && obj.elements.every((el) => !el.has_side_effects(compressor))) {
      return obj.elements.length;
    }
  }
  if (compressor.option("unsafe")) {
    var key = this.property;
    if (key instanceof AST_Node) {
      key = key._eval(compressor, depth);
      if (key === this.property)
        return this;
    }
    var exp = this.expression;
    if (is_undeclared_ref(exp)) {
      var aa;
      var first_arg = exp.name === "hasOwnProperty" && key === "call" && (aa = compressor.parent() && compressor.parent().args) && (aa && aa[0] && aa[0].evaluate(compressor));
      first_arg = first_arg instanceof AST_Dot ? first_arg.expression : first_arg;
      if (first_arg == null || first_arg.thedef && first_arg.thedef.undeclared) {
        return this.clone();
      }
      if (!is_pure_native_value(exp.name, key))
        return this;
      obj = global_objs[exp.name];
    } else {
      if (obj instanceof RegExp) {
        if (key == "source") {
          return regexp_source_fix(obj.source);
        } else if (key == "flags" || regexp_flags.has(key)) {
          return obj[key];
        }
      }
      if (!obj || obj === exp || !HOP(obj, key))
        return this;
      if (typeof obj == "function")
        switch (key) {
          case "name":
            return obj.node.name ? obj.node.name.name : "";
          case "length":
            return obj.node.length_property();
          default:
            return this;
        }
    }
    return obj[key];
  }
  return this;
});
def_eval(AST_Chain, function(compressor, depth) {
  const evaluated = this.expression._eval(compressor, depth);
  return evaluated === nullish ? undefined : evaluated === this.expression ? this : evaluated;
});
def_eval(AST_Call, function(compressor, depth) {
  var exp = this.expression;
  const callee = exp._eval(compressor, depth);
  if (callee === nullish || this.optional && callee == null)
    return nullish;
  if (compressor.option("unsafe") && exp instanceof AST_PropAccess) {
    var key = exp.property;
    if (key instanceof AST_Node) {
      key = key._eval(compressor, depth);
      if (key === exp.property)
        return this;
    }
    var val;
    var e = exp.expression;
    if (is_undeclared_ref(e)) {
      var first_arg = e.name === "hasOwnProperty" && key === "call" && (this.args[0] && this.args[0].evaluate(compressor));
      first_arg = first_arg instanceof AST_Dot ? first_arg.expression : first_arg;
      if (first_arg == null || first_arg.thedef && first_arg.thedef.undeclared) {
        return this.clone();
      }
      if (!is_pure_native_fn(e.name, key))
        return this;
      val = global_objs[e.name];
    } else {
      val = e._eval(compressor, depth + 1);
      if (val === e || !val)
        return this;
      if (!is_pure_native_method(val.constructor.name, key))
        return this;
    }
    var args = [];
    for (var i = 0, len = this.args.length;i < len; i++) {
      var arg = this.args[i];
      var value = arg._eval(compressor, depth);
      if (arg === value)
        return this;
      if (arg instanceof AST_Lambda)
        return this;
      args.push(value);
    }
    try {
      return val[key].apply(val, args);
    } catch (ex) {}
  }
  return this;
});
def_eval(AST_New, return_this);

// node_modules/terser/lib/compress/drop-side-effect-free.js
function def_drop_side_effect_free(node_or_nodes, func) {
  for (const node of [].concat(node_or_nodes)) {
    node.DEFMETHOD("drop_side_effect_free", func);
  }
}
function trim(nodes, compressor, first_in_statement2) {
  var len = nodes.length;
  if (!len)
    return null;
  var ret = [], changed = false;
  for (var i = 0;i < len; i++) {
    var node = nodes[i].drop_side_effect_free(compressor, first_in_statement2);
    changed |= node !== nodes[i];
    if (node) {
      ret.push(node);
      first_in_statement2 = false;
    }
  }
  return changed ? ret.length ? ret : null : nodes;
}
def_drop_side_effect_free(AST_Node, return_this);
def_drop_side_effect_free(AST_Constant, return_null);
def_drop_side_effect_free(AST_This, return_null);
def_drop_side_effect_free(AST_Call, function(compressor, first_in_statement2) {
  if (is_nullish_shortcircuited(this, compressor)) {
    return this.expression.drop_side_effect_free(compressor, first_in_statement2);
  }
  if (!this.is_callee_pure(compressor)) {
    if (this.expression.is_call_pure(compressor)) {
      var exprs = this.args.slice();
      exprs.unshift(this.expression.expression);
      exprs = trim(exprs, compressor, first_in_statement2);
      return exprs && make_sequence(this, exprs);
    }
    if (is_func_expr(this.expression) && (!this.expression.name || !this.expression.name.definition().references.length)) {
      var node = this.clone();
      node.expression.process_expression(false, compressor);
      return node;
    }
    return this;
  }
  var args = trim(this.args, compressor, first_in_statement2);
  return args && make_sequence(this, args);
});
def_drop_side_effect_free(AST_Accessor, return_null);
def_drop_side_effect_free(AST_Function, return_null);
def_drop_side_effect_free(AST_Arrow, return_null);
def_drop_side_effect_free(AST_Class, function(compressor) {
  const with_effects = [];
  if (this.is_self_referential() && this.has_side_effects(compressor)) {
    return this;
  }
  const trimmed_extends = this.extends && this.extends.drop_side_effect_free(compressor);
  if (trimmed_extends)
    with_effects.push(trimmed_extends);
  for (const prop of this.properties) {
    if (prop instanceof AST_ClassStaticBlock) {
      if (prop.has_side_effects(compressor)) {
        return this;
      }
    } else {
      const trimmed_prop = prop.drop_side_effect_free(compressor);
      if (trimmed_prop)
        with_effects.push(trimmed_prop);
    }
  }
  if (!with_effects.length)
    return null;
  const exprs = make_sequence(this, with_effects);
  if (this instanceof AST_DefClass) {
    return make_node(AST_SimpleStatement, this, { body: exprs });
  } else {
    return exprs;
  }
});
def_drop_side_effect_free([
  AST_ClassProperty,
  AST_ClassPrivateProperty
], function(compressor) {
  const key = this.computed_key() && this.key.drop_side_effect_free(compressor);
  const value = this.static && this.value && this.value.drop_side_effect_free(compressor);
  if (key && value)
    return make_sequence(this, [key, value]);
  return key || value || null;
});
def_drop_side_effect_free(AST_Binary, function(compressor, first_in_statement2) {
  var right = this.right.drop_side_effect_free(compressor);
  if (!right)
    return this.left.drop_side_effect_free(compressor, first_in_statement2);
  if (lazy_op.has(this.operator)) {
    if (right === this.right)
      return this;
    var node = this.clone();
    node.right = right;
    return node;
  } else {
    var left = this.left.drop_side_effect_free(compressor, first_in_statement2);
    if (!left)
      return this.right.drop_side_effect_free(compressor, first_in_statement2);
    return make_sequence(this, [left, right]);
  }
});
def_drop_side_effect_free(AST_Assign, function(compressor) {
  if (this.logical)
    return this;
  var left = this.left;
  if (left.has_side_effects(compressor) || compressor.has_directive("use strict") && left instanceof AST_PropAccess && left.expression.is_constant()) {
    return this;
  }
  set_flag(this, WRITE_ONLY);
  while (left instanceof AST_PropAccess) {
    left = left.expression;
  }
  if (left.is_constant_expression(compressor.find_parent(AST_Scope))) {
    return this.right.drop_side_effect_free(compressor);
  }
  return this;
});
def_drop_side_effect_free(AST_Conditional, function(compressor) {
  var consequent = this.consequent.drop_side_effect_free(compressor);
  var alternative = this.alternative.drop_side_effect_free(compressor);
  if (consequent === this.consequent && alternative === this.alternative)
    return this;
  if (!consequent)
    return alternative ? make_node(AST_Binary, this, {
      operator: "||",
      left: this.condition,
      right: alternative
    }) : this.condition.drop_side_effect_free(compressor);
  if (!alternative)
    return make_node(AST_Binary, this, {
      operator: "&&",
      left: this.condition,
      right: consequent
    });
  var node = this.clone();
  node.consequent = consequent;
  node.alternative = alternative;
  return node;
});
def_drop_side_effect_free(AST_Unary, function(compressor, first_in_statement2) {
  if (unary_side_effects.has(this.operator)) {
    if (!this.expression.has_side_effects(compressor)) {
      set_flag(this, WRITE_ONLY);
    } else {
      clear_flag(this, WRITE_ONLY);
    }
    return this;
  }
  if (this.operator == "typeof" && this.expression instanceof AST_SymbolRef)
    return null;
  var expression = this.expression.drop_side_effect_free(compressor, first_in_statement2);
  if (first_in_statement2 && expression && is_iife_call(expression)) {
    if (expression === this.expression && this.operator == "!")
      return this;
    return expression.negate(compressor, first_in_statement2);
  }
  return expression;
});
def_drop_side_effect_free(AST_SymbolRef, function(compressor) {
  const safe_access = this.is_declared(compressor) || pure_prop_access_globals.has(this.name);
  return safe_access ? null : this;
});
def_drop_side_effect_free(AST_Object, function(compressor, first_in_statement2) {
  var values = trim(this.properties, compressor, first_in_statement2);
  return values && make_sequence(this, values);
});
def_drop_side_effect_free(AST_ObjectKeyVal, function(compressor, first_in_statement2) {
  const computed_key = this.key instanceof AST_Node;
  const key = computed_key && this.key.drop_side_effect_free(compressor, first_in_statement2);
  const value = this.value.drop_side_effect_free(compressor, first_in_statement2);
  if (key && value) {
    return make_sequence(this, [key, value]);
  }
  return key || value;
});
def_drop_side_effect_free([
  AST_ConciseMethod,
  AST_ObjectGetter,
  AST_ObjectSetter
], function() {
  return this.computed_key() ? this.key : null;
});
def_drop_side_effect_free([
  AST_PrivateMethod,
  AST_PrivateGetter,
  AST_PrivateSetter
], function() {
  return null;
});
def_drop_side_effect_free(AST_Array, function(compressor, first_in_statement2) {
  var values = trim(this.elements, compressor, first_in_statement2);
  return values && make_sequence(this, values);
});
def_drop_side_effect_free(AST_Dot, function(compressor, first_in_statement2) {
  if (is_nullish_shortcircuited(this, compressor)) {
    return this.expression.drop_side_effect_free(compressor, first_in_statement2);
  }
  if (!this.optional && this.expression.may_throw_on_access(compressor)) {
    return this;
  }
  return this.expression.drop_side_effect_free(compressor, first_in_statement2);
});
def_drop_side_effect_free(AST_Sub, function(compressor, first_in_statement2) {
  if (is_nullish_shortcircuited(this, compressor)) {
    return this.expression.drop_side_effect_free(compressor, first_in_statement2);
  }
  if (!this.optional && this.expression.may_throw_on_access(compressor)) {
    return this;
  }
  var property = this.property.drop_side_effect_free(compressor);
  if (property && this.optional)
    return this;
  var expression = this.expression.drop_side_effect_free(compressor, first_in_statement2);
  if (expression && property)
    return make_sequence(this, [expression, property]);
  return expression || property;
});
def_drop_side_effect_free(AST_Chain, function(compressor, first_in_statement2) {
  return this.expression.drop_side_effect_free(compressor, first_in_statement2);
});
def_drop_side_effect_free(AST_Sequence, function(compressor) {
  var last = this.tail_node();
  var expr = last.drop_side_effect_free(compressor);
  if (expr === last)
    return this;
  var expressions = this.expressions.slice(0, -1);
  if (expr)
    expressions.push(expr);
  if (!expressions.length) {
    return make_node(AST_Number, this, { value: 0 });
  }
  return make_sequence(this, expressions);
});
def_drop_side_effect_free(AST_Expansion, function(compressor, first_in_statement2) {
  return this.expression.drop_side_effect_free(compressor, first_in_statement2);
});
def_drop_side_effect_free(AST_TemplateSegment, return_null);
def_drop_side_effect_free(AST_TemplateString, function(compressor) {
  var values = trim(this.segments, compressor, first_in_statement);
  return values && make_sequence(this, values);
});

// node_modules/terser/lib/compress/drop-unused.js
var r_keep_assign = /keep_assign/;
AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
  if (!compressor.option("unused"))
    return;
  if (compressor.has_directive("use asm"))
    return;
  if (!this.variables)
    return;
  var self2 = this;
  if (self2.pinned())
    return;
  var drop_funcs = !(self2 instanceof AST_Toplevel) || compressor.toplevel.funcs;
  var drop_vars = !(self2 instanceof AST_Toplevel) || compressor.toplevel.vars;
  const assign_as_unused = r_keep_assign.test(compressor.option("unused")) ? return_false : function(node) {
    if (node instanceof AST_Assign && !node.logical && (has_flag(node, WRITE_ONLY) || node.operator == "=")) {
      return node.left;
    }
    if (node instanceof AST_Unary && has_flag(node, WRITE_ONLY)) {
      return node.expression;
    }
  };
  var in_use_ids = new Map;
  var fixed_ids = new Map;
  if (self2 instanceof AST_Toplevel && compressor.top_retain) {
    self2.variables.forEach(function(def) {
      if (compressor.top_retain(def)) {
        in_use_ids.set(def.id, def);
      }
    });
  }
  var var_defs_by_id = new Map;
  var initializations = new Map;
  var scope = this;
  var tw = new TreeWalker(function(node, descend) {
    if (node instanceof AST_Lambda && node.uses_arguments && !tw.has_directive("use strict")) {
      node.argnames.forEach(function(argname) {
        if (!(argname instanceof AST_SymbolDeclaration))
          return;
        var def = argname.definition();
        in_use_ids.set(def.id, def);
      });
    }
    if (node === self2)
      return;
    if (node instanceof AST_Class && node.has_side_effects(compressor)) {
      if (node.is_self_referential()) {
        descend();
      } else {
        node.visit_nondeferred_class_parts(tw);
      }
    }
    if (node instanceof AST_Defun || node instanceof AST_DefClass) {
      var node_def = node.name.definition();
      const in_export = tw.parent() instanceof AST_Export;
      if (in_export || !drop_funcs && scope === self2) {
        if (node_def.global) {
          in_use_ids.set(node_def.id, node_def);
        }
      }
      map_add(initializations, node_def.id, node);
      return true;
    }
    const in_root_scope = scope === self2;
    if (node instanceof AST_SymbolFunarg && in_root_scope) {
      map_add(var_defs_by_id, node.definition().id, node);
    }
    if (node instanceof AST_Definitions && in_root_scope) {
      const in_export = tw.parent() instanceof AST_Export;
      node.definitions.forEach(function(def) {
        if (def.name instanceof AST_SymbolVar) {
          map_add(var_defs_by_id, def.name.definition().id, def);
        }
        if (in_export || !drop_vars) {
          walk(def.name, (node2) => {
            if (node2 instanceof AST_SymbolDeclaration) {
              const def2 = node2.definition();
              if (def2.global) {
                in_use_ids.set(def2.id, def2);
              }
            }
          });
        }
        if (def.name instanceof AST_Destructuring) {
          def.walk(tw);
        }
        if (def.name instanceof AST_SymbolDeclaration && def.value) {
          var node_def2 = def.name.definition();
          map_add(initializations, node_def2.id, def.value);
          if (!node_def2.chained && def.name.fixed_value() === def.value) {
            fixed_ids.set(node_def2.id, def);
          }
          if (def.value.has_side_effects(compressor)) {
            def.value.walk(tw);
          }
        }
      });
      return true;
    }
    return scan_ref_scoped(node, descend);
  });
  self2.walk(tw);
  tw = new TreeWalker(scan_ref_scoped);
  in_use_ids.forEach(function(def) {
    var init = initializations.get(def.id);
    if (init)
      init.forEach(function(init2) {
        init2.walk(tw);
      });
  });
  var tt = new TreeTransformer(function before(node, descend, in_list) {
    var parent = tt.parent();
    if (drop_vars) {
      const sym2 = assign_as_unused(node);
      if (sym2 instanceof AST_SymbolRef) {
        var def = sym2.definition();
        var in_use = in_use_ids.has(def.id);
        if (node instanceof AST_Assign) {
          if (!in_use || fixed_ids.has(def.id) && fixed_ids.get(def.id) !== node) {
            const assignee = node.right.transform(tt);
            if (!in_use && !assignee.has_side_effects(compressor) && !is_used_in_expression(tt)) {
              return in_list ? MAP.skip : make_node(AST_Number, node, { value: 0 });
            }
            return maintain_this_binding(parent, node, assignee);
          }
        } else if (!in_use) {
          return in_list ? MAP.skip : make_node(AST_Number, node, { value: 0 });
        }
      }
    }
    if (scope !== self2)
      return;
    var def;
    if (node.name && (node instanceof AST_ClassExpression && !keep_name(compressor.option("keep_classnames"), (def = node.name.definition()).name) || node instanceof AST_Function && !keep_name(compressor.option("keep_fnames"), (def = node.name.definition()).name))) {
      if (!in_use_ids.has(def.id) || def.orig.length > 1)
        node.name = null;
    }
    if (node instanceof AST_Lambda && !(node instanceof AST_Accessor)) {
      var trim2 = !compressor.option("keep_fargs") || parent instanceof AST_Call && parent.expression === node && !node.pinned() && (!node.name || node.name.unreferenced());
      for (var a = node.argnames, i = a.length;--i >= 0; ) {
        var sym = a[i];
        if (sym instanceof AST_Expansion) {
          sym = sym.expression;
        }
        if (sym instanceof AST_DefaultAssign) {
          sym = sym.left;
        }
        if (!(sym instanceof AST_Destructuring) && !in_use_ids.has(sym.definition().id)) {
          set_flag(sym, UNUSED);
          if (trim2) {
            a.pop();
          }
        } else {
          trim2 = false;
        }
      }
    }
    if (node instanceof AST_DefClass && node !== self2) {
      const def2 = node.name.definition();
      descend(node, this);
      const keep_class = def2.global && !drop_funcs || in_use_ids.has(def2.id);
      if (!keep_class) {
        const kept = node.drop_side_effect_free(compressor);
        if (kept == null) {
          def2.eliminated++;
          return in_list ? MAP.skip : make_node(AST_EmptyStatement, node);
        }
        return kept;
      }
      return node;
    }
    if (node instanceof AST_Defun && node !== self2) {
      const def2 = node.name.definition();
      const keep = def2.global && !drop_funcs || in_use_ids.has(def2.id);
      if (!keep) {
        def2.eliminated++;
        return in_list ? MAP.skip : make_node(AST_EmptyStatement, node);
      }
    }
    if (node instanceof AST_Definitions && !(parent instanceof AST_ForIn && parent.init === node)) {
      var drop_block = !(parent instanceof AST_Toplevel) && !(node instanceof AST_Var);
      var body = [], head = [], tail = [];
      var side_effects = [];
      node.definitions.forEach(function(def2) {
        if (def2.value)
          def2.value = def2.value.transform(tt);
        var is_destructure = def2.name instanceof AST_Destructuring;
        var sym2 = is_destructure ? new SymbolDef(null, { name: "<destructure>" }) : def2.name.definition();
        if (drop_block && sym2.global)
          return tail.push(def2);
        if (!(drop_vars || drop_block) || is_destructure && (def2.name.names.length || def2.name.is_array || compressor.option("pure_getters") != true) || in_use_ids.has(sym2.id)) {
          if (def2.value && fixed_ids.has(sym2.id) && fixed_ids.get(sym2.id) !== def2) {
            def2.value = def2.value.drop_side_effect_free(compressor);
          }
          if (def2.name instanceof AST_SymbolVar) {
            var var_defs = var_defs_by_id.get(sym2.id);
            if (var_defs.length > 1 && (!def2.value || sym2.orig.indexOf(def2.name) > sym2.eliminated)) {
              if (def2.value) {
                var ref = make_node(AST_SymbolRef, def2.name, def2.name);
                sym2.references.push(ref);
                var assign = make_node(AST_Assign, def2, {
                  operator: "=",
                  logical: false,
                  left: ref,
                  right: def2.value
                });
                if (fixed_ids.get(sym2.id) === def2) {
                  fixed_ids.set(sym2.id, assign);
                }
                side_effects.push(assign.transform(tt));
              }
              remove(var_defs, def2);
              sym2.eliminated++;
              return;
            }
          }
          if (def2.value) {
            if (side_effects.length > 0) {
              if (tail.length > 0) {
                side_effects.push(def2.value);
                def2.value = make_sequence(def2.value, side_effects);
              } else {
                body.push(make_node(AST_SimpleStatement, node, {
                  body: make_sequence(node, side_effects)
                }));
              }
              side_effects = [];
            }
            tail.push(def2);
          } else {
            head.push(def2);
          }
        } else if (sym2.orig[0] instanceof AST_SymbolCatch) {
          var value = def2.value && def2.value.drop_side_effect_free(compressor);
          if (value)
            side_effects.push(value);
          def2.value = null;
          head.push(def2);
        } else {
          var value = def2.value && def2.value.drop_side_effect_free(compressor);
          if (value) {
            side_effects.push(value);
          }
          sym2.eliminated++;
        }
      });
      if (head.length > 0 || tail.length > 0) {
        node.definitions = head.concat(tail);
        body.push(node);
      }
      if (side_effects.length > 0) {
        body.push(make_node(AST_SimpleStatement, node, {
          body: make_sequence(node, side_effects)
        }));
      }
      switch (body.length) {
        case 0:
          return in_list ? MAP.skip : make_node(AST_EmptyStatement, node);
        case 1:
          return body[0];
        default:
          return in_list ? MAP.splice(body) : make_node(AST_BlockStatement, node, { body });
      }
    }
    if (node instanceof AST_For) {
      descend(node, this);
      var block;
      if (node.init instanceof AST_BlockStatement) {
        block = node.init;
        node.init = block.body.pop();
        block.body.push(node);
      }
      if (node.init instanceof AST_SimpleStatement) {
        node.init = node.init.body;
      } else if (is_empty(node.init)) {
        node.init = null;
      }
      return !block ? node : in_list ? MAP.splice(block.body) : block;
    }
    if (node instanceof AST_LabeledStatement && node.body instanceof AST_For) {
      descend(node, this);
      if (node.body instanceof AST_BlockStatement) {
        var block = node.body;
        node.body = block.body.pop();
        block.body.push(node);
        return in_list ? MAP.splice(block.body) : block;
      }
      return node;
    }
    if (node instanceof AST_BlockStatement) {
      descend(node, this);
      if (in_list && node.body.every(can_be_evicted_from_block)) {
        return MAP.splice(node.body);
      }
      return node;
    }
    if (node instanceof AST_Scope && !(node instanceof AST_ClassStaticBlock)) {
      const save_scope = scope;
      scope = node;
      descend(node, this);
      scope = save_scope;
      return node;
    }
  }, function after(node, in_list) {
    if (node instanceof AST_Sequence) {
      switch (node.expressions.length) {
        case 0:
          return in_list ? MAP.skip : make_node(AST_Number, node, { value: 0 });
        case 1:
          return node.expressions[0];
      }
    }
  });
  self2.transform(tt);
  function scan_ref_scoped(node, descend) {
    var node_def;
    const sym = assign_as_unused(node);
    if (sym instanceof AST_SymbolRef && !is_ref_of(node.left, AST_SymbolBlockDeclaration) && self2.variables.get(sym.name) === (node_def = sym.definition())) {
      if (node instanceof AST_Assign) {
        node.right.walk(tw);
        if (!node_def.chained && node.left.fixed_value() === node.right) {
          fixed_ids.set(node_def.id, node);
        }
      }
      return true;
    }
    if (node instanceof AST_SymbolRef) {
      node_def = node.definition();
      if (!in_use_ids.has(node_def.id)) {
        in_use_ids.set(node_def.id, node_def);
        if (node_def.orig[0] instanceof AST_SymbolCatch) {
          const redef = node_def.scope.is_block_scope() && node_def.scope.get_defun_scope().variables.get(node_def.name);
          if (redef)
            in_use_ids.set(redef.id, redef);
        }
      }
      return true;
    }
    if (node instanceof AST_Class) {
      descend();
      return true;
    }
    if (node instanceof AST_Scope && !(node instanceof AST_ClassStaticBlock)) {
      var save_scope = scope;
      scope = node;
      descend();
      scope = save_scope;
      return true;
    }
  }
});

// node_modules/terser/lib/compress/reduce-vars.js
function def_reduce_vars(node, func) {
  node.DEFMETHOD("reduce_vars", func);
}
def_reduce_vars(AST_Node, noop);
function reset_def(compressor, def) {
  def.assignments = 0;
  def.chained = false;
  def.direct_access = false;
  def.escaped = 0;
  def.recursive_refs = 0;
  def.references = [];
  def.single_use = undefined;
  if (def.scope.pinned() || def.orig[0] instanceof AST_SymbolFunarg && def.scope.uses_arguments) {
    def.fixed = false;
  } else if (def.orig[0] instanceof AST_SymbolConst || !compressor.exposed(def)) {
    def.fixed = def.init;
  } else {
    def.fixed = false;
  }
}
function reset_variables(tw, compressor, node) {
  node.variables.forEach(function(def) {
    reset_def(compressor, def);
    if (def.fixed === null) {
      tw.defs_to_safe_ids.set(def.id, tw.safe_ids);
      mark(tw, def, true);
    } else if (def.fixed) {
      tw.loop_ids.set(def.id, tw.in_loop);
      mark(tw, def, true);
    }
  });
}
function reset_block_variables(compressor, node) {
  if (node.block_scope)
    node.block_scope.variables.forEach((def) => {
      reset_def(compressor, def);
    });
}
function push(tw) {
  tw.safe_ids = Object.create(tw.safe_ids);
}
function pop(tw) {
  tw.safe_ids = Object.getPrototypeOf(tw.safe_ids);
}
function mark(tw, def, safe) {
  tw.safe_ids[def.id] = safe;
}
function safe_to_read(tw, def) {
  if (def.single_use == "m")
    return false;
  if (tw.safe_ids[def.id]) {
    if (def.fixed == null) {
      var orig = def.orig[0];
      if (orig instanceof AST_SymbolFunarg || orig.name == "arguments")
        return false;
      def.fixed = make_node(AST_Undefined, orig);
    }
    return true;
  }
  return def.fixed instanceof AST_Defun;
}
function safe_to_assign(tw, def, scope, value) {
  if (def.fixed === undefined)
    return true;
  let def_safe_ids;
  if (def.fixed === null && (def_safe_ids = tw.defs_to_safe_ids.get(def.id))) {
    def_safe_ids[def.id] = false;
    tw.defs_to_safe_ids.delete(def.id);
    return true;
  }
  if (!HOP(tw.safe_ids, def.id))
    return false;
  if (!safe_to_read(tw, def))
    return false;
  if (def.fixed === false)
    return false;
  if (def.fixed != null && (!value || def.references.length > def.assignments))
    return false;
  if (def.fixed instanceof AST_Defun) {
    return value instanceof AST_Node && def.fixed.parent_scope === scope;
  }
  return def.orig.every((sym) => {
    return !(sym instanceof AST_SymbolConst || sym instanceof AST_SymbolDefun || sym instanceof AST_SymbolLambda);
  });
}
function ref_once(tw, compressor, def) {
  return compressor.option("unused") && !def.scope.pinned() && def.references.length - def.recursive_refs == 1 && tw.loop_ids.get(def.id) === tw.in_loop;
}
function is_immutable(value) {
  if (!value)
    return false;
  return value.is_constant() || value instanceof AST_Lambda || value instanceof AST_This;
}
function mark_escaped(tw, d, scope, node, value, level = 0, depth = 1) {
  var parent = tw.parent(level);
  if (value) {
    if (value.is_constant())
      return;
    if (value instanceof AST_ClassExpression)
      return;
  }
  if (parent instanceof AST_Assign && (parent.operator === "=" || parent.logical) && node === parent.right || parent instanceof AST_Call && (node !== parent.expression || parent instanceof AST_New) || parent instanceof AST_Exit && node === parent.value && node.scope !== d.scope || parent instanceof AST_VarDef && node === parent.value || parent instanceof AST_Yield && node === parent.value && node.scope !== d.scope) {
    if (depth > 1 && !(value && value.is_constant_expression(scope)))
      depth = 1;
    if (!d.escaped || d.escaped > depth)
      d.escaped = depth;
    return;
  } else if (parent instanceof AST_Array || parent instanceof AST_Await || parent instanceof AST_Binary && lazy_op.has(parent.operator) || parent instanceof AST_Conditional && node !== parent.condition || parent instanceof AST_Expansion || parent instanceof AST_Sequence && node === parent.tail_node()) {
    mark_escaped(tw, d, scope, parent, parent, level + 1, depth);
  } else if (parent instanceof AST_ObjectKeyVal && node === parent.value) {
    var obj = tw.parent(level + 1);
    mark_escaped(tw, d, scope, obj, obj, level + 2, depth);
  } else if (parent instanceof AST_PropAccess && node === parent.expression) {
    value = read_property(value, parent.property);
    mark_escaped(tw, d, scope, parent, value, level + 1, depth + 1);
    if (value)
      return;
  }
  if (level > 0)
    return;
  if (parent instanceof AST_Sequence && node !== parent.tail_node())
    return;
  if (parent instanceof AST_SimpleStatement)
    return;
  d.direct_access = true;
}
var suppress = (node) => walk(node, (node2) => {
  if (!(node2 instanceof AST_Symbol))
    return;
  var d = node2.definition();
  if (!d)
    return;
  if (node2 instanceof AST_SymbolRef)
    d.references.push(node2);
  d.fixed = false;
});
def_reduce_vars(AST_Accessor, function(tw, descend, compressor) {
  push(tw);
  reset_variables(tw, compressor, this);
  descend();
  pop(tw);
  return true;
});
def_reduce_vars(AST_Assign, function(tw, descend, compressor) {
  var node = this;
  if (node.left instanceof AST_Destructuring) {
    suppress(node.left);
    return;
  }
  const finish_walk = () => {
    if (node.logical) {
      node.left.walk(tw);
      push(tw);
      node.right.walk(tw);
      pop(tw);
      return true;
    }
  };
  var sym = node.left;
  if (!(sym instanceof AST_SymbolRef))
    return finish_walk();
  var def = sym.definition();
  var safe = safe_to_assign(tw, def, sym.scope, node.right);
  def.assignments++;
  if (!safe)
    return finish_walk();
  var fixed = def.fixed;
  if (!fixed && node.operator != "=" && !node.logical)
    return finish_walk();
  var eq = node.operator == "=";
  var value = eq ? node.right : node;
  if (is_modified(compressor, tw, node, value, 0))
    return finish_walk();
  def.references.push(sym);
  if (!node.logical) {
    if (!eq)
      def.chained = true;
    def.fixed = eq ? function() {
      return node.right;
    } : function() {
      return make_node(AST_Binary, node, {
        operator: node.operator.slice(0, -1),
        left: fixed instanceof AST_Node ? fixed : fixed(),
        right: node.right
      });
    };
  }
  if (node.logical) {
    mark(tw, def, false);
    push(tw);
    node.right.walk(tw);
    pop(tw);
    return true;
  }
  mark(tw, def, false);
  node.right.walk(tw);
  mark(tw, def, true);
  mark_escaped(tw, def, sym.scope, node, value, 0, 1);
  return true;
});
def_reduce_vars(AST_Binary, function(tw) {
  if (!lazy_op.has(this.operator))
    return;
  this.left.walk(tw);
  push(tw);
  this.right.walk(tw);
  pop(tw);
  return true;
});
def_reduce_vars(AST_Block, function(tw, descend, compressor) {
  reset_block_variables(compressor, this);
});
def_reduce_vars(AST_Case, function(tw) {
  push(tw);
  this.expression.walk(tw);
  pop(tw);
  push(tw);
  walk_body(this, tw);
  pop(tw);
  return true;
});
def_reduce_vars(AST_Class, function(tw, descend) {
  clear_flag(this, INLINED);
  push(tw);
  descend();
  pop(tw);
  return true;
});
def_reduce_vars(AST_ClassStaticBlock, function(tw, descend, compressor) {
  reset_block_variables(compressor, this);
});
def_reduce_vars(AST_Conditional, function(tw) {
  this.condition.walk(tw);
  push(tw);
  this.consequent.walk(tw);
  pop(tw);
  push(tw);
  this.alternative.walk(tw);
  pop(tw);
  return true;
});
def_reduce_vars(AST_Chain, function(tw, descend) {
  const safe_ids = tw.safe_ids;
  descend();
  tw.safe_ids = safe_ids;
  return true;
});
def_reduce_vars(AST_Call, function(tw) {
  this.expression.walk(tw);
  if (this.optional) {
    push(tw);
  }
  for (const arg of this.args)
    arg.walk(tw);
  return true;
});
def_reduce_vars(AST_PropAccess, function(tw) {
  if (!this.optional)
    return;
  this.expression.walk(tw);
  push(tw);
  if (this.property instanceof AST_Node)
    this.property.walk(tw);
  return true;
});
def_reduce_vars(AST_Default, function(tw, descend) {
  push(tw);
  descend();
  pop(tw);
  return true;
});
function mark_lambda(tw, descend, compressor) {
  clear_flag(this, INLINED);
  push(tw);
  reset_variables(tw, compressor, this);
  var iife;
  if (!this.name && !this.uses_arguments && !this.pinned() && (iife = tw.parent()) instanceof AST_Call && iife.expression === this && !iife.args.some((arg) => arg instanceof AST_Expansion) && this.argnames.every((arg_name) => arg_name instanceof AST_Symbol)) {
    this.argnames.forEach((arg, i) => {
      if (!arg.definition)
        return;
      var d = arg.definition();
      if (d.orig.length > 1)
        return;
      if (d.fixed === undefined && (!this.uses_arguments || tw.has_directive("use strict"))) {
        d.fixed = function() {
          return iife.args[i] || make_node(AST_Undefined, iife);
        };
        tw.loop_ids.set(d.id, tw.in_loop);
        mark(tw, d, true);
      } else {
        d.fixed = false;
      }
    });
  }
  descend();
  pop(tw);
  handle_defined_after_hoist(this);
  return true;
}
function handle_defined_after_hoist(parent) {
  const defuns = [];
  walk(parent, (node) => {
    if (node === parent)
      return;
    if (node instanceof AST_Defun) {
      defuns.push(node);
      return true;
    }
    if (node instanceof AST_Scope || node instanceof AST_SimpleStatement)
      return true;
  });
  const defun_dependencies_map = new Map;
  const dependencies_map = new Map;
  const symbols_of_interest = new Set;
  const defuns_of_interest = new Set;
  for (const defun of defuns) {
    const fname_def = defun.name.definition();
    const enclosing_defs = [];
    for (const def of defun.enclosed) {
      if (def.fixed === false || def === fname_def || def.scope.get_defun_scope() !== parent) {
        continue;
      }
      symbols_of_interest.add(def.id);
      if (def.assignments === 0 && def.orig.length === 1 && def.orig[0] instanceof AST_SymbolDefun) {
        defuns_of_interest.add(def.id);
        symbols_of_interest.add(def.id);
        defuns_of_interest.add(fname_def.id);
        symbols_of_interest.add(fname_def.id);
        if (!defun_dependencies_map.has(fname_def.id)) {
          defun_dependencies_map.set(fname_def.id, []);
        }
        defun_dependencies_map.get(fname_def.id).push(def.id);
        continue;
      }
      enclosing_defs.push(def);
    }
    if (enclosing_defs.length) {
      dependencies_map.set(fname_def.id, enclosing_defs);
      defuns_of_interest.add(fname_def.id);
      symbols_of_interest.add(fname_def.id);
    }
  }
  if (!dependencies_map.size) {
    return;
  }
  let symbol_index = 1;
  const defun_first_read_map = new Map;
  const symbol_last_write_map = new Map;
  walk_parent(parent, (node, walk_info) => {
    if (node instanceof AST_Symbol && node.thedef) {
      const id = node.definition().id;
      symbol_index++;
      if (symbols_of_interest.has(id)) {
        if (node instanceof AST_SymbolDeclaration || is_lhs(node, walk_info.parent())) {
          symbol_last_write_map.set(id, symbol_index);
        }
      }
      if (defuns_of_interest.has(id)) {
        if (!defun_first_read_map.has(id) && !is_recursive_ref(walk_info, id)) {
          defun_first_read_map.set(id, symbol_index);
        }
      }
    }
  });
  for (const [defun, defun_first_read] of defun_first_read_map) {
    const queue = new Set(defun_dependencies_map.get(defun));
    for (const enclosed_defun of queue) {
      let enclosed_defun_first_read = defun_first_read_map.get(enclosed_defun);
      if (enclosed_defun_first_read != null && enclosed_defun_first_read < defun_first_read) {
        continue;
      }
      defun_first_read_map.set(enclosed_defun, defun_first_read);
      for (const enclosed_enclosed_defun of defun_dependencies_map.get(enclosed_defun) || []) {
        queue.add(enclosed_enclosed_defun);
      }
    }
  }
  for (const [defun, defs] of dependencies_map) {
    const defun_first_read = defun_first_read_map.get(defun);
    if (defun_first_read === undefined) {
      continue;
    }
    for (const def of defs) {
      if (def.fixed === false) {
        continue;
      }
      let def_last_write = symbol_last_write_map.get(def.id) || 0;
      if (defun_first_read < def_last_write) {
        def.fixed = false;
      }
    }
  }
}
def_reduce_vars(AST_Lambda, mark_lambda);
def_reduce_vars(AST_Do, function(tw, descend, compressor) {
  reset_block_variables(compressor, this);
  const saved_loop = tw.in_loop;
  tw.in_loop = this;
  push(tw);
  this.body.walk(tw);
  if (has_break_or_continue(this)) {
    pop(tw);
    push(tw);
  }
  this.condition.walk(tw);
  pop(tw);
  tw.in_loop = saved_loop;
  return true;
});
def_reduce_vars(AST_For, function(tw, descend, compressor) {
  reset_block_variables(compressor, this);
  if (this.init)
    this.init.walk(tw);
  const saved_loop = tw.in_loop;
  tw.in_loop = this;
  push(tw);
  if (this.condition)
    this.condition.walk(tw);
  this.body.walk(tw);
  if (this.step) {
    if (has_break_or_continue(this)) {
      pop(tw);
      push(tw);
    }
    this.step.walk(tw);
  }
  pop(tw);
  tw.in_loop = saved_loop;
  return true;
});
def_reduce_vars(AST_ForIn, function(tw, descend, compressor) {
  reset_block_variables(compressor, this);
  suppress(this.init);
  this.object.walk(tw);
  const saved_loop = tw.in_loop;
  tw.in_loop = this;
  push(tw);
  this.body.walk(tw);
  pop(tw);
  tw.in_loop = saved_loop;
  return true;
});
def_reduce_vars(AST_If, function(tw) {
  this.condition.walk(tw);
  push(tw);
  this.body.walk(tw);
  pop(tw);
  if (this.alternative) {
    push(tw);
    this.alternative.walk(tw);
    pop(tw);
  }
  return true;
});
def_reduce_vars(AST_LabeledStatement, function(tw) {
  push(tw);
  this.body.walk(tw);
  pop(tw);
  return true;
});
def_reduce_vars(AST_SymbolCatch, function() {
  this.definition().fixed = false;
});
def_reduce_vars(AST_SymbolRef, function(tw, descend, compressor) {
  var d = this.definition();
  d.references.push(this);
  if (d.references.length == 1 && !d.fixed && d.orig[0] instanceof AST_SymbolDefun) {
    tw.loop_ids.set(d.id, tw.in_loop);
  }
  var fixed_value;
  if (d.fixed === undefined || !safe_to_read(tw, d)) {
    d.fixed = false;
  } else if (d.fixed) {
    fixed_value = this.fixed_value();
    if (fixed_value instanceof AST_Lambda && is_recursive_ref(tw, d)) {
      d.recursive_refs++;
    } else if (fixed_value && !compressor.exposed(d) && ref_once(tw, compressor, d)) {
      d.single_use = fixed_value instanceof AST_Lambda && !fixed_value.pinned() || fixed_value instanceof AST_Class || d.scope === this.scope && fixed_value.is_constant_expression();
    } else {
      d.single_use = false;
    }
    if (is_modified(compressor, tw, this, fixed_value, 0, is_immutable(fixed_value))) {
      if (d.single_use) {
        d.single_use = "m";
      } else {
        d.fixed = false;
      }
    }
  }
  mark_escaped(tw, d, this.scope, this, fixed_value, 0, 1);
});
def_reduce_vars(AST_Toplevel, function(tw, descend, compressor) {
  this.globals.forEach(function(def) {
    reset_def(compressor, def);
  });
  reset_variables(tw, compressor, this);
  descend();
  handle_defined_after_hoist(this);
  return true;
});
def_reduce_vars(AST_Try, function(tw, descend, compressor) {
  reset_block_variables(compressor, this);
  push(tw);
  this.body.walk(tw);
  pop(tw);
  if (this.bcatch) {
    push(tw);
    this.bcatch.walk(tw);
    pop(tw);
  }
  if (this.bfinally)
    this.bfinally.walk(tw);
  return true;
});
def_reduce_vars(AST_Unary, function(tw) {
  var node = this;
  if (node.operator !== "++" && node.operator !== "--")
    return;
  var exp = node.expression;
  if (!(exp instanceof AST_SymbolRef))
    return;
  var def = exp.definition();
  var safe = safe_to_assign(tw, def, exp.scope, true);
  def.assignments++;
  if (!safe)
    return;
  var fixed = def.fixed;
  if (!fixed)
    return;
  def.references.push(exp);
  def.chained = true;
  def.fixed = function() {
    return make_node(AST_Binary, node, {
      operator: node.operator.slice(0, -1),
      left: make_node(AST_UnaryPrefix, node, {
        operator: "+",
        expression: fixed instanceof AST_Node ? fixed : fixed()
      }),
      right: make_node(AST_Number, node, {
        value: 1
      })
    });
  };
  mark(tw, def, true);
  return true;
});
def_reduce_vars(AST_VarDef, function(tw, descend) {
  var node = this;
  if (node.name instanceof AST_Destructuring) {
    suppress(node.name);
    return;
  }
  var d = node.name.definition();
  if (node.value) {
    if (safe_to_assign(tw, d, node.name.scope, node.value)) {
      d.fixed = function() {
        return node.value;
      };
      tw.loop_ids.set(d.id, tw.in_loop);
      mark(tw, d, false);
      descend();
      mark(tw, d, true);
      return true;
    } else {
      d.fixed = false;
    }
  }
});
def_reduce_vars(AST_While, function(tw, descend, compressor) {
  reset_block_variables(compressor, this);
  const saved_loop = tw.in_loop;
  tw.in_loop = this;
  push(tw);
  descend();
  pop(tw);
  tw.in_loop = saved_loop;
  return true;
});

// node_modules/terser/lib/compress/tighten-body.js
function loop_body(x) {
  if (x instanceof AST_IterationStatement) {
    return x.body instanceof AST_BlockStatement ? x.body : x;
  }
  return x;
}
function is_lhs_read_only(lhs) {
  if (lhs instanceof AST_This)
    return true;
  if (lhs instanceof AST_SymbolRef)
    return lhs.definition().orig[0] instanceof AST_SymbolLambda;
  if (lhs instanceof AST_PropAccess) {
    lhs = lhs.expression;
    if (lhs instanceof AST_SymbolRef) {
      if (lhs.is_immutable())
        return false;
      lhs = lhs.fixed_value();
    }
    if (!lhs)
      return true;
    if (lhs instanceof AST_RegExp)
      return false;
    if (lhs instanceof AST_Constant)
      return true;
    return is_lhs_read_only(lhs);
  }
  return false;
}
function remove_initializers(var_statement) {
  var decls = [];
  var_statement.definitions.forEach(function(def) {
    if (def.name instanceof AST_SymbolDeclaration) {
      def.value = null;
      decls.push(def);
    } else {
      def.declarations_as_names().forEach((name) => {
        decls.push(make_node(AST_VarDef, def, {
          name,
          value: null
        }));
      });
    }
  });
  return decls.length ? make_node(AST_Var, var_statement, { definitions: decls }) : null;
}
function trim_unreachable_code(compressor, stat, target) {
  walk(stat, (node) => {
    if (node instanceof AST_Var) {
      const no_initializers = remove_initializers(node);
      if (no_initializers)
        target.push(no_initializers);
      return true;
    }
    if (node instanceof AST_Defun && (node === stat || !compressor.has_directive("use strict"))) {
      target.push(node === stat ? node : make_node(AST_Var, node, {
        definitions: [
          make_node(AST_VarDef, node, {
            name: make_node(AST_SymbolVar, node.name, node.name),
            value: null
          })
        ]
      }));
      return true;
    }
    if (node instanceof AST_Export || node instanceof AST_Import) {
      target.push(node);
      return true;
    }
    if (node instanceof AST_Scope) {
      return true;
    }
  });
}
function tighten_body(statements, compressor) {
  const nearest_scope = compressor.find_scope();
  const defun_scope = nearest_scope.get_defun_scope();
  const { in_loop, in_try } = find_loop_scope_try();
  var CHANGED, max_iter = 10;
  do {
    CHANGED = false;
    eliminate_spurious_blocks(statements);
    if (compressor.option("dead_code")) {
      eliminate_dead_code(statements, compressor);
    }
    if (compressor.option("if_return")) {
      handle_if_return(statements, compressor);
    }
    if (compressor.sequences_limit > 0) {
      sequencesize(statements, compressor);
      sequencesize_2(statements, compressor);
    }
    if (compressor.option("join_vars")) {
      join_consecutive_vars(statements);
    }
    if (compressor.option("collapse_vars")) {
      collapse(statements, compressor);
    }
  } while (CHANGED && max_iter-- > 0);
  function find_loop_scope_try() {
    var node = compressor.self(), level = 0, in_loop2 = false, in_try2 = false;
    do {
      if (node instanceof AST_IterationStatement) {
        in_loop2 = true;
      } else if (node instanceof AST_Scope) {
        break;
      } else if (node instanceof AST_TryBlock) {
        in_try2 = true;
      }
    } while (node = compressor.parent(level++));
    return { in_loop: in_loop2, in_try: in_try2 };
  }
  function collapse(statements2, compressor2) {
    if (nearest_scope.pinned() || defun_scope.pinned())
      return statements2;
    var args;
    var candidates = [];
    var stat_index = statements2.length;
    var scanner = new TreeTransformer(function(node) {
      if (abort)
        return node;
      if (!hit) {
        if (node !== hit_stack[hit_index])
          return node;
        hit_index++;
        if (hit_index < hit_stack.length)
          return handle_custom_scan_order(node);
        hit = true;
        stop_after = find_stop(node, 0);
        if (stop_after === node)
          abort = true;
        return node;
      }
      var parent = scanner.parent();
      if (node instanceof AST_Assign && (node.logical || node.operator != "=" && lhs.equivalent_to(node.left)) || node instanceof AST_Await || node instanceof AST_Call && lhs instanceof AST_PropAccess && lhs.equivalent_to(node.expression) || (node instanceof AST_Call || node instanceof AST_PropAccess) && node.optional || node instanceof AST_Debugger || node instanceof AST_Destructuring || node instanceof AST_Expansion && node.expression instanceof AST_Symbol && (node.expression instanceof AST_This || node.expression.definition().references.length > 1) || node instanceof AST_IterationStatement && !(node instanceof AST_For) || node instanceof AST_LoopControl || node instanceof AST_Try || node instanceof AST_With || node instanceof AST_Yield || node instanceof AST_Export || node instanceof AST_Class || parent instanceof AST_For && node !== parent.init || !replace_all && (node instanceof AST_SymbolRef && !node.is_declared(compressor2) && !pure_prop_access_globals.has(node)) || node instanceof AST_SymbolRef && parent instanceof AST_Call && has_annotation(parent, _NOINLINE) || node instanceof AST_ObjectProperty && node.key instanceof AST_Node) {
        abort = true;
        return node;
      }
      if (!stop_if_hit && (!lhs_local || !replace_all) && (parent instanceof AST_Binary && lazy_op.has(parent.operator) && parent.left !== node || parent instanceof AST_Conditional && parent.condition !== node || parent instanceof AST_If && parent.condition !== node)) {
        stop_if_hit = parent;
      }
      if (can_replace && !(node instanceof AST_SymbolDeclaration) && lhs.equivalent_to(node) && !shadows(scanner.find_scope() || nearest_scope, lvalues)) {
        if (stop_if_hit) {
          abort = true;
          return node;
        }
        if (is_lhs(node, parent)) {
          if (value_def)
            replaced++;
          return node;
        } else {
          replaced++;
          if (value_def && candidate instanceof AST_VarDef)
            return node;
        }
        CHANGED = abort = true;
        if (candidate instanceof AST_UnaryPostfix) {
          return make_node(AST_UnaryPrefix, candidate, candidate);
        }
        if (candidate instanceof AST_VarDef) {
          var def2 = candidate.name.definition();
          var value = candidate.value;
          if (def2.references.length - def2.replaced == 1 && !compressor2.exposed(def2)) {
            def2.replaced++;
            if (funarg && is_identifier_atom(value)) {
              return value.transform(compressor2);
            } else {
              return maintain_this_binding(parent, node, value);
            }
          }
          return make_node(AST_Assign, candidate, {
            operator: "=",
            logical: false,
            left: make_node(AST_SymbolRef, candidate.name, candidate.name),
            right: value
          });
        }
        clear_flag(candidate, WRITE_ONLY);
        return candidate;
      }
      var sym;
      if (node instanceof AST_Call || node instanceof AST_Exit && (side_effects || lhs instanceof AST_PropAccess || may_modify(lhs)) || node instanceof AST_PropAccess && (side_effects || node.expression.may_throw_on_access(compressor2)) || node instanceof AST_SymbolRef && (lvalues.has(node.name) && lvalues.get(node.name).modified || side_effects && may_modify(node)) || node instanceof AST_VarDef && node.value && (lvalues.has(node.name.name) || side_effects && may_modify(node.name)) || (sym = is_lhs(node.left, node)) && (sym instanceof AST_PropAccess || lvalues.has(sym.name)) || may_throw && (in_try ? node.has_side_effects(compressor2) : side_effects_external(node))) {
        stop_after = node;
        if (node instanceof AST_Scope)
          abort = true;
      }
      return handle_custom_scan_order(node);
    }, function(node) {
      if (abort)
        return;
      if (stop_after === node)
        abort = true;
      if (stop_if_hit === node)
        stop_if_hit = null;
    });
    var multi_replacer = new TreeTransformer(function(node) {
      if (abort)
        return node;
      if (!hit) {
        if (node !== hit_stack[hit_index])
          return node;
        hit_index++;
        if (hit_index < hit_stack.length)
          return;
        hit = true;
        return node;
      }
      if (node instanceof AST_SymbolRef && node.name == def.name) {
        if (!--replaced)
          abort = true;
        if (is_lhs(node, multi_replacer.parent()))
          return node;
        def.replaced++;
        value_def.replaced--;
        return candidate.value;
      }
      if (node instanceof AST_Default || node instanceof AST_Scope)
        return node;
    });
    while (--stat_index >= 0) {
      if (stat_index == 0 && compressor2.option("unused"))
        extract_args();
      var hit_stack = [];
      extract_candidates(statements2[stat_index]);
      while (candidates.length > 0) {
        hit_stack = candidates.pop();
        var hit_index = 0;
        var candidate = hit_stack[hit_stack.length - 1];
        var value_def = null;
        var stop_after = null;
        var stop_if_hit = null;
        var lhs = get_lhs(candidate);
        if (!lhs || is_lhs_read_only(lhs) || lhs.has_side_effects(compressor2))
          continue;
        var lvalues = get_lvalues(candidate);
        var lhs_local = is_lhs_local(lhs);
        if (lhs instanceof AST_SymbolRef) {
          lvalues.set(lhs.name, { def: lhs.definition(), modified: false });
        }
        var side_effects = value_has_side_effects(candidate);
        var replace_all = replace_all_symbols();
        var may_throw = candidate.may_throw(compressor2);
        var funarg = candidate.name instanceof AST_SymbolFunarg;
        var hit = funarg;
        var abort = false, replaced = 0, can_replace = !args || !hit;
        if (!can_replace) {
          for (let j = compressor2.self().argnames.lastIndexOf(candidate.name) + 1;!abort && j < args.length; j++) {
            args[j].transform(scanner);
          }
          can_replace = true;
        }
        for (var i = stat_index;!abort && i < statements2.length; i++) {
          statements2[i].transform(scanner);
        }
        if (value_def) {
          var def = candidate.name.definition();
          if (abort && def.references.length - def.replaced > replaced)
            replaced = false;
          else {
            abort = false;
            hit_index = 0;
            hit = funarg;
            for (var i = stat_index;!abort && i < statements2.length; i++) {
              statements2[i].transform(multi_replacer);
            }
            value_def.single_use = false;
          }
        }
        if (replaced && !remove_candidate(candidate))
          statements2.splice(stat_index, 1);
      }
    }
    function handle_custom_scan_order(node) {
      if (node instanceof AST_Scope)
        return node;
      if (node instanceof AST_Switch) {
        node.expression = node.expression.transform(scanner);
        for (var i2 = 0, len = node.body.length;!abort && i2 < len; i2++) {
          var branch = node.body[i2];
          if (branch instanceof AST_Case) {
            if (!hit) {
              if (branch !== hit_stack[hit_index])
                continue;
              hit_index++;
            }
            branch.expression = branch.expression.transform(scanner);
            if (!replace_all)
              break;
          }
        }
        abort = true;
        return node;
      }
    }
    function redefined_within_scope(def2, scope) {
      if (def2.global)
        return false;
      let cur_scope = def2.scope;
      while (cur_scope && cur_scope !== scope) {
        if (cur_scope.variables.has(def2.name)) {
          return true;
        }
        cur_scope = cur_scope.parent_scope;
      }
      return false;
    }
    function has_overlapping_symbol(fn, arg, fn_strict) {
      var found = false, scan_this = !(fn instanceof AST_Arrow);
      arg.walk(new TreeWalker(function(node, descend) {
        if (found)
          return true;
        if (node instanceof AST_SymbolRef && (fn.variables.has(node.name) || redefined_within_scope(node.definition(), fn))) {
          var s = node.definition().scope;
          if (s !== defun_scope)
            while (s = s.parent_scope) {
              if (s === defun_scope)
                return true;
            }
          return found = true;
        }
        if ((fn_strict || scan_this) && node instanceof AST_This) {
          return found = true;
        }
        if (node instanceof AST_Scope && !(node instanceof AST_Arrow)) {
          var prev = scan_this;
          scan_this = false;
          descend();
          scan_this = prev;
          return true;
        }
      }));
      return found;
    }
    function arg_is_injectable(arg) {
      if (arg instanceof AST_Expansion)
        return false;
      const contains_await = walk(arg, (node) => {
        if (node instanceof AST_Await)
          return walk_abort;
      });
      if (contains_await)
        return false;
      return true;
    }
    function extract_args() {
      var iife, fn = compressor2.self();
      if (is_func_expr(fn) && !fn.name && !fn.uses_arguments && !fn.pinned() && (iife = compressor2.parent()) instanceof AST_Call && iife.expression === fn && iife.args.every(arg_is_injectable)) {
        var fn_strict = compressor2.has_directive("use strict");
        if (fn_strict && !member(fn_strict, fn.body))
          fn_strict = false;
        var len = fn.argnames.length;
        args = iife.args.slice(len);
        var names = new Set;
        for (var i2 = len;--i2 >= 0; ) {
          var sym = fn.argnames[i2];
          var arg = iife.args[i2];
          const def2 = sym.definition && sym.definition();
          const is_reassigned = def2 && def2.orig.length > 1;
          if (is_reassigned)
            continue;
          args.unshift(make_node(AST_VarDef, sym, {
            name: sym,
            value: arg
          }));
          if (names.has(sym.name))
            continue;
          names.add(sym.name);
          if (sym instanceof AST_Expansion) {
            var elements = iife.args.slice(i2);
            if (elements.every((arg2) => !has_overlapping_symbol(fn, arg2, fn_strict))) {
              candidates.unshift([make_node(AST_VarDef, sym, {
                name: sym.expression,
                value: make_node(AST_Array, iife, {
                  elements
                })
              })]);
            }
          } else {
            if (!arg) {
              arg = make_node(AST_Undefined, sym).transform(compressor2);
            } else if (arg instanceof AST_Lambda && arg.pinned() || has_overlapping_symbol(fn, arg, fn_strict)) {
              arg = null;
            }
            if (arg)
              candidates.unshift([make_node(AST_VarDef, sym, {
                name: sym,
                value: arg
              })]);
          }
        }
      }
    }
    function extract_candidates(expr) {
      hit_stack.push(expr);
      if (expr instanceof AST_Assign) {
        if (!expr.left.has_side_effects(compressor2) && !(expr.right instanceof AST_Chain)) {
          candidates.push(hit_stack.slice());
        }
        extract_candidates(expr.right);
      } else if (expr instanceof AST_Binary) {
        extract_candidates(expr.left);
        extract_candidates(expr.right);
      } else if (expr instanceof AST_Call && !has_annotation(expr, _NOINLINE)) {
        extract_candidates(expr.expression);
        expr.args.forEach(extract_candidates);
      } else if (expr instanceof AST_Case) {
        extract_candidates(expr.expression);
      } else if (expr instanceof AST_Conditional) {
        extract_candidates(expr.condition);
        extract_candidates(expr.consequent);
        extract_candidates(expr.alternative);
      } else if (expr instanceof AST_Definitions) {
        var len = expr.definitions.length;
        var i2 = len - 200;
        if (i2 < 0)
          i2 = 0;
        for (;i2 < len; i2++) {
          extract_candidates(expr.definitions[i2]);
        }
      } else if (expr instanceof AST_DWLoop) {
        extract_candidates(expr.condition);
        if (!(expr.body instanceof AST_Block)) {
          extract_candidates(expr.body);
        }
      } else if (expr instanceof AST_Exit) {
        if (expr.value)
          extract_candidates(expr.value);
      } else if (expr instanceof AST_For) {
        if (expr.init)
          extract_candidates(expr.init);
        if (expr.condition)
          extract_candidates(expr.condition);
        if (expr.step)
          extract_candidates(expr.step);
        if (!(expr.body instanceof AST_Block)) {
          extract_candidates(expr.body);
        }
      } else if (expr instanceof AST_ForIn) {
        extract_candidates(expr.object);
        if (!(expr.body instanceof AST_Block)) {
          extract_candidates(expr.body);
        }
      } else if (expr instanceof AST_If) {
        extract_candidates(expr.condition);
        if (!(expr.body instanceof AST_Block)) {
          extract_candidates(expr.body);
        }
        if (expr.alternative && !(expr.alternative instanceof AST_Block)) {
          extract_candidates(expr.alternative);
        }
      } else if (expr instanceof AST_Sequence) {
        expr.expressions.forEach(extract_candidates);
      } else if (expr instanceof AST_SimpleStatement) {
        extract_candidates(expr.body);
      } else if (expr instanceof AST_Switch) {
        extract_candidates(expr.expression);
        expr.body.forEach(extract_candidates);
      } else if (expr instanceof AST_Unary) {
        if (expr.operator == "++" || expr.operator == "--") {
          candidates.push(hit_stack.slice());
        }
      } else if (expr instanceof AST_VarDef) {
        if (expr.value && !(expr.value instanceof AST_Chain)) {
          candidates.push(hit_stack.slice());
          extract_candidates(expr.value);
        }
      }
      hit_stack.pop();
    }
    function find_stop(node, level, write_only) {
      var parent = scanner.parent(level);
      if (parent instanceof AST_Assign) {
        if (write_only && !parent.logical && !(parent.left instanceof AST_PropAccess || lvalues.has(parent.left.name))) {
          return find_stop(parent, level + 1, write_only);
        }
        return node;
      }
      if (parent instanceof AST_Binary) {
        if (write_only && (!lazy_op.has(parent.operator) || parent.left === node)) {
          return find_stop(parent, level + 1, write_only);
        }
        return node;
      }
      if (parent instanceof AST_Call)
        return node;
      if (parent instanceof AST_Case)
        return node;
      if (parent instanceof AST_Conditional) {
        if (write_only && parent.condition === node) {
          return find_stop(parent, level + 1, write_only);
        }
        return node;
      }
      if (parent instanceof AST_Definitions) {
        return find_stop(parent, level + 1, true);
      }
      if (parent instanceof AST_Exit) {
        return write_only ? find_stop(parent, level + 1, write_only) : node;
      }
      if (parent instanceof AST_If) {
        if (write_only && parent.condition === node) {
          return find_stop(parent, level + 1, write_only);
        }
        return node;
      }
      if (parent instanceof AST_IterationStatement)
        return node;
      if (parent instanceof AST_Sequence) {
        return find_stop(parent, level + 1, parent.tail_node() !== node);
      }
      if (parent instanceof AST_SimpleStatement) {
        return find_stop(parent, level + 1, true);
      }
      if (parent instanceof AST_Switch)
        return node;
      if (parent instanceof AST_VarDef)
        return node;
      return null;
    }
    function mangleable_var(var_def) {
      var value = var_def.value;
      if (!(value instanceof AST_SymbolRef))
        return;
      if (value.name == "arguments")
        return;
      var def2 = value.definition();
      if (def2.undeclared)
        return;
      return value_def = def2;
    }
    function get_lhs(expr) {
      if (expr instanceof AST_Assign && expr.logical) {
        return false;
      } else if (expr instanceof AST_VarDef && expr.name instanceof AST_SymbolDeclaration) {
        var def2 = expr.name.definition();
        if (!member(expr.name, def2.orig))
          return;
        var referenced = def2.references.length - def2.replaced;
        if (!referenced)
          return;
        var declared = def2.orig.length - def2.eliminated;
        if (declared > 1 && !(expr.name instanceof AST_SymbolFunarg) || (referenced > 1 ? mangleable_var(expr) : !compressor2.exposed(def2))) {
          return make_node(AST_SymbolRef, expr.name, expr.name);
        }
      } else {
        const lhs2 = expr instanceof AST_Assign ? expr.left : expr.expression;
        return !is_ref_of(lhs2, AST_SymbolConst) && !is_ref_of(lhs2, AST_SymbolLet) && lhs2;
      }
    }
    function get_rvalue(expr) {
      if (expr instanceof AST_Assign) {
        return expr.right;
      } else {
        return expr.value;
      }
    }
    function get_lvalues(expr) {
      var lvalues2 = new Map;
      if (expr instanceof AST_Unary)
        return lvalues2;
      var tw = new TreeWalker(function(node) {
        var sym = node;
        while (sym instanceof AST_PropAccess)
          sym = sym.expression;
        if (sym instanceof AST_SymbolRef) {
          const prev = lvalues2.get(sym.name);
          if (!prev || !prev.modified) {
            lvalues2.set(sym.name, {
              def: sym.definition(),
              modified: is_modified(compressor2, tw, node, node, 0)
            });
          }
        }
      });
      get_rvalue(expr).walk(tw);
      return lvalues2;
    }
    function remove_candidate(expr) {
      if (expr.name instanceof AST_SymbolFunarg) {
        var iife = compressor2.parent(), argnames = compressor2.self().argnames;
        var index = argnames.indexOf(expr.name);
        if (index < 0) {
          iife.args.length = Math.min(iife.args.length, argnames.length - 1);
        } else {
          var args2 = iife.args;
          if (args2[index])
            args2[index] = make_node(AST_Number, args2[index], {
              value: 0
            });
        }
        return true;
      }
      var found = false;
      return statements2[stat_index].transform(new TreeTransformer(function(node, descend, in_list) {
        if (found)
          return node;
        if (node === expr || node.body === expr) {
          found = true;
          if (node instanceof AST_VarDef) {
            node.value = node.name instanceof AST_SymbolConst ? make_node(AST_Undefined, node.value) : null;
            return node;
          }
          return in_list ? MAP.skip : null;
        }
      }, function(node) {
        if (node instanceof AST_Sequence)
          switch (node.expressions.length) {
            case 0:
              return null;
            case 1:
              return node.expressions[0];
          }
      }));
    }
    function is_lhs_local(lhs2) {
      while (lhs2 instanceof AST_PropAccess)
        lhs2 = lhs2.expression;
      return lhs2 instanceof AST_SymbolRef && lhs2.definition().scope.get_defun_scope() === defun_scope && !(in_loop && (lvalues.has(lhs2.name) || candidate instanceof AST_Unary || candidate instanceof AST_Assign && !candidate.logical && candidate.operator != "="));
    }
    function value_has_side_effects(expr) {
      if (expr instanceof AST_Unary)
        return unary_side_effects.has(expr.operator);
      return get_rvalue(expr).has_side_effects(compressor2);
    }
    function replace_all_symbols() {
      if (side_effects)
        return false;
      if (value_def)
        return true;
      if (lhs instanceof AST_SymbolRef) {
        var def2 = lhs.definition();
        if (def2.references.length - def2.replaced == (candidate instanceof AST_VarDef ? 1 : 2)) {
          return true;
        }
      }
      return false;
    }
    function may_modify(sym) {
      if (!sym.definition)
        return true;
      var def2 = sym.definition();
      if (def2.orig.length == 1 && def2.orig[0] instanceof AST_SymbolDefun)
        return false;
      if (def2.scope.get_defun_scope() !== defun_scope)
        return true;
      return def2.references.some((ref) => ref.scope.get_defun_scope() !== defun_scope);
    }
    function side_effects_external(node, lhs2) {
      if (node instanceof AST_Assign)
        return side_effects_external(node.left, true);
      if (node instanceof AST_Unary)
        return side_effects_external(node.expression, true);
      if (node instanceof AST_VarDef)
        return node.value && side_effects_external(node.value);
      if (lhs2) {
        if (node instanceof AST_Dot)
          return side_effects_external(node.expression, true);
        if (node instanceof AST_Sub)
          return side_effects_external(node.expression, true);
        if (node instanceof AST_SymbolRef)
          return node.definition().scope.get_defun_scope() !== defun_scope;
      }
      return false;
    }
    function shadows(my_scope, lvalues2) {
      for (const { def: def2 } of lvalues2.values()) {
        const looked_up = my_scope.find_variable(def2.name);
        if (looked_up) {
          if (looked_up === def2)
            continue;
          return true;
        }
      }
      return false;
    }
  }
  function eliminate_spurious_blocks(statements2) {
    var seen_dirs = [];
    for (var i = 0;i < statements2.length; ) {
      var stat = statements2[i];
      if (stat instanceof AST_BlockStatement && stat.body.every(can_be_evicted_from_block)) {
        CHANGED = true;
        eliminate_spurious_blocks(stat.body);
        statements2.splice(i, 1, ...stat.body);
        i += stat.body.length;
      } else if (stat instanceof AST_EmptyStatement) {
        CHANGED = true;
        statements2.splice(i, 1);
      } else if (stat instanceof AST_Directive) {
        if (seen_dirs.indexOf(stat.value) < 0) {
          i++;
          seen_dirs.push(stat.value);
        } else {
          CHANGED = true;
          statements2.splice(i, 1);
        }
      } else
        i++;
    }
  }
  function handle_if_return(statements2, compressor2) {
    var self2 = compressor2.self();
    var multiple_if_returns = has_multiple_if_returns(statements2);
    var in_lambda = self2 instanceof AST_Lambda;
    const iteration_start = Math.min(statements2.length, 500);
    for (var i = iteration_start;--i >= 0; ) {
      var stat = statements2[i];
      var j = next_index(i);
      var next = statements2[j];
      if (in_lambda && !next && stat instanceof AST_Return) {
        if (!stat.value) {
          CHANGED = true;
          statements2.splice(i, 1);
          continue;
        }
        if (stat.value instanceof AST_UnaryPrefix && stat.value.operator == "void") {
          CHANGED = true;
          statements2[i] = make_node(AST_SimpleStatement, stat, {
            body: stat.value.expression
          });
          continue;
        }
      }
      if (stat instanceof AST_If) {
        let ab, new_else;
        ab = aborts(stat.body);
        if (can_merge_flow(ab) && (new_else = as_statement_array_with_return(stat.body, ab))) {
          if (ab.label) {
            remove(ab.label.thedef.references, ab);
          }
          CHANGED = true;
          stat = stat.clone();
          stat.condition = stat.condition.negate(compressor2);
          stat.body = make_node(AST_BlockStatement, stat, {
            body: as_statement_array(stat.alternative).concat(extract_defuns())
          });
          stat.alternative = make_node(AST_BlockStatement, stat, {
            body: new_else
          });
          statements2[i] = stat.transform(compressor2);
          continue;
        }
        ab = aborts(stat.alternative);
        if (can_merge_flow(ab) && (new_else = as_statement_array_with_return(stat.alternative, ab))) {
          if (ab.label) {
            remove(ab.label.thedef.references, ab);
          }
          CHANGED = true;
          stat = stat.clone();
          stat.body = make_node(AST_BlockStatement, stat.body, {
            body: as_statement_array(stat.body).concat(extract_defuns())
          });
          stat.alternative = make_node(AST_BlockStatement, stat.alternative, {
            body: new_else
          });
          statements2[i] = stat.transform(compressor2);
          continue;
        }
      }
      if (stat instanceof AST_If && stat.body instanceof AST_Return) {
        var value = stat.body.value;
        if (!value && !stat.alternative && (in_lambda && !next || next instanceof AST_Return && !next.value)) {
          CHANGED = true;
          statements2[i] = make_node(AST_SimpleStatement, stat.condition, {
            body: stat.condition
          });
          continue;
        }
        if (value && !stat.alternative && next instanceof AST_Return && next.value) {
          CHANGED = true;
          stat = stat.clone();
          stat.alternative = next;
          statements2[i] = stat.transform(compressor2);
          statements2.splice(j, 1);
          continue;
        }
        if (value && !stat.alternative && (!next && in_lambda && multiple_if_returns || next instanceof AST_Return)) {
          CHANGED = true;
          stat = stat.clone();
          stat.alternative = next || make_node(AST_Return, stat, {
            value: null
          });
          statements2[i] = stat.transform(compressor2);
          if (next)
            statements2.splice(j, 1);
          continue;
        }
        var prev = statements2[prev_index(i)];
        if (compressor2.option("sequences") && in_lambda && !stat.alternative && prev instanceof AST_If && prev.body instanceof AST_Return && next_index(j) == statements2.length && next instanceof AST_SimpleStatement) {
          CHANGED = true;
          stat = stat.clone();
          stat.alternative = make_node(AST_BlockStatement, next, {
            body: [
              next,
              make_node(AST_Return, next, {
                value: null
              })
            ]
          });
          statements2[i] = stat.transform(compressor2);
          statements2.splice(j, 1);
          continue;
        }
      }
    }
    function has_multiple_if_returns(statements3) {
      var n = 0;
      for (var i2 = statements3.length;--i2 >= 0; ) {
        var stat2 = statements3[i2];
        if (stat2 instanceof AST_If && stat2.body instanceof AST_Return) {
          if (++n > 1)
            return true;
        }
      }
      return false;
    }
    function is_return_void(value2) {
      return !value2 || value2 instanceof AST_UnaryPrefix && value2.operator == "void";
    }
    function can_merge_flow(ab) {
      if (!ab)
        return false;
      for (var j2 = i + 1, len = statements2.length;j2 < len; j2++) {
        var stat2 = statements2[j2];
        if (stat2 instanceof AST_Const || stat2 instanceof AST_Let)
          return false;
      }
      var lct = ab instanceof AST_LoopControl ? compressor2.loopcontrol_target(ab) : null;
      return ab instanceof AST_Return && in_lambda && is_return_void(ab.value) || ab instanceof AST_Continue && self2 === loop_body(lct) || ab instanceof AST_Break && lct instanceof AST_BlockStatement && self2 === lct;
    }
    function extract_defuns() {
      var tail = statements2.slice(i + 1);
      statements2.length = i + 1;
      return tail.filter(function(stat2) {
        if (stat2 instanceof AST_Defun) {
          statements2.push(stat2);
          return false;
        }
        return true;
      });
    }
    function as_statement_array_with_return(node, ab) {
      var body = as_statement_array(node);
      if (ab !== body[body.length - 1]) {
        return;
      }
      body = body.slice(0, -1);
      if (!body.every((stat2) => can_be_evicted_from_block(stat2))) {
        return;
      }
      if (ab.value) {
        body.push(make_node(AST_SimpleStatement, ab.value, {
          body: ab.value.expression
        }));
      }
      return body;
    }
    function next_index(i2) {
      for (var j2 = i2 + 1, len = statements2.length;j2 < len; j2++) {
        var stat2 = statements2[j2];
        if (!(stat2 instanceof AST_Var && declarations_only(stat2))) {
          break;
        }
      }
      return j2;
    }
    function prev_index(i2) {
      for (var j2 = i2;--j2 >= 0; ) {
        var stat2 = statements2[j2];
        if (!(stat2 instanceof AST_Var && declarations_only(stat2))) {
          break;
        }
      }
      return j2;
    }
  }
  function eliminate_dead_code(statements2, compressor2) {
    var has_quit;
    var self2 = compressor2.self();
    for (var i = 0, n = 0, len = statements2.length;i < len; i++) {
      var stat = statements2[i];
      if (stat instanceof AST_LoopControl) {
        var lct = compressor2.loopcontrol_target(stat);
        if (stat instanceof AST_Break && !(lct instanceof AST_IterationStatement) && loop_body(lct) === self2 || stat instanceof AST_Continue && loop_body(lct) === self2) {
          if (stat.label) {
            remove(stat.label.thedef.references, stat);
          }
        } else {
          statements2[n++] = stat;
        }
      } else {
        statements2[n++] = stat;
      }
      if (aborts(stat)) {
        has_quit = statements2.slice(i + 1);
        break;
      }
    }
    statements2.length = n;
    CHANGED = n != len;
    if (has_quit)
      has_quit.forEach(function(stat2) {
        trim_unreachable_code(compressor2, stat2, statements2);
      });
  }
  function declarations_only(node) {
    return node.definitions.every((var_def) => !var_def.value);
  }
  function sequencesize(statements2, compressor2) {
    if (statements2.length < 2)
      return;
    var seq = [], n = 0;
    function push_seq() {
      if (!seq.length)
        return;
      var body2 = make_sequence(seq[0], seq);
      statements2[n++] = make_node(AST_SimpleStatement, body2, { body: body2 });
      seq = [];
    }
    for (var i = 0, len = statements2.length;i < len; i++) {
      var stat = statements2[i];
      if (stat instanceof AST_SimpleStatement) {
        if (seq.length >= compressor2.sequences_limit)
          push_seq();
        var body = stat.body;
        if (seq.length > 0)
          body = body.drop_side_effect_free(compressor2);
        if (body)
          merge_sequence(seq, body);
      } else if (stat instanceof AST_Definitions && declarations_only(stat) || stat instanceof AST_Defun) {
        statements2[n++] = stat;
      } else {
        push_seq();
        statements2[n++] = stat;
      }
    }
    push_seq();
    statements2.length = n;
    if (n != len)
      CHANGED = true;
  }
  function to_simple_statement(block, decls) {
    if (!(block instanceof AST_BlockStatement))
      return block;
    var stat = null;
    for (var i = 0, len = block.body.length;i < len; i++) {
      var line = block.body[i];
      if (line instanceof AST_Var && declarations_only(line)) {
        decls.push(line);
      } else if (stat || line instanceof AST_Const || line instanceof AST_Let) {
        return false;
      } else {
        stat = line;
      }
    }
    return stat;
  }
  function sequencesize_2(statements2, compressor2) {
    function cons_seq(right) {
      n--;
      CHANGED = true;
      var left = prev.body;
      return make_sequence(left, [left, right]).transform(compressor2);
    }
    var n = 0, prev;
    for (var i = 0;i < statements2.length; i++) {
      var stat = statements2[i];
      if (prev) {
        if (stat instanceof AST_Exit) {
          stat.value = cons_seq(stat.value || make_node(AST_Undefined, stat).transform(compressor2));
        } else if (stat instanceof AST_For) {
          if (!(stat.init instanceof AST_Definitions)) {
            const abort = walk(prev.body, (node) => {
              if (node instanceof AST_Scope)
                return true;
              if (node instanceof AST_Binary && node.operator === "in") {
                return walk_abort;
              }
            });
            if (!abort) {
              if (stat.init)
                stat.init = cons_seq(stat.init);
              else {
                stat.init = prev.body;
                n--;
                CHANGED = true;
              }
            }
          }
        } else if (stat instanceof AST_ForIn) {
          if (!(stat.init instanceof AST_Const) && !(stat.init instanceof AST_Let)) {
            stat.object = cons_seq(stat.object);
          }
        } else if (stat instanceof AST_If) {
          stat.condition = cons_seq(stat.condition);
        } else if (stat instanceof AST_Switch) {
          stat.expression = cons_seq(stat.expression);
        } else if (stat instanceof AST_With) {
          stat.expression = cons_seq(stat.expression);
        }
      }
      if (compressor2.option("conditionals") && stat instanceof AST_If) {
        var decls = [];
        var body = to_simple_statement(stat.body, decls);
        var alt = to_simple_statement(stat.alternative, decls);
        if (body !== false && alt !== false && decls.length > 0) {
          var len = decls.length;
          decls.push(make_node(AST_If, stat, {
            condition: stat.condition,
            body: body || make_node(AST_EmptyStatement, stat.body),
            alternative: alt
          }));
          decls.unshift(n, 1);
          [].splice.apply(statements2, decls);
          i += len;
          n += len + 1;
          prev = null;
          CHANGED = true;
          continue;
        }
      }
      statements2[n++] = stat;
      prev = stat instanceof AST_SimpleStatement ? stat : null;
    }
    statements2.length = n;
  }
  function join_object_assignments(defn, body) {
    if (!(defn instanceof AST_Definitions))
      return;
    var def = defn.definitions[defn.definitions.length - 1];
    if (!(def.value instanceof AST_Object))
      return;
    var exprs;
    if (body instanceof AST_Assign && !body.logical) {
      exprs = [body];
    } else if (body instanceof AST_Sequence) {
      exprs = body.expressions.slice();
    }
    if (!exprs)
      return;
    var trimmed = false;
    do {
      var node = exprs[0];
      if (!(node instanceof AST_Assign))
        break;
      if (node.operator != "=")
        break;
      if (!(node.left instanceof AST_PropAccess))
        break;
      var sym = node.left.expression;
      if (!(sym instanceof AST_SymbolRef))
        break;
      if (def.name.name != sym.name)
        break;
      if (!node.right.is_constant_expression(nearest_scope))
        break;
      var prop = node.left.property;
      if (prop instanceof AST_Node) {
        prop = prop.evaluate(compressor);
      }
      if (prop instanceof AST_Node)
        break;
      prop = "" + prop;
      var diff = compressor.option("ecma") < 2015 && compressor.has_directive("use strict") ? function(node2) {
        return node2.key != prop && (node2.key && node2.key.name != prop);
      } : function(node2) {
        return node2.key && node2.key.name != prop;
      };
      if (!def.value.properties.every(diff))
        break;
      var p = def.value.properties.filter(function(p2) {
        return p2.key === prop;
      })[0];
      if (!p) {
        def.value.properties.push(make_node(AST_ObjectKeyVal, node, {
          key: prop,
          value: node.right
        }));
      } else {
        p.value = new AST_Sequence({
          start: p.start,
          expressions: [p.value.clone(), node.right.clone()],
          end: p.end
        });
      }
      exprs.shift();
      trimmed = true;
    } while (exprs.length);
    return trimmed && exprs;
  }
  function join_consecutive_vars(statements2) {
    var defs;
    for (var i = 0, j = -1, len = statements2.length;i < len; i++) {
      var stat = statements2[i];
      var prev = statements2[j];
      if (stat instanceof AST_Definitions) {
        if (prev && prev.TYPE == stat.TYPE) {
          prev.definitions = prev.definitions.concat(stat.definitions);
          CHANGED = true;
        } else if (defs && defs.TYPE == stat.TYPE && declarations_only(stat)) {
          defs.definitions = defs.definitions.concat(stat.definitions);
          CHANGED = true;
        } else {
          statements2[++j] = stat;
          defs = stat;
        }
      } else if (stat instanceof AST_Exit) {
        stat.value = extract_object_assignments(stat.value);
      } else if (stat instanceof AST_For) {
        var exprs = join_object_assignments(prev, stat.init);
        if (exprs) {
          CHANGED = true;
          stat.init = exprs.length ? make_sequence(stat.init, exprs) : null;
          statements2[++j] = stat;
        } else if (prev instanceof AST_Var && (!stat.init || stat.init.TYPE == prev.TYPE)) {
          if (stat.init) {
            prev.definitions = prev.definitions.concat(stat.init.definitions);
          }
          stat.init = prev;
          statements2[j] = stat;
          CHANGED = true;
        } else if (defs instanceof AST_Var && stat.init instanceof AST_Var && declarations_only(stat.init)) {
          defs.definitions = defs.definitions.concat(stat.init.definitions);
          stat.init = null;
          statements2[++j] = stat;
          CHANGED = true;
        } else {
          statements2[++j] = stat;
        }
      } else if (stat instanceof AST_ForIn) {
        stat.object = extract_object_assignments(stat.object);
      } else if (stat instanceof AST_If) {
        stat.condition = extract_object_assignments(stat.condition);
      } else if (stat instanceof AST_SimpleStatement) {
        var exprs = join_object_assignments(prev, stat.body);
        if (exprs) {
          CHANGED = true;
          if (!exprs.length)
            continue;
          stat.body = make_sequence(stat.body, exprs);
        }
        statements2[++j] = stat;
      } else if (stat instanceof AST_Switch) {
        stat.expression = extract_object_assignments(stat.expression);
      } else if (stat instanceof AST_With) {
        stat.expression = extract_object_assignments(stat.expression);
      } else {
        statements2[++j] = stat;
      }
    }
    statements2.length = j + 1;
    function extract_object_assignments(value) {
      statements2[++j] = stat;
      var exprs2 = join_object_assignments(prev, value);
      if (exprs2) {
        CHANGED = true;
        if (exprs2.length) {
          return make_sequence(value, exprs2);
        } else if (value instanceof AST_Sequence) {
          return value.tail_node().left;
        } else {
          return value.left;
        }
      }
      return value;
    }
  }
}

// node_modules/terser/lib/compress/inline.js
function within_array_or_object_literal(compressor) {
  var node, level = 0;
  while (node = compressor.parent(level++)) {
    if (node instanceof AST_Statement)
      return false;
    if (node instanceof AST_Array || node instanceof AST_ObjectKeyVal || node instanceof AST_Object) {
      return true;
    }
  }
  return false;
}
function scope_encloses_variables_in_this_scope(scope, pulled_scope) {
  for (const enclosed of pulled_scope.enclosed) {
    if (pulled_scope.variables.has(enclosed.name)) {
      continue;
    }
    const looked_up = scope.find_variable(enclosed.name);
    if (looked_up) {
      if (looked_up === enclosed)
        continue;
      return true;
    }
  }
  return false;
}
function is_const_symbol_short_than_init_value(def, fixed_value) {
  if (def.orig.length === 1 && fixed_value) {
    const init_value_length = fixed_value.size();
    const identifer_length = def.name.length;
    return init_value_length > identifer_length;
  }
  return true;
}
function inline_into_symbolref(self2, compressor) {
  if (compressor.in_computed_key())
    return self2;
  const parent = compressor.parent();
  const def = self2.definition();
  const nearest_scope = compressor.find_scope();
  let fixed = self2.fixed_value();
  if (compressor.top_retain && def.global && compressor.top_retain(def) && is_const_symbol_short_than_init_value(def, fixed)) {
    def.fixed = false;
    def.single_use = false;
    return self2;
  }
  if (dont_inline_lambda_in_loop(compressor, fixed))
    return self2;
  let single_use = def.single_use && !(parent instanceof AST_Call && parent.is_callee_pure(compressor) || has_annotation(parent, _NOINLINE)) && !(parent instanceof AST_Export && fixed instanceof AST_Lambda && fixed.name);
  if (single_use && fixed instanceof AST_Node) {
    single_use = !fixed.has_side_effects(compressor) && !fixed.may_throw(compressor);
  }
  if (fixed instanceof AST_Class && def.scope !== self2.scope) {
    return self2;
  }
  if (single_use && (fixed instanceof AST_Lambda || fixed instanceof AST_Class)) {
    if (retain_top_func(fixed, compressor)) {
      single_use = false;
    } else if (def.scope !== self2.scope && (def.escaped == 1 || has_flag(fixed, INLINED) || within_array_or_object_literal(compressor) || !compressor.option("reduce_funcs"))) {
      single_use = false;
    } else if (is_recursive_ref(compressor, def)) {
      single_use = false;
    } else if (def.scope !== self2.scope || def.orig[0] instanceof AST_SymbolFunarg) {
      single_use = fixed.is_constant_expression(self2.scope);
      if (single_use == "f") {
        var scope = self2.scope;
        do {
          if (scope instanceof AST_Defun || is_func_expr(scope)) {
            set_flag(scope, INLINED);
          }
        } while (scope = scope.parent_scope);
      }
    }
  }
  if (single_use && (fixed instanceof AST_Lambda || fixed instanceof AST_Class)) {
    single_use = def.scope === self2.scope && !scope_encloses_variables_in_this_scope(nearest_scope, fixed) || parent instanceof AST_Call && parent.expression === self2 && !scope_encloses_variables_in_this_scope(nearest_scope, fixed) && !(fixed.name && fixed.name.definition().recursive_refs > 0);
  }
  if (single_use && fixed) {
    if (fixed instanceof AST_DefClass) {
      set_flag(fixed, SQUEEZED);
      fixed = make_node(AST_ClassExpression, fixed, fixed);
    }
    if (fixed instanceof AST_Defun) {
      set_flag(fixed, SQUEEZED);
      fixed = make_node(AST_Function, fixed, fixed);
    }
    if (def.recursive_refs > 0 && fixed.name instanceof AST_SymbolDefun) {
      const defun_def = fixed.name.definition();
      let lambda_def = fixed.variables.get(fixed.name.name);
      let name = lambda_def && lambda_def.orig[0];
      if (!(name instanceof AST_SymbolLambda)) {
        name = make_node(AST_SymbolLambda, fixed.name, fixed.name);
        name.scope = fixed;
        fixed.name = name;
        lambda_def = fixed.def_function(name);
      }
      walk(fixed, (node) => {
        if (node instanceof AST_SymbolRef && node.definition() === defun_def) {
          node.thedef = lambda_def;
          lambda_def.references.push(node);
        }
      });
    }
    if ((fixed instanceof AST_Lambda || fixed instanceof AST_Class) && fixed.parent_scope !== nearest_scope) {
      fixed = fixed.clone(true, compressor.get_toplevel());
      nearest_scope.add_child_scope(fixed);
    }
    return fixed.optimize(compressor);
  }
  if (fixed) {
    let replace;
    if (fixed instanceof AST_This) {
      if (!(def.orig[0] instanceof AST_SymbolFunarg) && def.references.every((ref) => def.scope === ref.scope)) {
        replace = fixed;
      }
    } else {
      var ev = fixed.evaluate(compressor);
      if (ev !== fixed && (compressor.option("unsafe_regexp") || !(ev instanceof RegExp))) {
        replace = make_node_from_constant(ev, fixed);
      }
    }
    if (replace) {
      const name_length = self2.size(compressor);
      const replace_size = replace.size(compressor);
      let overhead = 0;
      if (compressor.option("unused") && !compressor.exposed(def)) {
        overhead = (name_length + 2 + fixed.size(compressor)) / (def.references.length - def.assignments);
      }
      if (replace_size <= name_length + overhead) {
        return replace;
      }
    }
  }
  return self2;
}
function inline_into_call(self2, compressor) {
  if (compressor.in_computed_key())
    return self2;
  var exp = self2.expression;
  var fn = exp;
  var simple_args = self2.args.every((arg) => !(arg instanceof AST_Expansion));
  if (compressor.option("reduce_vars") && fn instanceof AST_SymbolRef && !has_annotation(self2, _NOINLINE)) {
    const fixed = fn.fixed_value();
    if (retain_top_func(fixed, compressor) || !compressor.toplevel.funcs && exp.definition().global) {
      return self2;
    }
    fn = fixed;
  }
  if (dont_inline_lambda_in_loop(compressor, fn) && !has_annotation(self2, _INLINE))
    return self2;
  var is_func = fn instanceof AST_Lambda;
  var stat = is_func && fn.body[0];
  var is_regular_func = is_func && !fn.is_generator && !fn.async;
  var can_inline = is_regular_func && compressor.option("inline") && !self2.is_callee_pure(compressor);
  if (can_inline && stat instanceof AST_Return) {
    let returned = stat.value;
    if (!returned || returned.is_constant_expression()) {
      if (returned) {
        returned = returned.clone(true);
      } else {
        returned = make_node(AST_Undefined, self2);
      }
      const args2 = self2.args.concat(returned);
      return make_sequence(self2, args2).optimize(compressor);
    }
    if (fn.argnames.length === 1 && fn.argnames[0] instanceof AST_SymbolFunarg && self2.args.length < 2 && !(self2.args[0] instanceof AST_Expansion) && returned instanceof AST_SymbolRef && returned.name === fn.argnames[0].name) {
      const replacement = (self2.args[0] || make_node(AST_Undefined)).optimize(compressor);
      let parent;
      if (replacement instanceof AST_PropAccess && (parent = compressor.parent()) instanceof AST_Call && parent.expression === self2) {
        return make_sequence(self2, [
          make_node(AST_Number, self2, { value: 0 }),
          replacement
        ]);
      }
      return replacement;
    }
  }
  if (can_inline) {
    var scope, in_loop, level = -1;
    let def;
    let returned_value;
    let nearest_scope;
    if (simple_args && !fn.uses_arguments && !(compressor.parent() instanceof AST_Class) && !(fn.name && fn instanceof AST_Function) && (returned_value = can_flatten_body(stat)) && (exp === fn || has_annotation(self2, _INLINE) || compressor.option("unused") && (def = exp.definition()).references.length == 1 && !is_recursive_ref(compressor, def) && fn.is_constant_expression(exp.scope)) && !has_annotation(self2, _PURE | _NOINLINE) && !fn.contains_this() && can_inject_symbols() && (nearest_scope = compressor.find_scope()) && !scope_encloses_variables_in_this_scope(nearest_scope, fn) && !function in_default_assign() {
      let i = 0;
      let p;
      while (p = compressor.parent(i++)) {
        if (p instanceof AST_DefaultAssign)
          return true;
        if (p instanceof AST_Block)
          break;
      }
      return false;
    }() && !(scope instanceof AST_Class)) {
      set_flag(fn, SQUEEZED);
      nearest_scope.add_child_scope(fn);
      return make_sequence(self2, flatten_fn(returned_value)).optimize(compressor);
    }
  }
  if (can_inline && has_annotation(self2, _INLINE)) {
    set_flag(fn, SQUEEZED);
    fn = make_node(fn.CTOR === AST_Defun ? AST_Function : fn.CTOR, fn, fn);
    fn = fn.clone(true);
    fn.figure_out_scope({}, {
      parent_scope: compressor.find_scope(),
      toplevel: compressor.get_toplevel()
    });
    return make_node(AST_Call, self2, {
      expression: fn,
      args: self2.args
    }).optimize(compressor);
  }
  const can_drop_this_call = is_regular_func && compressor.option("side_effects") && fn.body.every(is_empty);
  if (can_drop_this_call) {
    var args = self2.args.concat(make_node(AST_Undefined, self2));
    return make_sequence(self2, args).optimize(compressor);
  }
  if (compressor.option("negate_iife") && compressor.parent() instanceof AST_SimpleStatement && is_iife_call(self2)) {
    return self2.negate(compressor, true);
  }
  var ev = self2.evaluate(compressor);
  if (ev !== self2) {
    ev = make_node_from_constant(ev, self2).optimize(compressor);
    return best_of(compressor, ev, self2);
  }
  return self2;
  function return_value(stat2) {
    if (!stat2)
      return make_node(AST_Undefined, self2);
    if (stat2 instanceof AST_Return) {
      if (!stat2.value)
        return make_node(AST_Undefined, self2);
      return stat2.value.clone(true);
    }
    if (stat2 instanceof AST_SimpleStatement) {
      return make_node(AST_UnaryPrefix, stat2, {
        operator: "void",
        expression: stat2.body.clone(true)
      });
    }
  }
  function can_flatten_body(stat2) {
    var body = fn.body;
    var len = body.length;
    if (compressor.option("inline") < 3) {
      return len == 1 && return_value(stat2);
    }
    stat2 = null;
    for (var i = 0;i < len; i++) {
      var line = body[i];
      if (line instanceof AST_Var) {
        if (stat2 && !line.definitions.every((var_def) => !var_def.value)) {
          return false;
        }
      } else if (stat2) {
        return false;
      } else if (!(line instanceof AST_EmptyStatement)) {
        stat2 = line;
      }
    }
    return return_value(stat2);
  }
  function can_inject_args(block_scoped, safe_to_inject) {
    for (var i = 0, len = fn.argnames.length;i < len; i++) {
      var arg = fn.argnames[i];
      if (arg instanceof AST_DefaultAssign) {
        if (has_flag(arg.left, UNUSED))
          continue;
        return false;
      }
      if (arg instanceof AST_Destructuring)
        return false;
      if (arg instanceof AST_Expansion) {
        if (has_flag(arg.expression, UNUSED))
          continue;
        return false;
      }
      if (has_flag(arg, UNUSED))
        continue;
      if (!safe_to_inject || block_scoped.has(arg.name) || identifier_atom.has(arg.name) || scope.conflicting_def(arg.name)) {
        return false;
      }
      if (in_loop)
        in_loop.push(arg.definition());
    }
    return true;
  }
  function can_inject_vars(block_scoped, safe_to_inject) {
    var len = fn.body.length;
    for (var i = 0;i < len; i++) {
      var stat2 = fn.body[i];
      if (!(stat2 instanceof AST_Var))
        continue;
      if (!safe_to_inject)
        return false;
      for (var j = stat2.definitions.length;--j >= 0; ) {
        var name = stat2.definitions[j].name;
        if (name instanceof AST_Destructuring || block_scoped.has(name.name) || identifier_atom.has(name.name) || scope.conflicting_def(name.name)) {
          return false;
        }
        if (in_loop)
          in_loop.push(name.definition());
      }
    }
    return true;
  }
  function can_inject_symbols() {
    var block_scoped = new Set;
    do {
      scope = compressor.parent(++level);
      if (scope.is_block_scope() && scope.block_scope) {
        scope.block_scope.variables.forEach(function(variable) {
          block_scoped.add(variable.name);
        });
      }
      if (scope instanceof AST_Catch) {
        if (scope.argname) {
          block_scoped.add(scope.argname.name);
        }
      } else if (scope instanceof AST_IterationStatement) {
        in_loop = [];
      } else if (scope instanceof AST_SymbolRef) {
        if (scope.fixed_value() instanceof AST_Scope)
          return false;
      }
    } while (!(scope instanceof AST_Scope));
    var safe_to_inject = !(scope instanceof AST_Toplevel) || compressor.toplevel.vars;
    var inline = compressor.option("inline");
    if (!can_inject_vars(block_scoped, inline >= 3 && safe_to_inject))
      return false;
    if (!can_inject_args(block_scoped, inline >= 2 && safe_to_inject))
      return false;
    return !in_loop || in_loop.length == 0 || !is_reachable(fn, in_loop);
  }
  function append_var(decls, expressions, name, value) {
    var def = name.definition();
    const already_appended = scope.variables.has(name.name);
    if (!already_appended) {
      scope.variables.set(name.name, def);
      scope.enclosed.push(def);
      decls.push(make_node(AST_VarDef, name, {
        name,
        value: null
      }));
    }
    var sym = make_node(AST_SymbolRef, name, name);
    def.references.push(sym);
    if (value)
      expressions.push(make_node(AST_Assign, self2, {
        operator: "=",
        logical: false,
        left: sym,
        right: value.clone()
      }));
  }
  function flatten_args(decls, expressions) {
    var len = fn.argnames.length;
    for (var i = self2.args.length;--i >= len; ) {
      expressions.push(self2.args[i]);
    }
    for (i = len;--i >= 0; ) {
      var name = fn.argnames[i];
      var value = self2.args[i];
      if (has_flag(name, UNUSED) || !name.name || scope.conflicting_def(name.name)) {
        if (value)
          expressions.push(value);
      } else {
        var symbol = make_node(AST_SymbolVar, name, name);
        name.definition().orig.push(symbol);
        if (!value && in_loop)
          value = make_node(AST_Undefined, self2);
        append_var(decls, expressions, symbol, value);
      }
    }
    decls.reverse();
    expressions.reverse();
  }
  function flatten_vars(decls, expressions) {
    var pos = expressions.length;
    for (var i = 0, lines = fn.body.length;i < lines; i++) {
      var stat2 = fn.body[i];
      if (!(stat2 instanceof AST_Var))
        continue;
      for (var j = 0, defs = stat2.definitions.length;j < defs; j++) {
        var var_def = stat2.definitions[j];
        var name = var_def.name;
        append_var(decls, expressions, name, var_def.value);
        if (in_loop && fn.argnames.every((argname) => argname.name != name.name)) {
          var def = fn.variables.get(name.name);
          var sym = make_node(AST_SymbolRef, name, name);
          def.references.push(sym);
          expressions.splice(pos++, 0, make_node(AST_Assign, var_def, {
            operator: "=",
            logical: false,
            left: sym,
            right: make_node(AST_Undefined, name)
          }));
        }
      }
    }
  }
  function flatten_fn(returned_value) {
    var decls = [];
    var expressions = [];
    flatten_args(decls, expressions);
    flatten_vars(decls, expressions);
    expressions.push(returned_value);
    if (decls.length) {
      const i = scope.body.indexOf(compressor.parent(level - 1)) + 1;
      scope.body.splice(i, 0, make_node(AST_Var, fn, {
        definitions: decls
      }));
    }
    return expressions.map((exp2) => exp2.clone(true));
  }
}
function dont_inline_lambda_in_loop(compressor, maybe_lambda) {
  return (maybe_lambda instanceof AST_Lambda || maybe_lambda instanceof AST_Class) && !!compressor.is_within_loop();
}

// node_modules/terser/lib/compress/global-defs.js
(function(def_find_defs) {
  function to_node(value, orig) {
    if (value instanceof AST_Node) {
      if (!(value instanceof AST_Constant)) {
        value = value.clone(true);
      }
      return make_node(value.CTOR, orig, value);
    }
    if (Array.isArray(value))
      return make_node(AST_Array, orig, {
        elements: value.map(function(value2) {
          return to_node(value2, orig);
        })
      });
    if (value && typeof value == "object") {
      var props = [];
      for (var key in value)
        if (HOP(value, key)) {
          props.push(make_node(AST_ObjectKeyVal, orig, {
            key,
            value: to_node(value[key], orig)
          }));
        }
      return make_node(AST_Object, orig, {
        properties: props
      });
    }
    return make_node_from_constant(value, orig);
  }
  AST_Toplevel.DEFMETHOD("resolve_defines", function(compressor) {
    if (!compressor.option("global_defs"))
      return this;
    this.figure_out_scope({ ie8: compressor.option("ie8") });
    return this.transform(new TreeTransformer(function(node) {
      var def = node._find_defs(compressor, "");
      if (!def)
        return;
      var level = 0, child = node, parent;
      while (parent = this.parent(level++)) {
        if (!(parent instanceof AST_PropAccess))
          break;
        if (parent.expression !== child)
          break;
        child = parent;
      }
      if (is_lhs(child, parent)) {
        return;
      }
      return def;
    }));
  });
  def_find_defs(AST_Node, noop);
  def_find_defs(AST_Chain, function(compressor, suffix) {
    return this.expression._find_defs(compressor, suffix);
  });
  def_find_defs(AST_Dot, function(compressor, suffix) {
    return this.expression._find_defs(compressor, "." + this.property + suffix);
  });
  def_find_defs(AST_SymbolDeclaration, function() {
    if (!this.global())
      return;
  });
  def_find_defs(AST_SymbolRef, function(compressor, suffix) {
    if (!this.global())
      return;
    var defines = compressor.option("global_defs");
    var name = this.name + suffix;
    if (HOP(defines, name))
      return to_node(defines[name], this);
  });
  def_find_defs(AST_ImportMeta, function(compressor, suffix) {
    var defines = compressor.option("global_defs");
    var name = "import.meta" + suffix;
    if (HOP(defines, name))
      return to_node(defines[name], this);
  });
})(function(node, func) {
  node.DEFMETHOD("_find_defs", func);
});

// node_modules/terser/lib/compress/index.js
class Compressor extends TreeWalker {
  constructor(options, { false_by_default = false, mangle_options: mangle_options2 = false }) {
    super();
    if (options.defaults !== undefined && !options.defaults)
      false_by_default = true;
    this.options = defaults(options, {
      arguments: false,
      arrows: !false_by_default,
      booleans: !false_by_default,
      booleans_as_integers: false,
      collapse_vars: !false_by_default,
      comparisons: !false_by_default,
      computed_props: !false_by_default,
      conditionals: !false_by_default,
      dead_code: !false_by_default,
      defaults: true,
      directives: !false_by_default,
      drop_console: false,
      drop_debugger: !false_by_default,
      ecma: 5,
      evaluate: !false_by_default,
      expression: false,
      global_defs: false,
      hoist_funs: false,
      hoist_props: !false_by_default,
      hoist_vars: false,
      ie8: false,
      if_return: !false_by_default,
      inline: !false_by_default,
      join_vars: !false_by_default,
      keep_classnames: false,
      keep_fargs: true,
      keep_fnames: false,
      keep_infinity: false,
      lhs_constants: !false_by_default,
      loops: !false_by_default,
      module: false,
      negate_iife: !false_by_default,
      passes: 1,
      properties: !false_by_default,
      pure_getters: !false_by_default && "strict",
      pure_funcs: null,
      pure_new: false,
      reduce_funcs: !false_by_default,
      reduce_vars: !false_by_default,
      sequences: !false_by_default,
      side_effects: !false_by_default,
      switches: !false_by_default,
      top_retain: null,
      toplevel: !!(options && options["top_retain"]),
      typeofs: !false_by_default,
      unsafe: false,
      unsafe_arrows: false,
      unsafe_comps: false,
      unsafe_Function: false,
      unsafe_math: false,
      unsafe_symbols: false,
      unsafe_methods: false,
      unsafe_proto: false,
      unsafe_regexp: false,
      unsafe_undefined: false,
      unused: !false_by_default,
      warnings: false
    }, true);
    var global_defs = this.options["global_defs"];
    if (typeof global_defs == "object")
      for (var key in global_defs) {
        if (key[0] === "@" && HOP(global_defs, key)) {
          global_defs[key.slice(1)] = parse(global_defs[key], {
            expression: true
          });
        }
      }
    if (this.options["inline"] === true)
      this.options["inline"] = 3;
    var pure_funcs = this.options["pure_funcs"];
    if (typeof pure_funcs == "function") {
      this.pure_funcs = pure_funcs;
    } else {
      this.pure_funcs = pure_funcs ? function(node) {
        return !pure_funcs.includes(node.expression.print_to_string());
      } : return_true;
    }
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
      this.top_retain = function(def) {
        return top_retain.test(def.name);
      };
    } else if (typeof top_retain == "function") {
      this.top_retain = top_retain;
    } else if (top_retain) {
      if (typeof top_retain == "string") {
        top_retain = top_retain.split(/,/);
      }
      this.top_retain = function(def) {
        return top_retain.includes(def.name);
      };
    }
    if (this.options["module"]) {
      this.directives["use strict"] = true;
      this.options["toplevel"] = true;
    }
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
      funcs: /funcs/.test(toplevel),
      vars: /vars/.test(toplevel)
    } : {
      funcs: toplevel,
      vars: toplevel
    };
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
    this.evaluated_regexps = new Map;
    this._toplevel = undefined;
    this._mangle_options = mangle_options2 ? format_mangler_options(mangle_options2) : mangle_options2;
  }
  mangle_options() {
    var nth_identifier = this._mangle_options && this._mangle_options.nth_identifier || base54;
    var module = this._mangle_options && this._mangle_options.module || this.option("module");
    return { ie8: this.option("ie8"), nth_identifier, module };
  }
  option(key) {
    return this.options[key];
  }
  exposed(def) {
    if (def.export)
      return true;
    if (def.global) {
      for (var i = 0, len = def.orig.length;i < len; i++)
        if (!this.toplevel[def.orig[i] instanceof AST_SymbolDefun ? "funcs" : "vars"])
          return true;
    }
    return false;
  }
  in_boolean_context() {
    if (!this.option("booleans"))
      return false;
    var self2 = this.self();
    for (var i = 0, p;p = this.parent(i); i++) {
      if (p instanceof AST_SimpleStatement || p instanceof AST_Conditional && p.condition === self2 || p instanceof AST_DWLoop && p.condition === self2 || p instanceof AST_For && p.condition === self2 || p instanceof AST_If && p.condition === self2 || p instanceof AST_UnaryPrefix && p.operator == "!" && p.expression === self2) {
        return true;
      }
      if (p instanceof AST_Binary && (p.operator == "&&" || p.operator == "||" || p.operator == "??") || p instanceof AST_Conditional || p.tail_node() === self2) {
        self2 = p;
      } else {
        return false;
      }
    }
  }
  in_32_bit_context(other_operand_must_be_number) {
    if (!this.option("evaluate"))
      return false;
    var self2 = this.self();
    for (var i = 0, p;p = this.parent(i); i++) {
      if (p instanceof AST_Binary && bitwise_binop.has(p.operator)) {
        if (other_operand_must_be_number) {
          return (self2 === p.left ? p.right : p.left).is_number(this);
        } else {
          return true;
        }
      }
      if (p instanceof AST_UnaryPrefix) {
        return p.operator === "~";
      }
      if (p instanceof AST_Binary && (p.operator == "&&" || p.operator == "||" || p.operator == "??") || p instanceof AST_Conditional && p.condition !== self2 || p.tail_node() === self2) {
        self2 = p;
      } else {
        return false;
      }
    }
  }
  in_computed_key() {
    if (!this.option("evaluate"))
      return false;
    var self2 = this.self();
    for (var i = 0, p;p = this.parent(i); i++) {
      if (p instanceof AST_ObjectProperty && p.key === self2) {
        return true;
      }
    }
    return false;
  }
  get_toplevel() {
    return this._toplevel;
  }
  compress(toplevel) {
    toplevel = toplevel.resolve_defines(this);
    this._toplevel = toplevel;
    if (this.option("expression")) {
      this._toplevel.process_expression(true);
    }
    var passes = +this.options.passes || 1;
    var min_count = 1 / 0;
    var stopping = false;
    var mangle = this.mangle_options();
    for (var pass = 0;pass < passes; pass++) {
      this._toplevel.figure_out_scope(mangle);
      if (pass === 0 && this.option("drop_console")) {
        this._toplevel = this._toplevel.drop_console(this.option("drop_console"));
      }
      if (pass > 0 || this.option("reduce_vars")) {
        this._toplevel.reset_opt_flags(this);
      }
      this._toplevel = this._toplevel.transform(this);
      if (passes > 1) {
        let count = 0;
        walk(this._toplevel, () => {
          count++;
        });
        if (count < min_count) {
          min_count = count;
          stopping = false;
        } else if (stopping) {
          break;
        } else {
          stopping = true;
        }
      }
    }
    if (this.option("expression")) {
      this._toplevel.process_expression(false);
    }
    toplevel = this._toplevel;
    this._toplevel = undefined;
    return toplevel;
  }
  before(node, descend) {
    if (has_flag(node, SQUEEZED))
      return node;
    var was_scope = false;
    if (node instanceof AST_Scope) {
      node = node.hoist_properties(this);
      node = node.hoist_declarations(this);
      was_scope = true;
    }
    descend(node, this);
    descend(node, this);
    var opt = node.optimize(this);
    if (was_scope && opt instanceof AST_Scope) {
      opt.drop_unused(this);
      descend(opt, this);
    }
    if (opt === node)
      set_flag(opt, SQUEEZED);
    return opt;
  }
  is_lhs() {
    const self2 = this.stack[this.stack.length - 1];
    const parent = this.stack[this.stack.length - 2];
    return is_lhs(self2, parent);
  }
}
function def_optimize(node, optimizer) {
  node.DEFMETHOD("optimize", function(compressor) {
    var self2 = this;
    if (has_flag(self2, OPTIMIZED))
      return self2;
    if (compressor.has_directive("use asm"))
      return self2;
    var opt = optimizer(self2, compressor);
    set_flag(opt, OPTIMIZED);
    return opt;
  });
}
def_optimize(AST_Node, function(self2) {
  return self2;
});
AST_Toplevel.DEFMETHOD("drop_console", function(options) {
  const isArray = Array.isArray(options);
  const tt = new TreeTransformer(function(self2) {
    if (self2.TYPE !== "Call") {
      return;
    }
    var exp = self2.expression;
    if (!(exp instanceof AST_PropAccess)) {
      return;
    }
    var name = exp.expression;
    var property = exp.property;
    var depth = 2;
    while (name.expression) {
      property = name.property;
      name = name.expression;
      depth++;
    }
    if (isArray && !options.includes(property)) {
      return;
    }
    if (is_undeclared_ref(name) && name.name == "console") {
      if (depth === 3 && !["call", "apply"].includes(exp.property) && is_used_in_expression(tt)) {
        exp.expression = make_empty_function(self2);
        set_flag(exp.expression, SQUEEZED);
        self2.args = [];
      } else {
        return make_node(AST_Undefined, self2);
      }
    }
  });
  return this.transform(tt);
});
AST_Node.DEFMETHOD("equivalent_to", function(node) {
  return equivalent_to(this, node);
});
AST_Scope.DEFMETHOD("process_expression", function(insert, compressor) {
  var self2 = this;
  var tt = new TreeTransformer(function(node) {
    if (insert && node instanceof AST_SimpleStatement) {
      return make_node(AST_Return, node, {
        value: node.body
      });
    }
    if (!insert && node instanceof AST_Return) {
      if (compressor) {
        var value = node.value && node.value.drop_side_effect_free(compressor, true);
        return value ? make_node(AST_SimpleStatement, node, { body: value }) : make_node(AST_EmptyStatement, node);
      }
      return make_node(AST_SimpleStatement, node, {
        body: node.value || make_node(AST_UnaryPrefix, node, {
          operator: "void",
          expression: make_node(AST_Number, node, {
            value: 0
          })
        })
      });
    }
    if (node instanceof AST_Class || node instanceof AST_Lambda && node !== self2) {
      return node;
    }
    if (node instanceof AST_Block) {
      var index = node.body.length - 1;
      if (index >= 0) {
        node.body[index] = node.body[index].transform(tt);
      }
    } else if (node instanceof AST_If) {
      node.body = node.body.transform(tt);
      if (node.alternative) {
        node.alternative = node.alternative.transform(tt);
      }
    } else if (node instanceof AST_With) {
      node.body = node.body.transform(tt);
    }
    return node;
  });
  self2.transform(tt);
});
AST_Toplevel.DEFMETHOD("reset_opt_flags", function(compressor) {
  const self2 = this;
  const reduce_vars = compressor.option("reduce_vars");
  const preparation = new TreeWalker(function(node, descend) {
    clear_flag(node, CLEAR_BETWEEN_PASSES);
    if (reduce_vars) {
      if (compressor.top_retain && node instanceof AST_Defun && preparation.parent() === self2) {
        set_flag(node, TOP);
      }
      return node.reduce_vars(preparation, descend, compressor);
    }
  });
  preparation.safe_ids = Object.create(null);
  preparation.in_loop = null;
  preparation.loop_ids = new Map;
  preparation.defs_to_safe_ids = new Map;
  self2.walk(preparation);
});
AST_Symbol.DEFMETHOD("fixed_value", function() {
  var fixed = this.thedef.fixed;
  if (!fixed || fixed instanceof AST_Node)
    return fixed;
  return fixed();
});
AST_SymbolRef.DEFMETHOD("is_immutable", function() {
  var orig = this.definition().orig;
  return orig.length == 1 && orig[0] instanceof AST_SymbolLambda;
});
function find_variable(compressor, name) {
  var scope, i = 0;
  while (scope = compressor.parent(i++)) {
    if (scope instanceof AST_Scope)
      break;
    if (scope instanceof AST_Catch && scope.argname) {
      scope = scope.argname.definition().scope;
      break;
    }
  }
  return scope.find_variable(name);
}
var global_names = makePredicate("Array Boolean clearInterval clearTimeout console Date decodeURI decodeURIComponent encodeURI encodeURIComponent Error escape eval EvalError Function isFinite isNaN JSON Math Number parseFloat parseInt RangeError ReferenceError RegExp Object setInterval setTimeout String SyntaxError TypeError unescape URIError");
AST_SymbolRef.DEFMETHOD("is_declared", function(compressor) {
  return !this.definition().undeclared || compressor.option("unsafe") && global_names.has(this.name);
});
var directives = new Set(["use asm", "use strict"]);
def_optimize(AST_Directive, function(self2, compressor) {
  if (compressor.option("directives") && (!directives.has(self2.value) || compressor.has_directive(self2.value) !== self2)) {
    return make_node(AST_EmptyStatement, self2);
  }
  return self2;
});
def_optimize(AST_Debugger, function(self2, compressor) {
  if (compressor.option("drop_debugger"))
    return make_node(AST_EmptyStatement, self2);
  return self2;
});
def_optimize(AST_LabeledStatement, function(self2, compressor) {
  if (self2.body instanceof AST_Break && compressor.loopcontrol_target(self2.body) === self2.body) {
    return make_node(AST_EmptyStatement, self2);
  }
  return self2.label.references.length == 0 ? self2.body : self2;
});
def_optimize(AST_Block, function(self2, compressor) {
  tighten_body(self2.body, compressor);
  return self2;
});
function can_be_extracted_from_if_block(node) {
  return !(node instanceof AST_Const || node instanceof AST_Let || node instanceof AST_Class);
}
def_optimize(AST_BlockStatement, function(self2, compressor) {
  tighten_body(self2.body, compressor);
  switch (self2.body.length) {
    case 1:
      if (!compressor.has_directive("use strict") && compressor.parent() instanceof AST_If && can_be_extracted_from_if_block(self2.body[0]) || can_be_evicted_from_block(self2.body[0])) {
        return self2.body[0];
      }
      break;
    case 0:
      return make_node(AST_EmptyStatement, self2);
  }
  return self2;
});
function opt_AST_Lambda(self2, compressor) {
  tighten_body(self2.body, compressor);
  if (compressor.option("side_effects") && self2.body.length == 1 && self2.body[0] === compressor.has_directive("use strict")) {
    self2.body.length = 0;
  }
  return self2;
}
def_optimize(AST_Lambda, opt_AST_Lambda);
AST_Scope.DEFMETHOD("hoist_declarations", function(compressor) {
  var self2 = this;
  if (compressor.has_directive("use asm"))
    return self2;
  var hoist_funs = compressor.option("hoist_funs");
  var hoist_vars = compressor.option("hoist_vars");
  if (hoist_funs || hoist_vars) {
    var dirs = [];
    var hoisted = [];
    var vars = new Map, vars_found = 0, var_decl = 0;
    walk(self2, (node) => {
      if (node instanceof AST_Scope && node !== self2)
        return true;
      if (node instanceof AST_Var) {
        ++var_decl;
        return true;
      }
    });
    hoist_vars = hoist_vars && var_decl > 1;
    var tt = new TreeTransformer(function before(node) {
      if (node !== self2) {
        if (node instanceof AST_Directive) {
          dirs.push(node);
          return make_node(AST_EmptyStatement, node);
        }
        if (hoist_funs && node instanceof AST_Defun && !(tt.parent() instanceof AST_Export) && tt.parent() === self2) {
          hoisted.push(node);
          return make_node(AST_EmptyStatement, node);
        }
        if (hoist_vars && node instanceof AST_Var && !node.definitions.some((def3) => def3.name instanceof AST_Destructuring)) {
          node.definitions.forEach(function(def3) {
            vars.set(def3.name.name, def3);
            ++vars_found;
          });
          var seq = node.to_assignments(compressor);
          var p = tt.parent();
          if (p instanceof AST_ForIn && p.init === node) {
            if (seq == null) {
              var def2 = node.definitions[0].name;
              return make_node(AST_SymbolRef, def2, def2);
            }
            return seq;
          }
          if (p instanceof AST_For && p.init === node) {
            return seq;
          }
          if (!seq)
            return make_node(AST_EmptyStatement, node);
          return make_node(AST_SimpleStatement, node, {
            body: seq
          });
        }
        if (node instanceof AST_Scope)
          return node;
      }
    });
    self2 = self2.transform(tt);
    if (vars_found > 0) {
      var defs = [];
      const is_lambda = self2 instanceof AST_Lambda;
      const args_as_names = is_lambda ? self2.args_as_names() : null;
      vars.forEach((def2, name) => {
        if (is_lambda && args_as_names.some((x) => x.name === def2.name.name)) {
          vars.delete(name);
        } else {
          def2 = def2.clone();
          def2.value = null;
          defs.push(def2);
          vars.set(name, def2);
        }
      });
      if (defs.length > 0) {
        for (var i = 0;i < self2.body.length; ) {
          if (self2.body[i] instanceof AST_SimpleStatement) {
            var expr = self2.body[i].body, sym, assign;
            if (expr instanceof AST_Assign && expr.operator == "=" && (sym = expr.left) instanceof AST_Symbol && vars.has(sym.name)) {
              var def = vars.get(sym.name);
              if (def.value)
                break;
              def.value = expr.right;
              remove(defs, def);
              defs.push(def);
              self2.body.splice(i, 1);
              continue;
            }
            if (expr instanceof AST_Sequence && (assign = expr.expressions[0]) instanceof AST_Assign && assign.operator == "=" && (sym = assign.left) instanceof AST_Symbol && vars.has(sym.name)) {
              var def = vars.get(sym.name);
              if (def.value)
                break;
              def.value = assign.right;
              remove(defs, def);
              defs.push(def);
              self2.body[i].body = make_sequence(expr, expr.expressions.slice(1));
              continue;
            }
          }
          if (self2.body[i] instanceof AST_EmptyStatement) {
            self2.body.splice(i, 1);
            continue;
          }
          if (self2.body[i] instanceof AST_BlockStatement) {
            self2.body.splice(i, 1, ...self2.body[i].body);
            continue;
          }
          break;
        }
        defs = make_node(AST_Var, self2, {
          definitions: defs
        });
        hoisted.push(defs);
      }
    }
    self2.body = dirs.concat(hoisted, self2.body);
  }
  return self2;
});
AST_Scope.DEFMETHOD("hoist_properties", function(compressor) {
  var self2 = this;
  if (!compressor.option("hoist_props") || compressor.has_directive("use asm"))
    return self2;
  var top_retain = self2 instanceof AST_Toplevel && compressor.top_retain || return_false;
  var defs_by_id = new Map;
  var hoister = new TreeTransformer(function(node, descend) {
    if (node instanceof AST_VarDef) {
      const sym = node.name;
      let def;
      let value;
      if (sym.scope === self2 && (def = sym.definition()).escaped != 1 && !def.assignments && !def.direct_access && !def.single_use && !compressor.exposed(def) && !top_retain(def) && (value = sym.fixed_value()) === node.value && value instanceof AST_Object && !value.properties.some((prop) => prop instanceof AST_Expansion || prop.computed_key())) {
        descend(node, this);
        const defs = new Map;
        const assignments = [];
        value.properties.forEach(({ key, value: value2 }) => {
          const scope = hoister.find_scope();
          const symbol = self2.create_symbol(sym.CTOR, {
            source: sym,
            scope,
            conflict_scopes: new Set([
              scope,
              ...sym.definition().references.map((ref) => ref.scope)
            ]),
            tentative_name: sym.name + "_" + key
          });
          defs.set(String(key), symbol.definition());
          assignments.push(make_node(AST_VarDef, node, {
            name: symbol,
            value: value2
          }));
        });
        defs_by_id.set(def.id, defs);
        return MAP.splice(assignments);
      }
    } else if (node instanceof AST_PropAccess && node.expression instanceof AST_SymbolRef) {
      const defs = defs_by_id.get(node.expression.definition().id);
      if (defs) {
        const def = defs.get(String(get_simple_key(node.property)));
        const sym = make_node(AST_SymbolRef, node, {
          name: def.name,
          scope: node.expression.scope,
          thedef: def
        });
        sym.reference({});
        return sym;
      }
    }
  });
  return self2.transform(hoister);
});
def_optimize(AST_SimpleStatement, function(self2, compressor) {
  if (compressor.option("side_effects")) {
    var body = self2.body;
    var node = body.drop_side_effect_free(compressor, true);
    if (!node) {
      return make_node(AST_EmptyStatement, self2);
    }
    if (node !== body) {
      return make_node(AST_SimpleStatement, self2, { body: node });
    }
  }
  return self2;
});
def_optimize(AST_While, function(self2, compressor) {
  return compressor.option("loops") ? make_node(AST_For, self2, self2).optimize(compressor) : self2;
});
def_optimize(AST_Do, function(self2, compressor) {
  if (!compressor.option("loops"))
    return self2;
  var cond = self2.condition.tail_node().evaluate(compressor);
  if (!(cond instanceof AST_Node)) {
    if (cond)
      return make_node(AST_For, self2, {
        body: make_node(AST_BlockStatement, self2.body, {
          body: [
            self2.body,
            make_node(AST_SimpleStatement, self2.condition, {
              body: self2.condition
            })
          ]
        })
      }).optimize(compressor);
    if (!has_break_or_continue(self2, compressor.parent())) {
      return make_node(AST_BlockStatement, self2.body, {
        body: [
          self2.body,
          make_node(AST_SimpleStatement, self2.condition, {
            body: self2.condition
          })
        ]
      }).optimize(compressor);
    }
  }
  return self2;
});
function if_break_in_loop(self2, compressor) {
  var first = self2.body instanceof AST_BlockStatement ? self2.body.body[0] : self2.body;
  if (compressor.option("dead_code") && is_break(first)) {
    var body = [];
    if (self2.init instanceof AST_Statement) {
      body.push(self2.init);
    } else if (self2.init) {
      body.push(make_node(AST_SimpleStatement, self2.init, {
        body: self2.init
      }));
    }
    if (self2.condition) {
      body.push(make_node(AST_SimpleStatement, self2.condition, {
        body: self2.condition
      }));
    }
    trim_unreachable_code(compressor, self2.body, body);
    return make_node(AST_BlockStatement, self2, {
      body
    });
  }
  if (first instanceof AST_If) {
    if (is_break(first.body)) {
      if (self2.condition) {
        self2.condition = make_node(AST_Binary, self2.condition, {
          left: self2.condition,
          operator: "&&",
          right: first.condition.negate(compressor)
        });
      } else {
        self2.condition = first.condition.negate(compressor);
      }
      drop_it(first.alternative);
    } else if (is_break(first.alternative)) {
      if (self2.condition) {
        self2.condition = make_node(AST_Binary, self2.condition, {
          left: self2.condition,
          operator: "&&",
          right: first.condition
        });
      } else {
        self2.condition = first.condition;
      }
      drop_it(first.body);
    }
  }
  return self2;
  function is_break(node) {
    return node instanceof AST_Break && compressor.loopcontrol_target(node) === compressor.self();
  }
  function drop_it(rest) {
    rest = as_statement_array(rest);
    if (self2.body instanceof AST_BlockStatement) {
      self2.body = self2.body.clone();
      self2.body.body = rest.concat(self2.body.body.slice(1));
      self2.body = self2.body.transform(compressor);
    } else {
      self2.body = make_node(AST_BlockStatement, self2.body, {
        body: rest
      }).transform(compressor);
    }
    self2 = if_break_in_loop(self2, compressor);
  }
}
def_optimize(AST_For, function(self2, compressor) {
  if (!compressor.option("loops"))
    return self2;
  if (compressor.option("side_effects") && self2.init) {
    self2.init = self2.init.drop_side_effect_free(compressor);
  }
  if (self2.condition) {
    var cond = self2.condition.evaluate(compressor);
    if (!(cond instanceof AST_Node)) {
      if (cond)
        self2.condition = null;
      else if (!compressor.option("dead_code")) {
        var orig = self2.condition;
        self2.condition = make_node_from_constant(cond, self2.condition);
        self2.condition = best_of_expression(self2.condition.transform(compressor), orig);
      }
    }
    if (compressor.option("dead_code")) {
      if (cond instanceof AST_Node)
        cond = self2.condition.tail_node().evaluate(compressor);
      if (!cond) {
        var body = [];
        trim_unreachable_code(compressor, self2.body, body);
        if (self2.init instanceof AST_Statement) {
          body.push(self2.init);
        } else if (self2.init) {
          body.push(make_node(AST_SimpleStatement, self2.init, {
            body: self2.init
          }));
        }
        body.push(make_node(AST_SimpleStatement, self2.condition, {
          body: self2.condition
        }));
        return make_node(AST_BlockStatement, self2, { body }).optimize(compressor);
      }
    }
  }
  return if_break_in_loop(self2, compressor);
});
def_optimize(AST_If, function(self2, compressor) {
  if (is_empty(self2.alternative))
    self2.alternative = null;
  if (!compressor.option("conditionals"))
    return self2;
  var cond = self2.condition.evaluate(compressor);
  if (!compressor.option("dead_code") && !(cond instanceof AST_Node)) {
    var orig = self2.condition;
    self2.condition = make_node_from_constant(cond, orig);
    self2.condition = best_of_expression(self2.condition.transform(compressor), orig);
  }
  if (compressor.option("dead_code")) {
    if (cond instanceof AST_Node)
      cond = self2.condition.tail_node().evaluate(compressor);
    if (!cond) {
      var body = [];
      trim_unreachable_code(compressor, self2.body, body);
      body.push(make_node(AST_SimpleStatement, self2.condition, {
        body: self2.condition
      }));
      if (self2.alternative)
        body.push(self2.alternative);
      return make_node(AST_BlockStatement, self2, { body }).optimize(compressor);
    } else if (!(cond instanceof AST_Node)) {
      var body = [];
      body.push(make_node(AST_SimpleStatement, self2.condition, {
        body: self2.condition
      }));
      body.push(self2.body);
      if (self2.alternative) {
        trim_unreachable_code(compressor, self2.alternative, body);
      }
      return make_node(AST_BlockStatement, self2, { body }).optimize(compressor);
    }
  }
  var negated = self2.condition.negate(compressor);
  var self_condition_length = self2.condition.size();
  var negated_length = negated.size();
  var negated_is_best = negated_length < self_condition_length;
  if (self2.alternative && negated_is_best) {
    negated_is_best = false;
    self2.condition = negated;
    var tmp = self2.body;
    self2.body = self2.alternative || make_node(AST_EmptyStatement, self2);
    self2.alternative = tmp;
  }
  if (is_empty(self2.body) && is_empty(self2.alternative)) {
    return make_node(AST_SimpleStatement, self2.condition, {
      body: self2.condition.clone()
    }).optimize(compressor);
  }
  if (self2.body instanceof AST_SimpleStatement && self2.alternative instanceof AST_SimpleStatement) {
    return make_node(AST_SimpleStatement, self2, {
      body: make_node(AST_Conditional, self2, {
        condition: self2.condition,
        consequent: self2.body.body,
        alternative: self2.alternative.body
      })
    }).optimize(compressor);
  }
  if (is_empty(self2.alternative) && self2.body instanceof AST_SimpleStatement) {
    if (self_condition_length === negated_length && !negated_is_best && self2.condition instanceof AST_Binary && self2.condition.operator == "||") {
      negated_is_best = true;
    }
    if (negated_is_best)
      return make_node(AST_SimpleStatement, self2, {
        body: make_node(AST_Binary, self2, {
          operator: "||",
          left: negated,
          right: self2.body.body
        })
      }).optimize(compressor);
    return make_node(AST_SimpleStatement, self2, {
      body: make_node(AST_Binary, self2, {
        operator: "&&",
        left: self2.condition,
        right: self2.body.body
      })
    }).optimize(compressor);
  }
  if (self2.body instanceof AST_EmptyStatement && self2.alternative instanceof AST_SimpleStatement) {
    return make_node(AST_SimpleStatement, self2, {
      body: make_node(AST_Binary, self2, {
        operator: "||",
        left: self2.condition,
        right: self2.alternative.body
      })
    }).optimize(compressor);
  }
  if (self2.body instanceof AST_Exit && self2.alternative instanceof AST_Exit && self2.body.TYPE == self2.alternative.TYPE) {
    return make_node(self2.body.CTOR, self2, {
      value: make_node(AST_Conditional, self2, {
        condition: self2.condition,
        consequent: self2.body.value || make_node(AST_Undefined, self2.body),
        alternative: self2.alternative.value || make_node(AST_Undefined, self2.alternative)
      }).transform(compressor)
    }).optimize(compressor);
  }
  if (self2.body instanceof AST_If && !self2.body.alternative && !self2.alternative) {
    self2 = make_node(AST_If, self2, {
      condition: make_node(AST_Binary, self2.condition, {
        operator: "&&",
        left: self2.condition,
        right: self2.body.condition
      }),
      body: self2.body.body,
      alternative: null
    });
  }
  if (aborts(self2.body)) {
    if (self2.alternative) {
      var alt = self2.alternative;
      self2.alternative = null;
      return make_node(AST_BlockStatement, self2, {
        body: [self2, alt]
      }).optimize(compressor);
    }
  }
  if (aborts(self2.alternative)) {
    var body = self2.body;
    self2.body = self2.alternative;
    self2.condition = negated_is_best ? negated : self2.condition.negate(compressor);
    self2.alternative = null;
    return make_node(AST_BlockStatement, self2, {
      body: [self2, body]
    }).optimize(compressor);
  }
  return self2;
});
def_optimize(AST_Switch, function(self2, compressor) {
  if (!compressor.option("switches"))
    return self2;
  var branch;
  var value = self2.expression.evaluate(compressor);
  if (!(value instanceof AST_Node)) {
    var orig = self2.expression;
    self2.expression = make_node_from_constant(value, orig);
    self2.expression = best_of_expression(self2.expression.transform(compressor), orig);
  }
  if (!compressor.option("dead_code"))
    return self2;
  if (value instanceof AST_Node) {
    value = self2.expression.tail_node().evaluate(compressor);
  }
  var decl = [];
  var body = [];
  var default_branch;
  var exact_match;
  for (var i = 0, len = self2.body.length;i < len && !exact_match; i++) {
    branch = self2.body[i];
    if (branch instanceof AST_Default) {
      if (!default_branch) {
        default_branch = branch;
      } else {
        eliminate_branch(branch, body[body.length - 1]);
      }
    } else if (!(value instanceof AST_Node)) {
      var exp = branch.expression.evaluate(compressor);
      if (!(exp instanceof AST_Node) && exp !== value) {
        eliminate_branch(branch, body[body.length - 1]);
        continue;
      }
      if (exp instanceof AST_Node && !exp.has_side_effects(compressor)) {
        exp = branch.expression.tail_node().evaluate(compressor);
      }
      if (exp === value) {
        exact_match = branch;
        if (default_branch) {
          var default_index = body.indexOf(default_branch);
          body.splice(default_index, 1);
          eliminate_branch(default_branch, body[default_index - 1]);
          default_branch = null;
        }
      }
    }
    body.push(branch);
  }
  while (i < len)
    eliminate_branch(self2.body[i++], body[body.length - 1]);
  self2.body = body;
  let default_or_exact = default_branch || exact_match;
  default_branch = null;
  exact_match = null;
  if (body.every((branch2, i2) => (branch2 === default_or_exact || branch2.expression instanceof AST_Constant) && (branch2.body.length === 0 || aborts(branch2) || body.length - 1 === i2))) {
    for (let i2 = 0;i2 < body.length; i2++) {
      const branch2 = body[i2];
      for (let j = i2 + 1;j < body.length; j++) {
        const next = body[j];
        if (next.body.length === 0)
          continue;
        const last_branch = j === body.length - 1;
        const equivalentBranch = branches_equivalent(next, branch2, false);
        if (equivalentBranch || last_branch && branches_equivalent(next, branch2, true)) {
          if (!equivalentBranch && last_branch) {
            next.body.push(make_node(AST_Break));
          }
          let x = j - 1;
          let fallthroughDepth = 0;
          while (x > i2) {
            if (is_inert_body(body[x--])) {
              fallthroughDepth++;
            } else {
              break;
            }
          }
          const plucked = body.splice(j - fallthroughDepth, 1 + fallthroughDepth);
          body.splice(i2 + 1, 0, ...plucked);
          i2 += plucked.length;
        }
      }
    }
  }
  for (let i2 = 0;i2 < body.length; i2++) {
    let branch2 = body[i2];
    if (branch2.body.length === 0)
      continue;
    if (!aborts(branch2))
      continue;
    for (let j = i2 + 1;j < body.length; i2++, j++) {
      let next = body[j];
      if (next.body.length === 0)
        continue;
      if (branches_equivalent(next, branch2, false) || j === body.length - 1 && branches_equivalent(next, branch2, true)) {
        branch2.body = [];
        branch2 = next;
        continue;
      }
      break;
    }
  }
  {
    let i2 = body.length - 1;
    for (;i2 >= 0; i2--) {
      let bbody = body[i2].body;
      if (is_break(bbody[bbody.length - 1], compressor))
        bbody.pop();
      if (!is_inert_body(body[i2]))
        break;
    }
    i2++;
    if (!default_or_exact || body.indexOf(default_or_exact) >= i2) {
      for (let j = body.length - 1;j >= i2; j--) {
        let branch2 = body[j];
        if (branch2 === default_or_exact) {
          default_or_exact = null;
          body.pop();
        } else if (!branch2.expression.has_side_effects(compressor)) {
          body.pop();
        } else {
          break;
        }
      }
    }
  }
  DEFAULT:
    if (default_or_exact) {
      let default_index2 = body.indexOf(default_or_exact);
      let default_body_index = default_index2;
      for (;default_body_index < body.length - 1; default_body_index++) {
        if (!is_inert_body(body[default_body_index]))
          break;
      }
      if (default_body_index < body.length - 1) {
        break DEFAULT;
      }
      let side_effect_index = body.length - 1;
      for (;side_effect_index >= 0; side_effect_index--) {
        let branch2 = body[side_effect_index];
        if (branch2 === default_or_exact)
          continue;
        if (branch2.expression.has_side_effects(compressor))
          break;
      }
      if (default_body_index > side_effect_index) {
        let prev_body_index = default_index2 - 1;
        for (;prev_body_index >= 0; prev_body_index--) {
          if (!is_inert_body(body[prev_body_index]))
            break;
        }
        let before = Math.max(side_effect_index, prev_body_index) + 1;
        let after = default_index2;
        if (side_effect_index > default_index2) {
          after = side_effect_index;
          body[side_effect_index].body = body[default_body_index].body;
        } else {
          default_or_exact.body = body[default_body_index].body;
        }
        body.splice(after + 1, default_body_index - after);
        body.splice(before, default_index2 - before);
      }
    }
  DEFAULT:
    if (default_or_exact) {
      let i2 = body.findIndex((branch2) => !is_inert_body(branch2));
      let caseBody;
      if (i2 === body.length - 1) {
        let branch2 = body[i2];
        if (has_nested_break(self2))
          break DEFAULT;
        caseBody = make_node(AST_BlockStatement, branch2, {
          body: branch2.body
        });
        branch2.body = [];
      } else if (i2 !== -1) {
        break DEFAULT;
      }
      let sideEffect = body.find((branch2) => branch2 !== default_or_exact && branch2.expression.has_side_effects(compressor));
      if (!sideEffect) {
        return make_node(AST_BlockStatement, self2, {
          body: decl.concat(statement(self2.expression), default_or_exact.expression ? statement(default_or_exact.expression) : [], caseBody || [])
        }).optimize(compressor);
      }
      const default_index2 = body.indexOf(default_or_exact);
      body.splice(default_index2, 1);
      default_or_exact = null;
      if (caseBody) {
        return make_node(AST_BlockStatement, self2, {
          body: decl.concat(self2, caseBody)
        }).optimize(compressor);
      }
    }
  if (body.length > 0) {
    body[0].body = decl.concat(body[0].body);
  }
  if (body.length == 0) {
    return make_node(AST_BlockStatement, self2, {
      body: decl.concat(statement(self2.expression))
    }).optimize(compressor);
  }
  if (body.length == 1 && !has_nested_break(self2)) {
    let branch2 = body[0];
    return make_node(AST_If, self2, {
      condition: make_node(AST_Binary, self2, {
        operator: "===",
        left: self2.expression,
        right: branch2.expression
      }),
      body: make_node(AST_BlockStatement, branch2, {
        body: branch2.body
      }),
      alternative: null
    }).optimize(compressor);
  }
  if (body.length === 2 && default_or_exact && !has_nested_break(self2)) {
    let branch2 = body[0] === default_or_exact ? body[1] : body[0];
    let exact_exp = default_or_exact.expression && statement(default_or_exact.expression);
    if (aborts(body[0])) {
      let first = body[0];
      if (is_break(first.body[first.body.length - 1], compressor)) {
        first.body.pop();
      }
      return make_node(AST_If, self2, {
        condition: make_node(AST_Binary, self2, {
          operator: "===",
          left: self2.expression,
          right: branch2.expression
        }),
        body: make_node(AST_BlockStatement, branch2, {
          body: branch2.body
        }),
        alternative: make_node(AST_BlockStatement, default_or_exact, {
          body: [].concat(exact_exp || [], default_or_exact.body)
        })
      }).optimize(compressor);
    }
    let operator = "===";
    let consequent = make_node(AST_BlockStatement, branch2, {
      body: branch2.body
    });
    let always = make_node(AST_BlockStatement, default_or_exact, {
      body: [].concat(exact_exp || [], default_or_exact.body)
    });
    if (body[0] === default_or_exact) {
      operator = "!==";
      let tmp = always;
      always = consequent;
      consequent = tmp;
    }
    return make_node(AST_BlockStatement, self2, {
      body: [
        make_node(AST_If, self2, {
          condition: make_node(AST_Binary, self2, {
            operator,
            left: self2.expression,
            right: branch2.expression
          }),
          body: consequent,
          alternative: null
        }),
        always
      ]
    }).optimize(compressor);
  }
  return self2;
  function eliminate_branch(branch2, prev) {
    if (prev && !aborts(prev)) {
      prev.body = prev.body.concat(branch2.body);
    } else {
      trim_unreachable_code(compressor, branch2, decl);
    }
  }
  function branches_equivalent(branch2, prev, insertBreak) {
    let bbody = branch2.body;
    let pbody = prev.body;
    if (insertBreak) {
      bbody = bbody.concat(make_node(AST_Break));
    }
    if (bbody.length !== pbody.length)
      return false;
    let bblock = make_node(AST_BlockStatement, branch2, { body: bbody });
    let pblock = make_node(AST_BlockStatement, prev, { body: pbody });
    return bblock.equivalent_to(pblock);
  }
  function statement(body2) {
    return make_node(AST_SimpleStatement, body2, { body: body2 });
  }
  function has_nested_break(root) {
    let has_break = false;
    let tw = new TreeWalker((node) => {
      if (has_break)
        return true;
      if (node instanceof AST_Lambda)
        return true;
      if (node instanceof AST_SimpleStatement)
        return true;
      if (!is_break(node, tw))
        return;
      let parent = tw.parent();
      if (parent instanceof AST_SwitchBranch && parent.body[parent.body.length - 1] === node) {
        return;
      }
      has_break = true;
    });
    root.walk(tw);
    return has_break;
  }
  function is_break(node, stack) {
    return node instanceof AST_Break && stack.loopcontrol_target(node) === self2;
  }
  function is_inert_body(branch2) {
    return !aborts(branch2) && !make_node(AST_BlockStatement, branch2, {
      body: branch2.body
    }).has_side_effects(compressor);
  }
});
def_optimize(AST_Try, function(self2, compressor) {
  if (self2.bcatch && self2.bfinally && self2.bfinally.body.every(is_empty))
    self2.bfinally = null;
  if (compressor.option("dead_code") && self2.body.body.every(is_empty)) {
    var body = [];
    if (self2.bcatch) {
      trim_unreachable_code(compressor, self2.bcatch, body);
    }
    if (self2.bfinally)
      body.push(...self2.bfinally.body);
    return make_node(AST_BlockStatement, self2, {
      body
    }).optimize(compressor);
  }
  return self2;
});
AST_Definitions.DEFMETHOD("to_assignments", function(compressor) {
  var reduce_vars = compressor.option("reduce_vars");
  var assignments = [];
  for (const def of this.definitions) {
    if (def.value) {
      var name = make_node(AST_SymbolRef, def.name, def.name);
      assignments.push(make_node(AST_Assign, def, {
        operator: "=",
        logical: false,
        left: name,
        right: def.value
      }));
      if (reduce_vars)
        name.definition().fixed = false;
    }
    const thedef = def.name.definition();
    thedef.eliminated++;
    thedef.replaced--;
  }
  if (assignments.length == 0)
    return null;
  return make_sequence(this, assignments);
});
def_optimize(AST_Definitions, function(self2) {
  if (self2.definitions.length == 0) {
    return make_node(AST_EmptyStatement, self2);
  }
  return self2;
});
def_optimize(AST_VarDef, function(self2, compressor) {
  if (self2.name instanceof AST_SymbolLet && self2.value != null && is_undefined(self2.value, compressor)) {
    self2.value = null;
  }
  return self2;
});
def_optimize(AST_Import, function(self2) {
  return self2;
});
def_optimize(AST_Call, function(self2, compressor) {
  var exp = self2.expression;
  var fn = exp;
  inline_array_like_spread(self2.args);
  var simple_args = self2.args.every((arg2) => !(arg2 instanceof AST_Expansion));
  if (compressor.option("reduce_vars") && fn instanceof AST_SymbolRef) {
    fn = fn.fixed_value();
  }
  var is_func = fn instanceof AST_Lambda;
  if (is_func && fn.pinned())
    return self2;
  if (compressor.option("unused") && simple_args && is_func && !fn.uses_arguments) {
    var pos = 0, last = 0;
    for (var i = 0, len = self2.args.length;i < len; i++) {
      if (fn.argnames[i] instanceof AST_Expansion) {
        if (has_flag(fn.argnames[i].expression, UNUSED))
          while (i < len) {
            var node = self2.args[i++].drop_side_effect_free(compressor);
            if (node) {
              self2.args[pos++] = node;
            }
          }
        else
          while (i < len) {
            self2.args[pos++] = self2.args[i++];
          }
        last = pos;
        break;
      }
      var trim2 = i >= fn.argnames.length;
      if (trim2 || has_flag(fn.argnames[i], UNUSED)) {
        var node = self2.args[i].drop_side_effect_free(compressor);
        if (node) {
          self2.args[pos++] = node;
        } else if (!trim2) {
          self2.args[pos++] = make_node(AST_Number, self2.args[i], {
            value: 0
          });
          continue;
        }
      } else {
        self2.args[pos++] = self2.args[i];
      }
      last = pos;
    }
    self2.args.length = last;
  }
  if (exp instanceof AST_Dot && exp.expression instanceof AST_SymbolRef && exp.expression.name === "console" && exp.expression.definition().undeclared && exp.property === "assert") {
    const condition = self2.args[0];
    if (condition) {
      const value2 = condition.evaluate(compressor);
      if (value2 === 1 || value2 === true) {
        return make_node(AST_Undefined, self2);
      }
    }
  }
  if (compressor.option("unsafe") && !exp.contains_optional()) {
    if (exp instanceof AST_Dot && exp.start.value === "Array" && exp.property === "from" && self2.args.length === 1) {
      const [argument] = self2.args;
      if (argument instanceof AST_Array) {
        return make_node(AST_Array, argument, {
          elements: argument.elements
        }).optimize(compressor);
      }
    }
    if (is_undeclared_ref(exp))
      switch (exp.name) {
        case "Array":
          if (self2.args.length != 1) {
            return make_node(AST_Array, self2, {
              elements: self2.args
            }).optimize(compressor);
          } else if (self2.args[0] instanceof AST_Number && self2.args[0].value <= 11) {
            const elements2 = [];
            for (let i2 = 0;i2 < self2.args[0].value; i2++)
              elements2.push(new AST_Hole);
            return new AST_Array({ elements: elements2 });
          }
          break;
        case "Object":
          if (self2.args.length == 0) {
            return make_node(AST_Object, self2, {
              properties: []
            });
          }
          break;
        case "String":
          if (self2.args.length == 0)
            return make_node(AST_String, self2, {
              value: ""
            });
          if (self2.args.length <= 1)
            return make_node(AST_Binary, self2, {
              left: self2.args[0],
              operator: "+",
              right: make_node(AST_String, self2, { value: "" })
            }).optimize(compressor);
          break;
        case "Number":
          if (self2.args.length == 0)
            return make_node(AST_Number, self2, {
              value: 0
            });
          if (self2.args.length == 1 && compressor.option("unsafe_math")) {
            return make_node(AST_UnaryPrefix, self2, {
              expression: self2.args[0],
              operator: "+"
            }).optimize(compressor);
          }
          break;
        case "Symbol":
          if (self2.args.length == 1 && self2.args[0] instanceof AST_String && compressor.option("unsafe_symbols"))
            self2.args.length = 0;
          break;
        case "Boolean":
          if (self2.args.length == 0)
            return make_node(AST_False, self2);
          if (self2.args.length == 1)
            return make_node(AST_UnaryPrefix, self2, {
              expression: make_node(AST_UnaryPrefix, self2, {
                expression: self2.args[0],
                operator: "!"
              }),
              operator: "!"
            }).optimize(compressor);
          break;
        case "RegExp":
          var params = [];
          if (self2.args.length >= 1 && self2.args.length <= 2 && self2.args.every((arg2) => {
            var value2 = arg2.evaluate(compressor);
            params.push(value2);
            return arg2 !== value2;
          }) && regexp_is_safe(params[0])) {
            let [source, flags] = params;
            source = regexp_source_fix(new RegExp(source).source);
            const rx = make_node(AST_RegExp, self2, {
              value: { source, flags }
            });
            if (rx._eval(compressor) !== rx) {
              return rx;
            }
          }
          break;
      }
    else if (exp instanceof AST_Dot)
      switch (exp.property) {
        case "toString":
          if (self2.args.length == 0 && !exp.expression.may_throw_on_access(compressor)) {
            return make_node(AST_Binary, self2, {
              left: make_node(AST_String, self2, { value: "" }),
              operator: "+",
              right: exp.expression
            }).optimize(compressor);
          }
          break;
        case "join":
          if (exp.expression instanceof AST_Array)
            EXIT: {
              var separator;
              if (self2.args.length > 0) {
                separator = self2.args[0].evaluate(compressor);
                if (separator === self2.args[0])
                  break EXIT;
              }
              var elements = [];
              var consts = [];
              for (var i = 0, len = exp.expression.elements.length;i < len; i++) {
                var el = exp.expression.elements[i];
                if (el instanceof AST_Expansion)
                  break EXIT;
                var value = el.evaluate(compressor);
                if (value !== el) {
                  consts.push(value);
                } else {
                  if (consts.length > 0) {
                    elements.push(make_node(AST_String, self2, {
                      value: consts.join(separator)
                    }));
                    consts.length = 0;
                  }
                  elements.push(el);
                }
              }
              if (consts.length > 0) {
                elements.push(make_node(AST_String, self2, {
                  value: consts.join(separator)
                }));
              }
              if (elements.length == 0)
                return make_node(AST_String, self2, { value: "" });
              if (elements.length == 1) {
                if (elements[0].is_string(compressor)) {
                  return elements[0];
                }
                return make_node(AST_Binary, elements[0], {
                  operator: "+",
                  left: make_node(AST_String, self2, { value: "" }),
                  right: elements[0]
                });
              }
              if (separator == "") {
                var first;
                if (elements[0].is_string(compressor) || elements[1].is_string(compressor)) {
                  first = elements.shift();
                } else {
                  first = make_node(AST_String, self2, { value: "" });
                }
                return elements.reduce(function(prev, el2) {
                  return make_node(AST_Binary, el2, {
                    operator: "+",
                    left: prev,
                    right: el2
                  });
                }, first).optimize(compressor);
              }
              var node = self2.clone();
              node.expression = node.expression.clone();
              node.expression.expression = node.expression.expression.clone();
              node.expression.expression.elements = elements;
              return best_of(compressor, self2, node);
            }
          break;
        case "charAt":
          if (exp.expression.is_string(compressor)) {
            var arg = self2.args[0];
            var index = arg ? arg.evaluate(compressor) : 0;
            if (index !== arg) {
              return make_node(AST_Sub, exp, {
                expression: exp.expression,
                property: make_node_from_constant(index | 0, arg || exp)
              }).optimize(compressor);
            }
          }
          break;
        case "apply":
          if (self2.args.length == 2 && self2.args[1] instanceof AST_Array) {
            var args = self2.args[1].elements.slice();
            args.unshift(self2.args[0]);
            return make_node(AST_Call, self2, {
              expression: make_node(AST_Dot, exp, {
                expression: exp.expression,
                optional: false,
                property: "call"
              }),
              args
            }).optimize(compressor);
          }
          break;
        case "call":
          var func = exp.expression;
          if (func instanceof AST_SymbolRef) {
            func = func.fixed_value();
          }
          if (func instanceof AST_Lambda && !func.contains_this()) {
            return (self2.args.length ? make_sequence(this, [
              self2.args[0],
              make_node(AST_Call, self2, {
                expression: exp.expression,
                args: self2.args.slice(1)
              })
            ]) : make_node(AST_Call, self2, {
              expression: exp.expression,
              args: []
            })).optimize(compressor);
          }
          break;
      }
  }
  if (compressor.option("unsafe_Function") && is_undeclared_ref(exp) && exp.name == "Function") {
    if (self2.args.length == 0)
      return make_empty_function(self2).optimize(compressor);
    if (self2.args.every((x) => x instanceof AST_String)) {
      try {
        var code = "n(function(" + self2.args.slice(0, -1).map(function(arg2) {
          return arg2.value;
        }).join(",") + "){" + self2.args[self2.args.length - 1].value + "})";
        var ast = parse(code);
        var mangle = compressor.mangle_options();
        ast.figure_out_scope(mangle);
        var comp = new Compressor(compressor.options, {
          mangle_options: compressor._mangle_options
        });
        ast = ast.transform(comp);
        ast.figure_out_scope(mangle);
        ast.compute_char_frequency(mangle);
        ast.mangle_names(mangle);
        var fun;
        walk(ast, (node2) => {
          if (is_func_expr(node2)) {
            fun = node2;
            return walk_abort;
          }
        });
        var code = OutputStream();
        AST_BlockStatement.prototype._codegen.call(fun, fun, code);
        self2.args = [
          make_node(AST_String, self2, {
            value: fun.argnames.map(function(arg2) {
              return arg2.print_to_string();
            }).join(",")
          }),
          make_node(AST_String, self2.args[self2.args.length - 1], {
            value: code.get().replace(/^{|}$/g, "")
          })
        ];
        return self2;
      } catch (ex) {
        if (!(ex instanceof JS_Parse_Error)) {
          throw ex;
        }
      }
    }
  }
  return inline_into_call(self2, compressor);
});
AST_Node.DEFMETHOD("contains_optional", function() {
  if (this instanceof AST_PropAccess || this instanceof AST_Call || this instanceof AST_Chain) {
    if (this.optional) {
      return true;
    } else {
      return this.expression.contains_optional();
    }
  } else {
    return false;
  }
});
def_optimize(AST_New, function(self2, compressor) {
  if (compressor.option("unsafe") && is_undeclared_ref(self2.expression) && ["Object", "RegExp", "Function", "Error", "Array"].includes(self2.expression.name))
    return make_node(AST_Call, self2, self2).transform(compressor);
  return self2;
});
def_optimize(AST_Sequence, function(self2, compressor) {
  if (!compressor.option("side_effects"))
    return self2;
  var expressions = [];
  filter_for_side_effects();
  var end = expressions.length - 1;
  trim_right_for_undefined();
  if (end == 0) {
    self2 = maintain_this_binding(compressor.parent(), compressor.self(), expressions[0]);
    if (!(self2 instanceof AST_Sequence))
      self2 = self2.optimize(compressor);
    return self2;
  }
  self2.expressions = expressions;
  return self2;
  function filter_for_side_effects() {
    var first = first_in_statement(compressor);
    var last = self2.expressions.length - 1;
    self2.expressions.forEach(function(expr, index) {
      if (index < last)
        expr = expr.drop_side_effect_free(compressor, first);
      if (expr) {
        merge_sequence(expressions, expr);
        first = false;
      }
    });
  }
  function trim_right_for_undefined() {
    while (end > 0 && is_undefined(expressions[end], compressor))
      end--;
    if (end < expressions.length - 1) {
      expressions[end] = make_node(AST_UnaryPrefix, self2, {
        operator: "void",
        expression: expressions[end]
      });
      expressions.length = end + 1;
    }
  }
});
AST_Unary.DEFMETHOD("lift_sequences", function(compressor) {
  if (compressor.option("sequences")) {
    if (this.expression instanceof AST_Sequence) {
      var x = this.expression.expressions.slice();
      var e = this.clone();
      e.expression = x.pop();
      x.push(e);
      return make_sequence(this, x).optimize(compressor);
    }
  }
  return this;
});
def_optimize(AST_UnaryPostfix, function(self2, compressor) {
  return self2.lift_sequences(compressor);
});
def_optimize(AST_UnaryPrefix, function(self2, compressor) {
  var e = self2.expression;
  if (self2.operator == "delete" && !(e instanceof AST_SymbolRef || e instanceof AST_PropAccess || e instanceof AST_Chain || is_identifier_atom(e))) {
    return make_sequence(self2, [e, make_node(AST_True, self2)]).optimize(compressor);
  }
  var seq = self2.lift_sequences(compressor);
  if (seq !== self2) {
    return seq;
  }
  if (compressor.option("side_effects") && self2.operator == "void") {
    e = e.drop_side_effect_free(compressor);
    if (e) {
      self2.expression = e;
      return self2;
    } else {
      return make_node(AST_Undefined, self2).optimize(compressor);
    }
  }
  if (compressor.in_boolean_context()) {
    switch (self2.operator) {
      case "!":
        if (e instanceof AST_UnaryPrefix && e.operator == "!") {
          return e.expression;
        }
        if (e instanceof AST_Binary) {
          self2 = best_of(compressor, self2, e.negate(compressor, first_in_statement(compressor)));
        }
        break;
      case "typeof":
        return (e instanceof AST_SymbolRef ? make_node(AST_True, self2) : make_sequence(self2, [
          e,
          make_node(AST_True, self2)
        ])).optimize(compressor);
    }
  }
  if (self2.operator == "-" && e instanceof AST_Infinity) {
    e = e.transform(compressor);
  }
  if (e instanceof AST_Binary && (self2.operator == "+" || self2.operator == "-") && (e.operator == "*" || e.operator == "/" || e.operator == "%")) {
    return make_node(AST_Binary, self2, {
      operator: e.operator,
      left: make_node(AST_UnaryPrefix, e.left, {
        operator: self2.operator,
        expression: e.left
      }),
      right: e.right
    });
  }
  if (compressor.option("evaluate")) {
    if (self2.operator === "~" && self2.expression instanceof AST_UnaryPrefix && self2.expression.operator === "~" && (compressor.in_32_bit_context(false) || self2.expression.expression.is_32_bit_integer(compressor))) {
      return self2.expression.expression;
    }
    if (self2.operator === "~" && e instanceof AST_Binary && e.operator === "^") {
      if (e.left instanceof AST_UnaryPrefix && e.left.operator === "~") {
        e.left = e.left.bitwise_negate(compressor, true);
      } else {
        e.right = e.right.bitwise_negate(compressor, true);
      }
      return e;
    }
  }
  if (self2.operator != "-" || !(e instanceof AST_Number || e instanceof AST_Infinity || e instanceof AST_BigInt)) {
    var ev = self2.evaluate(compressor);
    if (ev !== self2) {
      ev = make_node_from_constant(ev, self2).optimize(compressor);
      return best_of(compressor, ev, self2);
    }
  }
  return self2;
});
AST_Binary.DEFMETHOD("lift_sequences", function(compressor) {
  if (compressor.option("sequences")) {
    if (this.left instanceof AST_Sequence) {
      var x = this.left.expressions.slice();
      var e = this.clone();
      e.left = x.pop();
      x.push(e);
      return make_sequence(this, x).optimize(compressor);
    }
    if (this.right instanceof AST_Sequence && !this.left.has_side_effects(compressor)) {
      var assign = this.operator == "=" && this.left instanceof AST_SymbolRef;
      var x = this.right.expressions;
      var last = x.length - 1;
      for (var i = 0;i < last; i++) {
        if (!assign && x[i].has_side_effects(compressor))
          break;
      }
      if (i == last) {
        x = x.slice();
        var e = this.clone();
        e.right = x.pop();
        x.push(e);
        return make_sequence(this, x).optimize(compressor);
      } else if (i > 0) {
        var e = this.clone();
        e.right = make_sequence(this.right, x.slice(i));
        x = x.slice(0, i);
        x.push(e);
        return make_sequence(this, x).optimize(compressor);
      }
    }
  }
  return this;
});
var commutativeOperators = makePredicate("== === != !== * & | ^");
function is_object(node) {
  return node instanceof AST_Array || node instanceof AST_Lambda || node instanceof AST_Object || node instanceof AST_Class;
}
def_optimize(AST_Binary, function(self2, compressor) {
  function reversible() {
    return self2.left.is_constant() || self2.right.is_constant() || !self2.left.has_side_effects(compressor) && !self2.right.has_side_effects(compressor);
  }
  function reverse(op) {
    if (reversible()) {
      if (op)
        self2.operator = op;
      var tmp = self2.left;
      self2.left = self2.right;
      self2.right = tmp;
    }
  }
  if (compressor.option("lhs_constants") && commutativeOperators.has(self2.operator)) {
    if (self2.right.is_constant() && !self2.left.is_constant()) {
      if (!(self2.left instanceof AST_Binary && PRECEDENCE[self2.left.operator] >= PRECEDENCE[self2.operator])) {
        reverse();
      }
    }
  }
  self2 = self2.lift_sequences(compressor);
  if (compressor.option("comparisons"))
    switch (self2.operator) {
      case "===":
      case "!==":
        var is_strict_comparison = true;
        if (self2.left.is_string(compressor) && self2.right.is_string(compressor) || self2.left.is_number(compressor) && self2.right.is_number(compressor) || self2.left.is_bigint(compressor) && self2.right.is_bigint(compressor) || self2.left.is_boolean() && self2.right.is_boolean() || self2.left.equivalent_to(self2.right)) {
          self2.operator = self2.operator.substr(0, 2);
        }
      case "==":
      case "!=":
        if (!is_strict_comparison && is_undefined(self2.left, compressor)) {
          self2.left = make_node(AST_Null, self2.left);
        } else if (!is_strict_comparison && is_undefined(self2.right, compressor)) {
          self2.right = make_node(AST_Null, self2.right);
        } else if (compressor.option("typeofs") && self2.left instanceof AST_String && self2.left.value == "undefined" && self2.right instanceof AST_UnaryPrefix && self2.right.operator == "typeof") {
          var expr = self2.right.expression;
          if (expr instanceof AST_SymbolRef ? expr.is_declared(compressor) : !(expr instanceof AST_PropAccess && compressor.option("ie8"))) {
            self2.right = expr;
            self2.left = make_node(AST_Undefined, self2.left).optimize(compressor);
            if (self2.operator.length == 2)
              self2.operator += "=";
          }
        } else if (compressor.option("typeofs") && self2.left instanceof AST_UnaryPrefix && self2.left.operator == "typeof" && self2.right instanceof AST_String && self2.right.value == "undefined") {
          var expr = self2.left.expression;
          if (expr instanceof AST_SymbolRef ? expr.is_declared(compressor) : !(expr instanceof AST_PropAccess && compressor.option("ie8"))) {
            self2.left = expr;
            self2.right = make_node(AST_Undefined, self2.right).optimize(compressor);
            if (self2.operator.length == 2)
              self2.operator += "=";
          }
        } else if (self2.left instanceof AST_SymbolRef && self2.right instanceof AST_SymbolRef && self2.left.definition() === self2.right.definition() && is_object(self2.left.fixed_value())) {
          return make_node(self2.operator[0] == "=" ? AST_True : AST_False, self2);
        } else if (self2.left.is_32_bit_integer(compressor) && self2.right.is_32_bit_integer(compressor)) {
          const not = (node) => make_node(AST_UnaryPrefix, node, {
            operator: "!",
            expression: node
          });
          const booleanify = (node, truthy) => {
            if (truthy) {
              return compressor.in_boolean_context() ? node : not(not(node));
            } else {
              return not(node);
            }
          };
          if (self2.left instanceof AST_Number && self2.left.value === 0) {
            return booleanify(self2.right, self2.operator[0] === "!");
          }
          if (self2.right instanceof AST_Number && self2.right.value === 0) {
            return booleanify(self2.left, self2.operator[0] === "!");
          }
          let and_op, x, mask;
          if ((and_op = self2.left instanceof AST_Binary ? self2.left : self2.right instanceof AST_Binary ? self2.right : null) && (mask = and_op === self2.left ? self2.right : self2.left) && and_op.operator === "&" && mask instanceof AST_Number && mask.is_32_bit_integer(compressor) && (x = and_op.left.equivalent_to(mask) ? and_op.right : and_op.right.equivalent_to(mask) ? and_op.left : null)) {
            let optimized = booleanify(make_node(AST_Binary, self2, {
              operator: "&",
              left: mask,
              right: make_node(AST_UnaryPrefix, self2, {
                operator: "~",
                expression: x
              })
            }), self2.operator[0] === "!");
            return best_of(compressor, optimized, self2);
          }
        }
        break;
      case "&&":
      case "||":
        var lhs = self2.left;
        if (lhs.operator == self2.operator) {
          lhs = lhs.right;
        }
        if (lhs instanceof AST_Binary && lhs.operator == (self2.operator == "&&" ? "!==" : "===") && self2.right instanceof AST_Binary && lhs.operator == self2.right.operator && (is_undefined(lhs.left, compressor) && self2.right.left instanceof AST_Null || lhs.left instanceof AST_Null && is_undefined(self2.right.left, compressor)) && !lhs.right.has_side_effects(compressor) && lhs.right.equivalent_to(self2.right.right)) {
          var combined = make_node(AST_Binary, self2, {
            operator: lhs.operator.slice(0, -1),
            left: make_node(AST_Null, self2),
            right: lhs.right
          });
          if (lhs !== self2.left) {
            combined = make_node(AST_Binary, self2, {
              operator: self2.operator,
              left: self2.left.left,
              right: combined
            });
          }
          return combined;
        }
        break;
    }
  if (self2.operator == "+" && compressor.in_boolean_context()) {
    var ll = self2.left.evaluate(compressor);
    var rr = self2.right.evaluate(compressor);
    if (ll && typeof ll == "string") {
      return make_sequence(self2, [
        self2.right,
        make_node(AST_True, self2)
      ]).optimize(compressor);
    }
    if (rr && typeof rr == "string") {
      return make_sequence(self2, [
        self2.left,
        make_node(AST_True, self2)
      ]).optimize(compressor);
    }
  }
  if (compressor.option("comparisons") && self2.is_boolean()) {
    if (!(compressor.parent() instanceof AST_Binary) || compressor.parent() instanceof AST_Assign) {
      var negated = make_node(AST_UnaryPrefix, self2, {
        operator: "!",
        expression: self2.negate(compressor, first_in_statement(compressor))
      });
      self2 = best_of(compressor, self2, negated);
    }
    if (compressor.option("unsafe_comps")) {
      switch (self2.operator) {
        case "<":
          reverse(">");
          break;
        case "<=":
          reverse(">=");
          break;
      }
    }
  }
  if (self2.operator == "+") {
    if (self2.right instanceof AST_String && self2.right.getValue() == "" && self2.left.is_string(compressor)) {
      return self2.left;
    }
    if (self2.left instanceof AST_String && self2.left.getValue() == "" && self2.right.is_string(compressor)) {
      return self2.right;
    }
    if (self2.left instanceof AST_Binary && self2.left.operator == "+" && self2.left.left instanceof AST_String && self2.left.left.getValue() == "" && self2.right.is_string(compressor)) {
      self2.left = self2.left.right;
      return self2;
    }
  }
  if (compressor.option("evaluate")) {
    switch (self2.operator) {
      case "&&":
        var ll = has_flag(self2.left, TRUTHY) ? true : has_flag(self2.left, FALSY) ? false : self2.left.evaluate(compressor);
        if (!ll) {
          return maintain_this_binding(compressor.parent(), compressor.self(), self2.left).optimize(compressor);
        } else if (!(ll instanceof AST_Node)) {
          return make_sequence(self2, [self2.left, self2.right]).optimize(compressor);
        }
        var rr = self2.right.evaluate(compressor);
        if (!rr) {
          if (compressor.in_boolean_context()) {
            return make_sequence(self2, [
              self2.left,
              make_node(AST_False, self2)
            ]).optimize(compressor);
          } else {
            set_flag(self2, FALSY);
          }
        } else if (!(rr instanceof AST_Node)) {
          var parent = compressor.parent();
          if (parent.operator == "&&" && parent.left === compressor.self() || compressor.in_boolean_context()) {
            return self2.left.optimize(compressor);
          }
        }
        if (self2.left.operator == "||") {
          var lr = self2.left.right.evaluate(compressor);
          if (!lr)
            return make_node(AST_Conditional, self2, {
              condition: self2.left.left,
              consequent: self2.right,
              alternative: self2.left.right
            }).optimize(compressor);
        }
        break;
      case "||":
        var ll = has_flag(self2.left, TRUTHY) ? true : has_flag(self2.left, FALSY) ? false : self2.left.evaluate(compressor);
        if (!ll) {
          return make_sequence(self2, [self2.left, self2.right]).optimize(compressor);
        } else if (!(ll instanceof AST_Node)) {
          return maintain_this_binding(compressor.parent(), compressor.self(), self2.left).optimize(compressor);
        }
        var rr = self2.right.evaluate(compressor);
        if (!rr) {
          var parent = compressor.parent();
          if (parent.operator == "||" && parent.left === compressor.self() || compressor.in_boolean_context()) {
            return self2.left.optimize(compressor);
          }
        } else if (!(rr instanceof AST_Node)) {
          if (compressor.in_boolean_context()) {
            return make_sequence(self2, [
              self2.left,
              make_node(AST_True, self2)
            ]).optimize(compressor);
          } else {
            set_flag(self2, TRUTHY);
          }
        }
        if (self2.left.operator == "&&") {
          var lr = self2.left.right.evaluate(compressor);
          if (lr && !(lr instanceof AST_Node))
            return make_node(AST_Conditional, self2, {
              condition: self2.left.left,
              consequent: self2.left.right,
              alternative: self2.right
            }).optimize(compressor);
        }
        break;
      case "??":
        if (is_nullish(self2.left, compressor)) {
          return self2.right;
        }
        var ll = self2.left.evaluate(compressor);
        if (!(ll instanceof AST_Node)) {
          return ll == null ? self2.right : self2.left;
        }
        if (compressor.in_boolean_context()) {
          const rr2 = self2.right.evaluate(compressor);
          if (!(rr2 instanceof AST_Node) && !rr2) {
            return self2.left;
          }
        }
    }
    var associative = true;
    switch (self2.operator) {
      case "+":
        if (self2.right instanceof AST_Constant && self2.left instanceof AST_Binary && self2.left.operator == "+" && self2.left.is_string(compressor)) {
          var binary = make_node(AST_Binary, self2, {
            operator: "+",
            left: self2.left.right,
            right: self2.right
          });
          var r = binary.optimize(compressor);
          if (binary !== r) {
            self2 = make_node(AST_Binary, self2, {
              operator: "+",
              left: self2.left.left,
              right: r
            });
          }
        }
        if (self2.left instanceof AST_Binary && self2.left.operator == "+" && self2.left.is_string(compressor) && self2.right instanceof AST_Binary && self2.right.operator == "+" && self2.right.is_string(compressor)) {
          var binary = make_node(AST_Binary, self2, {
            operator: "+",
            left: self2.left.right,
            right: self2.right.left
          });
          var m = binary.optimize(compressor);
          if (binary !== m) {
            self2 = make_node(AST_Binary, self2, {
              operator: "+",
              left: make_node(AST_Binary, self2.left, {
                operator: "+",
                left: self2.left.left,
                right: m
              }),
              right: self2.right.right
            });
          }
        }
        if (self2.right instanceof AST_UnaryPrefix && self2.right.operator == "-" && self2.left.is_number_or_bigint(compressor)) {
          self2 = make_node(AST_Binary, self2, {
            operator: "-",
            left: self2.left,
            right: self2.right.expression
          });
          break;
        }
        if (self2.left instanceof AST_UnaryPrefix && self2.left.operator == "-" && reversible() && self2.right.is_number_or_bigint(compressor)) {
          self2 = make_node(AST_Binary, self2, {
            operator: "-",
            left: self2.right,
            right: self2.left.expression
          });
          break;
        }
        if (self2.left instanceof AST_TemplateString) {
          var l = self2.left;
          var r = self2.right.evaluate(compressor);
          if (r != self2.right) {
            l.segments[l.segments.length - 1].value += String(r);
            return l;
          }
        }
        if (self2.right instanceof AST_TemplateString) {
          var r = self2.right;
          var l = self2.left.evaluate(compressor);
          if (l != self2.left) {
            r.segments[0].value = String(l) + r.segments[0].value;
            return r;
          }
        }
        if (self2.left instanceof AST_TemplateString && self2.right instanceof AST_TemplateString) {
          var l = self2.left;
          var segments = l.segments;
          var r = self2.right;
          segments[segments.length - 1].value += r.segments[0].value;
          for (var i = 1;i < r.segments.length; i++) {
            segments.push(r.segments[i]);
          }
          return l;
        }
      case "*":
        associative = compressor.option("unsafe_math");
      case "&":
      case "|":
      case "^":
        if (self2.left.is_number_or_bigint(compressor) && self2.right.is_number_or_bigint(compressor) && reversible() && !(self2.left instanceof AST_Binary && self2.left.operator != self2.operator && PRECEDENCE[self2.left.operator] >= PRECEDENCE[self2.operator])) {
          var reversed = make_node(AST_Binary, self2, {
            operator: self2.operator,
            left: self2.right,
            right: self2.left
          });
          if (self2.right instanceof AST_Constant && !(self2.left instanceof AST_Constant)) {
            self2 = best_of(compressor, reversed, self2);
          } else {
            self2 = best_of(compressor, self2, reversed);
          }
        }
        if (associative && self2.is_number_or_bigint(compressor)) {
          if (self2.right instanceof AST_Binary && self2.right.operator == self2.operator) {
            self2 = make_node(AST_Binary, self2, {
              operator: self2.operator,
              left: make_node(AST_Binary, self2.left, {
                operator: self2.operator,
                left: self2.left,
                right: self2.right.left,
                start: self2.left.start,
                end: self2.right.left.end
              }),
              right: self2.right.right
            });
          }
          if (self2.right instanceof AST_Constant && self2.left instanceof AST_Binary && self2.left.operator == self2.operator) {
            if (self2.left.left instanceof AST_Constant) {
              self2 = make_node(AST_Binary, self2, {
                operator: self2.operator,
                left: make_node(AST_Binary, self2.left, {
                  operator: self2.operator,
                  left: self2.left.left,
                  right: self2.right,
                  start: self2.left.left.start,
                  end: self2.right.end
                }),
                right: self2.left.right
              });
            } else if (self2.left.right instanceof AST_Constant) {
              self2 = make_node(AST_Binary, self2, {
                operator: self2.operator,
                left: make_node(AST_Binary, self2.left, {
                  operator: self2.operator,
                  left: self2.left.right,
                  right: self2.right,
                  start: self2.left.right.start,
                  end: self2.right.end
                }),
                right: self2.left.left
              });
            }
          }
          if (self2.left instanceof AST_Binary && self2.left.operator == self2.operator && self2.left.right instanceof AST_Constant && self2.right instanceof AST_Binary && self2.right.operator == self2.operator && self2.right.left instanceof AST_Constant) {
            self2 = make_node(AST_Binary, self2, {
              operator: self2.operator,
              left: make_node(AST_Binary, self2.left, {
                operator: self2.operator,
                left: make_node(AST_Binary, self2.left.left, {
                  operator: self2.operator,
                  left: self2.left.right,
                  right: self2.right.left,
                  start: self2.left.right.start,
                  end: self2.right.left.end
                }),
                right: self2.left.left
              }),
              right: self2.right.right
            });
          }
        }
    }
    if (bitwise_binop.has(self2.operator)) {
      let y, z, x_node, y_node, z_node = self2.left;
      if (self2.operator === "&" && self2.right instanceof AST_Binary && self2.right.operator === "|" && typeof (z = self2.left.evaluate(compressor)) === "number") {
        if (typeof (y = self2.right.right.evaluate(compressor)) === "number") {
          x_node = self2.right.left;
          y_node = self2.right.right;
        } else if (typeof (y = self2.right.left.evaluate(compressor)) === "number") {
          x_node = self2.right.right;
          y_node = self2.right.left;
        }
        if (x_node && y_node) {
          if ((y & z) === 0) {
            self2 = make_node(AST_Binary, self2, {
              operator: self2.operator,
              left: z_node,
              right: x_node
            });
          } else {
            const reordered_ops = make_node(AST_Binary, self2, {
              operator: "|",
              left: make_node(AST_Binary, self2, {
                operator: "&",
                left: x_node,
                right: z_node
              }),
              right: make_node_from_constant(y & z, y_node)
            });
            self2 = best_of(compressor, self2, reordered_ops);
          }
        }
      }
      if ((self2.operator === "|" || self2.operator === "&") && self2.left.equivalent_to(self2.right) && !self2.left.has_side_effects(compressor) && compressor.in_32_bit_context(true)) {
        self2.left = make_node(AST_Number, self2, { value: 0 });
        self2.operator = "|";
      }
      if (self2.operator === "^" && self2.left instanceof AST_UnaryPrefix && self2.left.operator === "~" && self2.right instanceof AST_UnaryPrefix && self2.right.operator === "~") {
        self2 = make_node(AST_Binary, self2, {
          operator: "^",
          left: self2.left.expression,
          right: self2.right.expression
        });
      }
      if ((self2.operator === "<<" || self2.operator === ">>") && self2.right instanceof AST_Number && self2.right.value === 0) {
        self2.operator = "|";
      }
      const zero_side = self2.right instanceof AST_Number && self2.right.value === 0 ? self2.right : self2.left instanceof AST_Number && self2.left.value === 0 ? self2.left : null;
      const non_zero_side = zero_side && (zero_side === self2.right ? self2.left : self2.right);
      if (zero_side && (self2.operator === "|" || self2.operator === "^") && (non_zero_side.is_32_bit_integer(compressor) || compressor.in_32_bit_context(true))) {
        return non_zero_side;
      }
      if (zero_side && self2.operator === "&" && !non_zero_side.has_side_effects(compressor) && non_zero_side.is_32_bit_integer(compressor)) {
        return zero_side;
      }
      const is_full_mask = (node) => node instanceof AST_Number && node.value === -1 || node instanceof AST_UnaryPrefix && node.operator === "-" && node.expression instanceof AST_Number && node.expression.value === 1;
      const full_mask = is_full_mask(self2.right) ? self2.right : is_full_mask(self2.left) ? self2.left : null;
      const other_side = full_mask === self2.right ? self2.left : self2.right;
      if (full_mask && self2.operator === "&" && (other_side.is_32_bit_integer(compressor) || compressor.in_32_bit_context(true))) {
        return other_side;
      }
      if (full_mask && self2.operator === "^" && (other_side.is_32_bit_integer(compressor) || compressor.in_32_bit_context(true))) {
        return other_side.bitwise_negate(compressor);
      }
    }
  }
  if (self2.right instanceof AST_Binary && self2.right.operator == self2.operator && (lazy_op.has(self2.operator) || self2.operator == "+" && (self2.right.left.is_string(compressor) || self2.left.is_string(compressor) && self2.right.right.is_string(compressor)))) {
    self2.left = make_node(AST_Binary, self2.left, {
      operator: self2.operator,
      left: self2.left.transform(compressor),
      right: self2.right.left.transform(compressor)
    });
    self2.right = self2.right.right.transform(compressor);
    return self2.transform(compressor);
  }
  var ev = self2.evaluate(compressor);
  if (ev !== self2) {
    ev = make_node_from_constant(ev, self2).optimize(compressor);
    return best_of(compressor, ev, self2);
  }
  return self2;
});
def_optimize(AST_SymbolExport, function(self2) {
  return self2;
});
def_optimize(AST_SymbolRef, function(self2, compressor) {
  if (!compressor.option("ie8") && is_undeclared_ref(self2) && !compressor.find_parent(AST_With)) {
    switch (self2.name) {
      case "undefined":
        return make_node(AST_Undefined, self2).optimize(compressor);
      case "NaN":
        return make_node(AST_NaN, self2).optimize(compressor);
      case "Infinity":
        return make_node(AST_Infinity, self2).optimize(compressor);
    }
  }
  if (compressor.option("reduce_vars") && !compressor.is_lhs()) {
    return inline_into_symbolref(self2, compressor);
  } else {
    return self2;
  }
});
function is_atomic(lhs, self2) {
  return lhs instanceof AST_SymbolRef || lhs.TYPE === self2.TYPE;
}
def_optimize(AST_Undefined, function(self2, compressor) {
  if (compressor.option("unsafe_undefined")) {
    var undef = find_variable(compressor, "undefined");
    if (undef) {
      var ref = make_node(AST_SymbolRef, self2, {
        name: "undefined",
        scope: undef.scope,
        thedef: undef
      });
      set_flag(ref, UNDEFINED);
      return ref;
    }
  }
  var lhs = compressor.is_lhs();
  if (lhs && is_atomic(lhs, self2))
    return self2;
  return make_node(AST_UnaryPrefix, self2, {
    operator: "void",
    expression: make_node(AST_Number, self2, {
      value: 0
    })
  });
});
def_optimize(AST_Infinity, function(self2, compressor) {
  var lhs = compressor.is_lhs();
  if (lhs && is_atomic(lhs, self2))
    return self2;
  if (compressor.option("keep_infinity") && !(lhs && !is_atomic(lhs, self2)) && !find_variable(compressor, "Infinity")) {
    return self2;
  }
  return make_node(AST_Binary, self2, {
    operator: "/",
    left: make_node(AST_Number, self2, {
      value: 1
    }),
    right: make_node(AST_Number, self2, {
      value: 0
    })
  });
});
def_optimize(AST_NaN, function(self2, compressor) {
  var lhs = compressor.is_lhs();
  if (lhs && !is_atomic(lhs, self2) || find_variable(compressor, "NaN")) {
    return make_node(AST_Binary, self2, {
      operator: "/",
      left: make_node(AST_Number, self2, {
        value: 0
      }),
      right: make_node(AST_Number, self2, {
        value: 0
      })
    });
  }
  return self2;
});
var ASSIGN_OPS = makePredicate("+ - / * % >> << >>> | ^ &");
var ASSIGN_OPS_COMMUTATIVE = makePredicate("* | ^ &");
def_optimize(AST_Assign, function(self2, compressor) {
  if (self2.logical) {
    return self2.lift_sequences(compressor);
  }
  var def;
  if (self2.operator === "=" && self2.left instanceof AST_SymbolRef && self2.left.name !== "arguments" && !(def = self2.left.definition()).undeclared && self2.right.equivalent_to(self2.left)) {
    return self2.right;
  }
  if (compressor.option("dead_code") && self2.left instanceof AST_SymbolRef && (def = self2.left.definition()).scope === compressor.find_parent(AST_Lambda)) {
    var level = 0, node, parent = self2;
    do {
      node = parent;
      parent = compressor.parent(level++);
      if (parent instanceof AST_Exit) {
        if (in_try(level, parent))
          break;
        if (is_reachable(def.scope, [def]))
          break;
        if (self2.operator == "=")
          return self2.right;
        def.fixed = false;
        return make_node(AST_Binary, self2, {
          operator: self2.operator.slice(0, -1),
          left: self2.left,
          right: self2.right
        }).optimize(compressor);
      }
    } while (parent instanceof AST_Binary && parent.right === node || parent instanceof AST_Sequence && parent.tail_node() === node);
  }
  self2 = self2.lift_sequences(compressor);
  if (self2.operator == "=" && self2.left instanceof AST_SymbolRef && self2.right instanceof AST_Binary) {
    if (self2.right.left instanceof AST_SymbolRef && self2.right.left.name == self2.left.name && ASSIGN_OPS.has(self2.right.operator)) {
      self2.operator = self2.right.operator + "=";
      self2.right = self2.right.right;
    } else if (self2.right.right instanceof AST_SymbolRef && self2.right.right.name == self2.left.name && ASSIGN_OPS_COMMUTATIVE.has(self2.right.operator) && !self2.right.left.has_side_effects(compressor)) {
      self2.operator = self2.right.operator + "=";
      self2.right = self2.right.left;
    }
  }
  return self2;
  function in_try(level2, node2) {
    function may_assignment_throw() {
      const right = self2.right;
      self2.right = make_node(AST_Null, right);
      const may_throw = node2.may_throw(compressor);
      self2.right = right;
      return may_throw;
    }
    var stop_at = self2.left.definition().scope.get_defun_scope();
    var parent2;
    while ((parent2 = compressor.parent(level2++)) !== stop_at) {
      if (parent2 instanceof AST_Try) {
        if (parent2.bfinally)
          return true;
        if (parent2.bcatch && may_assignment_throw())
          return true;
      }
    }
  }
});
def_optimize(AST_DefaultAssign, function(self2, compressor) {
  if (!compressor.option("evaluate")) {
    return self2;
  }
  var evaluateRight = self2.right.evaluate(compressor);
  let lambda, iife;
  if (evaluateRight === undefined) {
    if ((lambda = compressor.parent()) instanceof AST_Lambda ? compressor.option("keep_fargs") === false || (iife = compressor.parent(1)).TYPE === "Call" && iife.expression === lambda : true) {
      self2 = self2.left;
    }
  } else if (evaluateRight !== self2.right) {
    evaluateRight = make_node_from_constant(evaluateRight, self2.right);
    self2.right = best_of_expression(evaluateRight, self2.right);
  }
  return self2;
});
function is_nullish_check(check, check_subject, compressor) {
  if (check_subject.may_throw(compressor))
    return false;
  let nullish_side;
  if (check instanceof AST_Binary && check.operator === "==" && ((nullish_side = is_nullish(check.left, compressor) && check.left) || (nullish_side = is_nullish(check.right, compressor) && check.right)) && (nullish_side === check.left ? check.right : check.left).equivalent_to(check_subject)) {
    return true;
  }
  if (check instanceof AST_Binary && check.operator === "||") {
    let null_cmp;
    let undefined_cmp;
    const find_comparison = (cmp) => {
      if (!(cmp instanceof AST_Binary && (cmp.operator === "===" || cmp.operator === "=="))) {
        return false;
      }
      let found = 0;
      let defined_side;
      if (cmp.left instanceof AST_Null) {
        found++;
        null_cmp = cmp;
        defined_side = cmp.right;
      }
      if (cmp.right instanceof AST_Null) {
        found++;
        null_cmp = cmp;
        defined_side = cmp.left;
      }
      if (is_undefined(cmp.left, compressor)) {
        found++;
        undefined_cmp = cmp;
        defined_side = cmp.right;
      }
      if (is_undefined(cmp.right, compressor)) {
        found++;
        undefined_cmp = cmp;
        defined_side = cmp.left;
      }
      if (found !== 1) {
        return false;
      }
      if (!defined_side.equivalent_to(check_subject)) {
        return false;
      }
      return true;
    };
    if (!find_comparison(check.left))
      return false;
    if (!find_comparison(check.right))
      return false;
    if (null_cmp && undefined_cmp && null_cmp !== undefined_cmp) {
      return true;
    }
  }
  return false;
}
def_optimize(AST_Conditional, function(self2, compressor) {
  if (!compressor.option("conditionals"))
    return self2;
  if (self2.condition instanceof AST_Sequence) {
    var expressions = self2.condition.expressions.slice();
    self2.condition = expressions.pop();
    expressions.push(self2);
    return make_sequence(self2, expressions);
  }
  var cond = self2.condition.evaluate(compressor);
  if (cond !== self2.condition) {
    if (cond) {
      return maintain_this_binding(compressor.parent(), compressor.self(), self2.consequent);
    } else {
      return maintain_this_binding(compressor.parent(), compressor.self(), self2.alternative);
    }
  }
  var negated = cond.negate(compressor, first_in_statement(compressor));
  if (best_of(compressor, cond, negated) === negated) {
    self2 = make_node(AST_Conditional, self2, {
      condition: negated,
      consequent: self2.alternative,
      alternative: self2.consequent
    });
  }
  var condition = self2.condition;
  var consequent = self2.consequent;
  var alternative = self2.alternative;
  if (condition instanceof AST_SymbolRef && consequent instanceof AST_SymbolRef && condition.definition() === consequent.definition()) {
    return make_node(AST_Binary, self2, {
      operator: "||",
      left: condition,
      right: alternative
    });
  }
  if (consequent instanceof AST_Assign && alternative instanceof AST_Assign && consequent.operator === alternative.operator && consequent.logical === alternative.logical && consequent.left.equivalent_to(alternative.left) && (!self2.condition.has_side_effects(compressor) || consequent.operator == "=" && !consequent.left.has_side_effects(compressor))) {
    return make_node(AST_Assign, self2, {
      operator: consequent.operator,
      left: consequent.left,
      logical: consequent.logical,
      right: make_node(AST_Conditional, self2, {
        condition: self2.condition,
        consequent: consequent.right,
        alternative: alternative.right
      })
    });
  }
  var arg_index;
  if (consequent instanceof AST_Call && alternative.TYPE === consequent.TYPE && consequent.args.length > 0 && consequent.args.length == alternative.args.length && consequent.expression.equivalent_to(alternative.expression) && !self2.condition.has_side_effects(compressor) && !consequent.expression.has_side_effects(compressor) && typeof (arg_index = single_arg_diff()) == "number") {
    var node = consequent.clone();
    node.args[arg_index] = make_node(AST_Conditional, self2, {
      condition: self2.condition,
      consequent: consequent.args[arg_index],
      alternative: alternative.args[arg_index]
    });
    return node;
  }
  if (alternative instanceof AST_Conditional && consequent.equivalent_to(alternative.consequent)) {
    return make_node(AST_Conditional, self2, {
      condition: make_node(AST_Binary, self2, {
        operator: "||",
        left: condition,
        right: alternative.condition
      }),
      consequent,
      alternative: alternative.alternative
    }).optimize(compressor);
  }
  if (compressor.option("ecma") >= 2020 && is_nullish_check(condition, alternative, compressor)) {
    return make_node(AST_Binary, self2, {
      operator: "??",
      left: alternative,
      right: consequent
    }).optimize(compressor);
  }
  if (alternative instanceof AST_Sequence && consequent.equivalent_to(alternative.expressions[alternative.expressions.length - 1])) {
    return make_sequence(self2, [
      make_node(AST_Binary, self2, {
        operator: "||",
        left: condition,
        right: make_sequence(self2, alternative.expressions.slice(0, -1))
      }),
      consequent
    ]).optimize(compressor);
  }
  if (alternative instanceof AST_Binary && alternative.operator == "&&" && consequent.equivalent_to(alternative.right)) {
    return make_node(AST_Binary, self2, {
      operator: "&&",
      left: make_node(AST_Binary, self2, {
        operator: "||",
        left: condition,
        right: alternative.left
      }),
      right: consequent
    }).optimize(compressor);
  }
  if (consequent instanceof AST_Conditional && consequent.alternative.equivalent_to(alternative)) {
    return make_node(AST_Conditional, self2, {
      condition: make_node(AST_Binary, self2, {
        left: self2.condition,
        operator: "&&",
        right: consequent.condition
      }),
      consequent: consequent.consequent,
      alternative
    });
  }
  if (consequent.equivalent_to(alternative)) {
    return make_sequence(self2, [
      self2.condition,
      consequent
    ]).optimize(compressor);
  }
  if (consequent instanceof AST_Binary && consequent.operator == "||" && consequent.right.equivalent_to(alternative)) {
    return make_node(AST_Binary, self2, {
      operator: "||",
      left: make_node(AST_Binary, self2, {
        operator: "&&",
        left: self2.condition,
        right: consequent.left
      }),
      right: alternative
    }).optimize(compressor);
  }
  const in_bool = compressor.in_boolean_context();
  if (is_true(self2.consequent)) {
    if (is_false(self2.alternative)) {
      return booleanize(self2.condition);
    }
    return make_node(AST_Binary, self2, {
      operator: "||",
      left: booleanize(self2.condition),
      right: self2.alternative
    });
  }
  if (is_false(self2.consequent)) {
    if (is_true(self2.alternative)) {
      return booleanize(self2.condition.negate(compressor));
    }
    return make_node(AST_Binary, self2, {
      operator: "&&",
      left: booleanize(self2.condition.negate(compressor)),
      right: self2.alternative
    });
  }
  if (is_true(self2.alternative)) {
    return make_node(AST_Binary, self2, {
      operator: "||",
      left: booleanize(self2.condition.negate(compressor)),
      right: self2.consequent
    });
  }
  if (is_false(self2.alternative)) {
    return make_node(AST_Binary, self2, {
      operator: "&&",
      left: booleanize(self2.condition),
      right: self2.consequent
    });
  }
  return self2;
  function booleanize(node2) {
    if (node2.is_boolean())
      return node2;
    return make_node(AST_UnaryPrefix, node2, {
      operator: "!",
      expression: node2.negate(compressor)
    });
  }
  function is_true(node2) {
    return node2 instanceof AST_True || in_bool && node2 instanceof AST_Constant && node2.getValue() || node2 instanceof AST_UnaryPrefix && node2.operator == "!" && node2.expression instanceof AST_Constant && !node2.expression.getValue();
  }
  function is_false(node2) {
    return node2 instanceof AST_False || in_bool && node2 instanceof AST_Constant && !node2.getValue() || node2 instanceof AST_UnaryPrefix && node2.operator == "!" && node2.expression instanceof AST_Constant && node2.expression.getValue();
  }
  function single_arg_diff() {
    var a = consequent.args;
    var b = alternative.args;
    for (var i = 0, len = a.length;i < len; i++) {
      if (a[i] instanceof AST_Expansion)
        return;
      if (!a[i].equivalent_to(b[i])) {
        if (b[i] instanceof AST_Expansion)
          return;
        for (var j = i + 1;j < len; j++) {
          if (a[j] instanceof AST_Expansion)
            return;
          if (!a[j].equivalent_to(b[j]))
            return;
        }
        return i;
      }
    }
  }
});
def_optimize(AST_Boolean, function(self2, compressor) {
  if (compressor.in_boolean_context())
    return make_node(AST_Number, self2, {
      value: +self2.value
    });
  var p = compressor.parent();
  if (compressor.option("booleans_as_integers")) {
    if (p instanceof AST_Binary && (p.operator == "===" || p.operator == "!==")) {
      p.operator = p.operator.replace(/=$/, "");
    }
    return make_node(AST_Number, self2, {
      value: +self2.value
    });
  }
  if (compressor.option("booleans")) {
    if (p instanceof AST_Binary && (p.operator == "==" || p.operator == "!=")) {
      return make_node(AST_Number, self2, {
        value: +self2.value
      });
    }
    return make_node(AST_UnaryPrefix, self2, {
      operator: "!",
      expression: make_node(AST_Number, self2, {
        value: 1 - self2.value
      })
    });
  }
  return self2;
});
function safe_to_flatten(value, compressor) {
  if (value instanceof AST_SymbolRef) {
    value = value.fixed_value();
  }
  if (!value)
    return false;
  if (!(value instanceof AST_Lambda || value instanceof AST_Class))
    return true;
  if (!(value instanceof AST_Lambda && value.contains_this()))
    return true;
  return compressor.parent() instanceof AST_New;
}
AST_PropAccess.DEFMETHOD("flatten_object", function(key, compressor) {
  if (!compressor.option("properties"))
    return;
  if (key === "__proto__")
    return;
  if (this instanceof AST_DotHash)
    return;
  var arrows = compressor.option("unsafe_arrows") && compressor.option("ecma") >= 2015;
  var expr = this.expression;
  if (expr instanceof AST_Object) {
    var props = expr.properties;
    for (var i = props.length;--i >= 0; ) {
      var prop = props[i];
      if ("" + (prop instanceof AST_ConciseMethod ? prop.key.name : prop.key) == key) {
        const all_props_flattenable = props.every((p) => (p instanceof AST_ObjectKeyVal || arrows && p instanceof AST_ConciseMethod && !p.value.is_generator) && !p.computed_key());
        if (!all_props_flattenable)
          return;
        if (!safe_to_flatten(prop.value, compressor))
          return;
        return make_node(AST_Sub, this, {
          expression: make_node(AST_Array, expr, {
            elements: props.map(function(prop2) {
              var v = prop2.value;
              if (v instanceof AST_Accessor) {
                v = make_node(AST_Function, v, v);
              }
              var k = prop2.key;
              if (k instanceof AST_Node && !(k instanceof AST_SymbolMethod)) {
                return make_sequence(prop2, [k, v]);
              }
              return v;
            })
          }),
          property: make_node(AST_Number, this, {
            value: i
          })
        });
      }
    }
  }
});
def_optimize(AST_Sub, function(self2, compressor) {
  var expr = self2.expression;
  var prop = self2.property;
  if (compressor.option("properties")) {
    var key = prop.evaluate(compressor);
    if (key !== prop) {
      if (typeof key == "string") {
        if (key == "undefined") {
          key = undefined;
        } else {
          var value = parseFloat(key);
          if (value.toString() == key) {
            key = value;
          }
        }
      }
      prop = self2.property = best_of_expression(prop, make_node_from_constant(key, prop).transform(compressor));
      var property = "" + key;
      if (is_basic_identifier_string(property) && property.length <= prop.size() + 1) {
        return make_node(AST_Dot, self2, {
          expression: expr,
          optional: self2.optional,
          property,
          quote: prop.quote
        }).optimize(compressor);
      }
    }
  }
  var fn;
  OPT_ARGUMENTS:
    if (compressor.option("arguments") && expr instanceof AST_SymbolRef && expr.name == "arguments" && expr.definition().orig.length == 1 && (fn = expr.scope) instanceof AST_Lambda && fn.uses_arguments && !(fn instanceof AST_Arrow) && prop instanceof AST_Number) {
      var index = prop.getValue();
      var params = new Set;
      var argnames = fn.argnames;
      for (var n = 0;n < argnames.length; n++) {
        if (!(argnames[n] instanceof AST_SymbolFunarg)) {
          break OPT_ARGUMENTS;
        }
        var param = argnames[n].name;
        if (params.has(param)) {
          break OPT_ARGUMENTS;
        }
        params.add(param);
      }
      var argname = fn.argnames[index];
      if (argname && compressor.has_directive("use strict")) {
        var def = argname.definition();
        if (!compressor.option("reduce_vars") || def.assignments || def.orig.length > 1) {
          argname = null;
        }
      } else if (!argname && !compressor.option("keep_fargs") && index < fn.argnames.length + 5) {
        while (index >= fn.argnames.length) {
          argname = fn.create_symbol(AST_SymbolFunarg, {
            source: fn,
            scope: fn,
            tentative_name: "argument_" + fn.argnames.length
          });
          fn.argnames.push(argname);
        }
      }
      if (argname) {
        var sym = make_node(AST_SymbolRef, self2, argname);
        sym.reference({});
        clear_flag(argname, UNUSED);
        return sym;
      }
    }
  if (compressor.is_lhs())
    return self2;
  if (key !== prop) {
    var sub = self2.flatten_object(property, compressor);
    if (sub) {
      expr = self2.expression = sub.expression;
      prop = self2.property = sub.property;
    }
  }
  if (compressor.option("properties") && compressor.option("side_effects") && prop instanceof AST_Number && expr instanceof AST_Array) {
    var index = prop.getValue();
    var elements = expr.elements;
    var retValue = elements[index];
    FLATTEN:
      if (safe_to_flatten(retValue, compressor)) {
        var flatten = true;
        var values = [];
        for (var i = elements.length;--i > index; ) {
          var value = elements[i].drop_side_effect_free(compressor);
          if (value) {
            values.unshift(value);
            if (flatten && value.has_side_effects(compressor))
              flatten = false;
          }
        }
        if (retValue instanceof AST_Expansion)
          break FLATTEN;
        retValue = retValue instanceof AST_Hole ? make_node(AST_Undefined, retValue) : retValue;
        if (!flatten)
          values.unshift(retValue);
        while (--i >= 0) {
          var value = elements[i];
          if (value instanceof AST_Expansion)
            break FLATTEN;
          value = value.drop_side_effect_free(compressor);
          if (value)
            values.unshift(value);
          else
            index--;
        }
        if (flatten) {
          values.push(retValue);
          return make_sequence(self2, values).optimize(compressor);
        } else
          return make_node(AST_Sub, self2, {
            expression: make_node(AST_Array, expr, {
              elements: values
            }),
            property: make_node(AST_Number, prop, {
              value: index
            })
          });
      }
  }
  var ev = self2.evaluate(compressor);
  if (ev !== self2) {
    ev = make_node_from_constant(ev, self2).optimize(compressor);
    return best_of(compressor, ev, self2);
  }
  return self2;
});
def_optimize(AST_Chain, function(self2, compressor) {
  if (is_nullish(self2.expression, compressor)) {
    let parent = compressor.parent();
    if (parent instanceof AST_UnaryPrefix && parent.operator === "delete") {
      return make_node_from_constant(0, self2);
    }
    return make_node(AST_Undefined, self2);
  }
  if (self2.expression instanceof AST_PropAccess || self2.expression instanceof AST_Call) {
    return self2;
  } else {
    return self2.expression;
  }
});
def_optimize(AST_Dot, function(self2, compressor) {
  const parent = compressor.parent();
  if (compressor.is_lhs())
    return self2;
  if (compressor.option("unsafe_proto") && self2.expression instanceof AST_Dot && self2.expression.property == "prototype") {
    var exp = self2.expression.expression;
    if (is_undeclared_ref(exp))
      switch (exp.name) {
        case "Array":
          self2.expression = make_node(AST_Array, self2.expression, {
            elements: []
          });
          break;
        case "Function":
          self2.expression = make_empty_function(self2.expression);
          break;
        case "Number":
          self2.expression = make_node(AST_Number, self2.expression, {
            value: 0
          });
          break;
        case "Object":
          self2.expression = make_node(AST_Object, self2.expression, {
            properties: []
          });
          break;
        case "RegExp":
          self2.expression = make_node(AST_RegExp, self2.expression, {
            value: { source: "t", flags: "" }
          });
          break;
        case "String":
          self2.expression = make_node(AST_String, self2.expression, {
            value: ""
          });
          break;
      }
  }
  if (!(parent instanceof AST_Call) || !has_annotation(parent, _NOINLINE)) {
    const sub = self2.flatten_object(self2.property, compressor);
    if (sub)
      return sub.optimize(compressor);
  }
  if (self2.expression instanceof AST_PropAccess && parent instanceof AST_PropAccess) {
    return self2;
  }
  let ev = self2.evaluate(compressor);
  if (ev !== self2) {
    ev = make_node_from_constant(ev, self2).optimize(compressor);
    return best_of(compressor, ev, self2);
  }
  return self2;
});
function literals_in_boolean_context(self2, compressor) {
  if (compressor.in_boolean_context()) {
    return best_of(compressor, self2, make_sequence(self2, [
      self2,
      make_node(AST_True, self2)
    ]).optimize(compressor));
  }
  return self2;
}
function inline_array_like_spread(elements) {
  for (var i = 0;i < elements.length; i++) {
    var el = elements[i];
    if (el instanceof AST_Expansion) {
      var expr = el.expression;
      if (expr instanceof AST_Array && !expr.elements.some((elm) => elm instanceof AST_Hole)) {
        elements.splice(i, 1, ...expr.elements);
        i--;
      }
    }
  }
}
def_optimize(AST_Array, function(self2, compressor) {
  var optimized = literals_in_boolean_context(self2, compressor);
  if (optimized !== self2) {
    return optimized;
  }
  inline_array_like_spread(self2.elements);
  return self2;
});
function inline_object_prop_spread(props) {
  for (var i = 0;i < props.length; i++) {
    var prop = props[i];
    if (prop instanceof AST_Expansion) {
      const expr = prop.expression;
      if (expr instanceof AST_Object && expr.properties.every((prop2) => prop2 instanceof AST_ObjectKeyVal)) {
        props.splice(i, 1, ...expr.properties);
        i--;
      } else if ((expr instanceof AST_Constant || expr.is_constant()) && !(expr instanceof AST_String)) {
        props.splice(i, 1);
        i--;
      }
    }
  }
}
def_optimize(AST_Object, function(self2, compressor) {
  var optimized = literals_in_boolean_context(self2, compressor);
  if (optimized !== self2) {
    return optimized;
  }
  inline_object_prop_spread(self2.properties);
  return self2;
});
def_optimize(AST_RegExp, literals_in_boolean_context);
def_optimize(AST_Return, function(self2, compressor) {
  if (self2.value && is_undefined(self2.value, compressor)) {
    self2.value = null;
  }
  return self2;
});
def_optimize(AST_Arrow, opt_AST_Lambda);
def_optimize(AST_Function, function(self2, compressor) {
  self2 = opt_AST_Lambda(self2, compressor);
  if (compressor.option("unsafe_arrows") && compressor.option("ecma") >= 2015 && !self2.name && !self2.is_generator && !self2.uses_arguments && !self2.pinned()) {
    const uses_this = walk(self2, (node) => {
      if (node instanceof AST_This)
        return walk_abort;
    });
    if (!uses_this)
      return make_node(AST_Arrow, self2, self2).optimize(compressor);
  }
  return self2;
});
def_optimize(AST_Class, function(self2) {
  for (let i = 0;i < self2.properties.length; i++) {
    const prop = self2.properties[i];
    if (prop instanceof AST_ClassStaticBlock && prop.body.length == 0) {
      self2.properties.splice(i, 1);
      i--;
    }
  }
  return self2;
});
def_optimize(AST_ClassStaticBlock, function(self2, compressor) {
  tighten_body(self2.body, compressor);
  return self2;
});
def_optimize(AST_Yield, function(self2, compressor) {
  if (self2.expression && !self2.is_star && is_undefined(self2.expression, compressor)) {
    self2.expression = null;
  }
  return self2;
});
def_optimize(AST_TemplateString, function(self2, compressor) {
  if (!compressor.option("evaluate") || compressor.parent() instanceof AST_PrefixedTemplateString) {
    return self2;
  }
  var segments = [];
  for (var i = 0;i < self2.segments.length; i++) {
    var segment = self2.segments[i];
    if (segment instanceof AST_Node) {
      var result = segment.evaluate(compressor);
      if (result !== segment && (result + "").length <= segment.size() + "${}".length) {
        segments[segments.length - 1].value = segments[segments.length - 1].value + result + self2.segments[++i].value;
        continue;
      }
      if (segment instanceof AST_TemplateString) {
        var inners = segment.segments;
        segments[segments.length - 1].value += inners[0].value;
        for (var j = 1;j < inners.length; j++) {
          segment = inners[j];
          segments.push(segment);
        }
        continue;
      }
    }
    segments.push(segment);
  }
  self2.segments = segments;
  if (segments.length == 1) {
    return make_node(AST_String, self2, segments[0]);
  }
  if (segments.length === 3 && segments[1] instanceof AST_Node && (segments[1].is_string(compressor) || segments[1].is_number_or_bigint(compressor) || is_nullish(segments[1], compressor) || compressor.option("unsafe"))) {
    if (segments[2].value === "") {
      return make_node(AST_Binary, self2, {
        operator: "+",
        left: make_node(AST_String, self2, {
          value: segments[0].value
        }),
        right: segments[1]
      });
    }
    if (segments[0].value === "") {
      return make_node(AST_Binary, self2, {
        operator: "+",
        left: segments[1],
        right: make_node(AST_String, self2, {
          value: segments[2].value
        })
      });
    }
  }
  return self2;
});
def_optimize(AST_PrefixedTemplateString, function(self2) {
  return self2;
});
function lift_key(self2, compressor) {
  if (!compressor.option("computed_props"))
    return self2;
  if (!(self2.key instanceof AST_Constant))
    return self2;
  if (self2.key instanceof AST_String || self2.key instanceof AST_Number) {
    const key = self2.key.value.toString();
    if (key === "__proto__")
      return self2;
    if (key == "constructor" && compressor.parent() instanceof AST_Class)
      return self2;
    if (self2 instanceof AST_ObjectKeyVal) {
      self2.quote = self2.key.quote;
      self2.key = key;
    } else if (self2 instanceof AST_ClassProperty) {
      self2.quote = self2.key.quote;
      self2.key = make_node(AST_SymbolClassProperty, self2.key, {
        name: key
      });
    } else {
      self2.quote = self2.key.quote;
      self2.key = make_node(AST_SymbolMethod, self2.key, {
        name: key
      });
    }
  }
  return self2;
}
def_optimize(AST_ObjectProperty, lift_key);
def_optimize(AST_ConciseMethod, function(self2, compressor) {
  lift_key(self2, compressor);
  if (compressor.option("arrows") && compressor.parent() instanceof AST_Object && !self2.value.is_generator && !self2.value.uses_arguments && !self2.value.pinned() && self2.value.body.length == 1 && self2.value.body[0] instanceof AST_Return && self2.value.body[0].value && !self2.value.contains_this()) {
    var arrow = make_node(AST_Arrow, self2.value, self2.value);
    arrow.async = self2.value.async;
    arrow.is_generator = self2.value.is_generator;
    return make_node(AST_ObjectKeyVal, self2, {
      key: self2.key instanceof AST_SymbolMethod ? self2.key.name : self2.key,
      value: arrow,
      quote: self2.quote
    });
  }
  return self2;
});
def_optimize(AST_ObjectKeyVal, function(self2, compressor) {
  lift_key(self2, compressor);
  var unsafe_methods = compressor.option("unsafe_methods");
  if (unsafe_methods && compressor.option("ecma") >= 2015 && (!(unsafe_methods instanceof RegExp) || unsafe_methods.test(self2.key + ""))) {
    var key = self2.key;
    var value = self2.value;
    var is_arrow_with_block = value instanceof AST_Arrow && Array.isArray(value.body) && !value.contains_this();
    if ((is_arrow_with_block || value instanceof AST_Function) && !value.name) {
      return make_node(AST_ConciseMethod, self2, {
        key: key instanceof AST_Node ? key : make_node(AST_SymbolMethod, self2, {
          name: key
        }),
        value: make_node(AST_Accessor, value, value),
        quote: self2.quote
      });
    }
  }
  return self2;
});
def_optimize(AST_Destructuring, function(self2, compressor) {
  if (compressor.option("pure_getters") == true && compressor.option("unused") && !self2.is_array && Array.isArray(self2.names) && !is_destructuring_export_decl(compressor) && !(self2.names[self2.names.length - 1] instanceof AST_Expansion)) {
    var keep = [];
    for (var i = 0;i < self2.names.length; i++) {
      var elem = self2.names[i];
      if (!(elem instanceof AST_ObjectKeyVal && typeof elem.key == "string" && elem.value instanceof AST_SymbolDeclaration && !should_retain(compressor, elem.value.definition()))) {
        keep.push(elem);
      }
    }
    if (keep.length != self2.names.length) {
      self2.names = keep;
    }
  }
  return self2;
  function is_destructuring_export_decl(compressor2) {
    var ancestors = [/^VarDef$/, /^(Const|Let|Var)$/, /^Export$/];
    for (var a = 0, p = 0, len = ancestors.length;a < len; p++) {
      var parent = compressor2.parent(p);
      if (!parent)
        return false;
      if (a === 0 && parent.TYPE == "Destructuring")
        continue;
      if (!ancestors[a].test(parent.TYPE)) {
        return false;
      }
      a++;
    }
    return true;
  }
  function should_retain(compressor2, def) {
    if (def.references.length)
      return true;
    if (!def.global)
      return false;
    if (compressor2.toplevel.vars) {
      if (compressor2.top_retain) {
        return compressor2.top_retain(def);
      }
      return false;
    }
    return true;
  }
});

// node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0;i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c;
  charToInt[c] = i;
}
var bufLength = 1024 * 16;

// node_modules/@jridgewell/trace-mapping/dist/trace-mapping.mjs
var import_resolve_uri = __toESM(require_resolve_uri_umd(), 1);
// src/TestColliderMerge.ts
var game = new Game({
  name: "My game",
  canvas: "can",
  width: window.innerWidth,
  height: window.innerHeight,
  showFrameStats: "PERFORMANCE_HUD"
});
var s1 = new Scene({
  name: "S1"
});
var l1 = new Layer({
  name: "L1"
});
s1.addChild(l1);
game.addChild(s1);
for (let x = 0;x < 59; x++) {
  for (let y = 0;y < 59; y++) {
    if ((x == 0 || y === 0) && Math.random() > 0.2)
      continue;
    const testObject = new GameObject({
      name: `Test Object (${x + 1}, ${y + 1})`
    });
    const testTransform = new Transform({
      position: new Vector(30 + x * 80, 500 + y * 80),
      rotation: 0,
      scale: Vector.From(1)
    });
    const boxCollider = new BoxCollider({
      width: 80,
      height: 80,
      tag: "testObjects"
    });
    const colorRender = new ColorRender({
      color: `red`,
      width: 50,
      height: 50
    });
    testObject.addChildren(testTransform, boxCollider, colorRender);
    l1.addChild(testObject);
  }
}
for (let x = 0;x < 10; x++) {
  const testObject = new GameObject({
    name: `Test D- Object (${x + 1})`
  });
  const testTransform = new Transform({
    position: new Vector(300 + x * 25, 100 + x * 25),
    rotation: 0,
    scale: Vector.From(1)
  });
  const colorRender = new ColorRender({
    color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
    width: 50,
    height: 50
  });
  const boxCollider = new BoxCollider({
    width: 50,
    height: 50,
    tag: "testObjects"
  });
  testObject.addChildren(testTransform, boxCollider, colorRender);
  l1.addChild(testObject);
}
var input = new Input({
  key: () => {},
  keyup: () => {},
  mousemove: () => {},
  click: () => {}
});
s1.addChild(input);

class CollisionColorChanger extends Part {
  collider;
  renderer;
  originalColor = "blue";
  onMount(part) {
    super.onMount(part);
    this.collider = this.siblingOf("Collider");
    console.log(this.collider);
    this.renderer = this.sibling("ColorRender");
    console.log(this.renderer);
    if (this.renderer) {
      this.originalColor = this.renderer.color;
    }
  }
  act(delta) {
    super.act(delta);
    if (this.collider && this.renderer) {
      if (this.collider.colliding) {
        this.renderer.color = "red";
      } else {
        this.renderer.color = this.originalColor;
      }
    }
  }
}
var player = new GameObject({
  name: "Player"
});
var playerTransform = new Transform({
  position: new Vector(100, 100)
});
var playerCollider = new BoxCollider({
  width: 50,
  height: 50
});
var playerRenderer = new ColorRender({
  width: 50,
  height: 50,
  color: "blue"
});
var playerMovement = new CharacterMovement({
  speed: 5,
  input
});
var colorChanger = new CollisionColorChanger;
player.addChildren(playerTransform, playerCollider, playerRenderer, playerMovement, colorChanger);
l1.addChild(player);
console.log(game);
game.start(s1);
