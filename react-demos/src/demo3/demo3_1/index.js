/*
* Theme： 组件通讯学习笔记---父组件向子组件通讯
* Date: 2018/09/27
* Author: Aspirin
* Source: FED
* */

import React, { Component } from 'react';

export default class Parent extends Component {
    state = {
        msg: 'start'
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                msg: 'end'
            })
        },1000);
    }

    render() {
        return (
            <Child_1 msg={this.state.msg} />
        )
    }
}

class Child_1 extends Component {
    render() {
        return(
            <div>
                <p>{this.props.msg}</p>
                <Child_1_1 {...this.props} />
            </div>
        )
    }
}

class Child_1_1 extends Component{
    render() {
        return (
            <div>
                <p>{this.props.msg}</p>
                <Child_1_1_1 {...this.props} />
            </div>
        )
    }
}

class Child_1_1_1 extends Component{
    render() {
        return (
            <p>{this.props.msg}</p>
        )
    }
}

