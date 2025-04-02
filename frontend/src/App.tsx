import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import HomePage from './HomePage';
import OverviewPage from './OverviewPage';
import {TodoPage} from "./todo/TodoPage.tsx";

function App() {

    return (
        <div className="min-h-full">
            <BrowserRouter>
                <nav className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img className="size-8"
                                         src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                         alt="Your Company"/>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <a href="/"
                                           className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</a>
                                        <a href="/overview"
                                           className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">What's
                                            in this App</a>
                                        <a href="/todo"
                                           className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Your
                                            To Do List</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="overview" element={<OverviewPage/>}/>
                    <Route path="todo" element={<TodoPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
