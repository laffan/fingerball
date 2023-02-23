import { useCallback, useState, useEffect } from "react";

const SelectCamera = ({ handleDeviceSelect }) => {
  const [deviceId, setDeviceId] = useState(false);
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback((mediaDevices) => {
    const deviceList = mediaDevices.filter(({ kind }) => kind === "videoinput");
    handleDeviceSelect(deviceList[0]);
    setDevices(deviceList)
  });

  const handleSelect = (e) => {
    setDeviceId(e.target.value);
    console.log(e.target.value);
    handleDeviceSelect(devices.filter((d) => d.label === e.target.value)[0]);
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [ ]);

  return devices.length > 1 ? (
    <div
      style={{
        border: "1px dashed orange",
        padding: 20,
      }}
    >
      <p>
        Looks like you have more than one camera! <br />
        Select the camera you would like to use:
      </p>
      <select value={deviceId} onChange={handleSelect}>
        {devices.map((device, key) => (
          <option value={device.id} key={`${key + 1}`}>
            {device.label ? device.label : `Camera ${key + 1}`}
          </option>
        ))}
      </select>
    </div>
  ) : null;
};

export default SelectCamera;
