export const validate = (schema) => async (req, res, next) => {
  try {
    const dataToValidate = {
      ...req.body,
      ...(req.file && { image: req.file }),
    };

    const parsedData = await schema.parseAsync(dataToValidate);
    req.body = parsedData;
    next();
  } catch (err) {

    let message = "Validation error";

    if (err.name === "ZodError" && Array.isArray(err.issues)) {
      // get first error message
      message = err.issues[0]?.message || message;
    }

    next({ status: 422, message });
  }
};
