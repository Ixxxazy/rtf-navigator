import React from 'react';
import Button from "../../UI/Button/Button";
import {Add, Remove} from "@mui/icons-material";

type Props = {
    resize: (factor: number) => void
}
const ZoomControl = ({resize}: Props) => {
    return (
        <div className='absolute right-10 bottom-10 text-3xl font-bold flex flex-col rounded-xl bg-neutral-200/50 dark:bg-neutral-700/50 backdrop-blur'>
            <Button className='py-2 bg-none' onClick={() => resize(500)}><Add/></Button>
            <Button className='py-2 bg-none' onClick={() => resize(-500)}><Remove/></Button>
        </div>
    );
};

export default ZoomControl;