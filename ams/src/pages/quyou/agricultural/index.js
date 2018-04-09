
import './index.scss'

export default class Index extends Quyou{
    state={
    }
    renderContent(){
        // document.title='导览图'
        return  <Content />;

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

    componentDidMount() {
        this.setState({
            agStyle: {
                height: window.innerHeight - 2.2*window.fontSize,
            }
        });
    }

    render ()  {

        return (
            <div className="mall ag-guidance" style={this.state.agStyle}>
                <ul className="list">
                    <li>
                        <a className="first" >
                            <div className="dami icon"></div>
                            <div className="title">
                                崇明大米专区
                                <div className="sub-title">[官方认证单位]</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a >
                            <div className="tese icon"></div>
                            <div className="title">
                                特色农产品专区
                                <div className="sub-title">[专业合作单位]</div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }


}