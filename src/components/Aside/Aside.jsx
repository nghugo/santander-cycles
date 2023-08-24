import React from 'react';
import StationDetails from './StationDetails/StationDetails';
import WeatherDetails from './WeatherDetails/WeatherDetails';

const List = () => {
    return (
        <>
            <WeatherDetails />
            <StationDetails />
        </>
    );
}

export default List;