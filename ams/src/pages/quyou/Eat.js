import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/eat.scss'
import bar from '../../images/quyou/banner/bar.png'
import banner1 from '../../images/quyou/banner/banner1.png'
import quick0 from '../../images/quyou/icon/quick0.png'
import quick1 from '../../images/quyou/icon/quick1.png'
import quick2 from '../../images/quyou/icon/quick2.png'
import TouchSlideBox from '../../components/TouchSlideBox/'
const imgSlideList=[banner1,banner1]
class SeasonHot extends Quyou{
	render(){
        document.title='趣游崇明'
		return (
			<div className="eat">
                <TouchSlideBox imgSlideList={imgSlideList} />
                <img className="bar" src={bar} />
                <ul className="quick">
                    <li>
                        <img src={quick0} style={{float:'left'}} />
                        <div style={{textAlign:'left'}}>人气商家</div>
                    </li>
                    <li>
                        <img src={quick1} />
                        <div>人气商家</div>
                    </li>
                    <li>
                        <img src={quick2} style={{float:'right'}} />
                        <div style={{textAlign:'right'}}>人气商家</div>
                    </li>
                </ul>
            </div>
		)
	}
}
export default SeasonHot