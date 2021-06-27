import React from 'react';
import { useLocation } from 'react-router';

const ResetPWComponent = () => {
    let location = useLocation();

    return (
        <>
            <h1>Uhoh! No page here for {location.pathname}</h1>
        </>
    )

}

export default ResetPWComponent;