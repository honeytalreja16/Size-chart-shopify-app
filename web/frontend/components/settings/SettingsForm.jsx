// import { LegacyCard, TextField } from '@shopify/polaris'
// import {Card, Text} from '@shopify/polaris';
// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { _dispatch_UPDATE_SETTINGS_DETAILS } from '../../redux/actions/webiatorActions';
// import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';
// import { useSelector } from 'react-redux';

// const SettingsForm = () => {
//     const [name,setName] = useState("");
//     const dispatch = useDispatch()
//     const fetch = useAuthenticatedFetch()
//      const { settingsData, settingsDataLoading, updateSettingsDataLoading } =
//         useSelector((states) => states.webiator);
//         useEffect(()=>{
// console.log(settingsData,"settings -data--")
// setName(settingsData)
//         },[settingsData])
//   return (
//    <LegacyCard    primaryFooterAction={{content: 'Save',
//     onAction:()=>{
//         dispatch(
//                      _dispatch_UPDATE_SETTINGS_DETAILS({
//                        fetchFn: fetch,
//                        inputs: {
//                          loadingKey: "chetan_form",
//                          Name:name,
//                          type: "settings-data",
//                        },
//                      })
//                    )
            
//     },
//     loading:settingsDataLoading?.chetan_form

//    }} >
  
//   <Text variant="headingMd" as="h2">Online store dashboard</Text>
//       <Text variant="headingSm" as="h3">Accounts</Text>
//         Content inside a card
//         <TextField value={name} onChange={setName} placeholder="Your Name"/>
      
  
//     </LegacyCard>
//   )
// }

// export default SettingsForm
import React, { useState } from 'react';
import { LegacyCard, Text, TextField, Button, Modal } from '@shopify/polaris';

function SettingForm() {
  const [name, setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      
      
      <LegacyCard>
       
        <Button onClick={toggleModal}>Show Upsell</Button>
      </LegacyCard>

      {/* Upsell Pop-Up */}
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={toggleModal}
          title="Don't miss these deals!"
          primaryAction={{
            content: 'Add to Cart',
            onAction: () => {
              console.log('Upsell product added to cart');
              toggleModal();
            },
          }}
          secondaryActions={[
            {
              content: 'Dismiss',
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <Text variant="bodyMd">
              {/* Check out this exclusive deal for you: <strong>Product X</strong> at a discounted price! */}
              Online Store Dashboard
      <Text variant="headingMd" as="h2">
        Online Store Dashboard
      </Text>
      <Text variant="headingSm" as="h3">
        Accounts
      </Text>
      <Text variant="bodyMd">Content inside a card</Text>
      <TextField value={name} onChange={setName} placeholder="Your Name" />
            </Text>
          </Modal.Section>
        </Modal>
      )}
    </div>
  );
}

export default SettingForm;

