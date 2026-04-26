import React from 'react'

const Card = ({ product }) => {
  const imageUrl = product?.image?.[0]?.image_url;
  const price = Number(product?.price || 0).toLocaleString("en-IN");

  return (
    <article className="group w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product?.title || "Product"}
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-gray-300">
            <i className="fa-regular fa-image"></i>
          </div>
        )}
{/* 
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-blue-600 shadow-sm">
          Available
        </span> */}
      </div>

      <div className="flex min-h-[130px] flex-col justify-between p-4">
        <div>
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {product?.title || "Untitled product"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">Listed by Kunal</p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">Price</p>
            <p className="text-xl font-bold text-gray-900">&#8377;{price}</p>
          </div>

          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            View
          </button>
        </div>
      </div>
    </article>
  )
}

export default Card
