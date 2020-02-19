export const Board = ({ board, toggleBox }) => {
  return (
    <div className={`board board-size-${board.length}`}>
      {board.map((row, i) => row.map((box, j) => (
        <div
          className={`box box-color-${box.value}`}
          key={`${i}-${j}-${box.value}`}
          onClick={() => toggleBox(i, j)}
        />
      )))}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    correct: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  }))).isRequired,
  toggleBox: PropTypes.func.isRequired
};
