import './index.scss'
import app from './images/app.png'
import signin from './images/signin.png'
import React, { Component } from 'react'
// import { setTimeout } from 'timers';
const seconds = 6
class Index extends Component{
    state = {
        validityState: '',
        sendStatus: 0,
        countTime: seconds,
    }
    handleSendSMSClick(e){
        const me = this
        const { mobile, sms } = me.refs
        if(!mobile.value){
            me.setState({
                validityState: '手机号码不能为空！',
            })
            setTimeout(()=>{
                me.setState({
                    validityState: '',
                }) 
            }, 800)
            return
        }
        if(!misc.validatePhone(mobile.value)){
            me.setState({
                validityState: '手机号码不合规则！',
            })
            setTimeout(()=>{
                me.setState({
                    validityState: '',
                }) 
            }, 800)
            return
        }
        me.setState({
            sendStatus: 1
        })
        const t = setInterval(() => {
            let { countTime } = me.state
            --countTime
            me.setState({
                countTime,
            })
            if(countTime === 0){
                clearInterval(t)
                me.setState({
                    sendStatus: 2,
                    countTime: seconds,
                })
            }
        }, 1000)
    }
    handleSignInClick(e){
        const { mobile, sms } = this.refs
        if(!mobile.value) return
        if(!misc.validatePhone(mobile.value)){
            alert('illegal mobile')
        }
        if(!sms.value) return
        alert('登录成功')
    }
    componentDidMount(){
        document.body.style.overflow='hidden'
        // document.body.style.overflowY='auto'
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
                        <input type="tel" placeholder="点此输入手机号码" maxLength="11" ref="mobile" value="13248238215" autoFocus/>
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
                        <input type="tel" placeholder="点此输入短信验证码" maxLength="4" ref="sms" />
                    </div>
                    <div className="clearboth thinner-border"></div>
                </div>
                <img className="signin" src={signin} onClick={this.handleSignInClick.bind(this)} /> 
                <div className="validate-result">{validityState}</div>
            </div>
        )
    }
}
export default Index