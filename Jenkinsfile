#!groovy
@Library('fcaa-lib@master') _
node {
   properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '2', numToKeepStr: '2'))])
   fcaVPCPipeline {
        GIT_URL            = 'https://del.tools.publicis.sapient.com/bitbucket/scm/fcaab/fcg-frontend-component.git'
        BITBUCKET_NOTIFY_URL = 'https://del.tools.publicis.sapient.com/bitbucket/rest/build-status/1.0/commits'
        GIT_CREDENTIALS    = 'Git-Credentials'
        ESLINT_CONFIG_FILE = '.eslintrc.js'
        CHECKSTYLE_FILE    = 'eslint.xml'
        SONAR_PROPERTY     = 'sonar-project.properties'
        RECIPIENT          = 'FCAADevOps@sapient.com, barry.edwards@digitaslbi.com, schavan3@sapient.com, rkumar180@sapient.com, rsambasivam@sapient.com, stephen.smithstone@digitaslbi.com'
        EMAIL_TEMPLATE     = 'email_template'
		BRAND_NAME         = 'Vehicle Price Calculator(VPC)'
    }
}

