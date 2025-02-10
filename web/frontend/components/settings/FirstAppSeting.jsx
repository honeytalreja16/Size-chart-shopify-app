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
  Modal,
  DataTable,
  TextField,
} from "@shopify/polaris";
import {SearchIcon} from '@shopify/polaris-icons';
import {
  DeleteIcon
} from '@shopify/polaris-icons';
import {
  EditIcon
} from '@shopify/polaris-icons';
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../../redux/actions/webiatorActions"; 
import AddMoreModal from "./AddMoreModal";



const FirstAppSeting = () => {    
  const [selected, setSelected] = useState('snowboard');
  const [title, setTitle] = useState('');
  const [productData,setProductData] = useState([])
  const [collectionData,setCollectionData] = useState([])
  const [imagePath, setImagePath] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState();
  const [newsletter, setNewsletter] = useState(false);    
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [productsOptions,setProductsOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');    
  const [options, setOptions] = useState(productsOptions);
  const [collectionOptions,setCollectionOptions] = useState([])
  const [selectedOptionsCollection, setSelectedOptionsCollection] = useState([]);
  const [inputValueCollection, setInputValueCollection] = useState('');    
  const [optionsCollection, setOptionsCollection] = useState(collectionOptions);

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
      const updatedSelectedOptions = productsOptions.find(
        (option) => option._id === selected
      );

      const isSelected = selectedOptions.findIndex(
        (option) => option._id === updatedSelectedOptions._id
      );

      if (isSelected > -1) {
        setSelectedOptions(
          selectedOptions.filter(
            (option) => option._id !== updatedSelectedOptions._id
          )
        );
      } else {
        setSelectedOptions([
          ...selectedOptions,
          {
            value: updatedSelectedOptions?.value,
            _id: updatedSelectedOptions?._id,
          },
        ]);
      }

      updateText("");
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

  useEffect(()=>{ 
    console.log(selectedOptions,"stt---")
  },[selectedOptions])
  

  const tagsMarkup = selectedOptions?.map((option) => (
    <Tag key={`option-${option}`} onRemove={removeTag(option)}>
      {option.value} 
    </Tag>
  ));
           
  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
        const { label, value, _id } = option;
        return (
          <Listbox.Option
            key={_id}
            value={_id}
            selected={selectedOptions.some(
              (selected) => selected?._id === _id
            )}
          
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


  // -======Multi collection =====


  const escapeSpecialRegExCharactersCollection = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    [],
  );
 
  const updateTextCollection = useCallback(
    (value) => {
      setInputValueCollection(value);

      if (value === '') {
        setOptionsCollection(collectionOptions);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharactersCollection(value), 'i');
      const resultOptions = collectionOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptionsCollection(resultOptions);
    },
    [collectionOptions, escapeSpecialRegExCharactersCollection],
  );

  const updateSelectionCollection = useCallback(
    (selected) => {
      console.log(selected)
      const updatedSelectedOptions = collectionOptions.find(
        (option) => option._id === selected
      );

      const isSelected = selectedOptionsCollection.findIndex(
        (option) => option._id === updatedSelectedOptions._id
      );

      if (isSelected > -1) {
        setSelectedOptionsCollection(
          selectedOptionsCollection.filter(
            (option) => option._id !== updatedSelectedOptions._id
          )
        );
      } else {
        setSelectedOptionsCollection([
          ...selectedOptionsCollection,
          {
            value: updatedSelectedOptions?.value,
            _id: updatedSelectedOptions?._id,
          },
        ]);
      }

      updateTextCollection("");
    },
    [selectedOptionsCollection, updateTextCollection],
  );

  const removeTagCollection = useCallback(
    (tag) => () => {
      const options = [...selectedOptionsCollection];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptionsCollection(options);
    },
    [selectedOptionsCollection],
  );

  

  const tagsMarkupCollection = selectedOptionsCollection?.map((option) => (
    <Tag key={`option-${option}`} onRemove={removeTagCollection(option)}>
      {option.value} 
    </Tag>
  ));
           
  const optionsMarkupCollection =
    optionsCollection.length > 0
      ? optionsCollection.map((option) => {
        const { label, value, _id } = option;
        return (
          <Listbox.Option
            key={_id}
            value={_id}
            selected={selectedOptionsCollection.some(
              (selected) => selected?._id === _id
            )}
          
            accessibilityLabel={label}
          >
            {label}
          </Listbox.Option>
          );
        })
      : null;


  // ====================================


  useEffect(()=>{

    setImagePath(settingsData?.Image || "")
    setSelectedOptions(settingsData?.Product || [])
    setSelectedOptionsCollection(settingsData?.Collection || [])
    setTitle(settingsData?.Title || [])
    
  },[settingsData])


  const handleSubmit = async () => {
    try {

      dispatch(
        _dispatch_UPDATE_SETTINGS_DETAILS({
          fetchFn: fetch,
          inputs: {
            loadingKey: "first_form",
            Image: imagePath,
            Title: title ,
            Product :selectedOptions,
            Collection :selectedOptionsCollection,    
            type: "settings-data",
          },
        })
      );
        
      setNewsletter(false);
    } catch (error) {
      console.log(error);
    }
  };



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes?.includes(selectedFile.type)) {
       
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUploadImage = async () => {
    if (!file) return;
    console.log(file,"file img---")
    setUploading(true);

    const formData = new FormData();
    console.log(formData,"formdata==")
    formData.append("image", file);

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImagePath((prev) => `/uploads/${data.image.filename}`);
        console.log(data,"data--=")
        setFile(null); 
      } else {
        throw new Error("Failed to upload the image.");
      }
    } catch (error) {
      
    } finally {
      setUploading(false);
 
    }
  };

  const handleTextFieldChange = useCallback(
    (value) => setTitle(value),
    [],
  );
  
  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    []
  );

useEffect(()=>{
  console.log(imagePath,"img path")
},[imagePath])
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
        // console.log(resjson,"hit===")
    
   
      let temparr1=[]
resjson.products.forEach(x=>{
  let tempobj= {label: x.node.title, value: x.node.id}
  let idarr = x.node.id.split("/");
          let id = idarr[idarr.length - 1]
  temparr1.push({
    value: x.node.title,
    label: x.node.title,
    _id: id,
  });
})
setProductsOptions(temparr1)

        setProductData(resjson)
     } catch (error) {
      console.log(error,"err") 
     }
    }

    const getCollection = async()=>{
      try {
        const res = await fetch ("/api/getCollections")
        console.log(res,"it is working")
        const resjson = await res.json()
        // console.log(resjson,"hit===")
    
   
      let temparr1=[]
resjson.collections.forEach(x=>{
  let tempobj= {label: x.node.title, value: x.node.id}
  let idarr = x.node.id.split("/");
          let id = idarr[idarr.length - 1]
  temparr1.push({
    value: x.node.title,
    label: x.node.title,
    _id: id,
  });
})
setCollectionOptions(temparr1)

        setCollectionData(resjson)
     } catch (error) {
      console.log(error,"err") 
     }
    }
    getProducts()
    getCollection()
   
  },[])

  const handleSelectChange = useCallback(
    (value) => setSelected(value),
    [],
  );

//edit modal-------------//
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => {
    console.log("click")
    setActive(!active)}, [active]);

  const activator = <Button onClick={handleChange} plain icon={EditIcon}/>;
 



const rows = [
  [<div>{title}</div> ,
  <img className="tableImg" style={{height:"80px"}} src={imagePath} />,
  <div style={{display:"flex",gap:"10px",alignItems:"center"}}>{activator} <Icon source={DeleteIcon}tone="base"/></div>,],
 
];


  return (  
    <>
    <AddMoreModal/>
    
   <div style={{height:'500px' , width:"639px"}}>
      <LegacyCard>
        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'button',
            
          ]}
          headings={[
            'Title',
            'Image',
            '',
            
            
          ]}
          rows={rows}
        />
         <div >
     
     <Modal
       activator={activator}
       open={active}
       onClose={handleChange}
       title="Edit"
       primaryAction={{
         content: 'Close',
         onAction: handleChange,
       }}
     >
       <Modal.Section>
        
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

        <TextField
             //  label=" zone namShippinge"
              value={title}
              onChange={handleTextFieldChange}
              placeholder="Title"
              autoComplete="off"
            />

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
     <LegacyStack >{tagsMarkup}</LegacyStack>
   </Text>


   <Combobox
            allowMultiple
            activator={
         <Combobox.TextField
             prefix={<Icon source={SearchIcon} />}
             onChange={updateTextCollection}
             label="Search Collection"
             labelHidden
             value={inputValueCollection}
             placeholder="Search Collection"
             autoComplete="off"
            
       />
     }
   >
     {optionsMarkupCollection ? (
       <Listbox onSelect={updateSelectionCollection}>{optionsMarkupCollection}</Listbox>
     ) : null}
   </Combobox>
   <Text>
     <LegacyStack >{tagsMarkupCollection}</LegacyStack>
   </Text>
  
          <Button submit>Submit</Button>  

       </FormLayout>
     </Form>
  
   </LegacyCard.Section>
 </LegacyCard>
       </Modal.Section>
     </Modal>
   
        </div> 
      </LegacyCard>
      </div>
    </>
  );
};

export default FirstAppSeting;
