export const Home = () => {
  return (
    <div className="px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">Добро пожаловать в мое приложение для авторизации!</h1>
      <p className="mb-4 text-slate-700">
        Это полнофункциональное веб-приложение, созданное с использованием стека MEAN (MongoDB, Express, React,
        Node.js). Оно включает функции аутентификации, которые позволяют пользователям регистрироваться, входить в
        систему и выходить из системы, и предоставляет доступ к защищенным маршрутам только для прошедших проверку
        подлинности пользователей.
      </p>
      <p className="mb-4 text-slate-700">
        Интерфейс приложения построен с помощью React и использует React Router для маршрутизации на стороне клиента.
        Серверная часть построена с помощью Node.js и Express и использует MongoDB в качестве базы данных.
        Аутентификация реализована с использованием веб-токенов JSON (JWT).
      </p>
      <p className="mb-4 text-slate-700">
        Это приложение предназначено в качестве отправной точки для создания полнофункциональных веб-приложений с
        аутентификацией с использованием стека MERN. Не стесняйтесь использовать его в качестве шаблона для своих
        собственных проектов!
      </p>
    </div>
  )
}
