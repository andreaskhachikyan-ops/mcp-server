import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { toolSchemas } from "./schema.js";
import { loadConnector } from "./router.js";

const app = express();
app.use(cors());
app.use(express.json());

const connectorsBase = path.join(process.cwd(), "connectors");
let connectors = {};

fs.readdirSync(connectorsBase).forEach(file => {
  const name = file.replace(".js", "");
  connectors[name] = () => loadConnector(name);
});

app.get("/mcp/tools", (req, res) => {
  res.json({ tools: toolSchemas });
});

app.post("/mcp/use", async (req, res) => {
  const { tool, params } = req.body;
  if (!connectors[tool]) return res.status(400).json({ error: "Unknown tool" });

  try {
    const toolFn = await connectors[tool]();
    const result = await toolFn(params || {});
    res.json({ ok: true, tool, result });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(3000, () => console.log("Advanced MCP running on :3000"));
