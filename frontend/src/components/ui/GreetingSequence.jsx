import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/dancing-script"; // or any other cursive font
import { useMediaQuery } from "@mui/material";

const greetings = [
    "Hello",          // English
    "Hallo",          // German / Dutch
    "Bonjour",        // French
    "Hola",           // Spanish
    "Ciao",           // Italian
    "Olá",            // Portuguese
    "Hej",            // Swedish / Danish
    "Hei",            // Norwegian / Finnish
    "Halló",          // Icelandic
    "Ahoj",           // Czech / Slovak
    "Hallo",          // Afrikaans
    "Salut",          // Romanian
    "Merhaba",        // Turkish
    "Shalom",         // Hebrew
    "مرحبا",          // Arabic
    "Привет",         // Russian (informal)
    "Здравствуйте",   // Russian (formal)
    "नमस्ते",         // Hindi
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",     // Punjabi
    "வணக்கம்",         // Tamil
    "ഹലോ",           // Malayalam
    "สวัสดี",         // Thai
    "こんにちは",        // Japanese
    "もしもし",         // Japanese (phone/casual)
    "안녕하세요",        // Korean
    "你好",            // Chinese (Simplified)
    "您好",            // Chinese (Simplified, polite)
    "你好",            // Chinese (Traditional)
    "您好",            // Chinese (Traditional, polite)
    "Γειά σας",        // Greek
    "Selam",          // Somali
    "Halo",           // Indonesian
    "Kamusta",        // Filipino / Tagalog
    "Sawubona"        // Zulu
];

export default function GreetingSequence() {
    const [index, setIndex] = useState(0);
    const isMobile = useMediaQuery("(max-width:768px)");
    useEffect(() => {
        if (index < greetings.length - 1) {
            const timer = setTimeout(() => setIndex((prev) => prev + 1), 2000); // 2s per greeting
            return () => clearTimeout(timer);
        }
    }, [index]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                marginLeft: isMobile ? 40: -50,
                marginRight: isMobile ? "": 50,
                width: "70%",
                marginTop:-100,
                background: "rgba(0,0,0,0)",
            }}
        >
            <AnimatePresence mode="wait">
                <motion.h1
                    key={greetings[index]}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontFamily: "'Dancing Script', cursive",
                        fontStyle: "italic",
                        fontSize: "4rem",
                        color: "rgba(255, 255, 255, 0.77)",
                        textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                        textAlign: "center"
                    }}
                >
                    {greetings[index]}
                </motion.h1>
            </AnimatePresence>
        </div>
    );
}
