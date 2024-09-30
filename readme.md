# User Activity CLI 

User Activity CLI is a project used to fetch user activity and displays it in the terminal.

**Requirements:** https://roadmap.sh/projects/github-user-activity

## Getting started
**1. Clone project**
```
git clone https://github.com/kvartsianyi/roadmap.sh_user-activity-cli.git
```

**2. Link package directly from the project folder**
```
cd ./user-activity-cli
npm link
```

## Usage
*To fetch user recent Github activity use command:*
```bash
github-activity <username>
```

**Example:**
```bash
github-activity nodejs
```

Output in console:
```bash
*** Nodejs recent activity: ***
- Issue comment created in nodejs/node
- Pull request opened in nodejs/node
- Created new branch v20.18.0-proposal in nodejs/node
- Pushed 1 commit to nodejs/node
- Issue comment created in nodejs/node
- Issue comment created in nodejs/node
- Issue comment created in nodejs/node
- Pull request closed in nodejs/node
- Pushed 1 commit to nodejs/node
...
```



