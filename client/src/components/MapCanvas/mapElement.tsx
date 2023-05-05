import React, {useCallback, useContext} from "react";
import {BaseMapElement, MapElementTypes} from "./MapElements";
import {MapContext, MapContextDispatch} from "./MapContext";
import {IPoint} from "./Interfaces/Interfaces";
import {ActionType} from "./Reducers/MapReducer";

type ComponentProps = React.SVGProps<SVGPathElement> & {
    element: BaseMapElement
    mousePos?: IPoint
}

const MapElement = ({element, mousePos, ...props}: ComponentProps) => {
    const context = useContext(MapContext)
    const dispatch = useContext(MapContextDispatch)
    let d = ''
    let fill = mousePos ? 'gray' : 'none'
    const onPathMouseOver = useCallback(() => {
        dispatch({type: ActionType.Changed, element: {id: element.id, color: 'red'}})
    }, [element.id, dispatch]);
    const onPathMouseOut = useCallback(() => {
        dispatch({type: ActionType.Changed, element: {id: element.id, color: null}})
    }, [element.id, dispatch]);
    const onPathContextMenu = useCallback(() => {
        dispatch({type: ActionType.Selected, element: element})
    }, [element, dispatch]);
    const onPathClick = useCallback(() => {
        if (context.tool.handleElementClick)
            context.tool.handleElementClick(element, context, dispatch) 
    }, [context, dispatch, element]);
    switch (element.type) {
        case MapElementTypes.Door:
            props.stroke = 'green'
            fill = 'green'
            const coordinates: IPoint = mousePos ? mousePos : element.coordinates[1]
            const dx = coordinates.x - element.coordinates[0].x
            const dy = coordinates.y - element.coordinates[0].y
            const sum = Math.abs(dx) + Math.abs(dy)
            d = `
            M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')} 
            ${mousePos ? ` L ${mousePos.x},${mousePos.y}` : ''}
            M ${element.coordinates[0].x},${element.coordinates[0].y} 
            l ${(10 * dy/sum)},${(-10 * dx/sum)}
            l ${dx},${dy}
            l ${(-20 * dy/sum)},${(20 * dx/sum)} 
            l ${-dx},${-dy}
            l ${(10 * dy/sum)},${(-10 * dx/sum)}`
            break
        case MapElementTypes.Geometry: {
            d = `M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')}${mousePos ? ` L ${mousePos.x},${mousePos.y}` : ''}`
            break
        }
        case MapElementTypes.Node: {
            fill = 'red'
            let coordinates = element.coordinates[0]
            d = `M ${coordinates.x},${coordinates.y} m 5,0 v 5 h -10 v -10 h 10 v 5`
            break
        }
        case MapElementTypes.Waypoint: {
            fill = 'orange'
            let coordinates = element.coordinates[0]
            d = `M ${coordinates.x - 10},${coordinates.y} a 10,10 0 1,1 20,0 a 10,10 0 1,1 -20,0`
            break
        }
        case MapElementTypes.Room: {
            fill = 'blue'
            d = `M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')}${mousePos ? ` L ${mousePos.x},${mousePos.y}` : null}`
            break
        }
        case MapElementTypes.Staircase:
            fill = 'yellow'
            d = `M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')}${mousePos ? ` L ${mousePos.x},${mousePos.y}` : null}`
            break
        default:
            throw Error(`Unknown element type ${element.type}`)
    }
    return (
        <path data-id={element.id} d={d} fill={fill} fillOpacity="50%" {...props} stroke={element.color ?? props.stroke}
              onMouseOver={onPathMouseOver}
              onMouseOut={onPathMouseOut} onContextMenu={onPathContextMenu} onClick={onPathClick}/>)
};
export default MapElement