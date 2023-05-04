import React, {useContext} from 'react';
import {MapContext, MapContextDispatch} from "../MapContext";
import {IPoint} from "../Interfaces/Interfaces";
import {ActionType} from "../Reducers/MapReducer";
import {MapElementTypes} from "../MapElements";

const CoordinatesEditor = () => {
    const element = useContext(MapContext).selected
    const dispatch = useContext(MapContextDispatch)
    if (element === null) {
        return (<></>)
    }
    const updateCoordinates = (newCoordinates: IPoint, index: number) => {
        dispatch({
            type: ActionType.Changed, element: {
                ...element, coordinates: element?.coordinates.map((coordinates, i) => {
                    return (i === index) ? newCoordinates : coordinates
                })
            }
        })
    }
    const deleteCoordinates = (index: number) => {
        dispatch({
            type: ActionType.Changed, element: {
                ...element, coordinates: element?.coordinates.filter((_, i) => i !== index)
            }
        })
    }
    const addCoordinates = () => {
        dispatch({
            type: ActionType.Changed, element: {
                ...element, coordinates: [...element.coordinates, element.coordinates.at(-1)]
            }
        })
    }
    return (
        <>
            {element.coordinates.map((coordinates, index) =>
                <div key={index} className='flex'><span className={'w-6 font-semibold'}>{index + 1}</span>
                    <input className='w-14' value={coordinates.x} min={0} type='number'
                           onChange={e => updateCoordinates({...coordinates, x: parseInt(e.target.value)}, index)}/>
                    <input className='w-14' value={coordinates.y} min={0} type='number'
                           onChange={e => updateCoordinates({...coordinates, y: parseInt(e.target.value)}, index)}/>
                    {element.coordinates.length > 2 &&
                        <button type='button' onClick={() => deleteCoordinates(index)}>-</button>
                    }
                </div>)}
            {(element.type !== MapElementTypes.Waypoint && element.type !== MapElementTypes.Node) &&
                <button type='button' onClick={() => addCoordinates()}>+</button>
            }
        </>
    );
}

export default CoordinatesEditor;