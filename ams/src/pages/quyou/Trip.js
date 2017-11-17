import bar from '../../images/quyou/trip/bar.png'
import bus from '../../images/quyou/trip/bus.png'
export default class Index extends Quyou{
	render(){
        return (
            <div className="trip">
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