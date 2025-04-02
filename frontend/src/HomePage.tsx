import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const HomePage = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Home</h2>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="relative overflow-x-auto bg-white dark:bg-black text-black dark:text-white">

                        <div className="flex space-x-2">
                            <a href="https://vite.dev" target="_blank">
                                <img src={viteLogo} className="logo" alt="Vite logo"/>
                            </a>
                            <a href="https://react.dev" target="_blank">
                                <img src={reactLogo} className="logo react" alt="React logo"/>
                            </a>
                        </div>
                        <h1>Vite + React</h1>
                        <div className="card">
                            <button onClick={() => setCount((count) => count + 1)}>
                                count is {count}
                            </button>
                        </div>
                        <div>
                            <h5 className="text-gray-500 pb-2 text-2xl">
                                Frontend packages
                            </h5>
                            <div className="flex space-x-4">
                                <a
                                    className="text-secondary text-lg md:text-xl text-center"
                                    href="https://mui.com/material-ui/getting-started/overview/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Material UI
                                </a>
                                <a
                                    className="text-secondary text-lg md:text-xl text-center"
                                    href="https://mui.com/material-ui/material-icons/#main-content"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Material Icons
                                </a>
                                <a
                                    className="text-secondary text-lg md:text-xl text-center"
                                    href="https://axios-http.com/docs/intro"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Axios
                                </a>
                                <a
                                    className="text-secondary text-lg md:text-xl text-center"
                                    href="https://reactrouter.com/en/6.15.0/start/overview"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    React Router v6
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
};

export default HomePage;