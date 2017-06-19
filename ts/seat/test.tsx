//test

//seat singleSeat detail homework 
//adation selector paper

//current singleSeat

import * as React from 'react'

class Tool {
    //所有的compoent指针
    ids:string[];

    onSignin(){
        post();
        ids = [];
    }
    onSignout;
}
let tool:Tool;


export class Test extends React.Component<any, any>{
    func: () => void;
    singleSeat:string;
    row = 5;
    col = 5;

    render() {
        return <div>
            <label>{this.singleSeat}</label>
            <label>{this.singleSeat}</label>
            <label>{this.singleSeat}</label>
        </div>;
    }
    //组件加载后获取数据
    componentDidMount() {
        tool.post(aaa,bbb, this.onReciveData);
    }

    //接收数据后更新组件
    public onReciveData(value){
        //需要生成数据

        this.singleSeat = value.singleSeat;

        this.forceUpdate();
    }
}



export class singleSeat extends React.Component<{value:Tool, index:number}, any>{
    name:string;
    hormwork:string;
    index:number;

    render() {
        this.props.value.ids;
        return <div>
            
        </div>;
    }
    //组件加载后获取数据
    componentDidMount() {
        tool.post(aaa,bbb, this.onReciveData);
    }

    //接收数据后更新组件
    public onReciveData(value){
        this.singleSeat = value.name;

        this.forceUpdate();
    }

    onSignin(){
        //有些东西直接使用工具类
        tool.onSignin;
        this.forceUpdate();
    }
    onSignout(){
        tool.onSignout;
    }

}
