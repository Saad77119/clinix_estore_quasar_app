import hello from 'hellojs'
console.log("Working");
export default ({ Vue }) => {
  hello.init({
    facebook: '921143945312169',
    google : '1072636632696-8ssgt11694cjl08n29k0tjflntienoip.apps.googleusercontent.com'
  })
  Vue.prototype.$hello = hello
}
