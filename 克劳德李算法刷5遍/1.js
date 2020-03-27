/* 
提纲：
call \ apply \ bind 
EventEmitter
防抖
节流
浅拷贝
深拷贝
数组去重
扁平、排序、最值
洗牌算法
函数柯里化
手写jsonp
es5继承
手写instanceof
基于Promise的ajax封装
单例模式
异步循环打印
图片懒加载
*/


// call 给函数指定this和参数进行调用
Function.prototype.call2 = function(context = window,...args) {
    if(this === Function.prototype) {
        return TypeError('error')
    }
    let fn = Symbol()
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res
}

// apply 参数为数组
Function.prototype.apply2 = function(context = window,args) {
    if(this === Function.prototype) {
        return TypeError('error')
    }
    let fn = Symbol(), 
        res
    context[fn] = this
    if(Array.isArray(args)) {
        res = context[fn](...args)
    }else {
        res = context[fn]
    }
    delete context[fn]
    return res
}

// bind 返回一个绑定为this的函数，要注意这个函数被当成构造函数用的情况
Function.prototype.bind2 = function(context, ...args1) {
    if(this === Function.prototype) {
        return TypeError('error')
    }
    let self = this
    return function F(...args2) {
        if(this instanceof F) {
            return new self(...args1, ...args2)
        }
        return self.apply(context, args1.concat(args2))
    }
}