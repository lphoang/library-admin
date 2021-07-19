import React, { useState } from "react";
import { Modal, ModalFooter, ModalBody, Form, Button, FormGroup, Input } from "reactstrap"
import { Loading } from "../../Global/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useSecureLs } from "../../Global/useSecureLs";
import { createBook } from '../../../redux/action/admin.action'
import { setError } from "../../../redux/action/commonAction";

function Add() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [token] = useSecureLs("admin_token")

    const initialValues = {
        title: '',
        author: '',
        bookGenre: '',
        price: 0.0,
        score: 0.0,
        releaseDate: '',
        description: '',
        thumbnail: '',
    }
    const [show, setShow] = useState(false);
    const [book, setBook] = useState(initialValues);
    const toggleShow = () => setShow(!show);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        createBook(dispatch, book, token);
        if(state.admin.errors){
            alert(state.admin.errors);
            setError(dispatch, null);
        }else{
            alert("Create book successfully");
            toggleShow();
        }
    }


    return (
        <div>
            <Button onClick={toggleShow}>
                Add book
            </Button>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                isOpen={show} toggle={toggleShow}
            >
                {state.admin.loading && <Loading />}
                <h1 className="mx-auto uppercase my-2 font-sans">Create a new book</h1>
                <hr />
                <ModalBody>
                    <div className="w-full xl:px-20 lg:px-16 md:px-3 sm:px-0 items-center bg-white">
                        <div className="w-full xl:px-4 lg:px-5 md:px-1 items-center bg-white">
                            <div className="container mx-auto">
                                <Form className="max-w-full mx-auto p-6" onSubmit={onSubmitHandler}>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="title" placeholder="Title "
                                            onChange={(e) =>
                                                setBook({ ...book, title: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="author" placeholder="Author "
                                            onChange={(e) =>
                                                setBook({ ...book, author: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="bookGenre" placeholder="Genre "
                                            onChange={(e) =>
                                                setBook({ ...book, bookGenre: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="price" placeholder="Price "
                                            onChange={(e) =>
                                                setBook({ ...book, price: parseFloat(e.target.value) })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="score" placeholder="Score "
                                            defaultValue={5.0}
                                            onChange={(e) =>
                                                setBook({ ...book, score: parseFloat(e.target.value) })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="releaseDate" placeholder="Release date"
                                            onChange={(e) =>
                                                setBook({ ...book, releaseDate: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="textarea" name="description" placeholder="Description "
                                            onChange={(e) =>
                                                setBook({ ...book, description: e.target.value })
                                            } />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="thumbnail" placeholder="Thumbnail "
                                            onChange={(e) =>
                                                setBook({ ...book, thumbnail: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <Button className="mx-auto my-3" color="primary" type="submit">
                                        Create
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggleShow}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Add;
