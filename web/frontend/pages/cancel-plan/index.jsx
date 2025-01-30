import React, { useEffect } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { useDispatch } from "react-redux";
import { useNavigate } from "@shopify/app-bridge-react";
import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../../redux/actions/webiatorActions";
const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();
  useEffect(() => {
    const cancelPlan = async () => {
      dispatch(
        _dispatch_UPDATE_SETTINGS_DETAILS({
          fetchFn: fetch,
          inputs: {
            loadingKey: "update_form_Data",
            activePlanId: "",
            isPaidUser: false,
            type: "settings-data",
          },
        })
      );
      navigate("/plans");
    };
    cancelPlan();
  }, []);
  return <div>Updating Plan...... </div>;
};

export default index;
