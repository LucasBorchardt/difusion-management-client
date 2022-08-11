import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";



function CategoryListPage() {
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/categories`)
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllCategories();
    }, []);


    return (
        <div className="CategoryListPage">
            <button type="button" class="btn btn-dark"><NavLink as={Link} to={`/categories/add`}><p className="text-white m-0">Add new Category</p></NavLink></button>
            {categories && categories.map(category => {
                return(
                    <>
                    <div class="card w-75">
                            <div class="card-body">
                                <h4 class="card-title">{category.title}</h4>
                                <h6 class="card-location">{category.location}</h6>                               
                                
                            </div>
                        </div>
                    </>
                )
            })}
            
        </div>
    );
}

export default CategoryListPage;