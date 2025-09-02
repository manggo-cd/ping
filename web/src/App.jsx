import { useState } from 'react'

function PingPanel() {
  const [pingResult, setPingResult] = useState(null) // initial value

  const doPing = async () => {
    const res = await fetch('/api/ping')
    if (!res.ok) throw new Error(`Ping failed: ${res.status}`)
    const json = await res.json()
    setPingResult(json) // updates state -> triggers re-render
  }

  return (
    <div>
      <h2>Ping</h2>
      <button onClick={doPing}>Ping server</button>
      {pingResult && <pre>{JSON.stringify(pingResult, null, 2)}</pre>}
    </div>
  )
}

function EchoPanel() {
  const [msg, setMsg] = useState('')
  const [echoResult, setEchoResult] = useState(null)
  const [error, setError] = useState('')

  const doEcho = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
      if (!res.ok) throw new Error(`Echo failed: ${res.status}`)
      const json = await res.json()
      setEchoResult(json)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <h2>Echo</h2>
      <form onSubmit={doEcho}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message"
          style={{ padding: 8, width: '70%' }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>Send</button>
      </form>

      {echoResult && <pre>{JSON.stringify(echoResult, null, 2)}</pre>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </div>
  )
}

export default function App() {
  const [showPing, setShowPing] = useState(true)

  return (
    <div style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <button onClick={() => setShowPing(s => !s)}>
        {showPing ? 'Hide PingPanel (unmount)' : 'Show PingPanel (remount)'}
      </button>

      <hr />

      {showPing && <PingPanel />}

      <hr />

      <EchoPanel />
    </div>
  )
}
