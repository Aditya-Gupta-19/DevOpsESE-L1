pipeline {
    agent any

    environment {
        KUBECONFIG = credentials('kubeconfig')   // Jenkins credential ID for kubeconfig
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Set Environment') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        DEPLOY_PATH = 'k8s/overlays/dev'
                        CLUSTER = 'Test Cluster'
                    } else if (env.BRANCH_NAME == 'main') {
                        DEPLOY_PATH = 'k8s/overlays/prod'
                        CLUSTER = 'Production Cluster'
                    } else {
                        error("Unsupported branch: ${env.BRANCH_NAME}")
                    }
                    echo "Deploying branch '${env.BRANCH_NAME}' to ${CLUSTER}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    kubectl apply -k ${DEPLOY_PATH}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful for ${env.BRANCH_NAME}"
        }
        failure {
            echo "Deployment failed for ${env.BRANCH_NAME}"
        }
    }
}
