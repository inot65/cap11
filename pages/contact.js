import React from 'react';
import Head from 'next/head';
import ContactForm from '../components/contact/contact-form';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Pagina de contact</title>
        <meta
          name='description'
          content='Pagina de contact pentru blogul lui Toni'
        />
      </Head>
      <ContactForm />;
    </>
  );
};

export default ContactPage;
