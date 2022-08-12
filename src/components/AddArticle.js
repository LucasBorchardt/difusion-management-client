import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddArticle(props) {



    const [categoriesArr, setCategoriesArr] = useState(null); //will store all categories from DB

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const [externalURL, setExternalURL] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [videoURL, setVideoURL] = useState("");

    const [errorMsg, setErrorMsg] = useState(undefined);

    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

console.log(category)

    const getAllCategories = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/categories`)
            .then((response) => setCategoriesArr(response.data))
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMsg("");

        const requestBody = {
            title,
            location,
            category,
            date,
            content,
            externalURL,
            imgURL,
            videoURL
        };

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/articles`,
                requestBody,
                {
                    headers: { Authorization: `Bearer ${storedToken}` }
                })
            .then((response) => {
                // props.refreshArticles();

                setTitle("");
                setLocation("");
                setCategory("");
                setDate("");
                setContent("");
                setExternalURL("");
                setImgURL("");
                setVideoURL("");

                navigate("/articles")
            })
            .catch((error) => {
                setErrorMsg("Error creating a new Article");
                console.log(error)
            });


    };
    return (
        <div className="AddArticle">
            <h1>Add Article</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <br />
                <div className="form-group">
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
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label for="exampleFormControlSelect1"><h6>Category</h6></label>
                    <select 
                        required
                        class="form-control"
                        id="exampleFormControlSelect1"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option ></option>
                        {categoriesArr && categoriesArr.map((element, index) => {
                            return <option value={element._id} >{element.title}</option>;
                        })}

                    </select>
                </div>
                <br />
                <input
                    type="date"
                    name='entry_date'
                    className="form-control"
                    id="entry_date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <br />
                <div class="form-group">
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="3"></textarea>
                </div>
                <br />
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>

        </div>
    )
}




export default AddArticle;