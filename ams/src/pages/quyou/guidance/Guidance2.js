import './guidance2.scss';
import ditu from './ditu.jpg';

function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

function noneAll() {
    let oNone = document.querySelectorAll('.ditu-info-none')
    console.log(oNone.length)
     if (oNone.length !== 12){
        console.log('4325')
         let oNames = document.querySelectorAll(".ditu-info");
         for(let i = 0; i < oNames.length; i++) {
                 oNames[i].classList.remove('ditu-info-block');
                 oNames[i].classList.add('ditu-info-none');
             }
         }
}

function cancelBubble(e) {
    let evt = e ? e : window.event;
    if (evt.stopPropagation) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
}
function  onStart(e,name){
    let oNames = document.querySelectorAll(".ditu-info");
    for(let i = 0; i < oNames.length; i++) {
        cancelBubble(e);
        let activeName = isInArray(oNames[i].classList, name)
        if (activeName) {
            oNames[i].classList.remove('ditu-info-none');
            oNames[i].classList.add('ditu-info-block');
        } else {
            oNames[i].classList.remove('ditu-info-block');
            oNames[i].classList.add('ditu-info-none');
        }
    }
}
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
                height: window.innerHeight - 2.2*window.fontSize,
                width: window.innerHeight - 2.2*window.fontSize,
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
                        <div className="ditu" style={this.state.imgStyle}  onClick={()=> noneAll()}>
                            <div className="ditu-p dtsd icon" onClick={(e)=> onStart(e,"odtsd")}>
                                <div className="ditu-info ditu-info-none odtsd" >
                                    <a href={this.guildDetailUrl(37)}>东滩湿地公园</a>
                                </div>
                            </div>

                            <div className="ditu-p qwstc icon" onClick={(e)=> onStart(e,"oqwstc")}>
                                <div className="ditu-info ditu-info-none oqwstc">
                                    <a href={this.guildDetailUrl(36)}>前卫生态村</a>
                                </div>
                            </div>
                            <div className="ditu-p jnsmwhc icon" onClick={(e)=> onStart(e,"ojnsmwhc")}>
                                <div className="ditu-info ditu-info-none ojnsmwhc">
                                    <a href={this.guildDetailUrl(44)}>江南三民文化村</a>
                                </div>
                            </div>
                            <div className="ditu-p ydstc icon" onClick={(e)=> onStart(e,"oydstc")}>
                                <div className="ditu-info ditu-info-none oydstc">
                                    <a href={this.guildDetailUrl(46)}>瀛东生态村</a>
                                </div>
                            </div>
                            <div className="ditu-p zhly icon" onClick={(e)=> onStart(e,"ozhly")}>
                                <div className="ditu-info ditu-info-none ozhly">
                                    <a href={this.guildDetailUrl(38)}>紫海鹭缘浪漫爱情主题公园</a>
                                </div>
                            </div>
                            <div className="ditu-p gjzsty icon" onClick={(e)=> onStart(e,"ogjzsty")}>
                                <div className="ditu-info ditu-info-none ogjzsty">
                                    <a href={this.guildDetailUrl(39)}>高家庄生态园</a>
                                </div>
                            </div>
                            {/*<div className="ditu-p cmxg icon">*/}
                                {/*<div className="ditu-info">*/}
                                    {/*<a href={`${window.isHashHistory}/guidance/1`}>崇明学宫</a>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="ditu-p dpgjsl icon" onClick={(e)=> onStart(e,"odpgjsl")}>
                                <div className="ditu-info ditu-info-none odpgjsl">
                                    <a href={this.guildDetailUrl(19)}>东平国家森林公园</a>
                                </div>
                            </div>
                            <div className="ditu-p rhgy icon" onClick={(e)=> onStart(e,"orhgy")}>
                                <div className="ditu-info ditu-info-none orhgy">
                                    <a href={this.guildDetailUrl(43)}>瑞华果园</a>
                                </div>
                            </div>
                            <div className="ditu-p xsmz icon" onClick={(e)=> onStart(e,"oxsmz")}>
                                <div className="ditu-info ditu-info-none oxsmz">
                                    <a href={this.guildDetailUrl(40)}>西沙·明珠湖景区</a>
                                </div>
                            </div>
                            <div className="ditu-p cxjy icon" onClick={(e)=> onStart(e,"ocxjy")}>
                                <div className="ditu-info ditu-info-none ocxjy">
                                    <a href={this.guildDetailUrl(99)}>长兴郊野公园</a>
                                </div>
                            </div>
                            <div className="ditu-p xdkxnc icon" onClick={(e)=> onStart(e,"oxdkxnc")}>
                                <div className="ditu-info ditu-info-none oxdkxnc">
                                    <a href={`${window.isHashHistory}/shophot/155?_t=SLEEP`}>香朵开心农场</a>
                                </div>
                            </div>
                            <div className="ditu-p dhjgkxnc icon" onClick={(e)=> onStart(e,"odhjgkxnc")}>
                                <div className="ditu-info ditu-info-none odhjgkxnc">
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