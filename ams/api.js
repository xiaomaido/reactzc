
#!/usr/bin/env python
# coding=utf-8
import urllib,urllib2
import json
import cookielib
import requests

#baseUrl = "http://192.168.16.132:8891/productApi."
#baseUrl = "http://139.224.44.238:8791/productApi."
baseUrl = "http://quyou.weichongming.com/peanut"


# ******************  吃  ************************** #
#首页接口
eatIndex = baseUrl + '/eatIndex/index'  $$BINGO
eatIndexQ = {
}

# 限时福利列表接口
eatTimeBenefitList = baseUrl + '/eatIndex/timeBenefitsList'  $$BINGO
eatTimeBenefitListQ = {
        "limit": 10,
        "offset": 0
}

# 限时福利详情接口
eatTimeBenefitDetail = baseUrl + '/eatIndex/timeBenefitsDetail'  $$BINGO
eatTimeBenefitDetailQ = {
        "id": 2
}

# 美食攻略 列表
eatpostList = baseUrl + '/eatIndex/postList'  $$BINGO
eatpostListQ = {
        "limit": 10,
        "offset": 0
}

# 美食攻略 详情
eatPostDetail = baseUrl + '/eatIndex/postDetail'  $$BINGO
eatpostDetailQ = {
        "user_id": 0,  #后期接口直接注入可不考虑
        "id": 2
}

# 美食攻略评论
eatPostComment = baseUrl + '/eatIndex/postComment'  $$BINGO
eatPostCommentQ = {
        "content": "好吃呀好吃",
        "user_id": 1,
        "post_id": 1
}

# 美食攻略点赞
eatpostLike = baseUrl + '/eatIndex/postLike'  $$BINGO
eatpostLikeQ = {
        "user_id": 1,
        "post_id": 1
}

# # -推荐视频  列表
# eatrecMediaList(limit, offset)
eatrecMediaList = baseUrl + '/eatIndex/recMediaList'  $$BINGO
eatrecMediaListQ = {
        "limit": 10,
        "offset": 0
}

# 推荐视频 详情
eatrecMediaDetail = baseUrl + '/eatIndex/recMediaDetail'  $$BINGO
eatrecMediaDetailQ = {
        "user_id": 10,
        "id": 15
}

# 推荐视频 评论
eatmediaComment = baseUrl + '/eatIndex/mediaComment'  $$BINGO
eatmediaCommentQ = {
        "content": "砸了砸了",
        "user_id": 1,
        "media_id": 15
}

# 推荐视频  点赞
eatrecMediaLike = baseUrl + '/eatIndex/recMediaLike'  $$BINGO
eatrecMediaLikeQ = {
        "user_id": 1,
        "media_id": 15
}

# 人气美食 列表
eatfoodSearch = baseUrl + '/eatIndex/foodSearch'  $$BINGO
eatfoodSearchQ = {
        "limit": 10,
        "offset": 0
}
#(user_id, tag, location, sortby, filter, limit, offset)

# 人气美食 详情
eatfoodDetail = baseUrl + '/eatIndex/foodDetail'  $$BINGO
eatfoodDetailQ = {
        "user_id": 1,
        "id": 5
}

# 人气美食  点赞
eatfoodLike = baseUrl + '/eatIndex/foodLike'  $$BINGO
eatfoodLikeQ = {
        "user_id": 1,
        "id": 5
}

# 人气美食 评论
eatfoodComment = baseUrl + '/eatIndex/foodComment'  $$BINGO
eatfoodCommentQ = {
        "content": "ddd", 
        "user_id": 1, 
        "id": 5
}

#  人气商家列表
eatsellerSearch = baseUrl + '/eatIndex/sellerSearch'  $$BINGO
eatsellerSearchQ = {
        "limit": 10,
        "offset": 0
}
# (user_id, tag, location, sortby, filter, limit, offset)

#  人气商家详情页
eatsellerDetail = baseUrl + '/eatIndex/sellerDetail'  $$BINGO
eatsellerDetailQ = {
        "user_id": 1,
        "id": 6
}
#(user_id, id)

#  人气商家 评论
eatsellerComment = baseUrl + '/eatIndex/sellerComment'  $$BINGO
eatsellerCommentQ = {
        "content": "22222",
        "user_id": 1,
        "id": 6
}
# (content, user_id, id)

#  人气商家 点赞
eatsellerLike = baseUrl + '/eatIndex/sellerLike'  $$BINGO
eatsellerLikeQ = {
        "user_id": 1,
        "id": 6
}

# --------------------- 住  ---------------------- #
# 推荐视频列表
sleepRecMediaList = baseUrl + '/sleepIndex/recMediaList'  $$BINGO
sleepRecMediaListQ = {
        "limit": 10,
        "offset": 0
}

# 推荐视频 详情
sleepRecMediaDetail = baseUrl + '/sleepIndex/recMediaDetail'  $$BINGO
sleepRecMediaDetailQ = {
        "user_id": 1,
        "id": 20
}

# 推荐视频  点赞
sleepRecMediaLike = baseUrl + '/sleepIndex/recMediaLike'  $$BINGO
sleepRecMediaLikeQ = {
        "user_id": 1,
        "media_id": 20
}

# 推荐视频 评论
sleepmediaComment =  baseUrl + '/sleepIndex/mediaComment'  $$BINGO
sleepmediaCommentQ = {
        "content": '哈哈',
        "user_id": 1,
        "media_id": 20
}

# ********* 人气酒店 *********** #
# 人气酒店列表
sleepsellerSearch =  baseUrl + '/sleepIndex/sellerSearch'  $$BINGO
sleepsellerSearchQ = {
        "user_id": 1,
        "limit": 10, 
        "offset": 0
}

# 人气商家详情页
sleepsellerDetail =  baseUrl + '/sleepIndex/sellerDetail'  $$BINGO
sleepsellerDetailQ = { 
        "user_id": 1, 
        "id": 6
}

# 人气商家 评论
sleepsellerComment =  baseUrl + '/sleepIndex/sellerComment'  $$BINGO
sleepsellerCommentQ = {
        "content": "11111", 
        "user_id": 1,
        "id": 6
}

# 人气商家 点赞
sleepsellerLike =  baseUrl + '/sleepIndex/sellerLike'  $$BINGO
sleepsellerLikeQ = {
        "user_id": 1,
        "id": 6
}

# ********* 住宿攻略 *********** #
# 住宿攻略 列表
sleeppostList =  baseUrl + '/sleepIndex/postList'  $$BINGO
sleeppostListQ = {
        "limit": 10,
        "offset": 0
}

# 住宿攻略 详情
sleeppostDetail =  baseUrl + '/sleepIndex/postDetail'  $$BINGO
sleeppostDetailQ = {
        "user_id":1, 
        "id": 11
}

# 住宿攻略评论
sleeppostComment =  baseUrl + '/sleepIndex/postComment'  $$BINGO
sleeppostCommentQ = {
        "content": '111', 
        "user_id": 1, 
        "post_id": 11
}

# 住宿攻略点赞
sleeppostLike =  baseUrl + '/sleepIndex/postLike'  $$BINGO
sleeppostLikeQ = {
        "user_id": 1, 
        "post_id": 11
}



# --------------------- 游  ---------------------- #
# 首页
tourIndex = baseUrl + '/tourIndex/index'
tourIndexQ = {
        'tab_id': 0
}

# 导览图列表
tourPicList =  baseUrl + '/tourIndex/tourPicList'  $$BINGO 
tourPicListQ = {
        "limit": 10, 
        "offset": 0
}

# 导览图详情页
tourPicDetail = baseUrl + '/tourIndex/tourPicDetail'
tourPicDetailQ = {
        "id": 2
}


# 全部线路及交通工具
tourRouteList = baseUrl + '/tourIndex/tourRouteList'
tourRouteListQ = {
        "rtype": '00' # '00' 全部线路 '01' 交通工具
} 

# 线路及交通工具详情
tourRouteDetail = baseUrl + '/tourIndex/tourRouteDetail'
tourRouteDetailQ = {
        "id": 5
}

# 线路攻略
#tourpostList = baseUrl(limit, offset, project, eara, cate)
tourpostList = baseUrl + '/tourIndex/postList'  $$BINGO
tourpostListQ = {
        "limit": 10,
        "offset": 0,
        'project': '',  #项目
        'eara': '', #地区
        'cate': '', #类别
}

# 线路攻略 详情
# postDetail(user_id, id)
tourpostDetail = baseUrl + '/tourIndex/postDetail'  $$BINGO
tourpostDetailQ = {
        "user_id": 1,
        "id": 15
}

# 线路攻略  评论
# postComment(content, user_id, post_id)
tourpostComment = baseUrl + '/tourIndex/postComment'  $$BINGO
tourpostCommentQ = {
        'content': '哈哈哈',
        "user_id": 1,
        "post_id": 15
}

# 线路攻略 点赞
# postLike(user_id, post_id)
tourpostLike = baseUrl + '/tourIndex/postLike'  $$BINGO
tourpostLikeQ =  {
        "user_id": 1,
        "post_id": 15
}

# 景区列表
# sellerSearch(user_id, tag, location, sortby, filter, limit, offset)
toursellerSearch = baseUrl + '/tourIndex/sellerSearch'  $$BINGO
toursellerSearchQ = {
        "limit": 10,
        "offset": 0
}

# 景区详情
# sellerDetail(user_id, id)
toursellerDetail = baseUrl + '/tourIndex/sellerDetail'  $$BINGO
toursellerDetailQ = {
        "user_id": 1,
        "id": 19
}

# 景区评论
# sellerComment(content, user_id, id)
toursellerComment = baseUrl + '/tourIndex/sellerComment'  $$BINGO
toursellerCommentQ = {
        'content': '哈哈哈111',
        "user_id": 1,
        "id": 19
}

# 景区点赞
# sellerLike(user_id, id)
toursellerLike = baseUrl + '/tourIndex/sellerLike'  $$BINGO
toursellerLikeQ = {
        "user_id": 1,
        "id": 19
}

# 用户登陆
userGetcode = baseUrl + '/user/getloginCode'  $$BINGO
userGetcodeQ = {
        "mobile": "17321066362"
        }

userMcheck = baseUrl + '/user/mcheck'  $$BINGO
userMcheckQ = {
        "mobile": "17321066362",
        "code": "8a14ea"
        }







        #  用户信息
        userUpdate = baseUrl + '/user/updateInfo'  $$BINGO
        userUpdateQ = {
                "nickname": "趣游崇明",
                "headimg": "https://avatars0.githubusercontent.com/u/11659631?v=4",
                "user_id": 1
                }
        
        #  通过tag去filter tag具体看后台tag管理下的 酒店标签
        sleepsellerSearch =  baseUrl + '/sleepIndex/sellerSearch'  $$BINGO
        sleepsellerSearchQ = {
                "user_id": 1,
                "tag": 8,
                "limit": 10, 
                "offset": 0
        }
        
        
        # 住首页接口
        sleepIndexList = baseUrl + '/sleepIndex/index'  $$BINGO
        sleepIndexListQ = {
                "limit": 10,
                "offset": 0
        }
        
        # 多了season_rec字段 后台只需要在需要配置的事写上标题就行
        seasonSearch = baseUrl + '/eatIndex/seasonRecSearch'  $$BINGO
        seasonSearchQ = {
                "limit": 10,
                "offset": 0
        }
        
        token过期已处理


        ======== &nbsp ========



        followUser = baseUrl + '/user/follow'
followUserQ = {
        "follow_id": 12,
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==", 
        }

followUserList = baseUrl + '/user/followList'
followUserListQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==", 
        }



        ======== &nbsp ========


        商家id 42 
        后台可以配
        有优惠券
        游
        模块


        reciev_coupon = baseUrl + "/user/recive_coupon"
reciev_couponQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "coupon_id": 3,
        }

use_coupon = baseUrl + "/user/coupon_use"
use_couponQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "coupon_id": 3,
        "coupon_code": "123"
        }



my_coupon = baseUrl + "/user/coupon_my"
my_couponQ = {
"token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
"ltype": 1, # 0 有效未使用 1 已使用 2 已过期
"limit": 10,
"offset": 0
}

my_post = baseUrl + '/user/postList'
my_postQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "limit": 10,
        "offset": 0
        }

my_recMedia = baseUrl + '/user/recMediaList'
my_recMediaQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "limit": 10,
        "offset": 0
        }



        
        '0000' 美食攻略  '0001' '住房攻略' 0010  游路线

        返回值有 rtype 表明是哪个模块的

        ======== &nbsp ========
        









        # 富文本帖子
postPlusList = baseUrl + '/eatIndex/postPlusList'
postPlusListQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "limit": 10,
        "offset": 0
}

# 富文本帖子 详情
postPlusDetail = baseUrl + '/eatIndex/postPlusDetail'
postPlusDetailQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "id": 1
}

# 富文本帖子评论
postPlusComment = baseUrl + '/eatIndex/postPlusComment'
postPlusCommentQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "content": "好吃呀好吃",
        "post_id": 1
}

# 富文本帖子点赞
postPlusLike = baseUrl + '/eatIndex/postPlusLike'
postPlusLikeQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "post_id": 1
}




# 热门优惠列表(首页limit指定1)
favordiscountList = baseUrl + '/shopIndex/favordiscountList'
favordiscountListQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "limit": 10,
        "offset": 0
}

# 热门优惠详情
favordiscountDetail = baseUrl + '/shopIndex/favordiscountDetail'
favordiscountDetailQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "id": 126
}

# 热门优惠详情
favordiscountComment = baseUrl + '/shopIndex/favordiscountComment'
favordiscountCommentQ = {
        "token": "PnhjrIIHsgWOphQ2dytO2amZPdDe4N5vA4dUSmr6AcCBqWrDBm/5YCNoRGVlbzqind+As7Q5DrtcAjh2nZV2AWBFQRBuUgunsD6oc6HDrp4=",
        "content": "好吃呀好吃",
        "post_id": 126
}

# 热门详情点赞
favordiscountLike = baseUrl + '/shopIndex/favordiscountLike'
favordiscountLikeQ = {
        "token": "PnhjrIIHsgWOphQ2dytO2amZPdDe4N5vA4dUSmr6AcCBqWrDBm/5YCNoRGVlbzqind+As7Q5DrtcAjh2nZV2AWBFQRBuUgunsD6oc6HDrp4=",
        "post_id": 126
}

# 可以用来做首页配置
postPlusDetail = baseUrl + '/eatIndex/postPlusDetail'
postPlusDetailQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "id": 1
}

// 水印
http://sfmimg.b0.upaiyun.com/prod_00/53a2bd9f859fa229.png!/watermark/url/L3Byb2RfMDAvOGRhZWNmNGRlM2EyNmEyZi5wbmc=/percent/8
L3Byb2RfMDAvOGRhZWNmNGRlM2EyNmEyZi5wbmc=


# 优惠活动页面banner
commBanner = baseUrl + '/commIndex/activityBanner'
commBannerQ = {}

1.商家都加了filter过滤 地区 ☑️
2.商家都加了has_coupon=1过滤是否有优惠券
3.针对富文本加了content字段 ☑️
4.在优惠券下来商家是加了ID在前面 ☑️



// 优惠券详情接口
detail_coupon = baseUrl + "/user/coupon_detail"
detail_couponQ = {
        "token": "rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSHC4RFJeXCcTvqYwtpGbGjdMSuJMb3X+ebGNXWdWg9OpQ==",
        "coupon_id": 6
}




https://tongji.baidu.com/
手机号 15601963619

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?5dda512547f14c220bf44583e81ca3d9";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>


线上错误收集机制
https://sentry.io/
xiaomaido@hotmail.com
1qazxsw2


quan = '/user/recive_quan_code'
quanQ = {
    'token': 'rMz8BKWMDgTBZSIktls73/haFrJjTCwG3CDUV2PjYSGk4qxl6OIlBjtcXZV/EYt6/PJWsFHTu3nuYQs2yOs6eg==',
    'coupon_code': '123456'
}

url = API_URL + quan
query = quanQ