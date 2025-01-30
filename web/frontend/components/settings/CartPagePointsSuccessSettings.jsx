import React, { useCallback, useState, useEffect } from "react";
import {
  Page,
  Layout,
  TextField,
  ColorPicker,
  Popover,
  Label,
  rgbString,
  hsbToRgb,
  LegacyCard,
  Checkbox,
} from "@shopify/polaris";
import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../../redux/actions/webiatorActions";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";

const CartPagePointsSuccessSettings = () => {
  const dispatch = useDispatch();
  const fetch = useAuthenticatedFetch();
  const { settingsData, settingsDataLoading, updateSettingsDataLoading } =
    useSelector((states) => states.webiator);
  const [bannerText, setBannerText] = useState(
    "You will earn [ POINTS-WITH-LABEL ] on this purchase!"
  );
  const [bannerPointLabel, setBannerPointLabel] = useState("Loyalty Points");
  const [bannerFontSize, setBannerFontSize] = useState(17);
  const [rgbColor, setRgbColor] = useState("rgb(255,255,255)");
  const [color, setColor] = useState({
    hue: 0,
    saturation: 0,
    brightness: 1,
    alpha: 1,
  });
  const [popoverActive, setPopoverActive] = useState(false);
  const [rgbTextColor, setRgbTextColor] = useState("rgb(0, 0, 0)");
  const [textColor, setTextColor] = useState({
    hue: 0,
    saturation: 0,
    brightness: 0,
    alpha: 1,
  });
  const [popoverActiveText, setPopoverActiveText] = useState(false);

  const [rgbBorderColor, setRgbBorderColor] = useState("rgb(0, 99, 14)");
  const [borderColor, setBorderColor] = useState({
    hue: 134,
    saturation: 1,
    brightness: 0.39,
    alpha: 1,
  });
  const [popoverActiveBorder, setPopoverActiveBorder] = useState(false);

  const [rgbBoxShadowColor, setRgbBoxShadowColor] =
    useState("rgba(0, 99, 14,.3)");
  const [boxShadowColor, setBoxShadowColor] = useState({
    hue: 134,
    saturation: 1,
    brightness: 0.39,
    alpha: 0.3,
  });
  const [popoverActiveBoxShadow, setPopoverActiveBoxShadow] = useState(false);

  const [rgbPointsTextColor, setRgbPointsTextColor] =
    useState("rgb(0, 99, 14)");
  const [pointsTextColor, setPointsTextColor] = useState({
    hue: 134,
    saturation: 1,
    brightness: 0.39,
    alpha: 1,
  });
  const [popoverActivePointsText, setPopoverActivePointsText] = useState(false);
  const [checkedBoldPoints, setCheckedBoldPoints] = useState(true);

  const [htmlString, setHtmlString] = useState(""); // New state to hold the HTML

  const handleTextChange = (value) => setBannerText(value);
  const handlePointLabelChange = (value) => setBannerPointLabel(value);
  const handleFontSizeChange = (value) => setBannerFontSize(value);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const togglePopoverActiveText = useCallback(
    () => setPopoverActiveText((popoverActiveText) => !popoverActiveText),
    []
  );

  const togglePopoverActiveBorder = useCallback(
    () => setPopoverActiveBorder((popoverActiveBorder) => !popoverActiveBorder),
    []
  );

  const togglePopoverActiveBoxShadow = useCallback(
    () =>
      setPopoverActiveBoxShadow(
        (popoverActiveBoxShadow) => !popoverActiveBoxShadow
      ),
    []
  );
  const togglePopoverActivePointsText = useCallback(
    () =>
      setPopoverActivePointsText(
        (popoverActivePointsText) => !popoverActivePointsText
      ),
    []
  );

  useEffect(() => {
    setHtmlString(settingsData?.cartSuccessHTML);
    setBannerText(settingsData?.cartSuccessBannerText);
    setBannerPointLabel(settingsData?.cartSuccessBannerPointLabel);
    setColor(settingsData?.cartSuccessBannerBgColor);
    setRgbColor(settingsData?.cartSuccessBannerBgColorRGB);
    setTextColor(settingsData?.cartSuccessBannerTextColor);
    setRgbTextColor(settingsData?.cartSuccessBannerTextColorRGB);
    setBorderColor(settingsData?.cartSuccessBannerBorderColor);
    setRgbBorderColor(settingsData?.cartSuccessBannerBorderColorRGB);
    setBoxShadowColor(settingsData?.cartSuccessBannerBoxShadowColor);
    setRgbBoxShadowColor(settingsData?.cartSuccessBannerBoxShadowColorRGB);
    setPointsTextColor(settingsData?.cartSuccessBannerPointsColor);
    setRgbPointsTextColor(settingsData?.cartSuccessBannerPointsColorRGB);
    setCheckedBoldPoints(settingsData?.cartSuccessBannerBoldPoints);
  }, [settingsData]);

  // Effect to construct the HTML string when state changes
  useEffect(() => {
    const newHtml = `
      <div style="
        background-color: ${rgbColor}; 
        color: ${rgbTextColor}; 
        padding: 20px; 
        margin-top:10px;
        border-radius: 5px; 
        border: 1px solid ${rgbBorderColor}; 
        text-align: center; 
        font-size: ${bannerFontSize}px; 
        line-height: ${Number(bannerFontSize) + 2}px; 
        box-shadow: ${rgbBoxShadowColor} 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;">
        <p style="margin:0">
          ${bannerText
            ?.replaceAll(
              "[ POINTS ]",
              `<span style="font-weight: ${
                checkedBoldPoints ? "bold" : "normal"
              };color:${rgbPointsTextColor}">[ POINTS ]</span>`
            )
            ?.replaceAll(
              "[ POINTS-WITH-LABEL ]",
              `<span style="font-weight: ${
                checkedBoldPoints ? "bold" : "normal"
              }; color:${rgbPointsTextColor}">[ POINTS-WITH-LABEL ]</span>`
            )}
        </p>
      </div>`;

    setHtmlString(newHtml); // Update the HTML string in the state
  }, [
    bannerText,
    bannerPointLabel,
    bannerFontSize,
    rgbColor,
    rgbTextColor,
    rgbBorderColor,
    rgbBoxShadowColor,
    checkedBoldPoints,
    rgbPointsTextColor,
  ]);

  return (
    <Layout>
      {/* Left Side - Input Settings */}
      <Layout.Section>
        <LegacyCard
          sectioned
          primaryFooterAction={{
            content: "Save",
            onAction: () => {
              dispatch(
                _dispatch_UPDATE_SETTINGS_DETAILS({
                  fetchFn: fetch,
                  inputs: {
                    loadingKey: "update_success_banner_Data",
                    cartSuccessHTML: htmlString,
                    cartSuccessBannerText: bannerText,
                    cartSuccessBannerPointLabel: bannerPointLabel,
                    cartSuccessBannerBgColor: color,
                    cartSuccessBannerBgColorRGB: rgbColor,
                    cartSuccessBannerTextColor: textColor,
                    cartSuccessBannerTextColorRGB: rgbTextColor,
                    cartSuccessBannerBorderColor: borderColor,
                    cartSuccessBannerBorderColorRGB: rgbBorderColor,
                    cartSuccessBannerBoxShadowColor: boxShadowColor,
                    cartSuccessBannerBoxShadowColorRGB: rgbBoxShadowColor,
                    cartSuccessBannerPointsColor: pointsTextColor,
                    cartSuccessBannerPointsColorRGB: rgbPointsTextColor,
                    cartSuccessBannerBoldPoints: checkedBoldPoints,
                    type: "settings-data",
                  },
                })
              );
            },
            loading: updateSettingsDataLoading?.update_success_banner_Data,

            disabled: settingsDataLoading,
          }}
        >
          <div className="custom_parent_div">
            <TextField
              label="Banner Text:"
              value={bannerText}
              onChange={handleTextChange}
              multiline={2}
              autoComplete="off"
              helpText={`Use [ POINTS ] to show points only (E.g. 20), and [ POINTS-WITH-LABEL ] to show points with label (E.g. 20 ${bannerPointLabel})`}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <div className="custom_parent_div" style={{ width: "50%" }}>
              <TextField
                label="Point Label:"
                value={bannerPointLabel}
                onChange={handlePointLabelChange}
                autoComplete="off"
              />
            </div>
            <div className="custom_parent_div" style={{ width: "50%" }}>
              <TextField
                label="Banner Font Size:"
                value={bannerFontSize}
                type="Number"
                onChange={handleFontSizeChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <div className="custom_parent_div" style={{ width: "50%" }}>
              <Label>Background Color:</Label>
              <Popover
                zIndexOverride={1000}
                active={popoverActive}
                sectioned={true}
                activator={
                  <div
                    style={{
                      background: rgbColor,
                      width: "100%",
                      minHeight: "40px",
                      borderRadius: "5px",
                      border: "1px solid #00000063",
                    }}
                    onClick={() => {
                      togglePopoverActive();
                    }}
                  >
                    {" "}
                  </div>
                }
                onClose={() => {
                  setRgbColor(rgbString(hsbToRgb(color)));
                  togglePopoverActive();
                }}
              >
                <Popover.Pane fixed>
                  <Popover.Section>
                    <div style={{ width: "200px", height: "200px" }}>
                      <ColorPicker
                        color={color}
                        onChange={(color) => {
                          setColor(color);
                          setRgbColor(rgbString(hsbToRgb(color)));
                        }}
                        allowAlpha
                      />
                    </div>
                  </Popover.Section>
                </Popover.Pane>
              </Popover>
            </div>
            <div className="custom_parent_div" style={{ width: "50%" }}>
              <Label>Text Color:</Label>
              <Popover
                zIndexOverride={1000}
                active={popoverActiveText}
                sectioned={true}
                activator={
                  <div
                    style={{
                      background: rgbTextColor,
                      width: "100%",
                      minHeight: "40px",
                      borderRadius: "5px",
                      border: "1px solid #00000063",
                    }}
                    onClick={() => {
                      togglePopoverActiveText();
                    }}
                  >
                    {" "}
                  </div>
                }
                onClose={() => {
                  setRgbTextColor(rgbString(hsbToRgb(textColor)));
                  togglePopoverActiveText();
                }}
              >
                <Popover.Pane fixed>
                  <Popover.Section>
                    <div style={{ width: "200px", height: "200px" }}>
                      <ColorPicker
                        color={textColor}
                        onChange={(color) => {
                          setTextColor(color);
                          setRgbTextColor(rgbString(hsbToRgb(color)));
                        }}
                        allowAlpha
                      />
                    </div>
                  </Popover.Section>
                </Popover.Pane>
              </Popover>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <div className="custom_parent_div" style={{ width: "50%" }}>
              <Label>Border Color:</Label>
              <Popover
                zIndexOverride={1000}
                active={popoverActiveBorder}
                sectioned={true}
                activator={
                  <div
                    style={{
                      background: rgbBorderColor,
                      width: "100%",
                      minHeight: "40px",
                      borderRadius: "5px",
                      border: "1px solid #00000063",
                    }}
                    onClick={() => {
                      togglePopoverActiveBorder();
                    }}
                  >
                    {" "}
                  </div>
                }
                onClose={() => {
                  setRgbBorderColor(rgbString(hsbToRgb(borderColor)));
                  togglePopoverActiveBorder();
                }}
              >
                <Popover.Pane fixed>
                  <Popover.Section>
                    <div style={{ width: "200px", height: "200px" }}>
                      <ColorPicker
                        color={borderColor}
                        onChange={(color) => {
                          setBorderColor(color);
                          setRgbBorderColor(rgbString(hsbToRgb(color)));
                        }}
                        allowAlpha
                      />
                    </div>
                  </Popover.Section>
                </Popover.Pane>
              </Popover>
            </div>
            <div className="custom_parent_div" style={{ width: "50%" }}>
              <Label>Box Shadow Color:</Label>
              <Popover
                zIndexOverride={1000}
                active={popoverActiveBoxShadow}
                sectioned={true}
                activator={
                  <div
                    style={{
                      background: rgbBoxShadowColor,
                      width: "100%",
                      minHeight: "40px",
                      borderRadius: "5px",
                      border: "1px solid #00000063",
                    }}
                    onClick={() => {
                      togglePopoverActiveBoxShadow();
                    }}
                  >
                    {" "}
                  </div>
                }
                onClose={() => {
                  setRgbBoxShadowColor(rgbString(hsbToRgb(boxShadowColor)));
                  togglePopoverActiveBoxShadow();
                }}
              >
                <Popover.Pane fixed>
                  <Popover.Section>
                    <div style={{ width: "200px", height: "200px" }}>
                      <ColorPicker
                        color={boxShadowColor}
                        onChange={(color) => {
                          setBoxShadowColor(color);
                          setRgbBoxShadowColor(rgbString(hsbToRgb(color)));
                        }}
                        allowAlpha
                      />
                    </div>
                  </Popover.Section>
                </Popover.Pane>
              </Popover>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <div className="custom_parent_div" style={{ width: "50%" }}>
              <Checkbox
                label="Make Points Bold"
                checked={checkedBoldPoints}
                onChange={() => setCheckedBoldPoints((prev) => !prev)}
              />
            </div>
            <div className="custom_parent_div" style={{ width: "50%" }}>
              <Label>Points Text Color:</Label>
              <Popover
                zIndexOverride={1000}
                active={popoverActivePointsText}
                sectioned={true}
                activator={
                  <div
                    style={{
                      background: rgbPointsTextColor,
                      width: "100%",
                      minHeight: "40px",
                      borderRadius: "5px",
                      border: "1px solid #00000063",
                    }}
                    onClick={() => {
                      togglePopoverActivePointsText();
                    }}
                  >
                    {" "}
                  </div>
                }
                onClose={() => {
                  setRgbPointsTextColor(rgbString(hsbToRgb(pointsTextColor)));
                  togglePopoverActivePointsText();
                }}
              >
                <Popover.Pane fixed>
                  <Popover.Section>
                    <div style={{ width: "200px", height: "200px" }}>
                      <ColorPicker
                        color={pointsTextColor}
                        onChange={(color) => {
                          setPointsTextColor(color);
                          setRgbPointsTextColor(rgbString(hsbToRgb(color)));
                        }}
                        allowAlpha
                      />
                    </div>
                  </Popover.Section>
                </Popover.Pane>
              </Popover>
            </div>
          </div>
        </LegacyCard>
      </Layout.Section>

      {/* Right Side - Sticky Preview Box */}
      <Layout.Section secondary>
        <div style={{ position: "sticky", top: "20px" }}>
          <LegacyCard title="Banner Preview">
            <LegacyCard.Section>
              <div
                style={{
                  backgroundColor: rgbColor,
                  color: rgbTextColor,
                  padding: "20px",
                  borderRadius: "5px",
                  border: `1px solid ${rgbBorderColor}`,
                  textAlign: "center",
                  fontSize: `${bannerFontSize}px`,
                  boxShadow: `${rgbBoxShadowColor} 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px`,
                }}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: bannerText
                      ?.replaceAll(
                        "[ POINTS ]",
                        `<span style="font-weight: ${
                          checkedBoldPoints ? "bold" : "normal"
                        };color:${rgbPointsTextColor}">20</span>`
                      )
                      ?.replaceAll(
                        "[ POINTS-WITH-LABEL ]",
                        `<span style="font-weight: ${
                          checkedBoldPoints ? "bold" : "normal"
                        }; color:${rgbPointsTextColor}" >20 ${bannerPointLabel}</span>`
                      ),
                  }}
                />
              </div>
            </LegacyCard.Section>
          </LegacyCard>
        </div>
      </Layout.Section>
    </Layout>
  );
};

export default CartPagePointsSuccessSettings;
