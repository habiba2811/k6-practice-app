pipeline {
    agent any

    stages {
        stage('Run K6 Test') {
            steps {
                bat 'k6 run --quiet script.js'
            }
        }
    }
}