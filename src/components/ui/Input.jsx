import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { id, label, type = 'text', inputMode, ...props },
  ref
) {
  return (
    <div className="grid gap-2">
      <label className="font-bold text-lg" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        ref={ref}
        inputMode={inputMode}
        className="border-2 border-[--color-secondary] px-4 py-2 rounded-md focus:shadow-[0_0_0_1px_var(--color-accent)] focus:border-[--color-accent]"
        {...props}
        required
      />
    </div>
  )
})
export default Input
