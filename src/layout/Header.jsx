import { TrashIcon } from '@heroicons/react/24/solid'
import { Form, NavLink } from 'react-router-dom'
import logo from '../assets/logomark.svg'

function Header({ userName }) {
  return (
    <nav className="flex items-center justify-between p-6 font-bold col-start-2">
      <NavLink to="/" className="flex justify-start items-center gap-2 ">
        <img src={logo} alt="A logo that shows a home" />
        <p>HomeBudget</p>
      </NavLink>
      {userName && (
        <Form
          method="POST"
          action="/logout"
          onSubmit={e => {
            if (!confirm('Delete user data?')) e.preventDefault()
          }}
        >
          <button
            className="flex gap-2 justify-center items-center font-normal justify-self-start text-lg text-red-400 px-4 py-2 rounded-md bg-red-50 outline outline-2 outline-red-400 hover:outline-offset-[3px] hover:outline-[3px] hover:bg-red-400 hover:text-white transition-all ease-in duration-200"
            type="submit"
          >
            Delete User <TrashIcon className="w-6 aspect-square " />
          </button>
        </Form>
      )}
    </nav>
  )
}
export default Header
