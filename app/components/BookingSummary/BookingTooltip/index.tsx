import * as React from 'react';
import {classNamesConcat, moneyFormatter} from "../../../helpers/Utils/index";

interface IProps {
    [key:string]:any;
    priceDiff: number;
}

const s = require('./style.scss');

export const BookingTooltip = (props:IProps) => {
    const {priceDiff} = props;
    const priceDisplay: string = (priceDiff > 0) ? `+ ${moneyFormatter(Math.abs(priceDiff))}` : `- ${moneyFormatter(Math.abs(priceDiff))}`;

    return (
        <div className={classNamesConcat('tooltip-1', 'add-ons-booking-tooltip', s.bookingToolTip)}
             style={{display: 'block'}}>
            <div className="tooltip__content">Fare<span className="text-1">{priceDisplay}</span></div>
            <em className="tooltip__arrow"/>
        </div>
    );
}