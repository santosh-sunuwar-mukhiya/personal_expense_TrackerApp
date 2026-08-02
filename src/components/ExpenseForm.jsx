import { useState } from 'react'

const ExpenseForm = ({ onClose, onSave, initialData }) => {
  // Local state for the form inputs
  let initialValue;

if (initialData === null || initialData === undefined) {
  initialValue = {
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  };
} else {
  initialValue = initialData;
}

const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description || !formData.category || !formData.date) return;
    onSave(formData); 
  };

  return (
    // backdrop-blur-sm and bg-black/30 
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Expense' : 'Add New Expense'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-700 mb-1">Amount ($)</label>
            <input 
              type="number" 
              name="amount"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00" 
              className="w-full bg-gray-50 border p-2.5 rounded-lg focus:outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter expense description..." 
              className="w-full bg-gray-50 border p-2.5 rounded-lg focus:outline-none focus:border-gray-400 resize-none h-24"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-50 border p-2.5 rounded-lg focus:outline-none focus:border-gray-400"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Bills & Utilities">Bills & Utilities</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-gray-50 border p-2.5 rounded-lg focus:outline-none focus:border-gray-400"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="submit" 
              className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              {initialData ? 'Save Changes' : 'Add Expense'}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpenseForm