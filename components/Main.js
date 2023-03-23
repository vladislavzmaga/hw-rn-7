import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  const routing = useRoute(stateChange);
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
