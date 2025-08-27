(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const u="/fifteen-puzzle/assets/solved-CX2STtVs.opus";/**
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
 */const p=()=>{"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/fifteen-puzzle/sw.js",{scope:"/fifteen-puzzle/"})})},e={orderedIndex:[],elementValue:[],isEvenRow:!1,show:!1,volume:!1,ticking:!1,startTime:0,endTime:0,timeElapsed:0,inversions:0,minutes:0,seconds:0,moves:0},g=()=>{e.orderedIndex=[],e.elementValue=[];for(let t=1;t<=16;t++)e.orderedIndex.push(t),e.elementValue.push(t);a()},a=()=>{for(let t=e.elementValue.length-1;t>0;t--){const n=~~(Math.random()*(t+1));[e.elementValue[t],e.elementValue[n]]=[e.elementValue[n],e.elementValue[t]]}e.startTime=0,e.endTime=0,e.timeElapsed=0,e.moves=0,x()},x=()=>{e.inversions=0;for(let t=0;t<15;t++)for(let n=t+1;n<16;n++)e.elementValue[t]!==16&&e.elementValue[n]!==16&&e.elementValue[t]>e.elementValue[n]&&e.inversions++;e.isEvenRow=~~(e.elementValue.indexOf(16)/4)%2===0,e.isEvenRow&&e.inversions%2!==0||!e.isEvenRow&&e.inversions%2===0?m():a()},m=()=>{const t=document.querySelector("section.grid");t&&(t.innerHTML="",e.elementValue.forEach(n=>{const o=document.createElement("div");o.id=n.toString(),o.className=`flex cursor-pointer select-none items-center justify-center rounded bg-cyan-400 text-4xl font-bold text-white drop-shadow-sm transition-transform hover:scale-95 sm:text-5xl md:text-6xl ${n===16?"invisible":""}`,o.textContent=n.toString(),o.addEventListener("click",()=>{l(n)}),t.appendChild(o)}),v(),b())},l=t=>{const n=e.elementValue.indexOf(t),o=e.elementValue.indexOf(16);if(![o-1,o+1,o-4,o+4].includes(n)||o%4===0&&n===o-1||(o+1)%4===0&&n===o+1)return;const i=[...e.elementValue];[i[n],i[o]]=[i[o],i[n]],e.elementValue=i,e.moves++,m(),c()},h=t=>{["ArrowUp","ArrowLeft","ArrowRight","ArrowDown","KeyR"].includes(t.code)&&t.preventDefault();const n=e.elementValue.indexOf(16);switch(t.code){case"ArrowUp":n+4<16&&l(e.elementValue[n+4]);break;case"ArrowLeft":(n+1)%4!==0&&l(e.elementValue[n+1]);break;case"ArrowRight":n%4!==0&&l(e.elementValue[n-1]);break;case"ArrowDown":n-4>=0&&l(e.elementValue[n-4]);break;case"KeyR":a()}},f=()=>{e.ticking&&(e.endTime=performance.now(),e.timeElapsed=(e.endTime-e.startTime)/1e3,e.minutes=~~(e.timeElapsed/60),e.seconds=~~(e.timeElapsed-e.minutes*60),c(),requestAnimationFrame(f))},w=()=>{e.startTime===0&&(e.ticking=!0,e.startTime=performance.now(),requestAnimationFrame(f))},y=()=>{e.ticking=!1},v=()=>{e.elementValue.forEach((t,n)=>{const o=document.getElementById(t.toString());o&&(t===e.orderedIndex[n]?(o.classList.add("bg-emerald-400"),o.classList.remove("bg-cyan-400")):(o.classList.remove("bg-emerald-400"),o.classList.add("bg-cyan-400")))}),w()},b=()=>{const t=document.getElementById("modal"),n=new Audio(u);e.show=e.elementValue.every((o,i)=>o===e.orderedIndex[i]),e.show?(e.volume&&n.play(),e.volume=!0,y(),t?.classList.remove("hidden"),c()):t?.classList.add("hidden")},c=()=>{const t=document.querySelector('figure[aria-label="tracker"] p'),n=document.querySelector('figure[aria-label="tracker"] time:nth-of-type(2) p'),o=document.querySelector('figure[aria-label="modal-tracker"] p'),i=document.querySelector('figure[aria-label="modal-tracker"] time:nth-of-type(2) p'),s=`${e.minutes===0?"":e.minutes.toString()+"m "}${e.seconds.toString()}s`;t&&(t.textContent=s),n&&(n.textContent=e.moves.toString()),o&&(o.textContent=s),i&&(i.textContent=e.moves.toString())},S=()=>{const t=document.getElementById("app");t&&(t.innerHTML=`
    <header>
      <h1 class='m-6 select-none text-center text-4xl font-bold text-white drop-shadow-xl sm:text-5xl md:text-6xl'>
        Fifteen Puzzle
      </h1>
    </header>

    <main class='flex flex-col items-center justify-center gap-4'>
      <span class='flex w-80 items-center justify-between text-white sm:w-96 md:w-[32em]'>
        <button id='shuffle-btn' class='rounded select-none bg-cyan-600 px-6 py-4 font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:text-lg'>
          Shuffle
        </button>
        <figure aria-label='tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 drop-shadow-md md:text-lg'>
          <time class='text-end font-bold'>
            <figcaption>Time</figcaption>
            <p class='w-20 min-w-max'>
              ${e.minutes===0?"":e.minutes.toString()+"m "}${e.seconds.toString()}s
            </p>
          </time>
          <time class='text-end font-bold'>
            <figcaption>Moves</figcaption>
            <p>${e.moves.toString()}</p>
          </time>
        </figure>
      </span>

      <section class='grid h-80 w-80 grid-cols-4 grid-rows-4 gap-1 rounded bg-cyan-600 p-1 shadow-inner drop-shadow-md sm:h-96 sm:w-96 md:h-[32em] md:w-[32em]'>
        </section>
    </main>

    <div id='modal' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
      <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 rounded-md bg-sky-400 drop-shadow-2xl md:h-80 md:w-96'>
        <p class='select-none text-3xl text-white md:text-4xl'>
          Puzzle Solved
        </p>
        <span class='flex flex-col-reverse items-center justify-center gap-6 text-white'>
          <button id='modal-shuffle-btn' class='rounded select-none bg-cyan-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:py-5 md:text-xl'>
            Shuffle
          </button>
          <figure aria-label='modal-tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 text-lg drop-shadow-md md:py-2 md:text-xl'>
            <time class='text-end font-bold'>
              <figcaption>Time</figcaption>
              <p class='w-20 min-w-max'>
                ${e.minutes===0?"":e.minutes.toString()+"m "}${e.seconds.toString()}s
              </p>
            </time>
            <time class='text-end font-bold'>
              <figcaption>Moves</figcaption>
              <p>${e.moves.toString()}</p>
            </time>
          </figure>
        </span>
      </section>
    </div>

    <footer>
      <p class='m-6 flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'>
        © 2023 - 2025
        <a class='flex items-center rounded justify-center gap-1 text-center transition-transform hover:scale-110' title='Source' target='_blank' type='text/html' rel='author external noreferrer' href='https://github.com/eldarlrd/fifteen-puzzle'>
          eldarlrd
        </a>
      </p>
    </footer>
  `,document.getElementById("shuffle-btn")?.addEventListener("click",()=>{a()}),document.getElementById("modal-shuffle-btn")?.addEventListener("click",()=>{a()}))};document.addEventListener("DOMContentLoaded",()=>{S(),g(),p(),document.addEventListener("keydown",h)});console.log("Now impossible to get the 14-15 one!");
