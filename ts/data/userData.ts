//by hdp 2017.08.01
//用户数据

import { PageType } from './define'
import { Lib } from './lib'

class LoginData {
    userId: string;
    userName: string;
    token: string;
    pages: PageType[];
}

//用户
export class UserData {
    public userName: string;
    public userId: string = '';
    public token: string = '';
    public pages: PageType[] = [];

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
        this.pages = [PageType.Classroom, PageType.Student, PageType.Homework, PageType.Check];

        this.save();
    }
    public logout = () => {
        this.hasLogin = false;
        this.userId = '';
        this.token = '';
        this.pages = [];

        //clean
        this._lib.saveData('user', undefined);
    }

    private save() {
        const value = {
            userName: this.userName,
            userId: this.userId,
            token: this.token,
            roles: this.pages,
        };

        this._lib.saveData('user', value);
    }
    private load() {
        this._lib.loadData('user', this);

        //temp
        this.pages = [PageType.Classroom, PageType.Student, PageType.Homework, PageType.Check];
    }
}