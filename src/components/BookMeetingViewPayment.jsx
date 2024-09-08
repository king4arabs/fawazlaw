import React, { Component } from 'react';
import axios from 'axios';
import PaymentPageTitle from './PaymentComponents/Title';
import Tabs from './PaymentComponents/Tabs';
import WireTransferDetails from './PaymentComponents/WireTransferDetails';
import CashDetails from './PaymentComponents/CashDetails';

export default class BookMeetingViewPayment extends Component {
  state = {
    checkoutId: null,
    loading: true,
    currentTab: 'debitCard',
  };

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/payment/checkout`, {
        // amount: this.getAmount(),
        amount: 500,
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
