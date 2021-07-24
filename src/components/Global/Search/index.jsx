import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Input, Label, Button} from "reactstrap";

function SearchForm() {
    const [search, setSearch] = useState('');

    const history = useHistory();
    const onSubmitHandler = (e) => {
        e.preventDefault();
        search && history.push(`/admin/search/t=${search}`)
    }

    return (
        <div>
            <Form onSubmit={onSubmitHandler} className="flex mx-40 my-5">
                <Label htmlFor="nav-search" className="mr-5 font-bold">
                    <span>Search</span>
                </Label>
                <Input 
                    type="text"
                    id="nav-search"
                    placeholder="Search by title"
                    className="mr-5"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                 />
                 <Button type="submit">
                        <span>Search</span>
                 </Button>
            </Form>
        </div>
    );
}

export default SearchForm;