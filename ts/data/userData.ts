//by hdp 2017.08.01
//用户数据

import { UserType } from './define'
import { Lib } from './lib'

class LoginData {
    userId: string;
    userName: string;
    token: string;
    roles: UserType[];
}

//用户
export class UserData {
    public userName: string;
    public userId: string = '';
    public token: string = '';
    public roles: UserType[] = [];

    private _currentRole: UserType;
    public set currentRole(value: UserType) {
        this._currentRole = value;
        this.save();
    }
    public get currentRole() {
        return this._currentRole;
    }

    public hasLogin: boolean = false;

    private _lib: Lib;

    public init(lib: Lib) {
        this._lib = lib;
        this.load();

        //temp
        if (this.token.length > 0)
            this.hasLogin = true;
    }
    public login = (value: LoginData) => {
        if (value == undefined)
            return;

        this.hasLogin = true;
        this._lib.fillData(value, this);

        //temp
        this.roles = [UserType.Teacher, UserType.Checker];

        this.currentRole = this.roles[0];
        this.save();
    }
    public logout = () => {
        this.hasLogin = false;
        this.userId = '';
        this.token = '';
        this.roles = [];
        this.currentRole = 0;

        //clean
        this._lib.saveData('user', undefined);
    }

    private save() {
        const value = {
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