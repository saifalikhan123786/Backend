const asyncHandlers = (requestHandlers) => {
  return (req, res, next) => {
    Promise.resolve(requestHandlers(req, res, next))
      .catch(next); // error ko directly next() me forward kar rahe
  };
};

export { asyncHandlers };

