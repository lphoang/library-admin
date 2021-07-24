import React, { useEffect } from "react";
import { getBooksByTitle } from '../../../redux/action/admin.action'
import { useSelector, useDispatch } from "react-redux";
import { Table } from "reactstrap";
import { useHistory, useParams } from "react-router-dom"
import Search from '../Search'
import Delete from '../../Admin/Delete'
import { Loading } from '../../Global/Loading'

export default function SearchResult() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { t } = useParams();

    useEffect(() => {
        getBooksByTitle(dispatch, t);
    }, [dispatch, t]);

    const history = useHistory();

    useEffect(() => {
        !state.admin.isAuthenticated
            && history.push(`admin/login`);
    }, [state.admin.isAuthenticated]);

    useEffect(() => {
        document.title = `Search results with "${t}"`
    })


    return (
        <>
            <Search/>
            <h3 className="text-center mb-3">{`${state.admin.searchedBooks.length} results by searching with "${t}"`}</h3>
            <section className="px-4 md:px-10 lg:px-16">
                <div className="sm:mx-0 md:mx-2 lg:mx-3 xl:mx-4">
                    {state.admin.loading && <Loading />}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Score</th>
                                <th>Release Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.admin.searchedBooks && state.admin.searchedBooks.map((book, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            {key + 1}
                                        </td>
                                        <th>{book.title}</th>
                                        <td>{book.price}</td>
                                        <td>{book.score}</td>
                                        <td>{book.releaseDate}</td>
                                        <td>
                                            <Delete book={book} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
}
