
import React, { Suspense } from 'react';
import Banner from '../Component/Banner';
import HomeAi from '../Component/HomeAi';
import AboutAi from '../Component/AboutAi';
import Register from '../Component/Register';
import Loader from '../Component/Loader';


const Home = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Banner />
      <section className="my-14">
 
         <HomeAi />
        
      </section>
      <section className="my-14">
        <AboutAi />
      </section>
      <section className="my-14">
        <Register />
      </section>
    </div>
  );
};

export default Home;
