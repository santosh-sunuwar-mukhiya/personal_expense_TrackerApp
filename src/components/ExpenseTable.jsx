import { Edit, Trash2 } from 'lucide-react'

const ExpenseTable= ({ expense, onEdit, onDelete }) => {
  return (
    <tr className="border-b last:border-0 hover:bg-gray-50">
      <td className="py-4">{new Date(expense.date).toLocaleDateString()}</td>
      <td className="py-4">{expense.description}</td>
      <td className="py-4">
        <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs">
          {expense.category}
        </span>
      </td>
      <td className="py-4 font-medium">${Number(expense.amount).toFixed(2)}</td>
      <td className="py-4 flex justify-end gap-2">
        <button 
          onClick={() => onEdit(expense)} 
          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md border transition-colors"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDelete(expense.id)} 
          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md border transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  )
}

export default ExpenseTable