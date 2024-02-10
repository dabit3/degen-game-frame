import { NextResponse } from 'next/server'
import { kv } from "@vercel/kv";
import { followingQuery, walletQuery } from '../api'
import { init, fetchQuery } from "@airstack/node";
import { account, walletClient, publicClient } from './config' 
import ABI from './abi.json'

// USDC contract address on Base
const contractAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"

init(process.env.AIRSTACK_KEY || '')

let image
const notFollowingImage = "https://i.imgur.com/u2cnAbH.png"
const wrongImage = "https://i.imgur.com/dWLijTi.png"
const winner = 'https://i.imgur.com/A0J2iuc.png'
const alreadyClaimed = 'https://i.imgur.com/zZGpNDe.png'

image = wrongImage

const _html = (img) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Frame</title>
    <mega property="og:image" content="${img}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${img}" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
  </head>
</html>
`

export async function POST(req) {  
  const data = await req.json()

  const { untrustedData } = data
  const { inputText, fid } = untrustedData

  const _query = followingQuery(fid)
  const { data: results } = await fetchQuery(_query, {
    id: fid
  })

  const _query2 = walletQuery(fid)
  const { data: results2 } = await fetchQuery(_query2, {
    id: fid
  })

  const socials = results2.Socials.Social
  const address = socials[0].userAssociatedAddresses[0]

  if (!results.Wallet.socialFollowers.Follower) {
    return new NextResponse(_html(notFollowingImage))
  }

  const isClaimed = await kv.get(process.env.GAME_KEY || '')

  if (isClaimed) {
    return new NextResponse(_html(alreadyClaimed))
  }
  
  if (inputText === process.env.NUMBER) {
    image = winner
    await kv.set(process.env.GAME_KEY || '', true)
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'transfer',
      account,
      args: [address, 100000000n],
    })
    await walletClient.writeContract(request)
  }

  return new NextResponse(_html(image))
}

export const dynamic = 'force-dynamic'