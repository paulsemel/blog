pipeline {
    agent { dockerfile true }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm serve'
            }
        }
    }
}
