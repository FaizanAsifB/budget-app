import { TrashIcon } from '@heroicons/react/24/outline'
import { Form, useLoaderData } from 'react-router-dom'
import AddExpense from '../components/AddExpense'
import {
  formatCurrency,
  formatPercentage,
  getAllMatchingItems,
  spentAmount,
} from '../helpers'

export function budgetLoader({ params }) {
  const budget = getAllMatchingItems({
    category: 'budgets',
    key: 'budgetCategoryId',
    value: params.id,
  })[0]

  const expenses = getAllMatchingItems({
    category: 'expenses',
    key: 'budgetCategoryId',
    value: params.id,
  })

  if (!budget) {
    throw new Error('The budget you’re trying to find doesn’t exist')
  }

  return { budget, expenses }
}

const BudgetItem = () => {
  const { budget, expenses } = useLoaderData()
  console.log({ budget, expenses })
  const { budgetCategoryId, budgetName, budgetLimit, color } = budget

  const spent = spentAmount(expenses, budgetCategoryId)
  const remaining = +budgetLimit - spent

  return (
    <div style={{ '--color-tertiary': `hsl(${color})`, width: '100%' }}>
      <h2 className="text-4xl font-bold capitalize">
        <span className="text-[--color-tertiary]">{budgetName}</span> Overview
      </h2>

      <div className="flex gap-4 w-full">
        <div className="grid gap-4 border-2 border-[--color-tertiary] p-4 rounded-3xl text-[--color-tertiary] text-2xl shadow-md">
          <div className="flex justify-between capitalize">
            <h3 className="font-bold">{budgetName}</h3>
            <p>{formatCurrency(+budgetLimit)} Budgeted</p>
          </div>
          <progress
            max={budgetLimit}
            value={spent}
            className="w-full [&::-webkit-progress-bar]:rounded-xl [&::-webkit-progress-value]:rounded-xl   [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:bg-[--color-tertiary] [&::-moz-progress-bar]:bg-violet-400"
          >
            {formatPercentage(spent / remaining)}
          </progress>
          <p className="flex justify-between text-sm">
            <span>{formatCurrency(spent)} spent</span>
            <span className=" text-gray-500">
              {formatCurrency(remaining)} remaining
            </span>
          </p>
          <Form method="post">
            <button
              type="submit"
              name="budgetId"
              value={budgetCategoryId}
              className="flex gap-2 justify-center items-center font-normal justify-self-start text-lg text-white px-4 py-2 rounded-md bg-red-400 outline outline-2 outline-red-400 hover:outline-offset-[3px] hover:outline-[3px] hover:bg-red-400 hover:text-white transition-all ease-in duration-200"
            >
              Delete Budget
              <TrashIcon className="w-6 aspect-square " />
            </button>
            <input type="hidden" name="_action" value="deleteExpense" />
          </Form>
        </div>
        <AddExpense />
      </div>
    </div>
  )
}
export default BudgetItem
