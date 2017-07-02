//by hdp 2017.06.19
//座位页面管理类

export class SeatManager {
    //当前座位
    public currentIndex: number = -1;
    //座位和学生的对应数据
    public seatIds: string[] = [];

    public getCurrentId = () => {
        if (this.currentIndex === -1)
            return undefined;

        return this.seatIds[this.currentIndex];
    }

    public currentHomeworkIndex: number = -1;

    //选择学生改变
    public onCurrentStudentChange: () => void;
}