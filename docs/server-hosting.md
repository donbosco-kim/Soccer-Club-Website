# AWS Hosting Documentation
How to deploy node.js app with AWS EC2, Route 53 and Free SSL Certificate.

## Set Up
### ECS 
- launched ec2 instance
- choose Ubuntu (Amazon Machine Image) server
- create ssh key-pair
### create security group: who can access to the website and from where
- allow ssh traffic from: choose my ip address
- allow https traffic from the internet (check this)
- allo http traffic from the internet (check this)
### Configure Storage
- choose default
### Attached Elastic IP to the new ec2 instance 
- why use this?: it is for keeping the same IP if the server restart
- go to Elastic Ips under Network & Security
- select Allocate Elastic IP address and keep it default and hit Allocate button
- select Elastic Ip address and choose Associate Elastic Ip address from the Actions drop down at the top right corner
- when redirect to Associate Elastic Ip address page, choose your instance & private Ip address (they should be there)
- check the allow reassociated box and you will be redirect back to instances
### SSH Into the Server
- select the instance and click 'connect to instance'
- choose SSH Client
- copy the chmod 400 'your key' command and go to the terminal
- cd into your ssh folder or any folder that you store your ssh key pair when you made them in (link to the top heading)
- paste the command and do ls -la to see the permission changes (do a ls -la after cd into the folder)
- go back to SSH client and copy the 'Example:' command like below (the elastic ip is found under Instances)
```
ssh -i <yourkey.pem> ubuntu@<yourelasticip-address> -v
```
- paste the above command in the terminal and follow the prompt
- after you are done, you will be in ubuntu directory and do the following (choose default for any graphical interface prompt):
```
sudo apt update
```
```
sudo apt upgrade
```
```
sudo apt install -y git htop wget
```
### Install NVM 
- run the following command to install nvm
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
```
export NVM_DIR="$HOMRE/.nvm"
```
- this command loads nvm
```
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
```
- this command loads nvm bash_completion
```
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```
- verify that nvm is installed 
```
nvm --version
```
### Install Node
- install lastest node js version
```
nvm install --lts 
```
- verify that node.js & npm are installed
```
node --version
```
```
npm -v
```
### Clone Soccer-Club-Website (in my case) Repository
- cd /home/ubuntu and clone your repo here
```
git clone https://github.com/donbosco-kim/Soccer-Club-Website.git
```
### Run Node Server.js
- cd Soccer-Club-Website and install neccessary dependencies
```
npm install
```
- start the server
```
node server.js
```
### Install PM2
```
npm install -g pm2
```
### Start Your Web Application With pm2
```
pm2 start server.js --name=Nodejs-ssl-server (this name should be your instance name in AWS that you give)
```
### Install Nginx Web Server
