import { query } from "./db";

export async function getPatrons() {
  const result = await query({
    sql: "SELECT * FROM patrons",
  });

  return result;
}

export async function getPatronsTrend() {
  const result = await query({
    sql: `SELECT MONTH(creation_date_time) AS month,
          COUNT(*) AS patronsCount
          FROM patrons
          WHERE YEAR(creation_date_time) = YEAR(CURRENT_DATE())
          GROUP BY MONTH(creation_date_time);`,
  });
  return result;
}

export async function getPatron(id: string) {
  const result = await query({
    sql: "SELECT * FROM patrons WHERE patron_id = ? LIMIT 1",
    values: [id],
  });

  return result[0];
}

export async function getBooks(withAuthors?: string) {
  let result;
  if (withAuthors === "true") {
    result = await query({
      sql: `SELECT b.*, a.*
            FROM books b
            LEFT JOIN book_authors ba ON b.book_id = ba.book_id
            LEFT JOIN authors a ON ba.author_id = a.author_id`,
    });
  } else {
    result = await query({
      sql: "SELECT * FROM books",
    });
  }

  return result;
}

export async function getBookTotal() {
  const result = await query({
    sql: "SELECT COUNT(*) as bookTotal FROM books",
  });

  return result[0];
}

export async function getBook(id: Number) {
  const result = await query({
    sql: "SELECT * FROM books WHERE book_id = ? LIMIT 1",
    values: [id],
  });

  return result[0];
}

export async function getCardsData() {
  const result = await query({
    sql: `SELECT
          (SELECT COUNT(*) FROM patrons) AS patronsCount,
          (SELECT COUNT(*) FROM books) AS booksCount,
          (SELECT COUNT(*) FROM transactions WHERE transaction_status = 'Borrowed') AS borrowedBooksCount`,
  });

  return result[0];
}

export async function getCirculationChartData() {
  const result = await query({
    sql: `SELECT transaction_status,
          COUNT(*) AS transaction
          FROM transactions
          GROUP BY transaction_status;`,
  });

  return result;
}

export async function getTransactions(size?: Number, page?: Number) {
  let result;
  if (page && size) {
    const offset = (page.valueOf() - 1) * size.valueOf();
    result = await query({
      sql: `SELECT t.*, p.*, b.*
          FROM transactions t
          JOIN patrons p ON t.patron_id = p.patron_id
          JOIN books b ON t.book_id = b.book_id
          LIMIT ? OFFSET ?`,
      values: [size, offset],
    });
  } else if (size) {
    result = await query({
      sql: `SELECT t.*, p.*, b.*
          FROM transactions t
          JOIN patrons p ON t.patron_id = p.patron_id
          JOIN books b ON t.book_id = b.book_id
          LIMIT ?`,
      values: [size],
    });
  } else {
    result = await query({
      sql: `SELECT t.*, p.*, b.*
          FROM transactions t
          JOIN patrons p ON t.patron_id = p.patron_id
          JOIN books b ON t.book_id = b.book_id`,
    });
  }

  return result;
}

// export async function getPatrons() {
//   let conn;
//   try {
//     conn = await getConnection();
//     const result = await conn.query("SELECT * FROM patrons");
//     const actualRows = rows as any;

//     return actualRows;
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     throw new Error("Failed to fetch data");
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// }

// export async function getPatronsTrendData() {
//   let conn;
//   try {
//     conn = await getConnection();
//     const [rows] = await conn.query(
//       `SELECT MONTH(creation_date_time) AS month,
//       COUNT(*) AS patronsCount
//       FROM patrons
//       WHERE YEAR(creation_date_time) = YEAR(CURRENT_DATE())
//       GROUP BY MONTH(creation_date_time);`
//     );
//     const actualRows = rows as any;
//     return actualRows;
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     throw new Error("Failed to fetch data");
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// }

// export async function getPatron(id: string) {
//   let conn;
//   try {
//     conn = await getConnection();
//     const [rows] = await conn.query(
//       "SELECT * FROM patrons WHERE patron_id = ? LIMIT 1",
//       [id]
//     );

//     if (Array.isArray(rows)) {
//       return rows[0];
//     } else {
//       return rows;
//     }
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     throw new Error("Failed to fetch data");
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// }

// export async function getBooks() {
//   let conn;
//   try {
//     conn = await getConnection();
//     const [rows] = await conn.query(
//       `SELECT b.*, a.*
//       FROM books b
//       LEFT JOIN book_authors ba ON b.book_id = ba.book_id
//       LEFT JOIN authors a ON ba.author_id = a.author_id`
//     );
//     return rows;
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     throw new Error("Failed to fetch data");
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// }

// export async function getCardsData() {
//   let conn;
//   try {
//     conn = await getConnection();
//     const [rows] = await conn.query(
// `SELECT
//   (SELECT COUNT(*) FROM patrons) AS patronsCount,
//   (SELECT COUNT(*) FROM books) AS booksCount,
//   (SELECT COUNT(*) FROM transactions WHERE status = 'Borrowed') AS borrowedBooksCount`
//     );
//     if (Array.isArray(rows)) {
//       const cardsData = {
//         ...rows[0],
//         robotStatus: { batteryPercent: 25, status: "Charging" },
//       };
//       return cardsData;
//     } else {
//       return rows;
//     }
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     throw new Error("Failed to fetch data");
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// }

// export async function getCirculationChartData() {
//   let conn;
//   try {
//     conn = await getConnection();
//     const [rows] = await conn.query(
// `SELECT status,
// COUNT(*) AS transaction
// FROM transactions
// GROUP BY status;`
//     );
//     const actualRows = rows as any;
//     return actualRows;
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     throw new Error("Failed to fetch data");
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// }

// export async function getTransactions(size: Number, page: Number) {
//   const offset = (page.valueOf() - 1) * size.valueOf();
//   let conn;
//   try {
//     conn = await getConnection();
//     const [rows] = await conn.query(
//       `SELECT t.*, p.*, b.*
//       FROM transactions t
//       JOIN patrons p ON t.patron_id = p.patron_id
//       JOIN books b ON t.book_id = b.book_id
//       LIMIT ? OFFSET ?`,
//       [size, offset]
//     );
//     const actualRows = rows as any;
//     return actualRows;
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     throw new Error("Failed to fetch data");
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// }
