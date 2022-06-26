import { HiMoon } from 'react-icons/hi';
import { FaSun } from 'react-icons/fa';

import * as S from './styles';

interface ThemeTogglerProps {
  themeToggler: () => void;
}

function TogglerButton({ themeToggler }: ThemeTogglerProps) {
  return (
    <S.Container>
      <label htmlFor="checkbox" className="switch">
        <input
          id="checkbox"
          type="checkbox"
          onClick={themeToggler}
          onChange={() => false}
          checked={window.localStorage.getItem('theme') === 'light'}
          className="ddd"
        />
        <S.Icons className="slider round">
          {window.localStorage.getItem('theme') !== 'light' ? (
            <>
              <HiMoon style={{ height: '20px' }} />
            </>
          ) : (
            <>
              <FaSun size={0} style={{ height: '20px' }} />
            </>
          )}
        </S.Icons>
      </label>
    </S.Container>
  );
}

export default TogglerButton;