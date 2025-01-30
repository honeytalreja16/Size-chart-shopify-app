import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { Banner, Page } from "@shopify/polaris";
import { useSelector } from "react-redux";

const AppEmbedEnable = () => {
  const { settingsData, settingsDataLoading, updateSettingsDataLoading } =
    useSelector((states) => states.webiator);
  const [isBLockEnabled, setIsBlockEnabled] = useState(false);
  const [storeDomain, setStoreDomain] = useState(null);
  const fetch = useAuthenticatedFetch();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    setStoreDomain(settingsData?.store_domain);
  }, [settingsData]);
  useEffect(() => {
    const getAssetFile = async () => {
      try {
        const res = await fetch("/api/getAssetFile");
        const resjson = await res.json();
        let jsonData = JSON.parse(resjson.data[0].value);
        let allBocks = jsonData.current.blocks;
        const result = Object.entries(allBocks)
          .filter(([key, value]) =>
            value.type.includes("smartchat-multi-channel-sync")
          )
          .reduce((obj, [key, value]) => {
            obj = value;
            return obj;
          }, {});
        setIsBlockEnabled(result.disabled);
      } catch (error) {}
    };
    getAssetFile();
  }, []);

  const uuid = "8e5787bf-37a3-483f-8c22-a7540d1d4b48";
  const handle = "Smart-multi-chat";

  return (
    <div style={{ marginBottom: "10px" }}>
      {isBLockEnabled !== false && (
        <Banner
          title="SEO settings won’t be applied to your store"
          action={{
            content: "Activate Embeds",
            onAction: () => {
              const url = `https://${storeDomain}/admin/themes/current/editor?context=apps&appEmbed=${uuid}/${handle}`;
              window.open(url);
            },
          }}
          status="warning"
        >
          {" "}
          Activate app embeds in your store theme to enable the SEO
          optimizations.
        </Banner>
      )}
      {isBLockEnabled == false && showBanner && (
        <Banner
          title="Enjoying the App"
          onDismiss={() => {
            setShowBanner(false);
          }}
          action={{
            content: "Leave a review",
            onAction: () => {
              // const url = ``;
              // window.open(url);
            },
          }}
          status="info"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>We would highly appreciate getting a review!</span>
          </div>
        </Banner>
      )}
    </div>
  );
};

export default AppEmbedEnable;
