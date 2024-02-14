import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { app } from "../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

export const Profile = () => {
  const fileRef = useRef(null)
  const { currentUser } = useSelector(state => state.user)
  const [image, setImage] = useState(undefined)
  const [imageError, setImageError] = useState(false)
  const [percent, setPercent] = useState(0)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  const handleFileUpload = async (image) => {
    setImageError(false)
    const storage = getStorage(app)
    const fileName = new Date().getDate() + image.name
    const storageRef = ref(storage, fileName)
    const uploadFile = uploadBytesResumable(storageRef, image)
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
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    
  }

  return (
    <div className="p-3 max-w-3xl mx-auto">      
      <h1 className="text-3xl font-semibold text-center my-7">Профиль</h1>

      <form className="flex flex-col gap-4">
        <input ref={fileRef} type="file" hidden accept="image/.*" onChange={(e) => setImage(e.target.files[0])} />
        <img src={formData.profilePicture || currentUser.profilePicture} alt="profilePicture" className="size-36 self-center rounded-full object-cover cursor-pointer" onClick={() => fileRef.current.click()} />
        <p className="text-sm self-center">
          {imageError ? <span className="text-red-700">Ошибка загрузки файла (изображение до 2мб)</span> : percent > 0 && percent < 100 ? <span className="text-slate-700">{`Загрузка ${percent} %`}</span> : percent === 100 ? <span className="text-green-700">Изображение успешно загружено</span> : ""}
        </p>

        <input defaultValue={currentUser.username} className="bg-slate-100 p-3 rounded-lg" type="text" placeholder="Никнейм" id="username" onChange={handleChange} />
        <input defaultValue={currentUser.email} className="bg-slate-100 p-3 rounded-lg" type="email" placeholder="Е-майл" id="email" onChange={handleChange} />
        <input className="bg-slate-100 p-3 rounded-lg" type="password" placeholder="Пароль" id="password" onChange={handleChange} />
        <button type="submit" className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80">Обновить</button>
      </form>

      <div className="flex justify-between my-3 px-3">
        <span className="text-red-700 cursor-pointer">Удалить аккаунт</span>
        <span className="text-red-700 cursor-pointer">Выйти</span>
      </div>
    </div>
  )
}