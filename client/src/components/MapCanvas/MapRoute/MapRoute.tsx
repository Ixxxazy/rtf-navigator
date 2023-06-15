import React, {useContext} from 'react';
import {MapElementTypes} from "../MapElements";
import {getElementCenter} from "../Helpers/Helpers";
import {usePathfinding} from "../Hooks/usePathfinding";
import {MapContext} from "../MapContext";


const MapRoute = () => {
    const context = useContext(MapContext)
    let route = usePathfinding(context.elements, context.route)
    if (route) {
        route = route.filter(el => el.type !== MapElementTypes.Room)
        const d = `M ${route.map(routeEl => getElementCenter(routeEl.coordinates)).map(p => p.x + ',' + p.y).join(' L ')}`
        return (
            <path d={d} stroke='blue' strokeWidth={10} fill='none'/>
        );
    }
    return null
};

export default MapRoute;