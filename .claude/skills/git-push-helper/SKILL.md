---
name: git-push-helper
description: Check git status, review changes, and push commits to remote repository. Use when the user wants to check what changes are staged/unstaged, see git status, review commits, or push to origin. Helps with git workflows like checking status before pushing or handling uncommitted changes.
allowed-tools: Bash(git:*)
---

# Git Push Helper

This skill helps you safely check your git status and push changes to your remote repository.

## Instructions

When the user asks to push commits, check git status, or review changes:

1. **Check current status**: Run `git status` to show what's staged, unstaged, or untracked
2. **Show branch info**: Run `git branch -vv` to show current branch and tracking info
3. **Show recent commits**: Run `git log --oneline -5` to show recent commits
4. **Check what will be pushed**: Run `git log origin/HEAD..HEAD --oneline` to see unpushed commits
5. **Verify before pushing**: Always show the status and let the user confirm
6. **Push safely**: Use `git push origin HEAD` to push current branch
7. **Confirm success**: Show the push result and verify with `git status`

## Important safeguards

- Always run `git status` before pushing
- Show the user what commits will be pushed
- Never force push (avoid `git push -f` or `git push --force`)
- If there are conflicts, explain them clearly and help resolve
- If the branch has no remote tracking, ask which remote to use
- Check for uncommitted changes and warn the user

## Common workflows

### Push current changes
```bash
# 1. Check status
git status

# 2. Show what will be pushed
git log origin/$(git rev-parse --abbrev-ref HEAD)..HEAD --oneline

# 3. Push to origin
git push origin HEAD
```

### Check status only
```bash
# 1. Show status
git status

# 2. Show branch info
git branch -vv

# 3. Show recent commits
git log --oneline -5
```

### Review before push
```bash
# 1. Check status
git status

# 2. Show diff of staged changes
git diff --staged

# 3. Show commits that will be pushed
git log origin/$(git rev-parse --abbrev-ref HEAD)..HEAD --oneline

# 4. Push if user confirms
git push origin HEAD
```

## Examples

**Example 1: User says "push my changes"**

Response:
1. Run: `git status`
2. Run: `git log origin/main..HEAD --oneline` (or current branch)
3. Show output: "You have X commits ready to push: [list commits]"
4. Ask: "Ready to push these changes to origin?"
5. If yes: Run `git push origin HEAD`
6. Show confirmation: "Successfully pushed to origin/[branch]"

**Example 2: User says "check git status"**

Response:
1. Run: `git status`
2. Run: `git branch -vv`
3. Run: `git log --oneline -5`
4. Explain: "You're on branch X. You have Y commits ahead of origin."

**Example 3: User says "what's ready to push?"**

Response:
1. Run: `git status`
2. Run: `git log origin/HEAD..HEAD --oneline`
3. If there are unpushed commits, list them
4. If there are uncommitted changes, warn about them
5. Ask if they want to push

## Error handling

If push fails:
- Check `git status` to see if there are conflicts
- Run `git pull --rebase` if remote has newer commits
- Explain the issue clearly to the user
- Never automatically force push

If there's no remote tracking branch:
- Run `git branch -vv` to check
- Ask user which remote to push to
- Suggest: `git push -u origin [branch-name]`
