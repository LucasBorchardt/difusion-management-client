import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCategory(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMsg("");

        const requestBody = { 
            title, 
            description
         };

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/categories`, 
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {                
                //  props.refreshCategories();

                setTitle("");
                setDescription("")

                navigate("/categories")
            })
            .catch((error) => {
                setErrorMsg("Error creating a new Category");
                console.log(error)
            });
    };
    return(
        <div className="AddCategory">
             <h1>Add Category</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <br />
                <div class="form-group">
                    <input 
                        required
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                    <input
                        required 
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>                
                <br />
                <button type="submit" class="btn btn-dark">Submit</button>
            </form>
        </div>
    )
}




export default AddCategory;