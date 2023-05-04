import {IPoint, IState, ITool} from "../Interfaces/Interfaces";
import {Dispatch} from "react";
import {ActionType} from "../Reducers/MapReducer";
import {Node} from "../MapElements";
import HubIcon from "@mui/icons-material/Hub";


export class NodeTool implements ITool {
    name = 'Node tool'
    icon = HubIcon

    handleClick(coordinates: IPoint, context: IState, dispatch: Dispatch<any>) {
        dispatch({type: ActionType.Added, element: new Node(coordinates)})
    }
}