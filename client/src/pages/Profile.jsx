import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { app } from "../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import {
  updateInStart,
  updateInSuccess,
  updateInFailure,
  signOut,
  deleteInSuccess,
  deleteInFailure,
  deleteInStart,
} from "../redux/user/userSlice"

export const Profile = () => {
  const dispatch = useDispatch()
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const [image, setImage] = useState(undefined)
  const [imageError, setImageError] = useState(false)
  const [percent, setPercent] = useState(0)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  const handleFileUpload = async (image) => {
    setImageError(false)
    const storage = getStorage(app)
    const storageRef = ref(storage)
    const imagesRef = ref(storageRef, "images")
    const fileName = new Date().getDate() + image.name
    const fullRef = ref(imagesRef, fileName)
    const uploadFile = uploadBytesResumable(fullRef, image)
    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setPercent(Math.round(progress))
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL })
        })
      },
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateInStart())
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success === false) {
        dispatch(updateInFailure(data))
        return
      }
      dispatch(updateInSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateInFailure(error))
    }
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteInStart())
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success == false) {
        return dispatch(deleteInFailure(data))
      }
      dispatch(deleteInSuccess())
    } catch (error) {
      dispatch(deleteInFailure(error))
    }
  }

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" })
      dispatch(signOut())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Профиль</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input ref={fileRef} type="file" hidden accept="image/.*" onChange={(e) => setImage(e.target.files[0])} />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profilePicture"
          className="size-36 self-center rounded-full object-cover cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Ошибка загрузки файла (изображение до 2мб)</span>
          ) : percent > 0 && percent < 100 ? (
            <span className="text-slate-700">{`Загрузка ${percent} %`}</span>
          ) : percent === 100 ? (
            <span className="text-green-700">Изображение успешно загружено</span>
          ) : (
            ""
          )}
        </p>

        <input
          defaultValue={currentUser.username}
          className="bg-slate-100 p-3 rounded-lg"
          type="text"
          placeholder="Никнейм"
          id="username"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          className="bg-slate-100 p-3 rounded-lg"
          type="email"
          placeholder="Е-майл"
          id="email"
          onChange={handleChange}
        />
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="password"
          placeholder="Пароль"
          id="password"
          onChange={handleChange}
        />
        <button type="submit" className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80">
          Обновить
        </button>
      </form>

      <div className="flex justify-between my-3 px-3">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>
          Удалить аккаунт
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Выйти
        </span>
      </div>
      <p className="text-green-700 mt-5">{updateSuccess && "Профиль успешно обновлен!"}</p>
    </div>
  )
}
