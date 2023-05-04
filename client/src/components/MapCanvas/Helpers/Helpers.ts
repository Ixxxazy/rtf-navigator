export const snapTo = (x: number, y: number, s: number) => {
    return ({x: Math.round(x / s) * s, y: Math.round(y / s) * s});
}
export const deleteFromSet = (set: Set<any>, element: any) =>
{
    let newSet = new Set(set)
    newSet.delete(element)
    return newSet
}
export const shallowCompare = (obj1: any, obj2: any) =>
{
    return Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key =>
        obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    );
}
