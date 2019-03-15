webpackJsonp([34],{298:function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar initStateResponse = initState();\nvar API_PAGE = APIS.API_TOUR_PIC_DETAIL;\nvar FETCH_PAGE = TYPES.FETCH_TOUR_PIC_DETAIL;\n\nvar Index = function (_Quyou) {\n    _inherits(Index, _Quyou);\n\n    function Index() {\n        var _ref;\n\n        var _temp, _this, _ret;\n\n        _classCallCheck(this, Index);\n\n        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n        }\n\n        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = _defineProperty({}, FETCH_PAGE, {\n            response: initStateResponse\n        }), _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(Index, [{\n        key: "renderContent",\n        value: function renderContent() {\n            // document.title=\'导览图\'\n            var me = this;\n            var _me$state$FETCH_PAGE = me.state[FETCH_PAGE],\n                fetching = _me$state$FETCH_PAGE.fetching,\n                _me$state$FETCH_PAGE$ = _me$state$FETCH_PAGE.response,\n                response = _me$state$FETCH_PAGE$ === undefined ? initStateResponse : _me$state$FETCH_PAGE$;\n\n            return fetching ? React.createElement(Spin, null) : response.code === 0 ? React.createElement(Content, { response: response, me: me }) : null;\n        }\n    }, {\n        key: "componentDidMount",\n        value: function componentDidMount() {\n            var me = this;\n            me.requestDetail(me, FETCH_PAGE, API_PAGE);\n        }\n    }]);\n\n    return Index;\n}(Quyou);\n\nexports.default = Index;\n\nvar Content = function Content(props) {\n    var response = props.response,\n        me = props.me;\n    var _response$data = response.data,\n        data = _response$data === undefined ? [] : _response$data;\n\n    data = Array.isArray(data) ? data : [];\n    var detail = data[0] || {};\n    detail.seller = Array.isArray(detail.seller) ? detail.seller : [];\n    return detail.id ? React.createElement(\n        "div",\n        { className: "trip-guidance-detial" },\n        React.createElement("img", { src: detail.img }),\n        React.createElement(\n            "div",\n            { className: "top" },\n            React.createElement(\n                "div",\n                { className: "area" },\n                detail.title,\n                "\\u533A\\u57DF"\n            ),\n            React.createElement(\n                "div",\n                { className: "dic" },\n                "\\u62E5\\u6709\\u4EE5\\u4E0B\\u666F\\u70B9"\n            ),\n            React.createElement("div", { className: "clearboth thinner-border" }),\n            React.createElement(\n                "div",\n                { className: "list" },\n                detail.seller.map(function (d, i) {\n                    return React.createElement(\n                        Link,\n                        { key: i, to: "/shophot/" + d.id + "?_t=TOUR" },\n                        React.createElement("em", null),\n                        d.name,\n                        React.createElement(\n                            "span",\n                            null,\n                            "\\uFF08\\u70B9\\u51FB\\u67E5\\u770B\\uFF09"\n                        )\n                    );\n                })\n            )\n        )\n    ) : null;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/GuidanceDetail.js\n// module id = 298\n// module chunks = 34\n\n//# sourceURL=webpack:///./src/pages/quyou/GuidanceDetail.js?')}});