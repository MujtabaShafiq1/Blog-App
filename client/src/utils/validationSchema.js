import * as Yup from "yup";

export const postSchema = Yup.object().shape({
    title: Yup.string().min(3).max(15).required("You must input a Title!"),
    postText: Yup.string().min(3).max(350).required("You must input post Text!"),
});

export const signupSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("You must input a Username!"),
    password: Yup.string().min(4).max(20).required("You must input a Password!"),
});

export const commentSchema = Yup.object().shape({
    comment: Yup.string().min(3).max(40).required("You must input a Comment!"),
});