import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "./config/prisma.js";

async function seed() {
  const existing = await prisma.admin.findFirst();
  if (existing) {
    await prisma.admin.deleteMany();
    console.log("Cleared existing admins.");
  }

  const password = await bcrypt.hash("admin#12345sliate#badulla", 12);

  const admin = await prisma.admin.create({
    data: {
      username: "superadmin",
      email: "nexuscore.sliate@gmail.com",
      password,
      role: "superadmin",
    },
  });

  console.log("Admin created:", admin.email, "(password: admin#12345sliate#badulla)");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
