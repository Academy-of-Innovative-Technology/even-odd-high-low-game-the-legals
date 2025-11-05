[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=21492153&assignment_repo_type=AssignmentRepo)
# 🔢 High-Low Guessing Game

## 🎯 Objective
The goal of this game is to guess a randomly generated number within a specified range.  
After each guess, the game provides **hints** — whether your guess is too high, too low, or if the number is **odd** or **even** — to help guide you to the correct answer.  

The game keeps track of:
- ✅ Wins
- ❌ Losses
- 🔁 Retries
- 🔥 Current Streak
- 🔄 Total Rounds Played

[DEMO](https://output.jsbin.com/putepal):[https://output.jsbin.com/putepal](https://output.jsbin.com/putepal)
---

## 🧩 Game Requirements

### 1. **Core Gameplay**
- The computer randomly generates a number within a given range of 0 to 1000.
- The player attempts to guess the number.
- After each guess, the game must display:
  - A hint if the number is **too high** or **too low**.
  - A hint whether the number is **odd** or **even**.
- The player continues guessing until:
  - They guess correctly (**win**).
  - They choose to **quit**. (clears the stats and goes to AOIT Website)
  - They reach the maximum number of allowed retries (**loss**).

---

### 2. **Game Options**
- Allow the player to:
  - Enter a guess.
  - Retry the round after losing.
  - Quit the game at any time.

---

### 3. **Tracking System**
- **Wins:** Increment when the player guesses correctly.
- **Losses:** Increment when the player fails after all retries or quits before guessing correctly.
- **Retries:** Count how many times the player repeats the round after losing.
- **Rounds Played:** Count total rounds started.
- **Streak:** Track consecutive wins. (if possible)

---

### 4. **User Feedback**
Each round should display:
- The number of guesses attempted.
- Hint feedback (too high, too low, odd, even).
- Current score and streak status.

---

## 🧠 Requirements

- Creative ( 6 images, min of different 3 colors, serveral divs)
- Conditionals ( if / else )
- Loops and control flow ( for )
- Random number generation ( Math.random )
- Game state management (wins, losses, streaks) (2 objects to store game stats)
- User interaction and input handling ( input and buttons )


## Advanced

- Store and retrieve the logic from localStorage
