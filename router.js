import wikipedia from "./connectors/wikipedia.js";
import search from "./connectors/search.js";
import database from "./connectors/database.js";

const connectorMap = {
  wikipedia,
  search,
  database
};

export async function loadConnector(name) {
  return connectorMap[name];
}
