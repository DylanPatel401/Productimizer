import { FadeIn, FadeOut, SlideInRight, SlideOutLeft, SlideInDown, SlideOutDown, Layout } from 'react-native-reanimated';

export const ENTER_FADE = FadeIn.duration(300);
export const EXIT_FADE = FadeOut.duration(200);
export const ENTER_SLIDE_RIGHT = SlideInRight.duration(300);
export const EXIT_SLIDE_LEFT = SlideOutLeft.duration(200);
export const ENTER_SLIDE_UP = SlideInDown.duration(300);
export const EXIT_SLIDE_DOWN = SlideOutDown.duration(200);
export const LAYOUT_SPRING = Layout.springify();

export function staggeredDelay(index, baseDelay = 50) {
  return FadeIn.duration(300).delay(index * baseDelay);
}

export function slideInStaggered(index, baseDelay = 50) {
  return SlideInRight.duration(300).delay(index * baseDelay);
}
