import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";

export default function Notifications() {
    const username = localStorage.getItem("cadastro_user");
    
    return (
        <>
        <Sidebar user={username} />
        <div className="body">
            <header className="home">
            <h1 className="page-title">Notificações</h1>
            </header>
        </div>
        </>
    );
    }