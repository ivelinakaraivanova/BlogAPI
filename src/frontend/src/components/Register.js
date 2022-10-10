import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import ApiService from "../services/ApiService";

export const Register = () => {

const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password1, setPassword1] = useState('');
const [password2, setPassword2] = useState('');
let navigate = useNavigate();

const register = () => {
    ApiService.RegisterUser({username,email, password1, password2})
    .then(() => navigate('/'))
    .catch(error => console.log(error))
}

    return (
        <div className="container mt-4">
            {/* <br/>

            {error 
            ?
                <div className="alert alert-warning allert-dismissible" role="alert">
                    {error}
                </div>    
            : 
                null
        } */}

            <h1>
                Register Here
            </h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Please enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Please enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    name="password1"
                    placeholder="Please enter password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    name="password2"
                    placeholder="Please confirm password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
            </div>

            <div>
                <button onClick={register}className="btn btn-success">
                    Register
                </button>
            </div>
        </div>
    )
}