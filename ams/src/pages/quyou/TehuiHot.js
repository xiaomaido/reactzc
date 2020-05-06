import banner from '../../images/quyou/banner/lvyoujie.png'
const tagMap = {
    1: {
        num: 0,
        name: '换购优惠'
    },
    2: {
        num: 1,
        name: '立减优惠'
    },
    3: {
        num: 2,
        name: '折扣优惠'
    },
    4: {
        num: 3,
        name: '套餐优惠'
    },
    5: {
        num: 0,
        name: '餐饮名店'
    },
    6: {
        num: 1,
        name: '立减特惠'
    },
    7: {
        num: 2,
        name: '特色餐饮'
    },
    8: {
        num: 3,
        name: '满减优惠'
    },
    9: {
        num: 2,
        name: '特色餐饮店'
    },
}
const shopMap = {
    '9.9': [
        {
            id: 256,
            name: '崇明旅游吉祥物专栏',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/07d16abcaf59fdf0.jpeg'
        },
        {
            id: 70,
            name: '水秀舫农庄',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/ec7f5d66e2bdac1d.jpg',
            _t: 'SLEEP',
            tags: [
                1
            ],
        },
        {
            id: 56,
            name: '明珠湖生态服务中心',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/c6572b473a4202c6.png',
            tags: [
                5
            ],
        },
        {
            id: 22,
            name: '宝岛蟹庄',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/70e974402b0cc657.jpg',
            tags: [
                1
            ],
        },
        {
            id: 31,
            name: '高老庄',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/5f74999d9a4c532e.png',
            tags: [
                1
            ],
        },
        {
            id: 215,
            name: '十碗头',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/aa6c92a0ae642d42.jpg',
            tags: [
                5
            ]
        },
        {
            id: 25,
            name: '精菜阁',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/ff772d0088e6e09c.jpg',
            tags: [
                1
            ]
        },
        {
            id: 130,
            name: '老爷家酸菜鱼',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/e52ead25936ff2dd.jpg',
            tags: [
                1
            ]
        },
        {
            id: 197,
            name: '佤家鱼头王（南门店）',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/97e2aee9ddedc482.png',
            tags: [
                1
            ]
        },
        {
            id: 229,
            name: '红阁捞烫工坊',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/01cf2c3c8c09b647.jpg',
            tags: [
                4
            ]
        },
        {
            id: 228,
            name: '鱼恋虾',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/b3231ebee1efec7e.jpg',
            tags: [
                1
            ]
        },
        {
            id: 255,
            name: '泡面小食堂（鹿角巷）',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/bd56b5f171841a61.jpg',
            tags: [
                3
            ]
        },
        {
            id: 239,
            name: '君赢农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/81bc79778f6d6d3d.jpg',
            tags: [
                3
            ]
        },
        {
            id: 233,
            name: '陆港小镇',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/c30cb4ada404e85a.jpg',
            tags: [
                1
            ]
        },
        {
            id: 235,
            name: '瀛欣农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/55464eab05461c8b.jpg',
            tags: [
                1
            ]
        },
        {
            id: 237,
            name: '琴乐饭店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/6d011ebc4c1f285d.jpg',
            tags: [
                1
            ]
        },
        {
            id: 240,
            name: '佳嘉农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/0e00dcad7f91d165.jpg',
            tags: [
                1
            ]
        },
        {
            id: 242,
            name: '丽峰农庄',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/a560d1090e02789b.jpg',
            tags: [
                1
            ]
        },
        {
            id: 254,
            name: '帝乐农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/f3b87c5c018d77df.jpg',
            tags: [
                1
            ]
        },
        {
            id: 245,
            name: '圣果农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/0cb63386bcb300dc.jpg',
            tags: [
                1
            ]
        },
        {
            id: 252,
            name: '瀛春农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/20dd40ace1976830.jpeg',
            tags: [
                1
            ]
        },
        {
            id: 251,
            name: '红房子农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/642784b8fc088736.jpeg',
            tags: [
                1
            ]
        },
        {
            id: 249,
            name: '瀛昌农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/cb1cc097fe85cfe6.jpg',
            tags: [
                1
            ]
        },
        {
            id: 247,
            name: '庭鹤农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/048ae6f5fd9dce44.jpg',
            tags: [
                1
            ]
        },
        {
            id: 246,
            name: '蛮灵阁农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/82210c88fbec12b1.jpg',
            tags: [
                1
            ]
        },
        {
            id: 244,
            name: '浩波农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/58ce981cda713744.jpg',
            tags: [
                1
            ]
        },
        {
            id: 243,
            name: '秦大姐农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/d749db6e10ce2866.jpg',
            tags: [
                1
            ]
        },
        {
            id: 241,
            name: '龙香缘农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/7f7e2ec2158afb62.jpeg',
            tags: [
                1
            ]
        },
        {
            id: 238,
            name: '虹桥农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/22cd937a33f44218.jpg',
            tags: [
                1
            ]
        },
        {
            id: 236,
            name: '金大妈农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/e1e62c1a5c1aaf0e.jpg',
            tags: [
                8
            ]
        },
        {
            id: 153,
            name: '物华假日酒店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/868eab912fbaafea.jpg',
            _t: 'SLEEP',
            tags: [
                8
            ]
        },
        {
            id: 110,
            name: '崇明娘家菜',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/d1e030b974cc2f78.jpg',
            tags: [
                1
            ]
        },
        {
            id: 129,
            name: '怡嘉宾馆',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/1f760c1c6a69e355.jpg',
            _t: 'SLEEP',
            tags: [
                8
            ]
        },
        {
            id: 226,
            name: '吧蜀风',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/f121f0d76f1f360b.jpeg',
            tags: [
                1
            ]
        },
    ],
    '29': [
        {
            id: 256,
            name: '崇明旅游吉祥物专栏',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/07d16abcaf59fdf0.jpeg'
        },
        {
            id: 57,
            name: '瀛通大酒店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/8b6643f473656021.jpg',
            _t: 'SLEEP',
            tags: [
                7
            ],
        },
        {
            id: 56,
            name: '明珠湖生态服务中心',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/c6572b473a4202c6.png',
            tags: [
                5
            ],
        },
        
        {
            id: 155,
            name: '香朵开心农场',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/436f775cbbed915e.png',
            _t: 'SLEEP',
            tags: [
                1
            ],
        },
        {
            id: 225,
            name: '瀛岛屋',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/6954518e1b1e2d38.jpg',
            tags: [
                3
            ]
        },
        {
            id: 250,
            name: '岳都饭店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/ec67565d17bc7bf1.jpg',
            tags: [
                1
            ]
        },
        {
            id: 252,
            name: '瀛春农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/20dd40ace1976830.jpeg',
            tags: [
                1
            ]
        },
        {
            id: 249,
            name: '瀛昌农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/cb1cc097fe85cfe6.jpg',
            tags: [
                1
            ]
        },
        {
            id: 246,
            name: '蛮灵阁农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/82210c88fbec12b1.jpg',
            tags: [
                1
            ]
        },
        {
            id: 243,
            name: '秦大姐农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/d749db6e10ce2866.jpg',
            tags: [
                1
            ]
        },
        {
            id: 129,
            name: '怡嘉宾馆',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/1f760c1c6a69e355.jpg',
            _t: 'SLEEP',
            tags: [
                8
            ]
        },
    ],
    '59': [
        {
            id: 256,
            name: '崇明旅游吉祥物专栏',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/07d16abcaf59fdf0.jpeg'
        },
        {
            id: 57,
            name: '瀛通大酒店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/8b6643f473656021.jpg',
            _t: 'SLEEP',
            tags: [
                7
            ],
        },
        {
            id: 52,
            name: '桃源水乡大酒店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/86c8b7def4896702.png',
            _t: 'SLEEP',
            tags: [
                1
            ],
        },
        {
            id: 228,
            name: '鱼恋虾',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/b3231ebee1efec7e.jpg',
            tags: [
                2
            ]
        },
        {
            id: 229,
            name: '红阁捞烫工坊',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/01cf2c3c8c09b647.jpg',
            tags: [
                4
            ]
        },
        {
            id: 231,
            name: '燕农农产品',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/381f9e3f2a24877a.jpg',
            tags: [
                3
            ]
        },
        {
            id: 205,
            name: '“角艺”蛋糕',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/896f9aff1dad9747.jpg',
            tags: [
                3
            ]
        },
        {
            id: 248,
            name: '劲达浓情农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/a152c6b3169a85dd.jpg',
            tags: [
                1
            ]
        },
        {
            id: 249,
            name: '瀛昌农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/cb1cc097fe85cfe6.jpg',
            tags: [
                1
            ]
        },
        {
            id: 232,
            name: '悠然农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/cd1dac8c10d783f1.jpg',
            tags: [
                3
            ]
        },
    ],
    '99': [
        {
            id: 256,
            name: '崇明旅游吉祥物专栏',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/07d16abcaf59fdf0.jpeg'
        },

        {
            id: 53,
            name: '怡沁园',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/f8a4ec251f45f044.png',
            _t: 'SLEEP',
            tags: [
                5
            ]
        },
        {
            id: 109,
            name: '凯农生态餐厅',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/881ce75e00a700f6.png',
            tags: [
                5
            ]
        },
        {
            id: 31,
            name: '高老庄',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/5f74999d9a4c532e.png',
            tags: [
                2
            ],
        },
        {
            id: 205,
            name: '“角艺”蛋糕',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/896f9aff1dad9747.jpg',
            tags: [
                3
            ]
        },
        {
            id: 249,
            name: '瀛昌农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/cb1cc097fe85cfe6.jpg',
            tags: [
                1
            ]
        },
        {
            id: 243,
            name: '秦大姐农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/d749db6e10ce2866.jpg',
            tags: [
                1
            ]
        },
        {
            id: 117,
            name: '乐岛宾馆',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/00129bd916c55896.jpeg',
            _t: 'SLEEP',
            tags: [
                8
            ]
        },
    ],
    '299': [
        {
            id: 256,
            name: '崇明旅游吉祥物专栏',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/07d16abcaf59fdf0.jpeg'
        },
        {
            id: 228,
            name: '鱼恋虾',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/b3231ebee1efec7e.jpg',
            tags: [
                2
            ]
        },
        {
            id: 53,
            name: '怡沁园',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/f8a4ec251f45f044.png',
            _t: 'SLEEP',
            tags: [
                5
            ]
        },
        {
            id: 119,
            name: '龙群度假村',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/5337fe1bff9966a3.png',
            _t: 'SLEEP',
            tags: [
                4
            ]
        },
        {
            id: 187,
            name: '锦绣宾馆',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/ee98b860a391e55f.png',
            _t: 'SLEEP',
            tags: [
                5
            ],
        },
        {
            id: 57,
            name: '瀛通大酒店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/8b6643f473656021.jpg',
            _t: 'SLEEP',
            tags: [
                7
            ],
        },
        {
            id: 54,
            name: '西岭酒店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/b3bf4416596fea5f.png',
            _t: 'SLEEP',
            tags: [
                5
            ],
        },
        {
            id: 109,
            name: '凯农生态餐厅',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/881ce75e00a700f6.png',
            tags: [
                5
            ]
        },
        {
            id: 165,
            name: '西来农庄',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/ea9cfbbbb83af13d.png',
            _t: 'SLEEP',
            tags: [
                6
            ]
        },
        {
            id: 28,
            name: '一只菜',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/423a0e8b95292696.jpg',
            tags: [
                5
            ]
        },
        {
            id: 29,
            name: '新老板娘大酒店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/0f112c51b2bb9cd3.jpg',
            tags: [
                1
            ]
        },
        {
            id: 83,
            name: '蛙赛炭火牛蛙馆',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/6793867225e3dc4f.jpg',
            tags: [
                1
            ]
        },
        {
            id: 223,
            name: '周记酸菜鱼',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/6beafcdf84c3c385.jpg',
            tags: [
                1
            ]
        },
        {
            id: 23,
            name: '朱家食堂',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/eb931e8b5fa684a4.png',
            tags: [
                1
            ]
        },
        {
            id: 89,
            name: '轩华茶餐厅',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/93b0071b2c372e77.png',
            tags: [
                1
            ]
        },
        {
            id: 86,
            name: '天轩阁',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/665f410391407195.jpg',
            tags: [
                1
            ]
        },
        {
            id: 30,
            name: '垄泉茶餐厅',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/ae3e9b9edc1bc853.jpeg',
            tags: [
                3
            ]
        },
        {
            id: 25,
            name: '精菜阁',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/ff772d0088e6e09c.jpg',
            tags: [
                1
            ]
        },
        {
            id: 205,
            name: '“角艺”蛋糕',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/896f9aff1dad9747.jpg',
        },
        {
            id: 235,
            name: '瀛欣农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/55464eab05461c8b.jpg',
            tags: [
                1
            ]
        },
        {
            id: 237,
            name: '琴乐饭店',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/6d011ebc4c1f285d.jpg',
            tags: [
                3
            ]
        },
        {
            id: 240,
            name: '佳嘉农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/0e00dcad7f91d165.jpg',
            tags: [
                3
            ]
        },
        {
            id: 242,
            name: '丽峰农庄',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/a560d1090e02789b.jpg',
            tags: [
                3
            ]
        },
        {
            id: 247,
            name: '庭鹤农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/048ae6f5fd9dce44.jpg',
            tags: [
                3
            ]
        },
        {
            id: 241,
            name: '龙香缘农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/7f7e2ec2158afb62.jpeg',
            tags: [
                3
            ]
        },
        {
            id: 238,
            name: '虹桥农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/22cd937a33f44218.jpg',
            tags: [
                4
            ]
        },
        {
            id: 232,
            name: '悠然农家乐',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/cd1dac8c10d783f1.jpg',
            tags: [
                3
            ]
        },
        {
            id: 22,
            name: '宝岛蟹庄',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/c6572b473a4202c6.png',
            tags: [
                1
            ],
        },
        {
            id: 215,
            name: '十碗头',
            cover: 'http://upyun.wocaoapp.com.com/prod_00/aa6c92a0ae642d42.jpg',
            tags: [
                5
            ]
        },
    ],
}
const imgSlideList=[
    {
        img: banner,
        url: `/paperhot/311?_t=FAVORD`,
        // url: `/guidance`,
    },
]
const FETCH_PAGE = 'tehuihot'
const img = 'http://upyun.wocaoapp.com.com/prod_00/3d3c5d9334cbc75e.png'
export default class Index extends Quyou{
    state={
        current: '9.9'
    }
	renderContent(){
        const me = this
		return (
            <div className="tehui-hot">
                <TouchSlideBox imgSlideList={imgSlideList} />
                <ul className="icon-list">
                    {
                        [
                            '9.9',
                            '29',
                            '59',
                            '99',
                            '299',
                        ].map((d,i)=>(
                            <li
                                key={i}
                                onClick={
                                    ()=>{
                                        me.setState({
                                            current: d
                                        })
                                    }
                                }
                            >
                                <div className={`icon icon${i+1}`}></div>
                                <div className="menu-icon-name">{d}元专区</div>
                            </li>
                        ))
                    }
                </ul>
                <Content me={me} />
            </div>
        )
    }
    componentDidMount(){
        document.title = '2018上海崇明森林旅游节'
        const me = this 
        const CACHE_DATA = sessionStorage ? JSON.parse(sessionStorage.getItem(FETCH_PAGE)) : null
        if (CACHE_DATA) {
            me.setState({
                current: CACHE_DATA.current,
            }, () => {
                sessionStorage.removeItem(FETCH_PAGE)
                window.scrollTo(0, CACHE_DATA.scrollTop) // 回到之前离开的位置
            })
        }
    }
}
const Content = (props) => {
    let {
        me,
    } = props
    
    return (
        <ul className="userlist">
            {
                shopMap[me.state.current].map((d,i)=>{
                    d.tags = Array.isArray(d.tags)?d.tags:[]
                    return (
                        <li key={i}>
                            <div className="userarea">
                                <div className="logo-img" style={{backgroundImage: `url(${d.cover}!/fw/200)`}}></div>
                                <div className="userinfo">
                                    <div
                                        className="follow"
                                        onClick={()=>{
                                            if(sessionStorage) {
                                                sessionStorage.setItem(FETCH_PAGE, JSON.stringify({
                                                    current: me.state.current,
                                                    scrollTop: getScrollTop(),
                                                }))
                                            }
                                            me.openPage(`/shophot/${d.id}?_t=${d._t||'EAT'}`)
                                        }}    
                                    >查看详情</div>
                                    {
                                        d.tags[0]?<div className={`tag color${tagMap[d.tags[0]].num||0}`}>{tagMap[d.tags[0]].name}</div>:null
                                    }
                                    <div className="objname">{d.name}</div>
                                </div>
                            </div>
                            <div className="thinner-border"></div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
