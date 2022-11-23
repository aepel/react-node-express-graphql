import logo from './logo.svg'
import './App.css'
import Form from './Form'
import { Card, CardContent } from '@mui/material'

function App() {
  const onSubmit = values => console.log(values)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Card style={{ maxWidht: '100%', minWidth: '25%', margin: '10px', padding: '10' }}>
          <CardContent>
            <Form name="" author="" year="" isbn="" publisher="" onHandleSubmit={onSubmit} />
          </CardContent>
        </Card>
      </header>
    </div>
  )
}

export default App
