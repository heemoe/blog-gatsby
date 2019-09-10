---
template: "post"
title: 'swift 4.0 using closure pass value'
date: 2018-3-20 18:42:20
tags: 
  - iOS
---

### swift 4.0 using closure pass value


```
// class A

// 1.create a typealis
typealias WebHandler = (_ height:CGFloat) -> Void

// 2.a handler 
var handler: WebHandler?

// 3.a function pass the handler
func webHeightDidChange(handle: @escaping WebHandler) {
         handler = handle
    }
    
// 4.the value passing
func heightDidChange(height: CGFloat) {
	if handler != nil {
		handler!(height)
	}
}
```

```
/// class B

var a = A()
a.webHeightDidChange(handle: { (height) in
	print(height)    
})

```