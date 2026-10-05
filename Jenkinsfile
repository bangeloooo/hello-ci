pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        SELENIUM_REMOTE_URL = 'http://localhost:4444'
        APP_URL = 'http://host.docker.internal:3000'
        JEST_JUNIT_OUTPUT_DIR = 'test-results'
        JEST_JUNIT_OUTPUT_NAME = 'junit.xml'
    }

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('UI Test') {
            steps {
                bat 'start /B node src\\app.js'
                bat 'timeout /t 5 /nobreak'
                bat 'npx jest tests/e2e/home.test.js --reporters=default --reporters=jest-junit'
            }
        }
    }

    post {
        always {
            junit 'test-results/junit.xml'
        }
    }
}