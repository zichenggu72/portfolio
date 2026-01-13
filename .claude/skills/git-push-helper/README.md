# Git Push Helper Skill

A custom Claude Code skill that helps you safely check git status and push commits to your remote repository.

## What it does

This skill automates common git workflows:
- ✅ Check current git status
- ✅ Review staged and unstaged changes
- ✅ See commits ready to push
- ✅ Safely push to remote with confirmations
- ✅ Handle errors gracefully (conflicts, no tracking branch, etc.)

## How to use

Once installed, simply ask Claude:

- "Check my git status"
- "What changes are ready to push?"
- "Push my commits to origin"
- "Show me what's staged"
- "Review my changes and push"

Claude will automatically use this skill to help you with git operations.

## Features

### Safety checks
- Always shows you what will be pushed before pushing
- Warns about uncommitted changes
- Never force-pushes (no `--force` or `-f`)
- Verifies tracking branch exists
- Handles merge conflicts gracefully

### Smart workflows
- Shows branch tracking information
- Displays recent commit history
- Compares local vs remote branches
- Confirms success after push

### Interactive script
You can also run the standalone script:

```bash
bash .claude/skills/git-push-helper/scripts/git-push.sh
```

This script:
1. Shows current branch and tracking info
2. Checks for uncommitted/untracked files
3. Lists commits that will be pushed
4. Asks for confirmation before pushing
5. Pushes to origin and shows result

## Examples

### Example 1: Quick status check

**You**: "What's my git status?"

**Claude**:
```bash
# Runs: git status, git branch -vv, git log --oneline -5

On branch checkpoint4
Your branch is up to date with 'origin/checkpoint4'.

nothing to commit, working tree clean

Recent commits:
af57ef5 Implement dark mode for Mapbox...
54d2966 Update Font Craft Lab link...
```

### Example 2: Push with review

**You**: "Review my changes and push them"

**Claude**:
```bash
# Runs: git status
# Shows: Staged changes, unpushed commits

You have 2 commits ready to push:
- abc1234 Add new feature
- def5678 Fix bug in navigation

Ready to push these changes to origin/checkpoint4? (y/N)
```

**You**: "Yes"

**Claude**:
```bash
# Runs: git push origin HEAD
✅ SUCCESS: Changes pushed to origin/checkpoint4
```

### Example 3: Using the standalone script

```bash
$ bash .claude/skills/git-push-helper/scripts/git-push.sh

=== Git Push Helper ===

Current branch: checkpoint4

--- Checking for uncommitted changes ---
⚠️  WARNING: You have untracked files:
newfile.txt

--- Commits to be pushed ---
abc1234 Add new feature
def5678 Fix bug in navigation

Total: 2 commit(s) ready to push

Push to origin/checkpoint4? (y/N): y

--- Pushing to remote ---
✅ SUCCESS: Changes pushed to origin/checkpoint4
```

## Installation

This skill is already installed in your project at:
```
.claude/skills/git-push-helper/
```

To enable it:
1. Restart Claude Code (exit and start a new conversation)
2. The skill will be automatically discovered
3. Ask Claude to check git status or push changes

To share with your team:
```bash
git add .claude/skills/git-push-helper/
git commit -m "Add git push helper skill"
git push
```

## Configuration

The skill uses these git commands (all safe, read-only or confirmable):
- `git status` - Check working tree status
- `git branch -vv` - Show branch tracking info
- `git log` - View commit history
- `git diff` - Show changes
- `git push origin HEAD` - Push current branch

These commands are allowed in your `.claude/settings.local.json`:
```json
{
  "permissions": {
    "allow": [
      "Bash(git:*)"
    ]
  }
}
```

## Troubleshooting

**Skill not working?**
1. Restart Claude Code completely
2. Ask "What skills are available?" to verify it loaded
3. Check `.claude/skills/git-push-helper/SKILL.md` exists
4. Verify YAML frontmatter has no syntax errors

**Permission errors?**
- Check that `Bash(git:*)` is in your allowed permissions
- Ensure the script is executable: `chmod +x scripts/git-push.sh`

**Script won't run?**
```bash
# Make sure it's executable
chmod +x .claude/skills/git-push-helper/scripts/git-push.sh

# Run directly to test
bash .claude/skills/git-push-helper/scripts/git-push.sh
```

## How it works

The skill consists of:

1. **SKILL.md** - Instructions for Claude on when and how to use the skill
2. **scripts/git-push.sh** - Standalone bash script with safety checks
3. **README.md** - Documentation (this file)

When you ask Claude about git operations, it:
1. Recognizes keywords like "git status", "push", "commits"
2. Loads the SKILL.md instructions
3. Follows the workflow defined in the skill
4. Uses the Bash tool to run git commands
5. Presents results and asks for confirmation

## Best practices

✅ **Do:**
- Let Claude check status before pushing
- Review the list of commits before confirming
- Use this skill for routine git workflows

❌ **Don't:**
- Force push (the skill prevents this)
- Skip reviewing changes before pushing
- Push without checking for conflicts

## Learn more

- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Git Documentation](https://git-scm.com/doc)
- Your project's CLAUDE.md for architecture info
