import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import StairsIcon from '@mui/icons-material/Stairs';
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {Geometry, Staircase} from "../MapElements";
import {shallowCompare} from "../Helpers/Helpers";


export class StaircaseTool implements ITool {
    name = 'Staircase tool'
    icon = StairsIcon

    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>) {
        if (context.temporaryElement === null)
            dispatch({type: ActionType.ChangedTemporaryElement, element: new Geometry([coordinates])})
        else if (shallowCompare(coordinates, context.temporaryElement.coordinates[0])) {
            dispatch({
                type: ActionType.Added,
                element: new Staircase(context.temporaryElement.coordinates)
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