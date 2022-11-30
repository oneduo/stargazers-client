const faqs = [
  {
    id: 1,
    question: "How does it work?",
    answer:
      "This app works by looking through your dependencies, and lists all the open source projects that you are using. You can then give stars to the projects that you like. You can also see the projects that you have starred, and remove them from the list if you want to.",
  },
  {
    id: 2,
    question: "How does it work?",
    answer:
      "This app works by looking through your dependencies, and lists all the open source projects that you are using. You can then give stars to the projects that you like. You can also see the projects that you have starred, and remove them from the list if you want to.",
  },
]

export default function Faq() {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
        Frequently asked questions
      </h2>
      <div className="mt-8">
        <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {faqs.map((faq) => (
            <div key={faq.id} className="pt-6 pb-8 flex flex-col md:gap-8">
              <dt className="text-base font-medium text-gray-900 dark:text-zinc-300">
                {faq.question}
              </dt>
              <dd className="mt-2 md:mt-0">
                <p className="text-base text-gray-500">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
