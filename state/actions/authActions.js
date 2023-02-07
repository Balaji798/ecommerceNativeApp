import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNumber = (dispatch, data) =>
  dispatch({ type: "LOGIN_REQUEST", user: data });
const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return { token };
};

export const updateUser = async (dispatch, user) => {
  try {
    return dispatch({ type: "FETCH_USER", user: user });
  } catch (e) {
    // Alert.alert(e.response?.data?.message || 'Something went wrong', 'Please try again later', [{ text: 'OK' }]);
  }
};

export const authSuccessful = (dispatch, user) => {
  return dispatch({ type: "LOGIN_SUCCESS", user });
};

export const authFailed = () => {
  return { type: "LOGIN_FAILURE" };
};

export const logout = (dispatch) => {
  AsyncStorage.clear();
  // setStore(dispatch, {});
  // setFlyerStore(dispatch, {});
  return dispatch({ type: "LOGOUT" });
};

export const setUserProfile = (dispatch, is_profile_completed) => {
  return dispatch({ type: "SET_USER_PROFILE", is_profile_completed });
};

export const setUserStatus = (dispatch, is_new_user = false) => {
  return dispatch({ type: "SET_USER_STATUS", is_new_user });
};
