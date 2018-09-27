/*
* Theme： 组件通讯学习笔记---兄弟组件间通讯（复杂）
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

    componentDidMount = () => {
        this.setState({
            msg: 'sha?'
        })
    }

    componentDidUpdate = () => {
        console.log('Parent update!')
    }

    render(){
        return(
            <div>
                <p>msg:{this.state.msg}</p>
                <Child_1 transferMsg={msg => this.transferMsg(msg)} />
                <Child_2 msg={this.state.msg} />
            </div>
        )
    }
}

class Child_1 extends Component{
    componentDidMount = () => {
        setTimeout(() => {
            this.props.transferMsg('end')
        },3000)
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
    componentDidUpdate = () => {
        console.log('Child_2 update')
    }

    render() {
        return (
            <div>
                <p>child_2 component: {this.props.msg}</p>
                <Child_2_1 />
            </div>
        )
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


