import { configureStore } from "@reduxjs/toolkit";

import credentials from "../features/credentials/credentials-slice";
import regist from "../features/credentials-regist/credential-regist";
export default configureStore({
  reducer: {
    credentials,
    regist,
  },
});
