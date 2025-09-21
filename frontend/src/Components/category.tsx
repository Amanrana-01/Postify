"use client"
import React from 'react'
import Link from 'next/link'

interface CategoryProps {
  title: string
  slug: string
  onClick?: () => void
  index?: number
}

const Category: React.FC<CategoryProps> = ({ title, slug, onClick, index = 0 }) => {
  return (
    <Link 
      href={`/category/${slug}`}
      className="group px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-full text-sm font-medium transition-colors duration-200 border border-gray-200 hover:border-gray-300"
      onClick={onClick}
    >
      {title}
    </Link>
  )
}

export default Category
