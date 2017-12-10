
const imgSlideList=[
    {
        img: '//s4.xiaohongshu.com/static/message/9b624dff22be2f129ed410ac10c1e8ff.jpg',
        url: 'https://m.xiaohongshu.com/discovery/item/59fc80bbc1605f58897f26a4',
    },
    {
        img: '//s4.xiaohongshu.com/static/message/886dfb568604f2c990ff891329c09688.jpg',
        url: '/shophot/3',
    },
    {
        img: '//s4.xiaohongshu.com/static/message/8b733c9c2ef37551487aaad3d7b1a080.jpeg',
        url: '',
    },
]
export default class Index extends Quyou{
	renderContent(){
        const me=this
        document.title='趣游崇明'
        const cates = Array.apply(null, { length: 6 })
		return (
			<div className="eat">
                <div className="top">
                    <TouchSlideBox imgSlideList={imgSlideList} />
                    <div className="hotelhot" onClick={me.openPage.bind(me, `/hotelhot?cate=-1`)}>
                        <div className="icon"></div>
                        <div className="clearboth thinner-border"></div>
                    </div>
                    <div className="hotelCates">
                        {
                            cates.map((d,i)=><a key={i} className="icon" href={`${window.isHashHistory}/hotelhot?cate=${i+1}`}></a>)
                        }
                    </div>
                </div>
                <VideoList list={[]} me={me} title={"客房视频"} type={"SLEEP"} />
                <div style={{backgroundColor:'#fff',padding:30}} onClick={me.openPage.bind(me,  `/posthot?_t=TOUR`)}>住宿帖子列表</div>
                <div style={{height: 100,background:'#fff'}}></div>
            </div>
		)
	}
}
