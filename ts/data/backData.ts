//by hdp 2017.08.01
//后端数据

import { SendType, NetType } from './define'

export class BackData {
    private data: [] = [];
    private baseUrl = 'https://116.62.137.199/jd_app';

    constructor() {
        this.data[SendType.Login] = { netType: NetType.Post, url: '/auth/login' };
        this.data[SendType.Logout] = { netType: NetType.Post, url: '/auth/logout' };
        this.data[SendType.StudentContainer] = { netType: NetType.Get, url: '/room/daily' };
    }  

    public getNetType(type: SendType) {
        return this.data[type].netType;
    }
    public getUrl(type: SendType) {
        return this.baseUrl + this.data[type].url;
    }
}