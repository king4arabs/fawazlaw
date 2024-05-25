import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CardViewPayment = () => {
  const location = useLocation();
  const scriptRef = useRef(null);
  const [isMyFatoorahLoaded, setIsMyFatoorahLoaded] = useState(false);

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://demo.myfatoorah.com/cardview/v2/session.js';
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
    if (window.myFatoorah) {
      window.myFatoorah.submit()
        .then(response => {
          // Here you need to pass session id to your backend
          const { sessionId, cardBrand, cardIdentifier } = response;
          console.log(sessionId, cardBrand, cardIdentifier);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div className='w-full flex flex-col items-center pt-8 pb-11'>
      <h1 className='text-[20px] font-bold pb-6'>Card View Payment</h1>
      <div style={{ width: '400px' }}>
        <div id="card-element"></div>
      </div>
      <button className="border rounded-[8px] px-6 py-3" onClick={handleSubmit}>Pay Now</button>
    </div>
  );
};

export default CardViewPayment;
