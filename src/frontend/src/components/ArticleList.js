// import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';


export function ArticleList({articles}) {

    return (
        <div>
            {articles[0] && articles.map(article => {
                return (
                    <div className='container mt-3' key={article.id}>
                        <span className='badge rounded-pill bg-success'>Author: {article.author}</span>
                        <h2><Link to={`/articles/${article.slug}/`} className='link-style'>{article.title}</Link></h2>
                    </div>
                )
            })}
        </div>
    )
}