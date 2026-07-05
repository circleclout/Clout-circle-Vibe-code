import 'dotenv/config'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

async function changePassword() {
  const args = process.argv.slice(2)
  if (args.length !== 2) {
    console.error('Usage: npx tsx scripts/change-password.ts <email> <new_password>')
    process.exit(1)
  }

  const email = args[0]
  const newPassword = args[1]

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })

    console.log(`Successfully updated password for ${updatedUser.email}`)
  } catch (error) {
    console.error('Failed to update password. Make sure the user exists.')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

changePassword()
