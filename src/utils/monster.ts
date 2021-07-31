import FACE1 from '~/assets/images/monster_face_1.svg';
import FACE2 from '~/assets/images/monster_face_2.svg';
import FACE3 from '~/assets/images/monster_face_3.svg';
import FACE4 from '~/assets/images/monster_face_4.svg';
import FACE5 from '~/assets/images/monster_face_5.svg';

const getFace = (value: number) => {
  if (value >= 75) {
    return FACE5;
  } else if (value >= 50) {
    return FACE4;
  } else if (value >= 25) {
    return FACE3;
  } else if (value >= 1) {
    return FACE2;
  } else {
    return FACE1;
  }
};

export { getFace };
