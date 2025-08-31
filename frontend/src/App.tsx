import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "./store/store.ts";
import LoginPage from "./pages/LoginPage";
import { logout } from "./store/slices/userSlice.ts";
import './styles/global.css'
import CourseList from './components/CourseList'

function App() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  return (  
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Course Platform</h1>
          {user && (
            <button className="logout-button"
            onClick={() => dispatch(logout())}>
              Logout
            </button>
          )}
        </header>

        <Routes>
          <Route
            path="/"
            element={user ? <CourseList /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
