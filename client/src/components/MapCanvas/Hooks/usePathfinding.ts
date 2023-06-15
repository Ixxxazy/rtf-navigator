import {BaseMapElement} from "../MapElements";
import {useMemo} from "react";

export const usePathfinding = (graph: BaseMapElement[], route: {start: number, end: number} | null) => {
    return useMemo(() => {
        if (!route)
            return null
        let track: { [index: string]: BaseMapElement } = {};
        let queue = []
        queue.push(route.start);
        while (queue.length !== 0) {
            const node = getElementById(queue.shift()!, graph);
            if (node === undefined) throw new Error('Node not found!')
            for (const element of node.incidentNodes!) {
                const nextNode = element
                if (!(nextNode in track)) {
                    track[nextNode.toString()] = node
                }
                queue.push(nextNode);
            }
            if (route.end in track) break;
        }
        let pathItem = getElementById(route.end, graph);
        let result = []
        while (pathItem.id !== route?.start) {
            result.push(pathItem);
            pathItem = track[pathItem.id];
        }
        return result;
        //TODO: fix dependencies
    }, [route])
}
const getElementById = (id: number, graph: BaseMapElement[]) => {
    return graph.find(el => el.id === id) as BaseMapElement
}