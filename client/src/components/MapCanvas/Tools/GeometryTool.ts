import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {Geometry} from "../MapElements";
import {shallowEqual} from "../Helpers/Helpers";
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';

export class GeometryTool implements ITool {
    name = 'Geometry tool'
    icon = PentagonOutlinedIcon
    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>) {
        if (context.temporaryElement === null)
            dispatch({type: ActionType.ChangedTemporaryElement, element: new Geometry([coordinates])})
        else if (shallowEqual(coordinates, context.temporaryElement.coordinates.at(-1))) {
            dispatch({
                type: ActionType.Added,
                element: new Geometry(context.temporaryElement.coordinates)
            })
            dispatch({type: ActionType.ChangedTemporaryElement, element: null})
        } else {
            dispatch({
                type: ActionType.ChangedTemporaryElement,
                element: {
                    ...context.temporaryElement,
                    coordinates: [...context.temporaryElement.coordinates, coordinates]
                }
            })
        }
    }
}