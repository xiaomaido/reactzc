import { PostList } from './Quyou'
export default class Index extends Quyou{
    doGood(e){
        alert('点赞成功')
    }
	render(){
        document.title='美食攻略'
        const { location } = this.props
		return (
			<div className="yummy-hot"> 
                <PostList list={Array.apply(null,{length:4})} me={this} pathname={location.pathname} />
            </div>
		)
	}
}