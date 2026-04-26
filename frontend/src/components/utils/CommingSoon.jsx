import React from 'react'

const CommingSoon = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white px-6 py-12">
      
      <div className="max-w-lg w-full text-center space-y-8">
        
        {/* Icon */}
        <div className="text-5xl sm:text-6xl">
          🚧
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          This page isn’t ready yet
        </h1>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
          We’re still working on this feature. It’ll be available soon with a better experience.
        </p>

        {/* Divider */}
        <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>

        {/* Status badge */}
        <div className="inline-block px-4 py-2 rounded-full bg-green-50 text-green-600 text-xs tracking-wide border border-green-200">
          Coming Soon
        </div>

      </div>

    </div>
  )
}

export default CommingSoon
