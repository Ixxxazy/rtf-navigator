import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {Node} from "../MapElements";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";


export class DoorTool implements ITool {
    name = 'Door tool'
    icon = MeetingRoomIcon

    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>) {
        dispatch({type: ActionType.Added, element: new Node(coordinates)})
    }
}