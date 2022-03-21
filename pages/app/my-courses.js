import { useAuthContext } from '../../utils/context/AuthProvider'

export default function MyClasses() {
  const { logout } = useAuthContext();

  return (
    <div className='pageData'>
      <p>
        My Classes
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
