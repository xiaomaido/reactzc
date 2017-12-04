import React, { Component } from 'react'
import './index2.scss'
export default class Index extends Component{
    state = {
        showOptions: false,
        showTitle: '',
        partId: '-1',
        optionId: '-1',
    }
	render(){
        const _this = this
        const { 
            parts = [
                {
                    id:'1', 
                    title:'板块',
                    options: [
                        {
                            title:'板块',
                            id:'-1', 
                        },
                        {
                            title:'吃',
                            id:'1', 
                        },
                        {
                            title:'住',
                            id:'2', 
                        },
                        {
                            title:'游',
                            id:'3', 
                        },
                        {
                            title:'购',
                            id:'4', 
                        },
                    ],
                }, 
                null ,
                {
                    id:'2', 
                    title:'类型',
                    options: [
                        {
                            title:'类型',
                            id:'-1', 
                        },
                        {
                            title:'娱乐',
                            id:'1', 
                        },
                        {
                            title:'搞笑',
                            id:'2', 
                        },
                        {
                            title:'幽默',
                            id:'3', 
                        },
                    ],
                }, 
            ],
            thinnerBorder = true,
        } = _this.props
        const { showTitle, partId, showOptions } = _this.state
        return (
            <div>
                {
                    showOptions ? <Mask /> : null
                }
                <div className="select-box">
                    { 
                        thinnerBorder ? <div className="clearboth thinner-border"></div> : null
                    }
                    <div className="select-header">
                        {
                            parts.map((d,i)=>{
                                return d ? <div key={i} className="select-column" onClick={_this.handleClick.bind(_this,d)}>{d.id===partId?(showTitle||d.title):d.title}<i className={ d.id===partId && showOptions ? 'tran-up' : 'tran-down'} /></div> : <div key={i} className="clearboth thin-border-verical"></div>
                            })
                        }
                    </div>
                    { 
                        thinnerBorder ? <div className="clearboth thinner-border"></div> : null
                    }
                    <div className="clearboth thinner-border"></div>  
                    {
                        showOptions ? <Options part={parts.find(d=>d && d.id===partId)} _this={_this} /> : null
                    }
                </div>
            </div>
        )
    }
    handleClick(part, e){
        const _this = this
        let { partId, showOptions } = _this.state
        showOptions = showOptions ? (partId!=='-1' ? ( partId !== part.id ? true : false) : true) : true
        let nextState = {
            showOptions,
            partId:'-1',
        }
        if(showOptions){
            nextState = {
                ...nextState,
                partId:part.id,
            }
        }
        if(partId !== part.id){
            nextState = {
                ...nextState,
                showTitle:'',
                optionId: '-1',
            }
        }
        _this.setState(nextState)
    }
    handleOptionClick(option, e){
        const _this = this
        let nextState = {
            showOptions:false,
            optionId:option.id,
        }
        if(option.id!=='-1'){
            nextState = {
                ...nextState,
                showTitle:option.title,
            }
        }else{
            nextState = {
                ...nextState,
                showTitle:'',
                partId:'-1',
            }
        }
        _this.setState(nextState)
    }
}
const Options = (props) => {
    const { part, _this } = props
    const { optionId } = _this.state
    return part ? (
        <ul className="select-options">
            {
                part.options.map((d,i)=>{
                    return (
                        <li key={d.id} className={optionId?(optionId===d.id?'active':''):(i===0?'active':'')} onClick={_this.handleOptionClick.bind(_this,d)}>
                            <div className="title">{d.title}</div> 
                            <div className="clearboth thinner-border"></div> 
                        </li>
                    )
                })
            }
        </ul>
    ):null
}