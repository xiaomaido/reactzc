webpackJsonp([12],{326:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\n__webpack_require__(333);\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Index = function (_Quyou) {\n    _inherits(Index, _Quyou);\n\n    function Index() {\n        _classCallCheck(this, Index);\n\n        return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));\n    }\n\n    _createClass(Index, [{\n        key: 'renderContent',\n        value: function renderContent() {\n            return React.createElement(Content, null);\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            var me = this;\n            me.shareTextObjSetting({\n                title: '\\u8DA3\\u6E38\\u5D07\\u660E\\u4E4B\\u519C\\u4EA7\\u54C1\\u4E13\\u533A',\n                imgUrl: 'http://www.weichongming.com/quyou/logo.png',\n                desc: '整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。'\n            });\n        }\n    }]);\n\n    return Index;\n}(Quyou);\n\nexports.default = Index;\n\nvar Content = function (_React$Component) {\n    _inherits(Content, _React$Component);\n\n    function Content() {\n        var _ref;\n\n        var _temp, _this2, _ret;\n\n        _classCallCheck(this, Content);\n\n        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n        }\n\n        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Content.__proto__ || Object.getPrototypeOf(Content)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {\n            agStyle: {}\n        }, _temp), _possibleConstructorReturn(_this2, _ret);\n    }\n\n    _createClass(Content, [{\n        key: 'componentWillMount',\n        value: function componentWillMount() {\n            window.scrollTo(0, 0);\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            this.setState({\n                agStyle: {\n                    height: window.innerHeight - 2.2 * window.fontSize\n                }\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return React.createElement(\n                'div',\n                { className: 'mall ag-guidance', style: this.state.agStyle },\n                React.createElement(\n                    'ul',\n                    { className: 'list' },\n                    React.createElement(\n                        'li',\n                        null,\n                        React.createElement(\n                            'a',\n                            { className: 'first', href:  false ? window.isHashHistory + '/' : 'http://m.chongnongpi.com/index.jsp' },\n                            React.createElement('div', { className: 'dami icon' }),\n                            React.createElement(\n                                'div',\n                                { className: 'title' },\n                                '\\u5D07\\u660E\\u5927\\u7C73\\u4E13\\u533A',\n                                React.createElement(\n                                    'div',\n                                    { className: 'sub-title' },\n                                    '[\\u5B98\\u65B9\\u8BA4\\u8BC1\\u5355\\u4F4D]'\n                                )\n                            )\n                        )\n                    ),\n                    React.createElement(\n                        'li',\n                        null,\n                        React.createElement(\n                            'a',\n                            { className: 'first', href:  false ? window.isHashHistory + '/' : 'http://quyou.zenongji.com.cn/mobile/' },\n                            React.createElement('div', { className: 'tese icon' }),\n                            React.createElement(\n                                'div',\n                                { className: 'title' },\n                                '\\u7279\\u8272\\u519C\\u4EA7\\u54C1\\u4E13\\u533A',\n                                React.createElement(\n                                    'div',\n                                    { className: 'sub-title' },\n                                    '[\\u4E13\\u4E1A\\u5408\\u4F5C\\u5355\\u4F4D]'\n                                )\n                            )\n                        )\n                    ),\n                    React.createElement(\n                        'li',\n                        null,\n                        React.createElement(\n                            'a',\n                            { className: 'first', href: true ? window.isHashHistory + '/hengsha' : '' },\n                            React.createElement('div', { className: 'hengsha icon' }),\n                            React.createElement(\n                                'div',\n                                { className: 'title' },\n                                '\\u6A2A\\u6C99\\u4E13\\u533A',\n                                React.createElement(\n                                    'div',\n                                    { className: 'sub-title', style: { visibility: 'hidden' } },\n                                    '[\\u4E13\\u4E1A\\u5408\\u4F5C\\u5355\\u4F4D]'\n                                )\n                            )\n                        )\n                    )\n                )\n            );\n        }\n    }]);\n\n    return Content;\n}(React.Component);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/agricultural/index.js\n// module id = 326\n// module chunks = 12\n\n//# sourceURL=webpack:///./src/pages/quyou/agricultural/index.js?")},333:function(module,exports){eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/agricultural/index.scss\n// module id = 333\n// module chunks = 12 13\n\n//# sourceURL=webpack:///./src/pages/quyou/agricultural/index.scss?")}});