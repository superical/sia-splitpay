import * as React from 'react';
import {PageHeading} from "../PageHeading/index";

interface IProps {
    [key:string]:any;
}

export const ThankYouMessage = (props:IProps) => {
    return (
        <div>
            <PageHeading title="Thank You" />
            Other passengers will receive email about their payment soon.
        </div>
    );
}