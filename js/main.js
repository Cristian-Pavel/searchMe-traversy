import {
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
  clearPushListener,
} from "./searchBar.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from "./searchResults.js";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);
  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

// Procedural "workflow" functions

const submitTheSearch = (event) => {
  event.preventDefault(); // previne actiunea automata a form-ului
  deleteSearchResults();
  processTheSearch(); // functia prin care face cautarea
  setSearchFocus(); // seteaza focusul pe casuta de cautare ? ca sa poti cauta rapid si altcevaf
};

// Procedural

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm(); // preia din modul cuvintele cheie cautate
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray); // daca sunt rezultate, atunci le va construi si in DOM ulterior
  setStatsLine(resultArray.length); // aici va construi acel "display X results", in functie de cate gaseste
};
