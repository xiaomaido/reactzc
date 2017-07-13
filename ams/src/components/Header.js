import $ from 'jquery';
import Mustache from 'mustache'
import template from '../templates/header.html'
import '../styles/header.scss'

export default class Header {
	constructor(){
		
	}
	render(selector){
		const $selector=$(selector)
		const content=$selector.html()
		const data={
			content
		}
		$selector.html(Mustache.render(template,data))
	}
}