$(function() {
  $("#navbarToggle").blur(function(event) {
  var screenWidth = window.innerWidth;
  if (screenWidth < 768) {
  $("#collapsable-nav").collapse('hide');
  }
  });
  });
  
  (function(global) {
  var dc = {};
  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";
  
  var insertHtml = function(selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
  };
  
  var showLoading = function(selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
  };
  
  var insertProperty = function(string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
  };
  
  var switchMenuToActive = function() {
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  classes = document.querySelector("#navMenuButton").className;
if (classes.indexOf("active") === -1) {
  classes += " active";
  document.querySelector("#navMenuButton").className = classes;
}
};

document.addEventListener("DOMContentLoaded", function(event) {
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
allCategoriesUrl,
function(categories) {
buildAndShowHomeHTML(categories);
},
true
);
});

function buildAndShowHomeHTML(categories) {
$ajaxUtils.sendGetRequest(
homeHtmlUrl,
function(homeHtml) {
var chosenCategory = chooseRandomCategory(categories);
var chosenCategoryShortName = chosenCategory.short_name;

var categoryTitleHtml = categoriesTitleHtml;
categoryTitleHtml = insertProperty(
  categoryTitleHtml,
  "name",
  chosenCategory.name
);
var finalHtml = categoryTitleHtml + "<section class='row'>";

$ajaxUtils.sendGetRequest(
  menuItemsUrl + chosenCategoryShortName + ".json",
  function(menuItems) {
    var menuItemsTitleHtml = menuItemHtml;
    menuItemsTitleHtml = insertProperty(
      menuItemsTitleHtml,
      "name",
      chosenCategory.name
    );
    menuItemsTitleHtml = insertProperty(
      menuItemsTitleHtml,
      "special_instructions",
      chosenCategory.special_instructions
    );

    finalHtml +=
      menuItemsTitleHtml + "<div class='row'>";

    for (
      var i = 0;
      i < menuItems.length;
      i++
    ) {
      var menuItemHtml = menuItemHtml;
      menuItemHtml = insertProperty(
        menuItemHtml,
        "short_name",
        menuItems[i].short_name
      );
      menuItemHtml = insertProperty(
        menuItemHtml,
        "name",
        menuItems[i].name
      );
      menuItemHtml = insertProperty(
        menuItemHtml,
        "description",
        menuItems[i].description
      );
      menuItemHtml = insertProperty(
        menuItemHtml,
        "price_small",
