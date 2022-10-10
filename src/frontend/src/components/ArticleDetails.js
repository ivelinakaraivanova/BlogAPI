import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export const ArticleDetails = () => {
    const params = useParams();
    const [article, setArticle] = useState({});

    const token = localStorage.getItem('myToken');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/articles/${params.slug}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(result => setArticle(result))
            .catch(error => console.log(error))
}, [params.slug])

return (

    <div className="container mt-4">
        <h1>{article.title}</h1>
        <h6>Published {article.published} by <i>{article.author}</i></h6>
        <br/>
        <p>{article.description}</p>
    </div>
)
}