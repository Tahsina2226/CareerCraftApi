import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "tahsina@gmail.com";
  const plainPassword = "tahsina123456";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword }, 
    create: {
      name: "Owner",
      email,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
