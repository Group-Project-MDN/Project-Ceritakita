import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password1: "",
  password2: "",
};

export const credentialsSlice = createSlice({
  name: "regist",
  initialState,
  reducers: {
    setName(state, inputName) {
      state.name = inputName;
    },
    setEmail(state, inputEmail) {
      state.email = inputEmail;
    },
    setPassword1(state, inputPassword1) {
      state.password1 = inputPassword1;
    },
    setPassword2(state, inputPassword2) {
      state.password2 = inputPassword2;
    },
  },
});

export const { setName, setEmail, setPassword1, setPassword2 } =
  credentialsSlice.actions;
export default credentialsSlice.reducer;
