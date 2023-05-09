import React from 'react';
import {BaseMapElement, MapElementTypes} from "../MapElements";
import {getElementCenter} from "../Helpers/Helpers";

type Props = {
    route: BaseMapElement[]
}
const MapRoute = ({route}: Props) => {
    route = route.filter(el => el.type !== MapElementTypes.Room)
    const d = `M ${route.map(routeEl => getElementCenter(routeEl.coordinates)).map(p => `${p.x},${p.y}`).join(' L ')}`
    return (
        <path d={d} stroke='blue' strokeWidth={5} fill='none'/>
    );
};

export default MapRoute;