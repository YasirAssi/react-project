import Joi from "joi";
import { validateEmailLogin } from "./logInValidation";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});
const subtitleSchema = Joi.object({
  subtitle: Joi.string().min(2).max(256).required(),
});
const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(1024).required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().min(2).max(11).required(),
});
const webSchema = Joi.object({
  web: Joi.string().min(14).allow(""),
});
const urlSchema = Joi.object({
  url: Joi.string().min(14).allow(""),
});
const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
});
const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256).allow(""),
});
const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
});
const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
});
const streetSchema = Joi.object({
  street: Joi.string().min(2).max(256).required(),
});
const houseNumberSchema = Joi.object({
  houseNumber: Joi.string().min(2).max(256).required(),
});
const zipSchema = Joi.object({
  zip: Joi.string().min(2).max(256).required(),
});

const validateTitle = (title) => titleSchema.validate(title);
const validateSubtitle = (subtitle) => subtitleSchema.validate(subtitle);
const validateDescription = (description) =>
  descriptionSchema.validate(description);
const validatePhone = (phone) => phoneSchema.validate(phone);
const validateWeb = (web) => webSchema.validate(web);
const validateUrl = (url) => urlSchema.validate(url);
const validateAlt = (alt) => altSchema.validate(alt);
const validateState = (state) => stateSchema.validate(state);
const validateCountry = (country) => countrySchema.validate(country);
const validateCity = (city) => citySchema.validate(city);
const validateStreet = (street) => streetSchema.validate(street);
const validateHouseNumber = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZip = (zip) => zipSchema.validate(zip);

const validateSchema = {
  title: validateTitle,
  subtitle: validateSubtitle,
  description: validateDescription,
  phone: validatePhone,
  email: validateEmailLogin,
  web: validateWeb,
  url: validateUrl,
  alt: validateAlt,
  state: validateState,
  country: validateCountry,
  city: validateCity,
  street: validateStreet,
  houseNumber: validateHouseNumber,
  zip: validateZip,
};

export default validateSchema;
