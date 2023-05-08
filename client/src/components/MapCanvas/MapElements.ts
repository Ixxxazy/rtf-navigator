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
    incidentNodes?: number[]
    name?: string
    description?: string
    workingHours?: string
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
        this.incidentNodes = incidentNodes ?? []
    }
}

export class Waypoint extends Node {
    constructor(coordinates: IPoint, name?: string, incidentNodes?: number[]) {
        super(coordinates, incidentNodes);
        this.name = name ? name : ''
        this.type = MapElementTypes.Waypoint
        this.description = ''
        this.workingHours = ''
    }
}

export class Door extends BaseMapElement {
    constructor(coordinates: IPoint[], incidentNodes?: number[]) {
        super(MapElementTypes.Door, coordinates);
        this.incidentNodes = incidentNodes ?? []
    }
}

export class Staircase extends BaseMapElement {
    constructor(coordinates: IPoint[], name?: string, incidentNodes?: number[]) {
        super(MapElementTypes.Staircase, coordinates);
        this.staircaseGroup = 0
        this.incidentNodes = incidentNodes ?? []
    }
}

export class Room extends BaseMapElement {
    constructor(coordinates: IPoint[], name?: string, incidentNodes?: number[]) {
        super(MapElementTypes.Room, coordinates);
        this.name = name ? name : '';
        this.incidentNodes = incidentNodes ?? []
        this.description = ''
        this.workingHours = ''
    }
}

export class Building {
    name: string
    id: number
    floors: Floor[]

    constructor(name: string, floors?: Floor[]) {
        this.name = name
        this.id = Date.now()
        this.floors = floors ?? [new Floor(1)]
    }

}

export class Floor {
    floorNumber: number
    id: number
    MapElements: BaseMapElement[]

    constructor(floorNumber: number) {
        this.id = Date.now()
        this.MapElements = []
        this.floorNumber = floorNumber
    }
}