import React, {useCallback, useContext, useEffect, useState} from 'react';
import InfoCard from "../../UI/InfoCard/InfoCard";
import InputBox from "../../UI/Input/InputBox";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {MapContext, MapContextDispatch} from "../MapContext";
import {CircleOutlined, Place} from "@mui/icons-material";
import {ActionType} from "../Reducers/MapReducer";
import {usePathfinding} from "../Hooks/usePathfinding";
import RouteCard from "../RouteCard/RouteCard";


const RoutePlanner = () => {
    const context = useContext(MapContext)
    const dispatch = useContext(MapContextDispatch)
    const [nodes, setNodes] = useState({start: 0, end: 0})
    const [routeNodes, setRouteNodes] = useState<{ start: number, end: number } | null>(null)
    const route = usePathfinding(context.elements, routeNodes)
    const [fieldValues, setFieldValues] = useState({start: '', end: ''})
    const [selectedField, setSelectedField] = useState(1) //0 for route start, 1 for route end

    const onInputBoxBlur = useCallback((event: React.FocusEvent<HTMLInputElement>, isStart: boolean) => {
        if (event.currentTarget.value !== '') {
            const node = context.elements.find(el => el.name === event.currentTarget.value)
            if (isStart)
                setNodes({...nodes, start: node ? node.id : -1})
            else setNodes({...nodes, end: node ? node.id : -1})
        }

    }, [context.elements, nodes]);
    useEffect(() => {
        if (context.selected)
            if (context.selected.name !== undefined && context.selected.name !== '') {
                if (selectedField === 1) {
                    setFieldValues({...fieldValues, end: context.selected.name})
                    setNodes({...nodes, end: context.selected.id})
                } else {
                    setFieldValues({...fieldValues, start: context.selected.name})
                    setNodes({...nodes, start: context.selected.id})
                }
            }
    }, [context.selected])

    const getRoute = useCallback(() => {
        setRouteNodes(nodes)
        dispatch({type: ActionType.RouteSet, route: nodes}) //send route to map state
    }, [dispatch, nodes])

    return (
        <InfoCard className={'w-full text-left'}>
            <InputBox label='Начало маршрута' Icon={CircleOutlined}
                      className={nodes.start === -1 ? 'outline-red-500 outline-2 bg-red-500/50 dark:bg-red-600' : (selectedField === 0 ? 'bg-blue-300 dark:bg-neutral-600' : '')}>
                <Input placeholder='Откуда' onBlur={(e) => onInputBoxBlur(e, true)}
                       onClick={() => setSelectedField(0)}
                       defaultValue={fieldValues.start} minLength={4}/></InputBox>
            <InputBox label='Место назначения' Icon={Place}
                      className={nodes.start === -1 ? 'outline-red-500 outline-2 bg-red-500/50 dark:bg-red-600' : (selectedField === 1 ? 'bg-blue-300 dark:bg-neutral-600' : '')}>
                <Input placeholder='Куда' onBlur={(e) => onInputBoxBlur(e, false)}
                       onClick={() => setSelectedField(1)}
                       defaultValue={fieldValues.end} minLength={4}/></InputBox>
            <Button className={'w-full mt-3 disabled:opacity-75'} disabled={nodes.start < 1 || nodes.end < 1}
                    onClick={() => getRoute()}>
                Построить маршрут</Button>
            <RouteCard route={route}/>
        </InfoCard>
    );
};

export default RoutePlanner;