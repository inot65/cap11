import React from 'react';
import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/max.png'
          alt='Imaginea lui Toni'
          width={300}
          height={300}
        />
      </div>
      <h1>Salut, eu sunt Ion</h1>
      <p>
        Public articole despre dezvoltarea web - in special despre framework-uri
        pentru frontend cum ar fi React, Solid, Vue, Preact
      </p>
    </section>
  );
};

export default Hero;
