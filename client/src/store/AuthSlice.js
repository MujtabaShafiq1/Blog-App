import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: { username: "", id: null, status: false },
}

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
        },
        logout: () => initialState
    }
})

export const AuthActions = AuthSlice.actions;
export default AuthSlice;