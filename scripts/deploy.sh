#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BRANCH=$1
if [ -z "$BRANCH" ]; then
    echo -e "${RED}Usage: ./scripts/deploy.sh <branch-name>${NC}"
    echo "Available branches: client-production, demo-telecom, demo-2"
    exit 1
fi

# Validate branch
if [[ ! "$BRANCH" =~ ^(client-production|demo-telecom|demo-2)$ ]]; then
    echo -e "${RED}Invalid branch: $BRANCH${NC}"
    echo "Available branches: client-production, demo-telecom, demo-2"
    exit 1
fi

echo -e "${YELLOW}Starting deployment to $BRANCH...${NC}"

# Check if we have uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Error: You have uncommitted changes. Please commit or stash them first.${NC}"
    exit 1
fi

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Checkout target branch
echo -e "${YELLOW}Switching to $BRANCH branch...${NC}"
git checkout $BRANCH

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to checkout $BRANCH branch${NC}"
    exit 1
fi

# Pull latest changes from remote
echo -e "${YELLOW}Pulling latest changes...${NC}"
git pull origin $BRANCH

# Merge main into target branch
echo -e "${YELLOW}Merging main branch...${NC}"
git merge main --no-edit

if [ $? -ne 0 ]; then
    echo -e "${RED}Merge failed! Please resolve conflicts manually.${NC}"
    exit 1
fi

# Push changes
echo -e "${YELLOW}Pushing to remote...${NC}"
git push origin $BRANCH

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push changes${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Successfully deployed to $BRANCH!${NC}"
echo -e "${YELLOW}Railway deployment should be triggered automatically.${NC}"

# Return to original branch
git checkout $CURRENT_BRANCH

echo -e "${GREEN}Returned to $CURRENT_BRANCH branch${NC}" 