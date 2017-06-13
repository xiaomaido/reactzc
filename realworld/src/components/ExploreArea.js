import React, { Component } from 'react'
import Explore from './Explore'

const GITHUB_HOME="https://github.com/"
const GITHUB_REPO="xiaomaido/reactzc"
const GITHUB_URL=GITHUB_HOME+GITHUB_REPO

export default class ExploreArea extends Component{
	render(){
		const { keyword,handleChange } = this.props
		return (
			<div>
				<p>请输入Github的登录名login（例如：xiaomaido）或者登录名login/项目名repo（例如：xiaomaido/reactzc），然后点击“搜索”按钮</p>
				<Explore keyword={keyword} handleChange={handleChange} />
				<p>
					<span>该项目源代码在 </span>
					<a target="_blank" href={GITHUB_URL} style={{textDecoration:'none'}} activeStyle={{color: 'red'}}>{GITHUB_REPO}</a>
					<span> ，欢迎访问！</span>
				</p>
			</div>
		)
	}
}