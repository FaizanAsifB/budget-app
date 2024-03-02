import { BanknotesIcon } from '@heroicons/react/24/outline'
import { formatCurrency, formatPercentage, spentAmount } from '../helpers'

function ExistingBudgets({ budgets, expenses }) {
  return (
    <article>
      <h2 className="text-5xl font-bold mb-2">Existing Budgets</h2>
      <ul className="grid grid-cols-2 gap-4 p-8">
        {budgets.map(budget => {
          const { budgetName, budgetLimit, budgetCategoryId, color } = budget
          const spent = spentAmount(expenses, budgetCategoryId)

          const remaining = +budgetLimit - spent
          return (
            <li
              key={budgetCategoryId}
              style={{ '--color-tertiary': `hsl(${color})` }}
              className="grid gap-4 border-2 border-[--color-tertiary] p-4 rounded-3xl text-[--color-tertiary] text-2xl shadow-md"
            >
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
              <a
                href={`budget/${budgetCategoryId}`}
                className="flex items-center gap-2 place-self-center bg-[--color-tertiary] text-white text-xl px-4 py-2 rounded-md outline outline-0 outline-[--color-tertiary] hover:outline-offset-[3px] hover:outline-[3px] transition-offset ease-in duration-[150ms]"
              >
                <span>View Details</span>
                <BanknotesIcon className="h-6 aspect-square" />
              </a>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
export default ExistingBudgets
