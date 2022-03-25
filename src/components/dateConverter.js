import React from 'react';
import {store} from "../js/store";
import {lang} from "../js/lang";
import {observer} from "mobx-react-lite";

const DateConverter = ({d, type = 'date'}) => {
    const months = [
        {en: 'January', uz: 'Yanvar', ru: 'Январь'},
        {en: 'February', uz: 'Fevral', ru: 'Февраль'},
        {en: 'March', uz: 'Mart', ru: 'Март'},
        {en: 'April', uz: 'Aprel', ru: 'Апрель'},
        {en: 'May', uz: 'May', ru: 'Май'},
        {en: 'June', uz: 'Iyun', ru: 'Июнь'},
        {en: 'July', uz: 'Iyul', ru: 'Июль'},
        {en: 'August', uz: 'Avgust', ru: 'Август'},
        {en: 'September', uz: 'Sentyabr', ru: 'Сентябрь'},
        {en: 'October', uz: 'Oktyabr', ru: 'Октябрь'},
        {en: 'November', uz: 'Noyabr', ru: 'Ноябрь'},
        {en: 'December', uz: 'Dekabr', ru: 'Декабрь'},
    ];
    const dateC = (d2, type2 = 'date') => {
        const inputDate = new Date(d2);
        const now = new Date();
        if (type2 === 'date') {
            if (now.getFullYear() === inputDate.getFullYear()) {
                return `${inputDate.getDate()} ${months[inputDate.getMonth()][store.lang]}`
            }
            return inputDate.getFullYear()
        }
        if (type2 === 'clock') {
            return `${inputDate.getHours().toString().padStart(2, '0')}:${inputDate.getMinutes().toString().padStart(2, '0')}`
        }
        if (type2 === 'hybrid') {
            if (now.getTime() - inputDate.getTime() < 60 * 60 * 1000) {
                return `${Math.ceil((now.getTime() - inputDate.getTime()) / (60 * 1000))} ${lang.minutesAgo[store.lang]}`
            } //minutes ago
            if (inputDate.toDateString() === now.toDateString()) {
                return dateC(d, 'clock')
            }// 14:50
        }
        return dateC(d, 'date')
    };
    return <React.Fragment>{dateC(d, type)}</React.Fragment>
};

export default observer(DateConverter);
