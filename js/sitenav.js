$(document).ready(function () {

    // Variables
    var hoverTab = $(".dropdown");
    $(hoverTab).mouseenter(function () {
        $(this).addClass("show nowlook");
        $(".nowlook .dropdown-menu").addClass("show");
    });
    $(hoverTab).mouseleave(function () {
        $(".nowlook .dropdown-menu").removeClass("show");
        $(this).removeClass("show nowlook");
    });
})