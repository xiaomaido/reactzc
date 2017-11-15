
export default class Index extends Quyou{
	render(){
        const avatar=`https://img.xiaohongshu.com/avatar/59bfafb2b46c5d19b53e851b.jpg@120w_120h_92q_1e_1c_1x.jpg?wm=160&hm=160&q=92`
        return (
            <div className="my">
                <div className="icon headbox">
                    <div className="icon wave"></div>
                    <div className="icon avatar" style={{backgroundImage:`url(${avatar})`}}></div>
                    <div className="user-info">
                        <div className="nick">机智の登登</div>
                        <div className="account">ID:13248238215</div>
                    </div>
                </div>
                <div className="thinner-border clearboth"></div>
            </div>
        )
    }
} 