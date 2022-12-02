import '../css/style.css'
import javascriptLogo from '../img/javascript.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div class="bg-blue-100 p-10">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button" class="hocus:bg-green-200"></button>
    </div>
    <p class="read-the-docs">
      Click on the <span class="text-3xl font-bold underline">Vite logo</span> to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
