import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { useDispatch } from "react-redux";
import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../../redux/actions/webiatorActions";
import useNavigateToHome from "../../hooks/useNavigateToHome";
import { useNavigate } from "react-router-dom";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chargeId, setChargeId] = useState(
    window.location.search.split("&")[0].split("=")[1]
  );
  const fetch = useAuthenticatedFetch();
  useEffect(() => {
    const getChargesByChargeID = async () => {
      const res = await fetch(`/api/getSubscriptionPlan${chargeId}`);
      const jsonData = await res.json();

      if (jsonData.status === "active") {
        dispatch(
          _dispatch_UPDATE_SETTINGS_DETAILS({
            fetchFn: fetch,
            inputs: {
              loadingKey: "update_form_Data",
              activePlanId: jsonData?.id,
              isPaidUser: true,
              type: "settings-data",
            },
          })
        );
        navigate("/");
      }
    };
    getChargesByChargeID();
  }, []);
  return <div>Subscription</div>;
};

export default index;
