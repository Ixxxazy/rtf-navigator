import React from 'react';
import Button from "../../UI/Button/Button";
import {Add, Remove} from "@mui/icons-material";

type Props = {
    resize: (factor: number) => void
}
const ZoomControl = ({resize}: Props) => {
    return (
        <div className='absolute right-10 bottom-10 text-3xl font-bold flex flex-col bg-neutral-200 rounded-xl dark:bg-neutral-700'>
            <Button className='py-2 bg-none' onClick={() => resize(500)}  ><Add /></Button>
            <Button className='py-2 bg-none' onClick={() => resize(-500)} ><Remove /></Button>
        </div>
    );
};

export default ZoomControl;