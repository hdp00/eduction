//by hdp 2017.08.01
//后端数据

import { SendType } from './define'

export class BackData {
    private data: [] = [];
    private baseUrl = 'https://116.62.137.199/jd_app';

    constructor() {
        this.data[SendType.Login] = { netType: Type.NetType.Post, url: '/auth/login' };
        this.data[SendType.Logout] = { netType: Type.NetType.Post, url: '/auth/logout' };
    }  

    public getNetType(type: SendType) {
        return this[type].netType;
    }
    public getUrl(type: SendType) {
        return this.baseUrl + this[type].url;
    }
}