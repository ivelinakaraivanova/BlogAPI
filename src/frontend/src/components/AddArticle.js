import { useState } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from 'react-router-dom';

export const AddArticle = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('myToken');

    const addArticle = () => {

        if (title === '' || description === '') {
            setError('Please add all fields');
            return;
        }

        ApiService.InsertArticle({ title, description }, token)
            .then(result => {
                props.insertedArticle(result);
                navigate('/articles');
            })
    };

    return (
        <div className="container mt-5">

            {error
                ?
                <div className="alert alert-warning allert-dismissible" role="alert">
                    {error}
                </div>
                :
                null
            }

            <h2>Add Article</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Please enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

            </div>

            <div className="mb-3">
                <textarea
                    type="description"
                    className="form-control"
                    rows={5}
                    name="description"
                    placeholder="Please enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <button onClick={addArticle} className="btn btn-success">
                    Add Article
                </button>
            </div>

        </div>
    )
}