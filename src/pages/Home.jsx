import { useRef, useState, useEffect } from "react";
import SelectCamera from "../components/SelectCamera";
import logo from "./../fingerball-logo.png";

const Home = () => {
  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [deviceId, setDeviceId] = useState(false);

  const handleDeviceSelect = ( obj ) => {
    // console.log( obj );
    setDeviceId( obj && obj.deviceId );
  }
  return (
    <main
      className="Home"
      style={{
        textAlign: "center",
        margin: 100,
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#333333",
        paddingBottom: 100,
        display: "block",
      }}
    >
      <div
        className="Logo"
        style={{
          width: 600,
          maxWidth: "90%",
          margin: "0 auto",
        }}
      >
        <img src={logo} alt="Logo" style={{ width: "100%", height: "auto" }} />
      </div>
      <h3
        style={{
          fontSize: 30,
          width: 650,
          maxWidth: "90%",
          margin: "50px auto",
        }}
      >
        Fingerball is a ball bouncing game that you control with your index
        finger.
      </h3>
      {isMobileDevice ? (
        <p
          style={{
            fontWeight: "bold",
            border: "1px solid orange",
            padding: 20,
            display: "inline-block",

          }}
        >
          Unfortunately, fingerball is not ready for mobile devices quite yet.
        </p>
      ) : (
        <div
          style={{
            width: 550,
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          <p>
            Note: When you press the Play button you'll need to give the game
            permission to use your webcam.
          </p>
          <SelectCamera handleDeviceSelect={handleDeviceSelect} />
          <a
            style={{
              fontSize: 30,
              marginTop: 30,
              fontWeight: "bold",
              display: "inline-block",
              padding: "15px 50px",
              borderRadius: 30,
              backgroundColor: "#FFAE00",
              textDecoration: "none",
              color: "white",
            }}
            href={`?game=hash&${ deviceId ? 'deviceId=' + deviceId : "" }`}
          >
            Play
          </a>
        </div>
      )}
    </main>
  );
};

export default Home;
