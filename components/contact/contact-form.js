import React, {useState, useEffect} from 'react';
import Notification from '../ui/notification';

import classes from './contact-form.module.css';

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); // null, pending, succes or error
  const [requestError, setRequestError] = useState();
  // functie de tratat raspunsul la fetch()
  const sendContactData = async (contactDetails) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Ceva a mers prost...');
    }
  };

  // handler pt submit din form
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    // console.log(enteredEmail, enteredName, enteredMessage);

    // optional: add client-side validation

    try {
      //   console.log('Mesajul a fost trimis la /api/contact ...');
      setRequestStatus('pending');

      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });

      setRequestStatus('success');
      // sterg datele trimise din formular
      setEnteredEmail('');
      setEnteredName('');
      setEnteredMessage('');
    } catch (error) {
      console.log('Ceva a mers prost...', error.message);
      setRequestError(error.message);
      setRequestStatus('error');
    }
  };

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Transmit mesajul...',
      message: 'Mesajul dvs. se transmite!',
    };
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Succes!',
      message: 'Mesajul dvs. a fost transmis cu succes!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  return (
    <section className={classes.contact}>
      <h1>Cum te pot ajuta ?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Email-ul tau</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Numele tau</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='message'>Mesajul tau</label>
            <textarea
              id='message'
              rows='5'
              value={enteredMessage}
              onChange={(e) => setEnteredMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={classes.actions}>
          <button>Trimite mesajul</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
};

export default ContactForm;
