import joi from 'joi';

const bookSchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  author: joi.string().min(3).max(50).required(),
  price: joi.number().positive().required()
});

export { bookSchema };