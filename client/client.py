import requests
from groq import Groq

MCP_URL = "http://localhost:3000"

def ask_router(prompt):
    client = Groq(api_key="your-free-key")
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Choose the right tool: wikipedia, search, or database."},
            {"role": "user", "content": prompt}
        ],
        functions=[
            {
                "name": "wikipedia",
                "parameters": {"type": "object","properties":{"query":{"type":"string"}},"required":["query"]}
            },
            {
                "name": "search",
                "parameters": {"type":"object","properties":{"q":{"type":"string"}},"required":["q"]}
            },
            {
                "name": "database",
                "parameters": {"type":"object","properties":{"sql":{"type":"string"}},"required":["sql"]}
            }
        ]
    )
    return response

def call_mcp(tool, params):
    res = requests.post(MCP_URL + "/mcp/use", json={"tool": tool, "params": params})
    return res.json()

user = "Find me info about black holes"
router_out = ask_router(user)

tool_call = router_out["choices"][0]["message"]["function_call"]
tool = tool_call["name"]
params = eval(tool_call["arguments"])

result = call_mcp(tool, params)
print(result)
