// fastclick.min.js
(function () { function FastClick(layer, options) { var oldOnClick; options = options || {}; this.trackingClick = false; this.trackingClickStart = 0; this.targetElement = null; this.touchStartX = 0; this.touchStartY = 0; this.lastTouchIdentifier = 0; this.touchBoundary = options.touchBoundary || 10; this.layer = layer; this.tapDelay = options.tapDelay || 200; this.tapTimeout = options.tapTimeout || 700; if (FastClick.notNeeded(layer)) { return } function bind(method, context) { return function () { return method.apply(context, arguments) } } var methods = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"]; var context = this; for (var i = 0, l = methods.length; i < l; i++) { context[methods[i]] = bind(context[methods[i]], context) } if (deviceIsAndroid) { layer.addEventListener("mouseover", this.onMouse, true); layer.addEventListener("mousedown", this.onMouse, true); layer.addEventListener("mouseup", this.onMouse, true) } layer.addEventListener("click", this.onClick, true); layer.addEventListener("touchstart", this.onTouchStart, false); layer.addEventListener("touchmove", this.onTouchMove, false); layer.addEventListener("touchend", this.onTouchEnd, false); layer.addEventListener("touchcancel", this.onTouchCancel, false); if (!Event.prototype.stopImmediatePropagation) { layer.removeEventListener = function (type, callback, capture) { var rmv = Node.prototype.removeEventListener; if (type === "click") { rmv.call(layer, type, callback.hijacked || callback, capture) } else { rmv.call(layer, type, callback, capture) } }; layer.addEventListener = function (type, callback, capture) { var adv = Node.prototype.addEventListener; if (type === "click") { adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) { if (!event.propagationStopped) { callback(event) } }), capture) } else { adv.call(layer, type, callback, capture) } } } if (typeof layer.onclick === "function") { oldOnClick = layer.onclick; layer.addEventListener("click", function (event) { oldOnClick(event) }, false); layer.onclick = null } } var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0; var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0 && !deviceIsWindowsPhone; var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone; var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent); var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent); var deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0; FastClick.prototype.needsClick = function (target) { switch (target.nodeName.toLowerCase()) { case "button": case "select": case "textarea": if (target.disabled) { return true } break; case "input": if ((deviceIsIOS && target.type === "file") || target.disabled) { return true } break; case "label": case "iframe": case "video": return true }return (/\bneedsclick\b/).test(target.className) }; FastClick.prototype.needsFocus = function (target) { switch (target.nodeName.toLowerCase()) { case "textarea": return true; case "select": return !deviceIsAndroid; case "input": switch (target.type) { case "button": case "checkbox": case "file": case "image": case "radio": case "submit": return false }return !target.disabled && !target.readOnly; default: return (/\bneedsfocus\b/).test(target.className) } }; FastClick.prototype.sendClick = function (targetElement, event) { var clickEvent, touch; if (document.activeElement && document.activeElement !== targetElement) { document.activeElement.blur() } touch = event.changedTouches[0]; clickEvent = document.createEvent("MouseEvents"); clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null); clickEvent.forwardedTouchEvent = true; targetElement.dispatchEvent(clickEvent) }; FastClick.prototype.determineEventType = function (targetElement) { if (deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") { return "mousedown" } return "click" }; FastClick.prototype.focus = function (targetElement) { var length; if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time" && targetElement.type !== "month") { length = targetElement.value.length; targetElement.setSelectionRange(length, length) } else { targetElement.focus() } }; FastClick.prototype.updateScrollParent = function (targetElement) { var scrollParent, parentElement; scrollParent = targetElement.fastClickScrollParent; if (!scrollParent || !scrollParent.contains(targetElement)) { parentElement = targetElement; do { if (parentElement.scrollHeight > parentElement.offsetHeight) { scrollParent = parentElement; targetElement.fastClickScrollParent = parentElement; break } parentElement = parentElement.parentElement } while (parentElement) } if (scrollParent) { scrollParent.fastClickLastScrollTop = scrollParent.scrollTop } }; FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) { if (eventTarget.nodeType === Node.TEXT_NODE) { return eventTarget.parentNode } return eventTarget }; FastClick.prototype.onTouchStart = function (event) { var targetElement, touch, selection; if (event.targetTouches.length > 1) { return true } targetElement = this.getTargetElementFromEventTarget(event.target); touch = event.targetTouches[0]; if (deviceIsIOS) { selection = window.getSelection(); if (selection.rangeCount && !selection.isCollapsed) { return true } if (!deviceIsIOS4) { if (touch.identifier && touch.identifier === this.lastTouchIdentifier) { event.preventDefault(); return false } this.lastTouchIdentifier = touch.identifier; this.updateScrollParent(targetElement) } } this.trackingClick = true; this.trackingClickStart = event.timeStamp; this.targetElement = targetElement; this.touchStartX = touch.pageX; this.touchStartY = touch.pageY; if ((event.timeStamp - this.lastClickTime) < this.tapDelay) { event.preventDefault() } return true }; FastClick.prototype.touchHasMoved = function (event) { var touch = event.changedTouches[0], boundary = this.touchBoundary; if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) { return true } return false }; FastClick.prototype.onTouchMove = function (event) { if (!this.trackingClick) { return true } if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) { this.trackingClick = false; this.targetElement = null } return true }; FastClick.prototype.findControl = function (labelElement) { if (labelElement.control !== undefined) { return labelElement.control } if (labelElement.htmlFor) { return document.getElementById(labelElement.htmlFor) } return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }; FastClick.prototype.onTouchEnd = function (event) { var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement; if (!this.trackingClick) { return true } if ((event.timeStamp - this.lastClickTime) < this.tapDelay) { this.cancelNextClick = true; return true } if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) { return true } this.cancelNextClick = false; this.lastClickTime = event.timeStamp; trackingClickStart = this.trackingClickStart; this.trackingClick = false; this.trackingClickStart = 0; if (deviceIsIOSWithBadTarget) { touch = event.changedTouches[0]; targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement; targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent } targetTagName = targetElement.tagName.toLowerCase(); if (targetTagName === "label") { forElement = this.findControl(targetElement); if (forElement) { this.focus(targetElement); if (deviceIsAndroid) { return false } targetElement = forElement } } else { if (this.needsFocus(targetElement)) { if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === "input")) { this.targetElement = null; return false } this.focus(targetElement); this.sendClick(targetElement, event); if (!deviceIsIOS || targetTagName !== "select") { this.targetElement = null; event.preventDefault() } return false } } if (deviceIsIOS && !deviceIsIOS4) { scrollParent = targetElement.fastClickScrollParent; if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) { return true } } if (!this.needsClick(targetElement)) { event.preventDefault(); this.sendClick(targetElement, event) } return false }; FastClick.prototype.onTouchCancel = function () { this.trackingClick = false; this.targetElement = null }; FastClick.prototype.onMouse = function (event) { if (!this.targetElement) { return true } if (event.forwardedTouchEvent) { return true } if (!event.cancelable) { return true } if (!this.needsClick(this.targetElement) || this.cancelNextClick) { if (event.stopImmediatePropagation) { event.stopImmediatePropagation() } else { event.propagationStopped = true } event.stopPropagation(); event.preventDefault(); return false } return true }; FastClick.prototype.onClick = function (event) { var permitted; if (this.trackingClick) { this.targetElement = null; this.trackingClick = false; return true } if (event.target.type === "submit" && event.detail === 0) { return true } permitted = this.onMouse(event); if (!permitted) { this.targetElement = null } return permitted }; FastClick.prototype.destroy = function () { var layer = this.layer; if (deviceIsAndroid) { layer.removeEventListener("mouseover", this.onMouse, true); layer.removeEventListener("mousedown", this.onMouse, true); layer.removeEventListener("mouseup", this.onMouse, true) } layer.removeEventListener("click", this.onClick, true); layer.removeEventListener("touchstart", this.onTouchStart, false); layer.removeEventListener("touchmove", this.onTouchMove, false); layer.removeEventListener("touchend", this.onTouchEnd, false); layer.removeEventListener("touchcancel", this.onTouchCancel, false) }; FastClick.notNeeded = function (layer) { var metaViewport; var chromeVersion; var blackberryVersion; var firefoxVersion; if (typeof window.ontouchstart === "undefined") { return true } chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]; if (chromeVersion) { if (deviceIsAndroid) { metaViewport = document.querySelector("meta[name=viewport]"); if (metaViewport) { if (metaViewport.content.indexOf("user-scalable=no") !== -1) { return true } if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) { return true } } } else { return true } } if (deviceIsBlackBerry10) { blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/); if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) { metaViewport = document.querySelector("meta[name=viewport]"); if (metaViewport) { if (metaViewport.content.indexOf("user-scalable=no") !== -1) { return true } if (document.documentElement.scrollWidth <= window.outerWidth) { return true } } } } if (layer.style.msTouchAction === "none" || layer.style.touchAction === "manipulation") { return true } firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]; if (firefoxVersion >= 27) { metaViewport = document.querySelector("meta[name=viewport]"); if (metaViewport && (metaViewport.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) { return true } } if (layer.style.touchAction === "none" || layer.style.touchAction === "manipulation") { return true } return false }; FastClick.attach = function (layer, options) { return new FastClick(layer, options) }; if (typeof define === "function" && typeof define.amd === "object" && define.amd) { define(function () { return FastClick }) } else { if (typeof module !== "undefined" && module.exports) { module.exports = FastClick.attach; module.exports.FastClick = FastClick } else { window.FastClick = FastClick } } }());

// echo.min.js
(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define(function () {
			return factory(root)
		})
	} else {
		if (typeof exports === "object") {
			module.exports = factory
		} else {
			root.echo = factory(root)
		}
	}
})(this, function (root) {
	var echo = {};
	var callback = function () { };
	var offset, poll, delay, useDebounce, unload;
	var isHidden = function (element) {
		return (element.offsetParent === null)
	};
	var inView = function (element, view) {
		if (isHidden(element)) {
			return false
		}
		var box = element.getBoundingClientRect();
		return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b)
	};
	var debounceOrThrottle = function () {
		if (!useDebounce && !!poll) {
			return
		}
		clearTimeout(poll);
		poll = setTimeout(function () {
			echo.render();
			poll = null
		}, delay)
	};
	echo.doImage = function (imgUrl, index, loadSucc, loadFail, imgOrigin) {
		var newImg = new Image();
		newImg.onload = loadSucc;
		newImg.onerror = function (data) {
			loadFail && loadFail(data, imgOrigin)
		};
		newImg.src = imgUrl;
		newImg.alt = index
	};
	echo.init = function (opts) {
		opts = opts || {};
		var offsetAll = opts.offset || 0;
		var offsetVertical = opts.offsetVertical || offsetAll;
		var offsetHorizontal = opts.offsetHorizontal || offsetAll;
		var optionToInt = function (opt, fallback) {
			return parseInt(opt || fallback, 10)
		};
		offset = {
			t: optionToInt(opts.offsetTop, offsetVertical),
			b: optionToInt(opts.offsetBottom, offsetVertical),
			l: optionToInt(opts.offsetLeft, offsetHorizontal),
			r: optionToInt(opts.offsetRight, offsetHorizontal)
		};
		delay = optionToInt(opts.throttle, 250);
		useDebounce = opts.debounce !== false;
		unload = !!opts.unload;
		callback = opts.callback || callback;
		echo.render();
		if (document.addEventListener) {
			root.addEventListener("scroll", debounceOrThrottle, false);
			root.addEventListener("load", debounceOrThrottle, false)
		} else {
			root.attachEvent("onscroll", debounceOrThrottle);
			root.attachEvent("onload", debounceOrThrottle)
		}
	};
	echo.render = function () {
		var nodes = document.querySelectorAll("img[data-echo], [data-echo-background]");
		var length = nodes.length;
		var src, elem;
		var view = {
			l: 0 - offset.l,
			t: 0 - offset.t,
			b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
			r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
		};
		for (var i = 0; i < length; i++) {
			elem = nodes[i];
			if (inView(elem, view)) {
				if (unload) {
					elem.setAttribute("data-echo-placeholder", elem.src)
				}
				if (elem.getAttribute("data-echo-background") !== null) {
					echo.doImage(elem.getAttribute("data-echo-background"), i, function (data) {
						nodes[parseInt(data.target.alt)].style.backgroundImage = "url(" + data.target.src + ")"
					}, function (data, imgOrigin) {
						var secondImg = new Image();
						secondImg.onload = function (data) {
							nodes[parseInt(data.target.alt)].style.backgroundImage = "url(" + data.target.src + ")"
						};
						secondImg.onerror = function (data) {
							nodes[parseInt(data.target.alt)].style.backgroundImage = "url(" + misc.vars.base + misc.vars.defultimg + ")"
						};
						secondImg.src = imgOrigin;
						secondImg.alt = data.target.alt
					}, elem.getAttribute("data-origin"))
				} else {
					echo.doImage(elem.getAttribute("data-echo"), i, function (data) {
						nodes[parseInt(data.target.alt)].src = data.target.src
					}, function (data, imgOrigin) {
						var secondImg = new Image();
						secondImg.onload = function (data) {
							nodes[parseInt(data.target.alt)].src = 'https://h5.55haitao.com/detect?f=' + encodeURIComponent(data.target.src)
						};
						secondImg.onerror = function (data) {
							nodes[parseInt(data.target.alt)].src = misc.vars.base + misc.vars.defultimg
						};
						secondImg.src = imgOrigin;
						secondImg.alt = data.target.alt
					}, elem.getAttribute("data-origin"))
				}
				if (!unload) {
					elem.removeAttribute("data-echo");
					elem.removeAttribute("data-echo-background")
				}
				callback(elem, "load")
			} else {
				if (unload && !!(src = elem.getAttribute("data-echo-placeholder"))) {
					if (elem.getAttribute("data-echo-background") !== null) {
						elem.style.backgroundImage = "url(" + src + ")"
					} else {
						elem.src = src
					}
					elem.removeAttribute("data-echo-placeholder");
					callback(elem, "unload")
				}
			}
		}
		if (!length) {
			echo.detach()
		}
	};
	echo.detach = function () {
		if (document.removeEventListener) {
			root.removeEventListener("scroll", debounceOrThrottle)
		} else {
			root.detachEvent("onscroll", debounceOrThrottle)
		}
		clearTimeout(poll)
	};
	return echo
});
// zepto.min.js
(function (a) { String.prototype.trim === a && (String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, "") }), Array.prototype.reduce === a && (Array.prototype.reduce = function (b) { if (this === void 0 || this === null) throw new TypeError; var c = Object(this), d = c.length >>> 0, e = 0, f; if (typeof b != "function") throw new TypeError; if (d == 0 && arguments.length == 1) throw new TypeError; if (arguments.length >= 2) f = arguments[1]; else do { if (e in c) { f = c[e++]; break } if (++e >= d) throw new TypeError } while (!0); while (e < d) e in c && (f = b.call(a, f, c[e], e, c)), e++; return f }) })(); var Zepto = function () { function E(a) { return a == null ? String(a) : y[z.call(a)] || "object" } function F(a) { return E(a) == "function" } function G(a) { return a != null && a == a.window } function H(a) { return a != null && a.nodeType == a.DOCUMENT_NODE } function I(a) { return E(a) == "object" } function J(a) { return I(a) && !G(a) && a.__proto__ == Object.prototype } function K(a) { return a instanceof Array } function L(a) { return typeof a.length == "number" } function M(a) { return g.call(a, function (a) { return a != null }) } function N(a) { return a.length > 0 ? c.fn.concat.apply([], a) : a } function O(a) { return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase() } function P(a) { return a in j ? j[a] : j[a] = new RegExp("(^|\\s)" + a + "(\\s|$)") } function Q(a, b) { return typeof b == "number" && !l[O(a)] ? b + "px" : b } function R(a) { var b, c; return i[a] || (b = h.createElement(a), h.body.appendChild(b), c = k(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), c == "none" && (c = "block"), i[a] = c), i[a] } function S(a) { return "children" in a ? f.call(a.children) : c.map(a.childNodes, function (a) { if (a.nodeType == 1) return a }) } function T(c, d, e) { for (b in d) e && (J(d[b]) || K(d[b])) ? (J(d[b]) && !J(c[b]) && (c[b] = {}), K(d[b]) && !K(c[b]) && (c[b] = []), T(c[b], d[b], e)) : d[b] !== a && (c[b] = d[b]) } function U(b, d) { return d === a ? c(b) : c(b).filter(d) } function V(a, b, c, d) { return F(b) ? b.call(a, c, d) : b } function W(a, b, c) { c == null ? a.removeAttribute(b) : a.setAttribute(b, c) } function X(b, c) { var d = b.className, e = d && d.baseVal !== a; if (c === a) return e ? d.baseVal : d; e ? d.baseVal = c : b.className = c } function Y(a) { var b; try { return a ? a == "true" || (a == "false" ? !1 : a == "null" ? null : isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? c.parseJSON(a) : a : b) : a } catch (d) { return a } } function Z(a, b) { b(a); for (var c in a.childNodes) Z(a.childNodes[c], b) } var a, b, c, d, e = [], f = e.slice, g = e.filter, h = window.document, i = {}, j = {}, k = h.defaultView.getComputedStyle, l = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 }, m = /^\s*<(\w+|!)[^>]*>/, n = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, o = /^(?:body|html)$/i, p = ["val", "css", "html", "text", "data", "width", "height", "offset"], q = ["after", "prepend", "before", "append"], r = h.createElement("table"), s = h.createElement("tr"), t = { tr: h.createElement("tbody"), tbody: r, thead: r, tfoot: r, td: s, th: s, "*": h.createElement("div") }, u = /complete|loaded|interactive/, v = /^\.([\w-]+)$/, w = /^#([\w-]*)$/, x = /^[\w-]+$/, y = {}, z = y.toString, A = {}, B, C, D = h.createElement("div"); return A.matches = function (a, b) { if (!a || a.nodeType !== 1) return !1; var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector; if (c) return c.call(a, b); var d, e = a.parentNode, f = !e; return f && (e = D).appendChild(a), d = ~A.qsa(e, b).indexOf(a), f && D.removeChild(a), d }, B = function (a) { return a.replace(/-+(.)?/g, function (a, b) { return b ? b.toUpperCase() : "" }) }, C = function (a) { return g.call(a, function (b, c) { return a.indexOf(b) == c }) }, A.fragment = function (b, d, e) { b.replace && (b = b.replace(n, "<$1></$2>")), d === a && (d = m.test(b) && RegExp.$1), d in t || (d = "*"); var g, h, i = t[d]; return i.innerHTML = "" + b, h = c.each(f.call(i.childNodes), function () { i.removeChild(this) }), J(e) && (g = c(h), c.each(e, function (a, b) { p.indexOf(a) > -1 ? g[a](b) : g.attr(a, b) })), h }, A.Z = function (a, b) { return a = a || [], a.__proto__ = c.fn, a.selector = b || "", a }, A.isZ = function (a) { return a instanceof A.Z }, A.init = function (b, d) { if (!b) return A.Z(); if (F(b)) return c(h).ready(b); if (A.isZ(b)) return b; var e; if (K(b)) e = M(b); else if (I(b)) e = [J(b) ? c.extend({}, b) : b], b = null; else if (m.test(b)) e = A.fragment(b.trim(), RegExp.$1, d), b = null; else { if (d !== a) return c(d).find(b); e = A.qsa(h, b) } return A.Z(e, b) }, c = function (a, b) { return A.init(a, b) }, c.extend = function (a) { var b, c = f.call(arguments, 1); return typeof a == "boolean" && (b = a, a = c.shift()), c.forEach(function (c) { T(a, c, b) }), a }, A.qsa = function (a, b) { var c; return H(a) && w.test(b) ? (c = a.getElementById(RegExp.$1)) ? [c] : [] : a.nodeType !== 1 && a.nodeType !== 9 ? [] : f.call(v.test(b) ? a.getElementsByClassName(RegExp.$1) : x.test(b) ? a.getElementsByTagName(b) : a.querySelectorAll(b)) }, c.contains = function (a, b) { return a !== b && a.contains(b) }, c.type = E, c.isFunction = F, c.isWindow = G, c.isArray = K, c.isPlainObject = J, c.isEmptyObject = function (a) { var b; for (b in a) return !1; return !0 }, c.inArray = function (a, b, c) { return e.indexOf.call(b, a, c) }, c.camelCase = B, c.trim = function (a) { return a.trim() }, c.uuid = 0, c.support = {}, c.expr = {}, c.map = function (a, b) { var c, d = [], e, f; if (L(a)) for (e = 0; e < a.length; e++)c = b(a[e], e), c != null && d.push(c); else for (f in a) c = b(a[f], f), c != null && d.push(c); return N(d) }, c.each = function (a, b) { var c, d; if (L(a)) { for (c = 0; c < a.length; c++)if (b.call(a[c], c, a[c]) === !1) return a } else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a; return a }, c.grep = function (a, b) { return g.call(a, b) }, window.JSON && (c.parseJSON = JSON.parse), c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) { y["[object " + b + "]"] = b.toLowerCase() }), c.fn = { forEach: e.forEach, reduce: e.reduce, push: e.push, sort: e.sort, indexOf: e.indexOf, concat: e.concat, map: function (a) { return c(c.map(this, function (b, c) { return a.call(b, c, b) })) }, slice: function () { return c(f.apply(this, arguments)) }, ready: function (a) { return u.test(h.readyState) ? a(c) : h.addEventListener("DOMContentLoaded", function () { a(c) }, !1), this }, get: function (b) { return b === a ? f.call(this) : this[b >= 0 ? b : b + this.length] }, toArray: function () { return this.get() }, size: function () { return this.length }, remove: function () { return this.each(function () { this.parentNode != null && this.parentNode.removeChild(this) }) }, each: function (a) { return e.every.call(this, function (b, c) { return a.call(b, c, b) !== !1 }), this }, filter: function (a) { return F(a) ? this.not(this.not(a)) : c(g.call(this, function (b) { return A.matches(b, a) })) }, add: function (a, b) { return c(C(this.concat(c(a, b)))) }, is: function (a) { return this.length > 0 && A.matches(this[0], a) }, not: function (b) { var d = []; if (F(b) && b.call !== a) this.each(function (a) { b.call(this, a) || d.push(this) }); else { var e = typeof b == "string" ? this.filter(b) : L(b) && F(b.item) ? f.call(b) : c(b); this.forEach(function (a) { e.indexOf(a) < 0 && d.push(a) }) } return c(d) }, has: function (a) { return this.filter(function () { return I(a) ? c.contains(this, a) : c(this).find(a).size() }) }, eq: function (a) { return a === -1 ? this.slice(a) : this.slice(a, +a + 1) }, first: function () { var a = this[0]; return a && !I(a) ? a : c(a) }, last: function () { var a = this[this.length - 1]; return a && !I(a) ? a : c(a) }, find: function (a) { var b, d = this; return typeof a == "object" ? b = c(a).filter(function () { var a = this; return e.some.call(d, function (b) { return c.contains(b, a) }) }) : this.length == 1 ? b = c(A.qsa(this[0], a)) : b = this.map(function () { return A.qsa(this, a) }), b }, closest: function (a, b) { var d = this[0], e = !1; typeof a == "object" && (e = c(a)); while (d && !(e ? e.indexOf(d) >= 0 : A.matches(d, a))) d = d !== b && !H(d) && d.parentNode; return c(d) }, parents: function (a) { var b = [], d = this; while (d.length > 0) d = c.map(d, function (a) { if ((a = a.parentNode) && !H(a) && b.indexOf(a) < 0) return b.push(a), a }); return U(b, a) }, parent: function (a) { return U(C(this.pluck("parentNode")), a) }, children: function (a) { return U(this.map(function () { return S(this) }), a) }, contents: function () { return this.map(function () { return f.call(this.childNodes) }) }, siblings: function (a) { return U(this.map(function (a, b) { return g.call(S(b.parentNode), function (a) { return a !== b }) }), a) }, empty: function () { return this.each(function () { this.innerHTML = "" }) }, pluck: function (a) { return c.map(this, function (b) { return b[a] }) }, show: function () { return this.each(function () { this.style.display == "none" && (this.style.display = null), k(this, "").getPropertyValue("display") == "none" && (this.style.display = R(this.nodeName)) }) }, replaceWith: function (a) { return this.before(a).remove() }, wrap: function (a) { var b = F(a); if (this[0] && !b) var d = c(a).get(0), e = d.parentNode || this.length > 1; return this.each(function (f) { c(this).wrapAll(b ? a.call(this, f) : e ? d.cloneNode(!0) : d) }) }, wrapAll: function (a) { if (this[0]) { c(this[0]).before(a = c(a)); var b; while ((b = a.children()).length) a = b.first(); c(a).append(this) } return this }, wrapInner: function (a) { var b = F(a); return this.each(function (d) { var e = c(this), f = e.contents(), g = b ? a.call(this, d) : a; f.length ? f.wrapAll(g) : e.append(g) }) }, unwrap: function () { return this.parent().each(function () { c(this).replaceWith(c(this).children()) }), this }, clone: function () { return this.map(function () { return this.cloneNode(!0) }) }, hide: function () { return this.css("display", "none") }, toggle: function (b) { return this.each(function () { var d = c(this); (b === a ? d.css("display") == "none" : b) ? d.show() : d.hide() }) }, prev: function (a) { return c(this.pluck("previousElementSibling")).filter(a || "*") }, next: function (a) { return c(this.pluck("nextElementSibling")).filter(a || "*") }, html: function (b) { return b === a ? this.length > 0 ? this[0].innerHTML : null : this.each(function (a) { var d = this.innerHTML; c(this).empty().append(V(this, b, a, d)) }) }, text: function (b) { return b === a ? this.length > 0 ? this[0].textContent : null : this.each(function () { this.textContent = b }) }, attr: function (c, d) { var e; return typeof c == "string" && d === a ? this.length == 0 || this[0].nodeType !== 1 ? a : c == "value" && this[0].nodeName == "INPUT" ? this.val() : !(e = this[0].getAttribute(c)) && c in this[0] ? this[0][c] : e : this.each(function (a) { if (this.nodeType !== 1) return; if (I(c)) for (b in c) W(this, b, c[b]); else W(this, c, V(this, d, a, this.getAttribute(c))) }) }, removeAttr: function (a) { return this.each(function () { this.nodeType === 1 && W(this, a) }) }, prop: function (b, c) { return c === a ? this[0] && this[0][b] : this.each(function (a) { this[b] = V(this, c, a, this[b]) }) }, data: function (b, c) { var d = this.attr("data-" + O(b), c); return d !== null ? Y(d) : a }, val: function (b) { return b === a ? this[0] && (this[0].multiple ? c(this[0]).find("option").filter(function (a) { return this.selected }).pluck("value") : this[0].value) : this.each(function (a) { this.value = V(this, b, a, this.value) }) }, offset: function (a) { if (a) return this.each(function (b) { var d = c(this), e = V(this, a, b, d.offset()), f = d.offsetParent().offset(), g = { top: e.top - f.top, left: e.left - f.left }; d.css("position") == "static" && (g.position = "relative"), d.css(g) }); if (this.length == 0) return null; var b = this[0].getBoundingClientRect(); return { left: b.left + window.pageXOffset, top: b.top + window.pageYOffset, width: Math.round(b.width), height: Math.round(b.height) } }, css: function (a, c) { if (arguments.length < 2 && typeof a == "string") return this[0] && (this[0].style[B(a)] || k(this[0], "").getPropertyValue(a)); var d = ""; if (E(a) == "string") !c && c !== 0 ? this.each(function () { this.style.removeProperty(O(a)) }) : d = O(a) + ":" + Q(a, c); else for (b in a) !a[b] && a[b] !== 0 ? this.each(function () { this.style.removeProperty(O(b)) }) : d += O(b) + ":" + Q(b, a[b]) + ";"; return this.each(function () { this.style.cssText += ";" + d }) }, index: function (a) { return a ? this.indexOf(c(a)[0]) : this.parent().children().indexOf(this[0]) }, hasClass: function (a) { return e.some.call(this, function (a) { return this.test(X(a)) }, P(a)) }, addClass: function (a) { return this.each(function (b) { d = []; var e = X(this), f = V(this, a, b, e); f.split(/\s+/g).forEach(function (a) { c(this).hasClass(a) || d.push(a) }, this), d.length && X(this, e + (e ? " " : "") + d.join(" ")) }) }, removeClass: function (b) { return this.each(function (c) { if (b === a) return X(this, ""); d = X(this), V(this, b, c, d).split(/\s+/g).forEach(function (a) { d = d.replace(P(a), " ") }), X(this, d.trim()) }) }, toggleClass: function (b, d) { return this.each(function (e) { var f = c(this), g = V(this, b, e, X(this)); g.split(/\s+/g).forEach(function (b) { (d === a ? !f.hasClass(b) : d) ? f.addClass(b) : f.removeClass(b) }) }) }, scrollTop: function () { if (!this.length) return; return "scrollTop" in this[0] ? this[0].scrollTop : this[0].scrollY }, position: function () { if (!this.length) return; var a = this[0], b = this.offsetParent(), d = this.offset(), e = o.test(b[0].nodeName) ? { top: 0, left: 0 } : b.offset(); return d.top -= parseFloat(c(a).css("margin-top")) || 0, d.left -= parseFloat(c(a).css("margin-left")) || 0, e.top += parseFloat(c(b[0]).css("border-top-width")) || 0, e.left += parseFloat(c(b[0]).css("border-left-width")) || 0, { top: d.top - e.top, left: d.left - e.left } }, offsetParent: function () { return this.map(function () { var a = this.offsetParent || h.body; while (a && !o.test(a.nodeName) && c(a).css("position") == "static") a = a.offsetParent; return a }) } }, c.fn.detach = c.fn.remove, ["width", "height"].forEach(function (b) { c.fn[b] = function (d) { var e, f = this[0], g = b.replace(/./, function (a) { return a[0].toUpperCase() }); return d === a ? G(f) ? f["inner" + g] : H(f) ? f.documentElement["offset" + g] : (e = this.offset()) && e[b] : this.each(function (a) { f = c(this), f.css(b, V(this, d, a, f[b]())) }) } }), q.forEach(function (a, b) { var d = b % 2; c.fn[a] = function () { var a, e = c.map(arguments, function (b) { return a = E(b), a == "object" || a == "array" || b == null ? b : A.fragment(b) }), f, g = this.length > 1; return e.length < 1 ? this : this.each(function (a, h) { f = d ? h : h.parentNode, h = b == 0 ? h.nextSibling : b == 1 ? h.firstChild : b == 2 ? h : null, e.forEach(function (a) { if (g) a = a.cloneNode(!0); else if (!f) return c(a).remove(); Z(f.insertBefore(a, h), function (a) { a.nodeName != null && a.nodeName.toUpperCase() === "SCRIPT" && (!a.type || a.type === "text/javascript") && !a.src && window.eval.call(window, a.innerHTML) }) }) }) }, c.fn[d ? a + "To" : "insert" + (b ? "Before" : "After")] = function (b) { return c(b)[a](this), this } }), A.Z.prototype = c.fn, A.uniq = C, A.deserializeValue = Y, c.zepto = A, c }(); window.Zepto = Zepto, "$" in window || (window.$ = Zepto), function (a) { function b(a) { var b = this.os = {}, c = this.browser = {}, d = a.match(/WebKit\/([\d.]+)/), e = a.match(/(Android)\s+([\d.]+)/), f = a.match(/(iPad).*OS\s([\d_]+)/), g = !f && a.match(/(iPhone\sOS)\s([\d_]+)/), h = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), i = h && a.match(/TouchPad/), j = a.match(/Kindle\/([\d.]+)/), k = a.match(/Silk\/([\d._]+)/), l = a.match(/(BlackBerry).*Version\/([\d.]+)/), m = a.match(/(BB10).*Version\/([\d.]+)/), n = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/), o = a.match(/PlayBook/), p = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/), q = a.match(/Firefox\/([\d.]+)/); if (c.webkit = !!d) c.version = d[1]; e && (b.android = !0, b.version = e[2]), g && (b.ios = b.iphone = !0, b.version = g[2].replace(/_/g, ".")), f && (b.ios = b.ipad = !0, b.version = f[2].replace(/_/g, ".")), h && (b.webos = !0, b.version = h[2]), i && (b.touchpad = !0), l && (b.blackberry = !0, b.version = l[2]), m && (b.bb10 = !0, b.version = m[2]), n && (b.rimtabletos = !0, b.version = n[2]), o && (c.playbook = !0), j && (b.kindle = !0, b.version = j[1]), k && (c.silk = !0, c.version = k[1]), !k && b.android && a.match(/Kindle Fire/) && (c.silk = !0), p && (c.chrome = !0, c.version = p[1]), q && (c.firefox = !0, c.version = q[1]), b.tablet = !!(f || o || e && !a.match(/Mobile/) || q && a.match(/Tablet/)), b.phone = !b.tablet && !!(e || g || h || l || m || p && a.match(/Android/) || p && a.match(/CriOS\/([\d.]+)/) || q && a.match(/Mobile/)) } b.call(a, navigator.userAgent), a.__detect = b }(Zepto), function (a) { function g(a) { return a._zid || (a._zid = d++) } function h(a, b, d, e) { b = i(b); if (b.ns) var f = j(b.ns); return (c[g(a)] || []).filter(function (a) { return a && (!b.e || a.e == b.e) && (!b.ns || f.test(a.ns)) && (!d || g(a.fn) === g(d)) && (!e || a.sel == e) }) } function i(a) { var b = ("" + a).split("."); return { e: b[0], ns: b.slice(1).sort().join(" ") } } function j(a) { return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)") } function k(b, c, d) { a.type(b) != "string" ? a.each(b, d) : b.split(/\s/).forEach(function (a) { d(a, c) }) } function l(a, b) { return a.del && (a.e == "focus" || a.e == "blur") || !!b } function m(a) { return f[a] || a } function n(b, d, e, h, j, n) { var o = g(b), p = c[o] || (c[o] = []); k(d, e, function (c, d) { var e = i(c); e.fn = d, e.sel = h, e.e in f && (d = function (b) { var c = b.relatedTarget; if (!c || c !== this && !a.contains(this, c)) return e.fn.apply(this, arguments) }), e.del = j && j(d, c); var g = e.del || d; e.proxy = function (a) { var c = g.apply(b, [a].concat(a.data)); return c === !1 && (a.preventDefault(), a.stopPropagation()), c }, e.i = p.length, p.push(e), b.addEventListener(m(e.e), e.proxy, l(e, n)) }) } function o(a, b, d, e, f) { var i = g(a); k(b || "", d, function (b, d) { h(a, b, d, e).forEach(function (b) { delete c[i][b.i], a.removeEventListener(m(b.e), b.proxy, l(b, f)) }) }) } function t(b) { var c, d = { originalEvent: b }; for (c in b) !r.test(c) && b[c] !== undefined && (d[c] = b[c]); return a.each(s, function (a, c) { d[a] = function () { return this[c] = p, b[a].apply(b, arguments) }, d[c] = q }), d } function u(a) { if (!("defaultPrevented" in a)) { a.defaultPrevented = !1; var b = a.preventDefault; a.preventDefault = function () { this.defaultPrevented = !0, b.call(this) } } } var b = a.zepto.qsa, c = {}, d = 1, e = {}, f = { mouseenter: "mouseover", mouseleave: "mouseout" }; e.click = e.mousedown = e.mouseup = e.mousemove = "MouseEvents", a.event = { add: n, remove: o }, a.proxy = function (b, c) { if (a.isFunction(b)) { var d = function () { return b.apply(c, arguments) }; return d._zid = g(b), d } if (typeof c == "string") return a.proxy(b[c], b); throw new TypeError("expected function") }, a.fn.bind = function (a, b) { return this.each(function () { n(this, a, b) }) }, a.fn.unbind = function (a, b) { return this.each(function () { o(this, a, b) }) }, a.fn.one = function (a, b) { return this.each(function (c, d) { n(this, a, b, null, function (a, b) { return function () { var c = a.apply(d, arguments); return o(d, b, a), c } }) }) }; var p = function () { return !0 }, q = function () { return !1 }, r = /^([A-Z]|layer[XY]$)/, s = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" }; a.fn.delegate = function (b, c, d) { return this.each(function (e, f) { n(f, c, d, b, function (c) { return function (d) { var e, g = a(d.target).closest(b, f).get(0); if (g) return e = a.extend(t(d), { currentTarget: g, liveFired: f }), c.apply(g, [e].concat([].slice.call(arguments, 1))) } }) }) }, a.fn.undelegate = function (a, b, c) { return this.each(function () { o(this, b, c, a) }) }, a.fn.live = function (b, c) { return a(document.body).delegate(this.selector, b, c), this }, a.fn.die = function (b, c) { return a(document.body).undelegate(this.selector, b, c), this }, a.fn.on = function (b, c, d) { return !c || a.isFunction(c) ? this.bind(b, c || d) : this.delegate(c, b, d) }, a.fn.off = function (b, c, d) { return !c || a.isFunction(c) ? this.unbind(b, c || d) : this.undelegate(c, b, d) }, a.fn.trigger = function (b, c) { if (typeof b == "string" || a.isPlainObject(b)) b = a.Event(b); return u(b), b.data = c, this.each(function () { "dispatchEvent" in this && this.dispatchEvent(b) }) }, a.fn.triggerHandler = function (b, c) { var d, e; return this.each(function (f, g) { d = t(typeof b == "string" ? a.Event(b) : b), d.data = c, d.target = g, a.each(h(g, b.type || b), function (a, b) { e = b.proxy(d); if (d.isImmediatePropagationStopped()) return !1 }) }), e }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (b) { a.fn[b] = function (a) { return a ? this.bind(b, a) : this.trigger(b) } }), ["focus", "blur"].forEach(function (b) { a.fn[b] = function (a) { return a ? this.bind(b, a) : this.each(function () { try { this[b]() } catch (a) { } }), this } }), a.Event = function (a, b) { typeof a != "string" && (b = a, a = b.type); var c = document.createEvent(e[a] || "Events"), d = !0; if (b) for (var f in b) f == "bubbles" ? d = !!b[f] : c[f] = b[f]; return c.initEvent(a, d, !0, null, null, null, null, null, null, null, null, null, null, null, null), c.isDefaultPrevented = function () { return this.defaultPrevented }, c } }(Zepto), function ($) { function triggerAndReturn(a, b, c) { var d = $.Event(b); return $(a).trigger(d, c), !d.defaultPrevented } function triggerGlobal(a, b, c, d) { if (a.global) return triggerAndReturn(b || document, c, d) } function ajaxStart(a) { a.global && $.active++ === 0 && triggerGlobal(a, null, "ajaxStart") } function ajaxStop(a) { a.global && !--$.active && triggerGlobal(a, null, "ajaxStop") } function ajaxBeforeSend(a, b) { var c = b.context; if (b.beforeSend.call(c, a, b) === !1 || triggerGlobal(b, c, "ajaxBeforeSend", [a, b]) === !1) return !1; triggerGlobal(b, c, "ajaxSend", [a, b]) } function ajaxSuccess(a, b, c) { var d = c.context, e = "success"; c.success.call(d, a, e, b), triggerGlobal(c, d, "ajaxSuccess", [b, c, a]), ajaxComplete(e, b, c) } function ajaxError(a, b, c, d) { var e = d.context; d.error.call(e, c, b, a), triggerGlobal(d, e, "ajaxError", [c, d, a]), ajaxComplete(b, c, d) } function ajaxComplete(a, b, c) { var d = c.context; c.complete.call(d, b, a), triggerGlobal(c, d, "ajaxComplete", [b, c]), ajaxStop(c) } function empty() { } function mimeToDataType(a) { return a && (a = a.split(";", 2)[0]), a && (a == htmlType ? "html" : a == jsonType ? "json" : scriptTypeRE.test(a) ? "script" : xmlTypeRE.test(a) && "xml") || "text" } function appendQuery(a, b) { return (a + "&" + b).replace(/[&?]{1,2}/, "?") } function serializeData(a) { a.processData && a.data && $.type(a.data) != "string" && (a.data = $.param(a.data, a.traditional)), a.data && (!a.type || a.type.toUpperCase() == "GET") && (a.url = appendQuery(a.url, a.data)) } function parseArguments(a, b, c, d) { var e = !$.isFunction(b); return { url: a, data: e ? b : undefined, success: e ? $.isFunction(c) ? c : undefined : b, dataType: e ? d || c : c } } function serialize(a, b, c, d) { var e, f = $.isArray(b); $.each(b, function (b, g) { e = $.type(g), d && (b = c ? d : d + "[" + (f ? "" : b) + "]"), !d && f ? a.add(g.name, g.value) : e == "array" || !c && e == "object" ? serialize(a, g, c, b) : a.add(b, g) }) } var jsonpID = 0, document = window.document, key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i, jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/; $.active = 0, $.ajaxJSONP = function (a) { if ("type" in a) { var b = "jsonp" + ++jsonpID, c = document.createElement("script"), d = function () { clearTimeout(g), $(c).remove(), delete window[b] }, e = function (c) { d(); if (!c || c == "timeout") window[b] = empty; ajaxError(null, c || "abort", f, a) }, f = { abort: e }, g; return ajaxBeforeSend(f, a) === !1 ? (e("abort"), !1) : (window[b] = function (b) { d(), ajaxSuccess(b, f, a) }, c.onerror = function () { e("error") }, c.src = a.url.replace(/=\?/, "=" + b), $("head").append(c), a.timeout > 0 && (g = setTimeout(function () { e("timeout") }, a.timeout)), f) } return $.ajax(a) }, $.ajaxSettings = { type: "GET", beforeSend: empty, success: empty, error: empty, complete: empty, context: null, global: !0, xhr: function () { return new window.XMLHttpRequest }, accepts: { script: "text/javascript, application/javascript", json: jsonType, xml: "application/xml, text/xml", html: htmlType, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0 }, $.ajax = function (options) { var settings = $.extend({}, options || {}); for (key in $.ajaxSettings) settings[key] === undefined && (settings[key] = $.ajaxSettings[key]); ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings), settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now())); var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url); if (dataType == "jsonp" || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, "callback=?")), $.ajaxJSONP(settings); var mime = settings.accepts[dataType], baseHeaders = {}, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr(), abortTimeout; settings.crossDomain || (baseHeaders["X-Requested-With"] = "XMLHttpRequest"), mime && (baseHeaders.Accept = mime, mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime)); if (settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") baseHeaders["Content-Type"] = settings.contentType || "application/x-www-form-urlencoded"; settings.headers = $.extend(baseHeaders, settings.headers || {}), xhr.onreadystatechange = function () { if (xhr.readyState == 4) { xhr.onreadystatechange = empty, clearTimeout(abortTimeout); var result, error = !1; if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") { dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type")), result = xhr.responseText; try { dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result)) } catch (e) { error = e } error ? ajaxError(error, "parsererror", xhr, settings) : ajaxSuccess(result, xhr, settings) } else ajaxError(null, xhr.status ? "error" : "abort", xhr, settings) } }; var async = "async" in settings ? settings.async : !0; xhr.open(settings.type, settings.url, async); for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name]); return ajaxBeforeSend(xhr, settings) === !1 ? (xhr.abort(), !1) : (settings.timeout > 0 && (abortTimeout = setTimeout(function () { xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings) }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr) }, $.get = function (a, b, c, d) { return $.ajax(parseArguments.apply(null, arguments)) }, $.post = function (a, b, c, d) { var e = parseArguments.apply(null, arguments); return e.type = "POST", $.ajax(e) }, $.getJSON = function (a, b, c) { var d = parseArguments.apply(null, arguments); return d.dataType = "json", $.ajax(d) }, $.fn.load = function (a, b, c) { if (!this.length) return this; var d = this, e = a.split(/\s/), f, g = parseArguments(a, b, c), h = g.success; return e.length > 1 && (g.url = e[0], f = e[1]), g.success = function (a) { d.html(f ? $("<div>").html(a.replace(rscript, "")).find(f) : a), h && h.apply(d, arguments) }, $.ajax(g), this }; var escape = encodeURIComponent; $.param = function (a, b) { var c = []; return c.add = function (a, b) { this.push(escape(a) + "=" + escape(b)) }, serialize(c, a, b), c.join("&").replace(/%20/g, "+") } }(Zepto), function (a) { a.fn.serializeArray = function () { var b = [], c; return a(Array.prototype.slice.call(this.get(0).elements)).each(function () { c = a(this); var d = c.attr("type"); this.nodeName.toLowerCase() != "fieldset" && !this.disabled && d != "submit" && d != "reset" && d != "button" && (d != "radio" && d != "checkbox" || this.checked) && b.push({ name: c.attr("name"), value: c.val() }) }), b }, a.fn.serialize = function () { var a = []; return this.serializeArray().forEach(function (b) { a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value)) }), a.join("&") }, a.fn.submit = function (b) { if (b) this.bind("submit", b); else if (this.length) { var c = a.Event("submit"); this.eq(0).trigger(c), c.defaultPrevented || this.get(0).submit() } return this } }(Zepto), function (a, b) { function s(a) { return t(a.replace(/([a-z])([A-Z])/, "$1-$2")) } function t(a) { return a.toLowerCase() } function u(a) { return d ? d + a : t(a) } var c = "", d, e, f, g = { Webkit: "webkit", Moz: "", O: "o", ms: "MS" }, h = window.document, i = h.createElement("div"), j = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, k, l, m, n, o, p, q, r = {}; a.each(g, function (a, e) { if (i.style[a + "TransitionProperty"] !== b) return c = "-" + t(a) + "-", d = e, !1 }), k = c + "transform", r[l = c + "transition-property"] = r[m = c + "transition-duration"] = r[n = c + "transition-timing-function"] = r[o = c + "animation-name"] = r[p = c + "animation-duration"] = r[q = c + "animation-timing-function"] = "", a.fx = { off: d === b && i.style.transitionProperty === b, speeds: { _default: 400, fast: 200, slow: 600 }, cssPrefix: c, transitionEnd: u("TransitionEnd"), animationEnd: u("AnimationEnd") }, a.fn.animate = function (b, c, d, e) { return a.isPlainObject(c) && (d = c.easing, e = c.complete, c = c.duration), c && (c = (typeof c == "number" ? c : a.fx.speeds[c] || a.fx.speeds._default) / 1e3), this.anim(b, c, d, e) }, a.fn.anim = function (c, d, e, f) { var g, h = {}, i, t = "", u = this, v, w = a.fx.transitionEnd; d === b && (d = .4), a.fx.off && (d = 0); if (typeof c == "string") h[o] = c, h[p] = d + "s", h[q] = e || "linear", w = a.fx.animationEnd; else { i = []; for (g in c) j.test(g) ? t += g + "(" + c[g] + ") " : (h[g] = c[g], i.push(s(g))); t && (h[k] = t, i.push(k)), d > 0 && typeof c == "object" && (h[l] = i.join(", "), h[m] = d + "s", h[n] = e || "linear") } return v = function (b) { if (typeof b != "undefined") { if (b.target !== b.currentTarget) return; a(b.target).unbind(w, v) } a(this).css(r), f && f.call(this) }, d > 0 && this.bind(w, v), this.size() && this.get(0).clientLeft, this.css(h), d <= 0 && setTimeout(function () { u.each(function () { v.call(this) }) }, 0), this }, i = null }(Zepto)

// md5.js
function hex_md5(string) {
	var rotateLeft = function (lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)) }; var addUnsigned = function (lX, lY) { var lX4, lY4, lX8, lY8, lResult; lX8 = (lX & 2147483648); lY8 = (lY & 2147483648); lX4 = (lX & 1073741824); lY4 = (lY & 1073741824); lResult = (lX & 1073741823) + (lY & 1073741823); if (lX4 & lY4) { return (lResult ^ 2147483648 ^ lX8 ^ lY8) } if (lX4 | lY4) { if (lResult & 1073741824) { return (lResult ^ 3221225472 ^ lX8 ^ lY8) } else { return (lResult ^ 1073741824 ^ lX8 ^ lY8) } } else { return (lResult ^ lX8 ^ lY8) } }; var F = function (x, y, z) { return (x & y) | ((~x) & z) }; var G = function (x, y, z) { return (x & z) | (y & (~z)) }; var H = function (x, y, z) { return (x ^ y ^ z) }; var I = function (x, y, z) { return (y ^ (x | (~z))) }; var FF = function (a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b) }; var GG = function (a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b) }; var HH = function (a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b) }; var II = function (a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b) }; var convertToWordArray = function (string) { var lWordCount; var lMessageLength = string.length; var lNumberOfWordsTempOne = lMessageLength + 8; var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64; var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16; var lWordArray = Array(lNumberOfWords - 1); var lBytePosition = 0; var lByteCount = 0; while (lByteCount < lMessageLength) { lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)); lByteCount++ } lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = lWordArray[lWordCount] | (128 << lBytePosition); lWordArray[lNumberOfWords - 2] = lMessageLength << 3; lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29; return lWordArray }; var wordToHex = function (lValue) { var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount; for (lCount = 0; lCount <= 3; lCount++) { lByte = (lValue >>> (lCount * 8)) & 255; WordToHexValueTemp = "0" + lByte.toString(16); WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2) } return WordToHexValue }; var uTF8Encode = function (string) { string = string.replace(/\x0d\x0a/g, "\x0a"); var output = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { output += String.fromCharCode(c) } else { if ((c > 127) && (c < 2048)) { output += String.fromCharCode((c >> 6) | 192); output += String.fromCharCode((c & 63) | 128) } else { output += String.fromCharCode((c >> 12) | 224); output += String.fromCharCode(((c >> 6) & 63) | 128); output += String.fromCharCode((c & 63) | 128) } } } return output }; var x = Array(); var k, AA, BB, CC, DD, a, b, c, d; var S11 = 7, S12 = 12, S13 = 17, S14 = 22; var S21 = 5, S22 = 9, S23 = 14, S24 = 20; var S31 = 4, S32 = 11, S33 = 16, S34 = 23; var S41 = 6, S42 = 10, S43 = 15, S44 = 21; string = uTF8Encode(string); x = convertToWordArray(string); a = 1732584193; b = 4023233417; c = 2562383102; d = 271733878; for (k = 0; k < x.length; k += 16) {
		AA = a; BB = b; CC = c; DD = d; a = FF(a, b, c, d, x[k + 0], S11, 3614090360); d = FF(d, a, b, c, x[k + 1], S12, 3905402710); c = FF(c, d, a, b, x[k + 2], S13, 606105819); b = FF(b, c, d, a, x[k + 3], S14, 3250441966); a = FF(a, b, c, d, x[k + 4], S11, 4118548399); d = FF(d, a, b, c, x[k + 5], S12, 1200080426); c = FF(c, d, a, b, x[k + 6], S13, 2821735955); b = FF(b, c, d, a, x[k + 7], S14, 4249261313); a = FF(a, b, c, d, x[k + 8], S11, 1770035416); d = FF(d, a, b, c, x[k + 9], S12, 2336552879); c = FF(c, d, a, b, x[k + 10], S13, 4294925233); b = FF(b, c, d, a, x[k + 11], S14, 2304563134); a = FF(a, b, c, d, x[k + 12], S11, 1804603682); d = FF(d, a, b, c, x[k + 13], S12, 4254626195); c = FF(c, d, a, b, x[k + 14], S13, 2792965006); b = FF(b, c, d, a, x[k + 15], S14, 1236535329); a = GG(a, b, c, d, x[k + 1], S21, 4129170786); d = GG(d, a, b, c, x[k + 6], S22, 3225465664); c = GG(c, d, a, b, x[k + 11], S23, 643717713); b = GG(b, c, d, a, x[k + 0], S24, 3921069994); a = GG(a, b, c, d, x[k + 5], S21, 3593408605); d = GG(d, a, b, c, x[k + 10], S22, 38016083); c = GG(c, d, a, b, x[k + 15], S23, 3634488961); b = GG(b, c, d, a, x[k + 4], S24, 3889429448); a = GG(a, b, c, d, x[k + 9], S21, 568446438); d = GG(d, a, b, c, x[k + 14], S22, 3275163606); c = GG(c, d, a, b, x[k + 3], S23, 4107603335); b = GG(b, c, d, a, x[k + 8], S24, 1163531501); a = GG(a, b, c, d, x[k + 13], S21, 2850285829); d = GG(d, a, b, c, x[k + 2], S22, 4243563512); c = GG(c, d, a, b, x[k + 7], S23, 1735328473); b = GG(b, c, d, a, x[k + 12], S24, 2368359562); a = HH(a, b, c, d, x[k + 5], S31, 4294588738); d = HH(d, a, b, c, x[k + 8], S32, 2272392833); c = HH(c, d, a, b, x[k + 11], S33, 1839030562); b = HH(b, c, d, a, x[k + 14], S34, 4259657740); a = HH(a, b, c, d, x[k + 1], S31, 2763975236); d = HH(d, a, b, c, x[k + 4], S32, 1272893353); c = HH(c, d, a, b, x[k + 7], S33, 4139469664); b = HH(b, c, d, a, x[k + 10], S34, 3200236656); a = HH(a, b, c, d, x[k + 13], S31, 681279174); d = HH(d, a, b, c, x[k + 0], S32, 3936430074); c = HH(c, d, a, b, x[k + 3], S33, 3572445317); b = HH(b, c, d, a, x[k + 6], S34, 76029189); a = HH(a, b, c, d, x[k + 9], S31, 3654602809); d = HH(d, a, b, c, x[k + 12], S32, 3873151461); c = HH(c, d, a, b, x[k + 15], S33, 530742520); b = HH(b, c, d, a, x[k + 2], S34, 3299628645); a = II(a, b, c, d, x[k + 0], S41, 4096336452); d = II(d, a, b, c, x[k + 7], S42, 1126891415); c = II(c, d, a, b, x[k + 14], S43, 2878612391); b = II(b, c, d, a, x[k + 5], S44, 4237533241); a = II(a, b, c, d, x[k + 12], S41, 1700485571); d = II(d, a, b, c, x[k + 3], S42, 2399980690); c = II(c, d, a, b, x[k + 10], S43, 4293915773);
		b = II(b, c, d, a, x[k + 1], S44, 2240044497); a = II(a, b, c, d, x[k + 8], S41, 1873313359); d = II(d, a, b, c, x[k + 15], S42, 4264355552); c = II(c, d, a, b, x[k + 6], S43, 2734768916); b = II(b, c, d, a, x[k + 13], S44, 1309151649); a = II(a, b, c, d, x[k + 4], S41, 4149444226); d = II(d, a, b, c, x[k + 11], S42, 3174756917); c = II(c, d, a, b, x[k + 2], S43, 718787259); b = II(b, c, d, a, x[k + 9], S44, 3951481745); a = addUnsigned(a, AA); b = addUnsigned(b, BB); c = addUnsigned(c, CC); d = addUnsigned(d, DD)
	} var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d); return tempValue.toLowerCase()
};

// rem layout
var docEl = document.documentElement, resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
var clientWidth = docEl.clientWidth, rootV = 20, normalV = 375, maxV = 500;
clientWidth = (clientWidth > maxV) ? maxV : clientWidth;
var fontSize = rootV * (clientWidth / normalV);
docEl.style.fontSize = fontSize + 'px';
window.addEventListener(resizeEvt, function () { clientWidth = docEl.clientWidth; docEl.style.fontSize = rootV * (clientWidth / normalV) + 'px'; }, false);

var OpenOrDownload = {
	timeout: undefined,
	config: {
		timeout: 3000
	},
	preventPopup: function () {
		clearTimeout(OpenOrDownload.timeout);
		OpenOrDownload.timeout = null;
		window.removeEventListener("pagehide", OpenOrDownload.preventPopup);
	},
	openclient: function (schemaUrl, downUrl) {
		var startTime = Date.now();
		window.location.replace(schemaUrl);
		var t = setTimeout(function () {
			var endTime = Date.now();
			if (!startTime || endTime - startTime < OpenOrDownload.config.timeout + 200) {
				OpenOrDownload.download(downUrl)
			}
		}, OpenOrDownload.config.timeout);
		window.onblur = function () {
			clearTimeout(t)
		}
	},
	download: function (url) {
		window.location.href = url;
	}
};
// misc util
var misc = {
	getParam: function (key, type) { // 获取?后面的参数
		var type = type || 'search', str, arr;
		switch (type) {
			case 'hash':
				str = location.hash.replace(/^#/, '');
				break;
			case 'search':
				str = location.search.replace(/^\?/, '');
				break;
		}
		if (str == '') {
			return null;
		}
		arr = str.split('&');
		for (var i = 0, l = arr.length, tmp; i < l; i++) {
			tmp = arr[i].split('=');
			if (tmp[0] == key) {
				return tmp[1];
			}
		}
	},
	getParamObj: function (type) { // 获取?后面的参数
		var type = type || 'search', str, arr, oRet = {};
		switch (type) {
			case 'hash':
				str = location.hash.replace(/^#/, '');
				break;
			case 'search':
				str = location.search.replace(/^\?/, '');
				break;
		}
		if (str == '') {
			return oRet;
		}
		arr = str.split('&');
		for (var i = 0, l = arr.length, tmp; i < l; i++) {
			tmp = arr[i].split('=');
			oRet[tmp[0]] = tmp[1];
		}
		return oRet;
	},
	transObj2Url: function (obj) {
		var strArr = [];
		for (var key in obj) {
			if (obj[key]) {
				strArr.push('&', key, '=', obj[key]);
			}
		}
		return strArr.join('').substr(1);
	},
	getId: function () { // 获取路由后面的id
		if (this.id) {
			return this.id;
		}
		var url = location.href, preg = /\/([0-9a-zA-Z]+)($|\?|#)/;
		var matches = url.match(preg);
		if (matches && matches.length) {
			this.id = matches[1];
			return matches[1];
		}
		return '';
	},
	getSortFun: function (order, sortBy) { // 数组里的对象字面量升降序排列，可根据字段或者值
		var ordAlpah = (order == 'asc') ? '>' : '<';
		var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
		return sortFun;
	},
	formatDateTime: function (date, fmt) { //返回格式化时间String（例如：yyyy-MM-dd）
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	formatType: {
		'1': 'yyyy-MM-dd',
		'2': 'M月d日',
		'3': 'yyyy.MM.dd',
		'4': 'yyyy-MM-dd hh:mm'
	},
	formatTime: function (time, type, init) {//格式化时间函数  0元团复用 liming 2017-08-17
		var mGap = 60, hGap = 60 * 60, dGap = 24 * 3600, wGap = 7 * 24 * 3600, str;
		if (init) {
			str = ''
		} else {
			str = '还剩';
		}
		type = type || 1;
		if (type == 1) {//还剩下多少时间
			time = Math.ceil(time / 1000);
			do {
				if (time >= dGap) {
					str += (parseInt(time / dGap, 10) + '天');
					time = time % dGap;
				} else if (time >= hGap) {
					str += (parseInt(time / hGap, 10) + '时');
					time = time % hGap;
				} else if (time >= mGap) {
					str += (parseInt(time / mGap, 10) + '分');
					time = time % mGap;
					if (time == 0) {
						str += '0秒';
						break;
					};
				} else {
					str += (parseInt(time, 10) + '秒');
					break;
				}
				if (time == 0) {
					break;
				};
			} while (true);
		} else if (type == 2) {//发布多长时间
			var temp = time;
			time = new Date().getTime() - time;
			time = Math.ceil(time / 1000);
			if (time < mGap) {
				str = time + '秒前';
			} else if (time < hGap) {
				str = parseInt(time / mGap, 10) + '分钟前';
			} else if (time < dGap) {
				str = parseInt(time / hGap, 10) + '小时前';
			} else if (time < wGap) {
				str = parseInt(time / dGap, 10) + '天前';
			} else {
				str = misc.formatDateTime(new Date(temp), misc.formatType['4'])
				// str = parseInt(time/wGap, 10) + '周前';
			}
		} else if (type == 3) {//购物车，没有小时，只有分钟和秒数
			str = '';
			time = Math.ceil(time / 1000);
			do {
				if (time >= mGap) {
					var t = parseInt(time / mGap, 10);
					if (t < 10) {
						t = '0' + t;
					};
					str += (t + ':');
					time = time % mGap;
					if (time == 0) {
						str += '00';
						break;
					};
				} else {
					t = parseInt(time, 10);
					if (t < 10) {
						t = '0' + t;
					};
					str += t;
					break;
				}
			} while (true);
			var arr = str.split(':');
			if (arr.length == 1) {
				arr.unshift('00');
			}
			str = arr.join(':');
		} else {//烦死了，返回json，自己拼吧
			var result = {};
			str = '';
			time = Math.ceil(time / 1000);
			do {
				if (time >= hGap) {
					t = parseInt(time / hGap, 10);
					if (t < 10) {
						t = '0' + t;
					};
					result.hour = t;
					time = time % hGap;
					if (time == 0) {
						result.minute = '00';
						result.second = '00';
						break;
					};
				} else if (time >= mGap) {
					t = parseInt(time / mGap, 10);
					if (t < 10) {
						t = '0' + t;
					};
					result.minute = t;
					time = time % mGap;
					if (time == 0) {
						result.second = '00';
						break;
					};
				} else {
					t = parseInt(time, 10);
					if (t < 10) {
						t = '0' + t;
					};
					result.second = t;
					break;
				}
			} while (true);
			!result.hour ? (result.hour = '00') : '';
			!result.minute ? (result.minute = '00') : '';
			!result.second ? (result.second = '00') : '';
			return result;
		}
		return str;
	},
	validatePhone: function (phone) { // 验证中国地区手机号
		if (phone.indexOf('86') !== 0) {
			phone = '86' + phone;
		}
		return /^(86)[1][3-8][0-9]{9}$/.test(phone);
	},
	stringToHex: function (str) {
		var len = str.length;
		var arr = new Array(len);
		for (var i = 0; i < len; i++) {
			arr[i] = str.codePointAt(i).toString(16);
		}
		return "" + arr.join("");
	　　},
	hexToString: function (hex) {
		var tmp = '';
		if (hex.length % 2 == 0) {
			for (var i = 0; i < hex.length; i += 2) {
				tmp += '%' + hex.charAt(i) + hex.charAt(i + 1);
			}
		}
		return decodeURIComponent(tmp);
	},
	// 深拷贝
	cloneObj: function (obj) {
		if (typeof (obj) != 'object')
			return obj;
		var re = {};
		if (obj.constructor == Array) re = [];
		for (var i in obj) {
			re[i] = misc.cloneObj(obj[i]);
		}
		return re;
	},
	downloadlinks: {
		"fc1": "https://lnk0.com/10g8g4",
		"fc2": "https://lnk0.com/08QxN9",
		"fc3": "https://lnk0.com/FlIl0c",
		"fc4": "https://lnk0.com/RhQV5o",
		"ztc1": "https://lnk0.com/dg08c4",
		"ztc2": "https://lnk0.com/UBRh4s",
		"ztc3": "https://lnk0.com/5kc0w1",
		"ztc4": "https://lnk0.com/A5koQp",
		"toutiao1": "https://lnk0.com/pIJd4o",
		"toutiao2": "https://lnk0.com/AZZJVd",
		"toutiao3": "https://lnk0.com/0ogY5c",
		"toutiao4": "https://lnk0.com/1U9sso",
		"toutiao5": "https://lnk0.com/YxV9It",
		"sogou1": "https://lnk0.com/g0gE1s",
		"sogou2": "https://lnk0.com/gIps08",
		"sogou3": "https://lnk0.com/ZF5Qd4",
		"sogou4": "https://lnk0.com/FhsAN9",
		"sogou5": "https://lnk0.com/EJVNZp",
		"fst1": "https://lnk0.com/gcoYx9",
		"fst2": "https://lnk0.com/Itk0Ah",
		"fst3": "https://lnk0.com/hQFl40",
		"fst4": "https://lnk0.com/oIpQl0",
		"fst5": "https://lnk0.com/BVpUN9",
		"yyb": "http://a.app.qq.com/o/simple.jsp?pkgname=com.a55haitao.wwht"
	}
};
misc.currency = {
	'USD': '$',
	'CNY': '¥',
	'GBP': '£',
	'JPY': '¥JP',
	'EUR': '€',
	'AUD': '$A',
	'HKD': 'HK$'
};
misc.getByteLen = function (val) {    //传入一个字符串
	var len = 0;
	for (var i = 0; i < val.length; i++) {
		if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
			len += 2; //如果是全角，占用两个字节  如果mysql中某字段是text, 如果设置编码为utf-8,那么一个中文是占3个字节, gbk是两个字节
		else
			len += 1; //半角占用一个字节
	}
	return len;
};
// 公用变量
misc.vars = {
	// LOCAL_ENV: ~window.location.host.indexOf('zhigou.55haitao.com') ? 'prod' : 'dev',
	LOCAL_ENV: window.location.host == 'zhigou.55haitao.com' ? 'prod' : 'dev',
	// base:location.host.indexOf('55haitao')>-1?"../h5/":"../h5/",
	base: location.host.indexOf('55haitao') > -1 ? "../h5/" : "../",
	static: '/static',
	empty: '',
	void: 'javascript:;',
	space: ' ',
	quote: ',',
	active: 'active',
	selected: 'selected',
	disable: 'disable',
	isDebug: true,
	hostCDN: 'https://st-prod.b0.upaiyun.com/',
	hostPath: 'prodimage/',
	defultimg: 'static/images/share/default.png',
	strEnum: { // upaiyun枚举
		'0': '0',
		'1': '1',
		'2': '2',
		'3': '3',
		'4': '4',
		'5': '5',
		'6': '6',
		'7': '7',
		'8': '0',
		'9': '1',
		'a': '2',
		'b': '3',
		'c': '4',
		'd': '5',
		'e': '6',
		'f': '7'
	},
	skuName: { // 商品sku枚举
		'size': '尺码',
		'uk size': '英码',
		'color': '颜色',
		'width': '宽度',
		'height': '高度',
		'length': '长度',
		'chest': '胸围',
		'inseam': '裤长',
		'choice_group': '款式',
		'style': '式样',
		'shade': '阴影',
		'waist': '腰围',
		'band size': '胸围',
		'cup size': '罩杯',
		'customerpackagetype': '包装'
	},
	flag: {
		'意大利': 'ic_flag_italy_wave.png',
		'美国': 'ic_flag_usa_wave.png',
		'德国': 'ic_flag_germany_wave.png',
		'澳大利亚': 'ic_flag_australia_wave.png',
		'加拿大': 'ic_flag_canada_wave.png',
		'中国': 'ic_flag_china_wave.png',
		'法国': 'ic_flag_france_wave.png',
		'香港': 'ic_flag_hk_rect.png',
		'日本': 'ic_flag_japan_wave.png',
		'韩国': 'ic_flag_korea_wave.png',
		'新西兰': 'ic_flag_korea_wave.png',
		'英国': 'ic_flag_uk_wave.png'
	},
	thumb: function (size) { // 获得图片缩略图
		return '!/fh/' + size;
	}
};
// 全站API
misc.api = {
	'post': 'POST',
	// 'base':location.protocol+'//'+location.host+"/api",
	'base': "http://zhigou." + (misc.vars.LOCAL_ENV == "dev" ? "dev." : misc.vars.empty) + "55haitao.com/api",
	'index': 'http://api.55haitao.com/comm/index/entry?key=index&platform=h5',
	'get_verify_code': '55haitao_uc.UserService\/get_verify_code',
	'check_mobile_login': '55haitao_uc.UserService\/check_mcode_login',
	'logout': '55haitao_uc.UserService\/logout_h5',
	'myinfo': '55haitao_uc.UserService\/myinfo',
	'get_user_star_info_counts_v12': '55haitao_sns.SnsAPI\/get_user_star_info_counts_v12',
	'product_detail': "55haitao_sns.ProductAPI\/product_detail",
	'product_RT': "55haitao_sns.ProductAPI\/product_RT",
	'add_cart': "minishop_sns.CartAPI\/add_cart",
	'cart_count': "minishop_sns.CartAPI\/cart_count",
	'order_prepare': "minishop_sns.OrderAPI\/order_prepare",
	'get_translate': "55haitao_sns.ProductAPI\/get_translate_v11",
	'get_default_address': 'minishop_sns.PassportAPI\/get_default_address',
	'add_address': 'minishop_sns.PassportAPI/add_address',
	'update_address': 'minishop_sns.PassportAPI/update_address',
	'address_list': 'minishop_sns.PassportAPI\/address_list',
	'order_commit': 'minishop_sns.OrderAPI\/order_commit_haitao',
	'del_cart': 'minishop_sns.CartAPI\/del_cart',
	'order_list': 'minishop_sns.OrderAPI/order_list_V2',
	'order_cancel': 'minishop_sns.OrderAPI/order_cancel',
	'order_commit_v2': 'minishop_sns.OrderAPI/order_commit_v2',
	'order_detail_v3': 'minishop_sns.OrderAPI/order_detail_v3',
	'order_confirm': 'minishop_sns.OrderAPI\/order_confirm',
	'get_trackInfo': 'minishop_sns.OrderAPI/getTrackInfo',
	'comment_list': '55haitao_sns.SnsAPI\/easyopt_comment_list',
	'easyopt_detail': '55haitao_sns.SnsAPI\/easyopt_detail',
	'click_track': 'minishop_sns.CartAPI/click_track',
	'hot_entry_list_by_idList': '55haitao_sns.HomeAPI\/hot_entry_list_by_idList',
	'receive_couponq': 'minishop_sns.PassportAPI/receive_couponq',
	'collect_special': '55haitao_sns.HomeAPI\/collect_special',
	'product_promotion': '55haitao_sns.HomeAPI\/product_promotion',
	'get_activity_conf': '55haitao_sns.SnsAPI\/get_activity_conf',
	'app_download': '55haitao_sns.OtherAPI\/app_download',
	'get_nologin_verify_code': '55haitao_uc.VerifyService/get_nologin_verify_code',
	'bindByVerifycode': '55haitao_sns.ExtendAPI/bindByVerifycode',
	'bindByPasswd': '55haitao_sns.ExtendAPI/bindByPasswd',
	'get_jssign': '55haitao_sns.ExtendAPI/get_jssign',
	'activity_list': '55haitao_sns.TuanAPI/activity_list',
	'activity_my': '55haitao_sns.TuanAPI/activity_my',
	'activity_tuan_addr': '55haitao_sns.TuanAPI/activity_tuan_addr',
	'activity_start': '55haitao_sns.TuanAPI/activity_start',
	'activity_detail': '55haitao_sns.TuanAPI/activity_detail',
	'activity_join': '55haitao_sns.TuanAPI/activity_join',
	'newMemProducts': '55haitao_sns.OtherAPI/newMemProducts'
};
// 封装ajax
misc.ajax = {
	CDPOST: function (needLogin, api, data, success, error, timeoutfunc) {
		misc.req_cart_count = ~api.indexOf('cart_count')
		misc.netSign(data, api, needLogin);
		return arguments.length >= 5 ? $.ajax({
			url: misc.api.base,
			type: misc.api.post,
			cache: false,
			data: JSON.stringify(data),
			timeout: 10 * 1000,
			complete: function (XMLHttpRequest, status) {
				//超时status还有success,error等值的情况
				if (status == 'timeout') {
					timeoutfunc && timeoutfunc();
				}
			},
			dataType: 'json',
			success: function (res) {
				if (res.code === 0 || res.code === 1407 || res.code === 10015) {
					success && success(res)
				} else if (res.code === -41 || res.code === -40) { // user_token expired
					if (!misc.req_cart_count)
						location.href = misc.vars.base + 'sign';
				} else {
					misc.loadingHide()
					misc.warmTip('ierror', res.msg, 1500);
				}
			},
			error: error
		}) : $.ajax({
			url: misc.api.base,
			cache: false,
			type: misc.api.post,
			data: JSON.stringify(data),
			dataType: 'json'
		});
	}
};

misc.productUrlType = {
	'55haitao://FavorableSpecial/': {
		serverUrl: '55haitao://FavorableSpecial/',
		funcName: "preferentialspecial",
		openUrl: "http://h5.55haitao.com/favorable-special/",
		bridge: 'preferentialspecial'
	},
	'55haitao://ProductSpecial/': {
		serverUrl: '55haitao://ProductSpecial/',
		funcName: "goodspecial",
		openUrl: "http://h5.55haitao.com/product-special/",
		bridge: 'productspecial'
	},
	'55haitao://PostSpecial/': {
		serverUrl: '55haitao://PostSpecial/',
		funcName: "postspecial",
		openUrl: "http://h5.55haitao.com/post-special/",
		bridge: 'postspecial'
	},
	'55haitao://HotTag/': {
		serverUrl: '55haitao://HotTag/',
		funcName: "",
		openUrl: "",
		bridge: ''
	},
	'55haitao://Product/': {
		serverUrl: '55haitao://Product/',
		funcName: "productdetail",
		openUrl: "http://zhigou.55haitao.com/h5/info?id=",
		bridge: 'goodsInfo'
	},
	'55haitao://SellerHome/': {
		serverUrl: '55haitao://SellerHome/',
		funcName: "sellerhome",
		openUrl: "http://h5.55haitao.com/seller/",
		bridge: 'sellerInfo'
	},
	'55haitao://BrandHome/': {
		serverUrl: '55haitao://BrandHome/',
		funcName: "brandhome",
		openUrl: "http://h5.55haitao.com/brand/",
		bridge: 'brandInfo'
	},
	'55haitao://UserCenter/': {
		serverUrl: '55haitao://UserCenter/',
		funcName: "",
		openUrl: "",
		bridge: ''
	}
};
misc.getTypeAndIdBySchemeUri = function (uri) {
	var urlArr = [];
	var uriArr = uri.split('/'),
		value = uriArr[uriArr.length - 1],
		name = uri.replace(value, misc.vars.empty);
	if (~name.indexOf("FavorableSpecial")) {
		// "55haitao://FavorableSpecial/19"
		// http://h5.55haitao.com/favorable-special/19
		urlArr = ['preferentialspecial', value, 'favorable-special'];
	} else if (~name.indexOf("ProductSpecial/")) {
		// "55haitao://ProductSpecial/19"
		// http://h5.55haitao.com/product-special/19
		urlArr = ['productspecial', value, 'product-special'];
	} else if (~name.indexOf("PostSpecial/")) {
		// "55haitao://PostSpecial/19"
		// http://h5.55haitao.com/post-special/19
		urlArr = ['postspecial', value, 'post-special'];
	} else if (~name.indexOf("SellerHome/")) {
		// "55haitao://SellerHome/55haitao://SellerHome/Jomashop"
		urlArr = ['sellerInfo', value];
	} else if (~name.indexOf("BrandHome/")) {
		// "55haitao://BrandHome/55haitao://BrandHome/invicta"
		urlArr = ['brandInfo', value];
	} else if (~name.indexOf("HotTag/")) {
		// "55haitao://HotTag/55haitao://HotTag/14"
		// http://h5.55haitao.com/page/post_tag/14
		urlArr.push('page/post_tag/' + value);
	} else if (~name.indexOf("Product/")) {
		// "55haitao://Product/55haitao://Product/84a0a4e7e245e279ef562da1b0e47d6c"
		// http://zhigou.55haitao.com/h5/info?id=84a0a4e7e245e279ef562da1b0e47d6c
	} else if (~name.indexOf("UserCenter/")) {
		// "55haitao://UserCenter/55haitao://UserCenter/5725"
	}
	return urlArr;
};
misc.getUrlBySchemeUri = function (uri) {
	var urlArr = ["http://", "h5.", misc.vars.LOCAL_ENV == "dev" ? "dev." : misc.vars.empty, "55haitao.com/"];
	var uriArr = uri.split('/'),
		value = uriArr[uriArr.length - 1],
		name = uri.replace(value, misc.vars.empty);
	if (~name.indexOf("FavorableSpecial")) {
		// "55haitao://FavorableSpecial/19"
		// http://h5.55haitao.com/favorable-special/19
		urlArr.push('favorable-special/' + value);
	} else if (~name.indexOf("ProductSpecial/")) {
		// "55haitao://ProductSpecial/19"
		// http://h5.55haitao.com/product-special/19
		urlArr.push('product-special/' + value);
	} else if (~name.indexOf("PostSpecial/")) {
		// "55haitao://PostSpecial/19"
		// http://h5.55haitao.com/post-special/19
		urlArr.push('post-special/' + value);
	} else if (~name.indexOf("SellerHome/")) {
		// "55haitao://SellerHome/55haitao://SellerHome/Jomashop"
		// http://h5.55haitao.com/seller/Jomashop
		urlArr.push('seller/' + value);
	} else if (~name.indexOf("BrandHome/")) {
		// "55haitao://BrandHome/55haitao://BrandHome/invicta"
		// http://h5.55haitao.com/brand/invicta
		urlArr.push('brand/' + value);
	} else if (~name.indexOf("HotTag/")) {
		// "55haitao://HotTag/55haitao://HotTag/14"
		// http://h5.55haitao.com/page/post_tag/14
		urlArr.push('page/post_tag/' + value);
	} else if (~name.indexOf("Product/")) {
		// "55haitao://Product/55haitao://Product/84a0a4e7e245e279ef562da1b0e47d6c"
		// http://zhigou.55haitao.com/h5/info?id=84a0a4e7e245e279ef562da1b0e47d6c
		urlArr[1] = "zhigou.";
		urlArr.push('h5/info?id=' + value);
	} else if (~name.indexOf("UserCenter/")) {
		// "55haitao://UserCenter/55haitao://UserCenter/5725"
	} else {
		// "http://www.baidu.com"
		urlArr = [uri];
	}
	return urlArr.join(misc.vars.empty);
};
misc.redirectiflogin = function (url) {
	if (misc.checkCookie('_tk')) {
		location.href = url;
	} else {
		location.href = misc.vars.base + 'sign';
	}
};
// html模板
misc.template = {
	loading: function (text) {
		// return [
		// 		'<img class="loading loading1" src="',misc.vars.static,'/images/share/loading1.gif" />'
		// 	].join(misc.vars.empty);
		return [
			'<div class="loading loading1" style="', (text ? "margin-top:-2.675rem" : misc.vars.empty), '">',
			'<img src="', misc.vars.static, '/images/share/loading1.gif" />',
			text ? '<div>' + text + '</div>' : misc.vars.empty,
			'</div>'].join(misc.vars.empty);
	},
	loading2: function (style) {
		return ['<img class="loading loading2" style="', style, '" src="', misc.vars.static, '/images/share/loading2.gif" />'].join(misc.vars.empty);
	},
	warmTip: function (status, text) {
		return [
			'<div class="warm-tip">',
			'<i class="icon ', status, '"></i>',
			'<div class="text">', text, '</div>',
			'</div>'
		].join(misc.vars.empty);
	},
	bottomTabs: function (pathname) {
		return [
			'<div class="fixedd-bottom maxWidth">',
			'<div class="thin-border"></div>',
			'<div class="box">',
			'<div class="tab ', (pathname == "/index" || pathname == "/" ? misc.vars.active : misc.vars.empty), '" onclick="location.href=\'' + misc.vars.base + 'index\'">',
			'<i class="icon ihome"></i>',
			'<div>首页</div>',
			'</div>',
			'<div class="tab ', (pathname == "/cart" ? misc.vars.active : misc.vars.empty), '" onclick="misc.redirectiflogin(\'' + misc.vars.base + 'cart\');">',
			'<i class="icon icartt"></i>',
			'<div>购物车</div>',
			'</div>',
			'<div class="tab ', (pathname == "/my" ? misc.vars.active : misc.vars.empty), '" onclick="location.href=\'' + misc.vars.base + 'my\'">',
			'<i class="icon iuser"></i>',
			'<div>我的</div>',
			'</div>',
			'</div>',
			'</div>'
		].join(misc.vars.empty)
	},
	shareFixedTop: function () {
		return [
			'<div class="fixed-top maxWidth j_fixed_top">',
			'<a id="btnOpenApp" class="btn">立即打开</a>',
			'<div class="iclose"><i class="icon"></i></div>',
			'<i class="icon iapp"></i>',
			'<div class="text">',
			'<div class="name">新人立领1080元海淘大礼包</div>',
			'<div class="desc">官网直购 · 实时同价 · 一键海淘</div>',
			'</div>',
			'</div>',
			'<div class="fixed-top-gap j_fixed_top"></div>'
		].join(misc.vars.empty)
	}
};
misc.func = {
	clicktrack: function (req, succ, fail) {
		misc.ajax.CDPOST(0, misc.api.click_track, req, succ, fail);
	}
};
// 获得浏览器版本
misc.browser = {
	_ua: navigator.userAgent,
	isWeiXin: function () {
		var ua = this._ua.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		}
		else {
			return false;
		}
	},
	isAndroid: function () {
		var regular_result = this._ua.match(/(Android)\s+([\d.]+)/),
			os_boolean = !!regular_result;
		if (!this._version_value && os_boolean) {
			this._version_value = regular_result[2];
		}
		this.android = function () { return os_boolean; };
		return os_boolean;
	},
	isIOS: function () {
		var regular_result = this._ua.match(/.*OS\s([\d_]+)/),
			os_boolean = !!regular_result;
		if (!this._version_value && os_boolean) {
			this._version_value = regular_result[1].replace(/_/g, '.');
		}
		this.ios = function () { return os_boolean; };
		return os_boolean;
	}
};
// js桥接app
misc.bridge = {
	isapp: function () {
		if (misc.browser.isWeiXin())
			return null;
		if (window.webkit)
			return 'ios';
		else if (window.AppModel)
			return 'android'
		else
			return null;
	},
	ios: {
		postMsg: function (param) {
			window.webkit.messageHandlers.AppModel.postMessage(param);
		},
		goodsInfo: function (spuid) {//商品详情
			misc.bridge.ios.postMsg({ type: 0, spuid: spuid });
		},
		sellerInfo: function (name) {//商家专栏
			misc.bridge.ios.postMsg({ type: 1, data: { type: 1, name: name, imgCover: '', logo: '' } });
		},
		brandInfo: function (name) {//品牌专栏
			misc.bridge.ios.postMsg({ type: 1, data: { type: 0, name: name, imgCover: '', logo: '' } });
		},
		couponList: function () {//优惠券列表
			misc.bridge.ios.postMsg({ type: 2 });
		},
		setTitle: function (title) {//设置标题
			misc.bridge.ios.postMsg({ type: 3, title: title });
		},
		topLR: function (left, right1, right2) {//左右侧按钮
			misc.bridge.ios.postMsg({ type: 4, l: left, r1: right1, r2: right2 });
			/*
			    // 没有按钮（null）
			    NavBarType_Null = 0,
			    // 添加好友
			    NavBarType_AddFriend = 4,
			    // 返回
			    NavBarType_Back = 2,
			    // 相机
			    NavBarType_Camera = 7,
			    // 购物车
			    NavBarType_Cart = 3,
			    // 更多
			    NavBarType_More = 6,
			    // 发帖
			    NavBarType_PO = 10,
			    // 查找
			    NavBarType_Search = 5,
			    // 设置
			    NavBarType_Setting = 9,
			    // 分享
			    NavBarType_Share = 8,
			    // 客服
			    NavBarType_Service = 11,
			    // 文本
			    NavBarType_Text = 1,
			*/
		},
		setShareModel: function (title, icon, desc, url, amount, canEarnMemberShipPoint, alert_title, alert_desc) {//调用分享弹窗
			title = title || misc.vars.empty;
			icon = icon || misc.vars.empty;
			desc = desc || misc.vars.empty;
			url = url || misc.vars.empty;
			alert_desc = alert_desc || misc.vars.empty;
			alert_title = alert_title || misc.vars.empty;
			amount = amount || 0.0;
			canEarnMemberShipPoint = canEarnMemberShipPoint || 1;
			misc.bridge.ios.postMsg({ type: 5, title: title, icon: icon, desc: desc, url: url, alert_desc: alert_desc, alert_title: alert_title, amount: amount, canEarnMemberShipPoint: canEarnMemberShipPoint });
		},
		setShareZero: function (type, title, icon, desc, url, dialogMain, dialogSub) {//调用分享弹窗
			var param = {
				type: type,
				title: title || misc.vars.empty,
				icon: icon || misc.vars.empty,
				desc: desc || misc.vars.empty,
				url: url || misc.vars.empty,
				dialogMain: dialogMain,
				dialogSub: dialogSub
			}
			misc.bridge.ios.postMsg(param);
		},
		loadingImg: function () {//加载/停止加载动画
			misc.bridge.ios.postMsg({ type: 6, start: 1, message: '' });
		},
		dialogMsg: function (message) {//弹窗t
			misc.bridge.ios.postMsg({ type: 7, alerttype: 10, message: message });
		},
		pageSign: function (src, activityID) {//直接弹出登录
			misc.bridge.ios.postMsg({
				type: 8,
				src: src,
				aid: activityID
			});
		},
		pageSignOver: function () {//过期弹出登录框
			misc.bridge.ios.postMsg({ type: 9 });
		},
		pageSignOut: function () {//被人踢弹出登录
			misc.bridge.ios.postMsg({ type: 10 });
		},
		urlh5: function (url) {//打开一个url页面
			misc.bridge.ios.postMsg({ type: 11, url: url });
		},
		preferentialspecial: function (special_id) {//特惠专题 官网特卖-双列
			misc.bridge.ios.postMsg({ type: 12, special_id: special_id });
		},
		productspecial: function (special_id) {//商品专题 潮流风尚-单列
			misc.bridge.ios.postMsg({ type: 13, special_id: special_id });
		},
		postspecial: function (special_id) {//社区专题 潮流风尚-单列
			misc.bridge.ios.postMsg({ type: 14, special_id: special_id });
		},
		urlfilter: function (url) {//还原多条件筛选
			var msg = { type: 15, query: "", brand: "", seller: "", category: "" };
			var urlArr = url.split("/_");
			var paramArr = urlArr[urlArr.length - 1].split("?&");
			urlArr[urlArr.length - 1] = paramArr[0];
			msg.query = paramArr[paramArr.length - 1].replace("query=", "");
			msg.query = decodeURIComponent(msg.query);
			urlArr.map(function (d) {
				d = "_" + d;
				if (~d.indexOf("_c"))
					msg.category = misc.hexToString(d.substring(2));
				else if (~d.indexOf("_b"))
					msg.brand = misc.hexToString(d.substring(2));
				else if (~d.indexOf("_s"))
					msg.seller = misc.hexToString(d.substring(2));
			});
			misc.bridge.ios.postMsg(msg);
		},
		albumdetail: function (album_id) {
			misc.bridge.ios.postMsg({ type: 16, album_id: album_id });
		}
	},
	android: {
		postMsg: function (param) {
			window.AppModel && window.AppModel.postMessage(JSON.stringify(param));
		},
		goodsInfo: function (spuid) {//商品详情
			var param = {
				type: 0,
				spuid: spuid
			};
			misc.bridge.android.postMsg(param);
		},
		sellerInfo: function (name) {//商家专栏
			var inData = {
				type: 1,
				name: name,
				imgCover: '',
				logo: ''
			};
			var param = {
				type: 1,
				data: inData
			};
			misc.bridge.android.postMsg(param);
		},
		brandInfo: function (name) {//品牌专栏
			var inData = {
				type: 0,
				name: name,
				imgCover: '',
				logo: ''
			};
			var param = {
				type: 1,
				data: inData
			};
			misc.bridge.android.postMsg(param);
		},
		couponList: function () {//优惠券列表
			var param = {
				type: 2
			};
			misc.bridge.android.postMsg(param);
		},
		setTitle: function (title) {//设置标题
			var param = {
				type: 3,
				title: title
			};
			misc.bridge.android.postMsg(param);
		},
		topLR: function (left, right1, right2) {//左右侧按钮
			var param = {
				type: 4,
				l: left,
				r1: right1,
				r2: right2,
				r1txt: '',
				r2txt: ''
			};
			misc.bridge.android.postMsg(param);
		},
		setShareModel: function (title, icon, desc, url, amount, canEarnMemberShipPoint, alert_title, alert_desc) {
			var param = {
				type: 5,
				title: title,
				desc: desc,
				alert_title: alert_title,
				alert_desc: alert_desc,
				icon: icon,
				url: url,
				amount: amount,
				canEarnMemberShipPoint: canEarnMemberShipPoint
			};
			misc.bridge.android.postMsg(param);
		},
		setShareAndroid: function (title, icon, desc, url, amount, canEarnMemberShipPoint, alert_title, alert_desc) {
			var param = {
				type: 17,
				title: title,
				desc: desc,
				alert_title: alert_title,
				alert_desc: alert_desc,
				icon: icon,
				url: url,
				amount: amount,
				canEarnMemberShipPoint: canEarnMemberShipPoint
			};
			misc.bridge.android.postMsg(param);
		},
		loadingImg: function (start, message) {//加载/停止加载动画
			var inData = {
				start: start,
				message: message
			}
			var param = {
				type: 6,
				data: inData
			};
			misc.bridge.android.postMsg(param);
		},
		dialogMsg: function (message, type) {//弹窗
			var inData = {
				type: type,
				message: message
			}
			var param = {
				type: 7,
				data: inData
			};
			misc.bridge.android.postMsg(param);
		},
		pageSign: function (src, activityID) {//直接弹出登录
			var param = {
				type: 8,
				src: src,
				aid: activityID
			};
			misc.bridge.android.postMsg(param);
		},
		pageSignOver: function () {//过期弹出登录框
			var param = {
				type: 9
			};
			misc.bridge.android.postMsg(param);
		},
		pageSignOut: function () {//被人踢弹出登录
			var param = {
				type: 10
			};
			misc.bridge.android.postMsg(param);
		},
		urlh5: function (url, title) {//打开一个url页面
			var param = {
				type: 11,
				url: url,
				title: title
			};
			misc.bridge.android.postMsg(param);
		},
		preferentialspecial: function (special_id) {//特惠专题 官网特卖-双列
			var param = {
				type: 12,
				special_id: special_id
			};
			misc.bridge.android.postMsg(param);
		},
		productspecial: function (special_id) {//商品专题 潮流风尚-单列
			var param = {
				type: 13,
				special_id: special_id,

				special_name: ''
			};
			misc.bridge.android.postMsg(param);
		},
		postspecial: function (special_id) {//社区专题 潮流风尚-单列
			var param = {
				type: 14,
				special_id: special_id,
				special_name: ''
			};
			misc.bridge.android.postMsg(param);
		},
		urlfilter: function (url) {//还原多条件筛选
			var msg = {
				type: 15,
				query: "",
				brand: "",
				seller: "",
				category: ""
			};
			var urlArr = url.split("/_");
			var paramArr = urlArr[urlArr.length - 1].split("?&");
			urlArr[urlArr.length - 1] = paramArr[0];
			msg.query = paramArr[paramArr.length - 1].replace("query=", "");
			msg.query = decodeURIComponent(msg.query);
			urlArr.map(function (d) {
				d = "_" + d;
				if (~d.indexOf("_c"))
					msg.category = misc.hexToString(d.substring(2));
				else if (~d.indexOf("_b"))
					msg.brand = misc.hexToString(d.substring(2));
				else if (~d.indexOf("_s"))
					msg.seller = misc.hexToString(d.substring(2));
			});
			misc.bridge.android.postMsg(msg);
		},
		albumdetail: function (album_id) {
			var param = {
				type: 16,
				album_id: album_id
			};
			misc.bridge.android.postMsg(param);
		}
	}
};
// browser open app
misc.openapp = {};
misc.openapp.schem = "new55haitao://";
misc.openapp.ios = {
	urlh5: function (url) {
		return misc.openapp.schem + "h5/" + url;
	},
	tab: function (idx) {
		return misc.openapp.schem + "tab/" + idx;
	},
	productdetail: function (spuid) {
		return misc.openapp.schem + "productdetail/" + spuid;
	},
	postdetail: function (id) {
		return misc.openapp.schem + "postdetail/" + id;
	},
	productspecial: function (id) {
		return misc.openapp.schem + "productspecial/" + id;
	},
	postspecial: function (id) {
		return misc.openapp.schem + "productspecial/" + id;
	},
	preferentialspecial: function (id) {
		return misc.openapp.schem + "preferentialspecial/" + id;
	},
	sellerhome: function (seller) {
		return misc.openapp.schem + "sellerhome/" + seller;
	},
	brandhome: function (brand) {
		return misc.openapp.schem + "brandhome/" + brand;
	},
	searchresult: function (url) {//还原多条件筛选
		var msg = { query: "", brand: "", seller: "", category: "" };
		var urlArr = url.split("/_");
		var paramArr = urlArr[urlArr.length - 1].split("?&");
		urlArr[urlArr.length - 1] = paramArr[0];
		msg.query = paramArr[paramArr.length - 1].replace("query=", "");
		msg.query = decodeURIComponent(msg.query);
		urlArr.map(function (d) {
			d = "_" + d;
			if (~d.indexOf("_c"))
				msg.category = misc.hexToString(d.substring(2));
			else if (~d.indexOf("_b"))
				msg.brand = misc.hexToString(d.substring(2));
			else if (~d.indexOf("_s"))
				msg.seller = misc.hexToString(d.substring(2));
		});
		return [misc.openapp.schem, "searchresult/", msg.query, "/", msg.brand, "/", msg.seller, "/", msg.category].join(misc.vars.empty);
	},
	hottagpostlist: function (tag_id, tag_name) {
		return [misc.openapp.schem, "hottagpostlist/", tag_id, "/", tag_name].join(misc.vars.empty);
	},
	albumdetail: function (album_id) {
		return [misc.openapp.schem, "albumdetail/", album_id].join(misc.vars.empty);
	}
};
misc.openapp.android = {
	urlh5: function (url) {
		return misc.openapp.schem + "h5?url=" + url;
	},
	tab: function (idx) {
		return misc.openapp.schem + "tab?index=" + idx;
	},
	productdetail: function (spuid) {
		return misc.openapp.schem + "productdetail?id=" + spuid;
	},
	postdetail: function (id) {
		return misc.openapp.schem + "postdetail?id=" + id;
	},
	productspecial: function (id) {
		return misc.openapp.schem + "productspecial?id=" + id;
	},
	postspecial: function (id) {
		return misc.openapp.schem + "postspecial?id=" + id;
	},
	preferentialspecial: function (id) {
		return misc.openapp.schem + "preferentialspecial?id=" + id;
	},
	sellerhome: function (seller) {
		return misc.openapp.schem + "sellerhome?name=" + seller;
	},
	brandhome: function (brand) {
		return misc.openapp.schem + "brandhome?name=" + brand;
	},
	searchresult: function (url) {
		var msg = { query: "", brand: "", seller: "", category: "" };
		var urlArr = url.split("/_");
		var paramArr = urlArr[urlArr.length - 1].split("?&");
		urlArr[urlArr.length - 1] = paramArr[0];
		msg.query = paramArr[paramArr.length - 1].replace("query=", "");
		msg.query = decodeURIComponent(msg.query);
		urlArr.map(function (d) {
			d = "_" + d;
			if (~d.indexOf("_c"))
				msg.category = misc.hexToString(d.substring(2));
			else if (~d.indexOf("_b"))
				msg.brand = misc.hexToString(d.substring(2));
			else if (~d.indexOf("_s"))
				msg.seller = misc.hexToString(d.substring(2));
		});
		return [misc.openapp.schem, "searchresult?query=", msg.query, "&brand=", msg.brand, "&seller=", msg.seller, "&category=", msg.category].join(misc.vars.empty);
	},
	hottagpostlist: function (tag_id, tag_name) {
		return [misc.openapp.schem, "hottagpostlist?tag_id=", tag_id, "&tag_name=", tag_name].join(misc.vars.empty);
	},
	albumdetail: function (album_id) {
		return [misc.openapp.schem, "albumdetail?album_id=", album_id].join(misc.vars.empty);
	}
};

misc.setCookie = function (name, value, days) {
	days = days || 1;
	var exp = new Date();
	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=.55haitao.com";
};
misc.getCookie = function (name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
};
misc.clearCookie = function (name) {
	misc.setCookie(name, "", -1);
};
misc.checkCookie = function (name) {
	var val = misc.getCookie(name)
	return val && val !== "null";
};
// 百度统计
misc.baiduStats = function () {
	var _hmt = _hmt || [];
	(function () {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?a8266aa641394b80dfacc36af7454f90";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
};
// 魔窗打开APP
misc.magicWindow = function () {
	var _hmt = _hmt || [];
	(function () {
		var hm = document.createElement("script");
		hm.src = "https://static.mlinks.cc/scripts/dist/mlink.min.js";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
};
// 加载loading图
misc.loading = function (text) {
	$('.loading').remove()
	$('body').append(misc.template.loading(text));
};
// 移除loading图
misc.loadingHide = function (selector) {
	var loadingobj = $(selector || '.loading1');
	loadingobj.length && loadingobj.remove();
};

// 结果提示，温馨提示 status in ["ibingo","ierror",600]
misc.warmTip = function (status, text, time) {
	$('.warm-tip').remove()
	var $warmTip = $(misc.template.warmTip(status, text))
	$('body').append($warmTip)
	$warmTip.css({
		'visibility': 'visible'
	})
	time = time ? time : 700
	setTimeout(function () {
		$warmTip.hide()
	}, time)
};
// 原图地址转upaiyun图地址
misc.getImgUrlCDN = function (img_url, size) {
	var hash = hex_md5(img_url || '');
	return [misc.vars.hostCDN, misc.vars.hostPath, misc.vars.strEnum[hash.substring(0, 1)], hash.substring(1, hash.length / 2), '.jpg', size].join('');
};
// 价格分转化为元
misc.centToYuan = function (cent) {
	return Math.round(0.01 * cent);
};
// 获取用户IP地址
misc.initIP = function () {
	var _hmt = _hmt || [];
	(function () {
		var hm = document.createElement("script");
		hm.src = "http://pv.sohu.com/cityjson?ie=utf-8";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
};
misc.getIP = function () {
	if (typeof returnCitySN == 'undefined') {
		return Math.random().toString(36).substr(2);
	}
	return returnCitySN['cip'];
};
//获取设备id
misc.getDeviceID = function () {
	var ipID = misc.getIP();
	return hex_md5(ipID) + Math.floor(Date.now() * 0.001);
};
// 调接口网关签名
misc.netSign = function (netData, netCmd, loginNeeded) {
	// if(netData && netData._tk){
	//  delete(netData['_tk']);
	// }
	var tokenID = misc.checkCookie('_tk') ? misc.getCookie('_tk').replace(/"/g, "") : undefined;
	var salt;
	if (loginNeeded) {
		if (!tokenID) {
			misc.warmTip('ierror', '请先登录账号');
			setTimeout(function () {
				location.href = misc.vars.base + 'sign';
			}, 700);
			return;
		}
		salt = tokenID;
		netData._tk = tokenID;
	} else {
		salt = "55haitao.com.device";
	}
	var deviceID = misc.getDeviceID();
	netData._aid = 1001;
	netData._chl = "";
	netData._did = deviceID;
	netData._cid = deviceID + Date.now();
	netData._mt = netCmd;
	netData._pl = 'h5';
	netData._test = this.vars.isDebug;
	netData._sm = "MD5";
	netData._vc = "1.4";

	var keyArr = [];
	for (var key in netData) {
		keyArr.push(key);
	}
	keyArr.sort();
	var rawStr = '';
	keyArr.forEach(function (iKey) {
		var value = netData[iKey];
		if (iKey == '_test') {
			value = +value;
		}
		if (iKey != '_sig') {
			rawStr += "&" + iKey + "=" + value;
		}

	});
	rawStr = rawStr.substring(1);
	// console.log(rawStr+salt)
	netData._sig = hex_md5(rawStr + salt);
	netData._tk = tokenID;
};
misc.renderBottomTabs = function () {
	var router = {
		"/my": misc.vars.empty,
		"/": misc.vars.empty,
		"/index": misc.vars.empty
	};
	if (router.hasOwnProperty(misc.pathmame)) {
		$(misc.template.bottomTabs(misc.pathmame)).insertAfter($('.outwrap'));
	}
};
misc.lazyLoad = function () {
	$('img').each(function (i, v) {
		if ($(v).attr('data-url')) {
			var imageUrl = misc.getImgUrlCDN($(v).attr('data-url'), misc.vars.thumb(90));
			$(v).attr('src', imageUrl);
		}
	});
};
misc.getTrackParams = function (param) {
	var arr = [];
	for (var i in param) {
		param[i] && arr.push(["&", i, "=", param[i]].join(misc.vars.empty));
	}
	return arr.join(misc.vars.empty);
};
misc.isLinkhaitao = function () {
	return misc.getCookie('aff') == 'linkhaitao';
};
var jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
var shareTextObj = {}
function shareTextObjSetting(title, imgUrl, desc) {
	shareTextObj = $.extend(shareTextObj, {
		link: location.href, // 分享URL
		title: title, // 分享标题
		imgUrl: imgUrl, // 分享图标
		desc: desc // 分享描述
	})
}
function loadWeixin() {
	wx.ready(function () {
		wx.checkJsApi({
			jsApiList: jsApiList,
			success: function (res) {
				if (res && res.checkResult) {
					for (var i in res.checkResult) {
						if (res.checkResult[i]) {
							wx[i](shareTextObj)
						}
					}
				}
			}
		})
	})
	wx.error(function () {

	})
}

$(document).ready(function () {
	window.lk_siteid = misc.getParam('siteid');
	window.lk_aff = misc.getParam('aff');
	window.lk_trackid = misc.getParam('trackid');
	window.lk_to = misc.getParam('to');
	lk_siteid && misc.setCookie('siteid', lk_siteid, 30);
	lk_aff && misc.setCookie('aff', lk_aff, 30);
	lk_trackid && misc.setCookie('trackid', lk_trackid, 30);
	lk_to && misc.setCookie('to', lk_to, 30);

	FastClick.attach(document.body);
	misc.pathmame = location.pathname.replace('/h5', '');
	if (misc.pathmame.indexOf('/activities') == -1) {
		misc.initIP();
		misc.renderBottomTabs();
	}
	misc.baiduStats();
	misc.magicWindow();

	if (
		~misc.pathmame.indexOf("collect")
		|| ~misc.pathmame.indexOf("activities")
		|| ~misc.pathmame.indexOf("info")
		|| ~misc.pathmame.indexOf("index")
		|| ~misc.pathmame.indexOf('tuanopen')
		|| misc.pathmame == "/"
	) {
		misc.ajax.CDPOST(0, misc.api.get_jssign, {
			"url": window.location.href.split('#')[0]
		}, function (res) {
			_config = {}
			_config["timestamp"] = res.data["timestamp"]
			_config["nonceStr"] = res.data["noncestr"]
			_config["signature"] = res.data["signature"]
			_config["debug"] = false
			_config["appId"] = "wx7e969b3f8dc2e674"
			_config["jsApiList"] = jsApiList
			wx.config(_config)
		}, function (err) {

		})
	}
});
