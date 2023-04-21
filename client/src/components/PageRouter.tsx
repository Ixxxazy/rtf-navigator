import React from 'react';
import {Route, Routes} from "react-router-dom";
import BuildingMap from "../pages/BuildingMap";
import Error from "../pages/Error";
import Layout from "./UI/Layout/Layout";
import Buildings from "../pages/Buildings";
import About from "../pages/About";
import Login from "../pages/Login";
import EditMap from "../pages/Admin/EditMap";
import Admin from "../pages/Admin/Admin";

const PageRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<BuildingMap />} />
                <Route path="/buildings" element={<Buildings />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/editMap" element={<EditMap />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default PageRouter;