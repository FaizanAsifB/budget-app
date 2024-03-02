import Button from './ui/Button'
import Input from './ui/Input'

import { useFetcher } from 'react-router-dom'

import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'

function CreateBudget() {
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
      <h2 className="text-2xl font-bold z-10">CreateBudget</h2>
      <fetcher.Form className="grid gap-4 z-10" method="post" ref={formRef}>
        <Input
          id="budgetName"
          label="Budget Name"
          placeholder="e.g., Groceries"
          ref={focusRef}
        />

        <Input
          id="budgetLimit"
          label="Budget Limit"
          type="number"
          placeholder="e.g., 350kr"
          inputMode="decimal"
        />
        <input type="hidden" name="_action" value="newBudget" />

        <Button disabled={isSubmitting}>
          {!isSubmitting ? (
            <>
              Create Budget
              <CurrencyDollarIcon className="fill-white text-slate-950 h-6 aspect-square" />
            </>
          ) : (
            'Submitting...'
          )}
        </Button>
      </fetcher.Form>
    </div>
  )
}
export default CreateBudget
