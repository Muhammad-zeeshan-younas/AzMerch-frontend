import { combineReducers } from "redux";
import modalSlices from "./slices/modalSlices";
import userSlice from "./slices/userSlice";

interface RootState {
  user: ReturnType<typeof userSlice>;
  modal: ReturnType<typeof modalSlices>;
}

const rootReducer = combineReducers({
  user: userSlice,
  modal: modalSlices,
});

export default rootReducer;

export type { RootState };
