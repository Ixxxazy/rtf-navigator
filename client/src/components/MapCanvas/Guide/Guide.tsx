import React from 'react';
import {IGuide} from "../Interfaces/Interfaces";

type Props = {
    guide: IGuide
}
const Guide = ({guide}: Props) => {
    if (guide.path !== '')
        return (
            <image href={guide.path} width={guide.width} x={guide.x} y={guide.y} pointerEvents='none'/>
        );
    return null;
};

export default Guide;