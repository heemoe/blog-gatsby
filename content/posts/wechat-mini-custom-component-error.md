---
template: "post"
title: Wechat APP Custom Component Error
date: 2018-04-04 15:56:15
tags: 
  - wechat
---


1.`Component is not found in path`

The correct path should like this: `/components/item/item`

2.`Error: Expect FLOW_CREATE_NODE but get another`

You should set up a correct path in json file 

Exemple: 

1. Component item.json

```
	{
  "component": true,
  "usingComponents": {
    "item": "/components/item/item"
  }
}
```

2. Page index.json

```
	{
  "usingComponents": {
    "item": "/components/item/item"
  }
}
```