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
	render(){        
        document.title='平台福利专区'
        return (
            <div className="mall-fuli">
                <div className="neck">
                    <TouchSlideBox imgSlideList={imgSlideList} />               
                </div>
                <div className="coupon-list">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
            </div>
        )
    }
} 