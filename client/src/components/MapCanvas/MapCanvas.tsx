import React, {useMemo, useReducer} from 'react';
import MapElementProperties from "./PropertiesTable/MapElementProperties";
import mapReducer from "./Reducers/MapReducer";
import {MapContext, MapContextDispatch} from "./MapContext";
import MapSVG from "./MapSVG/MapSVG";
import ToolSelector from "./ToolSelector/ToolSelector";
import {ITool} from "./Interfaces/Interfaces";
import {DragTool} from "./Tools";

type MapCanvasProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    editingAllowed?: boolean
}

const MapCanvas = ({editingAllowed, ...props}: MapCanvasProps) => {
    const [mapState, dispatchStateChange] =
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