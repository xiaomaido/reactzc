export default class Index extends Quyou{
	renderContent(){
        const me = this
        const { user: my } = me
        return (
            <div className="my-profile">
                <ul className="link-list">
                    <li className="avatarbox">
                        <div className="icon avatar" style={{backgroundImage:`url(${my.avatar_url||avatar_url})`}}></div>
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
                        <div className="text">{my.nickname}</div>
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
                        <div className="text">{my.sex||'请选择'}</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    {/* <li>
                        <div className="name">所在地</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="text">{my.location||'未知'}</div>
                        <div className="thinner-border clearboth"></div>
                    </li> */}
                </ul>
            </div>
        )
    }
    componentDidMount(){
        
    }
    handleUploadAvatar(e){
        alert('选择')
    }
} 