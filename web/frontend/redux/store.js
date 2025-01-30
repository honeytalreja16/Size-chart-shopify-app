import { configureStore } from "@reduxjs/toolkit";
import webiatorReducers from "./reducers/webiatorSlice";

// Store
export const store = configureStore({
  reducer: {
    webiator: webiatorReducers,
  },
});
