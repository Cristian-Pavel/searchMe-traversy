export const setSearchFocus = () => {
  document.getElementById("search").focus();
};

export const showClearTextButton = () => {
  const search = document.getElementById("search");
  const clear = document.getElementById("clear");
  if (search.value.length) {
    // daca exista text in searchbar
    clear.classList.remove("none"); // afiseaza x
    clear.classList.add("flex");
  } else {
    clear.classList.add("none"); // ascunde x
    clear.classList.remove("flex");
  }
};

export const clearSearchText = (event) => {
  event.preventDefault();
  document.getElementById("search").value = "";
  const clear = document.getElementById("clear");
  clear.classList.add("none");
  clear.classList.remove("flex");
  setSearchFocus();
};

export const clearPushListener = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault(); // pentru ca nu vrem sa scriem space sau enter
    document.getElementById("clear").click(); // e o functie care va declansa evenimentul de click pe acel element
  }
};
