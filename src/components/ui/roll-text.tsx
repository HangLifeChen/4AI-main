import React from 'react';

interface CustomCSSProperties extends React.CSSProperties {
  '--char-index'?: number;
  '--char-total'?: number;
  '--line-index'?: number;
  '--text-color'?: string;
}

interface FlipTextProps {
  children: string[];
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

const FlipText: React.FC<FlipTextProps> = ({
  children,
  className = '',
  style,
  color = '#FCBC19'
}) => {
  return (
    <main
      className={`flex flex-col gap-4 perspective-1000 ${className}`}
      style={{
        ...style,
        '--text-color': color
      } as CustomCSSProperties}
    >
      {children.map((line, lineIndex) => (
        <FlipLine key={lineIndex} text={line} lineIndex={lineIndex} />
      ))}
    </main>
  );
};

const FlipLine = ({ text, lineIndex }: { text: string; lineIndex: number }) => {
  const words = text.split(' ');
  const chars = text.split('');
  const totalChars = chars.length;
  let globalCharIndex = 0;

  return (
    <p
      className="m-0 leading-none w-fit flip-perspective"
      style={{ '--line-index': lineIndex } as CustomCSSProperties}
    >
      {words.map((word, wordIndex) => {
        const wordEl = (
          <span key={wordIndex} className="inline-block whitespace-nowrap flip-perspective">
            {word.split('').map((char, charIndex) => {
              const currentGlobalIndex = globalCharIndex;
              globalCharIndex++;
              return (
                <span
                  key={`${wordIndex}-${charIndex}`}
                  data-char={char}
                  className="flip-char"
                  style={
                    {
                      '--char-index': currentGlobalIndex,
                      '--char-total': totalChars,
                    } as CustomCSSProperties
                  }
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
        globalCharIndex++;
        return (
          <React.Fragment key={wordIndex}>
            {wordEl}
            {wordIndex < words.length - 1 && <span className="inline-block whitespace-pre"> </span>}
          </React.Fragment>
        )
      })}
    </p>
  );
};

export default FlipText;