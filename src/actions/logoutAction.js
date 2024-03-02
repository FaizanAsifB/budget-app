import { redirect } from 'react-router-dom'
import { deleteItem } from '../helpers.js'

export const logoutAction = () => {
  deleteItem('userName')
  return redirect('/')
}
