pipeline {
    agent {
        dockerfile {
          args '-p 8000:8000'
        }
    }
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
