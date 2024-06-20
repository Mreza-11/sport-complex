import { useState } from "react";

export const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const useColors = () => {
  const [linkColors, setLinkColors] = useState<string[]>(
    Array.from({ length: 10 }, () => generateRandomColor())
  );
  const [nodeColors, setNodeColors] = useState<string[]>(
    Array.from({ length: 10 }, () => generateRandomColor())
  );

  const shuffleColors = async () => {
    const newLinkColors = Array.from({ length: 10 }, () =>
      generateRandomColor()
    );
    const newNodeColors = Array.from({ length: 10 }, () =>
      generateRandomColor()
    );
    setLinkColors(newLinkColors);
    setNodeColors(newNodeColors);
  };

  return { linkColors, nodeColors, shuffleColors };
};

export default useColors;
