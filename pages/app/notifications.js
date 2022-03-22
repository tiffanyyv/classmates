import { useAuthContext } from '../../utils/context/AuthProvider';

export default function Notifications() {
  const { logout } = useAuthContext();

  return (
    <div className='pageData'>
      <p>Notifications</p>
      <button onClick={logout}>Log out</button>
    </div>
  )
}
