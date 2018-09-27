/*
* Theme： 组件通讯学习笔记---观察者模式
* Date: 2018/09/27
* Author: Aspirin
* Source: FED
* */

import React, { Component } from 'react';
import eventProxy from './eventProxy';

export default class Parent extends Component{
    render() {
        return (
            <div>
                <Child_1/>
                <Child_2/>
            </div>
        );
    }
}

class Child_1 extends Component{
    componentDidMount() {
        setTimeout(() => {
            // 发布 msg 事件
            eventProxy.trigger('msg', 'end');
        }, 1000);
    }

    componentDidUpdate = () => {
        console.log('Child_1 update!')
    }

    render() {
        return (
            <div>
                <p>Child_1 component</p>
            </div>
        )
    }
}

class Child_2 extends Component{
    state = {
        msg: 'start'
    };

    componentDidUpdate = () => {
        console.log('Child_2 update')
    }

    componentDidMount() {
        // 监听 msg 事件
        eventProxy.on('msg', (msg) => {
            this.setState({
                msg
            });
        });
    }

    render() {
        return <div>
            <p>child_2 component: {this.state.msg}</p>
            <Child_2_1 />
        </div>
    }
}

class Child_2_1 extends Component{
    componentDidUpdate() {
        console.log('Child_2_1 update');
    }

    render() {
        return <div>
            <p>child_2_1 component</p>
        </div>
    }
}

