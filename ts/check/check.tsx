//by hdp 2017.05.26
//批改页面

import * as React from 'react';
import {Show} from './show';
import {PaperList} from './paperList';
import {CheckList} from './checkList';

class Check extends React.Component<any, any>{

    render(){
        return <div>
            <Show />
            <CheckList />
            <PaperList /> 
        </div>;
    }
}