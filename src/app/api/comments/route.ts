import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/client";
import { ObjectId } from "mongodb";

// ✅ GET all comments
export const GET = async () => {
    const { db } = await connect();

    try {
        const commentsCollection = db.collection("comments");
        const comments = await commentsCollection.find({}).sort({ _id: -1 }).toArray();

        return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
};

// ✅ POST new comment
export const POST = async (request: NextRequest) => {
    const { db } = await connect();

    try {
        const { commenterName, commentsDate, text, topic } = await request.json();

        if (!commenterName || !commentsDate || !text || !topic) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        const commentsCollection = db.collection("comments");

        const newComment = {
            commenterName,
            commentsDate: new Date(commentsDate),
            text,
            topic,
        };

        const result = await commentsCollection.insertOne(newComment);

        return NextResponse.json(
            {
                message: "Comment added!",
                comment: { _id: result.insertedId, ...newComment },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
};
