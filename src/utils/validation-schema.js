import * as Yup from "yup";

const phoneRegex = /([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g;

const Required = "Zorunlu Alan";
const Min = "Parolanız 8 karakterden uzun olmalı.";
const Max = "Parolanız 20 karakterden kısa olmalı.";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Geçerli bir email giriniz.").required(Required),
  name: Yup.string().required(Required),
  userName: Yup.string().required(Required),
  password: Yup.string().min(8, Min).max(20, Max).required(Required),
  confirm: Yup.boolean().oneOf([true], Required).required(Required),
});
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Geçerli bir email giriniz.").required(Required),
  password: Yup.string().min(8, Min).max(20, Max).required(Required),
});
