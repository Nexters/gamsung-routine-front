const MonsterFace = {
  SMILE: require('~/assets/images/monster_face_smile.png'),
  CRITICAL: require('~/assets/images/monster_face_critical.png'),
  CLEAR: require('~/assets/images/monster_face_clear.png'),
  DISABLE: require('~/assets/images/monster_face_disable.png'),
} as const;

const getFace = (count: number, endTasksCount: number) => {
  if (count === 0) {
    return MonsterFace.DISABLE;
  } else if (count - endTasksCount === 0) {
    return MonsterFace.CLEAR;
  } else if (count === count - endTasksCount) {
    return MonsterFace.SMILE;
  } else {
    return MonsterFace.CRITICAL;
  }
};

export { getFace };
