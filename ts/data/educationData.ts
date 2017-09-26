//by hdp 2017.07.27
//数据

import { Lib } from './lib'
import { UserData } from './userData'
import { BackData } from './backData'
import { SeatData } from './seatData'
import { PageType } from './define'
//import { imageTrue, imageFalse, imageQuestion, image0, image2, image3 } from '../image'

export class EducationData {
    public user = new UserData();
    public back = new BackData();
    public router = new routerData();
    public seat = new SeatData();


    private _lib: Lib;

    public init(lib: Lib) {
        this._lib = lib;
        this.user.init(this._lib);
    }

    public defaultUrl = () => {
        switch (this.user.pages[0]) {
            case PageType.Classroom:
                return this.router.classroom;
            case PageType.Student:
                return this.router.student;
            case PageType.Homework:
                return this.router.homework;
            case PageType.Check:
                return this.router.check;
            default:
                return this.router.classroom;
        }
    }
    public isValidData = (data: object) => {
        return (data['code'] == 0);
    }
}

class routerData {
    public root = '/';

    public login = '/login';
    public logout = '/logout';
    public password = '/password';

    public check = '/check';

    public classroom = '/classroom';
    public seat = '/classroom/seat';
    public student = '/classroom/student';
    public homework = '/classroom/homework';
};


// //批改项
// export class CheckItemData {
//     image: number;
//     text: string;
//     score: number;
// }

// //错误信息
// export class CorrectData {
//     page: number;    //第几页
//     x: number;
//     y: number;
//     type: CheckItemData;
// }

// //试卷信息
// export class PaperData {
//     id: string;
//     corrects?: CorrectData[];
//     images?: string[];
//     text?: string;
//     state: PaperState;
// }

    // constructor() {
    //     this.imageTrue.src = imageTrue;
    //     this.imageFalse.src = imageFalse;
    //     this.imageQuestion.src = imageQuestion;
    // }

    // imageTrue: HTMLImageElement = new Image();
    // imageFalse: HTMLImageElement = new Image();
    // imageQuestion: HTMLImageElement = new Image();
    // //批改页数据
    // public check = {
    //     //错误项图标
    //     imageItem: {
    //         0: this.imageFalse,
    //         1: this.imageQuestion,
    //     },
    //     currentIndex: 0,
    // };


////////////////////////////////////////////////////////////////////

// import { StudentData } from './studentData'
// import { HomeworkData } from './homeworkData'
// let studentMap = {};
// let students: StudentData[] = [];
// for (let i = 0; i < 30; i++) {
//     let s = new StudentData();
//     s.id = s.name = s.name + i;
//     students.push(s);
//     studentMap[s.id] = s;
// }


// const paperList = [{
//     id: '0',
//     images: [
//         image0,
//         image2,
//         image3
//     ],
//     text: 'aaa',
//     state: PaperState.New,
// },
// {
//     id: '1',
//     images: [
//         image3,
//         image2,
//         image0
//     ],
//     text: 'bbb',
//     state: PaperState.New,
// }];

// const HomeworkOptions = {
//     subjects: [
//         {
//             value: '语文', label: '语文',
//             children: [
//                 { value: '听写', label: '听写' },
//                 { value: '阅读', label: '阅读' },
//                 {
//                     value: '复习', label: '复习',
//                     children: [
//                         { value: '阅读', label: '阅读' },
//                         { value: '背诵', label: '背诵' }
//                     ],
//                 }]
//         },
//         {
//             value: '数学', label: '数学',
//             children: [
//                 { value: '抄写', label: '抄写' },
//                 { value: '背诵', label: '背诵' }
//             ]
//         }
//     ]
// }
