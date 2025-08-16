import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts'
import { ShoppingBag, User, LogOut, Plus, Store } from 'lucide-react'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      const { error } = await signOut()
      if (error) throw error
      toast.success('Signed out successfully!')
      navigate('/')
    } catch {
      toast.error('Error signing out')
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              MarketPlace
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Hello, <span className="font-semibold text-pink-600">{profile?.full_name || 'User'}</span>
                  </span>
                  
                  {profile?.role === 'seller' && (
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar