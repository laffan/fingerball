import { useRef, useState, useEffect } from "react";
import SelectCamera from "../components/SelectCamera";

const Home = () => {
  return (
    <div>
      <a href="?game=not-a-real-hash-yet">Play</a>
      <br />
      <SelectCamera />
    </div>
  );
};

export default Home;