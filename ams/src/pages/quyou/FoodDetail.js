const initStateResponse = {
	data: {
        stag_names: [],
        images: [],
        custom_avg: 0,
		comment_count: 0, 
		comments: [],
		is_like: 0,
        like_count: 0,
        rec_desc: '',
        star_count: 5,
	}
}
const ID = 'id'
const API_PAGE_LIKE = APIS.API_EAT_FOOD_LIKE
const API_PAGE_COMMENT = APIS.API_EAT_FOOD_COMMENT
const API_PAGE = APIS.API_EAT_FOOD_DETAIL
const FETCH_PAGE = TYPES.FETCH_EAT_FOOD_DETAIL
export default class Index extends Quyou{
    state = {
        [FETCH_PAGE]:{
            response: initStateResponse
        },
		showCreateComment: false,
		valueCreateComment: '',
		textOkay: this.initTextOkay,
		isLike: false,
	}
	renderContent(){
        // document.title='美食信息'
        const me = this
		const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
		const me = this
		me.requestDetail(me,FETCH_PAGE,API_PAGE)
	}
}
const Content = (props) => {
    const { response, me } = props
    const { data = {}  } = response
    const { showCreateComment, textOkay } = me.state
    data.stag_names = Array.isArray(data.stag_names) ? data.stag_names : []
    return data.id ? (
        <div className="shop-detail food-detail">
            <div className="fooder">
                <div className="stars-permoney">
                    <StarsShow number={data.star_count} />
                    <div className="permoney clearboth">¥{data.custom_avg}/人</div>
                </div>
                <div className="food-name">{data.title}</div>
                <div className="discount-tags">
                    <ul className="discount">
                        {
                            data.rec_desc.split(' ').map((da,i)=><li key={i}>{da}</li>)
                        }
                    </ul>
                    <ul className="tags">
                        {
                            data.stag_names.map((da,i)=><li key={i}>{da.tagname}</li>)
                        }
                    </ul>
                </div>
                <PictureList list={data.images} me={me} />
                <div className="clearboth thinner-border"></div>
            </div>
            <Intro data={data.seller_info} handleJump={me.openPage.bind(me,  `/shophot/${data.seller_info.id}`)} />
            <div className="gap"></div>
            <div className="necker">
                <div className="necker-box">
                    <div className="intro"><span></span>菜品介绍</div>
                    <div className="clearboth thinner-border"></div>
                    <div className="descrip">{data.description}</div>
                    {/* <div className="open-more">展开更多 ^</div> */}
                    {/* <div className="clearboth thinner-border"></div>
                    <div className="discount">
                        <div className="title"><div>惠</div>本品优惠</div>
                        <div className="buy-box">
                            <div className="left">
                                <div className="price">￥24.9<span>原价￥36.9</span></div>
                            </div>
                            <div className="right">抢购</div>
                        </div>
                    </div> */}
                </div>
            </div>
			{
				showCreateComment ? 
					<CreateComment 
						textOkay={textOkay} 
						handleClickOkay={me.handleSaveCreateComment.bind(me, { API_PAGE_COMMENT, FETCH_PAGE, ID })} 
						handleClickCancel={me.handleShowCreateComment.bind(me)} 
						handleChangeInput={me.handleChangeCreateComment.bind(me)} /> : null
			}
			<CommentFixed 
				d={data} 
				handleLike={me.handleLike.bind(me, { API_PAGE_LIKE, FETCH_PAGE, ID })} 
				handleShowCreateComment={me.handleShowCreateComment.bind(me)} />
			<CommentList 
				total={data.comment_count} 
				list={data.comments} />
        </div>
    ): null
}
class PictureList extends React.Component{
    state={
        srcPictureShow: ''
    }
    handlePictureShow = (srcPictureShow) => {
        this.setState({
            srcPictureShow
        })
    }
    render(){
        const { srcPictureShow } = this.state
        const { list, me } = this.props
        return (
            <div className="video clearboth">
                <div className="vlist">
                    <div className="ul-box">
                        <ul style={{width:(list.length*fontSize*(200+30)/40)}}>
                            {
                                list.map((d,i)=>(
                                    <li key={i}> 
                                        <div className="icon poster" style={{backgroundImage:`url(${d})`}} onClick={this.handlePictureShow.bind(this,d)}></div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="gap"></div>
                {
                    srcPictureShow ? (
                        <div className="picture-show" >
                            <div className="close" onClick={this.handlePictureShow.bind(this,'')}><i className="icon" style={{backgroundImage:`url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAABDClKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzM1MkRBRkVDNDdFMTFFNzg4QkU5NUIzNURCRUUyNTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzM1MkRBRkRDNDdFMTFFNzg4QkU5NUIzNURCRUUyNTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IkY5Njk4MTU0MzU3MTk2OTg0M0NGQjUyRUQwNUFEMTEwIiBzdFJlZjpkb2N1bWVudElEPSJGOTY5ODE1NDM1NzE5Njk4NDNDRkI1MkVEMDVBRDExMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgK6/vQAAATmSURBVHjatFhHSyxBEK6eZ1Ywo+JFxYSYQcSTv8CfoWJExRxXwYNZVFT0KgiCOSvixZtZEcwLHrx78CTab76GXubNzqyzq69gmN2e6Z6vK3xV1XR6eso/Pj64KqS9Pj8/xf3r64v0z37jMlr35OSEv76+8j+MMdvFxQUVFhZ2kyp4qI6JC4K7HPsN0a8PcPi9srLCFxYW6P39nZT09HRS0VFfXx+XIPTyW4D0awGgoii0urrKt7e3yd/fn4qKiojhwczMDFfNSPHx8dTc3Mz0u/qfsrGxwdWLAgMDqaOjg0JCQpiCByUlJSwjI4PsdjsNDg5yq2bA5a7ptHcAWl9fJ19fXwcgjCtyQkVFBcvKyqLHx0caHh7mWn/SL6b3C6MP639rTYf77u6uAOTj40M9PT0UHBzsWIxJR5MyOTnJLy8vKSkpierr69l3Dmt1XCtbW1tc9SOhIZvNRmFhYf9MUKQ2pJSXlwtTQmMjIyPcKiC5htm4/H1wcCAAQUNdXV1OgAQoow9UVlYKYLe3tzQ0NMT1i+N9aNjIRGaAIPv7+yLsoaHOzk4KDw9nRvOZ9Bl9qOL/1NQUB4elpqZSbW2tU1Tq7660qYa80JCfn5/QUGhoKDOb7+RT8gWMg0NAFyrTCh9raGhgnpDlzs4OV8lRhD00hChztSFFPyBfBCDcQRc5OTnCx/r7+7kVM2kFGlpeXqaAgAAHIH0kOvmUK9aV97KyMpabm0tPT08OH7PC+NJkAASTSUDfiWJ1x6WlpSwzM5Pu7u4MgRkxNUwGQFpidBuU3rdkwtTSBXLl/f09jY6OcjO2lsQomRpR5lZ+dDdVQMbGxvjNzQ2lpKRQXV0d0zornBo+hOTa0tJCUVFRzN0cqljNV1qprq5maWlpgsfGx8e5/CB4CIBAjG1tbQKQJ1WGR5qSMjExwa+vr6mgoIDi4uJofn5emAwaiomJ8bi8+BEoyNzcHD86OhIaVYFQTU2NW07tkfm+i0oAkc+DgoJ+DMgyKFc8hFwWGxtL+fn59PDwYEiwVqyhfcfL091sbm7ytbU1EWVNTU3wJaY2GyIlARhSklmdb/Rbu3GX5Gm2Q8nUANTd3S0AYby4uNjB/AMDA9yspNGWS/rSyaWjm3GLLNDgP62trY7yQ/vu7OwsPz4+poSEBEfNb6Ypt9KM0SRt+dHe3u5gau1ucYfGsrOz6fn52aExM0BGSlG+c2g5SZYfMBlSB+ohI/Pok7i+utBvwMh8ipXGUaYOLy8vwdQRERHM6CP6DSKJI1fK6sJsA0711HeADg8PHYBQ5EdGRjKrlIHxqqoqUVojiSMl/ZjRke1lLoNTR0dHe0yM09PT/Pz83Km0tgwKY3t7e3xpaUloqLe390dMra350b4lJiaatm/iXSNQiDI4NaIMTq31IXeB6KNNNiOgi8bGRuayHJbgoCEA8vb2Fj7kToFmRCn6jyIq0YmDLswq2H9aLGky+BAAIew9PeBw1a1A0CWdnZ05NOakKS0g+JDsXH9y4uKqW5GHKqj5QRc4VNFqWZEV4+LiogCEwwYjk/207jJaDzU/2jdUF/KIQGgWxChNhtQhS9jfOJ+yOl9WsMnJyTgyoD9qC2RD4wmTaQH9xgme1fl5eXnddrvdhpr/7e2NxFnjy8sL/x+Hre4ezKptGb+6uuJ/BRgAWIoLPu+uT+gAAAAASUVORK5CYII=')`}}></i></div>
                            <img src={srcPictureShow} />
                        </div>
                    ) : null
                }
            </div>
        )
    }
}