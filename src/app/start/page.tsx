"use client";

import React from "react";
import Link from "next/link";
import Header from "./Header";
import { protectedRoute } from "@/protectedRoute";

const StartPage: React.FC = protectedRoute(() => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Getting Help
          </h2>
          <p>
            If you’re new, don’t worry — we’ve got you covered! Explore our
            guides, FAQs, and reach out to support whenever you need assistance.
            We’re here to help you succeed.
          </p>
          <Link
            href="/help"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Visit Help Center
          </Link>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Course Files
          </h2>
          <p>
            Access the resources you need for your classes. Browse notes,
            exercises, and practice tests designed to boost your confidence.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Link
              href="https://drive.google.com/drive/folders/1yr9rxjgxWupMhfVm333vNiDYwtdHOWYt?usp=sharing"
              className="block p-4 bg-gray-100 border rounded-md hover:shadow-md transition"
            >
              📘 Math Resources
            </Link>
            <Link
              href="https://drive.google.com/drive/folders/1lpg2N4iOZeLPESccuSyYqeCXsE7djjGS?usp=sharing"
              className="block p-4 bg-gray-100 border rounded-md hover:shadow-md transition"
            >
              🔬 Science Resources
            </Link>
            <Link
              href="https://drive.google.com/drive/folders/1JQ-R92Dc7-kF-l5ystytrpu6xNMYksMg?usp=sharing"
              className="block p-4 bg-gray-100 border rounded-md hover:shadow-md transition"
            >
              ✍️ English Resources
            </Link>
            <Link
              href="https://drive.google.com/drive/folders/1-V2VpXxyVoa3UAw1eJOyWLSmHP4SRciG?usp=sharing"
              className="block p-4 bg-gray-100 border rounded-md hover:shadow-md transition"
            >
              📜 History Resources
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Next Steps
          </h2>
          <p>
            Ready to dive in? Pick a subject and start learning at your own
            pace. Keep track of your progress and don’t forget to have fun while
            studying!
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Bicode. All rights reserved.</p>
      </footer>
    </div>
  );
});

export default StartPage;
