import React, { useState } from "react";
import { Modal, ModalBody, Form, Button } from "reactstrap"
import { Loading } from "../../Global/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useSecureLs } from "../../Global/useSecureLs";
import { deleteBook } from '../../../redux/action/admin.action'
import { setError } from '../../../redux/action/commonAction'

function Delete({ book: { id, title } }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [token] = useSecureLs("admin_token");
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        deleteBook(dispatch, token, id);
        if (state.admin.errors) {
            alert(state.admin.errors);
            setError(dispatch, null);
        } else {
            alert(`Delete ${title} successfully`);
            toggleShow();
        }
    }


    return (
        <div>
            <Button onClick={toggleShow} color="danger">
                Delete
            </Button>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                isOpen={show} toggle={toggleShow}
            >
                {state.admin.loading && <Loading />}
                <h1 className="mx-auto my-2 font-sans text-center">{`Are you sure to delete ${title}'s book?`}</h1>
                <hr />
                <ModalBody>
                    <div className="w-full xl:px-20 lg:px-16 md:px-3 sm:px-0 items-center bg-white">
                        <div className="w-full xl:px-4 lg:px-5 md:px-1 items-center bg-white">
                            <div className="container mx-auto">
                                <Form className="max-w-full mx-auto p-6" onSubmit={onSubmitHandler}>
                                    <Button className="w-1/2 mx-auto my-3" color="primary" type="submit">
                                        Yes
                                    </Button>
                                    <Button className="w-1/2 mx-auto my-3" color="secondary" onClick={toggleShow}>
                                        No
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Delete;
