import { Formik, Form, Field, ErrorMessage } from "formik";
import { commentSchema } from "../../utils/validationSchema"

import classes from './NewCommentForm.module.css';
import Button from '../UI/Button'

const NewCommentForm = ({ id, post }) => {

  const initialValues = {
    comment: "",
  };

  const submitFormHandler = (data, { resetForm }) => {
    post({ commentBody: data.comment, PostId: id });
    resetForm()
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitFormHandler}
      validationSchema={commentSchema}
    >
      <Form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor='comment'>Your Comment</label>
          <ErrorMessage name="comment" component="span" />
          <Field
            id="inputComment"
            name="comment"
            placeholder="(Ex. Good Post...)"
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit">Post Comment</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default NewCommentForm;
