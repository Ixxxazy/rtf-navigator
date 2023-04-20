import React, {useState} from 'react';

const Buildings = () => {
    const [buildings, setBuildings] = useState(['ИРИТ-РТФ', 'ФТИ', 'ИНМТ-ХТИ', 'ИСА', 'СП', 'ИнЭУ', 'Теплофак', 'Электрофак', 'Мехфак'])
    return (
        <section>
            <h1 className={'text-3xl'}>Институты</h1>
            <ul>
                {buildings.map((building) => <li key={building}><h2 className={'text-lg'}>{building}</h2>Вход по пропускам</li>)}
            </ul>
        </section>
    );
};

export default Buildings;