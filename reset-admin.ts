import { PrismaClient } from './src/generated/prisma/client.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const newPassword = 'ATI-Badulla1997313';
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const admin = await prisma.admin.findFirst();

  if (!admin) {
    const created = await prisma.admin.create({
      data: {
        username: 'admin',
        email: 'admin@nexuscore.com',
        password: hashedPassword,
        role: 'admin'
      }
    });
    console.log(`\nAdmin කෙනෙක් හමු නොවූ නිසා අලුතින් හැදුවා:`);
    console.log(`Username: ${created.username}`);
    console.log(`Password: ${newPassword}\n`);
    return;
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: hashedPassword }
  });

  console.log(`\n========================================`);
  console.log(`Password එක සාර්ථකව Update විය!`);
  console.log(`Username: ${admin.username}`);
  console.log(`Email:    ${admin.email}`);
  console.log(`Password: ${newPassword}`);
  console.log(`========================================\n`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
