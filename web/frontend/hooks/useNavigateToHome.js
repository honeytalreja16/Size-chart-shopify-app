import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useNavigateToHome = () => {
  const navigate = useNavigate();

  const { settingsData, settingsDataLoading } = useSelector(
    (states) => states.webiator
  );

  useEffect(() => {
    // if (settingsDataLoading !== undefined) {
    // condition for paid user or paid version of app
    // if (!settingsData?.paid_user) {
    navigate("/");
    // }
    // }
  }, []);
};

export default useNavigateToHome;
