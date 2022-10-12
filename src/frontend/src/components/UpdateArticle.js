import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ApiService from "../services/ApiService";

export const UpdateArticle = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('myToken');

    useEffect(() => {
        setTitle(props.article.title);
        setDescription(props.article.description);
    },[props.article]);

    const updateArticle = () => {

        ApiService.UpdateArticle(props.article.slug, { title, description }, token)
            .then(result => {
                props.updatedArticles(result);
                navigate('/articles');
            })
            .catch(error => console.log(error))
    };

    return (
        <div className="container mt-5">

            <h2>Update Article</h2>

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
                <button onClick={updateArticle} className="btn btn-success">
                    Update Article
                </button>
            </div>

        </div>
    )
}