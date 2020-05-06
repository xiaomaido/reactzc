const opacity=0.5
export default class Index extends Quyou{
    constructor(props){
        super(props)
        this.state={
            user: this.user
        }
        // misc.setCookie('user','{"nickname":"大胡子哈登","uid":11,"is_v":"0","headimg":"http://upyun.wocaoapp.com.com/prod_00/dad34defeb681dc6.jpeg","token":"c/p6F3gJWa/wpFjVAS4zKyZyirfa/s6Gc9SWkfWU1pVRxXg6DpvH+Eki4kWqMrzW3/mmUdW55HujpY+xXKKnpw==","mobile":"13248238215"}')
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
                    <li onClick={me.openPage.bind(me,my.uid ? `/mycouponexchange` : `/signin`)}>
                        <i className="icon seller" />
                        <div className="name">兑换码领券</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li onClick={me.openPage.bind(me,my.uid ? `/mycoupons?ltype=0` : `/signin`)}>
                        <i className="icon coupon" />
                        <div className="name">我的优惠券</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
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
                    <li onClick={me.openPage.bind(me,my.uid ? `/myfollows` : `/signin`)}>
                        <i className="icon liked" />
                        <div className="name">我的关注</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div style={{opacity}}>
                            <i className="icon card" />
                            <div className="name">趣游一卡通</div>
                            <div className="arrow-box">
                                <span className="icon" />
                            </div>
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div style={{opacity}}>
                            <i className="icon activity" />
                            <div className="name">我的活动</div>
                            <div className="arrow-box">
                                <span className="icon" />
                            </div>
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div style={{opacity}}>
                            <i className="icon diary" />
                            <div className="name">我的日记</div>
                            <div className="arrow-box">
                                <span className="icon" />
                            </div>
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    {
                        my.uid ? (
                            <li onClick={me.signOut.bind(me)}>
                                <i className="icon quit" />
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