import { useSelector } from "react-redux"

export const Profile = () => {
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className="p-3 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Профиль</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.profilePicture} alt="profilePicture" className="size-24 self-center rounded-full object-cover cursor-pointer" />
        <input defaultValue={currentUser.username} className="bg-slate-100 p-3 rounded-lg" type="text" placeholder="Никнейм" id="username" />
        <input defaultValue={currentUser.email} className="bg-slate-100 p-3 rounded-lg" type="email" placeholder="Е-майл" id="email" />
        <input className="bg-slate-100 p-3 rounded-lg" type="password" placeholder="Пароль" id="password" />
        <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80">Обновить</button>
      </form>
      <div className="flex justify-between my-3">
        <span className="text-red-700 cursor-pointer">Удалить аккаунт</span>
        <span className="text-red-700 cursor-pointer">Выйти</span>
      </div>
    </div>
  )
}