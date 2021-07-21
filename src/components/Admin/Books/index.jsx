import React, { useEffect, useState } from "react";
import { getBooks } from '../../../redux/action/admin.action'
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useHistory, useParams, Link } from "react-router-dom"
import Add from '../Add'
import Update from '../Update'
import Delete from '../Delete'
import { Loading } from '../../Global/Loading'

export default function Books() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { page } = useParams();
    const { size } = useParams();
    const [pagination, setPagination] = useState({
        currentPage: page,
        totalItems: 100,
        totalPages: 10,
    })

    useEffect(() => {
        getBooks(dispatch, pagination.currentPage, size);
    }, [pagination, dispatch, size]);

    const history = useHistory();

    useEffect(() => {
        !state.admin.isAuthenticated
            && history.push(`admin/login`);
    }, [state.admin.isAuthenticated]);

    const pageArray = Array.from(Array(pagination.totalPages).keys());


    return (
        <section className="px-4 md:px-10 lg:px-16">
            <div className="sm:mx-0 md:mx-2 lg:mx-3 xl:mx-4">
                {state.admin.loading && <Loading />}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>Score</th>
                            <th>Release Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.admin.books && state.admin.books.map((book, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        {key + 1}
                                    </td>
                                    <th>{book.title}</th>
                                    <td>{book.author.fullName}</td>
                                    <td>{book.bookGenre.title}</td>
                                    <td>{book.price}</td>
                                    <td>{book.score}</td>
                                    <td>{book.releaseDate}</td>
                                    <td >
                                        <Update book={book} />
                                    </td>
                                    <td>
                                        <Delete book={book} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <Add />
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
            <Breadcrumb className="flex justify-center">
                {state.admin.pagination && pageArray.map((p, index) => (
                    <BreadcrumbItem key={index}>
                        <Link to={`/admin/page=${p}&size=10`}>
                            <Button
                                color={p === pagination.currentPage ? "primary" : "secondary"}
                                onClick={() =>
                                    setPagination({
                                        ...pagination,
                                        currentPage: p
                                    })
                                }>
                                {p + 1}
                            </Button>
                        </Link>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </section>
    );
}
