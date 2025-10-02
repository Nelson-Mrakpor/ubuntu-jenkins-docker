pipeline {
  agent any
  environment {
    UBUNTU-JENKINS-DOCKER = 'nelsonmrakpor/mozero-apps' // <- change this
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build Image') {
      steps {
        script {
          docker.build("${UBUNTU-JENKINS-DOCKER}:${env.BUILD_NUMBER}")
        }
      }
    }
    stage('Push Image') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
            sh "docker push ${UBUNTU-JENKINS-DOCKER}:${env.BUILD_NUMBER}"
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        sh "docker rm -f simple-app || true"
        sh "docker run -d --name mozero-apps -p 80:3000 ${UBUNTU-JENKINS-DOCKER}:${env.BUILD_NUMBER}"
      }
    }
  }
}
