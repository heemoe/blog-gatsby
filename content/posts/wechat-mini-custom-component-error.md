---
template: "post"
title: 微信小程序自定义组件报错
date: 2018-04-04 15:56:15
tags: 
  - wechat
---


1.`Component is not found in path`

json组件路径配置错误,应该是`/components/item/item`

2.`Error: Expect FLOW_CREATE_NODE but get another`

组件的json也应该定义正确目录

参考: 

1. 组件 item.json

```
	{
  "component": true,
  "usingComponents": {
    "item": "/components/item/item"
  }
}
```

2. 页面 index.json

```
	{
  "usingComponents": {
    "item": "/components/item/item"
  }
}
```