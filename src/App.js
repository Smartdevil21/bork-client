import "./App.css";
import ToDo from "./pages/todo/ToDo";
import Sidebar from "./sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { createContext, useEffect, useState } from "react";
import HabitTracker from "./pages/Habit-Tracker/HabitTracker";
import Stats from "./pages/Habit-Tracker/Stats/Stats";
import CalenderPage from "./pages/Calender/CalenderPage";
import Feedback from "./pages/Feedback/Feedback";
import Home from "./pages/Home/Home";
import axios from "axios";

const StateContext = createContext();

function App() {
  const [windowWidth, setWindowWidth] = useState(0);

  const [states, setStates] = useState({
    user_id: "",
    username: "",
    user_email: "",
    userLoggedIn: false,

    // todo States
    openEditTaskModal: false,
    openAddTaskModal: false,
    taskToBeEdited: {},
    userTasks: [],
    completedTask: [],

    // Habit Tracker States
    openAddHabitModal: false,
    openEditHabitModal: false,
    openHabitStats: false,
    activeHabitStat: {},
    habitToBeEdited: {},
    userHabits: [],

    // Calender States
    tasksOfSelectedDay: [],
    dateOfDaySelectedInModal: "",
  });

  const contextObj = {
    states,
    setStates,
  };

  // const testCall = async () => {
  //   try {
  //     const result = await axios.get("http://localhost:8000/test");
  //     console.log(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // testCall();
    setWindowWidth(window.innerWidth);
    console.log(windowWidth);
  }, []);

  return (
    <StateContext.Provider value={contextObj}>
      {windowWidth > 700 ? (
        <div className="App">
          <Routes>
            <Route
              exact
              path="/home"
              element={
                <div className="main_wrapper">
                  <Sidebar />
                  <Home />
                </div>
              }
            />
            <Route
              exact
              path="/todo"
              element={
                <div className="main_wrapper">
                  <Sidebar />
                  <ToDo />
                </div>
              }
            />
            <Route
              exact
              path="/habit_tracker"
              element={
                <div className="main_wrapper">
                  <Sidebar />
                  <HabitTracker />
                </div>
              }
            />
            <Route
              exact
              path="/habit_tracker/stats"
              element={
                <div className="main_wrapper">
                  <Sidebar />
                  <Stats />
                </div>
              }
            />
            <Route
              exact
              path="/calender"
              element={
                <div className="main_wrapper">
                  <Sidebar />
                  <CalenderPage />
                </div>
              }
            />
            <Route
              exact
              path="/feedback"
              element={
                <div className="feedback_wrapper">
                  {/* <Sidebar /> */}
                  <Feedback />
                </div>
              }
            />
            <Route path="/signup" element={<SignUp />}></Route>
            <Route index element={<Login />}></Route>
          </Routes>
        </div>
      ) : (
        <div className="sorry">
          <p>Sorry, this webapp isn't available for mobile devices yet. 😅</p>
        </div>
      )}
    </StateContext.Provider>
  );
}

export default App;
export { StateContext };
