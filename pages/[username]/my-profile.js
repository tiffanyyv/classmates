// Profile View
import { Image } from 'next/image';

// import components

// information needed
// name, city, state, user type, profile photo
// Can use constant profile picture if user doesnt upload one
// if Mentor, classes teaching, mentor rating

export default function MyProfile(props) {
  return (
    <div>
      <Image src={props.profilePhoto} alt={props.username} />
      {props.userType === 'mentor' && <div>Mentor: Placehoder for classes I teach component</div>}
      <h1>{props.firstName} {props.lastName}</h1>
      <h2>{props.city} {props.state}</h2>
      <p>Placeholder information</p>
      {props.userType === 'mentor' && <div>Mentor: Placehoder for rating component</div>}
      {props.userType === 'student' && <div>Student: Placehoder for write a review component</div>}
    </div>
  )
}
