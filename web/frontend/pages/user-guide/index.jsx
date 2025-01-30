import { MediaCard, Page } from "@shopify/polaris";

const index = () => {
  const handleDownloadClick = () => {
    const pdfUrl = "../../assets/webiators-product-label-user-guide.pdf";
    const anchorElement = document.createElement("a");
    anchorElement.href = pdfUrl;
    anchorElement.download = "Webiator-user-guide.pdf";
    anchorElement.click();
  };

  return (
    <Page>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <MediaCard
          title="User Manual"
          primaryAction={{
            content: "Download ",
            onAction: () => {
              handleDownloadClick();
            },
          }}
          description="Click Download button to download our user manual."
          size="medium"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              alt=""
              width="120px"
              height="120px"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="../../assets/user guide.png"
            />
          </div>
        </MediaCard>
      </div>
    </Page>
  );
};

export default index;
