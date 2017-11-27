export default class Index extends Quyou{
    render(){
        const list = [
            {
                msg:'恭喜你获得了系统赠送的优惠券1张'
            },
            {
                msg:'恭喜你获得了系统赠送的优惠券1张哈哈哈哈哈哈哈哈哈哈哈哈'
            },
            {
                msg:'恭喜你获得了系统赠送的优惠券1张哈哈哈哈哈哈哈哈哈哈哈哈恭喜你获得了系统赠送的优惠券1张哈哈哈哈哈哈哈哈哈哈哈哈'
            },
        ]
        const url = "https://avatars0.githubusercontent.com/u/11659631?v=4"
        return (
            <div className="my-msg">
                {
                    list.map((d,i)=>(
                        <div key={i} className="item">
                            <span></span>
                            <div className="date-msg">
                                <div className="date">
                                    <div>2017-12-31</div>
                                    <div>12:30:15</div>
                                </div>
                                <div className="msg">{d.msg}</div>
                            </div>
                            <div className="clearboth thinner-border" style={{height:1}}></div>
                        </div>
                    ))
                }
            </div>
        )
    }
}