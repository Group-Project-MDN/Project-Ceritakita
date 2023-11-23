import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    setEmail(state, inputEmail) {
      state.email = inputEmail;
    },
    setPassword(state, inputPassword) {
      state.password = inputPassword;
    },
  },
});

export const { setEmail, setPassword } = credentialsSlice.actions;
export default credentialsSlice.reducer;
