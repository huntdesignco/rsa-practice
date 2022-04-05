#!/usr/bin/python3
import json

# example data set
requiredDomain = "example.com"
data = [
  {
    "user": 'JimH',
    "email": 'jim@example.com',
    "ip_addr": '31.13.88.35',
    "enhancedAuth": True,
  },
  {
    "user": 'PamB',
    "email": 'pam@example.com',
    "ip_addr": '192.168.0.145',
    "enhancedAuth": False,
  },
  {
    "user": 'TobyF',
    "email": 'toby@example.com',
    "ip_addr": '54.187.103.41',
    "enhancedAuth": False,
  },
  {
    "user": 'BobV',
    "email": 'bob.v@gmail.com',
    "ip_addr": '65.121.176.199',
    "enhancedAuth": True,
  }
]

def hasAccess(user):
  global data

  # Check if the user exists within array
  for userData in data:
    if userData['user'] == user:
      userObj = userData

  # Filter domain using substring
  domain = userObj['email'][userObj['email'].index('@') + 1 : ]

  if domain == None:
    return False

  if domain == requiredDomain:
    # Split the ip address
    spread = userObj['ip_addr'].split('.')
    isLocal = True if spread[0] == '192' and spread[1] == '168' else False

    # Check if user is on local network and has enhanced auth
    if isLocal or userObj['enhancedAuth']: return True
    else: return False

  return False


# Loop through data set and generate new data set in JSON format
modifiedData = []
for user in data:
  newData = user
  newData['hasAccess'] = hasAccess(user['user'])

  modifiedData.append(newData)

print(json.dumps(modifiedData))
