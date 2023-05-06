import React from 'react';
import {IPoint} from "./Interfaces/Interfaces";
type Props = {
    elementCoordinates: IPoint, text: string
}
const MapText = ({elementCoordinates, text}: Props) => {

return (
    <text x={elementCoordinates.x} y={elementCoordinates.y} style={{textAnchor: 'middle', dominantBaseline: 'middle'}} pointerEvents='none'>
        {text}
    </text>);
}
;

export default MapText;