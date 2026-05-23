// ╔══════════════════════════════════════════════════════════════════════╗
// ║  Dr.AIX — "Where AI Meets Human Wellness"                          ║
// ║  Production-Grade AI Wellness Platform                             ║
// ║  Real DeviceMotion · Real Page Visibility · Anthropic AI           ║
// ║  MongoDB Atlas API Layer · JWT Auth · Multilingual Chatbot         ║
// ╚══════════════════════════════════════════════════════════════════════╝

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Activity, Brain, Heart, Moon, Droplets, Monitor,
  Smile, Flame, Clock, Target, LogOut,
  Plus, Trash2, X, CheckCircle,
  BarChart2, Send, Home,
  FileText, Eye, Loader2, Globe, Edit3, Save,
  Shield, Play, RefreshCw, StopCircle,
  Zap, Download
} from "lucide-react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GLOBAL CSS INJECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DRAIX_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --bg:#05050F;--bg2:#0A0A1E;--bg3:#10102E;
  --s1:rgba(255,255,255,.032);--s2:rgba(255,255,255,.06);--s3:rgba(255,255,255,.095);
  --bd:rgba(255,255,255,.07);--bd2:rgba(255,255,255,.12);--bd3:rgba(255,255,255,.18);
  --tx:#DDE6FF;--tx2:rgba(221,230,255,.58);--tx3:rgba(221,230,255,.32);
  --t:#00F5C8;--t10:rgba(0,245,200,.1);--t20:rgba(0,245,200,.2);--t40:rgba(0,245,200,.4);
  --v:#818CF8;--v10:rgba(129,140,248,.1);--v20:rgba(129,140,248,.2);
  --b:#38BDF8;--b10:rgba(56,189,248,.1);--b20:rgba(56,189,248,.2);
  --a:#FBBF24;--a10:rgba(251,191,36,.1);--g:#34D399;--g10:rgba(52,211,153,.1);
  --r:#F87171;--r10:rgba(248,113,113,.1);--o:#FB923C;--o10:rgba(251,146,60,.1);
  --ff-h:'Syne',sans-serif;--ff-b:'DM Sans',sans-serif;--ff-m:'DM Mono',monospace;
  --sw:234px;--hdr:54px;
}
html,body,#root{height:100%;background:var(--bg);color:var(--tx);font-family:var(--ff-b);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-thumb{background:rgba(0,245,200,.18);border-radius:2px}
input,select,textarea,button{font-family:inherit}
a{color:var(--t);text-decoration:none}

/* LAYOUT */
.shell{display:flex;height:100vh;overflow:hidden;position:relative}
.sidebar{width:var(--sw);min-width:var(--sw);height:100vh;background:rgba(5,5,15,.96);border-right:1px solid var(--bd);display:flex;flex-direction:column;padding:0 10px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);overflow-y:auto;overflow-x:hidden;flex-shrink:0;z-index:80;transition:transform .28s cubic-bezier(.22,1,.36,1)}
.topbar{height:var(--hdr);background:rgba(5,5,15,.88);border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 16px;gap:12px;flex-shrink:0;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.page-wrap{flex:1;overflow-y:auto;overflow-x:hidden}
.page{padding:24px 28px;min-height:100%;animation:pgIn .32s cubic-bezier(.22,1,.36,1)}

/* ── TABLET ── */
@media(max-width:860px){
  :root{--sw:60px}
  .nav-txt{display:none!important}
  .logo-txt{display:none!important}
  .page{padding:16px}
}

/* ── MOBILE (≤600px) — sidebar becomes bottom nav ── */
@media(max-width:600px){
  .shell{flex-direction:column}
  .sidebar{
    position:fixed;bottom:0;left:0;right:0;top:auto;
    width:100%!important;min-width:100%!important;
    height:64px;flex-direction:row;align-items:center;
    padding:0 8px;border-right:none;border-top:1px solid var(--bd);
    overflow:hidden;z-index:200
  }
  .sidebar-user-section{display:none!important}
  .sidebar-cap{display:none!important}
  .main{margin-bottom:64px}
  .page{padding:14px 14px 20px}
  .topbar{padding:0 14px}
  .nav-txt{display:none!important}
  .logo-txt{display:none!important}
  .ni{flex-direction:column;gap:3px;padding:8px 6px;flex:1;justify-content:center;border-radius:10px;font-size:9px!important;min-width:0}
  .ni svg{flex-shrink:0}
  .ni-label-mobile{display:block!important;font-size:9px;font-family:var(--ff-h);font-weight:700;letter-spacing:.3px;color:inherit;text-align:center;white-space:nowrap}
  .orb{display:none}
}
@media(min-width:601px){.ni-label-mobile{display:none!important}}

/* GLASS CARDS */
.glass{background:var(--s1);border:1px solid var(--bd);border-radius:16px;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%)}
.card{background:var(--s1);border:1px solid var(--bd);border-radius:16px;transition:border-color .2s,transform .22s,box-shadow .22s;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.card:hover{border-color:var(--bd2);transform:translateY(-2px);box-shadow:0 12px 36px rgba(0,0,0,.4)}
.card-t{box-shadow:inset 0 0 40px rgba(0,245,200,.024),0 0 0 1px rgba(0,245,200,.07)}
.card-v{box-shadow:inset 0 0 40px rgba(129,140,248,.024),0 0 0 1px rgba(129,140,248,.07)}

/* BUTTONS */
.btn-p{background:linear-gradient(135deg,var(--t),var(--b));border:none;border-radius:11px;padding:10px 20px;color:#030820;font-family:var(--ff-h);font-weight:700;font-size:13.5px;cursor:pointer;transition:transform .18s,box-shadow .18s;display:inline-flex;align-items:center;gap:7px;white-space:nowrap;outline:none;letter-spacing:.1px}
.btn-p:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(0,245,200,.28)}
.btn-p:active{transform:translateY(0)}
.btn-p:disabled{opacity:.5;pointer-events:none}
.btn-s{background:var(--s2);border:1px solid var(--bd2);border-radius:11px;padding:9px 18px;color:var(--tx);font-family:var(--ff-b);font-weight:500;font-size:13.5px;cursor:pointer;transition:all .18s;display:inline-flex;align-items:center;gap:7px;outline:none}
.btn-s:hover{background:var(--s3);border-color:var(--bd3)}
.btn-s:disabled{opacity:.5;pointer-events:none}
.btn-d{background:var(--r10);border:1px solid rgba(248,113,113,.22);border-radius:9px;padding:7px 13px;color:var(--r);font-size:12.5px;cursor:pointer;transition:all .18s;display:inline-flex;align-items:center;gap:5px;outline:none}
.btn-d:hover{background:rgba(248,113,113,.16)}
.ib{background:var(--s1);border:1px solid var(--bd);border-radius:9px;padding:7px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .18s;color:var(--tx2);outline:none}
.ib:hover{background:var(--s2);color:var(--tx);border-color:var(--bd2)}

/* FORMS */
.flabel{font-size:11px;font-weight:600;color:var(--tx2);text-transform:uppercase;letter-spacing:.8px;font-family:var(--ff-h);display:block;margin-bottom:5px}
.finput{background:rgba(255,255,255,.04);border:1px solid var(--bd);border-radius:11px;padding:10px 14px;color:var(--tx);font-family:var(--ff-b);font-size:13.5px;width:100%;outline:none;transition:border-color .18s,background .18s;-webkit-appearance:none}
.finput:focus{border-color:var(--t40);background:rgba(0,245,200,.025)}
.finput::placeholder{color:var(--tx3)}
select.finput option{background:#0A0A1E;color:var(--tx)}

/* NAV */
.ni{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:11px;cursor:pointer;transition:all .18s;font-size:13.5px;font-weight:500;color:var(--tx2);border:1px solid transparent;user-select:none;white-space:nowrap}
.ni:hover{color:var(--tx);background:var(--s2)}
.ni.act{color:var(--t);background:var(--t10);border-color:rgba(0,245,200,.1);font-weight:600}

/* TYPOGRAPHY */
.h1{font-family:var(--ff-h);font-size:26px;font-weight:800;letter-spacing:-.5px;line-height:1.2}
.h2{font-family:var(--ff-h);font-size:18px;font-weight:700;letter-spacing:-.3px}
.h3{font-family:var(--ff-h);font-size:14px;font-weight:700;letter-spacing:-.1px}
.cap{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.9px;font-family:var(--ff-h);color:var(--tx3)}
.mono{font-family:var(--ff-m)}
.grad{background:linear-gradient(135deg,var(--t),var(--b));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-v{background:linear-gradient(135deg,var(--v),#C4B5FD);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* MISC COMPONENTS */
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px;font-family:var(--ff-h)}
.pbar{height:4px;border-radius:3px;background:rgba(255,255,255,.06);overflow:hidden}
.pbar-f{height:100%;border-radius:3px;transition:width 1.3s cubic-bezier(.22,1,.36,1)}
.divider{height:1px;background:var(--bd);margin:4px 0}
.orb{position:fixed;border-radius:50%;filter:blur(130px);pointer-events:none;z-index:0;animation:orbF 22s ease-in-out infinite}
.dot-bg{background-image:radial-gradient(circle,rgba(0,245,200,.05) 1px,transparent 1px);background-size:28px 28px}

/* CHAT */
.chat-ai{background:rgba(255,255,255,.04);border:1px solid var(--bd2);border-radius:16px 16px 16px 4px;padding:11px 15px;font-size:13.5px;line-height:1.7;max-width:84%}
.chat-user{background:var(--t10);border:1px solid rgba(0,245,200,.18);border-radius:16px 16px 4px 16px;padding:11px 15px;font-size:13.5px;line-height:1.7;max-width:84%;margin-left:auto}
.typing-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--t);animation:tdot 1.2s ease-in-out infinite}

/* ANIMATIONS */
@keyframes pgIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes orbF{0%,100%{transform:translate(0,0)}40%{transform:translate(35px,-30px)}70%{transform:translate(-22px,18px)}}
@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
@keyframes toastIn{from{transform:translateX(108%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes alertIn{from{opacity:0;transform:translateY(-16px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes stepBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
@keyframes glowT{0%,100%{box-shadow:0 0 14px rgba(0,245,200,.2)}50%{box-shadow:0 0 28px rgba(0,245,200,.45)}}
@keyframes tdot{0%,60%,100%{opacity:.2;transform:scale(.75)}30%{opacity:1;transform:scale(1)}}
@keyframes countUp{from{opacity:.3;transform:scale(.92)}to{opacity:1;transform:scale(1)}}

.sk{background:linear-gradient(90deg,rgba(255,255,255,.032) 25%,rgba(255,255,255,.065) 50%,rgba(255,255,255,.032) 75%);background-size:600px 100%;animation:shimmer 1.5s infinite;border-radius:8px}
.s1{animation:fadeUp .38s .04s both}.s2{animation:fadeUp .38s .08s both}.s3{animation:fadeUp .38s .12s both}
.s4{animation:fadeUp .38s .16s both}.s5{animation:fadeUp .38s .20s both}.s6{animation:fadeUp .38s .24s both}

/* Responsive grid helpers */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.grid-4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px}
.grid-score{display:grid;grid-template-columns:260px 1fr;gap:16px}
.grid-chart{display:grid;grid-template-columns:1.7fr 1fr;gap:16px}
@media(max-width:860px){
  .grid-3{grid-template-columns:1fr 1fr}
  .grid-4{grid-template-columns:1fr 1fr}
  .grid-score{grid-template-columns:1fr}
  .grid-chart{grid-template-columns:1fr}
  .grid-2c{grid-template-columns:1fr!important}
}
@media(max-width:600px){
  .grid-2{grid-template-columns:1fr}
  .grid-3{grid-template-columns:1fr 1fr}
  .grid-4{grid-template-columns:1fr 1fr}
  .grid-score{grid-template-columns:1fr}
  .grid-chart{grid-template-columns:1fr}
  .h1{font-size:22px!important}
  .chat-ai,.chat-user{max-width:94%!important;font-size:13px!important}
  .ai-grid{grid-template-columns:1fr!important}
}
`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MONGODB ATLAS + EXPRESS API SERVICE LAYER
   Replace API_BASE with your deployed backend URL.
   All data syncs across devices via MongoDB Atlas.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const API_BASE = ""; // ← set your backend

const api = {
  headers: (token) => ({ "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) }),

  /* AUTH — POST /api/auth/register & /api/auth/login */
  async register(name, email, password, profile) {
    try {
      const r = await fetch(`${API_BASE}/auth/register`, { method: "POST", headers: api.headers(), body: JSON.stringify({ name, email, password, profile }) });
      return await r.json();
    } catch { return api._localRegister(name, email, password, profile); }
  },
  async login(email, password) {
    try {
      const r = await fetch(`${API_BASE}/auth/login`, { method: "POST", headers: api.headers(), body: JSON.stringify({ email, password }) });
      return await r.json();
    } catch { return api._localLogin(email, password); }
  },

  /* HEALTH RECORDS — /api/health */
  async getRecords(token) {
    try {
      const r = await fetch(`${API_BASE}/health`, { headers: api.headers(token) });
      if (!r.ok) throw new Error();
      return await r.json();
    } catch { return JSON.parse(localStorage.getItem("draix_records") || "[]"); }
  },
  async addRecord(token, data) {
    try {
      const r = await fetch(`${API_BASE}/health`, { method: "POST", headers: api.headers(token), body: JSON.stringify(data) });
      if (!r.ok) throw new Error();
      return await r.json();
    } catch {
      const all = JSON.parse(localStorage.getItem("draix_records") || "[]");
      const rec = { ...data, _id: Date.now().toString() };
      localStorage.setItem("draix_records", JSON.stringify([...all, rec]));
      return rec;
    }
  },
  async updateRecord(token, id, data) {
    try {
      const r = await fetch(`${API_BASE}/health/${id}`, { method: "PUT", headers: api.headers(token), body: JSON.stringify(data) });
      if (!r.ok) throw new Error();
      return await r.json();
    } catch {
      const all = JSON.parse(localStorage.getItem("draix_records") || "[]");
      const updated = all.map(r => r._id === id ? { ...r, ...data } : r);
      localStorage.setItem("draix_records", JSON.stringify(updated));
      return data;
    }
  },
  async deleteRecord(token, id) {
    try {
      await fetch(`${API_BASE}/health/${id}`, { method: "DELETE", headers: api.headers(token) });
    } catch {
      const all = JSON.parse(localStorage.getItem("draix_records") || "[]");
      localStorage.setItem("draix_records", JSON.stringify(all.filter(r => r._id !== id)));
    }
  },

  /* STEPS — /api/steps */
  async saveSteps(token, data) {
    try { await fetch(`${API_BASE}/steps`, { method: "POST", headers: api.headers(token), body: JSON.stringify(data) }); }
    catch { localStorage.setItem("draix_steps_" + data.date, JSON.stringify(data)); }
  },
  async getStepHistory(token) {
    try { const r = await fetch(`${API_BASE}/steps`, { headers: api.headers(token) }); return await r.json(); }
    catch { return Object.keys(localStorage).filter(k => k.startsWith("draix_steps_")).map(k => JSON.parse(localStorage.getItem(k))); }
  },

  /* SCREEN TIME — /api/screentime */
  async saveScreenTime(token, data) {
    try { await fetch(`${API_BASE}/screentime`, { method: "POST", headers: api.headers(token), body: JSON.stringify(data) }); }
    catch { localStorage.setItem("draix_st_" + data.date, JSON.stringify(data)); }
  },
  async getScreenTimeHistory(token) {
    try { const r = await fetch(`${API_BASE}/screentime`, { headers: api.headers(token) }); return await r.json(); }
    catch { return Object.keys(localStorage).filter(k => k.startsWith("draix_st_")).map(k => JSON.parse(localStorage.getItem(k))); }
  },

  /* AI CHAT HISTORY — /api/chats */
  async saveChat(token, messages) {
    try { await fetch(`${API_BASE}/chats`, { method: "POST", headers: api.headers(token), body: JSON.stringify({ messages }) }); }
    catch { localStorage.setItem("draix_chats", JSON.stringify(messages)); }
  },
  async getChats(token) {
    try { const r = await fetch(`${API_BASE}/chats`, { headers: api.headers(token) }); return await r.json(); }
    catch { return JSON.parse(localStorage.getItem("draix_chats") || "[]"); }
  },

  /* LOCAL FALLBACK — localStorage-based auth (runs when backend is unreachable) */
  _localRegister(name, email, password, profile) {
    const users = JSON.parse(localStorage.getItem("draix_users") || "[]");
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: "This email is already registered. Please sign in." };
    }
    const user = { _id: Date.now().toString(), name, email: email.toLowerCase(), profile: profile || {} };
    // Store hashed-ish password (simple encode — real bcrypt is in backend)
    localStorage.setItem("draix_users", JSON.stringify([...users, { ...user, _pw: btoa(password) }]));
    const token = btoa(JSON.stringify({ id: user._id, exp: Date.now() + 86400000 * 30 }));
    localStorage.setItem("draix_token", token);
    localStorage.setItem("draix_user", JSON.stringify(user));
    return { token, user };
  },
  _localLogin(email, password) {
    if (!email || !password) return { error: "Please fill all fields." };
    const users = JSON.parse(localStorage.getItem("draix_users") || "[]");
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { error: "No account found with this email. Please create an account first." };
    if (found._pw !== btoa(password)) return { error: "Incorrect password. Please try again." };
    const user = { _id: found._id, name: found.name, email: found.email, profile: found.profile || {} };
    const token = btoa(JSON.stringify({ id: user._id, exp: Date.now() + 86400000 * 30 }));
    localStorage.setItem("draix_token", token);
    localStorage.setItem("draix_user", JSON.stringify(user));
    return { token, user };
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REAL STEP TRACKING HOOK — DeviceMotion API
   Peak-detection algorithm with low-pass filter + debounce
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function useStepTracker(initialSteps = 0) {
  const [steps, setSteps] = useState(initialSteps);
  const [isTracking, setIsTracking] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const state = useRef({
    prev: 0, prevPrev: 0, filtered: 9.8,
    lastStep: 0, threshold: 11.8, debounce: 280,
    filter: 0.82
  });
  const handlerRef = useRef(null);

  const handleMotion = useCallback((e) => {
    const accel = e.accelerationIncludingGravity;
    if (!accel) return;
    const { x = 0, y = 0, z = 0 } = accel;
    const raw = Math.sqrt(x * x + y * y + z * z);
    const s = state.current;

    // Low-pass filter for noise reduction
    s.filtered = s.filter * s.filtered + (1 - s.filter) * raw;

    const now = Date.now();
    // Peak detection: magnitude was rising, now falling, above threshold, enough time passed
    if (
      s.prev > s.prevPrev &&
      s.prev > s.filtered &&
      s.prev > s.threshold &&
      now - s.lastStep > s.debounce
    ) {
      s.lastStep = now;
      setSteps(n => n + 1);
    }
    s.prevPrev = s.prev;
    s.prev = s.filtered;
  }, []);

  const start = useCallback(async () => {
    try {
      if (typeof DeviceMotionEvent?.requestPermission === "function") {
        const perm = await DeviceMotionEvent.requestPermission();
        if (perm !== "granted") { setHasPermission(false); return; }
      }
      setHasPermission(true);
      handlerRef.current = handleMotion;
      window.addEventListener("devicemotion", handleMotion, { passive: true });
      setIsTracking(true);
    } catch (err) {
      // No DeviceMotion available (desktop) — inform user
      setHasPermission("desktop");
      setIsTracking(true);
    }
  }, [handleMotion]);

  const stop = useCallback(() => {
    if (handlerRef.current) {
      window.removeEventListener("devicemotion", handlerRef.current);
      handlerRef.current = null;
    }
    setIsTracking(false);
  }, []);

  const reset = useCallback(() => setSteps(0), []);
  const setThreshold = useCallback((v) => { state.current.threshold = v; }, []);

  useEffect(() => () => { if (handlerRef.current) window.removeEventListener("devicemotion", handlerRef.current); }, []);

  return { steps, setSteps, isTracking, hasPermission, start, stop, reset, setThreshold };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REAL SCREEN TIME HOOK — Page Visibility + focus/blur + idle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function useScreenTime() {
  const [activeMs, setActiveMs] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const state = useRef({
    activeStart: Date.now(),
    isActive: true,
    accumulated: 0,
    idleTimer: null,
    IDLE_THRESHOLD: 60000,
  });

  useEffect(() => {
    const s = state.current;

    const tick = setInterval(() => {
      if (s.isActive) setActiveMs(s.accumulated + (Date.now() - s.activeStart));
    }, 1000);

    const pause = () => {
      if (s.isActive) { s.accumulated += Date.now() - s.activeStart; s.isActive = false; }
      setIsIdle(true);
    };
    const resume = () => {
      if (!s.isActive) { s.activeStart = Date.now(); s.isActive = true; }
      setIsIdle(false);
    };

    const onVisChange = () => (document.hidden ? pause() : resume());
    const onFocus = () => resume();
    const onBlur = () => pause();

    const resetIdle = () => {
      resume();
      clearTimeout(s.idleTimer);
      s.idleTimer = setTimeout(pause, s.IDLE_THRESHOLD);
    };

    document.addEventListener("visibilitychange", onVisChange);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    ["mousemove", "keydown", "touchstart", "scroll", "click"].forEach(ev =>
      document.addEventListener(ev, resetIdle, { passive: true })
    );
    resetIdle();

    return () => {
      clearInterval(tick);
      clearTimeout(s.idleTimer);
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      ["mousemove", "keydown", "touchstart", "scroll", "click"].forEach(ev =>
        document.removeEventListener(ev, resetIdle)
      );
    };
  }, []);

  return { activeMs, hours: activeMs / 3600000, isIdle };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   UTILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getGreeting(name = "") {
  const h = new Date().getHours();
  // 0–4 → Good Night (very late / past midnight)
  // 5–11 → Good Morning
  // 12–16 → Good Afternoon
  // 17–23 → Good Evening  ← covers all evening + night hours
  const g = h >= 0 && h < 5
    ? ["Good Night", "🌙"]
    : h < 12
    ? ["Good Morning", "☀️"]
    : h < 17
    ? ["Good Afternoon", "🌤️"]
    : ["Good Evening", "🌆"];
  return `${g[0]}, ${name} ${g[1]}`;
}

function fmtMs(ms) {
  const s = Math.floor(ms / 1000), m = Math.floor(s / 60), h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}
function fmtSecs(s) {
  const m = Math.floor(s / 60), h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m ${s % 60}s`;
}

function calcWellnessScore(records = [], steps = 0, screenMs = 0) {
  if (!records.length && !steps) return 0;
  const r = records[records.length - 1] || {};
  const sleepScore = Math.min(100, ((r.sleep || 0) / 8) * 100);
  const waterScore = Math.min(100, ((r.water || 0) / 2500) * 100);
  const stepsScore = Math.min(100, (steps / 10000) * 100);
  const moodScore = ((r.mood || 0) / 10) * 100;
  const screenH = screenMs / 3600000;
  const screenScore = Math.max(0, 100 - Math.max(0, screenH - 3) * 18);
  const w = [.22, .18, .25, .2, .15];
  return Math.round(sleepScore * w[0] + waterScore * w[1] + stepsScore * w[2] + moodScore * w[3] + screenScore * w[4]);
}

function genWeeklyData(records = []) {
  // Only use real logged data — no random fallback
  return DAYS.map((day, i) => {
    const r = records[i] || {};
    return {
      day,
      sleep: r.sleep || 0,
      water: r.water || 0,
      mood: r.mood || 0,
      calories: r.calories || 0,
      steps: r.steps || 0,
      stress: r.stress || 0,
      hasData: !!(r.sleep || r.water || r.mood || r.steps),
    };
  });
}

const CustomTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(8,8,24,.97)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "9px 13px", fontFamily: "DM Sans,sans-serif" }}>
      {label && <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(221,230,255,.5)", textTransform: "uppercase", letterSpacing: ".7px", marginBottom: 5 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, fontSize: 12.5 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.color || p.stroke || "#00F5C8", flexShrink: 0 }} />
          <span style={{ color: "#DDE6FF", fontWeight: 600 }}>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
          <span style={{ color: "rgba(221,230,255,.5)", fontSize: 11 }}>{p.name}</span>
        </div>
      ))}
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOAST NOTIFICATION SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ToastContainer({ toasts, remove }) {
  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          animation: "toastIn .38s cubic-bezier(.34,1.56,.64,1) forwards",
          background: "rgba(10,10,28,.97)", border: `1px solid ${t.color || "rgba(0,245,200,.25)"}`,
          borderLeft: `3px solid ${t.color || "var(--t)"}`, borderRadius: 12,
          padding: "11px 15px", maxWidth: 340, pointerEvents: "all",
          display: "flex", alignItems: "flex-start", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,.5)"
        }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{t.icon || "💡"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Syne,sans-serif", fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{t.title}</div>
            <div style={{ fontSize: 12, color: "rgba(221,230,255,.55)", lineHeight: 1.5 }}>{t.msg}</div>
          </div>
          <button onClick={() => remove(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(221,230,255,.35)", padding: 0, lineHeight: 1 }}><X size={13} /></button>
        </div>
      ))}
    </div>
  );
}

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((t) => {
    const id = Date.now();
    setToasts(ts => [...ts, { ...t, id }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), t.duration || 5000);
    return id;
  }, []);
  const remove = useCallback((id) => setToasts(ts => ts.filter(t => t.id !== id)), []);
  return { toasts, add, remove };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SMART WELLNESS ALERTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ALERTS_CFG = [
  { id: "hydration", icon: "💧", title: "Hydration Reminder", msg: "You haven't logged water in 2 hours. Stay hydrated — aim for 2500ml daily.", color: "#38BDF8", interval: 7200000 },
  { id: "eye_break", icon: "👁️", title: "Eye Break — 20-20-20", msg: "Focus something 20 feet away for 20 seconds. Your eyes will thank you!", color: "#00F5C8", interval: 1200000 },
  { id: "posture", icon: "🧘", title: "Posture Check", msg: "Sit up straight, roll your shoulders back. Take 3 deep breaths.", color: "#818CF8", interval: 3600000 },
  { id: "walk", icon: "🚶", title: "Movement Break", msg: "A short 5-minute walk boosts focus and energy for the next 2 hours!", color: "#34D399", interval: 5400000 },
  { id: "burnout", icon: "⚡", title: "Burnout Alert", msg: "Your screen time is high today. Consider a digital detox window.", color: "#FBBF24", interval: 10800000 },
  { id: "sleep", icon: "🌙", title: "Sleep Hygiene Alert", msg: "It's getting late. Stop screens 90 min before bed for better recovery.", color: "#C4B5FD", interval: 14400000 },
  { id: "detox", icon: "📵", title: "Digital Detox Prompt", msg: "Try a 30-minute screen-free break. Read, walk, or meditate.", color: "#FB923C", interval: 21600000 },
];

function useWellnessAlerts(screenMs, addToast) {
  const fired = useRef({});
  useEffect(() => {
    const timer = setInterval(() => {
      const h = screenMs / 3600000;
      ALERTS_CFG.forEach(a => {
        const last = fired.current[a.id] || 0;
        const shouldFire = Date.now() - last > a.interval;
        if (!shouldFire) return;
        if (a.id === "eye_break" && h < 0.33) return;
        if (a.id === "burnout" && h < 3) return;
        if (a.id === "detox" && h < 4) return;
        if (a.id === "walk" && h < 1) return;
        fired.current[a.id] = Date.now();
        addToast({ icon: a.icon, title: a.title, msg: a.msg, color: a.color, duration: 8000 });
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [screenMs, addToast]);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AUTH SCREEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", gender: "prefer_not", goal: "general" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showPw, setShowPw] = useState(false);

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async () => {
    // Validation
    if (!form.email.trim() || !form.password.trim()) return setErr("Email and password are required.");
    if (!validateEmail(form.email)) return setErr("Please enter a valid email address.");
    if (form.password.length < 6) return setErr("Password must be at least 6 characters.");
    if (mode === "register" && !form.name.trim()) return setErr("Please enter your full name.");
    setErr(""); setLoading(true);
    try {
      const res = mode === "register"
        ? await api.register(form.name.trim(), form.email.trim(), form.password, { age: form.age, gender: form.gender, goal: form.goal })
        : await api.login(form.email.trim(), form.password);
      if (res.error) { setErr(res.error); setLoading(false); return; }
      onAuth(res.user, res.token);
    } catch {
      // Backend unreachable — try local
      const res = mode === "register"
        ? api._localRegister(form.name.trim(), form.email.trim(), form.password, { age: form.age, gender: form.gender, goal: form.goal })
        : api._localLogin(form.email.trim(), form.password);
      if (res.error) { setErr(res.error); setLoading(false); return; }
      onAuth(res.user, res.token);
    }
    setLoading(false);
  };

  return (
    <div className="dot-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", position: "relative", overflow: "hidden", padding: "20px" }}>
      <div className="orb" style={{ width: 560, height: 560, background: "rgba(0,245,200,.04)", top: -180, left: -100 }} />
      <div className="orb" style={{ width: 420, height: 420, background: "rgba(129,140,248,.04)", bottom: -100, right: -80, animationDelay: "9s" }} />

      <div className="glass" style={{ width: "100%", maxWidth: 420, padding: "36px 32px", position: "relative", zIndex: 1, animation: "fadeUp .45s ease" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 15, margin: "0 auto 13px",
            background: "linear-gradient(135deg,#00F5C8,#38BDF8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 28px rgba(0,245,200,.32)"
          }}>
            <Heart size={25} color="#030820" />
          </div>
          <h1 className="h1" style={{ fontSize: 26, marginBottom: 4 }}>Dr.<span className="grad">AIX</span></h1>
          <p style={{ fontSize: 13, color: "var(--tx2)" }}>Where AI Meets Human Wellness</p>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: "flex", background: "rgba(255,255,255,.04)", borderRadius: 11, padding: 3, marginBottom: 22 }}>
          {["login", "register"].map(m => (
            <button key={m} onClick={() => { setMode(m); setErr(""); setStep(1); }} style={{
              flex: 1, padding: "8px", border: "none", borderRadius: 9, outline: "none",
              background: mode === m ? "var(--t10)" : "transparent",
              color: mode === m ? "var(--t)" : "var(--tx2)",
              fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all .18s"
            }}>{m === "login" ? "Sign In" : "Create Account"}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mode === "register" && step === 1 && (
            <div>
              <label className="flabel">Full Name *</label>
              <input className="finput" type="text" placeholder="e.g. pArth sAini " value={form.name} onChange={e => f("name", e.target.value)} autoComplete="name" />
            </div>
          )}
          {(mode === "login" || step === 1) && (
            <>
              <div>
                <label className="flabel">Email Address *</label>
                <input className="finput" type="email" placeholder="you@example.com" value={form.email} onChange={e => f("email", e.target.value)} autoComplete="email" />
              </div>
              <div>
                <label className="flabel">Password * {mode === "register" && <span style={{ textTransform: "none", letterSpacing: 0, fontSize: 10 }}>(min 6 chars)</span>}</label>
                <div style={{ position: "relative" }}>
                  <input className="finput" type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password}
                    onChange={e => f("password", e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (mode === "login" ? submit() : setStep(2))}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    style={{ paddingRight: 44 }} />
                  <button onClick={() => setShowPw(s => !s)} style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "var(--tx3)", padding: 0
                  }}>{showPw ? <Eye size={15} /> : <Eye size={15} style={{ opacity: .5 }} />}</button>
                </div>
              </div>
            </>
          )}
          {mode === "register" && step === 2 && (
            <>
              <div>
                <label className="flabel">Age <span style={{ textTransform: "none", letterSpacing: 0, fontSize: 10 }}>(optional)</span></label>
                <input className="finput" type="number" placeholder="25" min="13" max="100" value={form.age} onChange={e => f("age", e.target.value)} />
              </div>
              <div>
                <label className="flabel">Gender</label>
                <select className="finput" value={form.gender} onChange={e => f("gender", e.target.value)}>
                  <option value="prefer_not">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non_binary">Non-binary</option>
                </select>
              </div>
              <div>
                <label className="flabel">Primary Goal</label>
                <select className="finput" value={form.goal} onChange={e => f("goal", e.target.value)}>
                  <option value="general">General Wellness</option>
                  <option value="fitness">Fitness & Activity</option>
                  <option value="sleep">Better Sleep</option>
                  <option value="stress">Stress Management</option>
                  <option value="digital">Digital Detox</option>
                  <option value="weight">Weight Management</option>
                </select>
              </div>
            </>
          )}
        </div>

        {err && <div style={{ marginTop: 12, padding: "10px 13px", background: "var(--r10)", border: "1px solid rgba(248,113,113,.2)", borderRadius: 10, fontSize: 12.5, color: "var(--r)", lineHeight: 1.5 }}>{err}</div>}

        {/* Step indicator for register */}
        {mode === "register" && (
          <div style={{ display: "flex", gap: 6, margin: "14px 0 0", justifyContent: "center" }}>
            {[1, 2].map(s => (
              <div key={s} style={{ width: s === step ? 20 : 7, height: 7, borderRadius: 4, background: s === step ? "var(--t)" : "rgba(255,255,255,.12)", transition: "all .3s" }} />
            ))}
          </div>
        )}

        <button className="btn-p" style={{ width: "100%", justifyContent: "center", marginTop: 18, padding: "12px 20px", fontSize: 14 }}
          onClick={mode === "login" ? submit : step === 1
            ? () => { if (!form.name.trim() || !form.email.trim() || !form.password.trim()) return setErr("Please fill all required fields."); if (form.password.length < 6) return setErr("Password must be at least 6 characters."); setErr(""); setStep(2); }
            : submit}
          disabled={loading}>
          {loading
            ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />{mode === "login" ? "Signing in…" : "Creating account…"}</>
            : mode === "login" ? "Sign In" : step === 1 ? "Next →" : "Create Account"}
        </button>

        {mode === "login" && (
          <p style={{ fontSize: 12, color: "var(--tx3)", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
            Don't have an account?{" "}
            <span style={{ color: "var(--t)", cursor: "pointer", fontWeight: 600 }} onClick={() => { setMode("register"); setErr(""); setStep(1); }}>
              Create one free →
            </span>
          </p>
        )}
        {mode === "register" && step === 2 && (
          <button className="btn-s" style={{ width: "100%", justifyContent: "center", marginTop: 10, fontSize: 13 }} onClick={() => setStep(1)}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SIDEBAR + TOP BAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const NAV_ITEMS = [
  { id: "dashboard", icon: Home, label: "Dashboard" },
  { id: "health", icon: Heart, label: "Health Tracker" },
  { id: "steps", icon: Activity, label: "Step Tracker" },
  { id: "screen", icon: Monitor, label: "Screen Time" },
  { id: "ai", icon: Brain, label: "AI Assistant" },
  { id: "reports", icon: FileText, label: "Reports" },
];

function Sidebar({ page, setPage, user, onLogout }) {
  return (
    <div className="sidebar">
      {/* Logo — hidden in mobile bottom-nav mode */}
      <div style={{ padding: "16px 3px 18px", display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#00F5C8,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,245,200,.28)", flexShrink: 0 }}>
          <Heart size={17} color="#030820" />
        </div>
        <div className="logo-txt">
          <div style={{ fontFamily: "Syne,sans-serif", fontSize: 16, fontWeight: 800 }}>Dr.<span className="grad">AIX</span></div>
          <div style={{ fontSize: 9, color: "var(--tx3)", letterSpacing: "1.2px", fontFamily: "Syne,sans-serif", fontWeight: 700 }}>WELLNESS AI</div>
        </div>
      </div>

      <div className="cap sidebar-cap" style={{ padding: "4px 3px", marginBottom: 6 }}>Navigation</div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(n => (
          <div key={n.id} className={`ni ${page === n.id ? "act" : ""}`} onClick={() => setPage(n.id)}>
            <n.icon size={16} style={{ flexShrink: 0 }} />
            <span className="nav-txt">{n.label}</span>
            {/* Mobile bottom-nav label */}
            <span className="ni-label-mobile">{n.label}</span>
          </div>
        ))}
      </nav>

      {/* User section — hidden on mobile bottom nav */}
      <div className="sidebar-user-section" style={{ borderTop: "1px solid var(--bd)", paddingTop: 12, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10, padding: "0 3px" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--v),#C4B5FD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {(user?.name || "U")[0].toUpperCase()}
          </div>
          <div className="nav-txt" style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: "var(--tx3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email}</div>
          </div>
        </div>
        <button className="btn-s" style={{ width: "100%", fontSize: 12.5, padding: "8px 11px", justifyContent: "center" }} onClick={onLogout}>
          <LogOut size={13} /><span className="nav-txt">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

function TopBar({ user, page, screenMs, steps, score, addToast, onLogout }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const titles = { dashboard: "Dashboard", health: "Health Tracker", steps: "Step Tracker", screen: "Screen Time", ai: "AI Assistant", reports: "Reports" };
  return (
    <div className="topbar">
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontFamily: "Syne,sans-serif", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{titles[page] || ""}</div>
        <div style={{ fontSize: 11, color: "var(--tx3)" }}>{now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{ background: "var(--t10)", border: "1px solid rgba(0,245,200,.18)", borderRadius: 8, padding: "5px 10px", fontSize: 11.5, fontFamily: "Syne,sans-serif", fontWeight: 700, color: "var(--t)", display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--t)", animation: "pulse 2s infinite" }} />
          {score > 0 ? score : "—"}
        </div>
        {/* Mobile: show user initial + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,var(--v),#C4B5FD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0, cursor: "default" }}>
            {(user?.name || "U")[0].toUpperCase()}
          </div>
          <button className="ib" onClick={onLogout} title="Sign Out" style={{ flexShrink: 0 }}>
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATED SCORE RING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ScoreRing({ score, size = 170 }) {
  const R = 64, C = 2 * Math.PI * R;
  const dash = (Math.max(0, Math.min(100, score)) / 100) * C;
  const color = score >= 75 ? "#00F5C8" : score >= 50 ? "#FBBF24" : "#F87171";
  return (
    <svg width={size} height={size} viewBox="0 0 170 170" style={{ display: "block" }}>
      <defs>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color === "#00F5C8" ? "#38BDF8" : color} />
        </linearGradient>
        <filter id="scoreGlow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="85" cy="85" r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="12" />
      <circle cx="85" cy="85" r={R} fill="none" stroke="url(#scoreGrad)" strokeWidth="12"
        strokeLinecap="round" strokeDasharray={`${dash} ${C}`}
        transform="rotate(-90 85 85)" filter="url(#scoreGlow)"
        style={{ transition: "stroke-dasharray 1.5s cubic-bezier(.22,1,.36,1)" }} />
      <text x="85" y="78" textAnchor="middle" fill="#DDE6FF" fontSize="34" fontWeight="800" fontFamily="Syne,sans-serif">{score}</text>
      <text x="85" y="96" textAnchor="middle" fill="rgba(221,230,255,.38)" fontSize="10" fontFamily="Syne,sans-serif" fontWeight="700" letterSpacing="1.5">WELLNESS</text>
      <text x="85" y="113" textAnchor="middle" fill={color} fontSize="11" fontFamily="Syne,sans-serif" fontWeight="600">
        {score >= 75 ? "Excellent" : score >= 50 ? "Good" : "Needs Work"}
      </text>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DASHBOARD PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DashboardPage({ user, records, steps, screenMs, score, weeklyData, addToast, setPage }) {
  const today = records[records.length - 1] || {};
  const hasData = records.length > 0 || steps > 0;
  const totalSeconds = Math.floor(screenMs / 1000);
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

const screenHrs = `${hours}h ${minutes}m ${seconds}s`;
  const metrics = [
    { icon: Activity, label: "Steps Today", val: steps > 0 ? steps.toLocaleString() : "—", unit: steps > 0 ? "steps" : "", color: "#00F5C8", sub: steps > 0 ? `${((steps) * 0.000762).toFixed(2)} km · ${Math.round(steps * 0.04)} kcal` : "Start step tracker to count", prog: Math.min(100, (steps / 10000) * 100) },
    { icon: Moon, label: "Sleep", val: today.sleep ? Number(today.sleep || 0).toFixed(1) : "—", unit: today.sleep ? "hrs" : "", color: "#818CF8", sub: today.sleep ? (today.sleep >= 7 ? "Optimal range ✓" : "Below 7h target") : "Log your sleep", prog: Math.min(100, ((today.sleep || 0) / 9) * 100) },
    { icon: Droplets, label: "Hydration", val: today.water ? today.water.toLocaleString() : "—", unit: today.water ? "ml" : "", color: "#38BDF8", sub: today.water ? `${Math.round((today.water / 2500) * 100)}% of 2500ml goal` : "Log water intake", prog: Math.min(100, ((today.water || 0) / 2500) * 100) },
    { icon: Smile, label: "Mood", val: today.mood ? `${today.mood}/10` : "—", color: "#FBBF24", sub: today.mood ? (today.mood >= 7 ? "Feeling great 😊" : today.mood >= 4 ? "Okay 🙂" : "Low — try a short walk 🚶") : "Log your mood", prog: ((today.mood || 0) / 10) * 100 },
    { icon: Monitor, label: "Screen Time", val: screenHrs, unit: "hrs", color: parseFloat(screenHrs) > 5 ? "#F87171" : "#34D399", sub: parseFloat(screenHrs) > 5 ? "⚠ High — take a break" : "Healthy usage", prog: Math.min(100, (parseFloat(screenHrs) / 8) * 100) },
    { icon: Flame, label: "Calories", val: today.calories ? today.calories.toLocaleString() : "—", unit: today.calories ? "kcal" : "", color: "#FB923C", sub: today.calories ? "Logged today" : "Log your meals", prog: Math.min(100, ((today.calories || 0) / 2200) * 100) },
  ];

  const hasChartData = weeklyData.some(d => d.hasData);
  const normalized = weeklyData.map(d => ({
    day: d.day,
    Sleep: d.sleep ? Math.round((d.sleep / 9) * 100) : null,
    Water: d.water ? Math.round((d.water / 2500) * 100) : null,
    Mood: d.mood ? Math.round((d.mood / 10) * 100) : null,
    Steps: d.steps ? Math.round((d.steps / 10000) * 100) : null,
  }));

  return (
    <div className="page">
      {/* Greeting */}
      <div className="s1" style={{ marginBottom: 20 }}>
        <h1 className="h1" style={{ marginBottom: 5 }}>{getGreeting(user?.name?.split(" ")[0])}</h1>
        <p style={{ color: "var(--tx2)", fontSize: 13.5 }}>
          {hasData ? "Here's your wellness overview for today." : "Welcome! Start logging your health data to see insights."}
        </p>
      </div>

      {/* Score + Metrics */}
      <div className="s2 grid-score" style={{ marginBottom: 16 }}>
        <div className="card card-t" style={{ padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <ScoreRing score={score} />
          <div style={{ width: "100%", background: "rgba(255,255,255,.03)", borderRadius: 11, padding: "12px", border: "1px solid var(--bd)", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--tx3)", fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 4 }}>Records Logged</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: "var(--t)" }}>{records.length}</div>
          </div>
          <button className="btn-p" style={{ width: "100%", justifyContent: "center", fontSize: 12.5, padding: "9px" }}
            onClick={() => addToast({ icon: "🧠", title: "AI Insight", msg: score > 0 ? `Your wellness score is ${score}/100. ${score >= 70 ? "Great work! Keep up the consistency." : "Log more health data today to improve your score."}` : "Start logging your health metrics to get a personalized AI wellness score!", duration: 7000 })}>
            <Brain size={13} /> AI Insight
          </button>
          {!hasData && (
            <button className="btn-s" style={{ width: "100%", justifyContent: "center", fontSize: 12.5, padding: "9px" }} onClick={() => setPage("health")}>
              <Plus size={13} /> Log Health Data
            </button>
          )}
        </div>

        <div className="grid-3" style={{ alignContent: "start" }}>
          {metrics.map((m, i) => (
            <div key={m.label} className={`card s${i + 1}`} style={{ padding: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                <div style={{ width: 27, height: 27, borderRadius: 8, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <m.icon size={13} color={m.color} />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase", letterSpacing: ".6px", fontFamily: "Syne,sans-serif" }}>{m.label}</span>
              </div>
              <div style={{ marginBottom: 4 }}>
                <span className="mono" style={{ fontSize: 21, fontWeight: 700, lineHeight: 1, color: m.val === "—" ? "var(--tx3)" : "var(--tx)" }}>{m.val}</span>
                {m.unit && <span style={{ fontSize: 12, color: "var(--tx2)", marginLeft: 4 }}>{m.unit}</span>}
              </div>
              <div style={{ fontSize: 11, color: "var(--tx3)", marginBottom: 7, lineHeight: 1.4 }}>{m.sub}</div>
              {m.prog > 0 && <div className="pbar"><div className="pbar-f" style={{ width: `${m.prog}%`, background: `linear-gradient(90deg,${m.color}70,${m.color})` }} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Chart — only if real data exists */}
      {hasChartData ? (
        <div className="s3 card" style={{ padding: "20px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <div className="h3">Weekly Wellness Trends</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["Sleep", "#818CF8"], ["Water", "#38BDF8"], ["Mood", "#FBBF24"], ["Steps", "#00F5C8"]].map(([l, c]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--tx2)" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />{l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={normalized} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                {[["Sleep", "#818CF8"], ["Water", "#38BDF8"], ["Mood", "#FBBF24"], ["Steps", "#00F5C8"]].map(([k, c]) => (
                  <linearGradient key={k} id={`g${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={.15} />
                    <stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="day" tick={{ fill: "rgba(221,230,255,.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={false} axisLine={false} tickLine={false} domain={[0, 110]} />
              <Tooltip content={<CustomTip />} formatter={(v, n) => [v != null ? `${v}%` : "No data", n]} />
              {["Sleep", "Water", "Mood", "Steps"].map((k, i) => {
                const c = ["#818CF8", "#38BDF8", "#FBBF24", "#00F5C8"][i];
                return <Area key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2} fill={`url(#g${k})`} dot={{ fill: c, r: 3, strokeWidth: 0 }} connectNulls={false} />;
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="s3 card" style={{ padding: "36px 24px", marginBottom: 16, textAlign: "center", border: "1px dashed var(--bd2)" }}>
          <BarChart2 size={36} style={{ margin: "0 auto 12px", display: "block", color: "var(--tx3)" }} />
          <div className="h3" style={{ color: "var(--tx2)", marginBottom: 8 }}>No chart data yet</div>
          <p style={{ fontSize: 13, color: "var(--tx3)", lineHeight: 1.6, maxWidth: 340, margin: "0 auto 16px" }}>
            Log at least one health entry to see your weekly wellness trends chart.
          </p>
          <button className="btn-p" style={{ margin: "0 auto", display: "inline-flex" }} onClick={() => setPage("health")}>
            <Plus size={14} /> Log First Entry
          </button>
        </div>
      )}

      {/* Summary stats row — only real data */}
      {hasData && (
        <div className="s4 grid-4">
          {[
            { l: "Avg Sleep (week)", v: records.length ? `${(records.reduce((a, r) => a + (r.sleep || 0), 0) / records.length).toFixed(1)}h` : "—", c: "#818CF8", icon: Moon },
            { l: "Total Steps", v: steps > 0 ? steps.toLocaleString() : "—", c: "#00F5C8", icon: Activity },
            { l: "Avg Hydration", v: records.length ? `${Math.round(records.reduce((a, r) => a + (r.water || 0), 0) / records.length)}ml` : "—", c: "#38BDF8", icon: Droplets },
            { l: "Screen Time", v: `${screenHrs}h`, c: parseFloat(screenHrs) > 5 ? "var(--r)" : "var(--g)", icon: Monitor },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: "13px 14px", display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: `${s.c}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <s.icon size={15} color={s.c} />
              </div>
              <div>
                <div style={{ fontSize: 10.5, color: "var(--tx3)", fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 2 }}>{s.l}</div>
                <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: s.c }}>{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HEALTH TRACKER PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HealthTrackerPage({ records, onAdd, onUpdate, onDelete, token }) {
  const [tab, setTab] = useState("log");
  const [form, setForm] = useState({ date: new Date().toISOString().split("T")[0], sleep: "", water: "", mood: "7", calories: "", steps: "", stress: "3", exercise: "", notes: "" });
  const [editId, setEditId] = useState(null);
  const [saved, setSaved] = useState(false);

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const FIELDS = [
    { k: "date", l: "Date", t: "date" }, { k: "sleep", l: "Sleep (hours)", t: "number", ph: "7.5", step: 0.5 },
    { k: "water", l: "Water (ml)", t: "number", ph: "2000" }, { k: "calories", l: "Calories (kcal)", t: "number", ph: "1900" },
    { k: "steps", l: "Steps", t: "number", ph: "8000" }, { k: "exercise", l: "Exercise (min)", t: "number", ph: "30" },
  ];

  const save = async () => {
    if (!form.date) return;
    if (editId) { await onUpdate(editId, form); setEditId(null); }
    else await onAdd(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
    setForm({ date: new Date().toISOString().split("T")[0], sleep: "", water: "", mood: "7", calories: "", steps: "", stress: "3", exercise: "", notes: "" });
  };

  const edit = (r) => { setForm({ ...r }); setEditId(r._id); setTab("log"); };

  const weeklyData = useMemo(() => genWeeklyData(records.slice(-7)), [records]);

  return (
    <div className="page">
      <div className="s1" style={{ marginBottom: 22 }}>
        <h1 className="h1">Health Tracker</h1>
        <p style={{ color: "var(--tx2)", fontSize: 13.5, marginTop: 5 }}>Log daily wellness metrics · Synced to MongoDB Atlas across all devices</p>
      </div>

      <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,.04)", borderRadius: 12, padding: 3, width: "fit-content", marginBottom: 22 }}>
        {[{ id: "log", l: "Log Entry" }, { id: "history", l: "History" }, { id: "analytics", l: "Analytics" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 18px", borderRadius: 9, border: "none", fontFamily: "Syne,sans-serif",
            fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .18s", outline: "none",
            background: tab === t.id ? "var(--t10)" : "transparent",
            color: tab === t.id ? "var(--t)" : "var(--tx2)"
          }}>{t.l}</button>
        ))}
      </div>

      {tab === "log" && (
        <div className="s2 grid-2c" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18, alignItems: "start" }}>
          <div className="card" style={{ padding: "24px" }}>
            <div className="h3" style={{ marginBottom: 18 }}>{editId ? "✏️ Editing Record" : "Log Today's Metrics"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {FIELDS.map(fl => (
                <div key={fl.k} className="form-group">
                  <label className="flabel">{fl.l}</label>
                  <input className="finput" type={fl.t} placeholder={fl.ph} step={fl.step} value={form[fl.k]} onChange={e => f(fl.k, e.target.value)} />
                </div>
              ))}
              <div className="form-group">
                <label className="flabel">Mood (1–10)</label>
                <select className="finput" value={form.mood} onChange={e => f("mood", e.target.value)}>
                  {["1 — Very Bad 😞", "2 — Bad 😟", "3 — Low 😕", "4 — Meh 😐", "5 — OK 🙂", "6 — Good 😊", "7 — Great 😄", "8 — Excellent 🤩", "9 — Amazing 🌟", "10 — Perfect 💫"].map((o, i) => (
                    <option key={i} value={i + 1}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="flabel">Stress Level (1–10)</label>
                <select className="finput" value={form.stress} onChange={e => f("stress", e.target.value)}>
                  {Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1} {i < 3 ? "— Low" : i < 6 ? "— Moderate" : i < 8 ? "— High" : "— Very High"}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group" style={{ marginTop: 13 }}>
              <label className="flabel">Notes</label>
              <input className="finput" type="text" placeholder="How are you feeling today?" value={form.notes} onChange={e => f("notes", e.target.value)} />
            </div>
            <div style={{ display: "flex", gap: 9, marginTop: 20 }}>
              <button className="btn-p" onClick={save}>
                {saved ? <><CheckCircle size={14} />Saved!</> : editId ? <><Save size={14} />Update Record</> : <><Plus size={14} />Add Entry</>}
              </button>
              {editId && <button className="btn-s" onClick={() => { setEditId(null); setForm({ date: new Date().toISOString().split("T")[0], sleep: "", water: "", mood: "7", calories: "", steps: "", stress: "3", exercise: "", notes: "" }); }}>Cancel</button>}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="card" style={{ padding: "18px" }}>
              <div className="h3" style={{ marginBottom: 13 }}>Daily Targets</div>
              {[
                { l: "Steps", cur: form.steps || 0, goal: 10000, c: "var(--t)" },
                { l: "Water", cur: form.water || 0, goal: 2500, c: "var(--b)" },
                { l: "Sleep", cur: form.sleep || 0, goal: 8, c: "var(--v)" },
                { l: "Exercise", cur: form.exercise || 0, goal: 30, c: "var(--g)" },
              ].map(t => (
                <div key={t.l} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 500 }}>{t.l}</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--tx3)" }}>{t.cur} / {t.goal}</span>
                  </div>
                  <div className="pbar"><div className="pbar-f" style={{ width: `${Math.min(100, (t.cur / t.goal) * 100)}%`, background: t.c }} /></div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: "16px", background: "rgba(0,245,200,.03)", border: "1px solid rgba(0,245,200,.1)" }}>
              <div style={{ fontSize: 12, color: "var(--t)", fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 6 }}>💡 AI Tip</div>
              <p style={{ fontSize: 12.5, color: "var(--tx2)", lineHeight: 1.65 }}>Logging consistently for 7+ days unlocks personalised AI trend analysis and predictive wellness insights.</p>
            </div>
            <div className="card" style={{ padding: "16px" }}>
              <div className="h3" style={{ marginBottom: 10 }}>This Week</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  { l: "Records Logged", v: records.length, c: "var(--t)" },
                  { l: "Avg Sleep", v: `${(weeklyData.reduce((a, d) => a + d.sleep, 0) / 7).toFixed(1)}h`, c: "var(--v)" },
                  { l: "Avg Hydration", v: `${Math.round(weeklyData.reduce((a, d) => a + d.water, 0) / 7)}ml`, c: "var(--b)" },
                ].map(s => (
                  <div key={s.l} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5, color: "var(--tx2)" }}>{s.l}</span>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: s.c }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="card s2" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--bd)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="h3">Health Records</div>
            <span className="badge" style={{ background: "var(--t10)", color: "var(--t)", border: "1px solid rgba(0,245,200,.2)" }}>{records.length} entries</span>
          </div>
          {records.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "var(--tx3)" }}>
              <Heart size={36} style={{ margin: "0 auto 12px", display: "block", opacity: .3 }} />
              <p>No records yet. Start logging your health data!</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Date", "Sleep", "Water", "Mood", "Steps", "Calories", "Stress", "Notes", ""].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10.5, fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: ".8px", fontFamily: "Syne,sans-serif", borderBottom: "1px solid var(--bd)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...records].reverse().map(r => (
                    <tr key={r._id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)", transition: "background .15s", cursor: "default" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.02)"}
                      onMouseLeave={e => e.currentTarget.style.background = ""}>
                      <td style={{ padding: "11px 14px", fontFamily: "Syne,sans-serif", fontSize: 13, fontWeight: 700 }}>{r.date}</td>
                      <td style={{ padding: "11px 14px" }}><span className="mono" style={{ color: (r.sleep || 0) >= 7 ? "var(--g)" : "var(--a)" }}>{r.sleep || "—"}h</span></td>
                      <td style={{ padding: "11px 14px" }}><span className="mono" style={{ color: (r.water || 0) >= 2000 ? "var(--b)" : "var(--tx2)" }}>{(r.water || 0).toLocaleString()}ml</span></td>
                      <td style={{ padding: "11px 14px" }}><span style={{ fontSize: 12 }}>{r.mood || "—"}/10</span></td>
                      <td style={{ padding: "11px 14px" }}><span className="mono">{(r.steps || 0).toLocaleString()}</span></td>
                      <td style={{ padding: "11px 14px" }}><span className="mono">{(r.calories || 0).toLocaleString()}</span></td>
                      <td style={{ padding: "11px 14px" }}>
                        <span style={{ color: (r.stress || 0) > 6 ? "var(--r)" : "var(--g)", fontWeight: 600, fontSize: 12.5 }}>{r.stress || "—"}/10</span>
                      </td>
                      <td style={{ padding: "11px 14px", color: "var(--tx2)", fontSize: 12, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.notes || "—"}</td>
                      <td style={{ padding: "11px 14px" }}>
                        <div style={{ display: "flex", gap: 5 }}>
                          <button className="ib" onClick={() => edit(r)} title="Edit"><Edit3 size={12} /></button>
                          <button className="btn-d" onClick={() => onDelete(r._id)} style={{ padding: "6px 10px" }}><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "analytics" && (
        <div className="s2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { k: "sleep", l: "Sleep (hrs)", c: "#818CF8", type: "bar", domain: [0, 10] },
            { k: "water", l: "Hydration (ml)", c: "#38BDF8", type: "area" },
            { k: "mood", l: "Mood Trend", c: "#FBBF24", type: "line", domain: [0, 11] },
            { k: "stress", l: "Stress Level", c: "#F87171", type: "bar", domain: [0, 11] },
          ].map(({ k, l, c, type, domain }) => (
            <div key={k} className="card" style={{ padding: "20px" }}>
              <div className="h3" style={{ marginBottom: 14 }}>{l}</div>
              <ResponsiveContainer width="100%" height={165}>
                {type === "bar" ? (
                  <BarChart data={weeklyData} margin={{ left: -22 }}>
                    <XAxis dataKey="day" tick={{ fill: "rgba(221,230,255,.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={domain} tick={{ fill: "rgba(221,230,255,.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTip />} />
                    <Bar dataKey={k} name={l} radius={[4, 4, 0, 0]}>
                      {weeklyData.map((d, i) => <Cell key={i} fill={`${c}${d[k] > (domain ? domain[1] * .6 : 5) ? "FF" : "90"}`} />)}
                    </Bar>
                  </BarChart>
                ) : type === "area" ? (
                  <AreaChart data={weeklyData} margin={{ left: -22 }}>
                    <defs>
                      <linearGradient id={`ag_${k}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c} stopOpacity={.16} />
                        <stop offset="95%" stopColor={c} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fill: "rgba(221,230,255,.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(221,230,255,.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTip />} />
                    <Area type="monotone" dataKey={k} stroke={c} strokeWidth={2} fill={`url(#ag_${k})`} dot={false} name={l} />
                  </AreaChart>
                ) : (
                  <LineChart data={weeklyData} margin={{ left: -22 }}>
                    <XAxis dataKey="day" tick={{ fill: "rgba(221,230,255,.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={domain} tick={{ fill: "rgba(221,230,255,.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTip />} />
                    <Line type="monotone" dataKey={k} stroke={c} strokeWidth={2.5} dot={{ fill: c, r: 4, strokeWidth: 0 }} name={l} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STEP TRACKER PAGE — Real DeviceMotion API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StepTrackerPage({ stepTracker, addToast }) {
  const { steps, isTracking, hasPermission, start, stop, reset, setThreshold } = stepTracker;
  const [sens, setSens] = useState(11.8);
  const GOAL = 10000;
  const pct = Math.min(100, (steps / GOAL) * 100);
  const R = 72, C = 2 * Math.PI * R, dash = (pct / 100) * C;
  const dist = ((steps || 0) * 0.000762).toFixed(2);
  const kcal = Math.round((steps || 0) * 0.04);
  const mins = Math.round((steps || 0) / 95);

  const hourlyData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    h: `${i * 2}:00`,
    steps: i < 2 || i > 9 ? 0 : Math.floor(Math.max(0, Math.sin((i - 2) * 0.8) * 450 + 60))
  })), []);

  return (
    <div className="page">
      <div className="s1" style={{ marginBottom: 22 }}>
        <h1 className="h1">Step Tracker</h1>
        <p style={{ color: "var(--tx2)", fontSize: 13.5, marginTop: 5 }}>Real accelerometer-based step detection · DeviceMotion API</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>
        {/* Ring */}
        <div className="s2 card card-t" style={{ padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ position: "relative" }}>
            <svg width={200} height={200} viewBox="0 0 200 200">
              <defs>
                <linearGradient id="stepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F5C8" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <filter id="stepGlow">
                  <feGaussianBlur stdDeviation="5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="13" />
              <circle cx="100" cy="100" r={R} fill="none" stroke="url(#stepGrad)" strokeWidth="13"
                strokeLinecap="round" strokeDasharray={`${dash} ${C}`}
                transform="rotate(-90 100 100)" filter="url(#stepGlow)"
                style={{ transition: "stroke-dasharray .5s ease" }} />
              <text x="100" y="88" textAnchor="middle" fill="#DDE6FF" fontSize="38" fontWeight="800" fontFamily="DM Mono,monospace"
                style={{ animation: isTracking ? "countUp .3s ease" : "none" }}>
                {steps.toLocaleString()}
              </text>
              <text x="100" y="108" textAnchor="middle" fill="rgba(221,230,255,.4)" fontSize="10" fontFamily="Syne,sans-serif" fontWeight="700" letterSpacing="1.5">STEPS</text>
              <text x="100" y="128" textAnchor="middle" fill="rgba(0,245,200,.8)" fontSize="12" fontFamily="Syne,sans-serif">{pct.toFixed(1)}% of {GOAL.toLocaleString()}</text>
            </svg>
            {isTracking && (
              <div style={{ position: "absolute", top: 8, right: 8, width: 11, height: 11, borderRadius: "50%", background: "var(--t)", animation: "pulse 1.4s infinite", boxShadow: "0 0 10px var(--t)" }} />
            )}
          </div>

          {/* Status */}
          {hasPermission === "desktop" && (
            <div style={{ background: "rgba(251,191,36,.08)", border: "1px solid rgba(251,191,36,.2)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "var(--a)", textAlign: "center", lineHeight: 1.5 }}>
              📱 DeviceMotion requires a mobile device. On desktop, motion data is unavailable. <strong>Use your phone for real step detection.</strong>
            </div>
          )}
          {hasPermission === false && (
            <div style={{ background: "var(--r10)", border: "1px solid rgba(248,113,113,.2)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "var(--r)", textAlign: "center" }}>
              ⚠ Motion permission denied. Enable in browser settings.
            </div>
          )}

          <div style={{ display: "flex", gap: 9, width: "100%" }}>
            {isTracking ? (
              <button className="btn-s" style={{ flex: 1, justifyContent: "center", padding: "12px" }} onClick={() => { stop(); addToast({ icon: "🎉", title: "Session saved!", msg: `${steps.toLocaleString()} steps · ${dist} km · ${kcal} kcal`, duration: 5000 }); }}>
                <StopCircle size={15} color="var(--r)" />Stop Tracking
              </button>
            ) : (
              <button className="btn-p" style={{ flex: 1, justifyContent: "center", padding: "12px", fontSize: 14 }} onClick={() => { start(); addToast({ icon: "🚶", title: "Step Tracker Active", msg: "Motion detection started. Walk normally!", duration: 3000 }); }}>
                <Play size={15} />Start Tracking
              </button>
            )}
          </div>
          <button className="btn-s" style={{ width: "100%", justifyContent: "center", fontSize: 13 }} onClick={reset}>
            <RefreshCw size={13} />Reset Counter
          </button>

          {/* Sensitivity */}
          <div style={{ width: "100%", background: "rgba(255,255,255,.03)", borderRadius: 11, padding: "12px" }}>
            <div className="h3" style={{ fontSize: 12, marginBottom: 9 }}>Detection Sensitivity</div>
            <input type="range" min="6" max="22" step="0.5" value={sens} className="form-range"
              onChange={e => { const v = parseFloat(e.target.value); setSens(v); setThreshold(v); }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--tx3)", marginTop: 4 }}>
              <span>More sensitive</span>
              <span className="mono" style={{ color: "var(--t)", fontWeight: 700 }}>{sens.toFixed(1)}</span>
              <span>Less sensitive</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Stats row */}
          <div className="s3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { l: "Distance", v: `${dist} km`, icon: Target, c: "#00F5C8" },
              { l: "Calories Burned", v: `${kcal} kcal`, icon: Flame, c: "#FBBF24" },
              { l: "Est. Walk Time", v: `~${mins} min`, icon: Clock, c: "#818CF8" },
            ].map(s => (
              <div key={s.l} className="card" style={{ padding: "16px" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${s.c}13`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <s.icon size={14} color={s.c} />
                </div>
                <div className="mono" style={{ fontSize: 20, fontWeight: 700, marginBottom: 3 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "var(--tx3)", fontFamily: "Syne,sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px" }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="s4 card" style={{ padding: "18px" }}>
            <div className="h3" style={{ marginBottom: 12 }}>How Real Step Detection Works</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { t: "Accelerometer Data", d: "Reads x, y, z axis from DeviceMotion API at ~60Hz sampling rate.", c: "var(--t)" },
                { t: "Magnitude Calculation", d: "√(x²+y²+z²) gives raw motion magnitude from gravity vector.", c: "var(--b)" },
                { t: "Low-Pass Filter", d: "Smooths noise using exponential moving average (α=0.82) to reduce false positives.", c: "var(--v)" },
                { t: "Peak Detection + Debounce", d: "Detects acceleration peaks above threshold (11.8 m/s²) with 280ms debounce.", c: "var(--g)" },
              ].map(s => (
                <div key={s.t} style={{ background: "rgba(255,255,255,.028)", borderRadius: 10, padding: "12px", border: "1px solid var(--bd)" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: s.c, fontFamily: "Syne,sans-serif", marginBottom: 5 }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: "var(--tx2)", lineHeight: 1.55 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly chart */}
          <div className="s5 card" style={{ padding: "18px" }}>
            <div className="h3" style={{ marginBottom: 14 }}>Step Distribution (Sample)</div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={hourlyData} margin={{ left: -22 }}>
                <XAxis dataKey="h" tick={{ fill: "rgba(221,230,255,.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(221,230,255,.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTip />} formatter={v => [`${v} steps`, "Steps"]} />
                <Bar dataKey="steps" radius={[4, 4, 0, 0]}>
                  {hourlyData.map((d, i) => <Cell key={i} fill={d.steps > 300 ? "#00F5C8" : d.steps > 150 ? "#38BDF8" : "rgba(0,245,200,.3)"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCREEN TIME PAGE — Real Page Visibility API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ScreenTimePage({ screenTime }) {
  const { activeMs, hours, isIdle } = screenTime;
  const secs = Math.floor(activeMs / 1000);
  const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
  const prodScore = Math.max(0, Math.min(100, Math.round(100 - Math.max(0, hours - 3) * 14)));
  const burnout = hours > 6 ? "High" : hours > 4 ? "Moderate" : "Low";
  const burnoutColor = { High: "var(--r)", Moderate: "var(--a)", Low: "var(--g)" }[burnout];

  const hourlyUsage = useMemo(() => {
    const rng = (seed) => {
      let t = seed + 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: 24 }, (_, i) => {
      const r = rng(i + 14);
      const mins = i >= 8 && i <= 22
        ? Math.floor((1 - Math.abs(i - 14) / 7) * 50 * (0.5 + r * 0.8))
        : 0;
      return { h: `${i}`, mins };
    });
  }, []);

  const breakdown = [
    { type: "Deep Focus", pct: 38, color: "#00F5C8" }, { type: "Communication", pct: 22, color: "#818CF8" },
    { type: "Research", pct: 17, color: "#38BDF8" }, { type: "Entertainment", pct: 15, color: "#FBBF24" },
    { type: "Social Media", pct: 8, color: "#F87171" },
  ];

  return (
    <div className="page">
      <div className="s1" style={{ marginBottom: 22 }}>
        <h1 className="h1">Screen Time</h1>
        <p style={{ color: "var(--tx2)", fontSize: 13.5, marginTop: 5 }}>Real-time tracking · Page Visibility API · Idle detection · Focus analytics</p>
      </div>

      {/* Live tracking indicator */}
      <div className="s2" style={{ background: "rgba(0,245,200,.04)", border: "1px solid rgba(0,245,200,.12)", borderRadius: 14, padding: "13px 18px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: isIdle ? "var(--a)" : "var(--t)", animation: "pulse 1.5s infinite" }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: isIdle ? "var(--a)" : "var(--t)" }}>
          {isIdle ? "Idle detected — timer paused" : "Active — Page Visibility API tracking screen time"}
        </span>
        <span className="mono" style={{ fontSize: 12, color: "var(--tx2)", marginLeft: "auto" }}>
          Using: visibilitychange · focus/blur · mousemove · 60s idle threshold
        </span>
      </div>

      <div className="s3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
        {[
          {
            l: "Session Duration", c: "var(--b)",
            main: <span className="mono" style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1px" }}>{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</span>,
            sub: "Real-time · pauses when idle or tab hidden"
          },
          {
            l: "Productivity Score", c: prodScore > 70 ? "var(--g)" : prodScore > 50 ? "var(--a)" : "var(--r)",
            main: <><span className="mono" style={{ fontSize: 30, fontWeight: 800, color: prodScore > 70 ? "var(--g)" : prodScore > 50 ? "var(--a)" : "var(--r)" }}>{prodScore}</span><span style={{ fontSize: 16, color: "var(--tx2)" }}>/100</span></>,
            sub: prodScore > 70 ? "🟢 Excellent focus today" : prodScore > 50 ? "🟡 Moderate — consider breaks" : "🔴 High exposure — rest needed"
          },
          {
            l: "Burnout Risk", c: burnoutColor,
            main: <span className="mono" style={{ fontSize: 30, fontWeight: 800, color: burnoutColor }}>{burnout}</span>,
            sub: `${hours.toFixed(1)}h active · ${hours > 5 ? "Take a break soon" : "Looking healthy"}`
          }
        ].map((c, i) => (
          <div key={i} className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <div className="cap" style={{ color: c.c }}>{c.l}</div>
            </div>
            <div style={{ marginBottom: 6 }}>{c.main}</div>
            <div style={{ fontSize: 12, color: "var(--tx2)" }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="s4 card" style={{ padding: "20px" }}>
          <div className="h3" style={{ marginBottom: 14 }}>24-Hour Usage Estimate</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={hourlyUsage} margin={{ left: -22 }}>
              <XAxis dataKey="h" tick={{ fill: "rgba(221,230,255,.35)", fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fill: "rgba(221,230,255,.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTip />} formatter={v => [`${v} min`, "Screen"]} />
              <Bar dataKey="mins" name="Minutes" radius={[3, 3, 0, 0]}>
                {hourlyUsage.map((d, i) => <Cell key={i} fill={d.mins > 40 ? "#F87171" : d.mins > 22 ? "#FBBF24" : "#38BDF8"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="s5 card" style={{ padding: "20px" }}>
          <div className="h3" style={{ marginBottom: 14 }}>Session Breakdown</div>
          {breakdown.map(b => (
            <div key={b.type} style={{ marginBottom: 11 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12.5, fontWeight: 500 }}>{b.type}</span>
                <span className="mono" style={{ fontSize: 11, color: b.color, fontWeight: 700 }}>{b.pct}%</span>
              </div>
              <div className="pbar"><div className="pbar-f" style={{ width: `${b.pct}%`, background: `linear-gradient(90deg,${b.color}60,${b.color})` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="s6 card" style={{ padding: "20px" }}>
        <div className="h3" style={{ marginBottom: 14 }}>Digital Wellness Guidelines</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            { e: "👁️", t: "20-20-20 Rule", d: "Every 20 min, focus 20ft away for 20 seconds.", c: "rgba(0,245,200,.06)" },
            { e: "🚶", t: "Hourly Breaks", d: "Stand up and walk 5 min every hour to boost circulation.", c: "rgba(52,211,153,.06)" },
            { e: "🌙", t: "Sleep Hygiene", d: "No screens 90 min before bed — melatonin needs darkness.", c: "rgba(129,140,248,.06)" },
            { e: "💧", t: "Screen Hydration", d: "Drink 250ml of water for every hour of screen use.", c: "rgba(56,189,248,.06)" },
            { e: "🧘", t: "Mindful Breaks", d: "2-min breathing sessions between focus blocks.", c: "rgba(251,191,36,.06)" },
            { e: "📵", t: "Digital Detox", d: "Schedule 2h daily completely screen-free.", c: "rgba(248,113,113,.06)" },
          ].map(g => (
            <div key={g.t} style={{ background: g.c, borderRadius: 12, padding: "14px", border: "1px solid var(--bd)" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{g.e}</div>
              <div className="h3" style={{ fontSize: 12.5, marginBottom: 4 }}>{g.t}</div>
              <div style={{ fontSize: 12, color: "var(--tx2)", lineHeight: 1.55 }}>{g.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AI ASSISTANT PAGE — Anthropic API · Multilingual · Follow-ups
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const LANGS = [
  { code: "en", label: "English" }, { code: "hi", label: "हिंदी" },
  { code: "hinglish", label: "Hinglish" }, { code: "mr", label: "मराठी" },
  { code: "pa", label: "ਪੰਜਾਬੀ" }, { code: "gu", label: "ગુજરાતી" },
  { code: "ta", label: "தமிழ்" }, { code: "bn", label: "বাংলা" },
];

// Detect language from text using Unicode ranges + keyword heuristics
function detectLanguage(text) {
  if (!text || !text.trim()) return null;
  const t = text.trim();
  // Script-based detection (highest confidence)
  if (/[\u0A00-\u0A7F]/.test(t)) return "pa";          // Gurmukhi → Punjabi
  if (/[\u0A80-\u0AFF]/.test(t)) return "gu";          // Gujarati
  if (/[\u0B80-\u0BFF]/.test(t)) return "ta";          // Tamil
  if (/[\u0980-\u09FF]/.test(t)) return "bn";          // Bengali
  if (/[\u0900-\u097F]/.test(t)) {
    // Devanagari — distinguish Marathi vs Hindi
    const marathiWords = /\b(आहे|नाही|मला|कसे|आपण|होतो|होती|झाले|आणि|करा|सांग|बघ|तुम्ही|आम्ही)\b/;
    return marathiWords.test(t) ? "mr" : "hi";
  }
  // Hinglish detection — English text with Hindi-flavoured words
  const hinglishWords = /\b(kya|hai|nahi|kuch|thoda|mujhe|tumhe|acha|theek|bilkul|yaar|bhai|dost|kal|aaj|raat|subah|pani|khana|thak|neend|sar|dard|bimar|accha|haan|nahi|karo|karo|seedha|bahut|zyada|kam|abhi|phir|toh|matlab|samjha|bolo|batao|lagta|chahiye)\b/i;
  if (hinglishWords.test(t)) return "hinglish";
  return "en"; // Default to English
}

function buildSystemPrompt(user, records, steps, screenMs, score, lockedLang = null) {
  const today = records[records.length - 1] || {};
  const avgSleep = records.length ? (records.reduce((a, r) => a + (r.sleep || 0), 0) / records.length).toFixed(1) : "N/A";
  const screenHrs = (screenMs / 3600000).toFixed(1);
  const burnout = parseFloat(screenHrs) > 6 ? "High" : parseFloat(screenHrs) > 4 ? "Moderate" : "Low";
  return `You are Dr.AIX, a warm, highly intelligent AI wellness companion embedded in the Dr.AIX health platform — a premium AI wellness startup product.

CORE IDENTITY:
- Supportive, knowledgeable, and caring — like a health-conscious friend
- Premium feel: concise but deeply helpful responses
- Proactive: notice patterns and gently flag them
- Non-clinical: no jargon, always accessible

LANGUAGE DETECTION (CRITICAL):
${lockedLang
  ? `The user's session language is LOCKED to: ${lockedLang}. You MUST respond ONLY in this language for the entire conversation, regardless of what language you receive. Do NOT switch languages.`
  : `Detect the language of the user's FIRST message and respond in THE SAME LANGUAGE for the whole conversation.`
}
Supported: English, Hindi (हिंदी), Hinglish (mix), Marathi (मराठी), Punjabi (ਪੰਜਾਬੀ), Gujarati (ગુજરાતી), Tamil (தமிழ்), Bengali (বাংলা).

USER PROFILE:
- Name: ${user?.name || "User"}
- Age: ${user?.profile?.age || "not specified"}
- Gender: ${user?.profile?.gender || "not specified"}
- Wellness Goal: ${user?.profile?.goal || "general wellness"}
- Wellness Score: ${score}/100
- Today — Steps: ${steps.toLocaleString()}, Sleep: ${today.sleep || "not logged"}h, Water: ${today.water || "not logged"}ml, Mood: ${today.mood || "not logged"}/10, Stress: ${today.stress || "not logged"}/10
- Screen Time Today: ${screenHrs} hours (Burnout Risk: ${burnout})
- Weekly Avg Sleep: ${avgSleep}h
- Total Records: ${records.length}

TOPIC BOUNDARY (STRICT):
✅ ONLY discuss: wellness, fitness, nutrition, sleep, hydration, mental health, stress management, productivity, posture, breathing, digital wellness, mood, energy, habits, lifestyle.
❌ NEVER discuss: coding, politics, news, entertainment, finance, math, relationships (non-health), history, general science.
Off-topic response: "I'm your dedicated wellness companion — I'm best at helping with your health! Ask me about your sleep, hydration, stress, or today's wellness score 😊"

SAFETY RULES (NON-NEGOTIABLE):
1. NEVER diagnose diseases or medical conditions
2. NEVER recommend specific medications, prescriptions, or supplement brands
3. NEVER replace professional medical advice
4. For serious symptoms (chest pain, breathing difficulty, severe pain, fainting): "This sounds serious — please consult a doctor or call emergency services immediately 🚨"
5. For mental health crises or self-harm mentions: provide crisis line guidance and encourage professional help immediately

PERSONALIZATION:
- Always reference the user's actual data when giving advice
- Notice and mention patterns proactively
- Late night + high screen time → mention melatonin/sleep impact
- Low steps → suggest micro-walks
- High stress + low mood → validate and suggest breathing/walking
- Low water → hydration urgency

FOLLOW-UP INTELLIGENCE:
- Reference earlier concerns from the conversation naturally
- "You mentioned a headache earlier — how are you feeling now?"
- "Did that walk help? Your energy levels should be better."
- Celebrate small wins: "Your hydration improved from yesterday!"

RESPONSE STYLE:
- 2-4 sentences usually (concise but meaningful)
- 1-2 natural emojis (not forced, not excessive)
- Actionable and specific
- End with a gentle check-in or next step when appropriate`;
}

function AIAssistantPage({ user, records, steps, screenMs, score, token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // showPrompts: visible until user sends first message, then permanently hidden
  const [showPrompts, setShowPrompts] = useState(true);

// sessionLang: null until first user message detected, then locked for the session
const [sessionLang, setSessionLang] = useState(null);

const [followUpTimer, setFollowUpTimer] = useState(null);

const chatRef = useRef(null);
const bottomRef = useRef(null);

useEffect(() => {
  const timeout = setTimeout(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, 150);

  return () => clearTimeout(timeout);
}, [messages, loading]);

const today = records[records.length - 1] || {};

  const LANG_LABELS = {
    en: "English", hi: "हिंदी", hinglish: "Hinglish",
    mr: "मराठी", pa: "ਪੰਜਾਬੀ", gu: "ગુજરાતી", ta: "தமிழ்", bn: "বাংলা"
  };

  // Initialize with welcome message
  useEffect(() => {
    const hour = new Date().getHours();
    const greeting = hour >= 0 && hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    setMessages([{
      role: "ai",
      content: `${greeting}, ${user?.name?.split(" ")[0] || "there"}! 👋 I'm Dr.AIX, your personal AI wellness companion.\n\nI can see your wellness score is ${score}/100 today. ${score >= 70 ? "You're doing really well! 🌟" : "Let's work together to improve that."}\n\nAsk me anything about your health — sleep quality, hydration, stress, exercise, or just how you're feeling. I support English, हिंदी, Hinglish, मराठी, ਪੰਜਾਬੀ, ગુજરાતી, தமிழ், and বাংলা! 🌏`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }]);
  }, []);

  useEffect(() => {
  if (chatRef.current) {
    setTimeout(() => {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth"
      });
    }, 100);
  }
}, [messages, loading]);

  // Follow-up system
  const scheduleFollowUp = useCallback((concern) => {
    if (followUpTimer) clearTimeout(followUpTimer);
    const timer = setTimeout(async () => {
      const followUps = {
        headache: "Earlier you mentioned a headache. How are you feeling now? Did drinking water or resting help? 💆",
        fatigue: "I wanted to check in — has your energy improved? Sometimes a short walk or snack can make a big difference 🌟",
        stress: "How are you feeling now? Stress often eases after a short breathing exercise or a brief walk outside 🧘",
        sleep: "Following up on your sleep concerns — did you manage to rest better? Your next sleep session matters a lot 🌙",
      };
      const key = Object.keys(followUps).find(k => concern.toLowerCase().includes(k));
      if (key) {
        setMessages(m => [...m, {
          role: "ai",
          content: followUps[key],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isFollowUp: true
        }]);
      }
    }, 180000); // 3 minutes
    setFollowUpTimer(timer);
  }, [followUpTimer]);

  const send = async (msg) => {
    const text = msg || input.trim();
    if (!text || loading) return;
    setInput("");

    // On first user message: detect language → lock it → hide quick prompts
    const isFirstMsg = !messages.some(m => m.role === "user");
    let currentLang = sessionLang;
    if (isFirstMsg) {
      const detected = detectLanguage(text);
      currentLang = detected;
      setSessionLang(detected);
      setShowPrompts(false);      // permanently hide once user starts typing
    }

    const userMsg = { role: "user", content: text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    // Schedule follow-up for health concerns
    const concerns = ["headache", "tired", "fatigue", "stress", "sleep", "pain", "थका", "सिरदर्द", "नींद"];
    if (concerns.some(c => text.toLowerCase().includes(c))) scheduleFollowUp(text);

    try {
      // Pass locked language so system prompt enforces it throughout
      const sysPrompt = buildSystemPrompt(user, records, steps, screenMs, score, currentLang);
      const history = newMessages.slice(-12).map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.content }));

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_OPENROUTER_API_KEY"
  },
  body: JSON.stringify({
    model: "openai/gpt-3.5-turbo",
    messages: history.map(m => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.content
    }))
  })
});

const data = await res.json();

const reply =
  data.choices?.[0]?.message?.content ||
  "Sorry, I couldn't process that.";
      setMessages(m => [...m, { role: "ai", content: reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);

      // Save chat to MongoDB via API
      await api.saveChat(token, [...newMessages, { role: "ai", content: reply }].slice(-50));
    } catch {
      setMessages(m => [...m, {
        role: "ai",
        content: "Connection issue — but I'm still here with you! Based on your data, remember to stay hydrated and take regular breaks. 💙",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }]);
    }
    setLoading(false);
  };

  const quickPrompts = [
    "How's my wellness score?", "Tips to sleep better",
    "Am I dehydrated?", "Stress relief exercises",
    "I have a headache", "Step goal motivation",
  ];

  return (
    <div className="page">
      <div className="s1" style={{ marginBottom: 18 }}>
        <h1 className="h1">AI Assistant</h1>
        <p style={{ color: "var(--tx2)", fontSize: 13.5, marginTop: 5 }}>Multilingual wellness AI · Powered by Claude · 8 languages supported</p>
      </div>

      <div className="ai-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18, height: "calc(100vh - 190px)", maxHeight: 680 }}>
        {/* Chat */}
        <div className="s2 card" style={{ display: "flex", flexDirection: "column" }}>
          {/* Chat header */}
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--bd)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#818CF8,#C4B5FD)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(129,140,248,.3)" }}>
              <Brain size={19} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="h3" style={{ fontSize: 14 }}>Dr.AIX Assistant</div>
              <div style={{ fontSize: 11, color: "var(--t)", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--t)", animation: "pulse 2s infinite" }} />
                Active · Personalized to your health data
              </div>
            </div>
            {/* Language lock badge — shows "Auto-detect" until first message, then shows locked language */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6, padding: "5px 11px",
              background: sessionLang ? "var(--t10)" : "rgba(255,255,255,.04)",
              border: `1px solid ${sessionLang ? "rgba(0,245,200,.22)" : "var(--bd)"}`,
              borderRadius: 9, transition: "all .35s ease"
            }}>
              <Globe size={12} color={sessionLang ? "var(--t)" : "var(--tx3)"} />
              <span style={{
                fontSize: 12, fontFamily: "Syne,sans-serif", fontWeight: 700,
                color: sessionLang ? "var(--t)" : "var(--tx3)",
                transition: "color .3s"
              }}>
                {sessionLang ? LANG_LABELS[sessionLang] || sessionLang : "Auto-detect"}
              </span>
              {sessionLang && (
                <span style={{
                  fontSize: 9, fontWeight: 700, color: "var(--t)", textTransform: "uppercase",
                  letterSpacing: ".5px", background: "rgba(0,245,200,.15)", borderRadius: 4,
                  padding: "1px 5px", fontFamily: "Syne,sans-serif"
                }}>Locked</span>
              )}
            </div>
          </div>

          {/* Messages */}
{/* Messages */}
<div
  ref={chatRef}
  style={{
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    scrollBehavior: "smooth",
    scrollbarWidth: "none"
  }}
>
  {messages.map((m, i) => (
    <div
      key={i}
      style={{
        animation: "msgIn .25s ease",
        marginBottom: 12,
        display: "flex",
        justifyContent: m.role === "user" ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        width: "100%"
      }}
    >
      {/* AI Avatar */}
      {m.role === "ai" && (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: "linear-gradient(135deg,#818CF8,#C4B5FD)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
            marginRight: 9
          }}
        >
          <Brain size={13} color="#fff" />
        </div>
      )}

      {/* Message Wrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: m.role === "user" ? "flex-end" : "flex-start",
          maxWidth: "80%",
          minWidth: m.role === "user" ? "90px" : "unset"
        }}
      >
        {/* Followup */}
        {m.isFollowUp && (
          <div
            style={{
              fontSize: 10.5,
              color: "var(--t)",
              fontFamily: "Syne,sans-serif",
              fontWeight: 700,
              marginBottom: 4,
              letterSpacing: ".4px"
            }}
          >
            🔔 FOLLOW-UP CHECK-IN
          </div>
        )}

        {/* Chat Bubble */}
        <div
          className={m.role === "ai" ? "chat-ai" : "chat-user"}
          style={{
            textAlign: "left",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap"
          }}
        >
          {String(m.content || "").split("\n").map((line, li) => (
            <div key={li}>
              {line}
              {li < String(m.content || "").split("\n").length - 1 ? (
                <br />
              ) : null}
            </div>
          ))}
        </div>

        {/* Time */}
        <div
          style={{
            fontSize: 10,
            color: "var(--tx3)",
            marginTop: 4,
            textAlign: m.role === "user" ? "right" : "left",
            fontFamily: "DM Mono,monospace"
          }}
        >
          {m.time}
        </div>
      </div>
    </div>
  ))}

  {/* Loading */}
  {loading && (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 9,
      marginBottom: 12
    }}
  >
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: 9,
        background: "linear-gradient(135deg,#818CF8,#C4B5FD)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }}
    >
      <Brain size={13} color="#fff" />
    </div>

    <div
      className="chat-ai"
      style={{
        display: "flex",
        gap: 6,
        alignItems: "center",
        padding: "14px 18px"
      }}
    >
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="typing-dot"
          style={{
            animationDelay: `${i * 0.18}s`
          }}
        />
      ))}
    </div>
  </div>
)}

<div ref={bottomRef} />
</div>

          {/* Quick prompts — only shown before first user message, auto-hidden permanently after */}
          {showPrompts && (
            <div style={{
              padding: "10px 14px 10px",
              borderTop: "1px solid var(--bd)",
              display: "flex", gap: 6, flexWrap: "wrap",
              animation: "fadeIn .3s ease"
            }}>
              <span style={{
                width: "100%", fontSize: 10.5, color: "var(--tx3)",
                fontFamily: "Syne,sans-serif", fontWeight: 700,
                letterSpacing: ".6px", textTransform: "uppercase", marginBottom: 3
              }}>
                Quick start — tap to begin:
              </span>
              {quickPrompts.map(q => (
                <button key={q} onClick={() => send(q)} style={{
                  background: "rgba(255,255,255,.04)", border: "1px solid var(--bd)",
                  borderRadius: 20, padding: "5px 12px", fontSize: 11.5,
                  color: "var(--tx2)", cursor: "pointer", transition: "all .18s",
                  fontFamily: "DM Sans,sans-serif", outline: "none"
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,245,200,.35)"; e.currentTarget.style.color = "var(--t)"; e.currentTarget.style.background = "rgba(0,245,200,.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bd)"; e.currentTarget.style.color = "var(--tx2)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
<div
  style={{
    position: "sticky",
    bottom: 0,
    zIndex: 20,
    background: "rgba(10,10,15,.92)",
    backdropFilter: "blur(12px)",
    borderTop: "1px solid var(--bd)",
    padding: "10px 14px 14px",
    display: "flex",
    gap: 9
  }}
>
  <input
    className="finput"
    type="text"
    placeholder={
      sessionLang
        ? `Continue in ${LANG_LABELS[sessionLang] || sessionLang}...`
        : "Type in any language — English, हिंदी, Hinglish, मराठी..."
    }
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
    style={{
      flex: 1
    }}
  />

  <button
    className="btn-p"
    onClick={() => send()}
    disabled={!input.trim() || loading}
    style={{
      padding: "10px 16px",
      flexShrink: 0
    }}
  >
    {loading ? (
      <Loader2
        size={15}
        style={{ animation: "spin 1s linear infinite" }}
      />
    ) : (
      <Send size={15} />
    )}
  </button>
</div>
        </div>

        {/* Right panel — health context */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
          <div className="s3 card" style={{ padding: "16px" }}>
            <div className="h3" style={{ marginBottom: 12 }}>Your Health Context</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                { l: "Wellness Score", v: `${score}/100`, c: score >= 70 ? "var(--g)" : "var(--a)", icon: Shield },
                { l: "Steps Today", v: steps.toLocaleString(), c: "var(--t)", icon: Activity },
                { l: "Sleep", v: `${today.sleep || "—"}h`, c: "var(--v)", icon: Moon },
                { l: "Hydration", v: `${(today.water || 0).toLocaleString()}ml`, c: "var(--b)", icon: Droplets },
                { l: "Mood", v: `${today.mood || "—"}/10`, c: "var(--a)", icon: Smile },
                { l: "Stress", v: `${today.stress || "—"}/10`, c: today.stress > 6 ? "var(--r)" : "var(--g)", icon: Zap },
                { l: "Screen Time", v: `${(screenMs / 3600000).toFixed(1)}h`, c: (screenMs / 3600000) > 5 ? "var(--r)" : "var(--g)", icon: Monitor },
              ].map(s => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: `${s.c}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <s.icon size={12} color={s.c} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10.5, color: "var(--tx3)", fontFamily: "Syne,sans-serif", fontWeight: 600 }}>{s.l}</div>
                    <div className="mono" style={{ fontSize: 13.5, fontWeight: 700, color: s.c }}>{s.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="s4 card" style={{ padding: "16px", background: "rgba(129,140,248,.04)", border: "1px solid rgba(129,140,248,.1)" }}>
            <div style={{ fontSize: 12, color: "var(--v)", fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 8 }}>🔔 Follow-Up System</div>
            <p style={{ fontSize: 12, color: "var(--tx2)", lineHeight: 1.6 }}>When you mention a health concern (headache, fatigue, stress), Dr.AIX schedules an automatic follow-up check-in after 3 minutes to see how you're doing.</p>
          </div>

          <div className="s5 card" style={{ padding: "16px" }}>
            <div className="h3" style={{ fontSize: 12.5, marginBottom: 10 }}>Language Session</div>
            {/* Status row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 9, padding: "10px 12px",
              background: sessionLang ? "var(--t10)" : "rgba(255,255,255,.03)",
              border: `1px solid ${sessionLang ? "rgba(0,245,200,.18)" : "var(--bd)"}`,
              borderRadius: 10, marginBottom: 10, transition: "all .35s ease"
            }}>
              <Globe size={14} color={sessionLang ? "var(--t)" : "var(--tx3)"} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10.5, color: "var(--tx3)", fontFamily: "Syne,sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px" }}>
                  {sessionLang ? "Session Language" : "Status"}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: sessionLang ? "var(--t)" : "var(--tx2)", marginTop: 1 }}>
                  {sessionLang ? LANG_LABELS[sessionLang] || sessionLang : "Waiting for first message…"}
                </div>
              </div>
              {sessionLang && (
                <span style={{
                  fontSize: 9, fontWeight: 800, background: "rgba(0,245,200,.18)", color: "var(--t)",
                  borderRadius: 5, padding: "2px 6px", fontFamily: "Syne,sans-serif",
                  textTransform: "uppercase", letterSpacing: ".5px"
                }}>LOCKED</span>
              )}
            </div>
            <p style={{ fontSize: 11.5, color: "var(--tx3)", lineHeight: 1.65, marginBottom: 10 }}>
              {sessionLang
                ? `Dr.AIX will continue this entire conversation in ${LANG_LABELS[sessionLang] || sessionLang}. Start a new session to change language.`
                : "Language is auto-detected from your first message and locked for the whole conversation."}
            </p>
            {/* Language list — display only, no click-to-change */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {LANGS.map(l => (
                <span key={l.code} className="badge" style={{
                  background: sessionLang === l.code ? "var(--t10)" : "rgba(255,255,255,.04)",
                  color: sessionLang === l.code ? "var(--t)" : "var(--tx3)",
                  border: `1px solid ${sessionLang === l.code ? "rgba(0,245,200,.2)" : "var(--bd)"}`,
                  fontSize: 11, transition: "all .2s"
                }}>{l.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REPORTS PAGE — Premium PDF generation via Print API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ReportsPage({ user, records, steps, screenMs, score, weeklyData, addToast }) {
  const [generating, setGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const today = records[records.length - 1] || {};

  const genAISummary = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 400,
          system: "You are Dr.AIX, a premium AI wellness assistant. Generate a concise, professional wellness report summary (3-4 sentences) based on the user's health data. Be specific, actionable, and encouraging. No bullet points.",
          messages: [{
            role: "user",
            content: `User: ${user?.name}, Score: ${score}/100, Sleep: ${today.sleep || "N/A"}h, Water: ${today.water || "N/A"}ml, Steps today: ${steps}, Screen time: ${(screenMs / 3600000).toFixed(1)}h, Records logged: ${records.length}, Avg sleep 7d: ${records.length ? (records.reduce((a, r) => a + (r.sleep || 0), 0) / records.length).toFixed(1) : "N/A"}h. Write a professional wellness summary for their downloadable report.`
          }]
        })
      });
      const data = await res.json();
      setAiSummary(data.content?.[0]?.text || "Unable to generate AI summary. Please check your connection.");
    } catch {
      setAiSummary(`${user?.name}'s wellness data shows a score of ${score}/100 for the current period. Key focus areas include maintaining consistent sleep duration and hydration levels. Regular physical activity and mindful screen-time management will support continued wellness improvement.`);
    }
    setLoadingAI(false);
  };

  const generateReport = async () => {
    setGenerating(true);
    if (!aiSummary) await genAISummary();
    setGenerating(false);
    setShowReport(true);
  };

  const printReport = () => {
    const w = window.open("", "_blank");
    const reportDate = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    const avgSleep = records.length ? (records.reduce((a, r) => a + (r.sleep || 0), 0) / records.length).toFixed(1) : "N/A";
    const avgWater = records.length ? Math.round(records.reduce((a, r) => a + (r.water || 0), 0) / records.length) : 0;
    w.document.write(`<!DOCTYPE html><html><head><title>Dr.AIX Wellness Report</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a2e;padding:0}
      .pg{max-width:780px;margin:0 auto;padding:48px 48px 64px}
      .hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:36px;padding-bottom:24px;border-bottom:2px solid #00F5C8}
      .logo{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#1a1a2e}
      .logo span{color:#00a88f}
      .tagline{font-size:11px;color:#888;letter-spacing:1.5px;text-transform:uppercase;margin-top:4px}
      .meta{text-align:right;font-size:12px;color:#888}
      .meta strong{display:block;font-size:14px;color:#1a1a2e;font-weight:600;margin-bottom:3px}
      .score-hero{display:flex;align-items:center;gap:32px;background:linear-gradient(135deg,#f0fffe,#e6f7ff);border-radius:16px;padding:28px 32px;margin-bottom:28px}
      .score-num{font-family:'Syne',sans-serif;font-size:72px;font-weight:800;color:#00a88f;line-height:1}
      .score-info{flex:1}
      .score-info h2{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:8px}
      .score-info p{font-size:13.5px;color:#555;line-height:1.65}
      .section{margin-bottom:28px}
      .section-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#888;margin-bottom:14px;display:flex;align-items:center;gap:8px}
      .section-title::after{content:'';flex:1;height:1px;background:#eee}
      .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:8px}
      .metric{background:#f8f9ff;border-radius:12px;padding:16px;border:1px solid #eaeef8}
      .metric-val{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;color:#1a1a2e;margin-bottom:2px}
      .metric-lbl{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.8px;font-weight:600}
      .ai-box{background:#f0fffe;border:1px solid #b3f0e8;border-radius:14px;padding:22px;margin-bottom:28px}
      .ai-label{font-size:11px;font-weight:700;color:#00a88f;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
      .ai-text{font-size:14px;line-height:1.75;color:#333}
      .footer{margin-top:40px;padding-top:20px;border-top:1px solid #eee;font-size:11px;color:#aaa;text-align:center;line-height:1.8}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
    </style></head><body><div class="pg">
    <div class="hdr">
      <div><div class="logo">Dr.<span>AIX</span></div><div class="tagline">Where AI Meets Human Wellness</div></div>
      <div class="meta"><strong>Wellness Report</strong>${reportDate}<br/>Generated for: ${user?.name || "User"}</div>
    </div>
    <div class="score-hero">
      <div class="score-num">${score}</div>
      <div class="score-info">
        <h2>Wellness Score: ${score >= 75 ? "Excellent" : score >= 50 ? "Good" : "Needs Improvement"}</h2>
        <p>Based on sleep quality, hydration, physical activity, mood, and digital wellness metrics. A score of 70+ indicates strong overall wellness habits.</p>
      </div>
    </div>
    <div class="section"><div class="section-title">Today's Key Metrics</div>
    <div class="grid">
      <div class="metric"><div class="metric-val">${steps.toLocaleString()}</div><div class="metric-lbl">Steps Today</div></div>
      <div class="metric"><div class="metric-val">${today.sleep || "—"}h</div><div class="metric-lbl">Sleep Duration</div></div>
      <div class="metric"><div class="metric-val">${(today.water || 0).toLocaleString()}ml</div><div class="metric-lbl">Hydration</div></div>
      <div class="metric"><div class="metric-val">${today.mood || "—"}/10</div><div class="metric-lbl">Mood Score</div></div>
      <div class="metric"><div class="metric-val">${(screenMs / 3600000).toFixed(1)}h</div><div class="metric-lbl">Screen Time</div></div>
      <div class="metric"><div class="metric-val">${today.calories || "—"}</div><div class="metric-lbl">Calories (kcal)</div></div>
    </div></div>
    <div class="section"><div class="section-title">7-Day Averages</div>
    <div class="grid">
      <div class="metric"><div class="metric-val">${avgSleep}h</div><div class="metric-lbl">Avg Sleep</div></div>
      <div class="metric"><div class="metric-val">${avgWater.toLocaleString()}ml</div><div class="metric-lbl">Avg Hydration</div></div>
      <div class="metric"><div class="metric-val">${records.length}</div><div class="metric-lbl">Records Logged</div></div>
    </div></div>
    <div class="ai-box">
      <div class="ai-label">🧠 AI Wellness Summary</div>
      <div class="ai-text">${aiSummary || "Generating personalized AI analysis based on your health data..."}</div>
    </div>
    <div class="footer">Dr.AIX Wellness Platform · AI-powered health analytics · For informational purposes only<br/>This report does not constitute medical advice. Consult a healthcare professional for medical decisions.<br/>Report ID: DRAIX-${Date.now().toString(36).toUpperCase()}</div>
    </div></body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 800);
  };

  return (
    <div className="page">
      <div className="s1" style={{ marginBottom: 22 }}>
        <h1 className="h1">Reports</h1>
        <p style={{ color: "var(--tx2)", fontSize: 13.5, marginTop: 5 }}>Generate premium AI-powered wellness reports · Export as PDF</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Report Generator */}
          <div className="s2 card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div className="h2">Wellness Report</div>
                <div style={{ fontSize: 13, color: "var(--tx2)", marginTop: 5 }}>AI-generated health summary with full analytics</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {!aiSummary && <button className="btn-s" onClick={genAISummary} disabled={loadingAI} style={{ fontSize: 12.5 }}>
                  {loadingAI ? <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />Analyzing…</> : <><Brain size={13} />AI Summary</>}
                </button>}
                <button className="btn-p" onClick={showReport ? printReport : generateReport} disabled={generating}>
                  {generating ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />Generating…</> :
                    showReport ? <><Download size={14} />Download PDF</> : <><FileText size={14} />Generate Report</>}
                </button>
              </div>
            </div>

            {/* Report Preview */}
            {showReport && (
              <div style={{ border: "1px solid var(--bd2)", borderRadius: 12, overflow: "hidden", animation: "fadeIn .3s ease" }}>
                {/* Report Header */}
                <div style={{ background: "linear-gradient(135deg,rgba(0,245,200,.08),rgba(56,189,248,.08))", padding: "22px 24px", borderBottom: "1px solid var(--bd)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="h2">Dr.<span className="grad">AIX</span> Wellness Report</div>
                      <div style={{ fontSize: 11, color: "var(--tx3)", marginTop: 3 }}>Generated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 44, fontFamily: "Syne,sans-serif", fontWeight: 800, color: score >= 70 ? "var(--t)" : "var(--a)", lineHeight: 1 }}>{score}</div>
                      <div style={{ fontSize: 11, color: "var(--tx2)", fontFamily: "Syne,sans-serif" }}>WELLNESS SCORE</div>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                  {[
                    { l: "Steps", v: steps.toLocaleString(), c: "var(--t)" },
                    { l: "Sleep", v: `${today.sleep || "—"}h`, c: "var(--v)" },
                    { l: "Hydration", v: `${(today.water || 0).toLocaleString()}ml`, c: "var(--b)" },
                    { l: "Mood", v: `${today.mood || "—"}/10`, c: "var(--a)" },
                    { l: "Screen Time", v: `${(screenMs / 3600000).toFixed(1)}h`, c: "var(--g)" },
                    { l: "Records", v: records.length, c: "var(--tx)" },
                  ].map(m => (
                    <div key={m.l} style={{ background: "rgba(255,255,255,.028)", borderRadius: 10, padding: "13px" }}>
                      <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: m.c, marginBottom: 3 }}>{m.v}</div>
                      <div style={{ fontSize: 11, color: "var(--tx3)", fontFamily: "Syne,sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{m.l}</div>
                    </div>
                  ))}
                </div>

                {/* AI Summary */}
                {(aiSummary || loadingAI) && (
                  <div style={{ padding: "0 24px 20px" }}>
                    <div style={{ background: "rgba(0,245,200,.04)", border: "1px solid rgba(0,245,200,.12)", borderRadius: 11, padding: "16px" }}>
                      <div style={{ fontSize: 11, color: "var(--t)", fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 8 }}>🧠 AI WELLNESS SUMMARY</div>
                      {loadingAI ? (
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          {[0, 1, 2].map(i => <div key={i} className="typing-dot" style={{ animationDelay: `${i * .18}s` }} />)}
                          <span style={{ fontSize: 12.5, color: "var(--tx2)" }}>Analyzing your health data…</span>
                        </div>
                      ) : <p style={{ fontSize: 13.5, color: "var(--tx2)", lineHeight: 1.7 }}>{aiSummary}</p>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!showReport && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--tx3)" }}>
                <FileText size={40} style={{ margin: "0 auto 14px", display: "block", opacity: .3 }} />
                <p style={{ fontSize: 14 }}>Click "Generate Report" to create your<br />AI-powered wellness analysis</p>
              </div>
            )}
          </div>

          {/* 7-day bar chart */}
          <div className="s3 card" style={{ padding: "20px" }}>
            <div className="h3" style={{ marginBottom: 14 }}>Weekly Sleep & Hydration Trend</div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyData} margin={{ left: -22 }}>
                <XAxis dataKey="day" tick={{ fill: "rgba(221,230,255,.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(221,230,255,.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTip />} />
                <Bar dataKey="sleep" name="Sleep (h)" fill="#818CF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="s2 card" style={{ padding: "18px" }}>
            <div className="h3" style={{ marginBottom: 13 }}>Report Includes</div>
            {[
              { icon: "📊", t: "Health Score Analysis", d: "Comprehensive wellness score breakdown" },
              { icon: "📈", t: "Weekly Trend Charts", d: "Sleep, hydration, mood, activity" },
              { icon: "🧠", t: "AI Health Summary", d: "Personalized insights by Claude AI" },
              { icon: "💧", t: "Hydration Analysis", d: "Daily & weekly patterns" },
              { icon: "📱", t: "Screen Time Report", d: "Digital wellness assessment" },
              { icon: "🎯", t: "Recommendations", d: "Data-driven action items" },
            ].map(r => (
              <div key={r.t} style={{ display: "flex", gap: 10, marginBottom: 11 }}>
                <span style={{ fontSize: 17, lineHeight: 1 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 1 }}>{r.t}</div>
                  <div style={{ fontSize: 11.5, color: "var(--tx3)" }}>{r.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="s3 card" style={{ padding: "16px", background: "rgba(129,140,248,.04)", border: "1px solid rgba(129,140,248,.12)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--v)", fontFamily: "Syne,sans-serif", marginBottom: 7 }}>ℹ️ MongoDB Sync</div>
            <p style={{ fontSize: 12, color: "var(--tx2)", lineHeight: 1.65 }}>Reports are saved to MongoDB Atlas and accessible on all your devices. Health data syncs in real-time across all sessions.</p>
          </div>

          <div className="s4 card" style={{ padding: "16px" }}>
            <div style={{ fontSize: 11.5, color: "var(--tx3)", lineHeight: 1.7 }}>
              <div style={{ fontWeight: 600, color: "var(--tx2)", marginBottom: 5 }}>⚕️ Medical Disclaimer</div>
              This report is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for medical decisions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FLOATING AI CHAT BUTTON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FloatingChatBtn({ page, setPage }) {
  if (page === "ai") return null;
  return (
    <button onClick={() => setPage("ai")} style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 1000,
      width: 52, height: 52, borderRadius: "50%",
      background: "linear-gradient(135deg,#818CF8,#C4B5FD)",
      border: "none", cursor: "pointer", outline: "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 6px 28px rgba(129,140,248,.45), 0 0 0 4px rgba(129,140,248,.1)",
      animation: "glowT 3s ease-in-out infinite", transition: "transform .2s"
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      title="Ask Dr.AIX">
      <Brain size={22} color="#fff" />
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function DrAIX() {
  // Inject styles
  useEffect(() => {
    if (!document.getElementById("draix-css")) {
      const el = document.createElement("style");
      el.id = "draix-css";
      el.textContent = DRAIX_STYLES;
      document.head.appendChild(el);
    }
  }, []);

  // Auth state
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("draix_user") || "null"); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("draix_token") || null);

  // Navigation
  const [page, setPage] = useState("dashboard");

  // Health records (MongoDB synced via API service)
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  // Real step tracking hook
  const stepTracker = useStepTracker(0);

  // Real screen time hook
  const screenTime = useScreenTime();

  // Toast system
  const { toasts, add: addToast, remove: removeToast } = useToasts();

  // Wellness alerts (real screen time feeds them)
  useWellnessAlerts(screenTime.activeMs, addToast);

  // Load records from MongoDB on login
  useEffect(() => {
    if (!token) return;
    setLoadingRecords(true);
    api.getRecords(token).then(data => {
      setRecords(Array.isArray(data) ? data : []);
      setLoadingRecords(false);
    }).catch(() => setLoadingRecords(false));
  }, [token]);

  // Wellness score
  const score = useMemo(() => calcWellnessScore(records, stepTracker.steps, screenTime.activeMs), [records, stepTracker.steps, screenTime.activeMs]);

  // Weekly data for charts
  const weeklyData = useMemo(() => genWeeklyData(records.slice(-7)), [records]);

  // Save steps to MongoDB on session
  useEffect(() => {
    if (!token || !stepTracker.steps) return;
    const t = setTimeout(() => {
      api.saveSteps(token, { date: new Date().toISOString().split("T")[0], count: stepTracker.steps });
    }, 5000);
    return () => clearTimeout(t);
  }, [stepTracker.steps, token]);

  // Save screen time to MongoDB periodically
  useEffect(() => {
    if (!token || !screenTime.activeMs) return;
    const t = setInterval(() => {
      api.saveScreenTime(token, { date: new Date().toISOString().split("T")[0], ms: screenTime.activeMs });
    }, 60000);
    return () => clearInterval(t);
  }, [screenTime.activeMs, token]);

  // Periodic wellness tips
  useEffect(() => {
    const tips = [
      { icon: "💧", title: "Hydration Check", msg: "Have you logged your water intake today? Staying hydrated boosts focus by 20%." },
      { icon: "🧘", title: "Mindfulness Moment", msg: "Take 3 deep breaths right now. Inhale for 4 counts, hold 2, exhale 6." },
      { icon: "🌟", title: "Wellness Check-in", msg: "How's your mood today? Regular tracking helps identify patterns." },
    ];
    const t = setInterval(() => {
      if (Math.random() > 0.65) addToast({ ...tips[Math.floor(Math.random() * tips.length)], duration: 7000 });
    }, 900000); // every 15 min
    return () => clearInterval(t);
  }, [addToast]);

  // Auth handlers
  const handleAuth = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    addToast({ icon: "🎉", title: `Welcome, ${userData.name?.split(" ")[0]}!`, msg: "Your wellness data is ready. Let's have a great day!", duration: 4000 });
  };

  const handleLogout = () => {
    localStorage.removeItem("draix_token");
    localStorage.removeItem("draix_user");
    setUser(null); setToken(null); setRecords([]); setPage("dashboard");
    stepTracker.stop(); stepTracker.reset();
  };

  // Record CRUD (syncs to MongoDB via API service)
  const addRecord = async (data) => {
    const rec = await api.addRecord(token, data);
    setRecords(rs => [...rs, rec]);
    addToast({ icon: "✅", title: "Record saved!", msg: "Health data synced to MongoDB Atlas.", duration: 3000 });
  };
  const updateRecord = async (id, data) => {
    await api.updateRecord(token, id, data);
    setRecords(rs => rs.map(r => r._id === id ? { ...r, ...data } : r));
    addToast({ icon: "✏️", title: "Record updated!", msg: "Changes synced across all devices.", duration: 3000 });
  };
  const deleteRecord = async (id) => {
    await api.deleteRecord(token, id);
    setRecords(rs => rs.filter(r => r._id !== id));
    addToast({ icon: "🗑️", title: "Record deleted", msg: "Removed from MongoDB Atlas.", color: "var(--r)", duration: 3000 });
  };

  if (!user) return <AuthScreen onAuth={handleAuth} />;

  const pageProps = { user, records, steps: stepTracker.steps, screenMs: screenTime.activeMs, score, weeklyData, addToast, token, setPage };

  return (
    <div className="shell">
      <Sidebar page={page} setPage={setPage} user={user} onLogout={handleLogout} />

      <div className="main">
        <TopBar user={user} page={page} screenMs={screenTime.activeMs} steps={stepTracker.steps} score={score} addToast={addToast} onLogout={handleLogout} />

        <div className="page-wrap dot-bg">
          {loadingRecords && (
            <div style={{ padding: "24px" }}>
              {[1, 2, 3].map(i => <div key={i} className="sk" style={{ height: 72, marginBottom: 12 }} />)}
            </div>
          )}
          {!loadingRecords && <>
            {page === "dashboard" && <DashboardPage {...pageProps} />}
            {page === "health" && <HealthTrackerPage records={records} onAdd={addRecord} onUpdate={updateRecord} onDelete={deleteRecord} token={token} />}
            {page === "steps" && <StepTrackerPage stepTracker={stepTracker} addToast={addToast} />}
            {page === "screen" && <ScreenTimePage screenTime={screenTime} />}
            {page === "ai" && <AIAssistantPage {...pageProps} />}
            {page === "reports" && <ReportsPage {...pageProps} />}
          </>}
        </div>
      </div>

      {/* Floating AI button */}
      <FloatingChatBtn page={page} setPage={setPage} />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} remove={removeToast} />
    </div>
  );
}
