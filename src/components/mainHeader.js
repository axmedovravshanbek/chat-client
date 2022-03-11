import React from 'react';
import {MenuUnfoldOutlined} from "@ant-design/icons";
import {Layout} from "antd";

const MainHeader = ({children = 'alo'}) => {
    return (
        <Layout.Header style={{backgroundColor: '#FFFFFF', padding: 0, display: 'flex'}}>
            {children}
        </Layout.Header>
    );
};

export default MainHeader;
