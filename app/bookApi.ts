async function getBookData(bookId: string) {
  const res = await fetch(
    `https://3000-hattimatim-typeappserve-25257k7i7he.ws-us101.gitpod.io/books/${bookId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
}

interface Book {
  id: string;
  auhtor: string;
  bookName: string;
  imgUrl: string;
  pages: string[];
}

async function getAllBooksData(): Promise<Book[]> {
  const res = await fetch(
    `https://3000-hattimatim-typeappserve-25257k7i7he.ws-us101.gitpod.io/books`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
}

async function getPageData(
  bookId: string,
  pageNumber: number
): Promise<string> {
  const res = await fetch(
    `https://3000-hattimatim-typeappserve-25257k7i7he.ws-us101.gitpod.io/books/${bookId}/pages/${pageNumber}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
}

export { getAllBooksData, getBookData, getPageData };
