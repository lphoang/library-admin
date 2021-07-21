import React, { useEffect } from 'react';
import Books from '../Books';

function Home() {

    useEffect(() => {
        document.title = "ADMIN"
    })

    return (
        <div>
            <Books />
        </div>
    );
}

export default Home;
