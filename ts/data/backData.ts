//by hdp 2017.08.01
//后端数据

import * as Type from './define'

export class BackData {
    private login: { netType: Type.NetType.Post, url: '/auth/login' };
    private logout: { netType: Type.NetType.Post, url: '/auth/logout' };

    private baseUrl = 'https://116.62.137.199/jd_app';

    public getNetType(type: Type.SendType) {
        const name = Type.SendType[type];
        return this[name].netType;
    }
    public getUrl(type: Type.SendType) {
        const name = Type.SendType[type];
        return this.baseUrl + this[name].url;
    }
}