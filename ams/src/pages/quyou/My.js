export default class Index extends Quyou{
	renderContent(){
        const me = this
        const { user: my } = me
        console.log(my)
        return (
            <div className="my">
                <div className="icon headbox">
                    <div className="icon wave"></div>
                    <div className="icon avatar" style={{backgroundImage:`url(${my.avatar_url||avatar_url})`}}></div>
                    <div className="arrow-box" onClick={me.openPage.bind(me,my.uid ? `/myprofile` : `/signin`)}>
                        <i className="icon" />
                    </div>
                    <div className="user-info">
                        <div className="nick">
                            {
                                my.uid?(my.nickname||'我的昵称'):'您还未登录'
                            }
                            {
                                my.uid?<div className="icon" onClick={me.openPage.bind(me,`/mymsg`)}><span></span></div>:null
                            }
                        </div>
                        {
                            my.uid ? <div className="account">ID：QY500{my.uid}</div> : <div className="account" onClick={me.openPage.bind(me,'/signin')}>点此登录</div>
                        }
                    </div>
                </div>
                <div className="thinner-border clearboth"></div>
                <ul className="link-list">
                    <li onClick={me.openPage.bind(me,my.uid ? `/mycoupons` : `/signin`)}>
                        <i className="icon seller" />
                        <div className="name">我的优惠券</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li onClick={me.openPage.bind(me,my.uid ? `/shophot` : `/signin`)}>
                        <i className="icon collect" />
                        <div className="name">我收藏的</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li onClick={me.openPage.bind(me,my.uid ? `/shophot` : `/signin`)}>
                        <i className="icon liked" />
                        <div className="name">我喜欢的</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                </ul>
            </div>
        )
    }
} 