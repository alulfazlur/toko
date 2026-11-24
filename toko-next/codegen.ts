import type { CodegenConfig } from '@graphql-codegen/cli';

process.loadEnvFile(".env");

const schema = process.env.SALEOR_API_URL;
if (!schema) {
    throw new Error('SALEOR_API_URL environment variable is not set');
}

const config: CodegenConfig = {
    schema,
    documents: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
    ignoreNoDocuments: true,
    generates: {
        "./src/gql/": {
            preset: "client",
            presetConfig: { fragmentMasking: false },
            config: {
                documentMode: "string",
                useTypeImports: true,
            },
        },
    },
};


export default config;
