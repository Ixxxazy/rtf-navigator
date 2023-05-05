import React, {useContext, useEffect, useRef, useState} from 'react';
import MapElement from "../mapElement";
import {MapGrid} from "./MapGrid";
import {IPoint, IViewBox} from "../Interfaces/Interfaces";
import {MapContext, MapContextDispatch} from "../MapContext";
import {ActionType} from "../Reducers/MapReducer";
import {snapTo} from "../Helpers/Helpers";
import PropertiesTable from "../PropertiesTable/PropertiesTable";
import PropertyItem from "../PropertiesTable/PropertyItem";
import PropertiesTableSection from "../PropertiesTable/PropertiesTableSection";

type Props = {
    editingAllowed: boolean,
    children?: React.ReactNode
}
const MapSVG = ({editingAllowed, children}: Props) => {
    const mapState = useContext(MapContext)
    const dispatch = useContext(MapContextDispatch)
    const [viewBox, setViewBox] = useState<IViewBox>({x: 0, y: 0, width: 0, height: 0})
    const [scale, setScale] = useState(1)
    const [snap, setSnap] = useState(10)
    const [grid, setGrid] = useState(editingAllowed)
    const [dragging, setDragging] = useState(false)
    const ref = useRef<SVGSVGElement | null>(null);
    const [mousePos, setMousePos] = useState<IPoint>({x: 0, y: 0})

    useEffect(() => {
        const MapSVG: any = ref.current
        if (MapSVG) {
            setViewBox({x: 0, y: 0, width: MapSVG.clientWidth, height: MapSVG.clientHeight})
            window.addEventListener('resize', handleResize)
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    const handleResize = () => {
        if (ref.current)
            setScale(viewBox.width / ref.current.clientWidth)
    }
    const handleWheel = (e: React.WheelEvent) => {
        let rect: SVGSVGElement = ref.current!;
        let width = viewBox.width;
        let height = viewBox.height;
        let dw = width * Math.sign(e.deltaY) * -0.05;
        let dh = height * Math.sign(e.deltaY) * -0.05;
        let dx = dw * e.nativeEvent.offsetX / rect.clientWidth;
        let dy = dh * e.nativeEvent.offsetY / rect.clientHeight;
        setScale((width - dw) / rect.clientWidth)
        setViewBox({
            x: Math.max(viewBox.x + dx, 0),
            y: Math.max(viewBox.y + dy, 0),
            width: width - dw,
            height: height - dh
        })
    }
    const handleMouseUp = (e: React.MouseEvent) => {
        if (dragging) {
            let dx = -e.movementX * scale;
            let dy = -e.movementY * scale;
            setViewBox({
                ...viewBox,
                x: Math.max(viewBox.x + dx, 0),
                y: Math.max(viewBox.y + dy, 0)
            })
        }
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
            setViewBox({
                ...viewBox,
                x: Math.max(viewBox.x + dx, 0),
                y: Math.max(viewBox.y + dy, 0)
            })
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

    return (
        <div className='w-full flex'>
            <svg viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                 ref={ref}
                 className={`w-full max-w-4xl relative border${dragging && ' cursor-all-scroll'}`}
                 style={{aspectRatio: "1.5"}}
                 onMouseMove={handleMouseMove}
                 onClick={handleClick}
                 onMouseDown={handleMouseDown}
                 onMouseLeave={handleMouseLeave}
                 onContextMenu={handleRightClick}
                 onMouseUp={handleMouseUp}
                 onWheel={handleWheel}>
                {mapState.elements.map((el) =>
                    <MapElement element={el} key={el.id} stroke='blue' strokeWidth={2.5}></MapElement>)}
                {mapState.temporaryElement ?
                    <MapElement element={mapState.temporaryElement} mousePos={mousePos}
                                key={mapState.temporaryElement.id}
                                pointerEvents='none'
                                strokeWidth={2.5} stroke='red'></MapElement> : null}
                {(grid) && <MapGrid snap={snap} viewBox={viewBox}/>}
            </svg>
            {editingAllowed &&
                <PropertiesTable>
                    <PropertiesTableSection label='General properites'>
                        <PropertyItem name={'Elements count'} value={mapState.elements.length}></PropertyItem>
                        <PropertyItem name={'Selected tool'} value={mapState.tool.name}/>
                        <PropertyItem name={'Grid'}>
                            <input type='checkbox' checked={grid} onChange={e => setGrid(e.target.checked)}/>
                            <input type='number' value={snap}
                                   onChange={e => setSnap(parseInt(e.target.value))}/>
                        </PropertyItem>
                        <PropertyItem name='Offset X'>
                            <input type='number' className='w-40' value={viewBox.x} step={1} min={0}
                                   onChange={e => setViewBox({
                                       ...viewBox,
                                       x: parseFloat(e.target.value)
                                   })}/>
                        </PropertyItem>
                        <PropertyItem name='Offset Y'>
                            <input type='number' className='w-40' value={viewBox.y} step={1} min={0}
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
                    </PropertiesTableSection>
                    {children}
                </PropertiesTable>}
        </div>
    );
};

export default MapSVG;