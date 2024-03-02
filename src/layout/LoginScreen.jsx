import { UserPlusIcon } from '@heroicons/react/20/solid'
import { Form } from 'react-router-dom'
import illustration from '../assets/illustration.jpg'
import Button from '../components/ui/Button.jsx'

function LoginScreen() {
  return (
    <div className="grid grid-cols-2 gap-4 my-auto">
      <div className="flex flex-col justify-center items-start gap-4">
        <h1 className="text-7xl font-bold">
          Take Control of
          <span className="text-[--color-accent]"> Your Money</span>
        </h1>
        <p className="max-w-prose">
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
            className="border-2 border-[--color-secondary] rounded-md px-4 py-2 mb-4"
            required
          />
          <input type="hidden" name="_action" value="newUser" />
          <Button label="Create Account">
            Create Account
            <UserPlusIcon className="w-6 aspect-square" />
          </Button>
        </Form>
      </div>
      <div>
        <img
          src={illustration}
          alt="Woman with money next to a graph"
          className="max-w-full object-contain"
        />
      </div>
    </div>
  )
}
export default LoginScreen
