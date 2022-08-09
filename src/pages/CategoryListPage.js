import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCategory from "../components/AddCategory";


function CategoryListPage() {
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/categories`)
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllCategories();
    }, []);


    return (
        <div className="CategoryListPage">
        </div>
    );
}

export default CategoryListPage;