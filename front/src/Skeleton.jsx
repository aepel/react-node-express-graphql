import logo from './logo.svg'
import './App.css'
import { Card, CardContent } from '@mui/material'

export default function Skeleton({ children }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Card style={{ maxWidht: '100%', minWidth: '25%', margin: '10px', padding: '10' }}>
          <CardContent>{children}</CardContent>
        </Card>
      </header>
    </div>
  )
}
