import React from "react";

// The Keys :
const KeyBarItem = "bar-item-mdx";

// The Tag that is showed in the console to specify the log of the library
const Tag = "[react-costumized-nav-bar]";

// Global Variable that contain the index of the active Tab
export var indexActiveTab = 0;
export var arrayIsActiveItems = [];

const paperStyle = (itemRef, subitemStyle, isChildrenExist) => {
  if(isChildrenExist && itemRef && itemRef.current && itemRef.current.offsetHeight && itemRef.current.offsetWidth && itemRef.current.offsetTop && itemRef.current.offsetLeft){
    return {
      "position": "absolute",
      "top": (itemRef.current.offsetTop + itemRef.current.offsetHeight),
      "left": itemRef.current.offsetLeft,
      "minWidth": itemRef.current.offsetWidth,
      "display": "grid",
    };
  }
  return {"display": "none"};
};

export class SubBarItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "isHovered": false
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.isHovered === nextState.isHovered
    ) {
      return false;
    }
    return true;
  };

  onClickFunc = () => {
    const {onClick, updateBarItem} = this.props;
    updateBarItem(true);
    if(onClick) {
      onClick();
    }
  };

  render(){
    const {index, title, hideSubs, style} = this.props;
    return(
      <div
      id={"sub-item-" + index}
      onMouseOut={(event) => {
        this.setState({"isHovered": false});
        const predicate = (
          (event.pageY >=
            event.target.parentNode.offsetTop +
            event.target.parentNode.offsetHeight
          )
          || (event.pageY  <= event.target.parentNode.offsetTop)
          || (event.pageX  <= event.target.parentNode.offsetLeft)
          || (event.pageX  >= event.target.parentNode.offsetLeft + event.target.parentNode.offsetWidth)
        );
        if(predicate){
          hideSubs();
        }
      }}
      onMouseOver={() => this.setState({"isHovered": true})}
      onClick={this.onClickFunc}
      style={this.state.isHovered ? style.active : style.inactive}
    >
      {title ? title : "Empty Title"}
    </div>
    );
  };
};

export class BarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'isHovered': false,
      'showSubs': false,
      'keyState': KeyBarItem
    };
    this.myRef = React.createRef();
  }

  setHover = (isHovered) => (event) => {
    const predicate = (
      (event.pageY >= event.target.offsetTop)
      && (event.pageX > event.target.offsetLeft)
      && (event.pageX < event.target.offsetLeft + event.target.offsetWidth)
    );
    this.setState({'showSubs': (predicate || isHovered)});
    this.setState({isHovered});
  };

  shouldComponentUpdate(nextProps, nextState) {
    if(
      this.props.title !== nextProps.title
    ){
      return true;
    }
    if (
      this.props.isTabActive !== undefined &&
      nextProps.isTabActive !== undefined &&
      this.props.isTabActive === nextProps.isTabActive &&
      this.state.isHovered === nextState.isHovered &&
      this.state.showSubs === nextState.showSubs
    ) {
      return false;
    }
    return true;
  };

  switchTab = onClickFunc => () => {
    if (this.props.isTabActive === false && (
        this.props.isDisabled === undefined ||
        this.props.isDisabled === false
        )) {
      if (onClickFunc && typeof onClickFunc === "function") {
        onClickFunc();
      }
      this.props.updateBarItem(true);
    }
  };

  hideSubs = () => this.setState({'showSubs': false});

  render() {
    const { isTabActive, style, updateBarItem, onClick, title, isDisabled, styles } = this.props;
    const {isHovered, showSubs} = this.state;
    const AllElements = (
      <React.Fragment>
        {Array.isArray(this.props.children) ?
          this.props.children.map((element, index) => (
            <React.Fragment key={index}>
              {React.cloneElement(element, {
                index,
                hideSubs: this.hideSubs,
                style: styles.subItem,
                updateBarItem: this.props.updateBarItem
              })}
            </React.Fragment>
        ))
        : <React.Fragment>
            {this.props.children && React.cloneElement(this.props.children, {
              "index": 0,
              hideSubs: this.hideSubs,
              style: styles.subItem,
              updateBarItem: this.props.updateBarItem
            })}
           </React.Fragment>
        }
      </React.Fragment>
    );
    const addedStyle = style ? style : {};
    return (
      <React.Fragment>
      <div
        ref={this.myRef}
        onMouseOver={this.setHover(true)}
        onMouseOut={this.setHover(false)}
        onClick={this.switchTab(onClick)}
        style={(isTabActive || isHovered) ? {
          ...styles.item.active,
          ...addedStyle
        } : {
          ...styles.item.inactive,
          ...addedStyle
        }}
      >
        <div>{title ? title : "Empty Title"}</div>
      </div>
      {
        (showSubs) && <div 
            onMouseOut={(event) => {
              if(
                event &&
                event.relatedTarget &&
                event.relatedTarget.id &&
                !event.relatedTarget.id.includes("sub-item")
              ){
                this.hideSubs();
              }
            }
          }
            style={paperStyle(this.myRef, styles.subItem, (this.props.children !== undefined))}
        >
        {AllElements}
      </div>
      }
      </React.Fragment>
    );
  }
}

const constructArrayIsActiveItem = (elements, keyItemValue, arrayisactiveitem) => {
  if (keyItemValue === undefined && arrayisactiveitem) {
    return arrayisactiveitem;
  }
  let length = 0;
  if (Array.isArray(elements)) {
    elements.forEach(element => {
      if (
        element.type &&
        typeof element.type === "function"
      ) {
        length++;
      }
    });
  }
  const array = new Array(length).fill(false);
  if(array.length > keyItemValue){
    array[keyItemValue] = true;
  };
  return array;
};

// Checking Errors for the props theme
const checkThemeObjectWarningsAndErrors = objectTheme => {

};

const checkBarPropsWarningsAndErrors = props => {
  if (
    props.type !== undefined &&
    !["horizontal", "vertical"].includes(props.type)
  ) {
    throw new Error(
      "Props Input Error :" +
        "\n- 'type' prop of bar error" +
        "\n=> Valid Entries are : horizontal, verical"
    );
  }
  if (
    props.type !== undefined &&
    props.type === "vertical" &&
    props.width === undefined
  ) {
    console.warn(
      Tag + " The Width of Vertical Bar is missing (40px is the default value) !"
    );
  }
  if (
    props.type !== undefined &&
    props.type === "horizontal" &&
    props.height === undefined
  ) {
    console.warn(
      Tag + " The Height of Horizontal Bar is missing (40px is the default value) !"
    );
  }
  if(props.theme === undefined){
      console.log(
        Tag + " For more stylish look, Note that you can provide the bar with themes check this link => "
      );
  }
};

const BarStyle = (stylesFromThemeObject = {}) => {
  if (stylesFromThemeObject === undefined) {
    stylesFromThemeObject = {};
  }
  return { ...stylesFromThemeObject, width: "100%", boxSizing: "border-box" };
};

const ContainerStyle = (
  type = "horizontal",
  itemsPosition = "left",
  verticalBarWidth = "85px",
  horizontalBarHeight = "40px",
  otherStyles = {},
  forceStyle = false,
  stylesFromThemeObject = {}
) => {
  if (type === undefined) {
    type = "horizontal";
  }
  if (itemsPosition === undefined) {
    itemsPosition = "left";
  }
  if (verticalBarWidth === undefined) {
    verticalBarWidth = "85px";
  }
  if (horizontalBarHeight === undefined) {
    horizontalBarHeight = "40px";
  }
  if (otherStyles === undefined) {
    otherStyles = {};
  }
  if (forceStyle === undefined) {
    forceStyle = false;
  }
  if (stylesFromThemeObject === undefined) {
    stylesFromThemeObject = {};
  }
  let style = {
    display: "flex",
    justifyContent: itemsPosition,
    boxSizing: "border-box"
  };
  if (type === "vertical") {
    style = {
      ...style,
      width: verticalBarWidth,
      height: "100%",
      flexDirection: "column"
    };
  } else if (type === "horizontal") {
    style = {
      ...style,
      height: horizontalBarHeight + "px"
    };
  }
  if (forceStyle) {
    return {
      ...style,
      ...stylesFromThemeObject,
      ...otherStyles
    };
  }
  return {
    ...otherStyles,
    ...style
  };
};

// It's the global/Prarent class Bar that we render
export class Bar extends React.Component {
  constructor(props) {
    super(props);
    let themeObject = {};
    let type = "horizontal";
    let containerClass = "";
    if (props.theme !== undefined) {
      themeObject = props.theme;
    }
    if (props.type !== undefined) {
      type = props.type;
    }
    if (props.containerClass !== undefined) {
      containerClass = props.containerClass;
    }
    const array = constructArrayIsActiveItem(
      props.children,
      props.keyItemValue ? props.keyItemValue : 0
    );
    this.state = {
      containerClass,
      arrayisactiveitem: array,
      themeObject: themeConstruction(themeObject, type)
    };
    arrayIsActiveItems = array;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      arrayisactiveitem: constructArrayIsActiveItem(
        nextProps.children,
        nextProps.keyItemValue,
        prevState.arrayisactiveitem
      )
    };
  }

  updateBarItem = key => isActive => {
    const { arrayisactiveitem } = this.state;
    arrayisactiveitem.fill(false);
    arrayisactiveitem[key] = isActive;
    indexActiveTab = key;
    this.setState({ arrayisactiveitem });
    arrayIsActiveItems = arrayisactiveitem;
  };

  render() {
    // Here it will Process The Children And
    // The Props : Styles , Some Style Logics (showing the underline or not)
    const { arrayisactiveitem, themeObject, containerClass } = this.state;
    let indexItemBar = -1;
    checkBarPropsWarningsAndErrors(this.props);
    const {
      type,
      itemsPosition,
      width,
      height,
      style,
      forceStyle,
      itemWidth
    } = this.props;
    themeObject.barItem["active"]["width"] = itemWidth
      ? itemWidth + "px"
      : "auto";
    themeObject.barItem["inactive"]["width"] = itemWidth
      ? itemWidth + "px"
      : "auto";
    const AllElements = (
      <React.Fragment>
        {Array.isArray(this.props.children) &&
          this.props.children.map((element, index) => {
            // Must Refine this condition :
            if (element.type && typeof element.type === "function") {
              indexItemBar++;
              return (
                <React.Fragment key={index}>
                  {React.cloneElement(element, {
                    styles: {
                      item: themeObject.barItem,
                      subItem: themeObject.subBarItem
                    },
                    isTabActive: arrayisactiveitem[indexItemBar],
                    updateBarItem: this.updateBarItem(indexItemBar)
                  })}
                </React.Fragment>
              );
            }
            return <div key={index}>{element}</div>;
          })}
      </React.Fragment>
    );

    return (
      <div style={BarStyle(themeObject.bar)}>
        <div
          style={ContainerStyle(
            type,
            itemsPosition,
            width,
            height,
            style,
            forceStyle
          )}
          className={containerClass}
        >
          {AllElements}
        </div>
      </div>
    );
  }
}

// This is a work to create commercialized Components for better styling

// This Work will be derived in an independant library for theming
// And Creating Things more stylishly For All Libraries

// Theme Section


// Must Handle Error of The Structure of The Theme Styles :


// Palette Color

const Colors = {
  // From FlatUI Colors :
  // From White to grey ( Lighted Colors )
  "cloud": "#ecf0f1",
  "silver": "#bdc3c7",
  "concrete": "#95a5a6",
  "asbestos": "#7f8c8d",
  // Dark Colors
  "wet-asphalt": "#34495e",
  "midnight-blue": "#2c3e50",
  "silver": "#bdc3c7",
  "sky-blue": "rgb(88, 140, 198)"
};

const ColorPalettesStyles = {
    "standard-v1" : {
        "innerShadowBarColor": Colors["midnight-blue"],
        "innerShadowBarItemColor": Colors["midnight-blue"],
        "innerShadowSubBarItemColor": "black",
        "borderBarColor": Colors["midnight-blue"],
        "barColor": Colors["cloud"],
        "activeBarTextColor": Colors["midnight-blue"],
        "inactiveBarTextColor": Colors["wet-asphalt"],
        "subBarColor": Colors["sky-blue"],
        "activeSubBarTextColor": "white",
        "inactiveSubBarTextColor":"white",
        "underlineSubBar": "none",
        "activeBoxColor": "none",
        "inactiveBoxColor": "none",
        "underlineBoxColor": Colors["midnight-blue"],
    }
};

// Effects Values

const ElementsEffectStyle = {
  "normal-v1": {
    "innerShadowBarValue": "inset 0px 1px 0px",
    "innerShadowBarItemValue": "inset 0px 1px 2px",
    "innerShadowSubBarItemValue": "inset 0px 1px 1px",
    "activeBarItemOpacity": "1",
    "inactiveBarItemOpacity": "0.8",
    "activeBarSubItemOpacity": "1",
    "inactiveBarSubItemOpacity": "0.8"
  }
}

// Size Norms


const ElementsSizeStyle = {
    "normal-v1": {
        "verticalSpacingInnerBarSize": "8px",
        "horizontalSpacingInnerBarSize": "8px",
        "verticalSpacingInnerBarItemSize": "4px",
        "horizontalSpacingInnerBarItemSize": "12px",
        "verticalSpacingInnerSubBarItemSize": "2px",
        "horizontalSpacingInnerSubBarItemSize": "4px",
        "borderBarSize": "1px",
        "bottomBorderBarItem": "4px solid",
        "rightBorderBarItem": "2px solid",
        "activeTextBarSize": "20px",
        "inactiveTextBarSize": "18px",
        "activeTextSubBarSize": "14px",
        "inactiveTextSubBarSize": "14px",
    }
};

const constructGlobalStyle = (
    barType,
    themeType,
    colorPalette,
    elementsSize,
    elementsEffect
) => {
    let changedGlobalStyle = {};
    changedGlobalStyle["bar"] = {
      "borderStyle": "solid",
      "borderWidth": elementsSize.borderBarSize,
      "backgroundColor": colorPalette.barColor,
      "borderColor": colorPalette.borderBarColor,
      "boxShadow": elementsEffect.innerShadowBarValue + " " 
        + colorPalette.innerShadowBarColor,
    };
    let paddingBarItem = "0px 0px";
    if(barType === "horizontal"){
      paddingBarItem = elementsSize.verticalSpacingInnerBarSize + " " 
        + elementsSize.horizontalSpacingInnerBarItemSize;
    }else if (barType === "vertical"){
      paddingBarItem = elementsSize.verticalSpacingInnerBarItemSize + " "
      + elementsSize.horizontalSpacingInnerBarSize;
    }
    let commonBarItemStyle = {
      "cursor": "pointer",
      "padding": paddingBarItem,
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "textAlign": "center"
    };
    changedGlobalStyle["barItem"] = {
        "active": {
          ...commonBarItemStyle,
          "fontSize": elementsSize.activeTextBarSize,
          "opacity": elementsEffect.activeBarSubItemOpacity
        },"inactive": {
          ...commonBarItemStyle,
          "fontSize": elementsSize.inactiveTextBarSize,
          "opacity": elementsEffect.inactiveBarSubItemOpacity,    
        }
    };

    // Must Refine this to the vertical bar
    let paddingSubBarItem = elementsSize.horizontalSpacingInnerSubBarItemSize;

    let commonSubBarItemStyle = {
      "cursor": "pointer",
      "padding": paddingSubBarItem,
      "backgroundColor": colorPalette.subBarColor,
      "color": colorPalette.inactiveSubBarTextColor,
      "boxShadow": elementsEffect.innerShadowSubBarItemValue + " " + colorPalette.innerShadowSubBarItemColor,
      "fontSize": elementsSize.activeTextSubBarSize,
    };

    changedGlobalStyle["subBarItem"] = {
        "active": {
          ...commonSubBarItemStyle,
          "opacity": elementsEffect.activeBarSubItemOpacity
        },"inactive": {
          ...commonSubBarItemStyle,
          "opacity": elementsEffect.inactiveBarSubItemOpacity,    
        }
    };

    if(themeType !== undefined && themeType.includes("boxes")) {
      changedGlobalStyle.barItem.active["boxShadow"] = elementsEffect.innerShadowBarItemValue + " "
      + colorPalette.innerShadowBarItemColor;
    }
    if(
        themeType !== undefined && themeType.includes("underlined") && themeType.includes("boxes")
    ){
      if(barType === "horizontal"){
        changedGlobalStyle.barItem.active["borderBottom"] = elementsSize.bottomBorderBarItem + " "
        + colorPalette.underlineBoxColor;
      }else if (barType === "vertical"){
        changedGlobalStyle.barItem.active["borderRight"] = elementsSize.rightBorderBarItem + " "
        + colorPalette.underlineBoxColor;
      }
    } else if(
        themeType !== undefined && themeType.includes("underlined")
    ) {
      changedGlobalStyle.barItem.active["textDecorationLine"] = "underline";
    }
    // Does not know yet why it don't work
    // changedGlobalStyle.barItem.active["&:hover"] = changedGlobalStyle.barItem.active;
    return changedGlobalStyle;
};

/* 
    The Structure of the themeObject is : {
        type , colorPalette , size, effect
    }

    The Structure of the Result is : {
        bar , barItem : {active, inactive}, subBarItem : {active, inactive}
    }
*/


// Must know Also the type of the bar ( vertical or horizontal )

const themeConstruction = (themeObject, barType) => {
    // Check Warning and Errors of themeObject

    return constructGlobalStyle(
        barType,
        themeObject.type ? themeObject.type : "simple",
        themeObject.colorPalette
        ? ColorPalettesStyles[themeObject.colorPalette]
        : ColorPalettesStyles["standard-v1"],
        themeObject.size
        ? ElementsSizeStyle[themeObject.size]
        : ElementsSizeStyle["normal-v1"],
        themeObject.effect
        ? ElementsEffectStyle[themeObject.effect]
        : ElementsEffectStyle["normal-v1"],
    );
};
