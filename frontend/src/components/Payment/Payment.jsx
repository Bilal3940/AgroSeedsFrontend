import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import dropin from "braintree-web-drop-in"

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const stripe = useStripe();
  // const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "PKR",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  // const onApprove = async (data, actions) => {
  //   return actions.order.capture().then(function (details) {
  //     const { payer } = details;

  //     let paymentInfo = payer;

  //     if (paymentInfo !== undefined) {
  //       paypalPaymentHandler(paymentInfo);
  //     }
  //   });
  // };

  // const paypalPaymentHandler = async (paymentInfo) => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   order.paymentInfo = {
  //     id: paymentInfo.payer_id,
  //     status: "succeeded",
  //     type: "Paypal",
  //   };

  //   await axios
  //     .post(`${server}/order/create-order`, order, config)
  //     .then((res) => {
  //       setOpen(false);
  //       navigate("/order/success");
  //       toast.success("Order successful!");
  //       localStorage.setItem("cartItems", JSON.stringify([]));
  //       localStorage.setItem("latestOrder", JSON.stringify([]));
  //       window.location.reload();
  //     });
  // };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  // const paymentHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     const { data } = await axios.post(
  //       `${server}/payment/process`,
  //       paymentData,
  //       config
  //     );

  //     const client_secret = data.client_secret;

  //     if (!stripe || !elements) return;
  //     const result = await stripe.confirmCardPayment(client_secret, {
  //       payment_method: {
  //         card: elements.getElement(CardNumberElement),
  //       },
  //     });

  //     if (result.error) {
  //       toast.error(result.error.message);
  //     } else {
  //       if (result.paymentIntent.status === "succeeded") {
  //         order.paymnentInfo = {
  //           id: result.paymentIntent.id,
  //           status: result.paymentIntent.status,
  //           type: "Credit Card",
  //         };

  //         await axios
  //           .post(`${server}/order/create-order`, order, config)
  //           .then((res) => {
  //             setOpen(false);
  //             navigate("/order/success");
  //             toast.success("Order successful!");
  //             localStorage.setItem("cartItems", JSON.stringify([]));
  //             localStorage.setItem("latestOrder", JSON.stringify([]));
  //             window.location.reload();
  //           });
  //       }
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    console.log("cash on dilevery")
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
    .post(`${server}/api/v2/order/create-order`, order, config)
    .then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      // window.location.reload();
    });
  };


  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
          // Opensandbox= {Opensandbox}
            user={user}
            open={open}
            setOpen={setOpen}
            // onApprove={onApprove}
            createOrder={createOrder}
            // paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {

  const [select, setSelect] = useState(1);
  const [dropInInstance, setDropInInstance] = useState(null);
  const Opensandbox = () => {
    setSelect(2); // Set select to 2 when "Pay Now" button is clicked
    initializeDropIn();
  };

  const initializeDropIn = () => {
    // Initialize Braintree Drop-in
    dropin.create({
      authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
      container: '#dropin-container'
    }, (createErr, instance) => {
      if (createErr) {
        console.error('Error initializing Drop-in:', createErr);
        return;
      }
      setDropInInstance(instance);
    });
  };
  const handlePayment = () => {
    if (dropInInstance) {
      dropInInstance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
        if (requestPaymentMethodErr) {
          console.error('Error requesting payment method:', requestPaymentMethodErr);
          return;
        }
        // Send payment method nonce to server
        fetch(`${server}/api/v2/payment/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ paymentMethodNonce: payload.nonce })
        })
          .then(response => response.json())
          .then(result => {
            if (result.success) {
              // Handle success
              console.log('Success:', result);
            } else {
              // Handle error
              console.error('Error:', result);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    }
  };

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>

      </div>

      <br />
      {/* card payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={Opensandbox}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Card
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex-column border-b">
      <div id="dropin-container"></div>
      <button  className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}  onClick={handlePayment}>Confirm</button>
          </div>
        ) : null}

      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>

  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">PKR. {orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">PKR. {shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "PKR. " + orderData.discountPrice : "-"}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        PKR. {orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
