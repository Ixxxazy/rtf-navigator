import {BaseMapElement} from "../MapElements";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import {Dispatch} from "react";

export interface IState {
    elements: BaseMapElement[],
    selected: BaseMapElement | null,
    temporaryElement: BaseMapElement | null
    tool: ITool,
    route: {start: number, end: number} | null,
    editingMode: boolean
}
export interface IPoint {
    x: number; y: number
}
export interface IViewBox {
    x: number, y: number, width: number, height: number
}
export interface ITool {
    handleClick: (coordinates: IPoint, context: any, dispatch: Dispatch<any>) => void,
    handleElementClick?: (clickedElement: BaseMapElement, context: any, dispatch: Dispatch<any>) => void,
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
    name: string;
}

export interface IGuide {
    path: string,
    x: number,
    y: number,
    width: number
}