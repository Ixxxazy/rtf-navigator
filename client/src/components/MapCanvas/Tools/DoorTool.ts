import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {Door} from "../MapElements";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import {shallowEqual} from "../Helpers/Helpers";


export class DoorTool implements ITool {
    name = 'Door tool'
    icon = MeetingRoomIcon

    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>) {
        if (context.temporaryElement === null)
            dispatch({type: ActionType.ChangedTemporaryElement, element: new Door([coordinates])})
        else if (!shallowEqual(coordinates, context.temporaryElement.coordinates[0])) {
            dispatch({
                type: ActionType.Added,
                element: new Door([...context.temporaryElement.coordinates, coordinates])
            })
            dispatch({type: ActionType.ChangedTemporaryElement, element: null})
        }
    }
}