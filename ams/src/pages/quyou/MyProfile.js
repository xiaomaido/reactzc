export default class Index extends Quyou{
	render(){
        const avatar=`https://img.xiaohongshu.com/avatar/59bfafb2b46c5d19b53e851b.jpg@120w_120h_92q_1e_1c_1x.jpg?wm=160&hm=160&q=92`
        return (
            <div className="my-profile">
                <ul className="link-list">
                    <li className="avatarbox">
                        <div className="icon avatar" style={{backgroundImage:`url(${avatar})`}}></div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="text">上传头像</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div className="name">用户名</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div className="name">手机号</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="text">修改</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div className="name">性别</div>
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