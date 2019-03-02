
import banner from '../../images/quyou/icon/canyinmingdian.png'
const initStateResponse = initState()
const API_PAGE = APIS.API_EAT_CANYIN_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_CANYIN_LIST
const hotels = [{
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/ee98b860a391e55f.png"],
	"custom_avg": 300,
	"id": 187,
	"tags": [12, 13],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"is_like": 0,
	"geoinfo": "(121.634216,31.574889)",
	"stag_name": [{
		"createtime": 1510473351,
		"id": 5,
		"mode": "0001",
		"status": "0",
		"tagname": "免费停车"
	}, {
		"createtime": 1510473371,
		"id": 6,
		"mode": "0001",
		"status": "0",
		"tagname": "免费wifi"
	}, {
		"createtime": 1510473382,
		"id": 7,
		"mode": "0001",
		"status": "0",
		"tagname": "叫醒服务"
	}],
	"detail": "68号",
	"tag_name": [{
		"createtime": 1514086659,
		"id": 12,
		"mode": "0000",
		"status": "0",
		"tagname": "精品酒店"
	}, {
		"createtime": 1535954528,
		"id": 13,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"stags": [5, 6, 7],
	"coupon": [],
	"rtype": "0001",
	"season_rec": "",
	"name": "锦绣宾馆",
	"area": 0,
	"comment_count": 0,
	"priority": 4,
	"addr1": "崇明区",
	"has_promotion": "0",
	"addr3": "新崇南路",
	"sale_count": 0,
	"phone": "021-)50559888",
	"addr2": "城桥镇",
	sequence: 1,
	"like_count": 0
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/b3bf4416596fea5f.png"],
	"custom_avg": 400,
	"id": 54,
	"tags": [1, 12, 13],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"is_like": 0,
	"geoinfo": "(121.634216,31.574889)",
	"stag_name": [{
		"createtime": 1510473351,
		"id": 5,
		"mode": "0001",
		"status": "0",
		"tagname": "免费停车"
	}, {
		"createtime": 1510473371,
		"id": 6,
		"mode": "0001",
		"status": "0",
		"tagname": "免费wifi"
	}],
	"detail": "777号",
	"tag_name": [{
		"createtime": 1510473289,
		"id": 1,
		"mode": "0000",
		"status": "0",
		"tagname": "休闲度假"
	}, {
		"createtime": 1514086659,
		"id": 12,
		"mode": "0000",
		"status": "0",
		"tagname": "精品酒店"
	}, {
		"createtime": 1535954528,
		"id": 13,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"stags": [5, 6],
	"coupon": [],
	"rtype": "0001",
	"season_rec": "",
	"name": "西岭酒店",
	"area": 0,
	"comment_count": 0,
	"priority": 9999,
	"addr1": "崇明区",
	"has_promotion": "0",
	"addr3": "三华公路",
	"sale_count": 0,
	"phone": "021- 39633666",
	"addr2": "绿华镇",
	sequence: 5,
	"like_count": 0
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/f8a4ec251f45f044.png"],
	"custom_avg": 600,
	"id": 53,
	"tags": [2, 1, 12, 13],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"is_like": 0,
	"geoinfo": "(121.634216,31.574889)",
	"stag_name": [{
		"createtime": 1510473351,
		"id": 5,
		"mode": "0001",
		"status": "0",
		"tagname": "免费停车"
	}, {
		"createtime": 1510473371,
		"id": 6,
		"mode": "0001",
		"status": "0",
		"tagname": "免费wifi"
	}, {
		"createtime": 1510473382,
		"id": 7,
		"mode": "0001",
		"status": "0",
		"tagname": "叫醒服务"
	}],
	"detail": "2089号",
	"tag_name": [{
		"createtime": 1510473289,
		"id": 1,
		"mode": "0000",
		"status": "0",
		"tagname": "休闲度假"
	}, {
		"createtime": 1510473300,
		"id": 2,
		"mode": "0000",
		"status": "0",
		"tagname": "会议酒店"
	}, {
		"createtime": 1514086659,
		"id": 12,
		"mode": "0000",
		"status": "0",
		"tagname": "精品酒店"
	}, {
		"createtime": 1535954528,
		"id": 13,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"stags": [5, 6, 7],
	"coupon": [],
	"rtype": "0001",
	"season_rec": "",
	"name": "怡沁园度假村",
	"area": 0,
	"comment_count": 1,
	"priority": 9999,
	"addr1": "崇明区",
	"has_promotion": "0",
	"addr3": "北沿公路",
	"sale_count": 0,
	"phone": "021- 59338800",
	"addr2": "东平镇",
	sequence: 3,
	"like_count": 0
}]
const eats = [ {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/c328b5e6cc4eb6f3.jpeg"],
	"custom_avg": 20,
	"id": 258,
	"tags": [22, 21],
	"status": "0000",
	"coupon": {},
	"extraAddr": "上海市崇明区跃马路",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"comments": {},
	"detail": "",
	"is_like": 1,
	"stags": {},
	"tag_name": [{
		"createtime": 1542770669,
		"id": 21,
		"mode": "0000",
		"status": "0",
		"tagname": "人气美食"
	}, {
		"createtime": 1542771069,
		"id": 22,
		"mode": "0000",
		"status": "0",
		"tagname": "好米好锅"
	}],
	"rtype": "0000",
	"season_rec": "",
	"name": "缤纷养生锅巴饭",
	"area": 0,
	"comment_count": 0,
	"priority": 1,
	"products": {},
	"has_promotion": "0",
	"addr3": "各大崇明菜餐饮名店",
	"sale_count": 0,
	sequence: 0,
	"phone": "",
	"addr2": "城桥镇",
	"like_count": 1
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/881ce75e00a700f6.png"],
	"custom_avg": 174,
	"id": 109,
	"tags": [4, 2, 16],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 2,
		"mode": "0000",
		"status": "0",
		"tagname": "农家乐"
	}, {
		"createtime": 0,
		"id": 4,
		"mode": "0000",
		"status": "0",
		"tagname": "回头客多"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "109号",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "",
	"name": "凯农生态餐厅",
	"area": 0,
	"comment_count": 1,
	"priority": 1,
	"products": {},
	"has_promotion": "0",
	"addr3": "港东公路",
	"sale_count": 0,
	"phone": "021-69678000",
	"addr2": "港西镇",
	sequence: 6,
	"like_count": 1
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/31104e6a3896c8df.jpg"],
	"custom_avg": 62,
	"id": 101,
	"tags": [1, 4, 16],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 1,
		"mode": "0000",
		"status": "0",
		"tagname": "中餐"
	}, {
		"createtime": 0,
		"id": 4,
		"mode": "0000",
		"status": "0",
		"tagname": "回头客多"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "1395号",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "",
	"name": "新虹楼饭庄",
	"area": 0,
	"comment_count": 0,
	"priority": 16,
	"products": {},
	"has_promotion": "0",
	"addr3": "北陈公路",
	"sale_count": 0,
	"phone": "021-59409277",
	"addr2": "陈家镇",
	sequence: 8,
	"like_count": 1
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/423a0e8b95292696.jpg"],
	"custom_avg": 83,
	"id": 28,
	"tags": [4, 1, 16],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 1,
		"mode": "0000",
		"status": "0",
		"tagname": "中餐"
	}, {
		"createtime": 0,
		"id": 4,
		"mode": "0000",
		"status": "0",
		"tagname": "回头客多"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "115-117号",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "红橙黄绿满足味蕾需求",
	"name": "一只菜",
	"area": 0,
	"comment_count": 0,
	"priority": 20,
	"products": {},
	"has_promotion": "0",
	"addr3": "东门路",
	"sale_count": 0,
	"phone": "021-69697979",
	"addr2": "城桥镇",
	sequence: 12,
	"like_count": 1
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/31d16d488d2f097c.jpg"],
	"custom_avg": 63,
	"id": 87,
	"tags": [1, 16],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 1,
		"mode": "0000",
		"status": "0",
		"tagname": "中餐"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "33号",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "",
	"name": "瀛珠酒家",
	"area": 0,
	"comment_count": 0,
	"priority": 31,
	"products": {},
	"has_promotion": "0",
	"addr3": "新崇西路",
	"sale_count": 0,
	"phone": "021-59616001",
	"addr2": "城桥镇",
	sequence: 7,
	"like_count": 0
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/c6572b473a4202c6.png"],
	"custom_avg": 150,
	"id": 56,
	"tags": [1, 3, 16],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 1,
		"mode": "0000",
		"status": "0",
		"tagname": "中餐"
	}, {
		"createtime": 0,
		"id": 3,
		"mode": "0000",
		"status": "0",
		"tagname": "地方特色"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "333号（明珠湖公园西侧）",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "",
	"name": "明珠湖生态服务中心",
	"area": 0,
	"comment_count": 0,
	"priority": 34,
	"products": {},
	"has_promotion": "0",
	"addr3": "三华公路",
	"sale_count": 0,
	"phone": "021- 39633818",
	"addr2": "绿华镇",
	sequence: 2,
	"like_count": 0
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/aa6c92a0ae642d42.jpg"],
	"custom_avg": 80,
	"id": 215,
	"tags": [16, 3],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 3,
		"mode": "0000",
		"status": "0",
		"tagname": "地方特色"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "东平国家森林公园一号口对面",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "",
	"name": "十碗头",
	"area": 0,
	"comment_count": 0,
	"priority": 60,
	"products": {},
	"has_promotion": "0",
	"addr3": "",
	"sale_count": 0,
	"phone": "021-59339797",
	"addr2": "东平镇",
	sequence: 11,
	"like_count": 0
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/c56019e81c07bb08.jpg"],
	"custom_avg": 100,
	"id": 216,
	"tags": [2, 16],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 2,
		"mode": "0000",
		"status": "0",
		"tagname": "农家乐"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "3259弄9号",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "",
	"name": "会宾酒楼",
	"area": 0,
	"comment_count": 0,
	"priority": 61,
	"products": {},
	"has_promotion": "0",
	"addr3": "城彷公路",
	"sale_count": 0,
	"phone": "021-69445268",
	"addr2": "中兴镇",
	sequence: 9,
	"like_count": 0
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/3a787d1d32a0f50b.jpg"],
	"custom_avg": 80,
	"id": 217,
	"tags": [1, 16],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 1,
		"mode": "0000",
		"status": "0",
		"tagname": "中餐"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "竖新北路65号",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "",
	"name": "薛记家常菜",
	"area": 0,
	"comment_count": 0,
	"priority": 62,
	"products": {},
	"has_promotion": "0",
	"addr3": "",
	"sale_count": 0,
	"phone": "021-59481777",
	"addr2": "竖新镇",
	sequence: 10,
	"like_count": 0
}, {
	"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/b4d9ecf859fa5c60.jpg"],
	"custom_avg": 150,
	"id": 218,
	"tags": [16, 4],
	"status": "0000",
	"extraAddr": "上海市崇明区跃马路",
	"description": "",
	"addr1": "崇明区",
	"geoinfo": "(121.634216,31.574889)",
	"tag_name": [{
		"createtime": 0,
		"id": 4,
		"mode": "0000",
		"status": "0",
		"tagname": "回头客多"
	}, {
		"createtime": 1535878762,
		"id": 16,
		"mode": "0000",
		"status": "0",
		"tagname": "餐饮名店"
	}],
	"detail": "瀛东村",
	"is_like": 0,
	"stags": {},
	"coupon": [],
	"rtype": "0000",
	"season_rec": "",
	"name": "瀛东度假村",
	"area": 0,
	"comment_count": 0,
	"priority": 63,
	"products": {},
	"has_promotion": "0",
	"addr3": "",
	"sale_count": 0,
	"phone": "021-59436276",
	"addr2": "陈家镇",
	sequence: 4,
	"like_count": 0
}]

let hybrid = [
    ...hotels.map(d=>({...d,flag:'SLEEP'})),
    ...eats.map(d=>({...d,flag:'EAT'}))
]
hybrid = [
	...hybrid,
	...[{
		"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/8b6643f473656021.jpg"],
		"custom_avg": 500,
		"id": 57,
		"tags": [2, 1, 12, 14],
		"status": "0000",
		"extraAddr": "上海市崇明区旭升路",
		"description": "",
		"is_like": 0,
		"geoinfo": "(121.452942,31.65909)",
		"stag_name": [{
			"createtime": 1510473351,
			"id": 5,
			"mode": "0001",
			"status": "0",
			"tagname": "免费停车"
		}, {
			"createtime": 1510473371,
			"id": 6,
			"mode": "0001",
			"status": "0",
			"tagname": "免费wifi"
		}, {
			"createtime": 1510473382,
			"id": 7,
			"mode": "0001",
			"status": "0",
			"tagname": "叫醒服务"
		}],
		"detail": "190号",
		"tag_name": [{
			"createtime": 1510473289,
			"id": 1,
			"mode": "0000",
			"status": "0",
			"tagname": "休闲度假"
		}, {
			"createtime": 1510473300,
			"id": 2,
			"mode": "0000",
			"status": "0",
			"tagname": "会议酒店"
		}, {
			"createtime": 1514086659,
			"id": 12,
			"mode": "0000",
			"status": "0",
			"tagname": "精品酒店"
		}, {
			"createtime": 1537850654,
			"id": 14,
			"mode": "0000",
			"status": "0",
			"tagname": "特色餐饮店"
		}],
		"stags": [5, 6, 7],
		"coupon": [],
		"rtype": "0001",
		"season_rec": "",
		"name": "瀛通大酒店",
		"area": 0,
		"comment_count": 0,
		"priority": 1,
		"addr1": "崇明区",
		"has_promotion": "0",
		"addr3": "北门路",
		"sale_count": 0,
		"phone": "021-69696969",
		"addr2": "城桥镇",
		sequence: 16,
		"like_count": 0
	}, {
		"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/11a7d13a9d190aa3.png"],
		"custom_avg": 621,
		"id": 189,
		"tags": [1, 2, 12, 14],
		"status": "0000",
		"extraAddr": "上海市崇明区跃马路",
		"description": "",
		"is_like": 0,
		"geoinfo": "(121.634216,31.574889)",
		"stag_name": [{
			"createtime": 1510473351,
			"id": 5,
			"mode": "0001",
			"status": "0",
			"tagname": "免费停车"
		}, {
			"createtime": 1510473371,
			"id": 6,
			"mode": "0001",
			"status": "0",
			"tagname": "免费wifi"
		}, {
			"createtime": 1510473382,
			"id": 7,
			"mode": "0001",
			"status": "0",
			"tagname": "叫醒服务"
		}],
		"detail": "777号（近育麟桥路）",
		"tag_name": [{
			"createtime": 1510473289,
			"id": 1,
			"mode": "0000",
			"status": "0",
			"tagname": "休闲度假"
		}, {
			"createtime": 1510473300,
			"id": 2,
			"mode": "0000",
			"status": "0",
			"tagname": "会议酒店"
		}, {
			"createtime": 1514086659,
			"id": 12,
			"mode": "0000",
			"status": "0",
			"tagname": "精品酒店"
		}, {
			"createtime": 1537850654,
			"id": 14,
			"mode": "0000",
			"status": "0",
			"tagname": "特色餐饮店"
		}],
		"stags": [5, 6, 7],
		"coupon": [],
		"rtype": "0001",
		"season_rec": "",
		"name": "新崇大酒店",
		"area": 0,
		"comment_count": 0,
		"priority": 2,
		"addr1": "崇明区",
		"has_promotion": "1",
		"addr3": "鼓浪屿路",
		"sale_count": 0,
		"phone": "021-59695969",
		"addr2": "城桥镇",
		sequence: 15,
		"like_count": 0
	}, {
		"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/2f08a9849207ac9b.jpg"],
		"custom_avg": 450,
		"id": 190,
		"tags": [1, 3, 14],
		"status": "0000",
		"extraAddr": "上海市崇明区跃马路",
		"description": "",
		"is_like": 0,
		"geoinfo": "(121.634216,31.574889)",
		"stag_name": [{
			"createtime": 1510473351,
			"id": 5,
			"mode": "0001",
			"status": "0",
			"tagname": "免费停车"
		}, {
			"createtime": 1510473371,
			"id": 6,
			"mode": "0001",
			"status": "0",
			"tagname": "免费wifi"
		}, {
			"createtime": 1510473382,
			"id": 7,
			"mode": "0001",
			"status": "0",
			"tagname": "叫醒服务"
		}],
		"detail": "188号",
		"tag_name": [{
			"createtime": 1510473289,
			"id": 1,
			"mode": "0000",
			"status": "0",
			"tagname": "休闲度假"
		}, {
			"createtime": 1513313338,
			"id": 3,
			"mode": "0000",
			"status": "0",
			"tagname": "生态农庄"
		}, {
			"createtime": 1537850654,
			"id": 14,
			"mode": "0000",
			"status": "0",
			"tagname": "特色餐饮店"
		}],
		"stags": [5, 6, 7],
		"coupon": [],
		"rtype": "0001",
		"season_rec": "",
		"name": "嘉和苑度假村",
		"area": 0,
		"comment_count": 0,
		"priority": 9999,
		"addr1": "崇明区",
		"has_promotion": "0",
		"addr3": "秀林路",
		"sale_count": 0,
		"phone": "021-59338808",
		"addr2": "东平镇",
		sequence: 14,
		"like_count": 0
	}],
	...[{
		"imgs": ["http://sfmimg.b0.upaiyun.com/prod_00/6dea68d9238b1d94.jpg"],
		"custom_avg": 150,
		"id": 219,
		"tags": [1, 17],
		"status": "0000",
		"extraAddr": "上海市崇明区跃马路",
		"description": "",
		"addr1": "崇明区",
		"geoinfo": "(121.634216,31.574889)",
		"tag_name": [{
			"createtime": 0,
			"id": 1,
			"mode": "0000",
			"status": "0",
			"tagname": "中餐"
		}, {
			"createtime": 1537850493,
			"id": 17,
			"mode": "0000",
			"status": "0",
			"tagname": "特色餐饮店"
		}],
		"detail": "东滩东旺路（风车处）",
		"is_like": 0,
		"stags": {},
		"coupon": [],
		"rtype": "0000",
		"season_rec": "",
		"name": "东滩湿地公园观海楼餐厅",
		"area": 0,
		"comment_count": 0,
		"priority": 64,
		"products": {},
		"has_promotion": "0",
		"addr3": "",
		"sale_count": 0,
		"phone": "021-39367000",
		"addr2": "陈家镇",
		sequence: 13,
		"like_count": 0
	}]
].sort((a,b)=>a.sequence-b.sequence)

// .map(d=>console.log('name', d.name + d.flag))

// console.log('hybrid', hybrid)
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse,
            filteridsShowOptions: false,
        }
    }
	renderContent(){
        // document.title='餐饮名店'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        const { filterids } =  me
        const { filteridsShowOptions } = me.state
        let { filterid = 0 } =  me.props.location.query
        filterid = Number(filterid)
        return (
			<div className="shop-hot">
                <img className="banner" src={banner} />
                <div>
                    <SearchInput me={me} handleSearch={me.handleSearch.bind(me)} />
                </div>
                <div>
                    <SelectBox showOptions={filteridsShowOptions} options={filterids} optionId={filterid}  type={'filterids'} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'filterids')} />
                </div>
                {
                    <List me={me} />
                    // <List response={{data: {count:hybrid.length,data:hybrid}}} me={me} />
                    // fetching ? <Spin /> : <List response={response} me={me} />
                }
            </div>
        )
    }
    handleSelectBoxChageColumn(type){
        const temp = `${type}ShowOptions`
        // console.log('temp',temp)
        let nextState = {
            [temp]: !this.state[temp],
        }
        if(type === 'tags'){
            nextState['filteridsShowOptions']=false
        }else if(type === 'filterids'){
            nextState['tagsShowOptions']=false
        }
        this.setState(nextState)
    }
    handleSelectBoxChage({type = '',option = {}}){
        const me = this
        console.log('type',type)
        console.log('option',option)
        let { query } = me.props.location
        if(type === 'tags'){
            if(option.id){
                query['tag'] = option.id
            }else{
                delete query['tag']
            } 
        }
        else if(type === 'filterids'){
            if(option.id){
                query['filterid'] = option.id
                query['filter'] = encodeURIComponent(option.title)
            }else{
                delete query['filter']
                delete query['filterid']
            }
        }
        me.openPage(`/canyinhot${me.getRequestParam(query)}`)
    }
    componentWillReceiveProps(nextProps){
        const me = this 
        _location = nextProps.location
        me.page = 0
        // me.requestList(me,FETCH_PAGE,API_PAGE)
    }
    componentDidMount(){
        const me = this
        // me.requestListOrCacheData({FETCH_PAGE,API_PAGE})
        // // me.requestList(me,FETCH_PAGE,API_PAGE,true)
        me.shareTextObjSetting({
            title:`餐饮名店`,
            imgUrl: `http://sfmimg.b0.upaiyun.com/prod_00/67e54e6da72f6fd1.png`,
            desc:'【趣游崇明】崇明菜餐饮名店——星尚热推！',
        })
    }
}

const List = (props) => {
    const { response, me } = props
    // let { 
    //     count = 0,
    //     data = [],
    // } = response.data
    const { pathname,query } = _location
    const town = query.filter ? decodeURIComponent(query.filter) : ''
    let data = [...hybrid]
    data = Array.isArray(data)?data:[]
    data = town ? data.filter(d=>d.addr2===town) : data
    let count=data.length
    return (
        <div>
            <div className="list">
                {
                    
                    data.map((d = { imgs: [] },i)=>{
                        d.coupon = Array.isArray(d.coupon) ? d.coupon : []
                        d.tag_name = Array.isArray(d.tag_name) ? d.tag_name : []
                        d.tag_name = d.tag_name.reverse()
                        // d.tag_name = [
                        //     {createtime: 1514872995, id: 5, mode: "0000", status: "0", tagname: "餐饮名店"},
                        //     {createtime: 1514872995, id: 6, mode: "0000", status: "0", tagname: "限时特惠"},
                        //     {createtime: 1514872995, id: 7, mode: "0000", status: "0", tagname: "全场95折"},
                        //     {createtime: 1514872995, id: 8, mode: "0000", status: "0", tagname: "买二送一"},
                        // ]
						d.tag_name.length = d.tag_name.length<=4 ? d.tag_name.length : 4
						let addr = d.addr2+d.addr3+d.detail
						if(d.id===258){
							addr = d.addr3+d.detail
						}
                        return (
                            <div key={i}>
                                <div 
                                    className="item"
                                    onClick={()=>{
                                        if(sessionStorage) {
                                            sessionStorage.setItem(FETCH_PAGE, JSON.stringify({
                                                response: me.state[FETCH_PAGE],
                                                scrollTop: getScrollTop(),
                                                page: me.page
                                            }))
                                        }
                                        me.openPage(`/shophot/${d.id}?_t=${d.flag}`)
                                    }}
                                    // onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}

                                >
                                    <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]}${doImg.fw()})`}}></div>
                                    <div className="box">
                                        <div className="name">{d.name}</div>
                                        {/* <div className="address text-elip"><i className="icon"></i>{d.addr1+d.addr2+d.addr3+d.detail}</div> */}
                                        <div className="address text-elip"><i className="icon"></i>{addr}</div>
                                        
                                        <ul className="shop-sns">
                                            <li><i className="icon good"></i>{d.like_count}</li>
                                            <li><i className="icon comment"></i>{d.comment_count}</li>
                                            {/* <li><i className="icon collect"></i>0</li> */}
                                        </ul>
                                        {
                                            d.tag_name.length ? (
                                                <ul className="discountarr">
                                                {
                                                    d.tag_name.map((d,i)=><li key={i} className={`text-elip color${i}`}>{d.tagname}</li>)
                                                }
                                                </ul>
                                            ) : null
                                            // d.coupon.length ? (
                                            //     <ul className="discountarr">
                                            //         <li className={"text-elip color" + [0, 1, 2, 3].sort((a)=>Math.random()<0.5)[0]}>{d.coupon[0].title}</li>
                                            //     </ul>
                                            // ) : null
                                        }
                                    </div>
                                    {/* <div className="num">月售<span>{d.sale_count}</span></div> */}
                                </div>
                                {
                                    i===data.length-1 ? null : <div className="clearboth thinner-border"></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                // me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <NoMoreData />
            }
        </div>
    )
}