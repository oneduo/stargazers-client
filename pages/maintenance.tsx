export default function Example() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-xs font-semibold text-emerald-500 uppercase">Maintenance</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
          We are running some maintenance on the app
        </h1>
        <p className="mt-2 text-lg font-medium text-zinc-800 dark:text-zinc-400">Please come back in a few minutes</p>
        <div className="mt-6">
          <a
            href="https://twitter.com/iamcharaf"
            className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
          >
            Follow us on Twitter for updates
          </a>
        </div>
      </div>
    </main>
  )
}
