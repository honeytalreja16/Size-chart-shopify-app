// import {
//   Button,
//   Checkbox,
//   LegacyCard,
//   LegacyStack,
//   Text,
//   TextField,
//   Thumbnail,
//   Toast,
// } from '@shopify/polaris';
// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { _dispatch_UPDATE_SETTINGS_DETAILS } from '../../redux/actions/webiatorActions';
// import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';

// const UpsalePopupSettings = () => {
//   const [heading, setHeading] = useState('');
//   const [subHeading, setSubHeading] = useState('');
//   const [subHeading1, setSubHeading1] = useState('');
//   const [checked, setChecked] = useState(false);
//   const [file, setFile] = useState(null); // Single file state
//   const fileInputRef = useRef(null); // UseRef for file input
//   const dispatch = useDispatch();
//   const fetch = useAuthenticatedFetch();
//   const [activeToast, setActiveToast] = useState(false);
//   const [isToastError, setIsToastError] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [imagePath,setImagePath] = useState("")

//   const toggleActiveToast = useCallback(
//     () => setActiveToast((activeToast) => !activeToast),
//     []
//   );

//   const toastMarkup = activeToast ? (
//     <Toast
//       content={toastMessage}
//       error={isToastError}
//       onDismiss={toggleActiveToast}
//       duration={3000}
//     />
//   ) : null;

//   const { settingsDataLoading, settingsData } = useSelector((states) => states.webiator);

//   const handleChange = useCallback((newChecked) => {
//     setChecked(newChecked);
//   }, []);

//   useEffect(() => {
//     setHeading(settingsData?.Heading || '');
//     setSubHeading(settingsData?.SubHeading || '');
//     setSubHeading1(settingsData?.SubHeading1 || '');
//     setChecked(settingsData?.Checked || false);
//     setImagePath(settingsData?.Image || null);
//   }, [settingsData]);

//   const handleFileChange = async (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
//       if (!validImageTypes.includes(selectedFile.type)) {
//         setToastMessage('Invalid file type! Please upload an image.');
//         setIsToastError(true);
//         toggleActiveToast();
//         return;
//       }

//       setFile(selectedFile); // Set the file locally
//     }
//   };

//  const handleUploadImage = async()=>{
//   const formData = new FormData();
//   formData.append('image', file);

//   try {
//     // POST request to the server
//     const response = await fetch('/api/uploadImage', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setToastMessage('Image uploaded successfully!');
//       setIsToastError(false);
//       console.log('Uploaded Image Data:', data.image.path); // Debugging purposes
//       setImagePath(data.image.path)
//     } else {
//       throw new Error('Failed to upload the image.');
//     }
//   } catch (error) {
//     setToastMessage(error.message);
//     setIsToastError(true);
//   } finally {
//     toggleActiveToast();
//   }
//  }

//   const uploadedFileMarkup = file && (
//     <div style={{ padding: '0' }}>
//       <LegacyStack alignment="center">
//         <Thumbnail
//           size="large"
//           alt={file.name}
//           source={window.URL.createObjectURL(file)}
//         />
//         <div>
//           {file.name}{' '}
//           <Text variant="bodySm" as="p">
//             {file.size} bytes
//           </Text>
//         </div>
//       </LegacyStack>
//     </div>
//   );

//   return (
//     <>
//       <LegacyCard
//         title="Popup Text Settings"
//         primaryFooterAction={{
//           content: 'Save',
//           onAction: () => {
//             dispatch(
//               _dispatch_UPDATE_SETTINGS_DETAILS({
//                 fetchFn: fetch,
//                 inputs: {
//                   loadingKey: 'chetan_form',
//                   Heading: heading,
//                   SubHeading: subHeading,
//                   SubHeading1:subHeading1,
//                   Checked: checked,
//                   Image: imagePath, // Ensure the file is passed here
//                   type: 'settings-data',
//                 },
//               })
//             );

//             setToastMessage('Saved Successfully');
//             setIsToastError(false);
//             toggleActiveToast();
//           },
//           loading: settingsDataLoading?.chetan_form,
//         }}
//       >
//         <LegacyCard.Section>
//           <TextField
//             value={heading}
//             onChange={setHeading}
//             label="Enter Upsale Heading"
//             helpText="This text will appear as the heading of the upsale modal"
//           />
//         </LegacyCard.Section>
//         <LegacyCard.Section>
//           <TextField
//             value={subHeading}
//             onChange={setSubHeading}
//             label="Enter Upsale Sub Heading"
//             helpText="This text will appear as the subheading of the upsale modal"
//           />
//         </LegacyCard.Section>
//         <LegacyCard.Section>
//           <TextField
//             value={subHeading1}
//             onChange={setSubHeading1}
//             label="Enter Upsale Sub Heading"
//             helpText="This text will appear as the subheading of the upsale modal"
//           />
//         </LegacyCard.Section>
//         <LegacyCard.Section>
//           <Checkbox label="Enable Popup" checked={checked} onChange={handleChange} />
//         </LegacyCard.Section>
//         <LegacyCard.Section title="Image Settings">
//         <div style={{ marginBottom: '16px' }}>{uploadedFileMarkup}</div>
//         {
//           file ?(
//             <Button onClick={() =>handleUploadImage()}>Upload Image</Button>
//           ):(
//             <Button onClick={() => fileInputRef.current.click()}>Select Image</Button>
//           )
//         }

//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//       </LegacyCard.Section>
//       </LegacyCard>

//       {toastMarkup}
//     </>
//   );
// };

// export default UpsalePopupSettings;

import {
  Button,
  Checkbox,
  LegacyCard,
  LegacyStack,
  Text,
  Select,
  TextField,
  Thumbnail,
  ColorPicker,
  RangeSlider,
  Toast,
  Popover,
  hsbToRgb,
  rgbString,
  Label,
} from "@shopify/polaris";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../../redux/actions/webiatorActions";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";

const UpsalePopupSettings = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [subHeading1, setSubHeading1] = useState("");
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState(null); // Selected file state
  const [uploading, setUploading] = useState(false); // Uploading state
  const [imagePath, setImagePath] = useState(""); // Uploaded image path
  const fileInputRef = useRef(null); // Ref for file input
  const dispatch = useDispatch();
  const fetch = useAuthenticatedFetch();
  const [activeToast, setActiveToast] = useState(false);
  const [isToastError, setIsToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [position, setPosition] = useState("left");
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });
  const [rgbColor, setRgbColor] = useState("");
  const [rangeValue, setRangeValue] = useState(32);

  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

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

  const { settingsDataLoading, settingsData } = useSelector(
    (state) => state.webiator
  );

  const handleChange = useCallback((newChecked) => {
    setChecked(newChecked);
  }, []);

  useEffect(() => {
    setHeading(settingsData?.Heading || "");
    setSubHeading(settingsData?.SubHeading || "");
    setSubHeading1(settingsData?.SubHeading1 || "");
    setChecked(settingsData?.Checked || false);
    setImagePath(settingsData?.Image || "");
    setPosition(settingsData?.Position || "");
    setRgbColor(settingsData?.Color || "");
    setRangeValue(settingsData?.BorderRadius || "");
    setColor(
      settingsData?.HsbColor || { hue: 120, brightness: 1, saturation: 1 }
    );
  }, [settingsData]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(selectedFile.type)) {
        setToastMessage("Invalid file type! Please upload an image.");
        setIsToastError(true);
        toggleActiveToast();
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUploadImage = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImagePath((prev) => `/uploads/${data.image.filename}`);

        setToastMessage("Image uploaded successfully!");
        setIsToastError(false);
        setFile(null); // Clear the selected file
      } else {
        throw new Error("Failed to upload the image.");
      }
    } catch (error) {
      setToastMessage(error.message);
      setIsToastError(true);
    } finally {
      setUploading(false);
      toggleActiveToast();
    }
  };
  const options = [
    { label: "Left Position", value: "left" },
    { label: "Background Image", value: "center" },
    { label: "Right Position", value: "right" },
  ];
  const handleSelectChange = useCallback((value) => setPosition(value), []);
  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    []
  );

  const uploadedFileMarkup = (
    <div style={{ padding: "0" }}>
      {imagePath ? (
        <LegacyStack alignment="center">
          <Thumbnail
            size="large"
            alt="Uploaded image"
            source={"../.." + imagePath}
          />
          <Text variant="bodySm" as="p">
            Uploaded image
          </Text>
        </LegacyStack>
      ) : file ? (
        <LegacyStack alignment="center">
          <Thumbnail
            size="large"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <Text variant="bodySm" as="p">
            {file.name}
          </Text>
        </LegacyStack>
      ) : (
        <Text variant="bodySm" as="p">
          No image selected
        </Text>
      )}
    </div>
  );

  const activator = (
    <>
      <Label>Background Color:</Label>
      <div
        style={{
          width: "100%",
          height: "50px",
          border: "1px solid #777",
          background: rgbColor,
        }}
        onClick={togglePopoverActive}
      ></div>
    </>
  );

  useEffect(() => {
    setRgbColor(rgbString(hsbToRgb(color)));
  }, [color]);
  return (
    <>
      <LegacyCard
        title="Popup Text Settings"
        primaryFooterAction={{
          content: "Save",
          onAction: () => {
            dispatch(
              _dispatch_UPDATE_SETTINGS_DETAILS({
                fetchFn: fetch,
                inputs: {
                  loadingKey: "chetan_form",
                  Heading: heading,
                  SubHeading: subHeading,
                  SubHeading1: subHeading1,
                  Checked: checked,
                  Image: imagePath, // Pass uploaded image path
                  Position: position,
                  Color: rgbColor,
                  HsbColor: color,
                  BorderRadius: rangeValue,
                  type: "settings-data",
                },
              })
            );
            setToastMessage("Saved Successfully");
            setIsToastError(false);
            toggleActiveToast();
          },
          loading: settingsDataLoading?.chetan_form,
        }}
      >
        <LegacyCard.Section>
          <TextField
            value={heading}
            onChange={setHeading}
            label="Enter Upsale Heading"
            helpText="This text will appear as the heading of the upsale modal"
          />
        </LegacyCard.Section>
        <LegacyCard.Section>
          <TextField
            value={subHeading}
            onChange={setSubHeading}
            label="Enter Upsale Sub Heading"
            helpText="This text will appear as the subheading of the upsale modal"
          />
        </LegacyCard.Section>
        <LegacyCard.Section>
          <TextField
            value={subHeading1}
            onChange={setSubHeading1}
            label="Enter Upsale Sub Heading"
            helpText="This text will appear as the subheading of the upsale modal"
          />
        </LegacyCard.Section>
        <LegacyCard.Section>
          <Checkbox
            label="Enable Popup"
            checked={checked}
            onChange={handleChange}
          />
        </LegacyCard.Section>
        <LegacyCard.Section title="Image Settings">
          {uploadedFileMarkup}
          {uploading ? (
            <Button disabled>Uploading...</Button>
          ) : file ? (
            <Button onClick={handleUploadImage}>Upload Image</Button>
          ) : (
            <Button onClick={() => fileInputRef.current.click()}>
              Select Image
            </Button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </LegacyCard.Section>
        <LegacyCard.Section>
          <Select
            label="image position"
            options={options}
            onChange={handleSelectChange}
            value={position}
          />
        </LegacyCard.Section>
        <LegacyCard.Section>
          <Popover
            active={popoverActive}
            activator={activator}
            onClose={togglePopoverActive}
            ariaHaspopup={false}
            sectioned
          >
            <ColorPicker label="Color" onChange={setColor} color={color} />
          </Popover>
        </LegacyCard.Section>
        <LegacyCard.Section>
          <RangeSlider
            label={`BorderRadius : ${rangeValue} px`}
            value={rangeValue}
            onChange={handleRangeSliderChange}
            output
          />
        </LegacyCard.Section>
      </LegacyCard>
      {toastMarkup}
    </>
  );
};

export default UpsalePopupSettings;
