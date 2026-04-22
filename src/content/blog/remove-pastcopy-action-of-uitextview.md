---
title: remove past/copy action of UITextView
description: Override UITextView actions to disable paste, copy, select, and related edit menu items.
date: 2017-07-14T02:56:25Z
draft: false
slug: remove-pastcopy-action-of-uitextview
tags:
  - iOS
  - Swift
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
