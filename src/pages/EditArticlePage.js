import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT 


function EditArticlePage(props) {

    const [categoriesArr, setCategoriesArr] = useState(null);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const [externalURL, setExternalURL] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [videoURL, setVideoURL] = useState("");


    const { articleId } = useParams(); //  // Get the URL parameter `:projectId` 
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

       

    // This effect will run after the initial render and each time
    // the project id coming from URL parameter `projectId` changes
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/articles/${articleId}`)
            .then((response) => {
                /* 
                  We update the state with the project data coming from the response.
                  This way we set inputs to show the actual title and description of the project
                */
                const oneArticle = response.data;
                setTitle(oneArticle.title);                
                setLocation(oneArticle.Location);
                setCategory(oneArticle.Category);
                setDate(oneArticle.Date);
                setContent(oneArticle.Content);
                setExternalURL(oneArticle.ExternalURL);
                setImgURL(oneArticle.ImgURL);
                setVideoURL(oneArticle.VideoURL);
            })
            .catch((error) => console.log(error));

    }, [articleId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the body of the PUT request
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

        // Make a PUT request to update the project
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/articles/${articleId}`, 
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // Once the request is resolved successfully and the project
                // is updated we navigate back to the details page
                navigate(`/articles/${articleId}`)
            });
    };
    const getAllCategories = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/categories`)
            .then((response) => setCategoriesArr(response.data))
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="EditArticlePage">
            <h1>Edit Article</h1>
            <br />
            <form onSubmit={handleFormSubmit}>
                <br />
                <div class="form-group">
                    <input type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                    <input type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <br />
                <div class="form-group">
                    <label for="exampleFormControlSelect1"><h6>Category</h6></label>
                    <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>

                        {categoriesArr && categoriesArr.map(element => {
                            return <option value={element._id}>{element.title}</option>;
                        })}

                    </select>
                </div>
                <br />
                <input
                    type="date"
                    name='entry_date'
                    class="form-control"
                    id="entry_date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <br />
                <div class="form-group">
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="3"></textarea>
                </div>
                <br />
                <button type="submit" class="btn btn-dark">Submit</button>
            </form>
            
        </div>
    );
}

export default EditArticlePage;

