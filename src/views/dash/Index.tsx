import {FC} from 'react'
import Dashboard from './Dashboard'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const DashLayaut:FC = () => {
  let history = useHistory();

  const logOut = () => {
    localStorage.removeItem('login')

    history.replace("/login")
  }

  return (
    <div className="dashboard-layaut">
      <div>
        <div className="text-end p-4">
          <Button variant="secondary" onClick={logOut}>Выйти</Button>
        </div>
        <Dashboard />
      </div>
    </div>
  )
}

export default DashLayaut