// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function Books(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({hello: 'hello wolrd : ) '})
}