import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupSchema } from "../utils/validationSchema";
import axios from "axios";

import classes from "../components/UI/AuthForm.module.css"
import Button from "../components/UI/Button";

const Registration = () => {

    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:3001/auth", data)
            navigate("/login");
            alert(`Please login ${data.username}`);
        } catch (e) {
            alert(e.response.data);
        }
    };

    return (

        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signupSchema}
        >
            <Form className={classes.form}>
                <div className={classes.control}>
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        name="username"
                        placeholder="Username"
                    />
                </div>
                <div className={classes.control}>
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit">Register</Button>
                </div>
            </Form>
        </Formik>

    )
}

export default Registration