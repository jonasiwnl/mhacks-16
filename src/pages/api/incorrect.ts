import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/db";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data = JSON.parse(req.body);
    const email = data.email;

    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    await prisma.user.update({
        where: { email: email },
        data: {
            streak: 0,
        },
    });

    res.status(200).end();
}
