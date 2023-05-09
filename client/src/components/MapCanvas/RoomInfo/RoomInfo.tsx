import React, {useContext} from 'react';
import InfoCard from "../../UI/InfoCard/InfoCard";
import {MapElementTypes} from "../MapElements";
import {MapContext} from "../MapContext";

const RoomInfo = () => {
    const context = useContext(MapContext)
    return (
        <InfoCard className={'max-w-xs lg:max-w-md w-full text-left'}>
            {(context.selected && context.selected.type === MapElementTypes.Room) ?
                <>
                    <h1 className={'text-4xl font-thin'}>{context.selected.name}</h1>
                    {context.selected!.longName && <h2 className={'text-2xl py-2'}>{context.selected.longName}</h2>}
                    {context.selected!.workingHours && <h3 className={'text-xl'}>{context.selected.workingHours}</h3>}
                    {context.selected!.description && <p className='py-3'>{context.selected.description}</p>}
                </> :
                <h1 className={'text-4xl font-thin'}>Выберите комнату</h1>
            }
        </InfoCard>
    );
};

export default RoomInfo;