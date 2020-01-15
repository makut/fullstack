pipeline {
    agent { docker { image 'maven:3.3.3' } }
    stages {
        stage('build') {
            steps {
                dir("server") {
                    sh 'mvn compile'
                }
            }
        }
        stage('test') {
            steps {
                dir("server") {
                    sh 'mvn test'
                }
            }
        }
    }
}
