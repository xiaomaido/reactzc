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

