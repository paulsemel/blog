pipeline {
    agent any
    stages {
        stage('Clean') {
          steps {
            sh 'docker system prune -f'
          }
        }
        stage('Build') { 
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
