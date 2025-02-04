import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { resetFormData, setFormStep3Data } from '../../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import './FormStep3.scss';

function FormStep3() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, loanAmount, loanTerm } = useAppSelector(
    (state) => state.form
  );
  const [formData, setFormData] = useState({ loanAmount, loanTerm });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${firstName} ${lastName}`,
        }),
      });
      if (!response.ok) throw new Error('Ошибка запроса');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    dispatch(setFormStep3Data(formData));
    navigate('/step-2');
  };

  const handleFinish = () => {
    dispatch(resetFormData());
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Шаг №3</h1>
      <form className="form-step3" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="loanAmount">
            Сумма займа: ${formData.loanAmount}
          </label>
          <input
            id="loanAmount"
            type="range"
            name="loanAmount"
            min="200"
            max="1000"
            step="100"
            value={formData.loanAmount}
            onChange={handleChange}
            className="form__slider"
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="loanTerm">
            Срок займа: {formData.loanTerm} дней
          </label>
          <input
            id="loanTerm"
            type="range"
            name="loanTerm"
            min="10"
            max="30"
            step="1"
            value={formData.loanTerm}
            onChange={handleChange}
            className="form__slider"
          />
        </div>

        <div className="form-step3__buttons">
          <button
            type="button"
            className="form-step3__button"
            onClick={handleBack}
          >
            Назад
          </button>
          <button
            type="submit"
            className="form-step3__button"
            disabled={isLoading}
          >
            {isLoading ? 'Отправка...' : 'Подать заявку'}
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h2>
              Поздравляем, {lastName} {firstName}!
            </h2>
            <p>
              Вам одобрена сумма ${formData.loanAmount} на {formData.loanTerm}{' '}
              дней.
            </p>
            <button className="modal__button" onClick={handleFinish}>
              Хорошо, на главную
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormStep3;
