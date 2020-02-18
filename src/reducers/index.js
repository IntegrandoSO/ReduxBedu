import { combineReducers } from "redux";
import usuarios from "./usuarios";
import publicacionesreducers from "./publicacionesreducers";
import tareasReducer from "./tareasreducer";

export default combineReducers({
  usuarios,
  publicacionesreducers,
  tareasReducer
});
