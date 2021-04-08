import React from 'react'
import {
  Switch, Route, BrowserRouter as Router, Redirect,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { joinGame, leaveGame } from './index'
import List from './containers/List'

const App = ({ socket }) => (
  <Router>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route exact path="/join">
            <div>
              <List socket={socket}/>
              <button onClick={
                () => {
                  joinGame(`player: ${new Date()}`)
                }}>Join
              </button>
              <button onClick={
                () => {
                  leaveGame()
                }}>Leave
              </button>
            </div>
          </Route>
          <Route exact path="/">
            <div>home</div>
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </ThemeProvider>
  </Router>
)

export default App
