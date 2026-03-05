# PR Code Review

## Overview
Perform a thorough code review on the pull request.

Review the changed files in the diff and provide actionable feedback. Focus on:

- **Correctness**: Logic errors, null/undefined handling, edge cases, race conditions
- **Types**: TypeScript type errors, missing types, unsafe casts
- **Security**: Injection vulnerabilities, exposed secrets, unsafe inputs
- **Performance**: N+1 queries, unnecessary re-renders, expensive operations in hot paths
- **Style**: Consistency with the existing codebase, naming conventions

When you find an issue on a specific line, include it as an inline comment. When you know
the exact replacement, use a suggestion block so the author can apply it with one click.

Post a single review using post_review. If there are no significant issues, use event=APPROVE
(only if canApprove is enabled) or event=COMMENT with a brief summary.
