import React, {useContext} from 'react';
import {BaseMapElement} from "../MapElements";
import {MapContext, MapContextDispatch} from "../MapContext";
import PropertyItem from "./PropertyItem";
import {ActionType} from "../Reducers/MapReducer";

const IncidentNodesEditor = () => {
    const elements = useContext(MapContext).elements
    const element = useContext(MapContext).selected as BaseMapElement
    const dispatch = useContext(MapContextDispatch)

    const unlinkNodes = (node1id: number, node2id: number) =>
    {
        const node1 = elements.find(el => el.id === node1id)
        const node2 = elements.find(el => el.id === node2id)
        if (node1?.incidentNodes && node2?.incidentNodes)
        {
            dispatch({
                type: ActionType.Changed,
                element: {id: node1.id, incidentNodes: node1.incidentNodes.filter(el => el !== node2.id)}
            })
            dispatch({
                type: ActionType.Changed,
                element: {id: node2.id, incidentNodes: node2.incidentNodes.filter(el => el !== node1.id)}
            })
        }
    }
    return (
        <PropertyItem name='Incident nodes'>
            {element.incidentNodes !== undefined &&
                Array.from(element.incidentNodes).map((incidentNode) => (
                <div key={incidentNode}>
                    {incidentNode}
                    <button onClick={() => unlinkNodes(incidentNode, element.id)}>-</button>
                </div>
            ))}
        </PropertyItem>
    );
}

export default IncidentNodesEditor;