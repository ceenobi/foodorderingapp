import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

type Data = {
  success: boolean
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse<Data>
) {
  const {
    query: { reference },
  } = req

  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY}`,
        },
      }
    )
    const data : any = await res.json()
    resp.status(200).json({ success: true, data: data.data })
  } catch (error) {
    resp.status(400).json({ success: false })
  }
}
