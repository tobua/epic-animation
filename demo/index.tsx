import { Animation, animate } from 'epic-animation'
import { render, useEffect, useRef } from 'epic-jsx'

function App() {
  const box = useRef()

  useEffect(() => {
    animate(box.current, Animation.Circle)
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>epic-animation</h1>
      <div style={{ background: 'lightgray', position: 'relative', display: 'flex', height: 300 }}>
        <div ref={box} style={{ display: 'flex', background: 'red', borderRadius: 10, padding: 20, position: 'absolute' }}>
          Circle
        </div>
      </div>
    </div>
  )
}

render(<App />)
