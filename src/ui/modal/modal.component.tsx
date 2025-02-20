import * as React from 'react';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { Animation, CustomAnimation } from 'react-native-animatable';
import RNModal, { Orientation, ModalProps as RNModalProps } from 'react-native-modal';

import {
  ThemeContext,
  BorderPropsType,
  SpacingPropsType,
  RoundedPropsType,
} from '../../theme';
import { Div } from '../div/div.component';
import { getStyle } from './modal.style';

type OrNull<T> = null | T;
interface ModalProps
  extends RNModalProps,
    BorderPropsType,
    SpacingPropsType,
    RoundedPropsType {
  bg?: string;
  h?: number | string;
  children: React.ReactElement[] | React.ReactElement;
  animationIn?: Animation | CustomAnimation;
  animationInTiming?: number;
  animationOut?: Animation | CustomAnimation;
  animationOutTiming?: number;
  avoidKeyboard?: boolean;
  coverScreen?: boolean;
  hasBackdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  customBackdrop?: React.ReactNode;
  useNativeDriver?: boolean;
  deviceHeight?: number;
  deviceWidth?: number;
  isVisible?: boolean;
  hideModalContentWhileAnimating?: boolean;
  propagateSwipe?: boolean;
  onModalShow?: () => void;
  onModalWillShow?: () => void;
  onModalHide?: () => void;
  onModalWillHide?: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  swipeThreshold?: number;
  scrollTo?: OrNull<(e: any) => void>;
  scrollOffset?: number;
  scrollOffsetMax?: number;
  scrollHorizontal?: boolean;
  supportedOrientations?: Orientation[];
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
  const {
    bg,
    h,
    m,
    mt,
    mr,
    mb,
    ml,
    ms,
    p,
    pr,
    pt,
    pb,
    pl,
    rounded,
    roundedTop,
    roundedRight,
    roundedBottom,
    roundedLeft,
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderTopColor,
    borderRightColor,
    borderWidth,
    borderLeftWidth,
    borderRightWidth,
    borderBottomWidth,
    borderEndWidth,
    borderTopWidth,
    justifyContent,
    children,
    isVisible,
    ...rest
  } = props;
  const { theme } = useContext(ThemeContext);
  const computedStyle = getStyle(theme, props);

  return (
    <RNModal
      isVisible={isVisible}
      hideModalContentWhileAnimating
      {...rest}
      style={computedStyle.modal}
    >
      <Div bg={bg} h={h || '100%'} style={computedStyle.container}>
        <SafeAreaView style={computedStyle.safeView}>{children}</SafeAreaView>
      </Div>
    </RNModal>
  );
};

Modal.defaultProps = {
  bg: 'white',
  h: '100%',
  isVisible: false,
  justifyContent: 'flex-end',
};

export { Modal };
