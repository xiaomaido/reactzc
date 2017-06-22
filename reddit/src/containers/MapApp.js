import React, { Component, PropTypes } from 'react'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

// 容器型组件
export default class MapApp extends Component{
	constructor(props){
		console.log('constructor')
		// props.dispatch=store.dispatch // Can't add property dispatch, object is not extensible
		super(props)

		// bind方法会创建一个新函数,称为绑定函数.当调用这个绑定函数时,绑定函数会以创建它时传入bind方法的第一个参数作为this,传入bind方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数.
		// 
		// this.selectChange=(e)=>{ // 不用bind函数的话，会导致this this.props在函数里面无法调用，这样有些参数会调用不到
		// 	alert(e.target.value) 
		// }
		// 重声明事件
		this.selectChange=this.selectChange.bind(this) 
		this.refreshClick=this.refreshClick.bind(this)
		this.dispatch=store.dispatch
		
		// 声明变量
		this.selectOptions=[
			{
				id:"nba",
				name:"NBA"
			}
			,{
				id:"rockets",
				name:"休斯顿火箭"
			}
			,{
				id:"goldenstatewarriors",
				name:"金州勇士"
			}
			,{
				id:"losangeleslakers",
				name:"洛杉矶湖人"
			}
			,{
				id:"chicagobulls",
				name:"芝加哥公牛"
			}
			,{
				id:"indianapacers",
				name:"印第安纳步行者"
			}
			,{
				id:"sanantoniospurs",
				name:"圣安东尼奥马刺"
			}
			,{
				id:"jamesharden",
				name:"哈登（The Beard）"
			}
			// ,{
			// 	id:"tmactime",
			// 	name:"麦迪（T-MAC）"
			// }
			,{
				id:"kobebryant",
				name:"科比·布兰恩特（唠嗑）"
			}
			// ,{
			// 	id:"paulgeorge",
			// 	name:"保罗·乔治（泡椒）"
			// }
			,{
				id:"dwyanewade",
				name:"德怀恩·韦德（骚韦）"
			}
			,{
				id:"kevindurant",
				name:"凯文·杜兰特（杜四娘）"
			}
			,{
				id:"lebronjames",
				name:"勒布朗·詹姆斯（猩猩）"
			}
		]
	}
	componentWillMount(){
		console.log('componentWillMount')
	}
	render(){
		console.log('render')
		let _this=this
		let _props=_this.props
		console.log(_props)
		let style1={
			float:'left'
		}
		let style2={
			float:'left',
			lineHeight:'66px'
		}
		return (
			<div>
				<p>
					{ 
						_props.receivedAt && <span>最近一次更新于 { new Date(Date.now()).toString() } </span>
					}
					{
						!_props.isFetching && <a href="javascript:;" onClick={_this.refreshClick} >点击刷新</a>
					}
				</p>
				<Picker selectValue={_props.selectedSubreddit} selectOptions={_this.selectOptions} selectChange={_this.selectChange}  />
				{
					_props.isFetching && !_props.items.length && 
					<div>
						<img src="http://www.weichongming.com/quanbao/static/assets/images/mobile/loading.jpg" style={style1} />
						<span style={style2}>加载中...</span>
					</div>
				}
				{
					!_props.isFetching && !_props.items.length&&<div>没有数据哦！</div>
				}
				{
					_props.items.length>=1 && 
					<div style={{ opacity: _props.isFetching?0.5:1 }} >
						<Posts items={_props.items} />
					</div>
				}
			</div>
		)
	}
	componentDidMount(e){
		console.log('componentDidMount')
		let _props=this.props
		// 为什么这里的this.props没有dispatch这个函数，应该有的。。。
		this.dispatch(_props.requestPostsFetchIfNeed(_props.selectedSubreddit))
	}
	componentWillReceiveProps(nextProps){
		console.log('componentWillReceiveProps')
		if(nextProps.selectedSubreddit!==this.props.selectedSubreddit){
			this.dispatch(this.props.requestPostsFetchIfNeed(nextProps.selectedSubreddit))
		}
	}
	componentWillUpdate(){
		console.log('componentWillUpdate')
	}
	componentDidUpdate(){
		console.log('componentDidUpdate')
	}
	componentWillUnmount(){

	}
	selectChange(e){
		const nextSubreddit=e.target.value
		console.log(nextSubreddit)
		this.dispatch(this.props.selectSubreddit(nextSubreddit))
	}
	refreshClick(e){
		e.preventDefault()
		let _props=this.props
	    this.dispatch(_props.invalidateSubreddit(_props.selectedSubreddit))
	    this.dispatch(_props.requestPostsFetchIfNeed(_props.selectedSubreddit))
	}
}