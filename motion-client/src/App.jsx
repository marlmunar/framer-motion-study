import { useState } from "react";
import Div from "./components/Div";
import "./index.css";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <main>
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.div
            key={isVisible ? "visible" : "hidden"}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              x: [-50, 10, 0],
              opacity: [0, 0.5, 1],
              transition: {
                duration: 1.25,
                times: [0, 0.75, 1],
              },
            }}
            exit={{
              y: [10, 0, -100],
              opacity: [1, 0.85, 0],
              transition: { duration: 1, times: [0, 0.85, 1] },
            }}
          >
            <Div />
          </motion.div>
        ) : (
          <div style={{ visibility: "hidden" }}>
            <Div />
          </div>
        )}
      </AnimatePresence>

      <button className="btn" onClick={() => setIsVisible((prev) => !prev)}>
        Show/Hide
      </button>
    </main>
  );
};

export default App;
