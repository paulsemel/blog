pipeline {
    agent {
        dockerfile {
          args '-p 9000:9000'
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
                sh 'gatsby build'
                sh 'gatsby serve'
            }
        }
    }
}
