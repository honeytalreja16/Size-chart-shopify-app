import {
  LegacyCard,
  TextField,
  Select,
  Checkbox,
  Spinner,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { useDispatch, useSelector } from "react-redux";
import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../../redux/actions/webiatorActions";
import { SettingsFilledIcon } from "@shopify/polaris-icons";

const LoyaltyPointSettings = () => {
  const fetch = useAuthenticatedFetch();
  const dispatch = useDispatch();
  const { settingsData, settingsDataLoading, updateSettingsDataLoading } =
    useSelector((states) => states.webiator);
  // State variables for input fields
  const [loyaltyPointEnabled, setLoyaltyPointEnabled] = useState(false);
  const [pointType, setPointType] = useState("percentage"); // Default to percentage
  const [value, setValue] = useState(""); // Value for loyalty points
  const [minimumPurchase, setMinimumPurchase] = useState(false); // Checkbox for minimum purchase
  const [limit, setLimit] = useState(false); // Checkbox for limit
  const [limitValue, setLimitValue] = useState(""); // Limit value
  const [minPurchaseValue, setMinPurchaseValue] = useState(""); // Minimum purchase value
  const [expiryEnabled, setExpiryEnabled] = useState(false); // New state for enabling expiry
  const [expiryDays, setExpiryDays] = useState("");

  useEffect(() => {
    setPointType(settingsData?.loyaltyPointType);
    setValue(settingsData?.loyaltyPointValue);
    setMinPurchaseValue(settingsData?.minPurchaseValue);
    setMinimumPurchase(settingsData?.minimumPurchase);
    setLimit(settingsData?.limit);
    setLimitValue(settingsData?.limitValue);
    setExpiryEnabled(settingsData?.expiryEnabled);
    setExpiryDays(settingsData?.expiryDays);
    setLoyaltyPointEnabled(settingsData?.loyaltyPointEnabled);
  }, [settingsData]);

  console.log(loyaltyPointEnabled);
  return (
    <>
      <LegacyCard
        title="Loyalty Point Configurations"
        primaryFooterAction={{
          content: "Save",
          onAction: () => {
            dispatch(
              _dispatch_UPDATE_SETTINGS_DETAILS({
                fetchFn: fetch,
                inputs: {
                  loadingKey: "update_form_Data",
                  loyaltyPointType: pointType,
                  loyaltyPointValue: value,
                  minimumPurchase: minimumPurchase,
                  minPurchaseValue: minPurchaseValue,
                  limit: limit,
                  limitValue: limitValue,
                  expiryEnabled: expiryEnabled,
                  expiryDays: expiryDays,
                  loyaltyPointEnabled: loyaltyPointEnabled,
                  type: "settings-data",
                },
              })
            );
          },
          loading: updateSettingsDataLoading?.update_form_Data,
          disabled: settingsDataLoading,
        }}
      >
        <LegacyCard.Section>
          <div style={{ marginBottom: "20px" }}>
            <h2 className="inpur_radio_custom_heading">
              Enable/Disable Loyalty points on site
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <input
                className="toggleSwtichInput"
                checked={loyaltyPointEnabled}
                onChange={() => setLoyaltyPointEnabled((prev) => !prev)}
                type="checkbox"
                id="switch"
              />
              <label className="toggleSwitchLabel" htmlFor="switch">
                Toggle
              </label>
              <p
                style={{
                  fontSize: "15px",
                  marginLeft: "5px",
                  fontWeight: "bold",
                  color: loyaltyPointEnabled ? "green" : "red",
                }}
              >
                {loyaltyPointEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>

          {loyaltyPointEnabled && (
            <>
              {/* Row for Loyalty Point Type and Value */}
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ width: "50%" }}>
                  <Select
                    label="Loyalty Point Type"
                    options={[
                      { label: "Percentage", value: "percentage" },
                      { label: "Fixed Amount", value: "fixed" },
                    ]}
                    value={pointType}
                    onChange={setPointType}
                    style={{ flexGrow: 1 }}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <TextField
                    label={
                      pointType === "percentage"
                        ? "Percentage Value"
                        : "Fixed Amount"
                    }
                    value={value}
                    onChange={setValue}
                    type="number"
                    suffix={pointType === "percentage" && "%"}
                    min={0}
                    autoComplete="off"
                    style={{ flexGrow: 1, marginLeft: "10px" }}
                  />
                </div>
              </div>

              {/* Row for Condition and Minimum Purchase Checkbox */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Checkbox
                  label="Set a minimum purchase requirement"
                  checked={minimumPurchase}
                  onChange={setMinimumPurchase}
                  style={{ marginLeft: "10px" }}
                />

                {/* Minimum Purchase Value Input */}
                {minimumPurchase && (
                  <TextField
                    label="Minimum Purchase Value"
                    value={minPurchaseValue}
                    onChange={setMinPurchaseValue}
                    type="number"
                    min={0}
                    autoComplete="off"
                  />
                )}

                {/* Row for Limit Checkbox and Limit Value Input */}
                <Checkbox
                  label="Set a limit on loyalty points"
                  checked={limit}
                  onChange={setLimit}
                  style={{ flexGrow: 1 }}
                />
                {limit && (
                  <TextField
                    label="Limit Value"
                    value={limitValue}
                    onChange={setLimitValue}
                    type="number"
                    min={0}
                    autoComplete="off"
                    style={{ marginLeft: "10px", flexGrow: 1 }}
                  />
                )}

                {/* New Section for Expiry Days */}
                <Checkbox
                  label="Set expiry for loyalty points"
                  checked={expiryEnabled}
                  onChange={setExpiryEnabled}
                  style={{ marginLeft: "10px" }}
                />
                {expiryEnabled && (
                  <TextField
                    label="Expiry Days"
                    value={expiryDays}
                    onChange={setExpiryDays}
                    type="number"
                    min={1}
                    autoComplete="off"
                    suffix="days"
                    helpText="Set number of days after which Loyalty points will be expired."
                  />
                )}
              </div>
            </>
          )}
        </LegacyCard.Section>
      </LegacyCard>
    </>
  );
};

export default LoyaltyPointSettings;
