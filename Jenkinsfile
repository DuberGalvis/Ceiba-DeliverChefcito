pipeline{
	
		agent {
		label 'Slave_Induccion'
		}
	
        
		triggers {
        pollSCM('@hourly')
		}
	
		options {
			buildDiscarder(logRotator(numToKeepStr: '5'))
			disableConcurrentBuilds()
		}
		
		stages{
		
			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GitHub_DuberGalvis', url: 'https://github.com/DuberGalvis/Ceiba-DeliverChefcito']]])
				}
			}
		
		
			stage('compilar '){
                steps {
                    sh 'npm i'
                    sh 'npm run build'					
				}
            }
            stage('test '){
                steps {
					sh 'npm run test:cov'
					sh 'npm run test:unit'
					sh 'npm run test:e2e'					
				}
            }

			
			 stage('Sonar Analysis'){
			 	steps{
			 		echo '------------>Analisis de código estático<------------'
			 		  withSonarQubeEnv('Sonar') {
                         sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
                      }
			 	}
			 }
		
		

		}
		post {
			failure {
				mail(to: 'duber.galvis@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}	
			
}