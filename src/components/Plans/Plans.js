import React, { useEffect, useState } from "react";
import "./Plans.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

import firestore from "../../firebase";

function Plans() {
  const [products, setProducts] = useState([]);

  const user = useSelector(selectUser);

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    firestore
      .collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    firestore
      .collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });

        setProducts(products);
      });
  }, []);

  console.log(products);

  const loadCheckout = async (priceId) => {
    const docRef = await firestore
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occurred: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51LwoiASFEw9IQEcQXSjxQL8gPBFhOe3CUR5MkK6eF53QaPib2nl5z7UEDglR4eIDZ318m1nJXUeatPcI26KTrcFd00vpoWNZ18"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="profile-screen__plans">
      <h4>Plans {subscription && (<p>(Current Plan: {subscription.role})</p>)}</h4>
      {subscription && (<p>Renewal Date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>)}
      <div className="profile-screen__plan-desc">
        {Object.entries(products).map(([productId, productData]) => {
          const isCurrentPackage = productData.name
            ?.split(" ")[0].toLowerCase()
            .includes(subscription?.role);
          // console.log(productData.name);

          return (
            <div className="plan-screen" key={productId}>
              <div className="plan-screen__info">
                <h4>{productData.name}</h4>
                <h6>{productData.description}</h6>
              </div>
              <button
                className={`plan__subscribe ${
                  isCurrentPackage ? "plan__subscribe--disabled" : ""
                }`}
                onClick={() =>
                  !isCurrentPackage && loadCheckout(productData.prices.priceId)
                }
              >
                {isCurrentPackage ? "Current" : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Plans;
