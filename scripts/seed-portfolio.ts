import 'dotenv/config'
import { prisma } from '../lib/prisma'
import portfolio from '../content/portfolio.js'

async function main() {
  console.log(`Start seeding portfolio items...`)
  
  for (const item of portfolio) {
    const p = await prisma.portfolioItem.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        client: item.client,
        category: item.category,
        description: item.description,
        results: item.results,
        tags: item.tags,
        image: item.image,
        featured: item.featured,
      },
      create: {
        id: item.id,
        title: item.title,
        client: item.client,
        category: item.category,
        description: item.description,
        results: item.results,
        tags: item.tags,
        image: item.image,
        featured: item.featured,
      },
    })
    console.log(`Upserted portfolio item: ${p.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
