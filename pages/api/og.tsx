import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"
import { captureException } from "@sentry/core"
import type { Session } from "@/generated/graphql"

export const config = {
  runtime: "experimental-edge",
}

const font = fetch(new URL("../../assets/inter.ttf", import.meta.url)).then((res) => res.arrayBuffer())

const getSession = async (session: string | null) => {
  if (!session) {
    return undefined
  }

  try {
    const response = await fetch(`${process.env.API}/session/${session}`, {
      headers: {
        "x-vercel-edge": process.env.EDGE_TOKEN,
      },
    })

    const data: Session = await response.json()

    return data
  } catch (e) {
    captureException(e)

    return undefined
  }
}

export default async function og(req: NextRequest) {
  const fontData = await font

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
            fontFamily: '"Inter"',
          }}
        >
          <div tw="text-white flex flex-row text-4xl pl-[103px] pt-[299px]">
            I have just starred{" "}
            <span tw="ml-1 text-yellow-400 font-black" style={{ fontWeight: "bold" }}>
              {data.packages?.length}
            </span>
            <span tw="ml-1 mr-2 font-bold">projects</span> on Github !
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
          },
        ],
      },
    )
  } catch (e) {
    captureException(e)

    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
