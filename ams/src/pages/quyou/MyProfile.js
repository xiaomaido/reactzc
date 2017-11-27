export default class Index extends Quyou{
    state={
        my:{
            avatar_url
        }
    }
    state={
        FETCH_MY_PROFILE:{
            response:{
                avatar_url
            }
        }
    }
	render(){
        const me = this
        const { FETCH_MY_PROFILE } = me.state
        const my = FETCH_MY_PROFILE.response
        return (
            <div className="my-profile">
                <ul className="link-list">
                    <li className="avatarbox">
                        <div className="icon avatar" style={{backgroundImage:`url(${my.avatar_url})`}}></div>
                        <div className="arrow-box" onClick={me.handleUploadAvatar.bind(me)}>
                            <span className="icon" />
                        </div>
                        <div className="text">{my.id?`修改`:`上传`}头像</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div className="name">用户名</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="text">{my.login}</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div className="name">手机号</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        {/* <div className="text">修改</div> */}
                        <div className="text">{my.mobile||'13248238215'}</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div className="name">性别</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="text">{my.sex||'男'}</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div className="name">所在地</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="text">{my.location||'未知'}</div>
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
    }
    handleUploadAvatar(e){
        alert(1)
    }
} 