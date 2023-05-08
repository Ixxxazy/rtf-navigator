import {IState, ITool} from "../Interfaces/Interfaces";
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {BaseMapElement, Geometry} from "../MapElements";
import RouteIcon from '@mui/icons-material/Route';
import {getElementCenter} from "../Helpers/Helpers";


export class LinkerTool implements ITool {
    name = 'Link tool'
    icon = RouteIcon

    handleClick() {
        //Only respond to clicks on elements
    }

    handleElementClick(clickedElement: BaseMapElement, context: IState, dispatch: Dispatch<any>) {
        if (context.temporaryElement && clickedElement.incidentNodes && context.selected && context.selected.incidentNodes &&
            clickedElement.incidentNodes.findIndex(el => el === context.selected!.id) === -1 &&
            context.selected.incidentNodes.findIndex(el => el === clickedElement.id) === -1) {
            dispatch({
                type: ActionType.Changed,
                element: {
                    id: context.selected.id,
                    incidentNodes: [...context.selected.incidentNodes, clickedElement.id]
                }
            })
            dispatch({
                type: ActionType.Changed, element: {
                    id: clickedElement.id,
                    incidentNodes: [...clickedElement.incidentNodes, context.selected.id]
                }
            })
            dispatch({type: ActionType.ChangedTemporaryElement, element: null})
        } else if (clickedElement.incidentNodes) {
            dispatch({type: ActionType.Selected, element: clickedElement})
            dispatch({
                type: ActionType.ChangedTemporaryElement,
                element: new Geometry([getElementCenter(clickedElement.coordinates)])
            })
        }
    }
}