const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    req.body = validated.body;
    if (validated.params) {
      Object.assign(req.params, validated.params);
    }
    if (validated.query) {
      Object.assign(req.query, validated.params);
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      error: err.issues[0].message,
    });
  }
};

export default validate;
