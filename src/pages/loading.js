import React from 'react';
import {LoadingOutlined} from "@ant-design/icons";

const Loading = () => {
    return (
        <div className='d-flex jcc aic column' style={{width:'100%', height:'100%'}}>
            <LoadingOutlined style={{fontSize:48}}/>
            <h2>loading</h2>
        </div>
    );
};

export default Loading;
