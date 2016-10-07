import * as React from 'react';

interface IProps {
    [key:string]:any;
    sideContainer: Element;
    mainContainer: Element;
}

const s = require('./style.scss');

export const PassengerTicketBox = (props:IProps) => {
    const {sideContainer, mainContainer} = props;
    return (
        <div>
            <div className={s.tixPaymentBox}>
                <div className={s.tixPaymentBox__sideMarker}>
                    {sideContainer}
                </div>
                <div className={s.tixPaymentBox__main}>
                    {mainContainer}
                </div>
            </div>
        </div>
    );
}