var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node:stream
var exports_stream = {};
__export(exports_stream, {
  default: () => Ih
});
var pu, _t, yu, bu, wu, gu, kn = (e, t) => () => (e && (t = e(e = 0)), t), S = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), or = (e, t) => {
  for (var r in t)
    _t(e, r, { get: t[r], enumerable: true });
}, gt = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of bu(t))
      !gu.call(e, i) && i !== r && _t(e, i, { get: () => t[i], enumerable: !(n = yu(t, i)) || n.enumerable });
  return e;
}, pe = (e, t, r) => (gt(e, t, "default"), r && gt(r, t, "default")), rt = (e, t, r) => (r = e != null ? pu(wu(e)) : {}, gt(t || !e || !e.__esModule ? _t(r, "default", { value: e, enumerable: true }) : r, e)), ye = (e) => gt(_t({}, "__esModule", { value: true }), e), Pn, qn, le, I, wr, O, We, it, q, He, Br, H, aa, we, Z, ae, Be, Dt, ot, So, lt, Bo, Fo, Mo, vt, Co, Gr, at, zt, Bl, re, hn, yn, Zt, In, ru, Nn, Fn, Cn, wt, Ih;
var init_stream = __esm(() => {
  pu = Object.create;
  _t = Object.defineProperty;
  yu = Object.getOwnPropertyDescriptor;
  bu = Object.getOwnPropertyNames;
  wu = Object.getPrototypeOf;
  gu = Object.prototype.hasOwnProperty;
  Pn = S((Et) => {
    Et.byteLength = Eu;
    Et.toByteArray = mu;
    Et.fromByteArray = xu;
    var K = [], $ = [], _u = typeof Uint8Array < "u" ? Uint8Array : Array, lr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (me = 0, Dn = lr.length;me < Dn; ++me)
      K[me] = lr[me], $[lr.charCodeAt(me)] = me;
    var me, Dn;
    $[45] = 62;
    $[95] = 63;
    function On(e) {
      var t = e.length;
      if (t % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var r = e.indexOf("=");
      r === -1 && (r = t);
      var n = r === t ? 0 : 4 - r % 4;
      return [r, n];
    }
    function Eu(e) {
      var t = On(e), r = t[0], n = t[1];
      return (r + n) * 3 / 4 - n;
    }
    function Su(e, t, r) {
      return (t + r) * 3 / 4 - r;
    }
    function mu(e) {
      var t, r = On(e), n = r[0], i = r[1], o = new _u(Su(e, n, i)), l = 0, u = i > 0 ? n - 4 : n, a;
      for (a = 0;a < u; a += 4)
        t = $[e.charCodeAt(a)] << 18 | $[e.charCodeAt(a + 1)] << 12 | $[e.charCodeAt(a + 2)] << 6 | $[e.charCodeAt(a + 3)], o[l++] = t >> 16 & 255, o[l++] = t >> 8 & 255, o[l++] = t & 255;
      return i === 2 && (t = $[e.charCodeAt(a)] << 2 | $[e.charCodeAt(a + 1)] >> 4, o[l++] = t & 255), i === 1 && (t = $[e.charCodeAt(a)] << 10 | $[e.charCodeAt(a + 1)] << 4 | $[e.charCodeAt(a + 2)] >> 2, o[l++] = t >> 8 & 255, o[l++] = t & 255), o;
    }
    function Ru(e) {
      return K[e >> 18 & 63] + K[e >> 12 & 63] + K[e >> 6 & 63] + K[e & 63];
    }
    function Au(e, t, r) {
      for (var n, i = [], o = t;o < r; o += 3)
        n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (e[o + 2] & 255), i.push(Ru(n));
      return i.join("");
    }
    function xu(e) {
      for (var t, r = e.length, n = r % 3, i = [], o = 16383, l = 0, u = r - n;l < u; l += o)
        i.push(Au(e, l, l + o > u ? u : l + o));
      return n === 1 ? (t = e[r - 1], i.push(K[t >> 2] + K[t << 4 & 63] + "==")) : n === 2 && (t = (e[r - 2] << 8) + e[r - 1], i.push(K[t >> 10] + K[t >> 4 & 63] + K[t << 2 & 63] + "=")), i.join("");
    }
  });
  qn = S((ur) => {
    ur.read = function(e, t, r, n, i) {
      var o, l, u = i * 8 - n - 1, a = (1 << u) - 1, s = a >> 1, c = -7, d = r ? i - 1 : 0, y = r ? -1 : 1, h = e[t + d];
      for (d += y, o = h & (1 << -c) - 1, h >>= -c, c += u;c > 0; o = o * 256 + e[t + d], d += y, c -= 8)
        ;
      for (l = o & (1 << -c) - 1, o >>= -c, c += n;c > 0; l = l * 256 + e[t + d], d += y, c -= 8)
        ;
      if (o === 0)
        o = 1 - s;
      else {
        if (o === a)
          return l ? NaN : (h ? -1 : 1) * (1 / 0);
        l = l + Math.pow(2, n), o = o - s;
      }
      return (h ? -1 : 1) * l * Math.pow(2, o - n);
    };
    ur.write = function(e, t, r, n, i, o) {
      var l, u, a, s = o * 8 - i - 1, c = (1 << s) - 1, d = c >> 1, y = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = n ? 0 : o - 1, _ = n ? 1 : -1, p = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
      for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, l = c) : (l = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -l)) < 1 && (l--, a *= 2), l + d >= 1 ? t += y / a : t += y * Math.pow(2, 1 - d), t * a >= 2 && (l++, a /= 2), l + d >= c ? (u = 0, l = c) : l + d >= 1 ? (u = (t * a - 1) * Math.pow(2, i), l = l + d) : (u = t * Math.pow(2, d - 1) * Math.pow(2, i), l = 0));i >= 8; e[r + h] = u & 255, h += _, u /= 256, i -= 8)
        ;
      for (l = l << i | u, s += i;s > 0; e[r + h] = l & 255, h += _, l /= 256, s -= 8)
        ;
      e[r + h - _] |= p * 128;
    };
  });
  le = S((Ue) => {
    var sr = Pn(), qe = qn(), vn = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    Ue.Buffer = f;
    Ue.SlowBuffer = Fu;
    Ue.INSPECT_MAX_BYTES = 50;
    var St = 2147483647;
    Ue.kMaxLength = St;
    f.TYPED_ARRAY_SUPPORT = Iu();
    !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    function Iu() {
      try {
        let e = new Uint8Array(1), t = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), e.foo() === 42;
      } catch {
        return false;
      }
    }
    Object.defineProperty(f.prototype, "parent", { enumerable: true, get: function() {
      if (!!f.isBuffer(this))
        return this.buffer;
    } });
    Object.defineProperty(f.prototype, "offset", { enumerable: true, get: function() {
      if (!!f.isBuffer(this))
        return this.byteOffset;
    } });
    function oe(e) {
      if (e > St)
        throw new RangeError('The value "' + e + '" is invalid for option "size"');
      let t = new Uint8Array(e);
      return Object.setPrototypeOf(t, f.prototype), t;
    }
    function f(e, t, r) {
      if (typeof e == "number") {
        if (typeof t == "string")
          throw new TypeError('The "string" argument must be of type string. Received type number');
        return dr(e);
      }
      return jn(e, t, r);
    }
    f.poolSize = 8192;
    function jn(e, t, r) {
      if (typeof e == "string")
        return Bu(e, t);
      if (ArrayBuffer.isView(e))
        return Lu(e);
      if (e == null)
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
      if (z(e, ArrayBuffer) || e && z(e.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (z(e, SharedArrayBuffer) || e && z(e.buffer, SharedArrayBuffer)))
        return fr(e, t, r);
      if (typeof e == "number")
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      let n = e.valueOf && e.valueOf();
      if (n != null && n !== e)
        return f.from(n, t, r);
      let i = Nu(e);
      if (i)
        return i;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof e[Symbol.toPrimitive] == "function")
        return f.from(e[Symbol.toPrimitive]("string"), t, r);
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
    }
    f.from = function(e, t, r) {
      return jn(e, t, r);
    };
    Object.setPrototypeOf(f.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(f, Uint8Array);
    function Hn(e) {
      if (typeof e != "number")
        throw new TypeError('"size" argument must be of type number');
      if (e < 0)
        throw new RangeError('The value "' + e + '" is invalid for option "size"');
    }
    function Tu(e, t, r) {
      return Hn(e), e <= 0 ? oe(e) : t !== undefined ? typeof r == "string" ? oe(e).fill(t, r) : oe(e).fill(t) : oe(e);
    }
    f.alloc = function(e, t, r) {
      return Tu(e, t, r);
    };
    function dr(e) {
      return Hn(e), oe(e < 0 ? 0 : hr(e) | 0);
    }
    f.allocUnsafe = function(e) {
      return dr(e);
    };
    f.allocUnsafeSlow = function(e) {
      return dr(e);
    };
    function Bu(e, t) {
      if ((typeof t != "string" || t === "") && (t = "utf8"), !f.isEncoding(t))
        throw new TypeError("Unknown encoding: " + t);
      let r = Gn(e, t) | 0, n = oe(r), i = n.write(e, t);
      return i !== r && (n = n.slice(0, i)), n;
    }
    function ar(e) {
      let t = e.length < 0 ? 0 : hr(e.length) | 0, r = oe(t);
      for (let n = 0;n < t; n += 1)
        r[n] = e[n] & 255;
      return r;
    }
    function Lu(e) {
      if (z(e, Uint8Array)) {
        let t = new Uint8Array(e);
        return fr(t.buffer, t.byteOffset, t.byteLength);
      }
      return ar(e);
    }
    function fr(e, t, r) {
      if (t < 0 || e.byteLength < t)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (e.byteLength < t + (r || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let n;
      return t === undefined && r === undefined ? n = new Uint8Array(e) : r === undefined ? n = new Uint8Array(e, t) : n = new Uint8Array(e, t, r), Object.setPrototypeOf(n, f.prototype), n;
    }
    function Nu(e) {
      if (f.isBuffer(e)) {
        let t = hr(e.length) | 0, r = oe(t);
        return r.length === 0 || e.copy(r, 0, 0, t), r;
      }
      if (e.length !== undefined)
        return typeof e.length != "number" || yr(e.length) ? oe(0) : ar(e);
      if (e.type === "Buffer" && Array.isArray(e.data))
        return ar(e.data);
    }
    function hr(e) {
      if (e >= St)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + St.toString(16) + " bytes");
      return e | 0;
    }
    function Fu(e) {
      return +e != e && (e = 0), f.alloc(+e);
    }
    f.isBuffer = function(t) {
      return t != null && t._isBuffer === true && t !== f.prototype;
    };
    f.compare = function(t, r) {
      if (z(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), z(r, Uint8Array) && (r = f.from(r, r.offset, r.byteLength)), !f.isBuffer(t) || !f.isBuffer(r))
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (t === r)
        return 0;
      let n = t.length, i = r.length;
      for (let o = 0, l = Math.min(n, i);o < l; ++o)
        if (t[o] !== r[o]) {
          n = t[o], i = r[o];
          break;
        }
      return n < i ? -1 : i < n ? 1 : 0;
    };
    f.isEncoding = function(t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    f.concat = function(t, r) {
      if (!Array.isArray(t))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (t.length === 0)
        return f.alloc(0);
      let n;
      if (r === undefined)
        for (r = 0, n = 0;n < t.length; ++n)
          r += t[n].length;
      let i = f.allocUnsafe(r), o = 0;
      for (n = 0;n < t.length; ++n) {
        let l = t[n];
        if (z(l, Uint8Array))
          o + l.length > i.length ? (f.isBuffer(l) || (l = f.from(l)), l.copy(i, o)) : Uint8Array.prototype.set.call(i, l, o);
        else if (f.isBuffer(l))
          l.copy(i, o);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        o += l.length;
      }
      return i;
    };
    function Gn(e, t) {
      if (f.isBuffer(e))
        return e.length;
      if (ArrayBuffer.isView(e) || z(e, ArrayBuffer))
        return e.byteLength;
      if (typeof e != "string")
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
      let r = e.length, n = arguments.length > 2 && arguments[2] === true;
      if (!n && r === 0)
        return 0;
      let i = false;
      for (;; )
        switch (t) {
          case "ascii":
          case "latin1":
          case "binary":
            return r;
          case "utf8":
          case "utf-8":
            return cr(e).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return r * 2;
          case "hex":
            return r >>> 1;
          case "base64":
            return ei(e).length;
          default:
            if (i)
              return n ? -1 : cr(e).length;
            t = ("" + t).toLowerCase(), i = true;
        }
    }
    f.byteLength = Gn;
    function Mu(e, t, r) {
      let n = false;
      if ((t === undefined || t < 0) && (t = 0), t > this.length || ((r === undefined || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, t >>>= 0, r <= t))
        return "";
      for (e || (e = "utf8");; )
        switch (e) {
          case "hex":
            return $u(this, t, r);
          case "utf8":
          case "utf-8":
            return Yn(this, t, r);
          case "ascii":
            return Uu(this, t, r);
          case "latin1":
          case "binary":
            return Wu(this, t, r);
          case "base64":
            return qu(this, t, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ju(this, t, r);
          default:
            if (n)
              throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), n = true;
        }
    }
    f.prototype._isBuffer = true;
    function Re(e, t, r) {
      let n = e[t];
      e[t] = e[r], e[r] = n;
    }
    f.prototype.swap16 = function() {
      let t = this.length;
      if (t % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let r = 0;r < t; r += 2)
        Re(this, r, r + 1);
      return this;
    };
    f.prototype.swap32 = function() {
      let t = this.length;
      if (t % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let r = 0;r < t; r += 4)
        Re(this, r, r + 3), Re(this, r + 1, r + 2);
      return this;
    };
    f.prototype.swap64 = function() {
      let t = this.length;
      if (t % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let r = 0;r < t; r += 8)
        Re(this, r, r + 7), Re(this, r + 1, r + 6), Re(this, r + 2, r + 5), Re(this, r + 3, r + 4);
      return this;
    };
    f.prototype.toString = function() {
      let t = this.length;
      return t === 0 ? "" : arguments.length === 0 ? Yn(this, 0, t) : Mu.apply(this, arguments);
    };
    f.prototype.toLocaleString = f.prototype.toString;
    f.prototype.equals = function(t) {
      if (!f.isBuffer(t))
        throw new TypeError("Argument must be a Buffer");
      return this === t ? true : f.compare(this, t) === 0;
    };
    f.prototype.inspect = function() {
      let t = "", r = Ue.INSPECT_MAX_BYTES;
      return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (t += " ... "), "<Buffer " + t + ">";
    };
    vn && (f.prototype[vn] = f.prototype.inspect);
    f.prototype.compare = function(t, r, n, i, o) {
      if (z(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), !f.isBuffer(t))
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
      if (r === undefined && (r = 0), n === undefined && (n = t ? t.length : 0), i === undefined && (i = 0), o === undefined && (o = this.length), r < 0 || n > t.length || i < 0 || o > this.length)
        throw new RangeError("out of range index");
      if (i >= o && r >= n)
        return 0;
      if (i >= o)
        return -1;
      if (r >= n)
        return 1;
      if (r >>>= 0, n >>>= 0, i >>>= 0, o >>>= 0, this === t)
        return 0;
      let l = o - i, u = n - r, a = Math.min(l, u), s = this.slice(i, o), c = t.slice(r, n);
      for (let d = 0;d < a; ++d)
        if (s[d] !== c[d]) {
          l = s[d], u = c[d];
          break;
        }
      return l < u ? -1 : u < l ? 1 : 0;
    };
    function Vn(e, t, r, n, i) {
      if (e.length === 0)
        return -1;
      if (typeof r == "string" ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, yr(r) && (r = i ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
        if (i)
          return -1;
        r = e.length - 1;
      } else if (r < 0)
        if (i)
          r = 0;
        else
          return -1;
      if (typeof t == "string" && (t = f.from(t, n)), f.isBuffer(t))
        return t.length === 0 ? -1 : Un(e, t, r, n, i);
      if (typeof t == "number")
        return t = t & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : Un(e, [t], r, n, i);
      throw new TypeError("val must be string, number or Buffer");
    }
    function Un(e, t, r, n, i) {
      let o = 1, l = e.length, u = t.length;
      if (n !== undefined && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
        if (e.length < 2 || t.length < 2)
          return -1;
        o = 2, l /= 2, u /= 2, r /= 2;
      }
      function a(c, d) {
        return o === 1 ? c[d] : c.readUInt16BE(d * o);
      }
      let s;
      if (i) {
        let c = -1;
        for (s = r;s < l; s++)
          if (a(e, s) === a(t, c === -1 ? 0 : s - c)) {
            if (c === -1 && (c = s), s - c + 1 === u)
              return c * o;
          } else
            c !== -1 && (s -= s - c), c = -1;
      } else
        for (r + u > l && (r = l - u), s = r;s >= 0; s--) {
          let c = true;
          for (let d = 0;d < u; d++)
            if (a(e, s + d) !== a(t, d)) {
              c = false;
              break;
            }
          if (c)
            return s;
        }
      return -1;
    }
    f.prototype.includes = function(t, r, n) {
      return this.indexOf(t, r, n) !== -1;
    };
    f.prototype.indexOf = function(t, r, n) {
      return Vn(this, t, r, n, true);
    };
    f.prototype.lastIndexOf = function(t, r, n) {
      return Vn(this, t, r, n, false);
    };
    function Cu(e, t, r, n) {
      r = Number(r) || 0;
      let i = e.length - r;
      n ? (n = Number(n), n > i && (n = i)) : n = i;
      let o = t.length;
      n > o / 2 && (n = o / 2);
      let l;
      for (l = 0;l < n; ++l) {
        let u = parseInt(t.substr(l * 2, 2), 16);
        if (yr(u))
          return l;
        e[r + l] = u;
      }
      return l;
    }
    function ku(e, t, r, n) {
      return mt(cr(t, e.length - r), e, r, n);
    }
    function Du(e, t, r, n) {
      return mt(Yu(t), e, r, n);
    }
    function Ou(e, t, r, n) {
      return mt(ei(t), e, r, n);
    }
    function Pu(e, t, r, n) {
      return mt(Ku(t, e.length - r), e, r, n);
    }
    f.prototype.write = function(t, r, n, i) {
      if (r === undefined)
        i = "utf8", n = this.length, r = 0;
      else if (n === undefined && typeof r == "string")
        i = r, n = this.length, r = 0;
      else if (isFinite(r))
        r = r >>> 0, isFinite(n) ? (n = n >>> 0, i === undefined && (i = "utf8")) : (i = n, n = undefined);
      else
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      let o = this.length - r;
      if ((n === undefined || n > o) && (n = o), t.length > 0 && (n < 0 || r < 0) || r > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      i || (i = "utf8");
      let l = false;
      for (;; )
        switch (i) {
          case "hex":
            return Cu(this, t, r, n);
          case "utf8":
          case "utf-8":
            return ku(this, t, r, n);
          case "ascii":
          case "latin1":
          case "binary":
            return Du(this, t, r, n);
          case "base64":
            return Ou(this, t, r, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Pu(this, t, r, n);
          default:
            if (l)
              throw new TypeError("Unknown encoding: " + i);
            i = ("" + i).toLowerCase(), l = true;
        }
    };
    f.prototype.toJSON = function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    };
    function qu(e, t, r) {
      return t === 0 && r === e.length ? sr.fromByteArray(e) : sr.fromByteArray(e.slice(t, r));
    }
    function Yn(e, t, r) {
      r = Math.min(e.length, r);
      let n = [], i = t;
      for (;i < r; ) {
        let o = e[i], l = null, u = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
        if (i + u <= r) {
          let a, s, c, d;
          switch (u) {
            case 1:
              o < 128 && (l = o);
              break;
            case 2:
              a = e[i + 1], (a & 192) === 128 && (d = (o & 31) << 6 | a & 63, d > 127 && (l = d));
              break;
            case 3:
              a = e[i + 1], s = e[i + 2], (a & 192) === 128 && (s & 192) === 128 && (d = (o & 15) << 12 | (a & 63) << 6 | s & 63, d > 2047 && (d < 55296 || d > 57343) && (l = d));
              break;
            case 4:
              a = e[i + 1], s = e[i + 2], c = e[i + 3], (a & 192) === 128 && (s & 192) === 128 && (c & 192) === 128 && (d = (o & 15) << 18 | (a & 63) << 12 | (s & 63) << 6 | c & 63, d > 65535 && d < 1114112 && (l = d));
          }
        }
        l === null ? (l = 65533, u = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), n.push(l), i += u;
      }
      return vu(n);
    }
    var Wn = 4096;
    function vu(e) {
      let t = e.length;
      if (t <= Wn)
        return String.fromCharCode.apply(String, e);
      let r = "", n = 0;
      for (;n < t; )
        r += String.fromCharCode.apply(String, e.slice(n, n += Wn));
      return r;
    }
    function Uu(e, t, r) {
      let n = "";
      r = Math.min(e.length, r);
      for (let i = t;i < r; ++i)
        n += String.fromCharCode(e[i] & 127);
      return n;
    }
    function Wu(e, t, r) {
      let n = "";
      r = Math.min(e.length, r);
      for (let i = t;i < r; ++i)
        n += String.fromCharCode(e[i]);
      return n;
    }
    function $u(e, t, r) {
      let n = e.length;
      (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
      let i = "";
      for (let o = t;o < r; ++o)
        i += zu[e[o]];
      return i;
    }
    function ju(e, t, r) {
      let n = e.slice(t, r), i = "";
      for (let o = 0;o < n.length - 1; o += 2)
        i += String.fromCharCode(n[o] + n[o + 1] * 256);
      return i;
    }
    f.prototype.slice = function(t, r) {
      let n = this.length;
      t = ~~t, r = r === undefined ? n : ~~r, t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), r < t && (r = t);
      let i = this.subarray(t, r);
      return Object.setPrototypeOf(i, f.prototype), i;
    };
    function k(e, t, r) {
      if (e % 1 !== 0 || e < 0)
        throw new RangeError("offset is not uint");
      if (e + t > r)
        throw new RangeError("Trying to access beyond buffer length");
    }
    f.prototype.readUintLE = f.prototype.readUIntLE = function(t, r, n) {
      t = t >>> 0, r = r >>> 0, n || k(t, r, this.length);
      let i = this[t], o = 1, l = 0;
      for (;++l < r && (o *= 256); )
        i += this[t + l] * o;
      return i;
    };
    f.prototype.readUintBE = f.prototype.readUIntBE = function(t, r, n) {
      t = t >>> 0, r = r >>> 0, n || k(t, r, this.length);
      let i = this[t + --r], o = 1;
      for (;r > 0 && (o *= 256); )
        i += this[t + --r] * o;
      return i;
    };
    f.prototype.readUint8 = f.prototype.readUInt8 = function(t, r) {
      return t = t >>> 0, r || k(t, 1, this.length), this[t];
    };
    f.prototype.readUint16LE = f.prototype.readUInt16LE = function(t, r) {
      return t = t >>> 0, r || k(t, 2, this.length), this[t] | this[t + 1] << 8;
    };
    f.prototype.readUint16BE = f.prototype.readUInt16BE = function(t, r) {
      return t = t >>> 0, r || k(t, 2, this.length), this[t] << 8 | this[t + 1];
    };
    f.prototype.readUint32LE = f.prototype.readUInt32LE = function(t, r) {
      return t = t >>> 0, r || k(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
    };
    f.prototype.readUint32BE = f.prototype.readUInt32BE = function(t, r) {
      return t = t >>> 0, r || k(t, 4, this.length), this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
    };
    f.prototype.readBigUInt64LE = be(function(t) {
      t = t >>> 0, ve(t, "offset");
      let r = this[t], n = this[t + 7];
      (r === undefined || n === undefined) && nt(t, this.length - 8);
      let i = r + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24, o = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + n * 2 ** 24;
      return BigInt(i) + (BigInt(o) << BigInt(32));
    });
    f.prototype.readBigUInt64BE = be(function(t) {
      t = t >>> 0, ve(t, "offset");
      let r = this[t], n = this[t + 7];
      (r === undefined || n === undefined) && nt(t, this.length - 8);
      let i = r * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t], o = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + n;
      return (BigInt(i) << BigInt(32)) + BigInt(o);
    });
    f.prototype.readIntLE = function(t, r, n) {
      t = t >>> 0, r = r >>> 0, n || k(t, r, this.length);
      let i = this[t], o = 1, l = 0;
      for (;++l < r && (o *= 256); )
        i += this[t + l] * o;
      return o *= 128, i >= o && (i -= Math.pow(2, 8 * r)), i;
    };
    f.prototype.readIntBE = function(t, r, n) {
      t = t >>> 0, r = r >>> 0, n || k(t, r, this.length);
      let i = r, o = 1, l = this[t + --i];
      for (;i > 0 && (o *= 256); )
        l += this[t + --i] * o;
      return o *= 128, l >= o && (l -= Math.pow(2, 8 * r)), l;
    };
    f.prototype.readInt8 = function(t, r) {
      return t = t >>> 0, r || k(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
    };
    f.prototype.readInt16LE = function(t, r) {
      t = t >>> 0, r || k(t, 2, this.length);
      let n = this[t] | this[t + 1] << 8;
      return n & 32768 ? n | 4294901760 : n;
    };
    f.prototype.readInt16BE = function(t, r) {
      t = t >>> 0, r || k(t, 2, this.length);
      let n = this[t + 1] | this[t] << 8;
      return n & 32768 ? n | 4294901760 : n;
    };
    f.prototype.readInt32LE = function(t, r) {
      return t = t >>> 0, r || k(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
    };
    f.prototype.readInt32BE = function(t, r) {
      return t = t >>> 0, r || k(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
    };
    f.prototype.readBigInt64LE = be(function(t) {
      t = t >>> 0, ve(t, "offset");
      let r = this[t], n = this[t + 7];
      (r === undefined || n === undefined) && nt(t, this.length - 8);
      let i = this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (n << 24);
      return (BigInt(i) << BigInt(32)) + BigInt(r + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24);
    });
    f.prototype.readBigInt64BE = be(function(t) {
      t = t >>> 0, ve(t, "offset");
      let r = this[t], n = this[t + 7];
      (r === undefined || n === undefined) && nt(t, this.length - 8);
      let i = (r << 24) + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t];
      return (BigInt(i) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + n);
    });
    f.prototype.readFloatLE = function(t, r) {
      return t = t >>> 0, r || k(t, 4, this.length), qe.read(this, t, true, 23, 4);
    };
    f.prototype.readFloatBE = function(t, r) {
      return t = t >>> 0, r || k(t, 4, this.length), qe.read(this, t, false, 23, 4);
    };
    f.prototype.readDoubleLE = function(t, r) {
      return t = t >>> 0, r || k(t, 8, this.length), qe.read(this, t, true, 52, 8);
    };
    f.prototype.readDoubleBE = function(t, r) {
      return t = t >>> 0, r || k(t, 8, this.length), qe.read(this, t, false, 52, 8);
    };
    function U(e, t, r, n, i, o) {
      if (!f.isBuffer(e))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (t > i || t < o)
        throw new RangeError('"value" argument is out of bounds');
      if (r + n > e.length)
        throw new RangeError("Index out of range");
    }
    f.prototype.writeUintLE = f.prototype.writeUIntLE = function(t, r, n, i) {
      if (t = +t, r = r >>> 0, n = n >>> 0, !i) {
        let u = Math.pow(2, 8 * n) - 1;
        U(this, t, r, n, u, 0);
      }
      let o = 1, l = 0;
      for (this[r] = t & 255;++l < n && (o *= 256); )
        this[r + l] = t / o & 255;
      return r + n;
    };
    f.prototype.writeUintBE = f.prototype.writeUIntBE = function(t, r, n, i) {
      if (t = +t, r = r >>> 0, n = n >>> 0, !i) {
        let u = Math.pow(2, 8 * n) - 1;
        U(this, t, r, n, u, 0);
      }
      let o = n - 1, l = 1;
      for (this[r + o] = t & 255;--o >= 0 && (l *= 256); )
        this[r + o] = t / l & 255;
      return r + n;
    };
    f.prototype.writeUint8 = f.prototype.writeUInt8 = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 1, 255, 0), this[r] = t & 255, r + 1;
    };
    f.prototype.writeUint16LE = f.prototype.writeUInt16LE = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 2, 65535, 0), this[r] = t & 255, this[r + 1] = t >>> 8, r + 2;
    };
    f.prototype.writeUint16BE = f.prototype.writeUInt16BE = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 2, 65535, 0), this[r] = t >>> 8, this[r + 1] = t & 255, r + 2;
    };
    f.prototype.writeUint32LE = f.prototype.writeUInt32LE = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 4, 4294967295, 0), this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = t & 255, r + 4;
    };
    f.prototype.writeUint32BE = f.prototype.writeUInt32BE = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 4, 4294967295, 0), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = t & 255, r + 4;
    };
    function Kn(e, t, r, n, i) {
      Zn(t, n, i, e, r, 7);
      let o = Number(t & BigInt(4294967295));
      e[r++] = o, o = o >> 8, e[r++] = o, o = o >> 8, e[r++] = o, o = o >> 8, e[r++] = o;
      let l = Number(t >> BigInt(32) & BigInt(4294967295));
      return e[r++] = l, l = l >> 8, e[r++] = l, l = l >> 8, e[r++] = l, l = l >> 8, e[r++] = l, r;
    }
    function zn(e, t, r, n, i) {
      Zn(t, n, i, e, r, 7);
      let o = Number(t & BigInt(4294967295));
      e[r + 7] = o, o = o >> 8, e[r + 6] = o, o = o >> 8, e[r + 5] = o, o = o >> 8, e[r + 4] = o;
      let l = Number(t >> BigInt(32) & BigInt(4294967295));
      return e[r + 3] = l, l = l >> 8, e[r + 2] = l, l = l >> 8, e[r + 1] = l, l = l >> 8, e[r] = l, r + 8;
    }
    f.prototype.writeBigUInt64LE = be(function(t, r = 0) {
      return Kn(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    f.prototype.writeBigUInt64BE = be(function(t, r = 0) {
      return zn(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    f.prototype.writeIntLE = function(t, r, n, i) {
      if (t = +t, r = r >>> 0, !i) {
        let a = Math.pow(2, 8 * n - 1);
        U(this, t, r, n, a - 1, -a);
      }
      let o = 0, l = 1, u = 0;
      for (this[r] = t & 255;++o < n && (l *= 256); )
        t < 0 && u === 0 && this[r + o - 1] !== 0 && (u = 1), this[r + o] = (t / l >> 0) - u & 255;
      return r + n;
    };
    f.prototype.writeIntBE = function(t, r, n, i) {
      if (t = +t, r = r >>> 0, !i) {
        let a = Math.pow(2, 8 * n - 1);
        U(this, t, r, n, a - 1, -a);
      }
      let o = n - 1, l = 1, u = 0;
      for (this[r + o] = t & 255;--o >= 0 && (l *= 256); )
        t < 0 && u === 0 && this[r + o + 1] !== 0 && (u = 1), this[r + o] = (t / l >> 0) - u & 255;
      return r + n;
    };
    f.prototype.writeInt8 = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r] = t & 255, r + 1;
    };
    f.prototype.writeInt16LE = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 2, 32767, -32768), this[r] = t & 255, this[r + 1] = t >>> 8, r + 2;
    };
    f.prototype.writeInt16BE = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 2, 32767, -32768), this[r] = t >>> 8, this[r + 1] = t & 255, r + 2;
    };
    f.prototype.writeInt32LE = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 4, 2147483647, -2147483648), this[r] = t & 255, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24, r + 4;
    };
    f.prototype.writeInt32BE = function(t, r, n) {
      return t = +t, r = r >>> 0, n || U(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = t & 255, r + 4;
    };
    f.prototype.writeBigInt64LE = be(function(t, r = 0) {
      return Kn(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    f.prototype.writeBigInt64BE = be(function(t, r = 0) {
      return zn(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function Xn(e, t, r, n, i, o) {
      if (r + n > e.length)
        throw new RangeError("Index out of range");
      if (r < 0)
        throw new RangeError("Index out of range");
    }
    function Jn(e, t, r, n, i) {
      return t = +t, r = r >>> 0, i || Xn(e, t, r, 4, 340282346638528860000000000000000000000, -340282346638528860000000000000000000000), qe.write(e, t, r, n, 23, 4), r + 4;
    }
    f.prototype.writeFloatLE = function(t, r, n) {
      return Jn(this, t, r, true, n);
    };
    f.prototype.writeFloatBE = function(t, r, n) {
      return Jn(this, t, r, false, n);
    };
    function Qn(e, t, r, n, i) {
      return t = +t, r = r >>> 0, i || Xn(e, t, r, 8, 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000), qe.write(e, t, r, n, 52, 8), r + 8;
    }
    f.prototype.writeDoubleLE = function(t, r, n) {
      return Qn(this, t, r, true, n);
    };
    f.prototype.writeDoubleBE = function(t, r, n) {
      return Qn(this, t, r, false, n);
    };
    f.prototype.copy = function(t, r, n, i) {
      if (!f.isBuffer(t))
        throw new TypeError("argument should be a Buffer");
      if (n || (n = 0), !i && i !== 0 && (i = this.length), r >= t.length && (r = t.length), r || (r = 0), i > 0 && i < n && (i = n), i === n || t.length === 0 || this.length === 0)
        return 0;
      if (r < 0)
        throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length)
        throw new RangeError("Index out of range");
      if (i < 0)
        throw new RangeError("sourceEnd out of bounds");
      i > this.length && (i = this.length), t.length - r < i - n && (i = t.length - r + n);
      let o = i - n;
      return this === t && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(r, n, i) : Uint8Array.prototype.set.call(t, this.subarray(n, i), r), o;
    };
    f.prototype.fill = function(t, r, n, i) {
      if (typeof t == "string") {
        if (typeof r == "string" ? (i = r, r = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== undefined && typeof i != "string")
          throw new TypeError("encoding must be a string");
        if (typeof i == "string" && !f.isEncoding(i))
          throw new TypeError("Unknown encoding: " + i);
        if (t.length === 1) {
          let l = t.charCodeAt(0);
          (i === "utf8" && l < 128 || i === "latin1") && (t = l);
        }
      } else
        typeof t == "number" ? t = t & 255 : typeof t == "boolean" && (t = Number(t));
      if (r < 0 || this.length < r || this.length < n)
        throw new RangeError("Out of range index");
      if (n <= r)
        return this;
      r = r >>> 0, n = n === undefined ? this.length : n >>> 0, t || (t = 0);
      let o;
      if (typeof t == "number")
        for (o = r;o < n; ++o)
          this[o] = t;
      else {
        let l = f.isBuffer(t) ? t : f.from(t, i), u = l.length;
        if (u === 0)
          throw new TypeError('The value "' + t + '" is invalid for argument "value"');
        for (o = 0;o < n - r; ++o)
          this[o + r] = l[o % u];
      }
      return this;
    };
    var Pe = {};
    function pr(e, t, r) {
      Pe[e] = class extends r {
        constructor() {
          super(), Object.defineProperty(this, "message", { value: t.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e}]`, this.stack, delete this.name;
        }
        get code() {
          return e;
        }
        set code(i) {
          Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: i, writable: true });
        }
        toString() {
          return `${this.name} [${e}]: ${this.message}`;
        }
      };
    }
    pr("ERR_BUFFER_OUT_OF_BOUNDS", function(e) {
      return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    }, RangeError);
    pr("ERR_INVALID_ARG_TYPE", function(e, t) {
      return `The "${e}" argument must be of type number. Received type ${typeof t}`;
    }, TypeError);
    pr("ERR_OUT_OF_RANGE", function(e, t, r) {
      let n = `The value of "${e}" is out of range.`, i = r;
      return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? i = $n(String(r)) : typeof r == "bigint" && (i = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (i = $n(i)), i += "n"), n += ` It must be ${t}. Received ${i}`, n;
    }, RangeError);
    function $n(e) {
      let t = "", r = e.length, n = e[0] === "-" ? 1 : 0;
      for (;r >= n + 4; r -= 3)
        t = `_${e.slice(r - 3, r)}${t}`;
      return `${e.slice(0, r)}${t}`;
    }
    function Hu(e, t, r) {
      ve(t, "offset"), (e[t] === undefined || e[t + r] === undefined) && nt(t, e.length - (r + 1));
    }
    function Zn(e, t, r, n, i, o) {
      if (e > r || e < t) {
        let l = typeof t == "bigint" ? "n" : "", u;
        throw o > 3 ? t === 0 || t === BigInt(0) ? u = `>= 0${l} and < 2${l} ** ${(o + 1) * 8}${l}` : u = `>= -(2${l} ** ${(o + 1) * 8 - 1}${l}) and < 2 ** ${(o + 1) * 8 - 1}${l}` : u = `>= ${t}${l} and <= ${r}${l}`, new Pe.ERR_OUT_OF_RANGE("value", u, e);
      }
      Hu(n, i, o);
    }
    function ve(e, t) {
      if (typeof e != "number")
        throw new Pe.ERR_INVALID_ARG_TYPE(t, "number", e);
    }
    function nt(e, t, r) {
      throw Math.floor(e) !== e ? (ve(e, r), new Pe.ERR_OUT_OF_RANGE(r || "offset", "an integer", e)) : t < 0 ? new Pe.ERR_BUFFER_OUT_OF_BOUNDS : new Pe.ERR_OUT_OF_RANGE(r || "offset", `>= ${r ? 1 : 0} and <= ${t}`, e);
    }
    var Gu = /[^+/0-9A-Za-z-_]/g;
    function Vu(e) {
      if (e = e.split("=")[0], e = e.trim().replace(Gu, ""), e.length < 2)
        return "";
      for (;e.length % 4 !== 0; )
        e = e + "=";
      return e;
    }
    function cr(e, t) {
      t = t || 1 / 0;
      let r, n = e.length, i = null, o = [];
      for (let l = 0;l < n; ++l) {
        if (r = e.charCodeAt(l), r > 55295 && r < 57344) {
          if (!i) {
            if (r > 56319) {
              (t -= 3) > -1 && o.push(239, 191, 189);
              continue;
            } else if (l + 1 === n) {
              (t -= 3) > -1 && o.push(239, 191, 189);
              continue;
            }
            i = r;
            continue;
          }
          if (r < 56320) {
            (t -= 3) > -1 && o.push(239, 191, 189), i = r;
            continue;
          }
          r = (i - 55296 << 10 | r - 56320) + 65536;
        } else
          i && (t -= 3) > -1 && o.push(239, 191, 189);
        if (i = null, r < 128) {
          if ((t -= 1) < 0)
            break;
          o.push(r);
        } else if (r < 2048) {
          if ((t -= 2) < 0)
            break;
          o.push(r >> 6 | 192, r & 63 | 128);
        } else if (r < 65536) {
          if ((t -= 3) < 0)
            break;
          o.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
        } else if (r < 1114112) {
          if ((t -= 4) < 0)
            break;
          o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
        } else
          throw new Error("Invalid code point");
      }
      return o;
    }
    function Yu(e) {
      let t = [];
      for (let r = 0;r < e.length; ++r)
        t.push(e.charCodeAt(r) & 255);
      return t;
    }
    function Ku(e, t) {
      let r, n, i, o = [];
      for (let l = 0;l < e.length && !((t -= 2) < 0); ++l)
        r = e.charCodeAt(l), n = r >> 8, i = r % 256, o.push(i), o.push(n);
      return o;
    }
    function ei(e) {
      return sr.toByteArray(Vu(e));
    }
    function mt(e, t, r, n) {
      let i;
      for (i = 0;i < n && !(i + r >= t.length || i >= e.length); ++i)
        t[i + r] = e[i];
      return i;
    }
    function z(e, t) {
      return e instanceof t || e != null && e.constructor != null && e.constructor.name != null && e.constructor.name === t.name;
    }
    function yr(e) {
      return e !== e;
    }
    var zu = function() {
      let e = "0123456789abcdef", t = new Array(256);
      for (let r = 0;r < 16; ++r) {
        let n = r * 16;
        for (let i = 0;i < 16; ++i)
          t[n + i] = e[r] + e[i];
      }
      return t;
    }();
    function be(e) {
      return typeof BigInt > "u" ? Xu : e;
    }
    function Xu() {
      throw new Error("BigInt not supported");
    }
  });
  I = S((Mh, ti) => {
    var br = class extends Error {
      constructor(t) {
        if (!Array.isArray(t))
          throw new TypeError(`Expected input to be an Array, got ${typeof t}`);
        let r = "";
        for (let n = 0;n < t.length; n++)
          r += `    ${t[n].stack}
`;
        super(r), this.name = "AggregateError", this.errors = t;
      }
    };
    ti.exports = { AggregateError: br, ArrayIsArray(e) {
      return Array.isArray(e);
    }, ArrayPrototypeIncludes(e, t) {
      return e.includes(t);
    }, ArrayPrototypeIndexOf(e, t) {
      return e.indexOf(t);
    }, ArrayPrototypeJoin(e, t) {
      return e.join(t);
    }, ArrayPrototypeMap(e, t) {
      return e.map(t);
    }, ArrayPrototypePop(e, t) {
      return e.pop(t);
    }, ArrayPrototypePush(e, t) {
      return e.push(t);
    }, ArrayPrototypeSlice(e, t, r) {
      return e.slice(t, r);
    }, Error, FunctionPrototypeCall(e, t, ...r) {
      return e.call(t, ...r);
    }, FunctionPrototypeSymbolHasInstance(e, t) {
      return Function.prototype[Symbol.hasInstance].call(e, t);
    }, MathFloor: Math.floor, Number, NumberIsInteger: Number.isInteger, NumberIsNaN: Number.isNaN, NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER, NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER, NumberParseInt: Number.parseInt, ObjectDefineProperties(e, t) {
      return Object.defineProperties(e, t);
    }, ObjectDefineProperty(e, t, r) {
      return Object.defineProperty(e, t, r);
    }, ObjectGetOwnPropertyDescriptor(e, t) {
      return Object.getOwnPropertyDescriptor(e, t);
    }, ObjectKeys(e) {
      return Object.keys(e);
    }, ObjectSetPrototypeOf(e, t) {
      return Object.setPrototypeOf(e, t);
    }, Promise, PromisePrototypeCatch(e, t) {
      return e.catch(t);
    }, PromisePrototypeThen(e, t, r) {
      return e.then(t, r);
    }, PromiseReject(e) {
      return Promise.reject(e);
    }, PromiseResolve(e) {
      return Promise.resolve(e);
    }, ReflectApply: Reflect.apply, RegExpPrototypeTest(e, t) {
      return e.test(t);
    }, SafeSet: Set, String, StringPrototypeSlice(e, t, r) {
      return e.slice(t, r);
    }, StringPrototypeToLowerCase(e) {
      return e.toLowerCase();
    }, StringPrototypeToUpperCase(e) {
      return e.toUpperCase();
    }, StringPrototypeTrim(e) {
      return e.trim();
    }, Symbol, SymbolFor: Symbol.for, SymbolAsyncIterator: Symbol.asyncIterator, SymbolHasInstance: Symbol.hasInstance, SymbolIterator: Symbol.iterator, SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"), SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"), TypedArrayPrototypeSet(e, t, r) {
      return e.set(t, r);
    }, Boolean, Uint8Array };
  });
  wr = S((Ch, ri) => {
    ri.exports = { format(e, ...t) {
      return e.replace(/%([sdifj])/g, function(...[r, n]) {
        let i = t.shift();
        return n === "f" ? i.toFixed(6) : n === "j" ? JSON.stringify(i) : n === "s" && typeof i == "object" ? `${i.constructor !== Object ? i.constructor.name : ""} {}`.trim() : i.toString();
      });
    }, inspect(e) {
      switch (typeof e) {
        case "string":
          if (e.includes("'"))
            if (e.includes('"')) {
              if (!e.includes("`") && !e.includes("${"))
                return `\`${e}\``;
            } else
              return `"${e}"`;
          return `'${e}'`;
        case "number":
          return isNaN(e) ? "NaN" : Object.is(e, -0) ? String(e) : e;
        case "bigint":
          return `${String(e)}n`;
        case "boolean":
        case "undefined":
          return String(e);
        case "object":
          return "{}";
      }
    } };
  });
  O = S((kh, oi) => {
    var { format: Ju, inspect: Rt } = wr(), { AggregateError: Qu } = I(), Zu = globalThis.AggregateError || Qu, es = Symbol("kIsNodeError"), ts = ["string", "function", "number", "object", "Function", "Object", "boolean", "bigint", "symbol"], rs = /^([A-Z][a-z0-9]*)+$/, ns = "__node_internal_", At = {};
    function Ae(e, t) {
      if (!e)
        throw new At.ERR_INTERNAL_ASSERTION(t);
    }
    function ni(e) {
      let t = "", r = e.length, n = e[0] === "-" ? 1 : 0;
      for (;r >= n + 4; r -= 3)
        t = `_${e.slice(r - 3, r)}${t}`;
      return `${e.slice(0, r)}${t}`;
    }
    function is(e, t, r) {
      if (typeof t == "function")
        return Ae(t.length <= r.length, `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${t.length}).`), t(...r);
      let n = (t.match(/%[dfijoOs]/g) || []).length;
      return Ae(n === r.length, `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${n}).`), r.length === 0 ? t : Ju(t, ...r);
    }
    function D(e, t, r) {
      r || (r = Error);

      class n extends r {
        constructor(...o) {
          super(is(e, t, o));
        }
        toString() {
          return `${this.name} [${e}]: ${this.message}`;
        }
      }
      Object.defineProperties(n.prototype, { name: { value: r.name, writable: true, enumerable: false, configurable: true }, toString: { value() {
        return `${this.name} [${e}]: ${this.message}`;
      }, writable: true, enumerable: false, configurable: true } }), n.prototype.code = e, n.prototype[es] = true, At[e] = n;
    }
    function ii(e) {
      let t = ns + e.name;
      return Object.defineProperty(e, "name", { value: t }), e;
    }
    function os(e, t) {
      if (e && t && e !== t) {
        if (Array.isArray(t.errors))
          return t.errors.push(e), t;
        let r = new Zu([t, e], t.message);
        return r.code = t.code, r;
      }
      return e || t;
    }
    var gr = class extends Error {
      constructor(t = "The operation was aborted", r = undefined) {
        if (r !== undefined && typeof r != "object")
          throw new At.ERR_INVALID_ARG_TYPE("options", "Object", r);
        super(t, r), this.code = "ABORT_ERR", this.name = "AbortError";
      }
    };
    D("ERR_ASSERTION", "%s", Error);
    D("ERR_INVALID_ARG_TYPE", (e, t, r) => {
      Ae(typeof e == "string", "'name' must be a string"), Array.isArray(t) || (t = [t]);
      let n = "The ";
      e.endsWith(" argument") ? n += `${e} ` : n += `"${e}" ${e.includes(".") ? "property" : "argument"} `, n += "must be ";
      let i = [], o = [], l = [];
      for (let a of t)
        Ae(typeof a == "string", "All expected entries have to be of type string"), ts.includes(a) ? i.push(a.toLowerCase()) : rs.test(a) ? o.push(a) : (Ae(a !== "object", 'The value "object" should be written as "Object"'), l.push(a));
      if (o.length > 0) {
        let a = i.indexOf("object");
        a !== -1 && (i.splice(i, a, 1), o.push("Object"));
      }
      if (i.length > 0) {
        switch (i.length) {
          case 1:
            n += `of type ${i[0]}`;
            break;
          case 2:
            n += `one of type ${i[0]} or ${i[1]}`;
            break;
          default: {
            let a = i.pop();
            n += `one of type ${i.join(", ")}, or ${a}`;
          }
        }
        (o.length > 0 || l.length > 0) && (n += " or ");
      }
      if (o.length > 0) {
        switch (o.length) {
          case 1:
            n += `an instance of ${o[0]}`;
            break;
          case 2:
            n += `an instance of ${o[0]} or ${o[1]}`;
            break;
          default: {
            let a = o.pop();
            n += `an instance of ${o.join(", ")}, or ${a}`;
          }
        }
        l.length > 0 && (n += " or ");
      }
      switch (l.length) {
        case 0:
          break;
        case 1:
          l[0].toLowerCase() !== l[0] && (n += "an "), n += `${l[0]}`;
          break;
        case 2:
          n += `one of ${l[0]} or ${l[1]}`;
          break;
        default: {
          let a = l.pop();
          n += `one of ${l.join(", ")}, or ${a}`;
        }
      }
      if (r == null)
        n += `. Received ${r}`;
      else if (typeof r == "function" && r.name)
        n += `. Received function ${r.name}`;
      else if (typeof r == "object") {
        var u;
        (u = r.constructor) !== null && u !== undefined && u.name ? n += `. Received an instance of ${r.constructor.name}` : n += `. Received ${Rt(r, { depth: -1 })}`;
      } else {
        let a = Rt(r, { colors: false });
        a.length > 25 && (a = `${a.slice(0, 25)}...`), n += `. Received type ${typeof r} (${a})`;
      }
      return n;
    }, TypeError);
    D("ERR_INVALID_ARG_VALUE", (e, t, r = "is invalid") => {
      let n = Rt(t);
      return n.length > 128 && (n = n.slice(0, 128) + "..."), `The ${e.includes(".") ? "property" : "argument"} '${e}' ${r}. Received ${n}`;
    }, TypeError);
    D("ERR_INVALID_RETURN_VALUE", (e, t, r) => {
      var n;
      let i = r != null && (n = r.constructor) !== null && n !== undefined && n.name ? `instance of ${r.constructor.name}` : `type ${typeof r}`;
      return `Expected ${e} to be returned from the "${t}" function but got ${i}.`;
    }, TypeError);
    D("ERR_MISSING_ARGS", (...e) => {
      Ae(e.length > 0, "At least one arg needs to be specified");
      let t, r = e.length;
      switch (e = (Array.isArray(e) ? e : [e]).map((n) => `"${n}"`).join(" or "), r) {
        case 1:
          t += `The ${e[0]} argument`;
          break;
        case 2:
          t += `The ${e[0]} and ${e[1]} arguments`;
          break;
        default:
          {
            let n = e.pop();
            t += `The ${e.join(", ")}, and ${n} arguments`;
          }
          break;
      }
      return `${t} must be specified`;
    }, TypeError);
    D("ERR_OUT_OF_RANGE", (e, t, r) => {
      Ae(t, 'Missing "range" argument');
      let n;
      if (Number.isInteger(r) && Math.abs(r) > 2 ** 32)
        n = ni(String(r));
      else if (typeof r == "bigint") {
        n = String(r);
        let i = BigInt(2) ** BigInt(32);
        (r > i || r < -i) && (n = ni(n)), n += "n";
      } else
        n = Rt(r);
      return `The value of "${e}" is out of range. It must be ${t}. Received ${n}`;
    }, RangeError);
    D("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
    D("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
    D("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
    D("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
    D("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
    D("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    D("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
    D("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
    D("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
    D("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
    D("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
    oi.exports = { AbortError: gr, aggregateTwoErrors: ii(os), hideStackFrames: ii, codes: At };
  });
  We = S((Dh, xt) => {
    var { AbortController: li, AbortSignal: ls } = typeof self < "u" ? self : typeof window < "u" ? window : undefined;
    xt.exports = li;
    xt.exports.AbortSignal = ls;
    xt.exports.default = li;
  });
  it = S((Oh, _r) => {
    var $e = typeof Reflect == "object" ? Reflect : null, ui = $e && typeof $e.apply == "function" ? $e.apply : function(t, r, n) {
      return Function.prototype.apply.call(t, r, n);
    }, It;
    $e && typeof $e.ownKeys == "function" ? It = $e.ownKeys : Object.getOwnPropertySymbols ? It = function(t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
    } : It = function(t) {
      return Object.getOwnPropertyNames(t);
    };
    function us(e) {
      console && console.warn && console.warn(e);
    }
    var ai = Number.isNaN || function(t) {
      return t !== t;
    };
    function m() {
      m.init.call(this);
    }
    _r.exports = m;
    _r.exports.once = cs;
    m.EventEmitter = m;
    m.prototype._events = undefined;
    m.prototype._eventsCount = 0;
    m.prototype._maxListeners = undefined;
    var si = 10;
    function Tt(e) {
      if (typeof e != "function")
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
    }
    Object.defineProperty(m, "defaultMaxListeners", { enumerable: true, get: function() {
      return si;
    }, set: function(e) {
      if (typeof e != "number" || e < 0 || ai(e))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
      si = e;
    } });
    m.init = function() {
      (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || undefined;
    };
    m.prototype.setMaxListeners = function(t) {
      if (typeof t != "number" || t < 0 || ai(t))
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this;
    };
    function fi(e) {
      return e._maxListeners === undefined ? m.defaultMaxListeners : e._maxListeners;
    }
    m.prototype.getMaxListeners = function() {
      return fi(this);
    };
    m.prototype.emit = function(t) {
      for (var r = [], n = 1;n < arguments.length; n++)
        r.push(arguments[n]);
      var i = t === "error", o = this._events;
      if (o !== undefined)
        i = i && o.error === undefined;
      else if (!i)
        return false;
      if (i) {
        var l;
        if (r.length > 0 && (l = r[0]), l instanceof Error)
          throw l;
        var u = new Error("Unhandled error." + (l ? " (" + l.message + ")" : ""));
        throw u.context = l, u;
      }
      var a = o[t];
      if (a === undefined)
        return false;
      if (typeof a == "function")
        ui(a, this, r);
      else
        for (var s = a.length, c = yi(a, s), n = 0;n < s; ++n)
          ui(c[n], this, r);
      return true;
    };
    function ci(e, t, r, n) {
      var i, o, l;
      if (Tt(r), o = e._events, o === undefined ? (o = e._events = Object.create(null), e._eventsCount = 0) : (o.newListener !== undefined && (e.emit("newListener", t, r.listener ? r.listener : r), o = e._events), l = o[t]), l === undefined)
        l = o[t] = r, ++e._eventsCount;
      else if (typeof l == "function" ? l = o[t] = n ? [r, l] : [l, r] : n ? l.unshift(r) : l.push(r), i = fi(e), i > 0 && l.length > i && !l.warned) {
        l.warned = true;
        var u = new Error("Possible EventEmitter memory leak detected. " + l.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        u.name = "MaxListenersExceededWarning", u.emitter = e, u.type = t, u.count = l.length, us(u);
      }
      return e;
    }
    m.prototype.addListener = function(t, r) {
      return ci(this, t, r, false);
    };
    m.prototype.on = m.prototype.addListener;
    m.prototype.prependListener = function(t, r) {
      return ci(this, t, r, true);
    };
    function ss() {
      if (!this.fired)
        return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
    }
    function di(e, t, r) {
      var n = { fired: false, wrapFn: undefined, target: e, type: t, listener: r }, i = ss.bind(n);
      return i.listener = r, n.wrapFn = i, i;
    }
    m.prototype.once = function(t, r) {
      return Tt(r), this.on(t, di(this, t, r)), this;
    };
    m.prototype.prependOnceListener = function(t, r) {
      return Tt(r), this.prependListener(t, di(this, t, r)), this;
    };
    m.prototype.removeListener = function(t, r) {
      var n, i, o, l, u;
      if (Tt(r), i = this._events, i === undefined)
        return this;
      if (n = i[t], n === undefined)
        return this;
      if (n === r || n.listener === r)
        --this._eventsCount === 0 ? this._events = Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, n.listener || r));
      else if (typeof n != "function") {
        for (o = -1, l = n.length - 1;l >= 0; l--)
          if (n[l] === r || n[l].listener === r) {
            u = n[l].listener, o = l;
            break;
          }
        if (o < 0)
          return this;
        o === 0 ? n.shift() : as(n, o), n.length === 1 && (i[t] = n[0]), i.removeListener !== undefined && this.emit("removeListener", t, u || r);
      }
      return this;
    };
    m.prototype.off = m.prototype.removeListener;
    m.prototype.removeAllListeners = function(t) {
      var r, n, i;
      if (n = this._events, n === undefined)
        return this;
      if (n.removeListener === undefined)
        return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : n[t] !== undefined && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete n[t]), this;
      if (arguments.length === 0) {
        var o = Object.keys(n), l;
        for (i = 0;i < o.length; ++i)
          l = o[i], l !== "removeListener" && this.removeAllListeners(l);
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
      }
      if (r = n[t], typeof r == "function")
        this.removeListener(t, r);
      else if (r !== undefined)
        for (i = r.length - 1;i >= 0; i--)
          this.removeListener(t, r[i]);
      return this;
    };
    function hi(e, t, r) {
      var n = e._events;
      if (n === undefined)
        return [];
      var i = n[t];
      return i === undefined ? [] : typeof i == "function" ? r ? [i.listener || i] : [i] : r ? fs(i) : yi(i, i.length);
    }
    m.prototype.listeners = function(t) {
      return hi(this, t, true);
    };
    m.prototype.rawListeners = function(t) {
      return hi(this, t, false);
    };
    m.listenerCount = function(e, t) {
      return typeof e.listenerCount == "function" ? e.listenerCount(t) : pi.call(e, t);
    };
    m.prototype.listenerCount = pi;
    function pi(e) {
      var t = this._events;
      if (t !== undefined) {
        var r = t[e];
        if (typeof r == "function")
          return 1;
        if (r !== undefined)
          return r.length;
      }
      return 0;
    }
    m.prototype.eventNames = function() {
      return this._eventsCount > 0 ? It(this._events) : [];
    };
    function yi(e, t) {
      for (var r = new Array(t), n = 0;n < t; ++n)
        r[n] = e[n];
      return r;
    }
    function as(e, t) {
      for (;t + 1 < e.length; t++)
        e[t] = e[t + 1];
      e.pop();
    }
    function fs(e) {
      for (var t = new Array(e.length), r = 0;r < t.length; ++r)
        t[r] = e[r].listener || e[r];
      return t;
    }
    function cs(e, t) {
      return new Promise(function(r, n) {
        function i(l) {
          e.removeListener(t, o), n(l);
        }
        function o() {
          typeof e.removeListener == "function" && e.removeListener("error", i), r([].slice.call(arguments));
        }
        bi(e, t, o, { once: true }), t !== "error" && ds(e, i, { once: true });
      });
    }
    function ds(e, t, r) {
      typeof e.on == "function" && bi(e, "error", t, r);
    }
    function bi(e, t, r, n) {
      if (typeof e.on == "function")
        n.once ? e.once(t, r) : e.on(t, r);
      else if (typeof e.addEventListener == "function")
        e.addEventListener(t, function i(o) {
          n.once && e.removeEventListener(t, i), r(o);
        });
      else
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
    }
  });
  q = S((Ph, Sr) => {
    var hs = le(), { format: ps, inspect: ys } = wr(), { codes: { ERR_INVALID_ARG_TYPE: Er } } = O(), { kResistStopPropagation: bs, AggregateError: ws, SymbolDispose: gs } = I(), _s = globalThis.AbortSignal || We().AbortSignal, Es = globalThis.AbortController || We().AbortController, Ss = Object.getPrototypeOf(async function() {
    }).constructor, wi = globalThis.Blob || hs.Blob, ms = typeof wi < "u" ? function(t) {
      return t instanceof wi;
    } : function(t) {
      return false;
    }, gi = (e, t) => {
      if (e !== undefined && (e === null || typeof e != "object" || !("aborted" in e)))
        throw new Er(t, "AbortSignal", e);
    }, Rs = (e, t) => {
      if (typeof e != "function")
        throw new Er(t, "Function", e);
    };
    Sr.exports = { AggregateError: ws, kEmptyObject: Object.freeze({}), once(e) {
      let t = false;
      return function(...r) {
        t || (t = true, e.apply(this, r));
      };
    }, createDeferredPromise: function() {
      let e, t;
      return { promise: new Promise((n, i) => {
        e = n, t = i;
      }), resolve: e, reject: t };
    }, promisify(e) {
      return new Promise((t, r) => {
        e((n, ...i) => n ? r(n) : t(...i));
      });
    }, debuglog() {
      return function() {
      };
    }, format: ps, inspect: ys, types: { isAsyncFunction(e) {
      return e instanceof Ss;
    }, isArrayBufferView(e) {
      return ArrayBuffer.isView(e);
    } }, isBlob: ms, deprecate(e, t) {
      return e;
    }, addAbortListener: it().addAbortListener || function(t, r) {
      if (t === undefined)
        throw new Er("signal", "AbortSignal", t);
      gi(t, "signal"), Rs(r, "listener");
      let n;
      return t.aborted ? queueMicrotask(() => r()) : (t.addEventListener("abort", r, { __proto__: null, once: true, [bs]: true }), n = () => {
        t.removeEventListener("abort", r);
      }), { __proto__: null, [gs]() {
        var i;
        (i = n) === null || i === undefined || i();
      } };
    }, AbortSignalAny: _s.any || function(t) {
      if (t.length === 1)
        return t[0];
      let r = new Es, n = () => r.abort();
      return t.forEach((i) => {
        gi(i, "signals"), i.addEventListener("abort", n, { once: true });
      }), r.signal.addEventListener("abort", () => {
        t.forEach((i) => i.removeEventListener("abort", n));
      }, { once: true }), r.signal;
    } };
    Sr.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
  });
  He = S((qh, Bi) => {
    var { ArrayIsArray: Rr, ArrayPrototypeIncludes: mi, ArrayPrototypeJoin: Ri, ArrayPrototypeMap: As, NumberIsInteger: Ar, NumberIsNaN: xs, NumberMAX_SAFE_INTEGER: Is, NumberMIN_SAFE_INTEGER: Ts, NumberParseInt: Bs, ObjectPrototypeHasOwnProperty: Ls, RegExpPrototypeExec: Ai, String: Ns, StringPrototypeToUpperCase: Fs, StringPrototypeTrim: Ms } = I(), { hideStackFrames: j, codes: { ERR_SOCKET_BAD_PORT: Cs, ERR_INVALID_ARG_TYPE: P, ERR_INVALID_ARG_VALUE: je, ERR_OUT_OF_RANGE: xe, ERR_UNKNOWN_SIGNAL: _i } } = O(), { normalizeEncoding: ks } = q(), { isAsyncFunction: Ds, isArrayBufferView: Os } = q().types, Ei = {};
    function Ps(e) {
      return e === (e | 0);
    }
    function qs(e) {
      return e === e >>> 0;
    }
    var vs = /^[0-7]+$/, Us = "must be a 32-bit unsigned integer or an octal string";
    function Ws(e, t, r) {
      if (typeof e > "u" && (e = r), typeof e == "string") {
        if (Ai(vs, e) === null)
          throw new je(t, e, Us);
        e = Bs(e, 8);
      }
      return xi(e, t), e;
    }
    var $s = j((e, t, r = Ts, n = Is) => {
      if (typeof e != "number")
        throw new P(t, "number", e);
      if (!Ar(e))
        throw new xe(t, "an integer", e);
      if (e < r || e > n)
        throw new xe(t, `>= ${r} && <= ${n}`, e);
    }), js = j((e, t, r = -2147483648, n = 2147483647) => {
      if (typeof e != "number")
        throw new P(t, "number", e);
      if (!Ar(e))
        throw new xe(t, "an integer", e);
      if (e < r || e > n)
        throw new xe(t, `>= ${r} && <= ${n}`, e);
    }), xi = j((e, t, r = false) => {
      if (typeof e != "number")
        throw new P(t, "number", e);
      if (!Ar(e))
        throw new xe(t, "an integer", e);
      let n = r ? 1 : 0, i = 4294967295;
      if (e < n || e > i)
        throw new xe(t, `>= ${n} && <= ${i}`, e);
    });
    function xr(e, t) {
      if (typeof e != "string")
        throw new P(t, "string", e);
    }
    function Hs(e, t, r = undefined, n) {
      if (typeof e != "number")
        throw new P(t, "number", e);
      if (r != null && e < r || n != null && e > n || (r != null || n != null) && xs(e))
        throw new xe(t, `${r != null ? `>= ${r}` : ""}${r != null && n != null ? " && " : ""}${n != null ? `<= ${n}` : ""}`, e);
    }
    var Gs = j((e, t, r) => {
      if (!mi(r, e)) {
        let n = Ri(As(r, (o) => typeof o == "string" ? `'${o}'` : Ns(o)), ", "), i = "must be one of: " + n;
        throw new je(t, e, i);
      }
    });
    function Ii(e, t) {
      if (typeof e != "boolean")
        throw new P(t, "boolean", e);
    }
    function mr(e, t, r) {
      return e == null || !Ls(e, t) ? r : e[t];
    }
    var Vs = j((e, t, r = null) => {
      let n = mr(r, "allowArray", false), i = mr(r, "allowFunction", false);
      if (!mr(r, "nullable", false) && e === null || !n && Rr(e) || typeof e != "object" && (!i || typeof e != "function"))
        throw new P(t, "Object", e);
    }), Ys = j((e, t) => {
      if (e != null && typeof e != "object" && typeof e != "function")
        throw new P(t, "a dictionary", e);
    }), Bt = j((e, t, r = 0) => {
      if (!Rr(e))
        throw new P(t, "Array", e);
      if (e.length < r) {
        let n = `must be longer than ${r}`;
        throw new je(t, e, n);
      }
    });
    function Ks(e, t) {
      Bt(e, t);
      for (let r = 0;r < e.length; r++)
        xr(e[r], `${t}[${r}]`);
    }
    function zs(e, t) {
      Bt(e, t);
      for (let r = 0;r < e.length; r++)
        Ii(e[r], `${t}[${r}]`);
    }
    function Xs(e, t) {
      Bt(e, t);
      for (let r = 0;r < e.length; r++) {
        let n = e[r], i = `${t}[${r}]`;
        if (n == null)
          throw new P(i, "AbortSignal", n);
        Ti(n, i);
      }
    }
    function Js(e, t = "signal") {
      if (xr(e, t), Ei[e] === undefined)
        throw Ei[Fs(e)] !== undefined ? new _i(e + " (signals must use all capital letters)") : new _i(e);
    }
    var Qs = j((e, t = "buffer") => {
      if (!Os(e))
        throw new P(t, ["Buffer", "TypedArray", "DataView"], e);
    });
    function Zs(e, t) {
      let r = ks(t), n = e.length;
      if (r === "hex" && n % 2 !== 0)
        throw new je("encoding", t, `is invalid for data of length ${n}`);
    }
    function ea(e, t = "Port", r = true) {
      if (typeof e != "number" && typeof e != "string" || typeof e == "string" && Ms(e).length === 0 || +e !== +e >>> 0 || e > 65535 || e === 0 && !r)
        throw new Cs(t, e, r);
      return e | 0;
    }
    var Ti = j((e, t) => {
      if (e !== undefined && (e === null || typeof e != "object" || !("aborted" in e)))
        throw new P(t, "AbortSignal", e);
    }), ta = j((e, t) => {
      if (typeof e != "function")
        throw new P(t, "Function", e);
    }), ra = j((e, t) => {
      if (typeof e != "function" || Ds(e))
        throw new P(t, "Function", e);
    }), na = j((e, t) => {
      if (e !== undefined)
        throw new P(t, "undefined", e);
    });
    function ia(e, t, r) {
      if (!mi(r, e))
        throw new P(t, `('${Ri(r, "|")}')`, e);
    }
    var oa = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
    function Si(e, t) {
      if (typeof e > "u" || !Ai(oa, e))
        throw new je(t, e, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
    }
    function la(e) {
      if (typeof e == "string")
        return Si(e, "hints"), e;
      if (Rr(e)) {
        let t = e.length, r = "";
        if (t === 0)
          return r;
        for (let n = 0;n < t; n++) {
          let i = e[n];
          Si(i, "hints"), r += i, n !== t - 1 && (r += ", ");
        }
        return r;
      }
      throw new je("hints", e, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
    }
    Bi.exports = { isInt32: Ps, isUint32: qs, parseFileMode: Ws, validateArray: Bt, validateStringArray: Ks, validateBooleanArray: zs, validateAbortSignalArray: Xs, validateBoolean: Ii, validateBuffer: Qs, validateDictionary: Ys, validateEncoding: Zs, validateFunction: ta, validateInt32: js, validateInteger: $s, validateNumber: Hs, validateObject: Vs, validateOneOf: Gs, validatePlainFunction: ra, validatePort: ea, validateSignalName: Js, validateString: xr, validateUint32: xi, validateUndefined: na, validateUnion: ia, validateAbortSignal: Ti, validateLinkHeaderValue: la };
  });
  Br = S((vh, Mi) => {
    var B = Mi.exports = {}, X, J;
    function Ir() {
      throw new Error("setTimeout has not been defined");
    }
    function Tr() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        typeof setTimeout == "function" ? X = setTimeout : X = Ir;
      } catch {
        X = Ir;
      }
      try {
        typeof clearTimeout == "function" ? J = clearTimeout : J = Tr;
      } catch {
        J = Tr;
      }
    })();
    function Li(e) {
      if (X === setTimeout)
        return setTimeout(e, 0);
      if ((X === Ir || !X) && setTimeout)
        return X = setTimeout, setTimeout(e, 0);
      try {
        return X(e, 0);
      } catch {
        try {
          return X.call(null, e, 0);
        } catch {
          return X.call(this, e, 0);
        }
      }
    }
    function ua(e) {
      if (J === clearTimeout)
        return clearTimeout(e);
      if ((J === Tr || !J) && clearTimeout)
        return J = clearTimeout, clearTimeout(e);
      try {
        return J(e);
      } catch {
        try {
          return J.call(null, e);
        } catch {
          return J.call(this, e);
        }
      }
    }
    var ue = [], Ge = false, Ie, Lt = -1;
    function sa() {
      !Ge || !Ie || (Ge = false, Ie.length ? ue = Ie.concat(ue) : Lt = -1, ue.length && Ni());
    }
    function Ni() {
      if (!Ge) {
        var e = Li(sa);
        Ge = true;
        for (var t = ue.length;t; ) {
          for (Ie = ue, ue = [];++Lt < t; )
            Ie && Ie[Lt].run();
          Lt = -1, t = ue.length;
        }
        Ie = null, Ge = false, ua(e);
      }
    }
    B.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var r = 1;r < arguments.length; r++)
          t[r - 1] = arguments[r];
      ue.push(new Fi(e, t)), ue.length === 1 && !Ge && Li(Ni);
    };
    function Fi(e, t) {
      this.fun = e, this.array = t;
    }
    Fi.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    B.title = "browser";
    B.browser = true;
    B.env = {};
    B.argv = [];
    B.version = "";
    B.versions = {};
    function se() {
    }
    B.on = se;
    B.addListener = se;
    B.once = se;
    B.off = se;
    B.removeListener = se;
    B.removeAllListeners = se;
    B.emit = se;
    B.prependListener = se;
    B.prependOnceListener = se;
    B.listeners = function(e) {
      return [];
    };
    B.binding = function(e) {
      throw new Error("process.binding is not supported");
    };
    B.cwd = function() {
      return "/";
    };
    B.chdir = function(e) {
      throw new Error("process.chdir is not supported");
    };
    B.umask = function() {
      return 0;
    };
  });
  H = {};
  or(H, { default: () => aa });
  we = kn(() => {
    pe(H, rt(Br()));
    aa = rt(Br());
  });
  Z = S((Wh, Yi) => {
    var { SymbolAsyncIterator: Ci, SymbolIterator: ki, SymbolFor: Te } = I(), Di = Te("nodejs.stream.destroyed"), Oi = Te("nodejs.stream.errored"), Lr = Te("nodejs.stream.readable"), Nr = Te("nodejs.stream.writable"), Pi = Te("nodejs.stream.disturbed"), fa = Te("nodejs.webstream.isClosedPromise"), ca = Te("nodejs.webstream.controllerErrorFunction");
    function Nt(e, t = false) {
      var r;
      return !!(e && typeof e.pipe == "function" && typeof e.on == "function" && (!t || typeof e.pause == "function" && typeof e.resume == "function") && (!e._writableState || ((r = e._readableState) === null || r === undefined ? undefined : r.readable) !== false) && (!e._writableState || e._readableState));
    }
    function Ft(e) {
      var t;
      return !!(e && typeof e.write == "function" && typeof e.on == "function" && (!e._readableState || ((t = e._writableState) === null || t === undefined ? undefined : t.writable) !== false));
    }
    function da(e) {
      return !!(e && typeof e.pipe == "function" && e._readableState && typeof e.on == "function" && typeof e.write == "function");
    }
    function Q(e) {
      return e && (e._readableState || e._writableState || typeof e.write == "function" && typeof e.on == "function" || typeof e.pipe == "function" && typeof e.on == "function");
    }
    function qi(e) {
      return !!(e && !Q(e) && typeof e.pipeThrough == "function" && typeof e.getReader == "function" && typeof e.cancel == "function");
    }
    function vi(e) {
      return !!(e && !Q(e) && typeof e.getWriter == "function" && typeof e.abort == "function");
    }
    function Ui(e) {
      return !!(e && !Q(e) && typeof e.readable == "object" && typeof e.writable == "object");
    }
    function ha(e) {
      return qi(e) || vi(e) || Ui(e);
    }
    function pa(e, t) {
      return e == null ? false : t === true ? typeof e[Ci] == "function" : t === false ? typeof e[ki] == "function" : typeof e[Ci] == "function" || typeof e[ki] == "function";
    }
    function Mt(e) {
      if (!Q(e))
        return null;
      let { _writableState: t, _readableState: r } = e, n = t || r;
      return !!(e.destroyed || e[Di] || n != null && n.destroyed);
    }
    function Wi(e) {
      if (!Ft(e))
        return null;
      if (e.writableEnded === true)
        return true;
      let t = e._writableState;
      return t != null && t.errored ? false : typeof t?.ended != "boolean" ? null : t.ended;
    }
    function ya(e, t) {
      if (!Ft(e))
        return null;
      if (e.writableFinished === true)
        return true;
      let r = e._writableState;
      return r != null && r.errored ? false : typeof r?.finished != "boolean" ? null : !!(r.finished || t === false && r.ended === true && r.length === 0);
    }
    function ba(e) {
      if (!Nt(e))
        return null;
      if (e.readableEnded === true)
        return true;
      let t = e._readableState;
      return !t || t.errored ? false : typeof t?.ended != "boolean" ? null : t.ended;
    }
    function $i(e, t) {
      if (!Nt(e))
        return null;
      let r = e._readableState;
      return r != null && r.errored ? false : typeof r?.endEmitted != "boolean" ? null : !!(r.endEmitted || t === false && r.ended === true && r.length === 0);
    }
    function ji(e) {
      return e && e[Lr] != null ? e[Lr] : typeof e?.readable != "boolean" ? null : Mt(e) ? false : Nt(e) && e.readable && !$i(e);
    }
    function Hi(e) {
      return e && e[Nr] != null ? e[Nr] : typeof e?.writable != "boolean" ? null : Mt(e) ? false : Ft(e) && e.writable && !Wi(e);
    }
    function wa(e, t) {
      return Q(e) ? Mt(e) ? true : !(t?.readable !== false && ji(e) || t?.writable !== false && Hi(e)) : null;
    }
    function ga(e) {
      var t, r;
      return Q(e) ? e.writableErrored ? e.writableErrored : (t = (r = e._writableState) === null || r === undefined ? undefined : r.errored) !== null && t !== undefined ? t : null : null;
    }
    function _a(e) {
      var t, r;
      return Q(e) ? e.readableErrored ? e.readableErrored : (t = (r = e._readableState) === null || r === undefined ? undefined : r.errored) !== null && t !== undefined ? t : null : null;
    }
    function Ea(e) {
      if (!Q(e))
        return null;
      if (typeof e.closed == "boolean")
        return e.closed;
      let { _writableState: t, _readableState: r } = e;
      return typeof t?.closed == "boolean" || typeof r?.closed == "boolean" ? t?.closed || r?.closed : typeof e._closed == "boolean" && Gi(e) ? e._closed : null;
    }
    function Gi(e) {
      return typeof e._closed == "boolean" && typeof e._defaultKeepAlive == "boolean" && typeof e._removedConnection == "boolean" && typeof e._removedContLen == "boolean";
    }
    function Vi(e) {
      return typeof e._sent100 == "boolean" && Gi(e);
    }
    function Sa(e) {
      var t;
      return typeof e._consuming == "boolean" && typeof e._dumped == "boolean" && ((t = e.req) === null || t === undefined ? undefined : t.upgradeOrConnect) === undefined;
    }
    function ma(e) {
      if (!Q(e))
        return null;
      let { _writableState: t, _readableState: r } = e, n = t || r;
      return !n && Vi(e) || !!(n && n.autoDestroy && n.emitClose && n.closed === false);
    }
    function Ra(e) {
      var t;
      return !!(e && ((t = e[Pi]) !== null && t !== undefined ? t : e.readableDidRead || e.readableAborted));
    }
    function Aa(e) {
      var t, r, n, i, o, l, u, a, s, c;
      return !!(e && ((t = (r = (n = (i = (o = (l = e[Oi]) !== null && l !== undefined ? l : e.readableErrored) !== null && o !== undefined ? o : e.writableErrored) !== null && i !== undefined ? i : (u = e._readableState) === null || u === undefined ? undefined : u.errorEmitted) !== null && n !== undefined ? n : (a = e._writableState) === null || a === undefined ? undefined : a.errorEmitted) !== null && r !== undefined ? r : (s = e._readableState) === null || s === undefined ? undefined : s.errored) !== null && t !== undefined ? t : (c = e._writableState) === null || c === undefined ? undefined : c.errored));
    }
    Yi.exports = { isDestroyed: Mt, kIsDestroyed: Di, isDisturbed: Ra, kIsDisturbed: Pi, isErrored: Aa, kIsErrored: Oi, isReadable: ji, kIsReadable: Lr, kIsClosedPromise: fa, kControllerErrorFunction: ca, kIsWritable: Nr, isClosed: Ea, isDuplexNodeStream: da, isFinished: wa, isIterable: pa, isReadableNodeStream: Nt, isReadableStream: qi, isReadableEnded: ba, isReadableFinished: $i, isReadableErrored: _a, isNodeStream: Q, isWebStream: ha, isWritable: Hi, isWritableNodeStream: Ft, isWritableStream: vi, isWritableEnded: Wi, isWritableFinished: ya, isWritableErrored: ga, isServerRequest: Sa, isServerResponse: Vi, willEmitClose: ma, isTransformStream: Ui };
  });
  ae = S(($h, Dr) => {
    var ge = (we(), ye(H)), { AbortError: ro, codes: xa } = O(), { ERR_INVALID_ARG_TYPE: Ia, ERR_STREAM_PREMATURE_CLOSE: Ki } = xa, { kEmptyObject: Mr, once: Cr } = q(), { validateAbortSignal: Ta, validateFunction: Ba, validateObject: La, validateBoolean: Na } = He(), { Promise: Fa, PromisePrototypeThen: Ma, SymbolDispose: no } = I(), { isClosed: Ca, isReadable: zi, isReadableNodeStream: Fr, isReadableStream: ka, isReadableFinished: Xi, isReadableErrored: Ji, isWritable: Qi, isWritableNodeStream: Zi, isWritableStream: Da, isWritableFinished: eo, isWritableErrored: to, isNodeStream: Oa, willEmitClose: Pa, kIsClosedPromise: qa } = Z(), Ve;
    function va(e) {
      return e.setHeader && typeof e.abort == "function";
    }
    var kr = () => {
    };
    function io(e, t, r) {
      var n, i;
      if (arguments.length === 2 ? (r = t, t = Mr) : t == null ? t = Mr : La(t, "options"), Ba(r, "callback"), Ta(t.signal, "options.signal"), r = Cr(r), ka(e) || Da(e))
        return Ua(e, t, r);
      if (!Oa(e))
        throw new Ia("stream", ["ReadableStream", "WritableStream", "Stream"], e);
      let o = (n = t.readable) !== null && n !== undefined ? n : Fr(e), l = (i = t.writable) !== null && i !== undefined ? i : Zi(e), u = e._writableState, a = e._readableState, s = () => {
        e.writable || y();
      }, c = Pa(e) && Fr(e) === o && Zi(e) === l, d = eo(e, false), y = () => {
        d = true, e.destroyed && (c = false), !(c && (!e.readable || o)) && (!o || h) && r.call(e);
      }, h = Xi(e, false), _ = () => {
        h = true, e.destroyed && (c = false), !(c && (!e.writable || l)) && (!l || d) && r.call(e);
      }, p = (N) => {
        r.call(e, N);
      }, R = Ca(e), w = () => {
        R = true;
        let N = to(e) || Ji(e);
        if (N && typeof N != "boolean")
          return r.call(e, N);
        if (o && !h && Fr(e, true) && !Xi(e, false))
          return r.call(e, new Ki);
        if (l && !d && !eo(e, false))
          return r.call(e, new Ki);
        r.call(e);
      }, x = () => {
        R = true;
        let N = to(e) || Ji(e);
        if (N && typeof N != "boolean")
          return r.call(e, N);
        r.call(e);
      }, F = () => {
        e.req.on("finish", y);
      };
      va(e) ? (e.on("complete", y), c || e.on("abort", w), e.req ? F() : e.on("request", F)) : l && !u && (e.on("end", s), e.on("close", s)), !c && typeof e.aborted == "boolean" && e.on("aborted", w), e.on("end", _), e.on("finish", y), t.error !== false && e.on("error", p), e.on("close", w), R ? ge.nextTick(w) : u != null && u.errorEmitted || a != null && a.errorEmitted ? c || ge.nextTick(x) : (!o && (!c || zi(e)) && (d || Qi(e) === false) || !l && (!c || Qi(e)) && (h || zi(e) === false) || a && e.req && e.aborted) && ge.nextTick(x);
      let E = () => {
        r = kr, e.removeListener("aborted", w), e.removeListener("complete", y), e.removeListener("abort", w), e.removeListener("request", F), e.req && e.req.removeListener("finish", y), e.removeListener("end", s), e.removeListener("close", s), e.removeListener("finish", y), e.removeListener("end", _), e.removeListener("error", p), e.removeListener("close", w);
      };
      if (t.signal && !R) {
        let N = () => {
          let Se = r;
          E(), Se.call(e, new ro(undefined, { cause: t.signal.reason }));
        };
        if (t.signal.aborted)
          ge.nextTick(N);
        else {
          Ve = Ve || q().addAbortListener;
          let Se = Ve(t.signal, N), W = r;
          r = Cr((...Oe) => {
            Se[no](), W.apply(e, Oe);
          });
        }
      }
      return E;
    }
    function Ua(e, t, r) {
      let n = false, i = kr;
      if (t.signal)
        if (i = () => {
          n = true, r.call(e, new ro(undefined, { cause: t.signal.reason }));
        }, t.signal.aborted)
          ge.nextTick(i);
        else {
          Ve = Ve || q().addAbortListener;
          let l = Ve(t.signal, i), u = r;
          r = Cr((...a) => {
            l[no](), u.apply(e, a);
          });
        }
      let o = (...l) => {
        n || ge.nextTick(() => r.apply(e, l));
      };
      return Ma(e[qa].promise, o, o), kr;
    }
    function Wa(e, t) {
      var r;
      let n = false;
      return t === null && (t = Mr), (r = t) !== null && r !== undefined && r.cleanup && (Na(t.cleanup, "cleanup"), n = t.cleanup), new Fa((i, o) => {
        let l = io(e, t, (u) => {
          n && l(), u ? o(u) : i();
        });
      });
    }
    Dr.exports = io;
    Dr.exports.finished = Wa;
  });
  Be = S((jh, ho) => {
    var ee = (we(), ye(H)), { aggregateTwoErrors: $a, codes: { ERR_MULTIPLE_CALLBACK: ja }, AbortError: Ha } = O(), { Symbol: uo } = I(), { kIsDestroyed: Ga, isDestroyed: Va, isFinished: Ya, isServerRequest: Ka } = Z(), so = uo("kDestroy"), Or = uo("kConstruct");
    function ao(e, t, r) {
      e && (e.stack, t && !t.errored && (t.errored = e), r && !r.errored && (r.errored = e));
    }
    function za(e, t) {
      let r = this._readableState, n = this._writableState, i = n || r;
      return n != null && n.destroyed || r != null && r.destroyed ? (typeof t == "function" && t(), this) : (ao(e, n, r), n && (n.destroyed = true), r && (r.destroyed = true), i.constructed ? oo(this, e, t) : this.once(so, function(o) {
        oo(this, $a(o, e), t);
      }), this);
    }
    function oo(e, t, r) {
      let n = false;
      function i(o) {
        if (n)
          return;
        n = true;
        let { _readableState: l, _writableState: u } = e;
        ao(o, u, l), u && (u.closed = true), l && (l.closed = true), typeof r == "function" && r(o), o ? ee.nextTick(Xa, e, o) : ee.nextTick(fo, e);
      }
      try {
        e._destroy(t || null, i);
      } catch (o) {
        i(o);
      }
    }
    function Xa(e, t) {
      Pr(e, t), fo(e);
    }
    function fo(e) {
      let { _readableState: t, _writableState: r } = e;
      r && (r.closeEmitted = true), t && (t.closeEmitted = true), (r != null && r.emitClose || t != null && t.emitClose) && e.emit("close");
    }
    function Pr(e, t) {
      let { _readableState: r, _writableState: n } = e;
      n != null && n.errorEmitted || r != null && r.errorEmitted || (n && (n.errorEmitted = true), r && (r.errorEmitted = true), e.emit("error", t));
    }
    function Ja() {
      let e = this._readableState, t = this._writableState;
      e && (e.constructed = true, e.closed = false, e.closeEmitted = false, e.destroyed = false, e.errored = null, e.errorEmitted = false, e.reading = false, e.ended = e.readable === false, e.endEmitted = e.readable === false), t && (t.constructed = true, t.destroyed = false, t.closed = false, t.closeEmitted = false, t.errored = null, t.errorEmitted = false, t.finalCalled = false, t.prefinished = false, t.ended = t.writable === false, t.ending = t.writable === false, t.finished = t.writable === false);
    }
    function qr(e, t, r) {
      let { _readableState: n, _writableState: i } = e;
      if (i != null && i.destroyed || n != null && n.destroyed)
        return this;
      n != null && n.autoDestroy || i != null && i.autoDestroy ? e.destroy(t) : t && (t.stack, i && !i.errored && (i.errored = t), n && !n.errored && (n.errored = t), r ? ee.nextTick(Pr, e, t) : Pr(e, t));
    }
    function Qa(e, t) {
      if (typeof e._construct != "function")
        return;
      let { _readableState: r, _writableState: n } = e;
      r && (r.constructed = false), n && (n.constructed = false), e.once(Or, t), !(e.listenerCount(Or) > 1) && ee.nextTick(Za, e);
    }
    function Za(e) {
      let t = false;
      function r(n) {
        if (t) {
          qr(e, n ?? new ja);
          return;
        }
        t = true;
        let { _readableState: i, _writableState: o } = e, l = o || i;
        i && (i.constructed = true), o && (o.constructed = true), l.destroyed ? e.emit(so, n) : n ? qr(e, n, true) : ee.nextTick(ef, e);
      }
      try {
        e._construct((n) => {
          ee.nextTick(r, n);
        });
      } catch (n) {
        ee.nextTick(r, n);
      }
    }
    function ef(e) {
      e.emit(Or);
    }
    function lo(e) {
      return e?.setHeader && typeof e.abort == "function";
    }
    function co(e) {
      e.emit("close");
    }
    function tf(e, t) {
      e.emit("error", t), ee.nextTick(co, e);
    }
    function rf(e, t) {
      !e || Va(e) || (!t && !Ya(e) && (t = new Ha), Ka(e) ? (e.socket = null, e.destroy(t)) : lo(e) ? e.abort() : lo(e.req) ? e.req.abort() : typeof e.destroy == "function" ? e.destroy(t) : typeof e.close == "function" ? e.close() : t ? ee.nextTick(tf, e, t) : ee.nextTick(co, e), e.destroyed || (e[Ga] = true));
    }
    ho.exports = { construct: Qa, destroyer: rf, destroy: za, undestroy: Ja, errorOrDestroy: qr };
  });
  Dt = S((Hh, yo) => {
    var { ArrayIsArray: nf, ObjectSetPrototypeOf: po } = I(), { EventEmitter: Ct } = it();
    function kt(e) {
      Ct.call(this, e);
    }
    po(kt.prototype, Ct.prototype);
    po(kt, Ct);
    kt.prototype.pipe = function(e, t) {
      let r = this;
      function n(c) {
        e.writable && e.write(c) === false && r.pause && r.pause();
      }
      r.on("data", n);
      function i() {
        r.readable && r.resume && r.resume();
      }
      e.on("drain", i), !e._isStdio && (!t || t.end !== false) && (r.on("end", l), r.on("close", u));
      let o = false;
      function l() {
        o || (o = true, e.end());
      }
      function u() {
        o || (o = true, typeof e.destroy == "function" && e.destroy());
      }
      function a(c) {
        s(), Ct.listenerCount(this, "error") === 0 && this.emit("error", c);
      }
      vr(r, "error", a), vr(e, "error", a);
      function s() {
        r.removeListener("data", n), e.removeListener("drain", i), r.removeListener("end", l), r.removeListener("close", u), r.removeListener("error", a), e.removeListener("error", a), r.removeListener("end", s), r.removeListener("close", s), e.removeListener("close", s);
      }
      return r.on("end", s), r.on("close", s), e.on("close", s), e.emit("pipe", r), e;
    };
    function vr(e, t, r) {
      if (typeof e.prependListener == "function")
        return e.prependListener(t, r);
      !e._events || !e._events[t] ? e.on(t, r) : nf(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]];
    }
    yo.exports = { Stream: kt, prependListener: vr };
  });
  ot = S((Gh, Ot) => {
    var { SymbolDispose: of } = I(), { AbortError: bo, codes: lf } = O(), { isNodeStream: wo, isWebStream: uf, kControllerErrorFunction: sf } = Z(), af = ae(), { ERR_INVALID_ARG_TYPE: go } = lf, Ur, ff = (e, t) => {
      if (typeof e != "object" || !("aborted" in e))
        throw new go(t, "AbortSignal", e);
    };
    Ot.exports.addAbortSignal = function(t, r) {
      if (ff(t, "signal"), !wo(r) && !uf(r))
        throw new go("stream", ["ReadableStream", "WritableStream", "Stream"], r);
      return Ot.exports.addAbortSignalNoValidate(t, r);
    };
    Ot.exports.addAbortSignalNoValidate = function(e, t) {
      if (typeof e != "object" || !("aborted" in e))
        return t;
      let r = wo(t) ? () => {
        t.destroy(new bo(undefined, { cause: e.reason }));
      } : () => {
        t[sf](new bo(undefined, { cause: e.reason }));
      };
      if (e.aborted)
        r();
      else {
        Ur = Ur || q().addAbortListener;
        let n = Ur(e, r);
        af(t, n[of]);
      }
      return t;
    };
  });
  So = S((Yh, Eo) => {
    var { StringPrototypeSlice: _o, SymbolIterator: cf, TypedArrayPrototypeSet: Pt, Uint8Array: df } = I(), { Buffer: Wr } = le(), { inspect: hf } = q();
    Eo.exports = class {
      constructor() {
        this.head = null, this.tail = null, this.length = 0;
      }
      push(t) {
        let r = { data: t, next: null };
        this.length > 0 ? this.tail.next = r : this.head = r, this.tail = r, ++this.length;
      }
      unshift(t) {
        let r = { data: t, next: this.head };
        this.length === 0 && (this.tail = r), this.head = r, ++this.length;
      }
      shift() {
        if (this.length === 0)
          return;
        let t = this.head.data;
        return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, t;
      }
      clear() {
        this.head = this.tail = null, this.length = 0;
      }
      join(t) {
        if (this.length === 0)
          return "";
        let r = this.head, n = "" + r.data;
        for (;(r = r.next) !== null; )
          n += t + r.data;
        return n;
      }
      concat(t) {
        if (this.length === 0)
          return Wr.alloc(0);
        let r = Wr.allocUnsafe(t >>> 0), n = this.head, i = 0;
        for (;n; )
          Pt(r, n.data, i), i += n.data.length, n = n.next;
        return r;
      }
      consume(t, r) {
        let n = this.head.data;
        if (t < n.length) {
          let i = n.slice(0, t);
          return this.head.data = n.slice(t), i;
        }
        return t === n.length ? this.shift() : r ? this._getString(t) : this._getBuffer(t);
      }
      first() {
        return this.head.data;
      }
      *[cf]() {
        for (let t = this.head;t; t = t.next)
          yield t.data;
      }
      _getString(t) {
        let r = "", n = this.head, i = 0;
        do {
          let o = n.data;
          if (t > o.length)
            r += o, t -= o.length;
          else {
            t === o.length ? (r += o, ++i, n.next ? this.head = n.next : this.head = this.tail = null) : (r += _o(o, 0, t), this.head = n, n.data = _o(o, t));
            break;
          }
          ++i;
        } while ((n = n.next) !== null);
        return this.length -= i, r;
      }
      _getBuffer(t) {
        let r = Wr.allocUnsafe(t), n = t, i = this.head, o = 0;
        do {
          let l = i.data;
          if (t > l.length)
            Pt(r, l, n - t), t -= l.length;
          else {
            t === l.length ? (Pt(r, l, n - t), ++o, i.next ? this.head = i.next : this.head = this.tail = null) : (Pt(r, new df(l.buffer, l.byteOffset, t), n - t), this.head = i, i.data = l.slice(t));
            break;
          }
          ++o;
        } while ((i = i.next) !== null);
        return this.length -= o, r;
      }
      [Symbol.for("nodejs.util.inspect.custom")](t, r) {
        return hf(this, { ...r, depth: 0, customInspect: false });
      }
    };
  });
  lt = S((Kh, xo) => {
    var { MathFloor: pf, NumberIsInteger: yf } = I(), { validateInteger: bf } = He(), { ERR_INVALID_ARG_VALUE: wf } = O().codes, mo = 16 * 1024, Ro = 16;
    function gf(e, t, r) {
      return e.highWaterMark != null ? e.highWaterMark : t ? e[r] : null;
    }
    function Ao(e) {
      return e ? Ro : mo;
    }
    function _f(e, t) {
      bf(t, "value", 0), e ? Ro = t : mo = t;
    }
    function Ef(e, t, r, n) {
      let i = gf(t, n, r);
      if (i != null) {
        if (!yf(i) || i < 0) {
          let o = n ? `options.${r}` : "options.highWaterMark";
          throw new wf(o, i);
        }
        return pf(i);
      }
      return Ao(e.objectMode);
    }
    xo.exports = { getHighWaterMark: Ef, getDefaultHighWaterMark: Ao, setDefaultHighWaterMark: _f };
  });
  Bo = S(($r, To) => {
    var qt = le(), te = qt.Buffer;
    function Io(e, t) {
      for (var r in e)
        t[r] = e[r];
    }
    te.from && te.alloc && te.allocUnsafe && te.allocUnsafeSlow ? To.exports = qt : (Io(qt, $r), $r.Buffer = Le);
    function Le(e, t, r) {
      return te(e, t, r);
    }
    Le.prototype = Object.create(te.prototype);
    Io(te, Le);
    Le.from = function(e, t, r) {
      if (typeof e == "number")
        throw new TypeError("Argument must not be a number");
      return te(e, t, r);
    };
    Le.alloc = function(e, t, r) {
      if (typeof e != "number")
        throw new TypeError("Argument must be a number");
      var n = te(e);
      return t !== undefined ? typeof r == "string" ? n.fill(t, r) : n.fill(t) : n.fill(0), n;
    };
    Le.allocUnsafe = function(e) {
      if (typeof e != "number")
        throw new TypeError("Argument must be a number");
      return te(e);
    };
    Le.allocUnsafeSlow = function(e) {
      if (typeof e != "number")
        throw new TypeError("Argument must be a number");
      return qt.SlowBuffer(e);
    };
  });
  Fo = S((No) => {
    var Hr = Bo().Buffer, Lo = Hr.isEncoding || function(e) {
      switch (e = "" + e, e && e.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function Sf(e) {
      if (!e)
        return "utf8";
      for (var t;; )
        switch (e) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return e;
          default:
            if (t)
              return;
            e = ("" + e).toLowerCase(), t = true;
        }
    }
    function mf(e) {
      var t = Sf(e);
      if (typeof t != "string" && (Hr.isEncoding === Lo || !Lo(e)))
        throw new Error("Unknown encoding: " + e);
      return t || e;
    }
    No.StringDecoder = ut;
    function ut(e) {
      this.encoding = mf(e);
      var t;
      switch (this.encoding) {
        case "utf16le":
          this.text = Bf, this.end = Lf, t = 4;
          break;
        case "utf8":
          this.fillLast = xf, t = 4;
          break;
        case "base64":
          this.text = Nf, this.end = Ff, t = 3;
          break;
        default:
          this.write = Mf, this.end = Cf;
          return;
      }
      this.lastNeed = 0, this.lastTotal = 0, this.lastChar = Hr.allocUnsafe(t);
    }
    ut.prototype.write = function(e) {
      if (e.length === 0)
        return "";
      var t, r;
      if (this.lastNeed) {
        if (t = this.fillLast(e), t === undefined)
          return "";
        r = this.lastNeed, this.lastNeed = 0;
      } else
        r = 0;
      return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || "";
    };
    ut.prototype.end = Tf;
    ut.prototype.text = If;
    ut.prototype.fillLast = function(e) {
      if (this.lastNeed <= e.length)
        return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
      e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length;
    };
    function jr(e) {
      return e <= 127 ? 0 : e >> 5 === 6 ? 2 : e >> 4 === 14 ? 3 : e >> 3 === 30 ? 4 : e >> 6 === 2 ? -1 : -2;
    }
    function Rf(e, t, r) {
      var n = t.length - 1;
      if (n < r)
        return 0;
      var i = jr(t[n]);
      return i >= 0 ? (i > 0 && (e.lastNeed = i - 1), i) : --n < r || i === -2 ? 0 : (i = jr(t[n]), i >= 0 ? (i > 0 && (e.lastNeed = i - 2), i) : --n < r || i === -2 ? 0 : (i = jr(t[n]), i >= 0 ? (i > 0 && (i === 2 ? i = 0 : e.lastNeed = i - 3), i) : 0));
    }
    function Af(e, t, r) {
      if ((t[0] & 192) !== 128)
        return e.lastNeed = 0, "�";
      if (e.lastNeed > 1 && t.length > 1) {
        if ((t[1] & 192) !== 128)
          return e.lastNeed = 1, "�";
        if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) !== 128)
          return e.lastNeed = 2, "�";
      }
    }
    function xf(e) {
      var t = this.lastTotal - this.lastNeed, r = Af(this, e, t);
      if (r !== undefined)
        return r;
      if (this.lastNeed <= e.length)
        return e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
      e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length;
    }
    function If(e, t) {
      var r = Rf(this, e, t);
      if (!this.lastNeed)
        return e.toString("utf8", t);
      this.lastTotal = r;
      var n = e.length - (r - this.lastNeed);
      return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n);
    }
    function Tf(e) {
      var t = e && e.length ? this.write(e) : "";
      return this.lastNeed ? t + "�" : t;
    }
    function Bf(e, t) {
      if ((e.length - t) % 2 === 0) {
        var r = e.toString("utf16le", t);
        if (r) {
          var n = r.charCodeAt(r.length - 1);
          if (n >= 55296 && n <= 56319)
            return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1);
        }
        return r;
      }
      return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
    }
    function Lf(e) {
      var t = e && e.length ? this.write(e) : "";
      if (this.lastNeed) {
        var r = this.lastTotal - this.lastNeed;
        return t + this.lastChar.toString("utf16le", 0, r);
      }
      return t;
    }
    function Nf(e, t) {
      var r = (e.length - t) % 3;
      return r === 0 ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, r === 1 ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r));
    }
    function Ff(e) {
      var t = e && e.length ? this.write(e) : "";
      return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
    }
    function Mf(e) {
      return e.toString(this.encoding);
    }
    function Cf(e) {
      return e && e.length ? this.write(e) : "";
    }
  });
  Mo = {};
  or(Mo, { StringDecoder: () => vt.StringDecoder, default: () => vt.StringDecoder });
  Co = kn(() => {
    vt = rt(Fo());
  });
  Gr = S((Xh, Po) => {
    var ko = (we(), ye(H)), { PromisePrototypeThen: kf, SymbolAsyncIterator: Do, SymbolIterator: Oo } = I(), { Buffer: Df } = le(), { ERR_INVALID_ARG_TYPE: Of, ERR_STREAM_NULL_VALUES: Pf } = O().codes;
    function qf(e, t, r) {
      let n;
      if (typeof t == "string" || t instanceof Df)
        return new e({ objectMode: true, ...r, read() {
          this.push(t), this.push(null);
        } });
      let i;
      if (t && t[Do])
        i = true, n = t[Do]();
      else if (t && t[Oo])
        i = false, n = t[Oo]();
      else
        throw new Of("iterable", ["Iterable"], t);
      let o = new e({ objectMode: true, highWaterMark: 1, ...r }), l = false;
      o._read = function() {
        l || (l = true, a());
      }, o._destroy = function(s, c) {
        kf(u(s), () => ko.nextTick(c, s), (d) => ko.nextTick(c, d || s));
      };
      async function u(s) {
        let c = s != null, d = typeof n.throw == "function";
        if (c && d) {
          let { value: y, done: h } = await n.throw(s);
          if (await y, h)
            return;
        }
        if (typeof n.return == "function") {
          let { value: y } = await n.return();
          await y;
        }
      }
      async function a() {
        for (;; ) {
          try {
            let { value: s, done: c } = i ? await n.next() : n.next();
            if (c)
              o.push(null);
            else {
              let d = s && typeof s.then == "function" ? await s : s;
              if (d === null)
                throw l = false, new Pf;
              if (o.push(d))
                continue;
              l = false;
            }
          } catch (s) {
            o.destroy(s);
          }
          break;
        }
      }
      return o;
    }
    Po.exports = qf;
  });
  at = S((Jh, tl) => {
    var V = (we(), ye(H)), { ArrayPrototypeIndexOf: vf, NumberIsInteger: Uf, NumberIsNaN: Wf, NumberParseInt: $f, ObjectDefineProperties: Zr, ObjectKeys: jf, ObjectSetPrototypeOf: Uo, Promise: Wo, SafeSet: Hf, SymbolAsyncDispose: Gf, SymbolAsyncIterator: Vf, Symbol: Yf } = I();
    tl.exports = b;
    b.ReadableState = jt;
    var { EventEmitter: Kf } = it(), { Stream: _e, prependListener: zf } = Dt(), { Buffer: Vr } = le(), { addAbortSignal: Xf } = ot(), $o = ae(), g = q().debuglog("stream", (e) => {
      g = e;
    }), Jf = So(), ze = Be(), { getHighWaterMark: Qf, getDefaultHighWaterMark: Zf } = lt(), { aggregateTwoErrors: qo, codes: { ERR_INVALID_ARG_TYPE: ec, ERR_METHOD_NOT_IMPLEMENTED: tc, ERR_OUT_OF_RANGE: rc, ERR_STREAM_PUSH_AFTER_EOF: nc, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: ic }, AbortError: oc } = O(), { validateObject: lc } = He(), Ne = Yf("kPaused"), { StringDecoder: jo } = (Co(), ye(Mo)), uc = Gr();
    Uo(b.prototype, _e.prototype);
    Uo(b, _e);
    var Yr = () => {
    }, { errorOrDestroy: Ye } = ze, Ke = 1 << 0, sc = 1 << 1, Ho = 1 << 2, st = 1 << 3, Go = 1 << 4, Ut = 1 << 5, Wt = 1 << 6, Vo = 1 << 7, ac = 1 << 8, fc = 1 << 9, cc = 1 << 10, Jr = 1 << 11, Qr = 1 << 12, dc = 1 << 13, hc = 1 << 14, pc = 1 << 15, Yo = 1 << 16, yc = 1 << 17, bc = 1 << 18;
    function M(e) {
      return { enumerable: false, get() {
        return (this.state & e) !== 0;
      }, set(t) {
        t ? this.state |= e : this.state &= ~e;
      } };
    }
    Zr(jt.prototype, { objectMode: M(Ke), ended: M(sc), endEmitted: M(Ho), reading: M(st), constructed: M(Go), sync: M(Ut), needReadable: M(Wt), emittedReadable: M(Vo), readableListening: M(ac), resumeScheduled: M(fc), errorEmitted: M(cc), emitClose: M(Jr), autoDestroy: M(Qr), destroyed: M(dc), closed: M(hc), closeEmitted: M(pc), multiAwaitDrain: M(Yo), readingMore: M(yc), dataEmitted: M(bc) });
    function jt(e, t, r) {
      typeof r != "boolean" && (r = t instanceof re()), this.state = Jr | Qr | Go | Ut, e && e.objectMode && (this.state |= Ke), r && e && e.readableObjectMode && (this.state |= Ke), this.highWaterMark = e ? Qf(this, e, "readableHighWaterMark", r) : Zf(false), this.buffer = new Jf, this.length = 0, this.pipes = [], this.flowing = null, this[Ne] = null, e && e.emitClose === false && (this.state &= ~Jr), e && e.autoDestroy === false && (this.state &= ~Qr), this.errored = null, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new jo(e.encoding), this.encoding = e.encoding);
    }
    function b(e) {
      if (!(this instanceof b))
        return new b(e);
      let t = this instanceof re();
      this._readableState = new jt(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && Xf(e.signal, this)), _e.call(this, e), ze.construct(this, () => {
        this._readableState.needReadable && $t(this, this._readableState);
      });
    }
    b.prototype.destroy = ze.destroy;
    b.prototype._undestroy = ze.undestroy;
    b.prototype._destroy = function(e, t) {
      t(e);
    };
    b.prototype[Kf.captureRejectionSymbol] = function(e) {
      this.destroy(e);
    };
    b.prototype[Gf] = function() {
      let e;
      return this.destroyed || (e = this.readableEnded ? null : new oc, this.destroy(e)), new Wo((t, r) => $o(this, (n) => n && n !== e ? r(n) : t(null)));
    };
    b.prototype.push = function(e, t) {
      return Ko(this, e, t, false);
    };
    b.prototype.unshift = function(e, t) {
      return Ko(this, e, t, true);
    };
    function Ko(e, t, r, n) {
      g("readableAddChunk", t);
      let i = e._readableState, o;
      if ((i.state & Ke) === 0 && (typeof t == "string" ? (r = r || i.defaultEncoding, i.encoding !== r && (n && i.encoding ? t = Vr.from(t, r).toString(i.encoding) : (t = Vr.from(t, r), r = ""))) : t instanceof Vr ? r = "" : _e._isUint8Array(t) ? (t = _e._uint8ArrayToBuffer(t), r = "") : t != null && (o = new ec("chunk", ["string", "Buffer", "Uint8Array"], t))), o)
        Ye(e, o);
      else if (t === null)
        i.state &= ~st, _c(e, i);
      else if ((i.state & Ke) !== 0 || t && t.length > 0)
        if (n)
          if ((i.state & Ho) !== 0)
            Ye(e, new ic);
          else {
            if (i.destroyed || i.errored)
              return false;
            Kr(e, i, t, true);
          }
        else if (i.ended)
          Ye(e, new nc);
        else {
          if (i.destroyed || i.errored)
            return false;
          i.state &= ~st, i.decoder && !r ? (t = i.decoder.write(t), i.objectMode || t.length !== 0 ? Kr(e, i, t, false) : $t(e, i)) : Kr(e, i, t, false);
        }
      else
        n || (i.state &= ~st, $t(e, i));
      return !i.ended && (i.length < i.highWaterMark || i.length === 0);
    }
    function Kr(e, t, r, n) {
      t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? ((t.state & Yo) !== 0 ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null, t.dataEmitted = true, e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), (t.state & Wt) !== 0 && Ht(e)), $t(e, t);
    }
    b.prototype.isPaused = function() {
      let e = this._readableState;
      return e[Ne] === true || e.flowing === false;
    };
    b.prototype.setEncoding = function(e) {
      let t = new jo(e);
      this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
      let r = this._readableState.buffer, n = "";
      for (let i of r)
        n += t.write(i);
      return r.clear(), n !== "" && r.push(n), this._readableState.length = n.length, this;
    };
    var wc = 1073741824;
    function gc(e) {
      if (e > wc)
        throw new rc("size", "<= 1GiB", e);
      return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
    }
    function vo(e, t) {
      return e <= 0 || t.length === 0 && t.ended ? 0 : (t.state & Ke) !== 0 ? 1 : Wf(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0;
    }
    b.prototype.read = function(e) {
      g("read", e), e === undefined ? e = NaN : Uf(e) || (e = $f(e, 10));
      let t = this._readableState, r = e;
      if (e > t.highWaterMark && (t.highWaterMark = gc(e)), e !== 0 && (t.state &= ~Vo), e === 0 && t.needReadable && ((t.highWaterMark !== 0 ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
        return g("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? zr(this) : Ht(this), null;
      if (e = vo(e, t), e === 0 && t.ended)
        return t.length === 0 && zr(this), null;
      let n = (t.state & Wt) !== 0;
      if (g("need readable", n), (t.length === 0 || t.length - e < t.highWaterMark) && (n = true, g("length less than watermark", n)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed)
        n = false, g("reading, ended or constructing", n);
      else if (n) {
        g("do read"), t.state |= st | Ut, t.length === 0 && (t.state |= Wt);
        try {
          this._read(t.highWaterMark);
        } catch (o) {
          Ye(this, o);
        }
        t.state &= ~Ut, t.reading || (e = vo(r, t));
      }
      let i;
      return e > 0 ? i = Zo(e, t) : i = null, i === null ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null), t.length === 0 && (t.ended || (t.needReadable = true), r !== e && t.ended && zr(this)), i !== null && !t.errorEmitted && !t.closeEmitted && (t.dataEmitted = true, this.emit("data", i)), i;
    };
    function _c(e, t) {
      if (g("onEofChunk"), !t.ended) {
        if (t.decoder) {
          let r = t.decoder.end();
          r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length);
        }
        t.ended = true, t.sync ? Ht(e) : (t.needReadable = false, t.emittedReadable = true, zo(e));
      }
    }
    function Ht(e) {
      let t = e._readableState;
      g("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = false, t.emittedReadable || (g("emitReadable", t.flowing), t.emittedReadable = true, V.nextTick(zo, e));
    }
    function zo(e) {
      let t = e._readableState;
      g("emitReadable_", t.destroyed, t.length, t.ended), !t.destroyed && !t.errored && (t.length || t.ended) && (e.emit("readable"), t.emittedReadable = false), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, Jo(e);
    }
    function $t(e, t) {
      !t.readingMore && t.constructed && (t.readingMore = true, V.nextTick(Ec, e, t));
    }
    function Ec(e, t) {
      for (;!t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && t.length === 0); ) {
        let r = t.length;
        if (g("maybeReadMore read 0"), e.read(0), r === t.length)
          break;
      }
      t.readingMore = false;
    }
    b.prototype._read = function(e) {
      throw new tc("_read()");
    };
    b.prototype.pipe = function(e, t) {
      let r = this, n = this._readableState;
      n.pipes.length === 1 && (n.multiAwaitDrain || (n.multiAwaitDrain = true, n.awaitDrainWriters = new Hf(n.awaitDrainWriters ? [n.awaitDrainWriters] : []))), n.pipes.push(e), g("pipe count=%d opts=%j", n.pipes.length, t);
      let o = (!t || t.end !== false) && e !== V.stdout && e !== V.stderr ? u : R;
      n.endEmitted ? V.nextTick(o) : r.once("end", o), e.on("unpipe", l);
      function l(w, x) {
        g("onunpipe"), w === r && x && x.hasUnpiped === false && (x.hasUnpiped = true, c());
      }
      function u() {
        g("onend"), e.end();
      }
      let a, s = false;
      function c() {
        g("cleanup"), e.removeListener("close", _), e.removeListener("finish", p), a && e.removeListener("drain", a), e.removeListener("error", h), e.removeListener("unpipe", l), r.removeListener("end", u), r.removeListener("end", R), r.removeListener("data", y), s = true, a && n.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && a();
      }
      function d() {
        s || (n.pipes.length === 1 && n.pipes[0] === e ? (g("false write response, pause", 0), n.awaitDrainWriters = e, n.multiAwaitDrain = false) : n.pipes.length > 1 && n.pipes.includes(e) && (g("false write response, pause", n.awaitDrainWriters.size), n.awaitDrainWriters.add(e)), r.pause()), a || (a = Sc(r, e), e.on("drain", a));
      }
      r.on("data", y);
      function y(w) {
        g("ondata");
        let x = e.write(w);
        g("dest.write", x), x === false && d();
      }
      function h(w) {
        if (g("onerror", w), R(), e.removeListener("error", h), e.listenerCount("error") === 0) {
          let x = e._writableState || e._readableState;
          x && !x.errorEmitted ? Ye(e, w) : e.emit("error", w);
        }
      }
      zf(e, "error", h);
      function _() {
        e.removeListener("finish", p), R();
      }
      e.once("close", _);
      function p() {
        g("onfinish"), e.removeListener("close", _), R();
      }
      e.once("finish", p);
      function R() {
        g("unpipe"), r.unpipe(e);
      }
      return e.emit("pipe", r), e.writableNeedDrain === true ? d() : n.flowing || (g("pipe resume"), r.resume()), e;
    };
    function Sc(e, t) {
      return function() {
        let n = e._readableState;
        n.awaitDrainWriters === t ? (g("pipeOnDrain", 1), n.awaitDrainWriters = null) : n.multiAwaitDrain && (g("pipeOnDrain", n.awaitDrainWriters.size), n.awaitDrainWriters.delete(t)), (!n.awaitDrainWriters || n.awaitDrainWriters.size === 0) && e.listenerCount("data") && e.resume();
      };
    }
    b.prototype.unpipe = function(e) {
      let t = this._readableState, r = { hasUnpiped: false };
      if (t.pipes.length === 0)
        return this;
      if (!e) {
        let i = t.pipes;
        t.pipes = [], this.pause();
        for (let o = 0;o < i.length; o++)
          i[o].emit("unpipe", this, { hasUnpiped: false });
        return this;
      }
      let n = vf(t.pipes, e);
      return n === -1 ? this : (t.pipes.splice(n, 1), t.pipes.length === 0 && this.pause(), e.emit("unpipe", this, r), this);
    };
    b.prototype.on = function(e, t) {
      let r = _e.prototype.on.call(this, e, t), n = this._readableState;
      return e === "data" ? (n.readableListening = this.listenerCount("readable") > 0, n.flowing !== false && this.resume()) : e === "readable" && !n.endEmitted && !n.readableListening && (n.readableListening = n.needReadable = true, n.flowing = false, n.emittedReadable = false, g("on readable", n.length, n.reading), n.length ? Ht(this) : n.reading || V.nextTick(mc, this)), r;
    };
    b.prototype.addListener = b.prototype.on;
    b.prototype.removeListener = function(e, t) {
      let r = _e.prototype.removeListener.call(this, e, t);
      return e === "readable" && V.nextTick(Xo, this), r;
    };
    b.prototype.off = b.prototype.removeListener;
    b.prototype.removeAllListeners = function(e) {
      let t = _e.prototype.removeAllListeners.apply(this, arguments);
      return (e === "readable" || e === undefined) && V.nextTick(Xo, this), t;
    };
    function Xo(e) {
      let t = e._readableState;
      t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && t[Ne] === false ? t.flowing = true : e.listenerCount("data") > 0 ? e.resume() : t.readableListening || (t.flowing = null);
    }
    function mc(e) {
      g("readable nexttick read 0"), e.read(0);
    }
    b.prototype.resume = function() {
      let e = this._readableState;
      return e.flowing || (g("resume"), e.flowing = !e.readableListening, Rc(this, e)), e[Ne] = false, this;
    };
    function Rc(e, t) {
      t.resumeScheduled || (t.resumeScheduled = true, V.nextTick(Ac, e, t));
    }
    function Ac(e, t) {
      g("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = false, e.emit("resume"), Jo(e), t.flowing && !t.reading && e.read(0);
    }
    b.prototype.pause = function() {
      return g("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false && (g("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState[Ne] = true, this;
    };
    function Jo(e) {
      let t = e._readableState;
      for (g("flow", t.flowing);t.flowing && e.read() !== null; )
        ;
    }
    b.prototype.wrap = function(e) {
      let t = false;
      e.on("data", (n) => {
        !this.push(n) && e.pause && (t = true, e.pause());
      }), e.on("end", () => {
        this.push(null);
      }), e.on("error", (n) => {
        Ye(this, n);
      }), e.on("close", () => {
        this.destroy();
      }), e.on("destroy", () => {
        this.destroy();
      }), this._read = () => {
        t && e.resume && (t = false, e.resume());
      };
      let r = jf(e);
      for (let n = 1;n < r.length; n++) {
        let i = r[n];
        this[i] === undefined && typeof e[i] == "function" && (this[i] = e[i].bind(e));
      }
      return this;
    };
    b.prototype[Vf] = function() {
      return Qo(this);
    };
    b.prototype.iterator = function(e) {
      return e !== undefined && lc(e, "options"), Qo(this, e);
    };
    function Qo(e, t) {
      typeof e.read != "function" && (e = b.wrap(e, { objectMode: true }));
      let r = xc(e, t);
      return r.stream = e, r;
    }
    async function* xc(e, t) {
      let r = Yr;
      function n(l) {
        this === e ? (r(), r = Yr) : r = l;
      }
      e.on("readable", n);
      let i, o = $o(e, { writable: false }, (l) => {
        i = l ? qo(i, l) : null, r(), r = Yr;
      });
      try {
        for (;; ) {
          let l = e.destroyed ? null : e.read();
          if (l !== null)
            yield l;
          else {
            if (i)
              throw i;
            if (i === null)
              return;
            await new Wo(n);
          }
        }
      } catch (l) {
        throw i = qo(i, l), i;
      } finally {
        (i || t?.destroyOnReturn !== false) && (i === undefined || e._readableState.autoDestroy) ? ze.destroyer(e, null) : (e.off("readable", n), o());
      }
    }
    Zr(b.prototype, { readable: { __proto__: null, get() {
      let e = this._readableState;
      return !!e && e.readable !== false && !e.destroyed && !e.errorEmitted && !e.endEmitted;
    }, set(e) {
      this._readableState && (this._readableState.readable = !!e);
    } }, readableDidRead: { __proto__: null, enumerable: false, get: function() {
      return this._readableState.dataEmitted;
    } }, readableAborted: { __proto__: null, enumerable: false, get: function() {
      return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
    } }, readableHighWaterMark: { __proto__: null, enumerable: false, get: function() {
      return this._readableState.highWaterMark;
    } }, readableBuffer: { __proto__: null, enumerable: false, get: function() {
      return this._readableState && this._readableState.buffer;
    } }, readableFlowing: { __proto__: null, enumerable: false, get: function() {
      return this._readableState.flowing;
    }, set: function(e) {
      this._readableState && (this._readableState.flowing = e);
    } }, readableLength: { __proto__: null, enumerable: false, get() {
      return this._readableState.length;
    } }, readableObjectMode: { __proto__: null, enumerable: false, get() {
      return this._readableState ? this._readableState.objectMode : false;
    } }, readableEncoding: { __proto__: null, enumerable: false, get() {
      return this._readableState ? this._readableState.encoding : null;
    } }, errored: { __proto__: null, enumerable: false, get() {
      return this._readableState ? this._readableState.errored : null;
    } }, closed: { __proto__: null, get() {
      return this._readableState ? this._readableState.closed : false;
    } }, destroyed: { __proto__: null, enumerable: false, get() {
      return this._readableState ? this._readableState.destroyed : false;
    }, set(e) {
      !this._readableState || (this._readableState.destroyed = e);
    } }, readableEnded: { __proto__: null, enumerable: false, get() {
      return this._readableState ? this._readableState.endEmitted : false;
    } } });
    Zr(jt.prototype, { pipesCount: { __proto__: null, get() {
      return this.pipes.length;
    } }, paused: { __proto__: null, get() {
      return this[Ne] !== false;
    }, set(e) {
      this[Ne] = !!e;
    } } });
    b._fromList = Zo;
    function Zo(e, t) {
      if (t.length === 0)
        return null;
      let r;
      return t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (t.decoder ? r = t.buffer.join("") : t.buffer.length === 1 ? r = t.buffer.first() : r = t.buffer.concat(t.length), t.buffer.clear()) : r = t.buffer.consume(e, t.decoder), r;
    }
    function zr(e) {
      let t = e._readableState;
      g("endReadable", t.endEmitted), t.endEmitted || (t.ended = true, V.nextTick(Ic, t, e));
    }
    function Ic(e, t) {
      if (g("endReadableNT", e.endEmitted, e.length), !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0) {
        if (e.endEmitted = true, t.emit("end"), t.writable && t.allowHalfOpen === false)
          V.nextTick(Tc, t);
        else if (e.autoDestroy) {
          let r = t._writableState;
          (!r || r.autoDestroy && (r.finished || r.writable === false)) && t.destroy();
        }
      }
    }
    function Tc(e) {
      e.writable && !e.writableEnded && !e.destroyed && e.end();
    }
    b.from = function(e, t) {
      return uc(b, e, t);
    };
    var Xr;
    function el() {
      return Xr === undefined && (Xr = {}), Xr;
    }
    b.fromWeb = function(e, t) {
      return el().newStreamReadableFromReadableStream(e, t);
    };
    b.toWeb = function(e, t) {
      return el().newReadableStreamFromStreamReadable(e, t);
    };
    b.wrap = function(e, t) {
      var r, n;
      return new b({ objectMode: (r = (n = e.readableObjectMode) !== null && n !== undefined ? n : e.objectMode) !== null && r !== undefined ? r : true, ...t, destroy(i, o) {
        ze.destroyer(e, i), o(i);
      } }).wrap(e);
    };
  });
  zt = S((Qh, hl) => {
    var Fe = (we(), ye(H)), { ArrayPrototypeSlice: il, Error: Bc, FunctionPrototypeSymbolHasInstance: ol, ObjectDefineProperty: ll, ObjectDefineProperties: Lc, ObjectSetPrototypeOf: ul, StringPrototypeToLowerCase: Nc, Symbol: Fc, SymbolHasInstance: Mc } = I();
    hl.exports = T;
    T.WritableState = dt;
    var { EventEmitter: Cc } = it(), ft = Dt().Stream, { Buffer: Gt } = le(), Kt = Be(), { addAbortSignal: kc } = ot(), { getHighWaterMark: Dc, getDefaultHighWaterMark: Oc } = lt(), { ERR_INVALID_ARG_TYPE: Pc, ERR_METHOD_NOT_IMPLEMENTED: qc, ERR_MULTIPLE_CALLBACK: sl, ERR_STREAM_CANNOT_PIPE: vc, ERR_STREAM_DESTROYED: ct, ERR_STREAM_ALREADY_FINISHED: Uc, ERR_STREAM_NULL_VALUES: Wc, ERR_STREAM_WRITE_AFTER_END: $c, ERR_UNKNOWN_ENCODING: al } = O().codes, { errorOrDestroy: Xe } = Kt;
    ul(T.prototype, ft.prototype);
    ul(T, ft);
    function rn() {
    }
    var Je = Fc("kOnFinished");
    function dt(e, t, r) {
      typeof r != "boolean" && (r = t instanceof re()), this.objectMode = !!(e && e.objectMode), r && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? Dc(this, e, "writableHighWaterMark", r) : Oc(false), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
      let n = !!(e && e.decodeStrings === false);
      this.decodeStrings = !n, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = Hc.bind(undefined, t), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, Yt(this), this.pendingcb = 0, this.constructed = true, this.prefinished = false, this.errorEmitted = false, this.emitClose = !e || e.emitClose !== false, this.autoDestroy = !e || e.autoDestroy !== false, this.errored = null, this.closed = false, this.closeEmitted = false, this[Je] = [];
    }
    function Yt(e) {
      e.buffered = [], e.bufferedIndex = 0, e.allBuffers = true, e.allNoop = true;
    }
    dt.prototype.getBuffer = function() {
      return il(this.buffered, this.bufferedIndex);
    };
    ll(dt.prototype, "bufferedRequestCount", { __proto__: null, get() {
      return this.buffered.length - this.bufferedIndex;
    } });
    function T(e) {
      let t = this instanceof re();
      if (!t && !ol(T, this))
        return new T(e);
      this._writableState = new dt(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && kc(e.signal, this)), ft.call(this, e), Kt.construct(this, () => {
        let r = this._writableState;
        r.writing || on(this, r), ln(this, r);
      });
    }
    ll(T, Mc, { __proto__: null, value: function(e) {
      return ol(this, e) ? true : this !== T ? false : e && e._writableState instanceof dt;
    } });
    T.prototype.pipe = function() {
      Xe(this, new vc);
    };
    function fl(e, t, r, n) {
      let i = e._writableState;
      if (typeof r == "function")
        n = r, r = i.defaultEncoding;
      else {
        if (!r)
          r = i.defaultEncoding;
        else if (r !== "buffer" && !Gt.isEncoding(r))
          throw new al(r);
        typeof n != "function" && (n = rn);
      }
      if (t === null)
        throw new Wc;
      if (!i.objectMode)
        if (typeof t == "string")
          i.decodeStrings !== false && (t = Gt.from(t, r), r = "buffer");
        else if (t instanceof Gt)
          r = "buffer";
        else if (ft._isUint8Array(t))
          t = ft._uint8ArrayToBuffer(t), r = "buffer";
        else
          throw new Pc("chunk", ["string", "Buffer", "Uint8Array"], t);
      let o;
      return i.ending ? o = new $c : i.destroyed && (o = new ct("write")), o ? (Fe.nextTick(n, o), Xe(e, o, true), o) : (i.pendingcb++, jc(e, i, t, r, n));
    }
    T.prototype.write = function(e, t, r) {
      return fl(this, e, t, r) === true;
    };
    T.prototype.cork = function() {
      this._writableState.corked++;
    };
    T.prototype.uncork = function() {
      let e = this._writableState;
      e.corked && (e.corked--, e.writing || on(this, e));
    };
    T.prototype.setDefaultEncoding = function(t) {
      if (typeof t == "string" && (t = Nc(t)), !Gt.isEncoding(t))
        throw new al(t);
      return this._writableState.defaultEncoding = t, this;
    };
    function jc(e, t, r, n, i) {
      let o = t.objectMode ? 1 : r.length;
      t.length += o;
      let l = t.length < t.highWaterMark;
      return l || (t.needDrain = true), t.writing || t.corked || t.errored || !t.constructed ? (t.buffered.push({ chunk: r, encoding: n, callback: i }), t.allBuffers && n !== "buffer" && (t.allBuffers = false), t.allNoop && i !== rn && (t.allNoop = false)) : (t.writelen = o, t.writecb = i, t.writing = true, t.sync = true, e._write(r, n, t.onwrite), t.sync = false), l && !t.errored && !t.destroyed;
    }
    function rl(e, t, r, n, i, o, l) {
      t.writelen = n, t.writecb = l, t.writing = true, t.sync = true, t.destroyed ? t.onwrite(new ct("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = false;
    }
    function nl(e, t, r, n) {
      --t.pendingcb, n(r), nn(t), Xe(e, r);
    }
    function Hc(e, t) {
      let r = e._writableState, n = r.sync, i = r.writecb;
      if (typeof i != "function") {
        Xe(e, new sl);
        return;
      }
      r.writing = false, r.writecb = null, r.length -= r.writelen, r.writelen = 0, t ? (t.stack, r.errored || (r.errored = t), e._readableState && !e._readableState.errored && (e._readableState.errored = t), n ? Fe.nextTick(nl, e, r, t, i) : nl(e, r, t, i)) : (r.buffered.length > r.bufferedIndex && on(e, r), n ? r.afterWriteTickInfo !== null && r.afterWriteTickInfo.cb === i ? r.afterWriteTickInfo.count++ : (r.afterWriteTickInfo = { count: 1, cb: i, stream: e, state: r }, Fe.nextTick(Gc, r.afterWriteTickInfo)) : cl(e, r, 1, i));
    }
    function Gc({ stream: e, state: t, count: r, cb: n }) {
      return t.afterWriteTickInfo = null, cl(e, t, r, n);
    }
    function cl(e, t, r, n) {
      for (!t.ending && !e.destroyed && t.length === 0 && t.needDrain && (t.needDrain = false, e.emit("drain"));r-- > 0; )
        t.pendingcb--, n();
      t.destroyed && nn(t), ln(e, t);
    }
    function nn(e) {
      if (e.writing)
        return;
      for (let i = e.bufferedIndex;i < e.buffered.length; ++i) {
        var t;
        let { chunk: o, callback: l } = e.buffered[i], u = e.objectMode ? 1 : o.length;
        e.length -= u, l((t = e.errored) !== null && t !== undefined ? t : new ct("write"));
      }
      let r = e[Je].splice(0);
      for (let i = 0;i < r.length; i++) {
        var n;
        r[i]((n = e.errored) !== null && n !== undefined ? n : new ct("end"));
      }
      Yt(e);
    }
    function on(e, t) {
      if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed)
        return;
      let { buffered: r, bufferedIndex: n, objectMode: i } = t, o = r.length - n;
      if (!o)
        return;
      let l = n;
      if (t.bufferProcessing = true, o > 1 && e._writev) {
        t.pendingcb -= o - 1;
        let u = t.allNoop ? rn : (s) => {
          for (let c = l;c < r.length; ++c)
            r[c].callback(s);
        }, a = t.allNoop && l === 0 ? r : il(r, l);
        a.allBuffers = t.allBuffers, rl(e, t, true, t.length, a, "", u), Yt(t);
      } else {
        do {
          let { chunk: u, encoding: a, callback: s } = r[l];
          r[l++] = null;
          let c = i ? 1 : u.length;
          rl(e, t, false, c, u, a, s);
        } while (l < r.length && !t.writing);
        l === r.length ? Yt(t) : l > 256 ? (r.splice(0, l), t.bufferedIndex = 0) : t.bufferedIndex = l;
      }
      t.bufferProcessing = false;
    }
    T.prototype._write = function(e, t, r) {
      if (this._writev)
        this._writev([{ chunk: e, encoding: t }], r);
      else
        throw new qc("_write()");
    };
    T.prototype._writev = null;
    T.prototype.end = function(e, t, r) {
      let n = this._writableState;
      typeof e == "function" ? (r = e, e = null, t = null) : typeof t == "function" && (r = t, t = null);
      let i;
      if (e != null) {
        let o = fl(this, e, t);
        o instanceof Bc && (i = o);
      }
      return n.corked && (n.corked = 1, this.uncork()), i || (!n.errored && !n.ending ? (n.ending = true, ln(this, n, true), n.ended = true) : n.finished ? i = new Uc("end") : n.destroyed && (i = new ct("end"))), typeof r == "function" && (i || n.finished ? Fe.nextTick(r, i) : n[Je].push(r)), this;
    };
    function Vt(e) {
      return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
    }
    function Vc(e, t) {
      let r = false;
      function n(i) {
        if (r) {
          Xe(e, i ?? sl());
          return;
        }
        if (r = true, t.pendingcb--, i) {
          let o = t[Je].splice(0);
          for (let l = 0;l < o.length; l++)
            o[l](i);
          Xe(e, i, t.sync);
        } else
          Vt(t) && (t.prefinished = true, e.emit("prefinish"), t.pendingcb++, Fe.nextTick(tn, e, t));
      }
      t.sync = true, t.pendingcb++;
      try {
        e._final(n);
      } catch (i) {
        n(i);
      }
      t.sync = false;
    }
    function Yc(e, t) {
      !t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = true, Vc(e, t)) : (t.prefinished = true, e.emit("prefinish")));
    }
    function ln(e, t, r) {
      Vt(t) && (Yc(e, t), t.pendingcb === 0 && (r ? (t.pendingcb++, Fe.nextTick((n, i) => {
        Vt(i) ? tn(n, i) : i.pendingcb--;
      }, e, t)) : Vt(t) && (t.pendingcb++, tn(e, t))));
    }
    function tn(e, t) {
      t.pendingcb--, t.finished = true;
      let r = t[Je].splice(0);
      for (let n = 0;n < r.length; n++)
        r[n]();
      if (e.emit("finish"), t.autoDestroy) {
        let n = e._readableState;
        (!n || n.autoDestroy && (n.endEmitted || n.readable === false)) && e.destroy();
      }
    }
    Lc(T.prototype, { closed: { __proto__: null, get() {
      return this._writableState ? this._writableState.closed : false;
    } }, destroyed: { __proto__: null, get() {
      return this._writableState ? this._writableState.destroyed : false;
    }, set(e) {
      this._writableState && (this._writableState.destroyed = e);
    } }, writable: { __proto__: null, get() {
      let e = this._writableState;
      return !!e && e.writable !== false && !e.destroyed && !e.errored && !e.ending && !e.ended;
    }, set(e) {
      this._writableState && (this._writableState.writable = !!e);
    } }, writableFinished: { __proto__: null, get() {
      return this._writableState ? this._writableState.finished : false;
    } }, writableObjectMode: { __proto__: null, get() {
      return this._writableState ? this._writableState.objectMode : false;
    } }, writableBuffer: { __proto__: null, get() {
      return this._writableState && this._writableState.getBuffer();
    } }, writableEnded: { __proto__: null, get() {
      return this._writableState ? this._writableState.ending : false;
    } }, writableNeedDrain: { __proto__: null, get() {
      let e = this._writableState;
      return e ? !e.destroyed && !e.ending && e.needDrain : false;
    } }, writableHighWaterMark: { __proto__: null, get() {
      return this._writableState && this._writableState.highWaterMark;
    } }, writableCorked: { __proto__: null, get() {
      return this._writableState ? this._writableState.corked : 0;
    } }, writableLength: { __proto__: null, get() {
      return this._writableState && this._writableState.length;
    } }, errored: { __proto__: null, enumerable: false, get() {
      return this._writableState ? this._writableState.errored : null;
    } }, writableAborted: { __proto__: null, enumerable: false, get: function() {
      return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
    } } });
    var Kc = Kt.destroy;
    T.prototype.destroy = function(e, t) {
      let r = this._writableState;
      return !r.destroyed && (r.bufferedIndex < r.buffered.length || r[Je].length) && Fe.nextTick(nn, r), Kc.call(this, e, t), this;
    };
    T.prototype._undestroy = Kt.undestroy;
    T.prototype._destroy = function(e, t) {
      t(e);
    };
    T.prototype[Cc.captureRejectionSymbol] = function(e) {
      this.destroy(e);
    };
    var en;
    function dl() {
      return en === undefined && (en = {}), en;
    }
    T.fromWeb = function(e, t) {
      return dl().newStreamWritableFromWritableStream(e, t);
    };
    T.toWeb = function(e) {
      return dl().newWritableStreamFromStreamWritable(e);
    };
  });
  Bl = S((Zh, Tl) => {
    var un = (we(), ye(H)), zc = le(), { isReadable: Xc, isWritable: Jc, isIterable: pl, isNodeStream: Qc, isReadableNodeStream: yl, isWritableNodeStream: bl, isDuplexNodeStream: Zc, isReadableStream: wl, isWritableStream: gl } = Z(), _l = ae(), { AbortError: xl, codes: { ERR_INVALID_ARG_TYPE: ed, ERR_INVALID_RETURN_VALUE: El } } = O(), { destroyer: Ze } = Be(), td = re(), Il = at(), rd = zt(), { createDeferredPromise: Sl } = q(), ml = Gr(), Rl = globalThis.Blob || zc.Blob, nd = typeof Rl < "u" ? function(t) {
      return t instanceof Rl;
    } : function(t) {
      return false;
    }, id = globalThis.AbortController || We().AbortController, { FunctionPrototypeCall: Al } = I(), Ee = class extends td {
      constructor(t) {
        super(t), t?.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), t?.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true);
      }
    };
    Tl.exports = function e(t, r) {
      if (Zc(t))
        return t;
      if (yl(t))
        return Qe({ readable: t });
      if (bl(t))
        return Qe({ writable: t });
      if (Qc(t))
        return Qe({ writable: false, readable: false });
      if (wl(t))
        return Qe({ readable: Il.fromWeb(t) });
      if (gl(t))
        return Qe({ writable: rd.fromWeb(t) });
      if (typeof t == "function") {
        let { value: i, write: o, final: l, destroy: u } = od(t);
        if (pl(i))
          return ml(Ee, i, { objectMode: true, write: o, final: l, destroy: u });
        let a = i?.then;
        if (typeof a == "function") {
          let s, c = Al(a, i, (d) => {
            if (d != null)
              throw new El("nully", "body", d);
          }, (d) => {
            Ze(s, d);
          });
          return s = new Ee({ objectMode: true, readable: false, write: o, final(d) {
            l(async () => {
              try {
                await c, un.nextTick(d, null);
              } catch (y) {
                un.nextTick(d, y);
              }
            });
          }, destroy: u });
        }
        throw new El("Iterable, AsyncIterable or AsyncFunction", r, i);
      }
      if (nd(t))
        return e(t.arrayBuffer());
      if (pl(t))
        return ml(Ee, t, { objectMode: true, writable: false });
      if (wl(t?.readable) && gl(t?.writable))
        return Ee.fromWeb(t);
      if (typeof t?.writable == "object" || typeof t?.readable == "object") {
        let i = t != null && t.readable ? yl(t?.readable) ? t?.readable : e(t.readable) : undefined, o = t != null && t.writable ? bl(t?.writable) ? t?.writable : e(t.writable) : undefined;
        return Qe({ readable: i, writable: o });
      }
      let n = t?.then;
      if (typeof n == "function") {
        let i;
        return Al(n, t, (o) => {
          o != null && i.push(o), i.push(null);
        }, (o) => {
          Ze(i, o);
        }), i = new Ee({ objectMode: true, writable: false, read() {
        } });
      }
      throw new ed(r, ["Blob", "ReadableStream", "WritableStream", "Stream", "Iterable", "AsyncIterable", "Function", "{ readable, writable } pair", "Promise"], t);
    };
    function od(e) {
      let { promise: t, resolve: r } = Sl(), n = new id, i = n.signal;
      return { value: e(async function* () {
        for (;; ) {
          let l = t;
          t = null;
          let { chunk: u, done: a, cb: s } = await l;
          if (un.nextTick(s), a)
            return;
          if (i.aborted)
            throw new xl(undefined, { cause: i.reason });
          ({ promise: t, resolve: r } = Sl()), yield u;
        }
      }(), { signal: i }), write(l, u, a) {
        let s = r;
        r = null, s({ chunk: l, done: false, cb: a });
      }, final(l) {
        let u = r;
        r = null, u({ done: true, cb: l });
      }, destroy(l, u) {
        n.abort(), u(l);
      } };
    }
    function Qe(e) {
      let t = e.readable && typeof e.readable.read != "function" ? Il.wrap(e.readable) : e.readable, r = e.writable, n = !!Xc(t), i = !!Jc(r), o, l, u, a, s;
      function c(d) {
        let y = a;
        a = null, y ? y(d) : d && s.destroy(d);
      }
      return s = new Ee({ readableObjectMode: !!(t != null && t.readableObjectMode), writableObjectMode: !!(r != null && r.writableObjectMode), readable: n, writable: i }), i && (_l(r, (d) => {
        i = false, d && Ze(t, d), c(d);
      }), s._write = function(d, y, h) {
        r.write(d, y) ? h() : o = h;
      }, s._final = function(d) {
        r.end(), l = d;
      }, r.on("drain", function() {
        if (o) {
          let d = o;
          o = null, d();
        }
      }), r.on("finish", function() {
        if (l) {
          let d = l;
          l = null, d();
        }
      })), n && (_l(t, (d) => {
        n = false, d && Ze(t, d), c(d);
      }), t.on("readable", function() {
        if (u) {
          let d = u;
          u = null, d();
        }
      }), t.on("end", function() {
        s.push(null);
      }), s._read = function() {
        for (;; ) {
          let d = t.read();
          if (d === null) {
            u = s._read;
            return;
          }
          if (!s.push(d))
            return;
        }
      }), s._destroy = function(d, y) {
        !d && a !== null && (d = new xl), u = null, o = null, l = null, a === null ? y(d) : (a = y, Ze(r, d), Ze(t, d));
      }, s;
    }
  });
  re = S((ep, Fl) => {
    var { ObjectDefineProperties: ld, ObjectGetOwnPropertyDescriptor: fe, ObjectKeys: ud, ObjectSetPrototypeOf: Ll } = I();
    Fl.exports = Y;
    var fn = at(), G = zt();
    Ll(Y.prototype, fn.prototype);
    Ll(Y, fn);
    {
      let e = ud(G.prototype);
      for (let t = 0;t < e.length; t++) {
        let r = e[t];
        Y.prototype[r] || (Y.prototype[r] = G.prototype[r]);
      }
    }
    function Y(e) {
      if (!(this instanceof Y))
        return new Y(e);
      fn.call(this, e), G.call(this, e), e ? (this.allowHalfOpen = e.allowHalfOpen !== false, e.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), e.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true)) : this.allowHalfOpen = true;
    }
    ld(Y.prototype, { writable: { __proto__: null, ...fe(G.prototype, "writable") }, writableHighWaterMark: { __proto__: null, ...fe(G.prototype, "writableHighWaterMark") }, writableObjectMode: { __proto__: null, ...fe(G.prototype, "writableObjectMode") }, writableBuffer: { __proto__: null, ...fe(G.prototype, "writableBuffer") }, writableLength: { __proto__: null, ...fe(G.prototype, "writableLength") }, writableFinished: { __proto__: null, ...fe(G.prototype, "writableFinished") }, writableCorked: { __proto__: null, ...fe(G.prototype, "writableCorked") }, writableEnded: { __proto__: null, ...fe(G.prototype, "writableEnded") }, writableNeedDrain: { __proto__: null, ...fe(G.prototype, "writableNeedDrain") }, destroyed: { __proto__: null, get() {
      return this._readableState === undefined || this._writableState === undefined ? false : this._readableState.destroyed && this._writableState.destroyed;
    }, set(e) {
      this._readableState && this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
    } } });
    var sn;
    function Nl() {
      return sn === undefined && (sn = {}), sn;
    }
    Y.fromWeb = function(e, t) {
      return Nl().newStreamDuplexFromReadableWritablePair(e, t);
    };
    Y.toWeb = function(e) {
      return Nl().newReadableWritablePairFromDuplex(e);
    };
    var an;
    Y.from = function(e) {
      return an || (an = Bl()), an(e, "body");
    };
  });
  hn = S((tp, Cl) => {
    var { ObjectSetPrototypeOf: Ml, Symbol: sd } = I();
    Cl.exports = ce;
    var { ERR_METHOD_NOT_IMPLEMENTED: ad } = O().codes, dn = re(), { getHighWaterMark: fd } = lt();
    Ml(ce.prototype, dn.prototype);
    Ml(ce, dn);
    var ht = sd("kCallback");
    function ce(e) {
      if (!(this instanceof ce))
        return new ce(e);
      let t = e ? fd(this, e, "readableHighWaterMark", true) : null;
      t === 0 && (e = { ...e, highWaterMark: null, readableHighWaterMark: t, writableHighWaterMark: e.writableHighWaterMark || 0 }), dn.call(this, e), this._readableState.sync = false, this[ht] = null, e && (typeof e.transform == "function" && (this._transform = e.transform), typeof e.flush == "function" && (this._flush = e.flush)), this.on("prefinish", cd);
    }
    function cn(e) {
      typeof this._flush == "function" && !this.destroyed ? this._flush((t, r) => {
        if (t) {
          e ? e(t) : this.destroy(t);
          return;
        }
        r != null && this.push(r), this.push(null), e && e();
      }) : (this.push(null), e && e());
    }
    function cd() {
      this._final !== cn && cn.call(this);
    }
    ce.prototype._final = cn;
    ce.prototype._transform = function(e, t, r) {
      throw new ad("_transform()");
    };
    ce.prototype._write = function(e, t, r) {
      let n = this._readableState, i = this._writableState, o = n.length;
      this._transform(e, t, (l, u) => {
        if (l) {
          r(l);
          return;
        }
        u != null && this.push(u), i.ended || o === n.length || n.length < n.highWaterMark ? r() : this[ht] = r;
      });
    };
    ce.prototype._read = function() {
      if (this[ht]) {
        let e = this[ht];
        this[ht] = null, e();
      }
    };
  });
  yn = S((rp, Dl) => {
    var { ObjectSetPrototypeOf: kl } = I();
    Dl.exports = et;
    var pn = hn();
    kl(et.prototype, pn.prototype);
    kl(et, pn);
    function et(e) {
      if (!(this instanceof et))
        return new et(e);
      pn.call(this, e);
    }
    et.prototype._transform = function(e, t, r) {
      r(null, e);
    };
  });
  Zt = S((np, Ul) => {
    var pt = (we(), ye(H)), { ArrayIsArray: dd, Promise: hd, SymbolAsyncIterator: pd, SymbolDispose: yd } = I(), Qt = ae(), { once: bd } = q(), wd = Be(), Ol = re(), { aggregateTwoErrors: gd, codes: { ERR_INVALID_ARG_TYPE: An, ERR_INVALID_RETURN_VALUE: bn, ERR_MISSING_ARGS: _d, ERR_STREAM_DESTROYED: Ed, ERR_STREAM_PREMATURE_CLOSE: Sd }, AbortError: md } = O(), { validateFunction: Rd, validateAbortSignal: Ad } = He(), { isIterable: Me, isReadable: wn, isReadableNodeStream: Jt, isNodeStream: Pl, isTransformStream: tt, isWebStream: xd, isReadableStream: gn, isReadableFinished: Id } = Z(), Td = globalThis.AbortController || We().AbortController, _n, En, Sn;
    function ql(e, t, r) {
      let n = false;
      e.on("close", () => {
        n = true;
      });
      let i = Qt(e, { readable: t, writable: r }, (o) => {
        n = !o;
      });
      return { destroy: (o) => {
        n || (n = true, wd.destroyer(e, o || new Ed("pipe")));
      }, cleanup: i };
    }
    function Bd(e) {
      return Rd(e[e.length - 1], "streams[stream.length - 1]"), e.pop();
    }
    function mn(e) {
      if (Me(e))
        return e;
      if (Jt(e))
        return Ld(e);
      throw new An("val", ["Readable", "Iterable", "AsyncIterable"], e);
    }
    async function* Ld(e) {
      En || (En = at()), yield* En.prototype[pd].call(e);
    }
    async function Xt(e, t, r, { end: n }) {
      let i, o = null, l = (s) => {
        if (s && (i = s), o) {
          let c = o;
          o = null, c();
        }
      }, u = () => new hd((s, c) => {
        i ? c(i) : o = () => {
          i ? c(i) : s();
        };
      });
      t.on("drain", l);
      let a = Qt(t, { readable: false }, l);
      try {
        t.writableNeedDrain && await u();
        for await (let s of e)
          t.write(s) || await u();
        n && (t.end(), await u()), r();
      } catch (s) {
        r(i !== s ? gd(i, s) : s);
      } finally {
        a(), t.off("drain", l);
      }
    }
    async function Rn(e, t, r, { end: n }) {
      tt(t) && (t = t.writable);
      let i = t.getWriter();
      try {
        for await (let o of e)
          await i.ready, i.write(o).catch(() => {
          });
        await i.ready, n && await i.close(), r();
      } catch (o) {
        try {
          await i.abort(o), r(o);
        } catch (l) {
          r(l);
        }
      }
    }
    function Nd(...e) {
      return vl(e, bd(Bd(e)));
    }
    function vl(e, t, r) {
      if (e.length === 1 && dd(e[0]) && (e = e[0]), e.length < 2)
        throw new _d("streams");
      let n = new Td, i = n.signal, o = r?.signal, l = [];
      Ad(o, "options.signal");
      function u() {
        _(new md);
      }
      Sn = Sn || q().addAbortListener;
      let a;
      o && (a = Sn(o, u));
      let s, c, d = [], y = 0;
      function h(F) {
        _(F, --y === 0);
      }
      function _(F, E) {
        var N;
        if (F && (!s || s.code === "ERR_STREAM_PREMATURE_CLOSE") && (s = F), !(!s && !E)) {
          for (;d.length; )
            d.shift()(s);
          (N = a) === null || N === undefined || N[yd](), n.abort(), E && (s || l.forEach((Se) => Se()), pt.nextTick(t, s, c));
        }
      }
      let p;
      for (let F = 0;F < e.length; F++) {
        let E = e[F], N = F < e.length - 1, Se = F > 0, W = N || r?.end !== false, Oe = F === e.length - 1;
        if (Pl(E)) {
          let v = function(ie) {
            ie && ie.name !== "AbortError" && ie.code !== "ERR_STREAM_PREMATURE_CLOSE" && h(ie);
          };
          var x = v;
          if (W) {
            let { destroy: ie, cleanup: ir } = ql(E, N, Se);
            d.push(ie), wn(E) && Oe && l.push(ir);
          }
          E.on("error", v), wn(E) && Oe && l.push(() => {
            E.removeListener("error", v);
          });
        }
        if (F === 0)
          if (typeof E == "function") {
            if (p = E({ signal: i }), !Me(p))
              throw new bn("Iterable, AsyncIterable or Stream", "source", p);
          } else
            Me(E) || Jt(E) || tt(E) ? p = E : p = Ol.from(E);
        else if (typeof E == "function") {
          if (tt(p)) {
            var R;
            p = mn((R = p) === null || R === undefined ? undefined : R.readable);
          } else
            p = mn(p);
          if (p = E(p, { signal: i }), N) {
            if (!Me(p, true))
              throw new bn("AsyncIterable", `transform[${F - 1}]`, p);
          } else {
            var w;
            _n || (_n = yn());
            let v = new _n({ objectMode: true }), ie = (w = p) === null || w === undefined ? undefined : w.then;
            if (typeof ie == "function")
              y++, ie.call(p, (he) => {
                c = he, he != null && v.write(he), W && v.end(), pt.nextTick(h);
              }, (he) => {
                v.destroy(he), pt.nextTick(h, he);
              });
            else if (Me(p, true))
              y++, Xt(p, v, h, { end: W });
            else if (gn(p) || tt(p)) {
              let he = p.readable || p;
              y++, Xt(he, v, h, { end: W });
            } else
              throw new bn("AsyncIterable or Promise", "destination", p);
            p = v;
            let { destroy: ir, cleanup: hu } = ql(p, false, true);
            d.push(ir), Oe && l.push(hu);
          }
        } else if (Pl(E)) {
          if (Jt(p)) {
            y += 2;
            let v = Fd(p, E, h, { end: W });
            wn(E) && Oe && l.push(v);
          } else if (tt(p) || gn(p)) {
            let v = p.readable || p;
            y++, Xt(v, E, h, { end: W });
          } else if (Me(p))
            y++, Xt(p, E, h, { end: W });
          else
            throw new An("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], p);
          p = E;
        } else if (xd(E)) {
          if (Jt(p))
            y++, Rn(mn(p), E, h, { end: W });
          else if (gn(p) || Me(p))
            y++, Rn(p, E, h, { end: W });
          else if (tt(p))
            y++, Rn(p.readable, E, h, { end: W });
          else
            throw new An("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], p);
          p = E;
        } else
          p = Ol.from(E);
      }
      return (i != null && i.aborted || o != null && o.aborted) && pt.nextTick(u), p;
    }
    function Fd(e, t, r, { end: n }) {
      let i = false;
      if (t.on("close", () => {
        i || r(new Sd);
      }), e.pipe(t, { end: false }), n) {
        let l = function() {
          i = true, t.end();
        };
        var o = l;
        Id(e) ? pt.nextTick(l) : e.once("end", l);
      } else
        r();
      return Qt(e, { readable: true, writable: false }, (l) => {
        let u = e._readableState;
        l && l.code === "ERR_STREAM_PREMATURE_CLOSE" && u && u.ended && !u.errored && !u.errorEmitted ? e.once("end", r).once("error", r) : r(l);
      }), Qt(t, { readable: false, writable: true }, r);
    }
    Ul.exports = { pipelineImpl: vl, pipeline: Nd };
  });
  In = S((ip, Vl) => {
    var { pipeline: Md } = Zt(), er = re(), { destroyer: Cd } = Be(), { isNodeStream: tr, isReadable: Wl, isWritable: $l, isWebStream: xn, isTransformStream: Ce, isWritableStream: jl, isReadableStream: Hl } = Z(), { AbortError: kd, codes: { ERR_INVALID_ARG_VALUE: Gl, ERR_MISSING_ARGS: Dd } } = O(), Od = ae();
    Vl.exports = function(...t) {
      if (t.length === 0)
        throw new Dd("streams");
      if (t.length === 1)
        return er.from(t[0]);
      let r = [...t];
      if (typeof t[0] == "function" && (t[0] = er.from(t[0])), typeof t[t.length - 1] == "function") {
        let h = t.length - 1;
        t[h] = er.from(t[h]);
      }
      for (let h = 0;h < t.length; ++h)
        if (!(!tr(t[h]) && !xn(t[h]))) {
          if (h < t.length - 1 && !(Wl(t[h]) || Hl(t[h]) || Ce(t[h])))
            throw new Gl(`streams[${h}]`, r[h], "must be readable");
          if (h > 0 && !($l(t[h]) || jl(t[h]) || Ce(t[h])))
            throw new Gl(`streams[${h}]`, r[h], "must be writable");
        }
      let n, i, o, l, u;
      function a(h) {
        let _ = l;
        l = null, _ ? _(h) : h ? u.destroy(h) : !y && !d && u.destroy();
      }
      let s = t[0], c = Md(t, a), d = !!($l(s) || jl(s) || Ce(s)), y = !!(Wl(c) || Hl(c) || Ce(c));
      if (u = new er({ writableObjectMode: !!(s != null && s.writableObjectMode), readableObjectMode: !!(c != null && c.readableObjectMode), writable: d, readable: y }), d) {
        if (tr(s))
          u._write = function(_, p, R) {
            s.write(_, p) ? R() : n = R;
          }, u._final = function(_) {
            s.end(), i = _;
          }, s.on("drain", function() {
            if (n) {
              let _ = n;
              n = null, _();
            }
          });
        else if (xn(s)) {
          let p = (Ce(s) ? s.writable : s).getWriter();
          u._write = async function(R, w, x) {
            try {
              await p.ready, p.write(R).catch(() => {
              }), x();
            } catch (F) {
              x(F);
            }
          }, u._final = async function(R) {
            try {
              await p.ready, p.close().catch(() => {
              }), i = R;
            } catch (w) {
              R(w);
            }
          };
        }
        let h = Ce(c) ? c.readable : c;
        Od(h, () => {
          if (i) {
            let _ = i;
            i = null, _();
          }
        });
      }
      if (y) {
        if (tr(c))
          c.on("readable", function() {
            if (o) {
              let h = o;
              o = null, h();
            }
          }), c.on("end", function() {
            u.push(null);
          }), u._read = function() {
            for (;; ) {
              let h = c.read();
              if (h === null) {
                o = u._read;
                return;
              }
              if (!u.push(h))
                return;
            }
          };
        else if (xn(c)) {
          let _ = (Ce(c) ? c.readable : c).getReader();
          u._read = async function() {
            for (;; )
              try {
                let { value: p, done: R } = await _.read();
                if (!u.push(p))
                  return;
                if (R) {
                  u.push(null);
                  return;
                }
              } catch {
                return;
              }
          };
        }
      }
      return u._destroy = function(h, _) {
        !h && l !== null && (h = new kd), o = null, n = null, i = null, l === null ? _(h) : (l = _, tr(c) && Cd(c, h));
      }, u;
    };
  });
  ru = S((op, Ln) => {
    var Pd = globalThis.AbortController || We().AbortController, { codes: { ERR_INVALID_ARG_VALUE: qd, ERR_INVALID_ARG_TYPE: yt, ERR_MISSING_ARGS: vd, ERR_OUT_OF_RANGE: Ud }, AbortError: ne } = O(), { validateAbortSignal: ke, validateInteger: Yl, validateObject: De } = He(), Wd = I().Symbol("kWeak"), $d = I().Symbol("kResistStopPropagation"), { finished: jd } = ae(), Hd = In(), { addAbortSignalNoValidate: Gd } = ot(), { isWritable: Vd, isNodeStream: Yd } = Z(), { deprecate: Kd } = q(), { ArrayPrototypePush: zd, Boolean: Xd, MathFloor: Kl, Number: Jd, NumberIsNaN: Qd, Promise: zl, PromiseReject: Xl, PromiseResolve: Zd, PromisePrototypeThen: Jl, Symbol: Zl } = I(), rr = Zl("kEmpty"), Ql = Zl("kEof");
    function eh(e, t) {
      if (t != null && De(t, "options"), t?.signal != null && ke(t.signal, "options.signal"), Yd(e) && !Vd(e))
        throw new qd("stream", e, "must be writable");
      let r = Hd(this, e);
      return t != null && t.signal && Gd(t.signal, r), r;
    }
    function nr(e, t) {
      if (typeof e != "function")
        throw new yt("fn", ["Function", "AsyncFunction"], e);
      t != null && De(t, "options"), t?.signal != null && ke(t.signal, "options.signal");
      let r = 1;
      t?.concurrency != null && (r = Kl(t.concurrency));
      let n = r - 1;
      return t?.highWaterMark != null && (n = Kl(t.highWaterMark)), Yl(r, "options.concurrency", 1), Yl(n, "options.highWaterMark", 0), n += r, async function* () {
        let o = q().AbortSignalAny([t?.signal].filter(Xd)), l = this, u = [], a = { signal: o }, s, c, d = false, y = 0;
        function h() {
          d = true, _();
        }
        function _() {
          y -= 1, p();
        }
        function p() {
          c && !d && y < r && u.length < n && (c(), c = null);
        }
        async function R() {
          try {
            for await (let w of l) {
              if (d)
                return;
              if (o.aborted)
                throw new ne;
              try {
                if (w = e(w, a), w === rr)
                  continue;
                w = Zd(w);
              } catch (x) {
                w = Xl(x);
              }
              y += 1, Jl(w, _, h), u.push(w), s && (s(), s = null), !d && (u.length >= n || y >= r) && await new zl((x) => {
                c = x;
              });
            }
            u.push(Ql);
          } catch (w) {
            let x = Xl(w);
            Jl(x, _, h), u.push(x);
          } finally {
            d = true, s && (s(), s = null);
          }
        }
        R();
        try {
          for (;; ) {
            for (;u.length > 0; ) {
              let w = await u[0];
              if (w === Ql)
                return;
              if (o.aborted)
                throw new ne;
              w !== rr && (yield w), u.shift(), p();
            }
            await new zl((w) => {
              s = w;
            });
          }
        } finally {
          d = true, c && (c(), c = null);
        }
      }.call(this);
    }
    function th(e = undefined) {
      return e != null && De(e, "options"), e?.signal != null && ke(e.signal, "options.signal"), async function* () {
        let r = 0;
        for await (let i of this) {
          var n;
          if (e != null && (n = e.signal) !== null && n !== undefined && n.aborted)
            throw new ne({ cause: e.signal.reason });
          yield [r++, i];
        }
      }.call(this);
    }
    async function eu(e, t = undefined) {
      for await (let r of Bn.call(this, e, t))
        return true;
      return false;
    }
    async function rh(e, t = undefined) {
      if (typeof e != "function")
        throw new yt("fn", ["Function", "AsyncFunction"], e);
      return !await eu.call(this, async (...r) => !await e(...r), t);
    }
    async function nh(e, t) {
      for await (let r of Bn.call(this, e, t))
        return r;
    }
    async function ih(e, t) {
      if (typeof e != "function")
        throw new yt("fn", ["Function", "AsyncFunction"], e);
      async function r(n, i) {
        return await e(n, i), rr;
      }
      for await (let n of nr.call(this, r, t))
        ;
    }
    function Bn(e, t) {
      if (typeof e != "function")
        throw new yt("fn", ["Function", "AsyncFunction"], e);
      async function r(n, i) {
        return await e(n, i) ? n : rr;
      }
      return nr.call(this, r, t);
    }
    var Tn = class extends vd {
      constructor() {
        super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
      }
    };
    async function oh(e, t, r) {
      var n;
      if (typeof e != "function")
        throw new yt("reducer", ["Function", "AsyncFunction"], e);
      r != null && De(r, "options"), r?.signal != null && ke(r.signal, "options.signal");
      let i = arguments.length > 1;
      if (r != null && (n = r.signal) !== null && n !== undefined && n.aborted) {
        let s = new ne(undefined, { cause: r.signal.reason });
        throw this.once("error", () => {
        }), await jd(this.destroy(s)), s;
      }
      let o = new Pd, l = o.signal;
      if (r != null && r.signal) {
        let s = { once: true, [Wd]: this, [$d]: true };
        r.signal.addEventListener("abort", () => o.abort(), s);
      }
      let u = false;
      try {
        for await (let s of this) {
          var a;
          if (u = true, r != null && (a = r.signal) !== null && a !== undefined && a.aborted)
            throw new ne;
          i ? t = await e(t, s, { signal: l }) : (t = s, i = true);
        }
        if (!u && !i)
          throw new Tn;
      } finally {
        o.abort();
      }
      return t;
    }
    async function lh(e) {
      e != null && De(e, "options"), e?.signal != null && ke(e.signal, "options.signal");
      let t = [];
      for await (let n of this) {
        var r;
        if (e != null && (r = e.signal) !== null && r !== undefined && r.aborted)
          throw new ne(undefined, { cause: e.signal.reason });
        zd(t, n);
      }
      return t;
    }
    function uh(e, t) {
      let r = nr.call(this, e, t);
      return async function* () {
        for await (let i of r)
          yield* i;
      }.call(this);
    }
    function tu(e) {
      if (e = Jd(e), Qd(e))
        return 0;
      if (e < 0)
        throw new Ud("number", ">= 0", e);
      return e;
    }
    function sh(e, t = undefined) {
      return t != null && De(t, "options"), t?.signal != null && ke(t.signal, "options.signal"), e = tu(e), async function* () {
        var n;
        if (t != null && (n = t.signal) !== null && n !== undefined && n.aborted)
          throw new ne;
        for await (let o of this) {
          var i;
          if (t != null && (i = t.signal) !== null && i !== undefined && i.aborted)
            throw new ne;
          e-- <= 0 && (yield o);
        }
      }.call(this);
    }
    function ah(e, t = undefined) {
      return t != null && De(t, "options"), t?.signal != null && ke(t.signal, "options.signal"), e = tu(e), async function* () {
        var n;
        if (t != null && (n = t.signal) !== null && n !== undefined && n.aborted)
          throw new ne;
        for await (let o of this) {
          var i;
          if (t != null && (i = t.signal) !== null && i !== undefined && i.aborted)
            throw new ne;
          if (e-- > 0 && (yield o), e <= 0)
            return;
        }
      }.call(this);
    }
    Ln.exports.streamReturningOperators = { asIndexedPairs: Kd(th, "readable.asIndexedPairs will be removed in a future version."), drop: sh, filter: Bn, flatMap: uh, map: nr, take: ah, compose: eh };
    Ln.exports.promiseReturningOperators = { every: rh, forEach: ih, reduce: oh, toArray: lh, some: eu, find: nh };
  });
  Nn = S((lp, nu) => {
    var { ArrayPrototypePop: fh, Promise: ch } = I(), { isIterable: dh, isNodeStream: hh, isWebStream: ph } = Z(), { pipelineImpl: yh } = Zt(), { finished: bh } = ae();
    Fn();
    function wh(...e) {
      return new ch((t, r) => {
        let n, i, o = e[e.length - 1];
        if (o && typeof o == "object" && !hh(o) && !dh(o) && !ph(o)) {
          let l = fh(e);
          n = l.signal, i = l.end;
        }
        yh(e, (l, u) => {
          l ? r(l) : t(u);
        }, { signal: n, end: i });
      });
    }
    nu.exports = { finished: bh, pipeline: wh };
  });
  Fn = S((up, du) => {
    var { Buffer: gh } = le(), { ObjectDefineProperty: de, ObjectKeys: lu, ReflectApply: uu } = I(), { promisify: { custom: su } } = q(), { streamReturningOperators: iu, promiseReturningOperators: ou } = ru(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: au } } = O(), _h = In(), { setDefaultHighWaterMark: Eh, getDefaultHighWaterMark: Sh } = lt(), { pipeline: fu } = Zt(), { destroyer: mh } = Be(), cu = ae(), Mn = Nn(), bt = Z(), A = du.exports = Dt().Stream;
    A.isDestroyed = bt.isDestroyed;
    A.isDisturbed = bt.isDisturbed;
    A.isErrored = bt.isErrored;
    A.isReadable = bt.isReadable;
    A.isWritable = bt.isWritable;
    A.Readable = at();
    for (let e of lu(iu)) {
      let r = function(...n) {
        if (new.target)
          throw au();
        return A.Readable.from(uu(t, this, n));
      }, t = iu[e];
      de(r, "name", { __proto__: null, value: t.name }), de(r, "length", { __proto__: null, value: t.length }), de(A.Readable.prototype, e, { __proto__: null, value: r, enumerable: false, configurable: true, writable: true });
    }
    for (let e of lu(ou)) {
      let r = function(...n) {
        if (new.target)
          throw au();
        return uu(t, this, n);
      }, t = ou[e];
      de(r, "name", { __proto__: null, value: t.name }), de(r, "length", { __proto__: null, value: t.length }), de(A.Readable.prototype, e, { __proto__: null, value: r, enumerable: false, configurable: true, writable: true });
    }
    A.Writable = zt();
    A.Duplex = re();
    A.Transform = hn();
    A.PassThrough = yn();
    A.pipeline = fu;
    var { addAbortSignal: Rh } = ot();
    A.addAbortSignal = Rh;
    A.finished = cu;
    A.destroy = mh;
    A.compose = _h;
    A.setDefaultHighWaterMark = Eh;
    A.getDefaultHighWaterMark = Sh;
    de(A, "promises", { __proto__: null, configurable: true, enumerable: true, get() {
      return Mn;
    } });
    de(fu, su, { __proto__: null, enumerable: true, get() {
      return Mn.pipeline;
    } });
    de(cu, su, { __proto__: null, enumerable: true, get() {
      return Mn.finished;
    } });
    A.Stream = A;
    A._isUint8Array = function(t) {
      return t instanceof Uint8Array;
    };
    A._uint8ArrayToBuffer = function(t) {
      return gh.from(t.buffer, t.byteOffset, t.byteLength);
    };
  });
  Cn = S((sp, L) => {
    var C = Fn(), Ah = Nn(), xh = C.Readable.destroy;
    L.exports = C.Readable;
    L.exports._uint8ArrayToBuffer = C._uint8ArrayToBuffer;
    L.exports._isUint8Array = C._isUint8Array;
    L.exports.isDisturbed = C.isDisturbed;
    L.exports.isErrored = C.isErrored;
    L.exports.isReadable = C.isReadable;
    L.exports.Readable = C.Readable;
    L.exports.Writable = C.Writable;
    L.exports.Duplex = C.Duplex;
    L.exports.Transform = C.Transform;
    L.exports.PassThrough = C.PassThrough;
    L.exports.addAbortSignal = C.addAbortSignal;
    L.exports.finished = C.finished;
    L.exports.destroy = C.destroy;
    L.exports.destroy = xh;
    L.exports.pipeline = C.pipeline;
    L.exports.compose = C.compose;
    Object.defineProperty(C, "promises", { configurable: true, enumerable: true, get() {
      return Ah;
    } });
    L.exports.Stream = C.Stream;
    L.exports.default = L.exports;
  });
  wt = {};
  or(wt, { default: () => Ih });
  pe(wt, rt(Cn()));
  Ih = rt(Cn());
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
});

// node_modules/jszip/lib/support.js
var require_support = __commonJS((exports) => {
  exports.base64 = true;
  exports.array = true;
  exports.string = true;
  exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
  exports.nodebuffer = typeof Buffer !== "undefined";
  exports.uint8array = typeof Uint8Array !== "undefined";
  if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
  } else {
    buffer = new ArrayBuffer(0);
    try {
      exports.blob = new Blob([buffer], {
        type: "application/zip"
      }).size === 0;
    } catch (e) {
      try {
        Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
        builder = new Builder;
        builder.append(buffer);
        exports.blob = builder.getBlob("application/zip").size === 0;
      } catch (e2) {
        exports.blob = false;
      }
    }
  }
  var buffer;
  var Builder;
  var builder;
  try {
    exports.nodestream = !!(init_stream(), __toCommonJS(exports_stream)).Readable;
  } catch (e) {
    exports.nodestream = false;
  }
});

// node_modules/jszip/lib/base64.js
var require_base64 = __commonJS((exports) => {
  var utils = require_utils();
  var support = require_support();
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  exports.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;
    var isArray = utils.getTypeOf(input) !== "string";
    while (i < input.length) {
      remainingBytes = len - i;
      if (!isArray) {
        chr1 = input.charCodeAt(i++);
        chr2 = i < len ? input.charCodeAt(i++) : 0;
        chr3 = i < len ? input.charCodeAt(i++) : 0;
      } else {
        chr1 = input[i++];
        chr2 = i < len ? input[i++] : 0;
        chr3 = i < len ? input[i++] : 0;
      }
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = remainingBytes > 1 ? (chr2 & 15) << 2 | chr3 >> 6 : 64;
      enc4 = remainingBytes > 2 ? chr3 & 63 : 64;
      output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));
    }
    return output.join("");
  };
  exports.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;
    var dataUrlPrefix = "data:";
    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
      throw new Error("Invalid base64 input, it looks like a data url.");
    }
    input = input.replace(/[^A-Za-z0-9+/=]/g, "");
    var totalLength = input.length * 3 / 4;
    if (input.charAt(input.length - 1) === _keyStr.charAt(64)) {
      totalLength--;
    }
    if (input.charAt(input.length - 2) === _keyStr.charAt(64)) {
      totalLength--;
    }
    if (totalLength % 1 !== 0) {
      throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support.uint8array) {
      output = new Uint8Array(totalLength | 0);
    } else {
      output = new Array(totalLength | 0);
    }
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output[resultIndex++] = chr1;
      if (enc3 !== 64) {
        output[resultIndex++] = chr2;
      }
      if (enc4 !== 64) {
        output[resultIndex++] = chr3;
      }
    }
    return output;
  };
});

// node_modules/jszip/lib/nodejsUtils.js
var require_nodejsUtils = __commonJS((exports, module) => {
  module.exports = {
    isNode: typeof Buffer !== "undefined",
    newBufferFrom: function(data, encoding) {
      if (Buffer.from && Buffer.from !== Uint8Array.from) {
        return Buffer.from(data, encoding);
      } else {
        if (typeof data === "number") {
          throw new Error('The "data" argument must not be a number');
        }
        return new Buffer(data, encoding);
      }
    },
    allocBuffer: function(size) {
      if (Buffer.alloc) {
        return Buffer.alloc(size);
      } else {
        var buf = new Buffer(size);
        buf.fill(0);
        return buf;
      }
    },
    isBuffer: function(b) {
      return Buffer.isBuffer(b);
    },
    isStream: function(obj) {
      return obj && typeof obj.on === "function" && typeof obj.pause === "function" && typeof obj.resume === "function";
    }
  };
});

// node_modules/immediate/lib/browser.js
var require_browser = __commonJS((exports, module) => {
  var Mutation = global.MutationObserver || global.WebKitMutationObserver;
  var scheduleDrain;
  {
    if (Mutation) {
      called = 0;
      observer = new Mutation(nextTick);
      element = global.document.createTextNode("");
      observer.observe(element, {
        characterData: true
      });
      scheduleDrain = function() {
        element.data = called = ++called % 2;
      };
    } else if (!global.setImmediate && typeof global.MessageChannel !== "undefined") {
      channel = new global.MessageChannel;
      channel.port1.onmessage = nextTick;
      scheduleDrain = function() {
        channel.port2.postMessage(0);
      };
    } else if ("document" in global && "onreadystatechange" in global.document.createElement("script")) {
      scheduleDrain = function() {
        var scriptEl = global.document.createElement("script");
        scriptEl.onreadystatechange = function() {
          nextTick();
          scriptEl.onreadystatechange = null;
          scriptEl.parentNode.removeChild(scriptEl);
          scriptEl = null;
        };
        global.document.documentElement.appendChild(scriptEl);
      };
    } else {
      scheduleDrain = function() {
        setTimeout(nextTick, 0);
      };
    }
  }
  var called;
  var observer;
  var element;
  var channel;
  var draining;
  var queue = [];
  function nextTick() {
    draining = true;
    var i, oldQueue;
    var len = queue.length;
    while (len) {
      oldQueue = queue;
      queue = [];
      i = -1;
      while (++i < len) {
        oldQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  module.exports = immediate;
  function immediate(task) {
    if (queue.push(task) === 1 && !draining) {
      scheduleDrain();
    }
  }
});

// node_modules/lie/lib/browser.js
var require_browser2 = __commonJS((exports, module) => {
  var immediate = require_browser();
  function INTERNAL() {
  }
  var handlers = {};
  var REJECTED = ["REJECTED"];
  var FULFILLED = ["FULFILLED"];
  var PENDING = ["PENDING"];
  module.exports = Promise2;
  function Promise2(resolver) {
    if (typeof resolver !== "function") {
      throw new TypeError("resolver must be a function");
    }
    this.state = PENDING;
    this.queue = [];
    this.outcome = undefined;
    if (resolver !== INTERNAL) {
      safelyResolveThenable(this, resolver);
    }
  }
  Promise2.prototype["finally"] = function(callback) {
    if (typeof callback !== "function") {
      return this;
    }
    var p = this.constructor;
    return this.then(resolve2, reject2);
    function resolve2(value) {
      function yes() {
        return value;
      }
      return p.resolve(callback()).then(yes);
    }
    function reject2(reason) {
      function no() {
        throw reason;
      }
      return p.resolve(callback()).then(no);
    }
  };
  Promise2.prototype["catch"] = function(onRejected) {
    return this.then(null, onRejected);
  };
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
      return this;
    }
    var promise = new this.constructor(INTERNAL);
    if (this.state !== PENDING) {
      var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
      unwrap(promise, resolver, this.outcome);
    } else {
      this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
    }
    return promise;
  };
  function QueueItem(promise, onFulfilled, onRejected) {
    this.promise = promise;
    if (typeof onFulfilled === "function") {
      this.onFulfilled = onFulfilled;
      this.callFulfilled = this.otherCallFulfilled;
    }
    if (typeof onRejected === "function") {
      this.onRejected = onRejected;
      this.callRejected = this.otherCallRejected;
    }
  }
  QueueItem.prototype.callFulfilled = function(value) {
    handlers.resolve(this.promise, value);
  };
  QueueItem.prototype.otherCallFulfilled = function(value) {
    unwrap(this.promise, this.onFulfilled, value);
  };
  QueueItem.prototype.callRejected = function(value) {
    handlers.reject(this.promise, value);
  };
  QueueItem.prototype.otherCallRejected = function(value) {
    unwrap(this.promise, this.onRejected, value);
  };
  function unwrap(promise, func, value) {
    immediate(function() {
      var returnValue;
      try {
        returnValue = func(value);
      } catch (e) {
        return handlers.reject(promise, e);
      }
      if (returnValue === promise) {
        handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
      } else {
        handlers.resolve(promise, returnValue);
      }
    });
  }
  handlers.resolve = function(self2, value) {
    var result = tryCatch(getThen, value);
    if (result.status === "error") {
      return handlers.reject(self2, result.value);
    }
    var thenable = result.value;
    if (thenable) {
      safelyResolveThenable(self2, thenable);
    } else {
      self2.state = FULFILLED;
      self2.outcome = value;
      var i = -1;
      var len = self2.queue.length;
      while (++i < len) {
        self2.queue[i].callFulfilled(value);
      }
    }
    return self2;
  };
  handlers.reject = function(self2, error) {
    self2.state = REJECTED;
    self2.outcome = error;
    var i = -1;
    var len = self2.queue.length;
    while (++i < len) {
      self2.queue[i].callRejected(error);
    }
    return self2;
  };
  function getThen(obj) {
    var then = obj && obj.then;
    if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
      return function appyThen() {
        then.apply(obj, arguments);
      };
    }
  }
  function safelyResolveThenable(self2, thenable) {
    var called = false;
    function onError(value) {
      if (called) {
        return;
      }
      called = true;
      handlers.reject(self2, value);
    }
    function onSuccess(value) {
      if (called) {
        return;
      }
      called = true;
      handlers.resolve(self2, value);
    }
    function tryToUnwrap() {
      thenable(onSuccess, onError);
    }
    var result = tryCatch(tryToUnwrap);
    if (result.status === "error") {
      onError(result.value);
    }
  }
  function tryCatch(func, value) {
    var out = {};
    try {
      out.value = func(value);
      out.status = "success";
    } catch (e) {
      out.status = "error";
      out.value = e;
    }
    return out;
  }
  Promise2.resolve = resolve;
  function resolve(value) {
    if (value instanceof this) {
      return value;
    }
    return handlers.resolve(new this(INTERNAL), value);
  }
  Promise2.reject = reject;
  function reject(reason) {
    var promise = new this(INTERNAL);
    return handlers.reject(promise, reason);
  }
  Promise2.all = all;
  function all(iterable) {
    var self2 = this;
    if (Object.prototype.toString.call(iterable) !== "[object Array]") {
      return this.reject(new TypeError("must be an array"));
    }
    var len = iterable.length;
    var called = false;
    if (!len) {
      return this.resolve([]);
    }
    var values = new Array(len);
    var resolved = 0;
    var i = -1;
    var promise = new this(INTERNAL);
    while (++i < len) {
      allResolver(iterable[i], i);
    }
    return promise;
    function allResolver(value, i2) {
      self2.resolve(value).then(resolveFromAll, function(error) {
        if (!called) {
          called = true;
          handlers.reject(promise, error);
        }
      });
      function resolveFromAll(outValue) {
        values[i2] = outValue;
        if (++resolved === len && !called) {
          called = true;
          handlers.resolve(promise, values);
        }
      }
    }
  }
  Promise2.race = race;
  function race(iterable) {
    var self2 = this;
    if (Object.prototype.toString.call(iterable) !== "[object Array]") {
      return this.reject(new TypeError("must be an array"));
    }
    var len = iterable.length;
    var called = false;
    if (!len) {
      return this.resolve([]);
    }
    var i = -1;
    var promise = new this(INTERNAL);
    while (++i < len) {
      resolver(iterable[i]);
    }
    return promise;
    function resolver(value) {
      self2.resolve(value).then(function(response) {
        if (!called) {
          called = true;
          handlers.resolve(promise, response);
        }
      }, function(error) {
        if (!called) {
          called = true;
          handlers.reject(promise, error);
        }
      });
    }
  }
});

// node_modules/jszip/lib/external.js
var require_external = __commonJS((exports, module) => {
  var ES6Promise = null;
  if (typeof Promise !== "undefined") {
    ES6Promise = Promise;
  } else {
    ES6Promise = require_browser2();
  }
  module.exports = {
    Promise: ES6Promise
  };
});

// node_modules/setimmediate/setImmediate.js
var require_setImmediate = __commonJS((exports) => {
  (function(global2, undefined2) {
    if (global2.setImmediate) {
      return;
    }
    var nextHandle = 1;
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global2.document;
    var registerImmediate;
    function setImmediate2(callback) {
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      var args = new Array(arguments.length - 1);
      for (var i = 0;i < args.length; i++) {
        args[i] = arguments[i + 1];
      }
      var task = { callback, args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }
    function clearImmediate(handle) {
      delete tasksByHandle[handle];
    }
    function run(task) {
      var callback = task.callback;
      var args = task.args;
      switch (args.length) {
        case 0:
          callback();
          break;
        case 1:
          callback(args[0]);
          break;
        case 2:
          callback(args[0], args[1]);
          break;
        case 3:
          callback(args[0], args[1], args[2]);
          break;
        default:
          callback.apply(undefined2, args);
          break;
      }
    }
    function runIfPresent(handle) {
      if (currentlyRunningATask) {
        setTimeout(runIfPresent, 0, handle);
      } else {
        var task = tasksByHandle[handle];
        if (task) {
          currentlyRunningATask = true;
          try {
            run(task);
          } finally {
            clearImmediate(handle);
            currentlyRunningATask = false;
          }
        }
      }
    }
    function installNextTickImplementation() {
      registerImmediate = function(handle) {
        process.nextTick(function() {
          runIfPresent(handle);
        });
      };
    }
    function canUsePostMessage() {
      if (global2.postMessage && !global2.importScripts) {
        var postMessageIsAsynchronous = true;
        var oldOnMessage = global2.onmessage;
        global2.onmessage = function() {
          postMessageIsAsynchronous = false;
        };
        global2.postMessage("", "*");
        global2.onmessage = oldOnMessage;
        return postMessageIsAsynchronous;
      }
    }
    function installPostMessageImplementation() {
      var messagePrefix = "setImmediate$" + Math.random() + "$";
      var onGlobalMessage = function(event) {
        if (event.source === global2 && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
          runIfPresent(+event.data.slice(messagePrefix.length));
        }
      };
      if (global2.addEventListener) {
        global2.addEventListener("message", onGlobalMessage, false);
      } else {
        global2.attachEvent("onmessage", onGlobalMessage);
      }
      registerImmediate = function(handle) {
        global2.postMessage(messagePrefix + handle, "*");
      };
    }
    function installMessageChannelImplementation() {
      var channel = new MessageChannel;
      channel.port1.onmessage = function(event) {
        var handle = event.data;
        runIfPresent(handle);
      };
      registerImmediate = function(handle) {
        channel.port2.postMessage(handle);
      };
    }
    function installReadyStateChangeImplementation() {
      var html = doc.documentElement;
      registerImmediate = function(handle) {
        var script = doc.createElement("script");
        script.onreadystatechange = function() {
          runIfPresent(handle);
          script.onreadystatechange = null;
          html.removeChild(script);
          script = null;
        };
        html.appendChild(script);
      };
    }
    function installSetTimeoutImplementation() {
      registerImmediate = function(handle) {
        setTimeout(runIfPresent, 0, handle);
      };
    }
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global2);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global2;
    if ({}.toString.call(global2.process) === "[object process]") {
      installNextTickImplementation();
    } else if (canUsePostMessage()) {
      installPostMessageImplementation();
    } else if (global2.MessageChannel) {
      installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
      installReadyStateChangeImplementation();
    } else {
      installSetTimeoutImplementation();
    }
    attachTo.setImmediate = setImmediate2;
    attachTo.clearImmediate = clearImmediate;
  })(typeof self === "undefined" ? typeof global === "undefined" ? exports : global : self);
});

// node_modules/jszip/lib/utils.js
var require_utils = __commonJS((exports) => {
  var support = require_support();
  var base64 = require_base64();
  var nodejsUtils = require_nodejsUtils();
  var external = require_external();
  require_setImmediate();
  function string2binary(str) {
    var result = null;
    if (support.uint8array) {
      result = new Uint8Array(str.length);
    } else {
      result = new Array(str.length);
    }
    return stringToArrayLike(str, result);
  }
  exports.newBlob = function(part, type) {
    exports.checkSupport("blob");
    try {
      return new Blob([part], {
        type
      });
    } catch (e) {
      try {
        var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
        var builder = new Builder;
        builder.append(part);
        return builder.getBlob(type);
      } catch (e2) {
        throw new Error("Bug : can't construct the Blob.");
      }
    }
  };
  function identity(input) {
    return input;
  }
  function stringToArrayLike(str, array) {
    for (var i = 0;i < str.length; ++i) {
      array[i] = str.charCodeAt(i) & 255;
    }
    return array;
  }
  var arrayToStringHelper = {
    stringifyByChunk: function(array, type, chunk) {
      var result = [], k = 0, len = array.length;
      if (len <= chunk) {
        return String.fromCharCode.apply(null, array);
      }
      while (k < len) {
        if (type === "array" || type === "nodebuffer") {
          result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
        } else {
          result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
        }
        k += chunk;
      }
      return result.join("");
    },
    stringifyByChar: function(array) {
      var resultStr = "";
      for (var i = 0;i < array.length; i++) {
        resultStr += String.fromCharCode(array[i]);
      }
      return resultStr;
    },
    applyCanBeUsed: {
      uint8array: function() {
        try {
          return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch (e) {
          return false;
        }
      }(),
      nodebuffer: function() {
        try {
          return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
        } catch (e) {
          return false;
        }
      }()
    }
  };
  function arrayLikeToString(array) {
    var chunk = 65536, type = exports.getTypeOf(array), canUseApply = true;
    if (type === "uint8array") {
      canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
    } else if (type === "nodebuffer") {
      canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
    }
    if (canUseApply) {
      while (chunk > 1) {
        try {
          return arrayToStringHelper.stringifyByChunk(array, type, chunk);
        } catch (e) {
          chunk = Math.floor(chunk / 2);
        }
      }
    }
    return arrayToStringHelper.stringifyByChar(array);
  }
  exports.applyFromCharCode = arrayLikeToString;
  function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0;i < arrayFrom.length; i++) {
      arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
  }
  var transform = {};
  transform["string"] = {
    string: identity,
    array: function(input) {
      return stringToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function(input) {
      return transform["string"]["uint8array"](input).buffer;
    },
    uint8array: function(input) {
      return stringToArrayLike(input, new Uint8Array(input.length));
    },
    nodebuffer: function(input) {
      return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
    }
  };
  transform["array"] = {
    string: arrayLikeToString,
    array: identity,
    arraybuffer: function(input) {
      return new Uint8Array(input).buffer;
    },
    uint8array: function(input) {
      return new Uint8Array(input);
    },
    nodebuffer: function(input) {
      return nodejsUtils.newBufferFrom(input);
    }
  };
  transform["arraybuffer"] = {
    string: function(input) {
      return arrayLikeToString(new Uint8Array(input));
    },
    array: function(input) {
      return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    arraybuffer: identity,
    uint8array: function(input) {
      return new Uint8Array(input);
    },
    nodebuffer: function(input) {
      return nodejsUtils.newBufferFrom(new Uint8Array(input));
    }
  };
  transform["uint8array"] = {
    string: arrayLikeToString,
    array: function(input) {
      return arrayLikeToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function(input) {
      return input.buffer;
    },
    uint8array: identity,
    nodebuffer: function(input) {
      return nodejsUtils.newBufferFrom(input);
    }
  };
  transform["nodebuffer"] = {
    string: arrayLikeToString,
    array: function(input) {
      return arrayLikeToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function(input) {
      return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    uint8array: function(input) {
      return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    nodebuffer: identity
  };
  exports.transformTo = function(outputType, input) {
    if (!input) {
      input = "";
    }
    if (!outputType) {
      return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
  };
  exports.resolve = function(path) {
    var parts = path.split("/");
    var result = [];
    for (var index = 0;index < parts.length; index++) {
      var part = parts[index];
      if (part === "." || part === "" && index !== 0 && index !== parts.length - 1) {
        continue;
      } else if (part === "..") {
        result.pop();
      } else {
        result.push(part);
      }
    }
    return result.join("/");
  };
  exports.getTypeOf = function(input) {
    if (typeof input === "string") {
      return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
      return "array";
    }
    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
      return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
      return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
      return "arraybuffer";
    }
  };
  exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
      throw new Error(type + " is not supported by this platform");
    }
  };
  exports.MAX_VALUE_16BITS = 65535;
  exports.MAX_VALUE_32BITS = -1;
  exports.pretty = function(str) {
    var res = "", code, i;
    for (i = 0;i < (str || "").length; i++) {
      code = str.charCodeAt(i);
      res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
  };
  exports.delay = function(callback, args, self2) {
    setImmediate(function() {
      callback.apply(self2 || null, args || []);
    });
  };
  exports.inherits = function(ctor, superCtor) {
    var Obj = function() {
    };
    Obj.prototype = superCtor.prototype;
    ctor.prototype = new Obj;
  };
  exports.extend = function() {
    var result = {}, i, attr;
    for (i = 0;i < arguments.length; i++) {
      for (attr in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], attr) && typeof result[attr] === "undefined") {
          result[attr] = arguments[i][attr];
        }
      }
    }
    return result;
  };
  exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
    var promise = external.Promise.resolve(inputData).then(function(data) {
      var isBlob = support.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1);
      if (isBlob && typeof FileReader !== "undefined") {
        return new external.Promise(function(resolve, reject) {
          var reader = new FileReader;
          reader.onload = function(e) {
            resolve(e.target.result);
          };
          reader.onerror = function(e) {
            reject(e.target.error);
          };
          reader.readAsArrayBuffer(data);
        });
      } else {
        return data;
      }
    });
    return promise.then(function(data) {
      var dataType = exports.getTypeOf(data);
      if (!dataType) {
        return external.Promise.reject(new Error("Can't read the data of '" + name + "'. Is it " + "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
      }
      if (dataType === "arraybuffer") {
        data = exports.transformTo("uint8array", data);
      } else if (dataType === "string") {
        if (isBase64) {
          data = base64.decode(data);
        } else if (isBinary) {
          if (isOptimizedBinaryString !== true) {
            data = string2binary(data);
          }
        }
      }
      return data;
    });
  };
});

// node_modules/jszip/lib/stream/GenericWorker.js
var require_GenericWorker = __commonJS((exports, module) => {
  function GenericWorker(name) {
    this.name = name || "default";
    this.streamInfo = {};
    this.generatedError = null;
    this.extraStreamInfo = {};
    this.isPaused = true;
    this.isFinished = false;
    this.isLocked = false;
    this._listeners = {
      data: [],
      end: [],
      error: []
    };
    this.previous = null;
  }
  GenericWorker.prototype = {
    push: function(chunk) {
      this.emit("data", chunk);
    },
    end: function() {
      if (this.isFinished) {
        return false;
      }
      this.flush();
      try {
        this.emit("end");
        this.cleanUp();
        this.isFinished = true;
      } catch (e) {
        this.emit("error", e);
      }
      return true;
    },
    error: function(e) {
      if (this.isFinished) {
        return false;
      }
      if (this.isPaused) {
        this.generatedError = e;
      } else {
        this.isFinished = true;
        this.emit("error", e);
        if (this.previous) {
          this.previous.error(e);
        }
        this.cleanUp();
      }
      return true;
    },
    on: function(name, listener) {
      this._listeners[name].push(listener);
      return this;
    },
    cleanUp: function() {
      this.streamInfo = this.generatedError = this.extraStreamInfo = null;
      this._listeners = [];
    },
    emit: function(name, arg) {
      if (this._listeners[name]) {
        for (var i = 0;i < this._listeners[name].length; i++) {
          this._listeners[name][i].call(this, arg);
        }
      }
    },
    pipe: function(next) {
      return next.registerPrevious(this);
    },
    registerPrevious: function(previous) {
      if (this.isLocked) {
        throw new Error("The stream '" + this + "' has already been used.");
      }
      this.streamInfo = previous.streamInfo;
      this.mergeStreamInfo();
      this.previous = previous;
      var self2 = this;
      previous.on("data", function(chunk) {
        self2.processChunk(chunk);
      });
      previous.on("end", function() {
        self2.end();
      });
      previous.on("error", function(e) {
        self2.error(e);
      });
      return this;
    },
    pause: function() {
      if (this.isPaused || this.isFinished) {
        return false;
      }
      this.isPaused = true;
      if (this.previous) {
        this.previous.pause();
      }
      return true;
    },
    resume: function() {
      if (!this.isPaused || this.isFinished) {
        return false;
      }
      this.isPaused = false;
      var withError = false;
      if (this.generatedError) {
        this.error(this.generatedError);
        withError = true;
      }
      if (this.previous) {
        this.previous.resume();
      }
      return !withError;
    },
    flush: function() {
    },
    processChunk: function(chunk) {
      this.push(chunk);
    },
    withStreamInfo: function(key, value) {
      this.extraStreamInfo[key] = value;
      this.mergeStreamInfo();
      return this;
    },
    mergeStreamInfo: function() {
      for (var key in this.extraStreamInfo) {
        if (!Object.prototype.hasOwnProperty.call(this.extraStreamInfo, key)) {
          continue;
        }
        this.streamInfo[key] = this.extraStreamInfo[key];
      }
    },
    lock: function() {
      if (this.isLocked) {
        throw new Error("The stream '" + this + "' has already been used.");
      }
      this.isLocked = true;
      if (this.previous) {
        this.previous.lock();
      }
    },
    toString: function() {
      var me = "Worker " + this.name;
      if (this.previous) {
        return this.previous + " -> " + me;
      } else {
        return me;
      }
    }
  };
  module.exports = GenericWorker;
});

// node_modules/jszip/lib/utf8.js
var require_utf8 = __commonJS((exports) => {
  var utils = require_utils();
  var support = require_support();
  var nodejsUtils = require_nodejsUtils();
  var GenericWorker = require_GenericWorker();
  var _utf8len = new Array(256);
  for (i = 0;i < 256; i++) {
    _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  }
  var i;
  _utf8len[254] = _utf8len[254] = 1;
  var string2buf = function(str) {
    var buf, c, c2, m_pos, i2, str_len = str.length, buf_len = 0;
    for (m_pos = 0;m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    if (support.uint8array) {
      buf = new Uint8Array(buf_len);
    } else {
      buf = new Array(buf_len);
    }
    for (i2 = 0, m_pos = 0;i2 < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      if (c < 128) {
        buf[i2++] = c;
      } else if (c < 2048) {
        buf[i2++] = 192 | c >>> 6;
        buf[i2++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i2++] = 224 | c >>> 12;
        buf[i2++] = 128 | c >>> 6 & 63;
        buf[i2++] = 128 | c & 63;
      } else {
        buf[i2++] = 240 | c >>> 18;
        buf[i2++] = 128 | c >>> 12 & 63;
        buf[i2++] = 128 | c >>> 6 & 63;
        buf[i2++] = 128 | c & 63;
      }
    }
    return buf;
  };
  var utf8border = function(buf, max) {
    var pos;
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
  var buf2string = function(buf) {
    var i2, out, c, c_len;
    var len = buf.length;
    var utf16buf = new Array(len * 2);
    for (out = 0, i2 = 0;i2 < len; ) {
      c = buf[i2++];
      if (c < 128) {
        utf16buf[out++] = c;
        continue;
      }
      c_len = _utf8len[c];
      if (c_len > 4) {
        utf16buf[out++] = 65533;
        i2 += c_len - 1;
        continue;
      }
      c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i2 < len) {
        c = c << 6 | buf[i2++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out++] = c;
      } else {
        c -= 65536;
        utf16buf[out++] = 55296 | c >> 10 & 1023;
        utf16buf[out++] = 56320 | c & 1023;
      }
    }
    if (utf16buf.length !== out) {
      if (utf16buf.subarray) {
        utf16buf = utf16buf.subarray(0, out);
      } else {
        utf16buf.length = out;
      }
    }
    return utils.applyFromCharCode(utf16buf);
  };
  exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
      return nodejsUtils.newBufferFrom(str, "utf-8");
    }
    return string2buf(str);
  };
  exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
      return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }
    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);
    return buf2string(buf);
  };
  function Utf8DecodeWorker() {
    GenericWorker.call(this, "utf-8 decode");
    this.leftOver = null;
  }
  utils.inherits(Utf8DecodeWorker, GenericWorker);
  Utf8DecodeWorker.prototype.processChunk = function(chunk) {
    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);
    if (this.leftOver && this.leftOver.length) {
      if (support.uint8array) {
        var previousData = data;
        data = new Uint8Array(previousData.length + this.leftOver.length);
        data.set(this.leftOver, 0);
        data.set(previousData, this.leftOver.length);
      } else {
        data = this.leftOver.concat(data);
      }
      this.leftOver = null;
    }
    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
      if (support.uint8array) {
        usableData = data.subarray(0, nextBoundary);
        this.leftOver = data.subarray(nextBoundary, data.length);
      } else {
        usableData = data.slice(0, nextBoundary);
        this.leftOver = data.slice(nextBoundary, data.length);
      }
    }
    this.push({
      data: exports.utf8decode(usableData),
      meta: chunk.meta
    });
  };
  Utf8DecodeWorker.prototype.flush = function() {
    if (this.leftOver && this.leftOver.length) {
      this.push({
        data: exports.utf8decode(this.leftOver),
        meta: {}
      });
      this.leftOver = null;
    }
  };
  exports.Utf8DecodeWorker = Utf8DecodeWorker;
  function Utf8EncodeWorker() {
    GenericWorker.call(this, "utf-8 encode");
  }
  utils.inherits(Utf8EncodeWorker, GenericWorker);
  Utf8EncodeWorker.prototype.processChunk = function(chunk) {
    this.push({
      data: exports.utf8encode(chunk.data),
      meta: chunk.meta
    });
  };
  exports.Utf8EncodeWorker = Utf8EncodeWorker;
});

// node_modules/jszip/lib/stream/ConvertWorker.js
var require_ConvertWorker = __commonJS((exports, module) => {
  var GenericWorker = require_GenericWorker();
  var utils = require_utils();
  function ConvertWorker(destType) {
    GenericWorker.call(this, "ConvertWorker to " + destType);
    this.destType = destType;
  }
  utils.inherits(ConvertWorker, GenericWorker);
  ConvertWorker.prototype.processChunk = function(chunk) {
    this.push({
      data: utils.transformTo(this.destType, chunk.data),
      meta: chunk.meta
    });
  };
  module.exports = ConvertWorker;
});

// node_modules/jszip/lib/nodejs/NodejsStreamOutputAdapter.js
var require_NodejsStreamOutputAdapter = __commonJS((exports, module) => {
  var Readable = (init_stream(), __toCommonJS(exports_stream)).Readable;
  var utils = require_utils();
  utils.inherits(NodejsStreamOutputAdapter, Readable);
  function NodejsStreamOutputAdapter(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;
    var self2 = this;
    helper.on("data", function(data, meta) {
      if (!self2.push(data)) {
        self2._helper.pause();
      }
      if (updateCb) {
        updateCb(meta);
      }
    }).on("error", function(e) {
      self2.emit("error", e);
    }).on("end", function() {
      self2.push(null);
    });
  }
  NodejsStreamOutputAdapter.prototype._read = function() {
    this._helper.resume();
  };
  module.exports = NodejsStreamOutputAdapter;
});

// node_modules/jszip/lib/stream/StreamHelper.js
var require_StreamHelper = __commonJS((exports, module) => {
  var utils = require_utils();
  var ConvertWorker = require_ConvertWorker();
  var GenericWorker = require_GenericWorker();
  var base64 = require_base64();
  var support = require_support();
  var external = require_external();
  var NodejsStreamOutputAdapter = null;
  if (support.nodestream) {
    try {
      NodejsStreamOutputAdapter = require_NodejsStreamOutputAdapter();
    } catch (e) {
    }
  }
  function transformZipOutput(type, content, mimeType) {
    switch (type) {
      case "blob":
        return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
      case "base64":
        return base64.encode(content);
      default:
        return utils.transformTo(type, content);
    }
  }
  function concat(type, dataArray) {
    var i, index = 0, res = null, totalLength = 0;
    for (i = 0;i < dataArray.length; i++) {
      totalLength += dataArray[i].length;
    }
    switch (type) {
      case "string":
        return dataArray.join("");
      case "array":
        return Array.prototype.concat.apply([], dataArray);
      case "uint8array":
        res = new Uint8Array(totalLength);
        for (i = 0;i < dataArray.length; i++) {
          res.set(dataArray[i], index);
          index += dataArray[i].length;
        }
        return res;
      case "nodebuffer":
        return Buffer.concat(dataArray);
      default:
        throw new Error("concat : unsupported type '" + type + "'");
    }
  }
  function accumulate(helper, updateCallback) {
    return new external.Promise(function(resolve, reject) {
      var dataArray = [];
      var { _internalType: chunkType, _outputType: resultType, _mimeType: mimeType } = helper;
      helper.on("data", function(data, meta) {
        dataArray.push(data);
        if (updateCallback) {
          updateCallback(meta);
        }
      }).on("error", function(err) {
        dataArray = [];
        reject(err);
      }).on("end", function() {
        try {
          var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
          resolve(result);
        } catch (e) {
          reject(e);
        }
        dataArray = [];
      }).resume();
    });
  }
  function StreamHelper(worker, outputType, mimeType) {
    var internalType = outputType;
    switch (outputType) {
      case "blob":
      case "arraybuffer":
        internalType = "uint8array";
        break;
      case "base64":
        internalType = "string";
        break;
    }
    try {
      this._internalType = internalType;
      this._outputType = outputType;
      this._mimeType = mimeType;
      utils.checkSupport(internalType);
      this._worker = worker.pipe(new ConvertWorker(internalType));
      worker.lock();
    } catch (e) {
      this._worker = new GenericWorker("error");
      this._worker.error(e);
    }
  }
  StreamHelper.prototype = {
    accumulate: function(updateCb) {
      return accumulate(this, updateCb);
    },
    on: function(evt, fn) {
      var self2 = this;
      if (evt === "data") {
        this._worker.on(evt, function(chunk) {
          fn.call(self2, chunk.data, chunk.meta);
        });
      } else {
        this._worker.on(evt, function() {
          utils.delay(fn, arguments, self2);
        });
      }
      return this;
    },
    resume: function() {
      utils.delay(this._worker.resume, [], this._worker);
      return this;
    },
    pause: function() {
      this._worker.pause();
      return this;
    },
    toNodejsStream: function(updateCb) {
      utils.checkSupport("nodestream");
      if (this._outputType !== "nodebuffer") {
        throw new Error(this._outputType + " is not supported by this method");
      }
      return new NodejsStreamOutputAdapter(this, {
        objectMode: this._outputType !== "nodebuffer"
      }, updateCb);
    }
  };
  module.exports = StreamHelper;
});

// node_modules/jszip/lib/defaults.js
var require_defaults = __commonJS((exports) => {
  exports.base64 = false;
  exports.binary = false;
  exports.dir = false;
  exports.createFolders = true;
  exports.date = null;
  exports.compression = null;
  exports.compressionOptions = null;
  exports.comment = null;
  exports.unixPermissions = null;
  exports.dosPermissions = null;
});

// node_modules/jszip/lib/stream/DataWorker.js
var require_DataWorker = __commonJS((exports, module) => {
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  var DEFAULT_BLOCK_SIZE = 16 * 1024;
  function DataWorker(dataP) {
    GenericWorker.call(this, "DataWorker");
    var self2 = this;
    this.dataIsReady = false;
    this.index = 0;
    this.max = 0;
    this.data = null;
    this.type = "";
    this._tickScheduled = false;
    dataP.then(function(data) {
      self2.dataIsReady = true;
      self2.data = data;
      self2.max = data && data.length || 0;
      self2.type = utils.getTypeOf(data);
      if (!self2.isPaused) {
        self2._tickAndRepeat();
      }
    }, function(e) {
      self2.error(e);
    });
  }
  utils.inherits(DataWorker, GenericWorker);
  DataWorker.prototype.cleanUp = function() {
    GenericWorker.prototype.cleanUp.call(this);
    this.data = null;
  };
  DataWorker.prototype.resume = function() {
    if (!GenericWorker.prototype.resume.call(this)) {
      return false;
    }
    if (!this._tickScheduled && this.dataIsReady) {
      this._tickScheduled = true;
      utils.delay(this._tickAndRepeat, [], this);
    }
    return true;
  };
  DataWorker.prototype._tickAndRepeat = function() {
    this._tickScheduled = false;
    if (this.isPaused || this.isFinished) {
      return;
    }
    this._tick();
    if (!this.isFinished) {
      utils.delay(this._tickAndRepeat, [], this);
      this._tickScheduled = true;
    }
  };
  DataWorker.prototype._tick = function() {
    if (this.isPaused || this.isFinished) {
      return false;
    }
    var size = DEFAULT_BLOCK_SIZE;
    var data = null, nextIndex = Math.min(this.max, this.index + size);
    if (this.index >= this.max) {
      return this.end();
    } else {
      switch (this.type) {
        case "string":
          data = this.data.substring(this.index, nextIndex);
          break;
        case "uint8array":
          data = this.data.subarray(this.index, nextIndex);
          break;
        case "array":
        case "nodebuffer":
          data = this.data.slice(this.index, nextIndex);
          break;
      }
      this.index = nextIndex;
      return this.push({
        data,
        meta: {
          percent: this.max ? this.index / this.max * 100 : 0
        }
      });
    }
  };
  module.exports = DataWorker;
});

// node_modules/jszip/lib/crc32.js
var require_crc32 = __commonJS((exports, module) => {
  var utils = require_utils();
  function makeTable() {
    var c, table = [];
    for (var n = 0;n < 256; n++) {
      c = n;
      for (var k = 0;k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c;
    }
    return table;
  }
  var crcTable = makeTable();
  function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;
    crc = crc ^ -1;
    for (var i = pos;i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
    }
    return crc ^ -1;
  }
  function crc32str(crc, str, len, pos) {
    var t = crcTable, end = pos + len;
    crc = crc ^ -1;
    for (var i = pos;i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ str.charCodeAt(i)) & 255];
    }
    return crc ^ -1;
  }
  module.exports = function crc32wrapper(input, crc) {
    if (typeof input === "undefined" || !input.length) {
      return 0;
    }
    var isArray = utils.getTypeOf(input) !== "string";
    if (isArray) {
      return crc32(crc | 0, input, input.length, 0);
    } else {
      return crc32str(crc | 0, input, input.length, 0);
    }
  };
});

// node_modules/jszip/lib/stream/Crc32Probe.js
var require_Crc32Probe = __commonJS((exports, module) => {
  var GenericWorker = require_GenericWorker();
  var crc32 = require_crc32();
  var utils = require_utils();
  function Crc32Probe() {
    GenericWorker.call(this, "Crc32Probe");
    this.withStreamInfo("crc32", 0);
  }
  utils.inherits(Crc32Probe, GenericWorker);
  Crc32Probe.prototype.processChunk = function(chunk) {
    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
    this.push(chunk);
  };
  module.exports = Crc32Probe;
});

// node_modules/jszip/lib/stream/DataLengthProbe.js
var require_DataLengthProbe = __commonJS((exports, module) => {
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  function DataLengthProbe(propName) {
    GenericWorker.call(this, "DataLengthProbe for " + propName);
    this.propName = propName;
    this.withStreamInfo(propName, 0);
  }
  utils.inherits(DataLengthProbe, GenericWorker);
  DataLengthProbe.prototype.processChunk = function(chunk) {
    if (chunk) {
      var length = this.streamInfo[this.propName] || 0;
      this.streamInfo[this.propName] = length + chunk.data.length;
    }
    GenericWorker.prototype.processChunk.call(this, chunk);
  };
  module.exports = DataLengthProbe;
});

// node_modules/jszip/lib/compressedObject.js
var require_compressedObject = __commonJS((exports, module) => {
  var external = require_external();
  var DataWorker = require_DataWorker();
  var Crc32Probe = require_Crc32Probe();
  var DataLengthProbe = require_DataLengthProbe();
  function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
    this.compressedSize = compressedSize;
    this.uncompressedSize = uncompressedSize;
    this.crc32 = crc32;
    this.compression = compression;
    this.compressedContent = data;
  }
  CompressedObject.prototype = {
    getContentWorker: function() {
      var worker = new DataWorker(external.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
      var that = this;
      worker.on("end", function() {
        if (this.streamInfo["data_length"] !== that.uncompressedSize) {
          throw new Error("Bug : uncompressed data size mismatch");
        }
      });
      return worker;
    },
    getCompressedWorker: function() {
      return new DataWorker(external.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
    }
  };
  CompressedObject.createWorkerFrom = function(uncompressedWorker, compression, compressionOptions) {
    return uncompressedWorker.pipe(new Crc32Probe).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression.compressWorker(compressionOptions)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression);
  };
  module.exports = CompressedObject;
});

// node_modules/jszip/lib/zipObject.js
var require_zipObject = __commonJS((exports, module) => {
  var StreamHelper = require_StreamHelper();
  var DataWorker = require_DataWorker();
  var utf8 = require_utf8();
  var CompressedObject = require_compressedObject();
  var GenericWorker = require_GenericWorker();
  var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;
    this._data = data;
    this._dataBinary = options.binary;
    this.options = {
      compression: options.compression,
      compressionOptions: options.compressionOptions
    };
  };
  ZipObject.prototype = {
    internalStream: function(type) {
      var result = null, outputType = "string";
      try {
        if (!type) {
          throw new Error("No output type specified.");
        }
        outputType = type.toLowerCase();
        var askUnicodeString = outputType === "string" || outputType === "text";
        if (outputType === "binarystring" || outputType === "text") {
          outputType = "string";
        }
        result = this._decompressWorker();
        var isUnicodeString = !this._dataBinary;
        if (isUnicodeString && !askUnicodeString) {
          result = result.pipe(new utf8.Utf8EncodeWorker);
        }
        if (!isUnicodeString && askUnicodeString) {
          result = result.pipe(new utf8.Utf8DecodeWorker);
        }
      } catch (e) {
        result = new GenericWorker("error");
        result.error(e);
      }
      return new StreamHelper(result, outputType, "");
    },
    async: function(type, onUpdate) {
      return this.internalStream(type).accumulate(onUpdate);
    },
    nodeStream: function(type, onUpdate) {
      return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
    },
    _compressWorker: function(compression, compressionOptions) {
      if (this._data instanceof CompressedObject && this._data.compression.magic === compression.magic) {
        return this._data.getCompressedWorker();
      } else {
        var result = this._decompressWorker();
        if (!this._dataBinary) {
          result = result.pipe(new utf8.Utf8EncodeWorker);
        }
        return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
      }
    },
    _decompressWorker: function() {
      if (this._data instanceof CompressedObject) {
        return this._data.getContentWorker();
      } else if (this._data instanceof GenericWorker) {
        return this._data;
      } else {
        return new DataWorker(this._data);
      }
    }
  };
  var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
  var removedFn = function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  };
  for (i = 0;i < removedMethods.length; i++) {
    ZipObject.prototype[removedMethods[i]] = removedFn;
  }
  var i;
  module.exports = ZipObject;
});

// node_modules/pako/lib/utils/common.js
var require_common = __commonJS((exports) => {
  var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
  function _has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  exports.assign = function(obj) {
    var sources = Array.prototype.slice.call(arguments, 1);
    while (sources.length) {
      var source = sources.shift();
      if (!source) {
        continue;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be non-object");
      }
      for (var p in source) {
        if (_has(source, p)) {
          obj[p] = source[p];
        }
      }
    }
    return obj;
  };
  exports.shrinkBuf = function(buf, size) {
    if (buf.length === size) {
      return buf;
    }
    if (buf.subarray) {
      return buf.subarray(0, size);
    }
    buf.length = size;
    return buf;
  };
  var fnTyped = {
    arraySet: function(dest, src, src_offs, len, dest_offs) {
      if (src.subarray && dest.subarray) {
        dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
        return;
      }
      for (var i = 0;i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    flattenChunks: function(chunks) {
      var i, l, len, pos, chunk, result;
      len = 0;
      for (i = 0, l = chunks.length;i < l; i++) {
        len += chunks[i].length;
      }
      result = new Uint8Array(len);
      pos = 0;
      for (i = 0, l = chunks.length;i < l; i++) {
        chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }
      return result;
    }
  };
  var fnUntyped = {
    arraySet: function(dest, src, src_offs, len, dest_offs) {
      for (var i = 0;i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    flattenChunks: function(chunks) {
      return [].concat.apply([], chunks);
    }
  };
  exports.setTyped = function(on) {
    if (on) {
      exports.Buf8 = Uint8Array;
      exports.Buf16 = Uint16Array;
      exports.Buf32 = Int32Array;
      exports.assign(exports, fnTyped);
    } else {
      exports.Buf8 = Array;
      exports.Buf16 = Array;
      exports.Buf32 = Array;
      exports.assign(exports, fnUntyped);
    }
  };
  exports.setTyped(TYPED_OK);
});

// node_modules/pako/lib/zlib/trees.js
var require_trees = __commonJS((exports) => {
  var utils = require_common();
  var Z_FIXED = 4;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN = 2;
  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var Buf_size = 16;
  var MAX_BL_BITS = 7;
  var END_BLOCK = 256;
  var REP_3_6 = 16;
  var REPZ_3_10 = 17;
  var REPZ_11_138 = 18;
  var extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
  var extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  var extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
  var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  var DIST_CODE_LEN = 512;
  var static_ltree = new Array((L_CODES + 2) * 2);
  zero(static_ltree);
  var static_dtree = new Array(D_CODES * 2);
  zero(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero(_dist_code);
  var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
  zero(_length_code);
  var base_length = new Array(LENGTH_CODES);
  zero(base_length);
  var base_dist = new Array(D_CODES);
  zero(base_dist);
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  function d_code(dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  }
  function put_short(s, w) {
    s.pending_buf[s.pending++] = w & 255;
    s.pending_buf[s.pending++] = w >>> 8 & 255;
  }
  function send_bits(s, value, length) {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 65535;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 65535;
      s.bi_valid += length;
    }
  }
  function send_code(s, c, tree) {
    send_bits(s, tree[c * 2], tree[c * 2 + 1]);
  }
  function bi_reverse(code, len) {
    var res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  }
  function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 255;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  }
  function gen_bitlen(s, desc) {
    var tree = desc.dyn_tree;
    var max_code = desc.max_code;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var extra = desc.stat_desc.extra_bits;
    var base = desc.stat_desc.extra_base;
    var max_length = desc.stat_desc.max_length;
    var h;
    var n, m;
    var bits;
    var xbits;
    var f;
    var overflow = 0;
    for (bits = 0;bits <= MAX_BITS; bits++) {
      s.bl_count[bits] = 0;
    }
    tree[s.heap[s.heap_max] * 2 + 1] = 0;
    for (h = s.heap_max + 1;h < HEAP_SIZE; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] = bits;
      if (n > max_code) {
        continue;
      }
      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2];
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1] + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--;
      s.bl_count[bits + 1] += 2;
      s.bl_count[max_length]--;
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length;bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] !== bits) {
          s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
          tree[m * 2 + 1] = bits;
        }
        n--;
      }
    }
  }
  function gen_codes(tree, max_code, bl_count) {
    var next_code = new Array(MAX_BITS + 1);
    var code = 0;
    var bits;
    var n;
    for (bits = 1;bits <= MAX_BITS; bits++) {
      next_code[bits] = code = code + bl_count[bits - 1] << 1;
    }
    for (n = 0;n <= max_code; n++) {
      var len = tree[n * 2 + 1];
      if (len === 0) {
        continue;
      }
      tree[n * 2] = bi_reverse(next_code[len]++, len);
    }
  }
  function tr_static_init() {
    var n;
    var bits;
    var length;
    var code;
    var dist;
    var bl_count = new Array(MAX_BITS + 1);
    length = 0;
    for (code = 0;code < LENGTH_CODES - 1; code++) {
      base_length[code] = length;
      for (n = 0;n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    }
    _length_code[length - 1] = code;
    dist = 0;
    for (code = 0;code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0;n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    }
    dist >>= 7;
    for (;code < D_CODES; code++) {
      base_dist[code] = dist << 7;
      for (n = 0;n < 1 << extra_dbits[code] - 7; n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    for (bits = 0;bits <= MAX_BITS; bits++) {
      bl_count[bits] = 0;
    }
    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    gen_codes(static_ltree, L_CODES + 1, bl_count);
    for (n = 0;n < D_CODES; n++) {
      static_dtree[n * 2 + 1] = 5;
      static_dtree[n * 2] = bi_reverse(n, 5);
    }
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
  }
  function init_block(s) {
    var n;
    for (n = 0;n < L_CODES; n++) {
      s.dyn_ltree[n * 2] = 0;
    }
    for (n = 0;n < D_CODES; n++) {
      s.dyn_dtree[n * 2] = 0;
    }
    for (n = 0;n < BL_CODES; n++) {
      s.bl_tree[n * 2] = 0;
    }
    s.dyn_ltree[END_BLOCK * 2] = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  }
  function bi_windup(s) {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  }
  function copy_block(s, buf, len, header) {
    bi_windup(s);
    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    }
    utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
    s.pending += len;
  }
  function smaller(tree, n, m, depth) {
    var _n2 = n * 2;
    var _m2 = m * 2;
    return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
  }
  function pqdownheap(s, tree, k) {
    var v = s.heap[k];
    var j = k << 1;
    while (j <= s.heap_len) {
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }
      s.heap[k] = s.heap[j];
      k = j;
      j <<= 1;
    }
    s.heap[k] = v;
  }
  function compress_block(s, ltree, dtree) {
    var dist;
    var lc;
    var lx = 0;
    var code;
    var extra;
    if (s.last_lit !== 0) {
      do {
        dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
        lc = s.pending_buf[s.l_buf + lx];
        lx++;
        if (dist === 0) {
          send_code(s, lc, ltree);
        } else {
          code = _length_code[lc];
          send_code(s, code + LITERALS + 1, ltree);
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);
          }
          dist--;
          code = d_code(dist);
          send_code(s, code, dtree);
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);
          }
        }
      } while (lx < s.last_lit);
    }
    send_code(s, END_BLOCK, ltree);
  }
  function build_tree(s, desc) {
    var tree = desc.dyn_tree;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var elems = desc.stat_desc.elems;
    var n, m;
    var max_code = -1;
    var node;
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE;
    for (n = 0;n < elems; n++) {
      if (tree[n * 2] !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] = 0;
      }
    }
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s.depth[node] = 0;
      s.opt_len--;
      if (has_stree) {
        s.static_len -= stree[node * 2 + 1];
      }
    }
    desc.max_code = max_code;
    for (n = s.heap_len >> 1;n >= 1; n--) {
      pqdownheap(s, tree, n);
    }
    node = elems;
    do {
      n = s.heap[1];
      s.heap[1] = s.heap[s.heap_len--];
      pqdownheap(s, tree, 1);
      m = s.heap[1];
      s.heap[--s.heap_max] = n;
      s.heap[--s.heap_max] = m;
      tree[node * 2] = tree[n * 2] + tree[m * 2];
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] = tree[m * 2 + 1] = node;
      s.heap[1] = node++;
      pqdownheap(s, tree, 1);
    } while (s.heap_len >= 2);
    s.heap[--s.heap_max] = s.heap[1];
    gen_bitlen(s, desc);
    gen_codes(tree, max_code, s.bl_count);
  }
  function scan_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 65535;
    for (n = 0;n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2]++;
        }
        s.bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2]++;
      } else {
        s.bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function send_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n = 0;n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function build_bl_tree(s) {
    var max_blindex;
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    build_tree(s, s.bl_desc);
    for (max_blindex = BL_CODES - 1;max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
        break;
      }
    }
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  }
  function send_all_trees(s, lcodes, dcodes, blcodes) {
    var rank;
    send_bits(s, lcodes - 257, 5);
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4);
    for (rank = 0;rank < blcodes; rank++) {
      send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
    }
    send_tree(s, s.dyn_ltree, lcodes - 1);
    send_tree(s, s.dyn_dtree, dcodes - 1);
  }
  function detect_data_type(s) {
    var black_mask = 4093624447;
    var n;
    for (n = 0;n <= 31; n++, black_mask >>>= 1) {
      if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
        return Z_BINARY;
      }
    }
    if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
      return Z_TEXT;
    }
    for (n = 32;n < LITERALS; n++) {
      if (s.dyn_ltree[n * 2] !== 0) {
        return Z_TEXT;
      }
    }
    return Z_BINARY;
  }
  var static_init_done = false;
  function _tr_init(s) {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }
    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    s.bi_buf = 0;
    s.bi_valid = 0;
    init_block(s);
  }
  function _tr_stored_block(s, buf, stored_len, last) {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    copy_block(s, buf, stored_len, true);
  }
  function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  }
  function _tr_flush_block(s, buf, stored_len, last) {
    var opt_lenb, static_lenb;
    var max_blindex = 0;
    if (s.level > 0) {
      if (s.strm.data_type === Z_UNKNOWN) {
        s.strm.data_type = detect_data_type(s);
      }
      build_tree(s, s.l_desc);
      build_tree(s, s.d_desc);
      max_blindex = build_bl_tree(s);
      opt_lenb = s.opt_len + 3 + 7 >>> 3;
      static_lenb = s.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      opt_lenb = static_lenb = stored_len + 5;
    }
    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      _tr_stored_block(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    init_block(s);
    if (last) {
      bi_windup(s);
    }
  }
  function _tr_tally(s, dist, lc) {
    s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
    s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
    s.last_lit++;
    if (dist === 0) {
      s.dyn_ltree[lc * 2]++;
    } else {
      s.matches++;
      dist--;
      s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
      s.dyn_dtree[d_code(dist) * 2]++;
    }
    return s.last_lit === s.lit_bufsize - 1;
  }
  exports._tr_init = _tr_init;
  exports._tr_stored_block = _tr_stored_block;
  exports._tr_flush_block = _tr_flush_block;
  exports._tr_tally = _tr_tally;
  exports._tr_align = _tr_align;
});

// node_modules/pako/lib/zlib/adler32.js
var require_adler32 = __commonJS((exports, module) => {
  function adler32(adler, buf, len, pos) {
    var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
    while (len !== 0) {
      n = len > 2000 ? 2000 : len;
      len -= n;
      do {
        s1 = s1 + buf[pos++] | 0;
        s2 = s2 + s1 | 0;
      } while (--n);
      s1 %= 65521;
      s2 %= 65521;
    }
    return s1 | s2 << 16 | 0;
  }
  module.exports = adler32;
});

// node_modules/pako/lib/zlib/crc32.js
var require_crc322 = __commonJS((exports, module) => {
  function makeTable() {
    var c, table = [];
    for (var n = 0;n < 256; n++) {
      c = n;
      for (var k = 0;k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c;
    }
    return table;
  }
  var crcTable = makeTable();
  function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;
    crc ^= -1;
    for (var i = pos;i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
    }
    return crc ^ -1;
  }
  module.exports = crc32;
});

// node_modules/pako/lib/zlib/messages.js
var require_messages = __commonJS((exports, module) => {
  module.exports = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
  };
});

// node_modules/pako/lib/zlib/deflate.js
var require_deflate = __commonJS((exports) => {
  var utils = require_common();
  var trees = require_trees();
  var adler32 = require_adler32();
  var crc32 = require_crc322();
  var msg = require_messages();
  var Z_NO_FLUSH = 0;
  var Z_PARTIAL_FLUSH = 1;
  var Z_FULL_FLUSH = 3;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_BUF_ERROR = -5;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_FILTERED = 1;
  var Z_HUFFMAN_ONLY = 2;
  var Z_RLE = 3;
  var Z_FIXED = 4;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_UNKNOWN = 2;
  var Z_DEFLATED = 8;
  var MAX_MEM_LEVEL = 9;
  var MAX_WBITS = 15;
  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 32;
  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  var BS_BLOCK_DONE = 2;
  var BS_FINISH_STARTED = 3;
  var BS_FINISH_DONE = 4;
  var OS_CODE = 3;
  function err(strm, errorCode) {
    strm.msg = msg[errorCode];
    return errorCode;
  }
  function rank(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  }
  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  function flush_pending(strm) {
    var s = strm.state;
    var len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }
    utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  }
  function flush_block_only(s, last) {
    trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  }
  function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  }
  function putShortMSB(s, b) {
    s.pending_buf[s.pending++] = b >>> 8 & 255;
    s.pending_buf[s.pending++] = b & 255;
  }
  function read_buf(strm, buf, start, size) {
    var len = strm.avail_in;
    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }
    strm.avail_in -= len;
    utils.arraySet(buf, strm.input, strm.next_in, len, start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32(strm.adler, buf, len, start);
    }
    strm.next_in += len;
    strm.total_in += len;
    return len;
  }
  function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length;
    var scan = s.strstart;
    var match;
    var len;
    var best_len = s.prev_length;
    var nice_match = s.nice_match;
    var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
    var _win = s.window;
    var wmask = s.w_mask;
    var prev = s.prev;
    var strend = s.strstart + MAX_MATCH;
    var scan_end1 = _win[scan + best_len - 1];
    var scan_end = _win[scan + best_len];
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }
    do {
      match = cur_match;
      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      scan += 2;
      match++;
      do {
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  }
  function fill_window(s) {
    var _w_size = s.w_size;
    var p, n, m, more, str;
    do {
      more = s.window_size - s.lookahead - s.strstart;
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        s.block_start -= _w_size;
        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        n = _w_size;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
        while (s.insert) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
  }
  function deflate_stored(s, flush) {
    var max_block_size = 65535;
    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }
    for (;; ) {
      if (s.lookahead <= 1) {
        fill_window(s);
        if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.strstart += s.lookahead;
      s.lookahead = 0;
      var max_start = s.block_start + max_block_size;
      if (s.strstart === 0 || s.strstart >= max_start) {
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.strstart > s.block_start) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_NEED_MORE;
  }
  function deflate_fast(s, flush) {
    var hash_head;
    var bflush;
    for (;; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
          s.match_length--;
          do {
            s.strstart++;
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
        }
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_slow(s, flush) {
    var hash_head;
    var bflush;
    var max_insert;
    for (;; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
          s.match_length = MIN_MATCH - 1;
        }
      }
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      } else if (s.match_available) {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
        if (bflush) {
          flush_block_only(s, false);
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    if (s.match_available) {
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_rle(s, flush) {
    var bflush;
    var prev;
    var scan, strend;
    var _win = s.window;
    for (;; ) {
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;
          do {
          } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_huff(s, flush) {
    var bflush;
    for (;; ) {
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          break;
        }
      }
      s.match_length = 0;
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  var configuration_table;
  configuration_table = [
    new Config(0, 0, 0, 0, deflate_stored),
    new Config(4, 4, 8, 4, deflate_fast),
    new Config(4, 5, 16, 8, deflate_fast),
    new Config(4, 6, 32, 32, deflate_fast),
    new Config(4, 4, 16, 16, deflate_slow),
    new Config(8, 16, 32, 32, deflate_slow),
    new Config(8, 16, 128, 128, deflate_slow),
    new Config(8, 32, 128, 256, deflate_slow),
    new Config(32, 128, 258, 1024, deflate_slow),
    new Config(32, 258, 258, 4096, deflate_slow)
  ];
  function lm_init(s) {
    s.window_size = 2 * s.w_size;
    zero(s.head);
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;
    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  }
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
    this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
    this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new utils.Buf16(MAX_BITS + 1);
    this.heap = new utils.Buf16(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new utils.Buf16(2 * L_CODES + 1);
    zero(this.depth);
    this.l_buf = 0;
    this.lit_bufsize = 0;
    this.last_lit = 0;
    this.d_buf = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  function deflateResetKeep(strm) {
    var s;
    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR);
    }
    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    s = strm.state;
    s.pending = 0;
    s.pending_out = 0;
    if (s.wrap < 0) {
      s.wrap = -s.wrap;
    }
    s.status = s.wrap ? INIT_STATE : BUSY_STATE;
    strm.adler = s.wrap === 2 ? 0 : 1;
    s.last_flush = Z_NO_FLUSH;
    trees._tr_init(s);
    return Z_OK;
  }
  function deflateReset(strm) {
    var ret = deflateResetKeep(strm);
    if (ret === Z_OK) {
      lm_init(strm.state);
    }
    return ret;
  }
  function deflateSetHeader(strm, head) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    if (strm.state.wrap !== 2) {
      return Z_STREAM_ERROR;
    }
    strm.state.gzhead = head;
    return Z_OK;
  }
  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) {
      return Z_STREAM_ERROR;
    }
    var wrap = 1;
    if (level === Z_DEFAULT_COMPRESSION) {
      level = 6;
    }
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      windowBits -= 16;
    }
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
      return err(strm, Z_STREAM_ERROR);
    }
    if (windowBits === 8) {
      windowBits = 9;
    }
    var s = new DeflateState;
    strm.state = s;
    s.strm = strm;
    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;
    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s.window = new utils.Buf8(s.w_size * 2);
    s.head = new utils.Buf16(s.hash_size);
    s.prev = new utils.Buf16(s.w_size);
    s.lit_bufsize = 1 << memLevel + 6;
    s.pending_buf_size = s.lit_bufsize * 4;
    s.pending_buf = new utils.Buf8(s.pending_buf_size);
    s.d_buf = 1 * s.lit_bufsize;
    s.l_buf = (1 + 2) * s.lit_bufsize;
    s.level = level;
    s.strategy = strategy;
    s.method = method;
    return deflateReset(strm);
  }
  function deflateInit(strm, level) {
    return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
  }
  function deflate(strm, flush) {
    var old_flush, s;
    var beg, val;
    if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
    }
    s = strm.state;
    if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
    }
    s.strm = strm;
    old_flush = s.last_flush;
    s.last_flush = flush;
    if (s.status === INIT_STATE) {
      if (s.wrap === 2) {
        strm.adler = 0;
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) {
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        } else {
          put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
          put_byte(s, s.gzhead.time & 255);
          put_byte(s, s.gzhead.time >> 8 & 255);
          put_byte(s, s.gzhead.time >> 16 & 255);
          put_byte(s, s.gzhead.time >> 24 & 255);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, s.gzhead.os & 255);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 255);
            put_byte(s, s.gzhead.extra.length >> 8 & 255);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      } else {
        var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
        var level_flags = -1;
        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= level_flags << 6;
        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - header % 31;
        s.status = BUSY_STATE;
        putShortMSB(s, header);
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        strm.adler = 1;
      }
    }
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra) {
        beg = s.pending;
        while (s.gzindex < (s.gzhead.extra.length & 65535)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              break;
            }
          }
          put_byte(s, s.gzhead.extra[s.gzindex] & 255);
          s.gzindex++;
        }
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
        s.status = NAME_STATE;
      }
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
        s.status = COMMENT_STATE;
      }
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
        s.status = HCRC_STATE;
      }
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }
        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          strm.adler = 0;
          s.status = BUSY_STATE;
        }
      } else {
        s.status = BUSY_STATE;
      }
    }
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK;
      }
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
      return err(strm, Z_BUF_ERROR);
    }
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR);
    }
    if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
      var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
        }
        return Z_OK;
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          trees._tr_align(s);
        } else if (flush !== Z_BLOCK) {
          trees._tr_stored_block(s, 0, 0, false);
          if (flush === Z_FULL_FLUSH) {
            zero(s.head);
            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK;
        }
      }
    }
    if (flush !== Z_FINISH) {
      return Z_OK;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END;
    }
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      put_byte(s, strm.adler >> 16 & 255);
      put_byte(s, strm.adler >> 24 & 255);
      put_byte(s, strm.total_in & 255);
      put_byte(s, strm.total_in >> 8 & 255);
      put_byte(s, strm.total_in >> 16 & 255);
      put_byte(s, strm.total_in >> 24 & 255);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    flush_pending(strm);
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    return s.pending !== 0 ? Z_OK : Z_STREAM_END;
  }
  function deflateEnd(strm) {
    var status;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    status = strm.state.status;
    if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
      return err(strm, Z_STREAM_ERROR);
    }
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
  }
  function deflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var s;
    var str, n;
    var wrap;
    var avail;
    var next;
    var input;
    var tmpDict;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    s = strm.state;
    wrap = s.wrap;
    if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
      return Z_STREAM_ERROR;
    }
    if (wrap === 1) {
      strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
    }
    s.wrap = 0;
    if (dictLength >= s.w_size) {
      if (wrap === 0) {
        zero(s.head);
        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      tmpDict = new utils.Buf8(s.w_size);
      utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    avail = strm.avail_in;
    next = strm.next_in;
    input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);
    while (s.lookahead >= MIN_MATCH) {
      str = s.strstart;
      n = s.lookahead - (MIN_MATCH - 1);
      do {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
      s.lookahead = MIN_MATCH - 1;
      fill_window(s);
    }
    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK;
  }
  exports.deflateInit = deflateInit;
  exports.deflateInit2 = deflateInit2;
  exports.deflateReset = deflateReset;
  exports.deflateResetKeep = deflateResetKeep;
  exports.deflateSetHeader = deflateSetHeader;
  exports.deflate = deflate;
  exports.deflateEnd = deflateEnd;
  exports.deflateSetDictionary = deflateSetDictionary;
  exports.deflateInfo = "pako deflate (from Nodeca project)";
});

// node_modules/pako/lib/utils/strings.js
var require_strings = __commonJS((exports) => {
  var utils = require_common();
  var STR_APPLY_OK = true;
  var STR_APPLY_UIA_OK = true;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch (__) {
    STR_APPLY_OK = false;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (__) {
    STR_APPLY_UIA_OK = false;
  }
  var _utf8len = new utils.Buf8(256);
  for (q2 = 0;q2 < 256; q2++) {
    _utf8len[q2] = q2 >= 252 ? 6 : q2 >= 248 ? 5 : q2 >= 240 ? 4 : q2 >= 224 ? 3 : q2 >= 192 ? 2 : 1;
  }
  var q2;
  _utf8len[254] = _utf8len[254] = 1;
  exports.string2buf = function(str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
    for (m_pos = 0;m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    buf = new utils.Buf8(buf_len);
    for (i = 0, m_pos = 0;i < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      if (c < 128) {
        buf[i++] = c;
      } else if (c < 2048) {
        buf[i++] = 192 | c >>> 6;
        buf[i++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i++] = 224 | c >>> 12;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      } else {
        buf[i++] = 240 | c >>> 18;
        buf[i++] = 128 | c >>> 12 & 63;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      }
    }
    return buf;
  };
  function buf2binstring(buf, len) {
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
        return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
      }
    }
    var result = "";
    for (var i = 0;i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }
    return result;
  }
  exports.buf2binstring = function(buf) {
    return buf2binstring(buf, buf.length);
  };
  exports.binstring2buf = function(str) {
    var buf = new utils.Buf8(str.length);
    for (var i = 0, len = buf.length;i < len; i++) {
      buf[i] = str.charCodeAt(i);
    }
    return buf;
  };
  exports.buf2string = function(buf, max) {
    var i, out, c, c_len;
    var len = max || buf.length;
    var utf16buf = new Array(len * 2);
    for (out = 0, i = 0;i < len; ) {
      c = buf[i++];
      if (c < 128) {
        utf16buf[out++] = c;
        continue;
      }
      c_len = _utf8len[c];
      if (c_len > 4) {
        utf16buf[out++] = 65533;
        i += c_len - 1;
        continue;
      }
      c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i < len) {
        c = c << 6 | buf[i++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out++] = c;
      } else {
        c -= 65536;
        utf16buf[out++] = 55296 | c >> 10 & 1023;
        utf16buf[out++] = 56320 | c & 1023;
      }
    }
    return buf2binstring(utf16buf, out);
  };
  exports.utf8border = function(buf, max) {
    var pos;
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
});

// node_modules/pako/lib/zlib/zstream.js
var require_zstream = __commonJS((exports, module) => {
  function ZStream() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  module.exports = ZStream;
});

// node_modules/pako/lib/deflate.js
var require_deflate2 = __commonJS((exports) => {
  var zlib_deflate = require_deflate();
  var utils = require_common();
  var strings = require_strings();
  var msg = require_messages();
  var ZStream = require_zstream();
  var toString = Object.prototype.toString;
  var Z_NO_FLUSH = 0;
  var Z_FINISH = 4;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_SYNC_FLUSH = 2;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_DEFLATED = 8;
  function Deflate(options) {
    if (!(this instanceof Deflate))
      return new Deflate(options);
    this.options = utils.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY,
      to: ""
    }, options || {});
    var opt = this.options;
    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream;
    this.strm.avail_out = 0;
    var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }
    if (opt.header) {
      zlib_deflate.deflateSetHeader(this.strm, opt.header);
    }
    if (opt.dictionary) {
      var dict;
      if (typeof opt.dictionary === "string") {
        dict = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }
      status = zlib_deflate.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK) {
        throw new Error(msg[status]);
      }
      this._dict_set = true;
    }
  }
  Deflate.prototype.push = function(data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var status, _mode;
    if (this.ended) {
      return false;
    }
    _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
    if (typeof data === "string") {
      strm.input = strings.string2buf(data);
    } else if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    do {
      if (strm.avail_out === 0) {
        strm.output = new utils.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = zlib_deflate.deflate(strm, _mode);
      if (status !== Z_STREAM_END && status !== Z_OK) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
        if (this.options.to === "string") {
          this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
    if (_mode === Z_FINISH) {
      status = zlib_deflate.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK;
    }
    if (_mode === Z_SYNC_FLUSH) {
      this.onEnd(Z_OK);
      strm.avail_out = 0;
      return true;
    }
    return true;
  };
  Deflate.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Deflate.prototype.onEnd = function(status) {
    if (status === Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = utils.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function deflate(input, options) {
    var deflator = new Deflate(options);
    deflator.push(input, true);
    if (deflator.err) {
      throw deflator.msg || msg[deflator.err];
    }
    return deflator.result;
  }
  function deflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return deflate(input, options);
  }
  function gzip(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate(input, options);
  }
  exports.Deflate = Deflate;
  exports.deflate = deflate;
  exports.deflateRaw = deflateRaw;
  exports.gzip = gzip;
});

// node_modules/pako/lib/zlib/inffast.js
var require_inffast = __commonJS((exports, module) => {
  var BAD = 30;
  var TYPE = 12;
  module.exports = function inflate_fast(strm, start) {
    var state;
    var _in;
    var last;
    var _out;
    var beg;
    var end;
    var dmax;
    var wsize;
    var whave;
    var wnext;
    var s_window;
    var hold;
    var bits;
    var lcode;
    var dcode;
    var lmask;
    var dmask;
    var here;
    var op;
    var len;
    var dist;
    var from;
    var from_source;
    var input, output;
    state = strm.state;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    dmax = state.dmax;
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;
    top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = lcode[hold & lmask];
        dolen:
          for (;; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 255;
            if (op === 0) {
              output[_out++] = here & 65535;
            } else if (op & 16) {
              len = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist:
                for (;; ) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (op & 16) {
                    dist = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist += hold & (1 << op) - 1;
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist > op) {
                      op = dist - op;
                      if (op > whave) {
                        if (state.sane) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD;
                          break top;
                        }
                      }
                      from = 0;
                      from_source = s_window;
                      if (wnext === 0) {
                        from += wsize - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len) {
                            op = wnext;
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                      while (len > 2) {
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        len -= 3;
                      }
                      if (len) {
                        output[_out++] = from_source[from++];
                        if (len > 1) {
                          output[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist;
                      do {
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        len -= 3;
                      } while (len > 2);
                      if (len) {
                        output[_out++] = output[from++];
                        if (len > 1) {
                          output[_out++] = output[from++];
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                    continue dodist;
                  } else {
                    strm.msg = "invalid distance code";
                    state.mode = BAD;
                    break top;
                  }
                  break;
                }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              state.mode = TYPE;
              break top;
            } else {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break top;
            }
            break;
          }
      } while (_in < last && _out < end);
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state.hold = hold;
    state.bits = bits;
    return;
  };
});

// node_modules/pako/lib/zlib/inftrees.js
var require_inftrees = __commonJS((exports, module) => {
  var utils = require_common();
  var MAXBITS = 15;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var lbase = [
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ];
  var lext = [
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ];
  var dbase = [
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ];
  var dext = [
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];
  module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
    var bits = opts.bits;
    var len = 0;
    var sym = 0;
    var min = 0, max = 0;
    var root = 0;
    var curr = 0;
    var drop = 0;
    var left = 0;
    var used = 0;
    var huff = 0;
    var incr;
    var fill;
    var low;
    var mask;
    var next;
    var base = null;
    var base_index = 0;
    var end;
    var count = new utils.Buf16(MAXBITS + 1);
    var offs = new utils.Buf16(MAXBITS + 1);
    var extra = null;
    var extra_index = 0;
    var here_bits, here_op, here_val;
    for (len = 0;len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0;sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max = MAXBITS;max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min = 1;min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }
    left = 1;
    for (len = 1;len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type === CODES || max !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len = 1;len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    for (sym = 0;sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type === CODES) {
      base = extra = work;
      end = 19;
    } else if (type === LENS) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      base = dbase;
      extra = dext;
      end = -1;
    }
    huff = 0;
    sym = 0;
    len = min;
    next = table_index;
    curr = root;
    drop = 0;
    low = -1;
    used = 1 << root;
    mask = used - 1;
    if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
      return 1;
    }
    for (;; ) {
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len - drop;
      fill = 1 << curr;
      min = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len - 1;
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      sym++;
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }
      if (len > root && (huff & mask) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min;
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }
        used += 1 << curr;
        if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
          return 1;
        }
        low = huff & mask;
        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    if (huff !== 0) {
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
    }
    opts.bits = root;
    return 0;
  };
});

// node_modules/pako/lib/zlib/inflate.js
var require_inflate = __commonJS((exports) => {
  var utils = require_common();
  var adler32 = require_adler32();
  var crc32 = require_crc322();
  var inflate_fast = require_inffast();
  var inflate_table = require_inftrees();
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_TREES = 6;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_NEED_DICT = 2;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_MEM_ERROR = -4;
  var Z_BUF_ERROR = -5;
  var Z_DEFLATED = 8;
  var HEAD = 1;
  var FLAGS = 2;
  var TIME = 3;
  var OS = 4;
  var EXLEN = 5;
  var EXTRA = 6;
  var NAME = 7;
  var COMMENT = 8;
  var HCRC = 9;
  var DICTID = 10;
  var DICT = 11;
  var TYPE = 12;
  var TYPEDO = 13;
  var STORED = 14;
  var COPY_ = 15;
  var COPY = 16;
  var TABLE = 17;
  var LENLENS = 18;
  var CODELENS = 19;
  var LEN_ = 20;
  var LEN = 21;
  var LENEXT = 22;
  var DIST = 23;
  var DISTEXT = 24;
  var MATCH = 25;
  var LIT = 26;
  var CHECK = 27;
  var LENGTH = 28;
  var DONE = 29;
  var BAD = 30;
  var MEM = 31;
  var SYNC = 32;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var MAX_WBITS = 15;
  var DEF_WBITS = MAX_WBITS;
  function zswap32(q2) {
    return (q2 >>> 24 & 255) + (q2 >>> 8 & 65280) + ((q2 & 65280) << 8) + ((q2 & 255) << 24);
  }
  function InflateState() {
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new utils.Buf16(320);
    this.work = new utils.Buf16(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  function inflateResetKeep(strm) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = "";
    if (state.wrap) {
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.dmax = 32768;
    state.head = null;
    state.hold = 0;
    state.bits = 0;
    state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
    state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
    state.sane = 1;
    state.back = -1;
    return Z_OK;
  }
  function inflateReset(strm) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);
  }
  function inflateReset2(strm, windowBits) {
    var wrap;
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  }
  function inflateInit2(strm, windowBits) {
    var ret;
    var state;
    if (!strm) {
      return Z_STREAM_ERROR;
    }
    state = new InflateState;
    strm.state = state;
    state.window = null;
    ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK) {
      strm.state = null;
    }
    return ret;
  }
  function inflateInit(strm) {
    return inflateInit2(strm, DEF_WBITS);
  }
  var virgin = true;
  var lenfix;
  var distfix;
  function fixedtables(state) {
    if (virgin) {
      var sym;
      lenfix = new utils.Buf32(512);
      distfix = new utils.Buf32(32);
      sym = 0;
      while (sym < 144) {
        state.lens[sym++] = 8;
      }
      while (sym < 256) {
        state.lens[sym++] = 9;
      }
      while (sym < 280) {
        state.lens[sym++] = 7;
      }
      while (sym < 288) {
        state.lens[sym++] = 8;
      }
      inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
      sym = 0;
      while (sym < 32) {
        state.lens[sym++] = 5;
      }
      inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
      virgin = false;
    }
    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  }
  function updatewindow(strm, src, end, copy) {
    var dist;
    var state = strm.state;
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;
      state.window = new utils.Buf8(state.wsize);
    }
    if (copy >= state.wsize) {
      utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      utils.arraySet(state.window, src, end - copy, dist, state.wnext);
      copy -= dist;
      if (copy) {
        utils.arraySet(state.window, src, end - copy, copy, 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }
    return 0;
  }
  function inflate(strm, flush) {
    var state;
    var input, output;
    var next;
    var put;
    var have, left;
    var hold;
    var bits;
    var _in, _out;
    var copy;
    var from;
    var from_source;
    var here = 0;
    var here_bits, here_op, here_val;
    var last_bits, last_op, last_val;
    var len;
    var ret;
    var hbuf = new utils.Buf8(4);
    var opts;
    var n;
    var order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    }
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    _in = have;
    _out = left;
    ret = Z_OK;
    inf_leave:
      for (;; ) {
        switch (state.mode) {
          case HEAD:
            if (state.wrap === 0) {
              state.mode = TYPEDO;
              break;
            }
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 2 && hold === 35615) {
              state.check = 0;
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
              hold = 0;
              bits = 0;
              state.mode = FLAGS;
              break;
            }
            state.flags = 0;
            if (state.head) {
              state.head.done = false;
            }
            if (!(state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
              strm.msg = "incorrect header check";
              state.mode = BAD;
              break;
            }
            if ((hold & 15) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            hold >>>= 4;
            bits -= 4;
            len = (hold & 15) + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            } else if (len > state.wbits) {
              strm.msg = "invalid window size";
              state.mode = BAD;
              break;
            }
            state.dmax = 1 << len;
            strm.adler = state.check = 1;
            state.mode = hold & 512 ? DICTID : TYPE;
            hold = 0;
            bits = 0;
            break;
          case FLAGS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.flags = hold;
            if ((state.flags & 255) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            if (state.flags & 57344) {
              strm.msg = "unknown header flags set";
              state.mode = BAD;
              break;
            }
            if (state.head) {
              state.head.text = hold >> 8 & 1;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = TIME;
          case TIME:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.time = hold;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              hbuf[2] = hold >>> 16 & 255;
              hbuf[3] = hold >>> 24 & 255;
              state.check = crc32(state.check, hbuf, 4, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = OS;
          case OS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.xflags = hold & 255;
              state.head.os = hold >> 8;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = EXLEN;
          case EXLEN:
            if (state.flags & 1024) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length = hold;
              if (state.head) {
                state.head.extra_len = hold;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
            } else if (state.head) {
              state.head.extra = null;
            }
            state.mode = EXTRA;
          case EXTRA:
            if (state.flags & 1024) {
              copy = state.length;
              if (copy > have) {
                copy = have;
              }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    state.head.extra = new Array(state.head.extra_len);
                  }
                  utils.arraySet(state.head.extra, input, next, copy, len);
                }
                if (state.flags & 512) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
              }
              if (state.length) {
                break inf_leave;
              }
            }
            state.length = 0;
            state.mode = NAME;
          case NAME:
            if (state.flags & 2048) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.name = null;
            }
            state.length = 0;
            state.mode = COMMENT;
          case COMMENT:
            if (state.flags & 4096) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.comment = null;
            }
            state.mode = HCRC;
          case HCRC:
            if (state.flags & 512) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state.check & 65535)) {
                strm.msg = "header crc mismatch";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            if (state.head) {
              state.head.hcrc = state.flags >> 9 & 1;
              state.head.done = true;
            }
            strm.adler = state.check = 0;
            state.mode = TYPE;
            break;
          case DICTID:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            strm.adler = state.check = zswap32(hold);
            hold = 0;
            bits = 0;
            state.mode = DICT;
          case DICT:
            if (state.havedict === 0) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              return Z_NEED_DICT;
            }
            strm.adler = state.check = 1;
            state.mode = TYPE;
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) {
              break inf_leave;
            }
          case TYPEDO:
            if (state.last) {
              hold >>>= bits & 7;
              bits -= bits & 7;
              state.mode = CHECK;
              break;
            }
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.last = hold & 1;
            hold >>>= 1;
            bits -= 1;
            switch (hold & 3) {
              case 0:
                state.mode = STORED;
                break;
              case 1:
                fixedtables(state);
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  hold >>>= 2;
                  bits -= 2;
                  break inf_leave;
                }
                break;
              case 2:
                state.mode = TABLE;
                break;
              case 3:
                strm.msg = "invalid block type";
                state.mode = BAD;
            }
            hold >>>= 2;
            bits -= 2;
            break;
          case STORED:
            hold >>>= bits & 7;
            bits -= bits & 7;
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
              strm.msg = "invalid stored block lengths";
              state.mode = BAD;
              break;
            }
            state.length = hold & 65535;
            hold = 0;
            bits = 0;
            state.mode = COPY_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case COPY_:
            state.mode = COPY;
          case COPY:
            copy = state.length;
            if (copy) {
              if (copy > have) {
                copy = have;
              }
              if (copy > left) {
                copy = left;
              }
              if (copy === 0) {
                break inf_leave;
              }
              utils.arraySet(output, input, next, copy, put);
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
              break;
            }
            state.mode = TYPE;
            break;
          case TABLE:
            while (bits < 14) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.nlen = (hold & 31) + 257;
            hold >>>= 5;
            bits -= 5;
            state.ndist = (hold & 31) + 1;
            hold >>>= 5;
            bits -= 5;
            state.ncode = (hold & 15) + 4;
            hold >>>= 4;
            bits -= 4;
            if (state.nlen > 286 || state.ndist > 30) {
              strm.msg = "too many length or distance symbols";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = LENLENS;
          case LENLENS:
            while (state.have < state.ncode) {
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.lens[order[state.have++]] = hold & 7;
              hold >>>= 3;
              bits -= 3;
            }
            while (state.have < 19) {
              state.lens[order[state.have++]] = 0;
            }
            state.lencode = state.lendyn;
            state.lenbits = 7;
            opts = { bits: state.lenbits };
            ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid code lengths set";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = CODELENS;
          case CODELENS:
            while (state.have < state.nlen + state.ndist) {
              for (;; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_val < 16) {
                hold >>>= here_bits;
                bits -= here_bits;
                state.lens[state.have++] = here_val;
              } else {
                if (here_val === 16) {
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  if (state.have === 0) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD;
                    break;
                  }
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 3);
                  hold >>>= 2;
                  bits -= 2;
                } else if (here_val === 17) {
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 3 + (hold & 7);
                  hold >>>= 3;
                  bits -= 3;
                } else {
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
                }
              }
            }
            if (state.mode === BAD) {
              break;
            }
            if (state.lens[256] === 0) {
              strm.msg = "invalid code -- missing end-of-block";
              state.mode = BAD;
              break;
            }
            state.lenbits = 9;
            opts = { bits: state.lenbits };
            ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid literal/lengths set";
              state.mode = BAD;
              break;
            }
            state.distbits = 6;
            state.distcode = state.distdyn;
            opts = { bits: state.distbits };
            ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
            state.distbits = opts.bits;
            if (ret) {
              strm.msg = "invalid distances set";
              state.mode = BAD;
              break;
            }
            state.mode = LEN_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case LEN_:
            state.mode = LEN;
          case LEN:
            if (have >= 6 && left >= 258) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              inflate_fast(strm, _out);
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              if (state.mode === TYPE) {
                state.back = -1;
              }
              break;
            }
            state.back = 0;
            for (;; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_op && (here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;; ) {
                here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            state.length = here_val;
            if (here_op === 0) {
              state.mode = LIT;
              break;
            }
            if (here_op & 32) {
              state.back = -1;
              state.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break;
            }
            state.extra = here_op & 15;
            state.mode = LENEXT;
          case LENEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            state.was = state.length;
            state.mode = DIST;
          case DIST:
            for (;; ) {
              here = state.distcode[hold & (1 << state.distbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;; ) {
                here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            if (here_op & 64) {
              strm.msg = "invalid distance code";
              state.mode = BAD;
              break;
            }
            state.offset = here_val;
            state.extra = here_op & 15;
            state.mode = DISTEXT;
          case DISTEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.offset += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            if (state.offset > state.dmax) {
              strm.msg = "invalid distance too far back";
              state.mode = BAD;
              break;
            }
            state.mode = MATCH;
          case MATCH:
            if (left === 0) {
              break inf_leave;
            }
            copy = _out - left;
            if (state.offset > copy) {
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              } else {
                from = state.wnext - copy;
              }
              if (copy > state.length) {
                copy = state.length;
              }
              from_source = state.window;
            } else {
              from_source = output;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) {
              copy = left;
            }
            left -= copy;
            state.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
            if (state.length === 0) {
              state.mode = LEN;
            }
            break;
          case LIT:
            if (left === 0) {
              break inf_leave;
            }
            output[put++] = state.length;
            left--;
            state.mode = LEN;
            break;
          case CHECK:
            if (state.wrap) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold |= input[next++] << bits;
                bits += 8;
              }
              _out -= left;
              strm.total_out += _out;
              state.total += _out;
              if (_out) {
                strm.adler = state.check = state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
              }
              _out = left;
              if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                strm.msg = "incorrect data check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = LENGTH;
          case LENGTH:
            if (state.wrap && state.flags) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state.total & 4294967295)) {
                strm.msg = "incorrect length check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = DONE;
          case DONE:
            ret = Z_STREAM_END;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR;
          case SYNC:
          default:
            return Z_STREAM_ERROR;
        }
      }
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
        state.mode = MEM;
        return Z_MEM_ERROR;
      }
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap && _out) {
      strm.adler = state.check = state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
    }
    strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
      ret = Z_BUF_ERROR;
    }
    return ret;
  }
  function inflateEnd(strm) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    var state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK;
  }
  function inflateGetHeader(strm, head) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if ((state.wrap & 2) === 0) {
      return Z_STREAM_ERROR;
    }
    state.head = head;
    head.done = false;
    return Z_OK;
  }
  function inflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var state;
    var dictid;
    var ret;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (state.wrap !== 0 && state.mode !== DICT) {
      return Z_STREAM_ERROR;
    }
    if (state.mode === DICT) {
      dictid = 1;
      dictid = adler32(dictid, dictionary, dictLength, 0);
      if (dictid !== state.check) {
        return Z_DATA_ERROR;
      }
    }
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
    state.havedict = 1;
    return Z_OK;
  }
  exports.inflateReset = inflateReset;
  exports.inflateReset2 = inflateReset2;
  exports.inflateResetKeep = inflateResetKeep;
  exports.inflateInit = inflateInit;
  exports.inflateInit2 = inflateInit2;
  exports.inflate = inflate;
  exports.inflateEnd = inflateEnd;
  exports.inflateGetHeader = inflateGetHeader;
  exports.inflateSetDictionary = inflateSetDictionary;
  exports.inflateInfo = "pako inflate (from Nodeca project)";
});

// node_modules/pako/lib/zlib/constants.js
var require_constants = __commonJS((exports, module) => {
  module.exports = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
  };
});

// node_modules/pako/lib/zlib/gzheader.js
var require_gzheader = __commonJS((exports, module) => {
  function GZheader() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
  }
  module.exports = GZheader;
});

// node_modules/pako/lib/inflate.js
var require_inflate2 = __commonJS((exports) => {
  var zlib_inflate = require_inflate();
  var utils = require_common();
  var strings = require_strings();
  var c = require_constants();
  var msg = require_messages();
  var ZStream = require_zstream();
  var GZheader = require_gzheader();
  var toString = Object.prototype.toString;
  function Inflate(options) {
    if (!(this instanceof Inflate))
      return new Inflate(options);
    this.options = utils.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, options || {});
    var opt = this.options;
    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    }
    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    }
    if (opt.windowBits > 15 && opt.windowBits < 48) {
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream;
    this.strm.avail_out = 0;
    var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
    if (status !== c.Z_OK) {
      throw new Error(msg[status]);
    }
    this.header = new GZheader;
    zlib_inflate.inflateGetHeader(this.strm, this.header);
    if (opt.dictionary) {
      if (typeof opt.dictionary === "string") {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) {
        status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== c.Z_OK) {
          throw new Error(msg[status]);
        }
      }
    }
  }
  Inflate.prototype.push = function(data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var dictionary = this.options.dictionary;
    var status, _mode;
    var next_out_utf8, tail, utf8str;
    var allowBufError = false;
    if (this.ended) {
      return false;
    }
    _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
    if (typeof data === "string") {
      strm.input = strings.binstring2buf(data);
    } else if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    do {
      if (strm.avail_out === 0) {
        strm.output = new utils.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
      if (status === c.Z_NEED_DICT && dictionary) {
        status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
      }
      if (status === c.Z_BUF_ERROR && allowBufError === true) {
        status = c.Z_OK;
        allowBufError = false;
      }
      if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.next_out) {
        if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
          if (this.options.to === "string") {
            next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
            tail = strm.next_out - next_out_utf8;
            utf8str = strings.buf2string(strm.output, next_out_utf8);
            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail) {
              utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
            }
            this.onData(utf8str);
          } else {
            this.onData(utils.shrinkBuf(strm.output, strm.next_out));
          }
        }
      }
      if (strm.avail_in === 0 && strm.avail_out === 0) {
        allowBufError = true;
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
    if (status === c.Z_STREAM_END) {
      _mode = c.Z_FINISH;
    }
    if (_mode === c.Z_FINISH) {
      status = zlib_inflate.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === c.Z_OK;
    }
    if (_mode === c.Z_SYNC_FLUSH) {
      this.onEnd(c.Z_OK);
      strm.avail_out = 0;
      return true;
    }
    return true;
  };
  Inflate.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Inflate.prototype.onEnd = function(status) {
    if (status === c.Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = utils.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function inflate(input, options) {
    var inflator = new Inflate(options);
    inflator.push(input, true);
    if (inflator.err) {
      throw inflator.msg || msg[inflator.err];
    }
    return inflator.result;
  }
  function inflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return inflate(input, options);
  }
  exports.Inflate = Inflate;
  exports.inflate = inflate;
  exports.inflateRaw = inflateRaw;
  exports.ungzip = inflate;
});

// node_modules/pako/index.js
var require_pako = __commonJS((exports, module) => {
  var assign = require_common().assign;
  var deflate = require_deflate2();
  var inflate = require_inflate2();
  var constants = require_constants();
  var pako = {};
  assign(pako, deflate, inflate, constants);
  module.exports = pako;
});

// node_modules/jszip/lib/flate.js
var require_flate = __commonJS((exports) => {
  var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
  var pako = require_pako();
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";
  exports.magic = "\b\x00";
  function FlateWorker(action, options) {
    GenericWorker.call(this, "FlateWorker/" + action);
    this._pako = null;
    this._pakoAction = action;
    this._pakoOptions = options;
    this.meta = {};
  }
  utils.inherits(FlateWorker, GenericWorker);
  FlateWorker.prototype.processChunk = function(chunk) {
    this.meta = chunk.meta;
    if (this._pako === null) {
      this._createPako();
    }
    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
  };
  FlateWorker.prototype.flush = function() {
    GenericWorker.prototype.flush.call(this);
    if (this._pako === null) {
      this._createPako();
    }
    this._pako.push([], true);
  };
  FlateWorker.prototype.cleanUp = function() {
    GenericWorker.prototype.cleanUp.call(this);
    this._pako = null;
  };
  FlateWorker.prototype._createPako = function() {
    this._pako = new pako[this._pakoAction]({
      raw: true,
      level: this._pakoOptions.level || -1
    });
    var self2 = this;
    this._pako.onData = function(data) {
      self2.push({
        data,
        meta: self2.meta
      });
    };
  };
  exports.compressWorker = function(compressionOptions) {
    return new FlateWorker("Deflate", compressionOptions);
  };
  exports.uncompressWorker = function() {
    return new FlateWorker("Inflate", {});
  };
});

// node_modules/jszip/lib/compressions.js
var require_compressions = __commonJS((exports) => {
  var GenericWorker = require_GenericWorker();
  exports.STORE = {
    magic: "\x00\x00",
    compressWorker: function() {
      return new GenericWorker("STORE compression");
    },
    uncompressWorker: function() {
      return new GenericWorker("STORE decompression");
    }
  };
  exports.DEFLATE = require_flate();
});

// node_modules/jszip/lib/signature.js
var require_signature = __commonJS((exports) => {
  exports.LOCAL_FILE_HEADER = "PK\x03\x04";
  exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
  exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
  exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
  exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
  exports.DATA_DESCRIPTOR = "PK\x07\b";
});

// node_modules/jszip/lib/generate/ZipFileWorker.js
var require_ZipFileWorker = __commonJS((exports, module) => {
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  var utf8 = require_utf8();
  var crc32 = require_crc32();
  var signature = require_signature();
  var decToHex = function(dec, bytes) {
    var hex = "", i;
    for (i = 0;i < bytes; i++) {
      hex += String.fromCharCode(dec & 255);
      dec = dec >>> 8;
    }
    return hex;
  };
  var generateUnixExternalFileAttr = function(unixPermissions, isDir) {
    var result = unixPermissions;
    if (!unixPermissions) {
      result = isDir ? 16893 : 33204;
    }
    return (result & 65535) << 16;
  };
  var generateDosExternalFileAttr = function(dosPermissions) {
    return (dosPermissions || 0) & 63;
  };
  var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
    var file = streamInfo["file"], compression = streamInfo["compression"], useCustomEncoding = encodeFileName !== utf8.utf8encode, encodedFileName = utils.transformTo("string", encodeFileName(file.name)), utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)), comment = file.comment, encodedComment = utils.transformTo("string", encodeFileName(comment)), utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)), useUTF8ForFileName = utfEncodedFileName.length !== file.name.length, useUTF8ForComment = utfEncodedComment.length !== comment.length, dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir = file.dir, date = file.date;
    var dataInfo = {
      crc32: 0,
      compressedSize: 0,
      uncompressedSize: 0
    };
    if (!streamedContent || streamingEnded) {
      dataInfo.crc32 = streamInfo["crc32"];
      dataInfo.compressedSize = streamInfo["compressedSize"];
      dataInfo.uncompressedSize = streamInfo["uncompressedSize"];
    }
    var bitflag = 0;
    if (streamedContent) {
      bitflag |= 8;
    }
    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
      bitflag |= 2048;
    }
    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
      extFileAttr |= 16;
    }
    if (platform === "UNIX") {
      versionMadeBy = 798;
      extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else {
      versionMadeBy = 20;
      extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }
    dosTime = date.getUTCHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getUTCMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getUTCSeconds() / 2;
    dosDate = date.getUTCFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | date.getUTCMonth() + 1;
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getUTCDate();
    if (useUTF8ForFileName) {
      unicodePathExtraField = decToHex(1, 1) + decToHex(crc32(encodedFileName), 4) + utfEncodedFileName;
      extraFields += "up" + decToHex(unicodePathExtraField.length, 2) + unicodePathExtraField;
    }
    if (useUTF8ForComment) {
      unicodeCommentExtraField = decToHex(1, 1) + decToHex(crc32(encodedComment), 4) + utfEncodedComment;
      extraFields += "uc" + decToHex(unicodeCommentExtraField.length, 2) + unicodeCommentExtraField;
    }
    var header = "";
    header += `
\x00`;
    header += decToHex(bitflag, 2);
    header += compression.magic;
    header += decToHex(dosTime, 2);
    header += decToHex(dosDate, 2);
    header += decToHex(dataInfo.crc32, 4);
    header += decToHex(dataInfo.compressedSize, 4);
    header += decToHex(dataInfo.uncompressedSize, 4);
    header += decToHex(encodedFileName.length, 2);
    header += decToHex(extraFields.length, 2);
    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
    var dirRecord = signature.CENTRAL_FILE_HEADER + decToHex(versionMadeBy, 2) + header + decToHex(encodedComment.length, 2) + "\x00\x00" + "\x00\x00" + decToHex(extFileAttr, 4) + decToHex(offset, 4) + encodedFileName + extraFields + encodedComment;
    return {
      fileRecord,
      dirRecord
    };
  };
  var generateCentralDirectoryEnd = function(entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
    var dirEnd = "";
    var encodedComment = utils.transformTo("string", encodeFileName(comment));
    dirEnd = signature.CENTRAL_DIRECTORY_END + "\x00\x00" + "\x00\x00" + decToHex(entriesCount, 2) + decToHex(entriesCount, 2) + decToHex(centralDirLength, 4) + decToHex(localDirLength, 4) + decToHex(encodedComment.length, 2) + encodedComment;
    return dirEnd;
  };
  var generateDataDescriptors = function(streamInfo) {
    var descriptor = "";
    descriptor = signature.DATA_DESCRIPTOR + decToHex(streamInfo["crc32"], 4) + decToHex(streamInfo["compressedSize"], 4) + decToHex(streamInfo["uncompressedSize"], 4);
    return descriptor;
  };
  function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
    GenericWorker.call(this, "ZipFileWorker");
    this.bytesWritten = 0;
    this.zipComment = comment;
    this.zipPlatform = platform;
    this.encodeFileName = encodeFileName;
    this.streamFiles = streamFiles;
    this.accumulate = false;
    this.contentBuffer = [];
    this.dirRecords = [];
    this.currentSourceOffset = 0;
    this.entriesCount = 0;
    this.currentFile = null;
    this._sources = [];
  }
  utils.inherits(ZipFileWorker, GenericWorker);
  ZipFileWorker.prototype.push = function(chunk) {
    var currentFilePercent = chunk.meta.percent || 0;
    var entriesCount = this.entriesCount;
    var remainingFiles = this._sources.length;
    if (this.accumulate) {
      this.contentBuffer.push(chunk);
    } else {
      this.bytesWritten += chunk.data.length;
      GenericWorker.prototype.push.call(this, {
        data: chunk.data,
        meta: {
          currentFile: this.currentFile,
          percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
        }
      });
    }
  };
  ZipFileWorker.prototype.openedSource = function(streamInfo) {
    this.currentSourceOffset = this.bytesWritten;
    this.currentFile = streamInfo["file"].name;
    var streamedContent = this.streamFiles && !streamInfo["file"].dir;
    if (streamedContent) {
      var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
      this.push({
        data: record.fileRecord,
        meta: { percent: 0 }
      });
    } else {
      this.accumulate = true;
    }
  };
  ZipFileWorker.prototype.closedSource = function(streamInfo) {
    this.accumulate = false;
    var streamedContent = this.streamFiles && !streamInfo["file"].dir;
    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.dirRecords.push(record.dirRecord);
    if (streamedContent) {
      this.push({
        data: generateDataDescriptors(streamInfo),
        meta: { percent: 100 }
      });
    } else {
      this.push({
        data: record.fileRecord,
        meta: { percent: 0 }
      });
      while (this.contentBuffer.length) {
        this.push(this.contentBuffer.shift());
      }
    }
    this.currentFile = null;
  };
  ZipFileWorker.prototype.flush = function() {
    var localDirLength = this.bytesWritten;
    for (var i = 0;i < this.dirRecords.length; i++) {
      this.push({
        data: this.dirRecords[i],
        meta: { percent: 100 }
      });
    }
    var centralDirLength = this.bytesWritten - localDirLength;
    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);
    this.push({
      data: dirEnd,
      meta: { percent: 100 }
    });
  };
  ZipFileWorker.prototype.prepareNextSource = function() {
    this.previous = this._sources.shift();
    this.openedSource(this.previous.streamInfo);
    if (this.isPaused) {
      this.previous.pause();
    } else {
      this.previous.resume();
    }
  };
  ZipFileWorker.prototype.registerPrevious = function(previous) {
    this._sources.push(previous);
    var self2 = this;
    previous.on("data", function(chunk) {
      self2.processChunk(chunk);
    });
    previous.on("end", function() {
      self2.closedSource(self2.previous.streamInfo);
      if (self2._sources.length) {
        self2.prepareNextSource();
      } else {
        self2.end();
      }
    });
    previous.on("error", function(e) {
      self2.error(e);
    });
    return this;
  };
  ZipFileWorker.prototype.resume = function() {
    if (!GenericWorker.prototype.resume.call(this)) {
      return false;
    }
    if (!this.previous && this._sources.length) {
      this.prepareNextSource();
      return true;
    }
    if (!this.previous && !this._sources.length && !this.generatedError) {
      this.end();
      return true;
    }
  };
  ZipFileWorker.prototype.error = function(e) {
    var sources = this._sources;
    if (!GenericWorker.prototype.error.call(this, e)) {
      return false;
    }
    for (var i = 0;i < sources.length; i++) {
      try {
        sources[i].error(e);
      } catch (e2) {
      }
    }
    return true;
  };
  ZipFileWorker.prototype.lock = function() {
    GenericWorker.prototype.lock.call(this);
    var sources = this._sources;
    for (var i = 0;i < sources.length; i++) {
      sources[i].lock();
    }
  };
  module.exports = ZipFileWorker;
});

// node_modules/jszip/lib/generate/index.js
var require_generate = __commonJS((exports) => {
  var compressions = require_compressions();
  var ZipFileWorker = require_ZipFileWorker();
  var getCompression = function(fileCompression, zipCompression) {
    var compressionName = fileCompression || zipCompression;
    var compression = compressions[compressionName];
    if (!compression) {
      throw new Error(compressionName + " is not a valid compression method !");
    }
    return compression;
  };
  exports.generateWorker = function(zip, options, comment) {
    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
    var entriesCount = 0;
    try {
      zip.forEach(function(relativePath, file) {
        entriesCount++;
        var compression = getCompression(file.options.compression, options.compression);
        var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
        var { dir, date } = file;
        file._compressWorker(compression, compressionOptions).withStreamInfo("file", {
          name: relativePath,
          dir,
          date,
          comment: file.comment || "",
          unixPermissions: file.unixPermissions,
          dosPermissions: file.dosPermissions
        }).pipe(zipFileWorker);
      });
      zipFileWorker.entriesCount = entriesCount;
    } catch (e) {
      zipFileWorker.error(e);
    }
    return zipFileWorker;
  };
});

// node_modules/jszip/lib/nodejs/NodejsStreamInputAdapter.js
var require_NodejsStreamInputAdapter = __commonJS((exports, module) => {
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  function NodejsStreamInputAdapter(filename, stream) {
    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
    this._upstreamEnded = false;
    this._bindStream(stream);
  }
  utils.inherits(NodejsStreamInputAdapter, GenericWorker);
  NodejsStreamInputAdapter.prototype._bindStream = function(stream) {
    var self2 = this;
    this._stream = stream;
    stream.pause();
    stream.on("data", function(chunk) {
      self2.push({
        data: chunk,
        meta: {
          percent: 0
        }
      });
    }).on("error", function(e) {
      if (self2.isPaused) {
        this.generatedError = e;
      } else {
        self2.error(e);
      }
    }).on("end", function() {
      if (self2.isPaused) {
        self2._upstreamEnded = true;
      } else {
        self2.end();
      }
    });
  };
  NodejsStreamInputAdapter.prototype.pause = function() {
    if (!GenericWorker.prototype.pause.call(this)) {
      return false;
    }
    this._stream.pause();
    return true;
  };
  NodejsStreamInputAdapter.prototype.resume = function() {
    if (!GenericWorker.prototype.resume.call(this)) {
      return false;
    }
    if (this._upstreamEnded) {
      this.end();
    } else {
      this._stream.resume();
    }
    return true;
  };
  module.exports = NodejsStreamInputAdapter;
});

// node_modules/jszip/lib/object.js
var require_object = __commonJS((exports, module) => {
  var utf8 = require_utf8();
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  var StreamHelper = require_StreamHelper();
  var defaults = require_defaults();
  var CompressedObject = require_compressedObject();
  var ZipObject = require_zipObject();
  var generate = require_generate();
  var nodejsUtils = require_nodejsUtils();
  var NodejsStreamInputAdapter = require_NodejsStreamInputAdapter();
  var fileAdd = function(name, data, originalOptions) {
    var dataType = utils.getTypeOf(data), parent;
    var o = utils.extend(originalOptions || {}, defaults);
    o.date = o.date || new Date;
    if (o.compression !== null) {
      o.compression = o.compression.toUpperCase();
    }
    if (typeof o.unixPermissions === "string") {
      o.unixPermissions = parseInt(o.unixPermissions, 8);
    }
    if (o.unixPermissions && o.unixPermissions & 16384) {
      o.dir = true;
    }
    if (o.dosPermissions && o.dosPermissions & 16) {
      o.dir = true;
    }
    if (o.dir) {
      name = forceTrailingSlash(name);
    }
    if (o.createFolders && (parent = parentFolder(name))) {
      folderAdd.call(this, parent, true);
    }
    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
    if (!originalOptions || typeof originalOptions.binary === "undefined") {
      o.binary = !isUnicodeString;
    }
    var isCompressedEmpty = data instanceof CompressedObject && data.uncompressedSize === 0;
    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
      o.base64 = false;
      o.binary = true;
      data = "";
      o.compression = "STORE";
      dataType = "string";
    }
    var zipObjectContent = null;
    if (data instanceof CompressedObject || data instanceof GenericWorker) {
      zipObjectContent = data;
    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
      zipObjectContent = new NodejsStreamInputAdapter(name, data);
    } else {
      zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
    }
    var object = new ZipObject(name, zipObjectContent, o);
    this.files[name] = object;
  };
  var parentFolder = function(path) {
    if (path.slice(-1) === "/") {
      path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf("/");
    return lastSlash > 0 ? path.substring(0, lastSlash) : "";
  };
  var forceTrailingSlash = function(path) {
    if (path.slice(-1) !== "/") {
      path += "/";
    }
    return path;
  };
  var folderAdd = function(name, createFolders) {
    createFolders = typeof createFolders !== "undefined" ? createFolders : defaults.createFolders;
    name = forceTrailingSlash(name);
    if (!this.files[name]) {
      fileAdd.call(this, name, null, {
        dir: true,
        createFolders
      });
    }
    return this.files[name];
  };
  function isRegExp(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
  }
  var out = {
    load: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },
    forEach: function(cb) {
      var filename, relativePath, file;
      for (filename in this.files) {
        file = this.files[filename];
        relativePath = filename.slice(this.root.length, filename.length);
        if (relativePath && filename.slice(0, this.root.length) === this.root) {
          cb(relativePath, file);
        }
      }
    },
    filter: function(search) {
      var result = [];
      this.forEach(function(relativePath, entry) {
        if (search(relativePath, entry)) {
          result.push(entry);
        }
      });
      return result;
    },
    file: function(name, data, o) {
      if (arguments.length === 1) {
        if (isRegExp(name)) {
          var regexp = name;
          return this.filter(function(relativePath, file) {
            return !file.dir && regexp.test(relativePath);
          });
        } else {
          var obj = this.files[this.root + name];
          if (obj && !obj.dir) {
            return obj;
          } else {
            return null;
          }
        }
      } else {
        name = this.root + name;
        fileAdd.call(this, name, data, o);
      }
      return this;
    },
    folder: function(arg) {
      if (!arg) {
        return this;
      }
      if (isRegExp(arg)) {
        return this.filter(function(relativePath, file) {
          return file.dir && arg.test(relativePath);
        });
      }
      var name = this.root + arg;
      var newFolder = folderAdd.call(this, name);
      var ret = this.clone();
      ret.root = newFolder.name;
      return ret;
    },
    remove: function(name) {
      name = this.root + name;
      var file = this.files[name];
      if (!file) {
        if (name.slice(-1) !== "/") {
          name += "/";
        }
        file = this.files[name];
      }
      if (file && !file.dir) {
        delete this.files[name];
      } else {
        var kids = this.filter(function(relativePath, file2) {
          return file2.name.slice(0, name.length) === name;
        });
        for (var i = 0;i < kids.length; i++) {
          delete this.files[kids[i].name];
        }
      }
      return this;
    },
    generate: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },
    generateInternalStream: function(options) {
      var worker, opts = {};
      try {
        opts = utils.extend(options || {}, {
          streamFiles: false,
          compression: "STORE",
          compressionOptions: null,
          type: "",
          platform: "DOS",
          comment: null,
          mimeType: "application/zip",
          encodeFileName: utf8.utf8encode
        });
        opts.type = opts.type.toLowerCase();
        opts.compression = opts.compression.toUpperCase();
        if (opts.type === "binarystring") {
          opts.type = "string";
        }
        if (!opts.type) {
          throw new Error("No output type specified.");
        }
        utils.checkSupport(opts.type);
        if (opts.platform === "darwin" || opts.platform === "freebsd" || opts.platform === "linux" || opts.platform === "sunos") {
          opts.platform = "UNIX";
        }
        if (opts.platform === "win32") {
          opts.platform = "DOS";
        }
        var comment = opts.comment || this.comment || "";
        worker = generate.generateWorker(this, opts, comment);
      } catch (e) {
        worker = new GenericWorker("error");
        worker.error(e);
      }
      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
    },
    generateAsync: function(options, onUpdate) {
      return this.generateInternalStream(options).accumulate(onUpdate);
    },
    generateNodeStream: function(options, onUpdate) {
      options = options || {};
      if (!options.type) {
        options.type = "nodebuffer";
      }
      return this.generateInternalStream(options).toNodejsStream(onUpdate);
    }
  };
  module.exports = out;
});

// node_modules/jszip/lib/reader/DataReader.js
var require_DataReader = __commonJS((exports, module) => {
  var utils = require_utils();
  function DataReader(data) {
    this.data = data;
    this.length = data.length;
    this.index = 0;
    this.zero = 0;
  }
  DataReader.prototype = {
    checkOffset: function(offset) {
      this.checkIndex(this.index + offset);
    },
    checkIndex: function(newIndex) {
      if (this.length < this.zero + newIndex || newIndex < 0) {
        throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
      }
    },
    setIndex: function(newIndex) {
      this.checkIndex(newIndex);
      this.index = newIndex;
    },
    skip: function(n) {
      this.setIndex(this.index + n);
    },
    byteAt: function() {
    },
    readInt: function(size) {
      var result = 0, i;
      this.checkOffset(size);
      for (i = this.index + size - 1;i >= this.index; i--) {
        result = (result << 8) + this.byteAt(i);
      }
      this.index += size;
      return result;
    },
    readString: function(size) {
      return utils.transformTo("string", this.readData(size));
    },
    readData: function() {
    },
    lastIndexOfSignature: function() {
    },
    readAndCheckSignature: function() {
    },
    readDate: function() {
      var dostime = this.readInt(4);
      return new Date(Date.UTC((dostime >> 25 & 127) + 1980, (dostime >> 21 & 15) - 1, dostime >> 16 & 31, dostime >> 11 & 31, dostime >> 5 & 63, (dostime & 31) << 1));
    }
  };
  module.exports = DataReader;
});

// node_modules/jszip/lib/reader/ArrayReader.js
var require_ArrayReader = __commonJS((exports, module) => {
  var DataReader = require_DataReader();
  var utils = require_utils();
  function ArrayReader(data) {
    DataReader.call(this, data);
    for (var i = 0;i < this.data.length; i++) {
      data[i] = data[i] & 255;
    }
  }
  utils.inherits(ArrayReader, DataReader);
  ArrayReader.prototype.byteAt = function(i) {
    return this.data[this.zero + i];
  };
  ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4;i >= 0; --i) {
      if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
        return i - this.zero;
      }
    }
    return -1;
  };
  ArrayReader.prototype.readAndCheckSignature = function(sig) {
    var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3), data = this.readData(4);
    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
  };
  ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if (size === 0) {
      return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module.exports = ArrayReader;
});

// node_modules/jszip/lib/reader/StringReader.js
var require_StringReader = __commonJS((exports, module) => {
  var DataReader = require_DataReader();
  var utils = require_utils();
  function StringReader(data) {
    DataReader.call(this, data);
  }
  utils.inherits(StringReader, DataReader);
  StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(this.zero + i);
  };
  StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
  };
  StringReader.prototype.readAndCheckSignature = function(sig) {
    var data = this.readData(4);
    return sig === data;
  };
  StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module.exports = StringReader;
});

// node_modules/jszip/lib/reader/Uint8ArrayReader.js
var require_Uint8ArrayReader = __commonJS((exports, module) => {
  var ArrayReader = require_ArrayReader();
  var utils = require_utils();
  function Uint8ArrayReader(data) {
    ArrayReader.call(this, data);
  }
  utils.inherits(Uint8ArrayReader, ArrayReader);
  Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if (size === 0) {
      return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module.exports = Uint8ArrayReader;
});

// node_modules/jszip/lib/reader/NodeBufferReader.js
var require_NodeBufferReader = __commonJS((exports, module) => {
  var Uint8ArrayReader = require_Uint8ArrayReader();
  var utils = require_utils();
  function NodeBufferReader(data) {
    Uint8ArrayReader.call(this, data);
  }
  utils.inherits(NodeBufferReader, Uint8ArrayReader);
  NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module.exports = NodeBufferReader;
});

// node_modules/jszip/lib/reader/readerFor.js
var require_readerFor = __commonJS((exports, module) => {
  var utils = require_utils();
  var support = require_support();
  var ArrayReader = require_ArrayReader();
  var StringReader = require_StringReader();
  var NodeBufferReader = require_NodeBufferReader();
  var Uint8ArrayReader = require_Uint8ArrayReader();
  module.exports = function(data) {
    var type = utils.getTypeOf(data);
    utils.checkSupport(type);
    if (type === "string" && !support.uint8array) {
      return new StringReader(data);
    }
    if (type === "nodebuffer") {
      return new NodeBufferReader(data);
    }
    if (support.uint8array) {
      return new Uint8ArrayReader(utils.transformTo("uint8array", data));
    }
    return new ArrayReader(utils.transformTo("array", data));
  };
});

// node_modules/jszip/lib/zipEntry.js
var require_zipEntry = __commonJS((exports, module) => {
  var readerFor = require_readerFor();
  var utils = require_utils();
  var CompressedObject = require_compressedObject();
  var crc32fn = require_crc32();
  var utf8 = require_utf8();
  var compressions = require_compressions();
  var support = require_support();
  var MADE_BY_DOS = 0;
  var MADE_BY_UNIX = 3;
  var findCompression = function(compressionMethod) {
    for (var method in compressions) {
      if (!Object.prototype.hasOwnProperty.call(compressions, method)) {
        continue;
      }
      if (compressions[method].magic === compressionMethod) {
        return compressions[method];
      }
    }
    return null;
  };
  function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
  }
  ZipEntry.prototype = {
    isEncrypted: function() {
      return (this.bitFlag & 1) === 1;
    },
    useUTF8: function() {
      return (this.bitFlag & 2048) === 2048;
    },
    readLocalPart: function(reader) {
      var compression, localExtraFieldsLength;
      reader.skip(22);
      this.fileNameLength = reader.readInt(2);
      localExtraFieldsLength = reader.readInt(2);
      this.fileName = reader.readData(this.fileNameLength);
      reader.skip(localExtraFieldsLength);
      if (this.compressedSize === -1 || this.uncompressedSize === -1) {
        throw new Error("Bug or corrupted zip : didn't get enough information from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
      }
      compression = findCompression(this.compressionMethod);
      if (compression === null) {
        throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
      }
      this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
    },
    readCentralPart: function(reader) {
      this.versionMadeBy = reader.readInt(2);
      reader.skip(2);
      this.bitFlag = reader.readInt(2);
      this.compressionMethod = reader.readString(2);
      this.date = reader.readDate();
      this.crc32 = reader.readInt(4);
      this.compressedSize = reader.readInt(4);
      this.uncompressedSize = reader.readInt(4);
      var fileNameLength = reader.readInt(2);
      this.extraFieldsLength = reader.readInt(2);
      this.fileCommentLength = reader.readInt(2);
      this.diskNumberStart = reader.readInt(2);
      this.internalFileAttributes = reader.readInt(2);
      this.externalFileAttributes = reader.readInt(4);
      this.localHeaderOffset = reader.readInt(4);
      if (this.isEncrypted()) {
        throw new Error("Encrypted zip are not supported");
      }
      reader.skip(fileNameLength);
      this.readExtraFields(reader);
      this.parseZIP64ExtraField(reader);
      this.fileComment = reader.readData(this.fileCommentLength);
    },
    processAttributes: function() {
      this.unixPermissions = null;
      this.dosPermissions = null;
      var madeBy = this.versionMadeBy >> 8;
      this.dir = this.externalFileAttributes & 16 ? true : false;
      if (madeBy === MADE_BY_DOS) {
        this.dosPermissions = this.externalFileAttributes & 63;
      }
      if (madeBy === MADE_BY_UNIX) {
        this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
      }
      if (!this.dir && this.fileNameStr.slice(-1) === "/") {
        this.dir = true;
      }
    },
    parseZIP64ExtraField: function() {
      if (!this.extraFields[1]) {
        return;
      }
      var extraReader = readerFor(this.extraFields[1].value);
      if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
        this.uncompressedSize = extraReader.readInt(8);
      }
      if (this.compressedSize === utils.MAX_VALUE_32BITS) {
        this.compressedSize = extraReader.readInt(8);
      }
      if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
        this.localHeaderOffset = extraReader.readInt(8);
      }
      if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
        this.diskNumberStart = extraReader.readInt(4);
      }
    },
    readExtraFields: function(reader) {
      var end = reader.index + this.extraFieldsLength, extraFieldId, extraFieldLength, extraFieldValue;
      if (!this.extraFields) {
        this.extraFields = {};
      }
      while (reader.index + 4 < end) {
        extraFieldId = reader.readInt(2);
        extraFieldLength = reader.readInt(2);
        extraFieldValue = reader.readData(extraFieldLength);
        this.extraFields[extraFieldId] = {
          id: extraFieldId,
          length: extraFieldLength,
          value: extraFieldValue
        };
      }
      reader.setIndex(end);
    },
    handleUTF8: function() {
      var decodeParamType = support.uint8array ? "uint8array" : "array";
      if (this.useUTF8()) {
        this.fileNameStr = utf8.utf8decode(this.fileName);
        this.fileCommentStr = utf8.utf8decode(this.fileComment);
      } else {
        var upath = this.findExtraFieldUnicodePath();
        if (upath !== null) {
          this.fileNameStr = upath;
        } else {
          var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
          this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
        }
        var ucomment = this.findExtraFieldUnicodeComment();
        if (ucomment !== null) {
          this.fileCommentStr = ucomment;
        } else {
          var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
          this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
        }
      }
    },
    findExtraFieldUnicodePath: function() {
      var upathField = this.extraFields[28789];
      if (upathField) {
        var extraReader = readerFor(upathField.value);
        if (extraReader.readInt(1) !== 1) {
          return null;
        }
        if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
          return null;
        }
        return utf8.utf8decode(extraReader.readData(upathField.length - 5));
      }
      return null;
    },
    findExtraFieldUnicodeComment: function() {
      var ucommentField = this.extraFields[25461];
      if (ucommentField) {
        var extraReader = readerFor(ucommentField.value);
        if (extraReader.readInt(1) !== 1) {
          return null;
        }
        if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
          return null;
        }
        return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
      }
      return null;
    }
  };
  module.exports = ZipEntry;
});

// node_modules/jszip/lib/zipEntries.js
var require_zipEntries = __commonJS((exports, module) => {
  var readerFor = require_readerFor();
  var utils = require_utils();
  var sig = require_signature();
  var ZipEntry = require_zipEntry();
  var support = require_support();
  function ZipEntries(loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
  }
  ZipEntries.prototype = {
    checkSignature: function(expectedSignature) {
      if (!this.reader.readAndCheckSignature(expectedSignature)) {
        this.reader.index -= 4;
        var signature = this.reader.readString(4);
        throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
      }
    },
    isSignature: function(askedIndex, expectedSignature) {
      var currentIndex = this.reader.index;
      this.reader.setIndex(askedIndex);
      var signature = this.reader.readString(4);
      var result = signature === expectedSignature;
      this.reader.setIndex(currentIndex);
      return result;
    },
    readBlockEndOfCentral: function() {
      this.diskNumber = this.reader.readInt(2);
      this.diskWithCentralDirStart = this.reader.readInt(2);
      this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
      this.centralDirRecords = this.reader.readInt(2);
      this.centralDirSize = this.reader.readInt(4);
      this.centralDirOffset = this.reader.readInt(4);
      this.zipCommentLength = this.reader.readInt(2);
      var zipComment = this.reader.readData(this.zipCommentLength);
      var decodeParamType = support.uint8array ? "uint8array" : "array";
      var decodeContent = utils.transformTo(decodeParamType, zipComment);
      this.zipComment = this.loadOptions.decodeFileName(decodeContent);
    },
    readBlockZip64EndOfCentral: function() {
      this.zip64EndOfCentralSize = this.reader.readInt(8);
      this.reader.skip(4);
      this.diskNumber = this.reader.readInt(4);
      this.diskWithCentralDirStart = this.reader.readInt(4);
      this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
      this.centralDirRecords = this.reader.readInt(8);
      this.centralDirSize = this.reader.readInt(8);
      this.centralDirOffset = this.reader.readInt(8);
      this.zip64ExtensibleData = {};
      var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
      while (index < extraDataSize) {
        extraFieldId = this.reader.readInt(2);
        extraFieldLength = this.reader.readInt(4);
        extraFieldValue = this.reader.readData(extraFieldLength);
        this.zip64ExtensibleData[extraFieldId] = {
          id: extraFieldId,
          length: extraFieldLength,
          value: extraFieldValue
        };
      }
    },
    readBlockZip64EndOfCentralLocator: function() {
      this.diskWithZip64CentralDirStart = this.reader.readInt(4);
      this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
      this.disksCount = this.reader.readInt(4);
      if (this.disksCount > 1) {
        throw new Error("Multi-volumes zip are not supported");
      }
    },
    readLocalFiles: function() {
      var i, file;
      for (i = 0;i < this.files.length; i++) {
        file = this.files[i];
        this.reader.setIndex(file.localHeaderOffset);
        this.checkSignature(sig.LOCAL_FILE_HEADER);
        file.readLocalPart(this.reader);
        file.handleUTF8();
        file.processAttributes();
      }
    },
    readCentralDir: function() {
      var file;
      this.reader.setIndex(this.centralDirOffset);
      while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
        file = new ZipEntry({
          zip64: this.zip64
        }, this.loadOptions);
        file.readCentralPart(this.reader);
        this.files.push(file);
      }
      if (this.centralDirRecords !== this.files.length) {
        if (this.centralDirRecords !== 0 && this.files.length === 0) {
          throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        } else {
        }
      }
    },
    readEndOfCentral: function() {
      var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
      if (offset < 0) {
        var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);
        if (isGarbage) {
          throw new Error("Can't find end of central directory : is this a zip file ? " + "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        } else {
          throw new Error("Corrupted zip: can't find end of central directory");
        }
      }
      this.reader.setIndex(offset);
      var endOfCentralDirOffset = offset;
      this.checkSignature(sig.CENTRAL_DIRECTORY_END);
      this.readBlockEndOfCentral();
      if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
        this.zip64 = true;
        offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
        if (offset < 0) {
          throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
        }
        this.reader.setIndex(offset);
        this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
        this.readBlockZip64EndOfCentralLocator();
        if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
          this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
          if (this.relativeOffsetEndOfZip64CentralDir < 0) {
            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          }
        }
        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
        this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
        this.readBlockZip64EndOfCentral();
      }
      var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
      if (this.zip64) {
        expectedEndOfCentralDirOffset += 20;
        expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
      }
      var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
      if (extraBytes > 0) {
        if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
        } else {
          this.reader.zero = extraBytes;
        }
      } else if (extraBytes < 0) {
        throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
      }
    },
    prepareReader: function(data) {
      this.reader = readerFor(data);
    },
    load: function(data) {
      this.prepareReader(data);
      this.readEndOfCentral();
      this.readCentralDir();
      this.readLocalFiles();
    }
  };
  module.exports = ZipEntries;
});

// node_modules/jszip/lib/load.js
var require_load = __commonJS((exports, module) => {
  var utils = require_utils();
  var external = require_external();
  var utf8 = require_utf8();
  var ZipEntries = require_zipEntries();
  var Crc32Probe = require_Crc32Probe();
  var nodejsUtils = require_nodejsUtils();
  function checkEntryCRC32(zipEntry) {
    return new external.Promise(function(resolve, reject) {
      var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe);
      worker.on("error", function(e) {
        reject(e);
      }).on("end", function() {
        if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
          reject(new Error("Corrupted zip : CRC32 mismatch"));
        } else {
          resolve();
        }
      }).resume();
    });
  }
  module.exports = function(data, options) {
    var zip = this;
    options = utils.extend(options || {}, {
      base64: false,
      checkCRC32: false,
      optimizedBinaryString: false,
      createFolders: false,
      decodeFileName: utf8.utf8decode
    });
    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
      return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
    }
    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function(data2) {
      var zipEntries = new ZipEntries(options);
      zipEntries.load(data2);
      return zipEntries;
    }).then(function checkCRC32(zipEntries) {
      var promises = [external.Promise.resolve(zipEntries)];
      var files = zipEntries.files;
      if (options.checkCRC32) {
        for (var i = 0;i < files.length; i++) {
          promises.push(checkEntryCRC32(files[i]));
        }
      }
      return external.Promise.all(promises);
    }).then(function addFiles(results) {
      var zipEntries = results.shift();
      var files = zipEntries.files;
      for (var i = 0;i < files.length; i++) {
        var input = files[i];
        var unsafeName = input.fileNameStr;
        var safeName = utils.resolve(input.fileNameStr);
        zip.file(safeName, input.decompressed, {
          binary: true,
          optimizedBinaryString: true,
          date: input.date,
          dir: input.dir,
          comment: input.fileCommentStr.length ? input.fileCommentStr : null,
          unixPermissions: input.unixPermissions,
          dosPermissions: input.dosPermissions,
          createFolders: options.createFolders
        });
        if (!input.dir) {
          zip.file(safeName).unsafeOriginalName = unsafeName;
        }
      }
      if (zipEntries.zipComment.length) {
        zip.comment = zipEntries.zipComment;
      }
      return zip;
    });
  };
});

// node_modules/jszip/lib/index.js
var require_lib = __commonJS((exports, module) => {
  function JSZip() {
    if (!(this instanceof JSZip)) {
      return new JSZip;
    }
    if (arguments.length) {
      throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
    }
    this.files = Object.create(null);
    this.comment = null;
    this.root = "";
    this.clone = function() {
      var newObj = new JSZip;
      for (var i in this) {
        if (typeof this[i] !== "function") {
          newObj[i] = this[i];
        }
      }
      return newObj;
    };
  }
  JSZip.prototype = require_object();
  JSZip.prototype.loadAsync = require_load();
  JSZip.support = require_support();
  JSZip.defaults = require_defaults();
  JSZip.version = "3.10.1";
  JSZip.loadAsync = function(content, options) {
    return new JSZip().loadAsync(content, options);
  };
  JSZip.external = require_external();
  module.exports = JSZip;
});

// engine/editor/spriteBuilder.ts
var import_jszip = __toESM(require_lib(), 1);

// engine/editor/customPrompt.ts
function customPrompt(message, defaultValue) {
  return new Promise((resolve) => {
    const promptBox = document.getElementById("custom-prompt");
    const messageElement = document.getElementById("custom-prompt-message");
    const inputElement = document.getElementById("custom-prompt-input");
    const okButton = document.getElementById("custom-prompt-ok");
    const cancelButton = document.getElementById("custom-prompt-cancel");
    messageElement.textContent = message;
    inputElement.value = defaultValue;
    promptBox.style.display = "flex";
    const closePrompt = (value) => {
      promptBox.style.display = "none";
      inputElement.removeEventListener("keydown", onKeyDown);
      okButton.onclick = null;
      cancelButton.onclick = null;
      resolve(value);
    };
    okButton.onclick = () => closePrompt(inputElement.value);
    cancelButton.onclick = () => closePrompt(null);
    const onKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        closePrompt(inputElement.value);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closePrompt(null);
      }
    };
    inputElement.addEventListener("keydown", onKeyDown);
    inputElement.focus();
    inputElement.select();
  });
}

// engine/editor/spriteBuilder.ts
class SpriteBuilder {
  canvas;
  ctx;
  drawingCanvas;
  drawingCtx;
  previewCanvas;
  previewCtx;
  createFrameButton;
  exportButton;
  addAnimationButton;
  overlayButton;
  frameWidthInput;
  frameHeightInput;
  framesList;
  animationsList;
  animationPreviewModal;
  animationPreviewCanvas;
  animationPreviewCtx;
  closeModalButton;
  drawingToolsContainer;
  pencilToolButton;
  lineToolButton;
  circleToolButton;
  polygonToolButton;
  imageToolButton;
  cursorToolButton;
  selectToolButton;
  colorPicker;
  thicknessInput;
  antiAliasingCheckbox;
  saveDrawingButton;
  cancelDrawingButton;
  lightBackgroundCheckBox;
  lightBackground;
  frames = [];
  animations = {};
  selectedAnimation = null;
  currentDrawingTool = null;
  isDrawing = false;
  startX = 0;
  startY = 0;
  initialMouseX = 0;
  initialMouseY = 0;
  offsetX = 0;
  offsetY = 0;
  activeControlPointIndex = -1;
  isModifyingShape = false;
  polygonPoints = [];
  animationInterval = null;
  activelyEditing = null;
  overlayFrame = null;
  selectedShape = null;
  selectedShapes = [];
  selectionBox = null;
  isDraggingSelection = false;
  dragStartPos = { x: 0, y: 0 };
  draggedFrameName = null;
  _selectedFrame = null;
  constructor() {
    this.canvas = document.getElementById("sprite-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.drawingCanvas = document.createElement("canvas");
    this.drawingCtx = this.drawingCanvas.getContext("2d");
    this.previewCanvas = document.createElement("canvas");
    this.previewCtx = this.previewCanvas.getContext("2d");
    this.createFrameButton = document.getElementById("create-frame-button");
    this.exportButton = document.getElementById("export-button");
    this.addAnimationButton = document.getElementById("add-animation-button");
    this.overlayButton = document.getElementById("overlay-frame-button");
    this.frameWidthInput = document.getElementById("frame-width");
    this.frameHeightInput = document.getElementById("frame-height");
    this.framesList = document.getElementById("frames-list");
    this.animationsList = document.getElementById("animations-list");
    this.animationPreviewModal = document.getElementById("animation-preview-modal");
    this.animationPreviewCanvas = document.getElementById("animation-preview-canvas");
    this.animationPreviewCtx = this.animationPreviewCanvas.getContext("2d");
    this.closeModalButton = document.querySelector(".close-button");
    this.lightBackgroundCheckBox = document.getElementById("light-background-checkbox");
    this.lightBackground = this.lightBackgroundCheckBox.checked;
    this.drawingToolsContainer = document.getElementById("drawing-tools");
    this.pencilToolButton = document.getElementById("draw-tool-pencil");
    this.lineToolButton = document.getElementById("draw-tool-line");
    this.circleToolButton = document.getElementById("draw-tool-circle");
    this.polygonToolButton = document.getElementById("draw-tool-polygon");
    this.imageToolButton = document.getElementById("draw-tool-image");
    this.cursorToolButton = document.getElementById("draw-tool-cursor");
    this.selectToolButton = document.getElementById("draw-tool-select");
    this.colorPicker = document.getElementById("color-picker");
    this.thicknessInput = document.getElementById("thickness-input");
    this.antiAliasingCheckbox = document.getElementById("anti-aliasing-checkbox");
    this.saveDrawingButton = document.getElementById("save-drawing-button");
    this.cancelDrawingButton = document.getElementById("cancel-drawing-button");
    this.init();
  }
  get selectedFrame() {
    return this._selectedFrame;
  }
  set selectedFrame(frame) {
    const old = this._selectedFrame;
    if (old) {
      document.querySelector(`.frame[data-frame-name="${old.name}"]`)?.classList.remove("selected");
    }
    this._selectedFrame = frame;
    document.querySelector(`.frame[data-frame-name="${frame?.name}"]`)?.classList.add("selected");
  }
  init() {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    this.createFrameButton.addEventListener("click", () => this.createFrame());
    this.exportButton.addEventListener("click", () => this.exportSpriteSheet());
    this.addAnimationButton.addEventListener("click", () => this.addAnimation());
    this.overlayButton.addEventListener("click", () => this.selectOverlayFrame());
    this.closeModalButton.addEventListener("click", () => this.closePreviewModal());
    this.lightBackgroundCheckBox.addEventListener("change", () => {
      this.lightBackground = this.lightBackgroundCheckBox.checked;
      this.redrawScaledCanvas();
    });
    this.frameWidthInput.addEventListener("change", () => this.updateDrawingCanvasSize());
    this.frameHeightInput.addEventListener("change", () => this.updateDrawingCanvasSize());
    this.pencilToolButton.addEventListener("click", () => this.setDrawingTool("pencil"));
    this.lineToolButton.addEventListener("click", () => this.setDrawingTool("line"));
    this.circleToolButton.addEventListener("click", () => this.setDrawingTool("circle"));
    this.polygonToolButton.addEventListener("click", () => this.setDrawingTool("polygon"));
    this.imageToolButton.addEventListener("click", () => this.importImageAsShape());
    this.cursorToolButton.addEventListener("click", () => this.setDrawingTool("cursor"));
    this.selectToolButton.addEventListener("click", () => this.setDrawingTool("select"));
    this.saveDrawingButton.addEventListener("click", () => this.saveDrawing());
    this.cancelDrawingButton.addEventListener("click", () => this.toggleDrawingMode(false));
    this.antiAliasingCheckbox.addEventListener("change", () => this.setAntiAliasing());
    this.canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mouseup", (e) => this.stopDrawing(e));
    this.canvas.addEventListener("mouseout", () => this.stopDrawing());
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    this.renderFrames();
    this.renderAnimations();
  }
  updateDrawingCanvasSize() {
    const newWidth = parseInt(this.frameWidthInput.value);
    const newHeight = parseInt(this.frameHeightInput.value);
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = this.drawingCanvas.width;
    tempCanvas.height = this.drawingCanvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(this.drawingCanvas, 0, 0);
    this.drawingCanvas.width = newWidth;
    this.drawingCanvas.height = newHeight;
    this.drawingCtx.drawImage(tempCanvas, 0, 0);
    this.previewCanvas.width = newWidth;
    this.previewCanvas.height = newHeight;
    this.redrawScaledCanvas();
    this.redrawShapes();
  }
  resizeCanvas() {
    const centerPanel = document.getElementById("center-panel");
    this.canvas.width = centerPanel.clientWidth;
    this.canvas.height = centerPanel.clientHeight;
    this.drawingCanvas.width = parseInt(this.frameWidthInput.value);
    this.drawingCanvas.height = parseInt(this.frameHeightInput.value);
    this.previewCanvas.width = this.drawingCanvas.width;
    this.previewCanvas.height = this.drawingCanvas.height;
    this.redrawScaledCanvas();
    this.redrawShapes();
  }
  redrawScaledCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const scale = Math.min(this.canvas.width / this.drawingCanvas.width, this.canvas.height / this.drawingCanvas.height);
    const x = this.canvas.width / 2 - this.drawingCanvas.width * scale / 2;
    const y = this.canvas.height / 2 - this.drawingCanvas.height * scale / 2;
    const checkerSize = this.drawingCanvas.width < 50 && this.drawingCanvas.height < 50 ? 1 : 10;
    for (let yi = 0;yi < this.drawingCanvas.height; yi += checkerSize) {
      for (let xi = 0;xi < this.drawingCanvas.width; xi += checkerSize) {
        if ((Math.floor(xi / checkerSize) + Math.floor(yi / checkerSize)) % 2 === 0) {
          this.ctx.fillStyle = this.lightBackground ? "#fff" : "#111";
        } else {
          this.ctx.fillStyle = this.lightBackground ? "#ccc" : "#222";
        }
        this.ctx.fillRect(xi * scale + x, yi * scale + y, checkerSize * scale, checkerSize * scale);
      }
    }
    this.ctx.imageSmoothingEnabled = this.antiAliasingCheckbox.checked;
    this.drawingCtx.imageSmoothingEnabled = this.antiAliasingCheckbox.checked;
    this.ctx.drawImage(this.drawingCanvas, x, y, this.drawingCanvas.width * scale, this.drawingCanvas.height * scale);
    this.ctx.drawImage(this.previewCanvas, x, y, this.previewCanvas.width * scale, this.previewCanvas.height * scale);
    this.drawOverlayElements(scale, x, y);
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, this.drawingCanvas.width * scale, this.drawingCanvas.height * scale);
  }
  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scale = Math.min(this.canvas.width / this.drawingCanvas.width, this.canvas.height / this.drawingCanvas.height);
    const x = (this.canvas.width - this.drawingCanvas.width * scale) / 2;
    const y = (this.canvas.height - this.drawingCanvas.height * scale) / 2;
    return {
      x: (e.clientX - rect.left - x) / scale,
      y: (e.clientY - rect.top - y) / scale
    };
  }
  isPointInShape(point, shape) {
    const scale = Math.min(this.canvas.width / this.drawingCanvas.width, this.canvas.height / this.drawingCanvas.height);
    const tolerance = 8 / scale;
    switch (shape.type) {
      case "image":
        if (!shape.points || !shape.width || !shape.height)
          return false;
        return point.x >= shape.points[0].x - tolerance && point.x <= shape.points[0].x + shape.width + tolerance && point.y >= shape.points[0].y - tolerance && point.y <= shape.points[0].y + shape.height + tolerance;
      case "circle":
        if (!shape.points || shape.points.length === 0 || shape.radius === undefined)
          return false;
        const circleCenter = shape.points[0];
        const dist = Math.sqrt(Math.pow(point.x - circleCenter.x, 2) + Math.pow(point.y - circleCenter.y, 2));
        return dist <= shape.radius + tolerance;
      case "line":
      case "pencil":
      case "polygon":
        if (!shape.points || shape.points.length < 2)
          return false;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        shape.points.forEach((p) => {
          minX = Math.min(minX, p.x);
          minY = Math.min(minY, p.y);
          maxX = Math.max(maxX, p.x);
          maxY = Math.max(maxY, p.y);
        });
        minX -= shape.thickness / 2 + tolerance;
        minY -= shape.thickness / 2 + tolerance;
        maxX += shape.thickness / 2 + tolerance;
        maxY += shape.thickness / 2 + tolerance;
        return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
      default:
        return false;
    }
  }
  isPointInControlPoint(point, controlPoint) {
    const scale = Math.min(this.canvas.width / this.drawingCanvas.width, this.canvas.height / this.drawingCanvas.height);
    const tolerance = 10 / scale;
    const dist = Math.sqrt(Math.pow(point.x - controlPoint.x, 2) + Math.pow(point.y - controlPoint.y, 2));
    return dist <= tolerance;
  }
  getResizeCursor(angle) {
    return "all-scroll";
  }
  getShapeBounds(shape) {
    if (!shape.points || shape.points.length === 0)
      return null;
    if (shape.type === "image") {
      if (!shape.width || !shape.height)
        return null;
      return {
        minX: shape.points[0].x,
        minY: shape.points[0].y,
        maxX: shape.points[0].x + shape.width,
        maxY: shape.points[0].y + shape.height
      };
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    if (shape.type === "circle" && shape.radius !== undefined) {
      const centerX = shape.points[0].x;
      const centerY = shape.points[0].y;
      minX = centerX - shape.radius;
      minY = centerY - shape.radius;
      maxX = centerX + shape.radius;
      maxY = centerY + shape.radius;
    } else {
      shape.points.forEach((p) => {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      });
    }
    return { minX, minY, maxX, maxY };
  }
  async createFrame() {
    if (!this.selectedAnimation) {
      alert("Please select an animation first.");
      return;
    }
    const frameName = await customPrompt("Enter frame name:", "");
    if (frameName) {
      const frameWidth = parseInt(this.frameWidthInput.value);
      const frameHeight = parseInt(this.frameHeightInput.value);
      const newCanvas = document.createElement("canvas");
      newCanvas.width = frameWidth;
      newCanvas.height = frameHeight;
      const newCtx = newCanvas.getContext("2d");
      newCtx.fillStyle = "rgba(0,0,0,0)";
      newCtx.fillRect(0, 0, frameWidth, frameHeight);
      const image = new Image;
      image.src = newCanvas.toDataURL();
      const newFrame = { name: frameName, image, shapes: [] };
      this.frames.push(newFrame);
      this.selectedFrame = newFrame;
      this.animations[this.selectedAnimation].frames.push(frameName);
      this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
      this.drawingCtx.drawImage(newFrame.image, 0, 0);
      this.redrawShapes();
      this.toggleDrawingMode(true);
      this.renderFrames();
      this.renderAnimations();
      this.framesList.querySelector(`.frame[data-frame-name="${newFrame.name}"]`)?.classList.add("selected");
    }
  }
  importImageAsShape() {
    if (!this.selectedFrame) {
      alert("Please select a frame first to add the image to.");
      return;
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader;
        reader.onload = (e) => {
          const img = new Image;
          img.onload = () => {
            const newShape = {
              id: Math.random().toString(36).substring(2, 9),
              type: "image",
              image: img,
              points: [{
                x: (this.drawingCanvas.width - img.width) / 2,
                y: (this.drawingCanvas.height - img.height) / 2
              }],
              width: img.width,
              height: img.height,
              color: "",
              thickness: 0
            };
            this.addShape(newShape);
            this.setDrawingTool("cursor");
            this.selectedShape = newShape;
            this.redrawShapes();
            this.updateFrameGutter();
          };
          img.src = e.target?.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }
  renderFrames(framesToShow) {
    this.framesList.innerHTML = "";
    const frames = framesToShow || this.frames;
    frames.forEach((frame) => {
      const frameElement = document.createElement("div");
      frameElement.className = "frame";
      frameElement.dataset.frameName = frame.name;
      frameElement.draggable = true;
      frameElement.addEventListener("dragstart", (e) => this.handleFrameDragStart(e, frame.name));
      frameElement.addEventListener("dragover", (e) => this.handleFrameDragOver(e));
      frameElement.addEventListener("drop", (e) => this.handleFrameDrop(e, frame.name));
      frameElement.addEventListener("dragleave", (e) => {
        e.currentTarget.classList.remove("drag-over-above", "drag-over-below");
      });
      const img = new Image;
      img.src = frame.image.src;
      img.width = 50;
      img.height = 50;
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        this.selectedFrame = frame;
        this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
        this.drawingCtx.drawImage(frame.image, 0, 0);
        this.redrawShapes();
        this.toggleDrawingMode(true);
      });
      const nameElement = document.createElement("div");
      nameElement.textContent = frame.name;
      nameElement.classList.add("frame-name");
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.onclick = () => {
        const link = document.createElement("a");
        link.download = frame.name;
        link.href = frame.image.src;
        link.click();
      };
      const duplicateButton = document.createElement("button");
      duplicateButton.textContent = "Duplicate";
      duplicateButton.onclick = () => {
        this.duplicateFrame(frame);
      };
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => {
        if (confirm(`Are you sure you want to delete frame "${frame.name}"?`)) {
          this.deleteFrame(frame.name);
        }
      };
      frameElement.appendChild(img);
      frameElement.appendChild(nameElement);
      frameElement.appendChild(saveButton);
      frameElement.appendChild(duplicateButton);
      frameElement.appendChild(deleteButton);
      this.framesList.appendChild(frameElement);
    });
  }
  async addAnimation() {
    const animationName = await customPrompt("Enter animation name:", "");
    if (animationName && !this.animations[animationName]) {
      this.animations[animationName] = { frames: [], loop: true, bounce: false };
      this.selectedAnimation = animationName;
      this.renderAnimations();
      this.renderFrames([]);
    }
  }
  renderAnimations() {
    this.animationsList.innerHTML = "";
    for (const animationName in this.animations) {
      const animation = this.animations[animationName];
      const animationElement = document.createElement("div");
      animationElement.className = "animation";
      animationElement.style.padding = "10px";
      animationElement.style.borderBottom = "1px solid #ccc";
      const nameElement = document.createElement("h3");
      nameElement.textContent = animationName;
      nameElement.style.cursor = "pointer";
      nameElement.addEventListener("click", () => {
        if (this.selectedAnimation === animationName) {
          this.selectedAnimation = null;
          this.renderFrames();
        } else {
          this.selectedAnimation = animationName;
          const animationFrames = animation.frames.map((frameName) => {
            return this.frames.find((f) => f.name === frameName);
          });
          this.renderFrames(animationFrames);
        }
        this.renderAnimations();
      });
      if (this.selectedAnimation === animationName) {
        animationElement.style.backgroundColor = "#3e4451";
        nameElement.style.color = "#61afef";
      }
      const propertiesContainer = document.createElement("div");
      propertiesContainer.style.display = "flex";
      propertiesContainer.style.flexDirection = "column";
      const loopContainer = document.createElement("div");
      const loopCheckbox = document.createElement("input");
      loopCheckbox.type = "checkbox";
      loopCheckbox.checked = animation.loop || false;
      loopCheckbox.onchange = () => {
        animation.loop = loopCheckbox.checked;
      };
      loopContainer.appendChild(new Text("Loop: "));
      loopContainer.appendChild(loopCheckbox);
      propertiesContainer.appendChild(loopContainer);
      const bounceContainer = document.createElement("div");
      const bounceCheckbox = document.createElement("input");
      bounceCheckbox.type = "checkbox";
      bounceCheckbox.checked = animation.bounce || false;
      bounceCheckbox.onchange = () => {
        animation.bounce = bounceCheckbox.checked;
      };
      bounceContainer.appendChild(new Text("Bounce: "));
      bounceContainer.appendChild(bounceCheckbox);
      propertiesContainer.appendChild(bounceContainer);
      const previewButton = document.createElement("button");
      previewButton.textContent = "Preview";
      previewButton.onclick = () => {
        this.previewAnimation(animationName);
      };
      propertiesContainer.appendChild(previewButton);
      const framesContainer = document.createElement("div");
      framesContainer.style.display = "flex";
      framesContainer.style.flexWrap = "wrap";
      animation.frames.forEach((frameName) => {
        const frame = this.frames.find((f) => f.name === frameName);
        if (frame) {
          const frameContainer = document.createElement("div");
          frameContainer.style.display = "flex";
          frameContainer.style.flexDirection = "column";
          const frameImg = new Image;
          frameImg.src = frame.image.src;
          frameImg.width = 30;
          frameImg.height = 30;
          frameImg.style.margin = "2px";
          frameContainer.appendChild(frameImg);
          const durationInput = document.createElement("input");
          durationInput.type = "number";
          durationInput.value = (frame.duration || 100).toString();
          durationInput.style.width = "50px";
          durationInput.onchange = () => {
            frame.duration = parseInt(durationInput.value);
          };
          frameContainer.appendChild(durationInput);
          framesContainer.appendChild(frameContainer);
        }
      });
      animationElement.appendChild(nameElement);
      animationElement.appendChild(propertiesContainer);
      animationElement.appendChild(framesContainer);
      this.animationsList.appendChild(animationElement);
    }
  }
  previewAnimation(animationName) {
    this.animationPreviewModal.style.display = "flex";
    const animation = this.animations[animationName];
    const animationFrames = animation.frames.map((frameName) => {
      return this.frames.find((f) => f.name === frameName);
    }).filter(Boolean);
    if (animationFrames.length === 0) {
      return;
    }
    let frameIndex = 0;
    if (this.animationInterval) {
      clearTimeout(this.animationInterval);
    }
    const showFrame = () => {
      const frame = animationFrames[frameIndex];
      this.animationPreviewCtx.clearRect(0, 0, this.animationPreviewCanvas.width, this.animationPreviewCanvas.height);
      this.animationPreviewCtx.drawImage(frame.image, 0, 0);
      let nextIndex = frameIndex + 1;
      if (nextIndex >= animationFrames.length) {
        if (animation.loop) {
          nextIndex = 0;
        } else {
          return;
        }
      }
      frameIndex = nextIndex;
      this.animationInterval = setTimeout(showFrame, frame.duration || 100);
    };
    showFrame();
  }
  closePreviewModal() {
    this.animationPreviewModal.style.display = "none";
    if (this.animationInterval) {
      clearTimeout(this.animationInterval);
    }
  }
  async exportSpriteSheet() {
    if (this.frames.length === 0) {
      alert("No frames to export.");
      return;
    }
    const zip = new import_jszip.default;
    const frameWidth = parseInt(this.frameWidthInput.value);
    const frameHeight = parseInt(this.frameHeightInput.value);
    const spriteSheetCanvas = document.createElement("canvas");
    const spriteSheetCtx = spriteSheetCanvas.getContext("2d");
    spriteSheetCanvas.width = this.frames.length * frameWidth;
    spriteSheetCanvas.height = frameHeight;
    const spriteSheetData = {
      frames: [],
      meta: {
        image: "spritesheet.png",
        size: {
          w: spriteSheetCanvas.width,
          h: spriteSheetCanvas.height
        },
        animations: this.animations
      }
    };
    let currentX = 0;
    this.frames.forEach((frame) => {
      spriteSheetCtx.drawImage(frame.image, currentX, 0, frameWidth, frameHeight);
      spriteSheetData.frames.push({
        filename: frame.name,
        frame: {
          x: currentX,
          y: 0,
          w: frameWidth,
          h: frameHeight
        },
        rotated: false,
        trimmed: false,
        spriteSourceSize: { x: 0, y: 0, w: frameWidth, h: frameHeight },
        sourceSize: { w: frameWidth, h: frameHeight },
        duration: frame.duration
      });
      currentX += frameWidth;
    });
    zip.file("spritesheet.json", JSON.stringify(spriteSheetData, null, 2));
    spriteSheetCanvas.toBlob((blob) => {
      if (blob) {
        zip.file("spritesheet.png", blob);
        zip.generateAsync({ type: "blob" }).then((content) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(content);
          link.download = "spritesheet.zip";
          link.click();
        });
      }
    });
  }
  toggleDrawingMode(active) {
    if (active) {
      this.currentDrawingTool = "pencil";
      this.drawingToolsContainer.style.display = "block";
    } else {
      this.currentDrawingTool = null;
      this.drawingToolsContainer.style.display = "none";
    }
    this.updateToolHighlights();
  }
  setDrawingTool(tool) {
    this.currentDrawingTool = tool;
    this.polygonPoints = [];
    this.selectedShape = null;
    this.selectedShapes = [];
    this.updateToolHighlights();
    this.redrawShapes();
  }
  updateToolHighlights() {
    this.pencilToolButton.classList.toggle("selected", this.currentDrawingTool === "pencil");
    this.lineToolButton.classList.toggle("selected", this.currentDrawingTool === "line");
    this.circleToolButton.classList.toggle("selected", this.currentDrawingTool === "circle");
    this.polygonToolButton.classList.toggle("selected", this.currentDrawingTool === "polygon");
    this.imageToolButton.classList.toggle("selected", this.currentDrawingTool === "image");
    this.cursorToolButton.classList.toggle("selected", this.currentDrawingTool === "cursor");
    this.selectToolButton.classList.toggle("selected", this.currentDrawingTool === "select");
  }
  setAntiAliasing() {
    this.redrawScaledCanvas();
  }
  updateActivelyEditing() {
    if (!this.activelyEditing || !this.activelyEditing.points || !this.selectedFrame) {
      console.error("No active editing session, or no points, or no selected frame");
      return;
    }
    const reference = this.selectedFrame?.shapes.find((s) => s.id === this.activelyEditing?.id);
    if (reference) {
      reference.points = [...this.activelyEditing.points];
    } else {
      this.addShape({ ...this.activelyEditing });
    }
  }
  startDrawing(e) {
    if (!this.currentDrawingTool)
      return;
    this.isDrawing = true;
    const pos = this.getMousePos(e);
    this.startX = pos.x;
    this.startY = pos.y;
    this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
    if (this.currentDrawingTool === "select") {
      this.isDraggingSelection = false;
      if (this.selectedShapes.length > 0) {
        const bounds = this.getMultipleShapesBounds(this.selectedShapes);
        if (bounds && pos.x >= bounds.minX && pos.x <= bounds.maxX && pos.y >= bounds.minY && pos.y <= bounds.maxY) {
          this.isDraggingSelection = true;
          this.dragStartPos = pos;
        } else {
          this.selectedShapes = [];
          this.selectionBox = { x: pos.x, y: pos.y, w: 0, h: 0 };
        }
      } else {
        this.selectionBox = { x: pos.x, y: pos.y, w: 0, h: 0 };
      }
      this.redrawShapes();
    } else if (this.currentDrawingTool === "cursor") {
      this.initialMouseX = pos.x;
      this.initialMouseY = pos.y;
      this.isModifyingShape = false;
      this.activeControlPointIndex = -1;
      if (this.selectedFrame) {
        if (this.selectedShape) {
          if (this.selectedShape.type === "image") {
          } else if (this.selectedShape.type === "circle" && this.selectedShape.points && this.selectedShape.radius !== undefined) {
            const centerX = this.selectedShape.points[0].x;
            const centerY = this.selectedShape.points[0].y;
            const controlX = centerX + this.selectedShape.radius;
            const controlY = centerY;
            if (this.isPointInControlPoint(pos, { x: controlX, y: controlY })) {
              this.isModifyingShape = true;
              this.activeControlPointIndex = 0;
            }
          } else if (this.selectedShape.type === "polygon" && this.selectedShape.points) {
            for (let i = 0;i < this.selectedShape.points.length; i++) {
              if (this.isPointInControlPoint(pos, this.selectedShape.points[i])) {
                this.isModifyingShape = true;
                this.activeControlPointIndex = i;
                break;
              }
            }
          }
        }
        if (!this.isModifyingShape) {
          this.selectedShape = null;
          for (let i = this.selectedFrame.shapes.length - 1;i >= 0; i--) {
            const shape = this.selectedFrame.shapes[i];
            if (shape && this.isPointInShape(pos, shape)) {
              this.selectedShape = shape;
              if (shape.points && shape.points.length > 0) {
                this.offsetX = pos.x - shape.points[0].x;
                this.offsetY = pos.y - shape.points[0].y;
              }
              break;
            }
          }
        }
      }
      this.redrawShapes();
    } else if (this.currentDrawingTool === "polygon") {
      if (!this.activelyEditing) {
        this.activelyEditing = {
          id: Math.random().toString(36).substring(2, 9),
          type: "polygon",
          points: [],
          color: this.colorPicker.value,
          thickness: parseInt(this.thicknessInput.value)
        };
      }
      this.activelyEditing.points?.push({ x: pos.x, y: pos.y });
      this.updateActivelyEditing();
      this.redrawShapes();
    } else if (this.currentDrawingTool === "pencil") {
      this.activelyEditing = {
        id: Math.random().toString(36).substring(2, 9),
        type: this.currentDrawingTool,
        points: [],
        color: this.colorPicker.value,
        thickness: parseInt(this.thicknessInput.value)
      };
      this.activelyEditing.points?.push({ x: pos.x, y: pos.y });
    }
  }
  draw(e) {
    if (!this.isDrawing || !this.currentDrawingTool)
      return;
    const pos = this.getMousePos(e);
    if (this.currentDrawingTool === "select") {
      if (this.isDraggingSelection) {
        const dx = pos.x - this.dragStartPos.x;
        const dy = pos.y - this.dragStartPos.y;
        this.selectedShapes.forEach((shape) => {
          if (shape.points) {
            shape.points.forEach((p) => {
              p.x += dx;
              p.y += dy;
            });
          }
        });
        this.dragStartPos = pos;
        this.redrawShapes();
      } else if (this.selectionBox) {
        this.selectionBox.w = pos.x - this.selectionBox.x;
        this.selectionBox.h = pos.y - this.selectionBox.y;
        this.redrawShapes();
      }
    } else if (this.currentDrawingTool === "cursor" && this.selectedShape) {
      let cursorChanged = false;
      if (this.isModifyingShape) {
        if (this.selectedShape.type === "circle" && this.selectedShape.points) {
          const centerX = this.selectedShape.points[0].x;
          const centerY = this.selectedShape.points[0].y;
          this.selectedShape.radius = Math.sqrt(Math.pow(pos.x - centerX, 2) + Math.pow(pos.y - centerY, 2));
        } else if ((this.selectedShape.type === "line" || this.selectedShape.type === "polygon") && this.selectedShape.points) {
          this.selectedShape.points[this.activeControlPointIndex].x = pos.x;
          this.selectedShape.points[this.activeControlPointIndex].y = pos.y;
        }
      } else if (!cursorChanged) {
        if (this.selectedShape.points && this.selectedShape.points.length > 0) {
          const targetX = pos.x - this.offsetX;
          const targetY = pos.y - this.offsetY;
          const diffX = targetX - this.selectedShape.points[0].x;
          const diffY = targetY - this.selectedShape.points[0].y;
          this.selectedShape.points.forEach((p) => {
            p.x += diffX;
            p.y += diffY;
          });
        }
        this.canvas.style.cursor = "grab";
        cursorChanged = true;
      }
      if (!cursorChanged) {
        this.canvas.style.cursor = "default";
      }
      this.redrawShapes();
    } else {
      this.previewCtx.strokeStyle = this.colorPicker.value;
      this.previewCtx.fillStyle = this.colorPicker.value;
      this.previewCtx.lineWidth = parseInt(this.thicknessInput.value);
      switch (this.currentDrawingTool) {
        case "pencil":
          this.previewCtx.globalCompositeOperation = "source-over";
          this.previewCtx.beginPath();
          this.previewCtx.moveTo(this.startX, this.startY);
          this.previewCtx.lineTo(pos.x, pos.y);
          this.previewCtx.stroke();
          if (!this.activelyEditing)
            console.error("No active editing session");
          this.activelyEditing?.points?.push({ x: pos.x, y: pos.y });
          this.startX = pos.x;
          this.startY = pos.y;
          break;
        case "line":
        case "circle":
          this.drawLivePreview(e);
          break;
      }
    }
    this.redrawScaledCanvas();
  }
  drawLivePreview(e) {
    const pos = this.getMousePos(e);
    this.previewCtx.globalCompositeOperation = "source-over";
    this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
    switch (this.currentDrawingTool) {
      case "line":
        this.previewCtx.beginPath();
        this.previewCtx.moveTo(this.startX, this.startY);
        this.previewCtx.lineTo(pos.x, pos.y);
        this.previewCtx.stroke();
        break;
      case "circle":
        const radius = Math.sqrt(Math.pow(pos.x - this.startX, 2) + Math.pow(pos.y - this.startY, 2));
        this.previewCtx.beginPath();
        this.previewCtx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
        this.previewCtx.fill();
        break;
    }
  }
  stopDrawing(e) {
    if (!this.isDrawing)
      return;
    this.isDrawing = false;
    if (this.currentDrawingTool === "select") {
      this.isDraggingSelection = false;
      if (this.selectionBox) {
        this.selectShapesInBox();
      }
      this.selectionBox = null;
      this.redrawShapes();
      this.updateFrameGutter();
      return;
    }
    this.isModifyingShape = false;
    this.activeControlPointIndex = -1;
    if (!e)
      return;
    const pos = this.getMousePos(e);
    this.drawingCtx.globalCompositeOperation = "source-over";
    let shape = null;
    const defaultSize = this.drawingCanvas.width * 0.3;
    if (this.currentDrawingTool === "line") {
      const distance = Math.sqrt(Math.pow(pos.x - this.startX, 2) + Math.pow(pos.y - this.startY, 2));
      if (distance < 1) {
        const endX = this.startX + defaultSize;
        const endY = this.startY;
        shape = {
          id: Math.random().toString(36).substring(2, 9),
          type: "line",
          color: this.colorPicker.value,
          thickness: parseInt(this.thicknessInput.value),
          points: [{ x: this.startX, y: this.startY }, { x: endX, y: endY }]
        };
      } else {
        shape = {
          id: Math.random().toString(36).substring(2, 9),
          type: "line",
          color: this.colorPicker.value,
          thickness: parseInt(this.thicknessInput.value),
          points: [{ x: this.startX, y: this.startY }, { x: pos.x, y: pos.y }]
        };
      }
    } else if (this.currentDrawingTool === "circle") {
      const radius = Math.sqrt(Math.pow(pos.x - this.startX, 2) + Math.pow(pos.y - this.startY, 2));
      if (radius < 1) {
        shape = {
          id: Math.random().toString(36).substring(2, 9),
          type: "circle",
          color: this.colorPicker.value,
          thickness: parseInt(this.thicknessInput.value),
          points: [{ x: this.startX, y: this.startY }],
          radius: defaultSize / 2
        };
      } else {
        shape = {
          id: Math.random().toString(36).substring(2, 9),
          type: "circle",
          color: this.colorPicker.value,
          thickness: parseInt(this.thicknessInput.value),
          points: [{ x: this.startX, y: this.startY }],
          radius
        };
      }
    } else if (this.currentDrawingTool === "pencil") {
      shape = this.activelyEditing || {
        id: Math.random().toString(36).substring(2, 9),
        type: this.currentDrawingTool,
        color: this.colorPicker.value,
        thickness: parseInt(this.thicknessInput.value),
        points: this.polygonPoints
      };
    } else if (this.currentDrawingTool === "polygon") {
      this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
      return;
    }
    if (shape) {
      this.addShape(shape);
      this.redrawShapes();
      this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
      this.updateFrameGutter();
      this.setDrawingTool("cursor");
      this.selectedShape = shape;
      this.redrawShapes();
    }
    this.activelyEditing = null;
    if (this.currentDrawingTool === "pencil") {
      this.polygonPoints = [];
    }
  }
  finishPolygon(e) {
    if (this.currentDrawingTool !== "polygon" || !this.activelyEditing)
      return;
    const id = this.activelyEditing.id;
    this.activelyEditing = null;
    this.polygonPoints = [];
    this.setDrawingTool("cursor");
    this.selectedShape = this.selectedFrame?.shapes.find((shape) => shape.id === id) || null;
    this.redrawShapes();
    this.updateFrameGutter();
  }
  addShape(shape) {
    if (this.selectedFrame) {
      this.selectedFrame.shapes.push(shape);
    }
  }
  redrawShapes() {
    this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    if (this.overlayFrame) {
      this.drawingCtx.save();
      this.drawingCtx.globalAlpha = 0.5;
      this.drawingCtx.drawImage(this.overlayFrame.image, 0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
      this.drawingCtx.restore();
    }
    if (this.selectedFrame) {
      this.selectedFrame.shapes.forEach((shape) => {
        this.drawingCtx.strokeStyle = shape.color;
        this.drawingCtx.fillStyle = shape.color;
        this.drawingCtx.lineWidth = shape.thickness;
        this.drawingCtx.globalCompositeOperation = "source-over";
        switch (shape.type) {
          case "image":
            if (shape.image && shape.points && shape.width && shape.height) {
              this.drawingCtx.drawImage(shape.image, shape.points[0].x, shape.points[0].y, shape.width, shape.height);
            }
            break;
          case "pencil":
          case "line":
          case "polygon":
            this.drawingCtx.beginPath();
            this.drawingCtx.moveTo(shape.points[0].x, shape.points[0].y);
            for (let i = 1;i < shape.points.length; i++) {
              this.drawingCtx.lineTo(shape.points[i].x, shape.points[i].y);
            }
            if (shape.type === "polygon") {
              this.drawingCtx.closePath();
              this.drawingCtx.fill();
            } else {
              this.drawingCtx.stroke();
            }
            break;
          case "circle":
            this.drawingCtx.beginPath();
            this.drawingCtx.arc(shape.points[0].x, shape.points[0].y, shape.radius, 0, 2 * Math.PI);
            this.drawingCtx.fill();
            break;
        }
      });
    }
    this.redrawScaledCanvas();
  }
  drawOverlayElements(scale, offsetX, offsetY) {
    const ctx = this.ctx;
    if (this.selectedFrame) {
      this.selectedFrame.shapes.forEach((shape) => {
        const bounds = this.getShapeBounds(shape);
        if (bounds) {
          const isOutside = bounds.minX < 0 || bounds.minY < 0 || bounds.maxX > this.drawingCanvas.width || bounds.maxY > this.drawingCanvas.height;
          if (isOutside) {
            ctx.strokeStyle = "orange";
            ctx.lineWidth = 2;
            ctx.setLineDash([2, 2]);
            const scaledMinX = bounds.minX * scale + offsetX;
            const scaledMinY = bounds.minY * scale + offsetY;
            const scaledWidth = (bounds.maxX - bounds.minX) * scale;
            const scaledHeight = (bounds.maxY - bounds.minY) * scale;
            ctx.strokeRect(scaledMinX, scaledMinY, scaledWidth, scaledHeight);
            ctx.setLineDash([]);
          }
        }
      });
    }
    if (this.selectionBox) {
      ctx.strokeStyle = "#61afef";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.strokeRect(this.selectionBox.x * scale + offsetX, this.selectionBox.y * scale + offsetY, this.selectionBox.w * scale, this.selectionBox.h * scale);
      ctx.setLineDash([]);
    }
    if (this.selectedShapes.length > 0) {
      const bounds = this.getMultipleShapesBounds(this.selectedShapes);
      if (bounds) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(bounds.minX * scale + offsetX, bounds.minY * scale + offsetY, (bounds.maxX - bounds.minX) * scale, (bounds.maxY - bounds.minY) * scale);
        ctx.setLineDash([]);
      }
    } else if (this.selectedShape) {
      const shape = this.selectedShape;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      switch (shape.type) {
        case "image":
          if (shape.points && shape.width && shape.height) {
            ctx.strokeRect(shape.points[0].x * scale + offsetX, shape.points[0].y * scale + offsetY, shape.width * scale, shape.height * scale);
          }
          break;
        case "circle":
          if (shape.points && shape.radius !== undefined) {
            const centerX = shape.points[0].x * scale + offsetX;
            const centerY = shape.points[0].y * scale + offsetY;
            const radius = shape.radius * scale;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.stroke();
          }
          break;
        case "line":
        case "pencil":
        case "polygon":
          if (shape.points && shape.points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(shape.points[0].x * scale + offsetX, shape.points[0].y * scale + offsetY);
            for (let i = 1;i < shape.points.length; i++) {
              ctx.lineTo(shape.points[i].x * scale + offsetX, shape.points[i].y * scale + offsetY);
            }
            if (shape.type === "polygon") {
              ctx.closePath();
            }
            ctx.stroke();
          }
          break;
      }
      ctx.setLineDash([]);
      ctx.fillStyle = "blue";
      const controlPointRadius = 3;
      if (shape.type === "circle" && shape.points && shape.radius !== undefined) {
        const centerX = shape.points[0].x * scale + offsetX;
        const centerY = shape.points[0].y * scale + offsetY;
        const controlX = (shape.points[0].x + shape.radius) * scale + offsetX;
        const controlY = shape.points[0].y * scale + offsetY;
        ctx.beginPath();
        ctx.arc(controlX, controlY, controlPointRadius, 0, 2 * Math.PI);
        ctx.fill();
      } else if ((shape.type === "line" || shape.type === "polygon") && shape.points) {
        shape.points.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x * scale + offsetX, p.y * scale + offsetY, controlPointRadius, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }
  }
  updateFrameGutter() {
    if (this.selectedFrame) {
      const frameInGutter = this.framesList.querySelector(`[data-frame-name="${this.selectedFrame.name}"]`);
      if (frameInGutter) {
        const img = frameInGutter.querySelector("img");
        const newImage = new Image;
        newImage.src = this.drawingCanvas.toDataURL();
        this.selectedFrame.image = newImage;
        img.src = newImage.src;
      }
    }
  }
  saveDrawing() {
    if (this.selectedFrame) {
      this.updateFrameGutter();
      this.toggleDrawingMode(false);
    }
  }
  async selectOverlayFrame() {
    const frameName = await customPrompt("Enter name of frame to overlay:", "");
    if (frameName) {
      const frameToOverlay = this.frames.find((f) => f.name === frameName);
      if (frameToOverlay) {
        this.overlayFrame = frameToOverlay;
        this.redrawShapes();
      } else {
        alert("Frame not found.");
      }
    }
  }
  async duplicateFrame(frameToDuplicate) {
    const newFrameName = await customPrompt("Enter new name for duplicated frame:", `${frameToDuplicate.name}_copy`);
    if (newFrameName && !this.frames.some((f) => f.name === newFrameName)) {
      const newImage = new Image;
      newImage.src = frameToDuplicate.image.src;
      const newShapes = frameToDuplicate.shapes.map((shape) => ({ ...shape }));
      newShapes.forEach((shape) => {
        if (shape.points) {
          shape.points = shape.points.map((p) => ({ ...p }));
        }
      });
      const duplicatedFrame = {
        name: newFrameName,
        image: newImage,
        shapes: newShapes,
        duration: frameToDuplicate.duration
      };
      this.frames.push(duplicatedFrame);
      this.renderFrames();
      if (this.selectedAnimation) {
        this.animations[this.selectedAnimation].frames.push(newFrameName);
        this.renderAnimations();
      }
    } else if (newFrameName) {
      alert("Frame with that name already exists or name is empty.");
    }
  }
  handleKeyDown(e) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }
    if (e.altKey) {
      e.preventDefault();
      switch (e.key.toLowerCase()) {
        case "p":
          this.setDrawingTool("pencil");
          break;
        case "l":
          this.setDrawingTool("line");
          break;
        case "c":
          this.setDrawingTool("circle");
          break;
        case "o":
          this.setDrawingTool("polygon");
          break;
        case "i":
          this.importImageAsShape();
          break;
        case "s":
          this.setDrawingTool("select");
          break;
      }
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      if (this.selectedShapes.length > 0 && this.selectedFrame) {
        this.selectedFrame.shapes = this.selectedFrame.shapes.filter((shape) => !this.selectedShapes.includes(shape));
        this.selectedShapes = [];
        this.redrawShapes();
        this.updateFrameGutter();
      } else if (this.selectedShape && this.selectedFrame) {
        const index = this.selectedFrame.shapes.indexOf(this.selectedShape);
        if (index > -1) {
          this.selectedFrame.shapes.splice(index, 1);
          this.selectedShape = null;
          this.redrawShapes();
          this.updateFrameGutter();
        }
      }
    } else if (e.key === "Enter" && this.activelyEditing && this.currentDrawingTool == "polygon") {
      this.finishPolygon(e);
    }
  }
  deleteFrame(frameName) {
    const frameIndex = this.frames.findIndex((f) => f.name === frameName);
    if (frameIndex > -1) {
      this.frames.splice(frameIndex, 1);
    }
    for (const animName in this.animations) {
      const anim = this.animations[animName];
      const frameInAnimIndex = anim.frames.indexOf(frameName);
      if (frameInAnimIndex > -1) {
        anim.frames.splice(frameInAnimIndex, 1);
      }
    }
    if (this.selectedFrame?.name === frameName) {
      this.selectedFrame = null;
      this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
      this.redrawScaledCanvas();
      this.toggleDrawingMode(false);
    }
    this.renderFrames();
    this.renderAnimations();
  }
  handleFrameDragStart(e, frameName) {
    this.draggedFrameName = frameName;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  }
  handleFrameDragOver(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const isFirstHalf = e.clientY - rect.top < rect.height / 2;
    if (isFirstHalf) {
      target.classList.add("drag-over-above");
      target.classList.remove("drag-over-below");
    } else {
      target.classList.add("drag-over-below");
      target.classList.remove("drag-over-above");
    }
  }
  handleFrameDrop(e, targetFrameName) {
    e.preventDefault();
    if (!this.draggedFrameName || this.draggedFrameName === targetFrameName) {
      return;
    }
    const target = e.currentTarget;
    target.classList.remove("drag-over-above", "drag-over-below");
    const frameListName = this.selectedAnimation ? this.animations[this.selectedAnimation].frames : this.frames.map((f) => f.name);
    const draggedIndex = frameListName.indexOf(this.draggedFrameName);
    let targetIndex = frameListName.indexOf(targetFrameName);
    const rect = target.getBoundingClientRect();
    const isFirstHalf = e.clientY - rect.top < rect.height / 2;
    if (!isFirstHalf) {
      targetIndex++;
    }
    if (draggedIndex > -1) {
      const [draggedItem] = frameListName.splice(draggedIndex, 1);
      if (targetIndex > draggedIndex) {
        targetIndex--;
      }
      frameListName.splice(targetIndex, 0, draggedItem);
    }
    if (this.selectedAnimation) {
      this.renderFrames(this.animations[this.selectedAnimation].frames.map((name) => this.frames.find((f) => f.name === name)));
      this.renderAnimations();
    } else {
      const reorderedFrames = [];
      frameListName.forEach((name) => {
        const frame = this.frames.find((f) => f.name === name);
        if (frame)
          reorderedFrames.push(frame);
      });
      this.frames = reorderedFrames;
      this.renderFrames();
    }
    this.draggedFrameName = null;
  }
  selectShapesInBox() {
    if (!this.selectionBox || !this.selectedFrame)
      return;
    const { x, y, w, h } = this.selectionBox;
    const selX1 = Math.min(x, x + w);
    const selY1 = Math.min(y, y + h);
    const selX2 = Math.max(x, x + w);
    const selY2 = Math.max(y, y + h);
    this.selectedShapes = this.selectedFrame.shapes.filter((shape) => {
      const bounds = this.getShapeBounds(shape);
      if (!bounds)
        return false;
      return bounds.minX < selX2 && bounds.maxX > selX1 && bounds.minY < selY2 && bounds.maxY > selY1;
    });
    this.selectedShape = null;
  }
  getMultipleShapesBounds(shapes) {
    if (shapes.length === 0)
      return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    shapes.forEach((shape) => {
      const bounds = this.getShapeBounds(shape);
      if (bounds) {
        minX = Math.min(minX, bounds.minX);
        minY = Math.min(minY, bounds.minY);
        maxX = Math.max(maxX, bounds.maxX);
        maxY = Math.max(maxY, bounds.maxY);
      }
    });
    if (minX === Infinity)
      return null;
    return { minX, minY, maxX, maxY };
  }
}
new SpriteBuilder;
