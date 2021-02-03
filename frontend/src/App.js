import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ComicScreen from './screens/ComicScreen'
import ComicsScreen from './screens/ComicsScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import ComicListScreen from './screens/ComicListScreen'
import ComicEditScreen from './screens/ComicEditScreen'
import UserEditScreen from './screens/UserEditScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/comics/:id' component={ComicScreen} />
          <Route path='/comics' component={ComicsScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/users/:id/edit' component={UserEditScreen} />
          <Route path='/admin/comics/:id/edit' component={ComicEditScreen} />
          <Route path='/admin/comiclist' component={ComicListScreen} exact />
          <Route
            path='/admin/comiclist/:pageNumber'
            component={ComicListScreen}
            exact
          />
          <Route path='/page/:pageNumber' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
