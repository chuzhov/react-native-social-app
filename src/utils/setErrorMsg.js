export default function setErrorMsg(errorMsg) {
  switch (errorMsg) {
    case 'auth/network-request-failed':
      return 'Network request failed';
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/user-disabled':
      return 'User disabled';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/wrong-password':
      return 'Wrong password';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/weak-password':
      return 'Weak password';
    case 'unavailable':
      return 'Service temporary unavailable';
    default:
      return 'Something went wrong';
  }
}
