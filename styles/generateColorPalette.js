
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

// Specific for the Bar , BarItem , SubBaritem , maybe also subBar .
export default {
    "standard-v1": {
        "innerShadowBarColor": Colors["midnight-blue"],
        "innerShadowBarItemColor": Colors["midnight-blue"],
        "innerShadowSubBarItemColor": "black",
        "borderBarColor": Colors["midnight-blue"],
        "barColor": Colors["cloud"],
        "activeBarTextColor": Colors["midnight-blue"],
        "inactiveBarTextColor": Colors["wet-asphalt"],
        "subBarColor": Colors["sky-blue"],
        "activeSubBarTextColor": "white",
        "inactiveSubBarTextColor": "white",
        "underlineSubBar": "none",
        "activeBoxColor": "none",
        "inactiveBoxColor": "none",
        "underlineBoxColor": Colors["midnight-blue"],
    }
};
