import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

function ArticleListPage() {
    const [articles, setArticles] = useState(null);

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
            <button type="button" class="btn btn-dark"><NavLink as={Link} to={`/articles/add`}><p className="text-white m-0">Add new Article</p></NavLink></button>
            {articles && articles.map(article => {
                return (

                    <>
                        
                        <div class="card w-75">
                            <div class="card-body">
                                <h4 class="card-title">{article.title}</h4>
                                <h6 class="card-location">{article.location}</h6>
                                
                                <button type="button" class="btn btn-dark"><NavLink as={Link} to={`/articles/_id`}><p className="text-white m-0">More Details</p></NavLink></button>
                            </div>
                        </div>
                    </>
                )
            })
            }
        </div>
    );
}

export default ArticleListPage;