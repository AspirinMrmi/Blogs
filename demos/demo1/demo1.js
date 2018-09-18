/*
    #Pages JavaScript this原理
    #Author: Aspirin
    #Date: 2018/09/18
 */
var obj = {
    foo: function () {
        
    }
};
var foo  = obj.foo;

// 调用foo函数有两种写法

// 写法一
obj.foo();

// 写法二
foo();

// 虽然上面的两种写法都是指向同一个函数，但是执行结果可能不一样

var obj = {
    bar: 1,
    foo: function () {
        console.log(this.bar);
    }
}
var foo = obj.foo;
var bar = 2;

obj.foo();  // 1
foo();      // 2

// 这种差异的原因，就在于函数体内部使用了this关键字。
// ！！！划重点：this 指的是函数运行时所在的环境。
// 在上面的例子中，对于obj.foo()来说，foo运行在obj环境，所以this指向obj；对于foo()来说，foo运行在全局环境，所以this指向全局环境。所以两者的运行结果不一样

//  ## JavaScript之所以有this的设计，跟内存里面的数据结构有关系

var obj = {
    foo: 5
};

// 上面的代码将一个对象赋值给变量obj。JavaScript引擎会先在内存里面，生成一个对象{foo: 5}，然后把这个对象的内存地址赋值给变量obj。
// 也就是说，变量obj是一个地址(reference)。后面如果要读取obj.foo，引擎会先从obj拿到内存地址，然后再从该地址读出原始对象，返回她的foo属性。

// 原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，上面例子的foo属性，实际上是以下面的形式保存的。
{
    foo: {
        [[value]]: 5
        [[writable]]: true
        [[enumerable]]: true
        [[configurable]]: true
    }
}

// 注意， foo属性的值保存在属性描述对象的value属性里面

// 上面的结构清晰，可是如果属性的值是一个函数

var obj = {
    foo:function () {

    }
}

// 这个时候，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性。
{
    foo: {
        [[value]]: 函数的地址
        ...
    }
}
// 由于函数式一个单独的值，所以它可以在不同的环境(上下文)执行。
var f = function () {

}
var obj = {f:f}
// 单独执行
f()
// obj环境执行
obj.f();

// 了解下环境变量
// JavaScript允许在函数体内部，引用当前环境的其他变量
var f = function () {
    console.log(x);
}
// 上面的代码中，函数体里面使用了变量x。该变量由运行环境提供。
// 问题来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境(context)。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境
var f = function () {
    console.log(this.x);
}
// 上面的代码中，函数体里面的this.x就是指当前运行环境的x。

var f = function () {
    console.log(this.x);
}
var x = 1;
var obj = {
    f: f,
    x: 2
};
// 单独执行
f();    // 1
// obj环境执行
obj.f();    //2













