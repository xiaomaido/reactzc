const API_SAVE_PROPERTY = APIS.API_MY_UPDATE_PROFILE
export default class Index extends Quyou{
    state={
        showCreateComment: false,
        textOkay: this.initTextOkay,
        user: this.user
    }
	handleSaveComment({ API_SAVE_PROPERTY, FETCH_PAGE, property = 'nickname', query = {} }, e){
        const me = this
        const { state, initTextOkay } = me
		const { valueCreateComment, textOkay } = state
		const { params } = me.props
		if(textOkay === initTextOkay && valueCreateComment) {
			me.setState({
				textOkay: `${initTextOkay}中...`,
            })
            debugger
			me.requestAPI(API_SAVE_PROPERTY,{
                ...query,
				[property]: valueCreateComment,
                token: me.user.token,
			},(response)=>{
				const { code = 0, data } = response
				if(code) {
					me.setState({
						textOkay: initTextOkay,
					})
					return
				}
                const user = {
                    ...me.user,
                    ...data,
                }
				me.setState({
					textOkay: initTextOkay,
					showCreateComment: false,
                    valueCreateComment: '',
                    user,
                })
                misc.setCookie('user',JSON.stringify(user))
			})
		}
	}
	renderContent(){
        const me = this
        const { showCreateComment, textOkay, user: my } = me.state
        // console.log(my.token)
        return (
            <div className="my-profile">
                {
				    showCreateComment ? 
                        <CreateComment
                            defaultValue={my.nickname}
                            maxLength={20}
                            textPlaceholder='想一个有意思的昵称吧～'
                            textTitle='修改昵称'
                            textOkay={textOkay} 
                            handleClickCancel={me.handleShowCreateComment.bind(me)} 
                            handleClickOkay={me.handleSaveComment.bind(me, { API_SAVE_PROPERTY, property: 'nickname', query: {
                                headimg: my.headimg
                            } })} 
                            handleChangeInput={me.handleChangeCreateComment.bind(me)} /> : null
			    }
                <ul className="link-list">
                    <li className="avatarbox">
                        <div className="icon avatar" style={{backgroundImage:`url(${my.headimg||avatar_url})`}}></div>
                        <div className="arrow-box" onClick={me.handleUploadAvatar.bind(me)}>
                            <span className="icon" />
                        </div>
                        <div className="text" onClick={me.handleUploadAvatar.bind(me)}>{my.id?`修改`:`上传`}头像</div>
                        <div className="thinner-border clearboth"></div>
                        
                    </li>
                    <li>
                        <div className="name">昵称</div>
                        <div className="arrow-box" onClick={me.handleShowCreateComment.bind(me)}>
                            <span className="icon" />
                        </div>
                        <div className="text" onClick={me.handleShowCreateComment.bind(me)}>{my.nickname}</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    <li>
                        <div className="name">手机</div>
                        <div className="arrow-box">
                        </div>
                        {/* <div className="text">修改</div> */}
                        <div className="text">{my.mobile}</div>
                        <div className="thinner-border clearboth"></div>
                    </li>
                    {/* <li>
                        <div className="name">性别</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="text">{my.sex||'请选择'}</div>
                        <div className="thinner-border clearboth"></div>
                    </li> */}
                    {/* <li>
                        <div className="name">所在地</div>
                        <div className="arrow-box">
                            <span className="icon" />
                        </div>
                        <div className="text">{my.location||'未知'}</div>
                        <div className="thinner-border clearboth"></div>
                    </li> */}
                </ul>
                {/* <form encType="multipart/form-data" id="headimgform">
                    <input type="file" name="filename" id="headimginput" accept="image/png,image/jpg,image/jpeg,image/gif" onChange={me.upload.bind(me)} />
                </form> */}
            </div>
        )
    }
    handleUploadAvatar(e){
    }
    componentDidMount(){
        // this.headimgform = document.getElementById('headimgform')
        // this.headimginput = document.getElementById('headimginput')
    }
    upload(element,formId,succ,fail){
        const form = new FormData(this.headimgform)
        const oReq = new XMLHttpRequest()
        oReq.open("POST", "http://qyadmin.weichongming.com/peanut/fileUpload", true)
        // oReq.open("POST", "/peanut/fileUpload", true)
        oReq.onload = function(oEvent) {
            console.log(oReq.status)
            if (oReq.status == 200) {
                console.log(oReq.response)
                // succ&&succ(element,JSON.parse(oReq.response))
            } else {
                fail&&fail()
            }
        };
        oReq.send(form)
    }
} 