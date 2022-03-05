import React, {useContext} from 'react';
import {MenuUnfoldOutlined} from "@ant-design/icons";
import s from "../styles/Home.module.css";
import {Layout} from "antd";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const {Header, Sider, Content} = Layout;

const MainHeader = ({children='alo', icon, iconOnClick}) => {
    const {store} = useContext(Context);
    return (
        <Header className="site-layout-background" style={{backgroundColor: '#FFFFFF', padding: 0, display: 'flex'}}>
            <MenuUnfoldOutlined className={s.trigger}/>
            {children}
        </Header>
    );
};

export default observer(MainHeader);
