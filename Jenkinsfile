pipeline {
    agent { dockerfile true }
    tools { nodejs "node" }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'docker build . -t "ta-api"'
                sh 'docker run -d -e "PORT=5000" -p 5000:5000 --name ta-api ta-api'
            }
        }
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        } 
    } 
}