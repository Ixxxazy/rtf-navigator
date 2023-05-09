import React, {useEffect, useMemo, useReducer, useState} from 'react';
import MapElementProperties from "./PropertiesTable/MapElementProperties";
import mapReducer from "./Reducers/MapReducer";
import {MapContext, MapContextDispatch} from "./MapContext";
import MapSVG from "./MapSVG/MapSVG";
import ToolSelector from "./ToolSelector/ToolSelector";
import {ITool} from "./Interfaces/Interfaces";
import {DragTool} from "./Tools";
import {useFetching} from "./Hooks/useFetching";
import {BaseMapElement, Building, Floor} from "./MapElements";

//PLACEHOLDER: Remove later
import placeholderData from './placeholderData.json'

type MapCanvasProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    editingAllowed?: boolean
}

const MapCanvas = ({editingAllowed, ...props}: MapCanvasProps) => {
    const [fetchBuildingData, isLoading, loadingError]
        = useFetching(async (buildingID: number) => {
        const response = {data: new Building('Building')}
        setBuilding(response.data)
    })
    const [building, setBuilding] = useState<Building>()
    //TODO: This is a placeholder
    useEffect(() => {
        //fetchBuildingData(1)
        setBuilding(new Building('Building', [new Floor(0, placeholderData as any)]))
        console.log(building)
    }, [])

    //TODO: Remove placeholder data
    useEffect(() => {
        if (building)
            mapState.elements = building.floors[0].MapElements
    }, [building])

    const [mapState, dispatchStateChange] =
        //TODO: Remove placeholder data
        useReducer(mapReducer, {elements: [], selected: null, tool: new DragTool() as ITool, temporaryElement: null})
    const mapContext = useMemo(() => (mapState), [mapState])

    return (
        <MapContext.Provider value={mapContext}>
            <MapContextDispatch.Provider value={dispatchStateChange}>
                <div className={`${props.className} ${editingAllowed && 'flex flex-col'}`}>
                    {(editingAllowed) && <ToolSelector/>}
                    <MapSVG editingAllowed={editingAllowed!}>{(editingAllowed) && <MapElementProperties/>}</MapSVG>
                </div>
            </MapContextDispatch.Provider>
        </MapContext.Provider>
    );
};


export default MapCanvas;