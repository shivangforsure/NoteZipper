import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNoteAction, listNotes } from '../../actions/notesActions'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'

const CreateNote = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const noteCreate = useSelector((state) => state.noteCreate)
    // const { success: successCreate } = noteCreate
    const { loading, error, note, success } = noteCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    console.log(note)

    useEffect(() => {
        // dispatch(listNotes())
        // if (!userInfo) {
        //     navigate('/')
        // }
        if (success) {
            dispatch(listNotes())  // refresh notes
            resetHandler()
            navigate('/mynotes')
        }
    }, [success, dispatch, navigate])
    console.log(note)

    const resetHandler = () => {
        setTitle("")
        setCategory("")
        setContent("")
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (!title || !content || !category) return
        dispatch(createNoteAction(title, content, category))

        resetHandler()
        navigate('/mynotes')
    }
    return (
        <MainScreen title='Create a Note'>
            <Card>
                <Card.Header>Create a new Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
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

                        <Button type='submit' variant='primary'>Create Note</Button>

                        <Button className='mx-2' onClick={resetHandler} variant='danger'>Reset Fields</Button>
                    </Form>
                </Card.Body>
            </Card>
        </MainScreen>
    )
}

export default CreateNote