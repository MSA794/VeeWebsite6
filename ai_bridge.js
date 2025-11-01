// ai_bridge.js - client helper to call server proxy (fill AI_BRIDGE_URL after deploy)
const AI_BRIDGE_URL = ""; // set this to your deployed endpoint, e.g. https://your-app.vercel.app/vee-ai
async function callAIBridge(message){
  if(!AI_BRIDGE_URL) throw new Error('AI bridge not configured');
  const r = await fetch(AI_BRIDGE_URL, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ message }) });
  if(!r.ok) throw new Error('AI bridge returned '+r.status);
  return r.json();
}
window.callAIBridge = callAIBridge;
