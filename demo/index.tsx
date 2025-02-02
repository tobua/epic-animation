import { Animation, animate } from 'epic-animation'
import { render, useEffect, useRef } from 'epic-jsx'

function App() {
  const box = useRef<HTMLDivElement>()
  const selectElements = useRef<HTMLDivElement>()

  useEffect(() => {
    animate(box.current, Animation.circle)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 40, fontFamily: 'sans-serif' }}>
      <h1 style={{ margin: 0 }}>epic-animation</h1>
      <div style={{ background: 'lightgray', position: 'relative', display: 'flex', height: 300 }}>
        <div ref={box} style={{ display: 'flex', background: 'red', borderRadius: 10, padding: 20, position: 'absolute' }}>
          Circle
        </div>
      </div>
      <div style={{ display: 'flex', position: 'relative', width: 200 }}>
        <button
          type="button"
          onClick={() =>
            Number.parseFloat(selectElements.current.style.opacity) < 0.5
              ? animate(selectElements.current, Animation.show)
              : animate(selectElements.current, Animation.hide)
          }
          style={{ display: 'flex', flex: 1, background: 'gray', border: 'none', padding: 10, cursor: 'pointer' }}
        >
          Value
        </button>
        <div
          ref={selectElements}
          style={{
            opacity: 0,
            display: 'flex',
            width: '100%',
            boxSizing: 'border-box',
            flexDirection: 'column',
            gap: 5,
            padding: 10,
            background: 'lightgray',
            position: 'absolute',
            top: '100%',
          }}
        >
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
        </div>
      </div>
    </div>
  )
}

render(<App />)
