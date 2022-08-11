import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";


function ArticleDetailsPage(props) {
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");
    const { articleId } = useParams();

    
    
    const getArticle = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/articles/${articleId}`)
            .then((response) => {
                
                console.log(response)
                const oneArticle = response.data;
                setArticle(oneArticle);
                
            })
            .catch((error) => console.log(error));
    };

    const deleteArticle = () => {
        axios
            .delete(
                `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(() => {
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getArticle();
    }, []);


    return (
        <div className="ArticleDetailsPage">
            {article && 
            
            <div class="card w-75">
                <div class="card-body">
                    <h4 class="card-title">{article.title}</h4>
                    <h6 class="card-Location">{article.location}</h6>
                    <h6 class="card-Category">{article.category.title}</h6>
                    <p class="card-content">{article.content}</p>
                    <button type="button" onClick={deleteArticle} class="btn btn-dark">Delete</button>
                    <button type="button" class="btn btn-dark"><NavLink as={Link} to={`/articles/:articleId/edit`}><p className="text-white m-0">Edit Details</p></NavLink></button>
                </div>
            </div>
            }

        </div>
    );
}

export default ArticleDetailsPage;