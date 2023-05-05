import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import React, {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {BaseMapElement, Geometry} from "../MapElements";
import RouteIcon from '@mui/icons-material/Route';
import {shallowCompare} from "../Helpers/Helpers";


export class LinkerTool implements ITool {
    name = 'Link tool'
    icon = RouteIcon

    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>, clickedElement?: BaseMapElement) {

    }

    handleElementClick(clickedElement: BaseMapElement, context: any, dispatch: Dispatch<any>) {
        if (context.temporaryElement && context.selected) {
            if (clickedElement.incidentNodes !== undefined) {
                dispatch({type: ActionType.Changed,
                    element: {
                        id: context.selected.id,
                        incidentNodes: new Set(context.selected.incidentNodes).add(clickedElement.id)
                    }
                })
                dispatch({type: ActionType.Changed, element: {
                        id: clickedElement.id,
                        incidentNodes: new Set(clickedElement.incidentNodes).add(context.selected.id)
                    }})
                dispatch({type: ActionType.ChangedTemporaryElement, element: null})
            }
        } else if (clickedElement.incidentNodes !== undefined) {
            dispatch({type: ActionType.Selected, element: clickedElement})
            dispatch({type: ActionType.ChangedTemporaryElement, element: new Geometry(clickedElement.coordinates)})
        }
    }
}