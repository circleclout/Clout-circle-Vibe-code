import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

async function main() {
  const hashedPassword = await bcrypt.hash('Admin123!', 10)

  const user = await prisma.user.upsert({
    where: { email: 'circleclout@gmail.com' },
    update: {
      password: hashedPassword,
      role: 'admin'
    },
    create: {
      email: 'circleclout@gmail.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('Seeded Admin User:', user.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
