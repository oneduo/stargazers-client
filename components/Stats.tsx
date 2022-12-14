interface Props {
  projects: number
  stars: number
  users: number
}

export default function Stats({ projects, stars, users }: Props) {
  return (
    <div className="pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            The story so far
          </h2>
          <p className="mt-3 text-xl text-zinc-500 sm:mt-4">Numbers, statistics and other fun facts about the app.</p>
        </div>
      </div>
      <div className="mt-10 pb-12 sm:pb-16">
        <dl className="rounded-lg shadow-lg sm:grid sm:grid-cols-3 border border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col border-b border-zinc-100 dark:border-zinc-800 p-6 text-center sm:border-0 sm:border-r">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-zinc-500">unique projects starred</dt>
            <dd className="order-1 text-5xl font-bold tracking-tight text-emerald-400">{projects}</dd>
          </div>
          <div className="flex flex-col border-t border-b border-zinc-100 dark:border-zinc-800 p-6 text-center sm:border-0 sm:border-r">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-zinc-500">total stars given</dt>
            <dd className="order-1 text-5xl font-bold tracking-tight text-emerald-400">{stars}</dd>
          </div>
          <div className="flex flex-col border-t border-zinc-100 dark:border-zinc-800 p-6 text-center sm:border-0">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-zinc-500">total users</dt>
            <dd className="order-1 text-5xl font-bold tracking-tight text-emerald-400">{users}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
