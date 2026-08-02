import React from 'react'

const Cards = ({ title, amount, icon }) => {
  return (
    <div className="bg-white p-5 rounded-xl border flex flex-col gap-2">
      <div className="flex justify-between items-center text-gray-500">
        <span className="text-sm font-medium">{title}</span>
        {icon}
      </div>
      <span className="text-2xl font-bold text-gray-900">{amount}</span>
    </div>
  )
}

export default Cards