
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
    if (props.theme === undefined) {
        console.log(
            Tag + " For more stylish look, Note that you can provide the bar with themes check this link => "
        );
    }
};


