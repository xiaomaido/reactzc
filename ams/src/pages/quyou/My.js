export default class Index extends Quyou{
    state={
        FETCH_MY_PROFILE:{
            response:{
                avatar_url
            }
        }
    }
	render(){
        const { FETCH_MY_PROFILE } = this.state
        const my = FETCH_MY_PROFILE.response
        return (
            <div className="my">
                {
                    FETCH_MY_PROFILE.fetching ? <Spin /> : null
                }
                <div className="icon headbox">
                    <div className="icon wave"></div>
                    <div className="icon avatar" style={{backgroundImage:`url(${my.avatar_url})`}}></div>
                    <div className="arrow-box" onClick={this.openPage.bind(this,`/myprofile`)}>
                        <i className="icon" />
                    </div>
                    <div className="user-info">
                        <div className="nick">
                            {my.name||'昵称'}
                            {
                                my.id?<div className="icon" onClick={this.openPage.bind(this,`/mymsg`)}><span></span></div>:null
                            }
                        </div>
                        <div className="account">ID:{my.id}</div>
                    </div>
                </div>
                <div className="thinner-border clearboth"></div>
                <ul className="link-list">
                    <li onClick={this.openPage.bind(this,`/mycoupons`)}>
                        <i className="icon seller" />
                        <div className="name">我的优惠券</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li onClick={this.openPage.bind(this,`/shophot`)}>
                        <i className="icon collect" />
                        <div className="name">我收藏的</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li onClick={this.openPage.bind(this,`/shophot`)}>
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
        const { FETCH_MY_PROFILE } = this.state
        if(TYPES.FETCH_MY_PROFILE in ResponseState){
            this.setState({
                FETCH_MY_PROFILE: ResponseState[TYPES.FETCH_MY_PROFILE]
            })
            return false
        }
        this.setState({
            FETCH_MY_PROFILE: {
                ...FETCH_MY_PROFILE,
                fetching: 1,
            }
        })
        this.requestAPI(APIS.API_MY_PROFILE,{},(response)=>{
            ResponseState[TYPES.FETCH_MY_PROFILE]={
                response,
                fetching: 0
            }
            this.setState({
                FETCH_MY_PROFILE: ResponseState[TYPES.FETCH_MY_PROFILE]
            })
        },(err)=>{

        })
        // this.requestAPI(`/users/xiaomaido`,{
        //     id:10086,
        //     name:'tom',
        // })
    }
} 