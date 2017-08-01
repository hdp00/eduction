//by hdp 2017.07.27
//数据

export * from './userData'



//批改项
export class CheckItemData {
    image: number;
    text: string;
    score: number;
}

//错误信息
export class CorrectData {
    page: number;    //第几页
    x: number;
    y: number;
    type: CheckItemData;
}

//试卷信息
export class PaperData {
    id: string;
    corrects?: CorrectData[];
    images?: string[];
    text?: string;
    state: PaperState;
}


////////////////////////////////////////////////////////////////////

import { StudentData } from './studentData'
import { HomeworkData } from './homeworkData'
let studentMap = {};
let students: StudentData[] = [];
for (let i = 0; i < 30; i++) {
    let s = new StudentData();
    s.id = s.name = s.name + i;
    students.push(s);
    studentMap[s.id] = s;
}
students[4].hasSigned = true;
students[5].hasSigned = true;
students[6].hasSigned = true;
students[4].seatIndex = 12;
students[5].seatIndex = 15;
students[6].seatIndex = 16;
students[0].homeworks[0].id = '作业A';
students[0].homeworks[1].id = '作业B';
students[0].homeworks[2].id = '作业C';
students[0].homeworks[3].id = '作业D';
let row = 6;
let col = 8;

const homeworkPaper = {
    homeworkId: '作业A',
    subject: '语文',
    book: '一课一练',
    defaultPapers: [],
}

function getHomeworkText(s: StudentData) {
    let count = s.homeworks.length;
    let fininshedCount = 0;
    for (let t of s.homeworks) {
        if (t.status === PaperState.Finished)
            fininshedCount++;
    }

    return fininshedCount + '/' + count;
}
function getHomeworkStatus(s: StudentData) {
    return PaperState.New;
}
function setHomeworStatus(id: string, status: number) {
    let s = students[0];
    for (let homework of s.homeworks) {
        if (homework.id === id) {
            homework.status = status;
            return;
        }
    }
}

const addItems = ['纪律好A', '纪律好B', '纪律好C'];
const reduceItems = ['纪律差A', '纪律差B', '纪律差C'];

const checkItemList = [{
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

const paperList = [{
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

const HomeworkOptions = {
    subjects: [
        {
            value: '语文', label: '语文',
            children: [
                { value: '听写', label: '听写' },
                { value: '阅读', label: '阅读' },
                {
                    value: '复习', label: '复习',
                    children: [
                        { value: '阅读', label: '阅读' },
                        { value: '背诵', label: '背诵' }
                    ],
                }]
        },
        {
            value: '数学', label: '数学',
            children: [
                { value: '抄写', label: '抄写' },
                { value: '背诵', label: '背诵' }
            ]
        }
    ]
}
//////////////////////////////////////////////////////////////////////////////////////
export class EducationData {
    public ttt: Test;

}