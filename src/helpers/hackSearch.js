export function formatSearch (search) {
  let newSearch = search || '';
  if (search) {
    newSearch = newSearch.replace(/\s?$/, '').split(' ').join('|');
    newSearch = newSearch.replace(/a/g, '(a|á)');
    newSearch = newSearch.replace(/e/g, '(e|é)');
    newSearch = newSearch.replace(/u/g, '(u|ú)');
    newSearch = newSearch.replace(/o/g, '(o|ó)');
    newSearch = newSearch.replace(/i/g, '(i|í)');
    newSearch = newSearch.replace('||', '|');
  }
  return newSearch;
}
