import { useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";

const SelectCamera = () => {
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <>
      {devices.length > 1 ? (
        <div>
          <p>Select the camera you would like to use:</p>
          <select>
            {devices.map((device, key) => (
              <option value={`${key + 1}`}>{device.label}</option>
            ))}
          </select>
        </div>
      ):
      <p>This game will use {devices[0].label}.</p>}
    </>
  );
};

export default SelectCamera;
