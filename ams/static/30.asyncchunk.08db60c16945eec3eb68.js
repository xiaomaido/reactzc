webpackJsonp([30],{308:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Index = function (_Quyou) {\n    _inherits(Index, _Quyou);\n\n    function Index() {\n        _classCallCheck(this, Index);\n\n        return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));\n    }\n\n    _createClass(Index, [{\n        key: 'renderContent',\n        value: function renderContent() {\n            var list = [{\n                msg: '恭喜你获得了系统赠送的优惠券1张'\n            }, {\n                msg: '恭喜你获得了系统赠送的优惠券1张哈哈哈哈哈哈哈哈哈哈哈哈'\n            }, {\n                msg: '恭喜你获得了系统赠送的优惠券1张哈哈哈哈哈哈哈哈哈哈哈哈恭喜你获得了系统赠送的优惠券1张哈哈哈哈哈哈哈哈哈哈哈哈'\n            }];\n            var url = \"https://avatars0.githubusercontent.com/u/11659631?v=4\";\n            return React.createElement(\n                'div',\n                { className: 'my-msg' },\n                list.map(function (d, i) {\n                    return React.createElement(\n                        'div',\n                        { key: i, className: 'item' },\n                        React.createElement('span', null),\n                        React.createElement(\n                            'div',\n                            { className: 'date-msg' },\n                            React.createElement(\n                                'div',\n                                { className: 'date' },\n                                React.createElement(\n                                    'div',\n                                    null,\n                                    '2017-12-31'\n                                ),\n                                React.createElement(\n                                    'div',\n                                    null,\n                                    '12:30:15'\n                                )\n                            ),\n                            React.createElement(\n                                'div',\n                                { className: 'msg' },\n                                d.msg\n                            )\n                        ),\n                        React.createElement('div', { className: 'clearboth thinner-border', style: { height: 1 } })\n                    );\n                })\n            );\n        }\n    }]);\n\n    return Index;\n}(Quyou);\n\nexports.default = Index;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/MyMsg.js\n// module id = 308\n// module chunks = 30\n\n//# sourceURL=webpack:///./src/pages/quyou/MyMsg.js?")}});