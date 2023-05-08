import {IPoint} from "../Interfaces/Interfaces";

export const snapTo = (x: number, y: number, s: number) => {
    return ({x: Math.round(x / s) * s, y: Math.round(y / s) * s});
}
export const deleteFromSet = (set: Set<any>, element: any) =>
{
    let newSet = new Set(set)
    newSet.delete(element)
    return newSet
}
export const shallowEqual = (obj1: any, obj2: any) =>
{
    return Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key =>
        obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    );
}
export const getElementCenter = (coordinates: IPoint[]): IPoint => {
    let x = 0
    let y = 0
    let n = coordinates.length
    if (coordinates.length > 1 && shallowEqual(coordinates[0], coordinates.at(-1)))
        n -= 1
    for (let i = 0; i < n ; i++) {
        x += coordinates[i].x
        y += coordinates[i].y
    }
    return {x: x / n, y: y / n}
}