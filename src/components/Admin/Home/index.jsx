import React, { useEffect } from 'react';
import Books from '../Books';
import Search from '../../Global/Search'

function Home() {

    useEffect(() => {
        document.title = "ADMIN"
    })

    return (
        <div>
            <Search />
            <Books />
        </div>
    );
}

export default Home;
