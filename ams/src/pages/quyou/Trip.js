import bar from '../../images/quyou/trip/bar.png'
import bus from '../../images/quyou/trip/bus.png'
const imgSlideList=[
    {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511101690419&di=a98e9651e4a9db6941ab4193311bd857&imgtype=0&src=http%3A%2F%2Fstaticfile.tujia.com%2Fupload%2Finfo%2Fday_130821%2F201308211016286747_s.jpg',
        url: '/guidance',
    },
]
export default class Index extends Quyou{
	render(){
        document.title='趣游崇明'
        const me=this
        return (
            <div className="trip">
                <div className="query-box" onClick={me.openPage.bind(me, `/query`)}>
                    <div className="query">
                        <i className="icon" />
                        <span>请输入关键字查询</span>
                    </div>
                </div>
                <TouchSlideBox imgSlideList={imgSlideList} />               
                <div className="top">
                    <img className="bar" src={bar}  />
                    <div style={{height:0}}>&nbsp;</div>
                </div>
				<PictureList list={Array.apply(null,{length:5})} me={this} />
                <div className="banner-box">
                    <div className="bigsmall" onClick={this.openPage.bind(this,  `/busline`)}>
                        <div className="big"><span>打造</span>低碳环保出行</div>
                        <div className="small">公共交通线路时刻一览表</div>
                    </div>
                    <img className="bus" src={bus}  />
                </div>
                <div style={{height:0}}>&nbsp;</div>
            </div>
        )
    }
} 

const PictureList = (props) => {
    const { list, me } = props
    return (
		<div className="video clearboth">
			<div className="vlist">
				<div className="ul-box">
					<ul style={{width:(list.length*fontSize*(200+30)/40)}}>
						{
							list.map((d,i)=>(
								<li key={i} onClick={me.openPage.bind(me, `yummyhot/${i+1}`)}>
									<div className="icon poster" style={{backgroundImage:'url(http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg)'}}>
									</div>
                                    <div className="text">焦糖玛奇朵</div>
								</li>
							))
						}
					</ul>
				</div>
			</div>
			<div className="gap"></div>
		</div>
    )
}