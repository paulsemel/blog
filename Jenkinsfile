pipeline {
    agent any
    environment {
        ANALYTICS_ID = credentials('google-analytics-tracking-id')
    }
    stages {
        stage('Clean') {
          steps {
            sh 'docker system prune -f'
          }
        }
        stage('Build') { 
            steps {
                sh 'docker-compose build --build-arg GA_ID=$ANALYTICS_ID'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
