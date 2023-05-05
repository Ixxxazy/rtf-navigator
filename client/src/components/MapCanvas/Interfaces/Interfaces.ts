import {BaseMapElement} from "../MapElements";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import {Dispatch} from "react";

export interface IState {
    elements: BaseMapElement[],
    selected: BaseMapElement | null,
    temporaryElement: BaseMapElement | null
    tool: ITool,
}
export interface IPoint {
    x: number; y: number
}
export interface IViewBox {
    x: number, y: number, width: number, height: number
}
export interface ITool {
    name: string,
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string },
    handleClick: (coordinates: IPoint, context: any, dispatch: Dispatch<any>) => void
    handleElementClick?: (clickedElement: BaseMapElement, context: any, dispatch: Dispatch<any>) => void;
}