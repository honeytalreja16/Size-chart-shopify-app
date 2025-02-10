import {
    Form,
    FormLayout,
    Checkbox,
    Button,
    Text,
    LegacyCard,
    LegacyStack,
    Thumbnail,
    Listbox,
    Combobox,
    Icon,
    Tag,
    Modal,
    TextField,
   DataTable
  } from "@shopify/polaris";
import React, { useCallback, useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import {SearchIcon} from '@shopify/polaris-icons';

const AddMoreModal = () => {
      const [currentList, setCurrentList]=useState()
      // const [sizeChartData, setSizeChartData] = useState([]);
      const [selectedModal, setSelectedModal] = useState('snowboard');
      const [titleModal, setTitleModal] = useState('');
      const [productDataModal,setProductDataModal] = useState([])
      const [collectionDataModal,setCollectionDataModal] = useState([])
      const [imagePathModal, setImagePathModal] = useState("");
      const [fileModal, setFileModal] = useState(null);
      const [uploadingModal, setUploadingModal] = useState();
      const [newsletterModal, setNewsletterModal] = useState(false);    
      const fileInputRefModal = useRef(null);
      const [productsOptionsModal,setProductsOptionsModal] = useState([])
      const [selectedOptionsModal, setSelectedOptionsModal] = useState([]);
      const [inputValueModal, setInputValueModal] = useState('');    
      const [optionsModal, setOptionsModal] = useState(productsOptionsModal);
      const [collectionOptionsModal,setCollectionOptionsModal] = useState([])
      const [selectedOptionsCollectionModal, setSelectedOptionsCollectionModal] = useState([]);
      const [inputValueCollectionModal, setInputValueCollectionModal] = useState('');    
      const [optionsCollectionModal, setOptionsCollectionModal] = useState(collectionOptionsModal);
     const escapeSpecialRegExCharactersModal = useCallback(
         (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
         [],
       );
      
       const updateTextModal = useCallback(
         (value) => {
           setInputValueModal(value);
     
           if (value === '') {
             setOptionsModal(productsOptionsModal);
             return;
           }
     
           const filterRegexModal = new RegExp(escapeSpecialRegExCharactersModal(value), 'i');
           const resultOptionsModal = productsOptionsModal.filter((option) =>
             option.label.match(filterRegexModal),
           );
           setOptionsModal(resultOptionsModal);
         },
         [productsOptionsModal, escapeSpecialRegExCharactersModal],
       );
     
       const updateSelectionModal = useCallback(
         (selected) => {
           console.log(selected)
           const updatedSelectedOptionsModal = productsOptionsModal.find(
             (option) => option._id === selected
           );
     
           const isSelectedModal = selectedOptionsModal.findIndex(
             (option) => option._id === updatedSelectedOptionsModal._id
           );
     
           if (isSelectedModal > -1) {
             setSelectedOptionsModal(
               selectedOptionsModal.filter(
                 (option) => option._id !== updatedSelectedOptionsModal._id
               )
             );
           } else {
             setSelectedOptionsModal([
               ...selectedOptionsModal,
               {
                 value: updatedSelectedOptionsModal?.value,
                 _id: updatedSelectedOptionsModal?._id,
               },
             ]);
           }
     
           updateTextModal("");
         },
         [selectedOptionsModal, updateTextModal],
       );
     
       const removeTagModal = useCallback(
         (tagModal) => () => {
           const optionsModal = [...selectedOptionsModal];
           optionsModal.splice(optionsModal.indexOf(tagModal), 1);
           setSelectedOptionsModal(optionsModal);
         },
         [selectedOptionsModal],
       );
     
       useEffect(()=>{ 
         console.log(selectedOptionsModal,"stt---")
       },[selectedOptionsModal])
       
     
       const tagsMarkupModal = selectedOptionsModal?.map((option) => (
         <Tag key={`option-${option}`} onRemove={removeTagModal(option)}>
           {option.value} 
         </Tag>
       ));
                
       const optionsMarkupModal =
         optionsModal.length > 0
           ? optionsModal.map((option) => {
             const { label, value, _id } = option;
             return (
               <Listbox.Option
                 key={_id}
                 value={_id}
                 selected={selectedOptionsModal.some(
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
     
     
       const escapeSpecialRegExCharactersCollectionModal = useCallback(
         (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
         [],
       );
      
       const updateTextCollectionModal = useCallback(
         (value) => {
           setInputValueCollectionModal(value);
     
           if (value === '') {
             setOptionsCollectionModal(collectionOptionsModal);
             return;
           }
     
           const filterRegexModal = new RegExp(escapeSpecialRegExCharactersCollectionModal(value), 'i');
           const resultOptionsModal = collectionOptionsModal.filter((option) =>
             option.label.match(filterRegexModal),
           );
           setOptionsCollectionModal(resultOptionsModal);
         },
         [collectionOptionsModal, escapeSpecialRegExCharactersCollectionModal],
       );
     
       const updateSelectionCollectionModal = useCallback(
         (selected) => {
           console.log(selected)
           const updatedSelectedOptionsModal = collectionOptionsModal.find(
             (option) => option._id === selected
           );
     
           const isSelectedModal = selectedOptionsCollectionModal.findIndex(
             (option) => option._id === updatedSelectedOptionsModal._id
           );
     
           if (isSelectedModal > -1) {
             setSelectedOptionsCollectionModal(
               selectedOptionsCollectionModal.filter(
                 (option) => option._id !== updatedSelectedOptionsModal._id
               )
             );
           } else {
             setSelectedOptionsCollectionModal([
               ...selectedOptionsCollectionModal,
               {
                 value: updatedSelectedOptionsModal?.value,
                 _id: updatedSelectedOptionsModal?._id,
               },
             ]);
           }
     
           updateTextCollectionModal("");
         },
         [selectedOptionsCollectionModal, updateTextCollectionModal],
       );
     
       const removeTagCollectionModal = useCallback(
         (tagModal) => () => {
           const optionsModal = [...selectedOptionsCollectionModal];
           optionsModal.splice(optionsModal.indexOf(tagModal), 1);
           setSelectedOptionsCollectionModal(optionsModal);
         },
         [selectedOptionsCollectionModal],
       );
     
       
     
       const tagsMarkupCollectionModal = selectedOptionsCollectionModal?.map((option) => (
         <Tag key={`option-${option}`} onRemove={removeTagCollectionModal(option)}>
           {option.value} 
         </Tag>
       ));
                
       const optionsMarkupCollectionModal =
         optionsCollectionModal.length > 0
           ? optionsCollectionModal.map((option) => {
             const { label, value, _id } = option;
             return (
               <Listbox.Option
                 key={_id}
                 value={_id}
                 selectedModal={selectedOptionsCollectionModal.some(
                   (selectedModal) => selectedModal?._id === _id
                 )}
               
                 accessibilityLabel={label}
               >
                 {label}
               </Listbox.Option>
               );
             })
           : null;
     
     
   
     
       const handleSubmitModal = async () => {
         try {
     
        const res =await fetch("/api/addnewSizeChart",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Title:titleModal,
                Product : selectedOptionsModal,
                Collection : selectedOptionsCollectionModal,
                Image : imagePathModal
             }),
          })
          setCurrentList(res)
          console.log(setCurrentList,"rest data---")
           setNewsletterModal(false);
         } catch (error) {
           console.log(error);
         }
       };
     
     
    
     
       const handleFileChangeModal = (event) => {
         const selectedFileModal = event.target.files[0];
         if (selectedFileModal) {
           const validImageTypesModal = ["image/gif", "image/jpeg", "image/png"];
           if (!validImageTypesModal?.includes(selectedFileModal.type)) {
            
             return;
           }
           setFileModal(selectedFileModal);
         }
       };
     
       const handleUploadImageModal = async () => {
         if (!fileModal) return;
         console.log(fileModal,"file img---")
         setUploadingModal(true);
     
         const formData = new FormData();
         console.log(formData,"formdata==")
         formData.append("image", fileModal);
     
         try {
           const response = await fetch("/api/uploadImage", {
             method: "POST",
             body: formData,
           });
     
           if (response.ok) {
             const data = await response.json();
             setImagePathModal((prev) => `/uploads/${data.image.filename}`);
            //  console.log(data,"data--=")
             setFileModal(null); 
           } else {
             throw new Error("Failed to upload the image.");
           }
         } catch (error) {
           
         } finally {
           setUploadingModal(false);
      
         }
       };
     
       const handleTextFieldChangeModal = useCallback(
         (value) => setTitleModal(value),
         [],
       );
       
       const handleNewsLetterChange = useCallback(
         (value) => setNewsletterModal(value),
         []
       );
     
     useEffect(()=>{
       console.log(imagePathModal,"img path")
     },[imagePathModal])
       const uploadedFileMarkupModal = (
         <div style={{ padding: "0" }}>
           {imagePathModal ? (
             <LegacyStack alignment="center">
               <Thumbnail
                 size="large"
                 alt="Uploaded image"
                 source={"../.." + imagePathModal}
               />
               <Text variant="bodySm" as="p">
                 Uploaded image
               </Text>
             </LegacyStack>
           ) : fileModal ? (
             <LegacyStack alignment="center">
               <Thumbnail
                 size="large"
                 alt={fileModal.name}
                 source={window.URL.createObjectURL(fileModal)}
               />
               <Text variant="bodySm" as="p">
                 {fileModal.name}
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
         const getProductsModal = async()=>{
           try {
             const res = await fetch ("/api/getProducts")
             console.log(res,"it is working")
             const resjson = await res.json()
             console.log(resjson,"products hit ----")
         
        
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
     setProductsOptionsModal(temparr1)
     
             setProductDataModal(resjson)
          } catch (error) {
           console.log(error,"err") 
          }
         }
     
         const getCollectionModal = async()=>{
           try {
             const res = await fetch ("/api/getCollections")
             console.log(res,"it is working")
             const resjson = await res.json()
             console.log(resjson,"collection hit---")
         
        
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
     setCollectionOptionsModal(temparr1)
     
             setCollectionDataModal(resjson)
            
       

          } catch (error) {
           console.log(error,"err") 
          }
         }
         getProductsModal()
         getCollectionModal()
         setCurrentList()
         console.log(setCurrentList,"listtt")
       },[])
     
       const handleSelectChangeModal = useCallback(
         (value) => setSelectedModal(value),
         [],
       );


       const [addModal, setAddModal] = useState(false);

       const handleModal = useCallback(() => setAddModal(!addModal), [addModal]);
      
       const start = <Button onClick={handleModal}>Add More</Button>;


    
         const rows = [
          [   <div>{titleModal}</div>  , 
            <img src={imagePathModal} style={{height:"80px"}} alt="" />,
             124689],
          
         
        ]
    
   
  
     

   
        // const handleDelete = async (id) => {
        //   try {
        //     await fetch(`/api/deleteSizeChart/${id}`, { method: "DELETE" });
        //     setSizeChartData(sizeChartData.filter(item => item._id !== id));
        //   } catch (error) {
        //     console.error("Error deleting size chart", error);
        //   }
        // };

  return (

   <>
       <div>
               <Modal
                 activator={start}
                 open={addModal}
                 onClose={handleModal}
                 title="Add More"
                 secondaryActions={[
                   {
                     content: 'Close',
                     onAction: handleModal,
                   },
                 ]}
               >
                 <Modal.Section>
                 <LegacyCard>
          <LegacyCard.Section>
            <Form onSubmit={handleSubmitModal}>
              <FormLayout>
                <Checkbox
                  label="Sign up for the Polaris newsletter"
                  checked={newsletterModal}
                  onChange={handleNewsLetterChange}
                />
                
                {uploadedFileMarkupModal}
                {uploadingModal ? (
                  <Button disabled>Uploading...</Button>
                ) : fileModal ? (
                  <Button onClick={handleUploadImageModal}>Upload Image</Button>
                ) : (
                  <Button onClick={() => fileInputRefModal.current.click()}>
                    Select Image
                  </Button>
                )}
                <input
                  type="file"
                  ref={fileInputRefModal}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChangeModal}  
                />
       
               <TextField
                    //  label=" zone namShippinge"  
                     value={titleModal}
                     onChange={handleTextFieldChangeModal}
                     placeholder="Title"
                     autoComplete="on"
                     />
       
                 <Combobox
                   allowMultiple
                   activator={
                <Combobox.TextField
                    prefix={<Icon source={SearchIcon} />}
                    onChange={updateTextModal}
                    label="Search Products"
                    labelHidden
                    value={inputValueModal}
                    placeholder="Search Products"
                    autoComplete="off"
              />
            }
          >
            {optionsMarkupModal ? (
              <Listbox onSelect={updateSelectionModal}>{optionsMarkupModal}</Listbox>
            ) : null}
          </Combobox>
          <Text>
            <LegacyStack >{tagsMarkupModal}</LegacyStack>
          </Text>
       
       
          <Combobox
                   allowMultiple
                   activator={
                <Combobox.TextField
                    prefix={<Icon source={SearchIcon} />}
                    onChange={updateTextCollectionModal}
                    label="Search Collection"
                    labelHidden
                    value={inputValueCollectionModal}
                    placeholder="Search Collection" 
                    autoComplete="off"
                   
              />
            }
          >
            {optionsMarkupCollectionModal ? (
              <Listbox onSelect={updateSelectionCollectionModal}>{optionsMarkupCollectionModal}</Listbox>
            ) : null}
          </Combobox>
          <Text>
            <LegacyStack >{tagsMarkupCollectionModal }</LegacyStack>
          </Text>
         
                 <Button submit>Submit</Button>  
       
              </FormLayout>
            </Form>
         
          </LegacyCard.Section>
        </LegacyCard>
                 </Modal.Section>
               </Modal>
           </div>
         

           <div className="tableAddMore" style={{width:"639px"}}>
           <LegacyCard>
        <DataTable
          columnContentTypes={[
            'text',
            'image',
            'button',
           
          ]}
          headings={[
            'Title',
            'Image',
            '',
            
          ]}
          rows={rows}
        />
      </LegacyCard>
           </div>
           {/* <LegacyCard>
        <DataTable
          columnContentTypes={['text', 'image', 'text']}
          headings={['Title', 'Image', 'Actions']}
          rows={sizeChartData.map((item) => [
            item.Title,
            <Thumbnail size="large" source={item.Image} alt="" />,
            <Button destructive onClick={() => handleDelete(item._id)}>Delete</Button>
          ])}
        />
      </LegacyCard> */}
           
   </>           
  )
}

export default AddMoreModal

