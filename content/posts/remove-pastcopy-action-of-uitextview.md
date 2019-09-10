---
template: "post"
title: remove past/copy action of UITextView
tags:
  - iOS
  - Swift
id: 486
comment: false
categories:
  - 未分类
date: 2017-07-14 02:56:25
---

    override this function in UITextView subclass.
`override func canPerformAction(_ action: Selector, withSender sender: Any?) -> Bool {
        switch action {
        case #selector(UIResponderStandardEditActions.paste(_:)),
             #selector(UIResponderStandardEditActions.select(_:)),
             #selector(UIResponderStandardEditActions.selectAll(_:)),
             #selector(UIResponderStandardEditActions.copy(_:)),
             #selector(UIResponderStandardEditActions.cut(_:)),
             #selector(UIResponderStandardEditActions.delete(_:)) :
            return false
        default:
            return true
        }
        return false
    }`