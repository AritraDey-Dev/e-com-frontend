import React, { useEffect } from 'react';
import Wrapper from './styles';
import { PageHero } from '../../components';
import aboutImg from '../../assets/hero-bcg.jpeg';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'Ejae Customization | About';
  }, []);

  return (
    <main>
      <PageHero title='about' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='pic' />
        <article>
          <div className='title'>
            <h2>My Story</h2>
            <div className='underline'></div>
          </div>
          <p>
            lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            doloremque, voluptate, quia, ipsa voluptatibus, dolores, quae
            voluptas, quisquam, voluptas, doloremque, voluptate, quia, ipsa
            voluptatibus, dolores, quae voluptas, quisquam, voluptas, doloremque,
            voluptate, quia, ipsa voluptatibus, dolores, quae voluptas, quisquam,
            voluptas, doloremque, voluptate, quia, ipsa voluptatibus, dolores,
            quae voluptas, quisquam, voluptas, doloremque, voluptate, quia, ipsa
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

export default AboutPage;
