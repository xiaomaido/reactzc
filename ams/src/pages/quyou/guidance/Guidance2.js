import './guidance2.scss';
import ditu from './ditu.jpg';
import React from 'react';

const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const API_PAGE = APIS.API_TOUR_PIC_LIST
const FETCH_PAGE = TYPES.FETCH_TOUR_PIC_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
	renderContent(){
        // document.title='导览图'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
        
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE,API_PAGE)
        me.shareTextObjSetting({
            title:`趣游崇明之景点导览图`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
    }
}

class Content extends React.Component {
    im = null;

    state = {
        imgStyle: {
            backgroundImage:`url(${ditu})`,
            height: '32rem',
            width: '32rem'
        }
    }
    componentDidMount1() {
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        // var img=document.getElementById("tulip");
        var imgTile = new Image();
        imgTile.src = ditu;
        imgTile.onload = function() {
            ctx.drawImage(imgTile,0,0, 640, 640);
        }
    }
    componentDidMount() {
        this.setState({
            imgStyle: {
                backgroundImage:`url(${ditu})`,
                height: window.screen.height - 2.2*window.fontSize,
                width: window.screen.height - 2.2*window.fontSize,
            }
        });
    }

    guildDetailUrl = (id) => {
        return `${window.isHashHistory}/shophot/${id}?_t=TOUR`;
    }

    render ()  {
        const { response, me } = this.props
        let {
            count = 0,
            data = [],
        } = response.data
        data = Array.isArray(data) ? data : []
        return (
            <div className="mall trip-guidance">
                {/*<canvas id="myCanvas" width="640" height="640" >*/}
                    {/*Your browser does not support the HTML5 canvas tag.*/}
                {/*</canvas>*/}

                <LazyLoad height={200} offset={100}>
                    <div>
                        <div className="ditu" style={this.state.imgStyle}>
                            <div className="ditu-p dtsd icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(37)}>东滩湿地公园</a>
                                </div>
                            </div>

                            <div className="ditu-p qwstc icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(36)}>前卫生态村</a>
                                </div>
                            </div>
                            <div className="ditu-p jnsmwhc icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(44)}>江南三民文化村</a>
                                </div>
                            </div>
                            <div className="ditu-p ydstc icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(46)}>瀛东生态村</a>
                                </div>
                            </div>
                            <div className="ditu-p zhly icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(38)}>紫海鹭缘浪漫爱情主题公园</a>
                                </div>
                            </div>
                            <div className="ditu-p gjzsty icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(39)}>高家庄生态园</a>
                                </div>
                            </div>
                            {/*<div className="ditu-p cmxg icon">*/}
                                {/*<div className="ditu-info">*/}
                                    {/*<a href={`${window.isHashHistory}/guidance/1`}>崇明学宫</a>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="ditu-p dpgjsl icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(19)}>东平国家森林公园</a>
                                </div>
                            </div>
                            <div className="ditu-p rhgy icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(43)}>瑞华果园</a>
                                </div>
                            </div>
                            <div className="ditu-p xsmz icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(40)}>西沙·明珠湖景区</a>
                                </div>
                            </div>
                            <div className="ditu-p cxjy icon">
                                <div className="ditu-info">
                                    <a href={this.guildDetailUrl(99)}>长兴郊野公园</a>
                                </div>
                            </div>
                            <div className="ditu-p xdkxnc icon">
                                <div className="ditu-info">
                                    <a href={`${window.isHashHistory}/shophot/155?_t=SLEEP`}>香朵开心农场</a>
                                </div>
                            </div>
                            <div className="ditu-p dhjgkxnc icon">
                                <div className="ditu-info">
                                    <a href={`${window.isHashHistory}/shophot/72?_t=SLEEP`}>东禾九谷开心农场</a>
                                </div>
                            </div>

                            {/*<div className="ditu-p ycxmgy icon">*/}
                                {/*<div className="ditu-info">*/}
                                    {/*<a href={`${window.isHashHistory}/guidance/1`}>悦采香玫瑰园</a>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </LazyLoad>
                {/*<ul className="ad-list">*/}
                {/*<li key={0}>*/}
                {/**/}
                {/*</li>*/}
                {/*{*/}
                {/*[].map((d,i)=>(*/}
                {/*<li key={i}>*/}
                {/*<LazyLoad height={200} offset={100}>*/}
                {/*<a href={`${window.isHashHistory}/guidance/${d.id}`} className="icon big" style={{backgroundImage:`url(${d.img})`}}></a>*/}
                {/*</LazyLoad>*/}
                {/*</li>*/}
                {/*))*/}
                {/*}*/}
                {/*</ul>*/}
            </div>
        )
    }


}