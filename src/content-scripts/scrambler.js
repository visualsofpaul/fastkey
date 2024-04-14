export default class Scramble {
  constructor(rotations = null, output = null) {
    this.characters = Array.from({ length: 26 * 2 }, (_, index) => {
      const baseCharCode = index < 26 ? 65 : 97;
      return String.fromCharCode(baseCharCode + (index % 26));
    });
    this.rotations = rotations;
    this.output = output;
  }

  async scramble(text) {
    this.output.textContent = "";

    const letters = text.split("");

    const characters = letters.map((character) => {
      return this.generateCharacterList(character);
    });

    let textArray = Array();

    letters.forEach((letter, letterIndex) => {
      characters[letterIndex].forEach((character, characterIndex) => {
        setTimeout(() => {
          textArray[letterIndex] = character;
          this.output.textContent = textArray.join("");
        }, 10 * (letterIndex * characters[letterIndex].length + characterIndex));
      });
    });
  }

  generateCharacterList(character) {
    return Array.from({ length: this.rotations - 1 }, () => {
      return this.characters[
        Math.floor(Math.random() * this.characters.length)
      ];
    }).concat(character);
  }
}
