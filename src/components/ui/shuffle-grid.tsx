import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Square = { id: number; src: string };

function shuffle(array: Square[]) {
  const next = [...array];
  let currentIndex = next.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [next[currentIndex], next[randomIndex]] = [next[randomIndex]!, next[currentIndex]!];
  }
  return next;
}

export function ShuffleGrid({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const baseSquares = useRef(
    // Genau ein Feld pro Bild – keine Wiederholungen, egal wie viele Fotos
    // übergeben werden (das Grid füllt volle 4er-Reihen, der Rest bleibt leer).
    images.map((src, i) => ({ id: i, src })),
  );
  const [squares, setSquares] = useState<Square[]>(baseSquares.current);

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(shuffle(baseSquares.current));
      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`grid grid-cols-4 grid-rows-4 gap-2 ${className ?? "h-[380px] sm:h-[480px] lg:h-[560px]"}`}
    >
      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          className="h-full w-full overflow-hidden rounded-[14px] bg-soft-blue bg-cover bg-center"
          style={{ backgroundImage: `url("${sq.src}")` }}
        />
      ))}
    </div>
  );
}
