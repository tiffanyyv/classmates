import {auth} from '../components/authConfig/firebase.config'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";

const Login = () => {

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const createUserWithEmailAndPass = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCred => {
        console.log(userCred.user)
      })
      .catch(error => {
        console.log(error)
      })
  }

    return (
        <div>
            <div>
              <button onClick={signInWithGoogle}>Google</button>
              <button onClick={signInWithFacebook}>Facebook</button>
                <p><a href="/">Go Home</a></p>
            </div>
        </div>
    )
}

export default Login