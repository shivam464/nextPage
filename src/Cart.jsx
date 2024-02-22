// Cart.js
import React, { memo, useState } from "react";

const Cart = memo(({ toggleCartHandler, removeFromCart, cartData }) => {
  console.log("cartData", cartData);
  // const [cart, setCart] = useState([]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center">
          <h1>Cart</h1>
          <button
            type="button"
            className="btn ms-5 btn-primary position-relative"
          >
            <i
              className="fa fa-shopping-cart "
              style={{ fontSize: "24px", cursor: "pointer" }}
            ></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-secondary">
              {cartData.length}
            </span>
          </button>
        </div>
        <i
          style={{ fontSize: "24px", cursor: "pointer" }}
          className="fa"
          onClick={toggleCartHandler}
        >
          &#xf00d;
        </i>
      </div>
      <table className="table border">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Availability</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartData.length ? (
            cartData?.map((classData, index) => (
              <tr key={index}>
                <td>{`${classData.week} ${classData.month}${classData.day} 2024`}</td>
                <td>{classData.time}</td>
                <td>{`${classData.seats} seats available`}</td>
                <td>
                  <button
                    type="button"
                    className="btn w-75"
                    style={{
                      background: "#f86801",
                    }}
                    onClick={() => removeFromCart(classData.id)}
                  >
                    cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <div className="text-center">
              <p>No class booked for now</p>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default Cart;
