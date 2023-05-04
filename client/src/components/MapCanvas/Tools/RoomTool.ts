import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {Geometry, Room} from "../MapElements";
import {shallowCompare} from "../Helpers/Helpers";
import ChairAltIcon from "@mui/icons-material/ChairAlt";


export class RoomTool implements ITool {
    name = 'Room tool'
    icon = ChairAltIcon

    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>) {
        if (context.temporaryElement === null)
            dispatch({type: ActionType.ChangedTemporaryElement, element: new Geometry([coordinates])})
        else if (shallowCompare(coordinates, context.temporaryElement.coordinates[0])) {
            dispatch({
                type: ActionType.Added,
                element: new Room(context.temporaryElement.coordinates)
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