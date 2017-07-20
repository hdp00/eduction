//by hdp 2017.06.07
//作业数据

import { IPaper, PaperState } from '../define'

export class HomeworkData {
    public id: string = '作业';
    public status: PaperState = PaperState.New;
    public subject: string = '语文';
    public item: string = '复习';
    public childItem: string = '阅读';
    public book: string = '一课一练';
    public range: string = '10-15页';
    public times: string = '5遍';
    public desc: string = '具体描述';
    public remark: string = '备注';
    public isNeedSign: boolean = true;
    public studentIds: string[] = [];
}

export class HomeworkOptions {
    public subjects: [
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
    ];
}

export class HomeworkItems {
    public subject: {
        'chinese': '',
        'math': '',
    }
}
