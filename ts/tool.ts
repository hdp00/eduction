//by hdp 2017.05.26
//全局工具类

import * as $ from 'jquery'
import { PaperState } from './define'
import { imageTrue, imageFalse, imageQuestion, image0, image2, image3 } from './image'

class virtualData {
    '/check/checkItemList' = [{
        image: 0,
        text: 'a',
        score: 1,
    },
    {
        image: 0,
        text: 'b',
        score: 1,
    },
    {
        image: 0,
        text: 'c',
        score: 1,
    },
    {
        image: 1,
        text: 'd',
        score: 1,
    },
    {
        image: 1,
        text: 'e',
        score: 1,
    }];

    '/check/paperList' = [{
        id: '0',
        images: [
            image0,
            image2,
            image3
        ],
        text: 'aaa',
        state: PaperState.New,
    },
    {
        id: '1',
        images: [
            image3,
            image2,
            image0
        ],
        text: 'bbb',
        state: PaperState.New,
    }];
}
const data = new virtualData();

class EducationTool {
    constructor() {
        this.imageTrue.src = imageTrue;
        this.imageFalse.src = imageFalse;
        this.imageQuestion.src = imageQuestion;
    }

    imageTrue: HTMLImageElement = new Image();
    imageFalse: HTMLImageElement = new Image();
    imageQuestion:HTMLImageElement = new Image();
    //批改页数据
    public check = {
        //错误项图标
        imageItem: {
            0: this.imageFalse,
            1: this.imageQuestion,
        },
        currentIndex: 0,
    };

    //用户
    public user = {
        userId: '',
        token: '',
    }

    //后台数据
    public back = {
        post: (url: string, request?: object, callback?: (response: string) => void) => {
            // let data:object = {
            //     ...this.user,
            //     ...request
            // }
            // if (request === undefined)
            //     $.post(url, callback);
            //  else
            //     $.post(url, data, callback);

            if (callback === undefined)
                return;
            this.back.filldata(url, callback);
        },
        postLogin: (url: string, request: object, callback: (response: string) => void) => {
            // $.post(url, request, callback);
        },
        analyzeResponse: (response: any) => {
            //return JSON.parse(response);
            return response;
        },
        //sse连接
        addEventSource: (url: string, callback: (event: any) => void) => {
            // let e:EventSource = new EventSource(url);
            // e.onmessage = callback;

            this.back.filldata(url, callback);
        },

        //temp 填充数据
        filldata: (url: string, callback?: (response: string) => void) => {
            callback(data[url]);
        },

    }

    public value = 'test';
    private save() {

    }

}

export const Tool = new EducationTool();