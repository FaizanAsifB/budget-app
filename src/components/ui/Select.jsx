import { sortBudgets } from '../../helpers'

function Select({ id, label, budgets }) {
  const sortedBudgets = sortBudgets(budgets)

  return (
    <div className="grid gap-2">
      <label className="font-bold text-lg" htmlFor={id}>
        {label}
      </label>

      <select
        name={id}
        id={id}
        className="border-2 border-[--color-secondary] px-4 py-2 rounded-md capitalize focus:shadow-[0_0_0_1px_var(--color-accent)] focus:border-[--color-accent]"
        required
      >
        {sortedBudgets.map(budget => (
          <option key={budget.budgetCategoryId} value={budget.budgetCategoryId}>
            {budget.budgetName}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Select
