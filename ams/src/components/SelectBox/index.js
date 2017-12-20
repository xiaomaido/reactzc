import React, { Component } from 'react'
import './index.scss'
export default class Index extends Component{
    constructor(props){
        super(props)
        let { options } = props
        options = Array.isArray(options) ? options : [ { title:'板块', id:'-1', } ]
        this.state = {
            showOptions: false,
            options: options,
            optionId: 0,
        }
    }
	render(){
        const _this = this
        const { 
            thinnerBorder = true,
            part,
            handleSelectBoxChage = () => {},
        } = _this.props
        const { showTitle, showOptions, options, optionId } = _this.state
        return (
            <div className="select-box">
                <div className="select-header">
                    {
                        <div className="select-column" onClick={_this.handleClick.bind(_this)}>
                            {options[optionId].title}
                            <i className={ showOptions ? 'tran-up' : 'tran-down'} />
                        </div>
                    }
                </div>
                { 
                    thinnerBorder ? <div className="clearboth thinner-border"></div> : null
                }
                {
                        showOptions ? <Options _this={_this} handleSelectBoxChage={handleSelectBoxChage} /> : null
                }
            </div>
        )
    }
    handleClick(e){
        let nextState = {
            showOptions: true,
        }
        this.setState(nextState)
    }
    handleOptionClick({ option, handleSelectBoxChage }, e){
        const _this = this
        let nextState = {
            showOptions:false,
            optionId:option.id,
        }
        this.setState(nextState)
        handleSelectBoxChage(option)
    }
}
const Options = (props) => {
    const { 
        _this, 
        handleSelectBoxChage = () => {},
    } = props
    const { optionId, options } = _this.state
    return (
        <ul className="select-options">
            {
                options.map((d,i)=>{
                    return (
                        <li key={d.id} className={optionId?(optionId===d.id?'active':''):(i===0?'active':'')} onClick={_this.handleOptionClick.bind(_this,{
                            option: d,
                            handleSelectBoxChage,
                        })}>
                            <div className="title">{d.title}</div> 
                            <div className="clearboth thinner-border"></div> 
                        </li>
                    )
                })
            }
        </ul>
    )
}