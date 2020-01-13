import React from 'react';
import './Spinner.scss';
import spinnerImg from '../../assets/images/spinner.gif';

const Spinner = props => {
    return (
        <div className="Spinner">
            <img src={spinnerImg} alt="spinner" />
        </div>
    )
}

export default Spinner;