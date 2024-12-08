import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { singInStart, singInSuccess, signInFailure } from "../redux/user/userSlice.js"
import { OAuth } from "./../components/OAuth.jsx"

export const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({})

  const handlerChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(singInStart())
    dispatch(signInFailure(false))
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success === false) {
        dispatch(signInFailure(data))
        return
      }
      dispatch(singInSuccess(data))
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error))
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-3">
      <h1 className="text-3xl font-semibold my-7 mx-auto text-center">Регистрация</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="text"
          placeholder="Никнейм"
          id="username"
          onChange={handlerChange}
        />
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="text"
          placeholder="Е-майл"
          id="email"
          onChange={handlerChange}
        />
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="password"
          placeholder="Пароль"
          id="password"
          onChange={handlerChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase disabled:opacity-80 hover:opacity-95"
        >
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </button>

        {/* Войти с помощью Google - Button */}
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Есть Аккаунт?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Войти</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error ? error.message || "Ошибка" : ""}</p>
    </div>
  )
}
