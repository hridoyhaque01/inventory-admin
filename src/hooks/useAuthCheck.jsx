import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { setStoreData } from "../features/dashboard/dashboardSlice";
import { setActiveTab } from "../features/store/storeSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const { activeTab } = useSelector((state) => state.store);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    const storeData = localStorage?.getItem("storeData");
    const storeTab = localStorage?.getItem("activeTab");

    if (storeTab) {
      dispatch(setActiveTab(storeTab));
    } else if (!storeTab && !activeTab) {
      dispatch(setActiveTab("store0"));
    }

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
