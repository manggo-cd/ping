import { useState } from 'react'

export default function App() {
  const [pingResult, setPingResult] = useState(null)
  const [msg, setMsg] = useState('')
  const [echoResult, setEchoResult] = useState(null)
  const [error, setError] = useState('')

  const doPing = async () => {
    setError('')
    try {
      const res = await fetch('/api/ping')
      if (!res.ok) throw new Error(`Ping failed: ${res.status}`)
      const json = await res.json()
      setPingResult(json)
    } catch (e) {
      setError(e.message)
    }
  }

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
    <div style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Ping</h1>
      <button onClick={doPing}>Ping server</button>
      {pingResult && (
        <pre>{JSON.stringify(pingResult, null, 2)}</pre>
      )}

      <hr />

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
      {echoResult && (
        <pre>{JSON.stringify(echoResult, null, 2)}</pre>
      )}

      {error && (
        <p style={{ color: 'crimson' }}>{error}</p>
      )}
    </div>
  )
}
