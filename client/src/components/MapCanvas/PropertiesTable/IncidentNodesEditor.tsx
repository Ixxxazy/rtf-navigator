import React, {useContext} from 'react';
import {BaseMapElement} from "../MapElements";
import {MapContext, MapContextDispatch} from "../MapContext";
import PropertyItem from "./PropertyItem";
import {ActionType} from "../Reducers/MapReducer";
import {deleteFromSet} from "../Helpers/Helpers";

const IncidentNodesEditor = () => {
    const elements = useContext(MapContext).elements
    const element = useContext(MapContext).selected as BaseMapElement
    const dispatch = useContext(MapContextDispatch)

    const unlinkNodes = (node1id: number, node2id: number) =>
    {
        let node1 = elements.find(el => el.id === node1id)
        let node2 = elements.find(el => el.id === node2id)
        if (node1?.incidentNodes !== undefined && node2?.incidentNodes !== undefined)
        {
            dispatch({
                type: ActionType.Changed,
                element: {id: node1id, incidentNodes: deleteFromSet(node1.incidentNodes, node2id)}
            })
            dispatch({
                type: ActionType.Changed,
                element: {id: node2id, incidentNodes: deleteFromSet(node2.incidentNodes, node1id)}
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