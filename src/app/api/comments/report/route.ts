import { NextResponse } from "next/server";

// For now, just log the report.
// Later, you can create a `reportsTable` in drizzle and insert into it.
export async function POST(req: Request) {
    try {
        const { commentId } = await req.json();

        if (!commentId) {
            return NextResponse.json({ error: "No comment ID provided." }, { status: 400 });
        }

        console.log("🚨 Reported Comment ID:", commentId);

        return NextResponse.json({ message: "Report received." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to process report." }, { status: 500 });
    }
}
