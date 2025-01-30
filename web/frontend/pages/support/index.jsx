import {
  Frame,
  LegacyCard,
  Page,
  TextField,
  Button,
  FormLayout,
  Toast,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { useSelector } from "react-redux";

const Index = () => {
  const { settingsData, settingsDataLoading, updateSettingsDataLoading } =
    useSelector((states) => states.webiator);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    console.log(settingsData);
    setEmail(settingsData?.storeEmail);
  }, [settingsData]);
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Request sent" onDismiss={toggleActive} />
  ) : null;

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    setFormError("");
    if (!name || !email || !query) {
      setFormError("All fields are required.");
      return;
    }

    // if (!emailRegex.test(email)) {
    //   setFormError("Please enter a valid email address.");
    //   return;
    // }

    setIsLoading(true);

    try {
      const response = await fetch("/api/query-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromName: name,
          fromEmail: email,
          body: query,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Handle successful email sending, e.g., show a success message or reset the form
      setName("");
      setEmail("");
      setQuery("");
      toggleActive();
    } catch (error) {
      setFormError("An error occurred while sending the email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Frame>
      <Page title="Webiators Support Desk">
        <LegacyCard
          title="Query Form"
          primaryFooterAction={{
            content: "Send Query",
            onAction: () => {
              handleSubmit();
            },
            loading: isLoading,
            disabled: !email || !name || !query,
          }}
        >
          <LegacyCard.Section>
            <FormLayout>
              <TextField
                label="Name:"
                placeholder="Enter your name..."
                value={name}
                onChange={(value) => setName(value)}
                required
              />
              {/* <TextField
                label="Email:"
                type="email"
                placeholder="Enter yor email address..."
                value={email}
                onChange={(value) => setEmail(value)}
                required
                error={
                  formError.includes("valid email address") ? formError : ""
                }
              /> */}
              <TextField
                label="Query:"
                placeholder="Enter you query here..."
                value={query}
                onChange={(value) => setQuery(value)}
                multiline={4}
                required
              />
              {formError && <p style={{ color: "red" }}>{formError}</p>}
              {/* <Button primary onClick={handleSubmit} loading={isLoading}>
                Submit
              </Button> */}
            </FormLayout>
          </LegacyCard.Section>
        </LegacyCard>
      </Page>
      {toastMarkup}
    </Frame>
  );
};

export default Index;
