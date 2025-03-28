import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './HomePage';
import OverviewPage from './OverviewPage';
import {TodoPage} from "./todo/TodoPage.tsx";

function App() {

  return (
      <div className="min-h-screen min-w-full overflow-hidden">
          <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                  <div className="bg-primary p-4">
                      <div className="flex space-x-4">
                          <a href="/" className="text-primary text-xl hover:underline">Home</a>
                          <a href="/overview" className="text-primary text-xl hover:underline">What's in this App</a>
                          <a href="/todo" className="text-primary text-xl hover:underline">Your To Do List</a>
                      </div>
                  </div>
                  <div className="flex-1">
                      <Routes>
                          <Route index element={<HomePage/>}/>
                          <Route path="overview" element={<OverviewPage/>}/>
                          <Route path="todo" element={<TodoPage/>}/>
                      </Routes>
                  </div>
              </div>
          </BrowserRouter>
      </div>
  )
}

export default App
