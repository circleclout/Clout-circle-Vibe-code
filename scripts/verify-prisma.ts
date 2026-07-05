import 'dotenv/config'
import { prisma } from '../lib/prisma'

async function main() {
  const users = await prisma.user.findMany()
  console.log('✅ Connected. Found users:', users.length)
}

main()
  .catch((e) => {
    console.error('❌ Failed to connect:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
