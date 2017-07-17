// 注释的地方是所做的修改
// Author: Martin.Zeng
export default (function(root, factory) {
	if (typeof define === "function" && define.amd) {
		// define(function() {
		// 	return factory(root)
		// })
		define('echo',function() {
			return factory(root)
		})
		return require('echo')
	} else {
		if (typeof exports === "object") {
			module.exports = factory
		} else {
			root.echo = factory(root)
		}
	}
})(window, function(root) {
// })(this, function(root) {
	var echo = {};
	var callback = function() {};
	var offset, poll, delay, useDebounce, unload;
	var isHidden = function(element) {
			return (element.offsetParent === null)
		};
	var inView = function(element, view) {
			if (isHidden(element)) {
				return false
			}
			var box = element.getBoundingClientRect();
			return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b)
		};
	var debounceOrThrottle = function() {
			if (!useDebounce && !! poll) {
				return
			}
			clearTimeout(poll);
			poll = setTimeout(function() {
				echo.render();
				poll = null
			}, delay)
		};
	// 处理加载成功，加载失败的情况
	echo.doImage = function(imgUrl, index, loadSucc, loadFail, imgOrigin) {
		var newImg = new Image();
		newImg.onload = loadSucc;
		newImg.onerror = function(data) {
			loadFail && loadFail(data, imgOrigin)
		};
		newImg.src = imgUrl;
		newImg.alt = index
	};
	echo.init = function(opts) {
		opts = opts || {};
		var offsetAll = opts.offset || 0;
		var offsetVertical = opts.offsetVertical || offsetAll;
		var offsetHorizontal = opts.offsetHorizontal || offsetAll;
		var optionToInt = function(opt, fallback) {
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
		unload = !! opts.unload;
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
	echo.render = function() {
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
					echo.doImage(elem.getAttribute("data-echo-background"), i, function(data) {
						nodes[parseInt(data.target.alt)].style.backgroundImage = "url(" + data.target.src + ")"
					}, function(data, imgOrigin) {
						var secondImg = new Image();
						secondImg.onload = function(data) {
							nodes[parseInt(data.target.alt)].style.backgroundImage = "url(" + data.target.src + ")"
						};
						secondImg.onerror = function(data) {
							nodes[parseInt(data.target.alt)].style.backgroundImage = "url(" + misc.vars.base + misc.vars.defultimg + ")"
						};
						secondImg.src = imgOrigin;
						secondImg.alt = data.target.alt
					}, elem.getAttribute("data-origin"))
				} else {
					echo.doImage(elem.getAttribute("data-echo"), i, function(data) {
						nodes[parseInt(data.target.alt)].src = data.target.src
					}, function(data, imgOrigin) {
						var secondImg = new Image();
						secondImg.onload = function(data) {
							nodes[parseInt(data.target.alt)].src = data.target.src
						};
						secondImg.onerror = function(data) {
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
				if (unload && !! (src = elem.getAttribute("data-echo-placeholder"))) {
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
	echo.detach = function() {
		if (document.removeEventListener) {
			root.removeEventListener("scroll", debounceOrThrottle)
		} else {
			root.detachEvent("onscroll", debounceOrThrottle)
		}
		clearTimeout(poll)
	};
	return echo
});
