const API_SAVE_PROPERTY = APIS.API_MY_UPDATE_PROFILE
export default class Index extends Quyou{
    state={
        showCreateComment: false,
        textOkay: this.initTextOkay,
        user: this.user,
        uploadText: '上传头像'
    }
	handleSaveComment({ API_SAVE_PROPERTY, property = 'nickname', query = {} }, e){
        const me = this
        const { state, initTextOkay } = me
		const { valueCreateComment, textOkay } = state
		const { params } = me.props
		if(textOkay === initTextOkay && valueCreateComment) {
			me.setState({
				textOkay: `${initTextOkay}中...`,
            })
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
        const { showCreateComment, textOkay, user: my, uploadText } = me.state
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
                        <div className="arrow-box" >
                            <span className="icon" />
                        </div>
                        <div className="text">{uploadText}</div>
                        <div className="thinner-border clearboth"></div>
                        <form encType="multipart/form-data" id="headimgform">
                            <input type="file" name="file" accept="image/png,image/jpg,image/jpeg,image/gif" onChange={me.upload.bind(me,{ API_SAVE_PROPERTY, property: 'headimg', query: {
                                nickname: my.nickname
                            }})} />
                        </form>
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
            </div>
        )
    }
    upload({ API_SAVE_PROPERTY, property = 'headimg', query = {} }){
        const me = this
        const { uploadText } = me.state
        if(uploadText === `上传中...`) return false
        me.setState({
            uploadText: `上传中...`
        })
        const fail = () => {
            me.setState({
                uploadText: `上传失败，重新上传`
            })
        }
        const form = new FormData(document.getElementById('headimgform'))
        const oReq = new XMLHttpRequest()
        // oReq.open("POST", "/peanut/fileUpload", true)
        oReq.open("POST", "http://quyou.weichongming.com/peanut/fileUpload", true)
        oReq.onload = function(oEvent) {
            console.log(oReq)
            if (oReq.status === 200) {
                // debugger
                // const res = {url: "http://sfmimg.b0.upaiyun.com/prod_00/2caa03cd39ecd102.png", code: 0}
                const res=JSON.parse(oReq.response)
                // console.log(res)
                if(res.code === 0){
                    me.requestAPI(API_SAVE_PROPERTY,{
                        ...query,
                        [property]: res.url,
                        token: me.user.token,
                    },(response)=>{
                        debugger
                        const { code = 0, data } = response
                        if(code) {
                            fail&&fail()
                            return
                        }
                        const user = {
                            ...me.user,
                            ...data,
                        }
                        me.setState({
                            uploadText: `上传成功，重新上传`,
                            user,
                        })
                        misc.setCookie('user',JSON.stringify(user))
                    })
                }else{
                    fail&&fail()
                }
            } else {
                fail&&fail()
            }
        };
        oReq.send(form)
    }
} 