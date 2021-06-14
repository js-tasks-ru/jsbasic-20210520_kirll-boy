function makeDiagonalRed(table) {
  let rows = table.rows;
  console.log( rows)
  for (let row of rows) {
      let cellDiagonal = row.cells[row.rowIndex];
      cellDiagonal.style.backgroundColor = 'red';
      console.log( cellDiagonal)
  }
}