import React from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/helpers'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="card p-0 overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in">
        <div className="relative">
          <img
            src={product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            
            <div className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 text-xs font-semibold rounded-full">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard