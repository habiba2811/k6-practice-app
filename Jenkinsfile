pipeline {
    agent any

    environment {
        K6_CLOUD_TOKEN = credentials('grafana-k6-token')
        K6_CLOUD_STACK = 6972940
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/habiba2811/k6-practice-app.git'
            }
        }

        stage('Run k6 in Grafana Cloud') {
            steps {
                sh 'k6 cloud run script.js --quiet'
            }
        }
    }
}
