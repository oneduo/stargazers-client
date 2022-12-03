const people = [
  {
    name: "Mikaël Popowicz",
    imageUrl: "https://avatars.githubusercontent.com/u/5689944?v=4",
    twitter: "https://twitter.com/PopowiczM",
    github: "https://github.com/mikaelpopowicz",
  },
  {
    name: "Charaf Rezrazi",
    imageUrl: "https://avatars.githubusercontent.com/u/2086576?v=4",
    twitter: "https://twitter.com/iamcharaf",
    github: "https://github.com/rezrazi",
  },
]

export default function Team() {
  return (
    <div className="space-y-6">
      <div className="space-y-5 sm:space-y-4 w-full">
        <p className="text-center text-lg font-semibold text-zinc-600">Proudly brought to you by</p>
      </div>
      <ul role="list" className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:gap-8">
        {people.map((person) => (
          <li
            key={person.name}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 py-5 px-6 inline-flex items-center w-full gap-4"
          >
            <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
            <div className="inline-flex items-center justify-between w-full">
              <div className="text-lg font-medium leading-6">
                <h3 className="text-zinc-700 dark:text-zinc-300 text-xs">{person.name}</h3>
              </div>

              <div className="inline-flex items-center gap-2">
                <a
                  href={person.twitter}
                  target="_blank"
                  className="text-zinc-400 dark:text-zinc-600 hover:text-blue-500 dark:hover:text-blue-400"
                  rel="noreferrer"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>

                <a
                  href={person.github}
                  target="_blank"
                  className="text-zinc-400 dark:text-zinc-600 hover:text-black dark:hover:text-white"
                  rel="noreferrer"
                >
                  <span className="sr-only">Github</span>
                  <svg className="h-5 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
