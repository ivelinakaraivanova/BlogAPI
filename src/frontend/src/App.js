import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ArticleList } from './components/ArticleList';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { ArticleDetails } from './components/ArticleDetails';
import { AddArticle } from './components/AddArticle';
import { Register } from './components/Register';

function App() {

    const [articles, setArticles] = useState([]);

    const token = localStorage.getItem('myToken');

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/articles/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(result => setArticles(result))
            .catch(error => console.log(error))
    }, [token]);

    useEffect(() => {
        if (!token) {
            navigate('/')
            return;
        }

        navigate('/articles');
    }, [token]);

    const insertedArticle = (article) => {
        const new_articles = [...articles, article]
        setArticles(new_articles)
    }


    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/articles' element={<ArticleList articles={articles}/>}></Route>
                <Route path='/articles/:slug' element={<ArticleDetails />}></Route>
                <Route path='/add' element={<AddArticle insertedArticle={insertedArticle} />}></Route>
                <Route path='/register' element={<Register />}></Route>

            </Routes>
        </>
    );
}

export default App;
