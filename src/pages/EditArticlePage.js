import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT 


function EditArticlePage(props) {
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


    return (
        <div className="EditArticlePage">
            
        </div>
    );
}

export default EditArticlePage;