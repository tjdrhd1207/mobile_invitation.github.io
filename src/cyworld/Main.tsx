import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './cyworld.css'
import CyworldApp from './CyworldApp'

// 글씨체가 바뀌며 깜빡이는 것을 막기 위해, 주요 폰트가 준비되면 화면을 보여준다.
// 폰트가 느려도 최대 2.5초 뒤에는 무조건 보여준다.
const FONT_TIMEOUT = 2500;
const showPage = () => document.documentElement.classList.add('fonts-ready');

Promise.race([
  Promise.all([
    document.fonts.load('16px WeddingFont'),
    document.fonts.load('16px WeddingFontBolder'),
  ]),
  new Promise(resolve => setTimeout(resolve, FONT_TIMEOUT)),
])
  .catch(() => undefined)
  .then(showPage)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CyworldApp />
  </StrictMode>
)
