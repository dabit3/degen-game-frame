import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'

function ComponentOG() {
  return (
    <div
      style={{
        fontSize: 128,
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Hello world!
    </div>
  )
}

export async function GET() {
  return new ImageResponse(
    <ComponentOG />,
    {
      width: 1200,
      height: 600,
    }
  )
}