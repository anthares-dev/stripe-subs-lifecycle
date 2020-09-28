import React, { useState } from "react";
import "./App.css";
import StripeSampleFooter from "./StripeSampleFooter";
import TopNavigationBar from "./TopNavigationBar";
import { Redirect } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    return fetch(`/retrieve-customer?email=${email}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result) {
          setCustomer(result.customer);
        } else {
          setError(
            "There is no such customer in Stipe account. Please sign up first at /signup page"
          );
        }
      });
  };

  console.log(customer);
  console.log(error);

  if (customer) {
    //? if there is a subscription go to account page
    //? otherwise have to subscribe to a plan
    return customer.subscriptions.data.length ? (
      <Redirect
        to={{
          pathname: "/account",
          state: {
            accountInformation: {
              paymentMethodId:
                customer["invoice_settings"]["default_payment_method"],
              priceId: customer.subscriptions.data[0].items.data[0].plan.name.includes(
                "Professional"
              )
                ? "Professional"
                : customer.subscriptions.data[0].items.data[0].plan.name.includes(
                    "Studio"
                  )
                ? "Studio"
                : "Lab",
              subscription: customer.subscriptions.data[0],
            },
          },
        }}
      />
    ) : (
      <Redirect
        to={{
          pathname: "/prices",
          state: { customer: customer },
        }}
      />
    );
  } else {
    return (
      <div>
        <div className="antialiased p-6">
          {/* <TopNavigationBar loggedIn={false} /> */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm m-6">
              <img
                src="https://mick.sequentiabiotech.com/wp-content/uploads/2020/02/logo-sticky-mick.png"
                alt="logo mick"
                className="mb-5 pl-5"
              />
              <br />
              <br />
              <div className="text-mick font-semibold text-xl mb-4">
                Check your subscription
              </div>

              <form id="signup-form" onSubmit={handleSubmit}>
                <div className="w-full mb-2">
                  <input
                    className="appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pasha"
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                  />
                </div>

                <button
                  id="email-submit"
                  className="w-full bg-pasha hover:bg-red-200 hover:shadow-outline rounded-md hover:text-mick hover:border hover:border-black focus:shadow-outline text-white focus:bg-white focus:text-mick font-light py-2 px-4 rounded"
                  type="submit"
                >
                  <div id="loading" className="hidden">
                    Logging in...
                  </div>
                  <span id="button-text">Log in</span>
                </button>
                {error ? error : null}
              </form>
            </div>
          </div>
        </div>
        <StripeSampleFooter />
      </div>
    );
  }
}

export default Login;
