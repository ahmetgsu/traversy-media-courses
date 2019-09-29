if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI:
      'mongodb+srv://ahmetgsu:1234@cluster0-udfec.mongodb.net/test?retryWrites=true&w=majority'
  };
} else {
  module.exports = { mongoURI: 'mongodb://localhost/vidjot-dev' };
}
