import { Outlet, useLoaderData } from 'react-router-dom'
import { fetchData } from '../helpers'
import Footer from './Footer'
import Header from './Header'

export function mainLoader() {
  const userName = fetchData('userName')
  return { userName }
}

const Main = () => {
  const { userName } = useLoaderData()
  return (
    <div className=" text-2xl grid grid-rows-layout grid-cols-layout h-screen text-[#121c1d] bg-[#f7fcfd]">
      <Header userName={userName} />
      <main className="grid col-start-2 row-start-2 p-8 place-items-start">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default Main
