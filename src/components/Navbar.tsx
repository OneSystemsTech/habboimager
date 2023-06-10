import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-gray-900">
            <div className="container mx-auto px-8 py-3">
                <div className="flex items-center justify-between">
                    <a className="font-bold text-lg text-purple-800" href="/">
                        <span className="text-white">One</span>Systems
                    </a>
                    <div className="flex space-x-4">
                        <a className="text-white hover:text-purple-400 mt-2" href="/sobre">
                            Sobre
                        </a>
                          <a className="text-white hover:text-purple-400 mt-2" href="/comunidade">
                            Comunidade
                        </a>
                        { /* Login Button */ }
                        <a className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" href="/login">
                            Login
                        </a>

                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar
