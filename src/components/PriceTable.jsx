import '../styles/services.css';

/**
 * Renders one price table from the generated data.
 *
 * A table may carry an `<h4>` sub-heading and a note (both are in the data).
 * The first body cell is rendered as a row header so screen readers announce
 * the row's label with each price; the original marked some rows up with `<th>`
 * already, so this keeps its markup rather than fighting it.
 */
export default function PriceTable({ table, slideTitle }) {
  const { heading, note, columns, rows } = table;

  return (
    <>
      {heading ? <h4>{heading}</h4> : null}
      {note ? <p className="note">{note}</p> : null}

      <table className="price-table">
        <caption className="sr-only">
          {slideTitle}
          {heading ? ` - ${heading}` : ''}
        </caption>

        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={rowIndex} className={row.total ? 'total-row' : undefined}>
              {row.cells.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th key={cellIndex} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex}>{cell}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
