import React from 'react';
import InfoCard from "../components/UI/InfoCard/InfoCard";
import Button from "../components/UI/Button/Button";
import Dropdown from "../components/UI/Dropdown/Dropdown";
const BuildingMap = () => {
    return (
        <div className={'flex flex-col md:flex-row'}>
            <div className={'border-2 p-3 w-full text-center vertical-center'}>
                <div className={'flex flex-row flex-wrap items-center gap-3'}>
                    <span><Dropdown label='Институт' options={['ИРИТ-РТФ', 'ХТИ']}></Dropdown></span>
                    <span><Dropdown label='Этаж' options={['1','2','3']}></Dropdown></span>
                </div>
                <svg id={'map'}></svg>
            </div>
            <InfoCard className={'md:w-1/3'}>
                <h1 className={'text-4xl font-thin'}>Номер комнаты</h1>
                <h2 className={'text-2xl'}>Название комнаты</h2>
                <h3 className={'text-xl'}>Время работы</h3>
                <div>Описание: Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet animi autem consectetur corporis, cumque et facilis impedit iusto laboriosam laborum odio officiis optio quo quod, sequi velit voluptas voluptatibus!</div>
                <Button className={'w-full mt-3'}>Построить маршрут</Button>
            </InfoCard>
        </div>
    );
};

export default BuildingMap;