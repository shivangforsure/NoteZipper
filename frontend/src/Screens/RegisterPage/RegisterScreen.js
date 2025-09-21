import React, { useDebugValue, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import Loading from '../../components/Loading'
import { Link, useNavigate } from 'react-router-dom';
import '../../Screens/LoginPage/LoginScreen.css'
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pic, setPic] = useState("https://thumbs.dreamstime.com/b/user-sign-icon-person-symbol-human-avatar-rich-man-84519083.jpg")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [picMessage, setPicMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const navigate = useNavigate()
    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes')
        }
    }, [history, userInfo])
    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            setMessage("Passwords do not match")
        }
        else {
            dispatch(register(name, email, password, pic))
        }
    }

    const postDetails = (pics) => {
        if (!pics) {
            return setPicMessage("Please  Select an Image")
        }
        setPicMessage(null)

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData()
            data.append('file', pics)
            data.append('upload_preset', 'note zipper')
            data.append('cloud_name', 'dct27dv64')

            fetch("https://api.cloudinary.com/v1_1/dct27dv64/image/upload", {
                method: "post",
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setPic(data.secure_url.toString())
                })
                .catch((err) => { console.log(err) })
        }
        else {
            return setPicMessage("Please Select an Image")
        }

    }

    return (
        <MainScreen title="REGISTER">
            <div className='loginContainer'>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>

                    {picMessage && (<ErrorMessage variant='danger'>{picMessage}</ErrorMessage>)}
                    <Form.Group controlId="pic" className="mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        Already Have an Account? <Link to='/login'>Login Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen >
    )
}

export default RegisterScreen