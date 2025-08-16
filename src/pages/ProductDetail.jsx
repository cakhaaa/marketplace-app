import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { formatPrice } from '../utils/helpers'
import { useAuth } from '../contexts/'
import LoadingSpinner from '../components/LoadingSpinner'
import { ArrowLeft, User, Calendar, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [seller, setSeller] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles:seller_id (
            full_name,
            email
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      setProduct(data)
      setSeller(data.profiles)
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Product not found')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart')
      navigate('/login')
      return
    }
    
    toast.success('Added to cart! (Cart functionality coming soon)')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="card overflow-hidden">
              <img
                src={product.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-slide-up">
            <div className="card p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                {formatPrice(product.price)}
              </div>

              <div className="prose max-w-none mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'No description available.'}
                </p>
              </div>

              {/* Seller Info */}
              <div className="border-t border-gray-200 pt-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Seller Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {seller?.full_name || 'Unknown Seller'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {seller?.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Meta */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Listed {new Date(product.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button className="w-full btn-secondary">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail