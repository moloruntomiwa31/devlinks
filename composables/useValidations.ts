export default function useValidation() {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const isValidEmail = (email: string): boolean => {
    return emailRegex.test(email) && email.length > 0;
  };

  const sameAs = (value1: string, value2: string): boolean => {
    if (value1.length !== value2.length) {
      return false;
    }
    for (let i = 0; i < value1.length; i++) {
      if (value1[i] !== value2[i]) {
        return false;
      }
    }
    if ((value1.length && value2.length) < 8) {
      return false;
    }
    return true;
  };

  return { sameAs, isValidEmail };
}
