import React, {useContext} from 'react';
import Button from "../../UI/Button/Button";
import InfoCard from "../../UI/InfoCard/InfoCard";
import {BaseMapElement, MapElementTypes} from "../MapElements";
import {MapContext} from "../MapContext";
import Input from "../../UI/Input/Input";
import InputBox from "../../UI/Input/InputBox";

const RoomInfo = () => {
    const context = useContext(MapContext)
    const getElementById = (id: number) => {
        return context.elements.find(el => el.id === id) as BaseMapElement
    }
    let searchPath = (root: number, end: number) =>
    {
        
    }
    return (
        <InfoCard className={'md:w-1/3 text-left'}>
            {(context.selected && context.selected.type === MapElementTypes.Room) ?
                <>
                    <h1 className={'text-4xl font-thin'}>{context.selected.name}</h1>
                    {context.selected!.longName && <h2 className={'text-2xl py-2'}>{context.selected.longName}</h2>}
                    {context.selected!.workingHours && <h3 className={'text-xl'}>{context.selected.workingHours}</h3>}
                    {context.selected!.description && <p className='py-3'>{context.selected.description}</p>}
                    <InputBox label='Начало маршрута'><Input placeholder='Р-044'></Input></InputBox>
                    <Button className={'w-full mt-3'} onClick={() => console.log(searchPath(context.elements.find(el => el.name === 'Р-035')!.id, context.selected!.id))}>Построить маршрут</Button>
                </> :
                <h1 className={'text-4xl font-thin'}>Выберите комнату</h1>
            }
        </InfoCard>
    );
};

export default RoomInfo;