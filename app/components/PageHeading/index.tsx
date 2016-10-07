import * as React from 'react';

interface IProps {
    [key:string]:any;
    title: string;
}

export const PageHeading = (props:IProps) => {
    return (
        <div className="blk-heading blk-heading--1 block--shadow">
            <h2 className="main-heading">{props.title}</h2>
        </div>
    );
}