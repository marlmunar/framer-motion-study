import { useState, useRef } from "react";
import Div from "./components/Div";
import "./index.css";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const limits = {
    position: "relative",
    width: 300,
    height: 300,
    backgroundColor: "cornsilk",
    borderRadius: 10,
  };

  const box = {
    width: "10rem",
    height: "10rem",
  };

  return (
    <main>
      <motion.div ref={constraintsRef} style={limits}>
        <AnimatePresence mode="wait">
          <motion.div
            style={{ ...box, x, y }}
            drag
            dragConstraints={constraintsRef}
            onDragEnd={() => {
              console.log("Final position:", x.get(), y.get());
            }}
            key={isVisible ? "visible" : "hidden"}
            initial={
              isVisible
                ? {
                    opacity: 0,
                    x: x.get(),
                    y: y.get(),
                  }
                : { x: x.get(), y: y.get() }
            }
            animate={
              isVisible
                ? {
                    x: [x.get() - 20, x.get() + 10, x.get()],
                    opacity: [0, 0.5, 1],
                    transition: {
                      duration: 1.25,
                      times: [0, 0.75, 1],
                    },
                  }
                : {
                    opacity: [1, 0.85, 0.5, 0],
                    y: [y.get(), y.get() + 10, y.get() - 50, y.get()],
                    scale: [0.9, 1, 0.65, 1],
                    transition: { duration: 1, times: [0, 0.85, 0.95, 1] },
                  }
            }
          >
            <Div />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.button
        className="btn"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95, rotate: 0.5 }}
        onClick={() => {
          setIsVisible((prev) => !prev);
          console.log(x.get(), y.get());
        }}
      >
        Show/Hide
      </motion.button>
    </main>
  );
};

export default App;
