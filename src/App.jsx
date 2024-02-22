// App.js
import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";
import Cart from "./Cart";

const App = () => {
  const [countdown, setCountdown] = useState(0);
  const [freeSeats, setFreeSeats] = useState(0);
  const [toggleCart, settoggleCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [classes, setClasses] = useState([
    {
      week: "Mon",
      day: "1",
      month: "Feb",
    },
    {
      week: "Tue",
      day: "2",
      month: "Feb",
    },
    {
      week: "Tue",
      day: "2",
      month: "Feb",
    },
    {
      week: "Tue",
      day: "2",
      month: "Feb",
    },
    {
      week: "Tue",
      day: "2",
      month: "Feb",
    },
    {
      week: "wed",
      day: "7",
      month: "Mar",
    },
    {
      week: "Sat",
      day: "9",
      month: "Mar",
    },
    {
      week: "Sat",
      day: "19",
      month: "Mar",
    },
    {
      week: "Fri",
      day: "27",
      month: "Mar",
    },
    {
      week: "Wed",
      day: "2",
      month: "Jun",
    },
    {
      week: "Wed",
      day: "2",
      month: "Jun",
    },
    {
      week: "Wed",
      day: "2",
      month: "Jun",
    },
    {
      week: "Sun",
      day: "6",
      month: "Jun",
    },
    {
      week: "Sun",
      day: "6",
      month: "Jun",
    },
    {
      week: "Mon",
      day: "10",
      month: "Jul",
    },
    {
      week: "Fri",
      day: "15",
      month: "Jul",
    },
    {
      week: "Fri",
      day: "15",
      month: "Jul",
    },
    {
      week: "Fri",
      day: "15",
      month: "Jul",
    },
    {
      week: "Fri",
      day: "15",
      month: "Jul",
    },
  ]);

  useEffect(() => {
    const randomCountdown = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
    const randomFreeSeats = Math.floor(Math.random() * (15 - 5 + 1)) + 5;

    setCountdown(randomCountdown);
    setFreeSeats(randomFreeSeats);
  }, []);

  const removeFromCart = (classId) => {
    const updatedCartData = cartData.filter((cls) => cls.id !== classId);

    // Update the cartData state with the filtered array
    setCartData(updatedCartData);

    // Update the local storage with the filtered array
    localStorage.setItem("bookedClasses", JSON.stringify(updatedCartData));
  };
  function generateRandomTime() {
    // Generate random hours and minutes for start time
    const startHour = Math.floor(Math.random() * 12); // 0-11
    const startMinute = Math.floor(Math.random() * 60); // 0-59

    // Calculate end time by adding a random duration (between 1 and 3 hours)
    const endHour = startHour + Math.floor(Math.random() * 3) + 1; // 1-4
    const endMinute = Math.floor(Math.random() * 60); // 0-59

    // Format the time in 12-hour AM/PM format
    const startTime = `${String(startHour).padStart(2, "0")}:${String(
      startMinute
    ).padStart(2, "0")}AM`;

    const endTime = `${String(endHour % 12).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}PM`;

    return `${startTime}-${endTime}`;
  }
  const addToCart = (cls) => {
    const bookedClasses =
      JSON.parse(localStorage.getItem("bookedClasses")) || [];
    bookedClasses.push(cls);
    localStorage.setItem("bookedClasses", JSON.stringify(bookedClasses));
    setCartData((prevCart) => [...prevCart, cls]);
  };
  const VerifyIsBooked = (localStorageData, cls) => {
    let isPresent = false;
    localStorageData.forEach((obj) => {
      if (obj.id === cls.id) {
        alert("You have already booked this slot.");
        isPresent = true;
      }
    });
    return isPresent;
  };

  const handleBookNow = (classId, cls) => {
    const bookedClasses =
      JSON.parse(localStorage.getItem("bookedClasses")) || [];

    let count = 0;
    if (bookedClasses.length) {
      bookedClasses.forEach((obj) => {
        if (obj.day == cls.day) {
          count++;
          if (count === 3) {
            // alert("You can only book a maximum of 3 classes per week");
            return;
          }
        }
      });
    }

    if (count >= 3) {
      alert("You can only book a maximum of 3 classes per week");
      return;
    }

    if (VerifyIsBooked(bookedClasses, cls)) {
      return;
    }

    setClasses((prevClasses) =>
      prevClasses.map((prevCls) =>
        prevCls.id === classId
          ? { ...prevCls, seats: prevCls.seats - 1 }
          : prevCls
      )
    );

    addToCart(cls);
  };

  const generateRandomSeats = () => {
    return Number(Math.floor(Math.random() * 10) + 1);
  };
  function generateRandomNumber(max) {
    // Ensure min and max are integers
    // min = Math.ceil(min);
    max = Math.floor(max);

    // Generate a random number within the specified range
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
  }
  const toggleCartHandler = () => {
    settoggleCart((prev) => !prev);
  };
  useEffect(() => {
    let classesData = classes.map((classData, index) => {
      return {
        ...classData,
        id: index,
        seats: generateRandomSeats(),
        time: generateRandomTime(),
      };
    });

    for (let index = 1; index <= 5; index++) {
      let randomIndex = generateRandomNumber(classesData.length - 3);
      const element = classesData[randomIndex];
      element.seats = 0;
    }

    setClasses(classesData);
  }, [setClasses]);
  useEffect(() => {
    const bookedClasses =
      JSON.parse(localStorage.getItem("bookedClasses")) || [];
    setCartData(bookedClasses);
  }, []);

  return (
    <div className="container-fluid">
      {toggleCart ? (
        <div className="container-md w-75 mt-5">
          <Cart
            toggleCartHandler={toggleCartHandler}
            cartData={cartData}
            removeFromCart={removeFromCart}
          />
        </div>
      ) : (
        <div className="container-md w-75 mt-5">
          <div className="">
            {countdown && <Countdown seconds={countdown} />}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <p>Free Seats Left: {freeSeats}</p>
              <div>
                <button
                  type="button"
                  className="btn btn-primary position-relative"
                >
                  <i
                    className="fa fa-shopping-cart "
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={toggleCartHandler}
                  ></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-secondary">
                    {cartData.length}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="">
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
                {classes.map((classData, index) => (
                  <tr key={index}>
                    <td>{`${classData.week} ${classData.month}${classData.day} 2024`}</td>
                    <td>{classData.time}</td>
                    <td>{`${classData.seats} seats available`}</td>
                    <td>
                      {classData.seats !== 0 ? (
                        <button
                          type="button"
                          className="btn w-75"
                          style={{
                            background: "#f86801",
                          }}
                          onClick={() => handleBookNow(classData.id, classData)}
                        >
                          Book Now
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-danger w-75"
                          style={{ cursor: "no-drop" }}
                          disabled
                        >
                          Full
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
