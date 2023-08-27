import {MongoClient} from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {email, name, message} = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({message: 'Invalid inputs.'});
      return;
    }

    // stochez mesajul intr-o baza de date
    const newMessage = {
      email,
      name,
      message,
    };

    // setez stringul de conectare
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ichoahu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    // const uri =
    //   'mongodb+srv://toni:qv97Zd7Kj0iscr0P@cluster0.ichoahu.mongodb.net/my-site?retryWrites=true&w=majority';
    // Create a new MongoClient
    let client;
    try {
      client = await new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      res.status(502).json({
        message: 'Nu ma pot conecta la baza de date',
        error: error.message,
      });
      return;
    }

    try {
      const db = client.db();
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
      res.status(201).json({
        message: 'Inserarea a fost facuta.',
        mesaj: newMessage,
      });
    } catch (error) {
      client.close();
      res.status(501).json({
        message: 'Nu pot face adaugarea mesajului.',
        error: error.message,
      });
      return;
    }
  }
};

export default handler;
