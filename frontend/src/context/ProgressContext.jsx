import { createContext, useContext, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const ref = useRef(null);

    const startProgress = () => {
        ref.current.continuousStart();
    };

    const completeProgress = () => {
        ref.current.complete();
    };

    return (
        <ProgressContext.Provider value={{ startProgress, completeProgress }}>
            {/* Top loading bar */}
            <LoadingBar
                id="top-loading-bar"
                ref={ref}
                height={4}
                shadow={true}
                className="gradient-loading-bar"
            />
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);
