import {IPoint} from "./Interfaces/Interfaces";

export enum MapElementTypes {
    Node = 'Node',
    Waypoint = 'Waypoint',
    Geometry = 'Geometry',
    Room = 'Room',
    Door = 'Door',
    Staircase = 'Staircase'
}

export class BaseMapElement {
    id: number
    coordinates: IPoint[]
    type: MapElementTypes
    incidentNodes?: Set<number>
    name?: string
    doors?: Set<number>
    staircaseGroup?: number
    color?: string

    constructor(type: MapElementTypes, coordinates: IPoint[]) {
        this.coordinates = coordinates
        this.id = Date.now()
        this.type = type
    }
}

export class Geometry extends BaseMapElement {
    constructor(coordinates: IPoint[]) {
        super(MapElementTypes.Geometry, coordinates)
    }
}

export class Node extends BaseMapElement {
    constructor(coordinates: IPoint, incidentNodes?: number[]) {
        super(MapElementTypes.Node, [coordinates]);
        this.incidentNodes = new Set<number>(incidentNodes)
    }
}

export class Waypoint extends Node {
    constructor(coordinates: IPoint, name?: string, incidentNodes?: number[]) {
        super(coordinates, incidentNodes);
        this.name = name ? name : ''
        this.type = MapElementTypes.Waypoint
    }
}

export class Door extends BaseMapElement {
    constructor(coordinates: IPoint[], incidentNodes?: number[]) {
        super(MapElementTypes.Door, coordinates);
        this.incidentNodes = new Set<number>(incidentNodes)
    }
}

export class Staircase extends BaseMapElement {
    constructor(coordinates: IPoint[], name?: string, incidentNodes?: number[]) {
        super(MapElementTypes.Staircase, coordinates);
        this.staircaseGroup = 0
        this.incidentNodes = new Set<number>(incidentNodes)
    }
}

export class Room extends BaseMapElement {
    constructor(coordinates: IPoint[], name?: string, doors?: number[]) {
        super(MapElementTypes.Room, coordinates);
        this.name = name ? name : ''
        this.doors = new Set<number>(doors)
    }
}


export class Brush {
    name: string
    icon?: any

    constructor(name: string, icon: any) {
        this.name = name
        this.icon = icon
    }
}

export class Building {
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _name: string
    id: number
    floors: Floor[]

    constructor(name: string) {
        this._name = name
        this.id = Date.now()
        this.floors = []
    }

}

export class Floor {
    get floorNumber(): number {
        return this._floorNumber;
    }

    set floorNumber(value: number) {
        this._floorNumber = value;
    }

    private _floorNumber: number
    id: number
    MapElements: BaseMapElement[]

    constructor() {
        this.id = Date.now()
        this.MapElements = []
        this._floorNumber = NaN
    }
}