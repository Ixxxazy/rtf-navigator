import {IPoint} from "../Interfaces/Interfaces";

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
    let maxX = Number.MIN_SAFE_INTEGER
    let maxY = Number.MIN_SAFE_INTEGER
    let minX = Number.MAX_SAFE_INTEGER
    let minY = Number.MAX_SAFE_INTEGER
    for (const el of coordinates) {
        maxX = Math.max(el.x, maxX)
        maxY = Math.max(el.y, maxY)
        minX = Math.min(el.x, minX)
        minY = Math.min(el.y, minY)
    }
    return {x: (maxX + minX) / 2, y: (maxY + minY) / 2}
}