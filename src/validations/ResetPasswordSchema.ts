import * as Yup from 'yup';

const schema = Yup.object().shape({
  password: Yup.string().min(6, 'Preencha ao menos 6 caracteres.'),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Confirmação de senha inválida',
  ),
});

export default schema;
