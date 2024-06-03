import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const CardViewPayment = () => {
  const location = useLocation();
  const scriptRef = useRef(null);
  const [isMyFatoorahLoaded, setIsMyFatoorahLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://sa.myfatoorah.com/cardview/v2/session.js';
      script.async = true;
      script.onload = () => {
        setIsMyFatoorahLoaded(true);
      };
      document.body.appendChild(script);
      scriptRef.current = script;

      return () => {
        if (scriptRef.current) {
          document.body.removeChild(scriptRef.current);
          scriptRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    if (isMyFatoorahLoaded && window.myFatoorah) {
      const config = {
        countryCode: location.state?.countryCode || '', // Here, add your Country Code.
        sessionId: location.state?.sessionId || '', // Here you add the "SessionId" you receive from InitiateSession Endpoint.
        cardViewId: 'card-element',
        supportedNetworks: 'v,m,ae,md', // This field accepts "v,m,ae,md". This will control the cardBrand that the customers can enter.
        onCardBinChanged: handleBinChanges,
        style: {
          hideCardIcons: false,
          direction: 'ltr',
          cardHeight: 130,
          tokenHeight: 150,
          input: {
            color: 'black',
            fontSize: '13px',
            fontFamily: 'sans-serif',
            inputHeight: '32px',
            inputMargin: '8Spx',
            borderColor: 'c7c7c7',
            borderWidth: '1px',
            borderRadius: '8px',
            boxShadow: '',
            placeHolder: {
              holderName: 'Name On Card',
              cardNumber: 'Number',
              expiryDate: 'MM / YY',
              securityCode: 'CVV',
            },
          },
          text: {
            saveCard: 'Save card info for future payment.',
            addCard: 'Use another Card!',
            deleteAlert: {
              title: 'Delete',
              message: 'Test',
              confirm: 'yes',
              cancel: 'no',
            },
          },
          label: {
            display: false,
            color: 'black',
            fontSize: '13px',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            text: {
              holderName: 'Card Holder Name',
              cardNumber: 'Card Number',
              expiryDate: 'Expiry Date',
              securityCode: 'Security Code',
            },
          },
          error: {
            borderColor: 'red',
            borderRadius: '8px',
            boxShadow: '0px',
          },
        },
      };
      window.myFatoorah.init(config);
    }
  }, [isMyFatoorahLoaded, location.state]);

  const handleBinChanges = (bin) => {
    console.log(bin);
  };

  const handleSubmit = () => {
    console.log("fuck me please");
    if (window.myFatoorah && isMyFatoorahLoaded) {
      setIsProcessing(true);
      window.myFatoorah.submit()
       .then(async apiResponse => { // Renamed from 'response' to 'apiResponse'
        const existCart = JSON.parse(localStorage.getItem("cartItems"));
        const filteredData = consolidateObjects(existCart ?? []);
          const { sessionId, cardBrand, cardIdentifier } = apiResponse;
          console.log(sessionId); // Use 'apiResponse' instead of 'response'
          const details = {
            "sessionID": sessionId,
            "price": location.state.price,
            "id": location.state.id,
            "services": filteredData
          };
          try {
            console.log(details);
            const postResponse = await axios.post("http://localhost:3001/api/payment/execute", details, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            setIsProcessing(false);
            console.log(postResponse.data); 
            const url = postResponse.data.paymentUrl; 
            localStorage.setItem("cartItems", JSON.stringify([]));
            window.location.href = url;
          } catch (error) {
            setIsProcessing(false);
            console.error("Error fetching services:", error);
          }
        })
       .catch(apiError => { 
          console.error(apiError);
          setIsProcessing(false);
        });
    }
  };

  return (
    <div className='w-full flex flex-col items-center pt-8 pb-11'>
      <h1 className='text-[20px] font-bold pb-6'>Card View Payment</h1>
      <div style={{ width: '400px' }}>
        <div id="card-element"></div>
      </div>
      <button className="border rounded-[8px] px-6 py-3" onClick={handleSubmit}>{!isProcessing? "Pay Now": "Processing"}</button>
    </div>
  );
};

export default CardViewPayment;


function consolidateObjects(objects) {
  const consolidated = {};

  objects.forEach((obj) => {
    if (consolidated[obj.service_id]) {
      consolidated[obj.service_id].quantity += obj.quantity;
    } else {
      consolidated[obj.service_id] = { ...obj };
    }
  });

  return Object.values(consolidated);
}
