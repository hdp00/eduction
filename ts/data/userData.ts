//by hdp 2017.08.01
//用户数据

import * as Type from './define'
import { Lib } from './lib'

class LoginData {
    userId: string;
    userName: string;
    token: string;
    roles: Type.UserType[];
}

//用户
export class UserData {
    public userName: string;
    public userId: string = '';
    public token: string = '';
    public roles: Type.UserType[] = [];

    private _currentRole: Type.UserType;
    public set currentRole(value: any) {
        this._currentRole = value;
        this.save();
    }
    public get currentRole() {
        return this._currentRole;
    }

    public hasLogin: boolean = false;

    private _lib: Lib;

    constructor(lib: Lib) {
        this._lib = lib;
        this.load();
    }

    public login = (value: LoginData) => {
        if (value == undefined)
            return;

        this.hasLogin = true;
        this._lib.fillData(value, this);
        this.save();
    }
    public logout = () => {
        this.hasLogin = false;
        this.userId = '';
        this.token = '';
        this.roles = [];
        this.currentRole = 0;

        this.save(true);
    }

    private save(clean: boolean = false) {
        let value = undefined;
        if (!clean)
            value = {
                userName: this.userName,
                userId: this.userId,
                token: this.token,
                roles: this.roles,
                currentRole: this._currentRole,
            };

        this._lib.saveData('user', value);
    }
    private load() {
        this._lib.loadData('user', this);
    }
}