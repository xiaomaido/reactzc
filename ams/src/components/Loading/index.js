import loading from './images/loading.gif'
const Index = (props) => {
    let { text = '加载中...' } = props
    return (
        <div className="loading">
            <img src={loading} />
            <div>{ text }</div>
        </div>
    )
}
export default Index