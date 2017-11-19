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
        return (
            <div className="trip">
                <TouchSlideBox imgSlideList={imgSlideList} />               
                <div className="top">
                    <img className="bar" src={bar}  />
                    <div style={{height:0}}>&nbsp;</div>
                </div>
                <div className="banner-box">
                    <div className="bigsmall">
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