import {IState, ITool} from "../Interfaces/Interfaces";
import {BaseMapElement} from "../MapElements";

type Action = {
    type: ActionType,
    element?: BaseMapElement,
    route?: {start: number, end: number} | null,
    tool?: ITool
}

export enum ActionType {
    Added = 'ADDED',
    Changed = 'CHANGED',
    Deleted = 'DELETED',
    Selected = 'SELECTED',
    SelectedTool = 'SELECTED_TOOL',
    RouteSet = 'ROUTE_SET',
    ChangedTemporaryElement = 'CHANGED_TMP'
}

export default function mapReducer(mapState: IState, action: Action): IState {
    if (action.tool && action.type === ActionType.SelectedTool)
        return {...mapState, tool: action.tool}
    if (action.route !== undefined && action.type === ActionType.RouteSet)
        return {...mapState, route: action.route}
    else if (action.element !== undefined) {
        switch (action.type) {
            case ActionType.Added: {
                return {...mapState, elements: [...mapState.elements, action.element]};
            }
            case ActionType.Changed: {
                return {
                    ...mapState,
                    selected: action.element.id === mapState.selected?.id ? {...mapState.selected, ...action.element} : mapState.selected,
                    elements: mapState.elements.map((el) => {
                        return el.id === action.element!.id ? {...el, ...action.element} : el;
                    })
                }
            }
            case ActionType.Deleted: {
                const element = mapState.elements.find(el => el.id === action.element!.id)
                let elements = mapState.elements
                if (element?.incidentNodes !== undefined && element.incidentNodes.length > 0) {
                    elements = elements.map(el => {
                        return el.incidentNodes && el.incidentNodes.length > 0 ? {
                            ...el,
                            incidentNodes: el.incidentNodes.filter(el => el !== element.id)
                        } : el
                    })
                }
                return {
                    ...mapState,
                    elements: elements.filter((el) => el.id !== action.element!.id),
                    selected: action.element.id === mapState.selected?.id ? null : action.element
                }
            }
            case ActionType.Selected: {
                const selectedElement = mapState.elements.find(el => el.id === action.element!.id)
                if (selectedElement)
                    return {...mapState, selected: selectedElement}
                throw Error(`Element ${action.element.id} not found!`)
            }
            case ActionType.ChangedTemporaryElement:
                return {...mapState, temporaryElement: action.element}
        }
    }
    throw Error('Unknown action: ' + action.type);
}
