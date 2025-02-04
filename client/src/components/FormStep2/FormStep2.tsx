import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStep2.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFormStep2Data } from '../../redux/formSlice';

function FormStep2 () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workplace, address, categories } = useAppSelector((state) => state.form);

  const [formData, setFormData] = useState({ workplace, address });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFormStep2Data(formData));
    navigate('/step-3');
  };

  const handleBack = () => {
    dispatch(setFormStep2Data(formData));
    navigate('/step-1');
  };

  return (
    <div className="container">
      <h1> Шаг №2</h1>
      <form className="form-step2" onSubmit={handleSubmit}>
        <div className="form__group">
          <select
            id="workplace"
            className="form__field"
            name="workplace"
            value={formData.workplace || workplace}
            onChange={handleChange}
            required
            autoComplete="off"
          >
            <option value="" disabled >
              Выберите место работы
            </option>
            {categories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="form__label" htmlFor="workplace">
            Место работы
          </label>
        </div>

        <div className="form__group">
          <input
            type="text"
            className="form__field"
            placeholder="Адрес"
            name="address"
            value={formData.address}
            onChange={handleChange}
            autoComplete='off'
          />
          <label className="form__label">Адрес</label>
        </div>

        <div className="form-step2__buttons">
          <button
            className="form-step2__button"
            type="button"
            onClick={handleBack}
          >
            Назад
          </button>
          <button
            className="form-step2__button"
            type="submit"
            disabled={!formData.workplace || !formData.address}
          >
            Далее
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep2;
