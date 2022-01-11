#!/bin/bash
# This script runs setup tasks to a given 'stage'
#
# The 'stage' is extracted from the pipeline name
#
# EXAMPLE
#
#     setup_dev -> run setup on DEV environment
#
# USAGE
#
# The script is usually called in the pipeline.
#
# If you want to call this script manually, make sure to provide
# the required ENV variables:
#
#    GO_PIPELINE_NAME=<pipeline_name> bash scripts/pipeline/setup.sh
set -euo pipefail

# INFO we always use lowercase filenames
GO_PIPELINE_NAME=$(echo "$GO_PIPELINE_NAME" | tr '[:upper:]' '[:lower:]')
# INFO convert 'prefix_group_component_action_where' => 'where'
STAGE=$(echo "$GO_PIPELINE_NAME" | awk 'BEGIN {FS="_"}{print $(NF)}')

echo "Setup environment"
echo "ansible-playbook -i $STAGE ${STAGE}.yaml"
