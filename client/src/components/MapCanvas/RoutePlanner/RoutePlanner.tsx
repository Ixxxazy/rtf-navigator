import React, {useCallback, useContext, useEffect, useState} from 'react';
import InfoCard from "../../UI/InfoCard/InfoCard";
import InputBox from "../../UI/Input/InputBox";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {MapContext} from "../MapContext";
import {CircleOutlined, Place} from "@mui/icons-material";

interface RoutePlannerProps {
    setRouteNodes: (value: (((prevState: { start: number; end: number }) => { start: number; end: number }) | {
        start: number;
        end: number
    })) => void
}

const RoutePlanner = ({setRouteNodes}: RoutePlannerProps) => {
    const context = useContext(MapContext)
    const [nodes, setNodes] = useState({start: 0, end: 0})
    const onInputBoxBlur = useCallback((event: React.FocusEvent<HTMLInputElement>, isStart: boolean) => {
        const node = context.elements.find(el => el.name === event.currentTarget.value)
        if (isStart)
            setNodes({...nodes, start: node ? node.id : -1})
        else setNodes({...nodes, end: node ? node.id : -1})
    }, [context.elements, nodes]);
    useEffect(() => {
        if (context.selected)
            setNodes(n => ({...n, end: context.selected!.id}))
    }, [context.selected])
    return (
        <InfoCard className={'w-full text-left'}>
            <InputBox label='Начало маршрута' Icon={CircleOutlined}
                      className={nodes.start === -1 ? 'border-red:500' : ''}>
                <Input placeholder='Р-035' onBlur={(e) => onInputBoxBlur(e, true)} minLength={4}/></InputBox>
            <InputBox label='Место назначения' Icon={Place} >
                <Input placeholder='Р-044' onBlur={(e) => onInputBoxBlur(e, false)}
                       defaultValue={context.selected?.name ?? ''} minLength={4}/></InputBox>
            <Button className={'w-full mt-3 disabled:opacity-75'} disabled={nodes.start < 1 || nodes.end < 1}
                    onClick={() => setRouteNodes({start: nodes.start, end: nodes.end})}>
                Построить маршрут</Button>
        </InfoCard>
    );
};


export default RoutePlanner;