webpackJsonp([32],{306:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar initStateResponse = initState();\nvar FETCH_PAGE = TYPES.FETCH_MY_COUPON_LIST;\nvar API_PAGE = APIS.API_MY_COUPON_LIST;\nvar API_MY_COUPON_USE = APIS.API_MY_COUPON_USE;\nvar okay = '核销';\nvar title = '商家确认';\n\nvar Index = function (_Quyou) {\n    _inherits(Index, _Quyou);\n\n    function Index() {\n        var _ref, _this$state;\n\n        var _temp, _this, _ret;\n\n        _classCallCheck(this, Index);\n\n        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n        }\n\n        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.initTextOkay = okay, _this.state = (_this$state = {}, _defineProperty(_this$state, FETCH_PAGE, {\n            response: initStateResponse\n        }), _defineProperty(_this$state, 'isDoUse', false), _defineProperty(_this$state, 'showCreateComment', false), _defineProperty(_this$state, 'textOkay', okay), _defineProperty(_this$state, 'textTitle', title), _this$state), _this.ltypes = ['未使用', '已使用', '已过期'], _this.ltypesEn = ['unused-m', 'used-m', 'expired-m'], _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(Index, [{\n        key: 'handleSaveComment',\n        value: function handleSaveComment(_ref2, e) {\n            var _ref2$property = _ref2.property,\n                property = _ref2$property === undefined ? '' : _ref2$property;\n\n            var me = this;\n            var state = me.state,\n                initTextOkay = me.initTextOkay;\n            var valueCreateComment = state.valueCreateComment,\n                textOkay = state.textOkay,\n                couponId = state.coupon_id;\n\n            if (textOkay === initTextOkay && valueCreateComment) {\n                var _me$requestAPI;\n\n                me.setState({\n                    textOkay: initTextOkay + '\\u4E2D...'\n                });\n                me.requestAPI(API_MY_COUPON_USE, (_me$requestAPI = {\n                    coupon_id: couponId\n                }, _defineProperty(_me$requestAPI, property, valueCreateComment), _defineProperty(_me$requestAPI, 'token', me.user.token), _me$requestAPI), function (response) {\n                    // {\"msg\":\"口令错误\",\"data\":\"\",\"code\":20015}\n                    var _response$code = response.code,\n                        code = _response$code === undefined ? 0 : _response$code,\n                        data = response.data,\n                        msg = response.msg;\n\n                    if (code) {\n                        me.setState({\n                            textOkay: initTextOkay,\n                            textTitle: msg\n                        }, function () {\n                            setTimeout(function () {\n                                me.setState({\n                                    textTitle: title\n                                });\n                            }, 2000);\n                        });\n                        return;\n                    }\n                    var FETCH_TEMP = _extends({}, me.state[FETCH_PAGE]);\n                    FETCH_TEMP.response.data.count += -1;\n                    FETCH_TEMP.response.data.data = FETCH_TEMP.response.data.data.filter(function (_ref3) {\n                        var coupon_id = _ref3.coupon_id;\n                        return coupon_id !== couponId;\n                    });\n                    me.setState(_defineProperty({\n                        textOkay: initTextOkay,\n                        showCreateComment: false,\n                        valueCreateComment: ''\n                    }, FETCH_PAGE, FETCH_TEMP));\n                    me.openPage('/mycoupons?ltype=1');\n                });\n            }\n        }\n    }, {\n        key: 'handleClick',\n        value: function handleClick() {\n            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n            var me = this;\n            var _location$query$ltype = _location.query.ltype,\n                ltype = _location$query$ltype === undefined ? '0' : _location$query$ltype;\n\n            ltype = Number(ltype);\n            if (type !== ltype) {\n                me.openPage('/mycoupons?ltype=' + type);\n            }\n        }\n    }, {\n        key: 'handleChangeCreateComment',\n        value: function handleChangeCreateComment(e) {\n            var me = this;\n            me.setState({\n                valueCreateComment: e.target.value\n            });\n        }\n    }, {\n        key: 'renderContent',\n        value: function renderContent() {\n            var _this2 = this;\n\n            var me = this;\n            var _me$state = me.state,\n                showCreateComment = _me$state.showCreateComment,\n                textTitle = _me$state.textTitle,\n                textOkay = _me$state.textOkay;\n            var _me$state$FETCH_PAGE = me.state[FETCH_PAGE],\n                fetching = _me$state$FETCH_PAGE.fetching,\n                _me$state$FETCH_PAGE$ = _me$state$FETCH_PAGE.response,\n                response = _me$state$FETCH_PAGE$ === undefined ? initStateResponse : _me$state$FETCH_PAGE$;\n            var _location$query$ltype2 = _location.query.ltype,\n                ltype = _location$query$ltype2 === undefined ? '0' : _location$query$ltype2;\n\n            ltype = Number(ltype);\n            return React.createElement(\n                'div',\n                { className: 'my-coupons' },\n                showCreateComment ? React.createElement(CreateComment, {\n                    type: 'password',\n                    maxLength: 20,\n                    textPlaceholder: '\\u8BF7\\u5546\\u6237\\u8425\\u4E1A\\u5458\\u8F93\\u5165\\u6838\\u9500\\u53E3\\u4EE4\\uFF5E',\n                    textTitle: textTitle,\n                    textOkay: textOkay,\n                    handleClickCancel: me.handleShowCreateComment.bind(me),\n                    handleClickOkay: me.handleSaveComment.bind(me, { property: 'coupon_code' }),\n                    handleChangeInput: me.handleChangeCreateComment.bind(me) }) : null,\n                React.createElement(\n                    'ul',\n                    { className: 'types' },\n                    me.ltypes.map(function (d, i) {\n                        return React.createElement(\n                            'li',\n                            { key: i, className: classnames({ active: ltype === i }), onClick: me.handleClick.bind(me, i) },\n                            React.createElement(\n                                'div',\n                                { className: 'name' },\n                                d,\n                                ltype === i ? React.createElement(\n                                    'div',\n                                    { className: 'number' },\n                                    response.data.count\n                                ) : null\n                            ),\n                            React.createElement('div', { className: _this2.ltypesEn[i] + ' image-m' }),\n                            React.createElement('div', { className: 't-down' })\n                        );\n                    })\n                ),\n                fetching ? React.createElement(Spin, null) : response.code === 0 ? React.createElement(Content, { response: response, me: me }) : null\n            );\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            var me = this;\n            me.requestList(me, FETCH_PAGE, API_PAGE);\n            me.shareTextObjSetting({\n                title: '\\u8DA3\\u6E38\\u5D07\\u660E\\u4E4B\\u6211\\u7684\\u4F18\\u60E0\\u5238',\n                imgUrl: 'http://www.weichongming.com/quyou/logo.png',\n                desc: '整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。'\n            });\n        }\n    }, {\n        key: 'componentWillReceiveProps',\n        value: function componentWillReceiveProps(nextProps) {\n            var me = this;\n            _location = nextProps.location;\n            me.requestList(me, FETCH_PAGE, API_PAGE);\n        }\n    }]);\n\n    return Index;\n}(Quyou);\n\nexports.default = Index;\n\n\nvar Content = function Content(props) {\n    var response = props.response,\n        me = props.me;\n    var _response$data = response.data,\n        _response$data$count = _response$data.count,\n        count = _response$data$count === undefined ? 0 : _response$data$count,\n        _response$data$data = _response$data.data,\n        data = _response$data$data === undefined ? [] : _response$data$data;\n\n    data = Array.isArray(data) ? data : [];\n    // data = [\n    //     ...data,\n    // ]\n    var ltype = _location.query.ltype;\n    var tempStyle = ltype !== '0' ? { width: '12rem' } : {};\n    return React.createElement(\n        'div',\n        { className: 'list' },\n        data.map(function () {\n            var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n            var i = arguments[1];\n\n            d.imgs = Array.isArray(d.imgs) ? d.imgs : [];\n            return React.createElement(\n                'div',\n                { key: i, className: 'item' },\n                ltype === '0' ? React.createElement(\n                    'div',\n                    { className: 'btn', onClick: me.handleShowCreateComment.bind(me, { coupon_id: d.coupon_id }) },\n                    '\\u70B9\\u51FB\\u4F7F\\u7528'\n                ) : null,\n                React.createElement(\n                    'div',\n                    { style: { height: '4.28rem' }, onClick: me.openPage.bind(me, '/mycoupons/' + d.coupon_id) },\n                    React.createElement('div', { className: 'icon cover', style: { backgroundPosition: 'right', backgroundSize: 'cover', backgroundImage: 'url(' + d.imgs[0] + doImg.fw(100) + ')' } }),\n                    React.createElement(\n                        'div',\n                        { className: 'content' },\n                        React.createElement(\n                            'div',\n                            { className: 'name coupon', style: tempStyle },\n                            '\\u3010' + d.seller.name + '\\u3011',\n                            ' ',\n                            d.title,\n                            ' ',\n                            d.desc_title,\n                            ' '\n                        ),\n                        ltype === '1' ? React.createElement(\n                            'div',\n                            { className: 'end coupon' },\n                            misc.formatDateTime(new Date(d.end_dt * 1000), misc.formatType['1']),\n                            ' \\u4F7F\\u7528'\n                        ) : React.createElement(\n                            'div',\n                            { className: 'end coupon' },\n                            misc.formatDateTime(new Date(d.end_dt * 1000), misc.formatType['1']),\n                            ' \\u5230\\u671F'\n                        )\n                    )\n                )\n            );\n        }),\n        me.page >= Math.ceil(count / me.limit) - 1 ? React.createElement(NoMoreData, { type: data.length ? 'nomoredata' : 'nodata' }) : React.createElement(Spin.Spin2, null)\n    );\n};\n\n// {\n//     me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />\n// }\n\n// {\n//     data.length ? (\n//         <div className=\"item\">\n//             <div className=\"icon cover circle\"></div>\n//             <div className=\"content\">\n//                 <div className=\"name follow\"></div>\n//             </div>\n//         </div>\n//     ) : null\n// }\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/MyCoupons.js\n// module id = 306\n// module chunks = 32\n\n//# sourceURL=webpack:///./src/pages/quyou/MyCoupons.js?")}});