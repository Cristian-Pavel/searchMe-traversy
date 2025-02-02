export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[ ]{2,}/gi; // cauta 2 sau mai multe spatii global si insensitive case
  const searchTerm = rawSearchTerm.replaceAll(regex, " "); // daca gasim 2 spatii cu regex, le vom inlocui cu unul
  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
  const wikiSearchString = getWikiSearchString(searchTerm);
  const wikiSearchResults = await requestData(wikiSearchString);
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty("query")) {
    // returneaza true sau false daca gaseste proprietatea "query"
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};

const getWikiSearchString = (searchTerm) => {
  const maxChars = getMaxChars(); // sa ne returneze numarul maxim de caractere, cautarea de pe wikipedia
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString); // encodeaza spatii si anumite caractere care altfel nu ar functiona. (i.e. daca apar spatii sau alte caractere)
  return searchString;
};

const getMaxChars = () => {
  // este o functie care ii spune wikipediei cate caractere sa afiseze in rezultat in functie de marimea ecranului
  const width = window.innerWidth || document.body.clientWidth; // ca sa aiba o marime egala cu viewport width
  let maxChars;
  if (width < 414) maxChars = 65; // niste IF-uri care seteaza cat de multe caractere sa fie afisate
  if (width >= 414 && width < 1400) maxChars = 100;
  if (width >= 1400) maxChars = 130;
  return maxChars;
};

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const processWikiResults = (results) => {
  const resultArray = [];
  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key].hasOwnProperty("thumbnail")
      ? results[key].thumbnail.source
      : null;
    const item = {
      id: id,
      title: title,
      img: img,
      text: text,
    };
    resultArray.push(item);
  });
  return resultArray;
};
