import ptflzq from '../../images/quyou/banner/ptflzq.png'
import stncp from '../../images/quyou/banner/stncp.png'
const zenongji = `http://www.zenongji.cn/wap/index.php`
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
    state = {
        htmlContent: `<h3 ><span style="color:#Da4453"><ins><strong>经常会听到有人说，读大学有什么用？</strong></ins></span></h3> <h4 >你看那北大毕业的还有卖猪肉的，清华毕业的还当保安，我手下刚招来的985大学的高材生，来了还不是要从打杂开始干？</h4> <h4 ><br></h4> <h4 >还有人说，你看那些当年的高考状元，哪个成为行业领袖了？应试教育不行，净教出一些死读书的书呆子。</h4> <h4 ><br></h4>`
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
        // const { htmlContent = '' } = this.state
        // const dangerouslyContent = {
        //     __html: htmlContent
        // }
        // <div style={{padding: '1rem'}} dangerouslySetInnerHTML={dangerouslyContent}/>
        return (
            <div className="mall">
                <ul className="ad-list" style={{height:700}}>
                    <li>
                        <a href={ !true ? `${window.isHashHistory}/mallfuli`:`javascript:;`} className="icon big" style={{backgroundImage:`url(${ptflzq})`}}></a>
                    </li>
                    {/* <li>
                        <a href={ !true ? `${window.isHashHistory}/`:`http://www.zenongji.cn/wap/index.php`} className="icon small" style={{backgroundImage:`url(http://www.zenongji.cn/public/attachment/201705/25/10/59263d9a11c47.jpg)`}}>
                            <div className="ad">广告</div>
                        </a>
                    </li> */}
                    <li>
                        <a href={ !true ? `${window.isHashHistory}/` : zenongji} className="icon big" style={{backgroundImage:`url(${stncp})`}}></a>
                    </li>
                </ul>
            </div>
        )
    }
} 


// <iframe src={zenongji} frameBorder="0" scrolling="no" id="external-frame" onLoad={setIframeHeight('external-frame')}></iframe>
