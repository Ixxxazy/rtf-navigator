import React from 'react';
import {Close} from "@mui/icons-material";
type Props = {
    children?: React.ReactNode
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
};
const Modal = ({children, visible, setVisible}: Props) => {
    return (
        <div className={`z-50 fixed top-0 bottom-0 right-0 left-0 bg-black/75 ${visible ? 'flex' : 'hidden'}`} onClick={() => setVisible(false)}>
            <div className={`shadow p-5 m-10 bg-white dark:bg-neutral-700 flex w-full h-auto rounded-xl relative`} onClick={(e) => e.stopPropagation()}>
                <Close onClick={() => setVisible(false)} className={'cursor-pointer absolute right-0 top-0 m-5'} fontSize="large"></Close>
                {children}
            </div>
        </div>
    );
};

export default Modal;