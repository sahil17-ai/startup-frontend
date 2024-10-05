// src/components/Layout.js
import React from 'react';
import NavbarGraduate from './NavbarGraduate'; // Adjust the import path if needed

const Layout = ({ activeTab, handleTabChange, children }) => {
    return (
        <div>
            <NavbarGraduate activeTab={activeTab} handleTabChange={handleTabChange} />
            {children}
        </div>
    );
};

export default Layout;
