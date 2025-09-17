import React from "react";
import Header from "../../components/Header/Header";

const About = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <h1 className="mt-20 text-white text-3xl">About</h1>
      </div>
      <div className="flex justify-center items-center text-center">
        <p className="items-center mt-12 text-white max-w-xl">
          Welcome to <span className="text-cyan-300">Pondera</span>, your go-to
          community for questions and answers. Our mission is simple: to build a
          platform where knowledge is shared and every question finds a home. We
          believe that everyone has something valuable to contribute, and the
          best answers often come from real people with real-world experience.
          Whether you're looking for help with a complex problem, want to share
          your expertise on a specific topic, or are just curious about
          something new, <span className="text-cyan-300">Pondera</span> is the
          place to connect, learn, and grow. Join our community of curious minds
          and expert contributors. Ask anything. Answer everything.
        </p>
      </div>
    </div>
  );
};

export default About;
