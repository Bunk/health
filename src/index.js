import scriptLoader from "./scriptLoader";
import _state from "./state";
import _http from "./http";

export default ( robot, scripts ) => {
  return scriptLoader( robot, scripts );
};

// export const state = _state;
// export const http = _http;
