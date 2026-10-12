// 0s are empty, 1s are green, 2s are red
export type BoxValue = 0 | 1 | 2;

export interface Box {
  correct: BoxValue;
  value: BoxValue;
}

interface BoardProps {
  board: Box[][];
  isLocked: (i: number, j: number) => boolean;
  toggleBox: (i: number, j: number) => void;
}

// Each box is a square with a 5px margin on each side.
const SIZE_CLASS_NAMES: Record<number, string> = {
  4: 'w-[calc(25%-10px)] pb-[calc(25%-10px)]',
  6: 'w-[calc(16.666%-10px)] pb-[calc(16.666%-10px)]',
  8: 'w-[calc(12.5%-10px)] pb-[calc(12.5%-10px)]',
  10: 'w-[calc(10%-10px)] pb-[calc(10%-10px)]'
};

const COLOR_CLASS_NAMES: Record<BoxValue, string> = {
  0: 'bg-silver',
  1: 'bg-shamrock',
  2: 'bg-cinnabar'
};

const COLOR_NAMES: Record<BoxValue, string> = {
  0: 'empty',
  1: 'green',
  2: 'red'
};

export const Board = ({ board, isLocked, toggleBox }: BoardProps) => {
  return (
    <div className="mx-auto my-[1em] flex max-w-[400px] flex-wrap">
      {board.map((row, i) => row.map((box, j) => (
        <button
          aria-disabled={isLocked(i, j)}
          aria-label={`Row ${i + 1}, column ${j + 1}: ${COLOR_NAMES[box.value]}${isLocked(i, j) ? ' (given)' : ''}`}
          className={`m-[5px] h-0 cursor-pointer rounded-[16.666%] select-none [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-curious-blue ${SIZE_CLASS_NAMES[board.length]} ${COLOR_CLASS_NAMES[box.value]}`}
          key={`${i}-${j}`}
          onClick={() => toggleBox(i, j)}
          type="button"
        />
      )))}
    </div>
  );
};
