import { useAuthContext } from '../../utils/context/AuthProvider';

export default function Dashboard() {
  const { logout } = useAuthContext();

  return (
    <div className='pageData'>
      <h3>Dashboard</h3>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
