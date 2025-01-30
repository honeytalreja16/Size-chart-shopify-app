import React, { useCallback, useEffect, useState } from "react";
import { Frame, Toast } from "@shopify/polaris";
import { useSelector } from "react-redux";

const index = () => {
  const [activeToast, setActiveToast] = useState(false);
  const [isToastError, setIsToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    settingsData,
    settingsDataLoading,
    dashboardPageBannerSuccessErrorMessage,
  } = useSelector((states) => states.webiator);
  const toggleActiveToast = useCallback(
    () => setActiveToast((activeToast) => !activeToast),
    []
  );

  const toastMarkup = activeToast ? (
    <Toast
      content={toastMessage}
      error={isToastError}
      onDismiss={toggleActiveToast}
      duration={3000}
    />
  ) : null;
  useEffect(() => {
    if (dashboardPageBannerSuccessErrorMessage) {
      dashboardPageBannerSuccessErrorMessage?.status !== "success"
        ? setIsToastError(true)
        : setIsToastError(false);
      setToastMessage(dashboardPageBannerSuccessErrorMessage?.message);

      toggleActiveToast();
    }
  }, [dashboardPageBannerSuccessErrorMessage]);
  return <Frame>{toastMarkup}</Frame>;
};

export default index;
