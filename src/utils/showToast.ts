import Toast from 'react-native-root-toast';

import { SurfaceColor } from '~/utils/color';

const showToast = (text: string) =>
  Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: -40,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: SurfaceColor.DEPTH1_D,
  });

export { showToast };
