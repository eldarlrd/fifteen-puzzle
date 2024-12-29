(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(i){if(i.ep)return;i.ep=!0;const c=s(i);fetch(i.href,c)}})();const _=new Set,I=new Set;function R(e){return typeof e=="function"&&!!e.isT}function T(e){return typeof e=="object"&&e!==null&&"$on"in e&&typeof e.$on=="function"}function Q(e){return"$on"in e}function J(e){return(o,s)=>{function n(){const i=Array.from(_);_.clear();const c=Array.from(I);I.clear(),i.forEach(r=>r(o,s)),c.forEach(r=>r()),_.size&&setTimeout(n)}_.size||setTimeout(n),_.add(e)}}const b=new Map;function E(e,o={}){if(T(e)||typeof e!="object")return e;const s=o.o||new Map,n=o.op||new Map,i=Array.isArray(e),c=[],r=i?[]:Object.create(e,{});for(const l in e){const a=e[l];typeof a=="object"&&a!==null?(r[l]=T(a)?a:E(a),c.push(l)):r[l]=a}const d=l=>(a,h)=>{let f=s.get(a),w=n.get(h);f||(f=new Set,s.set(a,f)),w||(w=new Set,n.set(h,w)),f[l](h),w[l](a)},m=d("add"),g=d("delete"),x=(l,a,h)=>{s.has(l)&&s.get(l).forEach(f=>f(a,h))},p={$on:m,$off:g,_em:x,_st:()=>({o:s,op:n,r,p:u._p}),_p:void 0},u=new Proxy(r,{has(l,a){return a in p||a in l},get(...l){const[,a]=l;if(Reflect.has(p,a))return Reflect.get(p,a);const h=Reflect.get(...l);return X(u,a),i&&a in Array.prototype?Y(a,r,u,h):h},set(...l){const[a,h,f]=l,w=Reflect.get(a,h);if(Reflect.has(p,h))return Reflect.set(p,h,f);if(f&&T(w)){const V=w,$=V._st(),O=T(f)?Z(f,V):E(f,$);return Reflect.set(a,h,O),x(h,O),$.o.forEach((xe,C)=>{const P=Reflect.get(w,C),j=Reflect.get(O,C);P!==j&&V._em(C,j,P)}),!0}const y=Reflect.set(...l);return y&&(w!==f&&x(h,f,w),u._p&&u._p[1]._em(...u._p)),y}});return o.p&&(u._p=o.p),c.map(l=>{u[l]._p=[l,u]}),u}function X(e,o){b.forEach(s=>{let n=s.get(e);n||(n=new Set,s.set(e,n)),n.add(o)})}function Y(e,o,s,n){const i=(...c)=>{const r=Array.prototype[e].call(o,...c);if(o.forEach((d,m)=>s._em(String(m),d)),s._p){const[d,m]=s._p;m._em(d,s)}return r};switch(e){case"shift":case"pop":case"sort":case"reverse":case"copyWithin":return i;case"unshift":case"push":case"fill":return(...c)=>i(...c.map(r=>E(r)));case"splice":return(c,r,...d)=>i(c,r,...d.map(m=>E(m)));default:return n}}function Z(e,o){const s=o._st();return s.o&&s.o.forEach((n,i)=>{n.forEach(c=>{e.$on(i,c)})}),s.p&&(e._p=s.p),e}function L(e,o){const s=Symbol();b.has(s)||b.set(s,new Map);let n=new Map;const i=J(c);function c(){b.set(s,new Map);const r=e(),d=b.get(s);return b.delete(s),n.forEach((m,g)=>{const x=d.get(g);x&&x.forEach(v=>m.delete(v)),m.forEach(v=>g.$off(v,i))}),d.forEach((m,g)=>{m.forEach(x=>g.$on(x,i))}),n=d,o?o(r):r}return Q(e)&&e.$on(c),c()}const A=new WeakMap,D={},W="➳❍",q="❍⇚",B=`<!--${W}-->`,ee=`<!--${q}-->`;function z(e,...o){const s=[];let n="";const i=(d,m)=>{if(typeof d=="function"){let g=()=>{};return s.push(Object.assign((...x)=>d(...x),{e:d,$on:x=>{g=x},_up:x=>{d=x,g()}})),m+B}return Array.isArray(d)?d.reduce((g,x)=>i(x,g),m):m+d},c=()=>(n||(!o.length&&e.length===1&&e[0]===""?n="<!---->":n=e.reduce(function(m,g,x){return m+=g,o[x]!==void 0?i(o[x],m):m},"")),n),r=d=>{const m=H(c()),g=M(m,{i:0,e:s});return d?g(d):g()};return r.isT=!0,r._k=0,r._h=()=>[c(),s,r._k],r.key=d=>(r._k=d,r),r}function M(e,o){const s=document.createDocumentFragment();let n;for(;n=e.item(0);){if(n.nodeType===8&&n.nodeValue===W){s.append(se(n,o));continue}n instanceof Element&&te(n,o),n.hasChildNodes()&&M(n.childNodes,o)(n),s.append(n),n instanceof HTMLOptionElement&&(n.selected=n.defaultSelected)}return i=>i?(i.appendChild(s),i):s}function te(e,o){var s;const n=[];let i=0,c;for(;c=e.attributes[i++];){if(o.i>=o.e.length)return;if(c.value!==B)continue;let r=c.name;const d=o.e[o.i++];if(r.charAt(0)==="@"){const m=r.substring(1);e.addEventListener(m,d),A.has(e)||A.set(e,new Map),(s=A.get(e))===null||s===void 0||s.set(m,d),n.push(r)}else{const m=r==="value"&&"value"in e||r==="checked"||r.startsWith(".")&&(r=r.substring(1));L(d,g=>{m&&(e[r]=g,e.getAttribute(r)!=g&&(g=!1)),g!==!1?e.setAttribute(r,g):(e.removeAttribute(r),i--)})}}n.forEach(r=>e.removeAttribute(r))}function ne(e){e.forEach(oe)}function oe(e){var o;e.remove(),(o=A.get(e))===null||o===void 0||o.forEach((s,n)=>e.removeEventListener(n,s))}function se(e,o){const s=document.createDocumentFragment();e.remove();const n=o.e[o.i++];if(n&&R(n.e))s.appendChild(N().add(n.e)());else{let i;s.appendChild((i=L(n,c=>re(c,i)))())}return s}function re(e,o){const s=typeof o=="function",n=s?o:N();return Array.isArray(e)?e.forEach(i=>n.add(i)):n.add(e),s&&n._up(),n}function H(e){var o;const n=((o=D[e])!==null&&o!==void 0?o:(()=>{const i=document.createElement("template");return i.innerHTML=e,D[e]=i})()).content.cloneNode(!0);return n.normalize(),n.childNodes}function N(e=Symbol()){let o="",s={i:0,e:[]},n=[],i=[];const c=new Map,r=[],d=()=>{let p;if(n.length||g(),n.length===1&&!R(n[0].tpl)){const u=n[0];u.dom.length?u.dom[0].nodeValue=u.tpl:u.dom.push(document.createTextNode(u.tpl)),p=u.dom[0]}else p=x(M(H(o),s)());return m(),p};d.ch=()=>i,d.l=0,d.add=p=>{if(!p&&p!==0)return d;let u=[],l,a="";R(p)&&([a,u,l]=p._h()),o+=a,o+=ee;const h=l&&c.get(l),f=h||{html:a,exp:u,dom:[],tpl:p,key:l};return n.push(f),l&&(h?h.exp.forEach((w,y)=>w._up(u[y].e)):c.set(l,f)),s.e.push(...u),d.l++,d},d._up=()=>{const p=N(e);let u=0,l=i[0].dom[0];n.length||g(document.createComment(""));const a=()=>{if(!p.l)return;const f=p(),w=f.lastChild;l[u?"after":"before"](f),v(p,n,u),l=w};n.forEach((f,w)=>{const y=i[w];f.key&&f.dom.length?(a(),(!y||y.dom!==f.dom)&&l[w?"after":"before"](...f.dom),l=f.dom[f.dom.length-1]):y&&f.html===y.html&&!y.key?(a(),y.exp.forEach((V,$)=>V._up(f.exp[$].e)),f.exp=y.exp,f.dom=y.dom,l=f.dom[f.dom.length-1],ie(f)&&l instanceof Text&&(l.nodeValue=f.tpl)):(y&&f.html!==y.html&&!y.key&&r.push(...y.dom),p.l||(u=w),p.add(f.tpl))}),a();let h=l==null?void 0:l.nextSibling;for(;h&&e in h;)r.push(h),h=h.nextSibling;ne(r),m()};const m=()=>{r.length=0,o="",d.l=0,s={i:0,e:[]},i=[...n],n=[]},g=p=>{o="<!---->",n.push({html:o,exp:[],dom:p?[p]:[],tpl:z`${o}`,key:0})},x=p=>{let u=0;const l=[];return p.childNodes.forEach(a=>{if(a.nodeType===8&&a.data===q){u++,l.push(a);return}Object.defineProperty(a,e,{value:e}),n[u].dom.push(a)}),l.forEach(a=>a.remove()),p},v=(p,u,l)=>{p.ch().forEach((a,h)=>{u[l+h].dom=a.dom})};return d}function ie(e){return e.dom.length===1&&!R(e.tpl)}const le="/fifteen-puzzle/assets/github-bb39f6ee.svg",ce="/fifteen-puzzle/assets/solved-36c33ae6.opus";/**
 * @license AGPL-3.0-only
 * Fifteen Puzzle - A 15 Puzzle Game
 * Copyright (C) 2023-2024 Eldar Pashazade <eldarlrd@pm.me>
 *
 * This file is part of Fifteen Puzzle.
 *
 * Fifteen Puzzle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * Fifteen Puzzle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Fifteen Puzzle. If not, see <https://www.gnu.org/licenses/>.
 */const ae=()=>{"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/fifteen-puzzle/sw.js",{scope:"/fifteen-puzzle/"})})},t=E({orderedIndex:[],elementValue:[],matchingValue:[],elementTiles:[],isEvenRow:!1,show:!1,volume:!1,ticking:!1,startTime:0,endTime:0,timeElapsed:0,inversions:0,minutes:0,seconds:0,moves:0}),de=()=>{for(let e=1;e<=16;e++)t.orderedIndex.push(e),t.elementValue.push(e);k()},k=()=>{for(let e=15;e>0;e--){const o=~~(Math.random()*(e+1)),s=t.elementValue[e];t.elementValue[e]=t.elementValue[o],t.elementValue[o]=s}t.startTime=0,t.endTime=0,t.timeElapsed=0,t.moves=0,fe()},fe=()=>{t.inversions=0;for(let e=0;e<15;e++)for(let o=e+1;o<16;o++)t.elementValue[e]>t.elementValue[o]&&t.elementValue[e]!==16&&t.elementValue[o]!==16&&t.inversions++;t.isEvenRow=~~(t.elementValue.indexOf(16)/4)%2===0,t.isEvenRow&&t.inversions%2!==0||!t.isEvenRow&&t.inversions%2===0?K():k()},K=()=>{t.elementTiles.length=0,t.elementValue.forEach(e=>{t.elementTiles.push(z`
      <div
        id=${e}
        class='${e===16?"invisible":""} flex cursor-pointer select-none items-center justify-center rounded bg-cyan-400 text-4xl font-bold text-white drop-shadow-sm transition-transform hover:scale-95 sm:text-5xl md:text-6xl'
        @click='${()=>{S(e)}}'>
        ${e}
      </div>
    `.key(e))}),U(),G()},S=e=>{const o=t.elementValue.indexOf(e),s=t.elementValue.indexOf(16);let n=s-1,i=s+1;if(o<0||o>15||([12,8,4].includes(s)&&(n=-1),[11,7,3].includes(s)&&(i=-1),![s-4,s+4,n,i].includes(o)))return;const c=E([...t.elementValue].map(r=>t.elementValue.indexOf(+r)!==s&&t.elementValue.indexOf(+r)!==o?+r:r===16?e:16));t.elementValue=c,t.moves++,K()},ue=e=>{switch(["ArrowUp","ArrowLeft","ArrowRight","ArrowDown","KeyR"].includes(e.code)&&e.preventDefault(),e.code){case"ArrowUp":S(+t.elementValue[t.elementValue.indexOf(16)+4]);break;case"ArrowLeft":S(+t.elementValue[t.elementValue.indexOf(16)+1]);break;case"ArrowRight":S(+t.elementValue[t.elementValue.indexOf(16)-1]);break;case"ArrowDown":S(+t.elementValue[t.elementValue.indexOf(16)-4]);break;case"KeyR":k()}},me=()=>{t.startTime===0&&(t.ticking=!0,t.startTime=performance.now()),pe()},pe=()=>{t.startTime>0&&t.ticking&&(t.endTime=performance.now(),t.timeElapsed=t.endTime-t.startTime,t.timeElapsed/=1e3,t.minutes=~~(t.timeElapsed/60),t.seconds=~~(t.timeElapsed-t.minutes*60))},U=()=>{t.matchingValue.length=0,t.elementValue.forEach((e,o)=>{e===t.orderedIndex[o]&&t.matchingValue.push(e),t.matchingValue.splice(t.matchingValue.indexOf(e))}),me(),he()},he=()=>{t.elementValue.forEach(e=>{var o,s;t.matchingValue.includes(e)?(o=document.getElementById(e.toString()))==null||o.classList.add("bg-emerald-400"):(s=document.getElementById(e.toString()))==null||s.classList.remove("bg-emerald-400")})},G=()=>{const e=document.getElementById("modal"),o=new Audio(ce);t.show=t.elementValue.every((s,n)=>s===t.orderedIndex[n]),t.show?(t.volume&&o.play(),t.volume=!0,t.ticking=!1,e==null||e.classList.remove("hidden")):e==null||e.classList.add("hidden")},ge=z`
  <header>
    <h1 class='m-6 select-none text-center text-4xl font-bold text-white drop-shadow-xl sm:text-5xl md:text-6xl'>
      Fifteen Puzzle
    </h1>
  </header>

  <main class='flex flex-col items-center justify-center gap-4'>
    <span class='flex w-80 items-center justify-between text-white sm:w-96 md:w-[32em]'>
      <button
        class='rounded select-none bg-cyan-600 px-6 py-4 font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:text-lg'
        @click='${()=>{k()}}'>
        Shuffle
      </button>
      <figure aria-label='tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 drop-shadow-md md:text-lg'>
        <time class='text-end font-bold'>
          <figcaption>Time</figcaption>
          <p class='w-20 min-w-max'>
            ${()=>`${t.minutes===0?"":t.minutes.toString()+"m"} ${t.seconds.toString()}s`}
          </p>
        </time>
        <time class='text-end font-bold'>
          <figcaption>Moves</figcaption>
          <p>${()=>t.moves}</p>
        </time>
      </figure>
    </span>

    <section class='grid h-80 w-80 grid-cols-4 grid-rows-4 gap-1 rounded bg-cyan-600 p-1 shadow-inner drop-shadow-md sm:h-96 sm:w-96 md:h-[32em] md:w-[32em]'>
      ${()=>t.elementTiles}
    </section>
  </main>

  <div id='modal' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
    <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 rounded-md bg-sky-400 drop-shadow-2xl md:h-80 md:w-96'>
      <p class='select-none text-3xl text-white md:text-4xl'>
        Puzzle Solved
      </p>
      <span class='flex flex-col-reverse items-center justify-center gap-6 text-white'>
        <button
          class='rounded select-none bg-cyan-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:py-5 md:text-xl'
          @click='${()=>{k()}}'>
          Shuffle
        </button>
        <figure aria-label='modal-tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 text-lg drop-shadow-md md:py-2 md:text-xl'>
          <time class='text-end font-bold'>
            <figcaption>Time</figcaption>
            <p class='w-20 min-w-max'>
              ${()=>`${t.minutes===0?"":t.minutes.toString()+"m"} ${t.seconds.toString()}s`}
            </p>
          </time>
          <time class='text-end font-bold'>
            <figcaption>Moves</figcaption>
            <p>${()=>t.moves}</p>
          </time>
        </figure>
      </span>
    </section>
  </div>

  <footer>
    <p class='m-6 flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'>
    © 2023 - 2024 <a
           class='flex items-center rounded justify-center gap-1 text-center transition-transform hover:scale-110'
           title='Source'
           target='_blank'
           type='text/html'
           rel='author external noreferrer'
           href='https://github.com/eldarlrd/fifteen-puzzle'>
           <img
             class='h-6 w-6'
             alt='GitHub Logo'
             src=${le}
           > eldarlrd
         </a>
    </p>
  </footer>
`;L(U);L(G);de();ae();document.addEventListener("keydown",e=>{ue(e)});const F=document.getElementById("app");F!==null&&ge(F);console.log("Now impossible to get the 14-15 one!");
