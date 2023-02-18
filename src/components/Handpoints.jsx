import { useRef, useEffect, useMemo, useState } from "react";
import ml5 from "ml5";
import { throttle } from "lodash";
import { scaleLinear } from "d3-scale";

// domain : 580(left), 50 (right)
// domain : 151(top), 450 (bottom)
// domain : -60(front), -10(back)

// Need to normalize to a 5, -5 box
const scaleX = scaleLinear().domain([560, 90]).range([5, -5]);
const scaleY = scaleLinear().domain([430, 60]).range([5, -5]);
// const scaleZ = scaleLinear().domain([6, -20]).range([5, -5]);

const HandPoints = ({ webcamRef, onHandPositionUpdate }) => {
  const [fingerPosition, setFingerPosition] = useState(false);

  const vidSize = { width: 370 / 2, height: 280 / 2 };

  // Use a memo'd throttle to prevent state updates
  // from occuring each frame.

  const throttledStateUpdate = useMemo(
    () =>
      throttle((results) => {
        setFingerPosition(results);
      }, 100),
    []
  );

  const smoothSample = (collected) => {
    let xs = collected.reduce(
      (acc, curr) => (acc + curr[0]), 0
    );
    let ys = collected.reduce(
      (acc, curr) => (acc + curr[1]), 0
    );
    let zs = collected.reduce(
      (acc, curr) => (acc + curr[2]), 0
    );
    return [xs / 10, ys / 10, zs / 10];
  };

  useEffect(() => {
    // Set video size once
    webcamRef.current.video.width = vidSize.width;
    webcamRef.current.video.height = vidSize.height;
    let sampleSize = 10;
    let sampleCount = 0;
    let sample = [];
    // Once model is updated, ping throttledStateUpdate
    // with new updated state each frame.
    const modelLoaded = () => {
      handpose.on("hand", (results) => {
        if (results && typeof results[0] !== "undefined") {
          // smooth jitter by averaging a sample
          if (sampleCount === sampleSize) {
            const smoothedSample = smoothSample(sample);
            throttledStateUpdate(smoothedSample);
            sampleCount = 0;
            sample = [];
          } else {
            sample.push(results[0].annotations.indexFinger[0]);
            sampleCount++;
          }
        }
      });
    };

    const handpose = ml5.handpose(webcamRef.current.video, modelLoaded);
  }, []);

  useEffect(() => {
    if (fingerPosition) {
      onHandPositionUpdate([
        scaleX(fingerPosition[0]),
        scaleY(fingerPosition[1]),
        0,
      ]);
    }
  }, [fingerPosition]);
};

export default HandPoints;
