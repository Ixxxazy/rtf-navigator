import React from 'react';
import MapCanvas from "../../components/MapCanvas/MapCanvas";
import InputBox from "../../components/UI/Input/InputBox";
import Dropdown from "../../components/UI/Dropdown/Dropdown";

const EditMap = () => {
    return (
        <section>
            <div className={'flex flex-row flex-wrap items-center gap-3'}>
                <InputBox label='Институт'>
                    <Dropdown options={['ИРИТ-РТФ', 'ХТИ']} />
                </InputBox>
                <InputBox label='Этаж'>
                    <Dropdown options={['1','2','3']} />
                </InputBox>
            </div>
            <div className='flex'>
                <MapCanvas className={'max-w-3xl'} editingAllowed={true} />
            </div>
        </section>
    );
};

export default EditMap;