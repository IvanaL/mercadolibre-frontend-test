import React from 'react';
import './whiteWrapper.scss';

const whiteWrapper = props => {
    if(props.children){
        return (
            <div className="container">
                <div className="whiteWrapper">
                    {props.children}
                </div>
            </div>
        )
    }
    return null;
}

export default whiteWrapper;