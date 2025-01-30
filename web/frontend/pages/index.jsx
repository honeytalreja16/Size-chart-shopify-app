import { Page, Layout, Frame, Loading } from "@shopify/polaris";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../redux/actions/webiatorActions";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

export default function HomePage() {
  const navigate = useNavigate();
  const { settingsData } = useSelector((states) => states.webiator);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    if (settingsData) {
      if (settingsData?.firstVisit) {
        console.log("its first visit");
        navigate("/settings?firstVisit=true");
        dispatch(
          _dispatch_UPDATE_SETTINGS_DETAILS({
            fetchFn: fetch,
            inputs: {
              loadingKey: "update_form_Data",
              firstVisit: false,
              type: "settings-data",
            },
          })
        );
      } else {
        navigate("/settings");
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [settingsData]);

  return (
    <Frame>
      {loading && <Loading />}
      <Page narrowWidth>
        <Layout>
          <Layout.Section></Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
