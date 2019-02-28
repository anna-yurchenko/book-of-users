router.post('/register', async (req, res) => {
    try {
      // you put your code here
      // call the file, do some data staff
      // return res.json() with information
    } catch (err) {
        // how you can return an error
        // your methods throw error and then you catch it here to res
      return res.status(err.status || 500).json(err);
    }
  });