import '../../components/Sign/index.scss'
import app from '../../components/Sign/images/app.png'
import signin from '../../components/Sign/images/signin.png'
const seconds = 60 * 3
const smsLength = 4
const isDoing='正在'
export default class Index extends Quyou{
    state = {
        validityState: '',
        sendStatus: 0,
        countTime: seconds,
    }
    validityStateEmpty(me) {
        this.time1=setTimeout(()=>{
            me.setState({
                validityState: '',
            }) 
        }, 800)
    }
    handleSendSMSClick(e){
        const me = this
        const { validityState } = me.state
        if(validityState.indexOf('正在')>=0){
            return
        }
        const { mobile } = me.refs
        if(!mobile.value){
            me.setState({
                validityState: '手机号码不能为空！',
            })
            me.validityStateEmpty(me)
            return
        }
        if(!misc.validatePhone(mobile.value)){
            me.setState({
                validityState: '手机号码不合规则！',
            })
            me.validityStateEmpty(me)
            return
        }
        me.setState({
            validityState: '正在发送...',
        })
        me.requestAPI(APIS.API_MY_GET_LOGIN_CODE,{
            mobile: mobile.value
        },(response)=>{
            // {"msg":"","data":true,"code":0}
            const { msg, code } = response
            if(code){
                me.setState({
                    validityState: msg,
                })
            }else{
                me.setState({
                    validityState: '短信已发送，请查收！',
                })
                me.setState({
                    sendStatus: 1
                })
                me.interval = setInterval(() => {
                    let { countTime } = me.state
                    --countTime
                    me.setState({
                        countTime,
                    })
                    if(countTime === 0){
                        clearInterval(me.interval)
                        me.setState({
                            sendStatus: 2,
                            countTime: seconds,
                        })
                    }
                }, 1000)
            }
            me.validityStateEmpty(me)
        })
    }
    handleSignInClick(e){
        const me = this
        const { validityState } = me.state
        if(validityState.indexOf('正在')>=0){
            return
        }
        const { mobile, sms } = me.refs
        if(!mobile.value){
            me.setState({
                validityState: '手机号码不能为空！',
            })
            me.validityStateEmpty(me)
            return
        }
        if(!misc.validatePhone(mobile.value)){
            me.setState({
                validityState: '手机号码不合规则！',
            })
            me.validityStateEmpty(me)
            return
        }
        if(!sms.value){
            me.setState({
                validityState: '短信验证码不能为空！',
            })
            me.validityStateEmpty(me)
            return
        }
        if(sms.value.length!==smsLength){
            me.setState({
                validityState: `短信验证码应是${smsLength}位字符！`,
            })
            me.validityStateEmpty(me)
            return
        }
        me.setState({
            validityState: '正在登录...',
        })
        me.requestAPI(APIS.API_MY_CHECK_LOGIN_CODE,{
            mobile: mobile.value,
            code: sms.value
        },(response)=>{
            const { msg, code, data = {} } = response
            if(code){
                me.setState({
                    validityState: msg,
                })
                me.validityStateEmpty(me)
            }else{
                misc.setCookie('user', JSON.stringify({ ...data, mobile: mobile.value }))
                 
                me.setState({
                    validityState: '登录成功！',
                }, () => {
                    me.jump = setTimeout(()=>{
                        me.handleBack()
                    }, 800)
                })
            }
        })
    }
    componentDidMount(){
        document.body.style.overflowY='hidden'
    }
    componentWillUnmount(){
        this.interval && clearInterval(this.interval)
        this.time1 && clearTimeout(this.time1)
        this.jump && clearTimeout(this.jump)
        document.body.style.overflowY='auto'
    }
    handleBack(){
        window.history.back()
    }
	render(){
        const me = this
        const { 
            handleSendSMS = (e) => {

            },
            handleSignIn = (e) => {
            } 
        } = this.props
        const {
            validityState,
            sendStatus,
            countTime,
        } = this.state
        return (
            <div className="sign">
                <div className="close" onClick={me.handleBack}>
                    <i className="icon" />
                </div>
                <img className="app" src={app} /> 
                <div className="input-list">
                    <div className="input-item">
                        <div className="txt">手机号</div>
                        <input type="tel" placeholder="点此输入手机号码" maxLength="11" ref="mobile" defaultValue="" autoFocus/>
                    </div>
                    <div className="clearboth thinner-border"></div>
                    <div className="input-item">
                        <div className={classnames({sms:true,disable:sendStatus===1})} onClick={this.handleSendSMSClick.bind(this)}>
                            {}
                            {
                                sendStatus ? ( sendStatus > 1 ? `重新发送` : `${countTime} s` ) : `发送短信`
                            }
                        </div>
                        <div className="txt">验证码</div>
                        <input type="tel" placeholder="点此输入短信验证码" maxLength={smsLength} ref="sms" defaultValue=""/>
                    </div>
                    <div className="clearboth thinner-border"></div>
                </div>
                <img className="signin" src={signin} onClick={this.handleSignInClick.bind(this)} /> 
                <div className="validate-result">{validityState}</div>
            </div>
        )
    }
}