
// This is a work to create commercialized Components for better styling

import generateEffectPalette from "./generateEffectPalette";
import generateSizePalette from "./generateSizePalette";
import generateColorPalette from "./generateColorPalette";
import { changeCssProperty, changeCssPropertyWithEvent } from "../libs/styledComponent";
import { MapClasseNames } from "./constants";

// This Work will be derived in an independant library for theming
// And Creating Things more stylishly For All Libraries

/* 
    The Structure of the themeObject is : {
        name, type , color , size , effect
    }
*/

export default ({
  theme,
  itemsPosition,
  type,
  height,
  width,
  itemWidth,
  subItemWidth,
  itemHeight,
  subItemHeight,
  background,
}) => {
  console.log("Generating the styles of the Bar Component :");

  const themeName = (theme && theme.name) || "standard-v1";
  const themeType = (theme && theme.type) || "simple";
  const sizePalette = generateSizePalette[themeName];
  const effectPalette = generateEffectPalette[themeName];
  const colorPalette = generateColorPalette[themeName];
  // ** Generating Styles of bar
  let barCssProperties = {
    "justifyContent": itemsPosition,
    "borderWidth": sizePalette.borderBarSize,
    [background || "backgroundColor"]: background || colorPalette.barColor,
    "borderColor": colorPalette.borderBarColor,
    "boxShadow": effectPalette.innerShadowBarValue + " "
      + colorPalette.innerShadowBarColor,
  };
  let paddingBarItem = "";
  // ** Calculating paddingBarItem and updating styles of bar according to type
  if (type === "vertical") {
    barCssProperties = {
      ...barCssProperties,
      "height": "100%",
      "flexDirection": "column",
      "width": width + "px",
    };
    paddingBarItem = sizePalette.verticalSpacingInnerBarSize + " "
      + sizePalette.horizontalSpacingInnerBarItemSize;
  } else if (type === "horizontal") {
    barCssProperties = {
      ...barCssProperties,
      "width": "100%",
      "flexDirection": "row",
      "height": height + "px",
    };
    paddingBarItem = sizePalette.verticalSpacingInnerBarItemSize + " "
      + sizePalette.horizontalSpacingInnerBarSize;
  };
  // ** Generating Styles of barItem active & inactive
  let barItemCssProperties = {
    "padding": paddingBarItem,
    "width": (type === "horizontal" && itemWidth)
      ? itemWidth + "px"
      : "auto",
    "height": (type === "vertical" && itemHeight)
      ? itemHeight + "px"
      : "auto",
      ...((type === "horizontal") ? {
        "borderTop": sizePalette.borderBarSize + " solid",
      } : {}),
      ...((type === "vertical") ? {
        "borderLeft": sizePalette.borderBarSize + " solid",
      } : {}),
  };
  let barItemActiveCssProperties = {
    "fontSize": sizePalette.activeTextBarSize,
    "opacity": effectPalette.activeBarItemOpacity
  };
  let barItemInativeCssProperties = {
    "fontSize": sizePalette.inactiveTextBarSize,
    "opacity": effectPalette.inactiveBarItemOpacity,
  };

  // ** Generating Styles of subBarItem active & inactive
  let subBarItemCssProperties = {
    "padding": paddingBarItem,
    "width": (type === "horizontal" && subItemWidth)
      ? subItemWidth + "px"
      : "auto",
    "height": (type === "vertical" && subItemHeight)
      ? subItemHeight + "px"
      : "auto",
  };
  let subBarItemActiveCssProperties = {
    "opacity": effectPalette.activeBarSubItemOpacity
  };
  let subBarItemIncativeCssProperties = {
    "opacity": effectPalette.inactiveBarSubItemOpacity,
  };


  // ** Updating the styles according to the themeType
  if (themeType.includes("boxes")) {
    barItemActiveCssProperties = {
      ...barItemActiveCssProperties,
      "boxShadow": effectPalette.innerShadowBarItemValue + " "
        + colorPalette.innerShadowBarItemColor,
    };
  };
  if (themeType.includes("underlined")) {
    if (themeType.includes("simple")) {
      barItemCssProperties = {
        ...barItemCssProperties,
        "textDecorationLine": "underline",
      };
    } else {
      barItemActiveCssProperties = {
        ...barItemActiveCssProperties,
        "boxShadow": effectPalette.innerShadowBarItemValue + " "
          + colorPalette.innerShadowBarItemColor,
        ...((type === "horizontal") ? {
          "borderBottom": sizePalette.bottomBorderBarItem + " "
            + colorPalette.underlineBoxColor,
        } : {}),
        ...((type === "vertical") ? {
          "borderRight": sizePalette.rightBorderBarItem + " "
            + colorPalette.underlineBoxColor,
        } : {}),
      };
    };
  };


  // ** Implementing All The Styles into the classNames
  changeCssProperty(MapClasseNames.bar, barCssProperties);
  changeCssProperty(MapClasseNames.barItem, barItemCssProperties);
  changeCssPropertyWithEvent(MapClasseNames.barItem, 'hover', barItemActiveCssProperties);
  changeCssProperty(MapClasseNames.barItemActive, barItemActiveCssProperties);
  changeCssProperty(MapClasseNames.barItemInactive, barItemInativeCssProperties);
  changeCssProperty(MapClasseNames.subBarItem, subBarItemCssProperties);
  changeCssPropertyWithEvent(MapClasseNames.subBarItem, 'hover', subBarItemActiveCssProperties);
  changeCssProperty(MapClasseNames.subBarItemActive, subBarItemActiveCssProperties);
  changeCssProperty(MapClasseNames.subBarItemInactive, subBarItemIncativeCssProperties);

};
