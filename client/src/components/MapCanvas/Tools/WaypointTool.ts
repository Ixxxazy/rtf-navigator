import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {Waypoint} from "../MapElements";
import PlaceIcon from "@mui/icons-material/Place";


export class WaypointTool implements ITool {
    name = 'Waypoint tool'
    icon = PlaceIcon

    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>) {
        dispatch({type: ActionType.Added, element: new Waypoint(coordinates)})
    }
}