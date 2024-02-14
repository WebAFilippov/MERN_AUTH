import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { useDispatch } from 'react-redux';
import { singInSuccess } from "../redux/user/userSlice";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

export const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      })
      const data = await response.json()
      dispatch(singInSuccess(data))
      navigate("/")
    } catch (error) {
      console.log("Ошибка OAuth Google", error)
    }
  }

  return (
    <button type="button" className="bg-red-700 text-white rounded-lg uppercase p-3 hover:opacity-95" onClick={handleGoogleClick}>Войти с помощью Google</button>
  )
}