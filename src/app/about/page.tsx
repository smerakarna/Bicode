// app/about/page.tsx (Next.js 13+ with App Router)
// or pages/about.tsx (if using Pages Router)

import React from "react";
import Link from "next/link";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">About Bicode</h1>
        <nav className="mt-2 space-x-4">
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
          <Link href="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Who We Are</h2>
          <p>
            Bicode is dedicated to making studying for tests, and learning subjects
            that may not be taught in middle school.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h2>
          <p>
            Our mission is to get students to feel confident in their academics, as
            well as have them develop passions, in which they can later elaborate on.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Why Bicode?</h2>
          <p>
            We believe learning should be fun, and student-to-student based every once
            in a while. Our curriculum is sduhsd district-based, making studying for many
            subjects easier.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;

