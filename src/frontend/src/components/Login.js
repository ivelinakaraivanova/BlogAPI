import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = () => {
        fetch('http://127.0.0.1:8000/dj-rest-auth/login/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(result => {
            if(result.key === undefined) {
                setError('Invalid username or password');
                return;
            }

            localStorage.setItem('myToken', result.key);
            navigate('/articles');
        })
    }

    return (
        <div className="container mt-4">
            <br/>

            {error 
            ?
                <div className="alert alert-warning allert-dismissible" role="alert">
                    {error}
                </div>    
            : 
                null
        }

            <h1>
                Please Login Here
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
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Please enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button onClick={login} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    )
}