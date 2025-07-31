#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up multi-app branches...${NC}"

# Ensure we're on main
git checkout main

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to checkout main branch${NC}"
    exit 1
fi

# Create branches if they don't exist
BRANCHES=("client-production" "demo-telecom" "demo-2")

for BRANCH in "${BRANCHES[@]}"; do
    echo -e "${YELLOW}Setting up $BRANCH branch...${NC}"
    
    # Check if branch exists locally
    if git show-ref --verify --quiet refs/heads/$BRANCH; then
        echo -e "${YELLOW}Branch $BRANCH already exists locally${NC}"
    else
        echo -e "${YELLOW}Creating $BRANCH branch...${NC}"
        git checkout -b $BRANCH
        git push -u origin $BRANCH
    fi
    
    # Switch back to main
    git checkout main
done

echo -e "${GREEN}✓ All branches created successfully!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Configure Railway deployments for each branch"
echo "2. Set environment variables per deployment"
echo "3. Test deployments" 