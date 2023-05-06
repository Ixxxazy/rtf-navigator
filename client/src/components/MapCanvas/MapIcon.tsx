import React from 'react';
import {IPoint} from "./Interfaces/Interfaces";
type Props = {
    elementCoordinates: IPoint, children: React.ReactNode
}
const MapText = ({elementCoordinates, children}: Props) => {

        return (
            <foreignObject alignmentBaseline='middle' x={elementCoordinates.x - 12} y={elementCoordinates.y - 12} width={24} height={24} pointerEvents='none'>
                {children}
            </foreignObject>);
    }
;

export default MapText;