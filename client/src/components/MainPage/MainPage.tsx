import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { fetchCategories } from '../../redux/thunks';

export default function MainPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Начать оформление</h1>
      <button
        className="main__button"
        type="button"
        onClick={() => navigate('/step-1')}
      >
        Начать
      </button>
    </div>
  );
}
