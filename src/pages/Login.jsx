import { Link } from 'react-router-dom'
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>ExpenseTracker</h1>
        <p className='text-gray-500 mt-2'>Manage your expenses with ease</p>
      </div>
      
      <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md text-center'>
        <h2 className='text-xl font-semibold mb-2'>Welcome Back</h2>
        <p className='text-sm text-gray-500 mb-6'>Sign in to your account to start tracking your expenses</p>
        
        <div className='space-y-3'>
          <Link
            to='/home'
            className='w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm'
          >
            <FaGoogle className='text-base' />
            Continue with Google
          </Link>

          <Link
            to='/home'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm'
          >
            <FaFacebook className='text-base' />
            Continue with Facebook
          </Link>
        </div>
        
        <p className='text-xs text-gray-400 mt-6'>Demo Mode: Click either button to login with mock credentials</p>
      </div>
    </div>
  )
}

export default Login