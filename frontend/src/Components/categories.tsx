"use client"
import React from 'react'
import Category from './category'
import { Category as CategoryType } from '../lib/api'

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  if (categories.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Topics</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">No topics available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Explore topics
        </h2>
        <a 
          href="/blog" 
          className="text-green-600 hover:text-green-700 font-medium text-sm"
        >
          View all stories →
        </a>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <Category
            key={category.id}
            title={category.title}
            slug={category.slug}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Categories