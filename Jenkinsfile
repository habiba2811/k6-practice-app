pipeline {
    agent {
        docker {
            image 'grafana/k6:latest'
            args '--entrypoint=""'
        }
    }

    stages {
        stage('Run K6 Test') {
            steps {
                sh 'k6 run --quiet script.js'
            }
        }
    }
}
