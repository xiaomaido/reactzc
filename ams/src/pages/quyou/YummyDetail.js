
import goodActive from '../../images/quyou/icon/good-active.png'
import good from '../../images/quyou/icon/good.png'
export default class Index extends Quyou{
	render(){
        document.title='美食攻略'
		return (
			<div className="yummy-detail">
				<div className="fixed-footer">
					<div className="clearboth thinner-border"></div>
                	<div className="text">想搭讪，先评论</div>
                	<div className="good-box">
                        <i className="icon" style={{backgroundImage:'url('+goodActive+')'}}></i>
                		<span>26361</span>
                	</div>
				</div>
                <div className="toper">
                	<div className="title">火锅真的很好吃呐，强烈推荐徐家汇的这家那家和balabla</div>
                	<div className="heder">
                		<div className="follow"><span>+</span>关注</div>
	                	<img src={"https://img.xiaohongshu.com/avatar/59cfbaecb46c5d515aa83eee.jpg@80w_80h_90q_1e_1c_1x.jpg"} />
	                	<div className="nickname">人气小登登</div>
	                	<div className="create">2017-09-29</div>
                	</div>
                	<div className="icon cover" style={{backgroundImage:'url(http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg)'}}></div>
                	<div className="text">我也想有一个酱紫比男朋友还暖心的大金毛🌀感动到最后一个竟然笑了 太可爱🌀别人家的狗😂 我们家的四只泰迪我撞死了都跟他们没关系，有人喂饭就好了</div>
                </div>
                <div className="necker" style={{height: 400}}>
                </div>
            </div>
		)
	}
}