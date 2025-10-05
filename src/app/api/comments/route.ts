import { NextResponse } from "next/server";
import { db } from "@/db/client"; // your drizzle db instance
import { commentsTable } from "@/db/schema";

// ✅ GET all comments
export async function GET() {
    try {
        const comments = await db.select().from(commentsTable);
        return NextResponse.json({ comments });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

// ✅ POST new comment
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { commenterName, commentsDate, text, topic } = body;

        if (!commenterName || !commentsDate || !text || !topic) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        const result = await db
            .insert(commentsTable)
            .values({
                commenterName,
                commentsDate,
                text,
                topic,
            })
            .returning();

        return NextResponse.json({ message: "Comment added!", comment: result[0] });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

