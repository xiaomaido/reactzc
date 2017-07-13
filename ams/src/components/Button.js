import $ from 'jquery';
import Mustache from 'mustache'
import template from '../templates/button.html'
import '../styles/button.scss'

export default class Button {
	constructor(link){
		this.link=link
	}
	render(selector){
		const $selector=$(selector)
		const content=$selector.html()
		const link=this.link
		const data={
			content
			,link
		}
		$selector.html(Mustache.render(template,data))
		$(selector).click(this.handleClick.bind(this))
	}
	handleClick(e){
        e.preventDefault();
        alert(this.link);
	}
}