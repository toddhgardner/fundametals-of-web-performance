module.exports = {

  /**
   * Generate a random number between the minimum and maximum inclusive.
   * @param {number} min
   * @param {number} max
   * @see https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
   */
  getRandom: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}