export const toolSchemas = {
    wikipedia: {
      name: "wikipedia",
      description: "Searches Wikipedia",
      params: {
        type: "object",
        properties: {
          query: { type: "string" }
        },
        required: ["query"]
      }
    },
    search: {
      name: "search",
      description: "Searches the web",
      params: {
        type: "object",
        properties: {
          q: { type: "string" }
        },
        required: ["q"]
      }
    },
    database: {
      name: "database",
      description: "Run SQL on local SQLite database",
      params: {
        type: "object",
        properties: {
          sql: { type: "string" }
        },
        required: ["sql"]
      }
    }
  };
  