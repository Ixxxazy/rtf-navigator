import React, {useContext} from 'react';
import PropertiesTableSection from "./PropertiesTableSection";
import PropertyItem from "./PropertyItem";
import CoordinatesEditor from "./CoordinatesEditor";
import {MapContext, MapContextDispatch} from "../MapContext";
import {ActionType} from "../Reducers/MapReducer";
import IncidentNodesEditor from "./IncidentNodesEditor";


const MapElementProperties = () => {
    const element = useContext(MapContext).selected
    const dispatch = useContext(MapContextDispatch)
    if (element) {
        return (
            <PropertiesTableSection label='Selected element'>
                <PropertyItem
                    name='ID' value={element.id}></PropertyItem>
                <PropertyItem name='Type' value={element.type}>
                </PropertyItem>
                <PropertyItem name='Delete'>
                    <button type="button" onClick={() => dispatch({type: ActionType.Deleted, element: element})}>Delete
                    </button>
                </PropertyItem>
                <PropertyItem name='Coordinates'><CoordinatesEditor/></PropertyItem>
                <IncidentNodesEditor/>
                {element.name !== undefined &&
                    <PropertyItem name='Name'>
                        <input type='text' value={element.name}
                               onChange={(e) =>
                                   dispatch({type: ActionType.Changed, element: {id: element.id, name: e.target.value}})}/>
                    </PropertyItem>}
                {element.longName !== undefined &&
                    <PropertyItem name='Long name'>
                        <input type='text' value={element.longName}
                               onChange={(e) =>
                                   dispatch({type: ActionType.Changed, element: {id: element.id, longName: e.target.value}})}/>
                    </PropertyItem>}
                {element.description !== undefined &&
                    <PropertyItem name='Description'>
                        <textarea value={element.description}
                               onChange={(e) =>
                                   dispatch({type: ActionType.Changed, element: {id: element.id, description: e.target.value}})}/>
                    </PropertyItem>}
                {element.workingHours !== undefined &&
                    <PropertyItem name='Working hours'>
                        <input type='text' value={element.workingHours}
                               onChange={(e) =>
                                   dispatch({type: ActionType.Changed, element: {id: element.id, workingHours: e.target.value}})}/>
                    </PropertyItem>}
                {element.staircaseGroup !== undefined &&
                    <PropertyItem name='Staircase ID'>
                        <input type='text' value={element.staircaseGroup}
                               onChange={(e) =>
                                   dispatch({type: ActionType.Changed, element: {id: element.id, staircaseGroup: e.target.value}})}/>
                    </PropertyItem>
                }
            </PropertiesTableSection>
        );
    }
    return null;
};

export default MapElementProperties;

