import React, {createContext} from 'react';
import {IState, ITool} from "./Interfaces/Interfaces";

export const MapContext = createContext<IState>({
    elements: [],
    selected: null,
    tool: {} as ITool,
    temporaryElement: null,
    editingMode: false
});
export const MapContextDispatch = createContext<React.Dispatch<any>>(null!);
