import React, { useEffect, useRef } from "react";
import {
  Form,
  FormLayout,
  Checkbox,
  Button,
  Text,
  LegacyCard,
  LegacyStack,
  TextContainer,
  Thumbnail,
  Listbox,
  Combobox,
  Icon,
  Tag,
  
  
} from "@shopify/polaris";
import {SearchIcon} from '@shopify/polaris-icons';
import {Select} from '@shopify/polaris';
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../../redux/actions/webiatorActions"; 

const FirstAppSeting = () => {
  const [selected, setSelected] = useState('snowboard');
  const [productData,setProductData] = useState()
  const [imagePath, setImagePath] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState();
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [productsOptions,setProductsOptions] = useState([])
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(productsOptions);

  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    [],
  );

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(productsOptions);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');
      const resultOptions = productsOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [productsOptions, escapeSpecialRegExCharacters],
  );

  const updateSelection = useCallback(
    (selected) => {
      console.log(selected)
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== selected),
        );
      } else {
        setSelectedOptions([...selectedOptions, selected]);
      }

      updateText('');
    },
    [selectedOptions, updateText],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const tagsMarkup = selectedOptions.map((option) => (
    <Tag key={`option-${option}`} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const {label, value} = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={label}
              selected={selectedOptions.includes(label)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;
  const fetch = useAuthenticatedFetch();
  const { settingsDataLoading, settingsData } = useSelector(
    (state) => state.webiator
  );
  const handleSubmit = async () => {
    try {
      dispatch(
        _dispatch_UPDATE_SETTINGS_DETAILS({
          fetchFn: fetch,
          inputs: {
            loadingKey: "first_form",
            Name: firstName,
            Email: email,
            Password: password,
            Checked: newsletter,
            Image: imagePath,

            type: "settings-data",
          },
        })
      );

      setFirstName("");
      setNewsletter(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setImagePath();
  }, []);

  useEffect(() => {
    setEmail(settingsData?.Email || "");
    setFirstName(settingsData?.Name || "");
    setPassword(settingsData?.Password || "");
    setImagePath(settingsData?.Image || "");
  }, [settingsData]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(selectedFile.type)) {
        // setToastMessage("Invalid file type! Please upload an image.");
        // setIsToastError(true);
        // toggleActiveToast();
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

        
        setFile(null); 
      } else {
        throw new Error("Failed to upload the image.");
      }
    } catch (error) {
      
    } finally {
      setUploading(false);
 
    }
  };

  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    []
  );

  // const handleEmailChange = useCallback((value) => setEmail(value), []);
  // const handlePasswordChange = useCallback((value) => setPassword(value), []);
  // const handleFirstNamelChange = useCallback(
  //   (value) => setFirstName(value),
  //   []
  // );
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

  useEffect( ()=>{
    const getProducts = async()=>{
      try {
        const res = await fetch ("/api/getProducts")
        console.log(res,"it is working")
        const resjson = await res.json()
        // console.log(resjson,"hit")
     
      let temparr = []
      
resjson.products.forEach(x=>{
  let tempobj= {label: x.node.title, value: x.node.id}
 
  temparr.push(tempobj)
})
setProductsOptions(temparr)

        setProductData(resjson)
     } catch (error) {
      console.log(error,"err") 
     }
    }
    getProducts()
   
  },[])

  const handleSelectChange = useCallback(
    (value) => setSelected(value),
    [],
  );


 
  return (
    <LegacyCard>
      <LegacyCard.Section>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <Checkbox
              label="Sign up for the Polaris newsletter"
              checked={newsletter}
              onChange={handleNewsLetterChange}
            />
            
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
            {/* <div className="drpdwn"> */}
             {/* <label for="sizeChart" style={{fontSize:"20px"}}>Size Chart</label> */}
             {/* <Select
                   label="Collection"
                   options={productsOptions}
                   onChange={handleSelectChange}
                   value={selected}
                 /> */}
             {/* </div> */}
             <Combobox
               allowMultiple
               activator={
            <Combobox.TextField
                prefix={<Icon source={SearchIcon} />}
                onChange={updateText}
                label="Search Products"
                labelHidden
                value={inputValue}
                placeholder="Search Products"
                autoComplete="off"
          />
        }
      >
        {optionsMarkup ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
      <Text>
        <LegacyStack>{tagsMarkup}</LegacyStack>
      </Text>
            <Button submit>Submit</Button>

          </FormLayout>
        </Form>
     
      </LegacyCard.Section>
    </LegacyCard>

    
  );
};

export default FirstAppSeting;
