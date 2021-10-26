const customResponses = (function () {
  return function (req, res, next) {
    res.ok = data => res.status(200).json(data);
    res.unauthorized = (message = null) =>
      res.status(401).json({ errors : [{ message }] });
    return next();
  };
}());

export default customResponses;
