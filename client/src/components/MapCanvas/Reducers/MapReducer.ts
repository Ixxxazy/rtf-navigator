import {IState, ITool} from "../Interfaces/Interfaces";
import {BaseMapElement} from "../MapElements";

type Action = {
    type: ActionType,
    element?: BaseMapElement,
    tool?: ITool
}

export enum ActionType {
    Added = 'ADDED',
    Changed = 'CHANGED',
    Deleted = 'DELETED',
    Selected = 'SELECTED',
    SelectedTool = 'SELECTED_TOOL',
    ChangedTemporaryElement = 'CHANGED_TMP'
}

export default function mapReducer(mapState: IState, action: Action): IState {
    if (action.tool && action.type === ActionType.SelectedTool)
        return {...mapState, tool: action.tool}
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
                        return (el.id === action.element!.id) ? {...el, ...action.element} : el;
                    })
                }
            }
            case ActionType.Deleted: {
                const element = mapState.elements.find(el => el.id === action.element!.id)
                if (element?.incidentNodes !== undefined && element.incidentNodes.length > 0) {
                    return {
                        ...mapState,
                        elements: mapState.elements.map(el => {
                            if (el.incidentNodes !== undefined && el.incidentNodes.length > 0) {
                                return {...el, incidentNodes: el.incidentNodes.filter(el => el === element.id)}
                            }
                            return el
                        }).filter((el) => el.id !== action.element!.id),
                        selected: action.element.id === mapState.selected?.id ? null : action.element
                    }
                }
                return {
                    ...mapState,
                    elements: mapState.elements.filter((el) => el.id !== action.element!.id),
                    selected: action.element.id === mapState.selected?.id ? null : action.element
                }
            }
            case ActionType.Selected: {
                const selectedElement = mapState.elements.find(el => el.id === action.element!.id)
                if (selectedElement !== undefined)
                    return {...mapState, selected: selectedElement}
                throw Error(`Element ${action.element.id} not found!`)
            }
            case ActionType.ChangedTemporaryElement:
                return {...mapState, temporaryElement: action.element}
        }
    }
    throw Error('Unknown action: ' + action.type);
}
