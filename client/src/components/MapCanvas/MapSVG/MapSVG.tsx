import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {MapGrid} from "./MapGrid";
import {IPoint, IViewBox} from "../Interfaces/Interfaces";
import {MapContext, MapContextDispatch} from "../MapContext";
import {ActionType} from "../Reducers/MapReducer";
import {snapTo} from "../Helpers/Helpers";
import PropertiesTable from "../PropertiesTable/PropertiesTable";
import PropertyItem from "../PropertiesTable/PropertyItem";
import PropertiesTableSection from "../PropertiesTable/PropertiesTableSection";
import MapElement from "../MapElement/MapElement";
import MapRoute from "../MapRoute/MapRoute";
import ToolSelector from "../ToolSelector/ToolSelector";
import MapElementProperties from "../PropertiesTable/MapElementProperties";
import ZoomControl from "../ZoomControl/ZoomControl";
import Guide from "../Guide/Guide";

const MapSVG = () => {
    const mapState = useContext(MapContext)
    const dispatch = useContext(MapContextDispatch)
    const [viewBox, setViewBox] = useState<IViewBox>({x: 0, y: 0, width: 0, height: 0})
    const [guide, setGuide] = useState({path: '', x: 0, y: 0, width: 0})
    const refViewBox = useRef<null | IViewBox>(null)
    refViewBox.current = viewBox

    const [scale, setScale] = useState(1)
    const refScale = useRef(1)
    refScale.current = scale

    const [snap, setSnap] = useState(10)
    const [grid, setGrid] = useState(mapState.editingMode)
    const [dragging, setDragging] = useState(false)
    const ref = useRef<SVGSVGElement>(null!);
    const [mousePos, setMousePos] = useState<IPoint>({x: 0, y: 0})

    const handleWheel = (e: React.WheelEvent) => {
        let rect: SVGSVGElement = ref.current;
        let width = viewBox.width;
        let height = viewBox.height;
        let dw = width * Math.sign(e.deltaY) * -0.05;
        let dh = height * Math.sign(e.deltaY) * -0.05;
        let dx = dw * e.nativeEvent.offsetX / rect.clientWidth;
        let dy = dh * e.nativeEvent.offsetY / rect.clientHeight;
        setScale((width - dw) / rect.clientWidth)
        setViewBox({x: viewBox.x + dx, y: viewBox.y + dy, width: width - dw, height: height - dh})
    }
    const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
        handleMouseMove(e)
        setDragging(false);
    }
    const handleMouseLeave = () => {
        setDragging(false);
    }
    const handleMouseDown = () => {
        if (mapState.tool.name === 'Drag tool') {
            setDragging(true)
        }
    }
    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (dragging) {
            let dx = -e.movementX * scale;
            let dy = -e.movementY * scale;
            setViewBox({...viewBox, x: viewBox.x + dx, y: viewBox.y + dy})
        }
        const localX = (e.clientX - e.currentTarget.getBoundingClientRect().x);
        const localY = (e.clientY - e.currentTarget.getBoundingClientRect().y);
        if (dragging || mapState.temporaryElement !== null)
            setMousePos(snapTo((localX * scale) + viewBox.x, (localY * scale) + viewBox.y, snap));
    }
    const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
        let rect = e.currentTarget.getBoundingClientRect()
        let clickPos = snapTo((e.clientX - rect.left) * scale + viewBox.x, (e.clientY - rect.top) * scale + viewBox.y, snap)
        setMousePos(clickPos)
        mapState.tool.handleClick(clickPos, mapState, dispatch)
    }
    const handleRightClick = (e: any) => {
        e.preventDefault()
        dispatch({type: ActionType.ChangedTemporaryElement, element: null})
    }

    const handleResize = useCallback(() => {
        if (ref.current && refViewBox.current) {
            setViewBox({
                ...refViewBox.current,
                width: ref.current.clientWidth * refScale.current,
                height: ref.current.clientHeight * refScale.current
            })
        }
    }, [refScale]);

    useEffect(() => {
        const MapSVG: SVGSVGElement = ref.current
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(MapSVG);
        MapSVG.addEventListener('wheel', (e: WheelEvent) => e.preventDefault())
        setViewBox({x: 0, y: 0, width: MapSVG.clientWidth, height: MapSVG.clientHeight})
        return () => {
            MapSVG.removeEventListener('wheel', (e: WheelEvent) => e.preventDefault())
            resizeObserver.disconnect();
        }
    }, [handleResize]);


    //Scale map on load
    useEffect(() => {
        if (mapState.elements.length !== 0 && scale === 1) {
            ScaleMap()
        }
    }, [mapState.elements])

    const ScaleMap = () => {
        let maxPoint: IPoint = {x: Number.MIN_SAFE_INTEGER, y: Number.MIN_SAFE_INTEGER}
        let boundingBox: IViewBox =
            {x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER, width: 0, height: 0}
        for (const el of mapState.elements) {
            for (const point of el.coordinates) {
                maxPoint = {x: Math.max(maxPoint.x, point.x), y: Math.max(maxPoint.y, point.y)}
                boundingBox = {...boundingBox, x: Math.min(boundingBox.x, point.x), y: Math.min(boundingBox.y, point.y)}
            }
        }
        boundingBox = {...boundingBox, width: maxPoint.x - boundingBox.x, height: maxPoint.y - boundingBox.y}
        const aspectRatio = ref.current.clientWidth / ref.current.clientHeight
        let viewBox: IViewBox = {x: 0, y: 0, width: maxPoint.x + 100, height: maxPoint.y + 100}
        if (aspectRatio < maxPoint.x / maxPoint.y) {
            viewBox.height = (maxPoint.x + 100) / aspectRatio
            viewBox.y = -(viewBox.height - boundingBox.height) / 2
        } else {
            viewBox.width = (maxPoint.y + 100) * aspectRatio
            viewBox.x = -(viewBox.width - boundingBox.width) / 2
        }
        setViewBox(viewBox)
        setScale(viewBox.width / ref.current.clientWidth)
    }
    const resizeMap = (factor: number) => {
        /*const aspectRatio = viewBox.width / viewBox.height
        //TODO
        setViewBox({
            ...viewBox,
            x: viewBox.x + factor * aspectRatio,
            y: viewBox.y + factor * (1 / aspectRatio),
            width: viewBox.width - factor * aspectRatio,
            height: viewBox.height - factor * (1 / aspectRatio)
        })
        setScale((viewBox.width - factor) / ref.current.clientWidth)*/
    }
    return (
        <section className='w-full flex flex-col md:flex-row'>
            <ZoomControl resize={resizeMap} />
            <svg viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                 ref={ref}
                 className={`w-full h-full ${dragging ? ' cursor-all-scroll' : ''}`}
                 onMouseMove={handleMouseMove}
                 onClick={handleClick}
                 onMouseDown={handleMouseDown}
                 onMouseLeave={handleMouseLeave}
                 onContextMenu={handleRightClick}
                 onMouseUp={handleMouseUp}
                 onWheel={handleWheel}>
                <Guide guide={guide} />
                {mapState.elements.map((el) =>
                    <MapElement element={el} key={el.id} stroke='blue'/>)}
                {mapState.temporaryElement &&
                    <MapElement element={mapState.temporaryElement} mousePos={mousePos}
                                key={mapState.temporaryElement.id}
                                pointerEvents='none'
                                strokeWidth={2.5} stroke='red'/>}
                {(grid) && <MapGrid snap={snap} viewBox={viewBox}/>}
                {mapState.route ? <MapRoute/> : null}
            </svg>
            {mapState.editingMode &&
                <div className='flex flex-col w-96'>
                    <ToolSelector/>
                    <PropertiesTable>
                        <PropertiesTableSection label='General properites' hiddenByDefault={true}>
                            <PropertyItem name={'Elements count'} value={mapState.elements.length}></PropertyItem>
                            <PropertyItem name={'Selected tool'} value={mapState.tool.name}/>
                            <PropertyItem name='Scale' value={scale}/>
                            <PropertyItem name={'Grid'}>
                                <input type='checkbox' checked={grid} onChange={e => setGrid(e.target.checked)}/>
                                <input type='number' value={snap}
                                       onChange={e => setSnap(parseInt(e.target.value))}/>
                            </PropertyItem>
                            <PropertyItem name='Offset'>
                                <input type='number' className='w-20' value={viewBox.x} step={1} min={0}
                                       onChange={e => setViewBox({
                                           ...viewBox,
                                           x: parseFloat(e.target.value)
                                       })}/>
                                <input type='number' className='w-20' value={viewBox.y} step={1} min={0}
                                       onChange={e => setViewBox({
                                           ...viewBox,
                                           y: parseFloat(e.target.value)
                                       })}/>
                            </PropertyItem>
                            <tr>
                                <td colSpan={2}>
                                    <button type='button' onClick={() => console.log(mapState.elements)}>Dump
                                        elements
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button type='button'
                                            onClick={() => console.log(JSON.stringify(mapState.elements))}>Dump JSON
                                    </button>
                                </td>
                            </tr>
                            <PropertyItem name={'Import JSON'}><input onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    for (const el in mapState.elements) {
                                        dispatch({type: ActionType.Deleted, element: el})
                                    }
                                    for (const el of JSON.parse(e.currentTarget.value)) {
                                        dispatch({type: ActionType.Added, element: el})
                                    }
                                }
                            }
                            }/></PropertyItem>
                        </PropertiesTableSection>
                        <PropertiesTableSection label='Guide' hiddenByDefault={true}>
                            <PropertyItem name='Guide'>
                                <input value='' type="file" onChange={(e) => {
                                    const img = new Image()
                                    img.onload = () => {
                                        setGuide({...guide, width: img.width, path: img.src})
                                    }
                                    img.src = URL.createObjectURL(e.target.files![0])
                                }}/>
                            </PropertyItem>
                            <PropertyItem name='Offset'>
                                <input type='number' className='w-20' value={guide.x} step={1} min={0}
                                       onChange={e => setGuide({
                                           ...guide,
                                           x: parseFloat(e.target.value)
                                       })}/>
                                <input type='number' className='w-20' value={guide.y} step={1} min={0}
                                       onChange={e => setGuide({
                                           ...guide,
                                           y: parseFloat(e.target.value)
                                       })}/>
                            </PropertyItem>
                            <PropertyItem name='Width'>
                                <input type='number' className='w-40' value={guide.width} step={1} min={0}
                                       onChange={e => setGuide({
                                           ...guide,
                                           width: parseFloat(e.target.value)
                                       })}/>
                            </PropertyItem>
                        </PropertiesTableSection>
                        <MapElementProperties/>
                    </PropertiesTable>
                </div>
            }
        </section>
    );
};

export default MapSVG;