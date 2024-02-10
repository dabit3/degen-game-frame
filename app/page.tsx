export const runtime = 'edge'

const image = "https://i.imgur.com/EF7kCQW.jpeg"
const buttonText = 'Check your number'

import { ENVIRONMENT } from '../constants'

let URL = process.env.PROD_URL

if (ENVIRONMENT === 'local') {
  URL = 'http://localhost:3001'
}

export default function Home() {
  return (
    <div>
      <img
        src={image}
        width={400}
        height={400}
        alt='Hello world.'
      />
     <div className='
      md:w-[400px]
      w-full mt-1 hover:bg-[#f1f1f1] transition rounded py-2 bg-white px-12 flex items-center w-[200px] justify-center'>
        <p className='text-black'>{buttonText}</p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const meta = {
    'fc:frame': 'vNext',
    'fc:frame:image': image,

    'fc:frame:input:text': 'Number between 1 and 100000',
    'fc:frame:button:1': buttonText,
    'fc:frame:button:1:action': 'post',
    'fc:frame:button:1:target': `${URL}/check`,

  }

  return {
    openGraph: {
      images: [
        {
          url: image,
          width: '1910',
          height: '1000'
        }
      ]
    },
    other: {
      ...meta
    },
  }
}