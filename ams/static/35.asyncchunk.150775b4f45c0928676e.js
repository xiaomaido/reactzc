webpackJsonp([35],{297:function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar initStateResponse = {\n    data: {\n        "count": 0,\n        "data": []\n    }\n};\nvar API_PAGE = APIS.API_TOUR_PIC_LIST;\nvar FETCH_PAGE = TYPES.FETCH_TOUR_PIC_LIST;\n\nvar Index = function (_Quyou) {\n    _inherits(Index, _Quyou);\n\n    function Index() {\n        var _ref;\n\n        var _temp, _this, _ret;\n\n        _classCallCheck(this, Index);\n\n        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n        }\n\n        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = _defineProperty({}, FETCH_PAGE, {\n            response: initStateResponse\n        }), _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(Index, [{\n        key: "renderContent",\n        value: function renderContent() {\n            // document.title=\'导览图\'\n            var me = this;\n            var _me$state$FETCH_PAGE = me.state[FETCH_PAGE],\n                fetching = _me$state$FETCH_PAGE.fetching,\n                _me$state$FETCH_PAGE$ = _me$state$FETCH_PAGE.response,\n                response = _me$state$FETCH_PAGE$ === undefined ? initStateResponse : _me$state$FETCH_PAGE$;\n\n            return fetching ? React.createElement(Spin, null) : response.code === 0 ? React.createElement(Content, { response: response, me: me }) : null;\n        }\n    }, {\n        key: "componentDidMount",\n        value: function componentDidMount() {\n            var me = this;\n            me.requestList(me, FETCH_PAGE, API_PAGE);\n            me.shareTextObjSetting({\n                title: "\\u8DA3\\u6E38\\u5D07\\u660E\\u4E4B\\u666F\\u70B9\\u5BFC\\u89C8\\u56FE",\n                imgUrl: "http://www.weichongming.com/quyou/logo.png",\n                desc: \'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。\'\n            });\n        }\n    }]);\n\n    return Index;\n}(Quyou);\n\nexports.default = Index;\n\nvar Content = function Content(props) {\n    var response = props.response,\n        me = props.me;\n    var _response$data = response.data,\n        _response$data$count = _response$data.count,\n        count = _response$data$count === undefined ? 0 : _response$data$count,\n        _response$data$data = _response$data.data,\n        data = _response$data$data === undefined ? [] : _response$data$data;\n\n    data = Array.isArray(data) ? data : [];\n    return React.createElement(\n        "div",\n        { className: "mall trip-guidance" },\n        React.createElement(\n            "ul",\n            { className: "ad-list" },\n            data.map(function (d, i) {\n                return React.createElement(\n                    "li",\n                    { key: i },\n                    React.createElement(\n                        LazyLoad,\n                        { height: 200, offset: 100 },\n                        React.createElement("a", { href: window.isHashHistory + "/guidance/" + d.id, className: "icon big", style: { backgroundImage: "url(" + d.img + ")" } })\n                    )\n                );\n            })\n        )\n    );\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/Guidance.js\n// module id = 297\n// module chunks = 35\n\n//# sourceURL=webpack:///./src/pages/quyou/Guidance.js?')}});