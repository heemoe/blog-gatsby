---
template: post
title: Two ways to add shared common css in vue
slug: /posts/two-ways-add-shared-common-css-in-vue
draft: false
date: 2019-09-17T01:30:14.281Z
description: ' '
category: ' '
tags:
  - vue
---
1. import global css file in `main.js`

```
import Vue from 'vue'
import App from './App.vue'
import router from './routes'

Vue.config.productionTip = false

// Importing the global css file
import "@/assets/global.css"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

2.using css loader, edit your webpack config file(it could be vue.config.js if the project create by vuecli)

```
pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['./src/styles/common.scss']
    }
  }
```
