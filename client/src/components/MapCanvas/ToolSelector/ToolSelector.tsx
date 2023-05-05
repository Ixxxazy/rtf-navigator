import React, {useContext} from 'react';
import Button from "../../UI/Button/Button";
import {MapContext, MapContextDispatch} from "../MapContext";
import {ActionType} from "../Reducers/MapReducer";
import {DoorTool, DragTool, GeometryTool, LinkerTool, NodeTool, RoomTool, StaircaseTool, WaypointTool} from "../Tools";
import {ITool} from "../Interfaces/Interfaces";


const ToolSelector = () => {
    const context = useContext(MapContext)
    const dispatch = useContext(MapContextDispatch)
    const tools: ITool[] = [
        new DragTool(),
        new GeometryTool(),
        new DoorTool(),
        new LinkerTool(),
        new NodeTool(),
        new WaypointTool(),
        new RoomTool(),
        new StaircaseTool()];
    return (
        <div className='flex'>
            {tools.map((el) =>
                <Button
                    className={`text-sm ${el.name === context.tool.name && 'bg-green-500 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-500'}`}
                    value={el.name} key={el.name}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        dispatch({
                            type: ActionType.SelectedTool,
                            tool: tools.find(tool => tool.name === e.currentTarget.value)
                        })
                    }}>
                    <el.icon/>
                </Button>)}
        </div>
    );
};

export default ToolSelector;