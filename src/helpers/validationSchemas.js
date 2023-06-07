import * as yup from 'yup'

export const registerValidationSchema = yup
  .object({
    login: yup
      .string()
      .min(3, 'Login should have at least 3 characters')
      .matches(
        /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
        'Only letters can be accepted'
      )
      .max(32, 'Name should be up to 32 characters long')
      .required('Login is required'),
    email: yup
      .string()
      .email()
      .required('Email is required')
      .min(5, 'Email should be at least 5 characters long')
      .max(63, 'Email should be up to 63 characters long'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
        '6 characters, 1 uppercase, 1 lowercase, 1 number'
      )
      .min(6, 'Password should be at least 6 characters long')
      .max(32, 'Password should be up to 32 characters long')
      .required('Password is required'),
  })
  .required()

export const loginValidationSchema = yup
  .object({
    email: yup
      .string()
      .email('Enter a valid email address, e.g: "mail@mail.com"')
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Enter a valid email address, e.g: "mail@mail.com"'
      )
      .required('Email is required')
      .min(5, 'Email should be at least 5 characters long')
      .max(63, 'Email should be up to 63 characters long'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
        '6 characters, 1 uppercase, 1 lowercase, 1 number'
      )
      .min(6, 'Password should be at least 6 characters long')
      .max(32, 'Password should be up to 32 characters long')
      .required('Password is required'),
  })
  .required()

export const addPostValidationSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    location: yup
      .string()
      .min(3, 'Location should have at least 3 characters')
      .required('Location is required'),
  })
  .required()
