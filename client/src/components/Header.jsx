import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const Header = () => {
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/"><h1 className="font-bold">Auth App</h1></Link>
        <ul className="flex gap-4">
          <Link to="/"><li>Домашняя</li></Link>
          <Link to="/about"><li>О приложении</li></Link>
          {currentUser ? <img src={currentUser.profilePicture} alt="profilePicture" className="size-7 rounded-full object-cover" /> : <Link to="sign-in"><li>Войти</li></Link>
          }
        </ul>
      </div>
    </div>
  )
}