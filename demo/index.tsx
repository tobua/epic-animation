import { Animation, animate, status } from 'epic-animation'
import { render, useEffect, useRef, useState } from 'epic-jsx'

function App() {
  const [added, add] = useState(0)
  const box = useRef<HTMLDivElement>()
  const selectElements = useRef<HTMLDivElement>()

  useEffect(() => {
    if (added === 0) {
      animate(box.current, Animation.circle)
      setInterval(() => {
        document.getElementById('fps').innerText = `FPS: ${status.fps}`
      }, 300)
    } else {
      animate(document.getElementById(`box_${added}`), Animation.blink)
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 40,
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ margin: 0 }}>epic-animation</h1>
      <p id="fps">FPS: {status.fps}</p>
      <div
        style={{
          background: 'lightgray',
          position: 'relative',
          display: 'flex',
          height: 300,
        }}
      >
        <div
          ref={box}
          style={{
            display: 'flex',
            background: 'red',
            borderRadius: 10,
            padding: 20,
            position: 'absolute',
          }}
        >
          Circle
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          alignSelf: 'flex-end',
          width: 200,
        }}
      >
        <button
          type="button"
          onClick={() =>
            Number.parseFloat(selectElements.current.style.opacity) < 0.5
              ? animate(selectElements.current, Animation.show)
              : animate(selectElements.current, Animation.hide)
          }
          style={{
            display: 'flex',
            flex: 1,
            background: 'gray',
            border: 'none',
            padding: 10,
            cursor: 'pointer',
          }}
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
      <div style={{ display: 'flex', gap: 40 }}>
        <button
          type="button"
          onClick={() => add(added + 1)}
          style={{
            display: 'flex',
            border: 'none',
            background: 'black',
            color: 'white',
            cursor: 'pointer',
            padding: 20,
            height: '100%',
            whiteSpace: 'nowrap',
          }}
        >
          Add Blinking Box
        </button>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {Array.from({ length: added }).map((_, index) => (
            <div id={`box_${index + 1}`} style={{ background: 'skyblue', color: 'white', padding: 20 }}>
              Box {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

render(<App />)
