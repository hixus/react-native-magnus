import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import {
  View as RNView,
  ActivityIndicator,
  GestureResponderEvent as RNGestureResponderEvent,
  Pressable as RNButton,
} from 'react-native';

import { getStyle } from './radio.style';
import { ThemeContext } from '../../theme';
import { Icon } from '../icon/icon.component';
import { Text } from '../text/text.component';
import { getThemeProperty } from '../../theme/theme.service';
import { getIconName, getIconColor } from './radio.service';
import { IRadioProps, IRadio } from './radio.type';
import { RadioGroup } from './group.component';
import { isFunction } from '../../utilities';

const Radio: IRadio<IRadioProps> = (props) => {
  const {
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
    h,
    w,
    bg,
    minW,
    minH,
    suffix,
    style,
    fontSize,
    fontWeight,
    prefix,
    rounded,
    roundedTop,
    roundedRight,
    roundedBottom,
    roundedLeft,
    color: colorProp,
    loading,
    disabled,
    loaderColor,
    loaderSize,
    children,
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderTopColor,
    borderRightColor,
    borderWidth,
    borderLeftWidth,
    borderRightWidth,
    borderBottomWidth,
    borderTopWidth,
    borderEndWidth,
    shadow,
    borderless,
    shadowColor,
    block,
    alignSelf,
    activeIcon,
    inactiveIcon,
    onChange,
    activeColor,
    inactiveColor,
    defaultChecked,
    value,
    checked: checkedProp,
    onPress: onPressProp,
    ...rest
  } = props;
  const { theme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(props.checked || defaultChecked);
  const [focussed, setFocussed] = useState(false);
  const computedStyle = getStyle(theme, props, { focussed });

  useEffect(() => {
    if ('checked' in props) {
      setChecked(props.checked);
    }
  }, [props]);

  /**
   * on press radio
   */
  const onPress = (event: RNGestureResponderEvent) => {
    if (disabled) {
      return;
    }

    // set the checked to true on press if there is no checked prop pass
    if (!('checked' in props)) {
      setChecked(true);
    }

    if (isFunction(onPressProp)) {
      onPressProp(event);
    }

    if (isFunction(onChange)) {
      onChange(value);
    }
  };

  /**
   * sets focussed to true
   *
   * @param event
   */
  const onPressIn = () => {
    setFocussed(true);
  };

  /**
   * sets focussed to true
   *
   * @param event
   */
  const onPressOut = () => {
    setFocussed(false);
  };

  const iconName = getIconName(checked);
  const iconColor = getIconColor(
    checked,
    disabled,
    activeColor,
    inactiveColor,
    theme
  );

  /**
   * get icon
   * shows activity indication if loading state is true
   */
  const getIcon = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size={getThemeProperty(theme.fontSize, fontSize)}
          color={getThemeProperty(theme.colors, activeColor)}
          style={{ zIndex: 2, position: 'relative' }}
        />
      );
    }

    if (checked) {
      if (activeIcon && typeof activeIcon === 'string') {
        return (
          <Icon
            name={activeIcon}
            color={iconColor}
            style={{ zIndex: 2, position: 'relative' }}
            fontFamily="AntDesign"
            fontSize={fontSize}
          />
        );
      }

      if (activeIcon) {
        return activeIcon;
      }
    } else {
      if (inactiveIcon && typeof inactiveIcon === 'string') {
        return (
          <Icon
            name={inactiveIcon}
            color={iconColor}
            style={{ zIndex: 2, position: 'relative' }}
            fontFamily="AntDesign"
            fontSize={fontSize}
          />
        );
      }

      if (inactiveIcon) {
        return inactiveIcon;
      }
    }

    return (
      <Icon
        name={iconName}
        color={iconColor}
        style={{ zIndex: 2, position: 'relative' }}
        fontFamily="MaterialIcons"
        fontSize={fontSize}
      />
    );
  };

  const renderChildren = () => {
    if (isFunction(children)) {
      return children({ focussed, disabled, checked, loading });
    }

    return (
      <>
        {prefix}
        <RNView>
          <RNView style={computedStyle.highlightContainer} />
          <RNView style={computedStyle.icon}>{icon}</RNView>
        </RNView>
        {children}
        {suffix}
      </>
    );
  };

  const icon = getIcon();

  return (
    <RNButton
      {...rest}
      style={computedStyle.button}
      onPress={disabled ? undefined : onPress}
      onPressIn={disabled ? undefined : onPressIn}
      onPressOut={disabled ? undefined : onPressOut}
    >
      <RNView style={computedStyle.container}>{renderChildren()}</RNView>
    </RNButton>
  );
};

Radio.defaultProps = {
  defaultChecked: false,
  activeColor: 'blue600',
  inactiveColor: 'gray500',
  highlightBg: 'gray300',
  bg: 'transparent',
  p: 'none',
  color: 'white',
  rounded: 'circle',
  loading: false,
  disabled: false,
  loaderSize: 'md',
  loaderColor: 'gray400',
  block: false,
  position: 'relative',
  shadowColor: 'gray800',
  shadow: 0,
  fontSize: '4xl',
  borderless: true,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  onPress: () => {},
  flexDir: 'row',
};

// passing RadioGroup as part of Radio
Radio.Group = RadioGroup;

export { Radio };
