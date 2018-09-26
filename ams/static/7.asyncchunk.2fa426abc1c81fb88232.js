webpackJsonp([7],{291:function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _util = __webpack_require__(330);\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar initStateResponse = initState();\nvar API_PAGE = APIS.API_TOUR_SHOP_LIST;\nvar FETCH_PAGE = TYPES.FETCH_TOUR_SHOP_LIST;\n\nvar Index = function (_Quyou) {\n    _inherits(Index, _Quyou);\n\n    function Index() {\n        var _ref;\n\n        var _temp, _this, _ret;\n\n        _classCallCheck(this, Index);\n\n        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n        }\n\n        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.limit = 30, _this.state = _defineProperty({}, FETCH_PAGE, {\n            response: initStateResponse,\n            filteridsShowOptions: false\n        }), _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(Index, [{\n        key: "renderContent",\n        value: function renderContent() {\n            // document.title=\'精品酒店\'\n            var me = this;\n            var _me$state$FETCH_PAGE = me.state[FETCH_PAGE],\n                fetching = _me$state$FETCH_PAGE.fetching,\n                _me$state$FETCH_PAGE$ = _me$state$FETCH_PAGE.response,\n                response = _me$state$FETCH_PAGE$ === undefined ? initStateResponse : _me$state$FETCH_PAGE$;\n            var filterids = me.filterids;\n            var filteridsShowOptions = me.state.filteridsShowOptions;\n            var _me$props$location$qu = me.props.location.query.filterid,\n                filterid = _me$props$location$qu === undefined ? 0 : _me$props$location$qu;\n\n            filterid = Number(filterid);\n            return React.createElement(\n                "div",\n                { className: "food-hot hotel-hot trip-hot" },\n                React.createElement(\n                    "div",\n                    null,\n                    React.createElement(SearchInput, { me: me, handleSearch: me.handleSearch.bind(me), placeholder: \'搜索建筑物名称\' })\n                ),\n                React.createElement(\n                    "div",\n                    null,\n                    React.createElement(SelectBox, { showOptions: filteridsShowOptions, options: filterids, optionId: filterid, type: \'filterids\', handleSelectBoxChage: me.handleSelectBoxChage.bind(me), handleSelectBoxChageColumn: me.handleSelectBoxChageColumn.bind(me, \'filterids\') })\n                ),\n                fetching ? React.createElement(Spin, null) : React.createElement(List, { response: response, me: me })\n            );\n        }\n    }, {\n        key: "handleSelectBoxChageColumn",\n        value: function handleSelectBoxChageColumn(type) {\n            var temp = type + "ShowOptions";\n            // console.log(\'temp\',temp)\n            var nextState = _defineProperty({}, temp, !this.state[temp]);\n            if (type === \'tags\') {\n                nextState[\'filteridsShowOptions\'] = false;\n            } else if (type === \'filterids\') {\n                nextState[\'tagsShowOptions\'] = false;\n            }\n            this.setState(nextState);\n        }\n    }, {\n        key: "handleSelectBoxChage",\n        value: function handleSelectBoxChage(_ref2) {\n            var _ref2$type = _ref2.type,\n                type = _ref2$type === undefined ? \'\' : _ref2$type,\n                _ref2$option = _ref2.option,\n                option = _ref2$option === undefined ? {} : _ref2$option;\n\n            var me = this;\n            console.log(\'type\', type);\n            console.log(\'option\', option);\n            var query = me.props.location.query;\n\n            if (type === \'tags\') {\n                if (option.id) {\n                    query[\'tag\'] = option.id;\n                } else {\n                    delete query[\'tag\'];\n                }\n            } else if (type === \'filterids\') {\n                if (option.id) {\n                    query[\'filterid\'] = option.id;\n                    query[\'filter\'] = encodeURIComponent(option.title);\n                } else {\n                    delete query[\'filter\'];\n                    delete query[\'filterid\'];\n                }\n            }\n            me.openPage("/buildinghot" + me.getRequestParam(query));\n        }\n    }, {\n        key: "componentWillReceiveProps",\n        value: function componentWillReceiveProps(nextProps) {\n            var me = this;\n            _location = nextProps.location;\n            me.page = 0;\n            me.requestList(me, FETCH_PAGE, API_PAGE);\n        }\n    }, {\n        key: "componentDidMount",\n        value: function componentDidMount() {\n            var me = this;\n            me.requestListOrCacheData({ FETCH_PAGE: FETCH_PAGE, API_PAGE: API_PAGE });\n            // me.requestList(me,FETCH_PAGE,API_PAGE,true)\n            me.shareTextObjSetting({\n                title: "\\u8DA3\\u6E38\\u5D07\\u660E",\n                imgUrl: "http://www.weichongming.com/quyou/logo.png",\n                desc: \'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。\'\n            });\n        }\n    }, {\n        key: "handleSearch",\n        value: function handleSearch(like) {\n            var me = this;\n            var query = me.props.location.query;\n\n            query = _extends({}, query, {\n                like: like\n            });\n            console.log(\'query\', query);\n            me.openPage("/buildinghot" + me.getRequestParam(query));\n        }\n    }]);\n\n    return Index;\n}(Quyou);\n\nexports.default = Index;\n\nvar List = function List(props) {\n    var response = props.response,\n        me = props.me;\n    var _response$data = response.data,\n        _response$data$count = _response$data.count,\n        count = _response$data$count === undefined ? 0 : _response$data$count,\n        _response$data$data = _response$data.data,\n        data = _response$data$data === undefined ? [] : _response$data$data;\n\n    data = Array.isArray(data) ? data : [];\n    data = data.filter(function (_ref3) {\n        var id = _ref3.id;\n        return buildingIds[id];\n    });\n    count = data.length;\n    return data.length ? React.createElement(\n        "div",\n        null,\n        React.createElement(\n            "div",\n            { className: "list" },\n            data.map(function () {\n                var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { imgs: [] };\n                var i = arguments[1];\n\n                d.stag_names = Array.isArray(d.stag_names) ? d.stag_names : [];\n                d.coupon = Array.isArray(d.coupon) ? d.coupon : [];\n                return React.createElement(\n                    "div",\n                    { key: i },\n                    React.createElement(\n                        "div",\n                        {\n                            className: "item",\n                            onClick: function onClick() {\n                                if (sessionStorage) {\n                                    sessionStorage.setItem(FETCH_PAGE, JSON.stringify({\n                                        response: me.state[FETCH_PAGE],\n                                        scrollTop: getScrollTop(),\n                                        page: me.page\n                                    }));\n                                }\n                                me.openPage("/buildinghot/" + d.id + "?_t=TOUR");\n                            }\n                        },\n                        React.createElement(\n                            LazyLoad,\n                            { key: i, height: 100, offset: 100 },\n                            React.createElement("div", { className: "icon cover", style: { backgroundImage: "url(" + d.imgs[0] + doImg.fw() + ")" } })\n                        ),\n                        React.createElement(\n                            "div",\n                            { className: "box" },\n                            React.createElement(\n                                "div",\n                                { className: "name" },\n                                d.name\n                            ),\n                            React.createElement(\n                                "div",\n                                { className: "stars-permoney" },\n                                React.createElement(StarsShow, { number: d.star_count || 5 })\n                            ),\n                            React.createElement(\n                                "ul",\n                                { className: "tags" },\n                                d.stag_names.map(function (d, i) {\n                                    return React.createElement(\n                                        "li",\n                                        { key: i },\n                                        d.tagname\n                                    );\n                                })\n                            ),\n                            React.createElement(\n                                "div",\n                                { className: "address clearboth" },\n                                React.createElement("i", { className: "icon" }),\n                                d.addr2 + d.addr3 + d.detail\n                            ),\n                            d.coupon.length ? React.createElement(\n                                "ul",\n                                { className: "discountarr" },\n                                React.createElement(\n                                    "li",\n                                    { className: "text-elip color" + [0, 1, 2, 3].sort(function (a) {\n                                            return Math.random() < 0.5;\n                                        })[0] },\n                                    d.coupon[0].title\n                                )\n                            ) : null\n                        )\n                    ),\n                    i === data.length - 1 ? null : React.createElement("div", { className: "clearboth thinner-border" })\n                );\n            })\n        ),\n        me.page >= Math.ceil(count / me.limit) - 1 ? React.createElement(NoMoreData, null) : React.createElement(Spin.Spin2, null)\n    ) : React.createElement(NoMoreData, { type: \'nodata\' });\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/BuildingHot.js\n// module id = 291\n// module chunks = 7\n\n//# sourceURL=webpack:///./src/pages/quyou/BuildingHot.js?')},328:function(module,exports){eval("if (typeof Object.create === 'function') {\n  // implementation from standard node.js 'util' module\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    ctor.prototype = Object.create(superCtor.prototype, {\n      constructor: {\n        value: ctor,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    var TempCtor = function () {}\n    TempCtor.prototype = superCtor.prototype\n    ctor.prototype = new TempCtor()\n    ctor.prototype.constructor = ctor\n  }\n}\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/util/~/inherits/inherits_browser.js\n// module id = 328\n// module chunks = 4 6 7\n\n//# sourceURL=webpack:///./~/util/~/inherits/inherits_browser.js?")},329:function(module,exports){eval("module.exports = function isBuffer(arg) {\n  return arg && typeof arg === 'object'\n    && typeof arg.copy === 'function'\n    && typeof arg.fill === 'function'\n    && typeof arg.readUInt8 === 'function';\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/util/support/isBufferBrowser.js\n// module id = 329\n// module chunks = 4 6 7\n\n//# sourceURL=webpack:///./~/util/support/isBufferBrowser.js?")},330:function(module,exports,__webpack_require__){eval("/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar formatRegExp = /%[sdj%]/g;\nexports.format = function(f) {\n  if (!isString(f)) {\n    var objects = [];\n    for (var i = 0; i < arguments.length; i++) {\n      objects.push(inspect(arguments[i]));\n    }\n    return objects.join(' ');\n  }\n\n  var i = 1;\n  var args = arguments;\n  var len = args.length;\n  var str = String(f).replace(formatRegExp, function(x) {\n    if (x === '%%') return '%';\n    if (i >= len) return x;\n    switch (x) {\n      case '%s': return String(args[i++]);\n      case '%d': return Number(args[i++]);\n      case '%j':\n        try {\n          return JSON.stringify(args[i++]);\n        } catch (_) {\n          return '[Circular]';\n        }\n      default:\n        return x;\n    }\n  });\n  for (var x = args[i]; i < len; x = args[++i]) {\n    if (isNull(x) || !isObject(x)) {\n      str += ' ' + x;\n    } else {\n      str += ' ' + inspect(x);\n    }\n  }\n  return str;\n};\n\n\n// Mark that a method should not be used.\n// Returns a modified function which warns once by default.\n// If --no-deprecation is set, then it is a no-op.\nexports.deprecate = function(fn, msg) {\n  // Allow for deprecating things in the process of starting up.\n  if (isUndefined(global.process)) {\n    return function() {\n      return exports.deprecate(fn, msg).apply(this, arguments);\n    };\n  }\n\n  if (process.noDeprecation === true) {\n    return fn;\n  }\n\n  var warned = false;\n  function deprecated() {\n    if (!warned) {\n      if (process.throwDeprecation) {\n        throw new Error(msg);\n      } else if (process.traceDeprecation) {\n        console.trace(msg);\n      } else {\n        console.error(msg);\n      }\n      warned = true;\n    }\n    return fn.apply(this, arguments);\n  }\n\n  return deprecated;\n};\n\n\nvar debugs = {};\nvar debugEnviron;\nexports.debuglog = function(set) {\n  if (isUndefined(debugEnviron))\n    debugEnviron = process.env.NODE_DEBUG || '';\n  set = set.toUpperCase();\n  if (!debugs[set]) {\n    if (new RegExp('\\\\b' + set + '\\\\b', 'i').test(debugEnviron)) {\n      var pid = process.pid;\n      debugs[set] = function() {\n        var msg = exports.format.apply(exports, arguments);\n        console.error('%s %d: %s', set, pid, msg);\n      };\n    } else {\n      debugs[set] = function() {};\n    }\n  }\n  return debugs[set];\n};\n\n\n/**\n * Echos the value of a value. Trys to print the value out\n * in the best way possible given the different types.\n *\n * @param {Object} obj The object to print out.\n * @param {Object} opts Optional options object that alters the output.\n */\n/* legacy: obj, showHidden, depth, colors*/\nfunction inspect(obj, opts) {\n  // default options\n  var ctx = {\n    seen: [],\n    stylize: stylizeNoColor\n  };\n  // legacy...\n  if (arguments.length >= 3) ctx.depth = arguments[2];\n  if (arguments.length >= 4) ctx.colors = arguments[3];\n  if (isBoolean(opts)) {\n    // legacy...\n    ctx.showHidden = opts;\n  } else if (opts) {\n    // got an \"options\" object\n    exports._extend(ctx, opts);\n  }\n  // set default options\n  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;\n  if (isUndefined(ctx.depth)) ctx.depth = 2;\n  if (isUndefined(ctx.colors)) ctx.colors = false;\n  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;\n  if (ctx.colors) ctx.stylize = stylizeWithColor;\n  return formatValue(ctx, obj, ctx.depth);\n}\nexports.inspect = inspect;\n\n\n// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics\ninspect.colors = {\n  'bold' : [1, 22],\n  'italic' : [3, 23],\n  'underline' : [4, 24],\n  'inverse' : [7, 27],\n  'white' : [37, 39],\n  'grey' : [90, 39],\n  'black' : [30, 39],\n  'blue' : [34, 39],\n  'cyan' : [36, 39],\n  'green' : [32, 39],\n  'magenta' : [35, 39],\n  'red' : [31, 39],\n  'yellow' : [33, 39]\n};\n\n// Don't use 'blue' not visible on cmd.exe\ninspect.styles = {\n  'special': 'cyan',\n  'number': 'yellow',\n  'boolean': 'yellow',\n  'undefined': 'grey',\n  'null': 'bold',\n  'string': 'green',\n  'date': 'magenta',\n  // \"name\": intentionally not styling\n  'regexp': 'red'\n};\n\n\nfunction stylizeWithColor(str, styleType) {\n  var style = inspect.styles[styleType];\n\n  if (style) {\n    return '\\u001b[' + inspect.colors[style][0] + 'm' + str +\n           '\\u001b[' + inspect.colors[style][1] + 'm';\n  } else {\n    return str;\n  }\n}\n\n\nfunction stylizeNoColor(str, styleType) {\n  return str;\n}\n\n\nfunction arrayToHash(array) {\n  var hash = {};\n\n  array.forEach(function(val, idx) {\n    hash[val] = true;\n  });\n\n  return hash;\n}\n\n\nfunction formatValue(ctx, value, recurseTimes) {\n  // Provide a hook for user-specified inspect functions.\n  // Check that value is an object with an inspect function on it\n  if (ctx.customInspect &&\n      value &&\n      isFunction(value.inspect) &&\n      // Filter out the util module, it's inspect function is special\n      value.inspect !== exports.inspect &&\n      // Also filter out any prototype objects using the circular check.\n      !(value.constructor && value.constructor.prototype === value)) {\n    var ret = value.inspect(recurseTimes, ctx);\n    if (!isString(ret)) {\n      ret = formatValue(ctx, ret, recurseTimes);\n    }\n    return ret;\n  }\n\n  // Primitive types cannot have properties\n  var primitive = formatPrimitive(ctx, value);\n  if (primitive) {\n    return primitive;\n  }\n\n  // Look up the keys of the object.\n  var keys = Object.keys(value);\n  var visibleKeys = arrayToHash(keys);\n\n  if (ctx.showHidden) {\n    keys = Object.getOwnPropertyNames(value);\n  }\n\n  // IE doesn't make error fields non-enumerable\n  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx\n  if (isError(value)\n      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {\n    return formatError(value);\n  }\n\n  // Some type of object without properties can be shortcutted.\n  if (keys.length === 0) {\n    if (isFunction(value)) {\n      var name = value.name ? ': ' + value.name : '';\n      return ctx.stylize('[Function' + name + ']', 'special');\n    }\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    }\n    if (isDate(value)) {\n      return ctx.stylize(Date.prototype.toString.call(value), 'date');\n    }\n    if (isError(value)) {\n      return formatError(value);\n    }\n  }\n\n  var base = '', array = false, braces = ['{', '}'];\n\n  // Make Array say that they are Array\n  if (isArray(value)) {\n    array = true;\n    braces = ['[', ']'];\n  }\n\n  // Make functions say that they are functions\n  if (isFunction(value)) {\n    var n = value.name ? ': ' + value.name : '';\n    base = ' [Function' + n + ']';\n  }\n\n  // Make RegExps say that they are RegExps\n  if (isRegExp(value)) {\n    base = ' ' + RegExp.prototype.toString.call(value);\n  }\n\n  // Make dates with properties first say the date\n  if (isDate(value)) {\n    base = ' ' + Date.prototype.toUTCString.call(value);\n  }\n\n  // Make error with message first say the error\n  if (isError(value)) {\n    base = ' ' + formatError(value);\n  }\n\n  if (keys.length === 0 && (!array || value.length == 0)) {\n    return braces[0] + base + braces[1];\n  }\n\n  if (recurseTimes < 0) {\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    } else {\n      return ctx.stylize('[Object]', 'special');\n    }\n  }\n\n  ctx.seen.push(value);\n\n  var output;\n  if (array) {\n    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);\n  } else {\n    output = keys.map(function(key) {\n      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);\n    });\n  }\n\n  ctx.seen.pop();\n\n  return reduceToSingleString(output, base, braces);\n}\n\n\nfunction formatPrimitive(ctx, value) {\n  if (isUndefined(value))\n    return ctx.stylize('undefined', 'undefined');\n  if (isString(value)) {\n    var simple = '\\'' + JSON.stringify(value).replace(/^\"|\"$/g, '')\n                                             .replace(/'/g, \"\\\\'\")\n                                             .replace(/\\\\\"/g, '\"') + '\\'';\n    return ctx.stylize(simple, 'string');\n  }\n  if (isNumber(value))\n    return ctx.stylize('' + value, 'number');\n  if (isBoolean(value))\n    return ctx.stylize('' + value, 'boolean');\n  // For some reason typeof null is \"object\", so special case here.\n  if (isNull(value))\n    return ctx.stylize('null', 'null');\n}\n\n\nfunction formatError(value) {\n  return '[' + Error.prototype.toString.call(value) + ']';\n}\n\n\nfunction formatArray(ctx, value, recurseTimes, visibleKeys, keys) {\n  var output = [];\n  for (var i = 0, l = value.length; i < l; ++i) {\n    if (hasOwnProperty(value, String(i))) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          String(i), true));\n    } else {\n      output.push('');\n    }\n  }\n  keys.forEach(function(key) {\n    if (!key.match(/^\\d+$/)) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          key, true));\n    }\n  });\n  return output;\n}\n\n\nfunction formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {\n  var name, str, desc;\n  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };\n  if (desc.get) {\n    if (desc.set) {\n      str = ctx.stylize('[Getter/Setter]', 'special');\n    } else {\n      str = ctx.stylize('[Getter]', 'special');\n    }\n  } else {\n    if (desc.set) {\n      str = ctx.stylize('[Setter]', 'special');\n    }\n  }\n  if (!hasOwnProperty(visibleKeys, key)) {\n    name = '[' + key + ']';\n  }\n  if (!str) {\n    if (ctx.seen.indexOf(desc.value) < 0) {\n      if (isNull(recurseTimes)) {\n        str = formatValue(ctx, desc.value, null);\n      } else {\n        str = formatValue(ctx, desc.value, recurseTimes - 1);\n      }\n      if (str.indexOf('\\n') > -1) {\n        if (array) {\n          str = str.split('\\n').map(function(line) {\n            return '  ' + line;\n          }).join('\\n').substr(2);\n        } else {\n          str = '\\n' + str.split('\\n').map(function(line) {\n            return '   ' + line;\n          }).join('\\n');\n        }\n      }\n    } else {\n      str = ctx.stylize('[Circular]', 'special');\n    }\n  }\n  if (isUndefined(name)) {\n    if (array && key.match(/^\\d+$/)) {\n      return str;\n    }\n    name = JSON.stringify('' + key);\n    if (name.match(/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)) {\n      name = name.substr(1, name.length - 2);\n      name = ctx.stylize(name, 'name');\n    } else {\n      name = name.replace(/'/g, \"\\\\'\")\n                 .replace(/\\\\\"/g, '\"')\n                 .replace(/(^\"|\"$)/g, \"'\");\n      name = ctx.stylize(name, 'string');\n    }\n  }\n\n  return name + ': ' + str;\n}\n\n\nfunction reduceToSingleString(output, base, braces) {\n  var numLinesEst = 0;\n  var length = output.reduce(function(prev, cur) {\n    numLinesEst++;\n    if (cur.indexOf('\\n') >= 0) numLinesEst++;\n    return prev + cur.replace(/\\u001b\\[\\d\\d?m/g, '').length + 1;\n  }, 0);\n\n  if (length > 60) {\n    return braces[0] +\n           (base === '' ? '' : base + '\\n ') +\n           ' ' +\n           output.join(',\\n  ') +\n           ' ' +\n           braces[1];\n  }\n\n  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];\n}\n\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\nfunction isArray(ar) {\n  return Array.isArray(ar);\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return isObject(re) && objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return isObject(d) && objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return isObject(e) &&\n      (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nexports.isBuffer = __webpack_require__(329);\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n\n\nfunction pad(n) {\n  return n < 10 ? '0' + n.toString(10) : n.toString(10);\n}\n\n\nvar months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',\n              'Oct', 'Nov', 'Dec'];\n\n// 26 Feb 16:19:34\nfunction timestamp() {\n  var d = new Date();\n  var time = [pad(d.getHours()),\n              pad(d.getMinutes()),\n              pad(d.getSeconds())].join(':');\n  return [d.getDate(), months[d.getMonth()], time].join(' ');\n}\n\n\n// log is just a thin wrapper to console.log that prepends a timestamp\nexports.log = function() {\n  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));\n};\n\n\n/**\n * Inherit the prototype methods from one constructor into another.\n *\n * The Function.prototype.inherits from lang.js rewritten as a standalone\n * function (not on Function.prototype). NOTE: If this file is to be loaded\n * during bootstrapping this function needs to be rewritten using some native\n * functions as prototype setup using normal JavaScript does not work as\n * expected during bootstrapping (see mirror.js in r114903).\n *\n * @param {function} ctor Constructor function which needs to inherit the\n *     prototype.\n * @param {function} superCtor Constructor function to inherit prototype from.\n */\nexports.inherits = __webpack_require__(328);\n\nexports._extend = function(origin, add) {\n  // Don't do anything if add isn't an object\n  if (!add || !isObject(add)) return origin;\n\n  var keys = Object.keys(add);\n  var i = keys.length;\n  while (i--) {\n    origin[keys[i]] = add[keys[i]];\n  }\n  return origin;\n};\n\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(115), __webpack_require__(31)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/util/util.js\n// module id = 330\n// module chunks = 4 6 7\n\n//# sourceURL=webpack:///./~/util/util.js?")}});