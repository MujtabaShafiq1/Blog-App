import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postSchema } from '../../utils/validationSchema';
import axios from 'axios'

import classes from "./CreatePost.module.css"
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useState } from 'react';

function CreatePost() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user)
    const [image, setImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const initialValues = {
        title: "",
        postText: "",
        username: user.username,
    };

    const onSubmit = async (data) => {
        try {
            const post = { ...data, image: image }
            await axios.post("http://localhost:3001/posts", post, {
                headers: { "accessToken": localStorage.getItem("accessToken") }
            })
            navigate("/")
        } catch (e) {
            console.log(e);
        }
    };

    const imageHandler = async (file) => {
        setSelectedImage(file.name)
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "blog-app");
        data.append("cloud_name", process.env.REACT_APP_CLOUD_UPLOAD);
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_UPLOAD}/image/upload`, data)
        setImage(response.data.url.toString());
    }

    return (
        <>
            <Card>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={postSchema}
                >
                    <Form className={classes.form}>
                        <div className={classes.control}>
                            <label>Title: </label>
                            <ErrorMessage name="title" component="span" />
                            <Field
                                autoComplete="off"
                                id="inputCreatePost"
                                name="title"
                                placeholder="(Ex. Title...)"
                            />
                        </div>
                        <div className={classes.control}>
                            <label>Post: </label>
                            <ErrorMessage name="postText" component="span" />
                            <Field
                                autoComplete="off"
                                as="textarea"
                                rows={4}
                                id="inputCreatePost"
                                name="postText"
                                placeholder="(Ex. Post...)"
                            />
                        </div>
                        <div>

                            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                                <Button type="button">
                                    <label htmlFor="upload">Upload Image</label>
                                    <input type="file" id="upload" hidden onChange={(e) => imageHandler(e.target.files[0])} />
                                </Button>
                                {selectedImage && <div><b>Selected Image: </b>{selectedImage}</div>}
                            </div>
                        </div>
                        <div className={classes.actions}>
                            <Button type="submit" disabled={!image}>Create Post</Button>
                        </div>
                    </Form>
                </Formik>
            </Card>
        </>
    );
}

export default CreatePost;