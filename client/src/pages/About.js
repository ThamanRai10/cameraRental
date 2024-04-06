import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Ecommerece"}>
      <div className="bg-gray-100 min-h-screen">
        <header className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
              arcu at mi scelerisque consequat. Sed in eros facilisis,
              sollicitudin neque nec, mattis quam. Suspendisse potenti. In
              malesuada risus quis metus faucibus, vitae tristique tellus
              feugiat. Vestibulum auctor sem vel ex ullamcorper, et suscipit ex
              vehicula. Aenean id cursus lectus.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Phasellus nec dignissim sem. Aenean elementum libero a elit
              consectetur, ut rhoncus metus interdum. Cras sagittis scelerisque
              purus, ac eleifend enim faucibus vitae. Pellentesque congue, nunc
              et congue rutrum, elit dui ultrices justo, in commodo enim urna at
              urna. Curabitur sed mauris dui. Mauris eget luctus nunc. Nullam
              mattis cursus metus, ut venenatis mi suscipit vel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-4">
                <img
                  src="/team-member1.jpg"
                  alt="Team Member 1"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-gray-700">Co-Founder & CEO</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <img
                  src="/team-member2.jpg"
                  alt="Team Member 2"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <p className="text-gray-700">Co-Founder & CTO</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <img
                  src="/team-member3.jpg"
                  alt="Team Member 3"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">Mike Johnson</h3>
                <p className="text-gray-700">Marketing Director</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default About;
