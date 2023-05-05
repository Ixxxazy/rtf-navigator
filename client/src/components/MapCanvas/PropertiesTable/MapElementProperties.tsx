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
                    </PropertyItem>
                }
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
    return (<></>);
};

export default MapElementProperties;

