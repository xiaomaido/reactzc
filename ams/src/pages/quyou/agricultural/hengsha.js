
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
                        <a className="first" href={ !true ? `${window.isHashHistory}/`:`https://h5.youzan.com/v2/goods/26z26oit13omm?showsku=true`}>
                            <div className="xiaolongxia icon"></div>
                            <div className="title">
                                小龙虾
                                <div className="sub-title" style={{visibility: 'hidden'}}>
                                [专业合作单位]
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="first" href={ true ? `${window.isHashHistory}/`:`https://h5.youzan.com/v2/goods/3nqhvflh1030u?showsku=true`}>
                            <div className="zuixie icon"></div>
                            <div className="title">
                                醉蟹
                                <div className="sub-title" style={{visibility: 'hidden'}}>
                                [专业合作单位]
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }


}