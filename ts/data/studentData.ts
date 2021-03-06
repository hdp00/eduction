//by hdp 2017.06.07
//学生数据

export class StudentData {
    public studentId: string = '测试';
    public studnetNo: string;
    public name: string = '测试';
    public school: string = '闵行区第一小学';
    public class: string = '三年级二班';
    public sex: string = '女';
    public hasSigned: boolean = false;


    addCreditStatus = {
        credit: 4,
        text: '纪律好C',
    };
    reduceCreditStatus = {
        credit: 5,
        text: '纪律差B',
    };


    public grades = [
        {
            date: new Date(),
            grade: [
                { subjectId: '语文', score: 12, },
                { subjectId: '数学', score: 34, },
                { subjectId: '英语', score: 56, },
            ],
        },
        {
            date: new Date(),
            grade: [
                { subjectId: '语文', score: 11, },
                { subjectId: '数学', score: 22, },
                { subjectId: '英语', score: 33, },
                { subjectId: '物理', score: 78, },
                { subjectId: '化学', score: 90, },
            ],
        },
        {
            date: new Date(),
            grade: [
                { subjectId: '语文', score: 44, },
                { subjectId: '数学', score: 55, },
                { subjectId: '英语', score: 66, },
                { subjectId: '物理', score: 78, },
                { subjectId: '化学', score: 90, },
            ],
        },
        {
            date: new Date(),
            grade: [
                { subjectId: '语文', score: 12, },
                { subjectId: '数学', score: 34, },
                { subjectId: '英语', score: 56, },
            ],
        },
        {
            date: new Date(),
            grade: [
                { subjectId: '语文', score: 11, },
                { subjectId: '数学', score: 22, },
                { subjectId: '英语', score: 33, },
                { subjectId: '物理', score: 78, },
                { subjectId: '化学', score: 90, },
            ],
        },
        {
            date: new Date(),
            grade: [
                { subjectId: '语文', score: 12, },
                { subjectId: '数学', score: 34, },
                { subjectId: '英语', score: 56, },
            ],
        },
        {
            date: new Date(),
            grade: [
                { subjectId: '语文', score: 11, },
                { subjectId: '数学', score: 22, },
                { subjectId: '英语', score: 33, },
                { subjectId: '物理', score: 78, },
                { subjectId: '化学', score: 90, },
            ],
        },

    ];

}
