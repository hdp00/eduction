//工具库
export class Lib {
    //填充数据
    fillData = (value, container) => {
        const keys = Object.keys(value);
        for (let key of keys)
            container[key] = value[key];
    }

    //读写数据
    saveData = (name:string, value:object) => {
        if(value === undefined){
            localStorage.removeItem(name);
            return;
        }

        localStorage.setItem(name, JSON.stringify(value));
    }
    loadData = (name:string, container:object) =>{
        const data = JSON.parse(localStorage.getItem(name));
        this.fillData(data, container);
    }
}