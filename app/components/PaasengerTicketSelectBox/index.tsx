import * as React from 'react';
import {PassengerTicketBox} from "../PaasengerTicketBox/index";

interface IProps {
    [key:string]:any;
    id:string;
    inputName:string;
    checked?:boolean;
    passengerName:string;
    onChange?: () => void;
    passengerEmail?: string;
    onEmailInputChange?: () => void;
    defaultChecked?:boolean;
}

const s = require('./style.scss');

export const PassengerTicketSelectBox = (props:IProps) => {
    const {id, inputName, checked, passengerName, onChange, defaultChecked} = props;

    const sideContent =
        <div className="custom-checkbox custom-checkbox--1">
            <input type="checkbox" name={inputName} id={id} checked={checked}
                   defaultChecked={defaultChecked} onChange={onChange.bind(this)}/>
            <label htmlFor={id}></label>
        </div>;

    const mainContent =
        <div className={s.mainContentContainer}>
            <div style={{flex: 1}}>
                <h1>{passengerName}</h1>
            </div>
            <div style={{flex: 3, marginLeft: 10}}>
                <span className="input-1"><input type="text" aria-required="true" className="default"
                                                 name="passengerEmail"
                                                 value={props.passengerEmail}
                                                 onChange={props.onEmailInputChange.bind(this)}
                                                 placeholder="email@example.com" size={40} maxLength={40}
                                                 data-rule-required="true" autoComplete="off"/><a
                    href="#clear" className="ico-cancel-thin add-clear-text" tabIndex={-1}/></span>
            </div>
        </div>;

    return (
        <label htmlFor={id} style={{cursor: 'pointer'}}>
            <PassengerTicketBox sideContainer={sideContent} mainContainer={mainContent} />
        </label>
    );
}