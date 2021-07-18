import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

function Home() {
    const state = useSelector((state) => state);

    useEffect(() => {
        state.admin.success = null;
        state.admin.errors = null;
    }, []);

    useEffect(() => {
        document.title = "ADMIN"
    })

    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}

export default Home;
