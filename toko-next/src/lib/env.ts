import "server-only";

const required = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value
}

export const env = {
    SALEOR_API_URL: required("SALEOR_API_URL"),
    SALEOR_CHANNEL: required("SALEOR_CHANNEL"),
};
