export default class Index extends Quyou{
    render(){
        const list = [1,3,4,7,5,8,9,0]
        const url = "https://avatars0.githubusercontent.com/u/11659631?v=4"
        return (
            <div className="my-coupons">
                {
                    list.map((d,i)=>(
                        <div key={i} className="item">
                            <div className="btn">点击使用</div>
                            <div className="icon cover" style={{backgroundImage:`url(${url})`}}></div>
                            <div className="content">
                                <div className="name">一点点奶茶券第二杯半价券快来使用哦</div>
                                <div className="end">2017-12-31到期</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}