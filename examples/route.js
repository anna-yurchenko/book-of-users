router.post('/register', async (req, res) => {
    try {
      // do coding here
    } catch (err) {
        // your methods throw an error and catch it here
      return res.status(err.status || 500).json(err);
    }
  });