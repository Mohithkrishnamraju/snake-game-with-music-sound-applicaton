import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const GAME_SPEED = 100;

type Point = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 15, y: 5 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const directionRef = useRef(direction);
  directionRef.current = direction;

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setFood(generateFood(INITIAL_SNAKE));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      if (isGameOver) {
        if (e.key === 'Enter' || e.key === ' ') resetGame();
        return;
      }

      const currentDir = directionRef.current;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDir.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDir.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDir.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDir.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
        case 'Escape':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver]);

  useEffect(() => {
    if (isPaused || isGameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          handleGameOver();
          return prevSnake;
        }

        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          handleGameOver();
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [isPaused, isGameOver, food, generateFood]);

  const handleGameOver = () => {
    setIsGameOver(true);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto font-mono">
      <div className="flex justify-between w-full mb-4 px-4 py-2 bg-black border-2 border-[#FF00FF]">
        <div className="flex items-center gap-2">
          <span className="text-[#00FFFF] text-2xl">&gt; DATA_FRAGS:</span>
          <span className="text-[#FF00FF] text-3xl font-bold">{score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#00FFFF] text-2xl">&gt; PEAK_MEM:</span>
          <span className="text-[#FF00FF] text-3xl font-bold">{highScore}</span>
        </div>
      </div>

      <div className="relative bg-black border-4 border-[#00FFFF] p-1">
        <div 
          className="grid bg-[#050505]"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: 'min(80vw, 500px)',
            height: 'min(80vw, 500px)'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.some((segment, idx) => idx !== 0 && segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i} 
                className={`
                  w-full h-full border border-[#00FFFF]/10
                  ${isSnakeHead ? 'bg-[#FF00FF] shadow-[0_0_8px_#FF00FF] z-10' : ''}
                  ${isSnakeBody ? 'bg-[#FF00FF]/70' : ''}
                  ${isFood ? 'bg-[#00FFFF] shadow-[0_0_12px_#00FFFF] animate-pulse z-10' : ''}
                `}
              />
            );
          })}
        </div>

        {(isPaused || isGameOver) && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 border-4 border-[#FF00FF] m-1">
            {isGameOver ? (
              <>
                <h2 className="text-6xl font-bold text-[#FF00FF] mb-2 glitch" data-text="FATAL_ERROR">FATAL_ERROR</h2>
                <p className="text-[#00FFFF] text-3xl mb-8">&gt; SECTORS_CORRUPTED: {score}</p>
                <button 
                  onClick={resetGame}
                  className="px-6 py-3 bg-transparent border-4 border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black text-3xl font-bold uppercase transition-colors"
                >
                  [ EXECUTE_REBOOT ]
                </button>
              </>
            ) : (
              <>
                <h2 className="text-6xl font-bold text-[#00FFFF] mb-8 glitch" data-text="SNAKE.EXE">SNAKE.EXE</h2>
                <button 
                  onClick={() => setIsPaused(false)}
                  className="px-8 py-4 bg-transparent border-4 border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black text-3xl font-bold uppercase transition-colors"
                >
                  [ INITIALIZE ]
                </button>
                <div className="text-[#00FFFF] mt-10 text-center text-2xl">
                  <p className="animate-pulse">&gt; AWAITING_INPUT...</p>
                  <p className="opacity-50 mt-2">SYS.HALT = SPACE</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
