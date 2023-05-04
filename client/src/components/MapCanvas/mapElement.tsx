import React, {useCallback, useContext} from "react";
import {BaseMapElement, MapElementTypes} from "./MapElements";
import {MapContextDispatch} from "./MapContext";
import {IPoint} from "./Interfaces/Interfaces";
import {ActionType} from "./Reducers/MapReducer";

type ComponentProps = React.SVGProps<SVGPathElement> & {
    element: BaseMapElement
    mousePos?: IPoint
}

const MapElement = ({element, mousePos, ...props}: ComponentProps) => {
    const dispatch = useContext(MapContextDispatch)
    let d = ''
    let fill = mousePos ? 'gray' : 'none'
    if (element.type === MapElementTypes.Waypoint) {
        let coordinates = element.coordinates[0]
        d = `M ${coordinates.x - 10},${coordinates.y} a 10,10 0 1,1 20,0 a 10,10 0 1,1 -20,0`
    } else if (element.type === MapElementTypes.Node) {
        let coordinates = element.coordinates[0]
        d = `M ${coordinates.x},${coordinates.y} m 5,0 v 5 h -10 v -10 h 10 v 5`
    } else if (element.type === MapElementTypes.Geometry) {
        d = `M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')}${mousePos ? ` L ${mousePos.x},${mousePos.y}` : null}`
    } else if (element.type === MapElementTypes.Room) {
        d = `M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')}${mousePos ? ` L ${mousePos.x},${mousePos.y}` : null}`
    }
    const onPathMouseOver = useCallback(() => {
        dispatch({type: ActionType.Changed, element: {id: element.id, color: 'red'}})
    }, [element.id, dispatch]);
    const onPathMouseOut = useCallback(() => {
        dispatch({type: ActionType.Changed, element: {id: element.id, color: null}})
    }, [element.id, dispatch]);
    const onPathContextMenu = useCallback(() => {
        dispatch({type: ActionType.Selected, element: element})
    }, [element, dispatch]);
    return (<path data-id={element.id} d={d} fill={fill} fillOpacity="50%" {...props} stroke={element.color ?? props.stroke} onMouseOver={onPathMouseOver}
                  onMouseOut={onPathMouseOut} onContextMenu={onPathContextMenu}/>)
};
export default MapElement