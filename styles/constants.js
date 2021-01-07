export let MapClasseNames = {};

export const initiateMapClassNames = (id) => {
    MapClasseNames = {

        barContainer: "emui_bar_container_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        bar: "emui_bar_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        barItem: "emui_bar_item_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        barItemActive: "emui_bar_item_active_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        barItemInactive: "emui_bar_item_inactive" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        subBarItem: "emui_sub_bar_item_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        subBarItemActive: "emui_sub_bar_item_active_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        subBarItemInactive: "emui_sub_bar_item_inactive" + Math.floor(Math.random().toFixed(2) * 1000) + id,

    };
};
