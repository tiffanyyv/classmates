import axios from 'axios';
import { getUserInfo } from '../../utils/api/apiCalls';
import { useAuthContext } from '../../utils/context/AuthProvider';
function Notifications({data}) {
  const { logout } = useAuthContext();
  console.log(data);
  const logUserInfo = () => {
     console.log(data);
  }
  return (
    // student clicks "Request to join class"
    // axios put request into notifications table for that teacher & class_id
    // axios get request to get notifications
    // teacher view & teacher clicks accept: axios put request to add student into DB
    // axios get request to get notifications
    // student view: "You've been accepted into class_id"
    // teacher view & teacher clicks decline:
    // axios get request to get notifications
    // student view: "You've been declined into class_id"
    <div className='pageData'><button onClick={logUserInfo}>log User info</button></div>
  )
}
export async function getServerSideProps(context) {
  const userId = context.params['user-id'];
  // console.log(userId);
  // return getUserInfo(userId)
  //   .then(data => {
  //     console.log(data);
  //     return data;
  //   })
  //   .then((info) => {
  //     console.log(info);
  //     return { props: {userInfo: 'test'}}
  //   })
  var data = await getUserInfo(userId)
  return {
    props: {data: data}
  }
  // const userInfo = await getUserInfo(userId)
  // console.log(userInfo);
  // const userInfo = await res.json()
  // if (!userInfo) {
  //   return {
  //     notFound: true,
  //   }
  // }
  // return { props: { userInfo } }
}
export default Notifications;