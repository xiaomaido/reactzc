import ptflzq from '../../images/quyou/banner/ptflzq.png'
import stncp from '../../images/quyou/banner/stncp.png'

export default class Index extends Quyou{
    componentDidMount(){
        const me = this
        me.shareTextObjSetting({
            title:`趣游崇明之好物`,
            imgUrl:`http://qyadmin.weichongming.com/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
    }
	renderContent(){
        // document.title='趣游崇明'
        return (
            <div className="mall">
                <ul className="ad-list" style={{height:700}}>
                    <li>
                        <a href={ true ? `${window.isHashHistory}/mallfuli`:`https://jd.com`} className="icon big" style={{backgroundImage:`url(${ptflzq})`}}></a>
                    </li>
                    {/* <li>
                        <a href={ !true ? `${window.isHashHistory}/`:`http://www.zenongji.cn/wap/index.php`} className="icon small" style={{backgroundImage:`url(http://www.zenongji.cn/public/attachment/201705/25/10/59263d9a11c47.jpg)`}}>
                            <div className="ad">广告</div>
                        </a>
                    </li> */}
                    <li>
                        <a href={ !true ? `${window.isHashHistory}/`:`http://www.zenongji.cn/wap/index.php`} className="icon big" style={{backgroundImage:`url(${stncp})`}}></a>
                    </li>
                </ul>
            </div>
        )
    }
} 