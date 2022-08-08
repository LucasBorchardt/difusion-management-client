import { useState } from "react";
import axios from "axios";

function AddArticle(props) {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const [externalURL, setExternalURL] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [videoURL, setVideoURL] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const storedToken = localStorage.getItem("authToken");

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
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {                
                props.refreshArticles();

                setTitle("");
                setLocation("");
                setCategory("");
                setDate("");
                setContent("");
                setExternalURL("");
                setImgURL("");
                setVideoURL("");
            })
            .catch((error) => {
                setErrorMsg("Error creating a new Article");
                console.log(error)
            });
    };
    return(
        <div className="AddArticle">
            
        </div>
    )
}




export default AddArticle;