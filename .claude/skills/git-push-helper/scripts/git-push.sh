#!/bin/bash
# git-push.sh - Safely check status and push to remote

set -e  # Exit on error

echo "=== Git Push Helper ==="
echo ""

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $CURRENT_BRANCH"
echo ""

# Check for uncommitted changes
echo "--- Checking for uncommitted changes ---"
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  WARNING: You have uncommitted changes"
    echo ""
    git status --short
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted. Please commit your changes first."
        exit 1
    fi
fi

# Check for untracked files
UNTRACKED=$(git ls-files --others --exclude-standard)
if [ -n "$UNTRACKED" ]; then
    echo "⚠️  WARNING: You have untracked files:"
    echo "$UNTRACKED"
    echo ""
fi

# Check tracking branch
TRACKING_BRANCH=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || echo "")

if [ -z "$TRACKING_BRANCH" ]; then
    echo "❌ No remote tracking branch set for '$CURRENT_BRANCH'"
    echo ""
    echo "Set up tracking with:"
    echo "  git push -u origin $CURRENT_BRANCH"
    exit 1
fi

echo "Tracking branch: $TRACKING_BRANCH"
echo ""

# Show commits that will be pushed
echo "--- Commits to be pushed ---"
UNPUSHED_COMMITS=$(git log $TRACKING_BRANCH..HEAD --oneline)

if [ -z "$UNPUSHED_COMMITS" ]; then
    echo "✅ No commits to push. Branch is up to date."
    exit 0
fi

echo "$UNPUSHED_COMMITS"
echo ""

# Count commits
COMMIT_COUNT=$(echo "$UNPUSHED_COMMITS" | wc -l | tr -d ' ')
echo "Total: $COMMIT_COUNT commit(s) ready to push"
echo ""

# Ask for confirmation
read -p "Push to $TRACKING_BRANCH? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Push cancelled."
    exit 0
fi

# Push to origin
echo ""
echo "--- Pushing to remote ---"
if git push origin HEAD; then
    echo ""
    echo "✅ SUCCESS: Changes pushed to $TRACKING_BRANCH"

    # Show final status
    echo ""
    echo "--- Final status ---"
    git status
else
    echo ""
    echo "❌ ERROR: Push failed"
    echo ""
    echo "This might be because:"
    echo "  1. Remote has newer commits (try: git pull --rebase)"
    echo "  2. Network connection issue"
    echo "  3. Permission denied"
    echo ""
    echo "Check your connection and try again."
    exit 1
fi
