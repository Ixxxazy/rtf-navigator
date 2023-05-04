import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {Geometry} from "../MapElements";
import RouteIcon from '@mui/icons-material/Route';
import {shallowCompare} from "../Helpers/Helpers";


export class LinkerTool implements ITool {
    name = 'Link tool'
    icon = RouteIcon

    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>) {
        let element = context.elements.find(el => shallowCompare(el.coordinates[0], coordinates) && (el.incidentNodes !== undefined))
        if (element) {
            let node1 = element
            let node2 = context.selected
            if (node1.incidentNodes !== undefined && node2?.incidentNodes !== undefined && context.temporaryElement !== null) {
                node1 = {...node1, incidentNodes: new Set(node1.incidentNodes).add(node2.id)}
                node2 = {...node2, incidentNodes: new Set(node2.incidentNodes).add(node1.id)}
                dispatch({type: ActionType.Changed, element: node1})
                dispatch({type: ActionType.Changed, element: node2})
                dispatch({type: ActionType.ChangedTemporaryElement, element: null})
            } else {
                dispatch({type: ActionType.Selected, element: element})
                dispatch({type: ActionType.ChangedTemporaryElement, element: new Geometry([coordinates])})
            }
        }
    }
}