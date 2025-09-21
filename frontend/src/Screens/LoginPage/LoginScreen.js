import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import Loading from '../../components/Loading'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

import './LoginScreen.css'
import ErrorMessage from '../../components/ErrorMessage';
const LoginScreen = ({ history }) => {
    // const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)

    const { loading, error, userInfo } = userLogin

    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes')
        }
    }, [navigate, userInfo])


    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <MainScreen title="LOGIN">
            <div className='loginContainer'>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        New Here? <Link to='/register'>Register Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>

    )
}

export default LoginScreen