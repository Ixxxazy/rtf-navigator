import React from 'react';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";

interface RouteEntryProps {

}

interface RouteEntryProps {
    entryData: { icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }, text: string }
}

const RouteEntry = ({entryData}: RouteEntryProps) => {
    return (
        <li className='flex h-12 items-center gap-5'>
            <entryData.icon/>
            <span className='font-semibold'>{entryData.text}</span>
        </li>
    );
};

export default RouteEntry;