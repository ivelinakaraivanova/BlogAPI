import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import ApiService from "../services/ApiService";

export const ArticleDetails = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState({});
    const [request, setRequest] = useState('');

    const token = localStorage.getItem('myToken');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/articles/${params.slug}/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => response.json())
            .then(result => setArticle(result))
            .catch(error => console.log(error))
    }, [params.slug, token]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/dj-rest-auth/user/',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => response.json())
            .then(result => setRequest(result))
            .catch(error => console.log(error))
    }, [token]);

    const updateBtn = (article) => {
        props.updateBtn(article)
    };

    const deleteBtn = (article) => {
        ApiService.DeleteArticle(article.slug, token)
            .then(() => {
                props.deleteBtn(article);
                navigate('/articles');
            })
            .catch(error => console.log(error))
    };

    const formatPublishedDate = Moment(article.published).format('DD-MM-YYYY');

    return (

        <div className="container mt-4">
            <h1>{article.title}</h1>
            <h6>Published {formatPublishedDate} by <i>{article.author}</i></h6>
            <br />
            <p>{article.description}</p>

            {request.username === article.author
                ?
                <>
                    <button onClick={() => deleteBtn(article)} className="btn btn-danger mx-3 mt-3">Delete</button>
                    <Link to='/update'><button onClick={() => updateBtn(article)} className="btn btn-success mx-3 mt-3">Update</button></Link>
                </>
                :
                null
            }
        </div>
    )
}