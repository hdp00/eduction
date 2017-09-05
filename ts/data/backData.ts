//by hdp 2017.08.01
//后端数据

import { SendType, NetType } from './define'

export class BackData {
    private data = [];
    private baseUrl = 'https://116.62.137.199/jd_app';

    constructor() {
        //login
        this.data[SendType.Login] = { netType: NetType.Post, url: '/auth/login' };
        this.data[SendType.Logout] = { netType: NetType.Post, url: '/auth/logout' };
        this.data[SendType.Password] = { netType: NetType.Post, url: '/auth/change_passwd' };
        this.data[SendType.CheckLogin] = { netType: NetType.Post, url: '/auth/check' };
        //seat
        this.data[SendType.StudentContainer] = { netType: NetType.Get, url: '/room/daily' };
        this.data[SendType.StudentSelector] = { netType: NetType.Get, url: '/student/list' };
        this.data[SendType.Signin] = { netType: NetType.Post, url: '/student/sign_in' };
        this.data[SendType.Signout] = { netType: NetType.Post, url: '/student/sign_out' };
        this.data[SendType.ParentData] = { netType: NetType.Get, url: '/dict/options_items' };
        this.data[SendType.StudentDetail] = { netType: NetType.Get, url: '/student/detail' };
        this.data[SendType.Homework] = { netType: NetType.Get, url: '/student_task/list' };
        this.data[SendType.AddCreditItem] = { netType: NetType.Get, url: '/student_credit/options' };
        this.data[SendType.ReduceCreditItem] = { netType: NetType.Get, url: '/student_credit/options' };
        this.data[SendType.AddCredit] = { netType: NetType.Post, url: '/student_credit/new' };
        this.data[SendType.CancelCredit] = { netType: NetType.Post, url: '/student_credit/backout' };
        this.data[SendType.Credit] = { netType: NetType.Get, url: '/student_credit/detail' };
        this.data[SendType.BeginRead] = { netType: NetType.Post, url: '/student_daily/start_reading' };
        this.data[SendType.EndRead] = { netType: NetType.Post, url: '/student_daily/end_reading' };
        
        //student
        this.data[SendType.Students] = { netType: NetType.Get, url: '/student/list' };
    } 

    public getNetType(type: SendType) {
        return this.data[type].netType;
    }
    public getUrl(type: SendType) {
        return this.baseUrl + this.data[type].url;
    }
}