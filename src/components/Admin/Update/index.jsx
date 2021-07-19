import React, { useState } from "react";
import { Modal, ModalFooter, ModalBody, Form, Button, FormGroup, Input } from "reactstrap"
import { Loading } from "../../Global/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useSecureLs } from "../../Global/useSecureLs";
import { updateBook } from '../../../redux/action/admin.action'
import { setError } from '../../../redux/action/commonAction'

function Update({ book: { id, title, author, bookGenre, price, score, releaseDate, description, thumbnail } }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [token] = useSecureLs("admin_token");

    const initialValues = {
        title: title,
        author: author.fullName,
        bookGenre: bookGenre.title,
        price: price,
        score: score,
        releaseDate: releaseDate,
        description: description,
        thumbnail: thumbnail,
    }
    const [show, setShow] = useState(false);
    const [book, setBook] = useState(initialValues);
    const toggleShow = () => setShow(!show);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        updateBook(dispatch, book, token, id);
        if (state.admin.errors) {
            setTimeout(() => { alert(state.admin.errors); }, 2000)
            setError(dispatch, null);
        } else {
            alert("Update successfully");
            toggleShow();
        }
    }


    return (
        <div>
            <Button onClick={toggleShow} color="primary">
                Update
            </Button>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                isOpen={show} toggle={toggleShow}
            >
                {state.admin.loading && <Loading />}
                <h1 className="mx-auto my-2 font-sans text-center">{`Update ${title}'s book`}</h1>
                <hr />
                <ModalBody>
                    <div className="w-full xl:px-20 lg:px-16 md:px-3 sm:px-0 items-center bg-white">
                        <div className="w-full xl:px-4 lg:px-5 md:px-1 items-center bg-white">
                            <div className="container mx-auto">
                                <Form className="max-w-full mx-auto p-6" onSubmit={onSubmitHandler}>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="title" placeholder="Title "
                                            defaultValue={initialValues.title}
                                            onChange={(e) =>
                                                setBook({ ...book, title: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="author" placeholder="Author "
                                            defaultValue={initialValues.author}
                                            onChange={(e) =>
                                                setBook({ ...book, author: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="bookGenre" placeholder="Genre "
                                            defaultValue={initialValues.bookGenre}
                                            onChange={(e) =>
                                                setBook({ ...book, bookGenre: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="price" placeholder="Price "
                                            defaultValue={initialValues.price}
                                            onChange={(e) =>
                                                setBook({ ...book, price: parseFloat(e.target.value) })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="score" placeholder="Score "
                                            defaultValue={initialValues.score}
                                            onChange={(e) =>
                                                setBook({ ...book, score: parseFloat(e.target.value) })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="releaseDate" placeholder="Release date"
                                            defaultValue={initialValues.releaseDate}
                                            onChange={(e) =>
                                                setBook({ ...book, releaseDate: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="textarea" name="description" placeholder="Description "
                                            defaultValue={initialValues.description}
                                            onChange={(e) =>
                                                setBook({ ...book, description: e.target.value })
                                            } />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Input type="text" name="thumbnail" placeholder="Thumbnail "
                                            defaultValue={initialValues.thumbnail}
                                            onChange={(e) =>
                                                setBook({ ...book, thumbnail: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    <Button className="mx-auto my-3" color="primary" type="submit">
                                        Update
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

export default Update;
