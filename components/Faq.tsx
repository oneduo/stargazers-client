import { useId } from "react"

const faqs = [
  {
    question: "What is this ?",
    answer:
      "This app works by looking through your dependencies, and lists all the open source projects that you are using. You can then give stars to the projects that you like.",
  },
  {
    question: "How does it work?",
    answer:
      "Once we have parsed your dependencies, you need to login using your Github account, and we will then send stars to the projects that you have selected.",
  },
  {
    question: "How do I login?",
    answer:
      "You can login using your Github account. We do not store the token anywhere, and it is only used to send stars to the projects.",
  },
  {
    question: "What happens if I have already starred a project?",
    answer: "It's not an issue, we will process your requests and just relay them to the Github API.",
  },
  {
    question: "What kind of dependencies are supported?",
    answer:
      "Currently we support NPM and Composer dependencies. You may upload your lock files to get started. We aim to potentially support more in the future.",
  },
  {
    question: "What happens if I have a private repository?",
    answer:
      "This app aims to support open source projects. If you have a private repository, you can still use this app, but we will not be able to send stars to it.",
  },
]

export default function Faq() {
  const id = useId()

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Frequently asked questions</h2>
      <div className="mt-8">
        <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {faqs.map((faq) => (
            <div key={id} className="pt-6 pb-8 flex flex-col md:gap-8">
              <dt className="text-base font-medium text-zinc-900 dark:text-zinc-300">{faq.question}</dt>
              <dd className="mt-2 md:mt-0">
                <p className="text-base text-zinc-500">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
