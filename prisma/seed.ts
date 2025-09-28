import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("AdminPassword123!", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Owner",
      email: "admin@example.com",
      password: hashed,
      role: "admin",
    },
  });
}

main().finally(() => prisma.$disconnect());
