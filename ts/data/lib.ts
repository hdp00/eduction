//by hdp 2017.08.01
import { PaperState } from './define'

//工具库
export class Lib {
    //填充数据
    fillData = (value, container) => {
        const keys = Object.keys(value);
        for (let key of keys)
            container[key] = value[key];
    }

    //读写数据
    saveData = (name: string, value: object) => {
        if (value === undefined) {
            localStorage.removeItem(name);
            return;
        }

        localStorage.setItem(name, JSON.stringify(value));
    }
    loadData = (name: string, container: object) => {
        let data = localStorage.getItem(name);
        if (data === undefined || data === null)
            return;

        data = JSON.parse(data);
        this.fillData(data, container);
    }
    getHomeworkStateColor = (state: PaperState) => {
        let color;
        switch (state) {
            case PaperState.HasChecked:
                color = 'rgba(255, 255, 0, 0.4)';
                break;
            case PaperState.Finished:
                color = 'rgba(0, 255, 0, 0.4)';
                break;
            default:
                color = 'rgba(0, 0, 255, 0.4)';
                break;
        }

        return color;
    }
}