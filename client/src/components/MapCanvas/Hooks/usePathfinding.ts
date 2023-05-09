import {BaseMapElement} from "../MapElements";
import {useMemo} from "react";

export const usePathfinding = (graph: BaseMapElement[], startNodeId: number, endNodeId: number) => {
    return useMemo(() => {
        if (startNodeId === 0 || endNodeId === 0)
            return []
        let track: { [index: string]: BaseMapElement } = {};
        let queue = []
        queue.push(startNodeId);
        while (queue.length !== 0) {
            const node = getElementById(queue.shift()!, graph);
            for (let i = 0; i < node.incidentNodes!.length; i++) {
                const nextNode = node.incidentNodes![i]
                if (!(nextNode in track)) {
                    track[nextNode.toString()] = node
                }
                queue.push(nextNode);
            }
            if (endNodeId in track) break;
        }
        let pathItem = getElementById(endNodeId, graph);
        let result = []
        while (pathItem.id !== startNodeId) {
            result.push(pathItem);
            pathItem = track[pathItem.id];
        }
        return result;
        //TODO: fix dependencies
    }, [startNodeId, endNodeId])
}
const getElementById = (id: number, graph: BaseMapElement[]) => {
    return graph.find(el => el.id === id) as BaseMapElement
}