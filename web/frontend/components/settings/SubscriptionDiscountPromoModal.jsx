import React, { useCallback, useState } from "react";
import { Button, Frame, Modal, TextContainer } from "@shopify/polaris";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

// Define the blink animation
const scaleAnimation = keyframes`
0%{
width:100vw
}
100%{
width:100px
}
`;
const blinkAnimation = keyframes`
 
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%, 100% {
    transform: rotateZ(0);
  }

`;

// Style the sticky button
const StickyButton = styled("button")`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: transparent;
  border: none;
  border-radius: 0 0 0.2em 0.2em;
  color: #fff;
  font-family: Helvetica, Arial, Sans-serif;
  font-size: 1em;
  transform-origin: 50% 5em;
  animation: ${blinkAnimation} 2s linear infinite;
  animation-delay: 2s;
  z-index: 10000;
`;
const ImageGif = styled("img")`
  width: 100px;
  animation: ${scaleAnimation} .5s ease-in-out;
  z-index=10000;
`;
const SubscriptionDiscountPromoModal = () => {
  const [active, setActive] = useState(false);
  const { settingsData } = useSelector((states) => states.webiator);

  const handleChange = useCallback(() => {
    setActive(!active);
  }, [active]);
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!settingsData?.isPaidUser) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [settingsData]);

  return (
    <>
      <Modal
        open={active}
        onClose={handleChange}
        title="Special Premium Plan Offer!"
        primaryAction={{
          content: "Get Deal",
          onAction: () => {
            navigate("/plans");
          },
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p style={{ fontWeight: "bold", fontSize: "15px" }}>
              Get 3 months of our Premium Plan for just $1/month. Tap "Get Deal"
              to activate your exclusive offer!
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>

      {/* Add the sticky button */}
      {showButton && (
        <StickyButton onClick={handleChange}>
          <ImageGif src="../../assets/special-offer.gif" />
        </StickyButton>
      )}
    </>
  );
};

export default SubscriptionDiscountPromoModal;
