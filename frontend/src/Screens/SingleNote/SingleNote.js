import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction, updateNoteAction } from '../../actions/notesActions'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const SingleNote = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const noteUpdate = useSelector((state) => state.noteUpdate)
    const { loading, error, success } = noteUpdate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const noteDelete = useSelector((state) => state.noteDelete)
    const { loading: loadingDelete, error: errorDelete } = noteDelete

    useEffect(() => {
        const fetching = async () => {
            try {
                const { data } = await axios.get(`/api/notes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                })

                setTitle(data.title)
                setContent(data.content)
                setCategory(data.category)
                setDate(data.updatedAt)
            }
            catch (err) {
                console.error(err)
            }
        }
        fetching()
    }, [id, userInfo.token])

    useEffect(() => {
        if (success) {
            resetHandler()
            navigate('/mynotes')
        }
    }, [success, navigate])

    const resetHandler = () => {
        setTitle("")
        setCategory("")
        setContent("")
    }

    const updateHandler = (e) => {
        e.preventDefault()

        if (!title || !content || !category) return
        dispatch(updateNoteAction(id, title, content, category))

    }

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteNoteAction(id))
        }
        navigate('/mynotes')
    }


    return (
        <MainScreen title='Edit Note'>
            <Card>
                <Card.Header>Edit your note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>

                        {loadingDelete && <Loading />}
                        {errorDelete && (<ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>)}


                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} placeholder='Enter the title' onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='content'>
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" value={content} placeholder='Enter the content' rows={4} onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>

                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' value={category} placeholder='Enter the category' onChange={(e) => setCategory(e.target.value)} />
                        </Form.Group>

                        {loading && <Loading size={50} />}

                        <Button type='submit' variant='primary'>Update Note</Button>

                        <Button className='mx-2' variant='danger' onClick={() => deleteHandler(id)}>Delete Note</Button>
                    </Form>
                </Card.Body>

                <Card.Footer className='text-muted'>
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default SingleNote