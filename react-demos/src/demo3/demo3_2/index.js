/*
* Theme： 组件通讯学习笔记---子组件向父组件通讯
* Date: 2018/09/27
* Author: Aspirin
* Source: FED
* */

import React, { Component } from 'react';

export default class Parent extends Component {
    state = {
        msg: 'start'
    }

    transferMsg = (msg) => {
        this.setState({
            msg
        })
    }

    render(){
        return (
            <div>
                <p>child msg: {this.state.msg}</p>
                <Child_1 transferMsg={msg => this.transferMsg(msg)} />
            </div>
        )
    }

}

class Child_1 extends Component{
    componentDidMount = () => {
        setTimeout(() => {
            this.props.transferMsg('middle')
        },2000);
    }

    render() {
        return (
            <div>
                <p>child_1 component</p>
                <Child_1_1 {...this.props} />
            </div>
        )
    }
}

class Child_1_1 extends Component{
    componentDidMount = () => {
        setTimeout(() => {
            this.props.transferMsg('end')
        },5000);
    }

    render() {
        return (
            <div>
                <p>child_1_1 component</p>
            </div>
        )
    }
}

