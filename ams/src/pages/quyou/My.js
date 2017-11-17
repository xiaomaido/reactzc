
export default class Index extends Quyou{
	render(){
        const avatar=`https://img.xiaohongshu.com/avatar/59bfafb2b46c5d19b53e851b.jpg@120w_120h_92q_1e_1c_1x.jpg?wm=160&hm=160&q=92`
        return (
            <div className="my">
                <div className="icon headbox">
                    <div className="icon wave"></div>
                    <div className="icon avatar" style={{backgroundImage:`url(${avatar})`}}></div>
                    <div className="arrow-box" onClick={this.openPage.bind(this,`/myprofile`)}>
                        <i className="icon" />
                    </div>
                    <div className="user-info">
                        <div className="nick">机智の登登</div>
                        <div className="account">ID:13248238215</div>
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
} 