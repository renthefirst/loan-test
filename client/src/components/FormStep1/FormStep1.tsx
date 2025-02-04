import React, { FormEvent, useState } from 'react';
import { setFormStep1Data } from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './FormStep1.scss';
import { useNavigate } from 'react-router-dom';

const phoneRegex =
  /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

function FormStep1() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, phone, gender } = useAppSelector(
    (state) => state.form
  );

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    phone,
    gender,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'phone' && !phoneRegex.test(e.target.value)) {
      setError('Введите правильный номер телефона');
    } else {
      setError(null);
    }
  };

  const isDataValid = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.gender
    ) {
      setError('Пожалуйста, заполните все поля!');
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      setError('Введите правильный номер телефона: 8 (XXX) XXX-XX-XX');
      return false;
    }

    return true;
  };

  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDataValid()) return;
    dispatch(setFormStep1Data(formData));
    navigate('/step-2');
  };

  return (
    <div className="container">
      <h1>Шаг №1</h1>
      <form className="form-step1" onSubmit={handleNext}>
        <label htmlFor="firstName">Имя</label>
        <input
          className="form-step1__input"
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Введите имя"
          autoComplete="off"
        />

        <label htmlFor="lastName">Фамилия</label>
        <input
          className="form-step1__input"
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Введите фамилию"
          autoComplete="off"
        />

        <label htmlFor="phone">Телефон</label>
        <input
          className="form-step1__input"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Укажите ваш телефон"
          autoComplete="off"
        />

        <label htmlFor="gender">Пол</label>
        <select
          className="form-step1__select"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="" disabled>
            Выберите пол
          </option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>

        {error && <p className="form-step1__error">{error}</p>}

        <button className="form-step1__button" type="submit" disabled={!!error}>
          Далее
        </button>
      </form>
    </div>
  );
}

export default FormStep1;
