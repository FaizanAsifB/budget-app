import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { logoutAction } from './actions/logoutAction.js'
import './index.css'
import Main, { mainLoader } from './layout/Main.jsx'
import BudgetItem, { budgetLoader } from './pages/BudgetPage.jsx'
import Dashboard, {
  dashboardAction,
  dashboardLoader,
} from './pages/Dashboard.jsx'
import Error from './pages/Error.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        action: dashboardAction,
        loader: dashboardLoader,
        errorElement: <Error />,
      },
      {
        path: 'budget/:id',
        element: <BudgetItem />,
        loader: budgetLoader,
        errorElement: <Error />,
      },
      { path: 'logout', action: logoutAction, errorElement: <Error /> },
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
