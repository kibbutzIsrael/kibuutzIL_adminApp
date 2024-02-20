export function generateRandomPassword(length) {
   const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
   const numberChars = "0123456789";
   const specialChars = "!@#$%";

   const allChars =
      uppercaseChars + lowercaseChars + numberChars + specialChars;

   let password = "";

   // Ensure each character type is included
   password += getRandomChar(uppercaseChars);
   password += getRandomChar(lowercaseChars);
   password += getRandomChar(numberChars);
   password += getRandomChar(specialChars);

   // Fill the rest of the password with random characters
   for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
   }

   // Shuffle the password to randomize the order of characters
   password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

   return password;
}

function getRandomChar(characters) {
   const randomIndex = Math.floor(Math.random() * characters.length);
   return characters[randomIndex];
}
