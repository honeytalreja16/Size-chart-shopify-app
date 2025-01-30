import { Banner } from "@shopify/polaris";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _DASHBOARD_PAGE_BANNER } from "../../redux/reducers/webiatorSlice";

const DashboardErrorSuccessBanner = () => {
  const dispatch = useDispatch();

  const { dashboardPageBannerSuccessErrorMessage } = useSelector(
    (states) => states.webiator
  );

  useEffect(() => {
    if (dashboardPageBannerSuccessErrorMessage) {
      setTimeout(() => {
        dispatch(_DASHBOARD_PAGE_BANNER(null));
      }, [3000]);
    }
  }, [dashboardPageBannerSuccessErrorMessage]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <Banner
        title={dashboardPageBannerSuccessErrorMessage?.message}
        status={dashboardPageBannerSuccessErrorMessage?.status}
        onDismiss={() => {
          dispatch(_DASHBOARD_PAGE_BANNER(null));
        }}
      >
        {dashboardPageBannerSuccessErrorMessage?.errors
          ?.filter((x, index) => index < 5)
          .map((x, index) => (
            <p key={index}>{x}</p>
          ))}
      </Banner>
    </div>
  );
};

export default DashboardErrorSuccessBanner;
