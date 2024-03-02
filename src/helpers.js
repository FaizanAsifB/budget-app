import sortBy from 'lodash.sortby'

const generateRandomColor = () => {
  const existingBudgetLength = fetchData('budgets')?.length ?? 0
  return `${existingBudgetLength * 34} 65% 50%`
}

export const handleFormSubmit = e => {
  const fd = new FormData(e.target)
  const data = Object.fromEntries(fd.entries())
  return data
}

export const createBudget = ({ budgetName, budgetLimit }) => {
  const newBudget = {
    budgetCategoryId: crypto.randomUUID(),
    budgetName,
    budgetLimit,
    createdAt: Date.now(),
    color: generateRandomColor(),
  }
  const existingBudgets = fetchData('budgets') ?? []
  saveToStorage('budgets', [...existingBudgets, newBudget])
}

export const createExpense = ({
  expenseName,
  expenseAmount,
  budgetCategoryId,
}) => {
  const newExpense = {
    expenseId: crypto.randomUUID(),
    expenseName,
    expenseAmount,
    budgetCategoryId,
    createdAt: Date.now(),
  }
  const existingExpenses = fetchData('expenses') ?? []
  saveToStorage('expenses', [...existingExpenses, newExpense])
}

export const saveToStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const fetchData = key => {
  return JSON.parse(localStorage.getItem(key))
}

export const deleteItem = key => {
  return localStorage.removeItem(key)
}

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? []
  return data.filter(item => item[key] === value)
}

export const sortBudgets = budgets => {
  return sortBy(budgets, ({ budgetName }) => budgetName.toLowerCase())
}

export const sortExpenses = expenses => {
  const expensesCopy = [...expenses]
  return expensesCopy.sort((a, b) => b.createdAt - a.createdAt)
}

export const spentAmount = (expenses, budgetId) => {
  if (!expenses) return 0
  return expenses.reduce((acc, expense) => {
    if (expense.budgetCategoryId !== budgetId) return acc
    return acc + +expense.expenseAmount
  }, 0)
}

// FORMATTING
export const formatDateToLocaleString = epoch =>
  new Date(epoch).toLocaleDateString()

// Formating percentages
export const formatPercentage = amount => {
  return amount.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  })
}

// Format currency
export const formatCurrency = amount => {
  return amount.toLocaleString(undefined, {
    style: 'currency',
    currency: 'sek',
  })
}
