//by hdp 2017.08.01

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
        if (data === undefined)
            return;

        data = JSON.parse(data);
        this.fillData(data, container);
    }
}