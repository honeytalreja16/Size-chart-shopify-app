// import React, { useEffect, useRef } from "react";
// import {
//   Text,
//   LegacyStack,
//   Listbox,
//   Combobox,
//   Icon,
//   Tag,
// } from "@shopify/polaris";
// import {SearchIcon} from '@shopify/polaris-icons';
// import { useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
// // import { _dispatch_UPDATE_SETTINGS_DETAILS } from "../../redux/actions/webiatorActions"; 


// const CollectionSetting = () => {
//   const[collectionSelected,setCollectionSelected]= useState([])

//       const[collectionOptions,setCollectionOption] = useState([])
//       const [collectionData,setCollectionData] = useState()
//       const [collectionInputValue,setCollectionInputValue] = useState([])
//       const [optionInfo,setOptionInfo] = useState(collectionOptions)
//   // const dispatch = useDispatch();


// const escapeSpecialRegExCharacters = useCallback(   
//     (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
//     [],
//   );
//      const updateCollection = useCallback(
//         (value) => {
//             setCollectionInputValue(value);
    
//           if (value === '') {
//             setOptionInfo(collectionOptions);
//             return;
//           }     
    
//           const UpdateRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');
//           const upadteOptions = collectionOptions.filter((option) =>
//             option.label.match(UpdateRegex),
//           );
//           setOptionInfo(upadteOptions);
      
//         },
//         [collectionOptions, escapeSpecialRegExCharacters],
//       );


//       useEffect(() => {
//         const getCollection = async()=>{
//           try {
//             const res = await fetch ("/api/getCollections")
//             console.log(res ,"collection working")
//             const resjson = await res.json()
//             console.log(resjson,"resjson is working")

//             let temparr1=[]
//             resjson.collections.forEach(x=>{
//               let tempobj= {label: x.node.title, value: x.node.id}
//               let idarr = x.node.id.split("/");
//                       let id = idarr[idarr.length - 1]
//               temparr1.push({
//                 value: x.node.title,
//                 label: x.node.title,
//                 _id: id,
//               });
//             })
//             console.log(temparr1,"arr")

//             setCollectionOption(temparr1)
//             setCollectionData(resjson)
//           } catch (error) {
//             console.log(error ,"err")
//           }

//         }

//         getCollection()
//         }, [])
    

//       const updateSelectedCollection = useCallback(
//         (updated)=>{
//           console.log(updated)
//           const updatedCollectionOption = collectionOptions.find(
//             (x)=>x._id === updated
//           )
         
//           const isUpdated = collectionOptions.findIndex(
//             (x)=>x._id === updatedCollectionOption._id
//           )
//           if (isUpdated > -1){
//               setCollectionSelected(
//                 collectionSelected.filter ((x)=>x._id !== updatedCollectionOption._id)
                
//             )
       
//           }else{
//             setCollectionSelected([
//               ...collectionSelected,
//               {
//                 value: updatedCollectionOption?.value,
//                 _id:updatedCollectionOption?._id
//               }
//             ])
       
//           }
          
          
//         }
//       )
//       const removeCollectionTag = useCallback(
//         (clctn)=>()=>{
//      const options = [...collectionSelected]
//      options.splice(options.indexOf(clctn),1)
//      setCollectionSelected(options)
//         },[collectionSelected]
//        )
 
//        const tagsCollection = collectionSelected?.map((option) => (
//            <Tag key={`option-${option}`} onRemove={removeCollectionTag(option)}>
//              {option.value} 
//            </Tag>
//          ));

//  const optionsMarkup =
//  optionInfo.length > 0
//       ? optionInfo.map((option) => {
       
//         const { label, value, _id } = option;
//         return (
//           <Listbox.Option
//             key={_id}
//             value={_id}
//             updated={collectionSelected.some(
//                 (updated) => updated?._id === _id
//             )}
            
//             accessibilityLabel={label}
//             >
           
//             {label}
//           </Listbox.Option>
//           );
//         })
//       : null;
//   const fetch = useAuthenticatedFetch();
//   const { settingsDataLoading, settingsData } = useSelector(
//     (state) => state.webiator
//   );



// // const handleSubmit = async () => {
// //     try {

// //       dispatch(
// //         _dispatch_UPDATE_SETTINGS_DETAILS({
// //           fetchFn: fetch,
// //           inputs: {
// //             loadingKey: "first_form",
           
// //             // Image: imagePath,
// //             // Product :selectedOptions,
// //             Collection :collectionSelected,    
// //             type: "settings-data",
// //           },
// //         })
// //       );
        
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// // useEffect(() => {
// //     handleSubmit()
// // }, [])



//   return (
    
//    <>
//     <Combobox
//                allowMultiple
//                activator={
//             <Combobox.TextField
//                 prefix={<Icon source={SearchIcon} />}
//                 onChange={updateCollection}
//                 label="Search Collection"
//                 labelHidden
//                 value={collectionInputValue}
//                 placeholder="Search Collection"
//                 autoComplete="off"
               
//           />
//         }
//       >
//         {optionsMarkup ? (
//           <Listbox onSelect={updateSelectedCollection}>{optionsMarkup}</Listbox>
//         ) : null}
//       </Combobox>
//       <Text>
//         <LegacyStack>{tagsCollection}</LegacyStack>
//       </Text>
//    </>
//   )
// }

// export default CollectionSetting