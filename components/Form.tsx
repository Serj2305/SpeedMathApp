import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { CustomButton } from './CustomButton';

export interface IData {
  name?: string
  email: string
  password: string
  repeatPassword?: string
}

interface IForm {
  onSubmit: (data: IData) => void
  type?: string
  textButton: string

}

export const Form = ({ onSubmit, type, textButton }: IForm) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<IData>();

  const password = watch('password');

  return (
    <View>
      <View style={styles.form}>
        {type === 'editProfile' && <Text style={styles.label}>Имя</Text>}
        {type === 'editProfile' &&
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="name"
            rules={{ required: 'Это обязательное поле', pattern: { value: /^\S+@\S+$/i, message: 'Введите валидную почту' } }}
          />
        }
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        <Text style={styles.label}>Почта</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: 'Это обязательное поле', pattern: { value: /^\S+@\S+$/i, message: 'Введите валидную почту' } }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Text style={styles.label}>Пароль</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
          rules={{ required: 'Это обязательное поле', minLength: { value: 5, message: 'пароль должен содержать минимум 5 символов' } }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        {(type === 'editProfile' || type === 'registration') && <Text style={styles.label}>Повторите пароль</Text>}
        {(type === 'editProfile' || type === 'registration') &&
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                secureTextEntry
              />
            )}
            name="repeatPassword"
            rules={{ 
              required: 'Это обязательное поле',
              validate: (value) =>
                value === password || 'Пароли не совпадают', // Проверка на совпадение с полем "Пароль"
            }}
          />
        }
        {errors.repeatPassword && <Text style={styles.errorText}>{errors.repeatPassword.message}</Text>}
      </View>


      <CustomButton backgroundColor='#47A76A' onPressButton={handleSubmit(onSubmit)} text={textButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    width: '80%',
    marginHorizontal: 'auto',
    marginBottom: 20
  },
  label: {
    color: '#8A8A8A',
    fontWeight: 'semibold',
    fontSize: 24,
    marginBottom: 10
  },
  input: {
    height: 50,
    fontSize: 22,
    borderColor: '#E8C7A3',
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    
    color: 'red',
    marginBottom: 10,
  },
});
