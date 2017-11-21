import { CommentFixed, CommentList, PostDetail } from './Quyou'
export default class Index extends Quyou{
	state = {
		showCreateComment: false,
		valueCreateComment: ''
	}
	render(){
        document.title='美食攻略'
		const { showCreateComment } = this.state
		return (
			<div className="yummy-detail">
				{
					showCreateComment ? <CreateComment handleChangeInput={this.handleChangeCreateComment.bind(this)} handleClickOkay={this.handleSaveCreateComment.bind(this)} handleClickCancel={this.handleShowCreateComment.bind(this)} /> : null
				}
				<CommentFixed handleLike={this.handleLike.bind(this)} handleShowCreateComment={this.handleShowCreateComment.bind(this)} />
				<PostDetail isVideoPost={true} /> 
				<CommentList total={28} list={[{},{},{},{},{}]} />
            </div>
		)
	}
	handleLike(e){

	}
	handleShowCreateComment(e){
		const { showCreateComment } = this.state
		this.setState({
			showCreateComment: !showCreateComment
		})
	}
	handleSaveCreateComment(e){
		const { valueCreateComment } = this.state
		if(valueCreateComment){
			alert(valueCreateComment)
		}
	}
	handleChangeCreateComment(e){
		this.setState({
			valueCreateComment: e.target.value
		})
	}
}