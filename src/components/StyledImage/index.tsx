import Image from 'next/image';
import {styled} from '@phntms/css-components';
import css from './styles.module.css';

const StyledImage = styled(Image, {
  css: css.img,
  variants: {
    blur: {
      true: css.blur
    }
  }
});

export default StyledImage;