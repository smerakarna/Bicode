"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export default function CommentsPage() {
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [text, setText] = useState("");
    const [comments, setComments] = useState<any[]>([]);

    // Load comments
    useEffect(() => {
        const loadComments = async () => {
            const res = await fetch("/api/comments");
            if (res.ok) {
                const data = await res.json();
                setComments(data.comments || []);
            }
        };
        loadComments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newComment = {
            commenterName: name,
            topic,
            text,
            commentsDate: new Date().toISOString(),
        };

        const res = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment),
        });

        if (res.ok) {
            const data = await res.json();
            setComments([data.comment, ...comments]); // add to top
            setName("");
            setTopic("");
            setText("");
        }
    };

    const handleReport = async (id: number | string) => {
        const res = await fetch("/api/comments/report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ commentId: id }),
        });

        if (res.ok) {
            alert("User has been reported. Admin will review this.");
        } else {
            alert("Failed to report user.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Comment Form</h1>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-xl shadow">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 flex-1 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder='Topic (ex: "Math - Linear Equations")'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="border p-2 flex-1 rounded"
                        required
                    />
                </div>

                <textarea
                    placeholder="Write your question or answer here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border p-2 w-full rounded"
                    rows={4}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>

            {/* Comments List */}
            <div className="mt-6 space-y-4">
                {comments.map((c) => (
                    <div
                        key={c.id || c.commentsDate}
                        className="border p-3 rounded shadow-sm bg-gray-50"
                    >
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>
                                <strong>{c.commenterName}</strong> on <em>{c.topic}</em>
                            </span>
                            <span>{formatDistanceToNow(new Date(c.commentsDate))} ago</span>
                        </div>
                        <p className="mt-2">{c.text}</p>
                        <button
                            onClick={() => handleReport(c.id || c.commentsDate)}
                            className="mt-2 text-red-600 text-sm underline hover:text-red-800"
                        >
                            Report User
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

