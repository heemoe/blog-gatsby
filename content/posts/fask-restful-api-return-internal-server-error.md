---
template: "post"
title: fask-RESTful Api return Internal Server Error
tags:
  - python
id: 376
categories:
  - 未分类
date: 2016-05-05 02:26:49
---

    {"message": "Internal Server Error"}
    `</pre>

    Json structures support contain dict,array,value([http://www.json.org/json-zh.html](http://www.json.org/json-zh.html)).

    if your json structures contain other ,you need use `str()` function to type conversion.

    <pre>`articles = Article.objects.all()
    alist = dict()
    for one in articles:
        myComments = dict()
        if one.comments is None:
            myComments = {}
        else:
            for comment in one.comments:
                myComments = {
                    'created_at': str(comment.created_at),
                    'body': str(comment.body),
                    'author' : str(comment.author),
                }
        json_dict = {
            'created_at' : str(one.created_at),
            'title' : one.title,
            'slug' : one.slug,
            'body' : str(one.body),
            'comments' : myComments
        }
        alist.setdefault(one.slug, json_dict)

    