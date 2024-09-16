const Contact = require('../models/contactModel');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(200).send('Message submitted successfully!');
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).send('Error submitting contact form');
  }
};
