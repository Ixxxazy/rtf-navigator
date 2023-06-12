import React from 'react';
import MapCanvas from "../../components/MapCanvas/MapCanvas";

const EditMap = () => {
    return (
        <MapCanvas className={'w-full'} editingAllowed={true}/>
    );
};

export default EditMap;