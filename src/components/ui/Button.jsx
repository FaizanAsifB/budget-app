function Button({ onClick, children, disabled = false }) {
  return (
    <button
      className="flex gap-2 justify-center items-center justify-self-start text-lg text-white px-4 py-2 rounded-md bg-[--color-primary] outline outline-0 hover:outline-[3px] outline-black hover:outline-offset-[3px] transition-offset ease-in duration-[150ms]"
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button
