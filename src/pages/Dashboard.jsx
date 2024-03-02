import { redirect, useLoaderData } from 'react-router-dom'
import AddExpense from '../components/AddExpense'
import CreateBudget from '../components/CreateBudget'
import ExistingBudgets from '../components/ExistingBudgets'
import RecentExpenses from '../components/RecentExpenses'

import { toast } from 'react-toastify'

import {
  createBudget,
  createExpense,
  fetchData,
  saveToStorage,
} from '../helpers.js'
import LoginScreen from '../layout/LoginScreen'

export function dashboardLoader() {
  const userName = fetchData('userName')
  const budgets = fetchData('budgets')
  const expenses = fetchData('expenses')
  return { userName, budgets, expenses }
}

export async function dashboardAction({ request }) {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  if (_action === 'newUser') {
    saveToStorage('userName', { userName: values.userName })
    return toast.success(`Welcome, ${values.userName}!`)
  }

  if (_action === 'newBudget') {
    try {
      createBudget({
        budgetName: values.budgetName,
        budgetLimit: values.budgetLimit,
      })
      return toast.success('Budget created!')
    } catch (error) {
      throw new Error('There was an problem creating your budget')
    }
  }

  if (_action === 'newExpense') {
    try {
      createExpense({
        expenseName: values.expenseName,
        expenseAmount: values.expenseAmount,
        budgetCategoryId: values.budgetCategoryId,
      })
      return toast.success('Expense created!', { theme: 'light' })
    } catch (error) {
      throw new Error('There was an problem creating your expense')
    }
  }

  if (_action === 'deleteExpense') {
    const data = fetchData('expenses')
    const delData = data.filter(data => data.expenseId !== values.expenseId)

    saveToStorage('expenses', delData)
    return toast.success('Expense Deleted!')
  }
}

let style = 'grid gap-6 mb-8'

function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData()

  const budgetsLength = budgets?.length > 0
  style += budgetsLength ? ' grid-cols-2' : ''

  return !userName ? (
    <LoginScreen />
  ) : (
    <div className="flex flex-col w-full gap-6">
      <h1 className="font-bold text-7xl">
        Welcome back,{' '}
        <span className="text-[--color-accent] capitalize">
          {userName.userName}
        </span>
      </h1>
      {!budgetsLength && (
        <>
          <p>Personal budgeting is the secret to financial freedom. </p>
          <p>Create a budget to get started!</p>
        </>
      )}
      <div className={style}>
        <CreateBudget />
        {budgetsLength && <AddExpense budgets={budgets} />}
      </div>

      {budgetsLength && (
        <ExistingBudgets budgets={budgets} expenses={expenses} />
      )}
      {budgetsLength && expenses?.length > 0 && (
        <RecentExpenses budgets={budgets} expenses={expenses} />
      )}
    </div>
  )
}
export default Dashboard
