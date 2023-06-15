import React, {useState} from 'react';
import RouteEntry from "../RouteEntry/RouteEntry";
import {CircleOutlined, MeetingRoom} from "@mui/icons-material";
import {BaseMapElement, MapElementTypes} from "../MapElements";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import {useMapNavigation} from "../Hooks/useMapNavigation";

interface RouteCardProps {
    route: null | BaseMapElement[]
}

const RouteCard = ({route}: RouteCardProps) => {
    const entries = useMapNavigation(route ?? [])
    if (route) {
        return (
            <section>
                {entries?.map(entry => <RouteEntry key={entry.id} entryData={entry}/>
                )}
            </section>
        );
    }
    return null
};

export default RouteCard;