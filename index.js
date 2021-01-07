import React, { PureComponent } from 'react';
import StateManagerHOC from './flow/StateHocManager';
import styledComponent, { cx } from './libs/styledComponent';
import { initiateMapClassNames, MapClasseNames } from './styles/constants';
import generateStyles from './styles/generateStyles';

export class SubBarItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={MapClasseNames.barContainer}>
                Not Yet Developed
            </div>
        )
    }
}

export class BarItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            isTabActive,
            setIsActive,
            handleIsActive,
            render,
            content,
            classNames,
        } = this.props;

        return (
            <button
                type="button"
                className={
                    cx(
                        cx(
                            MapClasseNames.barItem,
                            classNames && classNames.barItem || ""
                        ),
                        isTabActive
                            ? cx(
                                MapClasseNames.barItemActive,
                                classNames && classNames.activeBarItem || ""
                            )
                            : cx(
                                MapClasseNames.barItemInactive,
                                classNames && classNames.inactiveBarItem || ""
                            ),
                    )
                }
                onClick={
                    () => {
                        if (handleIsActive) {
                            handleIsActive();
                        } else {
                            setIsActive();
                        }
                    }
                }
            >
                {render && render({
                    isTabActive,
                    setIsActive
                })
                    || content
                }
            </button>
        )
    }
}

const getPathFromWindowLocation = location => (
    location.origin + (location.hash && "/#" || "")
);

export class NavigationBarItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { withParams, to, setIsActive } = this.props;
        const newUrlValue = getPathFromWindowLocation(window.location) + to;

        if (
            withParams
                ? (window.location.href).includes(newUrlValue)
                : (window.location.href) === newUrlValue
        ) {
            setIsActive();
        }
    }

    handleIsActive = () => {
        const { setIsActive, to } = this.props;
        const newUrlValue = getPathFromWindowLocation(window.location) + to;
        if (window.location.href !== newUrlValue) {
            window.location.href = newUrlValue;
            setIsActive();
        }
    }

    render() {
        const {
            handleIsActive,
            to,
            setIsActive,
            ...otherProps
        } = this.props;
        return (
            <BarItem
                {...otherProps}
                handleIsActive={this.handleIsActive}
            />
        );
    }
}

class BarComponent extends PureComponent {
    constructor(props) {
        super(props);
        const {
            theme,
            itemsPosition,
            type,
            height,
            itemHeight,
            width,
            itemWidth,
            background,
        } = props;
        generateStyles({
            theme: theme || {
                name: "standard-v1",
                type: "simple",
            },
            itemsPosition: itemsPosition || "center",
            type: type || "horizontal",
            height: height || 40,
            itemHeight,
            width: width || 85,
            itemWidth,
            background,
        });
    }

    render() {
        const {
            childrenContent,
            classNames,
        } = this.props;
        return (
            <div className={
                cx(
                    MapClasseNames.barContainer,
                    classNames && classNames.barContainer || "",
                )
            }>
                <div className={
                    cx(
                        MapClasseNames.bar,
                        classNames && classNames.bar || "",
                    )
                }>
                    {childrenContent}
                </div>
            </div>
        );
    }
}


/**
 * * 1 - Perform here the StyleSynchronizer.
 * * 2 - Initiate the style sheet with classNames
 * * 3 - Call the HOC : styledComponent
 * * 4 - Call The HOC : StateManagerHOC
 * * 5 - Render the BarComponent
 */
export class Bar extends PureComponent {
    constructor(props) {
        super(props);
        this.id = Math.floor(Math.random().toFixed(3) * 10000);
        initiateMapClassNames(this.id);
    }

    componentWillUnmount() {
        const element = document.getElementById("emui-style-id-" + this.id);
        if (element) {
            element.parentNode.removeChild(element);
        }
    }

    render() {
        return React.createElement(
            styledComponent({
                // Initiating all classnames and writing fixed styles
                [MapClasseNames.barContainer]: {
                },
                [MapClasseNames.bar]: {
                    "display": "flex",
                    "borderStyle": "solid",
                },
                [MapClasseNames.barItem]: {
                    "cursor": "pointer",
                    "display": "flex",
                    "alignItems": "center",
                    "justifyContent": "center",
                    "textAlign": "center",
                    "border": "none",
                    "&:hover": {
                        "outline": "1px solid"
                    }
                },
                [MapClasseNames.barItemActive]: {
                    "outline": "1px solid"
                },
                [MapClasseNames.barItemInactive]: {

                },
                // This won't be displayed until another version
                [MapClasseNames.subBarItem]: {
                    "cursor": "pointer",
                    "display": "flex",
                    "alignItems": "center",
                    "justifyContent": "center",
                    "textAlign": "center",
                    "border": "none",
                    "&:hover": {
                        "outline": "1px solid"
                    }
                },
                [MapClasseNames.subBarItemActive]: {
                    "outline": "1px solid"
                },
                [MapClasseNames.subBarItemInactive]: {

                },
            }
            )(
                StateManagerHOC(BarComponent),
                "emui-style-id-" + this.id,
            ),
            {
                ...this.props,
            }
        );
    }
};
