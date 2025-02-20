import * as React from 'react';
import { useContext } from 'react';
import { View as RNView } from 'react-native';

import { getStyle } from './icon.style';
import { getIconSet } from './icon.service';
import { ThemeContext } from '../../theme';
import { IconProps } from './icon.type';
import { getThemeProperty } from '../../theme/theme.service';

const Icon: React.FunctionComponent<IconProps> = (props) => {
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
    position,
    left,
    top,
    bottom,
    right,
    name,
    color,
    rounded,
    maxH,
    maxW,
    minW,
    minH,
    roundedTop,
    roundedRight,
    roundedBottom,
    roundedLeft,
    shadow,
    shadowColor,
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
    fontFamily,
    fontSize,
    opacity,
    zIndex,
    style,
    ...rest
  } = props;
  const { theme } = useContext(ThemeContext);
  const computedStyle = getStyle(theme, props);

  const Icon = getIconSet(fontFamily);

  return (
    <RNView style={computedStyle.container} {...rest}>
      <Icon
        color={getThemeProperty(theme.colors, color)}
        size={getThemeProperty(theme.fontSize, fontSize)}
        name={name}
        style={computedStyle.icon}
      />
    </RNView>
  );
};

Icon.defaultProps = {
  color: 'gray500',
  fontSize: 'md',
  fontFamily: 'AntDesign',
};

export { Icon };
