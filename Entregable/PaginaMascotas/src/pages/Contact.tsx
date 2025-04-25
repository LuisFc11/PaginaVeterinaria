function Contact() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4" id="contact">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Contáctanos
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          ¿Tienes dudas? Escríbenos y te responderemos pronto.
        </p>
        <form className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Tu correo"
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Tu mensaje"
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
