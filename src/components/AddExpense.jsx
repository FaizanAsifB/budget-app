import { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

import { PlusCircleIcon } from '@heroicons/react/20/solid'

import Button from './ui/Button'
import Input from './ui/Input'
import Select from './ui/Select'

function AddExpense({ budgets }) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === 'submitting'

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  return (
    <div className="grid gap-4 text-base max-w-[800px] border-4 border-white rounded-3xl p-8 relative shadow-lg">
      <div className="absolute inset-3 border-[--color-primary] border-2 border-dashed rounded-3xl"></div>
      <h2 className="z-10 text-2xl font-bold">Add New Expense</h2>
      <fetcher.Form method="post" ref={formRef} className="z-10 grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Input
            ref={focusRef}
            id={'expenseName'}
            label={'Expense Name'}
            placeholder={'e.g., Coffee'}
          />
          <Input
            id={'expenseAmount'}
            label={'Expense Amount'}
            type={'number'}
            placeholder={'e.g., 35kr'}
            inputMode="decimal"
          />
          <input type="hidden" name="_action" value="newExpense" />
        </div>
        {budgets?.length > 0 && (
          <Select
            id={'budgetCategoryId'}
            label={'Budget Category'}
            budgets={budgets}
          />
        )}
        <Button disabled={isSubmitting}>
          {!isSubmitting ? (
            <>
              Add Expense
              <PlusCircleIcon className="h-6 aspect-square" />
            </>
          ) : (
            'Submitting...'
          )}
        </Button>
      </fetcher.Form>
    </div>
  )
}
export default AddExpense
