import ptflzq from '../../images/quyou/banner/ptflzq.png'
import gg from '../../images/quyou/banner/gg.png'
import stncp from '../../images/quyou/banner/stncp.png'

export default class Index extends Quyou{
	renderContent(){
        // document.title='趣游崇明'
        return (
            <div className="mall">
                <ul className="ad-list">
                    <li>
                        <a href={ true ? `${window.isHashHistory}/mallfuli`:`https://jd.com`} className="icon big" style={{backgroundImage:`url(${ptflzq})`}}></a>
                    </li>
                    <li>
                        <a href={ !true ? `${window.isHashHistory}/`:`https://jd.com`} className="icon small" style={{backgroundImage:`url(${gg})`}}>
                            <div className="ad">广告</div>
                        </a>
                    </li>
                    <li>
                        <a href={ !true ? `${window.isHashHistory}/`:`http://zhigou.55haitao.com`} className="icon big" style={{backgroundImage:`url(${stncp})`}}></a>
                    </li>
                </ul>
            </div>
        )
    }
} 