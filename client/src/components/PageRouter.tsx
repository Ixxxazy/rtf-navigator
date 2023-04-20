import React from 'react';
import {Route, Routes} from "react-router-dom";
import BuildingMap from "../pages/BuildingMap";
import Error from "../pages/Error";
import Layout from "./UI/Layout/Layout";
import Buildings from "../pages/Buildings";
import About from "../pages/About";
import Login from "../pages/Login";

const PageRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<BuildingMap />} />
                <Route path="/buildings" element={<Buildings />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default PageRouter;