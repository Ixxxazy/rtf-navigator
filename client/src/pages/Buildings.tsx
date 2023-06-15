import React, {useState} from 'react';
import InfoCard from "../components/UI/InfoCard/InfoCard";

interface IBuilding {
    name: string
    address: string
    entry: Entry
}

enum Entry {
    Keycard = 'Вход по пропускам',
    Keycard_Document = 'Вход по студенческим билетам и пропускам (необходимо предъявить оба документа)',
    Document = 'Вход по студенческим билетам',
    No_Entry = 'Вход через другой институт'
}

const Buildings = () => {
    const [buildings, setBuildings] =
        useState<IBuilding[]>([
            {name: 'ИРИТ-РТФ', entry: Entry.Keycard_Document, address: 'ул. Мира, 32'},
            {name: 'ГУК', entry: Entry.Document, address: 'ул. Мира, 19'},
            {name: 'ИнЭУ', entry: Entry.Document, address: 'ул. Мира, 19'},
            {name: 'Электрофак', entry: Entry.No_Entry, address: 'ул. Мира, 19'},
            {name: 'Мехфак', entry: Entry.No_Entry, address: 'ул. Мира, 19'},
            {name: 'ФТИ', entry: Entry.Keycard, address: 'ул. Мира, 21'},
            {name: 'ИНМТ-ХТИ', entry: Entry.Keycard, address: 'ул. Мира, 28'},
            {name: 'ИСА', entry: Entry.Document, address: 'ул. Мира, 17'},
            {name: 'СП', entry: Entry.No_Entry, address: 'ул. Мира, 17'},
            {name: 'Теплофак', entry: Entry.Keycard, address: 'ул. Софьи Ковалевской, 5'}])
    return (
        <section>
            <h1 className={'text-3xl'}>Институты</h1>
            <p>
                Чтобы попасть в институт нужно показать документ. В разных институтах требуются разные документы, а в
                некоторые можно попасть только из других институтов
            </p>
            <ul className={'grid auto-rows-fr sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                {buildings.map((building) => <li key={building.name}><InfoCard className={'h-full'}><h2
                    className={'text-xl'}>{building.name}</h2>
                    <article>{building.address}<br/>{building.entry}</article>
                </InfoCard></li>)}
            </ul>
        </section>
    );
};

export default Buildings;