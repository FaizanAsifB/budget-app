import { Link, useNavigate, useRouteError } from 'react-router-dom'

// library imports
import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/solid'
import Button from '../components/ui/Button'

const Error = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <div className="grid h-screen gap-8 mx-auto text-center place-content-center place-items-center max-w-prose">
      <h1 className="text-3xl">Uh oh! We’ve got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </Button>
        <Link
          to="/dashboard"
          className="flex gap-2 justify-center items-center justify-self-start text-lg text-white px-4 py-2 bg-[--color-primary] rounded-md"
        >
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  )
}
export default Error
