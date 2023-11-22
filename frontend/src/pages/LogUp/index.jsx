import React, { useState, useCallback } from 'react';
import './style.css'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement, Button, Link, useToast } from '@chakra-ui/react';

import { LogUpFunc } from '../../services/users';

import axios from 'axios';

export default function LogUp() {
  const toast = useToast();
  const navigate = useNavigate();

  const createUserFormSchema = z.object(
    {
      username: z.string()
        .nonempty('Este campo é obrigatório')
        .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, 'O nome não pode conter números e símbolos'),

      name: z.string()
        .nonempty('Este campo é obrigatório')
        .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, 'O nome não pode conter números e símbolos')
        .transform(name => {
          return name[0].toLocaleUpperCase().concat(name.substring(1))
        }),

      // last_name: z.string()
      //   .nonempty('Este campo é obrigatório')
      //   .regex(/^[^0-9]*$/, 'O nome não pode conter números')
      //   .transform(last_name => {
      //     return last_name[0].toLocaleUpperCase().concat(last_name.substring(1))
      //   }),


      email: z.string()
        .nonempty('Este campo é obrigatório')
        .email('Formato de email inválido')
        .toLowerCase(),

      password: z.string()
        .nonempty('Este campo é obrigatório')
        .min(6, 'Mínimo de 6 caracteres'),

      phone: z.string()
        .nonempty('Este campo é obrigatório')
        .min(10, 'Mínimo de 10 caracteres')
        .max(11, 'Máximo de 11 caracteres')
        .regex(/^[0-9]+$/, 'O telefone só pode conter números'),
      
    }
  )

  const [visible, setVisible] = useState(false)

  const handleVisibleChange = useCallback(() => {
    setVisible((prevState) => !prevState);
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(
    {
      resolver: zodResolver(createUserFormSchema)
    }
  )

  const onSubmit = (data) => {
    LogUpFunc(data, toast, navigate)
  }

  return (

    <main>

      <form className='formUp' onSubmit={handleSubmit(onSubmit)}>

        <div>

          <label style={{ color: '#D5DDDF' }} htmlFor='name'>Nome</label>
          <br></br>

          <Input
            type="text"
            style={{ color: '#D5DDDF' }}
            id='name'
            name='name'
            {...register('name')}
            htmlSize={27}
            width='auto'
          />

          {errors.name && <span className='error'>{errors.name.message} </span>}

        </div>

        {/* <div>

          <label style={{ color: '#D5DDDF' }} htmlFor="last_name">Sobrenome</label>
          <br></br>

          <Input
            type="text"
            style={{ color: '#D5DDDF' }}
            id='last_name'
            name='last_name'
            {...register('last_name')}
            htmlSize={27}
            width='auto'
          />

          {errors.last_name && <span className='error'>{errors.last_name.message} </span>}

        </div> */}

        <div>

          <label style={{ color: '#D5DDDF' }} htmlFor="username">Username</label>
          <br></br>

          <Input
            type="text"
            style={{ color: '#D5DDDF' }}
            id='username'
            name='username'
            {...register('username')}
            htmlSize={27}
            width='auto'
          />

          {errors.username && <span className='error'>{errors.username.message} </span>}

        </div>

        <div>

          <label style={{ color: '#D5DDDF' }} htmlFor="email">E-mail</label>
          <br></br>

          <Input
            type="email"
            style={{ color: '#D5DDDF' }}
            id='email'
            name='email'
            {...register('email')}
            htmlSize={27}
            width='auto'
          />

          {errors.email && <span className='error'>{errors.email.message}</span>}

        </div>

        <div>

          <label style={{ color: '#D5DDDF' }} htmlFor="password">Senha</label>

          <br></br>

          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              style={{ color: '#D5DDDF' }}
              type={visible ? 'text' : 'password'}
              id='password'
              name='password'
              {...register('password')}
            />

            <InputRightElement style={{ marginRight: '0.5rem' }} width='2.5rem' onClick={handleVisibleChange}>
              {visible ? <ViewIcon color='#6F9951' /> : <ViewOffIcon color='#6F9951' />}
            </InputRightElement>
          </InputGroup>

          {errors.password && <span className='error'>{errors.password.message} </span>}

        </div>

        <div>
            
            <label style={{ color: '#D5DDDF' }} htmlFor="phone">Telefone</label>
            <br></br>
  
            <Input
              type="text"
              style={{ color: '#D5DDDF' }}
              id='phone'
              name='phone'
              {...register('phone')}
              htmlSize={27}
              width='auto'
            />
  
            {errors.phone && <span className='error'>{errors.phone.message} </span>}
          
        </div>

        <Button type="submit" className='submit-button' variant='solid' size="md">Registrar</Button>

        <Link href="/" color='blue.500'>Já tem uma conta&#63;</Link>

      </form>

    </main>

  )

}
