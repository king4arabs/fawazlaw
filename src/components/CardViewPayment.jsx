// // import React, { useEffect, useRef, useState } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import axios from 'axios';

// // const CardViewPayment = () => {
// //   const location = useLocation();
// //   const scriptRef = useRef(null);
// //   const [isMyFatoorahLoaded, setIsMyFatoorahLoaded] = useState(false);
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   useEffect(() => {
// //     if (!scriptRef.current) {
// //       const script = document.createElement('script');
// //       script.src = 'https://sa.myfatoorah.com/cardview/v2/session.js';
// //       script.async = true;
// //       script.onload = () => {
// //         setIsMyFatoorahLoaded(true);
// //       };
// //       document.body.appendChild(script);
// //       scriptRef.current = script;

// //       return () => {
// //         if (scriptRef.current) {
// //           document.body.removeChild(scriptRef.current);
// //           scriptRef.current = null;
// //         }
// //       };
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (isMyFatoorahLoaded && window.myFatoorah) {
// //       const config = {
// //         countryCode: location.state?.countryCode || '', // Here, add your Country Code.
// //         sessionId: location.state?.sessionId || '', // Here you add the "SessionId" you receive from InitiateSession Endpoint.
// //         cardViewId: 'card-element',
// //         supportedNetworks: 'v,m,ae,md', // This field accepts "v,m,ae,md". This will control the cardBrand that the customers can enter.
// //         onCardBinChanged: handleBinChanges,
// //         style: {
// //           hideCardIcons: false,
// //           direction: 'ltr',
// //           cardHeight: 130,
// //           tokenHeight: 150,
// //           input: {
// //             color: 'black',
// //             fontSize: '13px',
// //             fontFamily: 'sans-serif',
// //             inputHeight: '32px',
// //             inputMargin: '8Spx',
// //             borderColor: 'c7c7c7',
// //             borderWidth: '1px',
// //             borderRadius: '8px',
// //             boxShadow: '',
// //             placeHolder: {
// //               holderName: 'Name On Card',
// //               cardNumber: 'Number',
// //               expiryDate: 'MM / YY',
// //               securityCode: 'CVV',
// //             },
// //           },
// //           text: {
// //             saveCard: 'Save card info for future payment.',
// //             addCard: 'Use another Card!',
// //             deleteAlert: {
// //               title: 'Delete',
// //               message: 'Test',
// //               confirm: 'yes',
// //               cancel: 'no',
// //             },
// //           },
// //           label: {
// //             display: false,
// //             color: 'black',
// //             fontSize: '13px',
// //             fontWeight: 'normal',
// //             fontFamily: 'sans-serif',
// //             text: {
// //               holderName: 'Card Holder Name',
// //               cardNumber: 'Card Number',
// //               expiryDate: 'Expiry Date',
// //               securityCode: 'Security Code',
// //             },
// //           },
// //           error: {
// //             borderColor: 'red',
// //             borderRadius: '8px',
// //             boxShadow: '0px',
// //           },
// //         },
// //       };
// //       window.myFatoorah.init(config);
// //     }
// //   }, [isMyFatoorahLoaded, location.state]);

// //   const handleBinChanges = (bin) => {
// //     console.log(bin);
// //   };

// //   const handleSubmit = () => {
// //     console.log('fuck me please');
// //     if (window.myFatoorah && isMyFatoorahLoaded) {
// //       setIsProcessing(true);
// //       window.myFatoorah
// //         .submit()
// //         .then(async (apiResponse) => {
// //           // Renamed from 'response' to 'apiResponse'
// //           const existCart = JSON.parse(localStorage.getItem('cartItems'));
// //           const filteredData = consolidateObjects(existCart ?? []);
// //           const { sessionId, cardBrand, cardIdentifier } = apiResponse;
// //           console.log(sessionId); // Use 'apiResponse' instead of 'response'
// //           const details = {
// //             sessionID: sessionId,
// //             price: location.state.price,
// //             id: location.state.id,
// //             services: filteredData,
// //           };
// //           try {
// //             console.log(details);
// //             const postResponse = await axios.post(
// //               `${process.env.REACT_APP_BACKEND_URL}/payment/execute`,
// //               details,
// //               {
// //                 headers: {
// //                   'Content-Type': 'application/json',
// //                 },
// //               }
// //             );
// //             setIsProcessing(false);
// //             console.log(postResponse.data);
// //             const url = postResponse.data.paymentUrl;
// //             localStorage.setItem('cartItems', JSON.stringify([]));
// //             window.location.href = url;
// //           } catch (error) {
// //             setIsProcessing(false);
// //             console.error('Error fetching services:', error);
// //           }
// //         })
// //         .catch((apiError) => {
// //           console.error(apiError);
// //           setIsProcessing(false);
// //         });
// //     }
// //   };

// //   return (
// //     <div className="w-full flex flex-col items-center pt-8 pb-11">
// //       <h1 className="text-[20px] font-bold pb-6">Card View Payment</h1>
// //       <div style={{ width: '400px' }}>
// //         <div id="card-element"></div>
// //       </div>
// //       <button className="border rounded-[8px] px-6 py-3" onClick={handleSubmit}>
// //         {!isProcessing ? 'Pay Now' : 'Processing'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default CardViewPayment;

// // function consolidateObjects(objects) {
// //   const consolidated = {};

// //   objects.forEach((obj) => {
// //     if (consolidated[obj.service_id]) {
// //       consolidated[obj.service_id].quantity += obj.quantity;
// //     } else {
// //       consolidated[obj.service_id] = { ...obj };
// //     }
// //   });

// //   return Object.values(consolidated);
// // }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CardViewPayment = () => {
//   const [state, setState] = useState({
//     checkoutId: null,
//     loading: false,
//   });
//   useEffect(() => {
//     setState((ps) => ({
//       ...ps,
//       loading: true,
//     }));
//     axios
//       .post(`${process.env.REACT_APP_BACKEND_URL}/payment/checkout`)
//       .then((res) => {
//         setState({
//           loading: false,
//           checkoutId: res.data.id,
//         });
//       });
//   }, []);

//   const renderPaymentForm = () => {
//     console.log('Loading');
//     const script = document.createElement('script');
//     script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${state.checkoutId}`;
//     script.async = true;
//     document.body.appendChild(script);
//     const form = document.createElement('form');
//     form.action = `${process.env.REACT_APP_BACKEND_URL}/payment/result`;
//     form.setAttribute('class', 'paymentWidgets');
//     form.setAttribute('data-brands', 'VISA MASTER AMEX');
//     document.body.appendChild(form);
//   };

//   // return <div>CardViewPayment</div>;
//   if (!state.loading) {
//     return <div>{renderPaymentForm()}</div>;
//   } else {
//     return <div>Still Loading</div>;
//   }
// };

// export default CardViewPayment;

import React, { Component } from 'react';
import axios from 'axios';
import PaymentPageTitle from './PaymentComponents/Title';
import Tabs from './PaymentComponents/Tabs';
import WireTransferDetails from './PaymentComponents/WireTransferDetails';
import CashDetails from './PaymentComponents/CashDetails';

export default class CardViewPayment extends Component {
  state = {
    checkoutId: null,
    loading: true,
    currentTab: 'debitCard',
  };

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/payment/checkout`, {
        amount: this.getAmount(),
      })
      .then((res) => {
        this.setState(
          {
            checkoutId: res.data.id,
            loading: false,
          },
          this.renderPaymentForm()
        ); // Call renderPaymentForm once checkoutId is set
      });
  }

  componentDidUpdate(prevProps) {
    // console.log({ prevProps: prevProps });
    this.renderPaymentForm();
  }

  handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.target);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/payment/result`, formData)
      .then((response) => {
        // Handle the response from the server here
        console.log('Payment Successful', response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Payment Error', error);
      });
  };

  getAmount = () => {
    const data = JSON?.parse(localStorage?.getItem('cartItems'));
    // const amount = data.reduce((a, b) => a.price + b.price);
    // console.log({ amount, data });
    // return amount;
    if (data?.length > 1) {
      return data.reduce((a, b) => a.price + b.price);
    } else if (data?.length === 1) {
      return data[0].price;
    } else {
      window?.location?.replace('/');
    }
    // return
  };

  handleSelectTab = (tab) => {
    if (tab === 'debitCard') {
      // window.location.reload();
    }
    this.setState((ps) => {
      return {
        ...ps,
        currentTab: tab,
      };
    });
  };

  renderPaymentForm = () => {
    const { checkoutId } = this.state;

    if (!checkoutId) return; // Exit if checkoutId is not set

    const existingForm = document.querySelector('.paymentWidgets');

    if (existingForm) {
      console.log('Form already exists');
      return; // Exit if form already exists
    }

    console.log('Loading ');
    const script = document.createElement('script');
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    script.async = true;

    document.body.appendChild(script);

    const form = document.createElement('form');
    form.action = `${process.env.REACT_APP_BACKEND_URL}/payment/result`;
    form.setAttribute('class', 'paymentWidgets');
    form.setAttribute('data-brands', 'VISA MASTER AMEX');
    form.addEventListener('submit', this.handleFormSubmit);

    const paymentElement = document.getElementById('payment-component');
    console.log({ paymentElement, form });

    if (paymentElement) {
      paymentElement.appendChild(form);
    }
  };

  render() {
    return (
      <div className=" w-full lg:py-16 container my-5">
        <div className="flex justify-center items-center">
          <PaymentPageTitle />
        </div>
        <div className="flex justify-center items-center">
          <Tabs
            handleClick={this.handleSelectTab}
            currentTab={this.state.currentTab}
          />
        </div>
        {this.state.currentTab === 'debitCard' ? (
          <div id="payment-component" className="my-5">
            {this.state.loading ? <div>Still Loading</div> : null}
          </div>
        ) : this.state.currentTab === 'wireTransfer' ? (
          <WireTransferDetails />
        ) : (
          <CashDetails />
        )}
      </div>
    );
  }
}

// const CardViewPayment = () => {
//   const [state, setState] = React.useState({
//     checkoutId: null,
//     loading: true,
//   });
//   const [ifsCardPaySelected, setIfsCardPaySelected] = React.useState(false);
//   React.useEffect(() => {
//     axios
//       .post(`${process.env.REACT_APP_BACKEND_URL}/payment/checkout`)
//       .then((res) => {
//         setState({
//           checkoutId: res.data.id,
//           loading: false,
//         });
//       });
//   }, []);
//   const renderPaymentform = () => {
//     console.log('Loading ');
//     const script = document.createElement('script');

//     script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${state.checkoutId}`;
//     script.async = true;

//     document.body.appendChild(script);

//     const form = document.createElement('form');
//     form.action = `${process.env.REACT_APP_BACKEND_URL}/payment/result`;
//     form.setAttribute('class', 'paymentWidgets');
//     form.setAttribute('data-brands', 'VISA MASTER AMEX');
//     const paymentElement = document.getElementById('payment-component');
//     // console.log({ paymentElement });
//     // document.body.appendChild(form);
//     if (paymentElement) {
//       paymentElement.appendChild(form);
//     }
//   };
//   if (!state.loading) {
//     return (
//       <>
//         {!ifsCardPaySelected && (
//           <div id="payment-component">{renderPaymentform()}</div>
//         )}
//       </>
//     );
//     // return 'Hello world';
//   } else {
//     return <div> Still Loading</div>;
//   }
// };

// export default CardViewPayment;
