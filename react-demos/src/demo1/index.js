/*
* Theme: 可变状态学习demo笔记
* Date：2018/09/18
* Author: Aspirin
* */
import React, { Component } from 'react';

export default class App extends Component{
    constructor() {
        super();
        this.state = {
            star: 0,
            timer: null,
            visitors: {
                day: 100,
                week: 1000,
                month: 100000
            }
        }
        this.data = {
            notState: true
        }
    }


    // this.state并不是一个不可变的对象，我们可以改变他的属性。但是强行改变并不会使它触发render的生命周期hook，也就不会渲染到UI上。
    componentDidMount = () => {
        this.state.star = 1000;
        // 不过，既然你确实改变了它的值，如果之后调用this.setState()方法的话，它会在你改变的值的基础上再做更新。
        this.setState(prevState => (
            {
                star: prevState.star + 1  // =====>>> 1001
            }
        ));
    }

    // 我们来做一些比较
    //first 这里的结果应该是1001 因为回调会首先计算star的值，然后在你直接改变的值的基础上做出更新
    componentDidMount = () => {
        this.setState(prevState => (
            {
                star: prevState.star + 1
            }
        ))
        this.state.star = 1000;
    }
    //second 这里的结果应该是1001
    componentDidMount = () => {
        this.state.star = 1000;
        this.setState({
            star: this.state.star + 1
        })
    }
    // third 这里的结果应该是1
    componentDidMount = () => {
        this.setState({
            star: this.state.star + 1,
            num: 'ten',
            visitors: {
                day: 'nobody'
            }
        })
        this.state.star = 1000;
    }

    // 状态更新会进行合并处理
    // 由上面的例子 我们可以每次更新部分状态
    // 新状态不会覆盖旧状态，而是将已有的属性进行合并操作。如果旧状态没有该属性，则新建
    // 这类似于Object.assign操作 而且合并是浅合并
    // 只有第一层的属性才会合并，更深层的属性都会覆盖
    // 参见state中的 num 和 visitors 的key

    // 其实也可以有不是状态的状态。
    // 如果你要存储某种状态。但是不希望在状态更新的时候触发render生命周期钩子，那么完全可以直接存储到实例的属性上，只要不是this.state的属性。

    // 关于异步更新
    // 异步更新说白点儿就是批量更新
    // 它并不是真正的异步，只是react有意识的将状态攒在一起进行批量更新
    // react组件有自己的生命周期，在某两个生命周期节点之间做的所有状态更新，react会将他们合并，而不是立即触发UI渲染，直到某个节点才会将他们合并的值批量更新
    // 下面的例子中 组件更新后 this.state.star 的值是1
    // 因为这些状态的改变都是在组件挂载之后、更新之前。所以他们并没有立即生效
    // this.state.star的值一直是0，尽管状态被多次操作，它得到的值一直是1，因此合并之后this.state.star的还是1，并不是我们直觉以为的3。

    componentDidMount = () => {
        this.setState({
            star: this.state.star + 1
        })
        this.setState({
            star: this.state.star + 1
        })
        this.setState({
            star: this.state.star + 1
        })
    }

    // 为什么要异步更新？？
    // 因为this.setState()会触发render生命周期钩子，也就会运行组件的diff算法。如果每次setState都要走这一套流程，不仅浪费性能，而且是完全没必要的。
    // 所以react选择了在一定阶段内进行批量更新
    // 还是以生命周期为界，挂载之前的所有setState批量更新，挂载之后到更新之前的所有setState批量更新，每次更新间隙的所有setState批量更新

    // 非异步情况
    componentDidMount = () => {
        this.timer = setTimeout(() => {
            this.setState({
                star: this.state.star + 1
            })
            this.setState({
                star: this.state.star + 1
            })
            this.setState({
                star: this.state.star + 1
            })
            this.setState({
                star: this.state.star + 1
            })
            this.setState({
                star: this.state.star + 1
            })
        }, 5000);
    }

    componentWillUnmount = () => {
        clearTimeout(this.timer);
    }

    // 总结一下：所谓的异步只是批量更新而已。真正异步回调和原生事件回调中的setState不是批量更新的。

    // 关于回调
    // this.setState()的参数既可以是一个对象，也可以是一个回调函数。
    // Tips: 箭头函数如果直接返回一个对象 要包裹一层小括号，以区别块级作用域

    componentDidMount = () => {
        this.setState((prevState, prevProps) => (
            {
                star: prevState.star + 1
            }
        ))
        this.setState((prevState, prevProps) => (
            {
                star: prevState.star + 1
            }
        ))
        this.setState((prevState, prevProps) => (
            {
                star: prevState.star + 1
            }
        ))
    }

    render() {
        const { star, num, visitors } = this.state;
        const { notState } = this.data;
        return (
            <div>
                <h1>{star}</h1>
                <h1>{num}</h1>
                <h1>{visitors.week}</h1>
                {
                    notState ? <h1>我是通过存储的状态渲染出来的</h1> : null
                }
            </div>
        )
    }
}