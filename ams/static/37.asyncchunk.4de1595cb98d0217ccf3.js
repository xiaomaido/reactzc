webpackJsonp([37],{293:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar CurrentRoutes = function (_Quyou) {\n    _inherits(CurrentRoutes, _Quyou);\n\n    function CurrentRoutes() {\n        _classCallCheck(this, CurrentRoutes);\n\n        return _possibleConstructorReturn(this, (CurrentRoutes.__proto__ || Object.getPrototypeOf(CurrentRoutes)).apply(this, arguments));\n    }\n\n    _createClass(CurrentRoutes, [{\n        key: 'render',\n        value: function render() {\n            // document.title='趣游崇明'\n            return React.createElement(\n                'div',\n                { style: { padding: '50px 20px' } },\n                Object.keys(pageMapRoute).map(function (d) {\n                    return React.createElement(\n                        'div',\n                        { key: d },\n                        React.createElement(\n                            'a',\n                            { href: window.isHashHistory + '/' + d },\n                            d\n                        )\n                    );\n                })\n            );\n        }\n    }]);\n\n    return CurrentRoutes;\n}(Quyou);\n\nexports.default = CurrentRoutes;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/CurrentRoutes.js\n// module id = 293\n// module chunks = 37\n\n//# sourceURL=webpack:///./src/pages/quyou/CurrentRoutes.js?")}});