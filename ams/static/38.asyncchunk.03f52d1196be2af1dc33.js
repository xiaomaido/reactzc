webpackJsonp([38],{290:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// import Confirm from '../../components/Confirm'\n\nvar initStateResponse = {\n\tdata: {\n\t\tcomment_count: 0,\n\t\tcomments: [],\n\t\timgs: [],\n\t\tis_like: 0,\n\t\tlike_count: 0\n\t}\n};\nvar ID = 'id';\n\nvar API_MY_COUPON_RECEIVE = APIS.API_MY_COUPON_RECEIVE;\nvar API_PAGE_LIKE = APIS.API_EAT_SHOP_LIKE;\nvar FETCH_PAGE = TYPES.FETCH_SHOP_DETAIL;\n\nvar Index = function (_Quyou) {\n\t_inherits(Index, _Quyou);\n\n\tfunction Index() {\n\t\tvar _ref, _this$state;\n\n\t\tvar _temp, _this, _ret;\n\n\t\t_classCallCheck(this, Index);\n\n\t\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\t\targs[_key] = arguments[_key];\n\t\t}\n\n\t\treturn _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = (_this$state = {}, _defineProperty(_this$state, FETCH_PAGE, {\n\t\t\tresponse: initStateResponse\n\t\t}), _defineProperty(_this$state, 'showCreateComment', false), _defineProperty(_this$state, 'valueCreateComment', ''), _defineProperty(_this$state, 'textOkay', _this.initTextOkay), _defineProperty(_this$state, 'isLike', false), _this$state), _temp), _possibleConstructorReturn(_this, _ret);\n\t}\n\n\t_createClass(Index, [{\n\t\tkey: 'renderContent',\n\t\tvalue: function renderContent() {\n\t\t\twindow.state = this.state;\n\t\t\t// document.title='商家信息'\n\t\t\tvar me = this;\n\t\t\tvar _me$state$FETCH_PAGE = me.state[FETCH_PAGE],\n\t\t\t    fetching = _me$state$FETCH_PAGE.fetching,\n\t\t\t    _me$state$FETCH_PAGE$ = _me$state$FETCH_PAGE.response,\n\t\t\t    response = _me$state$FETCH_PAGE$ === undefined ? initStateResponse : _me$state$FETCH_PAGE$;\n\n\t\t\treturn fetching ? React.createElement(Spin, null) : response.code === 0 ? React.createElement(Content, { response: response, me: me }) : null;\n\t\t}\n\t}, {\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\t\t\tvar me = this;\n\t\t\tvar query = me.props.location.query;\n\n\t\t\tvar _t = query._t || 'EAT';\n\t\t\tvar API_PAGE = APIS['API_' + _t + '_SHOP_DETAIL'];\n\t\t\tme.requestDetail(me, FETCH_PAGE, API_PAGE);\n\t\t}\n\t\t// handleReceiveCoupon({coupon_id,stock}){\n\t\t// \tconst me=this\n\t\t// \tif(stock){\n\t\t// \t\tme.requestAPI(API_MY_COUPON_RECEIVE,{\n\t\t// \t\t\tcoupon_id,\n\t\t// \t\t\ttoken: me.user.token,\n\t\t// \t\t},(response={})=>{\n\t\t// \t\t\tconst { code=-1, data=\"\", msg=\"\" } = response\n\t\t// \t\t\t// {\"msg\":\"已经领取\",\"data\":\"\",\"code\":20012}\n\t\t// \t\t\tif(code){\n\t\t// \t\t\t\tconst codeMap = {\n\t\t// \t\t\t\t\t'20012': '您已经领取过该优惠券哦！'\n\t\t// \t\t\t\t}\n\t\t//                 Confirm.show({\n\t\t// \t\t\t\t\ttitle: '领取失败',\n\t\t// \t\t\t\t\tdesc: codeMap[code]||msg,\n\t\t// \t\t\t\t\tcallBacks: [\n\t\t// \t\t\t\t\t\t// {text: '我知道了', onClick: () => {Confirm.close()}},\n\t\t// \t\t\t\t\t\t// {text: '选择2', onClick: () => {}}\n\t\t// \t\t\t\t\t\t{\n\t\t// \t\t\t\t\t\t\ttext: '查看优惠券',\n\t\t// \t\t\t\t\t\t\tonClick: () => {\n\t\t// \t\t\t\t\t\t\t\tConfirm.close()\n\t\t// \t\t\t\t\t\t\t\tme.openPage(`/mycoupons?ltype=0`)\n\t\t// \t\t\t\t\t\t\t}\n\t\t// \t\t\t\t\t\t},\n\t\t// \t\t\t\t\t\t// {\n\t\t// \t\t\t\t\t\t// \ttext: '我知道了',\n\t\t// \t\t\t\t\t\t// \tonClick: () => {\n\t\t// \t\t\t\t\t\t// \t\tConfirm.close()\n\t\t// \t\t\t\t\t\t// \t}\n\t\t// \t\t\t\t\t\t// },\n\t\t// \t\t\t\t\t]\n\t\t// \t\t\t\t})\n\t\t// \t\t\t\treturn\n\t\t// \t\t\t}\n\t\t// \t\t\t// {\"msg\":\"\",\"data\":true,\"code\":0}\n\t\t// \t\t\t// alert('领取成功')\n\t\t// \t\t\tConfirm.show({\n\t\t// \t\t\t\ttitle: '领取成功',\n\t\t// \t\t\t\tdesc: '快去使用吧~',\n\t\t// \t\t\t\tcallBacks: [\n\t\t// \t\t\t\t\t{\n\t\t// \t\t\t\t\t\ttext: '查看优惠券',\n\t\t// \t\t\t\t\t\tonClick: () => {\n\t\t// \t\t\t\t\t\t\tdebugger\n\t\t// \t\t\t\t\t\t}\n\t\t// \t\t\t\t\t},\n\t\t// \t\t\t\t\t// {\n\t\t// \t\t\t\t\t// \ttext: '我知道了',\n\t\t// \t\t\t\t\t// \tonClick: () => {\n\t\t// \t\t\t\t\t// \t\tConfirm.close()\n\t\t// \t\t\t\t\t// \t}\n\t\t// \t\t\t\t\t// },\n\t\t// \t\t\t\t]\n\t\t// \t\t\t})\n\t\t// \t\t\tconst FETCH_TEMP = me.state[FETCH_PAGE]\n\t\t// \t\t\tconst temp = FETCH_TEMP.response.data.coupon.find(d=>d.id===coupon_id)\n\t\t// \t\t\ttemp.reciev_count += 1\n\t\t// \t\t\tthis.setState({\n\t\t// \t\t\t\t[FETCH_PAGE]: FETCH_TEMP\n\t\t// \t\t\t})\n\t\t// \t\t})\n\t\t// \t}\n\t\t// }\n\n\t}]);\n\n\treturn Index;\n}(Quyou);\n\nexports.default = Index;\n\nvar Content = function Content(props) {\n\tvar response = props.response,\n\t    me = props.me;\n\tvar _response$data = response.data,\n\t    data = _response$data === undefined ? {} : _response$data;\n\tvar _me$state = me.state,\n\t    showCreateComment = _me$state.showCreateComment,\n\t    textOkay = _me$state.textOkay;\n\tvar _location2 = _location,\n\t    query = _location2.query;\n\n\tvar _t = query._t || 'EAT';\n\tvar API_PAGE_LIKE = APIS['API_' + _t + '_SHOP_LIKE'];\n\tvar API_PAGE_COMMENT = APIS['API_' + _t + '_SHOP_COMMENT'];\n\tdata.activities = Array.isArray(data.activities) ? data.activities : [];\n\tdata.description = data.description || '';\n\tvar Composed = React.createElement(\n\t\t'div',\n\t\t{ className: 'necker', style: { padding: 0 } },\n\t\tReact.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'necker-box' },\n\t\t\tReact.createElement(ProductList, { list: data.coupon, me: me, activities: data.activities })\n\t\t)\n\t);\n\t// {\n\t// \tdata.description.split('<br>').map((d,i)=><div className=\"descrip\" key={i}>{d}</div>)\n\t// }\n\t// <div className=\"open-more\">展开更多 ^</div>\n\t// <ProductList list={data.coupon} me={me} activities={data.activities} />\n\treturn data.id ? React.createElement(\n\t\t'div',\n\t\t{ className: 'shop-detail' },\n\t\tReact.createElement(\n\t\t\t'ul',\n\t\t\t{ className: 'building-nav' },\n\t\t\tReact.createElement(\n\t\t\t\t'li',\n\t\t\t\t{ onClick: me.openPage.bind(me, '/') },\n\t\t\t\t'\\u8DA3\\u6E38\\u5D07\\u660E\\u9996\\u9875'\n\t\t\t),\n\t\t\tReact.createElement(\n\t\t\t\t'li',\n\t\t\t\t{ onClick: me.openPage.bind(me, '/buildinghot') },\n\t\t\t\t'\\u67E5\\u770B\\u5EFA\\u7B51\\u5217\\u8868'\n\t\t\t)\n\t\t),\n\t\tReact.createElement(Intro, { data: data, needCover: true, Composed: Composed }),\n\t\tReact.createElement('div', { className: 'gap' }),\n\t\tReact.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'necker' },\n\t\t\tReact.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'necker-box' },\n\t\t\t\tReact.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'intro' },\n\t\t\t\t\tReact.createElement('span', null),\n\t\t\t\t\t'\\u7B80\\u4ECB'\n\t\t\t\t),\n\t\t\t\tReact.createElement('div', { className: 'clearboth thinner-border' }),\n\t\t\t\tReact.createElement('div', { style: { paddingTop: '0.5rem', paddingRight: '1.1rem' }, dangerouslySetInnerHTML: { __html: data.description || '' } }),\n\t\t\t\tReact.createElement('div', { className: 'clearboth' })\n\t\t\t)\n\t\t)\n\t) : null;\n};\nvar ProductList = function ProductList(props) {\n\tvar list = props.list,\n\t    me = props.me,\n\t    _props$activities = props.activities,\n\t    activities = _props$activities === undefined ? [] : _props$activities;\n\n\treturn React.createElement(\n\t\t'div',\n\t\t{ className: 'video clearboth' },\n\t\tArray.isArray(activities) ? activities.map(function (d, i) {\n\t\t\tif (new Date() < new Date(d.start_dt * 1000) || new Date() > new Date(d.end_dt * 1000)) return null;\n\t\t\treturn React.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ key: i },\n\t\t\t\tReact.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ style: { padding: '10px 0 2px' } },\n\t\t\t\t\tReact.createElement('div', { className: 'clearboth thinner-border' })\n\t\t\t\t),\n\t\t\t\tReact.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'title activity' },\n\t\t\t\t\tReact.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'activity' },\n\t\t\t\t\t\t'\\u6D3B'\n\t\t\t\t\t),\n\t\t\t\t\t'\\u8FD1\\u671F\\u6D3B\\u52A8'\n\t\t\t\t),\n\t\t\t\tReact.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'descrip activity' },\n\t\t\t\t\t'\\u6D3B\\u52A8\\u540D\\uFF1A',\n\t\t\t\t\td.title,\n\t\t\t\t\tReact.createElement('br', null),\n\t\t\t\t\t'\\u5185\\u5BB9\\uFF1A',\n\t\t\t\t\tReact.createElement('br', null),\n\t\t\t\t\td.description\n\t\t\t\t)\n\t\t\t);\n\t\t}) : null,\n\t\tArray.isArray(list) ? React.createElement(\n\t\t\t'div',\n\t\t\tnull,\n\t\t\tReact.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ style: { padding: '10px 0 2px' } },\n\t\t\t\tReact.createElement('div', { className: 'clearboth thinner-border' })\n\t\t\t),\n\t\t\tReact.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'title' },\n\t\t\t\tReact.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\tnull,\n\t\t\t\t\t'\\u60E0'\n\t\t\t\t),\n\t\t\t\t'\\u5546\\u5BB6\\u4F18\\u60E0'\n\t\t\t),\n\t\t\tReact.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'vlist' },\n\t\t\t\tReact.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'ul-box' },\n\t\t\t\t\tReact.createElement(\n\t\t\t\t\t\t'ul',\n\t\t\t\t\t\t{ style: { width: list.length * fontSize * (220 + 30) / 40 - 0.75 * fontSize } },\n\t\t\t\t\t\tlist.map(function (d, i) {\n\t\t\t\t\t\t\td.imgs = Array.isArray(d.imgs) ? d.imgs : [];\n\t\t\t\t\t\t\treturn d ? React.createElement(\n\t\t\t\t\t\t\t\t'li',\n\t\t\t\t\t\t\t\t{ key: i },\n\t\t\t\t\t\t\t\tReact.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'icon poster', style: { backgroundPosition: 'right', backgroundSize: 'cover', backgroundImage: 'url(' + d.imgs[0] + doImg.fw() + ')' } },\n\t\t\t\t\t\t\t\t\td.reciev_count ? React.createElement(\n\t\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t\t{ className: 'sold' },\n\t\t\t\t\t\t\t\t\t\td.reciev_count,\n\t\t\t\t\t\t\t\t\t\t'\\u4EBA\\u5DF2\\u9886'\n\t\t\t\t\t\t\t\t\t) : null\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\tReact.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'text text-elip' },\n\t\t\t\t\t\t\t\t\td.title\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\tReact.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'price text-elip' },\n\t\t\t\t\t\t\t\t\td.desc_title\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\tReact.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: classnames({ btn: true, enable: d.stock }), onClick: me.openPage.bind(me, '/mycoupons/' + d.id) },\n\t\t\t\t\t\t\t\t\t'\\u6211\\u8981\\u9886\\u53D6'\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t) : null;\n\t\t\t\t\t\t})\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t),\n\t\t\tReact.createElement('div', { className: 'gap' })\n\t\t) : null\n\t);\n};\n/*\n<div className={classnames({btn:true,enable:d.stock})} onClick={me.handleReceiveCoupon.bind(me,{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tcoupon_id:d.id,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tstock:d.stock,\n\t\t\t\t\t\t\t\t\t\t\t\t\t})}>{d.stock?`立即领取`:`已领取完`}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t*/\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/quyou/BuildingDetail.js\n// module id = 290\n// module chunks = 38\n\n//# sourceURL=webpack:///./src/pages/quyou/BuildingDetail.js?")}});