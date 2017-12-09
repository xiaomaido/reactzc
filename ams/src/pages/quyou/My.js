export default class Index extends Quyou{
    state={
        FETCH_MY_PROFILE:{
            response:{
                avatar_url
            }
        }
    }
	renderContent(){
        const me = this
        const { FETCH_MY_PROFILE } = me.state
        const my = FETCH_MY_PROFILE.response
        return (
            <div className="my">
                {
                    FETCH_MY_PROFILE.fetching ? <Spin /> : null
                }
                <div className="icon headbox">
                    <div className="icon wave"></div>
                    <div className="icon avatar" style={{backgroundImage:`url(${my.avatar_url})`}}></div>
                    <div className="arrow-box" onClick={me.openPage.bind(me,me.user_id ? `/myprofile` : `/signin`)}>
                        <i className="icon" />
                    </div>
                    <div className="user-info">
                        <div className="nick">
                            {my.name||'您还未登录'}
                            {
                                me.user_id?<div className="icon" onClick={me.openPage.bind(me,`/mymsg`)}><span></span></div>:null
                            }
                        </div>
                        {
                            me.user_id ? <div className="account">ID:{my.id}</div> : <div className="account" onClick={me.openPage.bind(me,'/signin')}>点此登录</div>
                        }
                    </div>
                </div>
                <div className="thinner-border clearboth"></div>
                <ul className="link-list">
                    <li onClick={me.openPage.bind(me,me.user_id ? `/mycoupons` : `/signin`)}>
                        <i className="icon seller" />
                        <div className="name">我的优惠券</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li onClick={me.openPage.bind(me,me.user_id ? `/shophot` : `/signin`)}>
                        <i className="icon collect" />
                        <div className="name">我收藏的</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li onClick={me.openPage.bind(me,me.user_id ? `/shophot` : `/signin`)}>
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
    componentDidMount(){
        // const { FETCH_MY_PROFILE } = me.state
        // if(TYPES.FETCH_MY_PROFILE in ResponseState){
        //     me.setState({
        //         FETCH_MY_PROFILE: ResponseState[TYPES.FETCH_MY_PROFILE]
        //     })
        //     return false
        // }
        // me.setState({
        //     FETCH_MY_PROFILE: {
        //         ...FETCH_MY_PROFILE,
        //         fetching: 1,
        //     }
        // })
        // me.requestAPI(APIS.API_MY_PROFILE,{},(response)=>{
        //     ResponseState[TYPES.FETCH_MY_PROFILE]={
        //         response,
        //         fetching: 0
        //     }
        //     me.setState({
        //         FETCH_MY_PROFILE: ResponseState[TYPES.FETCH_MY_PROFILE]
        //     })
        // },(err)=>{

        // })
        // me.requestAPI(`/users/xiaomaido`,{
        //     id:10086,
        //     name:'tom',
        // })
    }
} 