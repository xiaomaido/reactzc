import React, { Component } from 'react'
import './index.scss'
export default class Index extends Component{
    constructor(props){
        super(props)
        let { options = [], showOptions = false } = props
        options = Array.isArray(options) ? options : [ { title:'板块', id:'-1', } ]
        this.state = {
            showOptions,
            options,
            optionId: 0,
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        let { options = [], showOptions = false } = nextProps
        this.setState({
            showOptions,
            options,
        })
    }
	render(){
        const _this = this
        const { 
            thinnerBorder = true,
            part,
            handleSelectBoxChageColumn = () => {},
            handleSelectBoxChage = () => {},
        } = _this.props
        const { showTitle, showOptions, options, optionId } = _this.state
        return (
            <div className="select-box">
                <div className="select-header">
                    {
                        <div className="select-column" onClick={_this.handleClick.bind(_this, { handleSelectBoxChageColumn })}>
                            {options[optionId].title}
                            <i className={ showOptions ? 'tran-up' : 'tran-down'} />
                        </div>
                    }
                </div>
                { 
                    thinnerBorder ? <div className="clearboth thinner-border"></div> : null
                }
                {
                        showOptions ? (
                            <div>
                                <div style={{height:1}}><div className="clearboth thinner-border"></div></div>
                                <Options _this={_this} handleSelectBoxChage={handleSelectBoxChage} handleSelectBoxChageColumn={handleSelectBoxChageColumn} />
                            </div>
                        ) : null
                }
            </div>
        )
    }
    handleClick({handleSelectBoxChageColumn}, e){
        handleSelectBoxChageColumn()
    }
    handleOptionClick({ option, handleSelectBoxChage, handleSelectBoxChageColumn }, e){
        const _this = this
        let nextState = {
            // showOptions:false,
            optionId:option.id,
        }
        this.setState(nextState)
        handleSelectBoxChageColumn()
        handleSelectBoxChage(option)
    }
}
const Options = (props) => {
    const { 
        _this, 
        handleSelectBoxChageColumn = () => {},
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
                            handleSelectBoxChageColumn,
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