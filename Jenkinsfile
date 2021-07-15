pipeline {
    agent any
    tools { nodejs "node" }
    stages {
        stage('Build') {
            agent { dockerfile true }
            steps {
                echo 'Building..'
                sh 'node --version'
                sh 'npm build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm install'
                sh 'npm test --forceExit'
            }
        } 
    } 
}