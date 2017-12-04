import fuli from '../../images/quyou/banner/fuli.png'
const imgSlideList=[
    {
        img: '//s4.xiaohongshu.com/static/message/886dfb568604f2c990ff891329c09688.jpg',
        url: '/shophot/3',
    },
    {
        img: '//s4.xiaohongshu.com/static/message/8b733c9c2ef37551487aaad3d7b1a080.jpeg',
        url: '',
    },
    {
        img: fuli,
        url: 'https://m.xiaohongshu.com/discovery/item/59fc80bbc1605f58897f26a4',
    },
]
export default class Index extends Quyou{
	renderContent(){        
        document.title='平台福利专区'
        const cover=`http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg`
        const list=Array.apply(null,{length:5})
        return (
            <div className="mall-fuli">
                <div className="neck">
                    <TouchSlideBox imgSlideList={imgSlideList} />               
                </div>
                <ul className="coupon-list">
                    {
                        list.map((d,i)=>(
                            <li key={i}>
                                <div className="cover-box">
                                    <div className="icon cover" style={{backgroundImage:`url(${cover})`}}></div>
                                    <div className="box">
                                        <div className="handed"><span>93</span>人已领取</div>
                                        <div className="name">龙门花甲套餐</div>
                                        <div className="name">[八一广场店]</div>
                                        {/* <ul className="discount">
                                            <li>新人券</li>
                                            <li>满减</li>
                                        </ul> */}
                                    </div>
                                </div>
                                {
                                    i===list.length-1 ? null : <div className="clearboth thinner-border"></div>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
} 