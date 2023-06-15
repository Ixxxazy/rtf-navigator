import {BaseMapElement, MapElementTypes} from "../MapElements";
import {CircleOutlined, MeetingRoom, Room, TurnLeft, TurnRight} from "@mui/icons-material";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import {getElementCenter} from "../Helpers/Helpers";
import {IPoint} from "../Interfaces/Interfaces";

enum Direction {
    FORWARD,
    LEFT,
    RIGHT
}

export const useMapNavigation = (route: BaseMapElement[]) => {
    let navigationEntries: {
        id: string
        text: string,
        icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
    }[] = []
    let lineLength: number = 0
    for (let i = 0; i < route.length; i++) {
        const id = crypto.randomUUID()
        let message = ''
        let icon = CircleOutlined
        let direction = Direction.FORWARD
        if (i > 0 && i < route.length - 1) {
            if ([MapElementTypes.Door, MapElementTypes.Node, MapElementTypes.Waypoint].includes(route[i - 1].type) && //Prev node is Door/Node/Waypoint
                [MapElementTypes.Door, MapElementTypes.Node, MapElementTypes.Waypoint].includes(route[i + 1].type) && //Next node is Door/Node/Waypoint
                [MapElementTypes.Node, MapElementTypes.Waypoint].includes(route[i].type)) {  //Don't compute for rooms and doors
                const angle = getAngle(getElementCenter(route[i - 1].coordinates), getElementCenter(route[i].coordinates), getElementCenter(route[i + 1].coordinates))
                if (angle < 180) direction = Direction.LEFT
                else if (angle > 180) direction = Direction.RIGHT
                lineLength += getDistance(getElementCenter(route[i - 1].coordinates), getElementCenter(route[i].coordinates))
            }
        }
        if (route[i].type === MapElementTypes.Node) {
            if (direction === Direction.FORWARD)
                continue
            if (route[i + 1].type === MapElementTypes.Door) {
                message = `зайдите в двери`
                if (direction === Direction.RIGHT)
                    message += ' справа '
                else message += ' слева '
                message += 'через ' + lineLength + ' метров'
                icon = MeetingRoom
            }
            if ([MapElementTypes.Node, MapElementTypes.Waypoint].includes(route[i + 1].type)) {
                if (lineLength > 5)
                {
                    message = 'через ' + lineLength
                    if ((lineLength >= 5 && lineLength <= 20) || lineLength % 10 >= 5) message += ' метров '
                    else if (lineLength % 10 === 1) message +=  ' метр '
                    else message +=  ' метра '
                }
                message += 'поверните '
                if (direction === Direction.RIGHT) {
                    message += 'направо'
                    icon = TurnRight
                } else {
                    message += 'налево'
                    icon = TurnLeft
                }
            }
        } else if (route[i].type === MapElementTypes.Door) {
            if (lineLength > 0)
                message = 'дверь прямо по курсу через ' + lineLength + ' метров'
            continue
        }
        else if (route[i].type === MapElementTypes.Room) {
            message = route[i].name ?? 'Комната'
            icon = Room
        }
        if (direction !== Direction.FORWARD) lineLength = 0
        message = message.charAt(0).toUpperCase() + message.slice(1)
        navigationEntries.push({
            id: id,
            icon: icon,
            text: `${message}`
        })
    }
    return navigationEntries;
}

/** Returns distance between points in units */
const getDistance = (point1: IPoint, point2: IPoint) => {
    //1m is approx. 100/3 (33.3) units
    return Math.sqrt(((point1.x - point2.x) ** 2) + ((point1.y - point2.y) ** 2)) / (100 / 3)
}

const getAngle = (point1: IPoint, point2: IPoint, point3: IPoint) => {
    //ugly
    const vector1: IPoint = {x: point1.x - point2.x, y: point1.y - point2.y}
    const vector2: IPoint = {x: point3.x - point2.x, y: point3.y - point2.y}
    let angle = Math.atan2(vector2.y, vector2.x) - Math.atan2(vector1.y, vector1.x);
    if (angle < 0) {
        angle += 2 * Math.PI;
    }
    return angle * 180 / Math.PI
}