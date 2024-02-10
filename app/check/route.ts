import { NextResponse } from 'next/server'

let image
const notFollowingImage = "https://i.imgur.com/J3NuYcL.png"
const wrongImage = "https://i.imgur.com/dWLijTi.png"
const winner = 'https://i.imgur.com/A0J2iuc.png'

image = notFollowingImage

const notFollowing = `
<!DOCTYPE html>
<html>
  <head>
    <title>Frame</title>
    <mega property="og:image" content="${image}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${image}" />
  </head>
</html>
`

export async function POST(req) {
  const data = await req.json()

  console.log(data)

  return new NextResponse(notFollowing)
}

export const dynamic = 'force-dynamic'