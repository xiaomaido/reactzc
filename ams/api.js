#!/usr/bin/env python
# coding=utf-8
import urllib,urllib2
import json
import cookielib
import requests

#baseUrl = "http://192.168.16.132:8891/productApi."
#baseUrl = "http://139.224.44.238:8791/productApi."
baseUrl = "http://qyadmin.weichongming.com/peanut"


# ******************  吃  ************************** #
#首页接口
eatIndex = baseUrl + '/eatIndex/index'
eatIndexQ = {
}

# 限时福利列表接口
eatTimeBenefitList = baseUrl + '/eatIndex/timeBenefitsList'
eatTimeBenefitListQ = {
        "limit": 10,
        "offset": 0
}

# 限时福利详情接口
eatTimeBenefitDetail = baseUrl + '/eatIndex/timeBenefitsDetail'
eatTimeBenefitDetailQ = {
        "id": 2
}

# 美食攻略 详情
eatpostList = baseUrl + '/eatIndex/postList'
eatpostListQ = {
        "limit": 10,
        "offset": 0
}

# 美食攻略 详情
eatPostDetail = baseUrl + '/eatIndex/postDetail'
eatpostDetailQ = {
        "user_id": 0,  #后期接口直接注入可不考虑
        "id": 2
}

# 美食攻略评论
eatPostComment = baseUrl + '/eatIndex/postComment'
eatPostCommentQ = {
        "content": "好吃呀好吃",
        "user_id": 1,
        "post_id": 1
}

# 美食攻略点赞
eatpostLike = baseUrl + '/eatIndex/postLike'
eatpostLikeQ = {
        "user_id": 1,
        "post_id": 1
}

url = eatpostLike
query = eatpostLikeQ
res = requests.post(url, data=json.dumps(query))
print json.dumps(json.loads(res.text), indent=2, ensure_ascii=False)
























#!/usr/bin/env python
# coding=utf-8
import urllib,urllib2
import json
import cookielib
import requests

#baseUrl = "http://192.168.16.132:8891/productApi."
#baseUrl = "http://139.224.44.238:8791/productApi."
baseUrl = "http://qyadmin.weichongming.com/peanut"


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
# (user_id, id)


url = eatsellerDetail
query = eatsellerDetailQ

# url = eatsellerComment
# query = eatsellerCommentQ
res = requests.post(url, data=json.dumps(query))
print json.dumps(json.loads(res.text), indent=2, ensure_ascii=False)

