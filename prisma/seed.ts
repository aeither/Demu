import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      assets: {
        create: {
          title: "Check out now",
          album: "Galaxy",
          author: "X3m",
          thumb: "https://www.prisma.io/nextjs",
          url: "https://www.prisma.io/nextjs",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      assets: {
        create: {
          title: "Check out now",
          album: "Galaxy",
          author: "X3m",
          thumb: "https://www.prisma.io/nextjs",
          url: "https://www.prisma.io/nextjs",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
