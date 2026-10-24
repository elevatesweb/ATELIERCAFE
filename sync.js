/* Same-origin browser-tab synchronization and safe release checking. No online database. */
(()=>{'use strict';
const KEY='atelier-premium-v1';
const channel=typeof BroadcastChannel!=='undefined'?new BroadcastChannel('atelier-cafe-local'):null;
let last=localStorage.getItem(KEY)||'';
function sync(){const incoming=localStorage.getItem(KEY)||'';if(incoming===last)return;last=incoming;try{const next=JSON.parse(incoming);if(!next||!Array.isArray(next.orders)||!Array.isArray(next.menu))return;state=next;if(typeof render==='function')render()}catch(e){console.warn('Local sync skipped',e)}}
window.addEventListener('storage',e=>{if(e.key===KEY)sync()});
channel?.addEventListener('message',e=>{if(e.data==='updated')sync()});
window.addEventListener('atelier:updated',()=>{last=localStorage.getItem(KEY)||'';channel?.postMessage('updated')});
// Check published release version. Prompt rather than force reload during an order.
let release='2026.10.24-premium';
async function checkVersion(){if(location.protocol==='file:')return;try{const r=await fetch('./version.json?ts='+Date.now(),{cache:'no-store'});if(!r.ok)return;const data=await r.json();if(data.version&&data.version!==release&&!document.getElementById('atelier-update-toast')){const bar=document.createElement('div');bar.id='atelier-update-toast';bar.className='update-toast';bar.innerHTML='<span><b>New version available</b><small>Save your current order before refreshing.</small></span><button type="button" id="atelier-reload">Refresh app ↗</button><button type="button" id="atelier-dismiss" aria-label="Dismiss">×</button>';document.body.append(bar);bar.querySelector('#atelier-reload').onclick=()=>location.reload();bar.querySelector('#atelier-dismiss').onclick=()=>bar.remove()}}catch{}}
checkVersion();setInterval(checkVersion,90000);
})();
