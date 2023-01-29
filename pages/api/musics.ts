import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("handling...")

  const { id } = req.query
  const Assets = await prisma.asset.findMany({ where: { userId: String(id) } })

  res.status(200).json({
    data: Assets,
  })
}
