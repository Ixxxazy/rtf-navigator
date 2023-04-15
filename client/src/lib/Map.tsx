class MapCanvas {
    container: any;
    constructor(_container: any) {
        this.container = _container;
    }
    drawLine(vector: Vector) {
        let node = document.createElement('line');
        node.setAttribute('x1', `${vector.Point1.x}`)
        node.setAttribute('x2', `${vector.Point2.x}`)
        node.setAttribute('y1', `${vector.Point1.y}`)
        node.setAttribute('y2', `${vector.Point2.y}`)
        node.setAttribute('stroke', `black`)
        this.container.appendChild(node);
    }
}
class Point {
    x : number;
    y : number;
    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
}
class Vector {
    Point1 : Point;
    Point2: Point;
    constructor(p1: Point, p2: Point) {
        this.Point1 = p1;
        this.Point2 = p2;
    }
}
export {MapCanvas}