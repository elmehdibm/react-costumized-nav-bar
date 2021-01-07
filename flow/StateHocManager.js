import React, { Children, Component } from 'react';


export default component => {
    return class StateManagerHOC extends Component {
        constructor(props) {
            console.log("Construction of the state Manager - customized-nav-bar")
            super(props);
            console.log(props);
            const {
                // Props Of Customized Nav VBar
                children,
            } = props;
            console.log("Handling Errors ...");
            // Handle Warnings
            console.log("Handling Warnings ...");

            // Move this helper to another file
            // Note that it's a pure function ( we use react btw on it but it's a not big deal)
            const buildBarState = (children, setIsActive) => {
                const barState = {};
                const newChildren = children.map(
                    (child, index) => {
                        const key = "barItem" + Math.floor(Math.random().toFixed(3) * 1000);
                        barState[key] = (index === 0);
                        console.log("child is ", child);
                        if(child.type && typeof child.type === "function"){
                            return (
                                <React.Fragment key={index}>
                                    {React.cloneElement(child, {
                                        key,
                                        isTabActive: (index === 0),
                                        setIsActive: setIsActive(key)
                                    })}
                                </React.Fragment>
                            );
                        }
                        return <div key={index}>{child}</div>;
                    }
                );
                return {
                    children: newChildren,
                    barState,
                };
            };

            const buildedBarState = buildBarState(children, this.setIsActive);

            this.state = {
                // ** States of Customized Nav Bar
                barState: buildedBarState.barState,
                /* 
                    {
                        barItem1012: true,
                        barItem1521: false,
                        barItem5455: false,
                    }
                */
                childrenContent: buildedBarState.children,
            };
        }

        setIsActive = (key) => () => {
            const { barState } = this.state;
            const newBarState = {};
            if (!barState[key]) {
                Object.keys(barState).forEach(
                    iterationKey => {
                        newBarState[iterationKey] = (
                            (key === iterationKey)
                                ? true
                                : false
                        );
                    }
                );
                this.setState({
                    barState: newBarState,
                })
            }
        };


        shouldComponentUpdate() {
            // the compareProps Must move it here
            return true;
        }

        /**
         * 
         * 
         * @param {object} nextProps 
         * @param {object} prevState 
         * 
         * @return {object} newState
         */
        componentDidUpdate(prevProps, prevState) {
            // Move this helper to another file
            // Note that it's a pure function
            const getChangedKeyWithValues = (prevState, state) => {
                const changedKeysWithValues = {};
                Object.keys(prevState.barState).forEach(
                    key => {
                        if (prevState.barState[key] !== state.barState[key]) {
                            changedKeysWithValues[key] = state.barState[key];
                        }
                    }
                )
                return changedKeysWithValues;
            };

            const changedKeysWithValues = getChangedKeyWithValues(prevState, this.state);
            const arrayChangedKeys = Object.keys(changedKeysWithValues);
        
            if (arrayChangedKeys.length > 0) {
                this.setState({
                    // can be moved in another file
                    childrenContent: this.state.childrenContent.map(
                        (child, index) => {
                            const key = child.props.children.key;
                            console.log("the key is ", key);
                            if (arrayChangedKeys.includes(key)) {
                                return <React.Fragment key={index}>
                                    {React.cloneElement(child.props.children, {
                                        isTabActive: changedKeysWithValues[key],
                                    })}
                                </React.Fragment>
                            }
                            return child;
                        }
                    )
                });
            }
        }

        // Here We can add functions and pass them to the Global Component

        // Must Check if the user change the prop of data , will it pass also in construction ?
        // Or Just Specify that the data and certain props must be immutable
        componentWillReceiveProps() {

        }

        render() {
            console.log("Render the state manager ...");
            const {
                childrenContent,
            } = this.state;

            const {
                children,
                ...otherProps
            } = this.props;

            // Here it doesn't contain design logics
            // Only passing methods and params that manage the states
            return (
                React.createElement(
                    component,
                    {
                        ...otherProps,
                        childrenContent,
                    }
                )
            );
        }
    };
};
