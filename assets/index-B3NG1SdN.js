(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const b="/fifteen-puzzle/assets/solved-CX2STtVs.opus";class y{audio;constructor(){this.audio=new Audio(b)}playSuccess(){this.audio.currentTime=0,this.audio.play()}}const a=4,l=16,c=l;class w{animationId=null;state;updateCallback;constructor(e,t){this.state=e,this.updateCallback=t}start(){this.state.startTime===0&&(this.state.ticking=!0,this.state.startTime=performance.now(),this.update())}stop(){this.state.ticking=!1,this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null)}update=()=>{this.state.ticking&&(this.state.endTime=performance.now(),this.state.timeElapsed=(this.state.endTime-this.state.startTime)/1e3,this.state.minutes=~~(this.state.timeElapsed/60),this.state.seconds=~~(this.state.timeElapsed-this.state.minutes*60),this.updateCallback(),this.animationId=requestAnimationFrame(this.update))}}const h=(i,e)=>{const t=i.toString().padStart(2,"0"),s=e.toString().padStart(2,"0");return`${t}:${s}`},v=i=>{const e=[...i];for(let t=e.length-1;t>0;t--){const s=~~(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e},E=i=>{let e=0;for(let n=0;n<c-1;n++)for(let o=n+1;o<c;o++)i[n]!==l&&i[o]!==l&&i[n]>i[o]&&e++;const t=~~(i.indexOf(l)/a);return(a-t)%2===0?e%2===1:e%2===0},I=i=>{const e=~~(i/a),t=i%a,s=[];return e>0&&s.push(i-a),t<a-1&&s.push(i+1),e<a-1&&s.push(i+a),t>0&&s.push(i-1),s},S=()=>{let i;do i=v(Array.from({length:c},(e,t)=>t+1));while(!E(i));return i};class k{state;timer;audioManager;renderCallback;constructor(e){this.state={orderedIndex:[],elementValue:[],show:!1,ticking:!1,startTime:0,endTime:0,timeElapsed:0,minutes:0,seconds:0,moves:0},this.renderCallback=e,this.timer=new w(this.state,this.renderCallback),this.audioManager=new y}initialize(){this.state.orderedIndex=Array.from({length:c},(e,t)=>t+1),this.reset()}reset(){this.state.elementValue=S(),this.state.startTime=0,this.state.endTime=0,this.state.timeElapsed=0,this.state.moves=0,this.state.minutes=0,this.state.seconds=0,this.timer.stop(),this.renderCallback()}moveTile(e){const t=this.state.elementValue.indexOf(e),s=this.state.elementValue.indexOf(l);I(s).includes(t)&&([this.state.elementValue[t],this.state.elementValue[s]]=[this.state.elementValue[s],this.state.elementValue[t]],this.state.moves++,this.timer.start(),this.renderCallback(),this.checkWin())}isSolved(){return this.state.elementValue.every((e,t)=>e===this.state.orderedIndex[t])}handleKeyPress(e){const t={ArrowUp:a,ArrowDown:-a,ArrowLeft:1,ArrowRight:-1};if((e.code in t||e.code==="KeyR")&&e.preventDefault(),e.code==="KeyR"){this.reset();return}const s=t[e.code];if(s){const n=this.state.elementValue.indexOf(l),o=n+s;if(o>=0&&o<c){const r=~~(n/a),d=~~(o/a);if(Math.abs(s)===1&&r!==d)return;this.moveTile(this.state.elementValue[o])}}}checkWin(){this.isSolved()?(this.state.show=!0,this.timer.stop(),this.audioManager.playSuccess(),this.renderCallback()):this.state.show=!1}}const T=({minutes:i,seconds:e,moves:t})=>`
  <header>
    <h1 class='m-6 select-none text-center text-4xl font-bold text-white drop-shadow-xl sm:text-5xl md:text-6xl font-righteous'>
      Fifteen Puzzle
    </h1>
  </header>

  <main class='flex flex-col items-center justify-center gap-4'>
    <div class='flex flex-wrap gap-1.5 w-80 items-center justify-end sm:justify-between text-white sm:w-96 md:w-[32em]'>
      <figure aria-label='tracker' class='flex select-none gap-6 rounded bg-tile-600 px-3.5 py-1 drop-shadow-md md:text-lg font-righteous'>
        <time class='text-center font-bold'>
          <figcaption>Time</figcaption>
          <p class='w-12 tabular-nums'>${h(i,e)}</p>
        </time>
        <time class='text-center font-bold'>
          <figcaption>Moves</figcaption>
          <p>${t.toString()}</p>
        </time>
      </figure>

      <div class='flex gap-1.5'>
        <button id='theme-btn' title='Theme' class='rounded cursor-pointer select-none bg-tile-600 py-4 min-w-14 font-bold drop-shadow-md transition-colors hover:bg-tile-700 font-righteous'>
          <i class='fa-solid fa-palette fa-fw fa-xl'></i>
        </button>
        <button id='controls-btn' title='Controls' class='rounded cursor-pointer select-none bg-tile-600 py-4 min-w-14 font-bold drop-shadow-md transition-colors hover:bg-tile-700 font-righteous'>
          <i class='fa-solid fa-circle-info fa-fw fa-xl'></i>
        </button>
        <button id='shuffle-btn' class='rounded cursor-pointer select-none bg-tile-600 px-6 py-4 font-bold drop-shadow-md transition-colors hover:bg-tile-700 md:text-lg font-righteous'>
          Shuffle
        </button>
      </div>
    </div>

    <section class='grid h-80 w-80 grid-cols-4 grid-rows-4 gap-1 rounded bg-tile-600 p-1 shadow-inner drop-shadow-md sm:h-96 sm:w-96 md:h-[32em] md:w-[32em]'>
    </section>
  </main>
  
  <div id='controls' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
    <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 select-none text-white rounded-md bg-surface-400 drop-shadow-2xl md:h-80 md:w-96'>
      <p class='select-none text-3xl text-white md:text-4xl font-righteous'>
        Controls
      </p>
      <div class='grid grid-cols-[auto_auto_auto] items-center gap-4'>
        <div>
          <i class='fa-solid fa-computer-mouse fa-fw fa-xl'></i>
          <i class='fa-solid fa-keyboard fa-fw fa-xl'></i>
          <i class='fa-solid fa-hand-pointer fa-fw fa-xl'></i>
        </div>
        <span class='font-bold'>⸺</span>
        <span class='text-2xl'>Move</span>
      
        <i class='fa-solid fa-registered fa-fw fa-xl justify-self-end'></i>
        <span class='font-bold'>⸺</span>
        <span class='text-2xl'>Shuffle</span>
      </div>

      <button id='controls-back-btn' class='rounded cursor-pointer select-none bg-tile-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-tile-700 md:py-5 md:text-xl font-righteous'>
        Back
      </button>
    </section>
  </div>

  <div id='modal' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
    <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 rounded-md bg-surface-400 drop-shadow-2xl md:h-80 md:w-96'>
      <p class='select-none text-3xl text-white md:text-4xl font-righteous'>
        Solved!
      </p>
      <div class='flex flex-col items-center justify-center gap-6 text-white'>
        <figure aria-label='modal-tracker' class='flex select-none gap-6 rounded bg-tile-600 px-3.5 py-1 text-lg drop-shadow-md md:py-2 md:text-xl font-righteous'>
          <time class='text-center font-bold'>
            <figcaption>Time</figcaption>
            <p class='w-12 tabular-nums'>${h(i,e)}</p>
          </time>
          <time class='text-center font-bold'>
            <figcaption>Moves</figcaption>
            <p>${t.toString()}</p>
          </time>
        </figure>
        <button id='modal-shuffle-btn' class='rounded cursor-pointer select-none bg-tile-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-tile-700 md:py-5 md:text-xl font-righteous'>
          Shuffle
        </button>
      </div>
    </section>
  </div>

  <footer>
    <p class='m-6 flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl font-righteous'>
      © 2023 - 2025
      <a class='flex items-center rounded justify-center gap-1 text-center transition-transform hover:scale-110' 
         title='Source' target='_blank' rel='author external noreferrer' 
         href='https://github.com/eldarlrd/fifteen-puzzle'>
         <i class='fa-brands fa-github fa-fw'></i> eldarlrd
      </a>
    </p>
  </footer>
`;class L{game;prevElementValue=[];constructor(e){this.game=e}createTile(e){const t=document.createElement("div"),s=e===l,n=e===this.game.state.orderedIndex[this.game.state.elementValue.indexOf(e)];return t.id=e.toString(),t.className=`
      flex cursor-pointer select-none items-center justify-center rounded 
      text-4xl font-bold text-white drop-shadow-sm transition-all duration-200
      hover:scale-95 sm:text-5xl md:text-6xl font-righteous
      ${s?"invisible":""}
      ${n?"bg-correct-400":"bg-tile-400"}
    `.trim().replace(/\s+/g," "),t.textContent=s?"":e.toString(),s||t.addEventListener("click",()=>{this.slideIfInLine(e)||this.game.moveTile(e)}),t}slideIfInLine(e){const t=this.game.state.elementValue,s=Math.sqrt(t.length)|0,n=t.indexOf(e),o=t.indexOf(l);if(n<0||o<0)return!1;const r=~~(n/s)===~~(o/s),d=n%s===o%s;if(!r&&!d)return!1;const p=r?n<o?-1:1:n<o?-s:s,g=this.game.state.moves;let m=!1;for(;this.game.state.elementValue.indexOf(l)!==n;){const f=this.game.state.elementValue,u=f.indexOf(l)+p;if(u<0||u>=f.length)return!1;const x=f[u];this.game.moveTile(x),m=!0}return m&&(this.game.state.moves=g+1,this.updateDisplay()),m}render(){const e=document.getElementById("app");e&&(e.innerHTML=T({minutes:this.game.state.minutes,seconds:this.game.state.seconds,moves:this.game.state.moves}),this.initTheme(),window.addEventListener("keydown",this.preventInteraction,!0),document.getElementById("shuffle-btn")?.addEventListener("click",()=>{this.game.reset()}),document.getElementById("modal-shuffle-btn")?.addEventListener("click",()=>{this.game.state.show=!1,this.updateDisplay(),this.game.reset()}),document.getElementById("theme-btn")?.addEventListener("click",()=>{const t=document.documentElement,s=t.getAttribute("data-theme")==="alt"?"base":"alt";s==="alt"?t.setAttribute("data-theme","alt"):t.removeAttribute("data-theme"),localStorage.setItem("theme",s)}),document.getElementById("controls-btn")?.addEventListener("click",()=>{this.openControls()}),document.getElementById("controls-back-btn")?.addEventListener("click",()=>{this.closeControls()}),this.update())}update(){this.renderGrid(),this.updateDisplay()}arraysEqual(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let s=0;s<e.length;s++)if(e[s]!==t[s])return!1;return!0}renderGrid(){const e=document.querySelector(".grid");if(!e)return;const t=this.game.state.elementValue;if(this.arraysEqual(this.prevElementValue,t))return;const s=document.createDocumentFragment();this.game.state.elementValue.forEach(n=>{s.appendChild(this.createTile(n))}),e.innerHTML="",e.appendChild(s),this.prevElementValue=[...t]}updateDisplay(){const e=h(this.game.state.minutes,this.game.state.seconds),t=this.game.state.moves.toString(),s=document.querySelector('figure[aria-label="tracker"] time:first-child p'),n=document.querySelector('figure[aria-label="tracker"] time:last-child p');s&&(s.textContent=e),n&&(n.textContent=t);const o=document.querySelector('figure[aria-label="modal-tracker"] time:first-child p'),r=document.querySelector('figure[aria-label="modal-tracker"] time:last-child p');o&&(o.textContent=e),r&&(r.textContent=t);const d=document.getElementById("modal");d&&(this.game.state.show?d.classList.remove("hidden"):d.classList.add("hidden"))}isControlsOpen(){const e=document.getElementById("controls");return!!e&&!e.classList.contains("hidden")}isSolvedOpen(){const e=document.getElementById("modal");return!!e&&!e.classList.contains("hidden")}preventInteraction=e=>{(this.isControlsOpen()||this.isSolvedOpen())&&(e.preventDefault(),e.stopImmediatePropagation())};openControls(){const e=document.getElementById("controls");e&&e.classList.remove("hidden")}closeControls(){const e=document.getElementById("controls");e&&e.classList.add("hidden")}initTheme(){const e=document.documentElement;localStorage.getItem("theme")==="alt"?e.setAttribute("data-theme","alt"):e.removeAttribute("data-theme")}}/**
 * @license AGPL-3.0-only
 * Fifteen Puzzle - A 15 Puzzle Game
 * Copyright (C) 2023-2025 Eldar Pashazade <eldarlrd@pm.me>
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
 */const C=()=>{"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/fifteen-puzzle/sw.js",{scope:"/fifteen-puzzle/"}).catch(i=>{i instanceof Error&&console.error(i)})})},O=()=>{const i=new k(()=>{e.update()}),e=new L(i);e.render(),i.initialize(),C(),document.addEventListener("keydown",t=>{i.handleKeyPress(t)})};document.addEventListener("DOMContentLoaded",O);console.log("🤓 Now impossible to get the 14-15 one!");
