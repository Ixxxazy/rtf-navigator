import {useMemo} from "react";
import {BaseMapElement} from "./MapElements";

export const useMapElements = (elements: BaseMapElement[]) => {
    return useMemo(() => { return elements }, [elements]);
}

