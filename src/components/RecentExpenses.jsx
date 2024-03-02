import { TrashIcon } from '@heroicons/react/20/solid'
import { Form, Link } from 'react-router-dom'
import {
  formatCurrency,
  formatDateToLocaleString,
  sortExpenses,
} from '../helpers'

function RecentExpenses({ budgets, expenses }) {
  const sortedExpenses = sortExpenses(expenses)

  return (
    <>
      <h2 className="text-5xl font-bold">Recent Expenses</h2>
      <table>
        <thead>
          <tr className="p-4">
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Budget</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {sortedExpenses.map(expense => {
            const {
              expenseName,
              expenseAmount,
              createdAt,
              expenseId,
              budgetCategoryId,
            } = expense
            const budgetCategory = budgets.find(
              budget => budget.budgetCategoryId === budgetCategoryId
            )
            console.log(expense)

            return (
              <tr
                key={expenseId}
                className="text-center capitalize"
                style={{ '--color-tertiary': `hsl(${budgetCategory.color})` }}
              >
                <td>{expenseName}</td>
                <td>{formatCurrency(+expenseAmount)}</td>
                <td>{formatDateToLocaleString(createdAt)}</td>
                <td>
                  <Link className="bg-[--color-tertiary] text-white px-4 py-2 rounded-full outline outline-0 outline-[--color-tertiary] hover:outline-offset-[3px] hover:outline-[3px] transition-offset ease-in duration-[150ms]">
                    {budgetCategory.budgetName}
                  </Link>
                </td>
                <td>
                  <Form method="post">
                    <button
                      type="submit"
                      name="expenseId"
                      value={expenseId}
                      className="flex gap-2 justify-center items-center font-normal justify-self-start text-lg text-red-400 px-4 py-2 rounded-md bg-red-50 outline outline-2 outline-red-400 hover:outline-offset-[3px] hover:outline-[3px] hover:bg-red-400 hover:text-white transition-all ease-in duration-200"
                    >
                      <TrashIcon className="w-6 aspect-square " />
                    </button>
                    <input type="hidden" name="_action" value="deleteExpense" />
                  </Form>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
export default RecentExpenses
