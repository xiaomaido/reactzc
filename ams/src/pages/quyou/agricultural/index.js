
import './index.scss'

export default class Index extends Quyou{
    renderContent(){
        return  <Content />
    }
    componentDidMount() {
        const me = this
        me.shareTextObjSetting({
            title:`趣游崇明之农产品专区`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
    }
}
class Content extends React.Component {
    state = {
        agStyle: {}
    }
    componentWillMount(){
    	window.scrollTo(0, 0)
    }
    componentDidMount() {
        this.setState({
            agStyle: {
                height: window.innerHeight - 2.2*window.fontSize
            }
        })
    }

    render ()  {
        return (
            <div className="mall ag-guidance" style={this.state.agStyle}>
                <ul className="list">
                    <li>
                        <a className="first" href={ !true ? `${window.isHashHistory}/`:`http://m.chongnongpi.com/index.jsp`}>
                            <div className="dami icon"></div>
                            <div className="title">
                                崇明大米专区
                                <div className="sub-title">[官方认证单位]</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="first" href={ !true ? `${window.isHashHistory}/`:`http://quyou.zenongji.com.cn/mobile/`}>
                            <div className="tese icon"></div>
                            <div className="title">
                                特色农产品专区
                                <div className="sub-title">[专业合作单位]</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="first" href={ true ? `${window.isHashHistory}/hengsha`:``}>
                            <div className="hengsha icon"></div>
                            <div className="title">
                                横沙专区
                                <div className="sub-title" style={{visibility: 'hidden'}}>
                                [专业合作单位]
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="first" href={ !true ? `${window.isHashHistory}/hengsha`:`http://haiyan.weichongming.com/index`}>
                            <div className="hengsha icon" style={{backgroundImage:'url(http://haiyan.weichongming.com/static/images/share/logo.jpg)'}}></div>
                            <div className="title">
                                瀛洲香韵
                                <div className="sub-title">
                                [崇明烟草直营店购物指南]
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }


}