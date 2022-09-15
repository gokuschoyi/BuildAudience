import React, { useEffect } from 'react'
import axios from 'axios';
import BlogPost1 from './PublicTemplates/BlogPost1';
import BlogPost2 from './PublicTemplates/BlogPost2';
import BlogPost3 from './PublicTemplates/BlogPost3';
import { useParams } from "react-router-dom";
function Blogs() {
    const { id } = useParams();
    const [result, setResult] = React.useState('');
    const [error, setError] = React.useState('');
    const [template, setTemplate] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        var blogID = {
            uid: id
        }
        var res = axios.post(process.env.REACT_APP_BURL + '/blog_post/get_blog', blogID)
            .then(res => {
                setResult(res);
                setLoading(true)
            })
            .catch(err => {
                console.log(err);
                setError(err);
            })
    }, [id]);
    useEffect(() => {
        if (result) {
            setTemplate(result.data.template);
            console.log(template);
        }
    }, [result, template]);
    return (
        <>{!loading ?
            <div id="preloader">
                <div id="loader"></div>
            </div> :
            <>
                {template === 'BlogPost1' ? <BlogPost1 blogData={result.data.data} /> : ''}
                {template === 'BlogPost2' ? <BlogPost2 blogData={result.data.data} /> : ''}
                {template === 'BlogPost3' ? <BlogPost3 blogData={result.data.data} /> : ''}
            </>
        }
        </>
    )
}

export default Blogs