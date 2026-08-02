import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Plus, Search, Filter, Calendar, TrendingUp, PieChart, DollarSign } from 'lucide-react'
import ExpenseForm from '../components/ExpenseForm'
import Cards from '../components/Cards'
import ExpenseTable from '../components/ExpenseTable'

const Dashboard = () => {
  // 1. ALL STATES
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  
  const uniqueCategories = new Set(expenses.map(exp => exp.category)).size;
  
  // Calculate this month's total
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthTotal = expenses.reduce((sum, exp) => {
    const expDate = new Date(exp.date);
    if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
      return sum + Number(exp.amount);
    }
    return sum;
  }, 0);

  // 3. FILTER LOGIC
  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.description.toLowerCase().includes(searchQuery.toLowerCase());
    // If categoryFilter is empty (""), return true. Otherwise, check if they match.
    const matchesCategory = categoryFilter ? exp.category === categoryFilter : true;
    
    return matchesSearch && matchesCategory;
  });

  // 4. FUNCTIONS TO PASS TO CHILDREN
  const handleSaveExpense = (expenseData) => {
    if (expenseToEdit) {
      // We are editing: map through expenses, find the matching ID, and replace its data.
      setExpenses(expenses.map(exp => exp.id === expenseToEdit.id ? { ...expenseData, id: exp.id } : exp));
    } else {
      // We are adding: create a new object with a fake ID (current timestamp) and add it to the list.
      setExpenses([{ ...expenseData, id: Date.now().toString() }, ...expenses]);
    }
    // Close modal and clear the edit state
    setExpenseToEdit(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    // Keep everything EXCEPT the one with the matching ID
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const openModalForNew = () => {
    setExpenseToEdit(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (expense) => {
    setExpenseToEdit(expense);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ExpenseTracker</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">Welcome, Santosh</span>
          <Link to="/" className="flex items-center gap-1 border px-3 py-1.5 rounded-md hover:bg-gray-50">
            <LogOut size={16} /> Logout
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Cards title="Total Expenses" amount={`$${totalExpenses.toFixed(2)}`} icon={<DollarSign size={20}/>} />
          <Cards title="This Month" amount={`$${thisMonthTotal.toFixed(2)}`} icon={<Calendar size={20}/>} />
          <Cards title="Total Transactions" amount={expenses.length} icon={<TrendingUp size={20}/>} />
          <Cards title="Categories" amount={uniqueCategories} icon={<PieChart size={20}/>} />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-medium">Expenses</button>
            <button className="px-4 py-1.5 text-gray-500 text-sm font-medium hover:text-gray-700 cursor-not-allowed">Analytics</button>
          </div>
          <button 
            onClick={openModalForNew} 
            className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 text-sm font-medium"
          >
            <Plus size={16} /> Add Expense
          </button>
        </div>

        {/* Expenses List Area */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Expense History</h2>
          
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search expenses..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:border-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <select 
                className="pl-10 pr-8 py-2 bg-gray-50 border rounded-lg text-sm appearance-none focus:outline-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No expenses recorded yet. Add your first expense to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((exp) => (
                    <ExpenseTable
                      key={exp.id} 
                      expense={exp} 
                      onEdit={openModalForEdit} 
                      onDelete={handleDelete} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Conditional Rendering for Modal */}
      {isModalOpen && (
        <ExpenseForm
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveExpense} 
          initialData={expenseToEdit} 
        />
      )}
    </div>
  )
}

export default Dashboard