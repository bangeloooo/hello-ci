pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        SELENIUM_REMOTE_URL = 'http://selenium:4444'
        APP_URL = 'http://localhost:3000'
        JEST_JUNIT_OUTPUT_DIR = 'test-results'
        JEST_JUNIT_OUTPUT_NAME = 'junit.xml'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('UI Test') {
            steps {
                sh 'node src/app.js > app.log 2>&1 &'
                sh 'sleep 5'
                sh 'npx jest tests/e2e/home.test.js --reporters=default --reporters=jest-junit'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
        }
    }
}