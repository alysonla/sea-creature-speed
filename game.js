// Import necessary React components (using browser versions)
const { useState, useEffect } = React;

// Main component
const SeaSpeedGame = () => {
  // Sea creatures with their speeds in mph and emoji representations
  const seaCreatures = [
    { name: "Blue Whale", speed: 31, emoji: "🐋" },
    { name: "Sperm Whale", speed: 23, emoji: "🐳" },
    { name: "Bottlenose Dolphin", speed: 22, emoji: "🐬" },
    { name: "Killer Whale (Orca)", speed: 34, emoji: "🐋" },
    { name: "Great White Shark", speed: 35, emoji: "🦈" },
    { name: "Mako Shark", speed: 60, emoji: "🦈" },
    { name: "Sailfish", speed: 68, emoji: "🐟" },
    { name: "Marlin", speed: 50, emoji: "🐠" },
    { name: "Sea Turtle", speed: 22, emoji: "🐢" },
    { name: "Flying Fish", speed: 35, emoji: "🐟" }
  ];

  const [currentRound, setCurrentRound] = useState(0);
  const [creatures, setCreatures] = useState([]);
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [slider, setSlider] = useState(30);
  const totalRounds = 5;

  // Initialize game
  const initGame = () => {
    const shuffled = [...seaCreatures].sort(() => 0.5 - Math.random());
    const roundCreatures = [];
    
    for (let i = 0; i < totalRounds; i++) {
      const index = i;
      if (index < shuffled.length) {
        roundCreatures.push({
          creature: shuffled[index],
          answered: false
        });
      }
    }
    
    setCreatures(roundCreatures);
    setCurrentRound(0);
    setScore(0);
    setGuess(null);
    setResult(null);
    setGameOver(false);
  };

  // Make a slider guess
  const makeSliderGuess = () => {
    if (result !== null) return;

    const currentCreature = creatures[currentRound].creature;
    const actualSpeed = currentCreature.speed;
    const difference = Math.abs(slider - actualSpeed);
    
    const correct = difference <= 5;
    
    if (correct) {
      setScore(score + 1);
    }
    
    setGuess(slider);
    setResult(correct);
    
    const updatedCreatures = [...creatures];
    updatedCreatures[currentRound].answered = true;
    setCreatures(updatedCreatures);
  };

  // Next round
  const nextRound = () => {
    if (currentRound < totalRounds - 1) {
      setCurrentRound(currentRound + 1);
      setResult(null);
      setGuess(null);
    } else {
      setGameOver(true);
    }
  };

  // Initialize game on component mount
  useEffect(() => {
    initGame();
  }, []);

  const currentCreature = creatures[currentRound]?.creature;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-blue-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">Sea Creature Speed Guessing Game</h1>
      
      {gameOver ? (
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl mb-4">Your final score: {score} out of {totalRounds}</p>
          <p className="mb-6">
            {score === totalRounds 
              ? "Perfect score! You're a sea creature expert!" 
              : score >= totalRounds / 2 
              ? "Good job! You know your sea creatures well!" 
              : "Keep learning about sea creatures and try again!"}
          </p>
          <button 
            onClick={initGame}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Round: {currentRound + 1}/{totalRounds}</div>
            <div className="text-lg font-semibold">Score: {score}</div>
          </div>
          
          <div className="mb-8 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-center mb-4">Guess the Speed!</h2>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <div className="text-xl font-semibold">{currentCreature?.name}</div>
                <div className="mt-2 h-24 flex items-center justify-center">
                  <div className="text-6xl animate-pulse">
                    {currentCreature?.emoji || "🌊"}
                  </div>
                </div>
                
                {result !== null && (
                  <div className="mt-2 font-bold">
                    Actual speed: {currentCreature?.speed} mph
                  </div>
                )}
              </div>
            </div>
            
            {result === null ? (
              <div className="mb-6">
                <label className="block text-center mb-2">How fast do you think it swims? (in mph)</label>
                <div className="flex items-center justify-center gap-4">
                  <input 
                    type="range"
                    min="0" 
                    max="70" 
                    value={slider}
                    onChange={(e) => setSlider(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="w-12 text-center font-bold">{slider}</span>
                </div>
                <button
                  onClick={makeSliderGuess}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guess!
                </button>
              </div>
            ) : (
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mt-4">
                  {result ? (
                    <div className="flex items-center text-green-600">
                      <span className="text-lg font-semibold">
                        ✅ Great job! Your guess was close enough.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <span className="text-lg font-semibold">
                        ❌ Not quite! You guessed {guess} mph, but it swims at {currentCreature?.speed} mph.
                      </span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={nextRound}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">
              Fun Facts About Sea Creature Speeds:
            </h3>
            <ul className="text-sm space-y-2 list-disc pl-5">
              <li><strong>Sailfish (🐟):</strong> At 68 mph, the sailfish is considered the fastest fish in the ocean</li>
              <li><strong>Blue Whale (🐋):</strong> Despite being the largest animal on Earth, blue whales can swim at 31 mph</li>
              <li><strong>Mako Shark (🦈):</strong> One of the fastest sharks at 60 mph</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

// Render the app
ReactDOM.render(<SeaSpeedGame />, document.getElementById('root'));
