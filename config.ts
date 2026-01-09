import dotenv from "dotenv";
dotenv.config();

export const config = (): { userSecret: string; adminSecret: string; port: string | number; trustedOrigins: string[] } => {
    const userSecret = process.env.JWT_USER_SECRET;
    if (!userSecret) throw new Error("JWT_USER_SECRET is not defined in env");

    const adminSecret = process.env.JWT_ADMIN_SECRET;
    if (!adminSecret) throw new Error("JWT_ADMIN_SECRET is not defined in env");

    const trustedOrigins = (process.env.TRUSTED_ORIGINS || "https://localhost:3000").split(",");
    if (trustedOrigins.length === 0) throw new Error("TRUSTED_ORIGINS is not defined in env");

    const port = process.env.PORT || 8080;

    return {
        userSecret,
        adminSecret,
        port,
        trustedOrigins
    };
}