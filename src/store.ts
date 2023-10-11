import { configureStore } from "@reduxjs/toolkit";
import { quoteSlice,  } from "./stateSlices/quoteSlice";

export const store = configureStore({
  reducer: {
    // ...

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
