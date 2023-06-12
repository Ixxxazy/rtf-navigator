import React, {useContext, useState} from 'react';
import RoomInfo from "../RoomInfo/RoomInfo";
import {MapContext} from "../MapContext";
import InputBox from "../../UI/Input/InputBox";
import Dropdown from "../../UI/Dropdown/Dropdown";
import RoutePlanner from "../RoutePlanner/RoutePlanner";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";

const MapMenu = () => {
    const mapState = useContext(MapContext)
    const [hidden, setHidden] = useState(false)
    return (
        <section className={`absolute flex bottom-0 sm:block sm:relative w-screen ${hidden ? 'sm:w-0' : 'sm:w-auto'}`}>
            <div className='w-full h-0 hidden sm:flex'>
                <button type='button' onClick={() => setHidden(!hidden)}
                        className='mt-16 py-3 bg-white dark:bg-neutral-800 w-auto h-fit shrink-0 z-10 rounded-r-xl shadow'
                        style={{marginLeft: '100%'}}>
                    {hidden ? <NavigateNext/> : <NavigateBefore/>}
                </button>
            </div>
            <menu className={`bg-neutral-50 dark:bg-neutral-800 h-full shadow z-20 w-screen ${hidden ? 'sm:hidden' : 'sm:w-64 md:w-96'}`}>
                <li className={'flex flex-row flex-wrap items-center gap-3 p-3'}>
                    <InputBox label='Институт'>
                        <Dropdown options={['ИРИТ-РТФ', 'ХТИ']}/>
                    </InputBox>
                    <InputBox label='Этаж'>
                        <Dropdown options={['1', '2', '3']}/>
                    </InputBox>
                </li>
                <li>
                    <RoutePlanner/>
                </li>
                {mapState.selected && <li><RoomInfo/></li>}
            </menu>
        </section>
    );
};

export default MapMenu;