import React from 'react';
import InfoCard from "../components/UI/InfoCard/InfoCard";
import Button from "../components/UI/Button/Button";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import MapCanvas from "../components/MapCanvas/MapCanvas";
import InputBox from "../components/UI/Input/InputBox";
const BuildingMap = () => {
    return (
        <div className={'flex flex-col md:flex-row'}>
            <div className={'p-3 w-full text-center vertical-center'}>
                <div className={'flex flex-row flex-wrap items-center gap-3'}>
                    <InputBox label='Институт'>
                        <Dropdown options={['ИРИТ-РТФ', 'ХТИ']} />
                    </InputBox>
                    <InputBox label='Этаж'>
                        <Dropdown options={['1','2','3']} />
                    </InputBox>
                    <span></span>
                </div>
                <MapCanvas/>
            </div>
        </div>
    );

};

export default BuildingMap;