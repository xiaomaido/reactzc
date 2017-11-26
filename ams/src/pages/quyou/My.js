
export default class Index extends Quyou{
    state={
        my:{
            avatar_url
        }
    }
	render(){
        const { my } = this.state
        return (
            <div className="my">
                <div className="icon headbox">
                    <div className="icon wave"></div>
                    <div className="icon avatar" style={{backgroundImage:`url(${my.avatar_url})`}}></div>
                    <div className="arrow-box" onClick={this.openPage.bind(this,`/myprofile`)}>
                        <i className="icon" />
                    </div>
                    <div className="user-info">
                        <div className="nick">{my.name||'昵称'}</div>
                        <div className="account">ID:{my.id}</div>
                    </div>
                </div>
                <div className="thinner-border clearboth"></div>
                <ul className="link-list">
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
        const { FETCH_MY_PROFILE } = TYPES
        const { API_MY_PROFILE } = APIS
        if(FETCH_MY_PROFILE in ResponseState){
            this.setState({
                my: ResponseState[FETCH_MY_PROFILE]
            })
            return false
        }
        this.requestAPI(API_MY_PROFILE,{},(res)=>{
            ResponseState[FETCH_MY_PROFILE]=res
            this.setState({
                my: ResponseState[FETCH_MY_PROFILE]
            })
        },(err)=>{

        })
        // this.requestAPI(`/users/xiaomaido`,{
        //     id:10086,
        //     name:'tom',
        // })
    }
} 