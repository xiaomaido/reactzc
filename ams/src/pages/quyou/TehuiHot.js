import banner from '../../images/quyou/banner/lvyoujie.png'
const imgSlideList=[
    {
        img: banner,
        url: ``,
        // url: `/guidance`,
    },
]
const img = 'http://sfmimg.b0.upaiyun.com/prod_00/3d3c5d9334cbc75e.png!/fw/800'
export default class Index extends Quyou{
	renderContent(){
        document.title='2018旅游节'
        const me = this
		return (
            <div className="tehui-hot">
                <TouchSlideBox imgSlideList={imgSlideList} />
                <ul className="icon-list">
                    <li>
                        <div className="icon icon1"></div>
                        <div className="menu-icon-name">9.9元专区</div>
                    </li>
                    <li>
                        <div className="icon icon2"></div>
                        <div className="menu-icon-name">29元专区</div>
                    </li>
                    <li>
                        <div className="icon icon3"></div>
                        <div className="menu-icon-name">59元专区</div>
                    </li>
                    <li>
                        <div className="icon icon4"></div>
                        <div className="menu-icon-name">99元专区</div>
                    </li>
                    <li>
                        <div className="icon icon5"></div>
                        <div className="menu-icon-name">299元专区</div>
                    </li>
                </ul>
                <Content me={me} />
            </div>
        )
    }
}
const Content = (props) => {
    let {
        me,
    } = props
    return (
        <ul className="userlist">
            <li>
                <div className="userarea">
                    <div className="logo-img" style={{backgroundImage: `url(${img})`}}></div>
                    <div className="userinfo">
                        <div
                            className="follow"
                            onClick={()=>{
                                // if(sessionStorage) {
                                //     sessionStorage.setItem(FETCH_PAGE, JSON.stringify({
                                //         response: me.state[FETCH_PAGE],
                                //         scrollTop: getScrollTop(),
                                //         page: me.page
                                //     }))
                                // }
                                // me.openPage(`${pathname}/${d.id}?_t=${type}`)
                                me.openPage(`/shophot/167/`)
                            }}    
                        >查看详情</div>
                        <div className="tag">餐饮名店</div>
                        <div className="objname">瀛洲人家</div>
                    </div>
                </div>
                <div className="thinner-border"></div>
            </li>
        </ul>
    )
}
