import {
  ColorPicker,
  hsbToRgb,
  Icon,
  Label,
  Layout,
  LegacyCard,
  LegacyStack,
  Page,
  Popover,
  rgbString,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { AlertCircleIcon } from "@shopify/polaris-icons";

const ProductPagePointsSettings = () => {
  const [value, setValue] = useState("Badge");
  const dispatch = useDispatch();
  const fetch = useAuthenticatedFetch();
  const { settingsData, settingsDataLoading, updateSettingsDataLoading } =
    useSelector((states) => states.webiator);
  const [bannerText, setBannerText] = useState("[ POINTS-WITH-LABEL ] ");
  const [bannerPointLabel, setBannerPointLabel] = useState("Loyalty Points");
  const [bannerFontSize, setBannerFontSize] = useState(17);
  const [rgbColor, setRgbColor] = useState("rgb(0, 0, 0)");
  const [color, setColor] = useState({
    hue: 0,
    saturation: 0,
    brightness: 0,
    alpha: 1,
  });
  const [popoverActive, setPopoverActive] = useState(false);
  const [rgbTextColor, setRgbTextColor] = useState("rgb(255, 255, 255)");
  const [textColor, setTextColor] = useState({
    hue: 0,
    saturation: 0,
    brightness: 1,
    alpha: 1,
  });
  const [popoverActiveText, setPopoverActiveText] = useState(false);

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

  const handleChange = (e) => {
    setValue(e.target.id);
  };

  useEffect(() => {
    console.log(settingsData, "settings data");
  }, [settingsData]);
  return (
    <Layout>
      {/* Left Side - Input Settings */}
      <Layout.Section oneThird>
        <LegacyCard
          primaryFooterAction={{
            content: "Save",
            onAction: () => {
              console.log(settingsData, "settings data--");
            },
          }}
          sectioned
          title="Product Page Points Configurations"
        >
          <LegacyCard.Section>
            <div className="custom_parent_div">
              <TextField
                label="Text to Show:"
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
          </LegacyCard.Section>
          <LegacyCard.Section>
            <Label>Select Point Type:</Label>
            <div class="radio-buttons">
              <label class="custom-radio">
                <input
                  type="radio"
                  id="Badge"
                  name="radio"
                  onClick={handleChange}
                  checked={value === "Badge"}
                />
                <span class="radio-btn">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      width="50px"
                      height="50px"
                    >
                      <path
                        fill="#ee3e54"
                        d="M13 27A2 2 0 1 0 13 31A2 2 0 1 0 13 27Z"
                      />
                      <path
                        fill="#009999"
                        d="M77 12A1 1 0 1 0 77 14A1 1 0 1 0 77 12Z"
                      />
                      <path
                        fill="#009999"
                        d="M50 13A37 37 0 1 0 50 87A37 37 0 1 0 50 13Z"
                      />
                      <path
                        fill="#009999"
                        d="M83 11A4 4 0 1 0 83 19A4 4 0 1 0 83 11Z"
                      />
                      <path
                        fill="#ee3e54"
                        d="M87 22A2 2 0 1 0 87 26A2 2 0 1 0 87 22Z"
                      />
                      <path
                        fill="#009999"
                        d="M81 74A2 2 0 1 0 81 78 2 2 0 1 0 81 74zM15 59A4 4 0 1 0 15 67 4 4 0 1 0 15 59z"
                      />
                      <path
                        fill="#ee3e54"
                        d="M25 85A2 2 0 1 0 25 89A2 2 0 1 0 25 85Z"
                      />
                      <path
                        fill="#fff"
                        d="M18.5 51A2.5 2.5 0 1 0 18.5 56A2.5 2.5 0 1 0 18.5 51Z"
                      />
                      <path
                        fill="#009999"
                        d="M21 66A1 1 0 1 0 21 68A1 1 0 1 0 21 66Z"
                      />
                      <path
                        fill="#fff"
                        d="M80 33A1 1 0 1 0 80 35A1 1 0 1 0 80 33Z"
                      />
                      <path
                        fill="#fff"
                        d="M72.4,44v20.4c0,4.3-3.5,7.8-7.8,7.8H35.5c-4.3,0-7.8-3.5-7.8-7.8V35.6c0-4.3,3.5-7.8,7.8-7.8h29.1 c3.6,0,6.6,2.4,7.6,5.8"
                      />
                      <path
                        fill="#472b29"
                        d="M64.5,73H35.5c-4.7,0-8.5-3.8-8.5-8.5V35.6c0-4.7,3.8-8.5,8.5-8.5h29.1c3.8,0,7.2,2.6,8.2,6.3 c0.1,0.4-0.1,0.8-0.5,0.9c-0.4,0.1-0.8-0.1-0.9-0.5c-0.9-3.1-3.7-5.2-6.9-5.2H35.5c-3.9,0-7.1,3.2-7.1,7.1v28.8 c0,3.9,3.2,7.1,7.1,7.1h29.1c3.9,0,7.1-3.2,7.1-7.1V44c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v20.4C73.1,69.1,69.2,73,64.5,73z"
                      />
                      <path
                        fill="#472b29"
                        d="M68.5 59.4c-.3 0-.5-.2-.5-.5V55c0-.3.2-.5.5-.5S69 54.7 69 55v3.9C69 59.2 68.8 59.4 68.5 59.4zM68.5 52.5c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5S69 49.7 69 50v2C69 52.3 68.8 52.5 68.5 52.5z"
                      />
                      <path
                        fill="#472b29"
                        d="M64,69H36c-2.8,0-5-2.2-5-5V36c0-2.8,2.2-5,5-5h25.4c0.3,0,0.5,0.2,0.5,0.5S61.7,32,61.4,32H36 c-2.2,0-4,1.8-4,4v28c0,2.2,1.8,4,4,4h28c2.2,0,4-1.8,4-4v-2.4c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5V64C69,66.8,66.8,69,64,69z"
                      />
                      <g>
                        <path
                          fill="#00ac9c"
                          d="M49.5,62.5l-0.1,0c-0.1,0-0.1,0-0.2,0c-0.4,0-0.8-0.1-1-0.4l-8.3-8.2c-0.3-0.3-0.4-0.6-0.4-1s0.2-0.8,0.4-1 c0.3-0.3,0.6-0.4,1-0.4c0.4,0,0.8,0.2,1,0.4l7.1,7.4l24-23.3c0.3-0.3,0.6-0.4,1-0.4c0.4,0,0.8,0.2,1,0.4c0.3,0.3,0.4,0.6,0.4,1 s-0.2,0.8-0.4,1L50.6,62.1c-0.1,0.1-0.2,0.2-0.4,0.3c0,0-0.1,0-0.1,0.1c-0.1,0-0.2,0.1-0.3,0.1C49.7,62.5,49.7,62.5,49.5,62.5 L49.5,62.5z"
                        />
                        <path
                          fill="#472b29"
                          d="M74.2,36c0.3,0,0.5,0.1,0.7,0.3c0.4,0.4,0.4,1,0,1.4l-24.6,24c-0.1,0.1-0.2,0.1-0.3,0.2c0,0-0.1,0-0.1,0 c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.5-0.1-0.7-0.3l-8.3-8.2 c-0.4-0.4-0.4-1,0-1.4c0.2-0.2,0.4-0.3,0.7-0.3s0.5,0.1,0.7,0.3l7.5,7.8l24.4-23.6C73.7,36.1,73.9,36,74.2,36 M74.2,35 c-0.5,0-1,0.2-1.4,0.6L49.2,58.5l-6.8-7.1c-0.4-0.4-0.9-0.6-1.4-0.6s-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4 l8.3,8.2c0.4,0.4,0.8,0.6,1.4,0.6c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.3,0,0.3,0c0.1,0,0.2,0,0.3-0.1 c0.1,0,0.2-0.1,0.2-0.1c0.2-0.1,0.4-0.2,0.5-0.4l24.6-24c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C75.2,35.2,74.7,35,74.2,35 L74.2,35z"
                        />
                      </g>
                    </svg>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path d="M 11 4 C 7.101563 4 4 7.101563 4 11 L 4 39 C 4 42.898438 7.101563 46 11 46 L 39 46 C 42.898438 46 46 42.898438 46 39 L 46 15 L 44 17.3125 L 44 39 C 44 41.800781 41.800781 44 39 44 L 11 44 C 8.199219 44 6 41.800781 6 39 L 6 11 C 6 8.199219 8.199219 6 11 6 L 37.40625 6 L 39 4 Z M 43.25 7.75 L 23.90625 30.5625 L 15.78125 22.96875 L 14.40625 24.4375 L 23.3125 32.71875 L 24.09375 33.4375 L 24.75 32.65625 L 44.75 9.03125 Z" />
                    </svg> */}
                  </i>
                  <div class="hobbies-icon">
                    <img src="https://img.freepik.com/free-vector/sport-equipment-concept_1284-13034.jpg?size=626&ext=jpg" />
                    <h3 class="">Badge</h3>
                  </div>
                </span>
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  id="Label"
                  name="radio"
                  onClick={handleChange}
                  checked={value === "Label"}
                />
                <span class="radio-btn">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      width="50px"
                      height="50px"
                    >
                      <path
                        fill="#ee3e54"
                        d="M13 27A2 2 0 1 0 13 31A2 2 0 1 0 13 27Z"
                      />
                      <path
                        fill="#009999"
                        d="M77 12A1 1 0 1 0 77 14A1 1 0 1 0 77 12Z"
                      />
                      <path
                        fill="#009999"
                        d="M50 13A37 37 0 1 0 50 87A37 37 0 1 0 50 13Z"
                      />
                      <path
                        fill="#009999"
                        d="M83 11A4 4 0 1 0 83 19A4 4 0 1 0 83 11Z"
                      />
                      <path
                        fill="#ee3e54"
                        d="M87 22A2 2 0 1 0 87 26A2 2 0 1 0 87 22Z"
                      />
                      <path
                        fill="#009999"
                        d="M81 74A2 2 0 1 0 81 78 2 2 0 1 0 81 74zM15 59A4 4 0 1 0 15 67 4 4 0 1 0 15 59z"
                      />
                      <path
                        fill="#ee3e54"
                        d="M25 85A2 2 0 1 0 25 89A2 2 0 1 0 25 85Z"
                      />
                      <path
                        fill="#fff"
                        d="M18.5 51A2.5 2.5 0 1 0 18.5 56A2.5 2.5 0 1 0 18.5 51Z"
                      />
                      <path
                        fill="#009999"
                        d="M21 66A1 1 0 1 0 21 68A1 1 0 1 0 21 66Z"
                      />
                      <path
                        fill="#fff"
                        d="M80 33A1 1 0 1 0 80 35A1 1 0 1 0 80 33Z"
                      />
                      <path
                        fill="#fff"
                        d="M72.4,44v20.4c0,4.3-3.5,7.8-7.8,7.8H35.5c-4.3,0-7.8-3.5-7.8-7.8V35.6c0-4.3,3.5-7.8,7.8-7.8h29.1 c3.6,0,6.6,2.4,7.6,5.8"
                      />
                      <path
                        fill="#472b29"
                        d="M64.5,73H35.5c-4.7,0-8.5-3.8-8.5-8.5V35.6c0-4.7,3.8-8.5,8.5-8.5h29.1c3.8,0,7.2,2.6,8.2,6.3 c0.1,0.4-0.1,0.8-0.5,0.9c-0.4,0.1-0.8-0.1-0.9-0.5c-0.9-3.1-3.7-5.2-6.9-5.2H35.5c-3.9,0-7.1,3.2-7.1,7.1v28.8 c0,3.9,3.2,7.1,7.1,7.1h29.1c3.9,0,7.1-3.2,7.1-7.1V44c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v20.4C73.1,69.1,69.2,73,64.5,73z"
                      />
                      <path
                        fill="#472b29"
                        d="M68.5 59.4c-.3 0-.5-.2-.5-.5V55c0-.3.2-.5.5-.5S69 54.7 69 55v3.9C69 59.2 68.8 59.4 68.5 59.4zM68.5 52.5c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5S69 49.7 69 50v2C69 52.3 68.8 52.5 68.5 52.5z"
                      />
                      <path
                        fill="#472b29"
                        d="M64,69H36c-2.8,0-5-2.2-5-5V36c0-2.8,2.2-5,5-5h25.4c0.3,0,0.5,0.2,0.5,0.5S61.7,32,61.4,32H36 c-2.2,0-4,1.8-4,4v28c0,2.2,1.8,4,4,4h28c2.2,0,4-1.8,4-4v-2.4c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5V64C69,66.8,66.8,69,64,69z"
                      />
                      <g>
                        <path
                          fill="#00ac9c"
                          d="M49.5,62.5l-0.1,0c-0.1,0-0.1,0-0.2,0c-0.4,0-0.8-0.1-1-0.4l-8.3-8.2c-0.3-0.3-0.4-0.6-0.4-1s0.2-0.8,0.4-1 c0.3-0.3,0.6-0.4,1-0.4c0.4,0,0.8,0.2,1,0.4l7.1,7.4l24-23.3c0.3-0.3,0.6-0.4,1-0.4c0.4,0,0.8,0.2,1,0.4c0.3,0.3,0.4,0.6,0.4,1 s-0.2,0.8-0.4,1L50.6,62.1c-0.1,0.1-0.2,0.2-0.4,0.3c0,0-0.1,0-0.1,0.1c-0.1,0-0.2,0.1-0.3,0.1C49.7,62.5,49.7,62.5,49.5,62.5 L49.5,62.5z"
                        />
                        <path
                          fill="#472b29"
                          d="M74.2,36c0.3,0,0.5,0.1,0.7,0.3c0.4,0.4,0.4,1,0,1.4l-24.6,24c-0.1,0.1-0.2,0.1-0.3,0.2c0,0-0.1,0-0.1,0 c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.5-0.1-0.7-0.3l-8.3-8.2 c-0.4-0.4-0.4-1,0-1.4c0.2-0.2,0.4-0.3,0.7-0.3s0.5,0.1,0.7,0.3l7.5,7.8l24.4-23.6C73.7,36.1,73.9,36,74.2,36 M74.2,35 c-0.5,0-1,0.2-1.4,0.6L49.2,58.5l-6.8-7.1c-0.4-0.4-0.9-0.6-1.4-0.6s-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4 l8.3,8.2c0.4,0.4,0.8,0.6,1.4,0.6c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.3,0,0.3,0c0.1,0,0.2,0,0.3-0.1 c0.1,0,0.2-0.1,0.2-0.1c0.2-0.1,0.4-0.2,0.5-0.4l24.6-24c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C75.2,35.2,74.7,35,74.2,35 L74.2,35z"
                        />
                      </g>
                    </svg>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path d="M 11 4 C 7.101563 4 4 7.101563 4 11 L 4 39 C 4 42.898438 7.101563 46 11 46 L 39 46 C 42.898438 46 46 42.898438 46 39 L 46 15 L 44 17.3125 L 44 39 C 44 41.800781 41.800781 44 39 44 L 11 44 C 8.199219 44 6 41.800781 6 39 L 6 11 C 6 8.199219 8.199219 6 11 6 L 37.40625 6 L 39 4 Z M 43.25 7.75 L 23.90625 30.5625 L 15.78125 22.96875 L 14.40625 24.4375 L 23.3125 32.71875 L 24.09375 33.4375 L 24.75 32.65625 L 44.75 9.03125 Z" />
                    </svg> */}
                  </i>
                  <div class="hobbies-icon">
                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-poetry-illustration_23-2149279810.jpg?size=626&ext=jpg" />
                    <h3>Label</h3>
                  </div>
                </span>
              </label>
            </div>
          </LegacyCard.Section>
        </LegacyCard>
      </Layout.Section>

      {/* Right Side - Sticky Preview Box */}
      <Layout.Section oneThird>
        <div style={{ position: "fixed", top: "77px" }}>
          <LegacyCard title="Preview">
            <LegacyCard.Section>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ width: "60%", position: "relative" }}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src="https://sohel-test-webiators.myshopify.com/cdn/shop/files/potted-seeds_925x_ca32d0fe-5195-4698-b0cd-ec9d395d314a.jpg?v=1719305574&width=823"
                    alt=""
                  />
                  {value == "Label" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          backgroundColor: rgbColor,
                          color: rgbTextColor,
                          width: "fit-content",
                          padding: "5px 10px",
                          borderRadius: "50px",
                          //   border: `1px solid ${rgbBorderColor}`,
                          fontSize: `${bannerFontSize}px`,
                        }}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: bannerText
                              .replaceAll("[ POINTS ]", `<span>20</span>`)
                              .replaceAll(
                                "[ POINTS-WITH-LABEL ]",
                                `<span style="font-weight:"bold"
                          >20 ${bannerPointLabel}</span>`
                              ),
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: "35%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div>
                    <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>
                      Product Title
                    </h1>
                  </div>
                  {value == "Badge" && (
                    <div>
                      {" "}
                      <div
                        style={{
                          backgroundColor: rgbColor,
                          color: rgbTextColor,
                          width: "fit-content",
                          padding: "5px 10px",
                          borderRadius: "50px",
                          //   border: `1px solid ${rgbBorderColor}`,
                          fontSize: `${bannerFontSize}px`,
                        }}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: bannerText
                              .replaceAll("[ POINTS ]", `<span>20</span>`)
                              .replaceAll(
                                "[ POINTS-WITH-LABEL ]",
                                `<span style="font-weight:"bold"
                          >20 ${bannerPointLabel}</span>`
                              ),
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ fontSize: "20px", marginTop: "5px" }}>
                    <span>Price: </span>$100
                  </div>
                </div>
              </div>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <LegacyStack>
                <Icon source={AlertCircleIcon} />
                <p>
                  {" "}
                  This is just a dummy representation of the Points on your
                  product page
                </p>
              </LegacyStack>
            </LegacyCard.Section>
          </LegacyCard>
        </div>
      </Layout.Section>
    </Layout>
  );
};

export default ProductPagePointsSettings;
