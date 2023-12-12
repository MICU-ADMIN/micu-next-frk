import { AnimatePresence, motion } from "framer-motion"; // Import Framer Motion components
import { useCallback, useState } from "react"; // Import React hooks

const containerVariants = {
  // Define animation variants for the container
  hidden: {
    // Hidden state
    translateY: 50, // Move up 50 pixels
    opacity: 0, // Fade out
  },
  show: {
    // Shown state
    translateY: 0, // Move down to original position
    opacity: 1, // Fade in
    transition: {
      // Transition options
      staggerChildren: 0.1, // Stagger animation for child elements
      delayChildren: 0.3, // Delay animation for child elements
    },
  },
};

const itemVariants = {
  // Define animation variants for list items
  hidden: {
    // Hidden state
    translateY: 25, // Move up 25 pixels
    opacity: 0, // Fade out
  },
  show: {
    // Shown state
    translateY: 0, // Move down to original position
    opacity: 1, // Fade in
  },
};

const FabButton = () => {
  // FabButton component
  const [isFabEnabled, setIsFabEnabled] = useState(false); // State variable to track FAB button state

  const toggleFAB = useCallback(() => {
    // Toggle FAB button state
    setIsFabEnabled((prevState) => !prevState);
  }, []);

  return (
    <div // FAB button container
      className="bg-primary h-16 w-16 rounded-full p-0.5 rounded-br-md fixed bottom-5 right-5 flex items-center justify-center shadow-primary shadow-sm hover:shadow-md hover:shadow-primary cursor-pointer active:scale-95 transition-all ease-in"
    >
      <div // FAB button icon container
        onClick={toggleFAB}
        className={`select-none secondaryBorderThick rounded-full w-full h-full flex items-center justify-center transition-transform ease-in ${
          isFabEnabled ? "rotate-[315deg]" : ""
        }`}
      >
        <svg // FAB button icon
          className="floater__btn-icon floater__btn-icon-plus"
          width="18px"
          height="18px"
          viewBox="672 53 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2200/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          {/* SVG path */}
        </svg>
      </div>

      <AnimatePresence>
        {" "}
        // Animated list of items
        {isFabEnabled && ( // Render list items if FAB is enabled
          <motion.ul // Animated list container
            variants={containerVariants} // Use container animation variants
            initial="hidden" // Start in hidden state
            animate="show" // Animate to shown state
            exit="hidden" // Animate to hidden state when unmounting
            className="absolute bottom-20 flex justify-between flex-col items-center gap-2"
          >
            <motion.li // Animated list item A
              variants={itemVariants} // Use item A animation variants
              className="h-14 w-14 rounded-full bg-cyan-500"
            ></motion.li>

            <motion.li // Animated list item B
              variants={itemVariants} // Use item B animation variants
              className="h-14 w-14 rounded-full bg-[#F4458D]"
            ></motion.li>

            <motion.li // Animated list item C
              variants={itemVariants} // Use item C animation variants
              className="h-14 w-14 rounded-full bg-[#0094E8]"
            ></motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FabButton;
