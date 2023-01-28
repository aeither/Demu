import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("handling...")

  const data = req.body
  const Asset = await prisma.asset.create({
    data,
  })

  res.status(200).json({
    data: Asset,
  })
}
