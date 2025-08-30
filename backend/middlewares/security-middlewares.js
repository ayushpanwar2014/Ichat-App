import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

export const securityMiddleware = (app) => {
    // ✅ Environment-safe defaults
    const MAIN_FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:7060";

    /** 
     * 1. Helmet security headers 
     *    - Adjusted CSP for Vercel + Render 
     *    - Removed overly permissive inline scripts
     */
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: [
                        "'self'",
                        MAIN_FRONTEND_URL, // allow Vercel frontend
                    ],
                    connectSrc: [
                        "'self'",
                        MAIN_FRONTEND_URL,
                        BACKEND_URL, // allow API calls to backend
                    ],
                    imgSrc: ["'self'", "data:", MAIN_FRONTEND_URL],
                    styleSrc: ["'self'", "'unsafe-inline'", MAIN_FRONTEND_URL],
                    fontSrc: ["'self'", MAIN_FRONTEND_URL],
                    frameSrc: ["'self'", MAIN_FRONTEND_URL],
                },
            },
            crossOriginResourcePolicy: { policy: "cross-origin" },
            crossOriginEmbedderPolicy: false, // avoid blocking fonts/CDNs
        })
    );

    /**
     * 2. CORS (Cookies work: credentials:true + exact origins)
     */
    const allowedOrigins = [MAIN_FRONTEND_URL];
    app.use(
        cors({
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error("❌ Not allowed by CORS"));
                }
            },
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            credentials: true,
        })
    );

    /**
     * 3. Prevent HTTP Parameter Pollution
     */
    app.use(hpp());

    /**
     * 4. Rate Limiting (tuned for chat app with frequent polling/socket upgrades)
     */
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 mins
        max: 1000, // allow more requests since chat apps are busy
        standardHeaders: true,
        legacyHeaders: false,
        message: "🚫 Too many requests from this IP, try again later.",
    });
    app.use(limiter);

    /**
     * 5. Trust proxy (important on Render for correct cookies / IPs)
     */
    app.set("trust proxy", 1);
};
