import { styled } from '@phntms/css-components';

import css from './styles.module.css';

const Button = styled('button', {
  css: css.button,
  variants: {
    disabled: {
      true: css.disabled
    }
  }
});

export default Button;
