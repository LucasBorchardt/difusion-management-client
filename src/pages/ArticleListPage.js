import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddArticle from "../components/AddArticle";


function ArticleListPage() {
    const [articles, setArticles] = useState([]);

    const getAllArticles = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/articles`)
            .then((response) => setArticles(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllArticles();
    }, []);


    return (
        <div className="ArticleListPage">
        </div>
    );
}

export default ArticleListPage;