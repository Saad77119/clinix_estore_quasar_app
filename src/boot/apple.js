import {AppleSignIn} from 'apple-sign-in-rest';
const appleSignIn = new AppleSignIn({
  clientId: "org.clinix.estore.app",
  teamId: "X39GLHWBT6",
  keyIdentifier: "Z3QBTTJDL4",
  privateKey: "-----BEGIN PRIVATE KEY-----MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgO8d+4o+AGPtJgGq2ctX4IgDazDzgz0pXx08JeViQ5/2gCgYIKoZIzj0DAQehRANCAASXTYEflzN5LYeC7wH7SNEetY4CrQSjPB90BVFYyw99uXRzyD2zwDg3XI1S/c844UMMsTiKNdgIS/aSak1XV5lD-----END PRIVATE KEY-----",
})
export default appleSignIn;