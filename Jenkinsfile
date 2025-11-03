pipeline {
    agent any

    environment {
        // Jenkins credential IDs
        KUBECONFIG = credentials('kubeconfig')       // Your kubeconfig credentials ID
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials' // Docker Hub credentials ID
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image for polling-app..."
                    sh 'docker build -t polling-app:latest ./polling-app'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Pushing image to Docker Hub..."
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        sh 'docker tag polling-app:latest aditya/polling-app:latest'
                        sh 'docker push aditya/polling-app:latest'
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo "Deploying to Test Cluster (dev)..."
                        sh 'kubectl apply -f k8s/dev/'
                    } else if (env.BRANCH_NAME == 'main') {
                        echo "Deploying to Production Cluster (main)..."
                        sh 'kubectl apply -f k8s/prod/'
                    } else {
                        echo "Skipping deployment for non-target branch: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
}
