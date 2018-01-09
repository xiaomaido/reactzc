export default class Index extends Quyou{
    constructor(props){
        super(props)
        // misc.setCookie('user','{"token": "abc","uid": 1,"nickname": "qy_deabc", "mobile": "13248238215"}')
        this.state={
            user: this.user
        }
    }
    signOut(){
        misc.clearCookie('user')
        this.user = { token: ''}
        this.setState({
            user: this.user
        })
    }
	renderContent(){
        const me = this
        const { user: my } = me
        // console.log(my)
        // {
        //     my.uid?<div className="icon" onClick={me.openPage.bind(me,`/mymsg`)}><span></span></div>:null
        // }
        return (
            <div className="my">
                <div className="icon headbox">
                    <div className="icon wave"></div>
                    <div className="icon avatar" style={{backgroundImage:`url(${my.headimg||avatar_url})`}}></div>
                    <div className="arrow-box" onClick={me.openPage.bind(me,my.uid ? `/myprofile` : `/signin`)}>
                        <i className="icon" />
                    </div>
                    <div className="user-info">
                        <div className="nick">
                            {
                                my.uid?(my.nickname||'我的昵称'):'您还未登录'
                            }
                            {/* <div className="icon" onClick={me.openPage.bind(me,`/mymsg`)}><span></span></div> */}
                        </div>
                        {
                            my.uid ? <div className="account">ID：QY500{my.uid}</div> : <div className="account" onClick={me.openPage.bind(me,'/signin')}>点此登录</div>
                        }
                    </div>
                </div>
                <div className="thinner-border clearboth"></div>
                <ul className="link-list">
                    {/* <li onClick={me.openPage.bind(me,my.uid ? `/mycoupons` : `/signin`)}>
                        <i className="icon seller" />
                        <div className="name">我的优惠券</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li> */}
                    {/* <li onClick={me.openPage.bind(me,my.uid ? `/shophot` : `/signin`)}>
                        <i className="icon collect" />
                        <div className="name">我收藏的</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li> */}
                    {/* <li onClick={me.openPage.bind(me,my.uid ? `/shophot` : `/signin`)}>
                        <i className="icon liked" />
                        <div className="name">我赞过的</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li> */}
                    {
                        my.uid ? (
                            <li onClick={me.signOut.bind(me)}>
                                <i className="icon liked" />
                                <div className="name">退出登录</div>
                                <div className="arrow-box">
                                    <span className="icon" />
                                </div>
                                <div className="thinner-border clearboth"></div>
                            </li>
                        ):null
                    }
                </ul>
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.shareTextObjSetting({
            title:`趣游崇明`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
    }
} 