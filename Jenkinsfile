pipeline {
    agent any

    stages {
        stage('Run K6 Test') {
            steps {
                sh 'k6 run --quiet script.js'
            }
        }
    }
}