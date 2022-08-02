import TopBar from "./components/TopBar/TopBar";
import Home from "./pages/home/Home"
import Myposts from "./pages/myposts/Myposts"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single"
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import {Context} from './context/Context';
import {useContext} from 'react';


function App() {
  const {user}=useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Home />
        </Route>
        <Route path="/myposts">
          <Myposts />
        </Route>
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
      </Switch>
    </Router>  
  );
}

export default App;
