import React, {createContext} from 'react';
import {IState, ITool} from "./Interfaces/Interfaces";

export const MapContext = createContext<IState>({
    elements: [],
    selected: null,
    tool: {} as ITool, //TODO REMOVE THIS
    temporaryElement: null
});
export const MapContextDispatch = createContext<React.Dispatch<any>>(null!);
