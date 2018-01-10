import './index.scss'
const Index = ({type = 'nomoredata'}) => {
    const tips = {
        'nodata': '没有数据哦',
        'nomoredata': '已经到底啦'
    }
    return <div className="no-more-data">--- {tips[type]} ---</div>
} 
export default Index