import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'Preencha ao menos 6 caracteres.'),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Confirmação de senha inválida',
  ),
  phone: Yup.string().optional(),
});

export default schema;
