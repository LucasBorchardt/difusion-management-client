import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function ArticleDetailsPage(props) {
    const [article, setArticle] = useState(null);

    const { articleId } = useParams();


    const getArticle = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/articles/${articleId}`)
            .then((response) => {
                const oneArticle = response.data;
                setArticle(oneArticle);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getArticle();
    }, []);


    return (
        <div className="ArticleDetails">
            
        </div>
    );
}

export default ArticleDetailsPage;