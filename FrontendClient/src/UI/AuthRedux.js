import { createSlice  } from "@reduxjs/toolkit"


const LoginInitialState = {
    authentication: false
} 

const authSlice = createSlice({
    name: 'authentication',
    initialState: LoginInitialState,
    reducers: {
        login(state) {
            state.authentication = true;
        },
        logout(state) {
            state.authentication = false;
            localStorage.removeItem('userData');
            localStorage.removeItem('room');
        }
    }
})
export default authSlice;

export const authAction = authSlice.actions;