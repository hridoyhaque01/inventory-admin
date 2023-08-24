import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { setStoreData } from "../features/dashboard/dashboardSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    const storeData = localStorage?.getItem("storeData");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      const data = JSON.parse(storeData);
      const validUser = auth?.token && auth?.expireIn > Date.now();
      if (validUser) {
        dispatch(setUser(auth));
      }
      if (data) {
        dispatch(setStoreData(data));
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
