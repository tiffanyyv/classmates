import { getUserInfo } from '../../utils/api/apiCalls';

export default function Notifications({data}) {
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
    <div className='pageData'><p>Notifications</p></div>
  )
}

export async function getServerSideProps(context) {
  const userId = context.params['user-id'];
  const userInfo = await getUserInfo(userId)

  if (!userInfo || !userInfo?.account_type) {
    return {
      notFound: true,
    }
  }

  return {
    props: { userInfo }
  }
}
