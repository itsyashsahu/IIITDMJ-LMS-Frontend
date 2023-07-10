import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://0.0.0.0:1337/graphql",
  documents: "src/**/*.graphql",
  generates: {
    // "src/gql/": {
    "./src/__generated__/graphql.ts": {
      // preset: "client",
      // preset: "typescript",
      // preset: "client-preset",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
        // "typescript-graphql-request",
        // "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        fetcher: "graphql-request",
      },
    },
  },
};

export default config;

// import type { CodegenConfig } from "@graphql-codegen/cli";

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://0.0.0.0:1337/graphql",
//   // schema: "http://localhost:1337/graphql",
//   documents: "src/**/*.graphql",
//   generates: {
//     "src/gql/": {
//       plugins: [
//         "typescript",
//         "typescript-operations",
//         // "typescript-react-query",
//         "typescript-graphql-request",
//       ],
//       config: {
//         fetcher: "graphql-request",
//         // fetcher: "fetch",
//         rawRequest: true,
//       },
//     },
//   },
// };

// export default config;
