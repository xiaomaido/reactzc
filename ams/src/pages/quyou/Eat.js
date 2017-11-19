import bar from '../../images/quyou/banner/bar.png'
import play from '../../images/quyou/icon/play.png'
import quick0 from '../../images/quyou/icon/quick0.png'
import quick1 from '../../images/quyou/icon/quick1.png'
import quick2 from '../../images/quyou/icon/quick2.png'
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
	render(){
        document.title='趣游崇明'
		return (
			<div className="eat">
                <div className="top">
                    <TouchSlideBox imgSlideList={imgSlideList} />
                    <img className="bar" src={bar} onClick={this.openPage.bind(this,  `/xianshifuli`)} />
                    <ul className="quick">
                        <li onClick={this.openPage.bind(this,  `/shophot`)}>
                            <img src={quick0} style={{float:'left'}} />
                            <div style={{textAlign:'left'}}>人气商家</div>
                        </li>
                        <li onClick={this.openPage.bind(this,  `/foodhot`)}>
                            <img src={quick1} />
                            <div>人气美食</div>
                        </li>
                        <li onClick={this.openPage.bind(this,  `/seasonhot`)}>
                            <img src={quick2} style={{float:'right'}} />
                            <div style={{textAlign:'right'}}>当季推荐</div>
                        </li>
                    </ul>
                </div>
                <div className="yummy clearboth" onClick={this.openPage.bind(this,  `/yummyhot`)}>
                    <div className="icon picture"></div>
                    <div className="icon logo"></div>
                    <div className="content">🌸用电饭煲就能做的美食🌸懒人党必看的美食教程🤗🤗</div>
                </div>
                <VideoList list={Array.apply(null,{length:5})} me={this} />
            </div>
		)
	}
} 

const VideoList = (props) => {
    const { list, me } = props
    return (
        <div className="video clearboth">
            <div className="title-box">
                <div className="line thinner-border clearboth"></div>
                <div className="title">视频推荐</div>
            </div>
            <div className="vlist">
                <div className="ul-box">
                    <ul style={{width:(list.length*fontSize*(240+30)/40)}}>
                        {
                            list.map((d,i)=>(
                                <li key={i} onClick={me.openPage.bind(me, `videohot${i===list.length-1?'':`/${i+1}`}`)}>
                                    <div className="icon poster" style={{backgroundImage:'url(http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg)'}}>
                                        {
                                            i===list.length-1 ? <div className="more">更多视频 &gt;</div> : <img src={play} />
                                        }
                                    </div>
                                    <div className="text">崇明特色美食</div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="gap"></div>
        </div>
        
    )
}