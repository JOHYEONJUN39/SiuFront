import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../../../store/themeSlice';
import { RootState } from '../../../store';

interface ToggleWrapperProps {
  mode: 'light' | 'dark';
  onClick: () => void;
}

function ThemeToggle() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ToggleWrapper onClick={handleToggleTheme} mode={themeMode}>
      {themeMode === 'dark' ? '🌚' : '🌝'}
    </ToggleWrapper>
  );
}

export default ThemeToggle;


const ToggleWrapper = styled.button<ToggleWrapperProps>`
  background-color: ${props => props.theme.bgColor};
  border: ${props => props.theme.borderColor};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 38px;
  margin-right: 10px;
  border-radius: 30px;
  box-shadow: ${
    props => props.mode === 'dark' ? '0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)'
    : '0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)'
  }
`;