import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
	datasourceUrl: process.env.DATABASE_URL,
	log: [
		"error",
		"warn"
	]
});

export default prismaClient;