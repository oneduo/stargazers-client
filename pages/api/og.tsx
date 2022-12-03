import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"
import client from "@/utils/apollo"
import { Package, Stargazer } from "@/generated/graphql"
import SESSION_QUERY from "@/graphql/session"
import { captureException } from "@sentry/core"

export const config = {
  runtime: "experimental-edge",
}

const getSession = async (session: string | null) => {
  if (!session) {
    return undefined
  }

  try {
    const { data } = await client.query<{ session: { stargazer?: Stargazer; packages: Package[] } }>({
      query: SESSION_QUERY,
      variables: {
        session: session,
      },
    })

    return data
  } catch (e) {
    captureException(e)

    return undefined
  }
}

export default async function og(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const session = searchParams.get("session")

    const data = await getSession(session)

    if (data === undefined) {
      return new Response(`Failed to generate the image`, {
        status: 500,
      })
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url("${process.env.NEXT_PUBLIC_APP_URL}/og.png")`,
            backgroundSize: "1200px 630px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div tw="text-white flex flex-row text-4xl pl-[103px] pt-[299px]">
            I have just starred <span tw="ml-1 text-yellow-400 font-black">{data.session.packages?.length}</span>
            <span tw="mx-1 font-bold">projects</span> on Github !
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
      },
    )
  } catch (e) {
    captureException(e)

    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
