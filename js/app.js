// example data set
const requiredDomain = 'example.com'
const data = [
  {
    user: 'JimH',
    email: 'jim@example.com',
    ip_addr: '31.13.88.35',
    enhancedAuth: true,
  },
  {
    user: 'PamB',
    email: 'pam@example.com',
    ip_addr: '192.168.0.145',
    enhancedAuth: false,
  },
  {
    user: 'TobyF',
    email: 'toby@example.com',
    ip_addr: '54.187.103.41',
    enhancedAuth: false,
  },
  {
    user: 'BobV',
    email: 'bob.v@gmail.com',
    ip_addr: '65.121.176.199',
    enhancedAuth: true,
  }
]

function hasAccess(user) {
  // Check if the user exists within array
  var userObj = data.find(item => item.user === user);
  if (userObj == undefined) {
    return false
  }
  // Filter domain using substring
  const domain = userObj.email.substring(userObj.email.lastIndexOf("@") +1)
  if (domain == undefined) {
    return false
  }
  if (domain === requiredDomain) {
    // Split the ip address
    const spread = userObj.ip_addr.split('.')

    // TODO look for a better ternary if combination/shorthand?
    const isLocal = spread[0] == '192' && spread[1] == '168' ? true : false

    // Check if user is on local network and has enhanced auth
    if (isLocal || userObj.enhancedAuth) { return true }
    else { return false }
  }
  return false
}

// Loop through data set and generate new data set in JSON format
const modifiedData = []
data.forEach((item) => {
  const newData = { 
    ...item,
    hasAccess: hasAccess(item.user)
  }
  modifiedData.push(newData)
})
console.log(JSON.stringify(modifiedData))
