import $ from 'jquery'

// 同步加载 
// import Button from './components/Button'
// const btn=new Button('http://zhigou.55haitao.com')
// btn.render('.btns')

// 异步加载 只有a标签存在的时候
if(document.querySelectorAll('.btns').length){
	require.ensure([],()=>{
		const Button=require('./components/Button').default
		const btn=new Button('http://zhigou.55haitao.com')
		btn.render('.btns')
	},'button')
}

if(1){
	require.ensure([],()=>{
		const Header=require('./components/Header').default
		const head=new Header()
		head.render('.header')
	},'header')
}

$('body').append('webpack learning time')
