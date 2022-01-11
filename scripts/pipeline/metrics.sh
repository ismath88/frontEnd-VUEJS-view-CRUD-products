#!/bin/bash
# This script verifies the code with sonar-scanner
# to ensure that the code quality is as expected.
#
# https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner
#
# The script can be called locally and in the pipeline.
#
# USAGE
#
#    
set -euo pipefail

echo "Verify code metrics..."
sonar-scanner -Dsonar.host.url=http://167.71.214.0:9000 \
              -Dsonar.login=af6b9f5b0a064831bacf522e8b6b89fadab49942
