import { Intro } from './Quyou'
export default class Index extends Quyou{
	render(){
        document.title='限时福利'
        const { id } = this.props.params
        // {id: "134"}
        const cover = `http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg`
		return (
			<div className="xian-shi-fu-li-detail">
                <div className="fixed-footer-xian-shi">
                    <div className="left">
                        <div className="clearboth thinner-border"></div>
                        <div className="price">￥24.9<span>￥36.9</span></div>
                    </div>
                    <div className="right">抢购</div>
                </div>
                <div className="icon cover" style={{backgroundImage: `url(${cover})`}}></div>
                <div className="fu-li">
                    <div className="name">[星冰乐] 奶茶买一送一</div>
                    <div className="remain">剩余<span>518</span></div>
                </div>
                <Intro />
                <div className="publish">
                    <div className="title">抢购须知</div>
                    <div className="clearboth thinner-border"></div>
                </div>                
            </div>
		)
	}
}