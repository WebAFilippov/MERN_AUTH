export const About = () => {
  return (
    <div className="px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">О приложении</h1>
      <p className="mb-4 text-slate-700">
      Это приложение, которое работает с помощью MongoDB, Express, React и Node.js. Оно позволяет людям регистрироваться, входить и выходить из системы. Доступ к некоторым страницам могут получить только те, кто прошёл проверку.
      </p>
      <p className="mb-4 text-slate-700">
      Интерфейс приложения сделан с помощью React и React Router. Серверная часть работает на Node.js и Express, а база данных — MongoDB. Чтобы подтвердить личность, используются веб-токены JSON (JWT).
      </p>
    </div>
  )
}
