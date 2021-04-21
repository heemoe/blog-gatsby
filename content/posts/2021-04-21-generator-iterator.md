---
template: post
title: Generator & Iterator
slug: generator-iterator-things
draft: true
date: 2021-04-21T15:20:21.242Z
description: ' '
category: ' '
tags:
  - javascript
---
通过生成器可以自定义一个Object的迭代器

> Python的for循环不但可以用来遍历list，还可以用来遍历文件对象
```javascript
const custom = { a: 1, b: 2, c: 3 };
custom[Symbol.iterator] = function* () {
  const keys = Object.keys(this);

  for (const iterator of keys) {
    yield iterator
  }
};
console.log(custom);
// {a: 1, b: 2, c: 3}
console.log(...custom);
// a b c
for (const i of custom) {
  console.log(i);
}
// a
// b
// c
```
