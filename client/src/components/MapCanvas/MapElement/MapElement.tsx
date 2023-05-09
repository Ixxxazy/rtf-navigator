import React, {useCallback, useContext, useMemo} from "react";
import {BaseMapElement, MapElementTypes} from "../MapElements";
import {MapContext, MapContextDispatch} from "../MapContext";
import {IPoint} from "../Interfaces/Interfaces";
import {ActionType} from "../Reducers/MapReducer";
import MapText from "../MapText";
import {getElementCenter} from "../Helpers/Helpers";
import StairsIcon from "@mui/icons-material/Stairs";
import MapIcon from "../MapIcon";

type MapElementProps = React.SVGProps<SVGPathElement> & {
    element: BaseMapElement
    mousePos?: IPoint
}

const MapElement = ({element, mousePos, ...props}: MapElementProps) => {
    const context = useContext(MapContext)
    const dispatch = useContext(MapContextDispatch)
    let d = ''
    let fill = mousePos ? 'gray' : 'none'
    const elementCenter = useMemo(() => getElementCenter(element.coordinates), [element.coordinates])
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
            props.stroke = context.editingMode ? 'green' : 'grey'
            fill = context.editingMode ? 'green' : 'grey'
            const coordinates: IPoint = mousePos ? mousePos : element.coordinates[1]
            const dx = coordinates.x - element.coordinates[0].x
            const dy = coordinates.y - element.coordinates[0].y
            const sum = Math.abs(dx) + Math.abs(dy)
            d = context.editingMode ? `
            M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')} 
            ${mousePos ? ` L ${mousePos.x},${mousePos.y}` : ''}
            M ${element.coordinates[0].x},${element.coordinates[0].y} 
            l ${(10 * dy / sum)},${(-10 * dx / sum)}
            l ${dx},${dy}
            l ${(-20 * dy / sum)},${(20 * dx / sum)} 
            l ${-dx},${-dy}
            l ${(10 * dy / sum)},${(-10 * dx / sum)}`
                : `M ${element.coordinates[0].x},${element.coordinates[0].y} l ${dx},${dy}`
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
            d = `M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')}${mousePos ? ` L ${mousePos.x},${mousePos.y}` : ''}`
            break
        }
        case MapElementTypes.Staircase:
            fill = 'yellow'
            d = `M ${element.coordinates.map(p => `${p.x},${p.y}`).join(' L ')}${mousePos ? ` L ${mousePos.x},${mousePos.y}` : ''}`
            break
        default:
            throw Error(`Unknown element type ${element.type}`)
    }
    if (context.editingMode)
        return (
            <g>
                <path data-id={element.id} d={d} fill={fill} fillOpacity="50%" {...props}
                      stroke={element.color ?? (props.stroke ?? 'blue')}
                      onMouseOver={onPathMouseOver}
                      onMouseOut={onPathMouseOut} onContextMenu={onPathContextMenu} onClick={onPathClick}/>
                {element.name &&
                    <MapText elementCoordinates={elementCenter} text={element.name}/>
                }
                {element.type === MapElementTypes.Staircase &&
                    <MapIcon elementCoordinates={elementCenter}><StairsIcon
                        className={'text-black'}/></MapIcon>
                }
                {element.incidentNodes && element.id === context.selected?.id &&
                    element.incidentNodes.map(node =>
                        <IncidentNode key={node + element.id}
                                      stroke={'orange'}
                                      strokeWidth={1.5}
                                      elementCenter={elementCenter}
                                      incidentNode={context.elements.find(el => el.id === node)!}/>)
                }
            </g>
        )
    if (element.type === MapElementTypes.Room)
        return (
            <g>
                <path data-id={element.id} d={d} fill={fill} fillOpacity="50%" {...props}
                      stroke={element.color ?? props.stroke}
                      onMouseOver={onPathMouseOver}
                      onMouseOut={onPathMouseOut} onContextMenu={onPathContextMenu} onClick={onPathClick}/>
                {element.name &&
                    <MapText elementCoordinates={elementCenter} text={element.name}/>
                }
            </g>
        )
    if (element.type !== MapElementTypes.Node && element.type !== MapElementTypes.Waypoint)
        return (
            <g>
                <path data-id={element.id} d={d} fill={fill} fillOpacity="50%" {...props}
                      stroke={element.color ?? props.stroke}/>
                {element.type === MapElementTypes.Staircase &&
                    <MapIcon elementCoordinates={elementCenter}><StairsIcon
                        className={'text-black'}/></MapIcon>
                }
            </g>
        )
    return null
};
type IncidentNodeProps = React.SVGProps<SVGPathElement> & {
    incidentNode: BaseMapElement,
    elementCenter: IPoint
}
const IncidentNode = ({incidentNode, elementCenter, ...props}: IncidentNodeProps) => {
    const nodeCenter = useMemo(() => getElementCenter(incidentNode.coordinates), [incidentNode.coordinates])
    return (
        <path d={`M ${elementCenter.x},${elementCenter.y} L ${nodeCenter.x},${nodeCenter.y}`} {...props} />
    )
}

export default MapElement