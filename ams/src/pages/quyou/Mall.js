import youhui from '../../images/quyou/banner/youhui.png'
import inext from '../../images/quyou/banner/inext.png'
import notice from '../../images/quyou/banner/notice.png'
import ptflzq from '../../images/quyou/banner/pic-ptfl.png'
import stncp from '../../images/quyou/banner/stncp.png'
import dami from '../../images/quyou/banner/findyou.png'
// document.domain = "caibaojian.com";
// const setIframeHeight = (iframeId) => {
//     const iframe = document.getElementById(iframeId)
//     if (iframe) {
//         var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
//         if (iframeWin.document.body) {
//             iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
//         }
//     }
// }

export default class Index extends Quyou{
    componentWillMount(){
    	window.scrollTo(0, 0)
    }
    componentDidMount(){
        const me = this
        me.shareTextObjSetting({
            title:`趣游崇明之好物`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
        // window.onload = function () {
        //     setIframeHeight(document.getElementById('external-frame'))
        // }
    }
	renderContent(){
        // document.title='趣游崇明'
        return (
            <div className="mall" style={{paddingBottom:'3.8rem'}}>
                <ul className="ad-list">
                    <li>
                        {/* <a href={ !true ? `${window.isHashHistory}/`:`http://m.chongnongpi.com/index.jsp`} className="icon big" style={{backgroundImage:`url(${dami})`}}>
                        </a> */}
                        <a href={ !true ? `${window.isHashHistory}/paperhot/226?_t=FAVORD`:`http://weixin.shmaishuang.com/app/index.php?i=79&c=entry&m=ewei_shopv2&do=mobile&r=article&aid=1155`} className="icon big" style={{backgroundImage:`url(${dami})`}}>
                        </a>
                    </li>
                    <li>
                        <a href={ true ? `${window.isHashHistory}/mallfuli?ltype=0&has_coupon=1`:`javascript:;`} className="icon big" style={{backgroundImage:`url(${ptflzq})`}}></a>

                        <div className="notice-box" onClick={this.openPage.bind(this, '/paperhot/214?_t=FAVORD')}>
                            <a>查看详情<img src={inext} /></a>
                            <img className="abc" src={notice} />
                            <span>请务必知晓使用须知的内容</span>
                        </div>
                    </li>
                    {/*<li>*/}
                        {/*<a href={ true ? `${window.isHashHistory}/paperhot/126?_t=FAVORD`:`javascript:;`} className="icon small" style={{backgroundImage:`url(${youhui})`}}>*/}
                        {/*</a>*/}
                    {/*</li>*/}
                    {/* <li>
                        <a href={ !true ? `${window.isHashHistory}/`:`http://www.zenongji.cn/wap/index.php`} className="icon small" style={{backgroundImage:`url(http://www.zenongji.cn/public/attachment/201705/25/10/59263d9a11c47.jpg)`}}>
                            <div className="ad">广告</div>
                        </a>
                    </li> */}
                    <li>
                        <a href={ true ? `${window.isHashHistory}/agricultural` : 'javascript:;'} className="icon big" style={{backgroundImage:`url(${stncp})`, backgroundSize: 'cover'}}></a>
                    </li>
                </ul>
            </div>
        )
    }
} 


// <iframe src={zenongji} frameBorder="0" scrolling="no" id="external-frame" onLoad={setIframeHeight('external-frame')}></iframe>
