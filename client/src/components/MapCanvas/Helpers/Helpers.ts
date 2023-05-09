import {IPoint} from "../Interfaces/Interfaces";
import {BaseMapElement} from "../MapElements";

export const snapTo = (x: number, y: number, s: number) => {
    return ({x: Math.round(x / s) * s, y: Math.round(y / s) * s});
}
export const deleteFromSet = (set: Set<any>, element: any) => {
    let newSet = new Set(set)
    newSet.delete(element)
    return newSet
}
export const shallowEqual = (obj1: any, obj2: any) => {
    return Object.keys(obj1).length === Object.keys(obj2).length &&
        Object.keys(obj1).every(key =>
            obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
        );
}
export const getElementCenter = (coordinates: IPoint[]): IPoint => {
    let max: IPoint = {x: Number.MIN_SAFE_INTEGER, y: Number.MIN_SAFE_INTEGER}
    let min: IPoint = {x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER}
    for (const el of coordinates) {
        max = {x: Math.max(el.x, max.x), y: Math.max(el.y, max.y)}
        min = {x: Math.min(el.x, min.x), y: Math.min(el.y, min.y)}
    }
    return {x: (max.x + min.x) / 2, y: (max.y + min.y) / 2}
}