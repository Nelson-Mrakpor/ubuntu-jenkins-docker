pipeline {
    agent any

    environment {
        UBUNTU_JENKINS_DOCKER = 'nelsonmrakpor/mozero-apps' // Docker image name
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                script {
                    docker.build("${UBUNTU_JENKINS_DOCKER}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        sh "docker push ${UBUNTU_JENKINS_DOCKER}:${env.BUILD_NUMBER}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop and remove any running container named mozero-apps
                    sh "docker rm -f mozero-apps || true"

                    // Run the new container
                    sh "docker run -d --name mozero-apps -p 80:3000 ${UBUNTU_JENKINS_DOCKER}:${env.BUILD_NUMBER}"
                }
            }
        }
    }
}
