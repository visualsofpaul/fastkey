export default class Password {
  constructor() {
    this.length = 8;
    this.numbers = Array.from(Array(10).keys());
    this.letters = Array.from({ length: 26 * 2 }, (_, index) => {
      const baseCharCode = index < 26 ? 65 : 97;
      return String.fromCharCode(baseCharCode + (index % 26));
    });
    this.specialCharacters = ["_", "-", "."];
  }

  async generate(options) {
    return Array.from({ length: options.length }, () => {
      let characterSet = [];

      if (options.numbers) {
        characterSet = characterSet.concat(this.numbers);
      }

      if (options.letters) {
        characterSet = characterSet.concat(this.letters);
      }

      if (options.specialCharacters) {
        characterSet = characterSet.concat(this.specialCharacters);
      }

      return characterSet[Math.floor(Math.random() * characterSet.length)];
    }).join("");
  }
}
