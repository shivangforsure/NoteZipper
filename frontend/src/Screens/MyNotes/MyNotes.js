import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
// import { notes } from "../../data/notes.js";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'


const MyNotes = ({ search }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const noteList = useSelector(state => state.noteList)

    const { loading, notes = [], error } = noteList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const noteCreate = useSelector((state) => state.noteCreate)
    const { success: successCreate } = noteCreate

    const noteUpdate = useSelector((state) => state.noteUpdate)
    const { success: successUpdate } = noteUpdate

    const noteDelete = useSelector((state) => state.noteDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteNoteAction(id))
        }
    };

    useEffect(() => {
        dispatch(listNotes())
        if (!userInfo) {
            navigate('/')
        }
    }, [dispatch, successCreate, navigate, userInfo, successUpdate, successDelete])

    return (
        <MainScreen title={`Welcome Back ${userInfo.name || ""}...`}>
            <Link to="/createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>

            {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}

            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <Accordion alwaysOpen={false}>
                {[...notes]?.reverse().filter(filteredNote =>
                    !search || filteredNote.title.toLowerCase().includes(search.toLowerCase())
                ).map((note, idx) => (
                    <Accordion.Item key={note._id || idx} eventKey={String(idx)}>
                        <Card style={{ margin: 10 }}>
                            <Card.Header style={{ display: "flex", alignItems: "center" }}>
                                <Accordion.Button
                                    // as="span"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        flex: 1,
                                        textAlign: "left",
                                        fontSize: 18,
                                        cursor: "pointer",
                                        padding: 0,
                                    }}
                                >
                                    {note.title}
                                </Accordion.Button>

                                <div>
                                    <Button as={Link} to={`/note/${note._id}`}>Edit</Button>
                                    <Button
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => deleteHandler(note._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Header>

                            <Accordion.Body>
                                <h4>
                                    <Badge bg="success">Category - {note.category}</Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <p>{note.content}</p>
                                    <footer className="blockquote-footer">Created On{" "}
                                        <cite title="Source Title">
                                            {note.createdAt ? note.createdAt.substring(0, 10) : ""}
                                        </cite>
                                    </footer>
                                </blockquote>
                            </Accordion.Body>
                        </Card>
                    </Accordion.Item>
                ))}
            </Accordion>
        </MainScreen>
    );
};

export default MyNotes;
